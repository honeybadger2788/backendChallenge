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

const testMovie = {
    title: "Test Movie",
    image_url: "https://www.testurl.com/",
    launch_date: "2017-11-22",
    rate: 5,
    id_genre: 3,
    characters: [
        {
            name: "Test Character",
            image_url: "https://www.testurl.com/",
            age: 10,
            weight: 30,
            story: "velit scelerisque in dictum non consectetur a erat nam at lectus urna duis convallis convallis tellus id interdum velit laoreet id donec ultrices tincidunt arcu non sodales neque sodales ut"
        }
    ]
}

const tokenExpirated = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InBydWViYUBob3RtYWlsLmNvbSIsImlhdCI6MTY0NzMwMjg5OSwiZXhwIjoxNjQ3MzA2NDk5fQ.uRELwZMeFEpmfCNc4cuM98XKfolQikLzDkZo7NrUTKM'

var accessToken
var id_movie

describe('Get movie detail: ', () => {
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
    /* creamos una nueva pelicula a los efectos de asegurarnos que el elemento que se esta testeando, existe */
    beforeEach(done => {
        chai.request(url)
        .post('/movies')
        .set('Authorization','Bearer '+accessToken)
        .send(testMovie)
        .end(function (err, res) {
            /* guardamos el id en una variable para poder utilizarlo en el test de detalle */
            id_movie = res.body.data.id_movie
            expect(res).to.have.status(201);
            done();
        });
    });
    
    afterEach( async () => {
        // Luego de cada test, elimina los datos creados
        const removeUser = await db.User.destroy({
            where: { username: testUser.username },
            force: true
        });
        const removeMovie = await db.Movie.destroy({
            where: { title: testMovie.title },
            force: true
        });
        const removeCharacter = await db.Character.destroy({
            where: { name: testMovie.characters[0].name },
            force: true
        });
        return removeUser && removeMovie && removeCharacter
    });
    
    it('should get one movie detail', done => {
        chai.request(url)
        .get(`/movies/${id_movie}/detail`)
        .set('Authorization','Bearer '+accessToken)
        .end(function (err, res) {
            /* console.log(res.body.data.id_movie) */
            expect(res.body.data).to.have.property('id_movie').to.be.equal(id_movie);
            expect(res).to.have.status(200);
            done();
        });
    });
});


describe('Get movies with authentication error  : ', () => {
    it('should receive an authentication error', done => {
        chai.request(url)
        .get('/movies')
        .end( function(err,res){
            expect(res).to.have.status(401);
            done();
        });
    });
    it('should receive an expiration token error', done => {
        chai.request(url)
        .get('/movies')
        .set('Authorization','Bearer '+tokenExpirated)
        .end( function(err,res){
            expect(res).to.have.status(403);
            done();
        });
    });
})
