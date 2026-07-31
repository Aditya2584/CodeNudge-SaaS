const { Router } = require('express');
const submissionController = require('../controllers/submission.controller');
const { verifyJWT } = require('../middlewares/auth.middleware');
const validate = require('../middlewares/validator.middleware');
const { createSubmissionSchema } = require('../validators/submission.validator');

const router = Router();

// Protect all  routes
router.use(verifyJWT);

router.post('/', validate(createSubmissionSchema), submissionController.syncSubmission);

module.exports = router;
