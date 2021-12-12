/* eslint-disable */
<template>
    <questionlist :contest_id="contest_id"></questionlist>
</template>

<script>
import questionlist from '../../components/question_list.vue'
export default {
  data: function () {
    return {
      contest_id: 0
    }
  },
  components: {
    questionlist
  },
  created: function() {
    this.contest_id = this.$route.query.exam_id;
  }
}
</script>
