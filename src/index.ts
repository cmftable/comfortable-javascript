import ComfortableApi from './Api';
import ComfortableInclude from './Include';
import ComfortableSorting from './Sorting';
import ComfortableFilter from './Filter';

namespace Comfortable {
  export class Api extends ComfortableApi {}

  export function api(repository: string, apiKey: string) {
    return new Api(repository, apiKey);
  }

  export class Filter extends ComfortableFilter { }
  export class Include extends ComfortableInclude { }
  export class Sorting extends ComfortableSorting { }
}

export = Comfortable;
