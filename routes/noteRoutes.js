import express from 'express';
import Note from '../model/note';

const noteRouter = express.Router;

// Add Note

noteRouter.post('/addNote' ,async(req , res ) => {
    let name = req.body.name;
    let content = req.body.content;
    
    const newNote = new Note({
        name : name,
        content : content
    });

    try{
        let savedNote = await newNote.save();
        res.status(200).send({
            message : 'Note Created',
            note : newNote
        });

    }catch(err){
        res.status(500).send({
            message : 'Note not Created !',
            err : err.message
        });
    }
       
});

noteRouter.post('/updateNote' , async(req,res) => {
    let noteId = req.body.noteId;
    let name = req.body.name;
    let content = req.body.content;

    const updatedNote = new Note({
        name : name,
        content : content
    })

    try{
    let savedNote = await Note.findOneAndUpdate({ _id  : noteId } ,updatedNote , {new : true} , function(err){
        if(err){
            throw(err);
        }
        res.status(200).send({
            message : 'Note Created',
            note : savedNote
        });
    } );
    }catch(err){
        res.status(500).send({
            message : 'Note not updated !',
            err : err.message
        });
    }
});

noteRouter.delete('/deleteNote' , async(req , res) =>{
    let noteId = req.body.noteId;

    try{
        await Note.remove({_id : noteId} , function(err){
            if(err){
                throw err;
            }
            res.status(200).send({
                message : 'Note deleted'
            });
        })
    }catch(err){
        res.status(500).send({
            message : 'Note not updated !',
            err : err.message
        });
    }


});

noteRouter.get('/getNote',async(req,res)=>{
    let noteId = req.body.noteId;

    try{

        const reqNote = await Note.findOne({_id : noteId} , function(err){
            if(err){
                throw err;
            }
            res.status(200).send({
                message : 'success',
                note : reqNote
            });
        })

    }catch(err){
        res.status(500).send({
            message : 'Cannot get Note !',
            err : err.message
        });
    }
});

noteRouter.get('/getNotes', async(req, res)=>{
    let userId = req.body.userId;

    //TO_DO
})