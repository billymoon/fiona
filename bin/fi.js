import { parse } from "https://deno.land/std@0.106.0/flags/mod.ts";
import Fiona from "../src/deno/index.js"

const augment = (command, { seed, arr }) => {
    let out = command

    if (/^\s*`/.test(out)) {
        out = `Fiona.String${out}`
    } else if (/^\s*{/.test(out)) {
        out = `Fiona.Object(${out})`
    }
    
    const myFiona = seed ? `Fiona(${JSON.parse(JSON.stringify(seed))})` : "Fiona()"
    out = `${myFiona}.object(${out})`
    console.log(out)
    return out
}

const args = parse(Deno.args)
const { seed, arr } = args
// console.log({args, seed})
args._.map(arg => eval(augment(arg, {
    seed,
    arr
}))).map(result => console.log(result))
