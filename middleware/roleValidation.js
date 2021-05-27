const HttpError = require("../utils/httpError");

// !!!Con el role validation no necesitamos de userValidation ni admin validation

// función de primer orden --> función que invoca a otra función
// le pasamos un rol y nos valida ese rol que le pasamos
// cuando el role que introducimos sea user, no dejamos que acceda a la info
// si el role que le pasamos es admin, permitirá pasar al siguiente middleware y por tanto a la info
// en este caso [...role] --> adimte más de un rol
const roleValidation = (role) => {
  // analizamos si lo que recibimos en rol es un array o un solo valor (user, admin)
  // en el caso de que sea un array coge un array y si no es un array, lo transforma en array
  const roles = Array.isArray(role) ? role : [role];
  // destructuramos ese array y decimos si incluye el rol de admin --> express operator ..., descompone array
  return (req, res, next) => {
    if (![...roles, "admin"].includes(req.user?.role)) throw new HttpError(401);
    next();
  };
};

/*
//string
[..."hola"] --> devuelve ["h","o","l","a"]
// array
[...["hola"]] --> devuelve ["hola"]
*/

module.exports = roleValidation;
