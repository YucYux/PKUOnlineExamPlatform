/* eslint-disable */
<template>
  <div class="split">
    <Split v-model="split1">
      <div slot="left" class="split-pane">
        <Card :bordered="false" style="height: 45%">
          <p slot="title">题目名称</p>
          <p style="{height:'200'}">
            题目内容
          </p>
        </Card>
        <Card :bordered="false" style="height: 25%">
          <p slot="title">测试样例</p>
          <p>
            xxx
          </p>
        </Card>
        <Card :bordered="false" style="height: 25%">
          <p slot="title">输出结果</p>
          <p>
            xxx
          </p>
        </Card>
      </div>
      <div slot="right" class="split-pane">
        <MonacoEditor
          style=""
          width="99%"
          height="95%"
          :language="python"
          theme="vs-dark"
          :code="code"
          :editorOptions="options"
          @mounted="onMounted"
          @codeChange="onCodeChange"
        >
        </MonacoEditor>
      </div>
    </Split>
  </div>
</template>

<script>
import MonacoEditor from "../../vue-monaco-editor/src/Monaco.vue";
export default {
  data: function () {
    return {
      editor: null,
      split1: 0.5
    }
  },
  components: {
    MonacoEditor
  },
  method: {
    onMounted (editor) {
      this.editor = editor
    },
    onCodeChange (editor) {}
  }
}
</script>

<style>
    .split{
        height: 200px;
        border: 1px solid #dcdee2;
    }
    .split-pane{
      background: #dcdee2;
      height: 500px;
      padding: 10px;
    }
</style>
