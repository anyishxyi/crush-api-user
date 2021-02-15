import express from 'express';
import userCtrl from '../controllers/user';

const router = express.Router();

router.post('/user', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/user', userCtrl.users);
router.get('/user/:id', userCtrl.getUser);

export default router;