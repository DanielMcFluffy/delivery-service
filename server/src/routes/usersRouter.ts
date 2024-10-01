import express from 'express';
import { getCookies, getUser } from '../controllers/users';
import { verifyAuth } from '../middlewares/authMiddleware';

const router = express.Router();
router.use(verifyAuth);

router.get("/:id", getUser);
router.get("/get-cookies", getCookies);

export default router;