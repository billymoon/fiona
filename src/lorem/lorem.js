export const lorem = (seeded, { qty = 15 } = {}) => {
  const startWithLoremIpsum = seeded.random() < 0.2;
  let words = [];
  while (words.length < qty) {
    words = words.concat(
      "dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum"
        .split(
          " ",
        ),
    );
  }
  return (startWithLoremIpsum ? "lorem ipsum" : "") +
    seeded.choose(startWithLoremIpsum ? Math.max(0, qty - 2) : qty, words).join(
      " ",
    );
};

export const word = (seeded) => seeded.lorem({ qty: 1 }).split(" ")[0];

export const sentence = (seeded) => {
  const sentence = seeded.lorem({ qty: 25 });
  return sentence[0].toUpperCase() + sentence.slice(1) + ".";
};

// TODO: can I use Fiona.Array to generate paragraphs?
export const paragraph = (seeded) =>
  Array(seeded.number({ min: 1, max: 10 }))
    .fill(0)
    .map(() => seeded.sentence())
    .join("  ");
