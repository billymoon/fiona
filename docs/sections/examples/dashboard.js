import Link from 'next/link'
import { Fiona, Layout, Article, Shelf, withTheme } from '../../app'

const Showcase = ({ children, title, href, img }) => (
  <div>
    <h3>{title}</h3>
    <Link prefetch href={href}>
      <a>
        <div className="img-wrapper">
          <img src={img} alt="" />
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
)

export default withTheme(({ seed, theme }) => (
  <section>
    <Shelf
      section1={
        <Showcase
          title="Mock API"
          href="/examples/mock-api"
          img="/static/img/mock-api.png"
        >
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
          img="/static/img/populate-template.png"
        >
          <p>
            Generated data can be used to populate pretty much any kind of
            template. You could be creating a letter template, or generating SQL
            to populate a development database.
          </p>
          <p>
            It's possible to generate template output directly by inserting
            functions to render data inline, but by using a two step process of
            generating the model, and then applying it to the template, there
            are some benefits.
          </p>
          <ul>
            <li>multiple templates can be populated from one model</li>
            <li>
              the model can include information used to derive the template
              output that does not appear in the output
            </li>
            <li>the template can consume data from other sources</li>
          </ul>
        </Showcase>
      }
      section3={
        <Showcase
          title="Image Placeholders"
          href="/examples/image-placeholders"
          img={Fiona(seed).img({
            height: 1060,
            width: 1414,
            bg: theme.clr.secondaryAccent,
            colors: [
              { start: theme.clr.primary, end: theme.clr.accent },
              { start: theme.clr.secondary, end: theme.clr.secondaryAccent }
            ]
          })}
        >
          <p>
            Using placeholder images can help to design layouts, by doing for
            graphics, what lorem ipsum does for text.
          </p>

          <p>
            By making placeholder images repeatable, visual diff tools will not
            be broken, and they can be used for any testing that requires
            reproducing of same scenario.
          </p>
        </Showcase>
      }
    />
  </section>
))
