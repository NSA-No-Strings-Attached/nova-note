const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema()({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: Number,
        required: true
    }
});

const NoteBook = mongoose.model('NoteBook', bookSchema);

module.exports = NoteBook;
