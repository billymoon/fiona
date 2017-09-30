// const fiona = require('./fiona.js')
// const fiona = require('./fiona.core.js')
import fiona from './src/fiona'
import './plugins'

fiona.fn.log = function () {
  console.log(this.data())
  return this
}

// const seeded = fiona(123)
// // console.log(seeded.random())
// // console.log(seeded.random())
// // const seeded2 = fiona(123)
// // console.log(seeded2.random())
// // console.log(seeded2.random())
// // seeded.reseed(1234)
// // console.log(seeded.random())
// // console.log(seeded.random())
// // fiona(123).data(({ unique }) => unique.random()).log()

// seeded.data({gender: [
//   {a: seeded.firstname()},
//   {a: ({ data, pos }) => data.gender[0].a},
//   [({ data, pos }) => data.gender[0].a, ({ pos }) => pos]
// ]}).log()

// seeded.data({
//   name: ({ unique }) => unique.fullname()
// }).log()

// ************ //

// const Girlnames = ['Mia', 'Alice', 'Fiona', 'Aria', 'Sarah']
// const Boynames = ['David', 'Maxwell', 'Christopher', 'John', 'Billy']
// const Surnames = ['Moon', 'Bell', 'Miller', 'Smith', 'Jones']
// const Colours = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple']
// const Drinks = ['Milk', 'Water', 'Tea', 'Beer', 'Juice', 'Shake', 'Coffee']

// const generatePerson = person => person.data({
//   gender: ({ unique }) => unique.oneOf(['Male', 'Female']),
//   firstname: ({ unique, data }) => unique.oneOf(data.gender === 'Female' ? Girlnames : Boynames),
//   lastname: ({ unique }) => unique.oneOf(Surnames),
//   fullname: ({ data }) => `${data.gender === 'Female' ? 'Little Miss' : 'Mr'} ${data.firstname} ${data.lastname}`,
//   nino: ({ unique }) => unique.regex(/[A-Z]{2}\d{6}[A-Z]/),
//   luckyNumber: ({ unique }) => unique.number(100),
//   houseNumber: ({ unique }) => unique.number(100),
//   favourite: {
//     color: ({ unique }) => unique.oneOf(Colours),
//     drinks: ({ unique }) => unique.weighting(i => i * i).choose(3, Drinks)
//   }
// })

// console.log(generatePerson(fiona('moon')).data())
// console.log(generatePerson(fiona('Daddy')).data())

// generatePerson(fiona('Grandad')).log()

// generatePerson(fiona('moon')).data({
//   placeOfBirth: 'Scotland',
//   fullname: ({ me, data }) => `Pretty Miss ${me.data().firstname} ${me.data().lastname} of ${data.placeOfBirth}`
// }).log()

// fiona(123).data({
//   gender: ({ unique }) => unique.oneOf(['Male', 'Female']),
//   title: ({ data, unique }) => unique.title({ gender: data.gender }),
//   firstname: ({ data, unique }) => unique.firstname({ gender: data.gender }),
//   firstnames: ({ data, unique }) => unique.firstnames({ gender: data.gender }),
//   firstnamese: ({ data, unique }) => unique.firstnames({ gender: data.gender }),
//   surname: ({ data, unique }) => unique.surname({ gender: data.gender }),
//   fullname: ({ data, unique }) => unique.fullname({ gender: data.gender }),
//   fullnamex: ({ data, unique }) => unique.reseed('data.fullname' + unique.info().initseed).fullname({ gender: data.gender })
// }).log()

// console.log(JSON.stringify({
//   Grandad: generatePerson(fiona('Grandad')).data({
//     children: [
//       generatePerson(fiona('Daddy')).data({
//         children: [
//           generatePerson(fiona('moon')).data(),
//           generatePerson(fiona('sis 1')).data(),
//           generatePerson(fiona('middle sister')).data()
//         ]
//       }).data(),
//       generatePerson(fiona('aunt')).data()
//     ]
//   }).data()
// }, null, 2))

// ************ //

// fiona().callback(function () { console.log(this.info()); return this }).data({
//   name: ({ unique }) => unique.firstname(),
//   luckyNumbers: ({ unique }) => Array(unique.number(15)).fill(null).map(() => unique.number(1e8)).map(seed => {
//     return unique.number()
//   }),
//   nums: [
//     ({ unique }) => unique.number(),
//     ({ unique }) => unique.number()
//   ],
//   others: Array(10).fill(null).map(() => ({ unique }) => unique.number()),
//   another: ({ unique }) => Array(unique.number(5)).fill(null).map(() => ({ unique }) => unique.number()),
//   more: ({ arr, unique }) => arr(unique.number(10), ({ unique, pos }) => ({
//     firstname: unique.firstname(),
//     pos,
//     dogName: unique.surname()
//   }))
// }).log()

// ************ //

// fiona(123).data({
//   red: ({ unique }) => unique.number(255),
//   green: ({ unique }) => unique.number(255),
//   blue: ({ unique }) => unique.number(255)
// }).log()

// fiona(123).data([
//   ({ unique }) => unique.number(255),
//   ({ unique }) => unique.number(255),
//   ({ unique }) => unique.number(255)
// ]).log()

// fiona(123).data({
//   red: ({ unique }) => unique.number(255),
//   green: ({ unique }) => unique.number(255),
//   blue: ({ unique }) => unique.number(255)
// }).log()

// fiona(123).data([
//   ({ unique }) => unique.number(255),
//   ({ unique }) => unique.number(255),
//   ({ unique }) => unique.number(255)
// ]).log()

// fiona(123).data({
//   red: ({ unique }) => unique.number(255),
//   green: ({ unique }) => unique.number(255)
// }).data({
//   blue: ({ unique }) => unique.number(255)
// }).log()

// const data = fiona(123).data([
//   ({ unique }) => unique.number(255)
// ]).data([
//   ({ unique }) => unique.number(255)
// ]).data([
//   ({ unique }) => unique.number(255),
//   {
//     nice: ({ unique }) => unique.firstname(),
//     pos: ({ pos }) => pos,
//     one: [1, 'cool'],
//     pos2: ({ pos }) => pos
//   }
// ]).data()

// console.log(data[3].one[1])

// fiona(123).data(({ unique }) => {
//   return {
//     number: unique.number(),
//     color: ({ unique }) => `${unique.number(255)}/${unique.number(255)}/${unique.number(255)}`,
//     speeds: [10, [({ pos }) => pos, ({ pos }) => pos], 30]
//   }
// }).log()

// fiona(123).data({
//   number: ({ unique }) => unique.number(),
//   color: ({ unique }) => `${unique.number(255)}/${unique.number(255)}/${unique.number(255)}`,
//   speeds: [10, [({ pos }) => pos, ({ pos }) => pos], 30]
// }).log()

// fiona(123).data(({ unique }) => {
//   return [1, ({ unique }) => unique.number()]
// }).log()

// fiona(123).data(({ unique }) => `awesome ${unique.oneOf(['stuff', 'things'])}`).log()

// ************ //

// fiona`
// CREATE DATABASE COOL;
// ${({ arr }) => arr(5, ({ unique }) => `
// INSERT INTO ${unique.name()} VALUES (1, 2, 3);
// `)}
// `

// ************ //

console.time('loop')
const data = fiona(1).data({
  numbers: ({ arr, unique }) => arr(1e4, ({ unique }) => unique.number(9999999, 1000000))
}).data()
console.timeEnd('loop')

// console.log(data.numbers[123])
// console.log(data.numbers[456])
// console.log(data.numbers[789])
// console.log(data.numbers[5106])
// console.log(data.numbers[2724])
data.numbers.forEach((item, index) => {
  if (data.numbers.indexOf(item) < index) {
    console.log(item, index, data.numbers.indexOf(item))
  }
})

// console.log(data.numbers.slice(-10))

// ************ //

// const seeded = fiona(123)
// console.log(1, seeded.random())
// const dolly = seeded.clone()
// console.log(1, seeded.random())
// console.log(1, seeded.random())

// const seeded2 = fiona(123)
// console.log(2, seeded2.random())
// console.log(2, seeded2.random())
// console.log(2, seeded2.random())

// console.log(3, dolly.random())
// console.log(3, dolly.random())
// console.log(3, dolly.random())
// console.log(3, dolly.random())

// // const seeded = fiona(123)
// // console.log(seeded.random())
// // console.log(seeded.random())
// // seeded.seed(123)
// // console.log(seeded.random())
// // console.log(seeded.random())
