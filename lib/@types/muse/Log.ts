export interface Log {
    level: "TRACE" | "DEBUG" | "INFO" | "WARNING" | "ERROR";
    trace: (...args: any) => void;
    debug: (...args: any) => void;
    info: (...args: any) => void;
    warning: (...args: any) => void;
    error: (...args: any) => void;
}
