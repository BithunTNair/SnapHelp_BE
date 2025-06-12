const express = require('express');
const { serviceList } = require('../controller/userController');

const router = express.Router();

router.get('/list',serviceList);


module.exports = router;