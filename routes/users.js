import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/:id", (req, res) => {
  const { id } = req.params;

  fs.readFile(
    path.join(__dirname, "../data", "users.json"),
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

router.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../data", "users.json"),
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

export default router;
