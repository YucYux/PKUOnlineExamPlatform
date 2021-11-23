<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
//import Monaco from "./components/Monaco.vue";
//import QuestionFramework from "./components/QuestionFramework.vue";
import "./assets/global.css";
//一个小小的倒计时
//import timer  from "./components/timer.vue";
import PaperRenderer from "./components/PaperRenderer.vue";
let paper = [
  {
    type: "title",
    content: "一个考试标题",
  },
  {
    type: "select",
    subtype:"single",
    content: "一道单选题",
    choice: ["**2x+1**", "$$\\pi$$", "0.3", "<pre>3\n</pre>"],
  },
  {
    type: "select",
    subtype:"multiple",
    content: "一道多选题",
    choice: ["3", "4", "5"],
  },
  {
    type: "code",
    title: "11:生日礼物",
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
            "type": "fence2",
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
            "type": "fence2",
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
</script>

<template>
  <div class="main">
    <QuestionFramework />
    <Monaco language="markdown" size="20px" type="edit" />
    <timer :time="100" />
    <PaperRenderer :paper="paper" />
  </div>
</template>

<style>
#app > .main {
  --code-font: "Monaco", "Fira Code", "Consolas", "Andale Mono", "Ubuntu Mono",
    "monospace";
  position: relative;
  background: linear-gradient(#ffb9b9, #8d64fd);
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
  width: 80%;
}
#app > .main > * {
  flex: auto;
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
  width: 100%;
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
