export default {
  name: "example",
  title: "Examples",
  type: "document",
  fields: [
    { name: "exampleTitle", title: "Example Title", type: "string" },
    { name: "thumbnail", type: "contentImageBlock" },
    { name: "summary", type: "richBlock" },
    {
      name: "sections",
      type: "array",
      of: [{ type: "reference", to: [{ type: "section" }] }]
    }
  ]
};
