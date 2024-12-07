class Buffer {
    static from(array: string): Uint8Array {
        return new Uint8Array(array.split("").map((c) => c.charCodeAt(0)));
    }
}

export interface TcpClientOptions {
    host: string;
    port: number;
}

export class TcpClient {
    private readonly host: string;
    private readonly port: number;

    constructor({ host, port }: TcpClientOptions) {
        this.host = host;
        this.port = port;
    }

    connect() {
        const Socket = Java.type<java.net.Socket>("java.net.Socket");
        const InetSocketAddress = Java.type<java.net.InetSocketAddress>(
            "java.net.InetSocketAddress",
        );

        const socket = new Socket();
        const address = new InetSocketAddress(this.host, this.port);

        socket.connect(address);

        const inputStream = socket.getInputStream();
        const outputStream = socket.getOutputStream();

        const command = "get connection\n";
        outputStream.write(Buffer.from(command));
        outputStream.flush();

        const buffer = new Uint8Array(1024);
        const length = inputStream.read(buffer);
        const response = new TextDecoder().decode(buffer.slice(0, length));

        context.log(response);
    }
}
