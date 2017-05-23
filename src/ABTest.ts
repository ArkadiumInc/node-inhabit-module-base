export interface ABTest<T> {
    abTest: string;
    experiment: (number | T)[][];
}