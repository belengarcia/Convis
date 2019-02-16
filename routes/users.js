var express = require('express');
var router = express.Router();
const userController = require('../controller/users.controller');
const kidController = require('../controller/kids.controller');

router.post('/', userController.create);
router.get('/', userController.list);

router.get('/:id', userController.get);
router.delete('/:id', userController.delete);

module.exports = router;
