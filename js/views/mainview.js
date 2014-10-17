define([
    '../models/users'
    , 'appdepend'
], function (MyFamily) {
    var myFamily = new MyFamily();
    var Block = Backbone.View.extend({

        templates: {
        },

        initialize: function () {

        },

        el: '.block',//this.$("#block"),

        events: {
            "click .btCheck": "check",
            "click .btAdd": "btAdd"
        },



        render: function(){
            $(pageTemplate).appendTo("body");
            $("#caption").html(todo_templ);

            var tabl = [];


            var ftbl = $(tbl).attr("border", "1");
            var p = $(ftbl).appendTo("#content");

            tabl.push(new usr("a1", "s1", "e1@m.ru",23));
            tabl.push(new usr("stas","legaev","s.leg@epam.com",8,124));
            tabl.push(new usr("stas","zaycev","s.zay@copyright.com",18,125));
            tabl.push(new usr("anton","ivanov","a.ivanov@copyright.com",14));

            render(tabl, ftbl);
            $(".del").click(delrow);
            $(".edt").click(edtrow);


            $("thead").click(["ss"], function(e){
                e.preventDefault();
                var ce = $(e.toElement);

                if (ce.data("sort")=== undefined){
                    ce.data("sort","+");
                }

                $(p).fadeTo(0,0.15);

                tabl.sort(sortFunc(e.toElement.textContent, ce.data("sort")));

                render(tabl, p);
                $(".del").click(delrow);
                $(".edt").click(edtrow);

                $(p).fadeTo("slow",1);

                if (ce.data("sort") === '+') {
                    ce.data("sort", "-");
                } else {
                    ce.data("sort", "+");
                }
            });

            var delrow = function(e){
                e.preventDefault();
                if(confirm("are you sure?")) {
                    var did = this.parentElement.parentElement.id;
                    for (var i = 0; i < tabl.length; ++i) {
                        if (tabl[i].id === did) {
                            tabl.splice(i, 1);
                            break;
                        }
                    }
                    this.parentElement.parentElement.remove();
                }
            };

            var edtrow = function(e){
                e.preventDefault();
                var did = this.parentElement.parentElement.id;
                t.fadeIn("slow").show();
                for (var i=0; i<tabl.length; ++i){
                    if (tabl[i].id === did){
                        $("#name").val(tabl[i].name);
                        $("#sname").val(tabl[i].sname);
                        $("#email").val(tabl[i].email);
                        $("#hidden").val(tabl[i].hidden);
                        $("#data").val(tabl[i].data);
                        break;
                    }
                };
                $("#bok").data("edit",true).data("id",i);
            };

            $(".del").click(delrow);
            $(".edt").click(edtrow);

            var t = $(addTemplate);
            t.appendTo("#buttons").hide();

            t.find("#bok").click(function(e){
                t.fadeOut("slow");
                if ($("#bok").data("edit")) {
                    with (tabl[$("#bok").data("id")]) {
                        name = $("#name").val();
                        sname = $("#sname").val();
                        email = $("#email").val();
                        hidden = $("#hidden").val();
                        data = $("#data").val();
                    };
                } else {
                    tabl.push(new usr(
                            $("#name").val(),
                            $("#sname").val(),
                            $("#email").val(),
                            $("#data").val(),
                            $("#hidden").val()
                        )
                    );
                }
                render(tabl, p);
                $(".del").click(delrow);
                $(".edt").click(edtrow);


            });

            var but2 = $(buttonTempl("add","add record")).insertAfter("#buttons");
            but2.click(function(e){
                $(".inpdata").val("");
                t.fadeIn("slow").show();
                $("#bok").data("edit",false);
            });


            var but1 = $("<input/>").attr({type:"button", value:"sort me"}).appendTo("#buttons");
            but1.click(function(f){

                tabl.sort(sortFunc("sname"));
                render(tabl, p);
                $(".del").click(delrow);
                $(".edt").click(edtrow);

            });

            return this;
        }
    });
    return Block;
});

var sortFunc = function(colname, dir) {
    return function (a, b) {
        var s = dir === "+" ? 1 : -1;
        return s * (a[colname] > b[colname] ? 1 : -1);
    };
};

var cn = function (pf, i){
    var pf1 = pf || "mid-";
    var cn1 = i || 0;
    cn = function(pf, i){
        cn1 = i-1 || cn1;
        pf1 = pf || pf1;
        ++cn1;
        return pf1+cn1;
    };
    return pf1+cn1;
};


var tbl = ""+
    "<table>" +
    "<thead>" +
    "<tr><th>name</th><th>sname</th><th>email</th><th>data</th></tr>"+
    "</thead>"
"<tbody/>" +
"</table>";
var tb = "<tbody/>";
var tr = "<tr/>";

var usr = function(name, sname, email, data, hidden){
    var renderJq = function (){
        var res= $("<tr id=" + this.id + ">" +
            "<td><a class='edt' href='edt' style width=100>"+this.name+"</a></td>" +
            "<td style width='300'>"+this.sname+"</td>"+
            "<td>"+this.email+"</td>" +
            "<td>"+this.data+"</td>" +
            "</tr>");

        $(res).find("td:nth-last-child(1)").after($("<td><a class='edt' href='edt'>edit</a></td>"));
        $(res).find("td:nth-last-child(1)").after($("<td><a class='del' href='del'>delete</a></td>"));
        return res;
    };

    this.id = cn();
    this.name = name,
        this.sname = sname,
        this.email = email,
        this.data = data,
        this.hidden = hidden,
        this.jq = renderJq;
};

var render = function(tabl, cont) {
    $(cont).find('tbody').remove();
    $.each(tabl, function (i, tablc) {
        cont.append(tablc.jq());
    });
};


var pageTemplate = ""+
    "<div id='caption'/>"+
    "<div id='buttons'/>"+
    "<div id='content'/>"+
    "<div id='footer'/>";

function buttonTempl (id, val) {
    return ""+
        "<input "+
        "id='"+id+"'"+
        "type='button'"+
        "value='"+val+"'"+
        ">"
        ;
};

var addTemplate = ""+
    "<div id='add-template'>"+
    "<div>"+
    "<label for='name'>name:</label>"+
    "<input id='name' type='text' class='inpdata' placeholder='input name'>"+
    "</div>"+
    "<div>"+
    "<label for='sname'>sname:</label>"+
    "<input id='sname' type='text' class='inpdata' placeholder='input second name'>"+
    "</div>"+
    "<div>"+
    "<label for='email'>email:</label>"+
    "<input id='email' type='text' class='inpdata' placeholder='input email'>"+
    "</div>"+
    "<div>"+
    "<label for='hidden'>hidden:</label>"+
    "<input id='hidden' type='text' class='inpdata' placeholder='input hidden value'>"+
    "</div>"+
    "<div>"+
    "<label for='data'>data:</label>"+
    "<input id='data' type='text' class='inpdata' placeholder='input any other data'>"+
    "<input type='button' id='bok' value='submit'>"+
    "</div>"+
    "</div>";

var todo_templ = function() {

    var i,i1 = "\n" +
        "    Create simple application that provide an ability to manage employees list. Features that I was requested: \n" +
        "    1)      Table view that shows full employees list \n" +
        "a.      User should be able to click on edit link that placed next to each employee that lead user to popup with where user can edit employee details. All data should be prepopulated in form.\n" +
        "    b.      User should be able to click delete link next to every employee to delete employee from list. Before delete confirmation dialog should popup.\n" +
        "    c.      Table should be sortable\n" +
        "2)      Above table should be create employee link. Click on this link should lead to create popup form. Form should have validation rules.\n" +
        "3)      In main table view not all information about employee should be exposed. Detailed view for each employee should provide full information. Detailed view should be opened by clicking on user name.\n" +
        "\n"
    i=i1.split("\n");

    var res=$("<div>");
    for (var i3 in i) {
        $(res).append($("<div>").text(i[i3]));
    };
    return res;
};
