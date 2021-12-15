/* eslint-disable */
<template>
<div style="height: 100%">
  <div class="split">
    <Split v-model="split1">
      <div slot="left" class="split-pane">
        <Card :bordered="false" style="height: 25%">
          <p slot="title">{{question_title}}</p>
          <p style="{height:'200'}">
            {{question_content}}
          </p>
        </Card>
        <Card :bordered="false" style="height: 15%">
          <p slot="title">输入说明</p>
          <p>
            {{standard_input}}
          </p>
        </Card>
        <Card :bordered="false" style="height: 15%">
          <p slot="title">输出说明</p>
          <p>
            {{standard_output}}
          </p>
        </Card>
        <List header="提交记录" border size="small" background="white" split="false">
            <ListItem>This is a piece of text.</ListItem>
            <ListItem>This is a piece of text.</ListItem>
            <ListItem>This is a piece of text.</ListItem>
        </List>
      </div>
      <div slot="right" class="split-pane">
        <MonacoEditor
          style="position:relative"
          width="99%"
          height="95%"
          language="python"
          theme="vs-dark"
          :key="randomkey"
          :changeThrottle="500"
          :code="code"
          :editorOptions="options"
          @mounted="onMounted"
          @codeChange="onCodeChange"
        >
        </MonacoEditor>
      </div>
    </Split>
  </div>
  <div  class="submit_button">
    <Button type = "success" @click = "submit_code">提交</Button>
  </div>
</div>
</template>

<script>
import MonacoEditor from 'vue-monaco-editor'
import api from '../../api.js'
import store from '../../store'
export default {
  data: function () {
    return {
      contest_id: 0,
      question_id: 0,
      editor: null,
      split1: 0.5,
      randomkey: 123321,
      code: '//input your code',
      options: {
      },
      question_title: '题目名称',
      question_content: '题目内容',
      standard_input: '输入说明',
      standard_output: '输出说明'
    }
  },
  components: {
    MonacoEditor
  },
  methods: {
    onMounted (editor) {
      this.editor = editor
    },
    onCodeChange (editor) {
    },
    submit_code () {
      var code = this.editor.getValue()
      this.$Message.info(code)
      // code发送到后端
      api.APIcommit(code, this.contest_id, this.question_id).then(
        (result) => {this.$Notice.success({title: '提交成功', desc: ''});},
        (error) => {this.$Notice.error({title: '提交失败', desc: ''})}
      )
    }
  },
  created: function() {
    this.contest_id = this.$route.query.contest_id;
    this.question_id = this.$route.query.question_id;
    store.commit("changeQuestiondetailM", {});
    api.APIgetQuestionDetail(this.question_id).
    then(resolve => {
      this.question_title = store.getters.getQuestiondetail['title'];
      this.question_content = store.getters.getQuestiondetail['description'];
      this.standard_input = store.getters.getQuestiondetail['input_description'];
      this.standard_output = store.getters.getQuestiondetail['output_description'];
    })
  }
}
</script>

<style>
    .split{
      height: 780px;
      margin: 10px;
      border: 1px solid #dcdee2;
    }
    .split-pane{
      background: #dcdee2;
      height: 800px;
      padding: 10px;
    }
    .submit_button{
      position: relative;
      margin-top: 20px;
      text-align: center;
    }
</style>
