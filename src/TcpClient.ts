const Socket = Java.type<typeof java.net.Socket>("java.net.Socket");
const BufferedInputStream = Java.type<typeof java.io.BufferedInputStream>(
    "java.io.BufferedInputStream",
);
const BufferedOutputStream = Java.type<typeof java.io.BufferedOutputStream>(
    "java.io.BufferedOutputStream",
);
const Thread = Java.type<typeof java.lang.Thread>("java.lang.Thread");
const String = Java.type<typeof java.lang.String>("java.lang.String");
// const Arrays = Java.type<typeof java.util.Arrays>("java.util.Arrays");

var Buffer = {
    prototype: {
        from: function from(array: string): Uint8Array {
            return new Uint8Array(array.split("").map((c) => c.charCodeAt(0)));
        },
    },
};

export interface TcpClientOptions {
    host: string;
    port: number;
}

// @ts-ignore
// string.prototype.getBytes = function () {
//     return this.split("").map((c: string) => c.charCodeAt(0));
// };

export class TcpClient {
    private socket: java.net.Socket | null = null;
    private reader: java.io.BufferedInputStream | null = null;
    private writer: java.io.BufferedOutputStream | null = null;

    private readonly host: string;
    private readonly port: number;

    constructor({ host, port }: TcpClientOptions) {
        this.host = host;
        this.port = port;

        try {
            this.socket = new Socket();
            this.socket.connect(new java.net.InetSocketAddress(host, port));
            this.reader = new BufferedInputStream(this.socket.getInputStream());
            this.writer = new BufferedOutputStream(
                this.socket.getOutputStream(),
            );
            this.listen();
        } catch (error: any) {
            this.close();
        }
    }

    public close(): void {
        context.log.info(`Closing connection to ${this.host}:${this.port}`);

        try {
            if (this.reader) {
                this.reader.close();
            }

            if (this.writer) {
                this.writer.close();
            }

            if (this.socket) {
                this.socket.close();
            }
        } catch (error: any) {
            context.log.error(error);
        }
    }

    // private getBytes(message: string): Array<number> {
    //     return message.split("").map((c) => c.charCodeAt(0));
    // }

    public send(message: string): void {
        if (!this.socket || !this.writer) {
            throw new Error("Connection is not established");
        }
        try {
            const buffer = new String(message).getBytes();
            this.writer.write(buffer);
            this.writer.flush();
        } catch (error: any) {
            context.log.error(error);
            this.close();
        }
    }

    private listen(): void {
        new Thread(() => {
            while (this.socket.isConnected()) {
                try {
                    const available = this.reader.available();
                    if (available === 0) {
                        continue;
                    }

                    const buffer = Java.to(new Array(available), "byte[]");
                    const length = this.reader.read(buffer);

                    if (length === -1) {
                        this.close();
                        break;
                    }

                    const message = new String(buffer, "UTF-8");
                    context.log.info(message);

                    if (message.contains("Connection closed")) {
                        this.close();
                        break;
                    }
                } catch (error: any) {
                    context.log.error(error);
                    this.close();
                    break;
                }
            }
        }).start();
    }
}
