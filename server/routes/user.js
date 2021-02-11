import express from 'express';
import userCtrl from '../controllers/user';

const router = express.Router();

router.post('/user', userCtrl.signup);
// router.get('/user/:userId', userCtrl.signup);
router.post('/login', userCtrl.login);

export default router;