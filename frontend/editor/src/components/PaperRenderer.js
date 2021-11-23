import {
    defineComponent,
    createApp,
    h
} from "vue";
import Milkdown from "./Milkdown.vue";
import Monaco from "./Monaco.vue";
function renderHTML(content){
    return marked.parse(content);
}
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
        questionSingle: {
            template: `
            <div class='paper-question question-single'>
            <div class='paper-question-content'>{{data.content}}</div>
            <div class='paper-question-answer'>
            </div>
            </div>
            `,
            props: {
                data: Object,
                index: Number,
            },
        },
        questionMultiple: {
            template: `
            <div class='paper-question question-multiple'>
            <div class='paper-question-content'>{{data.content}}</div>
            <div class='paper-question-answer'>
            </div>
            </div>
            `,
            props: {
                data: Object,
                index: Number,
            },
        },
        questionCode: {
            components: {
                Monaco,
                Milkdown
            },
            template: `
            <div class='paper-question question-code'>
            <Milkdown :json='data.content' :editable='false' />
            <div class='paper-question-answer'>
            <div class='paper-question-code'>答题区域</div>
            <Monaco v-if="!data.disableCodeArea" :language="data.language" :type="'edit'"/>
            </div>
            </div>
            `,
            props: {
                data: Object,
                index: Number,
            },
            methods:{
                renderHTML(content){
                    return marked.parse(content);
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
                code: "questionCode"
            },
            node: [],
        };
    },
    mounted() {
        window.renderer = this;
        if (this.paper) this.Render();
        else console.log("no paper data.");
    },
    computed:{

    },
    methods: {
        chooseComponent(field) {
            let c = this.ComponentMapping;
            let type = field.type,
            subtype = field.subtype;
            console.log(field,type,subtype);
            if (c[type] !== undefined) return c[type];
            else if (type === "select") {
                if (subtype === "single") return "questionSingle";
                else if (subtype === "multiple") return "questionMultiple";
            }
            return "plain";
        },
        Render() {
            console.log("start rendering paper.");
            this.renderPaper();
            console.log("paper rendering finished.")
        },
        update(index, obj) {
            if (this.paper[index].node) this.$el.removeChild(this.paper[index].node);
            this.paper[index] = obj;

        },
        renderPaper() {
            if (!this.paper || !this.paper.length) return;
            for (let field of this.paper) {
              this.questions.push({...field,type:this.chooseComponent(field)});
            }
            this.renderQuestions();
        },
        renderQuestions() {
            for (let q of this.questions) {

            }
        }
    }
});