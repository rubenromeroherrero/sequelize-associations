const commentRepository = require("../repositories/commentRepository");

exports.getAllComments = async () => {
  return await commentRepository.findAllPosts();
};
