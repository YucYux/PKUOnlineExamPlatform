<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
//import Monaco from "./components/Monaco.vue";
import QuestionFramework from "./components/QuestionFramework.vue";
import "./assets/global.css";
//一个小小的倒计时
import timer  from "./components/timer.vue";
</script>

<template>
  <div class="main">
    <QuestionFramework/>
    <Monaco language="markdown" size="20px" type="edit"/>
    <timer :time="100"/>
  </div>
</template>

<style>
#app>.main {
  --code-font: "Monaco", "Fira Code", "Consolas", "Andale Mono", "Ubuntu Mono",
    "monospace";
  position: relative;
	background: linear-gradient(#ffb9b9,#8d64fd);
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: top;
  padding:3em;
  font-size:2vw;
  align-items:flex-start;
}
.milkdown{
padding:0;
width:80%;
}
#app>.main > * {
  flex: auto;
  padding: 0;
  margin: 0;
}
.monaco-editor {
  font-family: var(--code-font);
  font-size:1em;
}
body {
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin:0;
  width:100%;
  height:100%;
  padding:0;
  position:absolute;
}
.monaco-container {
  position: relative;
  min-height: 500px;
  min-width: 100px;
}
.timer{
  position:absolute;
  top:0;
  left:50%;
  transform:translateX(-50%);
}
</style>
