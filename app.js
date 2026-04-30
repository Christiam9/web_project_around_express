import express from "express";
import cardsRoutes from "./routes/cards.js";
import usersRoutes from "./routes/users.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use("/cards", cardsRoutes);
app.use("/users", usersRoutes);

app.use((req, res) => {
  res.status(404).send({
    message: "Recurso solicitado no encontrado",
  });
});

// 🔹 Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
