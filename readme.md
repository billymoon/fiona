Fiona is a tool for creating large sets of pseudo random data. At it's core it uses a Xorshift256 PRNG that makes a mockery of creating predictable seemingly random data.

## Quickstart

The most basic use case is to generate a random number: `fiona({ max: 1000000, min: 0 }).number()`

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
