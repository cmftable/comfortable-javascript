import ComfortableApi from './Api';
import ComfortableInclude from './Include';
import ComfortableSorting from './Sorting';
import ComfortableFilter from './Filter';
import { OptionsInterface } from './OptionsInterface';

namespace Comfortable {
  export class Api extends ComfortableApi {}

  export function api(repository: string, apiKey: string, options?: OptionsInterface) {
    return new Api(repository, apiKey, options);
  }

  export class Filter extends ComfortableFilter { }
  export class Include extends ComfortableInclude { }
  export class Sorting extends ComfortableSorting { }
}

export = Comfortable;
