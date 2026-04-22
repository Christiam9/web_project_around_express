const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// 🔹 Obtener todos los usuarios
app.get("/users", (req, res) => {
  fs.readFile(
    path.join(__dirname, "data", "users.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        return res.status(500).send({
          message: "Ha ocurrido un error en el servidor",
        });
      }

      try {
        const users = JSON.parse(data);
        return res.send(users);
      } catch (error) {
        return res.status(500).send({
          message: "Ha ocurrido un error en el servidor",
        });
      }
    },
  );
});

// 🔹 Obtener todas las tarjetas
app.get("/cards", (req, res) => {
  fs.readFile(
    path.join(__dirname, "data", "cards.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        return res.status(500).send({
          message: "Ha ocurrido un error en el servidor",
        });
      }

      try {
        const cards = JSON.parse(data);
        return res.send(cards);
      } catch (error) {
        return res.status(500).send({
          message: "Ha ocurrido un error en el servidor",
        });
      }
    },
  );
});

// 🔹 Obtener usuario por ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile(
    path.join(__dirname, "data", "users.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        return res.status(500).send({
          message: "Ha ocurrido un error en el servidor",
        });
      }

      try {
        const users = JSON.parse(data);

        const user = users.find((user) => user._id === id);

        if (!user) {
          return res.status(404).send({
            message: "ID de usuario no encontrado",
          });
        }

        return res.send(user);
      } catch (error) {
        return res.status(500).send({
          message: "Ha ocurrido un error en el servidor",
        });
      }
    },
  );
});

// 🔹 Ruta para endpoints inexistentes
app.use((req, res) => {
  res.status(404).send({
    message: "Recurso solicitado no encontrado",
  });
});

// 🔹 Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
