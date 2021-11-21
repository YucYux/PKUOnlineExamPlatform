<template>
<div class="timer" @mousemove="move" @click.prevent="click"><span>{{text}}</span></div>
</template>
<script src="./timer.js"></script>
<style>
.timer>span{
    font-family: "LCD AT&T Phone Time/Date";
    color: transparent;
    background: radial-gradient(circle, rgb(5 5 6) 0%, rgb(5 5 6) 21%, rgb(78 78 78) 100%);
    -webkit-background-clip: text;
    transition:background .1s linear;
}
.timer{
    padding-left: 0.2em;
    padding-right: 0.2em;
    flex:0;
}
</style>