<template>
  <div style="padding: 10px; background: #f8f8f9">
    <Card
      :title="Class['class_name']"
      icon="md-contacts"
      padding="0"
      shadow
      style="width: 100%"
      to="/classdetail/membersList"
    >
      <CellGroup>
        <Cell :title="'ID: '+Class['id']"></Cell>
      </CellGroup>
    </Card>
  </div>
</template>
<script>
export default {
  props: ['Class'],
  data () {
    return {
      id: 0
    }
  }
}
</script>
