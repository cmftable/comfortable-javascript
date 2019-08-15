import HttpClient from './HttpClient';
import { QueryOptions } from './QueryOptions';

import Query from './Query';
import { OptionsInterface } from './OptionsInterface';

export default class Api {
  static API_ENDPOINT: string = 'https://api.cmft.io/v1';
  protected repository: string;
  protected apiKey: string;
  protected httpClient: HttpClient;
  protected url: string;

  constructor(repository: string, apiKey: string, options?: OptionsInterface) {
    let endpoint = Api.API_ENDPOINT;
    this.repository = repository;

    if (apiKey === null || apiKey === '') {
      throw new Error('invalid apiKey');
    }

    this.apiKey = apiKey;
    this.httpClient = new HttpClient({
      headers: {
        Authorization: apiKey,
      },
    });

    if(options && options.useProxy && options.proxy) {
      endpoint = options.proxy;
    }

    this.url = [endpoint, this.repository].join('/');
  }

  public getRepository() {
    return this.httpClient.fetch(this.getRepositoryEndpoint());
  }

  public getRepositoryEndpoint() {
    return this.url;
  }

  public getDocuments(queryOptions?: QueryOptions | any) {
    return this.query('documents', queryOptions);
  }

  public getDocument(id: string, queryOptions: QueryOptions) {
    return this.query('documents', queryOptions, id);
  }

  public getAlias(apiId: string, queryOptions: QueryOptions) {
    return this.query('alias', queryOptions, apiId);
  }

  public getCollection(apiId: string, queryOptions: QueryOptions) {
    return this.query('collections', queryOptions, apiId);
  }

  public getAsset(id: string, queryOptions: QueryOptions) {
    return this.query('assets', queryOptions, id)
  }

  private query(resource: string, queryOptions: QueryOptions, entityId?: string) {
    const id = entityId ? entityId : '';
    return new Query(resource, this.repository, this.httpClient, queryOptions, entityId).execute();
  }
}
