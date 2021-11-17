/* eslint-disable */
<template>
  <div>
    <Button type="success" @click="modal1 = true" ghost>注销</Button>
    <Modal
      v-model="modal1"
      title="真的吗？"
      draggable="true"
      ok-text="注销"
      width="360px"
      cancle-text="取消"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <div>
        您确定要注销吗？
      </div>
    </Modal>
  </div>
</template>
<script>

import api from '../api.js'
import store from '../store'

export default {
  data () {
    return {
      modal1: false,
      v_username: '',
      v_password: ''
    }
  },
  methods: {
    ok () {
      api.APIlogout().
      then(result => {
            this.$Notice.success({
                    title: '注册成功',
                    desc: ''
                });
          },
           error => {
             this.$Notice.error({
                    title: '注册失败',
                    desc: ''
                });
           });
      this.v_username = this.v_password = ''
    },
    cancel () {
      this.$Message.info('Clicked cancel')
      this.v_username = this.v_password = ''
    }
  }
}
</script>