import Head from 'next/head'
import styled from 'styled-components'
import fiona from '../src/fiona'

var HappyHello = styled.div`
  color: purple;
  font-size: 30px;
`

export default () =>
  <div>
    <Head>
      <script src='https://cdn.jsdelivr.net/combine/npm/rng@0.2.2/rng.min.js,npm/rng@0.2.2/lib/park-miller.min.js,npm/rng@0.2.2/lib/mersenne-twister.min.js,npm/rng@0.2.2/lib/xor.min.js' />
      <script>{`
var loops = 1e5
console.time('init MT')
for (var i = 0; i < loops; i++) {
  new Random.MT(1234567890)
}
console.timeEnd('init MT')
var MT = new Random.MT(1234567890)
console.time('run MT')
for (var i = 0; i < loops; i++) {
  MT.random()
}
console.timeEnd('run MT')
console.time('init XOR')
for (var i = 0; i < loops; i++) {
  new Random.XOR(1234567890, 12345678, 1234567, 123456)
}
console.timeEnd('init XOR')
var XOR = new Random.XOR(1234567890, 12345678, 1234567, 123456)
console.time('run XOR')
for (var i = 0; i < loops; i++) {
  XOR.random()
}
console.timeEnd('run XOR')
`}</script>
      <script>{`
var loops = 30

// var x = 123456789
// var y = 362436069
// var z = 521288629
// var w = 88675123

var Seeder = input => {
  const prng = new Random.XOR(x + input, y + input, z + input, w + input)
  return () => Math.round(prng.random() * 1e16)
}
var seeder = Seeder(22)

var XOR = new Random.XOR(seeder(), seeder(), seeder(), seeder())

console.time('run XOR')
for (var i = 0; i < loops; i++) {
  console.log(XOR.random())
}
console.timeEnd('run XOR')
`}</script>
    </Head>
    <HappyHello>Fiona - seeded random data assistant</HappyHello>
    <p>{fiona('moon').number(10)} green bottles</p>
  </div>

/*
init MT: 13082.328125ms
run MT: 32.721923828125ms
init XOR: 16.664794921875ms
run XOR: 7.000244140625ms
*/
