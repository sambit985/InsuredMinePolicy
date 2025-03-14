const express = require('express');
const { scheduleMessage } = require('../controller/messageController');

const router = express.Router();

router.post('/schedule', scheduleMessage);

module.exports = router;
