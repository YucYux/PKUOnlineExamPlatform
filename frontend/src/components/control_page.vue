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
        <Button type="success" @click="handleclick_name">{{ button_info }}</Button>
      </p>
    </Card>
  </div>
</template>

<script>
import store from "../store";
import api from "../api.js";
export default {
  data: function () {
    return {
      v_studentname: "",
      notunderchange: true,
      button_change: 1,
    };
  },
  computed: {
    temp_studentname: function() {
      return store.getters.getStudentname;
    },
    cur_studentname: {
      get: function () {
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
    handleclick_name () {
      if (this.button_change === 1) {
        this.button_change = 0;
        this.notunderchange = false;
      } else {
        this.button_change = 1;
        this.notunderchange = true;
        //这里把数据发回后端，即v_studentname中的值
        //再更新store中的值
        api.APIchangeStudentname(this.v_studentname).then(
            (result) => {
            store.dispatch(
              'changeStudentname',
              result.data.student_name
            )
            this.$Notice.success({
              title: '修改成功',
              desc: '您的姓名是：' + result.data.student_name
            })
          },
          (error) => {
            this.v_studentname = this.temp_studentname;
            this.$Notice.error({
              title: '修改失败',
              desc: ''
            });
            console.log(error);
          }
        )
      }
    },
  },
  components: {
    // eslint-disable-next-line
    store,
  },
  mounted: function() {
    this.v_studentname = this.temp_studentname;
  }
};
</script>
