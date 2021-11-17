// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
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
const Routers = [
  {
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
    path: '/classes',
    component: (resolve) => require(['./router/views/classes.vue'], resolve),
    beforeEnter: (to, from, next) => {
      api.APIclassesList();
      next();
    }
  }
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
