import mongoose from "mongoose";

// 🔹 Regex para validar URLs
const urlRegex = /^https?:\/\/(www\.)?[A-Za-z0-9-._~:/?#[\]@!$&'()*+,;=]+#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: "URL inválida",
    },
  },
});

export default mongoose.model("user", userSchema);
