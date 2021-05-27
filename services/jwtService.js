// librería externa que sirve para generar encriptados
const jwt = require("jsonwebtoken");

// necesita clave secreta para poder encriptar
const SECRET_KEY = "poseidon";

// necesitamos validar el token generado que pertenece a un usuario
const validateToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};

// Este encriptado se inyecta en la CABECERA
// el role se añade cuando firme el usuario
const generateToken = (id, email, role) => {
  // 1 --> le indicamos que queremos que encripte el email y el rol --> payload
  // 2 parametro clave secreta para poder encriptar
  // 3 parámetro, el tiempo en el que expira ese encriptado (tras ese tiempo, requiere otra firma)
  return jwt.sign({ id, email, role }, SECRET_KEY, { expiresIn: "1h" });
};

module.exports = { generateToken, validateToken };
