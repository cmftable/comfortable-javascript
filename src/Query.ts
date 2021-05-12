import HttpClient from './HttpClient';
import { QueryOptions } from './QueryOptions';
import Filter from './Filter';
import Sorting from './Sorting';
import Include from './Include';

export default class Query {
  protected resource: string | undefined;
  protected query: QueryOptions = {};
  protected entityId: string | undefined;
  protected httpClient: HttpClient;
  protected endpoint: string;

  constructor(resource: string, url: string, httpClient: HttpClient, queryOptions?: QueryOptions, entityId?: string) {
    this.entityId = entityId;
    this.httpClient = httpClient;
    this.resource = resource;
    this.endpoint = url;

    if (queryOptions) {
      this.setQuery(queryOptions);
    }
  }

  setQuery(queryOptions: QueryOptions) {
    this.query = (<any>Object).assign(this.query, queryOptions);
  }

  getQuery() {
    if (this.query.filters && this.query.filters instanceof Filter) {
      this.query.filters = this.query.filters.get();
    }

    if (this.query.sorting && this.query.sorting instanceof Sorting) {
      this.query.sorting = this.query.sorting.get();
    }

    if (this.query.includes && this.query.includes instanceof Include) {
      this.query.includes = this.query.includes.get();
    }

    return this.query;
  }

  execute() {
    let queryParameter: string | null = null;
    let url = this.getEndpoint(this.entityId);

    const query = this.getQuery();

    if (Object.keys(query).length > 0) {
      queryParameter = JSON.stringify(query);
      url = `${url}?query=${encodeURIComponent(queryParameter)}`;
    }

    return new Promise<Response>((resolve, reject) => {
      return this.httpClient.fetch(url)
        .then((response: any) => {
          resolve(response);
        })
        .catch((err: any) => {
          reject(err);
        });
    })
    .then(response => response.json());
  }

  public getEndpoint(entityId?: string) {
    const urlArray = [this.endpoint, this.resource];

    if (entityId) {
      urlArray.push(`${entityId}`);
    }

    return urlArray.join('/');
  }
}
