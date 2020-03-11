import blockHandler from "~/app/block-handler";
import model from "~/app/model";
import Layout from "~/app/layout";

const Page = ({ example }) => {
  console.log({ example });

  return (
    <Layout pageTitle={example.exampleTitle}>
      {example.sections.map(blockHandler)}
    </Layout>
  );
};
// <BlockContent blocks={example.sections} serializers={{}} />

const query = `{
  "example": *[_type=="example" && '/examples' + sectionSlug == $slug][0] {
    exampleTitle,
    sections
  }
}`;

export const getStaticProps = async ({ params }) => {
  const props = await model(query, { slug: `/examples/${params.subsection}` });

  return { props };
};

export const getStaticPaths = async () => {
  const props = await model(`*[_type=="example"][].sectionSlug`);

  const paths = props.map(subsection => ({
    params: {
      subsection: subsection.replace(/^\//, "")
    }
  }));

  return {
    paths,
    fallback: false
  };
};

export default Page;
