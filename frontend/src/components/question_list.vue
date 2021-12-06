/* eslint-disable */
<template>
  <Scroll :on-reach-bottom="handleReachBottom" height="90%" style="z-index = -1">
    <question style="z-index = -1" v-for="(item, index) in list_name" :key="index" :question_name="list_name[index]" :question_id="list_id[index]"></question>
  </Scroll>
</template>
<script>
import question from './question_list_element.vue'
export default {
  data () {
    return {
      list_name: ['题目一', '题目二', '题目三'],
      list_id: [1, 2, 3]
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
  },
  components: {
    question
  }
}
</script>
