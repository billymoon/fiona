const { Given, When, Then } = require('cucumber')
const expect = require('expect')

const fixtures = require('./fixtures')

Given('fiona is seeded with {string}', function (seedname) {
  this.loadFiona(seedname)
})

When('the {string} method is called', function (methodname) {
  this.callFionaMethod(methodname)
})

Then('the result should be whole number {int}', function (result) {
  expect(this.result).toBe(result)
})

Then('the result should be fixture {string} number {int}', function (seedname, fixtureindex) {
  expect(this.result).toBe(fixtures[seedname].numbers[fixtureindex - 1])
})

Then('the result should be decimal number {float}', function (result) {
  expect(this.result).toBe(result)
})
