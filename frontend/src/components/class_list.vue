<template>
  <Scroll :on-reach-bottom="handleReachBottom" height="560">
    <Class v-for="(item, index) in classes" :key="index" :Class="classes[index]"></Class>
  </Scroll>
</template>

<script>

import Class from './class_list_element.vue'
import store from '../store'

export default {
  data () {
    return {

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
  computed: {
    classes: function() {
      return store.getters.getClasses;
    }
  },
  mounted: function () {
    
  },
  components: {
    Class
  }
}
</script>
