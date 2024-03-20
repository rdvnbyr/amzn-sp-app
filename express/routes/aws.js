const express = require('express');
const router = express.Router();
const spClient = require('../services/sp');

router.get('/ping', (req, res) => {
  res.json({ message: 'aws' });
});

router.post('/createListing', async (req, res) => {
  try {
    const sp = new spClient();
    const [error, listingItem] = await sp.createListing();
    if (error) throw error;
    res.status(200).json(listingItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
