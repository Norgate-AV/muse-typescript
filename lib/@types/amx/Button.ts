export interface Button {
    name?: string;
    address?: {
        port: number;
        code: number;
    };
    channel?: {
        port: number;
        code: number;
    };
    level?: {
        port: number;
        code: number;
    };
    enabled?: boolean;
    hidden?: boolean;
}
