var supertest = require('supertest');

let server;
let userId = "123_user";;
let nbId;

describe('Note Book Rest APIs', () => {

    beforeEach(() => {
        server = require('../server');
    });

    afterEach(() => {
        server.close();
    });

    // Add NoteBook test

    it('Adds a new NoteBook', async () => {
        const res = await supertest(server).post('/api/noteBook/addNoteBook').send({
            name : 'name',
            description : 'a NoteBook',
            userId : userId
        });

        nbId = res.body.book._id;

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('NoteBook Created');
    });

    // Updates a NoteBook

    it('Updates a NoteBook', async () => {
        const res = await supertest(server).post('/api/noteBook/updateNoteBook').send({
            noteBookId : nbId,
            name : 'updatedName',
            description : 'req.body.content',
            userId : userId
        });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('NoteBook Updated');
    });

    it('Gets a NoteBook', async () => {
        const res = await supertest(server).get('/api/noteBook/getNoteBook').send({
            noteBookId : nbId,
            userId : userId
        });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('success');
        expect(res.body.book._id).toBe(nbId);
    });

    it('Gets all Notes', async () => {
        const res = await supertest(server).get('/api/noteBook/getNoteBooks').send({
            userId : userId
        });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('success');
    });

    it('Deletes a NoteBook', async () => {
        const res = await supertest(server).delete('/api/noteBook/deleteNoteBook').send({
            noteBookId : nbId,
            userId : userId
        });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('NoteBook deleted');
    });

});
