export interface Logger {
    info(head: string, msg: string): void;
    warn(head: string, msg: string): void;
    error(head: string, msg: string): void;
}