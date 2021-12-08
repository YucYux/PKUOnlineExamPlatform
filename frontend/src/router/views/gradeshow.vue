/* eslint-disable */
<template>
<div style="height: 100%">
  <div class="split">
    <Split v-model="split1">
      <div slot="left" class="split-pane">
        <Card :bordered="false" style="height: 60%">
          <p slot="title">{{title}}</p>
          <p style="text-align:center">
            <span style="font-size:20px">考试成绩</span>
            </br>
            <iCircle :percent="grade" :stroke-color="color" style="margin-top:10px">
                <span class="demo-Circle-inner" style="font-size:24px">{{grade}}/100</span>
            </iCircle>
          </p>
        </Card>
        <Card :bordered="false" style="height: 40%">
          <p slot="title">相关数据</p>
          <p>
            平均分 参考人数等
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
  </div>
</div>
</template>

<script>
import queslist from '../../components/question_grade_list_element.vue'
export default {
  data: function () {
    return {
      title: '考试名称',
      grade: 28,
      list_name: ['题目一', '题目二', '题目三', '题目四'],
      score: [10, 0, 8, 8, 0],
      full_score: [10, 10, 10, 20, 40]
    }
  },
  computed: {
    color: function () {
      if (this.grade >= 85) return '#5cb85c'
      if (this.grade >= 60)
        return '#DAA520'
      if (this.grade < 60)
        return '#ff5500'
    }
  },
  components: {
    queslist
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
