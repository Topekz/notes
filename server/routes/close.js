const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const Note = require("../models/noteModel.js");
const verify = require("./verify.js");

router.post("/", verify, (req,res) => {

    // Remove user
    User.findByIdAndDelete(req.user.id,
    function(err){
        if(err){
            return res.send(err);
        }
    });

    // Remove notes
    Note.deleteMany({"owner": req.user.id},
    function(err){
        if(err){
            return res.send(err);
        }
    });

    return res.send("Account clsoed");
});

module.exports = router;