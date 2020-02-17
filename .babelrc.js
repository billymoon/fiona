const React = require("react");

module.exports = {
  presets: ["next/babel"],
  plugins: [
    ["preval"],
    [
      "module-resolver",
      {
        alias: {
          "~": "."
        }
      }
    ],
    [
      "auto-import",
      {
        declarations: [
          {
            members: Object.keys(React),
            path: "react"
          },
          {
            members: ["isInAmpMode", "useAmp"],
            path: "next/amp"
          },
          {
            default: "Router",
            members: ["useRouter", "withRouter"],
            path: "next/router"
          },
          {
            default: "Link",
            path: "next/link"
          },
          {
            default: "Head",
            path: "next/head"
          },
          {
            default: "dynamic",
            path: "next/dynamic"
          },
          {
            default: "Layout",
            members: ["withLayout"],
            path: "~/app/layout"
          },
          { default: "fetch", path: "isomorphic-unfetch" },
          { default: "css", path: "./[name].module.css" }
        ]
      }
    ]
  ]
};
