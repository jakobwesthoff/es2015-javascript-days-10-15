/* */ 
"format cjs";
(function(mod) {
  if (typeof exports == "object" && typeof module == "object")
    mod(require("../../lib/codemirror"), require("../../addon/mode/simple"));
  else if (typeof define == "function" && define.amd)
    define(["../../lib/codemirror", "../../addon/mode/simple"], mod);
  else
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";
  CodeMirror.defineSimpleMode("handlebars", {
    start: [{
      regex: /\{\{!--/,
      push: "dash_comment",
      token: "comment"
    }, {
      regex: /\{\{!/,
      push: "comment",
      token: "comment"
    }, {
      regex: /\{\{/,
      push: "handlebars",
      token: "tag"
    }],
    handlebars: [{
      regex: /\}\}/,
      pop: true,
      token: "tag"
    }, {
      regex: /"(?:[^\\]|\\.)*?"/,
      token: "string"
    }, {
      regex: /'(?:[^\\]|\\.)*?'/,
      token: "string"
    }, {
      regex: />|[#\/]([A-Za-z_]\w*)/,
      token: "keyword"
    }, {
      regex: /(?:else|this)\b/,
      token: "keyword"
    }, {
      regex: /\d+/i,
      token: "number"
    }, {
      regex: /=|~|@|true|false/,
      token: "atom"
    }, {
      regex: /(?:\.\.\/)*(?:[A-Za-z_][\w\.]*)+/,
      token: "variable-2"
    }],
    dash_comment: [{
      regex: /--\}\}/,
      pop: true,
      token: "comment"
    }, {
      regex: /./,
      token: "comment"
    }],
    comment: [{
      regex: /\}\}/,
      pop: true,
      token: "comment"
    }, {
      regex: /./,
      token: "comment"
    }]
  });
  CodeMirror.defineMIME("text/x-handlebars-template", "handlebars");
});
