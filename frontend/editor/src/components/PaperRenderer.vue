<template>
  <div class="paper transition">
  <component v-for="question,i in questions" :is="question.type" :data="question" :index="i" :ref="i"/>
  </div>
</template>
<script src="./PaperRenderer.js"></script>
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
