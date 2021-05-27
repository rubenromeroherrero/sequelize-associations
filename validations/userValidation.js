// importamos libreria externa para validar
const Joi = require("joi");

// cualquiera de los 3 campos es opcional a rellenar/editar
const updateSchema = Joi.object({
  email: Joi.string().email(),
  // establecemos un minimo de 4 de longitud
  password: Joi.string().min(4),
  name: Joi.string(),
});

module.exports = { updateSchema };
