import { strict } from "assert";
const express = require('express');
const bodyParser = require('body-parser');
let Members: Member[] = [];
const app = express();
class Member {
    public id: string;
    public name: string;
    public email: string;
    public mobile: string;
    public committee: string;

    constructor(id: string, name: string, email: string, mobile: string, committee: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.committee = committee;

    }
}

app.use(bodyParser.json([strict, true]));


app.listen(3000, () => {
    console.log("the server is running on port 3000 ");
});


app.post('/members', (req: any, res: any) => {
    const member1: Member = req.body;
    Members.push(member1);
    res.send(Members);
    console.log(Members);
});





app.get('/member/:id', (req: any, res: any) => {
    const id = req.params.id;
    let state = false;
    Members.find((data) => {
        if (data.id == id) {
            res.send(data);
            state = true;
            return;
        }
    });
    if (!state) { res.status(400); res.send("Their is No Member With That ID "); }
});






app.put('/member/:id', (req: any, res: any) => {
    const memberId = req.params.id;
    const editData: Member = req.body;
    let state = false;
    for (let i = 0; i < Members.length; i++) {
        if (Members[i].id == memberId) {
            Members[i] = editData;
            state = true;
            break;
        }
    }
    if (state)
        res.send("The Member Was Edited Succecfully");
    else { res.status(400); res.send("ERROR HAS OCCURED"); }
});





app.delete('/member/:id', (req: any, res: any) => {
    let memberIndex;
    const id = req.params.id;
    for (memberIndex = 0; memberIndex < Members.length; memberIndex++) {
        if (Members[memberIndex].id == id)
            break;
    }
    Members.splice(memberIndex, 1);
    res.send("Removed succuflly");

});






