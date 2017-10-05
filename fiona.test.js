import test from 'ava'
import fionaCore from './fiona.core.js'
import fiona from './fiona.js'

const fixture = {
  RANDOM_1: 0.4170219984371215,
  RANDOM_2: 0.99718480813317,
  RANDOM_3: 0.43599490262567997,
  RANDOM_4: 0.18508208147250116,
  RANDOM_5: 0.19869689363986254,
  RANDOM_6: 0.07978078303858638,
  RANDOM_7: 0.17390734718049058
};

[fionaCore, fiona].forEach(fiona => {
  const Girlnames = ['Mia', 'Alice', 'Fiona', 'Aria', 'Sarah']
  const Boynames = ['David', 'Maxwell', 'Christopher', 'John', 'Billy']
  const Surnames = ['Moon', 'Bell', 'Miller', 'Smith', 'Jones']
  const Colours = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple']
  const Drinks = ['Milk', 'Water', 'Tea', 'Beer', 'Juice', 'Shake', 'Coffee']

  test('sanity', t => {
    t.true(true + true === 2)
  })

  test('import', t => {
    t.is(typeof fiona, 'function')
  })

  test('basic seeding', t => {
    t.not(fiona().random(), fiona().random())
    t.not(fiona(1).random(), fiona(2).random())
    t.is(fiona(1).random(), fiona(1).random())
    t.is(fiona(2).random(), fiona(2).random())
  })

  test('fiona.fn.reseed', t => {
    const baby = fiona(1)
    t.is(baby.random(), fixture.RANDOM_1)
    t.is(baby.random(), fixture.RANDOM_2)
    t.is(baby.reseed(null).random(), fixture.RANDOM_1)
    t.is(baby.random(), fixture.RANDOM_2)
    t.is(baby.reseed(2).random(), fixture.RANDOM_3)
    t.is(baby.random(), fixture.RANDOM_4)
    t.is(baby.reseed(null).random(), fixture.RANDOM_1)
    t.is(baby.random(), fixture.RANDOM_2)
    t.is(baby.reseed(2).random(), fixture.RANDOM_3)
    t.is(baby.random(), fixture.RANDOM_4)
    t.is(baby.reseed(1).random(), fixture.RANDOM_1)
    t.is(baby.random(), fixture.RANDOM_2)
    t.is(baby.reseed('one').random(), fixture.RANDOM_5)
    t.is(baby.random(), fixture.RANDOM_6)
    t.is(baby.reseed(null).random(), fixture.RANDOM_1)
    t.is(baby.random(), fixture.RANDOM_2)
  })

  test('fiona.fn.info', t => {
    const baby = fiona(1)
    t.deepEqual(baby.info(), {
      initseed: 1
    })
  })

  test('fiona.fn.weighting', t => {
    const baby = fiona(1)
    t.is(baby.reseed(null).random(), fixture.RANDOM_1)
    t.is(baby.reseed(null).weighting(i => i * i).random(), fixture.RANDOM_7)
    t.is(baby.reseed(null).random(), fixture.RANDOM_7)
    t.is(baby.reseed(null).weighting(null).random(), fixture.RANDOM_1)
  })

  test('fiona.fn.callback', t => {
    const baby = fiona(1)
    t.is(baby.random(), fixture.RANDOM_1)
    baby.callback((data, me) => me.reseed(2))
    t.is(baby.random(), fixture.RANDOM_3)
    baby.callback((data, me) => me.reseed(1))
    t.is(baby.random(), fixture.RANDOM_1)
  })

  test('fiona.fn.clone', t => {
    const baby = fiona(1)
    const clone = baby.clone()
    t.is(baby.random(), fixture.RANDOM_1)
    t.is(clone.random(), fixture.RANDOM_1)
    t.is(baby.random(), fixture.RANDOM_2)
    t.is(clone.random(), fixture.RANDOM_2)
    t.is(baby.reseed(null).random(), fixture.RANDOM_1)
    t.is(baby.random(), fixture.RANDOM_2)
    t.is(clone.reseed(null).random(), fixture.RANDOM_1)
    t.is(clone.random(), fixture.RANDOM_2)
  })

  test('fiona.fn.number', t => {
    const baby = fiona(1)
    t.is(baby.number(), 417022)
    for (let i = 10; i--;) {
      t.true(baby.number(10) <= 10)
    }
    for (let i = 10; i--;) {
      const num = baby.number(20, 10)
      t.true(num >= 10)
      t.true(num <= 20)
    }
    t.is(baby.reseed(1).number(1e10), 4170219984)
  })

  test('fiona.fn.oneOf', t => {
    const baby = fiona(1)
    const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    t.is(baby.oneOf(oneToTen), 5)
    t.is(baby.oneOf(oneToTen), 10)
    t.is(baby.oneOf(oneToTen), 8)
    t.is(baby.oneOf(oneToTen), 10)
    baby.reseed(null).weighting(i => i * i * i)
    t.is(baby.oneOf(oneToTen), 1)
    t.is(baby.oneOf(oneToTen), 10)
    t.is(baby.oneOf(oneToTen), 4)
    t.is(baby.oneOf(oneToTen), 9)
  })

  test('fiona.fn.choose', t => {
    const baby = fiona(1)
    const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    t.deepEqual(baby.choose(3, oneToTen), [5, 10, 8])
    t.deepEqual(baby.choose(3, oneToTen), [10, 2, 4])
    t.deepEqual(baby.choose(3, oneToTen), [4, 10, 1])
    t.deepEqual(baby.choose(11, oneToTen), [3, 2, 6, 5, 7, 4, 9, 1, 10, 8])
    baby.reseed(null).weighting(i => i * i * i)
    t.deepEqual(baby.choose(3, oneToTen), [1, 10, 5])
    t.deepEqual(baby.choose(3, oneToTen), [9, 2, 3])
    t.deepEqual(baby.choose(3, oneToTen), [1, 10, 3])
    t.deepEqual(baby.choose(11, oneToTen), [1, 2, 3, 4, 5, 6, 8, 7, 10, 9])
    t.deepEqual(baby.choose(null, oneToTen), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    t.deepEqual(baby.choose(0, oneToTen), [])
  })

  test('fiona.fn.data', t => {
    const generatePerson = seed => fiona(seed).data({
      gender: ({ seeded }) => seeded.oneOf(['Male', 'Female']),
      firstname: ({ seeded, data }) => seeded.oneOf(data.gender === 'Female' ? Girlnames : Boynames),
      lastname: ({ seeded }) => seeded.oneOf(Surnames),
      fullname: ({ data }) => `${data.gender === 'Female' ? 'Little Miss' : 'Mr'} ${data.firstname} ${data.lastname}`,
      luckyNumber: ({ seeded }) => seeded.number(100),
      houseNumber: ({ seeded }) => seeded.number(100),
      favourite: {
        color: ({ seeded }) => seeded.oneOf(Colours),
        drinks: ({ seeded }) => seeded.weighting(i => i * i).choose(3, Drinks)
      }
    })

    t.deepEqual(generatePerson('moon').data(), {
      gender: 'Male',
      firstname: 'Christopher',
      lastname: 'Smith',
      fullname: 'Mr Christopher Smith',
      luckyNumber: 46,
      houseNumber: 86,
      favourite: {
        color: 'Purple',
        drinks: [ 'Milk', 'Juice', 'Water' ]
      }
    })

    t.deepEqual(fiona('moon').data({
      gender: ({ seeded }) => seeded.oneOf(['Male', 'Female']),
      firstname: ({ seeded, data }) => seeded.oneOf(data.gender === 'Female' ? Girlnames : Boynames),
      luckyNumber: ({ seeded }) => seeded.number(100),
      pairsOfShoes: ({ seeded }) => seeded.number(10),
      favourite: {
        drinks: ({ seeded }) => seeded.weighting(i => i * i).choose(3, Drinks)
      }
    }).data(), {
      gender: 'Male',
      firstname: 'Christopher',
      luckyNumber: 46,
      pairsOfShoes: 5,
      favourite: {
        drinks: [ 'Milk', 'Juice', 'Water' ]
      }
    })

    t.deepEqual(fiona('moon').data({
      gender: ({ seeded }) => seeded.oneOf(['Male', 'Female']),
      firstname: ({ seeded, data }) => seeded.oneOf(data.gender === 'Female' ? Girlnames : Boynames)
    }).data({
      toys: ({ seeded }) => seeded.number(100),
      toyDeclaration: ({ me, data }) => `${me.data().firstname} has ${data.toys} toys`
    }).data(), {
      gender: 'Male',
      firstname: 'Christopher',
      toys: 70,
      toyDeclaration: 'Christopher has 70 toys'
    })
  })

  test('fiona.fn', t => {
    fiona.fn.addToyNames = function () {
      this.data({
        bear: ({ seeded }) => `${seeded.oneOf(Boynames)} the ${seeded.oneOf(Colours).toLowerCase()} bear`,
        dolly: ({ seeded }) => `${seeded.oneOf(Colours)} ${seeded.oneOf(Surnames)}`
      })
      return this
    }

    const baby = fiona('moon')

    baby.data({
      gender: ({ seeded }) => seeded.oneOf(['Male', 'Female']),
      firstname: ({ seeded, data }) => seeded.oneOf(data.gender === 'Female' ? Girlnames : Boynames),
      luckyNumber: ({ seeded }) => seeded.number(100)
    }).addToyNames().data({
      houseNumber: ({ seeded }) => seeded.number(100)
    })

    t.deepEqual(baby.data(), {
      gender: 'Male',
      firstname: 'Christopher',
      luckyNumber: 46,
      bear: 'Maxwell the purple bear',
      dolly: 'Purple Smith',
      houseNumber: 86
    })
  })

  test('fiona.data (Function)', t => {
    const data = fiona('moon').data(({ arr }) => arr(2, ({ seeded }) => {
      return seeded.number()
    })).data()
    t.deepEqual(data, [885487, 775073])
  })

  test('fiona.data (unknown)', t => {
    t.deepEqual(fiona('moon').data(123).data(), 123)
    t.deepEqual(fiona('moon').data(/asdasd/).data(), /asdasd/)
  })

  test('fiona.prng (unknown)', t => {
    t.is(fiona('moon').number(), 969283)
    t.is(fiona('moon', fiona.prngs.twister).number(), 969283)
    t.is(fiona('moon', fiona.prngs.xor).number(), 512979)
  })
})
