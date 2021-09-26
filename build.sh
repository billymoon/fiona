#!/usr/bin/env sh
deno bundle ./src/core/index.js | deno run --allow-read ./swc-transform.js > ./nodejs/fiona-core.js
deno bundle ./src/core/index.js | deno run --allow-read ./swc-transform.js --minify > ./nodejs/fiona-core.min.js
deno bundle ./src/index.js | deno run --allow-read ./swc-transform.js > ./nodejs/fiona.js
deno bundle ./src/index.js | deno run --allow-read ./swc-transform.js --minify > ./nodejs/fiona.min.js
