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

// MongoDB Connection
mongoose.connect(MONGODB_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ DB Connection Error:', err));

// Routes
app.use('/api/elections', electionRoutes);

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
