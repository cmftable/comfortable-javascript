export default class Sorting {
  private sorting: any;

  constructor() {
    this.sorting = {};
  }

  add(property: string, direction: string, context: string = 'fields') {
    const dir = direction.toLowerCase() === 'asc' || direction.toLowerCase() === 'desc' ? direction.toLowerCase() : 'ASC';
    this.sorting[`${context}.${property}`] = dir;

    return this;
  }

  get() {
    return this.sorting;
  }
}
