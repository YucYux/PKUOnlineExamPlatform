/* eslint-disable */
<template>
  <div style="padding: 10px; background: #f8f8f9">
    <Card
      :title="contest_name"
      icon="ios-trophy"
      padding="0"
      shadow
      style="width: 100%"
    >
      <p slot="extra">
          <Button type="success" @click="set_exam">编辑</Button>
          <Button type="error" @click="del_exam">删除</Button>
          <Button type="primary" @click="exam_member">查看考试成员</Button>
      </p>
      <CellGroup>
        <Cell :title="contest_info"></Cell>
        <Cell>
          <Icon type="md-calendar" />{{
            contest_date
          }}&nbsp;&nbsp;&nbsp;&nbsp;<Icon type="md-clock" />{{
            contest_time
          }}
          </Cell>
      </CellGroup>
    </Card>
  </div>
</template>
<script>
export default {
  props: ['idx', 'contest_name', 'contest_info', 'contest_date', 'contest_time', 'exam_id'],
  data () {
    return {
      informations: 'exam-informations',
      exam_date: 'xxxx-xx-xx',
      time_limit: 'xx:xx -- xx:xx'
    }
  },
  methods: {
    del_exam: function () {
      this.$emit('delete_exam', this.idx)
    },
    set_exam: function () {
      this.$emit('set_exam', this.idx)
    },
    exam_member: function () {
      this.$emit('exam_member', this.idx)
    }
  }
}
</script>
