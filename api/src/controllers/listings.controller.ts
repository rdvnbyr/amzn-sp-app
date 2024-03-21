// Uncomment these imports to begin using these cool features!

import { inject } from '@loopback/core';
import { ListingsService } from '../services';
import { Request, RestBindings, get, param, put, response } from '@loopback/rest';

const GET_RES_ONJECT = (title: string) => ({
  'application/json': {
    schema: {
      type: 'object',
      title: title || 'ListingsResponse',
      description: 'Listings Response',
      properties: {
        listings: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
              description: { type: 'string' },
              price: { type: 'number' },
            },
          },
        },
      },
    },
  },
});

export class ListingsController {
  constructor(
    @inject(RestBindings.Http.REQUEST) private req: Request,
    @inject('services.ListingsService')
    public listingsService: ListingsService
  ) {}

  @get('/ping')
  @response(200, {
    description: 'Ping Response',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          title: 'PingResponse',
          properties: {
            message: { type: 'string' },
          },
        },
      },
    },
  })
  ping(): { message: string } {
    const message = this.listingsService.ping();
    return { message };
  }

  @get('/listings/searchCatalogItems')
  @response(200, {
    description: 'Listings Response',
    content: GET_RES_ONJECT('searchCatalogItems'),
  })
  async listings(): Promise<any> {
    const listings = await this.listingsService.searchCatalogItems();
    return listings;
  }

  @get('/listings/restrictions')
  @response(200, {
    description: 'Listings Response',
    content: GET_RES_ONJECT('listingsRestrictions'),
  })
  async listingsRestrictions(): Promise<any> {
    const listingsRestrictions = await this.listingsService.getListingsRestrictions();
    return listingsRestrictions;
  }

  @get('/listings/getDefinitionsProductType')
  @response(200, {
    description: 'Listings Response',
    content: GET_RES_ONJECT('getDefinitionsProductType'),
  })
  async getDefinitionsProductType(@param.query.string('productType') productType: string): Promise<any> {
    const [error, listings] = await this.listingsService.getDefinitionsProductType(productType);
    if (error) {
      return { error };
    }
    return listings;
  }
}
