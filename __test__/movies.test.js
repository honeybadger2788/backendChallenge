require('dotenv').config()
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const db = require('../src/database/models/index')

const PORT = process.env.PORT || 3000;

chai.use(chaiHttp);
const url = `http://localhost:${PORT}`;

const testUser = {
    username: 'test@test.com',
    password: '12345678'
}

const tokenExpirated = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBydWViYUBob3RtYWlsLmNvbSIsImlhdCI6MTY0NzMwMjg5OSwiZXhwIjoxNjQ3MzA2NDk5fQ.uRELwZMeFEpmfCNc4cuM98XKfolQikLzDkZo7NrUTKM'

var accessToken

describe('Get movies: ', () => {
    beforeEach(done => {
        chai.request(url)
        .post('/auth/register')
        .send(testUser)
        .end( function(err,res){
            expect(res).to.have.status(200);
            done();
        });
    });

    beforeEach(done => {
        chai.request(url)
        .post('/auth/login')
        .send(testUser)
            .end(function (err, res) {
            accessToken = res.body.accessToken
            expect(res).to.have.status(200);
            done();
        });
    });

    afterEach( async () => {
        // Luego de cada test, elimina el usuario creado
        const result = await db.User.destroy({
            where: { username: testUser.username },
            force: true
        });
        return result
    });

    it('should get all movies', done => {
        chai.request(url)
        .get('/movies')
        .set('Authorization','Bearer '+accessToken)
        .send(testUser)
        .end( function(err,res){
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe('Get movies with authentication error  : ', () => {
    it('should receive an authentication error', done => {
        chai.request(url)
        .get('/movies')
        .send(testUser)
        .end( function(err,res){
            expect(res).to.have.status(401);
            done();
        });
    });
    it('should receive an expiration token error', done => {
        chai.request(url)
        .get('/movies')
        .set('Authorization','Bearer '+tokenExpirated)
        .send(testUser)
        .end( function(err,res){
            expect(res).to.have.status(403);
            done();
        });
    });
})
