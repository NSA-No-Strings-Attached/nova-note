var supertest = require('supertest');

let server;
let userId = "123_user";
let nbId = "123_nb";
let nId;

describe('User Rest APIs', () => {
    
    beforeEach(() => {
        server = require('../server');
    });

    afterEach(() => {
        server.close();
    });

    //Add Note Test

    it('Adds a new Note', async () =>{
        const res = await supertest(server).post('api/note/addNote').send({
            name: 'note',
            content: 'content', 
            createdBy: userId, 
            noteBookId: nbId
        });

        nId = res.body.note._id;

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Note Created');
    });

    //Update Note Test

    it('Updates a Note', async () =>{
        const res = await supertest(server).post('api/note/updateNote').send({
            noteId : nId,
            name : 'updatedName',
            content : 'req.body.content',
            userId : userId
        });

        expect(res.status).toBe(200);
        expect(res.body.note.name).toBe('updatedName');
        expect(res.body.note.content).toBe('req.body.content');
        expect(res.body.message).toBe('Note Updated');
    });

    //Get Note Test

    it('Gets a Note', async () =>{
        const res = await supertest(server).post('api/note/getNote').send({
            noteId : nId
        });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('success');
        expect(res.body.note._id).toBe(nId);
    });

    it('Gets all Notes', async () =>{
        const res = await supertest(server).post('api/note/getNotes').send({
            noteBookId : nbId,
            userId : userId
        });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('success');
    });

    it('Deletes a Note', async () =>{
        const res = await supertest(server).post('api/note/deleteNote').send({
            noteId : nId,
            userId : userId
        });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Note deleted');
    });

});
