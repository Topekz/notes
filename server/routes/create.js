const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const Note = require("../models/noteModel.js");
const verify = require("./verify.js");

router.post("/", verify, async (req,res) => {
    var user = req.user.id;
    var name = req.body.name;

    // Create username
    const note = new Note({
        name: name,
        owner: user
    });
    // Save username to database
    try {
        await note.save();
        return res.json({success: true, msg: "Note created", data: req.body});
    } catch(error) {
        res.json({success: false, msg: "Error", data: error});
    }
});

module.exports = router;