const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");

// creamos las entidades de nuestra DB --> definir/crear tabla User
// sequelize, pluraliza la tabla, serían Users para sequelize
const User = dbConnection.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
  }, // 3 parámetro, scopes
  {
    // default-scope para excluir password privada, para no devovler al usuario por pantalla
    defaultScope: {
      attributes: { exclude: ["password"] },
    }, // scope para devolver todos los atributos. Necesitamos la contraseña para comparar
    scopes: {
      withPassword: { attributes: {} },
    },
  }
);

// en el método toJSON, de nuestra tabla user, asignamos los valores que queremos con assign
// y borramos la password, para luego poder enviar al user su cuenta sin la password
// prototype.toJSON -> permite cambiar el comportamiento del método toJSON de la clase User
User.prototype.toJSON = function () {
  // this.get()-_> me da la infromación del modelo, los datos del usuario
  // en attributes asignamos todos los valores del usario en un objeto vacio y luego borramos la password
  // HACEMOS UNA COPIA Y LA ENVIAMOS SIN PASSWORD
  const attributes = Object.assign({}, this.get());
  delete attributes.password;
  return attributes;
};

module.exports = User;
