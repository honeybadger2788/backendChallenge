const express = require('express');
const app = express();

const usersRouter = require('./routes/users.routes/users.router')
const moviesRouter = require('./routes/movies.routes/movies.router')

let port = process.env.PORT || 3000;

app.use(express.json());

app.use('/users', usersRouter);

app.use('/movies', moviesRouter);

app.listen(port, function() {
    console.log(`El servidor está corriendo en el puerto: ${port}`)
    console.log(`http://localhost:${port}`)
})