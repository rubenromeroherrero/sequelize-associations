var express = require("express");
const roleValidation = require("../middleware/roleValidation");
// const adminValidation = require("../middleware/adminValidation");
var router = express.Router();
// importamos los servicios, que nos permiten conectar con la DB
const userService = require("../services/userService");

// creamos las rutas que conectan con los servicios
// sólo podrá ver todos los usuarios aquel usuario que tenga el rol de admin
// esto no lo debería de ver un usuario, sino un admin
router.get("/all", roleValidation(), async (req, res) => {
  try {
    const user = await userService.getAllProfiles();
    res.status(200).json(user);
  } catch (error) {
    // se capturan los errores lanzados desde userService
    res.status(500).json({ message: error.message });
  }
});

router.get("/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const user = await userService.getProfile(email);
    res.status(200).json(user);
  } catch (error) {
    // 500 --> error del servidor
    res.status(500).json({ message: error.message });
  }
});

// autorización -> comprobar si tenemos los permisos suficientes para hacer algo (webtoken)
// json web token --> cadena codificada (tipo y algoritmo de encriptacion, payload (lo que metemos),
// verify signature --> para poder codificar)
// autentificación -> el hecho de iniciar sesión (login, signup)

router.post("/signup", async (req, res) => {
  try {
    await userService.signup(req.body);
    // enviamos sólo el registro/status-code de que ha sido creado
    res.sendStatus(201);
  } catch (error) {
    // 400 -> error del cliente
    res.status(400).json({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/", async (req, res) => {
  try {
    // cogemos el id del user, del token validation
    const { id } = req.user;
    await userService.editProfile(id, req.body);
    // 204--> actualización ha ido correctamente
    res.sendStatus(204);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
