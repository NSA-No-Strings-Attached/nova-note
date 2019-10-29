var superTest = require('supertest');

let server;
let userId;

describe('User Rest APIs', () => {

    beforeEach(() => {
        server = require('../server');
    });

    afterEach(() => {
        server.close();
    });
    
    describe('POST requests', () => {

        /**
         * Test for Registering a new User
         */
        it('Registers a new user', async () => {
            const res = await superTest(server)
                        .post('/api/user/register')
                        .send({ 
                            name: 'UserName',
                            email: 'userName@email.com',
                            password: 'userPassword123'
                        });
            userId = res.body.user._id;
            expect(res.status).toBe(200);
            expect(res.body.message).toBe(`User added successfully`);
        });
    });

    describe('GET requests', () => {
        
        /**
         * Test for getting user information
         */
        it('Returns the details of a particular user', async () => {
            const res = await superTest(server).get('/api/user/me').send({
                userId: userId
            });

            expect(res.status).toBe(200);
            expect(res.body._id).toBe(userId);
        });
    });

    describe('DELETE requests', () => {

        /**
         * Test for deleting user based on userId
         */
        it('Deletes an User for a given user id', async () => {
            const res = await superTest(server).delete('/api/user/delete').send({
                userId: userId
            });

            expect(res.status).toBe(200);
            expect(res.body.message).toBe('User deleted successfully');
        });
    });
});