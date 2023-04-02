const mongoose = require("mongoose");

const ongSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    confirm_password: {
      type: String,
    },
    website: {
      type: String,
    },
    telephone: {
      type: Number,
    },
    photo: {
      type: String,
    },
    ong_type: {
      type: String,
      enum: ["cultura", "deportes", "educacion"]
    },
    user_comment: {
      type: String,
    },
    facebookId: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("ONG", ongSchema);
