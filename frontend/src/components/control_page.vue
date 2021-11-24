/* eslint-disable */
<template>
  <div style="background: #d7dde4; padding: 30px 300px 30px 300px">
    <Card :bordered="true" style="background: #f5f7f9">
      <p slot="title"><Icon type="md-contact"></Icon>个人信息</p>
      <p style="height: 340px">
        <span>姓名</span>
        <Input
          v-model="cur_studentname"
          placeholder="Enter something ..."
          :disabled="notunderchange"
          clearable
          style="width: 300px; padding: 0px 0px 0px 10px"
          :border="false"
        />
        <Button type="success" @click="handleclick">{{ button_info }}</Button>
      </p>
    </Card>
  </div>
</template>

<script>
import store from "../store";
export default {
  data: function () {
    return {
      v_studentname: "",
      notunderchange: true,
      button_change: 1,
    };
  },
  computed: {
    cur_studentname: {
      get: function () {
        this.v_studentname = store.getters.getStudentname
        return this.v_studentname
      },

      set: function (value) {
        this.v_studentname = value
      }
    },

    button_info: function () {
        if (this.button_change === 1) {
          return "修改";
        } else {
          return "保存";
        }
    },
  },
  methods: {
    handleclick () {
      if (this.button_change === 1) {
        this.button_change = 0;
        this.notunderchange = false;
      } else {
        this.button_change = 1;
        this.notunderchange = true;
        //这里把数据发回后端，即v_studentname中的值
        //再更新store中的值
      }
    },
  },
  components: {
    store,
  },
};
</script>
