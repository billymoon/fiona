import template from "lodash.template";

import { fiona, consume, Sample } from "../../app";

if (process.browser) {
  window._ = {
    template
  };
}

fiona.register([
  "template",
  (seeded, ...data) => (templateArray, ...args) => {
    const templateString = templateArray.reduce(
      (a, b) => a + args.shift().toString() + b
    );
    return template(templateString)(seeded.object(...data));
  }
]);

const Section = ({ seed }) => (
  <section>
    <h3>Template Plugin</h3>

    <p>
      To build a custom template plugin, you could use any template language.
      This example uses a lodash template.
    </p>

    <Sample
      input={`
    fiona.register(['template', (seeded, ...data) => (templateArray, ...args) => {
      const templateString = templateArray.reduce((a, b) => a + args.shift().toString() + b)
      // assuming lodash is loaded, render template with values
      return _.template(templateString)(seeded.object(...data))
    }])

    fiona(${seed}).template({
        fullname: seeded => seeded.fullname(),
        color: seeded => seeded.oneOf(['red', 'orange', 'yellow', 'green', 'blue'])
    })\`Hi <%= fullname %>,

    Your favourite colour is <%= color %>.

    Have a nice day,

    Fiona
    x x x\`
    `}
      output={fiona(seed).template({
        fullname: fiona.Fullname(),
        color: fiona.OneOf(["red", "orange", "yellow", "green", "blue"])
      })`
    Hi <%= fullname %>,

    Your favourite colour is <%= color %>.

    Have a nice day,

    Fiona
    x x x
    `}
    />

    <div className="clearfix" />
  </section>
);

export default consume(Section);
