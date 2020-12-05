const mongoose = require("mongoose");

const notebookSchema = mongoose.Schema({
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
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("notebook", notebookSchema);