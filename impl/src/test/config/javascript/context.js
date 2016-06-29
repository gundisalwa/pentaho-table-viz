// Find and inject tests using requirejs
var tests = Object.keys(window.__karma__.files).filter(function(file) {
  return (/.spec\.js$/).test(file);
});
var depDir = "target/dependency";
var depWebJars = depDir + "/META-INF/resources/webjars";
var src = "src/main/javascript/web";

requirejs.config({
  baseUrl: "/base",
  paths: {
    "css": depWebJars + "/require-css/${dependency.require-css.version}/css",
    "text": depWebJars + "/requirejs-text/${dependency.requirejs-text.version}/text",
    "pentaho": depDir + "/common-ui/resources/web/pentaho",
    "pentaho/i18n": src + "/lib/i18nMock"
  },
  map: {
    "*": {
      i18n: "pentaho/i18n",
      "pentaho/type/theme": "pentaho/type/themes/crystal"
    }
  },
  bundles: {},
  config: {
    service: {}
  },
  packages: [],
  deps: tests,
  callback: function() {
    window.__karma__.start();
  }
});

var CONTEXT_PATH = "/base/";
