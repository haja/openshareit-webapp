requirejs.config({
    urlArgs: "bust=" + (new Date()).getTime,
    paths: {
        sizzle: "../lib/sizzle/dist/sizzle"
        , async: "../lib/requirejs-plugins/src/async"
        , depend: "../lib/requirejs-plugins/src/depend"
        , font: "../lib/requirejs-plugins/src/font"
        , goog: "../lib/requirejs-plugins/src/goog"
        , image: "../lib/requirejs-plugins/src/image"
        , json: "../lib/requirejs-plugins/src/json"
        , mdown: "../lib/requirejs-plugins/src/mdown"
        , noext: "../lib/requirejs-plugins/src/noext"
        , propertyParser: "../lib/requirejs-plugins/src/propertyParser"
        , "Markdown.Converter": "../lib/requirejs-plugins/lib/Markdown.Converter"
        , text: "../lib/requirejs-plugins/lib/text"
        , requirejs: "../lib/requirejs/require"
        , domReady: '../lib/requirejs-domready/domReady'
        , knockout: "../lib/knockout.js/knockout"
        , jquery: "../lib/jquery/jquery"
        , "jquery.cookie": "../lib/jquery-cookie/jquery.cookie"
        , holderjs: "../lib/holderjs/holder"
        , bootstrap: "../lib/bootstrap/dist/js/bootstrap"
        , "bootstrap-datepicker": "../lib/bootstrap-datepicker/js/bootstrap-datepicker"
        , durandal: "../lib/durandal/js"
        , plugins: "../lib/durandal/js/plugins"
        , transitions: "../lib/durandal/js/transitions"
        , underscore: "../lib/underscore/underscore"
        , moment: "../lib/momentjs/min/moment-with-langs.min"
    },
    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'jQuery'
        }
        , 'bootstrap-datepicker': {
            deps: ['jquery', 'bootstrap'],
            exports: '$.fn.datepicker'
        }
    }
});

define(['durandal/system', 'durandal/app', 'durandal/viewLocator', 'bootstrap'], function (system, app, viewLocator) {

    system.debug(true);

    app.title = 'OpenShareIt';

    app.configurePlugins({
        router:true,
        dialog: true,
        widget: true,
    });

    app.start().then(function() {
        //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
        //Look for partial views in a 'views' folder in the root.
        viewLocator.useConvention();

        //Show the app by setting the root view model for our application.
        app.setRoot('viewmodels/shell');
    });
});
