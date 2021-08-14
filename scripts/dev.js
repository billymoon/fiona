const { execWithArgs } = require("./utils");

execWithArgs('NODE_OPTIONS="--inspect" next dev -p ${PORT:-3000}');
