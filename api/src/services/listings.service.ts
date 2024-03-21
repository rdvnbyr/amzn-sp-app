import { injectable, /* inject, */ BindingScope } from '@loopback/core';
import { HttpErrors } from '@loopback/rest';
// const SellingPartner = require('amazon-sp-api');
import { SellingPartner } from 'amazon-sp-api';
import { registerSchema, validate } from '@hyperjump/json-schema/draft-2020-12';
import axios from 'axios';

@injectable({ scope: BindingScope.TRANSIENT })
export class ListingsService {
  private spClient: SellingPartner;
  private marketplaceId: string;
  private asin: string;
  private sellerId: string;
  constructor(/* Add @inject to inject parameters */) {
    this.marketplaceId = process.env.SP_MARKETPLACE_ID || '';
    this.asin = process.env.SP_ASIN_EXAMPLE || '';
    this.sellerId = process.env.SP_MERCHANT_TOKEN || '';
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

  /*
   * Add service methods here
   */

  ping(): string {
    return 'listing service is online';
  }

  async searchCatalogItems(): Promise<[Error | null, any | null]> {
    try {
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
      return [null, listingItem];
    } catch (error) {
      return [error, null];
    }
  }

  async getListingsRestrictions(): Promise<[Error | null, object | null]> {
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
      return [null, listingsRestrictions];
    } catch (error) {
      return [error, null];
    }
  }

  async getDefinitionsProductType(productType: string): Promise<[Error | null, object | null]> {
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

      // get the schema from the response
      const schemaResource = await axios.get(definitionsProductType.schema.link.resource);
      // const metaSchemaResource = await axios.get(definitionsProductType.schema.metaSchema.link.resource);

      // register the schema
      // registerSchema(schemaResource.data);

      return [null, schemaResource.data];
    } catch (error) {
      return [error, null];
    }
  }

  // 1. Search for catalog items
  // 2. Get listings restrictions
  // 3. Get definitions product type
  // 4. prepare the amazon-listing object

  async createListing(): Promise<any> {
    try {
      const [listingError, listingItem] = await this.searchCatalogItems();
      if (listingError) throw listingError;

      //TODO: if product types length is greater than 1, than user must select the which product type to use
      let productTypes = [] as any[];
      for (const item of listingItem.items) {
        productTypes = [...productTypes, ...item.productTypes];
      }

      const [restrictionError, listingsRestrictions] = await this.getListingsRestrictions();
      if (restrictionError) throw restrictionError;

      const [definitionsError, definitionsProductType] = await this.getDefinitionsProductType(
        productTypes[0].productType
      );
      if (definitionsError) throw definitionsError;

      return {
        listingItem,
        listingsRestrictions,
        definitionsProductType,
      };
    } catch (error) {
      new HttpErrors.InternalServerError(error);
    }
  }
}
