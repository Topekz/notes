const express = require("express");
const router = express.Router();
const Note = require("../models/noteModel.js");
const verify = require("./verify.js");

router.post("/", verify, (req,res) => {
    Note.findOneAndDelete({"_id": req.body.id, "owner": req.user.id},
    function(err){
        if(err){
            return res.send(err);
        }
        else{
            return res.send("Removed");
        }
    });
});

module.exports = router;