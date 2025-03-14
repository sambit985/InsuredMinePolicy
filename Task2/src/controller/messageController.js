const Message = require('../model/messageModel');

exports.scheduleMessage = async (req, res) => {
    try {
        const { message, day, time } = req.body;

        if (!message || !day || !time) {
            return res.status(400).json({ error: "Message, day, and time are required" });
        }

        const scheduleTime = new Date(`${day} ${time}`);
        const newMessage = new Message({ message, scheduleTime });

        await newMessage.save();

        res.status(201).json({ message: "Message scheduled successfully", data: newMessage });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};
