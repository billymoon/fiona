export default {
  name: "imageNav",
  title: "Image Nav",
  type: "object",
  fields: [
    {
      name: "navItems",
      type: "array",
      of: [{ type: "reference", to: [{ type: "example" }] }]
    }
  ]
};
