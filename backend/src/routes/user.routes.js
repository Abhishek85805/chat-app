import {Router} from 'express'
import { register, login, setAvatar } from '../controllers/user.controller.js';

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/set-avatar/:id", setAvatar);

export default router;