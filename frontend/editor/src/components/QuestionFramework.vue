<template>
  <div class="tiptap question-framework" ref="main">
    <div class="question-item">
      <div v-if="editor.title" class="question-title">标题Title</div>
      <div v-if="editor.title.editor" class="question-input question-input-title">
        <editor-content :editor="editor.title.editor" />
        <div class="character-count">
          {{ editor.title.editor.getCharacterCount() }}/{{ limit }}
        </div>
      </div>
    </div>
    <div class="question-item">
      <div class="question-title">标签Tag</div>
      <div v-if="editor.tag.editor" class="question-input question-input-tag">
        <editor-content :editor="editor.tag.editor" />
      </div>
    </div>
    <div class="question-item">
      <div class="question-title">题型Type</div>
      <div v-if="editor.type" class="question-input question-input-type">
        <button v-for="item,i in editor.type.buttons" @click="choose(item,i)" :class="{chosen:item.chosen}">{{item.name}}</button>
      </div>
    </div>
    <div class="question-item">
      <div class="question-title">内容Content</div>
      <div v-if="editor.content.editor" class="question-input question-input-content">
        <Milkdown @change="contentChange" ref="contentEditor"/>
      </div>
    </div>
    <div class="question-item">
      <div class="question-title">选项Choice</div>
      <div v-if="editor.choice.editor" class="question-select question-input-select">
      <editor-content :editor="editor.choice.editor"/>
      </div>
    </div>
    <div class="question-item">
      <div class="question-title">判题函数Compute</div>
      <div v-if="editor.compute.editor" class="question-input question-input-compute">
        <Monaco language="javascript" ref="computeEditor" :size="getSize" type="edit"/>
      </div>
    </div>
  </div>
</template>

<script>
//TODO : 改成import {Vue} from "vue";
import { defineComponent } from "vue";
//https://tiptap.dev/installation/vue2
//TODO : 改成...-vue2
import { Editor, EditorContent,VueNodeViewRenderer } from '@tiptap/vue-3';
import { Extension } from '@tiptap/core';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import HardBreak from '@tiptap/extension-hard-break';
import Heading from '@tiptap/extension-heading';
import History from '@tiptap/extension-history';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Bold from "@tiptap/extension-bold";
import TaskList from "@tiptap/extension-task-list";
import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import CharacterCount from "@tiptap/extension-character-count";

import Monaco from "./Monaco.vue";
import Milkdown from "./Milkdown.vue";
//改成Vue.component("QuestionFramework",{...})
export default defineComponent({
  name: "QuestionFramework",
  components: {
    EditorContent,
    Milkdown,
    Monaco,
  },

  data() {
    let editor={
      title:{

      },
      type:{
        buttons:[
          {
            name:"单项选择题",
            hasChoice:true,
            chosen:false,
          },
          {
            name:"多项选择题",
            hasChoice:true,
            chosen:false,
          },
          {
            name:"填空题",
            chosen:false,
          },
          {
            name:"编程题",
            chosen:true,
          },
        ],
        chosen:3
      },
      tag:{
      },
      content:{
      },
      choice:{},
      compute:{},
    }
    return {
      editor,
      limit:100
      };
  },

  mounted() {
    let ed=this.editor;
    ed.title.editor = new Editor({
      extensions: [
        Paragraph,
        Document,
        Placeholder.configure({
          placeholder: "请输入"+this.limit+"字以内的标题，选择题将隐藏该内容",
        }),
        CharacterCount.configure({
          limit: this.limit||100,
        }),
        Text,
      ],
      content: "<p>",
    });

    ed.tag.editor = new Editor({
      extensions: [
        Paragraph,
        Document,
        Text,
        TaskList,
        TaskItem,
      ],
      content: `
        <ul data-type="taskList">
          <li data-type="taskItem" data-checked="true"></li>
        </ul>
      `,
    });
    ed.content.editor=true;
    ed.compute.editor=true;
  },
  computed:{
    getSize(){
      return getComputedStyle(this.$el).fontSize;
    }
  },
  methods: {
    choose(item,i){
      for(let j of this.editor.type.buttons){
        if(j.chosen) j.chosen=false;
      }
      item.chosen=true;
      let ed=this.editor;
      if(item.hasChoice) ed.choice.editor=new Editor({
        extensions: [
        Document,
        Paragraph,
        ListItem,
        BulletList,
        Text,
      ],
      content: `
        <ul><li></li></ul>
      `,
      });
      else if(ed.choice.editor){
        //应该要保存一下
        ed.choice.editor.destroy();
        delete ed.choice.editor;
      }
      ed.type.content=i;
    },
    contentChange(data) {
      this.editor.content.content=data;
    },
    setVaule(target, value) {
      /*json or html
      {
      "type": "doc",
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "text",
              "text": "Example Text"
            }
          ]
        }
      ]
    }
    */
      this.editor[target].editor.setContent(value);
    },
    //输出一个Object
    //应该把数据与类合并到一起，而不是分开来写，但是懒得改了
    serialize() {
      let ed=this.editor;
      return {
        title: ed.title.editor?ed.title.editor.getText():null,
        type: ed.type.buttons[ed.type.chosen].name,
        choice: ed.choice.editor?ed.choice.editor.getText().split("\n"):null,
        tag: ed.tag.editor?ed.tag.editor.getText().split("\n"):[],
        content: ed.content.content||null,
        compute:ed.compute.editor?this.$refs.computeEditor.text():null,
      };
    },
  },
  beforeUnmount() {
    for(let i in this.editor){
      let item=this.editor[i];
      if(item.editor){
        if(item.editor.destroy){
          item.editor.destroy();
        }
      }
    }
  },
});
</script>

<style>
.question-item ul[data-type="taskList"] li {
  display: inline-flex;
  align-items: center;
  background: #948dea8c;
  margin: 0.1em;
  padding-right: 0.3em;
  border-radius: 0.2em;
  justify-content: center;
  justify-items: center;
}
.question-title {
  color: #868e96;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1em;
  letter-spacing: 0.1em;
}
.question-input-title {
  font-size: 2em;
}
.question-item {
  position: relative;
  margin: 0 0 1rem;
  padding: 0 1rem;
  border-radius: 5px;
  border: 1px solid #e9ecef;
  transition: 0.1s all ease-in-out;
  --hover-color: var(--pku-red);
}
.question-item:hover {
  border-color: var(--hover-color);
  }

.question-item p {
  margin: 0.1em;
}
.question-item div:focus-visible {
  outline: transparent;
}
.question-item div:focus {
  border-color: var(--hover-color);
}
pre {
  font-family: Monaco, monospace;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;

  code {
    color: inherit;
    padding: 0;
    background: none;
    font-size: 0.8rem;
  }
}
.question-item .character-count {
  position: absolute;
  right: 0;
  bottom: 0;
  text-align: right;
  opacity: 0.8;
  font-size: 0.5em;
  padding: 0.2em;
}
.question-item .is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color);
  font-size: 0.8em;
  opacity: 0.5;
  pointer-events: none;
  max-height: 100%;
  position: absolute;
  width: 100%;
}
.question-item button{
      border: none;
    font-size: 1em;
    margin-left:.2em;
  color:black;
  background:transparent;
  border:var(--pku-light) 1px solid;
  border-radius:2px;
    padding:.1em;
}
.question-item button.chosen{
  background: var(--pku-light);
  color: white;
}
.question-item .question-select ul{
  list-style: upper-alpha;
}
</style>
