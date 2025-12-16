// backend/server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

// Trust proxy for correct IP retrieval behind proxies (e.g., Heroku, Vercel)
// use it at production
app.set("trust proxy", true);

app.use(cors({
  origin: process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',') : 'http://localhost:5173'
}));
app.use(express.json());

app.use('/api/projects', require('./routes/projects'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/skills', require('./routes/skills'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/about', require('./routes/about'));
app.use('/api/visitors', require('./routes/visitor'));
app.use('/uploads', express.static('uploads'));
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
module.exports = app;
