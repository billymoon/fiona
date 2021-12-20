![](./static/fiona-logo.png)

Fiona is a tool for creating large sets of pseudo random data. At it's core it uses a Xorshift256 PRNG that makes a mockery of creating predictable seemingly random data.

# Documentation

There is more complete, better overview of the features at: [fiona.now.sh](https://fiona.now.sh).

## Quickstart

The most basic use case is to generate a random number: `fiona().number({ max: 1000000, min: 0 })`

    // input                                      // output
    const myNumber = Fiona(1).number()           313150
    const age = Fiona(1).number({ max: 100 })    31

It becomes more useful when creating data structures.

    // input                                                               // output
    Fiona(2).object({                                                      {
      age: seeded => seeded.number({ max: 100 }),                              "age": 93,
      name: seeded => seeded.fullname(),                                       "name": "Mrs Sofia Fraser-Taylor",
      iban: seeded => seeded.regex(/[A-Z]{2}\d{2}( \d{4}){4,5} \d{1,3}/),      "iban": "KN55 2373 5064 2067 4772 5648 4",
      favouriteColor: seeded => seeded.oneOf([                                 "favouriteColor": "yellow"
        'red',                                                             }
        'yellow',                                                                 
        'blue'                                                                    
      ])                                                                          
    })  

## Installation

Install and import/require via npm in usual way

    $ npm install fiona

... and from your app

    import fiona from 'fiona' // or... `const fiona = require('fiona')`

... or from CDN

    <script src='https://cdn.jsdelivr.net/npm/fiona'></script>

... or for those interested in [deno - a secure runtime for JavaScript and TypeScript](https://deno.land)

    import Fiona from 'https://deno.land/x/fiona/deno/index.js'
