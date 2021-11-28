//TODO
import {
    defineComponent
} from "vue";
import Milkdown from "./Milkdown.vue";
import Monaco from "./Monaco.vue";
//TODO
export default defineComponent({
    props: {
        paper: Object,
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
    data(props) {
        return {
            ...props,
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
});