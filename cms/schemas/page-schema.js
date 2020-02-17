export default {
  name: "page",
  type: "document",
  fields: [
    { name: "pageTitle", title: "Page Title", type: "string" },
    {
      name: "sections",
      type: "array",
      of: [
        { type: "reference", to: [{ type: "section" }] },
        { type: "imageNav" },
        { type: "apiNav" }
      ]
    },
    { name: "thumbnail", type: "contentImageBlock" },
    { name: "summary", type: "richBlock" }
  ]
};
