/* eslint-disable */
<template>
  <div>
    <div style = "text-align: center;"><Cell><Icon type="md-cloud"/> 进行中或尚未开始的考试</Cell></div>
    <Scroll :on-reach-bottom="handleReachBottom" height="90%" style="z-index = -1">
      <exam style="z-index = -1" v-for="(item, index) in list" :key="index" :contest_name="list[index].title" 
      :contest_info="list[index].description" 
      :contest_date="new Date(list[index].start_time).getFullYear() + '-' + (parseInt(new Date('2021-12-16T00:24:00').getMonth())+1).toString() + '-' +new Date(list[index].start_time).getDate()" 
      :contest_time="new Date(list[index].start_time).toLocaleTimeString('chinese', { hour12: false })
                    + ' - ' + new Date(list[index].end_time).toLocaleTimeString('chinese', { hour12: false })" 
      :exam_id="list[index].id"
      :end_time="list[index].start_time">
      </exam>
    </Scroll>
  </div>
</template>
<script>
import exam from './exam_list_element.vue'
import store from '../store'
export default {
  data () {
    return {
      list: [],
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
    this.list = store.getters.getContests;
  },
  components: {
    exam
  }
}
</script>
