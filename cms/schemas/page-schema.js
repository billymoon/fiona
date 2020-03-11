export default {
  name: "page",
  type: "document",
  fields: [
    { name: "pageTitle", title: "Page Title", type: "string" },
    { name: "slug", title: "Slug", type: "string" },
    {
      name: "sections",
      type: "array",
      of: [{ type: "reference", to: [{ type: "section" }] }]
    },
    { name: "thumbnail", type: "contentImageBlock" },
    { name: "summary", type: "richBlock" }
  ]
};
