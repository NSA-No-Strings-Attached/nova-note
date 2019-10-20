import {Schema, model} from 'mongoose';

const bookSchema = new mongoose.Schema()({

    title: {
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

const NoteBook = model('NoteBook', bookSchema);

export default NoteBook;
