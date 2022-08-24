var primerMetodo = function() {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         //console.log('Terminó el primer método');
         resolve({num: '123'}); //pasamos unos datos para ver como los manejamos
      }, 2000); // para simular algo asincronico hacemos un setTimeOut de 2 s
   });
   return promise;
};
 
 
var segundoMetodo = function(datos) {// datos= {num: '123'}
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         //console.log('Terminó el segundo método');
         resolve({nuevosDatos: datos.num + ' concatenamos texto y lo pasamos'});
      }, 2000);
   });
   return promise;
};
 
var tercerMetodo = function(datos) {//datos= {nuevosDatos: '123 concatenamos texto y lo pasamos'}
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         //console.log('Terminó el tercer método');
         //console.log(datos.nuevosDatos); //imprimos los datos concatenados --> '123 concatenamos texto y lo pasamos'
         resolve('hola');
      }, 3000);
   });
   return promise;
};

// primerMetodo()//{num: '123'}
//    .then(segundoMetodo)//{nuevosDatos: '123 concatenamos texto y lo pasamos'}
//    .then(tercerMetodo)//'hola'
//    .then(function(datos){
//        console.log(datos); //debería ser el 'hola' que pasamos en tercerMetodo
//    });

//---------------------------------------------------------------------------------------------------------------

var _1erMetodo = function() {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el primer método');
         resolve({num: '1'}); 
      }, 2000); // para simular algo asincronico hacemos un setTimeOut de 2 s
   });
   return promise;
};

var _2erMetodo = function() {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el segundo método');
         resolve({num: '2'}); 
      }, 2000); // para simular algo asincronico hacemos un setTimeOut de 2 s
   });
   return promise;
};

var _3erMetodo = function() {
   var promise = new Promise(function(resolve, reject){
      setTimeout(function() {
         console.log('Terminó el tercer método');
         resolve({num: '3'}); 
      }, 2000); // para simular algo asincronico hacemos un setTimeOut de 2 s
   });
   return promise;
};


let p1 = _1erMetodo();
let p2 = _2erMetodo();
let p3 = _3erMetodo();

console.log(p1);
//p1.then(data =>{ console.log(data);});

//
Promise.all([p1,p2,p3])
.then(values => {
   console.log(values);//[ { num: '1' }, { num: '2' }, { num: '3' } ]
})
.catch(err => {}) // podemos atrapar cualquier error que haya tirado cualquiera de las promesas



// p1.then(funcion(valordep1){
//   return p2; // si p2  es una promesa;
// }).then(function(valordeP2){
//   return p3; // si p3 es otra promesa;
// }).then(function(valordeP3){
  
// });