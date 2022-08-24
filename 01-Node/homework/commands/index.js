//Archivo: index.js

const fs = require('fs');
const request = require('request');

module.exports = {
    date: function (args, done) { done(Date()) },
    pwd: (args, done) => { done(process.cwd()) },
    ls: (args, done) => {
        fs.readdir('.', function (err, files) {
            if (err) throw err;// el throw es como un return para errores
            let out = '';
            files.forEach(function (file) {
                //process.stdout.write(file.toString() + "\n");
                out = out + file + '\n';
            })

            done(out);
        });
    },
    echo: (args, done) => { done(args.join(' ')) },
    cat: function (file, done) {
        fs.readFile(file[0], 'utf8', (err, data) => {
            if (err) throw err;

            done(data);
        })
    },
    head: function (file, done) {
        fs.readFile(file[0], 'utf8', (err, data) => {
            if (err) throw err;
            const lines = data.split('\n').slice(0, 9).join('\n');
            // process.stdout.write(lines);
            // process.stdout.write('\nprompt >')
            done(lines);
        })
    },
    tail: function (file, done) {
        fs.readFile(file[0], 'utf8', (err, data) => {
            if (err) throw err;
            const lines = data.split('\n').slice(-10).join('\n');
            //Con el -10 el slice empieza a contar de atras hacia adelante 
            // las ultimas 10 lineas
            // process.stdout.write(lines);
            // process.stdout.write('\nprompt >');
            done(lines);
        })
    },
    curl: (url, done)=>{ request(url[0], (err, response, body)=>{
        if (err) throw err;
        // process.stdout.write(body);
        // process.stdout.write('\nprompt >');
        done(body);
    })}

}

