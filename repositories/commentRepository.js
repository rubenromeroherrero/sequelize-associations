const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

// ibamos a requerir ese include en allposts y en postbyid, así optimizamos codigo
const populate = {
  include: [
    { model: User, attributes: ["name"] },
    // indicamos el title del post en el que se encuentra el comment
    {
      model: Post,
      attributes: ["title"],
      include: { model: User, attributes: ["name"] },
    },
  ],
};

exports.findAllComments = async () => {
  return await Comment.findAll(populate);
};

exports.findCommentById = async (id) => {
  return await Comment.findByPk(id, populate);
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
