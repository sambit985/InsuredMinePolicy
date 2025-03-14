const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./src/db/connection');
const messageRoutes = require('./src/routes/messageRoutes');
const monitorCpuUsage = require('./src/utils/cpuMonitor');
const processScheduledMessages = require('./src/worker/messageProcessor');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// Database Connection
connectDB();

// Routes
app.use('/api/messages', messageRoutes);

// Start CPU Monitoring & Message Processing
monitorCpuUsage();
processScheduledMessages();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
