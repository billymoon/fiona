import { withData } from "~/app/model";

const Page = ({ page, examples }) => {
  console.log(page, examples);

  return (
    <div>
      Incididunt in nostrud culpa nostrud occaecat ut dolore fugiat esse
      consequat tempor consequat eu in incididunt ut est eu.
    </div>
  );
};

const query = `{
  "page": *[_type=="page" && slug == $slug][0] {
    pageTitle,
    sections
  },
  "examples": *[_type=="articles"] {
    summary,
    thumbnail
  }
}`;

export default withData(Page, query);
