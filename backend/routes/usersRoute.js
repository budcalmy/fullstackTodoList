const {Router} = require('express');
const { getUser, registerUser } = require('../controllers/userController');

const router = Router();

router.get('/users', getUser);

router.post('/users', registerUser);

module.exports = router;