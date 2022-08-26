var http = require('http'); // importamos el módulo de node http para poder trabajar con el protocolo

http.createServer(function(request, response){ // Creamos una serie de events listener, que van a escuchar por requests que ocurren en este socket
	//Para crear un response empezamos escribiendo el header
	response.writeHead(200, { 'Content-Type':'text/plain' }) //Le ponemos el status code y algunos pair-values en el header, luego el tipo de contenido
	response.end('Hola, Mundo como estas!\n');


}).listen(1337, '127.0.0.1'); //Por último tenemos que especificar en que puerto y en qué dirección va a estar escuchando nuestro servidor

//.writeHead(): es un metodo de response, el escribe en el header
//200: estatus code de la respuesta (response)
//.end(): respuesta final, es decir un texto plano que dice 'Hola, Mundo!'
//.listen(): donde se va a poner a escuchar el servidor

//CLIENTE: request de tipo GET ---> localhost: 1337
//SERVIDOR: response ----> Hola, Mundo!