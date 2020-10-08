const express = require("express");
const router = express.Router();
const User = require("../models/userModel.js");
const verify = require("./verify.js");

router.post("/", (req,res) => {

});

router.get("/", verify, (req,res) => {
    // Find user and return data
    User
    .find({"_id": req.user.id})
    .exec(function(err, data) {
        return res.send(data);
    });
});

module.exports = router;