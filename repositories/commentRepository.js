const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

exports.findAllComments = async () => {
  return await Comment.findAll({
    include: [
      { model: User, attributes: ["name"] },
      // indicamos el title del post en el que se encuentra el comment
      { model: Post, attributes: ["title"] },
    ],
  });
};

exports.findCommentById = async (id) => {
  return await Comment.findByPk(id);
};

exports.insertComment = async (commentDetails) => {
  return await Comment.create(commentDetails);
};

exports.editComment = async (id, content) => {
  return await Comment.update(content, { where: { id } });
};

exports.deleteComment = async (id) => {
  return await Comment.destroy({ where: { id } });
};
