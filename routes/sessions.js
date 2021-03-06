const express = require('express');
const router = express.Router();
const sessionsController = require('../controller/sessions.controller');

router.post('/', sessionsController.create);
router.delete('/', sessionsController.delete)

module.exports = router;