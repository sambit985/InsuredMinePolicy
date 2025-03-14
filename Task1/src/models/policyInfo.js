const mongoose = require('mongoose');
const policyInfoSchema = new mongoose.Schema({
    policy_number: String,
    policy_start_date: String,
    policy_end_date: String,
    policy_type: String,
    firstname: String,
});
const PolicyInfo = mongoose.model('PolicyInfo', policyInfoSchema);
module.exports = PolicyInfo;
