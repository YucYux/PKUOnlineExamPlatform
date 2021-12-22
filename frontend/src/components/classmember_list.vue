/* eslint-disable */
<template>
  <Scroll :on-reach-bottom="handleReachBottom" height="420">
    <classmember v-for="(item, index) in members" :key="index" :classmember="members[index]"></classmember>
  </Scroll>
</template>

<script>
import classmember from './classmember_element.vue'
import store from '../store'
import api from '../api'
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
  },
  created: function() {
    store.commit("changeClassmembersM", []);
    api.APIclassInfo(this.$route.query.class_number);
  }
}
</script>