const dbConnection = require("../config/db");
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// establecemos las relaciones entre los modelos
const loadModels = () => {
  // 1-N -> nos crea una columna/key (FOREIGN KEY)  que llama user-id, dentro de los post
  User.hasMany(Post, {
    foreignKey: {
      allowNull: false,
    },
  });
  User.hasMany(Comment, {
    foreignKey: {
      allowNull: false,
    },
  });

  Post.belongsTo(User);
  Post.hasMany(Comment, {
    foreignKey: {
      allowNull: false,
    },
  });

  // pertenece a User, porque el post ya está relacionado
  Comment.belongsTo(User);
  // para que en el comment, aparezca el post al que pertenece
  Comment.belongsTo(Post);

  // sincronizarse con la tabla de datos y crear las tablas (PROMISS --> necesitamos un then())
  dbConnection.sync().then(() => console.log("All models loaded"));
  // { force: true; } --> permite dropear nuestra base de datos, dentro de sync
  // dbConnection.sync({ force: true }).then(() => console.log("All models loaded"));
};

module.exports = loadModels;
