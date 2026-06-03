import { register, login } from "./controllers/auth.js";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import auth from "./middlewares/auth.js";

import usersRoutes from "./routes/users.js";
import cardsRoutes from "./routes/cards.js";

dotenv.config();

const app = express();
app.use((req, res, next) => {
  console.log("➡️ request:", req.method, req.url);
  next();
});
app.use(cors());

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error MongoDB:", err));

// rutas
app.post("/signup", register);
app.post("/signin", login);

app.use(auth);

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
