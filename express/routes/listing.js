const express = require('express');
const {createListing, searchCatalogItems, restrictions, definitions} = require('../controllers/listing');

const router = express.Router();

router
  .post('/createListing', createListing)
  .get('/searchCatalogItems/:sellerId/:asin', searchCatalogItems)
  .get('/restrictions', restrictions)
  .get('/definitions', definitions);

module.exports = router;
