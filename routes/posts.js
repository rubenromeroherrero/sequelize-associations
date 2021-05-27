const express = require("express");
// MIDDLEWARE para poder realizar validaciones de usuario
const roleValidation = require("../middleware/roleValidation");
const router = express.Router();
const postService = require("../services/postService");

// GET
// los manejadores reciben 3 parámetros (req, res, next)
// recibimos un middleware, que hace una validación de usuario
// cuando lo valida, te permite ver los posts
router.get("/all", roleValidation("user"), async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    // next -> 3er parámetro que reciben las funciones, para los errores
    // una vez pasa por las rutas, al decir next, lo que hace es pasar al manejador de errores (app)
    next(error);
  }
});

router.get("/:id", roleValidation(["user", "mods"]), async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await postService.getPost(id);
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
});

// POST
router.post("/", async (req, res, next) => {
  try {
    await postService.createPost(req.body);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// PUT
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await postService.updatePost(id, req.body);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await postService.removePost(id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
