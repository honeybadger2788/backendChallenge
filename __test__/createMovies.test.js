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


describe('Create movies: ', () => {
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

    it('should create a movie', done => {
        chai.request(url)
        .post('/movies')
        .set('Authorization','Bearer '+accessToken)
        .send(testMovie)
        .end( function(err,res){
            expect(res).to.have.status(201);
            done();
        });
    });
});

describe('Create movies with errors: ', () => {
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
        // Luego de cada test, elimina los datos creados
        const removeUser = await db.User.destroy({
            where: { username: testUser.username },
            force: true
        });
        /* const removeMovie = await db.Movie.destroy({
            where: { title: testMovie.title },
            force: true
        });
        const removeCharacter = await db.Character.destroy({
            where: { name: testMovie.characters[0].name },
            force: true
        }); */
        return removeUser /* && removeMovie && removeCharacter */
    });

    it('should receive an error', done => {
        chai.request(url)
        .post('/movies')
        .set('Authorization','Bearer '+accessToken)
        .send({})
        .end( function(err,res){
            expect(res).to.have.status(500);
            done();
        });
    });
});