const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = require('chai').expect;
const db = require('../src/database/models/index')

const PORT = process.env.PORT || 3000;

chai.use(chaiHttp);
const url = `http://localhost:4000`;

const testUser = {
    username: 'test@test.com',
    password: '12345678'
}

describe('Insert a user: ', () => {
    it('should insert a user', (done) => {
        chai.request(url)
        .post('/auth/register')
        .send(testUser)
        .end( function(err,res){
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe('Insert a user with error: ',()=>{
    it('should receive an error', (done) => {
        chai.request(url)
        .post('/auth/register')
        .send({ username: 'test', password: 12345 })
        .end( function(err,res){
            expect(res).to.have.status(500);
            done();
        });
    });
});

describe('Login a user: ', () => {
    afterEach( async () => {
        // Luego de cada test, elimina el usuario creado
        const result = await db.User.destroy({
            where: { username: testUser.username },
            force: true
        });
        return result
    });

    it('should login a user', (done) => {
        chai.request(url)
        .post('/auth/login')
        .send(testUser)
        .end( function(err,res){
            expect(res).to.have.status(200);
            done();
        });
    });
});

describe('Login a user with error: ',()=>{
    it('should receive an error', (done) => {
        chai.request(url)
        .post('/auth/login')
        .send({ username: 'test', password: '12345' })
        .end( function(err,res){
            expect(res).to.have.status(500);
            done();
        });
    });
});