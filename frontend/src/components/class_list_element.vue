<template>
  <div style="padding: 10px; background: #f8f8f9">
    <Card
      icon="md-contacts"
      padding="0"
      shadow
      style="width: 100%"
      :to="{path:'/classdetail/membersList', query:{class_number: this.aClass['class_number']}}"
    >
      <p slot="title">
            <Icon type="md-contacts"></Icon>
            {{aClass['class_name']}}
      </p>
      <CellGroup>
        <Cell :title="'ID: '+aClass['id'] +' 班号: ' +aClass['class_number']"></Cell>
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
  }
}
</script>
