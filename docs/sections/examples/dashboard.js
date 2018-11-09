import Link from "next/link";
import { Layout, Article, Shelf } from "../../app";

const Showcase = ({ children, title, href, img }) => (
  <div>
    <h3>{title}</h3>
    <Link prefetch href={href}>
      <a>
        <div className="img-wrapper">
          <img src={`/static/img/${img}.png`} alt="" />
        </div>
      </a>
    </Link>
    {children}
    <Link prefetch href={href}>
      <a>{title} demo and code samples</a>
    </Link>
    <style jsx>{`
      img {
        width: 100%;
      }

      .img-wrapper {
        border-radius: 5px;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.12);
        margin-bottom: 20px;
      }
    `}</style>
  </div>
);

export default () => (
  <section>
    <Shelf
      section1={
        <Showcase title="Mock API" href="/examples/mock-api" img="mock-api">
          <p>
            By agreeing the api up-front, and generating a mock api makes it
            possible to work on front end components whilst the api feature is
            being developed.
          </p>
          <p>
            The full api can be mocked, or an existing api can be intercepted,
            and modified in transit, either from a small proxy server, or in the
            browser by monkey patching http request methods.
          </p>
          <p>
            Fiona makes it easy to generate mock api data, and having more
            realistic data helps to enable rapid prototyping sometimes in place
            of high fidelity designs.
          </p>
        </Showcase>
      }
      section2={
        <Showcase
          title="Populate Template"
          href="/examples/populate-template"
          img="populate-template"
        >
          <p>Generated data can be used to populate pretty much any kind of template. You could be creating a letter template, or generating SQL to populate a development database.</p>
          <p>It's possible to generate template output directly by inserting functions to render data inline, but by using a two step process of generating the model, and then applying it to the template, there are some benefits.</p>
          <ul>
            <li>multiple templates can be populated from one model</li>
            <li>the model can include information used to derive the template output that does not appear in the output</li>
            <li>the template can consume data from other sources</li>
          </ul>
        </Showcase>
      }
    />
  </section>
);
