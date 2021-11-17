<template>
  <div>
    <Button type="success" @click="modal1 = true" ghost>注册</Button>
    <Modal
      v-model="modal1"
      title="Welcome to PKUOnlineExamPlatform"
      draggable="true"
      ok-text="注册"
      width="360px"
      cancle-text="取消"
      @on-ok="ok"
      @on-cancel="cancel"
    >
      <div>
        <Input
          prefix="ios-contact"
          v-model="v_username"
          placeholder="Username"
          style="width: auto"
        ></Input>
      </div>
      <div style="margin-top: 6px">
        <Input
          prefix="ios-lock"
          v-model="v_password"
          placeholder="Password"
          type="password"
          style="width: auto"
        ></Input>
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
      api.APIregister(this.v_username, this.v_password).
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
