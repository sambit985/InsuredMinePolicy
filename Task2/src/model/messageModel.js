const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: String,
    scheduleTime: Date,
    status: { type: String, default: 'pending' } // 'pending' or 'sent'
});

module.exports = mongoose.model('Message', messageSchema);
