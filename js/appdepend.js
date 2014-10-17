require.config({
    baseUrl: "./libs",
    paths: {
        "jquery": 'jquery-2.0.3.min',
        "underscore": 'underscore'
    },
    shim: {
        backbone: {
            deps: ["jquery", "underscore"],
            exports: "backbone"
        },
        bootstrap: {
            deps: ["jquery"]
        }
    },
    waitSeconds: 150
});

define([
    "underscore",
    "jquery",
    "backbone",
    "bootstrap"
], function (){

});
