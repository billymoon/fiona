import Fiona from "./src/index.js";

// Fiona.register(["log", (seeded) => {
//   return Object.keys(seeded.constructor.prototype).slice(1).reduce(
//     (memo, key) => ({
//       ...memo,
//       [key]: (node) => {
//         const out = seeded[key](node);
//         console.log(JSON.parse(JSON.stringify(out)));
//         return out;
//       },
//     }),
//     {},
//   );
// }]);

// Fiona.intercept = (node, cb) => seeded => cb(seeded.object(node));
const Store = () => {
  const store = {};
  
  const capture = function (key, node, valueToReturn) {
    // valueToReturn could be undefined, so use arguments length to check if it is set
    const shouldReturnData = arguments.length === 2
    return seeded => {
      store[key] = seeded.object(node)
      return shouldReturnData ? store[key] : valueToReturn;
    }
  }

  // return a copy so that the store can not be modified
  const retrieve = (key) => JSON.parse(JSON.stringify(store[key]))

  return [capture, retrieve]
};

const [capture, retrieve] = Store();

console.log(Fiona(1).object({
  user: capture("myUser", {
    first: Fiona.Firstname,
    last: Fiona.Surname
  }, undefined),
  firsty: () => retrieve("myUser").first,
  // fore: seeded => seeded.data.first,
  lasty: () => retrieve("myUser").last
}))

console.log(Fiona(2).object({
  user: capture("y", {
    first: Fiona.Firstname,
    last: Fiona.Surname
  }, undefined),
  first: () => retrieve("myUser").first,
  // fore: seeded => seeded.data.first,
  last: () => retrieve("y").last,
  state: () => retrieve("y")
}))

// console.log(Fiona(1).log().object({
//   name: setState1("MyName", Fiona.Fullname()),
//   cool: setState1("MyMyName", Fiona.Fullname(), undefined),
//   age: getState1("MyMyName"),
//   otherName: setState2("MyName", Fiona.Fullname),
//   greet: () => "Hi " + state1.MyName + " and " + state2.MyName,
// }));

// import Fiona from "./src/index.js";

// Fiona.register(["log", (seeded) => {
//   return Object.keys(seeded.constructor.prototype).slice(1).reduce(
//     (memo, key) => ({
//       ...memo,
//       [key]: (node) => {
//         const out = seeded[key](node);
//         console.log(JSON.parse(JSON.stringify(out)));
//         return out;
//       },
//     }),
//     {},
//   );
// }]);

// // Fiona.recurse = seeded.recurse
// Fiona.intercept = (node, cb) => (seeded) => cb(seeded.object(node));
// Fiona.state = () => {
//   const store = {};
//   return (key, node, returnValue = true) => {
//       if (typeof node === "undefined") {
//           return () => store[key];
//         } else {
//       return Fiona.intercept(node, (result) => {
//         store[key] = result;
//         return returnValue ? result : undefined;
//       });
//     }
//   };
// };
// //Fiona.register(["state", seeded => (() => { const store = {}; return (key, node) => { if(typeof node === "undefined"){ return store[key] } else { return Fiona.intercept(node, result => { store[key] = result; return result }) } } })()])

// const state1 = Fiona.state();
// const state2 = Fiona.state();

// // Fiona().object({ a: Fiona.Fullname, b: Fiona.Number, c: Fiona.log({ d: 123, e: Fiona.intercept(Fiona.Fullname(), name => name.toUpperCase()) }) })
// console.log(Fiona(1).log().object({
//   name: state1("MyName", Fiona.Fullname()),
//   cool: state1("MyMyName", Fiona.Fullname(), false),
//   age: state1("MyMyName"),
//   otherName: state2("MyName", Fiona.Fullname),
//   greet: () => "Hi " + state1("MyName")() + " and " + state2("MyName")(),
// }));
