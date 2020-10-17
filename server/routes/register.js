const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");

router.post("/", async (req,res) => {
    var username = req.body.username.toLowerCase();
    var password = req.body.password;

    // Validate name
    if(!(username.length >= 3 && username.length <= 20)) {
        return res.json({success: false, msg: "Name length must be 3-20"});
    }
    var validUser = /^[0-9a-zA-Z]+$/;
    if(!username.match(validUser)) {
        return res.json({success: false, msg: "Name has invalid characters"});
    }

    // Validate password
    if(!(password.length >= 6 && password.length <= 100)) {
        return res.json({success: false, msg: "Password length must be 6-100"});
    }
    var validPassword = /^[a-zA-Z\d\-_.,#@!?€$&%+*^'/\\s]+$/;
    if(!password.match(validPassword)) {
        return res.json({success: false, msg: "Password has invalid characters"});
    }

    // Check if exists
    if(await User.findOne({username: username})) {
        return res.json({success: false, msg: "User already exists"});
    }

    // Hash & salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
        username: username,
        password: hashedPassword
    });
    // Save user to database
    try {
        await user.save();
        return res.json({success: true, msg: "User registered", data: req.body});
    } catch(error) {
        res.json({success: false, msg: "Error", data: error});
    }
});

// Temporary
router.get("/", (req,res) => {
    User
    .find()
    .exec(function(err, data) {
        return res.send(data);
    });
});

module.exports = router;