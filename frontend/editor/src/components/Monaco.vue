<template>
  <div
    class="monaco-container loading"
    :language="language"
    :type="type"
    :options="options"
    :diff="diff"
    :content="content"
    :size="size"
    :model="model"
  ></div>
</template>

<script>
import { defineComponent } from "vue";
//可以把注释都删掉
//这个文件包括了一个弱智自动补全算法，用于为python语言提供自动补全
import completion from "../assets/completion.js";
//使用esm导入，如果使用vue导入，则将这句话替换掉
import * as monaco from "../esm/vs/editor/editor.api.js";
//import '../esm/vs/basic-languages/javascript/javascript.contribution';
//本来想用script标签导入的，现在没用了
function loadjs(src, isModule) {
  if (src.lastIndexOf(".json") !== -1) {
    return fetch(src).then((e) => e.json());
  }
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.type = isModule ? "module" : "text/javascript";
    script.src = src;
    document.body.appendChild(script);

    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject();
    };
  });
}
//https://github.com/brijeshb42/monaco-themes
//定义了一个Monaco组件
export default defineComponent({
  name: "Monaco",
  components: {},
  //使用vue-monaco-editor则不需要定义这些
  props: {
    editable: { type: Boolean, default: false },
    type: { type: String, default: "undefined" },
    diff: Boolean,
    content: String,
    language: { type: String, default: "html" },
    options: Object,
    scroll: { type: Boolean, default: true },
    size: String,
    resizable: { type: Boolean, default: true },
    model: Object,
  },
  setup: function (p) {
    let props = { ...p };
    if (props.type === "edit") props.editable = true;
    console.log(props.editable ? "editable" : "ineditable");
    //定义了标配
    let globalConfig = {
      editor: null,
      listeners: [],
      loading: true,
      prevline: 0,
      theme: "vs",
      beyond: false,
      round: false,
      margin: true,
      minimap: false,
      model: props.model || null,
      cursor:
        "line" /*: "line" | "block" | "underline" | "line-thin" | "block-outline" | "underline-thin"*/,
      blink: "smooth" /*"blink" | "smooth" | "phase" | "expand" | "solid"*/,
    };
    //定义了作为代码区域，而非编辑器时的配置
    let illustrationConfig = {
      preview: false,
      ligature: true,
      tab: false,
      resizable: false,
      menu: false,
      accelerate: false,
      editable: false,
      lightbulb: false,
      ...globalConfig,
      ...props,
    };
    return props.type === "show"
      ? illustrationConfig
      : {
          beyond: false,
          round: false,
          ligature: false,
          accelerate: true,
          resizable: true,
          menu: true,
          number: true,
          scroll: false,
          preview: true,
          cursor: "line",
          tab: true,
          tabText: "onlySnippets",
          lightbulb: true,
          font: "Monaco",
          size: "10px",
          ...globalConfig,
          ...props,
        };
  },
  methods: {
    //切换语言
    lang(lg) {
      let original = this.editor.getModel();
      monaco.editor.setModelLanguage(original, lg);
    },
    //获取行数
    line() {
      return this.editor.getModel().getLineCount();
    },
    //获取高度，单位px
    height() {
      return this.editor.getContentHeight();
    },
    //设置字号
    sz(s) {
      this.update({ fontSize: s });
    },
    //设置宽高
    resize(w, h) {
      if (w) this.$el.style.width = w+"px";
      if (h) this.$el.style.height = h+"px";
    },
    //加载完毕后执行
    async finish() {
      //关闭加载动画
      this.$el.classList["remove"]("loading");
      this.loading = false;
      //if(window.milkdown)window.milkdown.bind(this.text);
      //自动改变高度，删掉
      this.listeners.push(() => {
        let line = this.line();
        if (line === this.prevline) return;
        else if (line > 10 && line < 100) {
          this.resize(null, this.height() + "px");
          this.prevline = line;
        }
      });
    },
    //绑定事件
    bind(keys, action) {
      if (typeof keys === "string") keys = [keys];
      let result = 0,
        t = 0;
      for (let key of keys) {
        key = key.toLowerCase();
        let k = monaco.KeyMod;
        let dict = {
          control: k.CtrlCmd,
          ctrl: k.CtrlCmd,
          alt: k.AltCmd,
          shift: k.Shift,
          "[": k.US_OPEN_SQUARE_BRACKET,
          "=": k.US_EQUAL,
          "-": k.US_MINUS,
        };
        if (dict.hasOwnProperty(key)) t = dict[key];
        else t = k[key];
        result |= t;
      }
      switch (action) {
        case "unfoldAll":
          action = "unfondRecursively";
          break;
      }
      action = "editor." + action;
      this.editor.addCommand(key, function () {
        editor.trigger("", action);
      });
    },
    update(s) {
      this.editor.updateOptions(s);
    },
    size(sz) {
      this.update({ fontSize: sz });
    },
    //只读模式
    edit(bool) {
      this.update({ readOnly: !bool });
    },
    //读写
    text(t) {
      if (t !== undefined) this.editor.setValue(t);
      else return this.editor.getValue();
    },
    //获取选区（没用，删掉）
    getSelectionText(
      monacoEditor,
      startLineNumber,
      startColumn,
      endLineNumber,
      endColumn
    ) {
      let currentText = ""; //选中文字的内容
      let num = 0; //累计回车的数量
      let startIndex = null; //截取编辑器内容的起始下标
      let endIndex = null; //截取编辑器内容的结束下标
      if (startLineNumber < endLineNumber) {
        //当起始行<结束行（方向：从上到下，从左到右）
        monacoEditor
          .getValue()
          .split("")
          .map((item, index) => {
            if (startLineNumber === 1) {
              //判断起始行当前行数，为1 则前面没有回车
              startIndex = startColumn - 1; //获取起始下标
              if (item === "\n") {
                num += 1; //累计回车数量（针对于结束行）
                if (num === endLineNumber - 1) {
                  //获取结束行最近的回车的下标+结束行的结束列
                  endIndex = index + endColumn;
                }
              }
            } else {
              //判断起始行当前行数，大于1 则前面有回车
              if (item === "\n") {
                //累计回车数量
                num += 1;
                if (num === startLineNumber - 1) {
                  //获取起始行最近的回车的下标+起始行的起始列
                  startIndex = index + startColumn;
                }
                if (num === endLineNumber - 1) {
                  //获取结束行最近的回车的下标+结束行的结束列
                  endIndex = index + endColumn;
                }
              }
            }
          });
      } else if (startLineNumber > endLineNumber) {
        //当起始行>结束行（方向：从下到上，从右到左）
        monacoEditor
          .getValue()
          .split("")
          .map((item, index) => {
            if (endLineNumber === 1) {
              //判断结束行当前行数，为1 则前面没有回车
              startIndex = endColumn - 1; //获取起始下标
              if (item === "\n") {
                num += 1; //累计回车数量（针对于起始行）
                if (num === startLineNumber - 1) {
                  //获取结束下标：起始行最近的回车的下标+起始行的起始列
                  endIndex = index + startColumn;
                }
              }
            } else {
              //判断结束行当前行数，大于1 则前面有回车
              if (item === "\n") {
                //累计回车数量
                num += 1;
                if (num === endLineNumber - 1) {
                  //获取结束行最近的回车的下标+结束行的结束列
                  startIndex = index + endColumn;
                }
                if (num === startLineNumber - 1) {
                  //获取起始行最近的回车的下标+起始行的起始列
                  endIndex = index + startColumn;
                }
              }
            }
          });
      } else if (startLineNumber === endLineNumber) {
        //当起始行=结束行（方向：从左到右，从右到左）
        monacoEditor
          .getValue()
          .split("")
          .map((item, index) => {
            if (endLineNumber === 1) {
              startIndex = startColumn < endColumn ? startColumn - 1 : endColumn - 1;
              endIndex = startColumn > endColumn ? startColumn - 1 : endColumn - 1;
            } else {
              if (item === "\n") {
                num += 1;
                if (num === endLineNumber - 1) {
                  startIndex =
                    startColumn < endColumn ? startColumn + index : endColumn + index;
                  endIndex =
                    startColumn > endColumn ? startColumn + index : endColumn + index;
                }
              }
            }
          });
      }
      currentText = monacoEditor.getValue().slice(startIndex, endIndex);
      return currentText;
    },
    //修改主题
    them(t) {
      if (t === "dark") t = "vs-dark";
      else if (t === "light") t = "vs";
      //我加了一个透明主题，定义在单独的json文件里
      else if (t === "transparent") {
        document.styleSheets[0] &&
          document.styleSheets[0].addRule(".monaco-editor canvas", "opacity:0;");
      }
      this.update({ theme: t });
    },
    //加载主题文件
    async loadTheme(name, src, willUse) {
      await fetch(src)
        .then((data) => data.json())
        .then((data) => {
          monaco.editor.defineTheme(name, data);
          if (willUse) this.them(name);
        });
      return this;
    },
    changed(e) {
      this.attention();
    },
    //监听change事件并通知
    attention() {
      let t = this.text();
      for (let i of this.listeners) i(t);
    },
    select() {
      if (arguments.length) {
        console.log("select returns selectedText without param.");
      }
      let selection = this.editor.getSelection();
      return this.getSelectionText(
        this.editor,
        selection.startLineNumber,
        selection.startColumn,
        selection.endLineNumber,
        selection.endColumn
      );
    },
    //本来是用script的，现在不需要安装了
    async install() {
      console.log("testing monaco.");
      try{monaco}catch(e){
      console.log("installing monaco.");
      try {
        require;
      } catch (e) {
        await loadjs("assets/require.js");
      }
      require.config({ paths: { vs: "assets/vs" } });
      let that = this;
      require(["vs/editor/editor.main"], function () {
        that.generate();
      });
      return;
      }
      this.generate();
    },
    //加载完后创建新编辑器的
    generate() {
      //加载透明主题
      this.loadTheme("transparent", "assets/transparent.json",1);
      console.log("generating monaco.");
      let props = this;
      if (this)
        this.editor = monaco.editor[props.diff ? "createDiffEditor" : "create"](
          this.$el,
          {
            value: props.content,
            language: props.language,
            roundedSelection: props.round,
            scrollBeyondLastLine: props.beyond,
            readOnly: !props.editable,//只读
            fontLigatures: props.ligature,
            automaticLayout: props.resizable,//自适应，不要打开！据说是用setInterval实现的，有性能问题
            //columnSelection: true,//interrupt nornal selection!
            contextmenu: props.menu,
            cursorBlinking: props.blink,
            cursorStyle: props.cursor,
            autoClosingBrackets: true,
            dimension: props.height
              ? {
                  height: props.height,
                  width: props.width,
                }
              : null,
            disableLayerHinting: props.accelerate,//默认即启动硬件加速，不用关闭
            scrollbar: {
              alwaysConsumeMouseWheel: !props.scroll,//关掉它，不然会滚不动
            },
            suggest: {
              preview: props.preview,
              shareSuggestSelections: true,
            },
            mouseWheelZoom: true,
            tabCompletion: props.tab,
            lineNumbers: props.number,
            theme: props.theme,
            wordWrap: "on",
            foldingStrategy: "indentation", // 代码可分小段折叠
            glyphMargin: props.margin,
            fontFamily: props.font,
            minimap: {
              enabled: props.minimap,//关掉没用的小地图，因为透明模式下是白块，太丑了，所以我设了canvas{opacity:0}
            },
            lightbulb: {
              enabled: props.lightbulb,
            },
            fontSize: props.size || "10px",//字号要调一下，默认太小
          }
        );
      if (this.model) this.editor.setModel(this.model, this.language);
      this.editor.onDidChangeModelContent(this.changed);//注册change事件
      this.editor.colorObj = new bracketColorizer(this.editor);//不要改colorObj变量名，这句话注册彩色括号插件。
      this.finish();
    },
  },
  mounted: async function () {
    let props = this;
    this.install();
  },
  beforeDestroy() {
    if (this.editor) this.editor.dispose();//丢弃内容
  },
});
/*
彩色括号插件，注意其中使用了全局变量monaco，确保它存在
repo:https://github.com/McvCar/monaco-editor-bracket-pair-colorizer
original vs code plugin:https://github.com/CoenraadS/Bracket-Pair-Colorizer-2
*/
class bracketColorizer {
  constructor(editor) {
    this.oldDecorators = [];
    var depth = this.defaultColours.length;

    // 生成样式信息
    var output = "";
    this.classNames = [];
    for (var i = 0; i < depth; i++) {
      var colour = this.defaultColours[i];
      output += ".bracket.bracket-color" + i + " {\ncolor: " + colour + "; }\n";
      this.classNames.push("bracket bracket-color" + i);
    }

    // 绑定样式信息
    if (output) {
      let dom = editor._domElement;
      var style = document.createElement("style");
      style.innerHTML = output;
      if (dom) {
        dom.appendChild(style);
      }
      this.styleSheet = style;
    }
    this.debounce = this.defaultDebounceDelay;
    this.editor = editor;
    this.applyWithDebounce();
    //editor.onDidChangeModel(this.applyWithDebounce);
    editor.onDidChangeModelContent(() => this.applyWithDebounce(editor));
  }
  applyWithDebounce(editor) {
    let _this = this || editor.colorObj;
    if (!this.debounceTimer) {
      this.debounceTimer = window.setTimeout(function () {
        _this.apply();
        _this.debounceTimer = null;
      }, this.debounce);
      return;
    }
  }
  apply() {
    // 释放之前的装饰对象
    if (this.oldModel) {
      this.oldDecorators = this.oldModel.deltaDecorations(this.oldDecorators, []);
    }
    if (!this.editor) {
      return;
    }
    var model = this.editor.getModel();
    if (!model || model.getLineCount() > 100000) {
      return; // 一万行不进行解析工作
    }
    // 1.界面变动后开始刷新括号配色
    // 2.解析每一对括号的位置信息
    // 3.给每对括号分配颜色
    // 4.调用vs_model的装饰器开始给括号上色

    var bracketPairColorizers = [];
    var code = this.editor.getValue();
    var regEx = /[\[\{\(]/g;
    var match = regEx.exec(code);
    var colorInd = 0;
    var bracketStack = [];
    while (match) {
      var startPos = model.getPositionAt(match.index);
      let bracket = model.matchBracket(startPos);
      if (bracket == null) {
        match = regEx.exec(code);
        continue;
      }

      let stackInd = bracketStack.length;
      let parentRange = bracketStack[stackInd - 1];
      while (stackInd != 0) {
        if (
          (parentRange && bracket[0].startLineNumber > parentRange.endLineNumber) ||
          (bracket[0].startLineNumber == parentRange.endLineNumber &&
            bracket[0].startColumn >= parentRange.endColumn)
        ) {
          // 同级的括号
          bracketStack.pop();
          stackInd = bracketStack.length;
          parentRange = bracketStack[stackInd - 1];
        } else {
          break;
        }
      }
      bracketStack.push(bracket[1]);

      // .splice(-1,1)
      let className = this.classNames[stackInd % this.classNames.length]; // css
      for (let i = 0; i < bracket.length; i++) {
        const range = bracket[i];
        var decoration = {
          range: range,
          options: {
            // className: className,
            inlineClassName: className,
            stickiness: monaco.editor.TrackedRangeStickiness.AlwaysGrowsWhenTypingAtEdges,
          },
        };
        bracketPairColorizers.push(decoration);
      }
      match = regEx.exec(code);
    }
    this.oldModel = model;
    this.oldDecorators = model.deltaDecorations(
      this.oldDecorators,
      bracketPairColorizers
    );
  }
  defaultColours = ["rgba(104,208,254,1)", "rgba(255,255,64,1)", "rgba(255,127,255,1)"];
  defaultDebounceDelay = 200;
}
</script>
<style lang="css">
@keyframes loading {
  from {
    background-position-x: 0%;
  }

  to {
    background-position-x: 100%;
  }
}
@keyframes fade {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.monaco-container.loading {
  background-image: repeating-linear-gradient(
    -45deg,
    #737373 0px,
    #777575 20px,
    transparent 20px,
    transparent 40px,
    #737373 40px,
    #737373 60px
  );
  animation: loading 30s linear infinite, fade 5s linear alternate infinite;
  background-size: 10% auto;
  background-position: 0 0;
  background-origin: content-box;
}
.monaco-container {
  height: 100%;
}
/*我也不知道这条css是我从哪里复制来的 */
.monaco-container .cus_bracket_line {
  border-style: ridge;
  border-width: 0px 0px 1px 0px;
  border-color: rgba(101, 142, 177, 1);
}
/*透明主题包含了这条规则，所以注释掉了 */
.lines-content.monaco-editor-background {
  /*--monaco-bg: transparent;
  /background-color: var(--monaco-bg);*/
}
</style>
