const { writeFileSync } = require("fs");
const execa = require("execa");
const dataFilename = "./production-data.json";
const currentData = require(dataFilename);

const getDataSince = async lastUpdated => {
  const query = `*[!(_type match "system.*") && _updatedAt > "${lastUpdated}"]`;
  const result = await execa("sanity", ["documents", "query", query]);
  return JSON.parse(result.stdout);
};

const sortByUpdatedAt = (a, b) => (a._updatedAt < b._updatedAt ? -1 : 1);

void (async () => {
  const lastUpdated = currentData.sort(sortByUpdatedAt)[currentData.length - 1]
    ._updatedAt;
  const latestData = await getDataSince(lastUpdated);
  const latestIds = latestData.map(document => document._id);
  const filteredData = currentData.filter(
    document => latestIds.indexOf(document._id) === -1
  );

  const combined = filteredData.concat(latestData).sort(sortByUpdatedAt);
  console.log(latestData.map(JSON.stringify).join("\n"));

  const out = `[\n${combined
    .map(document => `  ${JSON.stringify(document)}`)
    .join(",\n")}\n]`;
  writeFileSync(dataFilename, out);
})();
