const express = require("express");
const router = express.Router();
const Note = require("../models/noteModel.js");
const verify = require("./verify.js");

router.post("/", verify, async (req,res) => {
    var user = req.user.id;
    var name = req.body.name;
    var notebook = req.body.notebook;

    // Create note
    const note = new Note({
        name: name,
        owner: user,
        notebook: notebook
    });
    // Save note to database
    try {
        await note.save();
        return res.json({success: true, msg: "Note created", data: req.body, id: note._id});
    } catch(error) {
        res.json({success: false, msg: "Error", data: error});
    }
});

// Temporary
router.get("/", (req,res) => {
    Note
    .find()
    .exec(function(err, data) {
        return res.send(data);
    });
});

module.exports = router;