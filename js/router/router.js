define([
    'appdepend'
], function () {

    var Router = Backbone.Router.extend({
        routes: {
            "": "init", // Empty hash-tag
            "#": "start", // start page
            "success": "success", // happy
            "error": "error", // worst
            "add": "add"
        },

        init: function () {
            alert("init");
        },
        add: function () {
            Backbone.trigger("add");
        },

        start: function () {
            //         block.render("start");
            alert("start");
            // appState.set({ state: "start" });
        },

        success: function () {
            alert("success        success");
            //       block.render("success");
            // appState.set({ state: "success" });
        },

        error: function () {
            //     block.render("error");
            alert("error");
            //appState.set({ state: "error" });
        }
    });
    return {
        init: function () {
            var router = new Router();
            Backbone.history.start();
            return router;
        }

    }
});

