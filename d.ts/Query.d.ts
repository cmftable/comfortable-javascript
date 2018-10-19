import HttpClient from './HttpClient';
import { QueryOptions } from './QueryOptions';
export default class Query {
    protected repository: string | undefined;
    protected endpoint: string | undefined;
    protected query: any;
    protected entityId: string | undefined;
    protected httpClient: HttpClient;
    constructor(endpoint: string, repository: string, httpClient: HttpClient, queryOptions?: QueryOptions, entityId?: string);
    setQuery(queryOptions: QueryOptions): void;
    getQuery(): any;
    execute(): Promise<any>;
    getEndpoint(entityId?: string): string;
}
