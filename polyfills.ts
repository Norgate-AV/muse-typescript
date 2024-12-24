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

if (!globalThis.console) {
    // @ts-ignore
    globalThis.console = {};

    // @ts-ignore
    globalThis.console.log = function (value: any) {
        if (typeof value === "object") {
            // @ts-ignore
            context.log(JSON.stringify(value, null, 2));
            return;
        }

        // @ts-ignore
        context.log(value);
    };

    // @ts-ignore
    globalThis.console.log.level = context.log.level;

    // @ts-ignore
    globalThis.console.trace = function (value: any) {
        if (typeof value === "object") {
            // @ts-ignore
            context.log.trace(JSON.stringify(value, null, 2));
            return;
        }

        // @ts-ignore
        context.log.trace(value);
    };

    // @ts-ignore
    globalThis.console.debug = function (value: any) {
        if (typeof value === "object") {
            // @ts-ignore
            context.log.debug(JSON.stringify(value, null, 2));
            return;
        }

        // @ts-ignore
        context.log.debug(value);
    };

    // @ts-ignore
    globalThis.console.info = function (value: any) {
        if (typeof value === "object") {
            // @ts-ignore
            context.log.info(JSON.stringify(value, null, 2));
            return;
        }

        // @ts-ignore
        context.log.info(value);
    };

    // @ts-ignore
    globalThis.console.warn = function (value: any) {
        if (typeof value === "object") {
            // @ts-ignore
            context.log.warn(JSON.stringify(value, null, 2));
            return;
        }

        // @ts-ignore
        context.log.warn(value);
    };

    // @ts-ignore
    globalThis.console.error = function (value: any) {
        if (typeof value === "object") {
            // @ts-ignore
            context.log.error(JSON.stringify(value, null, 2));
            return;
        }

        // @ts-ignore
        context.log.error(value);
    };
}

if (!globalThis.process) {
    // @ts-ignore
    globalThis.process = {};

    // @ts-ignore
    globalThis.process.env = {};
}

// @ts-ignore
var executor = java.util.concurrent.Executors.newScheduledThreadPool(1);
// @ts-ignore
var timeouts = new java.util.HashMap();

if (!globalThis.setTimeout) {
    // @ts-ignore
    globalThis.setTimeout = function (
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
    // @ts-ignore
    globalThis.clearTimeout = function (id: string) {
        var task = timeouts.get(id);

        if (!task) {
            return;
        }

        task.cancel(false);
        timeouts.remove(id);
    };
}

if (!globalThis.setInterval) {
    // @ts-ignore
    globalThis.setInterval = function (
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
    // @ts-ignore
    globalThis.clearInterval = globalThis.clearTimeout;
}

if (!globalThis.fetch) {
    // @ts-ignore
    globalThis.fetch = function (url: string, options: any) {
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
    globalThis.toJSObject = function (value: any) {
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
