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
    minifyWhitespace: true,
    minifyIdentifiers: true,
    minifySyntax: true,
    treeshake: true,
    cjsInterop: true,
    clean: true,
    onSuccess: "pnpm ask",
    noExternal: [/(.*)/],
});
