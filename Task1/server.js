// server.js
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const uploadRoutes = require('./src/routes/uploadRoutes');
const policyRoutes = require('./src/routes/policyRoutes');
const e = require('express');
require('dotenv').config();
require('./src/db/connection');

// Initialize Express app
const app = express();
app.use(express.json());

// Use Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/policy', policyRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (error)=>{
    if(error) console.log(error);
    console.log(`Server is up and running on port ${PORT}`);
});
