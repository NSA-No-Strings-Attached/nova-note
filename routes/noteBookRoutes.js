var express = require('express');
var NoteBook = require('../model/noteBook');

const nbRouter = express.Router;

// Add NoteBook

nbRouter.post('/addNoteBook', async (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let userId = req.body.userId;

    try {
        const noteBook = new NoteBook({title: name, description: description, createdBy: userId, dateCreated: Date.now});
        let newBook = await noteBook.save();
        res.status(200).send({message: 'NoteBook Created', book: newBook});
    } catch (err) {
        res.status(500).send({message: 'NoteBook not Created !', err: err.message});
    }
});

// Update NoteBook

nbRouter.post('/updateNoteBook', async (req, res) => {
    let name = req.body.name;
    let description = req.body.description;
    let nbId = req.body.noteBookId;
    let userId = req.body.userId;

    var query = {
        _id: nbId,
        createdBy: userId
    };

    try {
        const noteBook = await NoteBook.findOneAndUpdate(query, {
            $set: {
                name: name,
                description: description
            }
        }, {
            new: true
        }, function (err) {
            if (err) {
                throw err;
            }
            res.status(200).send({message: 'NoteBook updated', book: noteBook});
        });
    } catch (err) {
        res.status(500).send({message: 'NoteBook not Updated !', err: err.message});
    }
});

// Delete NoteBook

nbRouter.delete('/deleteNoteBook', async (req, res) => {
    let nbId = req.body.noteBookId;
    let userId = req.body.userId;

    try {
        await NoteBook.remove({
            _id: nbId,
            userId: userId
        }, function (err) {
            if (err) {
                throw(err);
            }
            res.status(200).send({message: 'NoteBook deleted'});
        })
    } catch (err) {
        res.status(500).send({message: 'NoteBook not Deleted !', err: err.message});
    }
})

// Get NoteBook

nbRouter.get('/getNoteBook', async (req, res) => {
    let nbId = req.body.noteBookId;
    let userId = req.body.userId;

    var query = {
        _id: nbId,
        createdBy: userId
    }

    try {
        const noteBook = await NoteBook.findOne(query, function (err) {
            if (err) {
                throw err;
            }
            res.status(200).send({message: 'success', book: noteBook});
        })
    } catch (err) {
        res.status(500).send({message: 'cannot get noteBook !', err: err.message});
    }
});

// Get All NoteBook

nbRouter.get('/getAllNoteBooks', async (req, res) => {
    let userId = req.body.userId;

    try {
        const noteBooks = await NoteBook.find({
            userId: userId
        }, function (err) {
            if (err) {
                throw err;
            }
            res.status(200).send({message: 'success', books: noteBooks});
        })
    } catch (err) {
        res.status(500).send({message: 'cannot get noteBooks !', err: err.message});
    }
})
