import fiona from './src/fiona'
import './fiona.regex'
import './fiona.name'

const Girlnames = ['Mia', 'Alice', 'Fiona', 'Aria', 'Sarah']
const Boynames = ['David', 'Maxwell', 'Christopher', 'John', 'Billy']
const Surnames = ['Moon', 'Bell', 'Miller', 'Smith', 'Jones']
const Colours = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Purple']
const Drinks = ['Milk', 'Water', 'Tea', 'Beer', 'Juice', 'Shake', 'Coffee']

const generatePerson = person => person.data({
  gender: ({ unique }) => unique.oneOf(['Male', 'Female']),
  firstname: ({ unique, data }) => unique.oneOf(data.gender === 'Female' ? Girlnames : Boynames),
  lastname: ({ unique }) => unique.oneOf(Surnames),
  fullname: ({ data }) => `${data.gender === 'Female' ? 'Little Miss' : 'Mr'} ${data.firstname} ${data.lastname}`,
  nino: ({ unique }) => unique.regex(/[A-Z]{2}\d{6}[A-Z]/),
  luckyNumber: ({ unique }) => unique.number(100),
  houseNumber: ({ unique }) => unique.number(100),
  favourite: {
    color: ({ unique }) => unique.oneOf(Colours),
    drinks: ({ unique }) => unique.weighting(i => i * i).choose(3, Drinks)
  }
})

console.log(generatePerson(fiona('moon')).data())
console.log(generatePerson(fiona('Daddy')).data())

fiona.fn.log = function () {
  console.log(this.data())
  return this
}

generatePerson(fiona('Grandad')).log()

generatePerson(fiona('moon')).data({
  placeOfBirth: 'Scotland',
  fullname: ({ me, data }) => `Pretty Miss ${me.data().firstname} ${me.data().lastname} of ${data.placeOfBirth}`
}).log()

fiona(123).data({
  gender: ({ unique }) => unique.oneOf(['Male', 'Female']),
  title: ({ data, unique }) => unique.title({ gender: data.gender }),
  firstname: ({ data, unique }) => unique.firstname({ gender: data.gender }),
  firstnames: ({ data, unique }) => unique.firstnames({ gender: data.gender }),
  firstnamese: ({ data, unique }) => unique.firstnames({ gender: data.gender }),
  surname: ({ data, unique }) => unique.surname({ gender: data.gender }),
  fullname: ({ data, unique }) => unique.fullname({ gender: data.gender }),
  // fullname: ({ data, unique }) => unique.seed(),
  fullnamex: ({ data, unique }) => unique.seed('data.fullname' + unique.info().initseed).fullname({ gender: data.gender })
}).log()

console.log(JSON.stringify({
  Grandad: generatePerson(fiona('Grandad')).data({
    children: [
      generatePerson(fiona('Daddy')).data({
        children: [
          generatePerson(fiona('moon')).data(),
          generatePerson(fiona('sis 1')).data(),
          generatePerson(fiona('middle sister')).data()
        ]
      }).data(),
      generatePerson(fiona('aunt')).data()
    ]
  }).data()
}, null, 2))
