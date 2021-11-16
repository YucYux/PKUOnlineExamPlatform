<template>
  <div style="padding: 10px; background: #f8f8f9">
    <Card
      :title="class_name"
      icon="md-contacts"
      padding="0"
      shadow
      style="width: 100%"
      to="#"
    >
      <CellGroup>
        <Cell :title="class_id"></Cell>
      </CellGroup>
    </Card>
  </div>
</template>
<script>
export default {
  props: ['class_name', 'class_id'],
  data () {
    return {
      id: 0
    }
  }
}
</script>
