const { Sequelize } = require("sequelize");

// para acceder a la DB necesitamos la conexion con las var de entorno
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// llamada a nuestra base de datos, establecemos conexion con DB
const dbConnection = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

// exportamos la comunicación para poder hablar con la DB
module.exports = dbConnection;
