interface RequestOptions {
    method?: string;
    body?: any;
    headers?: Object;
    credentials?: string;
}
export default class HttpClient {
    requestOptions: RequestOptions;
    constructor(options?: RequestOptions);
    fetch(url: string, overrideOptions?: RequestOptions): Promise<Response>;
}
export {};
