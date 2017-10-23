## Quickstart

The most basic use case is to generate a random number: `fiona().number(max=1000000, min=0)`

    const myNumber = fiona().number()
    // myNumber is an integer between 1 and 1,000,000
    const age = fiona().number(100)
    // age is integer between 0 and 100

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

### Weighting

The idea of adding a weighting to the output of random allows for powerful manipulation of large sets of pseudo random data. For example, the distribution of income is not even, where many more people are on low income than high. If we simply choose from 10,000 to 1,000,000 then the average income would be around 505,000. If we add weighting, we can make this represent our target distribution much more accurately.

    const salary = fiona().weighting(i => i * i * i).number(100000, 10000)
    // salary is integer between 10,000 and 100,000 but much more likely to be low
    
The weighting function takes a floating point number from 0-1 and returns a number from 0-1. Bezier easing functions are a nice way to shape your data.

    import bezierEasing from 'bezier-easing'
    const salary = fiona().weighting(bezierEasing(0.5, 1, 0, 1)).number(100000, 10000)
    
You can also clamp or otherwise manipulate the output with weighting functionis...

    const salary = fiona().weighting(i => i < 0.1 ? 0.1 : i).number(100000)
    // any salary that would have been less than 10k will be 10k because the number method
    // is based on a call to random which has been passed through the weighting function

### Chained data builder

Fiona supports jQuery like chaining and extendable plugin system. There is a data builder that takes advantage of this system to assist in building complex data structures that can be modified without the existing values changing. This works by using an inline function to set the values on the data structure, which is passed a clone of the chained fiona instance seeded with the position in the data structure (the path of the function setting the value) as `seeded`.

There are also some core helper methods for selecting random elements from arrays for example.

    const seeded = fiona(12345)
    
    // add some data to the instance
    seeded.data({
      species: 'human',
      gender: ({ seeded }) => seeded.oneOf(['Male', 'Female']),
      planet: ({ data }) => data.gender === 'Male' ? 'Mars' : 'Venus'
    })
    
    // add some more data later on (extends existing data)
    seeded.data({
      sentence: ({ me, seeded }) => `There are ${me.data().bottles} ${seeded.oneOf(['red', 'green', 'blue'])} bottles on the wall`
    })
    
    // call .data without arguments to get data
    const plainOldObject = seeded.data()

The chained data method works by recursing and traversing objects and arrays, and any functions it finds, it will execute them, passing them the current data, a new seeded instance based on position in the data structure, the position as a path and an array builder helper.
