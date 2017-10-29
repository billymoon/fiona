import test from 'ava'
import fionaCore from './fiona.core.js'
import fiona from './fiona.js'

const fixture = {
  RANDOM_1: 0.4583325853842928,
  RANDOM_2: 0.5661969359806724,
  RANDOM_3: 0.5239930397476968,
  RANDOM_4: 0.05277363818733657,
  RANDOM_5: 0.5173543852369089,
  RANDOM_6: 0.9576014438446618,
  RANDOM_7: 0.21006875882505002
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
    t.is(baby.number(), 458333)
    for (let i = 10; i--;) {
      t.true(baby.number({ max: 10 }) <= 10)
    }
    for (let i = 10; i--;) {
      const num = baby.number({ min: 10, max: 20 })
      t.true(num >= 10)
      t.true(num <= 20)
    }
    t.is(baby.reseed(1).number({ max: 1e10 }), 4583325854)
  })

  test('fiona.fn.oneOf', t => {
    const baby = fiona(1)
    const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    t.is(baby.oneOf(oneToTen), 5)
    t.is(baby.oneOf(oneToTen), 6)
    t.is(baby.oneOf(oneToTen), 7)
    t.is(baby.oneOf(oneToTen), 1)
    baby.reseed(null).weighting(i => i * i * i)
    t.is(baby.oneOf(oneToTen), 1)
    t.is(baby.oneOf(oneToTen), 2)
    t.is(baby.oneOf(oneToTen), 3)
    t.is(baby.oneOf(oneToTen), 1)
  })

  test('fiona.fn.choose', t => {
    const baby = fiona(1)
    const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    t.deepEqual(baby.choose(3, oneToTen), [5, 7, 8])
    t.deepEqual(baby.choose(3, oneToTen), [1, 9, 4])
    t.deepEqual(baby.choose(3, oneToTen), [4, 1, 10])
    t.deepEqual(baby.choose(11, oneToTen), [9, 5, 8, 6, 7, 2, 10, 4, 1, 3, undefined])
    baby.reseed(null).weighting(i => i * i * i)
    t.deepEqual(baby.choose(3, oneToTen), [1, 3, 5])
    t.deepEqual(baby.choose(3, oneToTen), [1, 7, 3])
    t.deepEqual(baby.choose(3, oneToTen), [1, 2, 8])
    t.deepEqual(baby.choose(11, oneToTen), [7, 2, 5, 4, 3, 6, 9, 1, 8, 10, undefined])
    t.deepEqual(baby.choose(null, oneToTen), [])
    t.deepEqual(baby.choose(0, oneToTen), [])
  })

  test('fiona.fn.data', t => {
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

    t.deepEqual(generatePerson('moon'), {
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

    t.deepEqual(fiona('moon').data({
      gender: ({ seeded }) => seeded.oneOf(['Male', 'Female']),
      firstname: ({ seeded, data }) => seeded.oneOf(data.gender === 'Female' ? Girlnames : Boynames),
      luckyNumber: ({ seeded }) => seeded.number({ max: 100 }),
      pairsOfShoes: ({ seeded }) => seeded.number({ max: 10 }),
      favourite: {
        drinks: ({ seeded }) => seeded.choose(3, Drinks)
      }
    }), {
      gender: 'Female',
      firstname: 'Aria',
      luckyNumber: 76,
      pairsOfShoes: 10,
      favourite: {
        drinks: [ 'Water', 'Tea', 'Shake' ]
      }
    })

    t.deepEqual(fiona('moon').chain({
      gender: ({ seeded }) => seeded.oneOf(['Male', 'Female']),
      firstname: ({ seeded, data }) => seeded.oneOf(data.gender === 'Female' ? Girlnames : Boynames)
    }).chain({
      toys: ({ seeded }) => seeded.number({ max: 100 }),
      toyDeclaration: ({ me, data }) => `${me.value().firstname} has ${data.toys} toys`
    }).value(), {
      gender: 'Female',
      firstname: 'Aria',
      toys: 81,
      toyDeclaration: 'Aria has 81 toys'
    })
  })

  test('fiona.fn', t => {
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

    t.deepEqual(baby.value(), {
      gender: 'Female',
      firstname: 'Aria',
      luckyNumber: 76,
      bear: 'Christopher the orange bear',
      dolly: 'Purple Moon',
      houseNumber: 81
    })
  })

  test('fiona.data (Function)', t => {
    const data = fiona('moon').data(({ arr }) => arr(2, ({ seeded }) => {
      return seeded.number()
    }))
    t.deepEqual(data, [719007, 195079])
  })

  test('fiona.data (unknown)', t => {
    t.deepEqual(fiona('moon').data(123), 123)
    t.deepEqual(fiona('moon').data(/asdasd/), /asdasd/)
  })
})
