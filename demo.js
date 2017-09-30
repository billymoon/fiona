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
// // fiona(123).data(({ seeded }) => seeded.random()).log()

// seeded.data({gender: [
//   {a: seeded.firstname()},
//   {a: ({ data, pos }) => data.gender[0].a},
//   [({ data, pos }) => data.gender[0].a, ({ pos }) => pos]
// ]}).log()

// seeded.data({
//   name: ({ seeded }) => seeded.fullname()
// }).log()

// ************ //

// const Girlnames = ['Mia', 'Alice', 'Fiona', 'Aria', 'Sarah']
// const Boynames = ['David', 'Maxwell', 'Christopher', 'John', 'Billy']
// const Surnames = ['Moon', 'Bell', 'Miller', 'Smith', 'Jones']
// const Colours = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple']
// const Drinks = ['Milk', 'Water', 'Tea', 'Beer', 'Juice', 'Shake', 'Coffee']

// const generatePerson = person => person.data({
//   gender: ({ seeded }) => seeded.oneOf(['Male', 'Female']),
//   firstname: ({ seeded, data }) => seeded.oneOf(data.gender === 'Female' ? Girlnames : Boynames),
//   lastname: ({ seeded }) => seeded.oneOf(Surnames),
//   fullname: ({ data }) => `${data.gender === 'Female' ? 'Little Miss' : 'Mr'} ${data.firstname} ${data.lastname}`,
//   nino: ({ seeded }) => seeded.regex(/[A-Z]{2}\d{6}[A-Z]/),
//   luckyNumber: ({ seeded }) => seeded.number(100),
//   houseNumber: ({ seeded }) => seeded.number(100),
//   favourite: {
//     color: ({ seeded }) => seeded.oneOf(Colours),
//     drinks: ({ seeded }) => seeded.weighting(i => i * i).choose(3, Drinks)
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
//   gender: ({ seeded }) => seeded.oneOf(['Male', 'Female']),
//   title: ({ data, seeded }) => seeded.title({ gender: data.gender }),
//   firstname: ({ data, seeded }) => seeded.firstname({ gender: data.gender }),
//   firstnames: ({ data, seeded }) => seeded.firstnames({ gender: data.gender }),
//   firstnamese: ({ data, seeded }) => seeded.firstnames({ gender: data.gender }),
//   surname: ({ data, seeded }) => seeded.surname({ gender: data.gender }),
//   fullname: ({ data, seeded }) => seeded.fullname({ gender: data.gender }),
//   fullnamex: ({ data, seeded }) => seeded.reseed('data.fullname' + seeded.info().initseed).fullname({ gender: data.gender })
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
//   name: ({ seeded }) => seeded.firstname(),
//   luckyNumbers: ({ seeded }) => Array(seeded.number(15)).fill(null).map(() => seeded.number(1e8)).map(seed => {
//     return seeded.number()
//   }),
//   nums: [
//     ({ seeded }) => seeded.number(),
//     ({ seeded }) => seeded.number()
//   ],
//   others: Array(10).fill(null).map(() => ({ seeded }) => seeded.number()),
//   another: ({ seeded }) => Array(seeded.number(5)).fill(null).map(() => ({ seeded }) => seeded.number()),
//   more: ({ arr, seeded }) => arr(seeded.number(10), ({ seeded, pos }) => ({
//     firstname: seeded.firstname(),
//     pos,
//     dogName: seeded.surname()
//   }))
// }).log()

// ************ //

// fiona(123).data({
//   red: ({ seeded }) => seeded.number(255),
//   green: ({ seeded }) => seeded.number(255),
//   blue: ({ seeded }) => seeded.number(255)
// }).log()

// fiona(123).data([
//   ({ seeded }) => seeded.number(255),
//   ({ seeded }) => seeded.number(255),
//   ({ seeded }) => seeded.number(255)
// ]).log()

// fiona(123).data({
//   red: ({ seeded }) => seeded.number(255),
//   green: ({ seeded }) => seeded.number(255),
//   blue: ({ seeded }) => seeded.number(255)
// }).log()

// fiona(123).data([
//   ({ seeded }) => seeded.number(255),
//   ({ seeded }) => seeded.number(255),
//   ({ seeded }) => seeded.number(255)
// ]).log()

// fiona(123).data({
//   red: ({ seeded }) => seeded.number(255),
//   green: ({ seeded }) => seeded.number(255)
// }).data({
//   blue: ({ seeded }) => seeded.number(255)
// }).log()

// const data = fiona(123).data([
//   ({ seeded }) => seeded.number(255)
// ]).data([
//   ({ seeded }) => seeded.number(255)
// ]).data([
//   ({ seeded }) => seeded.number(255),
//   {
//     nice: ({ seeded }) => seeded.firstname(),
//     pos: ({ pos }) => pos,
//     one: [1, 'cool'],
//     pos2: ({ pos }) => pos
//   }
// ]).data()

// console.log(data[3].one[1])

// fiona(123).data(({ seeded }) => {
//   return {
//     number: seeded.number(),
//     color: ({ seeded }) => `${seeded.number(255)}/${seeded.number(255)}/${seeded.number(255)}`,
//     speeds: [10, [({ pos }) => pos, ({ pos }) => pos], 30]
//   }
// }).log()

// fiona(123).data({
//   number: ({ seeded }) => seeded.number(),
//   color: ({ seeded }) => `${seeded.number(255)}/${seeded.number(255)}/${seeded.number(255)}`,
//   speeds: [10, [({ pos }) => pos, ({ pos }) => pos], 30]
// }).log()

// fiona(123).data(({ seeded }) => {
//   return [1, ({ seeded }) => seeded.number()]
// }).log()

// fiona(123).data(({ seeded }) => `awesome ${seeded.oneOf(['stuff', 'things'])}`).log()

// ************ //

// fiona`
// CREATE DATABASE COOL;
// ${({ arr }) => arr(5, ({ seeded }) => `
// INSERT INTO ${seeded.name()} VALUES (1, 2, 3);
// `)}
// `

// ************ //

// console.time('loop')
// const data = fiona(1).data({
//   numbers: ({ arr, seeded }) => arr(1e4, ({ seeded }) => seeded.number(9999999, 1000000))
// }).data()
// console.timeEnd('loop')

// // console.log(data.numbers[123])
// // console.log(data.numbers[456])
// // console.log(data.numbers[789])
// // console.log(data.numbers[5106])
// // console.log(data.numbers[2724])
// data.numbers.forEach((item, index) => {
//   if (data.numbers.indexOf(item) < index) {
//     console.log(item, index, data.numbers.indexOf(item))
//   }
// })

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
