//It seems that this plugin is missing.
//import {RemarkPlugin} from '@milkdown/core';
import Monaco from "./Monaco.vue";
//import {
//    createApp
//} from "vue";
import directive from 'remark-directive';
import {
    InputRule,textblockTypeInputRule
} from 'prosemirror-inputrules';
import {
    AtomList,
    createNode
} from "@milkdown/utils";
/*
This is a fairly straightforward editor built from Monaco.vue.
In case other type of editor is used, don't forget to change mount()
 */
class codeEditor {
    constructor() {
        this.dom = null;
        this.content = "";
        this.mounted = false;
        this.parent = document.createElement("div");
        this.mount();
    }
    mount() {
        if (this.mounted) return;
        this.app = createApp({
            components: {
                Monaco
            },
            date() {
                return {
                    content: this.content
                };
            },
            template: "<Monaco :content='content' type='show' ref='editor' size='20px'/>"
        }).mount(this.parent);
        this.mounted = true;
        return this;
    }
    get() {
        return this.app.$refs.editor.text();
    }
    set(x) {
        this.app.$refs.editor.text(x);
        this.app.$refs.editor.resize(null,
        this.app.$refs.editor.height()
        );
        return this;
    }
}
/*
warning : abandoned code below.
Unless you want to learn from prosemirror and milkdown, ignore them.
*/
const codeeditor = createNode(() => ({
    id: "codes",
    type: "textDirective",
    schema: () => ({
        inline: false,
        attrs: {
            data: ""
        },
        group: 'code',
        marks: '',
        parseDOM: [{
            tag: 'codes',
            getAttrs: (dom) => {
                if (!(dom instanceof HTMLElement)) {
                    throw new Error();
                }
                return {
                    data: dom.getAttribute('innerText')
                };
            },
        }, ],
        toDOM(node) {
            console.log(node, this, arguments);
            window.nd = node
            let a = document.createElement("pre");
            a.innerHTML = "1";
            return a;
            return ['codes', {
                ...node.attrs,
                class: 'codes',
                innerHTML: 'ccco'
            }, 0]
        },
        parseMarkdown: {
            match: (node) => node.type === 'textDirective' && node.name === 'codes',
            runner: (state, node, type) => {
                console.log("parsemd", this);
                state.addNode(type, {
                    data: (node.innerText)
                });
            },
        },
        toMarkdown: {
            match: (node) => node.type.name === "codes",
            runner: (state, node) => {
                console.log("tomd", this);
                state.addNode('textDirective', undefined, undefined, {
                    name: 'codes',
                    attributes: {
                        data: node.attrs.data
                    },
                });
            },
        }
    }),
    inputRules: (nodeType) => [
        new InputRule(/````([^`]*)/, (state, match, start, end) => {
            const {
                tr
            } = state;
            if (match[0]) {
                tr.replaceWith(start, end, nodeType.create({
                    data: match[1]
                }));
            }

            return tr;
        }),
    ],
    remarkPlugins: () => [directive],
}));

//export default createNode(()=>new codeEditor)

/*made by zzs ,copied from @milkdown/plugin-emoji */
const monacoditor = createNode((utils) => {
    return {
        id: 'codeeditor',
        schema: () => ({
            group: 'block',
            inline: false,
            selectable: false,
            marks: '',
            attrs: {
                content: {
                    default: '',
                },
            },
            parseDOM: [{
                tag: 'div[data-type="codeeditor"]',
                getAttrs: (dom) => {
                    if (!(dom instanceof HTMLElement)) {
                        throw new Error();
                    }
                    return {
                        content: dom.editor.get()
                    };
                },
            }, ],
            toDOM: (node) => {
                console.log("to dom", node);
                let parent = document.createElement('div');
                parent.dataset.type = 'codeeditor';
                if (node.attrs.className) {
                    parent.classList.add(node.attrs.className);
                }
                parent.classList.add('monaco-container');
                let editor = new codeEditor;
                editor.content = node.attrs.content;
                editor.mount(parent);
                parent.editor = editor;
                return {
                    dom: parent
                };
            },
            parseMarkdown: {
                match: ({
                    type
                }) => type === 'codeeditor',
                runner: (state, node, type) => {
                    this.parent = this.parent || document.createElement('div');
                    console.log("parse md", this);
                    this.content = node.value;
                    this.editor.content = this.content;
                    this.editor.mount(this.parent);
                    state.addNode(type, {
                        html: node.value
                    });
                },
            },
            toMarkdown: {
                match(node) {
                    return node.type.name === 'codeeditor'
                },
                runner(state, node) {
                    console.log("to md");
                    return state.addNode("code", undefined, node.value);
                },
            },
        }),
        inputRules: (nodeType) => [
            new InputRule(/````([^`]*)/, (state, match, start, end) => {
                const {
                    tr
                } = state;
                if (match[0]) {
                    tr.replaceWith(start, end, nodeType.create({
                        data: match[1]
                    }));
                }

                return tr;
            }),
            new InputRule(/^(\/code)$/, (state, match, start, end) => {
                return state.tr;
                const content = match[0];
                if (!content) return null;
                const got = nodeEmoji.get(content);
                if (!got || content.includes(got)) return null;

                const html = parse(got);

                return state.tr.replaceRangeWith(start, end, nodeType.create({
                    html
                })).scrollIntoView();
            }),
        ],
        remarkPlugins: () => [],
        prosePlugins: () => [],
    };
});
/*made by zzs, specially adapted parser to build editor from original markdown syntax
Unfortunately, my node was unable to override commonmark plugin.
*/
const m = createNode((utils) => {
    return {
        id: 'fence',
        type: "code",
        schema: () => ({
            group: 'block',
            inline: false,
            selectable: false,
            marks: '',
            code: true,
            content: 'text*',
            defining: true,
            attrs: {
                content: {
                    default: '',
                },
            },
            parseDOM: [{
                tag: 'div[data-type="codeeditor"]',
                getAttrs: (dom) => {
                    if (!(dom instanceof HTMLElement)) {
                        throw new Error();
                    }
                    return {
                        content: dom.editor.get()
                    };
                },
            }, ],
            toDOM: (node) => {
                console.log(node);
                let editor = new codeEditor;
                editor.set(node.textContent);
                let parent = editor.parent;
                parent.dataset.type = 'codeeditor';
                if (node.attrs.className) {
                    parent.classList.add(node.attrs.className);
                }
                parent.classList.add('monaco-container');
                return {
                    dom: parent
                };
            },
            parseMarkdown: {
                match: ({
                    type
                }) => type === 'code',
                runner: (state, node, type) => {
                    console.log("parse md", node, type);
                    const language = node.lang;
                    const value = node.value;
                    state.addNode(type, {
                        language
                    }, value);
                },
            },
            toMarkdown: {
                match(node) {
                    return node.type.name === 'fence2'
                },
                runner(state, node) {
                    console.log("to md");
                    return state.addNode("code", undefined, node.value, {
                        language: node.attrs.lang
                    });
                },
            },
            inputRules: (nodeType) => [
            new InputRule(/````([^`]*)/, (state, match, start, end) => {
                const {
                    tr
                } = state;
                if (match[0]) {
                    tr.replaceWith(start, end, nodeType.create({
                        language: match[1],

                    }));
                }

                return tr;
            }),
            textblockTypeInputRule(inputRegex, nodeType, ([ok, language]) => {
                if (!ok)
                    return;
                return { language };
            }),
        ],
        }),
    };
});
export default AtomList.create([m()]);