// necesitamos de la librería crypto para encriptar
const crypto = require("crypto");
// requerimos de la librería nativa de node para generar promesas
const { promisify } = require("util");

// convertir método que requiere un callback, por eso lo transformamos a un formato prommisse
const asyncScrypt = promisify(crypto.scrypt);

const encryptPassword = async (password) => {
  // 2ºparámetro --> código secreto que se va a utilizar para encriptar la contraseña
  const encryptedPassword = await asyncScrypt(password, process.env.SALT, 32);
  // convertir a formato string hexadecimal
  return encryptedPassword.toString("hex");
};

module.exports = encryptPassword;
