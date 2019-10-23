import namedatain from './namedata.js'
export const namedata = namedatain

const getGender = gender =>
  gender && (gender[0].toLowerCase() === 'f' ? 'female' : 'male')

export const gender = seeded => {
  return seeded.random() < 0.5 ? 'male' : 'female'
}

export const title = (seeded, { gender } = {}) => {
  return seeded.oneOf(namedata[getGender(gender || seeded.gender())].title)
}

export const firstname = (seeded, { gender } = {}) => {
  return seeded.oneOf(namedata[getGender(gender || seeded.gender())].firstname)
}

// TODO: remove firstnames method from name extension
export const firstnames = (seeded, { gender } = {}) => {
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

export const surname = seeded => {
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

export const fullname = (seeded, { gender } = {}) => {
  const myGender = getGender(gender || seeded.gender())
  return `${seeded.title({ gender: myGender })} ${seeded.firstnames({
    gender: myGender
  })} ${seeded.surname()}`
}
