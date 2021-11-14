<template>
    <div class='layout'>
      <Layout>
        <Header :style = "{position: 'fixed', width: '100%'}">
          <vmenu></vmenu>
        </Header>
        <Content :style="{margin: '88px 20px 0px 20px', background: '#fff', minHeight: '590px'}">
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
      border-radius: 4px;
      overflow: hidden;
  }
  .layout-footer-center{
      text-align: center;
      height: 80px;
      text-align: top;
      color: #d7dde4;
      font-size: 18px;
      background: #5b6270;
  }
  .layout-footer-center img{
    position: fixed;
    left: 30px;
    width: 132px;
    height: 36px;
    margin-top: 10px;
    margin-right : 50px;
    margin-bottom: 30px;
  }
</style>
</style>
