var express = require('express');
var router = express.Router();
const userController = require('../controller/users.controller');
const kidController = require('../controller/kids.controller');

router.post('/', userController.create);
router.get('/', userController.list);

router.post('/kid', kidController.create);
router.get('/kid', kidController.list);
router.get('/kid/:id', kidController.get);
router.delete('kid/:id', kidController.delete);

router.get('/:id', userController.get);
router.delete('/:id', userController.delete);

module.exports = router;
