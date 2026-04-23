import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

router.get("/", (req, res) => {
  fs.readFile(
    path.join(__dirname, "../data", "cards.json"),
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

export default router;
