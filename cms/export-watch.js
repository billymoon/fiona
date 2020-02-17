const { readFileSync, writeFileSync } = require("fs");
const sanityClient = require("@sanity/client");
const sanityJson = require("./sanity.json");
const dataFilename = "./production-data.json";

const getCurrentData = () => JSON.parse(readFileSync(dataFilename));

const client = sanityClient({
  projectId: sanityJson.api.projectId,
  dataset: sanityJson.api.dataset,
  useCdn: false
});

// const getDataSince = async lastUpdated => {
//   const result = await client.fetch(query, {})
//   console.log(result)
//   return result;
// };

const sortByUpdatedAt = (a, b) => (a._updatedAt < b._updatedAt ? -1 : 1);

const updateData = newDocs => {
  const currentData = getCurrentData();
  const lastUpdated = currentData.sort(sortByUpdatedAt)[currentData.length - 1]
    ._updatedAt;
  // const latestData = await getDataSince(lastUpdated);
  // console.log(newDocs);
  const latestData = [newDocs];
  const latestIds = latestData.map(document => document._id);
  const filteredData = currentData.filter(
    document => latestIds.indexOf(document._id) === -1
  );

  const combined = filteredData.concat(latestData).sort(sortByUpdatedAt);
  // console.log(latestData.map(JSON.stringify).join("\n"));

  const out = `[\n${combined
    .map(document => `  ${JSON.stringify(document)}`)
    .join(",\n")}\n]`;
  writeFileSync(dataFilename, out);
  // console.log(out);
  return out;
};

const query = `*[!(_type match "system.*")]`;
const subscription = client.listen(query, {}).subscribe(update => {
  const newDocs = update.result;
  const updated = updateData(newDocs);
});

// // to unsubscribe later on
// subscription.unsubscribe()
