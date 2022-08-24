//----------------------------------------------- stdout & stdin --------------------------------------------------
// Output un prompt
// process.stdout.write('prompt > ');// va a escribir el argumento que le pasamos por consola, es decir mostrara 'prompt > '
// // El evento stdin 'data' se dispara cuando el user escribe una línea
// process.stdin.on('data', function (data) { // el argumento data se va cargar con lo que escribar el usuario
//     var cmd = data.toString().trim(); // en cdm de esta guardado lo que escribio el usuario. 
//     process.stdout.write('Tu escribiste: ' + cmd);
//     process.stdout.write('\nprompt > ');
// });

// loque hace el metodo .trim(): '   hola     '.trim()  ----> 'hola'

//------------------------------------------------------------------------------------------------------------------

//---------------------------------------------- pwd & date --------------------------------------------------------
// //Archivo: bash.js
// const commands = require('./commands/index.js');// commands = {date: ..., pwd: ..., ls: ...}
// // Output un prompt
// process.stdout.write('prompt > ');
// // El evento stdin 'data' se dispara cuando el user escribe una línea
// process.stdin.on('data', function (data) {
//   var cmd = data.toString().trim(); // remueve la nueva línea
// //   if(cmd === 'date' || 'fecha') { //Si el usuario escribio date en el terminal, 
// //     //process.stdout.write(Date());// Mostrar la fecha
// //     commands[cmd]();
// //   }
// //   if(cmd === 'pwd' || 'directorio') {
// //     //Hay un objeto de process el .cwd() que muestra la ruta donde estoy parado
// //     //process.stdout.write(process.cwd());
// //     commands[cmd]();
// //   }
// if (commands.hasOwnProperty(cmd)) {
//     commands[cmd]();
// }
// else{
//   process.stdout.write('command not found');
// }
//   process.stdout.write('\nprompt > ');
// });

//----------------------------------------------------------------------------------------------------------------

//--------------------------------------------------- echo -------------------------------------------------------

//Archivo: bash.js

// cuando escribamos: echo hola mundo ---> hola mundo
// "echo hola mundo".split(' ') ---> ["echo", "hola", "mundo"].shift ---> "echo" && ["hola",]

const commands = require('./commands/index.js');
// commands = {date: ..., pwd: ..., ls: ..., ...}

const done = function (output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt >')
}
// Output un prompt
process.stdout.write('prompt > ');
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on('data', function (data) {
    var args = data.toString().trim().split(' '); // remueve la nueva línea
    var cmd = args.shift();
    if (commands.hasOwnProperty(cmd)) {
        commands[cmd](args, done);
    }
    else {
        process.stdout.write('command not found');
    }
});


