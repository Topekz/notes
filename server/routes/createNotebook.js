const express = require("express");
const router = express.Router();
const Notebook = require("../models/notebookModel.js");
const verify = require("./verify.js");

router.post("/", verify, async (req,res) => {
    var user = req.user.id;
    var name = req.body.name;

    // Create notebook
    const notebook = new Notebook({
        name: name,
        owner: user
    });
    // Save notebook to database
    try {
        await notebook.save();
        return res.json({success: true, msg: "Notebook created", data: req.body, id: folder._id});
    } catch(error) {
        res.json({success: false, msg: "Error", data: error});
    }
});

// Temporary
router.get("/", (req,res) => {
    Notebook
    .find()
    .exec(function(err, data) {
        return res.send(data);
    });
});

module.exports = router;