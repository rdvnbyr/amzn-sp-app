const spClient = require('../services/sp');

const createListing = async (req, res) => {
  try {
    const sp = new spClient();

    const [error, listingItem] = await sp.createListing();
    if (error) throw error;

    res.status(200).json(listingItem);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const searchCatalogItems = async (req, res) => {
  try {
    const {asin, sellerId} = req.params;
    const sp = new spClient(asin, sellerId);
    const [listingError, listingItem] = await sp.searchCatalogItems(asin);
    if (listingError) throw listingError;

    res.status(200).json(listingItem);
  } catch (error) {
    res.status(500).json(error);
  }
};

const restrictions = async (req, res) => {
  try {
    const sp = new spClient();
    const [error, restrictions] = await sp.getListingsRestrictions();
    if (error) throw error;
    res.status(200).json(restrictions);
  } catch (error) {
    res.status(500).json(error);
  }
};

const definitions = async (req, res) => {
  try {
    const sp = new spClient();
    const [error, definitions] = await sp.getDefinitionsProductType(req.query.productType);
    if (error) throw error;
    res.status(200).json(definitions);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {createListing, searchCatalogItems, restrictions, definitions};
