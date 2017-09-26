import test from 'ava'
import fiona from './fiona.core.js'

const Girlnames = ['Mia', 'Alice', 'Fiona', 'Aria', 'Sarah']
const Boynames = ['David', 'Maxwell', 'Christopher', 'John', 'Billy']
const Surnames = ['Moon', 'Bell', 'Miller', 'Smith', 'Jones']
const Colours = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple']
const Drinks = ['Milk', 'Water', 'Tea', 'Beer', 'Juice', 'Shake', 'Coffee']

test('sanity', t => {
  t.true(true + true === 2)
})

test('import', t => {
  t.true(typeof fiona === 'function')
})

test('basic seeding', t => {
  t.true(fiona().random() !== fiona().random())
  t.true(fiona(1).random() !== fiona(2).random())
  t.true(fiona(1).random() === fiona(1).random())
  t.true(fiona(2).random() === fiona(2).random())
})

test('fiona.fn.seed', t => {
  const baby = fiona(1)
  t.true(baby.random() === 0.5453317901234568)
  t.true(baby.random() === 0.9538280178326475)
  t.true(baby.seed(null).random() === 0.5453317901234568)
  t.true(baby.random() === 0.9538280178326475)
  t.true(baby.seed(2).random() === 0.381241426611797)
  t.true(baby.random() === 0.1688528806584362)
  t.true(baby.seed(null).random() === 0.5453317901234568)
  t.true(baby.random() === 0.9538280178326475)
  t.true(baby.seed(2).random() === 0.381241426611797)
  t.true(baby.random() === 0.1688528806584362)
  t.true(baby.seed(1).random() === 0.5453317901234568)
  t.true(baby.random() === 0.9538280178326475)
  t.true(baby.seed('one').random() === 0.9866863489304305)
  t.true(baby.random() === 0.38119154341815265)
  t.true(baby.seed(null).random() === 0.5453317901234568)
  t.true(baby.random() === 0.9538280178326475)
})

test('fiona.fn.info', t => {
  const baby = fiona(1)
  t.deepEqual(baby.info(), {
    initseed: 1,
    seed: 1
  })
  baby.random()
  t.deepEqual(baby.info(), {
    initseed: 1,
    seed: 127215
  })
  baby.seed(2)
  t.deepEqual(baby.info(), {
    initseed: 1,
    seed: 2
  })
})

test('fiona.fn.prng', t => {
  const baby = fiona(1)
  t.true(baby.prng(() => 123).random() === 123)
  t.true(baby.prng(null).random() === 0.5453317901234568)
})

test('fiona.fn.weighting', t => {
  const baby = fiona(1)
  t.true(baby.seed(null).random() === 0.5453317901234568)
  t.true(baby.seed(null).weighting(i => i * i).random() === 0.2973867613192539)
  t.true(baby.seed(null).random() === 0.2973867613192539)
  t.true(baby.seed(null).weighting(null).random() === 0.5453317901234568)
})

test('fiona.fn.callback', t => {
  const baby = fiona(1)
  t.true(baby.random() === 0.5453317901234568)
  baby.callback((data, me) => me.seed(2))
  t.true(baby.random() === 0.381241426611797)
  baby.callback((data, me) => me.seed(1))
  t.true(baby.random() === 0.5453317901234568)
})

test('fiona.fn.clone', t => {
  const baby = fiona(1)
  const clone = baby.clone()
  t.true(baby.random() === 0.5453317901234568)
  t.true(clone.random() === 0.5453317901234568)
  t.true(baby.random() === 0.9538280178326475)
  t.true(clone.random() === 0.9538280178326475)
  t.true(baby.seed(null).random() === 0.5453317901234568)
  t.true(baby.random() === 0.9538280178326475)
  t.true(clone.seed(null).random() === 0.5453317901234568)
  t.true(clone.random() === 0.9538280178326475)
})

test('fiona.fn.number', t => {
  const baby = fiona(1)
  t.true(baby.number() === 545331)
  for (let i = 10; i--;) {
    t.true(baby.number(10) < 10)
  }
  for (let i = 10; i--;) {
    const num = baby.number(20, 10)
    t.true(num > 10)
    t.true(num < 20)
  }
  t.true(baby.seed(1).number(1e10) === 5453317901)
})

test('fiona.fn.oneOf', t => {
  const baby = fiona(1)
  const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  t.true(baby.oneOf(oneToTen) === 6)
  t.true(baby.oneOf(oneToTen) === 10)
  t.true(baby.oneOf(oneToTen) === 2)
  t.true(baby.oneOf(oneToTen) === 8)
  baby.seed(null).weighting(i => i * i * i)
  t.true(baby.oneOf(oneToTen) === 2)
  t.true(baby.oneOf(oneToTen) === 9)
  t.true(baby.oneOf(oneToTen) === 1)
  t.true(baby.oneOf(oneToTen) === 4)
})

test('fiona.fn.choose', t => {
  const baby = fiona(1)
  const oneToTen = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  t.deepEqual(baby.choose(3, oneToTen), [6, 10, 4])
  t.deepEqual(baby.choose(3, oneToTen), [8, 6, 1])
  t.deepEqual(baby.choose(3, oneToTen), [5, 1, 3])
  t.deepEqual(baby.choose(11, oneToTen), [10, 1, 6, 9, 7, 5, 3, 4, 2, 8])
  baby.seed(null).weighting(i => i * i * i)
  t.deepEqual(baby.choose(3, oneToTen), [2, 9, 3])
  t.deepEqual(baby.choose(3, oneToTen), [4, 3, 5])
  t.deepEqual(baby.choose(3, oneToTen), [1, 2, 3])
  t.deepEqual(baby.choose(11, oneToTen), [10, 9, 3, 7, 5, 6, 4, 8, 1, 2])
})

test('fiona.fn.data', t => {
  const generatePerson = seed => fiona(seed).data({
    gender: ({ unique }) => unique.oneOf(['Male', 'Female']),
    firstname: ({ unique, data }) => unique.oneOf(data.gender === 'Female' ? Girlnames : Boynames),
    lastname: ({ unique }) => unique.oneOf(Surnames),
    fullname: ({ data }) => `${data.gender === 'Female' ? 'Little Miss' : 'Mr'} ${data.firstname} ${data.lastname}`,
    luckyNumber: ({ unique }) => unique.number(100),
    houseNumber: ({ unique }) => unique.number(100),
    favourite: {
      color: ({ unique }) => unique.oneOf(Colours),
      drinks: ({ unique }) => unique.weighting(i => i * i).choose(3, Drinks)
    }
  })

  t.deepEqual(generatePerson('moon').data(), {
    gender: 'Female',
    firstname: 'Fiona',
    lastname: 'Moon',
    fullname: 'Little Miss Fiona Moon',
    luckyNumber: 80,
    houseNumber: 68,
    favourite: {
      color: 'Orange',
      drinks: [ 'Water', 'Milk', 'Juice' ]
    }
  })

  t.deepEqual(fiona('moon').data({
    gender: ({ unique }) => unique.oneOf(['Male', 'Female']),
    firstname: ({ unique, data }) => unique.oneOf(data.gender === 'Female' ? Girlnames : Boynames),
    luckyNumber: ({ unique }) => unique.number(100),
    pairsOfShoes: ({ unique }) => unique.number(10),
    favourite: {
      drinks: ({ unique }) => unique.weighting(i => i * i).choose(3, Drinks)
    }
  }).data(), {
    gender: 'Female',
    firstname: 'Fiona',
    luckyNumber: 80,
    pairsOfShoes: 7,
    favourite: {
      drinks: [ 'Water', 'Milk', 'Juice' ]
    }
  })

  t.deepEqual(fiona('moon').data({
    gender: ({ unique }) => unique.oneOf(['Male', 'Female']),
    firstname: ({ unique, data }) => unique.oneOf(data.gender === 'Female' ? Girlnames : Boynames)
  }).data({
    toys: ({ unique }) => unique.number(100),
    toyDeclaration: ({ me, data }) => `${me.data().firstname} has ${data.toys} toys`
  }).data(), {
    gender: 'Female',
    firstname: 'Fiona',
    toys: 41,
    toyDeclaration: 'Fiona has 41 toys'
  })
})

test('fiona.fn', t => {
  fiona.fn.addToyNames = function () {
    this.data({
      bear: ({ unique }) => `${unique.oneOf(Boynames)} the ${unique.oneOf(Colours).toLowerCase()} bear`,
      dolly: ({ unique }) => `${unique.oneOf(Colours)} ${unique.oneOf(Surnames)}`
    })
    return this
  }

  const baby = fiona('moon')

  baby.data({
    gender: ({ unique }) => unique.oneOf(['Male', 'Female']),
    firstname: ({ unique, data }) => unique.oneOf(data.gender === 'Female' ? Girlnames : Boynames),
    luckyNumber: ({ unique }) => unique.number(100)
  }).addToyNames().data({
    houseNumber: ({ unique }) => unique.number(100)
  })

  t.deepEqual(baby.data(), {
    gender: 'Female',
    firstname: 'Fiona',
    luckyNumber: 80,
    bear: 'John the yellow bear',
    dolly: 'Green Miller',
    houseNumber: 68
  })
})
