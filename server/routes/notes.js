const express = require("express");
const router = express.Router();
const Note = require("../models/noteModel.js");
const verify = require("./verify.js");

router.post("/", verify, (req,res) => {
    // Find note and return data
    Note
    .find({"_id": req.body.id})
    .exec(function(err, data) {
        return res.send(data);
    });
});

router.get("/", verify, (req,res) => {
    // Find notes and return data
    Note
    .find({"owner": req.user.id})
    .sort({date: -1})
    .exec(function(err, data) {
        return res.send(data);
    });
});

module.exports = router;