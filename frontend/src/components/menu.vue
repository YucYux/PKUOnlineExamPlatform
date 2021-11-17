<template>
  <Menu mode="horizontal" :theme="theme1" active-name="1" @on-select="onSelect">
    <div class="layout-logo"><span>北大文计考试平台</span></div>
    <MenuItem name="index" to = '/index'>
    <Icon type="md-home"/>
    主页
    </MenuItem>
    <MenuItem name="contest" to = '/contest'>
    <Icon type="md-trophy" />
    考试
    </MenuItem>
    <MenuItem name="grade" to = '/grade'>
    <Icon type="md-stats" />
    成绩
    </MenuItem>
    <MenuItem name="control" to = '/control'>
    <Icon type="md-construct" />
    设置
    </MenuItem>
    <MenuItem name="classes" to = '/classes'>
    <Icon type="md-contacts" />
    班级
    </MenuItem>
    <loginButton class= "logbutton" ></loginButton>
  </Menu>
</template>

<script>

import loginButton from './login.vue'
import api from '../api.js'

export default {
  data () {
    return {
      theme1: 'dark'
    }
  },
  computed: {
  },
  components: {
    loginButton
  },
  methods: {
    onSelect(pageName) {
      if(pageName == 'classes') {
        api.APIclassesList();
      }
    }
  }
}
</script>

<style>
Menu {
  z-index: 99999;
}

.layout-logo{
position: relative;
width: 147px;
height: 57px;
background: #5b6270;
border-radius: 3px;
float: left;
margin-right: 10px;
margin-top: 3px;
}
.layout-logo  span {
color: #A71C1C;
font-size: 18px;
font-weight: bold;
font-family: "STSong";
text-align: top;
}
.logbutton{
position: relative;
top:0%;
float: right;
}
</style>
