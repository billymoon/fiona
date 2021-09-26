(function(root,factory){if(typeof define==="function"&&define.amd){define([],factory);}else if(typeof exports==="object"){module.exports=factory();}else{root.Fiona=factory();}})(this,function(){function _defineProperty(a, c, e) {
    if (c in a) {
        Object.defineProperty(a, c, {
            value: e,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        a[c] = e;
    }
    return a;
}
function _objectSpread(h) {
    for(var i = 1; i < arguments.length; i++){
        var k = arguments[i] != null ? arguments[i] : {
        };
        var l = Object.keys(k);
        if (typeof Object.getOwnPropertySymbols === "function") {
            l = l.concat(Object.getOwnPropertySymbols(k).filter(function(n) {
                return Object.getOwnPropertyDescriptor(k, n).enumerable;
            }));
        }
        l.forEach(function(c) {
            _defineProperty(h, c, k[c]);
        });
    }
    return h;
}
const __default = {
    version: "4.0.0-alpha.1"
};
const Register = (q, r)=>(...s)=>s.forEach((t)=>{
            const [u, A] = typeof t === "function" ? [
                t.name,
                t
            ] : t;
            q(u[0].toUpperCase() + u.slice(1), (...B)=>(D)=>A(D, ...B)
            );
            r(u, function(...G) {
                return A(this, ...G);
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
const xor = (H)=>{
    let [Q, T, V, W] = baseSeeds;
    const X = ()=>{
        const $ = Q ^ Q << 11;
        [Q, T, V] = [
            T,
            V,
            W
        ];
        W = W ^ W >> 19 ^ $ ^ $ >> 8;
        return W / 2147483647;
    };
    const aa = ()=>{
        let ba = W ^ V ^ V >> 19;
        ba = ba ^ ba >> 8;
        ba = ba ^ ba >> 16;
        ba = ba ^ ba << 11;
        ba = ba ^ ba << 22;
        [W, V, T] = [
            V,
            T,
            Q
        ];
        Q = ba;
        return W / 2147483647;
    };
    const ca = ()=>Math.round(X() * 10000000000000000)
    ;
    const da = (ea)=>{
        [Q, T, V, W] = baseSeeds.map((fa)=>fa + ea
        );
        [Q, T, V, W] = [
            ca(),
            ca(),
            ca(),
            ca()
        ];
    };
    da(H);
    return {
        random: ()=>X()
        ,
        reverse: ()=>aa()
        ,
        reseed: da,
        getState: ()=>[
                Q,
                T,
                V,
                W
            ]
        ,
        setState: (ga)=>[Q, T, V, W] = ga
    };
};
const stringToIntegers = (ha)=>ha.split("").map((ia)=>ia.charCodeAt(0)
    )
;
const compound = (ja, ka)=>xorify(ja + ka)
;
const xorify = (la)=>xor(la % 2147483647).random() * 2147483647
;
const prepareSeed = (ma)=>typeof ma === "string" ? stringToIntegers(ma).reduce(compound, 0) : ma
;
const processSeed = (na, oa = [])=>[
        na,
        ...oa
    ].map(prepareSeed).reduce(compound, 0)
;
const defaultDistribution = (pa)=>pa
;
const __default1 = (qa)=>{
    let ra = defaultDistribution;
    return (sa)=>{
        if (typeof sa === "function") {
            ra = sa;
            return qa;
        } else if (sa === null) {
            ra = defaultDistribution;
            return qa;
        } else {
            return ra(sa);
        }
    };
};
const __default2 = (ta, ua)=>{
    const { reseed , getState , setState , random: va , reverse  } = xor(0);
    reseed(processSeed(ua));
    const wa = getState();
    const xa = (ya)=>{
        if (ya === undefined) {
            return getState();
        } else {
            if (ya === null) {
                setState(wa);
            } else {
                setState(ya);
            }
            return ta;
        }
    };
    const za = __default1(ta);
    const Aa = (Ba)=>{
        reseed(processSeed(Ba !== undefined ? Ba : ua));
        return ta;
    };
    const Ca = ()=>za(va())
    ;
    return {
        state: xa,
        reset: Aa,
        random: Ca,
        reverse,
        distribution: za
    };
};
const handleArray = (Da, Ea, Fa, Ga)=>{
    for(let Ha = 0; Ha < Ea.length; Ha++){
        Ea[Ha] = recursor(Da, Ea[Ha], Fa.concat(Ha), Ga);
    }
    return Ea;
};
const handleObject = (Ia, Ja, Ka, La)=>{
    for(const Ma in Ja){
        Ja[Ma] = recursor(Ia, Ja[Ma], Ka.concat(Ma), La);
    }
    return Ja;
};
const handleFunction = (Na, Oa, Pa, Qa)=>{
    const Ra = new Na.constructor(__default2, Na.info().initseed, Na.info().path.concat(Pa));
    Ra.data = Qa;
    const Sa = registered.indexOf(Oa) !== -1 ? Oa() : Oa(Ra);
    return recursor(Na, Sa, Pa, Pa.length ? Qa : Sa);
};
const handleRegex = (Ta, Ua)=>Ta.regex ? Ta.regex(Ua) : Ua
;
const recursor = (Va, Wa, Xa, Ya)=>Wa === null || Wa === undefined ? Wa : Wa.constructor === Array ? handleArray(Va, Wa, Xa, Ya) : Wa.constructor === Object ? handleObject(Va, Wa, Xa, Ya) : typeof Wa === "function" ? handleFunction(Va, Wa, Xa, Ya) : Wa.constructor === RegExp ? handleRegex(Va, Wa) : Wa
;
const cloner = (Za)=>Za === null || Za === undefined ? Za : Za.constructor === Array ? Za.map(cloner) : Za.constructor === Object ? Object.entries(Za).reduce(($a, [_a, ab])=>_objectSpread({
        }, $a, {
            [_a]: cloner(ab)
        })
    , {
    }) : Za
;
const recurse = (bb, cb)=>{
    const db = cloner(cb);
    return recursor(bb, db, [], db);
};
function Moon(eb, fb = Math.floor(Math.random() * 100000000), gb) {
    const { state , reset , random , reverse , distribution  } = eb(this, JSON.stringify([
        fb,
        gb
    ]));
    Object.assign(this, {
        state,
        reset,
        random,
        reverse,
        distribution
    });
    this.info = ()=>({
            initseed: fb,
            path: gb
        })
    ;
    this.recurse = recurse;
    return this;
}
Moon.prototype = {
    constructor: Moon
};
const number = (hb, { max =1000000 , min =0 , precision =0  } = {
})=>{
    const ib = Math.pow(10, precision);
    return Math.floor((hb.random() * (1 + max - min) + min) * ib) / ib;
};
const object = (jb, ...kb)=>{
    return kb.reduce((lb, mb)=>{
        return jb.recurse(jb, mb);
    }, {
    });
};
const json = (nb, ...ob)=>{
    return JSON.stringify(nb.object(...ob));
};
const array = (pb, qb, rb, sb = (tb)=>tb
)=>{
    const ub = typeof sb === "string" ? (vb)=>vb.join(sb)
     : sb;
    const wb = typeof qb === "object" && qb.constructor === Object ? pb.number(qb) : pb.recurse(pb.clone(), qb);
    return ub(pb.recurse(pb, Array(wb).fill(rb)));
};
const string = (xb, [yb, ...zb], ...Ab)=>{
    const Bb = xb.recurse(xb, Ab);
    return zb.reduce((Cb, Db, Eb)=>`${Cb}${Bb[Eb]}${Db}`
    , yb);
};
const Fiona = (Fb, Gb = [])=>new Moon(__default2, Fb, Gb)
;
Fiona.version = __default.version;
const registerFactory = (Hb, Ib)=>{
    const Jb = (...Kb)=>Ib(...Kb)
    ;
    registered.push(Jb);
    return Fiona[Hb] = Jb;
};
const registerMethod = (Lb, Mb)=>{
    return Moon.prototype[Lb] = Mb;
};
Fiona.register = Register(registerFactory, registerMethod);
Fiona.Random = ()=>(Nb)=>Nb.random()
;
const clone = (Ob)=>Fiona(Ob.info().initseed).state(Ob.state())
;
Fiona.register([
    "clone", clone]);
Fiona.register([
    "number", number], [
    "object", object], [
    "json", json], [
    "string", string], [
    "array", array]);
const bool = (Pb, { chance =0.5  } = {
})=>Pb.random() < chance
;
const chooser = (Qb, Rb, Sb)=>{
    const Tb = Rb.reduce((Ub, Vb, Wb)=>{
        Ub.push((Ub[Wb - 1] || 0) + (typeof Sb[Wb] === "number" ? Sb[Wb] : 1));
        return Ub;
    }, []);
    const Xb = Qb * Tb[Tb.length - 1];
    let Yb;
    Tb.every((Zb, $b)=>{
        if (Xb > Zb) {
            return true;
        } else {
            Yb = $b;
            return false;
        }
    });
    return Yb;
};
const choose = (_b, ac, bc, { weights =[]  } = {
})=>{
    const cc = bc.slice(0);
    const dc = weights.slice(0);
    return Array(ac || 0).fill(null).map(()=>{
        const ec = chooser(_b.random(), cc, dc);
        const fc = cc[ec];
        cc[ec] = cc[0];
        cc.shift();
        return fc;
    });
};
const oneOf = (gc, hc, { weights =[]  } = {
})=>{
    return hc[chooser(gc.random(), hc, weights)];
};
const date = (ic, { min ="1940" , max ="2000" , long: jc = false  } = {
})=>{
    const kc = new Date(min) * 1;
    const lc = new Date(max) * 1;
    if (kc > lc) {
        throw Error(`min date must be lower than max date`);
    }
    const mc = lc - kc;
    const nc = new Date(ic.number({
        max: mc
    }) + kc).toISOString();
    return jc ? nc : nc.slice(0, 10);
};
const RGB = (oc, pc, qc)=>"#" + [
        oc,
        pc,
        qc
    ].map((rc)=>`0${rc.toString(16)}`.slice(-2)
    ).join("")
;
const getme = (sc)=>{
    return sc.slice(1).match(/(..)/g).map((tc)=>parseInt(tc, 16)
    );
};
const mapper = (uc, vc)=>(wc)=>{
        return uc.reduce((xc, yc, zc)=>{
            const Ac = Math.min(vc[zc], uc[zc]);
            const Bc = Math.max(vc[zc], uc[zc]);
            const Cc = Bc - Ac;
            return `${xc}${(Ac + Math.ceil(Cc * wc)).toString(16)}`;
        }, "#");
    }
;
const colorMapperFactory = (Dc)=>{
    const Ec = Dc.map(({ start , end  })=>mapper(getme(start), getme(end))
    );
    return (Fc)=>{
        const Gc = Math.floor(Dc.length * Fc);
        return Ec[Gc](Fc);
    };
};
const img = (Hc, Ic)=>{
    const { seed , width , height , bg , colors  } = Object.assign(Hc.object({
        seed: Hc.number(),
        width: 1000,
        height: 1000,
        bg: RGB(Hc.number({
            max: 255
        }), Hc.number({
            max: 255
        }), Hc.number({
            max: 255
        })),
        colors: Hc.array({
            min: 1,
            max: 10
        }, (Jc)=>({
                start: RGB(Jc.number({
                    max: 255
                }), Jc.number({
                    max: 255
                }), Jc.number({
                    max: 255
                })),
                end: RGB(Jc.number({
                    max: 255
                }), Jc.number({
                    max: 255
                }), Jc.number({
                    max: 255
                }))
            })
        )
    }), Ic);
    const Kc = colorMapperFactory(colors);
    const Lc = [];
    for(let Mc = 0; Mc < 100; Mc++){
        const Nc = Kc(Mc / 100);
        const Oc = seed * Mc % 360;
        const [Pc, Qc, Rc, Sc] = [
            5 * Mc,
            5 / seed,
            Mc * seed,
            Mc
        ].map(Math.floor).map((Tc)=>Tc % (Math.max(width, height) * 3)
        );
        Lc.push(`<rect x="${Pc}" y="${Qc}" width="${Rc}" height="${Sc}" transform="rotate(${Oc})" fill="${Nc}" />`);
    }
    const Uc = (Vc)=>encodeURIComponent(`
    <svg width="${width}" height="${height}" viewBox="${-1 * width} ${-1 * height} ${width * 2} ${height * 2}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <style>svg { background-color: ${bg}; }</style>
      ${Vc}
    </svg>
  `)
    ;
    return `data:image/svg+xml;utf8,${Uc(Lc.join("\n"))}`;
};
const duplicable = (Wc, { frequency =0.1 , pool =10  } = {
})=>{
    if (Wc.random() <= frequency) {
        Wc.reset((Math.floor(Wc.random() * pool + 1) / pool + 1) * 10000000000000000);
    }
    return Wc;
};
const lorem = (Xc, { qty =15  } = {
})=>{
    const Yc = Xc.random() < 0.2 ? "lorem ipsum " : "";
    let Zc = [];
    while(Zc.length < qty){
        Zc = Zc.concat("dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" "));
    }
    const $c = Math.ceil(qty - qty / 3);
    const _c = Math.ceil(qty + qty / 3) - 2;
    return Yc + Xc.choose(Xc.number({
        min: $c,
        max: _c
    }), Zc).join(" ");
};
const word = (ad)=>ad.lorem({
        qty: 1
    }).split(" ")[0]
;
const sentence = (bd)=>{
    const cd = bd.lorem({
        qty: 25
    });
    return cd[0].toUpperCase() + cd.slice(1) + ".";
};
const paragraph = (dd)=>Array(dd.number({
        min: 1,
        max: 10
    })).fill(0).map(()=>dd.sentence()
    ).join("  ")
;
const namedata = {
    male: {
        firstname: [
            "Jack",
            "James",
            "Oliver",
            "Lewis",
            "Logan",
            "Harry",
            "Noah",
            "Leo",
            "Charlie",
            "Alexander",
            "Jacob",
            "Lucas",
            "Harris",
            "Mason",
            "Alfie",
            "Finlay",
            "Ethan",
            "Daniel",
            "Aaron",
            "Max",
            "Archie",
            "Thomas",
            "Matthew",
            "Adam",
            "Rory",
            "Nathan",
            "Callum",
            "Joshua",
            "Oscar",
            "Brodie",
            "Cameron",
            "Harrison",
            "William",
            "Finn",
            "Riley",
            "Dylan",
            "Samuel",
            "Jaxon",
            "Liam",
            "Ollie",
            "Jamie",
            "Connor",
            "Luke",
            "Theo",
            "Ryan",
            "Andrew",
            "Caleb",
            "Jude",
            "Joseph",
            "Benjamin",
            "Muhammad",
            "Arran",
            "Angus",
            "John",
            "David",
            "Isaac",
            "Cole",
            "Hamish",
            "Robert",
            "Jackson",
            "Michael",
            "George",
            "Kai",
            "Leon",
            "Kyle",
            "Ben",
            "Luca",
            "Blake",
            "Murray",
            "Aiden",
            "Carter",
            "Jake",
            "Owen",
            "Cooper",
            "Freddie",
            "Ruaridh",
            "Jayden",
            "Aidan",
            "Fraser",
            "Reuben",
            "Euan",
            "Sam",
            "Blair",
            "Calvin",
            "Christopher",
            "Alex",
            "Arthur",
            "Calum",
            "Cody",
            "Elliot",
            "Josh",
            "Lachlan",
            "Zac",
            "Arlo",
            "Kayden",
            "Robbie",
            "Tyler",
            "Conor",
            "Henry",
            "Hunter",
            "Zachary", 
        ],
        title: [
            "Mr",
            "Dr",
            "Sir",
            "Lord"
        ]
    },
    female: {
        firstname: [
            "Fiona",
            "Aria",
            "Mia",
            "Emily",
            "Sophie",
            "Ava",
            "Amelia",
            "Jessica",
            "Ella",
            "Lucy",
            "Charlotte",
            "Ellie",
            "Lily",
            "Grace",
            "Sophia",
            "Chloe",
            "Evie",
            "Emma",
            "Millie",
            "Eilidh",
            "Anna",
            "Eva",
            "Hannah",
            "Erin",
            "Layla",
            "Ruby",
            "Orla",
            "Harper",
            "Georgia",
            "Maisie",
            "Isabella",
            "Katie",
            "Zoe",
            "Holly",
            "Robyn",
            "Amber",
            "Rosie",
            "Zara",
            "Emilia",
            "Sofia",
            "Skye",
            "Poppy",
            "Daisy",
            "Alice",
            "Lilly",
            "Esme",
            "Rebecca",
            "Scarlett",
            "Ivy",
            "Abigail",
            "Imogen",
            "Leah",
            "Amy",
            "Lacey",
            "Maya",
            "Niamh",
            "Willow",
            "Thea",
            "Elizabeth",
            "Abbie",
            "Lexi",
            "Hollie",
            "Molly",
            "Brooke",
            "Gracie",
            "Sarah",
            "Cara",
            "Sienna",
            "Mila",
            "Phoebe",
            "Rose",
            "Lola",
            "Iona",
            "Ayla",
            "Megan",
            "Paige",
            "Kayla",
            "Julia",
            "Mya",
            "Alexandra",
            "Arianna",
            "Summer",
            "Hope",
            "Quinn",
            "Maria",
            "Eve",
            "Violet",
            "Ariana",
            "Arya",
            "Bella",
            "Elsie",
            "Lillie",
            "Florence",
            "Hanna",
            "Madison",
            "Amelie",
            "Matilda",
            "Lauren", 
        ],
        title: [
            "Miss",
            "Mrs",
            "Dr",
            "Ms",
            "Dame"
        ]
    },
    surname: [
        "Moon",
        "Smith",
        "Brown",
        "Wilson",
        "Robertson",
        "Campbell",
        "Stewart",
        "Thomson",
        "Anderson",
        "Scott",
        "MacDonald",
        "Reid",
        "Murray",
        "Clark",
        "Taylor",
        "Ross",
        "Young",
        "Paterson",
        "Watson",
        "Mitchell",
        "Fraser", 
    ]
};
const namedata1 = namedata;
const getGender = (ed)=>ed && (ed[0].toLowerCase() === "f" ? "female" : "male")
;
const gender = (fd)=>{
    return fd.random() < 0.5 ? "male" : "female";
};
const title = (gd, { gender: hd  } = {
})=>{
    return gd.oneOf(namedata[getGender(hd || gd.gender())].title);
};
const firstname = (id, { gender: jd  } = {
})=>{
    return id.oneOf(namedata[getGender(jd || id.gender())].firstname);
};
const firstnames = (kd, { gender: ld  } = {
})=>{
    return kd.choose(kd.clone().distribution((md)=>md * md * md
    ).number({
        min: 1,
        max: 3
    }), namedata[getGender(ld || kd.gender())].firstname).join(" ");
};
const surname = (nd)=>{
    return nd.choose(nd.clone().distribution((od)=>od * od * od
    ).number({
        min: 1,
        max: 2
    }), namedata.surname).join(nd.bool() ? " " : "-");
};
const fullname = (pd, { gender: qd  } = {
})=>{
    const rd = getGender(qd || pd.gender());
    return `${pd.title({
        gender: rd
    })} ${pd.firstnames({
        gender: rd
    })} ${pd.surname()}`;
};
const regex = (sd)=>(td, ud = /[A-F0-9]{16}/)=>{
        const vd = new sd(RegExp(ud));
        vd.randInt = (wd, xd)=>wd + Math.floor(td.random() * (1 + xd - wd))
        ;
        return vd.gen();
    }
;
const shuffle = (yd, zd, { qty  } = {
})=>yd.choose(typeof qty !== "undefined" ? qty : zd.length, zd)
;
const __default3 = (Ad)=>{
    Fiona.register([
        "bool", bool], [
        "choose", choose], [
        "oneOf", oneOf], [
        "date", date], [
        "img", img], [
        "duplicable", duplicable], [
        "lorem", lorem], [
        "word", word], [
        "sentence", sentence], [
        "paragraph", paragraph], [
        "gender", gender], [
        "title", title], [
        "firstname", firstname], [
        "firstnames", firstnames], [
        "surname", surname], [
        "fullname", fullname], [
        "regex",
        regex(Ad)
    ], [
        "shuffle", shuffle]);
    Fiona.namedata = namedata1;
    return Fiona;
};
var f = Object.create;
var g = Object.defineProperty;
var v = Object.getOwnPropertyDescriptor;
var d = Object.getOwnPropertyNames;
var p = Object.getPrototypeOf, m = Object.prototype.hasOwnProperty;
var M = (Bd)=>g(Bd, "__esModule", {
        value: !0
    })
;
var x = (Cd, Dd)=>()=>(Dd || Cd((Dd = {
            exports: {
            }
        }).exports, Dd), Dd.exports)
;
var E = (Ed, Fd, Gd)=>{
    if (Fd && typeof Fd == "object" || typeof Fd == "function") for (let Hd of d(Fd))!m.call(Ed, Hd) && Hd !== "default" && g(Ed, Hd, {
        get: ()=>Fd[Hd]
        ,
        enumerable: !(Gd = v(Fd, Hd)) || Gd.enumerable
    });
    return Ed;
}, _ = (Id)=>E(M(g(Id != null ? f(p(Id)) : {
    }, "default", Id && Id.__esModule && "default" in Id ? {
        get: ()=>Id.default
        ,
        enumerable: !0
    } : {
        value: Id,
        enumerable: !0
    })), Id)
;
var w = x((Jd, Kd)=>{
    "use strict";
    var Ld = class _class {
        overlaps(Md) {
            return !(this.high < Md.low || this.low > Md.high);
        }
        touches(Nd) {
            return !(this.high + 1 < Nd.low || this.low - 1 > Nd.high);
        }
        add(Od) {
            return new Ld(Math.min(this.low, Od.low), Math.max(this.high, Od.high));
        }
        subtract(Pd) {
            return Pd.low <= this.low && Pd.high >= this.high ? [] : Pd.low > this.low && Pd.high < this.high ? [
                new Ld(this.low, Pd.low - 1),
                new Ld(Pd.high + 1, this.high)
            ] : Pd.low <= this.low ? [
                new Ld(Pd.high + 1, this.high)
            ] : [
                new Ld(this.low, Pd.low - 1)
            ];
        }
        toString() {
            return this.low == this.high ? this.low.toString() : this.low + "-" + this.high;
        }
        constructor(Qd, Rd){
            this.low = Qd, this.high = Rd, this.length = 1 + Rd - Qd;
        }
    }, Sd = class _class {
        _update_length() {
            this.length = this.ranges.reduce((Td, Ud)=>Td + Ud.length
            , 0);
        }
        add(Vd, Wd) {
            var Xd = (Yd)=>{
                for(var Zd = 0; Zd < this.ranges.length && !Yd.touches(this.ranges[Zd]);)Zd++;
                for(var $d = this.ranges.slice(0, Zd); Zd < this.ranges.length && Yd.touches(this.ranges[Zd]);)Yd = Yd.add(this.ranges[Zd]), Zd++;
                $d.push(Yd), this.ranges = $d.concat(this.ranges.slice(Zd)), this._update_length();
            };
            return Vd instanceof Sd ? Vd.ranges.forEach(Xd) : (Wd == null && (Wd = Vd), Xd(new Ld(Vd, Wd))), this;
        }
        subtract(_d, ae) {
            var be = (ce)=>{
                for(var de = 0; de < this.ranges.length && !ce.overlaps(this.ranges[de]);)de++;
                for(var ee = this.ranges.slice(0, de); de < this.ranges.length && ce.overlaps(this.ranges[de]);)ee = ee.concat(this.ranges[de].subtract(ce)), de++;
                this.ranges = ee.concat(this.ranges.slice(de)), this._update_length();
            };
            return _d instanceof Sd ? _d.ranges.forEach(be) : (ae == null && (ae = _d), be(new Ld(_d, ae))), this;
        }
        intersect(fe, ge) {
            var he = [], ie = (je)=>{
                for(var ke = 0; ke < this.ranges.length && !je.overlaps(this.ranges[ke]);)ke++;
                for(; ke < this.ranges.length && je.overlaps(this.ranges[ke]);){
                    var le = Math.max(this.ranges[ke].low, je.low), me = Math.min(this.ranges[ke].high, je.high);
                    he.push(new Ld(le, me)), ke++;
                }
            };
            return fe instanceof Sd ? fe.ranges.forEach(ie) : (ge == null && (ge = fe), ie(new Ld(fe, ge))), this.ranges = he, this._update_length(), this;
        }
        index(ne) {
            for(var oe = 0; oe < this.ranges.length && this.ranges[oe].length <= ne;)ne -= this.ranges[oe].length, oe++;
            return this.ranges[oe].low + ne;
        }
        toString() {
            return "[ " + this.ranges.join(", ") + " ]";
        }
        clone() {
            return new Sd(this);
        }
        numbers() {
            return this.ranges.reduce((pe, qe)=>{
                for(var re = qe.low; re <= qe.high;)pe.push(re), re++;
                return pe;
            }, []);
        }
        subranges() {
            return this.ranges.map((se)=>({
                    low: se.low,
                    high: se.high,
                    length: 1 + se.high - se.low
                })
            );
        }
        constructor(te, ue){
            this.ranges = [], this.length = 0, te != null && this.add(te, ue);
        }
    };
    Kd.exports = Sd;
});
var j = _(w());
var export_default = j.default;
var L = Object.create;
var N = Object.defineProperty;
var _1 = Object.getOwnPropertyDescriptor;
var z = Object.getOwnPropertyNames;
var Y = Object.getPrototypeOf, Z = Object.prototype.hasOwnProperty;
var J = (ve)=>N(ve, "__esModule", {
        value: !0
    })
;
var E1 = (we, xe)=>()=>(xe || we((xe = {
            exports: {
            }
        }).exports, xe), xe.exports)
;
var K = (ye, ze, Ae)=>{
    if (ze && typeof ze == "object" || typeof ze == "function") for (let Be of z(ze))!Z.call(ye, Be) && Be !== "default" && N(ye, Be, {
        get: ()=>ze[Be]
        ,
        enumerable: !(Ae = _1(ze, Be)) || Ae.enumerable
    });
    return ye;
}, x1 = (Ce)=>K(J(N(Ce != null ? L(Y(Ce)) : {
    }, "default", Ce && Ce.__esModule && "default" in Ce ? {
        get: ()=>Ce.default
        ,
        enumerable: !0
    } : {
        value: Ce,
        enumerable: !0
    })), Ce)
;
var I = E1((De, Ee)=>{
    Ee.exports = {
        ROOT: 0,
        GROUP: 1,
        POSITION: 2,
        SET: 3,
        RANGE: 4,
        REPETITION: 5,
        REFERENCE: 6,
        CHAR: 7
    };
});
var S = E1((Fe)=>{
    var Ge = I(), He = ()=>[
            {
                type: Ge.RANGE,
                from: 48,
                to: 57
            }
        ]
    , Ie = ()=>[
            {
                type: Ge.CHAR,
                value: 95
            },
            {
                type: Ge.RANGE,
                from: 97,
                to: 122
            },
            {
                type: Ge.RANGE,
                from: 65,
                to: 90
            }
        ].concat(He())
    , Je = ()=>[
            {
                type: Ge.CHAR,
                value: 9
            },
            {
                type: Ge.CHAR,
                value: 10
            },
            {
                type: Ge.CHAR,
                value: 11
            },
            {
                type: Ge.CHAR,
                value: 12
            },
            {
                type: Ge.CHAR,
                value: 13
            },
            {
                type: Ge.CHAR,
                value: 32
            },
            {
                type: Ge.CHAR,
                value: 160
            },
            {
                type: Ge.CHAR,
                value: 5760
            },
            {
                type: Ge.RANGE,
                from: 8192,
                to: 8202
            },
            {
                type: Ge.CHAR,
                value: 8232
            },
            {
                type: Ge.CHAR,
                value: 8233
            },
            {
                type: Ge.CHAR,
                value: 8239
            },
            {
                type: Ge.CHAR,
                value: 8287
            },
            {
                type: Ge.CHAR,
                value: 12288
            },
            {
                type: Ge.CHAR,
                value: 65279
            }
        ]
    , Ke = ()=>[
            {
                type: Ge.CHAR,
                value: 10
            },
            {
                type: Ge.CHAR,
                value: 13
            },
            {
                type: Ge.CHAR,
                value: 8232
            },
            {
                type: Ge.CHAR,
                value: 8233
            }
        ]
    ;
    Fe.words = ()=>({
            type: Ge.SET,
            set: Ie(),
            not: !1
        })
    ;
    Fe.notWords = ()=>({
            type: Ge.SET,
            set: Ie(),
            not: !0
        })
    ;
    Fe.ints = ()=>({
            type: Ge.SET,
            set: He(),
            not: !1
        })
    ;
    Fe.notInts = ()=>({
            type: Ge.SET,
            set: He(),
            not: !0
        })
    ;
    Fe.whitespace = ()=>({
            type: Ge.SET,
            set: Je(),
            not: !1
        })
    ;
    Fe.notWhitespace = ()=>({
            type: Ge.SET,
            set: Je(),
            not: !0
        })
    ;
    Fe.anyChar = ()=>({
            type: Ge.SET,
            set: Ke(),
            not: !0
        })
    ;
});
var F = E1((Le)=>{
    var Me = I(), Ne = S(), Oe = "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?", Pe = {
        "0": 0,
        t: 9,
        n: 10,
        v: 11,
        f: 12,
        r: 13
    };
    Le.strToChars = function(Qe) {
        var Re = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z[\\\]^?])|([0tnvfr]))/g;
        return Qe = Qe.replace(Re, function(Se, Te, Ue, Ve, We, Xe, Ye, Ze) {
            if (Ue) return Se;
            var $e = Te ? 8 : Ve ? parseInt(Ve, 16) : We ? parseInt(We, 16) : Xe ? parseInt(Xe, 8) : Ye ? Oe.indexOf(Ye) : Pe[Ze], _e = String.fromCharCode($e);
            return /[[\]{}^$.|?*+()]/.test(_e) && (_e = "\\" + _e), _e;
        }), Qe;
    };
    Le.tokenizeClass = (af, bf)=>{
        for(var cf = [], df = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?([^])/g, ef, ff; (ef = df.exec(af)) != null;)if (ef[1]) cf.push(Ne.words());
        else if (ef[2]) cf.push(Ne.ints());
        else if (ef[3]) cf.push(Ne.whitespace());
        else if (ef[4]) cf.push(Ne.notWords());
        else if (ef[5]) cf.push(Ne.notInts());
        else if (ef[6]) cf.push(Ne.notWhitespace());
        else if (ef[7]) cf.push({
            type: Me.RANGE,
            from: (ef[8] || ef[9]).charCodeAt(0),
            to: ef[10].charCodeAt(0)
        });
        else if (ff = ef[12]) cf.push({
            type: Me.CHAR,
            value: ff.charCodeAt(0)
        });
        else return [
            cf,
            df.lastIndex
        ];
        Le.error(bf, "Unterminated character class");
    };
    Le.error = (gf, hf)=>{
        throw new SyntaxError("Invalid regular expression: /" + gf + "/: " + hf);
    };
});
var U = E1((jf)=>{
    var kf = I();
    jf.wordBoundary = ()=>({
            type: kf.POSITION,
            value: "b"
        })
    ;
    jf.nonWordBoundary = ()=>({
            type: kf.POSITION,
            value: "B"
        })
    ;
    jf.begin = ()=>({
            type: kf.POSITION,
            value: "^"
        })
    ;
    jf.end = ()=>({
            type: kf.POSITION,
            value: "$"
        })
    ;
});
var P = E1((lf, mf)=>{
    var nf = F(), of = I(), pf = S(), qf = U();
    mf.exports = (rf)=>{
        var sf = 0, tf, uf, vf = {
            type: of.ROOT,
            stack: []
        }, wf = vf, xf = vf.stack, yf = [], zf = (Af)=>{
            nf.error(rf, `Nothing to repeat at column ${Af - 1}`);
        }, Bf = nf.strToChars(rf);
        for(tf = Bf.length; sf < tf;)switch(uf = Bf[sf++], uf){
            case "\\":
                switch(uf = Bf[sf++], uf){
                    case "b":
                        xf.push(qf.wordBoundary());
                        break;
                    case "B":
                        xf.push(qf.nonWordBoundary());
                        break;
                    case "w":
                        xf.push(pf.words());
                        break;
                    case "W":
                        xf.push(pf.notWords());
                        break;
                    case "d":
                        xf.push(pf.ints());
                        break;
                    case "D":
                        xf.push(pf.notInts());
                        break;
                    case "s":
                        xf.push(pf.whitespace());
                        break;
                    case "S":
                        xf.push(pf.notWhitespace());
                        break;
                    default:
                        /\d/.test(uf) ? xf.push({
                            type: of.REFERENCE,
                            value: parseInt(uf, 10)
                        }) : xf.push({
                            type: of.CHAR,
                            value: uf.charCodeAt(0)
                        });
                }
                break;
            case "^":
                xf.push(qf.begin());
                break;
            case "$":
                xf.push(qf.end());
                break;
            case "[":
                var Cf;
                Bf[sf] === "^" ? (Cf = !0, sf++) : Cf = !1;
                var Df = nf.tokenizeClass(Bf.slice(sf), rf);
                sf += Df[1], xf.push({
                    type: of.SET,
                    set: Df[0],
                    not: Cf
                });
                break;
            case ".":
                xf.push(pf.anyChar());
                break;
            case "(":
                var Ef = {
                    type: of.GROUP,
                    stack: [],
                    remember: !0
                };
                uf = Bf[sf], uf === "?" && (uf = Bf[sf + 1], sf += 2, uf === "=" ? Ef.followedBy = !0 : uf === "!" ? Ef.notFollowedBy = !0 : uf !== ":" && nf.error(rf, `Invalid group, character '${uf}' after '?' at column ${sf - 1}`), Ef.remember = !1), xf.push(Ef), yf.push(wf), wf = Ef, xf = Ef.stack;
                break;
            case ")":
                yf.length === 0 && nf.error(rf, `Unmatched ) at column ${sf - 1}`), wf = yf.pop(), xf = wf.options ? wf.options[wf.options.length - 1] : wf.stack;
                break;
            case "|":
                wf.options || (wf.options = [
                    wf.stack
                ], delete wf.stack);
                var Ff = [];
                wf.options.push(Ff), xf = Ff;
                break;
            case "{":
                var Gf = /^(\d+)(,(\d+)?)?\}/.exec(Bf.slice(sf)), Hf, If;
                Gf !== null ? (xf.length === 0 && zf(sf), Hf = parseInt(Gf[1], 10), If = Gf[2] ? Gf[3] ? parseInt(Gf[3], 10) : 1 / 0 : Hf, sf += Gf[0].length, xf.push({
                    type: of.REPETITION,
                    min: Hf,
                    max: If,
                    value: xf.pop()
                })) : xf.push({
                    type: of.CHAR,
                    value: 123
                });
                break;
            case "?":
                xf.length === 0 && zf(sf), xf.push({
                    type: of.REPETITION,
                    min: 0,
                    max: 1,
                    value: xf.pop()
                });
                break;
            case "+":
                xf.length === 0 && zf(sf), xf.push({
                    type: of.REPETITION,
                    min: 1,
                    max: 1 / 0,
                    value: xf.pop()
                });
                break;
            case "*":
                xf.length === 0 && zf(sf), xf.push({
                    type: of.REPETITION,
                    min: 0,
                    max: 1 / 0,
                    value: xf.pop()
                });
                break;
            default:
                xf.push({
                    type: of.CHAR,
                    value: uf.charCodeAt(0)
                });
        }
        return yf.length !== 0 && nf.error(rf, "Unterminated group"), vf;
    };
    mf.exports.types = of;
});
var j1 = x1(P());
var export_default1 = j1.default;
var C = Object.create;
var o = Object.defineProperty;
var p3 = Object.getOwnPropertyDescriptor;
var y = Object.getOwnPropertyNames;
var E2 = Object.getPrototypeOf, I1 = Object.prototype.hasOwnProperty;
var w1 = (Jf)=>o(Jf, "__esModule", {
        value: !0
    })
;
var g2 = (Kf)=>{
    if (typeof require != "undefined") return require(Kf);
    throw new Error('Dynamic require of "' + Kf + '" is not supported');
};
var O = (Lf, Mf)=>()=>(Mf || Lf((Mf = {
            exports: {
            }
        }).exports, Mf), Mf.exports)
;
var x2 = (Nf, Of, Pf)=>{
    if (Of && typeof Of == "object" || typeof Of == "function") for (let Qf of y(Of))!I1.call(Nf, Qf) && Qf !== "default" && o(Nf, Qf, {
        get: ()=>Of[Qf]
        ,
        enumerable: !(Pf = p3(Of, Qf)) || Pf.enumerable
    });
    return Nf;
}, v2 = (Rf)=>x2(w1(o(Rf != null ? C(E2(Rf)) : {
    }, "default", Rf && Rf.__esModule && "default" in Rf ? {
        get: ()=>Rf.default
        ,
        enumerable: !0
    } : {
        value: Rf,
        enumerable: !0
    })), Rf)
;
var R = O((Sf, Tf)=>{
    var Uf = export_default1, Vf = export_default, Wf = Uf.types;
    Tf.exports = class d2 {
        _setDefaults(Xf) {
            this.max = Xf.max != null ? Xf.max : d2.prototype.max != null ? d2.prototype.max : 100, this.defaultRange = Xf.defaultRange ? Xf.defaultRange : this.defaultRange.clone(), Xf.randInt && (this.randInt = Xf.randInt);
        }
        gen() {
            return this._gen(this.tokens, []);
        }
        _gen(Yf, Zf) {
            var $f, _f, ag, bg, cg;
            switch(Yf.type){
                case Wf.ROOT:
                case Wf.GROUP:
                    if (Yf.followedBy || Yf.notFollowedBy) return "";
                    for(Yf.remember && Yf.groupNumber === void 0 && (Yf.groupNumber = Zf.push(null) - 1), $f = Yf.options ? this._randSelect(Yf.options) : Yf.stack, _f = "", bg = 0, cg = $f.length; bg < cg; bg++)_f += this._gen($f[bg], Zf);
                    return Yf.remember && (Zf[Yf.groupNumber] = _f), _f;
                case Wf.POSITION:
                    return "";
                case Wf.SET:
                    var dg = this._expand(Yf);
                    return dg.length ? String.fromCharCode(this._randSelect(dg)) : "";
                case Wf.REPETITION:
                    for(ag = this.randInt(Yf.min, Yf.max === 1 / 0 ? Yf.min + this.max : Yf.max), _f = "", bg = 0; bg < ag; bg++)_f += this._gen(Yf.value, Zf);
                    return _f;
                case Wf.REFERENCE:
                    return Zf[Yf.value - 1] || "";
                case Wf.CHAR:
                    var eg = this.ignoreCase && this._randBool() ? this._toOtherCase(Yf.value) : Yf.value;
                    return String.fromCharCode(eg);
            }
        }
        _toOtherCase(fg) {
            return fg + (97 <= fg && fg <= 122 ? -32 : 65 <= fg && fg <= 90 ? 32 : 0);
        }
        _randBool() {
            return !this.randInt(0, 1);
        }
        _randSelect(gg) {
            return gg instanceof Vf ? gg.index(this.randInt(0, gg.length - 1)) : gg[this.randInt(0, gg.length - 1)];
        }
        _expand(hg) {
            if (hg.type === Uf.types.CHAR) return new Vf(hg.value);
            if (hg.type === Uf.types.RANGE) return new Vf(hg.from, hg.to);
            {
                let ig = new Vf;
                for(let jg = 0; jg < hg.set.length; jg++){
                    let kg = this._expand(hg.set[jg]);
                    if (ig.add(kg), this.ignoreCase) for(let lg = 0; lg < kg.length; lg++){
                        let mg = kg.index(lg), ng = this._toOtherCase(mg);
                        mg !== ng && ig.add(ng);
                    }
                }
                return hg.not ? this.defaultRange.clone().subtract(ig) : this.defaultRange.clone().intersect(ig);
            }
        }
        randInt(og, pg) {
            return og + Math.floor(Math.random() * (1 + pg - og));
        }
        get defaultRange() {
            return this._range = this._range || new Vf(32, 126);
        }
        set defaultRange(qg) {
            this._range = qg;
        }
        static randexp(rg, sg) {
            var tg;
            return typeof rg == "string" && (rg = new RegExp(rg, sg)), rg._randexp === void 0 ? (tg = new d2(rg, sg), rg._randexp = tg) : (tg = rg._randexp, tg._setDefaults(rg)), tg.gen();
        }
        static sugar() {
            RegExp.prototype.gen = function() {
                return d2.randexp(this);
            };
        }
        constructor(ug, vg){
            if (this._setDefaults(ug), ug instanceof RegExp) this.ignoreCase = ug.ignoreCase, this.multiline = ug.multiline, ug = ug.source;
            else if (typeof ug == "string") this.ignoreCase = vg && vg.indexOf("i") !== -1, this.multiline = vg && vg.indexOf("m") !== -1;
            else throw new Error("Expected a regexp or string");
            this.tokens = Uf(ug);
        }
    };
});
var b = v2(R());
var export_default2 = b.default;
const Fiona1 = __default3(export_default2);
return Fiona1;
});
