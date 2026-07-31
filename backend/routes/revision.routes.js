const { Router } = require('express');
const revisionController = require('../controllers/revision.controller');
const { verifyJWT } = require('../middlewares/auth.middleware');

const router = Router();

// Protect all routes
router.use(verifyJWT);

// getTodaysRevision -> Q1
// completeTodaysRevision -> Q2

router.get('/today', revisionController.getTodaysRevision);
router.post('/complete', revisionController.completeTodaysRevision);

module.exports = router;
