import express from "express";
import cardsRoutes from "./routes/cards.js";
import usersRoutes from "./routes/users.js";

const app = express();
const PORT = 3000;

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
