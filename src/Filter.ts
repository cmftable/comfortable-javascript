export default class Filter {
  private filter: any[];

  constructor() {
    this.filter = [];
  }

  /**
  * add a logical 'and' filter
  */
  addAnd(property: string, operator: string, value: any, context: string = 'fields', contentType: string = '*') {
    const filter = {
      [`${contentType}.${context}.${property}`]: {
        [`${operator}`]: value,
      },
    };

    if (this.filter.length === 0) {
      this.filter.push(filter);
    } else if (this.filter.length > 0) {
      this.filter.push({
        and: filter,
      });
    }

    return this;
  }

  /**
  * add a logical 'or' filter
  */
  addOr(property: string, operator: string, value: any, context: string = 'fields', contentType: string = '*') {
    const filter = {
      [`${contentType}.${context}.${property}`]: {
        [`${operator}`]: value,
      },
    };

    if (this.filter.length === 0) {
      this.filter.push(filter);
    } else if (this.filter.length > 0) {
      this.filter.push({
        or: filter,
      });
    }

    return this;
  }

  get() {
    return this.filter;
  }
}
