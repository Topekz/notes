const express = require("express");
const router = express.Router();
const Note = require("../models/noteModel.js");
const verify = require("./verify.js");

router.post("/", verify, (req,res) => {
    Note.findOneAndUpdate({"_id": req.body.id, "owner": req.user.id}, {"data": req.body.data, "name": req.body.name, "editDate": Date.now()}, {safe: true, upsert: true},
    function(err){
        if(err){
            return res.send(err);
        }
        else{
            return res.send("Updated");
        }
    });
});

module.exports = router;