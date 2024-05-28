const bcrypt = require('bcryptjs');

// Cambia esto por la contraseña quiieras
const password = '1234';
// Número de rondas de salting, es el nivel de seguridad
const saltRounds = 10; 

bcrypt.hash(password, saltRounds, function(err, hash) {
  console.log(hash); // Este es el hash que necesitarás para insertar en MongoDB 
});
