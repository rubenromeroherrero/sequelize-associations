const dbConnection = require("../config/db");
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// establecemos las relaciones entre los modelos
const loadModels = () => {
  // 1-N -> nos crea una columna/key (FOREIGN KEY)  que llama user-id, dentro de los post
  User.hasMany(Post);
  Post.belongsTo(User);
  Post.hasMany(Comment);
  // pertenece a
  Comment.belongsTo(Post);
  // sincronizarse con la tabla de datos y crear las tablas (PROMISS --> necesitamos un then())
  dbConnection.sync().then(() => console.log("All models loaded"));
};

module.exports = loadModels;
