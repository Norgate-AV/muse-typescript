export interface Log {
    level: "TRACE" | "DEBUG" | "INFO" | "WARNING" | "ERROR";
    trace: (msg: string) => void;
    debug: (msg: string) => void;
    info: (msg: string) => void;
    warning: (msg: string) => void;
    error: (msg: string) => void;
}
