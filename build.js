// const cjs_to_esm_plugin = {
//     name: 'cjs-to-esm',
//     setup(build) {
//       build.onResolve({ filter: /.*/ }, args => {
//         if (args.importer === '') return { path: args.path, namespace: 'c2e' }
//       })
//       build.onLoad({ filter: /.*/, namespace: 'c2e' }, args => {
//         const keys = Object.keys(require(args.path)).join(', ')
//         const path = JSON.stringify(args.path)
//         const resolveDir = __dirname
//         return { contents: `export { ${keys} } from ${path}`, resolveDir }
//       })
//     },
//    };

require("esbuild")
  .build({
    format : 'cjs',
    // platform : 'node',
    logLevel: "info",
    entryPoints: ["components/index.ts"],
    bundle: true,
    outfile: "build/index.js",
    // outdir : "build",
    sourcemap : true,
    target : "esnext",
    // plugins: [cjs_to_esm_plugin],
  })
  .catch(() => process.exit(1));