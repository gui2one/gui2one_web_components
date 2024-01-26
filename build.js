const esbuild = require("esbuild");
const config = {
  format : 'cjs',
  logLevel: "info",
  entryPoints: ["components/index.ts"],
  bundle: true,
  outfile: "build/index.js",
  // outdir : "build",
  sourcemap : true,
  target : "esnext"
};

if( process.argv.length === 2)
{
  esbuild.build(config)
    .catch(() => process.exit(1));

}else if( process.argv[2] === "--watch" || process.argv[2] === "-w")
{

  async function watch() {
    let ctx = await esbuild.context(config);
    await ctx.watch();
    console.log('Watching...');
  }
  watch();
}