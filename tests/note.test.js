var supertest = require('supertest');

let server;
let userId = "123_user";
let nbId = "123_nb";
let nId;

describe('Note Rest APIs', () => {
    
    beforeEach(() => {
        server = require('../server');
    });

    afterEach(() => {
        server.close();
    });

    describe('POST requests', () => {

        /**
        * Test for adding a note
        */
        it('Adds a new Note', async () => {
            const res = await supertest(server)
                            .post('/api/note/addNote')
                            .send({
                                name: 'note',
                                content: 'content', 
                                userId: userId,
                                noteBookId: nbId
                            });

            nId = res.body.note._id;

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('Note Created');
        });

        /**
         * Test for updating an existing note
         */
        it('Updates a Note', async () => {
            const res = await supertest(server).post('/api/note/updateNote').send({
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
    });

    describe('GET requests', () => {

        /**
         * Test for getting a Note by Id
         */
        it('Gets a Note', async () => {
            const res = await supertest(server).get('/api/note/getNote').send({
                noteId : nId
            });

            expect(res.status).toBe(200);
            expect(res.body.note._id).toBe(nId);
        });
    });

    describe('Delete requests', () => {
        /**
         * Test for deleting a Note using note Id and user Id
         */
        it('Deletes a Note', async () => {
            const res = await supertest(server).delete('/api/note/deleteNote').send({
                noteId : nId,
                userId : userId
            });

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('Note deleted');
        });
    });
});
