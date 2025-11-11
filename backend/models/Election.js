const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startDate: String,
  endDate: String,
  status: { type: String, default: 'Upcoming' },
  totalVotes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Election', electionSchema);
