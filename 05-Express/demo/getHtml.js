//Archivo: getHtml.js

var express = require('express');
var router = express.Router();
//Metodo Router de express

module.exports = router.get('/', (req, res) => {
    console.log('Estoy en /html');
		res.send('<h1>Estoy en pantalla</h1>');
});

