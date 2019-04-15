// deno deno-sanity-check.js
import Fiona from './main.js'

console.log(Fiona().regex(/[01]{8} (cy|ro)bo(t|rg)s?/))
console.log(Fiona().fullname())
console.log(Fiona.version)
