var express = require('express');
var Note = require('../model/note');

const noteRouter = express.Router;

// Add Note

noteRouter.post('/addNote', async (req, res) => {
    let name = req.body.name;
    let content = req.body.content;
    let userId = req.body.userId;
    let nbId = req.body.noteBookId;

    const newNote = new Note({
        title: name, 
        content: content, 
        createdBy: userId, 
        noteBookId: nbId, 
        dateCreated: Date.now
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
                title: name,
                content: content
            }
        }, {
            new: true
        }, function (err) {
            if (err) {
                throw(err);
            }
            res.status(200).send({message: 'Note Created', note: savedNote});
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
        await Note.remove({
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

        const reqNote = await Note.findOne({
            _id: noteId
        }, function (err) {
            if (err) {
                throw err;
            }
            res.status(200).send({message: 'success', note: reqNote});
        })

    } catch (err) {
        res.status(500).send({message: 'Cannot get Note !', err: err.message});
    }
});

// Get All Notes

noteRouter.get('/getNotes', async (req, res) => {
    let userId = req.body.userId;
    let nbId = req.body.noteBookId;

    var query = {
        createdBy: userId,
        noteBookId: nbId
    };

    try {
        const reqNotes = await Note.find(query, function (err) {
            if (err) {
                throw err;
            }
            res.status(200).send({message: 'success', notes: reqNotes});
        })
    } catch (err) {
        res.status(500).send({message: 'Cannot get Notes !', err: err.message});
    }
});
