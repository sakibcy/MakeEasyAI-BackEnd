import express from "express";
import {loginPost, signupPost} from "../controllers/authController";

const router = express.Router();

router.post(`/signup`, signupPost);
router.post(`/login`, loginPost);

export default router;