
import express from 'express';
import { getUserProfile, createPost } from '../controllers/profileController.js';
import  authenticateToken  from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/profile', authenticateToken, getUserProfile);
router.post('/posts', authenticateToken, createPost);

export default router;
