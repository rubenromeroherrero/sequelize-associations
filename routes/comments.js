const express = require("express");
const router = express.Router();
const commentService = require("../services/commentService");

// GET
router.get("/all", async (req, res) => {
  try {
    const comments = await commentService.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const comment = commentService.getComment(id);
    res.status(200).json(comment);
  } catch (error) {
    res.send(400).json({ message: error.message });
  }
});

// POST
router.post("/", async (req, res) => {
  try {
    await commentService.createComment(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    res.send(400).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await commentService.removeComment(id);
    res.status(204).json();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
