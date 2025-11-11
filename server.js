const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const electionRoutes = require('./backend/routes/electionRoutes');

const app = express();
app.use(express.json());
app.use(cors());

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

// Environment and configuration
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/voting_system';
const NODE_ENV = process.env.NODE_ENV || 'development';

// MongoDB Connection
mongoose.connect(MONGODB_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ DB Connection Error:', err));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'Server is running',
    env: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/elections', electionRoutes);

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} (${NODE_ENV})`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = server;
