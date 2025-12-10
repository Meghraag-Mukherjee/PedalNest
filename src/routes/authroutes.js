import { Router } from "express";
import { register, login } from "../controller/authcontroller.js";
//import { register, login } from "../controllers/authcontroller.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
