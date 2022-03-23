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

var accessToken

describe('Movies: ', () => {
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
    describe('Get movies: ', () => {
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
    })
});