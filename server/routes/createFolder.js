const express = require("express");
const router = express.Router();
const Folder = require("../models/folderModel.js");
const verify = require("./verify.js");

router.post("/", verify, async (req,res) => {
    var user = req.user.id;
    var name = req.body.name;

    // Create folder
    const folder = new Folder({
        name: name,
        owner: user
    });
    // Save folder to database
    try {
        await folder.save();
        return res.json({success: true, msg: "Folder created", data: req.body, id: folder._id});
    } catch(error) {
        res.json({success: false, msg: "Error", data: error});
    }
});

// Temporary
router.get("/", (req,res) => {
    Folder
    .find()
    .exec(function(err, data) {
        return res.send(data);
    });
});

module.exports = router;