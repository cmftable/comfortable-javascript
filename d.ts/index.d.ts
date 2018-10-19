import ComfortableApi from './Api';
import ComfortableInclude from './Include';
import ComfortableSorting from './Sorting';
import ComfortableFilter from './Filter';
declare namespace Comfortable {
    class Api extends ComfortableApi {
    }
    function api(repository: string, apiKey: string): Api;
    class Filter extends ComfortableFilter {
    }
    class Include extends ComfortableInclude {
    }
    class Sorting extends ComfortableSorting {
    }
}
export = Comfortable;
