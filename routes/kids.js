var express = require('express');
var router = express.Router();
const kidController = require('../controller/kids.controller');

router.post('/', kidController.create);
router.get('/', kidController.list);
router.get('/:kidId', kidController.get);
router.delete('/:kidId', kidController.delete);
router.put('/:kidId/update', kidController.update);

module.exports = router;