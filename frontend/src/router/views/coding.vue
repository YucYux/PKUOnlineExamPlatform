/* eslint-disable */
<template>
  <MonacoEditor
    height="540"
    language="python"
    :code="code"
    :editorOptions="options"
    @mounted="onMounted"
    @codeChange="onCodeChange"
  >
  </MonacoEditor>
</template>

<script>
import MonacoEditor from '../../vue-monaco-editor/src/Monaco.vue'
export default {
  data: function () {
    return {
      editor: null
    }
  },
  components: {
    MonacoEditor
  },
  method: {
    onMounted (editor) {
      this.editor = editor
    },
    onCodeChange (editor) {

    }
  }
}
</script>
