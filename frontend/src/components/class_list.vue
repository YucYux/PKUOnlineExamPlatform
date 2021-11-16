<template>
  <Scroll :on-reach-bottom="handleReachBottom" height="560">
    <Class v-for="(item, index) in list_name" :key="index" :class_name="list_name[index]" :class_id="list_info[index]"></Class>
  </Scroll>
</template>
<script>
import Class from './class_list_element.vue'
export default {
  data () {
    return {
      list_name: ['class1', 'class2', 'class3'],
      list_info: ['0001', '0002', '0003'],
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
    Class
  }
}
</script>
