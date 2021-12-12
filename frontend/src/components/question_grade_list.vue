/* eslint-disable */
<template>
  <Scroll :on-reach-bottom="handleReachBottom" height="90%" style="z-index = -1">
    <question style="z-index = -1" v-for="(item, index) in list_name" :key="index" :question_name="list_name[index]" :score="score[index]" :full_score="full_score[index]"></question>
  </Scroll>
</template>
<script>
import question from './question_grade_list_element.vue'
export default {
  data () {
    return {
      list_name: ['题目一', '题目二', '题目三', '题目四'],
      score: [10, 0, 8, 8, 0],
      full_score: [10, 10, 10, 20, 40]
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
  created: function () {
    // 初始时从后端获取每道题的总分，得分，题目名称，更新列表
  },
  components: {
    question
  }
}
</script>
