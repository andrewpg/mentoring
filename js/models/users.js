define([
    'appdepend'
], function () {
    var UserNameModel = this.Backbone.Model.extend({ // User model
        defaults: {
            "Name": "",
            "LastName": ""
        },
        checkUser: function(){
            alert("user check in progress");
            return this;
        }

    });
    return UserNameModel;
});

