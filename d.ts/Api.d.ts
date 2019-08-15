import HttpClient from './HttpClient';
import { QueryOptions } from './QueryOptions';
import { OptionsInterface } from './OptionsInterface';
export default class Api {
    static API_ENDPOINT: string;
    protected repository: string;
    protected apiKey: string;
    protected httpClient: HttpClient;
    protected url: string;
    constructor(repository: string, apiKey: string, options?: OptionsInterface);
    getRepository(): Promise<Response>;
    getRepositoryEndpoint(): string;
    getDocuments(queryOptions?: QueryOptions | any): Promise<any>;
    getDocument(id: string, queryOptions: QueryOptions): Promise<any>;
    getAlias(apiId: string, queryOptions: QueryOptions): Promise<any>;
    getCollection(apiId: string, queryOptions: QueryOptions): Promise<any>;
    getAsset(id: string, queryOptions: QueryOptions): Promise<any>;
    private query;
}
