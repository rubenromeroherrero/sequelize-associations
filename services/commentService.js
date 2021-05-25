const commentRepository = require("../repositories/commentRepository");

exports.getAllComments = async () => {
  return await commentRepository.findAllComments();
};

exports.createComment = async (commentDetails) => {
  return await commentRepository.insertComment(commentDetails);
};
