"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("assert");
var express = require('express');
var bodyParser = require('body-parser');
var Members = [];
var app = express();
var Member = /** @class */ (function () {
    function Member(id, name, email, mobile, committee) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.committee = committee;
    }
    return Member;
}());
app.use(bodyParser.json([assert_1.strict, true]));
app.listen(3000, function () {
    console.log("the server is running on port 3000 ");
});
app.post('/members', function (req, res) {
    var member1 = req.body;
    Members.push(member1);
    res.send(Members);
    console.log(Members);
});
app.get('/member/:id', function (req, res) {
    var id = req.params.id;
    var state = false;
    Members.find(function (data) {
        if (data.id == id) {
            res.send(data);
            state = true;
            return;
        }
    });
    if (!state) {
        res.status(400);
        res.send("Their is No Member With That ID ");
    }
});
app.put('/member/:id', function (req, res) {
    var memberId = req.params.id;
    var editData = req.body;
    var state = false;
    for (var i = 0; i < Members.length; i++) {
        if (Members[i].id == memberId) {
            Members[i] = editData;
            state = true;
            break;
        }
    }
    if (state)
        res.send("The Member Was Edited Succecfully");
    else {
        res.status(400);
        res.send("ERROR HAS OCCURED");
    }
});
app.delete('/member/:id', function (req, res) {
    var memberIndex;
    var id = req.params.id;
    for (memberIndex = 0; memberIndex < Members.length; memberIndex++) {
        if (Members[memberIndex].id == id)
            break;
    }
    Members.splice(memberIndex, 1);
    res.send("Removed succuflly");
});
