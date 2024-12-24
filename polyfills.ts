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
