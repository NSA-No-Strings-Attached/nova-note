var express = require('express');
var Note = require('../model/note');

const noteRouter = express.Router();

// Add Note

noteRouter.post('/addNote', async (req, res) => {
    let name = req.body.name;
    let content = req.body.content;
    let userId = req.body.userId;
    let nbId = req.body.noteBookId;

    const newNote = new Note({
        name: name, 
        content: content, 
        createdBy: userId, 
        noteBookId: nbId 
    });

    try {
        let savedNote = await newNote.save();
        res.status(200).send({message: 'Note Created', note: savedNote});
    } catch (err) {
        res.status(500).send({message: 'Note not Created !', err: err.message});
    }
});

// Update Note

noteRouter.post('/updateNote', async (req, res) => {
    let noteId = req.body.noteId;
    let name = req.body.name;
    let content = req.body.content;
    let userId = req.body.userId;

    try {
        let savedNote = await Note.findOneAndUpdate({
            _id: noteId,
            createdBy: userId
        }, {
            $set: {
                name: name,
                content: content
            }
        }, {
            new: true
        }, function (err) {
            if (err) {
                throw(err);
            }
            res.status(200).send({message: 'Note Updated', note: savedNote});
        });
    } catch (err) {
        res.status(500).send({message: 'Note not updated !', err: err.message});
    }
});

// Delete Note

noteRouter.delete('/deleteNote', async (req, res) => {
    let noteId = req.body.noteId;
    let userId = req.body.userId;

    try {
        await Note.deleteOne({
            _id: noteId,
            createdBy: userId
        }, function (err) {
            if (err) {
                throw err;
            }
            res.status(200).send({message: 'Note deleted'});
        })
    } catch (err) {
        res.status(500).send({message: 'Note not updated !', err: err.message});
    }
});

// Get Note

noteRouter.get('/getNote', async (req, res) => {
    let noteId = req.body.noteId;

    try {
        let note = await Note.findById(noteId);
        if (note) {
            res.status(200).send({
                note: note
            });
        } else {
            res.status(400).send({
                message: 'Note not found'
            });
        }
    } catch (err) {
        res.status(500).send({message: 'Cannot get Note', err: err.message});
    }
});

module.exports = noteRouter;