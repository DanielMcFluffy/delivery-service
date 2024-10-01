import express from 'express';
import { getUser, updateUser } from '../controllers/users';
import { verifyAuth } from '../middlewares/authMiddleware';

const router = express.Router();
router.use(verifyAuth);

router.get("/:id", getUser);
router.post("/update/:id", updateUser)

export default router;