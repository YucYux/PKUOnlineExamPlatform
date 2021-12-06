<template>
  <div class="paper transition">
  <component v-for="question,i in questions" :is="question.type" :data="question" :index="i" :ref="i"/>
  </div>
</template>
<script>
//TODO
import Monaco from "./Monaco.vue";
import Milkdown from "./Milkdown.vue";
//TODO
export default {
    name:"PaperRenderer",
    props: {
        paper: {type:Object,default:()=>{return {}}},
    },
    components: {
        Milkdown,
        Monaco,
        plain: {
            template: "<div>{{data.content}}</div>",
            props: {
                data: Object,
                index: Number,
            },
            data() {
                return {}
            }
        },
        examTitle: {
            template: `
            <div class='paper-title'>
            {{data.content}}
            </div>`,
            props: {
                data: Object,
                index: Number,
            },
            data() {
                return {}
            }
        },
        //应该引入Element UI的组件，但是懒得弄了
        questionSingle: {
            template: `
            <div class='paper-question question-single'>
            <div class='paper-question-content'>{{data.content}}</div>
            <div class='paper-question-answer'>
            <ul><li v-for="item,i in data.choice" @click="choose(item,i)" :class={chosen:this.chosen[i]}><Milkdown :editable="false" :text="item" /></li></ul>
            </div>
            </div>
            `,
            components:{Milkdown},
            data(){
                return {
                    choice:-1,
                    chosen:[]
                };
            },
            props: {
                data: Object,
                index: Number,
            },
            methods: {
                choose(item,i){
                    if(this.choice>=0) this.chosen[this.choice]=false;
                    this.choice=i;
                    this.chosen[i]=true;
                },
                get(){
                    return this.choice;
                }
            },
        },
        questionMultiple: {
            template: `
            <div class='paper-question question-multiple'>
            <div class='paper-question-content'>{{data.content}}</div>
            <div class='paper-question-answer'>
            <ul><li v-for="item,i in data.choice" @click="choose(item,i)" :class={chosen:this.chosen[i]}><Milkdown :editable="false" :text="item" /></li></ul>
            </div>
            </div>
            `,
            data(){
                return {
                    chosen:[]
                }
            },
            props: {
                data: Object,
                index: Number,
            },
            components:{Milkdown},
            methods:{
                choose(item,i){
                    this.chosen[i]=!this.chosen[i];
                },
                get(){
                    return this.chosen;
                }
            }
        },
        questionCode: {
            components: {
                Monaco,
                Milkdown
            },
            template: `
            <div class='paper-question question-code'>
            <div class="paper-question-title">{{data.title}}</div>
            <Milkdown :json='(typeof data.content)==="string"?undefined:data.content' :text='(typeof data.content)==="string"?data.content:undefined' :editable='false' />
            <div class='paper-question-answer'>
            <div class='paper-question-code'>答题区域</div>
            <Monaco v-if="!data.disableCodeArea" :language="data.language" type="edit" ref="code"/>
            </div>
            </div>
            `,
            props: {
                data: Object,
                index: Number,
            },
            methods: {
                get(){
                    return this.$refs.code.text();
                }
            }
        },
        //填空题
        questionText: {
            components: {
                Milkdown
            },
            template: `
            <div class='paper-question question-text'>
            <div class="paper-question-title">{{data.title}}</div>
            <Milkdown :json='(typeof data.content)==="string"?undefined:data.content' :text='(typeof data.content)==="string"?data.content:undefined' :editable='false' />
            <div class='paper-question-answer'>
            <input type="text" ref="answer"/>
            </div>
            </div>
            `,
            props: {
                data: Object,
                index: Number,
            },
            methods: {
                get(){
                    return this.$refs.answer.value();
                }
            }
        }
    },
    data() {
        return {
            questions: [],
            ComponentMapping: {
                plain: "plain",
                title: "examTitle",
                code: "questionCode",
                text:"questionText",
            },
            node: [],
        };
    },
    mounted() {
        if (this.paper) this.Render();
        else console.log("no paper data.");
    },
    computed: {

    },
    methods: {
        chooseComponent(field) {
            let c = this.ComponentMapping;
            let type = field.type,
                subtype = field.subtype;
            console.log(field, type, subtype);
            if (c[type] !== undefined) return c[type];
            else if (type === "select") {
                if (subtype === "single") return "questionSingle";
                else if (subtype === "multiple") return "questionMultiple";
            }
            return "plain";
        },
        Render(paperArray) {
            console.log("start rendering paper.");
            let paperJSON = [];
            if (!paperArray) paperJSON = this.paper;
            else {
                for (let i in paperArray) {
                    paperJSON.push({
                        type: i,
                        content: paperArray[i]
                    });
                }
            }
            this.renderPaper(paperJSON);
            console.log("paper rendering finished.")
        },
        update(index, obj) {
            if (this.paper[index].node) this.$el.removeChild(this.paper[index].node);
            this.paper[index] = obj;

        },
        renderPaper(paperJSON) {
            if (!paperJSON.length) return;
            this.questions = [];
            console.log(paperJSON);
            for (let field of paperJSON) {
                this.questions.push({
                    ...field,
                    type: this.chooseComponent(field)
                });
            }
            //this.renderQuestions();
        },
        //reserved for future use.
        renderQuestions() {
            for (let q of this.questions) {

            }
        },
        getAnswer(which){
            if(which===undefined){
                let result=[];
                for(let i=0;i<this.questions.length;i++){
                    result.push(this.$refs[i].get());
                }
                return result;
            }
            else{
                return this.$refs[which]?this.$refs[which].get():(console.log("no such question as ",which));
            }
        }
    }
};
</script>
<style>
.paper{
    --title-color:var(--pku-red);
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;
    border:1px solid transparent;
    border-radius:1px;
}
.paper:hover{
    border-color:var(--pku-red);
}
.paper>div{
    position: relative;
    padding-bottom:.1em;
    padding-left:.2em;
}
.paper>div:hover{
    background-color:rgba(20,20,20,.1);
    box-shadow:1px 1px 10px rgba(30,20,10,.1);
}
.paper>div:active{
    box-shadow:1px 1px 10px rgba(30,20,10,.5);
}
.paper-title {
  font-size: 2em;
  color: var(--title-color);
  top: 0.2em;
}
.paper-title:hover {
  color: var(--pku-light);
}
.paper-question .milkdown{
    width:100%;
    height: auto;
}
.question-code .milkdown .monaco-container{
    width:100%;
    min-height:1em;
    max-height:100em;
}
.paper-question-answer{
    position:relative;
    width:auto;
}
.paper-question-answer .monaco-container{
    width:auto;
    position:relative;
    margin-right: 5em;
}
</style>
