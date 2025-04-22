import express from "express";
import {postLogin, postRegister} from '../controllers/userControllers.js'



const router = express.Router();

// router.post();
router.post('/login', postLogin);
router.post('/register',postRegister);

export default router;