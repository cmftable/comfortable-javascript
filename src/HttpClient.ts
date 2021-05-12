interface RequestOptions {
  method?: string;
  body?: any;
  headers?: Object;
  credentials?: string;
}

export default class HttpClient {
  requestOptions: RequestOptions = {
    method: 'GET',
  };

  constructor(options?: RequestOptions) {
    this.requestOptions = options || {};
  }

  fetch(url: string, overrideOptions?: RequestOptions) {
    const options:Object = (<any>Object).assign(this.requestOptions, overrideOptions);

    return fetch(url, options)
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(`Unexpected error: ${res.status} ${res.statusText}; URL: ${res.url}`);
        }

        return res;
      });
  }
}
