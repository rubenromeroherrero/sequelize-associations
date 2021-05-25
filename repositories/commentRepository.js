const Post = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User");

exports.findAllComments = async () => {
  return await Comment.findAll({
    include: [
      { model: User, attributes: ["name"] },
      { model: Post, attributes: ["title"] },
    ],
  });
};

exports.insertComment = async (commentDetails) => {
  return await Comment.create(commentDetails);
};
