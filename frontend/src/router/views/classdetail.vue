/* eslint-disable */
<template>
  <div class="layout">
    <Layout>
      <Sider
        breakpoint="md"
        collapsible
        :collapsed-width="78"
        v-model="isCollapsed"
      >
        <Menu
          active-name="members_list"
          theme="dark"
          width="auto"
          :class="menuitemClasses"
          on-select="select"
        >
          <MenuItem name="members_list" :to="{path: '/classdetail/membersList', query:{class_number: this.class_number}}">
            <Icon type="md-contacts"></Icon>
            <span>成员列表</span>
          </MenuItem>
          <div v-if="usertype != 'Student'">
            <MenuItem name="set_contest" :to="{path: '/classdetail/setContest', query:{class_number: this.class_number}}">
              <Icon type="md-search"></Icon>
              <span>考试管理</span>
            </MenuItem>
          <MenuItem name="set_members" :to="{path: '/classdetail/setMembers', query:{class_number: this.class_number}}">
            <Icon type="md-settings"></Icon>
            <span>学生管理</span>
          </MenuItem>
          </div>
          <div v-if="usertype === 'Teacher'">
            <MenuItem name="set_TA" :to="{path: '/classdetail/setTA', query:{class_number: this.class_number}}">
              <Icon type="md-settings"></Icon>
              <span>助教管理</span>
            </MenuItem>
          </div>
        </Menu>
        <div slot="trigger"></div>
      </Sider>
      <Layout>
        <Content
          :style="{ margin: '20px', background: '#fff', minHeight: '420px' }"
        >
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import store from '../../store'
export default {
  data () {
    return {
      isCollapsed: false,
      Content: 'content',
      class_number: 0
    }
  },
  computed: {
    menuitemClasses: function () {
      return ['menu-item', this.isCollapsed ? 'collapsed-menu' : '']
    },
    usertype: function () {
      return store.getters.getUsertype;
    }
  },
  method: {
    select (name) {
      this.$Message.info(name)
    }
  },
  created: function() {
    this.class_number = this.$route.query.class_number;
  }
}
</script>

<style scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
</style>
