const namedata = require('./namedata')

const getGender = gender =>
  gender && (gender[0].toLowerCase() === 'f' ? 'female' : 'male')

const gender = seeded => {
  return seeded.random() < 0.5 ? 'male' : 'female'
}

const title = (seeded, { gender } = {}) => {
  return seeded.oneOf(namedata[getGender(gender || seeded.gender())].title)
}

const firstname = (seeded, { gender } = {}) => {
  return seeded.oneOf(namedata[getGender(gender || seeded.gender())].firstname)
}

// TODO: remove firstnames method from name extension
const firstnames = (seeded, { gender } = {}) => {
  return seeded
    .choose(
      seeded
        .clone()
        .distribution(x => x * x * x)
        .number({ min: 1, max: 3 }),
      namedata[getGender(gender || seeded.gender())].firstname
    )
    .join(' ')
}

const surname = seeded => {
  return seeded
    .choose(
      seeded
        .clone()
        .distribution(x => x * x * x)
        .number({ min: 1, max: 2 }),
      namedata.surname
    )
    .join(seeded.bool() ? ' ' : '-')
}

const fullname = (seeded, { gender } = {}) => {
  const myGender = getGender(gender || seeded.gender())
  return `${seeded.title({ gender: myGender })} ${seeded.firstnames({
    gender: myGender
  })} ${seeded.surname()}`
}

module.exports = {
  gender,
  title,
  firstname,
  firstnames,
  surname,
  fullname,
  namedata
}
