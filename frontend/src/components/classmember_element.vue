<template>
  <div style="padding: 10px; background: #f8f8f9">
    <Card
      :title="classmember['student_name']"
      icon="md-happy"
      padding="0"
      shadow
      style="width: 100%"
      to="#"
    >
      <CellGroup>
        <Cell :title="'username: '+classmember['username']"></Cell>
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
