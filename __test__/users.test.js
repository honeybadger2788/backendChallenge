let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('Insert a user: ',()=>{
    it('should insert a user', (done) => {
        chai.request(url)
        .post('/auth/register')
        .send({ username: 'test@test.com', password: '12345678' })
        .end( function(err,res){
            /* console.log(res.body) */
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
            /* console.log(res.body) */
            expect(res).to.have.status(500);
            done();
        });
    });
});

describe('Login a user: ',()=>{
    it('should login a user', (done) => {
        chai.request(url)
        .post('/auth/login')
        .send({ username: 'test@test.com', password: '12345678' })
        .end( function(err,res){
            /* console.log(res.body) */
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
            /* console.log(res.body) */
            expect(res).to.have.status(500);
            done();
        });
    });
});





