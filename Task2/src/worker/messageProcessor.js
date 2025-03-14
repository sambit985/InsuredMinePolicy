const cron = require('node-cron');
const Message = require('../model/messageModel');

function processScheduledMessages() {
    cron.schedule('* * * * *', async () => {  // Runs every minute
        const now = new Date();
        const messages = await Message.find({ scheduleTime: { $lte: now }, status: 'pending' });

        for (let msg of messages) {
            console.log(`Sending message: ${msg.message}`);
            
            // Simulate message sending (via email, SMS, etc.)
            await Message.updateOne({ _id: msg._id }, { status: 'sent' });
        }
    });
}

module.exports = processScheduledMessages;
