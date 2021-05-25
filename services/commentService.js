const commentRepository = require("../repositories/commentRepository");

exports.getAllComments = async () => {
  return await commentRepository.findAllComments();
};

exports.getComment = async (id) => {
  const post = commentRepository.findCommentById(id);
  return await (await post).toJSON();
};

exports.createComment = async (commentDetails) => {
  return await commentRepository.insertComment(commentDetails);
};

exports.updateComment = async (id, content) => {
  return await commentRepository.editComment(id, content);
};

exports.removeComment = async (id) => {
  return await commentRepository.deleteComment(id);
};
