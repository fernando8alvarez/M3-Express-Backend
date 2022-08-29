//Archivo: index.js

var express = require('express');
var app = express();
var morgan = require('morgan');

app.use(morgan('dev'));

app.get('/html', (req, res) => {
    console.log('Estoy en /html');
		res.send('<h1>Estoy en pantalla</h1>');
});


app.listen(1337);


