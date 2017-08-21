export interface TextClassificationService {
    currentUrl: string;
    getTaxonomy(): Promise<any>;
    getEntities(): Promise<any>;
    getTags(): Promise<any>;
    getTextClassification(
        provider: Watson | Alchemy | TextRazor
      , method:   Taxonomy | Entities
      , version?: V2
    ): Promise<TCResult>;
}

export interface TCResult {
    language: string;
    data: any[];
}

export type V2        = 2;

export type Watson    = 'Watson';
export type Alchemy   = 'Alchemy';
export type TextRazor = 'TextRazor';

export type Taxonomy  = 'Taxonomy';
export type Entities  = 'Entities';