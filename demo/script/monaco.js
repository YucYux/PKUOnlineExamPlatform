function startMonaco(input, parent, id, options) {
    if (!id) id = "vscode";
    var v = zzz.create("div", {
        id: id
    }, {
        minHeight: "10em"
    }, parent || zzz.get.id("main"));
    require(['vs/editor/editor.main'], function () {
        window[id] = monaco.editor.create(v, {
            value: "",
            language: 'python',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            fontSize: zzz.browser.screenX / 100 * 1.5 + "px"
        });
        if (options) window[id].updateOptions(options);
        monaco.editor.defineTheme('anotherTheme', {
            base: 'vs',
            inherit: true,
            fontSize: "1em",
            rules: [{
                background: 'FFFFFF'
            }]
        });
        monaco.editor.setTheme('anotherTheme');
        for (let i = 1; i <= input.length; i++) {
            let substr = input.substring(0, i);
            setTimeout(() => {
                window[id].setValue(substr);
            }, i * 100);
        }
    });
    return v;
}

require.config({
    paths: {
        'vs': 'script/monaco/min/vs'
    }
});
require(["vs/loader"], function () {
    var defaultText = "def init():\n\tprint('Hello World')\n#This is a demo page powered by monaco.\n#You can freely type any code you favor.";
    startMonaco(defaultText, zzz.get.cls("answer")[0]);
    startMonaco("Here is a console", zzz.get.cls("answer")[0], "vscodeConsole", {
        lineNumbers: "off",
        readOnly: true,
        minimap: {
            enabled: false
        }
    });
});