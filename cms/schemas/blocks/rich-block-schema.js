export default {
  name: "richBlock",
  type: "object",
  fields: [
    {
      name: "content",
      type: "array",
      of: [
        { type: "block" },
        { type: "codeBlock" },
        { type: "imageAndTextBlock" }
      ]
    }
  ]
};
