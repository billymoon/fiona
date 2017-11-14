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

## API

Fiona has a jQuery like plugin architecture where methods are attached to `fiona.fn` to operate on an instance, and directly on `fiona` when used as utility.

For demonstration purposes, a seed of `24` is used, but changing this should render different, but consistent results.

## fiona.fn.random

Seeded version of native `Math.random` method.

    fiona(24).random()
    //=> 0.5539249556855881

## fiona.fn.bool

A seeded utility to return true or false. Takes `chance` option to change the probability of true as decimal value between 0 and 1 which defaults to 0.5.

    fiona(24).bool()
    //=> false

## fiona.fn.date

A seeded utility to return a date as a string in format `YYYY-MM-DD`. Range is between `min` and `max` options, which default to 1940 and 2000 and can be overridden with strings parsable by the native `Date()` method. There is also a `long` to output full `Date.prototype.toISOString` format.

    fiona(24).date()
    //=> "1973-03-27"
    
    fiona(24).date({ min: '1980', max: '2080', long: true })
    //=> "2035-05-24T02:36:58.154Z"
    
## fiona.fn.duplicable

A seeded utility to help to produce duplicated data sometimes. By default, the seed will be picked from a pool of 10 possibilities, 10 per cent of the time.

In this example, the pool is 2, and the frequency is 0.6 so the numbers will be `373260` or `153925`, 60% of the time, and the other numbers will be pseudo random according to the input seed.

    fiona(20).duplicable({ frequency: 0.6, pool: 2 }).number() //=> 778700
    fiona(21).duplicable({ frequency: 0.6, pool: 2 }).number() //=> 373260
    fiona(22).duplicable({ frequency: 0.6, pool: 2 }).number() //=> 871198
    fiona(23).duplicable({ frequency: 0.6, pool: 2 }).number() //=> 153925
    fiona(25).duplicable({ frequency: 0.6, pool: 2 }).number() //=> 153925
    fiona(24).duplicable({ frequency: 0.6, pool: 2 }).number() //=> 373260

## fiona.fn.gender

## fiona.fn.title

## fiona.fn.firstname

## fiona.fn.firstnames

## fiona.fn.lastname

## fiona.fn.name

## fiona.fn.number

## fiona.fn.lorem

## fiona.fn.sentence

## fiona.fn.para

## fiona.fn.regex

## fiona.fn.oneOf

## fiona.fn.choose

## fiona.weighted

## fiona.fn.weighted
