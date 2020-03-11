import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import sectionSchema from "./section-schema.js";
import exampleSchema from "./example-schema.js";
import pageSchema from "./page-schema.js";
import apiSchema from "./api-schema.js";
import * as blocks from "./blocks";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    ...Object.values(blocks),
    sectionSchema,
    pageSchema,
    exampleSchema,
    apiSchema
  ])
});
