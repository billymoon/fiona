import Fiona from "./core/index.js";

import bool from "./bool/bool.js";
import unique from "./unique/unique.js";
import choose from "./choose/choose.js";
import oneOf from "./choose/one-of.js";
import date from "./date/date.js";
import img from "./img/img.js";
import duplicable from "./duplicable/duplicable.js";

import gibberish from "./gibberish/gibberish.js";
import { lorem, paragraph, sentence, word } from "./lorem/lorem.js";
import {
  firstname,
  firstnames,
  fullname,
  gender,
  namedata,
  surname,
  title,
} from "./name/name.js";
import Regex from "./regex/regex.js";
import shuffle from "./shuffle/shuffle.js";
import importer from "./import/import.js";

export default (RandExp) => {
  Fiona.register(
    ["bool", bool],
    ["unique", unique],
    ["choose", choose],
    ["oneOf", oneOf],
    ["date", date],
    ["img", img],
    ["duplicable", duplicable],
    ["gibberish", gibberish],
    ["lorem", lorem],
    ["word", word],
    ["sentence", sentence],
    ["paragraph", paragraph],
    ["gender", gender],
    ["title", title],
    ["firstname", firstname],
    ["firstnames", firstnames],
    ["surname", surname],
    ["fullname", fullname],
    ["regex", Regex(RandExp)],
    ["shuffle", shuffle],
    ["import", importer],
  );

  // TODO: move namedata to getter/setter function - somehow encapsulate name plugin
  Fiona.namedata = namedata;

  return Fiona;
};
