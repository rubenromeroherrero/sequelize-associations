const express = require("express");
const router = express.Router();
const commentService = require("../services/commentService");

router.get("/all", async (req, res) => {
  try {
    const comments = await commentService.getAllComments();
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
