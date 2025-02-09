// userValidation o userGuard
// comprueba que el rol del usuario obtenido del token sea el de "user"

const HttpError = require("../utils/httpError");

const userValidation = (req, res, next) => {
  // if (req.user && req.user.role !== "user") =(es lo mismo)= if (req.user?.role !== "user")
  // hace dos comprobaciones/verificación, 1º--> existe user?
  // en el caso de que exista user accede al objeto user, y en concreto analiza su role
  // si ese rol es distinto de "user" da error, y lanza un httpError
  // el nombre de user se lo damos nosotros, para que tenga lógica
  // if (req.user?.role !== "user" || req.user?.role !== "admin")
  //   throw new HttpError(401);
  // De esta manera podemos decir que si es admin o user, pueda ver los posts, porque validamos ambos tipos de user (user, admin)
  if (!["user", "admin"].includes(req.user?.role)) throw new HttpError(401);
  // en caso de que sea usuario y coincida con el rol, que continúe
  next();
};

module.exports = userValidation;
