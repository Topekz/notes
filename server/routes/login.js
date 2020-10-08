const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const Note = require("../models/noteModel.js");

router.post("/", async (req,res) => {
    var username = req.body.username;
    var password = req.body.password;

    // Check if exists
    const user = await User.findOne({username: username});
    if(!user) {
        return res.json({success: false, msg: "User not found"});
    }

    // Validate password
    if(!await bcrypt.compare(password, user.password)) {
        return res.json({success: false, msg: "Incorrect password"});
    }

    // Create JWT token
    const token = jwt.sign({
        id: user._id, username: user.username
    }, process.env.TOKEN_SECRET);

   // Send cookie
   res.cookie('token', token, {maxAge: 1000*60*60*24*365*2, httpOnly: true, domain: process.env.CLIENT});
   res.cookie('loggedin', 'true', {maxAge: 1000*60*60*24*365*2, httpOnly: false, domain: process.env.CLIENT});
   return res.json({success: true, msg: "Logged In", data: req.body});
});

module.exports = router;