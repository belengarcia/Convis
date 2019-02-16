var express = require('express');
var router = express.Router();
const conviController = require('../controller/convis.controller');

router.post('/', conviController.create);
router.get('/', conviController.list);
router.get('/:id', conviController.get);
router.delete('/:id', conviController.delete);
router.put('/:id', conviController.update);

module.exports = router;