import { Fiona, consume, Sample } from '../../app'

const Section = ({ seed }) => (
  <section>
    <h2>Extending</h2>

    <p>
      It is easy to extend `Fiona` for both one off operations and by
      registering custom methods that will integrate witht the core library.
      Pull requests adding more general use functionality very welcome.
    </p>

    <p>
      During recursion of data structures, any functions encountered are called
      with the current instance, and resolved to their value, recursively. This
      means you can easily define a pure function with custom logic, and pass it
      into a data structure to be evaluated inline.
    </p>

    <Sample
      input={`
    const income = seeded => seeded.distribution(i => i * i * i).number({ max: 1000000 })

    Fiona(${seed}).object({ name: Fiona.Fullname, income })
    `}
      output={`${JSON.stringify(
        Fiona(seed).object({
          name: Fiona.Fullname,
          income: seeded =>
            seeded.distribution(i => i * i * i).number({ max: 1000000 })
        }),
        null,
        2
      )}`}
    />

    <p>Use the `register` method to add your function as a method in Fiona.</p>

    <Sample
      input={`
    Fiona.register(['income', income])

    Fiona(${seed}).income()
    `}
      output={`


    ${Fiona(seed)
      .distribution(i => i * i * i)
      .number({ max: 1000000 })}
    `}
    />

    <p>Arguments are passed through to your registered function too.</p>

    <Sample
      input={`
    Fiona.register(['chooseThree', (seeded, arr) => seeded.choose(3, arr)])

    Fiona(${seed}).chooseThree([1, 2, 3, 4, 5, 6, 7, 8, 9])
    `}
      output={`


    ${JSON.stringify(Fiona(seed).choose(3, [1, 2, 3, 4, 5, 6, 7, 8, 9]))}
    `}
    />

    <p>
      Registered functions also have a factory function added to the root
      `Fiona` function which uses a capitalized form of the method. This is a
      convenient short form that can be used in recursion.
    </p>

    <Sample
      input={`
    Fiona.register(['chooseThree', (seeded, arr) => seeded.choose(3, arr)])
    
    Fiona(${seed}).object({
        threeNumbers: Fiona.ChooseThree([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })

    Fiona(${seed}).object({
        threeNumbers: seeded => seeded.chooseThree([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
    `}
      output={`
    ${Fiona(seed).json({
      threeNumbers: Fiona.Choose(3, [1, 2, 3, 4, 5, 6, 7, 8, 9])
    })}
    ${Fiona(seed).json({
      threeNumbers: Fiona.Choose(3, [1, 2, 3, 4, 5, 6, 7, 8, 9])
    })}
    `}
    />
  </section>
)

export default consume(Section)
