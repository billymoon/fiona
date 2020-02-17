export default {
  name: "apiNav",
  title: "Api Nav",
  type: "object",
  fields: [
    {
      name: "apiItems",
      type: "array",
      of: [{ type: "reference", to: [{ type: "api" }] }]
    }
  ]
};
