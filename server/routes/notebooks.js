const express = require("express");
const router = express.Router();
const Notebook = require("../models/notebookModel.js");
const verify = require("./verify.js");

router.post("/", verify, (req,res) => {
    // Find notebook and return data
    Notebook
    .find({"_id": req.body.id})
    .exec(function(err, data) {
        return res.send(data);
    });
});

router.get("/", verify, (req,res) => {
    // Find notebooks and return data
    Notebook
    .find({"owner": req.user.id})
    .sort({name: 1})
    .exec(function(err, data) {
        return res.send(data);
    });
});

module.exports = router;