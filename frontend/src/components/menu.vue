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
    <registerButton class= "registerbutton" ></registerButton>
    <div v-if="username == 'none'">
      <loginButton class= "loginbutton" ></loginButton>
    </div>
    <div v-else>
      <logoutButton class= "logoutbutton" ></logoutButton>
    </div>
    
  </Menu>
</template>

<script>

import loginButton from './login.vue'
import registerButton from './register.vue'
import logoutButton from './logout.vue'
import api from '../api.js'
import store from '../store'

export default {
  data () {
    return {
      theme1: 'dark'
    }
  },
  computed: {
    username: function() {
      return store.getters.getUsername;
    }
  },
  components: {
    loginButton,
    registerButton,
    logoutButton
  },
  methods: {
    onSelect(pageName) {

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
.loginbutton{
position: relative;
top:0%;
float: right;
margin-right: 10px;
}
.registerbutton{
position: relative;
top:0%;
float: right;
margin-right: 10px;
}
.logoutbutton{
position: relative;
top:0%;
float: right;
margin-right: 10px;
}
</style>
