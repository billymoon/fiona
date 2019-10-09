const number = (seeded, { max = 1e6, min = 0, precision = 0 } = {}) => {
  const multiplier = Math.pow(10, precision)
  return (
    Math.floor((seeded.random() * (1 + max - min) + min) * multiplier) /
    multiplier
  )
}

export default number
