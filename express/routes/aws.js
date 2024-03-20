const express = require('express');
const spClient = require('../services/sp');

const router = express.Router();

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
