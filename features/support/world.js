const { setWorldConstructor } = require('cucumber')

const fiona = require('../../src')
const fixtures = require('./fixtures')

class CustomWorld {
  // constructor() {
  //   this.variable = 0
  // }

  loadFiona (seedname) {
    this.fixture = fixtures[seedname]
    this.seeded = fiona(this.fixture.seed)
  }

  callFionaMethod (methodname) {
    this.result = this.seeded[methodname]()
  }
}

setWorldConstructor(CustomWorld)
