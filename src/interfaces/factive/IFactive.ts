export interface IFactive {
    hasContent: () => boolean;
    getContent(): Promise<IFactive>;
    display(el: Element[]): void | string;
}
