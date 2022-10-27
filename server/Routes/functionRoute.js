const express = require('express')
const router = express.Router();
const controller = require('../Controller/controller')

router.route('/')
    .post(controller.postMethod)
router.route('/fetchDistance')
    .post(controller.fetchDistance)
module.exports = router
