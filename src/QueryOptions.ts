export interface QueryOptions {
  limit?: number,
  offset?: number,
  locale?: string,
  includes?: number | any,
  includeTags?: any[],
  excludeTags?: any[],
  fields?: string,
  embedAssets?: boolean,
  filters?: any,
  sorting?: any,
  search?: string,
}