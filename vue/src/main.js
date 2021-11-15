// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import app from './app.vue'
import ViewUI from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(VueRouter)
Vue.use(ViewUI)
/* eslint-disable no-new */
const Routers = [
  {
    path: '/index',
    component: (resolve) => require(['./views/index.vue'], resolve)
  },
  {
    path: '/contest',
    component: (resolve) => require(['./views/contest.vue'], resolve)
  },
  {
    path: '/control',
    component: (resolve) => require(['./views/control.vue'], resolve)
  },
  {
    path: '/grade',
    component: (resolve) => require(['./views/grade.vue'], resolve)
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
  render: h => {
    return h(app)
  }
})
