const express = require("express");
const router = express.Router();

// Logout user
router.post("/", (req, res) => {
    // Clear cookies
    res.cookie('token', "", { expires: new Date(), domain: process.env.CLIENT });
    res.cookie('loggedin', "", { expires: new Date(), domain: process.env.CLIENT });

    // Return
    return res.send("Logged out");
});

module.exports = router;