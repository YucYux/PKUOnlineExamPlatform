<template>
  <div class="tiptap question-framwork" ref="tp">
    <div class="question-item">
      <div class="question-title">标题Title</div>
      <div v-if="title" class="question-input question-input-title">
        <editor-content :editor="title" />
        <div class="character-count" v-if="title">
          {{ title.getCharacterCount() }}/{{ limit }}
        </div>
      </div>
    </div>
    <div class="question-item">
      <div class="question-title">标签Tag</div>
      <div v-if="tag" class="question-input question-input-tag">
        <editor-content :editor="tag" />
      </div>
    </div>
    <div class="question-item">
      <div class="question-title">题型Type</div>
      <div v-if="type" class="question-input question-input-type">
        <editor-content :editor="type" />
      </div>
    </div>
    <div class="question-item">
      <div class="question-title">内容Content</div>
      <div v-if="content" class="question-input question-input-content">
        <Milkdown @change="change" />
      </div>
    </div>
    <div class="question-item">
      <div class="question-title">选项Choice</div>
      <div v-if="choice" class="question-input question-input-choice">
      <editor-content :editor="choice"/>
      </div>
    </div>
    <div class="question-item">
      <div class="question-title">简答题的回答区域Sentence</div>
      <div v-if="sentence" class="question-input question-input-sentence">
      <div></div>
      </div>
    </div>
    <div class="question-item">
      <div class="question-title">判题函数Compute</div>
      <div v-if="compute" class="question-input question-input-compute">
        <vueList/><!-- todo: import a list component that supports changing of computation mode:1.match,2.regExp,3.function written in js,4.function written in python.default set to match if -->
        <Monaco language="javascript" content="
function compute(answer){
  let correctAnswer='';
  return answer===correctAnswer;
}"
               ref="computeFunction"
              />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
//https://tiptap.dev/installation/vue2
//降级请根据官方文档改代码
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
/*
数据结构：题目{
  类型type:选择题（单选题、多选题）、简答题（短回答、长回答）、编程题,
    标题title:"",其中选择题最终不会显示标题；标题可以作为主键来索引
    内容content:[
      {type,content}
    ],一个json序列，其中每个对象都是一种组件：富文本组件、
    choice:["A","B","C","D"],
    answer:0,
    score:function(answer){return(this.answer===answer)}
    id:354848959,
    tag:["single","python","easy"]
}






*/
export default defineComponent({
  name: "QuestionFramework",
  components: {
    EditorContent,
    Milkdown,
    Monaco,
  },

  data() {
    return {
      title: null,
      type: null,
      tag:null,
      compute:null,
      limit: 100,
      content: null,
    };
  },

  mounted() {

    this.title = new Editor({
      extensions: [
        Paragraph,
        Document,
        Placeholder.configure({
          placeholder: "请输入100字以内的标题，选择题将隐藏该内容",
        }),
        CharacterCount.configure({
          limit: this.limit,
        }),
        Text,
      ],
      content: "<p>",
    });

    this.tag = new Editor({
      extensions: [
        Paragraph,
        Document,
        Text,
        TaskList,
        TaskItem,
      ],
      content: `
        <ul data-type="taskList">
          <li data-type="taskItem" data-checked="true">tag1</li>
        </ul>
      `,
    });

    this.type = new Editor({
      extensions: [
        Document,
        Paragraph,
        Text,
        Bold,
      ],
      content: `
        <p>type=</p>
      `,
    });

    this.content = "...";
    //console.log(this.$refs);
    //this.$refs.computeFunction.listeners.push(this.changed);
    this.compute="required";
  },
  methods: {
    change(data) {
      this.content = data;
    },
    changed(data){
      this.compute=data;
    },
    set(target, value) {
      //json or html
      /* {
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
      this[target].setContent(value);
    },
    //输出一个Object
    serialize() {
      return {
        title: yDocToProsemirrorJSON(this.ydoc, "title"),
        type: yDocToProsemirrorJSON(this.ydoc, "type"),
        tags: yDocToProsemirrorJSON(this.ydoc, "tags"),
        content: { content: this.content, type: "content" },
        //todo: add full support, and replace yDoc format with a customized format.
      };
    },
  },
  beforeUnmount() {
    this.title.destroy();
    this.type.destroy();
    this.tag.destroy();
  },
});
</script>

<style lang="scss">
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul[data-type="taskList"] {
    list-style: none;
    padding: 0;

    li {
      display: inline-flex;
      align-items: center;

      > label {
        flex: 0 0 auto;
        user-select: none;
      }

      > div {
        display: inline;
        flex: 1 1 auto;
      }
    }
  }
}
.ProseMirror ul[data-type="taskList"] li {
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
  &:hover {
    border-color: var(--hover-color);
  }

  &--title {
    font-size: 1.5rem;
  }

  &--json {
    background: #0d0d0d;
    color: #fff;
    font-size: 0.8rem;
  }
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
</style>
