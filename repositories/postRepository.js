const Post = require("../models/Post");
const User = require("../models/User");

exports.findAllPosts = async () => {
  return await Post.findAll({ include: User });
};

exports.findPostById = async (id) => {
  // el segundo parámetro nos permite incluir cosas extras
  // de esta manera vinculamos e indicamos el usuario al mostrar el post
  // return await Post.findByPk(id, { include: User });
  return await Post.findByPk(id, {
    include: { model: User, attributes: ["name"] },
  });
};

exports.insertPost = async (post) => {
  return await Post.create(post);
};

exports.updatePost = async (id, postDetails) => {
  // --> quitamos el id del req.body, para que no se pueda modificar desde fuera
  delete postDetails.id;
  return await Post.update(postDetails, { where: { id } });
};

exports.deleteUser = async (id) => {
  return await Post.destroy({ where: { id } });
};

/*
{
include: {
    model: User,
    include: Images
    }
}
*/
