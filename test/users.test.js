process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const chai = require('chai');
const chaiHttp = require('chai-http');
const cookie = require('cookie');

const User = require('../api/models/userModel');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

describe('Users tests', () => {
    // after all befor all tests we empty the test database
    before(async (done) => {
        await User.deleteMany({});
        done();
    });
    after(async (done) => {
        await User.deleteMany({});
        done();
    });

    describe('connect and log', () => {
        const credentials = {
            email: 'truktest@gmail.com',
            password: 'truktest123',
        };
        it('should create a new user', (done) => {
            chai.request(server)
                .post('/users/signup')
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
        it('should connect the new user', (done) => {
            chai.request(server)
                .post('/users/login')
                .send(credentials)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.deep.property('user._id');
                    res.body.should.have.deep.property('user.email');
                    res.body.should.have.a.property('xsrfToken');

                    const cookies = cookie.parse(res.headers['set-cookie'][0]);
                    cookies.access_token.should.be.a('string');

                    done();
                });
        });
    });
});
