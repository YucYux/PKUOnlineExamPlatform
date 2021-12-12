/* eslint-disable */
<template>
  <Scroll :on-reach-bottom="handleReachBottom" height="90%" style="z-index = -1">
    <question style="z-index = -1" v-for="(item, index) in list" :key="index" :question_name="list[index].title" :question_id="list[index]._id"></question>
  </Scroll>
</template>
<script>
import question from './question_list_element.vue'
import store from '../store'
import api from '../api.js'
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    handleReachBottom () {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve()
        }, 2000)
      })
    }
  },
  mounted: function () {
    // 初始时从后端获取数据更新contest列表
    this.list = store.getters.getQuestionlist;
  },
  components: {
    question
  },
  created: function() {
    api.APIgetQuestionList(this.$route.query.exam_id); 
  }
}
</script>
