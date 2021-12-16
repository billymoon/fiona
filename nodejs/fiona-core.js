(function(root,factory){if(typeof define==="function"&&define.amd){define([],factory);}else if(typeof exports==="object"){module.exports=factory();}else{root.Fiona=factory();}})(this,function(){function _defineProperty(a, b, c) {
    if (b in a) {
        Object.defineProperty(a, b, {
            value: c,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        a[b] = c;
    }
    return a;
}
function _objectSpread(d) {
    for(var e = 1; e < arguments.length; e++){
        var f = arguments[e] != null ? arguments[e] : {
        };
        var g = Object.keys(f);
        if (typeof Object.getOwnPropertySymbols === "function") {
            g = g.concat(Object.getOwnPropertySymbols(f).filter(function(h) {
                return Object.getOwnPropertyDescriptor(f, h).enumerable;
            }));
        }
        g.forEach(function(b) {
            _defineProperty(d, b, f[b]);
        });
    }
    return d;
}
const __default = {
    version: "4.0.0-alpha.9"
};
const Register = (i, j)=>(...k)=>k.forEach((l)=>{
            const [m, n] = typeof l === "function" ? [
                l.name,
                l
            ] : l;
            i(m[0].toUpperCase() + m.slice(1), (...o)=>(p)=>n(p, ...o)
            );
            j(m, function(...q) {
                return n(this, ...q);
            });
        })
;
const registered = [];
const baseSeeds = [
    123456789,
    362436069,
    521288629,
    88675123
];
const xor = (r)=>{
    let [s, t, u, v] = baseSeeds;
    const w = ()=>{
        const x = s ^ s << 11;
        [s, t, u] = [
            t,
            u,
            v
        ];
        v = v ^ v >> 19 ^ x ^ x >> 8;
        return v / 2147483647;
    };
    const y = ()=>{
        let z = v ^ u ^ u >> 19;
        z = z ^ z >> 8;
        z = z ^ z >> 16;
        z = z ^ z << 11;
        z = z ^ z << 22;
        [v, u, t] = [
            u,
            t,
            s
        ];
        s = z;
        return v / 2147483647;
    };
    const A = ()=>Math.round(w() * 10000000000000000)
    ;
    const B = (C)=>{
        [s, t, u, v] = baseSeeds.map((D)=>D + C
        );
        [s, t, u, v] = [
            A(),
            A(),
            A(),
            A()
        ];
    };
    B(r);
    return {
        random: ()=>w()
        ,
        reverse: ()=>y()
        ,
        reseed: B,
        getState: ()=>[
                s,
                t,
                u,
                v
            ]
        ,
        setState: (E)=>[s, t, u, v] = E
    };
};
const stringToIntegers = (F)=>F.split("").map((G)=>G.charCodeAt(0)
    )
;
const compound = (H, I)=>xorify(H + I)
;
const xorify = (J)=>xor(J % 2147483647).random() * 2147483647
;
const prepareSeed = (K)=>typeof K === "string" ? stringToIntegers(K).reduce(compound, 0) : K
;
const processSeed = (L, M = [])=>[
        L,
        ...M
    ].map(prepareSeed).reduce(compound, 0)
;
const defaultDistribution = (N)=>N
;
const __default1 = (O)=>{
    let P = defaultDistribution;
    return (Q)=>{
        if (typeof Q === "function") {
            P = Q;
            return O;
        } else if (Q === null) {
            P = defaultDistribution;
            return O;
        } else {
            return P(Q);
        }
    };
};
const __default2 = (R, S)=>{
    const { reseed , getState , setState , random: T , reverse  } = xor(0);
    reseed(processSeed(S));
    const U = getState();
    const V = (W)=>{
        if (W === undefined) {
            return getState();
        } else {
            if (W === null) {
                setState(U);
            } else {
                setState(W);
            }
            return R;
        }
    };
    const X = __default1(R);
    const Y = (Z)=>{
        reseed(processSeed(Z !== undefined ? JSON.stringify([
            Z,
            []
        ]) : S));
        return R;
    };
    const $ = ()=>X(T())
    ;
    return {
        state: V,
        reset: Y,
        random: $,
        reverse,
        distribution: X
    };
};
const handleArray = (_, aa, ba, ca)=>{
    for(let da = 0; da < aa.length; da++){
        aa[da] = recursor(_, aa[da], ba.concat(da), ca);
    }
    return aa;
};
const handleObject = (ea, fa, ga, ha)=>{
    for(const ia in fa){
        fa[ia] = recursor(ea, fa[ia], ga.concat(ia), ha);
    }
    return fa;
};
const handleFunction = (ja, ka, la, ma)=>{
    const na = new ja.constructor(__default2, ja.info().initseed, ja.info().path.concat(la));
    na.data = ma;
    const oa = registered.indexOf(ka) !== -1 ? ka() : ka(na);
    return recursor(ja, oa, la, la.length ? ma : oa);
};
const handleRegex = (pa, qa, ra, sa)=>pa.regex ? handleFunction(pa, (ta)=>ta.regex(qa)
    , ra, sa) : qa
;
const recursor = (ua, va, wa, xa)=>va === null || va === undefined ? va : va.constructor === Array ? handleArray(ua, va, wa, xa) : va.constructor === Object ? handleObject(ua, va, wa, xa) : typeof va === "function" ? handleFunction(ua, va, wa, xa) : va.constructor === RegExp ? handleRegex(ua, va, wa, xa) : va
;
const cloner = (ya)=>ya === null || ya === undefined ? ya : ya.constructor === Array ? ya.map(cloner) : ya.constructor === Object ? Object.entries(ya).reduce((za, [Aa, Ba])=>_objectSpread({
        }, za, {
            [Aa]: cloner(Ba)
        })
    , {
    }) : ya
;
const recurse = (Ca, Da)=>{
    const Ea = cloner(Da);
    return recursor(Ca, Ea, [], Ea);
};
function Moon(Fa, Ga = Math.floor(Math.random() * 100000000), Ha) {
    const { state , reset , random , reverse , distribution  } = Fa(this, JSON.stringify([
        Ga,
        Ha
    ]));
    Object.assign(this, {
        state,
        reset,
        random,
        reverse,
        distribution
    });
    this.info = ()=>({
            initseed: Ga,
            path: Ha
        })
    ;
    this.recurse = recurse;
    return this;
}
Moon.prototype = {
    constructor: Moon
};
const number = (Ia, { max =1000000 , min =0 , precision =0  } = {
})=>{
    const Ja = Math.pow(10, precision);
    return Math.floor((Ia.random() * (1 + max - min) + min) * Ja) / Ja;
};
const object = (Ka, ...La)=>{
    return La.reduce((Ma, Na)=>{
        return Ka.recurse(Ka, Na);
    }, {
    });
};
const json = (Oa, ...Pa)=>{
    return JSON.stringify(Oa.object(...Pa));
};
const array = (Qa, Ra, Sa, Ta = (Ua)=>Ua
)=>{
    const Va = typeof Ta === "string" ? (Wa)=>Wa.join(Ta)
     : Ta;
    const Xa = typeof Ra === "object" && Ra.constructor === Object ? Qa.number(Ra) : Qa.recurse(Qa.clone(), Ra);
    return Va(Qa.recurse(Qa, Array(Xa).fill(Sa)));
};
const string = (Ya, [Za, ...$a], ..._a)=>{
    const ab = Ya.recurse(Ya, _a);
    return $a.reduce((bb, cb, db)=>`${bb}${ab[db]}${cb}`
    , Za);
};
const Fiona = (eb, fb = [])=>new Moon(__default2, eb, fb)
;
Fiona.version = __default.version;
const registerFactory = (gb, hb)=>{
    const ib = (...jb)=>hb(...jb)
    ;
    registered.push(ib);
    return Fiona[gb] = ib;
};
const registerMethod = (kb, lb)=>{
    return Moon.prototype[kb] = lb;
};
Fiona.register = Register(registerFactory, registerMethod);
Fiona.Random = ()=>(mb)=>mb.random()
;
const clone = (nb)=>Fiona(nb.info().initseed).state(nb.state())
;
Fiona.register([
    "clone", clone]);
Fiona.register([
    "number", number], [
    "object", object], [
    "json", json], [
    "string", string], [
    "array", array]);
return Fiona;
});
