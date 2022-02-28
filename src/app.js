const express = require('express');
const app = express();

const usersRouter = require('./routes/users.routes/users.router')
const moviesRouter = require('./routes/movies.routes/movies.router')
const charactersRouter = require('./routes/characters.routes/characters.router')

let port = process.env.PORT || 3000;

app.use(express.json());

app.use('/', (req, res) => {
    res.send('Welcome to Disney API')
});

app.use('/auth', usersRouter);

app.use('/movies', moviesRouter);

app.use('/characters', charactersRouter);

app.listen(port, function() {
    console.log(`El servidor está corriendo en el puerto: ${port}`)
    console.log(`http://localhost:${port}`)
})