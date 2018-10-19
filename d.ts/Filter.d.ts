export default class Filter {
    private filter;
    constructor();
    /**
    * add a logical 'and' filter
    */
    addAnd(property: string, operator: string, value: any, context?: string, contentType?: string): this;
    /**
    * add a logical 'or' filter
    */
    addOr(property: string, operator: string, value: any, context?: string, contentType?: string): this;
    get(): any[];
}
