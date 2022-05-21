import type { UwsBodyParserOptions } from './types';
export declare function parseQuery(query: string, config?: UwsBodyParserOptions): {
    queryParams: {};
};
/** break up the process to make the main interface cleaner */
export declare function processQueryParameters(query: string, stripUnderscoreParam?: boolean): {
    queryParams: {};
};
