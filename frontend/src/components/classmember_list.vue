/* eslint-disable */
<template>
  <Scroll :on-reach-bottom="handleReachBottom" height="420">
    <classmember v-for="(item, index) in members" :key="index" :classmember="members[index]"></classmember>
  </Scroll>
</template>

<script>
import classmember from './classmember_element.vue'
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
    //   return store.getters.getClassmembers;
        var l = [];
        for(var i=0;i<50;++i){
            l[i] = {username:'student'+i};
        }
        return l
    }
  },
  mounted: function () {
    
  },
  components: {
    classmember
  }
}
</script>