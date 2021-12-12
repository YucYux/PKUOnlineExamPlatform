<template>
  <Scroll :on-reach-bottom="handleReachBottom" height="90%">
    <aClass v-for="(item, index) in classes" :key="index" :aClass="classes[index]"></aClass>
  </Scroll>
</template>

<script>

import aClass from './class_list_element.vue'
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
    classes: function () {
      return store.getters.getClasses;
    }
  },
  mounted: function () {
  },
  components: {
    aClass
  },
  created: function() {
  }
}
</script>
