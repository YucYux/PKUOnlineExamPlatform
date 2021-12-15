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
    component: (resolve) => require(['./router/views/contest.vue'], resolve),
    beforeEnter: (to, from, next) => {
      api.APIgetContestList().
      then(
        result => {next();}
      )
    }
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
    path: '/gradeshow',
    component: (resolve) => require(['./router/views/gradeshow.vue'], resolve)
  },
  {
    path: '/coding',
    component: (resolve) => require(['./router/views/coding.vue'], resolve),
    props: route => ({ contest_id: route.query.contest_id, question_id: route.query.question_id })
  },
  {
    path: '/questions',
    component: (resolve) => require(['./router/views/questions.vue'], resolve),
    props: route => ({ exam_id: route.query.exam_id })
  },
  {
    path: '/classes',
    component: (resolve) => require(['./router/views/classes.vue'], resolve),
    beforeEnter: (to, from, next) => {
      api.APIclassesList().
      then(
        result => {next();}
      );
    }
  },
  {
    path: '/classdetail',
    component: (resolve) => require(['./router/views/classdetail.vue'], resolve),
    props: route => ({ class_id: route.query.class_id }),
    children: [
      {
        path: 'membersList',
        component: (resolve) => require(['./components/classmember_list.vue'], resolve),
        props: route => ({ class_id: route.query.class_id })
      },
      {
        path: 'setContest',
        component: (resolve) => require(['./components/set_contest.vue'], resolve),
        props: route => ({ class_id: route.query.class_id })
      },
      {
        path: 'setMembers',
        component: (resolve) => require(['./components/set_members.vue'], resolve),
        props: route => ({ class_id: route.query.class_id })
      },
      {
        path: 'setTA',
        component: (resolve) => require(['./components/set_TA.vue'], resolve),
        props: route => ({ class_id: route.query.class_id })
      }
    ]
  },
]

const RouterConfig = {
  mode: 'history',
  routes: Routers
}

const router = new VueRouter(RouterConfig)


router.beforeEach((to, from, next) => {
  let {path} = to;
  
  
  if (sessionStorage.getItem('store')) {
    store.replaceState(Object.assign({}, store.state, JSON.parse(sessionStorage.getItem('store'))))
    sessionStorage.clear();
  }
  if (store.getters.getUsername === '' && path !== '/index') 
    next('/index');
  else
    next();
})


new Vue({
  el: '#app',
  router: router,
  store,
  render: h => {
    return h(app)
  }
})
