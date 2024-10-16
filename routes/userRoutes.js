const express =require('express');

const router = express.Router();

const{registerUser,loginUser,getUser, getUserinfo} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const verifyToken = require('../middleware/authMiddleware');

router.post("/register",registerUser);
router.post('/login',loginUser);
router.get('/me',verifyToken,getUser);
router.get('/info',getUserinfo)

module.exports = router;