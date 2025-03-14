const mongoose = require('mongoose');
const policyCarrierSchema = new mongoose.Schema({ company_name: String });
const PolicyCarrier = mongoose.model('PolicyCarrier', policyCarrierSchema);
module.exports = PolicyCarrier;
