import express from "express";
import Card from "../models/card.js";

const router = express.Router();

// GET todas las tarjetas
router.get("/", (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: "Error en servidor" }));
});

// POST nueva tarjeta
router.post("/", (req, res) => {
  const { name, link } = req.body;

  Card.create({
    name,
    link,
    owner: req.user._id,
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(400).send({ message: "Datos inválidos" });
      }
      res.status(500).send({ message: "Error en servidor" });
    });
});

// DELETE tarjeta
router.delete("/:cardId", (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail()
    .then(() => res.send({ message: "Tarjeta eliminada" }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Tarjeta no encontrada" });
      }
      res.status(500).send({ message: "Error en servidor" });
    });
});

router.put("/:cardId/likes", (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Tarjeta no encontrada" });
      }
      res.status(500).send({ message: "Error en servidor" });
    });
});

router.delete("/:cardId/likes", (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Tarjeta no encontrada" });
      }
      res.status(500).send({ message: "Error en servidor" });
    });
});

export default router;
