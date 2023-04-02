const Post = require("../models/post-model");
const jwt = require("jwt-simple");
require("dotenv").config();

exports.create = async (req, res) => {
  try {
    const { title, description, requirement, available, area } = req.body;
    const token = req.rawHeaders[1].split(" ")[1].split(" ")[0];
    let payload = jwt.decode(token, process.env.SECRET_TOKEN);
    const post = await new Post({
      title,
      description,
      requirement,
      available,
      area,
      postedBy: payload.sub,
    });
    post.save();
    return res.status(200).json({ message: "POST creado con exito", post });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Hubo un error en CREAR POST", error: err.message });
  }
};
exports.get_post = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts.length)
      return res
        .status(400)
        .json({ message: "No se han encontrado POSTS registrados" });

    const post = await Post.findOne({ _id: req.params.id });
    return res.status(200).json({ data: post });
  } catch (err) {
    return res.status(404).json({ message: "No se ha encontrado el POST" });
  }
};

exports.get_all_posts = async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts.length)
      return res
        .status(404)
        .json({ message: "No se han encontrado POST registrados" });

    return res.status(200).json({ data: posts });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: err.message });
  }
};

exports.update_post = async (req, res) => {
  try {
    const { title, description, requirement, available, area } = req.body;
    const updated_post = await Post.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, requirement, available, area }
    );
    if (!updated_post)
      return res
        .status(404)
        .json({ message: "No se ha encontrado el POST para actualizar" });

    return res
      .status(200)
      .json({ message: "Se han actualizado los datos del POST" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: err.message });
  }
};

exports.delete_post = async (req, res) => {
  try {
    const deleted_post = await Post.findByIdAndDelete({ _id: req.params.id });
    if (!deleted_post)
      return res.status(404).json({ message: "No se ha encontrado el POST" });

    return res.status(200).json({ message: "Se ha eliminado el POST" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: err.message });
  }
};
