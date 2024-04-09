import express from 'express';
import { createUser, uploadProfilePic, deleteProfilePic, updateUserProfile, getAllProfilePics } from '../controllers/userController.js';
import upload from '../config/multer.js';

const router = express.Router();

router.post('/', createUser);
router.post('/:id/profile-pic', upload.single('profilePic'), uploadProfilePic);
router.delete('/:id/profile-pic', deleteProfilePic);
router.put('/:id/profile-pic', upload.single('profilePic'), updateUserProfile);
router.get('/profile-pics', getAllProfilePics);

export default router;