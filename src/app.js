const express = require('express');
const app = express();

const usersRouter = require('./routes/users.routes/users.router')

let port = process.env.PORT || 3000;

app.use(express.json());

app.use('/user', usersRouter);

app.listen(port, function() {
    console.log(`El servidor está corriendo en el puerto: ${port}`)
    console.log(`http://localhost:${port}`)
})