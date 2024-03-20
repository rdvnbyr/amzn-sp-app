const SellingPartner = require('amazon-sp-api');
const fs = require('fs');
const path = require('path');

const writeFile = (fileName, data) => {
  fs.writeFileSync(path.join(path.join(__dirname, '..', 'logs'), fileName), JSON.stringify(data, null, 2));
};

class SPClient {
  constructor() {
    this.marketplaceId = process.env.SP_MARKETPLACE_ID;
    this.asin = process.env.SP_ASIN_EXAMPLE;
    this.sellerId = process.env.SP_MERCHANT_TOKEN;
    this.spClient = new SellingPartner({
      region: 'eu',
      refresh_token: process.env.SP_REFRESH_TOKEN,
      options: {
        auto_request_tokens: true,
        use_sandbox: false,
        only_grantless_operations: false,
      },
      credentials: {
        SELLING_PARTNER_APP_CLIENT_ID: process.env.SP_CLIENT_ID,
        SELLING_PARTNER_APP_CLIENT_SECRET: process.env.SP_CLIENT_SECRET,
      },
    });
  }

  async getListingItems() {
    try {
      //TODO: if (getListingItem.items.length > 0), than user must select the which product to use
      const listingItem = await this.spClient.callAPI({
        operation: 'catalogItems.searchCatalogItems',
        query: {
          marketplaceIds: [this.marketplaceId],
          identifiers: [this.asin],
          identifiersType: 'ASIN',
          includedData: ['attributes', 'dimensions', 'identifiers', 'images', 'productTypes', 'summaries'],
          pageSize: 1,
          // sellerId: process.env.SELLER_ID,
        },
        options: {
          version: '2022-04-01',
        },
      });
      writeFile('getListingItem.json', listingItem);
      return [null, listingItem];
    } catch (error) {
      return [error, null];
    }
  }

  async getListingRestrictions() {
    try {
      const listingsRestrictions = await this.spClient.callAPI({
        operation: 'listingsRestrictions.getListingsRestrictions',
        query: {
          marketplaceIds: [this.marketplaceId],
          asin: this.asin,
          sellerId: this.sellerId,
          conditionType: 'new_new',
        },
        options: {
          version: '2021-08-01',
        },
      });
      writeFile('getListingsRestrictions.json', listingsRestrictions);
      return [null, listingsRestrictions];
    } catch (error) {
      return [error, null];
    }
  }

  async getDefinitionsProductType(productType) {
    try {
      const definitionsProductType = await this.spClient.callAPI({
        operation: 'productTypeDefinitions.getDefinitionsProductType',
        path: {
          productType: productType,
        },
        query: {
          marketplaceIds: [this.marketplaceId],
          sellerId: this.sellerId,
        },
        options: {
          version: '2020-09-01',
        },
      });
      writeFile('getDefinitionsProductType.json', definitionsProductType);
      return [null, definitionsProductType];
    } catch (error) {
      return [error, null];
    }
  }

  async createListing() {
    try {
      const [listingError, listingItem] = await this.getListingItems();
      if (listingError) throw listingError;

      //TODO: if product types length is greater than 1, than user must select the which product type to use
      let productTypes = [];
      for (const item of listingItem.items) {
        productTypes = [...productTypes, ...item.productTypes];
      }

      const [restrictionError, listingsRestrictions] = await this.getListingRestrictions();
      if (restrictionError) throw restrictionError;

      const [definitionsError, definitionsProductType] = await this.getDefinitionsProductType(productTypes[0].productType);
      if (definitionsError) throw definitionsError;

      return [null, { listingItem, listingsRestrictions, definitionsProductType }];
    } catch (error) {
      return [error, null];
    }
  }
}

module.exports = SPClient;