/* eslint-disable */
<template>
  <div style="padding: 10px; background: #f8f8f9">
    <Card
      :title="contest_name"
      icon="ios-trophy"
      padding="0"
      shadow
      style="width: 100%"
      :to="{path: '/questions', query: {exam_id : this.exam_id}}"
    >
      <CellGroup>
        <Cell :title="contest_info"></Cell>
        <Cell>
          <Icon type="md-calendar" />{{
            contest_date
          }}&nbsp;&nbsp;&nbsp;&nbsp;
          <Icon type="md-clock" />{{
            contest_time
          }}&nbsp;&nbsp;&nbsp;&nbsp;
          <Icon type="md-flag" />{{
            status
          }}
          </Cell>
      </CellGroup>
    </Card>
  </div>
</template>
<script>
export default {
  props: ['contest_name', 'contest_info', 'contest_date', 'contest_time', 'exam_id', 'start_time'],
  data () {
    return {
      informations: 'exam-informations',
      exam_date: 'xxxx-xx-xx',
      time_limit: 'xx:xx -- xx:xx'

    }
  },
  computed: {
    status: function() {
      let now = new Date();
      let start = new Date(this.start_time);
      if(now < start) return "尚未开始";
      else return "进行中";
    }
  },
  methods: {
  }
}
</script>
