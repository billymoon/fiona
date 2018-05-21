/* global test,expect */

const fionaCore = require('./core')
const fiona = require('../')
const fionaCompiled = require('../../fiona.core')
const fionaCoreCompiled = require('../../fiona')

require('../plugins/number/fiona.number')
require('../plugins/choose/fiona.choose-oneof')
require('../plugins/choose/fiona.choose')

const fixture = {
  RANDOM_1: 0.4583325853842928,
  RANDOM_2: 0.5661969359806724,
  RANDOM_3: 0.5239930397476968,
  RANDOM_4: 0.05277363818733657,
  RANDOM_5: 0.5173543852369089,
  RANDOM_6: 0.9576014438446618,
  RANDOM_7: 0.21006875882505002
};

[fionaCore, fiona, fionaCompiled, fionaCoreCompiled].forEach(fiona => {
  const Girlnames = ['Mia', 'Alice', 'Fiona', 'Aria', 'Sarah']
  const Boynames = ['David', 'Maxwell', 'Christopher', 'John', 'Billy']
  const Surnames = ['Moon', 'Bell', 'Miller', 'Smith', 'Jones']
  const Colours = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple']
  const Drinks = ['Milk', 'Water', 'Tea', 'Beer', 'Juice', 'Shake', 'Coffee']

  test('sanity', () => {
    expect(true + true).toBe(2)
  })

  test('import', () => {
    expect(typeof fiona).toBe('function')
  })

  test('basic seeding', () => {
    expect(fiona().random()).not.toBe(fiona().random())
    expect(fiona(1).random()).not.toBe(fiona(2).random())
    expect(fiona(1).random()).toBe(fiona(1).random())
    expect(fiona(2).random()).toBe(fiona(2).random())
  })

  test('fiona.fn.reseed', () => {
    const baby = fiona(1)
    expect(baby.random()).toBe(fixture.RANDOM_1)
    expect(baby.random()).toBe(fixture.RANDOM_2)
    expect(baby.reseed(null).random()).toBe(fixture.RANDOM_1)
    expect(baby.random()).toBe(fixture.RANDOM_2)
    expect(baby.reseed(2).random()).toBe(fixture.RANDOM_3)
    expect(baby.random()).toBe(fixture.RANDOM_4)
    expect(baby.reseed(null).random()).toBe(fixture.RANDOM_1)
    expect(baby.random()).toBe(fixture.RANDOM_2)
    expect(baby.reseed(2).random()).toBe(fixture.RANDOM_3)
    expect(baby.random()).toBe(fixture.RANDOM_4)
    expect(baby.reseed(1).random()).toBe(fixture.RANDOM_1)
    expect(baby.random()).toBe(fixture.RANDOM_2)
    expect(baby.reseed('one').random()).toBe(fixture.RANDOM_5)
    expect(baby.random()).toBe(fixture.RANDOM_6)
    expect(baby.reseed(null).random()).toBe(fixture.RANDOM_1)
    expect(baby.random()).toBe(fixture.RANDOM_2)
  })

  test('fiona.call', () => {
    const baby1 = fiona(1)
    expect(baby1.data({
      number: fiona.call('number')
    })).toEqual({
      number: 670802
    })

    const baby2 = fiona(1)
    expect(baby2.data({
      age: fiona.call('number', { min: 10, max: 100 })
    })).toEqual({
      age: 18
    })

    const baby3 = fiona(1)
    expect(baby3.data({
      number: fiona.call('number'),
      age: fiona.call('number', { min: 10, max: 100 })
    })).toEqual({
      number: 670802,
      age: 18
    })
  })

  test('fiona.fn.info', () => {
    const baby = fiona(1)
    expect(baby.info()).toEqual({
      initseed: 1
    })
  })

  test('fiona.fn.weighting', () => {
    const baby = fiona(1)
    expect(baby.reseed(null).random()).toBe(fixture.RANDOM_1)
    expect(baby.reseed(null).weighting(i => i * i).random()).toBe(fixture.RANDOM_7)
    expect(baby.reseed(null).random()).toBe(fixture.RANDOM_7)
    expect(baby.reseed(null).weighting(null).random()).toBe(fixture.RANDOM_1)
  })

  test('fiona.fn.callback', () => {
    const baby = fiona(1)
    expect(baby.random()).toBe(fixture.RANDOM_1)
    baby.callback((data, me) => me.reseed(2))
    expect(baby.random()).toBe(fixture.RANDOM_3)
    baby.callback((data, me) => me.reseed(1))
    expect(baby.random()).toBe(fixture.RANDOM_1)
  })

  test('fiona.fn.clone', () => {
    const baby = fiona(1)
    const clone = baby.clone()
    expect(baby.random()).toBe(fixture.RANDOM_1)
    expect(clone.random()).toBe(fixture.RANDOM_1)
    expect(baby.random()).toBe(fixture.RANDOM_2)
    expect(clone.random()).toBe(fixture.RANDOM_2)
    expect(baby.reseed(null).random()).toBe(fixture.RANDOM_1)
    expect(baby.random()).toBe(fixture.RANDOM_2)
    expect(clone.reseed(null).random()).toBe(fixture.RANDOM_1)
    expect(clone.random()).toBe(fixture.RANDOM_2)
  })

  test('fiona.fn.number', () => {
    const baby = fiona(1)
    expect(baby.number()).toBe(458333)
    for (let i = 10; i--;) {
      expect(baby.number({ max: 10 }) <= 10).toBe(true)
    }
    for (let i = 10; i--;) {
      const num = baby.number({ min: 10, max: 20 })
      expect(num >= 10).toBe(true)
      expect(num <= 20).toBe(true)
    }
    expect(baby.reseed(1).number({ max: 1e10 })).toBe(4583325854)
  })

  test('fiona.fn.number (precision)', () => {
    expect(fiona(0).number()).toBe(617634)
    expect(fiona(0).number({ precision: 0 })).toBe(617634)
    expect(fiona(0).number({ precision: 1 })).toBe(617634.2)
    expect(fiona(0).number({ precision: 2 })).toBe(617634.21)
    expect(fiona(0).number({ precision: -2 })).toBe(617600)
    expect(fiona(0).number({ min: 10, max: 20, precision: 2 })).toBe(16.79)
  })

  test('fiona.fn.oneOf', () => {
    const baby = fiona(1)
    const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    expect(baby.oneOf(oneToTen)).toBe(5)
    expect(baby.oneOf(oneToTen)).toBe(6)
    expect(baby.oneOf(oneToTen)).toBe(7)
    expect(baby.oneOf(oneToTen)).toBe(1)
    baby.reseed(null).weighting(i => i * i * i)
    expect(baby.oneOf(oneToTen)).toBe(1)
    expect(baby.oneOf(oneToTen)).toBe(2)
    expect(baby.oneOf(oneToTen)).toBe(3)
    expect(baby.oneOf(oneToTen)).toBe(1)
  })

  test('fiona.fn.choose', () => {
    const baby = fiona(1)
    const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    expect(baby.choose(3, oneToTen)).toEqual([5, 7, 8])
    expect(baby.choose(3, oneToTen)).toEqual([1, 9, 4])
    expect(baby.choose(3, oneToTen)).toEqual([4, 1, 10])
    expect(baby.choose(11, oneToTen)).toEqual([9, 5, 8, 6, 7, 2, 10, 4, 1, 3, undefined])
    baby.reseed(null)
    expect(baby.choose(3, oneToTen, { weights: [10, 5, 1] })).toEqual([2, 3, 4])
    baby.reseed(null)
    expect(baby.choose(3, oneToTen, { weights: [10, 5, ''] })).toEqual([2, 3, 4])
    baby.reseed(null)
    expect(baby.choose(3, oneToTen, { weights: [10] })).toEqual([1, 3, 4])
    baby.reseed(null)
    expect(baby.choose(3, oneToTen, { weights: [10, 1] })).toEqual([1, 3, 4])
    baby.reseed(null).weighting(i => i * i * i)
    expect(baby.choose(3, oneToTen)).toEqual([1, 3, 5])
    expect(baby.choose(3, oneToTen)).toEqual([1, 7, 3])
    expect(baby.choose(3, oneToTen)).toEqual([1, 2, 8])
    expect(baby.choose(11, oneToTen)).toEqual([7, 2, 5, 4, 3, 6, 9, 1, 8, 10, undefined])
    expect(baby.choose(null, oneToTen)).toEqual([])
    expect(baby.choose(0, oneToTen)).toEqual([])
  })

  test('fiona.fn.data', () => {
    const generatePerson = seed => fiona(seed).data({
      gender: ({ seeded }) => seeded.oneOf(['Male', 'Female']),
      firstname: ({ seeded, data }) => seeded.oneOf(data.gender === 'Female' ? Girlnames : Boynames),
      lastname: ({ seeded }) => seeded.oneOf(Surnames),
      fullname: ({ data }) => `${data.gender === 'Female' ? 'Little Miss' : 'Mr'} ${data.firstname} ${data.lastname}`,
      luckyNumber: ({ seeded }) => seeded.number({ max: 100 }),
      houseNumber: ({ seeded }) => seeded.number({ max: 100 }),
      favourite: {
        color: ({ seeded }) => seeded.oneOf(Colours),
        drinks: ({ seeded }) => seeded.choose(3, Drinks)
      }
    })

    expect(generatePerson('moon')).toEqual({
      gender: 'Female',
      firstname: 'Aria',
      lastname: 'Moon',
      fullname: 'Little Miss Aria Moon',
      luckyNumber: 76,
      houseNumber: 81,
      favourite: {
        color: 'Yellow',
        drinks: [ 'Water', 'Tea', 'Shake' ]
      }
    })

    expect(fiona('moon').data({
      gender: ({ seeded }) => seeded.oneOf(['Male', 'Female']),
      firstname: ({ seeded, data }) => seeded.oneOf(data.gender === 'Female' ? Girlnames : Boynames),
      luckyNumber: ({ seeded }) => seeded.number({ max: 100 }),
      pairsOfShoes: ({ seeded }) => seeded.number({ max: 10 }),
      favourite: {
        drinks: ({ seeded }) => seeded.choose(3, Drinks)
      }
    })).toEqual({
      gender: 'Female',
      firstname: 'Aria',
      luckyNumber: 76,
      pairsOfShoes: 10,
      favourite: {
        drinks: [ 'Water', 'Tea', 'Shake' ]
      }
    })

    expect(fiona('moon').chain({
      gender: ({ seeded }) => seeded.oneOf(['Male', 'Female']),
      firstname: ({ seeded, data }) => seeded.oneOf(data.gender === 'Female' ? Girlnames : Boynames)
    }).chain({
      toys: ({ seeded }) => seeded.number({ max: 100 }),
      toyDeclaration: ({ me, data }) => `${me.value().firstname} has ${data.toys} toys`
    }).value()).toEqual({
      gender: 'Female',
      firstname: 'Aria',
      toys: 81,
      toyDeclaration: 'Aria has 81 toys'
    })
  })

  test('fiona.fn', () => {
    fiona.fn.addToyNames = function () {
      this.chain({
        bear: ({ seeded }) => `${seeded.oneOf(Boynames)} the ${seeded.oneOf(Colours).toLowerCase()} bear`,
        dolly: ({ seeded }) => `${seeded.oneOf(Colours)} ${seeded.oneOf(Surnames)}`
      })
      return this
    }

    const baby = fiona('moon')

    baby.chain({
      gender: ({ seeded }) => seeded.oneOf(['Male', 'Female']),
      firstname: ({ seeded, data }) => seeded.oneOf(data.gender === 'Female' ? Girlnames : Boynames),
      luckyNumber: ({ seeded }) => seeded.number({ max: 100 })
    }).addToyNames().chain({
      houseNumber: ({ seeded }) => seeded.number({ max: 100 })
    })

    expect(baby.value()).toEqual({
      gender: 'Female',
      firstname: 'Aria',
      luckyNumber: 76,
      bear: 'Christopher the orange bear',
      dolly: 'Purple Moon',
      houseNumber: 81
    })
  })

  test('fiona.data (Function)', () => {
    const data = fiona('moon').data(({ arr }) => arr(2, ({ seeded }) => {
      return seeded.number()
    }))
    expect(data).toEqual([719007, 195079])
  })

  test('fiona.data (unknown)', () => {
    expect(fiona('moon').data(123)).toEqual(123)
    expect(fiona('moon').data(/asdasd/)).toEqual(/asdasd/)
  })

  test('fiona.state', () => {
    const seeded = fiona('moon')
    expect(seeded.number()).toBe(512979)
    const state = seeded.state()
    expect(seeded.number()).toBe(432056)
    seeded.state(null)
    expect(seeded.number()).toBe(512979)
    expect(seeded.number()).toBe(432056)
    seeded.state(state)
    expect(seeded.number()).toBe(432056)
  })
})
