const commentService = require("../services/commentService");
const Comment = require("../models/Comment");

exports.findAllPosts = async () => {
  return await Comment.findAll();
};
