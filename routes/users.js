import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateProfile,
  updateAvatar,
} from "../controllers/users.js";
import { getCurrentUser } from "../controllers/users.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/me", getCurrentUser);
router.get("/:id", getUserById);
router.post("/", createUser);
router.patch("/me", updateProfile);
router.patch("/me/avatar", updateAvatar);

export default router;
