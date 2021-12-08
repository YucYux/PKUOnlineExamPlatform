/* eslint-disable */
<template>
<div style="height: 100%">
  <div class="split">
    <Split v-model="split1">
      <div slot="left" class="split-pane">
        <Card :bordered="false" style="height: 45%">
          <p slot="title">{{question_title}}</p>
          <p style="{height:'200'}">
            {{question_content}}
          </p>
        </Card>
        <Card :bordered="false" style="height: 25%">
          <p slot="title">测试样例</p>
          <p>
            {{standard_input}}
          </p>
        </Card>
        <Card :bordered="false" style="height: 25%">
          <p slot="title">样例输出</p>
          <p>
            {{standard_output}}
          </p>
        </Card>
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
export default {
  data: function () {
    return {
      editor: null,
      split1: 0.5,
      randomkey: 123321,
      code: '//input your code',
      options: {
      },
      question_title: '题目名称',
      question_content: '题目内容',
      standard_input: '样例输入',
      standard_output: '样例输出'
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
    }
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
