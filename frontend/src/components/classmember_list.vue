<template>
  <Scroll :on-reach-bottom="handleReachBottom" height="560">
    <classmember v-for="(item, index) in members" :key="index" :classmember="members[index]"></classmember>
  </Scroll>
</template>

<script>

import classmember from './classmember_list_element.vue'
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
    members: function() {
      return store.getters.getClassmembers;
    }
  },
  mounted: function () {
    
  },
  components: {
    classmember
  }
}
</script>
