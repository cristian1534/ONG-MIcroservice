const ONG = require("../models/ong-model");
const bcrypt = require("bcrypt");
const token_service = require("../helpers/token_service");
const cloudinary = require("cloudinary");
const jwt = require("jwt-simple");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_USER_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


exports.register = async (req, res) => {
  try {
    const { name, email, website, telephone, ong_type, user_comment } = req.body;
    const registeredOng = await ONG.findOne({ email: req.body.email });

    if (registeredOng) {
      return res
        .status(400)
        .json({ message: "Email o Password ya registrado" });
    }

    const salt = 10;
    const password = await bcrypt.hash(req.body.password, salt);

    const ong = new ONG({
      name,
      email,
      password,
      website,
      telephone,
      ong_type,
      user_comment
    });
    ong.save();

    return res.status(200).json({ message: "Registro Exitoso" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Hubo un error en el REGISTRO", error: err.message });
  }
};

exports.upload_image_profile = async (req, res) => {
  try {
    const token = req.rawHeaders[1].split(" ")[1].split(" ")[0];
    let payload = jwt.decode(token, process.env.SECRET_TOKEN);
    const file = req.files.image;
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      public_id: `${Date.now()}`,
      resource_type: "auto",
      folder: "ONG_Images",
    });

    await ONG.findOneAndUpdate({ _id: payload.sub }, { photo: result.url });
    return res.status(200).json({ message: "IMAGEN subida correctamente" });
  } catch (err) {
    return res.status(500).json({
      message: "Hubo un error en la carga de IMAGEN",
      error: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const ong = await ONG.findOne({ email: req.body.email.toLowerCase() });
    if (!ong) return res.status(404).json({ message: "ONG no registrada" });

    const validated_password = await bcrypt.compare(
      req.body.password,
      ong.password
    );
    if (!validated_password)
      return res
        .status(400)
        .json({ message: "EMAIL o CONTRASEÑA incorrectas" });

    const token = token_service.create_token(ong);
    const { _id, name, email } = ong;
    return res.status(200).json({ _id, name, email, token });
  } catch (err) {
    console.log(err.message)
    return res
      .status(500)
      .json({ message: "Verifique sus credenciales", error: err.message });
  }
};

exports.get_ong = async (req, res) => {
  try {
    const ongs = await ONG.find();
    if (!ongs.length)
      return res
        .status(400)
        .json({ message: "No se han encontrado ONGs registradas" });

    const ong = await ONG.findOne({ _id: req.params.id });
    return res.status(200).json({ data: ong });
  } catch (err) {
    return res.status(404).json({ message: "No se ha encontrado la ONG" });
  }
};

exports.get_all_ongs = async (req, res) => {
  try {
    const ongs = await ONG.find();
    if (!ongs.length)
      return res
        .status(404)
        .json({ message: "No se han encontrado ONGs registradas" });

    return res.status(200).json({ data: ongs });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: err.message });
  }
};

exports.update_ong = async (req, res) => {
  try {
    const { name, email, password, website, telephone, ong_type, user_comment } = req.body;
    const updated_ong = await ONG.findOneAndUpdate(
      { _id: req.params.id },
      { name, email, password, website, telephone, ong_type, user_comment }
    );
    if (!updated_ong)
      return res
        .status(404)
        .json({ message: "No se ha encontrado la ONG para actualizar" });

    return res
      .status(200)
      .json({ message: "Se han actualizado los datos de la ONG" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: err.message });
  }
};

exports.delete_ong = async (req, res) => {
  try {
    const deleted_ong = await ONG.findByIdAndDelete({ _id: req.params.id });
    if (!deleted_ong)
      return res.status(404).json({ message: "No se ha encontrado la ONG" });

    return res.status(200).json({ message: "Se ha eliminado la ONG" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error del servidor", error: err.message });
  }
};
