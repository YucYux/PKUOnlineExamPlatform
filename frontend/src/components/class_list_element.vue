<template>
  <div style="padding: 10px; background: #f8f8f9">
    <Card
      icon="md-contacts"
      padding="0"
      shadow
      style="width: 100%"
    >
      <p slot="title">
            <Icon type="md-contacts"></Icon>
            {{aClass['class_name']}}
      </p>
      <Button type="info" @click="handleClickCard">
        进入班级详情页
      </Button>
      <CellGroup>
        <Cell :title="'ID: '+aClass['id']"></Cell>
      </CellGroup>
    </Card>
  </div>
</template>
<script>
import store from '../store'
export default {
  props: ['aClass'],
  data () {
    return {
      id: 0
    }
  },
  methods: {
    handleClickCard() {
      this.$router.push({path:'/classdetail/membersList', query:{class_id: this.aClass['id']}});
    }
  }
}
</script>
