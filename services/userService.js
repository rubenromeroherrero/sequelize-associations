// definimos el modelo/ lógica de negocio --> archivo entre rutas y repositorios
// aquí es lo que la empresa o el cliente decide que quiere // CASOS DE USO DEL FRONT

const userRepository = require("../repositories/userRepository");
const encryptPassword = require("../utils/encryptPassword");

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

  // no queremos mostrar la contraseña al usuario --> funcion que creamos en User
  return user.toJSON();
};

exports.getProfile = async (email) => {
  const user = await userRepository.findUserByEmail(email);
  return user.toJSON();
};

exports.getAllProfiles = async () => {
  return await userRepository.findAllUsers();
};

// el usuario ha inciado sesión y tenemos su info al completo, por eso buscamos por id
exports.editProfile = async (id, userDetails) => {
  // validamos lo que puede editar, en este caso toda la info
  await userRepository.updateUser(id, userDetails);
};
