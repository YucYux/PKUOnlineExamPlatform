/* eslint-disable */
<template>
  <div class="layout">
    <Layout>
      <Header :style="{ position: 'relative', width: '100%' }">
        <vmenu></vmenu>
      </Header>
      <Content
        :style="{
          position: 'relative',
          padding: '30px 20px 20px 20px',
          margin: '35px 20px 20px 20px',
          background: '#d7dde4',
          minHeight: '560px',
        }"
      >
        <router-view></router-view>
      </Content>
      <Footer class="layout-footer-center"
        ><img src="./assets/pku_logo.png" />{{ footerInfo }}</Footer
      >
    </Layout>
  </div>
</template>
<script>
import vmenu from "./components/menu.vue";
import store from "./store";
import api from "./api.js"

export default {
  created() {
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state));
    })
  },
  components: {
    vmenu,
  },
  method: {},
  computed: {
    footerInfo: function () {
      if (store.getters.getUsername == "") return "您尚未登录";
      else return "欢迎，" + store.getters.getStudentname;
    },
  },
};
</script>

<style scoped>
Header {
  position: relative;
  z-index: 99999;
}
.layout {
  border: 0px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  overflow: hidden;
}
.layout-footer-center {
  position: fixed;
  bottom: 0px;
  text-align: center;
  height: 80px;
  width: 100%;
  text-align: center;
  color: #d7dde4;
  font-size: 18px;
  background: #5b6270;
}
.layout-footer-center img {
  position: fixed;
  left: 30px;
  width: 132px;
  height: 36px;
  margin-top: 2px;
  margin-right: 50px;
  margin-bottom: 30px;
}
</style>