## Quickstart

The most basic use case is to generate a random number: `fiona().number(max=1000000, min=0)`

    const myNumber = fiona().number()
    // myNumber is an integer between 1 and 1,000,000
    const age = fiona().number(100)
    // age is integer between 0 and 100
    const salary = fiona().number(100000, 10000)
    // salary is integer between 10,000 and 100,000

It becomes more useful when creating data structures.

    const data = fiona()

    const temperatureChange = {
      summer: data.number(15, 30),
      autumn: data.number(10, 25),
      winter: data.number(5, 20),
      spring: data.number(10, 25)
    }

### Seeded pseudo random number generator

At it's core, fiona has a seeded prng that will give back approximately evenly distributed floating point numbers between 0 and 1. The seed defaults to `Math.random()` can be passed in during initialisation. `fiona(seed=Math.random())`

    const data = fiona(12345)
    data.number() // always the same integer
    data.number() // always the same integer, but different from the first

The prng sets the initial seed when fiona is initialised, then tracks new seeds generated in consistent sequence internally. The seed can be reset to the initial value, or any arbitrary value at any time. This makes it easy to ensure data is repeatable.

    const data = fiona(12345)
    data.number() // seeded with 12345
    data.seed(67890)
    data.number() // seeded with 67890
    data.seed(null) // reset seed to initial value
    data.number() // seeded with 12345

### Chained data builder

Fiona supports jQuery like chaining and extendable plugin system. There is a data builder that takes advantage of this system to assist in building complex data structures that can be modified without the existing values changing. This works by using an inline function to set the values on the data structure, which is passed a clone of the chained fiona instance seeded with the position in the data structure (the path of the function setting the value) as `seeded`.

There are also some core helper methods for selecting random elements from arrays for example.

    fiona(12345).data({
      gender: ({ seeded }) => seeded.oneOf(['Male', 'Female'])
    }).prng(Math.random).data({
      bottles: ({ seeded }) => seeded.number(10)
    }).prng(null).data({
      sentence: ({ me, seeded }) => `There are ${me.data().bottles} ${seeded.oneOf(['red', 'green', 'blue'])} bottles on the wall`
    }).data()
