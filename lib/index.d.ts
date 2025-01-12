export { splitComma, toNumber, toDate } from './lib';
export interface SearchkitField {
    facet?: boolean;
    stored?: boolean;
    fieldName: string;
    searchable?: boolean;
    type?: 'integer' | 'date' | 'float' | 'geo_point';
    sourceOptions?: {
        path: string;
        transform?: (str: string, document: Record<string, unknown>) => string | number;
    };
}
export interface CliConfig {
    index: string;
    type?: string;
    host: string;
    source?: any;
    fields: Array<SearchkitField>;
}
export declare const withConfig: (config: CliConfig) => Promise<void>;
export declare const withConfigWithoutPrompt: (config: CliConfig) => Promise<void>;
