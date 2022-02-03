const express = require('express');
const app = express();

let port = process.env.PORT || 3000;

app.use('/', (req, res) => {
 res.send("hello world")   
});

app.listen(port, function() {
    console.log(`El servidor está corriendo en el puerto: ${port}`)
    console.log(`http://localhost:${port}`)
})