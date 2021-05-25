const { DataTypes } = require("sequelize");
const dbConnection = require("../config/db");

const Comment = dbConnection.define("Comment", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    // genera el id, sequelize lo lleva integrado
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
  },
});

module.exports = Comment;
