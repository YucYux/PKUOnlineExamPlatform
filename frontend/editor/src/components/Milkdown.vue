<template>
  <VueEditor :editor="editorf" ref="ve" />
</template>

<script>
import { defineComponent } from "vue";
//https://milkdown.dev/#/vue2
//降级根据官方文档改代码，有些没用到的功能可以删掉
import {
  Editor,
  rootCtx,
  defaultValueCtx,
  editorViewOptionsCtx,
  editorViewCtx,
  serializerCtx,
  themeFactory,
} from "@milkdown/core";
//import { createPlugin } from "@milkdown/utils";
//import { nord } from "@milkdown/theme-nord";
import { VueEditor, useEditor } from "@milkdown/vue";
import { commonmark } from "@milkdown/preset-commonmark";
import { tooltip } from "@milkdown/plugin-tooltip";
import { slash } from "@milkdown/plugin-slash";
import { upload, uploadPlugin } from "@milkdown/plugin-upload";
import { diagram } from "@milkdown/plugin-diagram";
import { listener, listenerCtx } from "@milkdown/plugin-listener";
import { history } from "@milkdown/plugin-history";
import { math } from "@milkdown/plugin-math";
import { emoji } from "@milkdown/plugin-emoji";
import { clipboard } from "@milkdown/plugin-clipboard";
import { indent } from "@milkdown/plugin-indent";
//import { shiki } from 'milkdown-plugin-shiki';//outdated plugin
import "material-icons/iconfont/material-icons.css";
//import { collaborative,y } from "@milkdown/plugin-collaborative";
import { gfm } from "@milkdown/preset-gfm";
import "katex/dist/katex.min.css";
import { slots } from "../assets/slots.js";
let tutorial = `# Milkdown指南

## 支持Markdown语法

| Action | Key         |
| :----- | :---------- |
| 常规文本   | Mod-Alt-0   |
| H1     | Mod-Alt-1   |
| H2     | Mod-Alt-2   |
| H3     | Mod-Alt-3   |
| H4     | Mod-Alt-4   |
| H5     | Mod-Alt-5   |
| H6     | Mod-Alt-6   |
| 代码块    | Mod-Alt-c   |
| 删除换行   | Shift-Enter |

## 支持TeX语法

\`$\`以召唤math插件，由KaTeX渲染。

输入\`$\\pi\`就可以得到$\\pi$。

## 快捷键

请去<https://milkdown.dev/#/zh-hans/keyboard-shortcuts>查看。

## 剪贴板

可以复制粘贴markdown语言，其他不行。

## emoji~~😅~~

支持一些emoji，输入\`:\`以选择，输入\`:emoji:\`以打开面板。

## 图表

输入\` \`\`\`mermaid \`以打开

\`\`\`mermaid
pie
    title Top 5 Languages
    "Python" : 20
    "Java" : 20
    "C" : 20
    "C++" :  20
	"Javascript":10
\`\`\`

访问<https://mermaid-js.github.io/mermaid/#/>查看。

`;
let fileHandler = {
  openImage(img) {
    //This is a blank function.
    return "data:image/png;base64," + window.btoa(img);
  },
};
fileHandler.uploader = async (files, schema) => {
  const images = [];

  for (let i = 0; i < files.length; i++) {
    const file = files.item(i);
    if (!file) {
      continue;
    }

    // You can handle whatever the file type you want, we handle image here.
    if (!file.type.includes("image")) {
      continue;
    }

    images.push(file);
  }

  const nodes = await Promise.all(
    images.map(async (image) => {
      const src = await fileHandler.openImage(image);
      const alt = image.name;
      return schema.nodes.image.createAndFill({
        src,
        alt,
      });
    })
  );

  return nodes;
};
export default defineComponent({
  name: "Milkdown",
  components: {
    VueEditor,
  },
  props: {
    text: { type: String, default: tutorial },
    editable: { type: Boolean, default: true },
  },
  setup(props) {
    console.log(props);
    let editor = Editor.make()
      .config((ctx) => {
        ctx.set(editorViewOptionsCtx, {
          editable() {
            return props.editable;
          },
        });
        ctx.set(defaultValueCtx, props.text);
      })
      .use(
        themeFactory({
          slots,
        })
      )
      .use(gfm)
      .use(commonmark.headless())
      //   .use(listener)
      //.use(        shiki({       theme:"material-default"        }))
      /*
        'css-variables'
  | 'dark-plus'
  | 'dracula-soft'
  | 'dracula'
  | 'github-dark-dimmed'
  | 'github-dark'
  | 'github-light'
  | 'light-plus'
  | 'material-darker'
  | 'material-default'
  | 'material-lighter'
  | 'material-ocean'
  | 'material-palenight'
  | 'min-dark'
  | 'min-light'
  | 'monokai'
  | 'nord'
  | 'one-dark-pro'
  | 'poimandres'
  | 'slack-dark'
  | 'slack-ochin'
  | 'solarized-dark'
  | 'solarized-light'
  | 'vitesse-dark'
  | 'vitesse-light'
  */
      .use(history)
      .use(indent)
      .use(slash)
      .use(math)
      .use(emoji)
      .use(tooltip)
      .use(clipboard)
      .use(
        upload.configure(uploadPlugin, {
          uploader: fileHandler.uploader,
        })
      )
      .use(diagram)
    let ls = {
      markdown: [],
      doc: [console.log],
    };
    editor
      .config(function (ctx) {
        ctx.set(listenerCtx, ls);
      })
      .use(listener);
    let editorf = useEditor((root) => {
      return editor.config((ctx) => {
        ctx.set(rootCtx, root);
      });
    });
    return {
      editor,
      ls,
      editorf,
      listeners: [],
      ...props,
    };
  },
  mounted() {
    window.milkdown = this;
    this.ls.markdown.push(this.attention);
    if (this.doc) {
      let that = this;
      this.bind(function (data) {
        that.$emit("change", data);
      });
    }
  },
  emits: ["change"],
  methods: {
    async md() {
      return this.editor.action((ctx) => {
        const editorView = ctx.get(editorViewCtx);
        const serializer = ctx.get(serializerCtx);
        return serializer(editorView.state.doc);
      });
    },
    bind(callback) {
      this.listeners.push(callback);
    },
    attention(data, type) {
      if (type === "markdown") {
        this.markdown = data();
        for (let i of this.listeners) i(this.markdown);
      } else {
        this.data = data();
        for (let i of this.listeners) i(this.data);
      }
    },
    edit(bool) {
      if (arguments.length == 0) bool = this.editable;
      this.editor.config((ctx) => {
        ctx.set(editorViewOptionsCtx, {
          editable() {
            return bool;
          },
        });
      });
      this.editable = !this.editable;
    },
  },
});
</script>
<style>
.milkdown {
  position: relative;
  min-width: 3em;
  min-height: 1em;
  --bgc: 240, 234, 230;
  --opacity: 0.5;
  --shadowc: 20, 30, 20;
  --shadowo: 0.4;
  --shadow: rgba(var(--shadowc), var(--shadowo));
  --color: #282828;
  --bgcolor: rgba(var(--bgc), var(--opacity));
  --code-bgc: rgba(220, 220, 245, 0.8);
  font-family: "Roboto", "Helvetica", "Roboto", "HelveticaNeue-Light",
    "Helvetica Neue Light", "Helvetica Neue", "Helvetica", "Arial", "Lucida Grande",
    "sans-serif";
  --radius: 0px;
  --surface: 208, 228, 249;
  --primary: 100, 150, 220;
  --secondary: 185, 196, 96;
  --neutral: 150, 150, 150;
  --background: 240, 240, 240;
  --text: #000000;
}
.editor .code-fence {
  background-color: var(--code-bgc);
}
.editor input,
.tooltip-input input {
  height: 100%;
}
.milkdown input:focus,
.tooltip-input input:focus {
  background-color: transparent;
  background: transparent;
}
.milkdown input {
  caret-color: var(--text);
}
.editor label {
  margin: 0;
  margin-top: 0.1em;
  margin-bottom: 0.1em;
}
.editor ul.bullet-list {
  margin: 0;
}
.editor .code-inline {
  background-color: var(--code-bgc);
  vertical-align: middle;
  filter: invert(1);
  padding: 0.1em;
  padding-left: 0.2em;
  padding-right: 0.2em;
  border-radius: 0.2em;
}
.editor .blockquote,
blockquote {
  padding-left: 2em;
  border-left: 4px solid rgba(var(--primary), 1);
}
.milkdown .editor {
  background-color: transparent;
  /*box-shadow: 0 0 2px var(--shadow);*/
  border-radius: 0.1em;
  color: var(--color);
  padding-left: 1em;
  padding-right: 1em;
  padding-top: 0.1em;
}
.editor .slash-dropdown-item {
  height: 1em;
}
.editor:hover {
  --opacity: 0.8;
  --shadowc: 10, 10, 10;
  --shadowo: 0.6;
  --bgc: 230, 230, 220;
  --bgcolor: rgb(var(--bgc), var(--opacity));
}
::selection {
  background-color: rgba(0, 0, 0, 0.651) !important;
  color: rgba(255, 255, 255, 0.925);
}
.editor .code-fence_select-wrapper {
  opacity: 0;
  transition: opacity var(--transition);
  position: absolute;
  right: 0;
  top: inherit;
}
.editor .slash-dropdown {
  transition: opacity var(--transition);
}
.editor .code-fence:hover > .code-fence_select-wrapper {
  opacity: 1;
}
.editor:focus {
  --shadowc: 110, 10, 10;
  --shadowo: 1;
  --shadow: rgba(var(--shadowc), var(--shadowo));
}
.editor .paragraph {
  margin: 0;
  margin-top: 0.1em;
  margin-bottom: 0.1em;
}
.editor p {
  padding: 0;
  margin: 0;
  /*filter: drop-shadow(0 0 3px var(--shadow));*/
}
.editor p.empty-node {
  --neutral: 150, 150, 150;
}
.editor .code-fence > pre {
  max-height: 20em;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0.2em;
  padding: 0;
}
h1::before,
h2::before,
h3::before,
h4::before,
h5::before,
h6::before {
  content: var(--level);
  position: absolute;
  opacity: 0;
  left: -1em;
  font-size: 1rem;
  border: 1px solid black;
  height: 1em;
  text-align: center;
  line-height: 1em;
  padding: 0.1em;
  background-color: black;
  color: white;
  pointer-events: none;
}
h1:hover::before,
h2:hover::before,
h3:hover::before,
h4:hover::before,
h5:hover::before,
h6:hover::before,
h1:focus::before,
h2:focus::before,
h3:focus::before,
h4:focus::before,
h5:focus::before,
h6:focus::before {
  opacity: 1;
}
h1 {
  --level: "h1";
}
h2 {
  --level: "h2";
}
h3 {
  --level: "h3";
}
h4 {
  --level: "h4";
}
h5 {
  --level: "h5";
}
h6 {
  --level: "h6";
}
</style>
