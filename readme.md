![](./static/fiona-logo.png)

Fiona is a tool for creating large sets of pseudo random data. At it's core it uses a Xorshift256 PRNG that makes a mockery of creating predictable seemingly random data.

# Documentation

There is more complete, better overview of the features at: [fiona.now.sh](https://fiona.now.sh).

## Quickstart

The most basic use case is to generate a random number: `fiona().number({ max: 1000000, min: 0 })`

    // input                                      // output
    const myNumber = fiona(24).number()           553925
    const age = fiona(24).number({ max: 100 })    55

It becomes more useful when creating data structures.

    // input                                                                       // output
    fiona(24).data({                                                               {
      age: ({ seeded }) => seeded.number({ max: 100 }),                              "age": 88,
      name: ({ seeded }) => seeded.name(),                                           "name": "Dr Poppy MacDonald",
      iban: ({ seeded }) => seeded.regex(/[A-Z]{2}\d{2}( \d{4}){4,5} \d{1,3}/),      "iban": "VR70 9829 1916 5836 9013 6470 86",
      favouriteColor: ({ seeded }) => seeded.oneOf([                                 "favouriteColor": "yellow"
        'red',                                                                     }
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
