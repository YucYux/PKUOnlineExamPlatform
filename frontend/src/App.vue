<template>
    <div class='layout'>
      <Layout>
        <Header :style = "{position: 'fixed', width: '100%'}">
          <vmenu></vmenu>
        </Header>
        <Content :style="{padding: '15px 20px 20px 20px', margin: '88px 20px 20px 20px', background: '#d7dde4', minHeight:'570px'}">
            <router-view></router-view>
        </Content>

        <Footer class="layout-footer-center"><img src = './assets/pku_logo.png'/>informations</Footer>
      </Layout>
    </div>
</template>
<script>
import vmenu from './components/menu.vue'

export default {
  components: {
    vmenu
  },
  method: {

  }
}
</script>

<style scoped>
  .layout{
      border: 1px solid #d7dde4;
      background: #f5f7f9;
      position: relative;
      overflow: hidden;
  }
  .layout-footer-center{
      position: fixed;
      bottom:0px;
      text-align: center;
      height: 80px;
      width: 100%;
      text-align: center;
      color: #d7dde4;
      font-size: 18px;
      background: #5b6270;
  }
  .layout-footer-center img{
    position: fixed;
    left: 30px;
    width: 132px;
    height: 36px;
    margin-top: 2px;
    margin-right : 50px;
    margin-bottom: 30px;
  }
</style>
</style>
