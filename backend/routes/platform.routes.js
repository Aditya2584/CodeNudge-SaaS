const { Router } = require('express');
const platformController = require('../controllers/platform.controller');
const { verifyJWT } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validator.middleware');
const { updatePlatformSchema } = require('../validators/platform.validator');

const router = Router();

// All platform routes are protected
router.use(verifyJWT);

router.get('/', platformController.getLeetcodeUsername);
router.patch('/', validate(updatePlatformSchema), platformController.updateLeetcodeUsername);

module.exports = router;
