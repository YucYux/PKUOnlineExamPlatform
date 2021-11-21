import { defineComponent } from "vue";
console.log("timeManager starting");
export const timeManager={
  timestamp:0,
  localTime:0,
  interval:-1,
  index:0,
  listeners:[],
  async listen(){
    for(let i of timeManager.listeners) i[1](timeManager.timestamp);
  },
  tick() {
    timeManager.interval=setInterval(() => {
      timeManager.timestamp++;
      timeManager.listen();
    }, 1000);
  },
  pause(){
    if(timeManager.interval!==-1)
    clearInterval(timeManager.interval);
    timeManager.interval=-1;
  },
  register(func){
      this.index++;
    this.listeners.push([this.index,func]);
    return this.index;
  },
  unregister(idx){
    this.listeners=this.listeners.filter((f)=>f[0]!==idx);
  },
  correct(){
    setInterval(() => {
      timeManager.timestamp=timeManager.get();
    }, 1000*60);
    return this;
  },
  get(){return new Date().getTime()},
  init(){
    if(timeManager.inited) return;
    timeManager.timestamp=timeManager.get();
    timeManager.tick();
  }
}
export default defineComponent({
  name: 'timer',
  props:{
    time:Number,
    increase:Boolean,
    format:{
        type:Function,
        default:null
    }
  },
  setup(props){
      timeManager.init();
      return {
          text:"--:--:--",
          ...props
      }
  },
  mounted(){
    this.registerTM();
  },
  methods:{
      move(e){
        this.$el.firstElementChild.style.backgroundPosition=e.offsetX+"px "+e.offsetY+"px";
      },
      click(e){

      },
      tick(){
          if(this.increase)
          this.time+=1;
          else
          this.time-=1;
          this.render();
          if(this.time<=0) this.stop();
      },
      registerTM(){
          let that=this;
          this.id=timeManager.register(function(){that.tick()});
      },
      defaultFormatter(h,m,s){
        return ((h<10)?"0":"")+h+":"+(m<10?"0":"")+m+":"+(s<10?"0":"")+s;
      },
      render(){
          let t=this.time,f=Math.floor;
          let second=f(t%60),minute=f(t/60)%60,hour=f(t/3600);
          let formated="";
          if(this.format)
          try{
          formated=this.format(hour,minute,second);
          }catch(e){}
          if(!formated) formated=this.defaultFormatter(hour,minute,second);
          this.text=formated;
          this.$el.firstElementChild.innerText=this.text;
      },
      stop(){
        timeManager.unregister(this.id);
      }
  }
});