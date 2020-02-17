import Fiona from "~/library/src";
// import { pageData, examples } from "~/app/page-data";
// import groq from "~/app/model";
import { withData } from "~/app/model";

const Page = ({ a, page, examples }) => {
  console.log(page, a);

  return (
    <div>
      Incididunt in nostrud culpa nostrud occaecat ut dolore fugiat esse
      consequat tempor consequat eu in incididunt ut est eu.
    </div>
  );
};

Page.getInitialProps = () => ({
  a: 1
});
// Page.getInitialProps = async () =>
//   await groq(
//     `{
//     "page": *[_type=="page" && slug == $slug][0] {
//       pageTitle,
//       sections
//     },
//     "examples": *[_type=="articles"] {
//       summary,
//       thumbnail
//     }
//   }`,
//     { slug: "/examples" },
//     // {
//     //   section: (node, root) => node.title,
//     //   reference: node => node
//     // }
//   );

// export default Page;

export default withData(
  Page,
  `{
    "page": *[_type=="page" && slug == $slug][0] {
      pageTitle,
      sections
    },
    "examples": *[_type=="articles"] {
      summary,
      thumbnail
    }
  }`
  // { slug: "/examples" }
);
