// llamadas que se hacen a la base de datos con respecto al Usuario

const User = require("../models/User");

// FIND
exports.findAllUsers = async () => {
  return await User.findAll();
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

// for--> User validates if he introduces correctly his password
exports.findUserWithPasswordByEmail = async (email) => {
  // le decimos que nos ponga la config/ el scope con la contraseña
  return await User.scope("withPassword").findOne({ where: { email } });
};

// INSERT
exports.insertUser = async (user) => {
  return await User.create(user);
};

// UPDATE - PUT
exports.updateUser = async (id, userDetails) => {
  return await User.update(userDetails, { where: { id } });
};

// DELETE
exports.deleteUser = async (id) => {
  return await User.destroy({ where: { id } });
};
