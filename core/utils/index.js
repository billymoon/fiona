const type = item => Object.prototype.toString.call(item).slice(8, -1)

module.exports = {
  type
}
