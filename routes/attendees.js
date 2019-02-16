var express = require('express');
var router = express.Router();
const attendeeController = require('../controller/attendee.controller');

router.post('/', attendeeController.create);
router.get('/', attendeeController.list);
router.get('/:attendeeId', attendeeController.get);
router.delete('/:attendeeId', attendeeController.delete);
router.post('/:attendeeId/updateAccept', attendeeController.updateAccept);

module.exports = router;