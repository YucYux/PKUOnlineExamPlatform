/*
This file is basically derived from two online file, plus pylance.
However, since there lacks type analysis and grammar analysis, the suggestion is very stupid.
 */
export default async function (language, obj) {
  if (!language || (!obj)) {
    console.log("language and dict needed",
      `sample of dict:{token1:{suggestion1:val,...},...`);
    return;
  }
  //borrowed from nowhere in the web.
  //borrowed from monaco language file.
  //borrowed from pylance scrape.py.
  //python-token.json
  const keywords = await fetch("src/assets/python-token.json").then((e) => e.json());
  if (language === "python")
    monaco.languages.registerCompletionItemProvider("python", {
      provideCompletionItems: function (model, position, token) {
        let result = new Set();
        var last_chars = model.getValueInRange({
          startLineNumber: position.lineNumber,
          startColumn: 0,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        });
        var words = last_chars.replace("\t", "").trim().split(/[. &%/^!|=:+-/*//()]/);
        console.log(words);
        var active_typing = words[words.length - 1];
        for (let i in keywords) {
          if (keywords[i].indexOf(active_typing) >= 0) result.add(keywords[i]);
        }
        //regExp search user typed vars
        //https://www.cnblogs.com/FuturexGO/p/12976656.html
        let identifier = new RegExp("([a-zA-Z_.]\\w*)", "g");
        let array1;
        let codes = model.getValue();
        while ((array1 = identifier.exec(codes)) !== null) {
          result.add(array1[0]);
        }
        if (result.size) {
          let results = Array.from(result);
          return {
            suggestions: results.map((val) => {
              return {
                label: val,
                insertText: val,
                kind: monaco.languages.CompletionItemKind.Variable
              };
            })
          }
        } else return null;
      },
    });
  // Helper function to return the monaco completion item type of a thing
  function getType(thing, isMember) {
    isMember = (isMember == undefined) ? (typeof isMember == "boolean") ? isMember : false : false; // Give isMember a default value of false

    var c = monaco.languages.CompletionItemKind;
    var k = "Variable";
    switch ((typeof thing).toLowerCase()) {
      case "object":
        k = "Class";

      case "function":
        k = isMember ? "Method" : "Function";

      default:
        k = isMember ? "Property" : "Variable";
    }
    return c[k];
  }

  // Register object that will return autocomplete items
  monaco.languages.registerCompletionItemProvider(language, {
    // Run this function when the period or open parenthesis is typed (and anything after a space)
    triggerCharacters: ['.', '('],

    // Function to generate autocompletion results
    provideCompletionItems: function (model, position, token) {
      // Split everything the user has typed on the current line up at each space, and only look at the last word
      var last_chars = model.getValueInRange({
        startLineNumber: position.lineNumber,
        startColumn: 0,
        endLineNumber: position.lineNumber,
        endColumn: position.column
      });
      var words = last_chars.replace("\t", "").split(" ");
      var active_typing = words[words.length - 1]; // What the user is currently typing (everything after the last space)

      // If the last character typed is a period then we need to look at member objects of the obj object
      var is_member = active_typing.charAt(active_typing.length - 1) == ".";

      // Array of autocompletion results
      var result = [];

      // Used for generic handling between member and non-member objects
      var last_token = obj || {};
      var prefix = '';

      if (is_member) {
        // Is a member, get a list of all members, and the prefix
        var parents = active_typing.substring(0, active_typing.length - 1).split(".");
        last_token = obj[parents[0]];
        prefix = parents[0];

        // Loop through all the parents the current one will have (to generate prefix)
        for (var i = 1; i < parents.length; i++) {
          if (last_token.hasOwnProperty(parents[i])) {
            prefix += '.' + parents[i];
            last_token = last_token[parents[i]];
          } else {
            // Not valid
            return null;
          }
        }

        prefix += '.';
      }

      // Get all the child properties of the last token
      for (var prop in last_token) {
        // Do not show properites that begin with "__"
        if (last_token.hasOwnProperty(prop) && !prop.startsWith("__")) {
          // Get the detail type (try-catch) incase object does not have prototype
          var details = '';
          try {
            details = last_token[prop].__proto__.constructor.name;
          } catch (e) {
            details = typeof last_token[prop];
          }

          // Create completion object
          var to_push = {
            label: prefix + prop,
            kind: getType(last_token[prop], is_member),
            detail: details,
            insertText: prop
          };

          // Change insertText and documentation for functions
          if (to_push.detail.toLowerCase() == 'function') {
            to_push.insertText += "(";
            to_push.documentation = (last_token[prop].toString()).split("{")[0]; // Show function prototype in the documentation popup
          }

          // Add to final results
          result.push(to_push);
        }
      }

      return result.length ? {
        suggestions: result,
      } : null;
    }
  });
}