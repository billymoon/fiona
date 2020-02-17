const execa = require("execa");
const { readFileSync, writeFileSync } = require("fs");

const readNdjsonSync = filename => {
  const productionData = readFileSync(filename, "utf8");
  return JSON.parse(
    `[${productionData
      .trim()
      .split("\n")
      .join(",")}]`
  );
};

const getDataSince = async lastUpdated => {
  const query = `*[!(_type match "system.*") && _updatedAt > "${lastUpdated}"]`;
  const result = await execa("sanity", ["documents", "query", query]);
  return JSON.parse(result.stdout);
};

const sortByUpdatedAt = (a, b) => (a._updatedAt < b._updatedAt ? -1 : 1);

void (async () => {
  const current = readNdjsonSync("./production-data.ndjson");

  const lastUpdated = current.sort(sortByUpdatedAt)[current.length - 1]
    ._updatedAt;
  const latestData = await getDataSince(lastUpdated);

  const combined = current.concat(latestData).sort(sortByUpdatedAt);
  const out = combined.map(JSON.stringify).join("\n") + "\n";

  console.log(latestData.map(JSON.stringify).join('\n'))

  writeFileSync("./production-data.ndjson", out);
})();
