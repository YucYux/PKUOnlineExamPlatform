/* eslint-disable */
<template>
  <div style="padding: 10px; background: #f8f8f9">
    <Card
      :title="classmember['student_name']+' '"
      icon="md-happy"
      padding="0"
      shadow
      style="width: 100%"
    >
      <CellGroup>
        <Cell :title="'用户名: '+classmember['username']"></Cell>
        <Cell :title="'身份: '+classmember['admin_type']"></Cell>
      </CellGroup>
    </Card>
  </div>
</template>
<script>
export default {
  props: ['classmember'],
  data () {
    return {
      id: 0
    }
  }
}
</script>