/* eslint-disable */
<template>
  <div style="padding: 10px; background: #f8f8f9">
    <Card
      :title="question_name"
      icon="ios-arrow-dropright-circle"
      padding="0"
      shadow
      style="width: 100%"
    >
      <span slot="extra">得分: {{score}}/{{full_score}}</span>
    </Card>
  </div>
</template>
<script>
export default {
  props: ['question_name', 'score', 'full_score'],
  data () {
    return {
    }
  }
}
</script>
