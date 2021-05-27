const express = require("express");
const { noExtendLeft } = require("sequelize/types/lib/operators");
const router = express.Router();
const commentService = require("../services/commentService");

// GET
router.get("/all", async (req, res) => {
  try {
    const comments = await commentService.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = commentService.getComment(id);
    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    await commentService.createComment(req.body);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// PUT
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    await commentService.updateComment(id, content);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await commentService.removeComment(id);
    res.status(204).json();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
