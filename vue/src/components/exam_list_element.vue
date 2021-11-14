<template>
  <div style="padding: 10px; background: #f8f8f9">
    <Card
      title="CONTEST_NAME"
      icon="ios-trophy"
      :padding="0"
      shadow
      style="width: 800px"
      to="#"
    >
      <CellGroup>
        <Cell>{{ informations }}</Cell>
        <Cell
          ><Icon type="md-calendar" />{{
            exam_date
          }}&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="md-clock" />{{
            time_limit
          }}</Cell
        >
      </CellGroup>
    </Card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      informations: 'exam-informations',
      exam_date: 'xxxx-xx-xx',
      time_limit: 'xx:xx -- xx:xx'
    }
  }
}
</script>
