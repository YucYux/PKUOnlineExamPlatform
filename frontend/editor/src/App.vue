<template>
  <div class="main">
    <QuestionFramework />
    <PaperRenderer :paper="paper1" />
    <Monaco language="markdown" size="20px" type="edit" />
    <Milkdown :editable="true"/>
    <timer :time="100" />
    <TodoList/>
  </div>
</template>
<script>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
//import Monaco from "./components/Monaco.vue";
//import Milkdown from './components/Milkdown.vue';
import "./assets/global.css";
import PaperRenderer from "./components/PaperRenderer.vue";
import QuestionFramework from "./components/QuestionFramework.vue";
let paper2=[{type: "code",
    title: "11:生日礼物",
    language:"c++",
    "content": `ftiasch 18岁生日的时候，lqp18_31给她看了一个神奇的序列 $$A1, A2, ..., AN$$. 她被允许选择不超过 M 个连续的部分作为自己的生日礼物。

自然地，ftiasch想要知道选择元素之和的最大值。你能帮助她吗？

## 输入

第1行，两个整数 N (1 ≤ N ≤ 105) 和 M (0 ≤ M ≤ 105), 序列的长度和可以选择的部分。

第2行， N 个整数 A1, A2, ..., AN (0 ≤ |Ai| ≤ 104), 序列。

## 输出

一个整数，最大的和。


**样例输入**
\`\`\`\`text
5 2

2 -3 2 -1 2
\`\`\`\`

**样例输出**

\`\`\`text
5
\`\`\`

  `}];
window.paper1 = [
  {
    type: "title",
    content: "一个考试标题",
  },
  {
    type: "select",
    subtype:"single",
    content: "一道单选题",
    choice: ["**2x+1**", "$$\\pi$$", "0.3", "3<sup>2</sup>"],
  },
  {
    type: "select",
    subtype:"multiple",
    content: "一道多选题",
    choice: ["3", "4", "5"],
  },
  {
    type: "text",
    title: "一道填空题",
    content:"请输入答案"
  },
  {
    type: "code",
    title: "一道编程题：11:生日礼物",
    language:"c++",
    content: {
    "type": "doc",
    "content": [
      {
            "type": "heading",
            "attrs": {
                "level": 1,
                "id": ""
            },
            "content": [
                {
                    "type": "text",
                    "text": "11:生日礼物"
                }
            ]
        },
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "ftiasch 18岁生日的时候，lqp18_31给她看了一个神奇的序列 "
                },
                {
                    "type": "math_inline",
                    "attrs": {
                        "value": "A_1, A_2, ..., A_N"
                    }
                },
                {
                    "type": "text",
                    "text": ". 她被允许选择不超过"
                },
                {
                    "type": "math_inline",
                    "attrs": {
                        "value": "\\text{M}"
                    }
                },
                {
                    "type": "text",
                    "text": "个连续的部分作为自己的生日礼物。"
                }
            ]
        },
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "自然地，ftiasch想要知道选择元素之和的最大值。你能帮助她吗？"
                }
            ]
        },
        {
            "type": "heading",
            "attrs": {
                "level": 2,
                "id": ""
            },
            "content": [
                {
                    "type": "text",
                    "text": "输入"
                }
            ]
        },
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "第1行，两个整数 N (1 ≤ N ≤ 105) 和 M (0 ≤ M ≤ 105), 序列的长度和可以选择的部分。"
                }
            ]
        },
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "第2行， N 个整数 A1, A2, ..., AN (0 ≤ |Ai| ≤ 104), 序列。"
                }
            ]
        },
        {
            "type": "heading",
            "attrs": {
                "level": 2,
                "id": ""
            },
            "content": [
                {
                    "type": "text",
                    "text": "输出"
                }
            ]
        },
        {
            "type": "paragraph",
            "content": [
                {
                    "type": "text",
                    "text": "一个整数，最大的和。"
                }
            ]
        },
        {
            "type": "heading",
            "attrs": {
                "level": 2,
                "id": ""
            },
            "content": [
                {
                    "type": "text",
                    "text": "样例输入"
                }
            ]
        },
        {
            "type": "fence",
            "attrs": {
                "language": "",
                "fold": true
            },
            "content": [
                {
                    "type": "text",
                    "text": "5 2\n2 -3 2 -1 2"
                }
            ]
        },
        {
            "type": "heading",
            "attrs": {
                "level": 2,
                "id": ""
            },
            "content": [
                {
                    "type": "text",
                    "text": "样例输出"
                }
            ]
        },
        {
            "type": "fence",
            "attrs": {
                "language": "",
                "fold": true
            },
            "content": [
                {
                    "type": "text",
                    "text": "5"
                }
            ]
        }
    ],
},
    disableCodeArea: false,
  },
];
export default {
	components: {
		QuestionFramework,
		PaperRenderer,
		//Monaco,Milkdown
	//	TodoList
	},
	data(){return{paper1}}
}
</script>


<style>
#app > .main {
  --code-font: "Monaco", "Fira Code", "Consolas", "Andale Mono", "Ubuntu Mono",
    "monospace";
  position: relative;
  background-image:url('assets/circuit-board.svg');
  background-color: rgba(255,255,255,0.9);
  background-size:50%;
  background-repeat:repeat;
  background-blend-mode:lighten;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: top;
  padding: 3em;
  font-size: 2vw;
  align-items: flex-start;
}
.milkdown {
  padding: 0;
  width: 100%;
}
#app > .main > * {
  flex: auto;
  max-width:80vw;
  padding: 0;
  margin: 0;
}
.monaco-editor {
  font-family: var(--code-font);
  font-size: 1em;
}
body {
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  width: 200%;
  height: 100%;
  padding: 0;
  position: absolute;
}
.monaco-container {
  position: relative;
  min-height: 500px;
  min-width: 100px;
}
.timer {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>
