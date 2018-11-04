import { fiona, consume, Sample } from '../../app'

const Section = ({ seed }) =>
  <section>
    <h2>Extending</h2>

    <p>It is easy to extend `fiona` for both one off operations and by registering custom methods that will integrate witht the core library. Pull requests adding more general use functionality very welcome.</p>

    <p>During recursion of data structures, any functions encountered are called with the current instance, and resolved to their value, recursively. This means you can easily define a pure function with custom logic, and pass it into a data structure to be evaluated inline.</p>

    <Sample input={`
    const income = seeded => seeded.distribution(i => i * i * i).number({ max: 1000000 })

    fiona(${seed}).object({ name: fiona.Fullname, income })
    `} output={`${JSON.stringify(fiona(seed).object({
      name: fiona.Fullname,
      income: seeded => seeded.distribution(i => i * i * i).number({ max: 1000000 })
    }), null, 2)}`} />

    <p>Use the `register` method to add your function as a method in fiona.</p>

    <Sample input={`
    fiona.register(['income', income])

    fiona(${seed}).income()
    `} output={`


    fiona(seed).income()
    `} />
    
    <p>Arguments are passed through to your registered function too.</p>

    <Sample input={`
    fiona.register(['chooseThree', (seeded, arr) => seeded.choose(3, arr)])
    
    fiona(${seed}).chooseThree([1, 2, 3, 4, 5, 6, 7, 8, 9])
    `} output={`


    fiona(seed).choose(3, [1, 2, 3, 4, 5, 6, 7, 8, 9])
    `} />
    
    <p>Registered functions also have a factory function added to the root `fiona` function which uses a capitalized form of the method. This is a convenient short form that can be used in recursion.</p>

    <Sample input={`
    fiona.register(['chooseThree', (seeded, arr) => seeded.choose(3, arr)])
    
    fiona(${seed}).object({
        threeNumbers: fiona.ChooseThree([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })

    fiona(${seed}).object({
        threeNumbers: seeded => seeded.chooseThree([1, 2, 3, 4, 5, 6, 7, 8, 9])
    })
    `} output={`
    ${fiona(seed).json({ threeNumbers: fiona.Choose(3, [1, 2, 3, 4, 5, 6, 7, 8, 9]) })}
    ${fiona(seed).json({ threeNumbers: fiona.Choose(3, [1, 2, 3, 4, 5, 6, 7, 8, 9]) })}
    `} />
  </section>

export default consume(Section)
