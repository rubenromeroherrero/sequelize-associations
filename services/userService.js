// definimos el modelo/ lógica de negocio --> archivo entre rutas y repositorios
// aquí es lo que la empresa o el cliente decide que quiere // CASOS DE USO DEL FRONT

const userRepository = require("../repositories/userRepository");
const encryptPassword = require("../utils/encryptPassword");
// importamos la libreria joi, para controlar las validaciones
const { updateSchema } = require("../validations/userValidation");
// para poder generar los token, es decir, encriptar los datos de nuestro usuario
const { generateToken } = require("./jwtService");

// métodos que van a hablar con la ruta
exports.signup = async (userDetails) => {
  if (!userDetails.password || !userDetails.email) {
    throw new Error("You must provide email and password");
  }

  //encriptamos la contraseña del usuario
  userDetails.password = await encryptPassword(userDetails.password);
  await userRepository.insertUser(userDetails);
};

exports.login = async (email, password) => {
  if (!email || !password) {
    throw new Error("You must provide email and password");
  }

  // buscamos usuario en DB
  const user = await userRepository.findUserWithPasswordByEmail(email);

  // en caso de no existir el usuario
  if (!user) throw new Error("Not found user");

  // debemos comprobar si las contraseñas introducidas y la db son iguales
  // primero tenemos que encriptar y después comparar
  const encryptedPassword = await encryptPassword(password);

  // en caso de no coincidir la contraseña
  if (user.password !== encryptedPassword) {
    throw new Error("Your password is incorrect");
  }

  // encriptamos los datos de usuario, para inyectarlos a la cabecera
  const token = generateToken(user.id, user.email, user.role);
  return token;
};

exports.getProfile = async (email) => {
  const user = await userRepository.findUserByEmail(email);
  return user.toJSON();
};

exports.getAllProfiles = async () => {
  return await userRepository.findAllUsers();
};

// el usuario ha inciado sesión y tenemos su info al completo, por eso buscamos por id
// con la librería de validación (joi) controlamos lo que queremos que pueda modificar el usuario
exports.editProfile = async (id, userDetails) => {
  // validamos lo que puede editar, en este caso lo que hemos estipulado en el scheme/joi
  const validation = await updateSchema.validateAsync(userDetails);
  // en caso de que envíe una nueva contraseña la encriptamos
  if (validation.password) {
    validation.password = await encryptPassword(validation.password);
  }
  await userRepository.updateUser(id, validation);
};
