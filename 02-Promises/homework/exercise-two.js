'use strict';

var Promise = require('bluebird'),
    async = require('async'),
    exerciseUtils = require('./utils');
const { log } = require('console');

var readFile = exerciseUtils.readFile,
    promisifiedReadFile = exerciseUtils.promisifiedReadFile,
    blue = exerciseUtils.blue,
    magenta = exerciseUtils.magenta;

var args = process.argv.slice(2).map(function(st){ return st.toUpperCase(); });

module.exports = {
  problemA: problemA,
  problemB: problemB,
  problemC: problemC,
  problemD: problemD,
  problemE: problemE
};

// corre cada problema dado como un argumento del command-line para procesar
args.forEach(function(arg){
  var problem = module.exports['problem' + arg];
  if (problem) problem();
});

function problemA () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * A. loggea el poema dos stanza uno y stanza dos en cualquier orden
   *    pero loggea 'done' cuando ambos hayan terminado
   *    (ignora errores)
   *    nota: lecturas ocurriendo paralelamente (en simultaneo)
   *
   */

  // callback version
  // async.each(['poem-two/stanza-01.txt', 'poem-two/stanza-02.txt'],
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- A. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- A. callback version done --');
  //   }
  // );

  // promise version
  const one = promisifiedReadFile('poem-two/stanza-01.txt').then((stanza1)=>blue(stanza1))
  const two = promisifiedReadFile('poem-two/stanza-02.txt').then((stanza2)=>blue(stanza2))

  Promise.all([one, two])
  .then(()=> {console.log('done')})
  //OTRA MANERA: quitando los then de arriba
  // .then(stanzas => {
  //   blue(stanzas[0])
  //   blue(stanzas[1])
  //   console.log('done');
  // })

}

function problemB () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * B. loggea todas las stanzas en poema dos, en cualquier orden y loggea
   *    'done' cuando todas hayan terminado
   *    (ignora errores)
   *    nota: las lecturas ocurren en paralelo (en simultaneo)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });

  //filenames = ['poem-two/stanza-01.txt','poem-two/stanza-02.txt','poem-two/stanza-04.txt',...]

  // callback version
  // async.each(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- B. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- B. callback version done --');
  //   }
  // );

  // promise version
  const promises = filenames.map((file)=> promisifiedReadFile(file).then(stanza => blue(stanza)));
  //promises = ["prometo consologuear 1", "prometo consologuear 2", "prometo consologuear 3", ... ]

  Promise.all(promises)
  .then(()=> console.log("done"))

}

function problemC () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * C. Lee y loggea todas las stanzas en el poema dos, *en orden* y
   *    loggea 'done cuando hayan terminado todas
   *    (ignorá errores)
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });

  // callback version
  // async.eachSeries(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- C. callback version --');
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     console.log('-- C. callback version done --');
  //   }
  // );

  // promise version
  //filenames = ['poem-two/stanza-01.txt','poem-two/stanza-02.txt','poem-two/stanza-04.txt',...]
  //acc = acumulador = Promise.resolve(false) --> establecemos un valor inicial
  //currentFile = archivo actual = 'poem-two/stanza-01.txt'

  //acc = Promise {false} ---> acumulador (valor inicial)
  //currentFile = 'poem-two/stanza-01.txt' ---> valor actual
  filenames.reduce((acc, currentFile)=>{
    return acc.then((stanza)=>{
      if (stanza) { blue(stanza);}
     return promisifiedReadFile(currentFile);
    })
   // cuando el reduce llegue hata el ultimo, el acc quedara 
   // con el ultimo currentFile, por lo tanto hay que mostrarlo
   // con otro .then() ya que el reduce no volvera a entrar
  }, Promise.resolve(false))
  .then(ultimaStanza => {
    blue(ultimaStanza)
    console.log('done')
  })

}

function problemD () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * D. loggea todas las stanzas en el poema dos *en orden* asegurandote
   *    de fallar para cualquier error y logueando un 'done cuando todas
   *    hayan terminado
   *    nota: las lecturas ocurren en serie (solo cuando las previas
   *    hayan terminado)
   *
   */

  var filenames = [1, 2, 3, 4, 5, 6, 7, 8].map(function (n) {
    return 'poem-two/' + 'stanza-0' + n + '.txt';
  });
  var randIdx = Math.floor(Math.random() * filenames.length);
  filenames[randIdx] = 'wrong-file-name-' + (randIdx + 1) + '.txt';

  // callback version
  // async.eachSeries(filenames,
  //   function (filename, eachDone) {
  //     readFile(filename, function (err, stanza) {
  //       console.log('-- D. callback version --');
  //       if (err) return eachDone(err);
  //       blue(stanza);
  //       eachDone();
  //     });
  //   },
  //   function (err) {
  //     if (err) magenta(new Error(err));
  //     console.log('-- D. callback version done --');
  //   }
  // );

  // promise version
  //filenames = ['poem-two/stanza-01.txt','poem-two/stanza-02.txt','poem-two/stanza-04.txt',...]
  //acc = acumulador = Promise.resolve(false) --> establecemos un valor inicial
  //currentFile = archivo actual = 'poem-two/stanza-01.txt'

  //acc = Promise {false} ---> acumulador (valor inicial)
  //currentFile = 'poem-two/stanza-01.txt' ---> valor actual
  filenames.reduce((acc, currentFile)=>{
    return acc.then((stanza)=>{
      if (stanza) { blue(stanza);}
     return promisifiedReadFile(currentFile);
    })
   // cuando el reduce llegue hata el ultimo, el acc quedara 
   // con el ultimo currentFile, por lo tanto hay que mostrarlo
   // con otro .then() ya que el reduce no volvera a entrar
  }, Promise.resolve(false))
  .then(ultimaStanza => {
    blue(ultimaStanza)
    console.log('done')
  })
  .catch(err => {
    magenta(new Error(err))
    console.log('done')
  })
}

function problemE () {
  /* * * * * * * * * * * * * * * * * * * * * * * * * * * *
   *
   * E. Haz una versión promisificada de fs.writeFile
   *
   */

  var fs = require('fs');
  function promisifiedWriteFile (filename, str) {
    // tu código aquí
    return new Promise((resolve, reject)=> {
      fs.writeFile(filename, str, err => {
        if (err) return reject(err)
        resolve(str)
      })
    });

    // utils.promisifiedReadFile = function (filename) {
    //   return new Promise(function (resolve, reject) {
    //     utils.readFile(filename, function (err, str) {
    //       if (err) reject(err);
    //       else resolve(str);
    //     });
    //   });
    // };
  }
}
