export default class Include {
  private include: any;

  constructor() {
    this.include = {};
  }

  add(property: string, context:string = 'fields', contentType:string = '*') {
    this.include[`${contentType}.${context}.${property}`] = 1;
    return this;
  }

  get() {
    return this.include;
  }
}
