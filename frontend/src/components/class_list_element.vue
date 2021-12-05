<template>
  <div style="padding: 10px; background: #f8f8f9">
    <Card
      :title="Class['class_name']"
      v-on:click="handleClickCard"
      icon="md-contacts"
      padding="0"
      shadow
      style="width: 100%"
    >
      <CellGroup>
        <Cell :title="'ID: '+Class['id']"></Cell>
      </CellGroup>
    </Card>
  </div>
</template>
<script>
import store from '../store'
export default {
  props: ['Class'],
  data () {
    return {
      id: 0
    }
  },
  methods: {
    handleClickCard() {
      store.dispatch('changeClassinfonumber', Class['id'])
      .then(
        result => {this.$router.push("/classdetail/memberList");}
      )
    }
  }
}
</script>
