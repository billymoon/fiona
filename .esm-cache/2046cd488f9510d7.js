let fiona;_8f9‍.w('./src/fiona',[["default",function(v){fiona=v}]]);_8f9‍.w('./src/methods');


const cool = fiona(123)
console.log(cool.random())
cool.seed(null)
console.log(cool.seed())
console.log(cool.random())
console.log(cool.random())
cool.prng(Math.random)
console.log(cool.random())
console.log(cool.random())
console.log(cool.random())

const ns = fiona(1);

console.log(ns.random());
console.log(ns.random());
console.log(ns.info())
console.log(ns.random());
console.log(ns.info())
console.log(fiona(ns.random()).data({
  a1: (me, myself) => myself.random(),
  a2: (me, myself) => myself.random(),
  a3: (me, myself) => myself.random()
}).reset(ns.reset().clone(1).random()).data({
// }).reset().clone(1).data({
// }).reset(ns.random()).data({
  b1: (me, myself) => myself.random(),
  b2: (me, myself) => myself.random(),
  b21: (me, myself) => myself.clone().random(),
  b22: (me, myself) => myself.clone().random(),
  b23: (me, myself) => myself.clone().random(),
  b3: (me, myself) => myself.random(),
  // b4: (me, myself) => myself.random(),
  b5: (me, myself) => myself.random()
}).reset(ns.reset().clone(2).random()).data({
// }).reset().clone(2).data({
// }).reset(ns.random()).data({
  c1: (me, myself) => myself.random(),
  c2: (me, myself) => myself.random(),
  c3: (me, myself) => myself.random()
}).reset(ns.reset().clone(3).random()).data({
// }).reset().clone(3).data({
// }).reset(ns.random()).data({
  d1: (me, myself) => myself.random(),
  d2: (me, myself) => myself.random(),
  d3: (me, myself) => myself.random()
}).reset().data({
  e1: (me, myself) => myself.random(),
  e2: (me, myself) => myself.random(),
  e3: (me, myself) => myself.random()
}).data());

// const second = fiona(0.2).thing('one ').thing(2).thing(3).data({
//   first: 'Billy',
//   colors: ['red', 'green'],
//   things: function () { return this.random(); },
//   otherThings: (me, myself) => myself.random()
// }).thing(' another thing').callback(function () {
//   return this;
// }).data({
//   last: me => me.first,
//   lastUpper: me => me.last.toUpperCase()
// });

// const first = fiona(0.9).thing('one ').thing(2).thing(3).data({
//   first: 'Billy',
//   colors: ['red', 'green'],
//   things: function () { return this; }
// }).thing(' another thing').callback((me, myself) => {
//   myself.data({
//     initseed: myself.initseed,
//     seed1: myself.seed
//   });
//   console.log(myself.random());
//   myself.data({
//     seed2: myself.seed
//   });
//   console.log(myself.random(), myself.initseed);
//   myself.data({
//     seed3: myself.seed
//   });
//   console.log(myself.random());
//   return myself;
// }).data({
//   last: me => me.first,
//   lastUpper: me => me.last.toUpperCase()
// });

// console.log(first.data());
// console.log(second.data());



