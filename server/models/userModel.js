const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        min: 3,
        max: 20,
        unique: true,
        required: true
    },
    password: {
        type: String,
        min: 1,
        max: 1024,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("user", userSchema);