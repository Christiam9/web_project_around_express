import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/me", (req, res, next) => {
  req.params.id = req.user._id;
  return getUserById(req, res, next);
});
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/me", updateProfile);
router.patch("/me/avatar", updateAvatar);

export default router;
