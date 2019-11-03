const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: Number,
        required: true
    },
    noteBookId: {
        type: Number,
        required: true
    }

});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
