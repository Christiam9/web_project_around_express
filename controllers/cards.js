import Card from "../models/card.js";

// GET cards
export const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(500).send({ message: "Error en servidor" }));
};

// POST card
export const createCard = (req, res) => {
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
};

// DELETE card
export const deleteCard = (req, res) => {
  Card.findById(req.params.cardId)
    .orFail()
    .then((card) => {
      if (card.owner.toString() !== req.user._id) {
        return res.status(403).send({ message: "No autorizado" });
      }

      return Card.findByIdAndDelete(req.params.cardId).then(() =>
        res.send({ message: "Tarjeta eliminada" }),
      );
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(404).send({ message: "Tarjeta no encontrada" });
      }
      res.status(500).send({ message: "Error en servidor" });
    });
};

// LIKE
export const likeCard = (req, res) => {
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
};

// DISLIKE
export const dislikeCard = (req, res) => {
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
};
