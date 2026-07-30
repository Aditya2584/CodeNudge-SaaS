const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const { verifyJWT } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validator.middleware');
const { signupSchema, signinSchema } = require('../validators/auth.validator');

const router = Router();

router.post('/signup', validate(signupSchema), authController.signup);
router.post('/signin', validate(signinSchema), authController.signin);

router.get('/me', verifyJWT, authController.getCurrentUser);
router.post('/logout', verifyJWT, authController.logout);
module.exports = router;
