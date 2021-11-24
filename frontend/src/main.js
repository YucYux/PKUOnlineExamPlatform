// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable */
import Vue from 'vue'
import VueRouter from 'vue-router'
import app from './App.vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
import store from './store'
import api from './api.js'

Vue.use(VueRouter)
Vue.use(ViewUI)
/* eslint-disable no-new */
const Routers = [{
    path: '/index',
    component: (resolve) => require(['./router/views/index.vue'], resolve)
  },
  {
    path: '/contest',
    component: (resolve) => require(['./router/views/contest.vue'], resolve)
  },
  {
    path: '/control',
    component: (resolve) => require(['./router/views/control.vue'], resolve)
  },
  {
    path: '/grade',
    component: (resolve) => require(['./router/views/grade.vue'], resolve)
  },
  {
    path: '/coding',
    component: (resolve) => require(['./router/views/coding.vue'], resolve)
  },
  {
    path: '/classes',
    component: (resolve) => require(['./router/views/classes.vue'], resolve),
    beforeEnter: (to, from, next) => {
      api.APIclassesList().
      then(
        result => {next();}, 
        error  => {this.$Notice.error({title: '班级列表获取失败', desc: ''})});
      next();
    }
  },
  {
    path: '/classdetail',
    component: (resolve) => require(['./router/views/classdetail.vue'], resolve),
    children: [
      {
        path: 'membersList',
        component: (resolve) => require(['./components/classmember_list.vue'], resolve),
        beforeEnter: (to, from, next) => {
          api.APIclassInfo().
          then(
            result => {next();}, 
            error  => {this.$Notice.error({title: '班级详情页获取失败', desc: ''})});
          next();
        },
      },
      {
        path: 'setContest',
        component: (resolve) => require(['./components/set_contest.vue'], resolve)
      },
      {
        path: 'setMembers',
        component: (resolve) => require(['./components/set_members.vue'], resolve)
      },
      {
        path: 'setTA',
        component: (resolve) => require(['./components/set_TA.vue'], resolve)
      }
    ]
  },
]

const RouterConfig = {
  mode: 'history',
  routes: Routers
}

const router = new VueRouter(RouterConfig)

new Vue({
  el: '#app',
  router: router,
  store,
  render: h => {
    return h(app)
  }
})
