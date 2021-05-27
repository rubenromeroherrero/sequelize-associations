const { validateToken } = require("../services/jwtService");

// MIDDLEWARE -> decodificar la info del token y setearla en la request
const tokenValidation = (req, res, next) => {
  if (req.headers.authorization) {
    // cogemos el token de la cabecera, para validarlo
    // quitar convenio Bearer nºtoken --> 7 caracteres --> se genera una vez traemos el token del header
    const token = req.headers.authorization.slice(7);
    // Sólo vamos a querer de la validación del token el email y el role
    const { id, email, role } = validateToken(token);
    // al objeto request le añadimos una propiedad nueva llamada user, que será un objeto que contendrá email y role
    req.user = { id, email, role };
  }
  // para que pase de middleware en nuestra app
  next();
};

module.exports = tokenValidation;
