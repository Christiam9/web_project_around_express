import express from "express";
import User from "../models/user.js";

const router = express.Router();

// GET todos los usuarios
router.get("/", (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(500).send({ message: "Error en servidor" }));
});

// GET usuario por id
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      res.status(500).send({ message: "Error en servidor" });
    });
});
router.patch("/me", (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Datos inválidos" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      res.status(500).send({ message: "Error en servidor" });
    });
});

// PATCH avatar
router.patch("/me/avatar", (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "URL inválida" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Usuario no encontrado" });
      }
      res.status(500).send({ message: "Error en servidor" });
    });
});

export default router;
