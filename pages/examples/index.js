import blockHandler from "~/app/block-handler";
import model from "~/app/model";
import Layout from "~/app/layout";

const Page = ({ page, examples, ...props }) => (
  <Layout pageTitle={page.pageTitle}>
    <div
      className={css.exampleWrapper}
      log={console.log(1, { page, examples })}
    >
      {examples.map(({ exampleTitle, summary, thumbnail, sectionSlug }) => (
        <div className={css.exampleBlock} key={sectionSlug}>
          <h3>{exampleTitle}</h3>
          <a href={`/examples${sectionSlug}`}>
            <img src={thumbnail.image.asset.url} alt="" className={css.img} />
          </a>
          {blockHandler(summary)}
          <a href={`/examples${sectionSlug}`}>
            {exampleTitle} demo and code samples
          </a>
        </div>
      ))}
    </div>
  </Layout>
);

const query = `{
  "page": *[_type=="page" && slug == $slug][0] {
    pageTitle,
    sections
  },
  "examples": *[_type=="example"] {
    exampleTitle,
    summary,
    thumbnail,
    sectionSlug
  }
}`;

export const getServerSideProps = async ({ req }) => {
  const props = await model(query, { slug: req.url });

  return { props };
};

export default Page;
