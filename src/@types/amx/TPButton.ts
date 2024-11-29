export type TPButton = {
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
    size?: {
        width: number;
        height: number;
    };
    position?: {
        x: number;
        y: number;
    };
    icon?: string;
    bitmap?: string;
};
