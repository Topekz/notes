const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    name: {
        type: String,
        min: 1,
        max: 50,
        required: true
    },
    data: {
        type: String,
        default: ""
    },
    owner: {
        type: String,
        required: true
    },
    notebook: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    editDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("note", noteSchema);