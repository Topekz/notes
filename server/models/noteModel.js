const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    name: {
        type: String,
        min: 1,
        max: 50,
        required: true
    },
    data: {
        type: String
    },
    owner: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("note", noteSchema);