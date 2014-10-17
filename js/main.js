define([
    'router/router'
    , 'views/mainview'
    , 'appdepend'
], function (MyRouter, mainview) {

    var a = $("<div>").text("Backbone.VERSION: " + Backbone.VERSION);
    a.prependTo($("body"));
    var b = $("<div>").text("_.VERSION: " + _.VERSION);
    b.appendTo(a);

    var myRouter = MyRouter.init();

    var c = $(button_template).find(">").attr("value", "('go to success')");
    c.appendTo($('body'));
    $(c).click(function () {
            //alert("cls");
            myRouter.navigate("success", {trigger: true});
        }
    );

    var d = $(button_template).find(">").attr("value", "g  to start");
    d.appendTo($('body'));
    $(d).click(function () {
//            alert("d-cls");
            myRouter.navigate('', {trigger: true});
        }
    );

    var myv = new mainview();
    myv.render();

});


var button_template = "" +
    "            <div class='buttonplace'>" +
    "<input class='btBtn' type='button'/>" +
    "</div>";


