const express = require("express");
const router = express.Router();
const Folder = require("../models/folderModel.js");
const verify = require("./verify.js");

router.post("/", verify, (req,res) => {
    // Find folder and return data
    Folder
    .find({"_id": req.body.id})
    .exec(function(err, data) {
        return res.send(data);
    });
});

router.get("/", verify, (req,res) => {
    // Find folders and return data
    Folder
    .find({"owner": req.user.id})
    .sort({name: 1})
    .exec(function(err, data) {
        return res.send(data);
    });
});

module.exports = router;