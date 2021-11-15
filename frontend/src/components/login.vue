<template>
  <div>
    <Button type="success" @click="modal1 = true" ghost>登录</Button>
    <Modal
      v-model="modal1"
      title="Welcome to PKUOnlineExamPlatform"
      draggable="true"
      ok-text="登录"
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
      this.$Message.info(
        'username:' + this.v_username + 'password:' + this.v_password
      )
      this.v_username = this.v_password = ''
    },
    cancel () {
      this.$Message.info('Clicked cancel')
      this.v_username = this.v_password = ''
    }
  }
}
</script>
