// Polyfills
import "core-js/es/array";
import "core-js/es/array-buffer";
import "core-js/es/date";
import "core-js/es/error";
import "core-js/es/function";
import "core-js/es/get-iterator";
import "core-js/es/global-this";
import "core-js/es/iterator";
import "core-js/es/json";
import "core-js/es/map";
import "core-js/es/math";
import "core-js/es/number";
import "core-js/es/object/assign";
import "core-js/es/object/create";
import "core-js/es/object/entries";
import "core-js/es/object/keys";
import "core-js/es/object/values";
import "core-js/es/promise";
import "core-js/es/reflect";
import "core-js/es/regexp";
import "core-js/es/set";
import "core-js/es/string";
import "core-js/es/typed-array";
import "core-js/es/weak-map";
import "core-js/es/weak-set";
import { MuseControlSystem } from "./src/@types/muse/MuseControlSystem";

if (!globalThis.console) {
    (globalThis as any).console = {};

    (globalThis as any).console.log = function (value: any) {
        if (typeof value === "object") {
            context.log(JSON.stringify(value, null, 2));
            return;
        }

        context.log(value);
    };

    (globalThis as any).console.log.level = context.log.level;

    (globalThis as any).console.trace = function (value: any) {
        if (typeof value === "object") {
            context.log.trace(JSON.stringify(value, null, 2));
            return;
        }

        context.log.trace(value);
    };

    (globalThis as any).console.debug = function (value: any) {
        if (typeof value === "object") {
            context.log.debug(JSON.stringify(value, null, 2));
            return;
        }

        context.log.debug(value);
    };

    (globalThis as any).console.info = function (value: any) {
        if (typeof value === "object") {
            context.log.info(JSON.stringify(value, null, 2));
            return;
        }

        context.log.info(value);
    };

    (globalThis as any).console.warn = function (value: any) {
        if (typeof value === "object") {
            context.log.warn(JSON.stringify(value, null, 2));
            return;
        }

        context.log.warn(value);
    };

    (globalThis as any).console.error = function (value: any) {
        if (typeof value === "object") {
            context.log.error(JSON.stringify(value, null, 2));
            return;
        }

        context.log.error(value);
    };
}

if (!globalThis.process) {
    (globalThis as any).process = {};
    (globalThis as any).process.env = {};
}

// @ts-ignore
var executor = java.util.concurrent.Executors.newScheduledThreadPool(1);
// @ts-ignore
var timeouts = new java.util.HashMap();

if (!globalThis.setTimeout) {
    (globalThis as any).setTimeout = function (
        callback: Function,
        delay: number,
        ...args: any[]
    ) {
        // @ts-ignore
        var id = java.util.UUID.randomUUID().toString();
        // @ts-ignore
        var runnable = new java.lang.Runnable({
            run: function () {
                try {
                    callback.apply(null, args);
                } finally {
                    timeouts.remove(id);
                }
            },
        });

        var task = executor.schedule(
            runnable,
            delay,
            // @ts-ignore
            java.util.concurrent.TimeUnit.MILLISECONDS,
        );

        timeouts.put(id, task);
        return id;
    };
}

if (!globalThis.clearTimeout) {
    (globalThis as any).clearTimeout = function (id: string) {
        var task = timeouts.get(id);

        if (!task) {
            return;
        }

        task.cancel(false);
        timeouts.remove(id);
    };
}

if (!globalThis.setInterval) {
    (globalThis as any).setInterval = function (
        callback: Function,
        delay: number,
        ...args: any[]
    ) {
        // @ts-ignore
        var id = java.util.UUID.randomUUID().toString();
        // @ts-ignore
        var runnable = new java.lang.Runnable({
            run: function () {
                try {
                    callback.apply(null, args);
                } finally {
                    setTimeout(runnable, delay);
                }
            },
        });

        var task = executor.scheduleAtFixedRate(
            runnable,
            delay,
            delay,
            // @ts-ignore
            java.util.concurrent.TimeUnit.MILLISECONDS,
        );

        timeouts.put(id, task);
        return id;
    };
}

if (!globalThis.clearInterval) {
    (globalThis as any).clearInterval = globalThis.clearTimeout;
}

if (!globalThis.setImmediate) {
    (globalThis as any).setImmediate = function (
        callback: Function,
        ...args: any[]
    ) {
        return setTimeout(callback, 0, ...args);
    };
}

if (!globalThis.clearImmediate) {
    (globalThis as any).clearImmediate = globalThis.clearTimeout;
}

if (!globalThis.fetch) {
    (globalThis as any).fetch = function (url: string, options: any) {
        options = options || {};

        // @ts-ignore
        var client = java.net.http.HttpClient.newHttpClient();

        // @ts-ignore
        var builder = java.net.http.HttpRequest.newBuilder()
            // @ts-ignore
            .uri(java.net.URI.create(url))
            // @ts-ignore
            .timeout(java.time.Duration.ofSeconds(10));

        var method = options.method || "GET";
        builder.method(
            method.toUpperCase(),
            options.body
                ? // @ts-ignore
                  java.net.http.HttpRequest.BodyPublishers.ofString(
                      options.body,
                  )
                : // @ts-ignore
                  java.net.http.HttpRequest.BodyPublishers.noBody(),
        );

        if (options.headers) {
            for (var key in options.headers) {
                builder.header(key, options.headers[key]);
            }
        }

        var request = builder.build();

        return new Promise(function (resolve, reject) {
            try {
                // @ts-ignore
                client
                    .sendAsync(
                        request,
                        // @ts-ignore
                        java.net.http.HttpResponse.BodyHandlers.ofString(),
                    )
                    .thenAccept(function (response) {
                        resolve({
                            ok:
                                response.statusCode() >= 200 &&
                                response.statusCode() < 300,
                            status: response.statusCode(),
                            statusText:
                                response.statusCode() === 200 ? "OK" : "Error",
                            text: function () {
                                return response.body();
                            },
                            json: function () {
                                return JSON.parse(response.body());
                            },
                        });
                    })
                    .exceptionally(function (error) {
                        reject(error);
                        return null;
                    });
            } catch (error) {
                reject(error);
            }
        });
    };
}

if (!globalThis.toJSObject) {
    (globalThis as any).toJSObject = function (value: any) {
        var result = {};
        var fields = value.getClass().getDeclaredFields();
        for (var i = 0; i < fields.length; i++) {
            var field = fields[i];
            field.setAccessible(true);
            result[field.getName()] = field.get(value);
        }

        return result;
    };
}

if (!globalThis.MuseControlSystem) {
    (globalThis as any).MuseControlSystem = MuseControlSystem;
}

if (!globalThis.panic) {
    (globalThis as any).panic = function (message: string): never {
        // Crash n burn
        throw new Error(message);
    };
}
