const express = require('express');
const app = express();
require('dotenv').config()

const usersRouter = require('./routes/users.routes/users.router')
const moviesRouter = require('./routes/movies.routes/movies.router')
const charactersRouter = require('./routes/characters.routes/characters.router')

const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/auth', usersRouter);

app.use('/movies', moviesRouter);

app.use('/characters', charactersRouter);

app.use('/', (req, res) => {
    res.send('Welcome to Disney Movies API')
});

app.listen(PORT, function() {
    console.log(`El servidor está corriendo en el puerto: ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})