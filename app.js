// cargamos el paquete para las variables de entorno
// accesibles en todo el proyecto
require("dotenv").config();

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
// importamos el middleware
const cors = require("cors");
// importamos la relación entre tablas
const loadModels = require("./models/relationship");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
// creamos rutas extras que requiere nuestra app
const postsRouter = require("./routes/posts");
const commentsRouter = require("./routes/comments");
// requerimos del archivo middleware para controlar los errores
const errorHandler = require("./middleware/errorHandler");
// requerimos del archivo middleware para validaciones de los token
const tokenValidation = require("./middleware/tokenValidation");

var app = express();
// cargamos la relación entre tablas --> para poder tener el FOREIGN KEY
loadModels();

app.use(logger("dev"));
app.use(express.json());
// permite realizar llamadas desde cualquier dominio, tendremos que configurar
// nuestro dominio para poder hacer llamadas desde ese servidor
// app.use(cors({ origin: "https://www.miweb.com" }));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// MIDDLEWARE para las validaciones de los token
app.use(tokenValidation);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

// En último lugar, para que sea lo último que se ejecute
app.use(errorHandler);

module.exports = app;
