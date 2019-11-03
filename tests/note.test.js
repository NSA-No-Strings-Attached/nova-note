var supertest = require('supertest');

let server;
let userId;
let nbId;
let nId;

describe('User Rest APIs', () => {
    
    before(() => {
        server = require('../server');
        const res = await supertest(server).post('/api/user/register').send({ 
            name: 'User Name',
            email: 'userName@email.com',
            password: 'userPassword123'
        }
    );
    userId = res.user._id;
        const nbResponse = await supertest(server).post('api/noteBook/addNoteBook').send({
            name: 'noteBook',
            description: 'description', 
            createdBy: userId
        }
    );
    nbId = nbResponse.book._id;
    });

    after(() => {
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
            noteId = nId,
            name = 'updatedName',
            content = 'req.body.content',
            userId = userId
        });

        expect(res.status).toBe(200);
        expect(res.body.note.name).toBe('updatedName');
        expect(res.body.note.content).toBe('req.body.content');
        expect(res.body.message).toBe('Note Updated');
    });

    //Get Note Test

    it('Gets a Note', async () =>{
        const res = await supertest(server).post('api/note/getNote').send({
            noteId = nId
        });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('success');
        expect(res.body.note._id).toBe(nId);
    });

    it('Gets all Notes', async () =>{
        const res = await supertest(server).post('api/note/getNotes').send({
            noteBookId = nbId,
            userId = userId
        });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('success');
    });

    it('Deletes a Note', async () =>{
        const res = await supertest(server).post('api/note/deleteNote').send({
            noteId = nId,
            userId = userId
        });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Note deleted');
    });

});
