const { emptyDirSync, copySync, removeSync } = require("fs-extra");

const { exec } = require("./utils");

exec("deno lint src");

// exec("deno test src");

// exec("size-limit");
