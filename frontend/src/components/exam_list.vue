/* eslint-disable */
<template>
  <Scroll :on-reach-bottom="handleReachBottom" height="90%" style="z-index = -1">
    <exam style="z-index = -1" v-for="(item, index) in list_name" :key="index" :contest_name="list_name[index]" :contest_info="list_info[index]" :contest_date="list_date[index]" :contest_time="list_time[index]" :exam_id="list_id[index]"></exam>
  </Scroll>
</template>
<script>
import exam from './exam_list_element.vue'
import store from '../store'
export default {
  data () {
    return {
      list: [],
      list_name: ['文计-笔试', '文计-Python', '文计-期末考试'],
      list_info: ['笔试考试', '考察python编程', '期末考试'],
      list_date: ['2021/11/15', '2021/11/16', '2022/01/10'],
      list_time: ['10:00--12:00', '10:00--12:00', '8:00--10:00'],
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
    exam
  }
}
</script>
