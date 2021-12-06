/* eslint-disable */
<template>
  <div style="padding: 10px; background: #f8f8f9">
    <Card
      :title="question_name"
      icon="ios-arrow-dropright-circle"
      padding="0"
      shadow
      style="width: 100%"
      :to="{path: '/coding', query: {questionid : question_id}}"
    >
    </Card>
  </div>
</template>
<script>
export default {
  props: ['question_name', 'question_id'],
  data () {
    return {
    }
  }
}
</script>
