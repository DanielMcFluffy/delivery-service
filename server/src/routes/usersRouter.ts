import express from 'express';
import { getCookies, getUser } from '../controllers/users';
import { authenthicated } from '../middlewares/authMiddleware';

const router = express.Router();
router.use(authenthicated);

router.get("/:id", getUser);
router.get("/get-cookies", getCookies);

export default router;