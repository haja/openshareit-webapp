require.config({
  urlArgs: "bust=" + (new Date()).getTime(), // remove this for production
  shim: {
    bootstrap: [
      'jquery'
    ]
  },
  paths: {
    requirejs: '../../bower_components/requirejs/require',
    holderjs: '../../bower_components/holderjs/holder',
    bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap',
    jquery: '../../bower_components/jquery/dist/jquery.min',
    domReady: '../../bower_components/requirejs/bower_components/requirejs-domready/domReady',
    async: '../../bower_components/requirejs-plugins/src/async',
    depend: '../../bower_components/requirejs-plugins/src/depend',
    font: '../../bower_components/requirejs-plugins/src/font',
    goog: '../../bower_components/requirejs-plugins/src/goog',
    image: '../../bower_components/requirejs-plugins/src/image',
    json: '../../bower_components/requirejs-plugins/src/json',
    mdown: '../../bower_components/requirejs-plugins/src/mdown',
    noext: '../../bower_components/requirejs-plugins/src/noext',
    propertyParser: '../../bower_components/requirejs-plugins/src/propertyParser',
    'Markdown.Converter': '../../bower_components/requirejs-plugins/lib/Markdown.Converter',
    text: '../../bower_components/requirejs-plugins/lib/text',
    'knockout-amd-helpers': '../../bower_components/knockout-amd-helpers/build/knockout-amd-helpers.min',
    knockout: '../../bower_components/knockout/build/output/knockout-latest.debug'
  }
});

require(['knockout', 'index-model-viewmodel', 'holderjs', 'bootstrap', 'jquery', 'domReady!', 'async!http://maps.google.com/maps/api/js?sensor=false', 'knockout-amd-helpers'], function(ko, items_viewmodel, holderjs, bootstrap, $) {
    ko.amdTemplateEngine.defaultPath = "../html/templates";
    ko.applyBindings(new items_viewmodel());
});
