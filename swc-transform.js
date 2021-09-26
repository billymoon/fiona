import { parse as flagParser } from "https://deno.land/std@0.108.0/flags/mod.ts";
import { transform } from "https://x.nest.land/swc@0.1.4/mod.ts";
const flags = flagParser(Deno.args);

const src = new TextDecoder().decode(await Deno.readAll(Deno.stdin));
const srcExport = src.replace(/export { (\w+) as default };/, "export = $1")
const { code } = transform(srcExport, {
  jsc: {
    target: "es2016",
    parser: {
      syntax: "typescript",
    },
    minify: {
      mangle: true,
    },
  },
  minify: flags.minify,
  module: {
    type: "commonjs",
    noInterop: true,
    strictMode: false,
    strict: true
  },
});

console.log(`(function(root,factory){if(typeof define==="function"&&define.amd){define([],factory);}else if(typeof exports==="object"){module.exports=factory();}else{root.Fiona=factory();}})(this,function(){${code.replace(/module.exports ?= ?(\w+)/, "return $1")}});`);
