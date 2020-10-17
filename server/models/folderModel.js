const mongoose = require("mongoose");

const folderSchema = mongoose.Schema({
    name: {
        type: String,
        min: 1,
        max: 50,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    notes: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("folder", folderSchema);