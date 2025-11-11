const express = require('express');
const router = express.Router();
const Election = require('../models/Election');

// Get all elections
router.get('/', async (req, res) => {
  try {
    const elections = await Election.find();
    res.json(elections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new election
router.post('/', async (req, res) => {
  try {
    const newElection = new Election(req.body);
    await newElection.save();
    res.json(newElection);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update an election
router.put('/:id', async (req, res) => {
  try {
    const updated = await Election.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete an election
router.delete('/:id', async (req, res) => {
  try {
    await Election.findByIdAndDelete(req.params.id);
    res.json({ message: 'Election deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
