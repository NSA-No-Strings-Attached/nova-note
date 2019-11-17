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
        type: String,
        required: true
    },
    noteBookId: {
        type: String,
        required: true
    }

});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
