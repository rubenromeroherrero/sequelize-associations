const postRepository = require("../repositories/postRepository");
// archivo para generar/ lanzar errores
const HttpError = require("../utils/httpError");

exports.getPost = async (id) => {
  const post = await postRepository.findPostById(id);
  return post.toJSON();
};

exports.getAllPosts = async () => {
  return await postRepository.findAllPosts();
};

exports.createPost = async (post) => {
  if (!post.title || !post.content) {
    throw new HttpError(
      400,
      "You must provide title and content in order to create a post"
    );
  }

  await postRepository.insertPost(post);
};

exports.updatePost = async (id, postDetails) => {
  return await postRepository.updatePost(id, postDetails);
};

exports.removePost = async (id) => {
  return await postRepository.deleteUser(id);
};
