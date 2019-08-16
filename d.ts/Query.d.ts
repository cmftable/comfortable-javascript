import HttpClient from './HttpClient';
import { QueryOptions } from './QueryOptions';
export default class Query {
    protected resource: string | undefined;
    protected query: QueryOptions;
    protected entityId: string | undefined;
    protected httpClient: HttpClient;
    protected endpoint: string;
    constructor(resource: string, url: string, httpClient: HttpClient, queryOptions?: QueryOptions, entityId?: string);
    setQuery(queryOptions: QueryOptions): void;
    getQuery(): QueryOptions;
    execute(): Promise<any>;
    getEndpoint(entityId?: string): string;
}
