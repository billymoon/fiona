#!/usr/bin/env sh
deno bundle ./src/core/index.js | deno run --allow-read ./swc-transform.js | sed s/0.0.0-githash/$(node -p 'require("./nodejs/package").version')/ > ./nodejs/fiona-core.js
deno bundle ./src/core/index.js | deno run --allow-read ./swc-transform.js --minify | sed s/0.0.0-githash/$(node -p 'require("./nodejs/package").version')/ > ./nodejs/fiona-core.min.js
deno bundle ./src/index.js | deno run --allow-read ./swc-transform.js | sed s/0.0.0-githash/$(node -p 'require("./nodejs/package").version')/ > ./nodejs/fiona.js
deno bundle ./src/index.js | deno run --allow-read ./swc-transform.js --minify | sed s/0.0.0-githash/$(node -p 'require("./nodejs/package").version')/ > ./nodejs/fiona.min.js
