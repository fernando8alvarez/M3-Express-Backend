//------------ Ejemplo 1 ------------
const promise1 = Promise.resolve(123);

promise1.then((value) => {
    console.log(value);
});
//> 123

//----------------- Ejemplo 2 ------------------
Promise.resolve('Éxito').then(function (value) {
    console.log(value); 
}, function (error) {
    // nunca la tomara en cuenta,
    // solo toma los .then()
});
//> "Éxito"

//--------- Ejemplo 3 ----------
var p = Promise.resolve([1,2,3]);

console.log(p);
//p = Promise { [ 1, 2, 3 ] }

p.then(function(v) {
  console.log(v[0],v[1]); // 1
});
//> 1
