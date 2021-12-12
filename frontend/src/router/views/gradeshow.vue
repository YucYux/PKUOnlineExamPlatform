/* eslint-disable */
<template>
<div style="height: 100%">
  <div class="split">
    <Split v-model="split1">
      <div slot="left" class="split-pane">
        <Card :bordered="false" style="height: 60%">
          <p slot="title">{{title}}</p>
          <p style="text-align:center">
            <Select v-if="usertype === 'Teacher'" v-model="student_name" prefix="md-contact" style="width:120px">
              <Option v-for="item in stuList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            </br>
            <iCircle :percent="grade" :stroke-color="color" :size="180" style="margin-top:10px">
                <span class="demo-Circle-inner" style="font-size:24px">考试成绩<br></br>{{grade}}/100</span>
            </iCircle>
          </p>
        </Card>
        <Card :bordered="false" style="height: 40%">
          <p slot="title">相关数据</p>
          <p>
            <iCircle :percent="ave_grade" style="margin-top:-5px;margin-left:10%">
                <span class="demo-Circle-inner" style="font-size:18px">平均成绩<br></br>{{ave_grade}}/100</span>
            </iCircle>
            <iCircle :percent="mid_grade" style="margin-top:-5px;margin-left:10%">
                <span class="demo-Circle-inner" style="font-size:18px">中位数<br></br>{{mid_grade}}/100</span>
            </iCircle>
            <iCircle :percent="rank/student_num*100" style="margin-top:-5px;margin-left:10%">
                <span class="demo-Circle-inner" style="font-size:18px">班内排名<br></br>{{rank}}/{{student_num}}</span>
            </iCircle>
          </p>
        </Card>
      </div>
      <div slot="right" class="split-pane">
        <Scroll :on-reach-bottom="handleReachBottom" height="90%" style="z-index = -1">
            <queslist style="z-index = -1" v-for="(item, index) in list_name" :key="index" :question_name="list_name[index]" :score="score[index]" :full_score="full_score[index]"></queslist>
        </Scroll>
      </div>
    </Split>
  </div>
  <div  class="submit_button">
    <Button type = "success" to = "/grade">返回</Button>
    <Button v-if="usertype === 'Teacher'" type = "primary" to = "/grade">导出成绩</Button>
  </div>
</div>
</template>

<script>
import queslist from '../../components/question_grade_list_element.vue'
import store from '../../store'
export default {
  data: function () {
    return {
      title: '考试名称',
      student_name:"",
      ave_grade:80,
      mid_grade:83,
      rank:70,
      grade:38,
      student_num:80,
      list_name: ['题目一', '题目二', '题目三', '题目四', '题目五', '题目六'],
      score: [10, 0, 8, 8, 2, 10],
      full_score: [10, 10, 10, 10, 20, 20],
      stuList: [
        {value: '张三', label: '张三'},
        {value: '李四', label: '李四'}
      ]
    }
  },
  computed: {
    color: function () {
      if (this.grade >= 85) return '#5cb85c'
      if (this.grade >= 60)
        return '#DAA520'
      if (this.grade < 60)
        return '#ff5500'
    },
    usertype: function () {
      return store.getters.getUsertype
    }
  },
  components: {
    queslist,
    store
  },
  created: function () {
    // 初始时根据examid从后端获取考试的总分以及每道题的信息
  }
}

</script>

<style>
    .split{
      height: 480px;
      margin: 10px;
      border: 1px solid #dcdee2;
    }
    .split-pane{
      background: #dcdee2;
      height: 500px;
      padding: 10px;
    }
    .submit_button{
      position: relative;
      margin-top: 20px;
      text-align: center;
    }
</style>
