const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    requirement: {
      type: String,
    },
    available: {
      type: String,
      enum: ["presencial", "hibrido", "remoto"]
    }, 
    area: {
      type: String,
      enum: ["administracion", "operativo", "legales", "marketing"]
    }, 
    postedBy: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Post", postSchema);
