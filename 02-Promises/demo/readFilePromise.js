var fs = require('fs');

var promise = new Promise(function(resolve, reject) {
  // Hacer cosas acá dentro, probablemente asincrónicas.
  fs.readFile('./archivo.txt', 'utf8', function(err, data) { // Asincronico
    if (err) {// Asincronico
      return reject(Error("Algo se rompió"));
    }
    console.log('2. ',data);    
    resolve(data);
  }); 
});

// var nuevaDataPromesa = promise.then(function(data) {
//   var nuevaData = data.split('').splice(0, 100).join('');
//   return nuevaData;
// })

console.log('1: ', promise);

promise.then(function(data) {//Asincronico
  console.log('3: ', data);
  console.log('se cumplió la promesa');
}, err => {
  console.log(err);
})

console.log('HOLIIIII');
// var lectura;
// fs.readFile('./archivo.txt', 'utf8', function(err, data) { 
//   lectura = data;
// }); 

// console.log(lectura);





  //  dataBase.verifyUser(username, password, (error, userInfo) => {
  //      if (error) {
  //          callback(error)
  //      }else{
  //          dataBase.getRoles(username, (error, roles) => {
  //              if (error){
  //                  callback(error)
  //              }else {
  //                  dataBase.logAccess(username, (error) => {
  //                      if (error){
  //                          callback(error);
  //                      }else{
  //                          callback(null, userInfo, roles);
  //                      }
  //                  })
  //              }
  //          })
  //      }
  //  })
