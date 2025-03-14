const express = require('express');
const { getPolicyByUsername, getPolicyAggregation } = require('../controllers/policyController');

const router = express.Router();

router.post('/byuser', getPolicyByUsername);
router.post('/aggregate/all', getPolicyAggregation);

module.exports = router;
