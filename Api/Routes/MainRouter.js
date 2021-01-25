var express = require('express');
var router = express.Router();
var MainController = require('../Controllers/MainController');

router.get('/', MainController.index);
router.get('/users', MainController.showUsers);
router.post('/insert', MainController.insertUsers);

module.exports = router;