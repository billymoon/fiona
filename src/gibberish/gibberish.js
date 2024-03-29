const gibberish = (
  seeded,
  { qty = 1, syllableMin = 1, syllableMax = 5 } = {},
) =>
  seeded.array(
    qty,
    // don't use seeded instance passed to array callback, but rather consume seeds from the parent to prevent same output on multiple calls
    () =>
      seeded.regex(
        new RegExp(
          `([bcdfghklmnprstvw]?(a|ac|ad|af|age|al|an|an|ap|ar|as|at|au|aus|e|ed|el|en|ence|er|ern|ers|es|est|et|eve|ex|i|ic|ies|im|in|ing|ings|is|it|o|ob|oc|of|op|or|out|u|un|up)){${syllableMin},${syllableMax}}`,
        ),
      ),
  ).join(" ");

export default gibberish;
