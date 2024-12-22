import { defineConfig } from "tsup";

export default defineConfig({
    name: "build",
    entry: {
        main: "src/index.ts",
    },
    dts: false,
    format: ["cjs"],
    target: "es5",
    minify: "terser",
    splitting: false,
    minifyWhitespace: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    treeshake: true,
    cjsInterop: true,
    clean: true,
    onSuccess: "pnpm ask",
    noExternal: [/(.*)/],
    inject: ["polyfills.ts"],
    replaceNodeEnv: true,
    esbuildPlugins: [
        {
            name: "process-polyfill",
            setup(build) {
                build.onResolve({ filter: /^process$/ }, () => ({
                    path: "./polyfills.ts",
                }));
            },
        },
    ],
});
