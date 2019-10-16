import supertest from 'supertest';

let server;
let userId;

describe('User Rest APIs', () => {
    
    beforeEach(() => {
        server = require('../server');
    });

    afterEach(() => {
        server.close();
    });

    /**
     * Test for Registering a new User
     */
    it('Registers a new user', async () => {
        const res = await supertest(server).post('/api/user/register').send({ 
                name: 'User Name',
                email: 'userName@email.com',
                password: 'userPassword123'
            }
        );
        userId = res.user._id;

        expect(res.status).toBe(200);
        expect(res.body.message).toBe(`User added successfully`);
    });

    /**
     * Test for getting user information
     */
    it('Returns the details of a particular user', async () => {
        const res = await supertest(server).get('/api/user/me').send({
            userId: userId
        });

        expect(res.status).toBe(200);
        expect(res.body.user._id).toBe(userId);
    });
});