// TODO: rewrite ava syntax tests to not require this interface to jest
module.exports = {
  is: (a, b) => expect(a).toBe(b),
  not: (a, b) => expect(a).not.toBe(b),
  deepEqual: (a, b) => expect(a).toEqual(b),
  true: a => expect(a).toBe(true),
  throws: (a, b) => expect(a).toThrow(b)
}

