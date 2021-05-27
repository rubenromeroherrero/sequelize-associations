const commentRepository = require("../repositories/commentRepository");
const HttpError = require("../utils/httpError");

exports.getAllComments = async () => {
  return await commentRepository.findAllComments();
};

exports.getComment = async (id) => {
  const post = commentRepository.findCommentById(id);
  return await (await post).toJSON();
};

exports.createComment = async (commentDetails) => {
  if (!commentDetails.content) throw new HttpError(400);
  return await commentRepository.insertComment(commentDetails);
};

exports.updateComment = async (id, content) => {
  return await commentRepository.editComment(id, content);
};

exports.removeComment = async (user, commentId) => {
  // buscamos el comentario que pedimos eliminar
  const comment = commentRepository.findCommentById(commentId);

  // comprobamos que ese id pertenece al usuario
  if (
    comment.UserId !== user.id ||
    (comment.UserId !== user.id && user.role !== "admin")
  ) {
    throw new HttpError(401);
  }
  return await commentRepository.deleteComment(commentId);
};
