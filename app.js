import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import usersRoutes from "./routes/users.js";
import cardsRoutes from "./routes/cards.js";

dotenv.config();

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error MongoDB:", err));

app.use((req, res, next) => {
  req.user = {
    _id: "69f2d32086fc9a29ce91bd7d",
  };
  next();
});

// rutas
app.use("/users", usersRoutes);
app.use("/cards", cardsRoutes);

// 404
app.use((req, res) => {
  res.status(404).send({ message: "Recurso no encontrado" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
