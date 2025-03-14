const mongoose = require('mongoose');
const agentSchema = new mongoose.Schema({
    agent:String,
    agency_id:String,
    
});

const Agent = mongoose.model("Agent",agentSchema);
module.exports=Agent;