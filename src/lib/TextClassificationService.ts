export interface TextClassificationService {
    currentUrl: string;
    getTaxonomy(): Promise<any>;
    getEntities(): Promise<any>;
    getTags(): Promise<any>;
}