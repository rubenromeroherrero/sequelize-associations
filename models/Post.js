const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");

const Post = dbConnection.define("Post", {
  // crea un id, definido por nosotros
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    // genera el id, sequelize lo lleva integrado
    defaultValue: DataTypes.UUIDV4,
    // establecemos que no sea null la propiedad
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.TEXT,
  },
});

module.exports = Post;
