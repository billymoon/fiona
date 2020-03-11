export default {
  name: "example",
  title: "Examples",
  type: "document",
  fields: [
    { name: "exampleTitle", title: "Example Title", type: "string" },
    { name: "sectionSlug", title: "Section Slug", type: "string", description: "part of the slug for this section, including leading slash - e.g. the /examples/<section-slug>" },
    { name: "thumbnail", type: "contentImageBlock" },
    { name: "summary", type: "richBlock" },
    {
      name: "sections",
      type: "array",
      of: [{ type: "reference", to: [{ type: "section" }] }]
    }
  ]
};
