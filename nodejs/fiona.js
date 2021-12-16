(function(root,factory){if(typeof define==="function"&&define.amd){define([],factory);}else if(typeof exports==="object"){module.exports=factory();}else{root.Fiona=factory();}})(this,function(){function _defineProperty(a, e, h) {
    if (e in a) {
        Object.defineProperty(a, e, {
            value: h,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        a[e] = h;
    }
    return a;
}
function _objectSpread(i) {
    for(var k = 1; k < arguments.length; k++){
        var l = arguments[k] != null ? arguments[k] : {
        };
        var n = Object.keys(l);
        if (typeof Object.getOwnPropertySymbols === "function") {
            n = n.concat(Object.getOwnPropertySymbols(l).filter(function(q) {
                return Object.getOwnPropertyDescriptor(l, q).enumerable;
            }));
        }
        n.forEach(function(e) {
            _defineProperty(i, e, l[e]);
        });
    }
    return i;
}
const __default = {
    version: "4.0.0-alpha.8"
};
const Register = (r, s)=>(...t)=>t.forEach((u)=>{
            const [A, G] = typeof u === "function" ? [
                u.name,
                u
            ] : u;
            r(A[0].toUpperCase() + A.slice(1), (...H)=>(Q)=>G(Q, ...H)
            );
            s(A, function(...R) {
                return G(this, ...R);
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
const xor = (T)=>{
    let [V, W, $, aa] = baseSeeds;
    const ba = ()=>{
        const ca = V ^ V << 11;
        [V, W, $] = [
            W,
            $,
            aa
        ];
        aa = aa ^ aa >> 19 ^ ca ^ ca >> 8;
        return aa / 2147483647;
    };
    const da = ()=>{
        let ea = aa ^ $ ^ $ >> 19;
        ea = ea ^ ea >> 8;
        ea = ea ^ ea >> 16;
        ea = ea ^ ea << 11;
        ea = ea ^ ea << 22;
        [aa, $, W] = [
            $,
            W,
            V
        ];
        V = ea;
        return aa / 2147483647;
    };
    const fa = ()=>Math.round(ba() * 10000000000000000)
    ;
    const ga = (ha)=>{
        [V, W, $, aa] = baseSeeds.map((ia)=>ia + ha
        );
        [V, W, $, aa] = [
            fa(),
            fa(),
            fa(),
            fa()
        ];
    };
    ga(T);
    return {
        random: ()=>ba()
        ,
        reverse: ()=>da()
        ,
        reseed: ga,
        getState: ()=>[
                V,
                W,
                $,
                aa
            ]
        ,
        setState: (ja)=>[V, W, $, aa] = ja
    };
};
const stringToIntegers = (ka)=>ka.split("").map((la)=>la.charCodeAt(0)
    )
;
const compound = (ma, na)=>xorify(ma + na)
;
const xorify = (oa)=>xor(oa % 2147483647).random() * 2147483647
;
const prepareSeed = (pa)=>typeof pa === "string" ? stringToIntegers(pa).reduce(compound, 0) : pa
;
const processSeed = (qa, ra = [])=>[
        qa,
        ...ra
    ].map(prepareSeed).reduce(compound, 0)
;
const defaultDistribution = (sa)=>sa
;
const __default1 = (ta)=>{
    let ua = defaultDistribution;
    return (va)=>{
        if (typeof va === "function") {
            ua = va;
            return ta;
        } else if (va === null) {
            ua = defaultDistribution;
            return ta;
        } else {
            return ua(va);
        }
    };
};
const __default2 = (wa, xa)=>{
    const { reseed , getState , setState , random: ya , reverse  } = xor(0);
    reseed(processSeed(xa));
    const za = getState();
    const Aa = (Ba)=>{
        if (Ba === undefined) {
            return getState();
        } else {
            if (Ba === null) {
                setState(za);
            } else {
                setState(Ba);
            }
            return wa;
        }
    };
    const Ca = __default1(wa);
    const Da = (Ea)=>{
        reseed(processSeed(Ea !== undefined ? JSON.stringify([
            Ea,
            []
        ]) : xa));
        return wa;
    };
    const Fa = ()=>Ca(ya())
    ;
    return {
        state: Aa,
        reset: Da,
        random: Fa,
        reverse,
        distribution: Ca
    };
};
const handleArray = (Ga, Ha, Ia, Ja)=>{
    for(let Ka = 0; Ka < Ha.length; Ka++){
        Ha[Ka] = recursor(Ga, Ha[Ka], Ia.concat(Ka), Ja);
    }
    return Ha;
};
const handleObject = (La, Ma, Na, Oa)=>{
    for(const Pa in Ma){
        Ma[Pa] = recursor(La, Ma[Pa], Na.concat(Pa), Oa);
    }
    return Ma;
};
const handleFunction = (Qa, Ra, Sa, Ta)=>{
    const Ua = new Qa.constructor(__default2, Qa.info().initseed, Qa.info().path.concat(Sa));
    Ua.data = Ta;
    const Va = registered.indexOf(Ra) !== -1 ? Ra() : Ra(Ua);
    return recursor(Qa, Va, Sa, Sa.length ? Ta : Va);
};
const handleRegex = (Wa, Xa, Ya, Za)=>Wa.regex ? handleFunction(Wa, ($a)=>$a.regex(Xa)
    , Ya, Za) : Xa
;
const recursor = (_a, ab, bb, cb)=>ab === null || ab === undefined ? ab : ab.constructor === Array ? handleArray(_a, ab, bb, cb) : ab.constructor === Object ? handleObject(_a, ab, bb, cb) : typeof ab === "function" ? handleFunction(_a, ab, bb, cb) : ab.constructor === RegExp ? handleRegex(_a, ab, bb, cb) : ab
;
const cloner = (db)=>db === null || db === undefined ? db : db.constructor === Array ? db.map(cloner) : db.constructor === Object ? Object.entries(db).reduce((eb, [fb, gb])=>_objectSpread({
        }, eb, {
            [fb]: cloner(gb)
        })
    , {
    }) : db
;
const recurse = (hb, ib)=>{
    const jb = cloner(ib);
    return recursor(hb, jb, [], jb);
};
function Moon(kb, lb = Math.floor(Math.random() * 100000000), mb) {
    const { state , reset , random , reverse , distribution  } = kb(this, JSON.stringify([
        lb,
        mb
    ]));
    Object.assign(this, {
        state,
        reset,
        random,
        reverse,
        distribution
    });
    this.info = ()=>({
            initseed: lb,
            path: mb
        })
    ;
    this.recurse = recurse;
    return this;
}
Moon.prototype = {
    constructor: Moon
};
const number = (nb, { max =1000000 , min =0 , precision =0  } = {
})=>{
    const ob = Math.pow(10, precision);
    return Math.floor((nb.random() * (1 + max - min) + min) * ob) / ob;
};
const object = (pb, ...qb)=>{
    return qb.reduce((rb, sb)=>{
        return pb.recurse(pb, sb);
    }, {
    });
};
const json = (tb, ...ub)=>{
    return JSON.stringify(tb.object(...ub));
};
const array = (vb, wb, xb, yb = (zb)=>zb
)=>{
    const Ab = typeof yb === "string" ? (Bb)=>Bb.join(yb)
     : yb;
    const Cb = typeof wb === "object" && wb.constructor === Object ? vb.number(wb) : vb.recurse(vb.clone(), wb);
    return Ab(vb.recurse(vb, Array(Cb).fill(xb)));
};
const string = (Db, [Eb, ...Fb], ...Gb)=>{
    const Hb = Db.recurse(Db, Gb);
    return Fb.reduce((Ib, Jb, Kb)=>`${Ib}${Hb[Kb]}${Jb}`
    , Eb);
};
const Fiona = (Lb, Mb = [])=>new Moon(__default2, Lb, Mb)
;
Fiona.version = __default.version;
const registerFactory = (Nb, Ob)=>{
    const Pb = (...Qb)=>Ob(...Qb)
    ;
    registered.push(Pb);
    return Fiona[Nb] = Pb;
};
const registerMethod = (Rb, Sb)=>{
    return Moon.prototype[Rb] = Sb;
};
Fiona.register = Register(registerFactory, registerMethod);
Fiona.Random = ()=>(Tb)=>Tb.random()
;
const clone = (Ub)=>Fiona(Ub.info().initseed).state(Ub.state())
;
Fiona.register([
    "clone", clone]);
Fiona.register([
    "number", number], [
    "object", object], [
    "json", json], [
    "string", string], [
    "array", array]);
const bool = (Vb, { chance =0.5  } = {
})=>Vb.random() < chance
;
const unique = (Wb, Xb, Yb, { duplicateLimit =(qty)=>qty * 2
 , comparator =(a, b)=>a === b
  } = {
})=>{
    const Zb = typeof Xb === "number" ? Xb : Wb.number(Xb);
    const $b = typeof duplicateLimit === "function" ? duplicateLimit(Zb) : duplicateLimit;
    const _b = Symbol("unmatched");
    let ac = 0;
    const bc = Wb.array(Zb + $b, (cc)=>{
        const dc = cc.info().path[0];
        if (dc + 1 > Zb + ac) {
            return null;
        }
        const ec = cc.object(Yb);
        if (cc.data.findIndex((fc)=>comparator(ec, fc)
        ) !== -1) {
            ac++;
            return _b;
        } else {
            return ec;
        }
    }).filter((gc)=>gc !== _b
    ).slice(0, Zb);
    if (bc.length === Zb) {
        return bc;
    } else {
        throw Error(`Too many duplicates`);
    }
};
const chooser = (hc, ic, jc)=>{
    const kc = ic.reduce((lc, mc, nc)=>{
        lc.push((lc[nc - 1] || 0) + (typeof jc[nc] === "number" ? jc[nc] : 1));
        return lc;
    }, []);
    const oc = hc * kc[kc.length - 1];
    let pc;
    kc.every((qc, rc)=>{
        if (oc > qc) {
            return true;
        } else {
            pc = rc;
            return false;
        }
    });
    return pc;
};
const choose = (sc, tc, uc, { weights =[]  } = {
})=>{
    const vc = uc.slice(0);
    const wc = weights.slice(0);
    return Array(tc || 0).fill(null).map(()=>{
        const xc = chooser(sc.random(), vc, wc);
        const yc = vc[xc];
        vc[xc] = vc[0];
        vc.shift();
        return yc;
    });
};
const oneOf = (zc, Ac, { weights =[]  } = {
})=>{
    return Ac[chooser(zc.random(), Ac, weights)];
};
const date = (Bc, { min ="1940" , max ="2000" , long: Cc = false  } = {
})=>{
    const Dc = new Date(min) * 1;
    const Ec = new Date(max) * 1;
    if (Dc > Ec) {
        throw Error(`min date must be lower than max date`);
    }
    const Fc = Ec - Dc;
    const Gc = new Date(Bc.number({
        max: Fc
    }) + Dc).toISOString();
    return Cc ? Gc : Gc.slice(0, 10);
};
const RGB = (Hc, Ic, Jc)=>"#" + [
        Hc,
        Ic,
        Jc
    ].map((Kc)=>`0${Kc.toString(16)}`.slice(-2)
    ).join("")
;
const getme = (Lc)=>{
    return Lc.slice(1).match(/(..)/g).map((Mc)=>parseInt(Mc, 16)
    );
};
const mapper = (Nc, Oc)=>(Pc)=>{
        return Nc.reduce((Qc, Rc, Sc)=>{
            const Tc = Math.min(Oc[Sc], Nc[Sc]);
            const Uc = Math.max(Oc[Sc], Nc[Sc]);
            const Vc = Uc - Tc;
            return `${Qc}${(Tc + Math.ceil(Vc * Pc)).toString(16)}`;
        }, "#");
    }
;
const colorMapperFactory = (Wc)=>{
    const Xc = Wc.map(({ start , end  })=>mapper(getme(start), getme(end))
    );
    return (Yc)=>{
        const Zc = Math.floor(Wc.length * Yc);
        return Xc[Zc](Yc);
    };
};
const img = ($c, _c)=>{
    const { seed , width , height , bg , colors  } = Object.assign($c.object({
        seed: $c.number(),
        width: 1000,
        height: 1000,
        bg: RGB($c.number({
            max: 255
        }), $c.number({
            max: 255
        }), $c.number({
            max: 255
        })),
        colors: $c.array({
            min: 1,
            max: 10
        }, (ad)=>({
                start: RGB(ad.number({
                    max: 255
                }), ad.number({
                    max: 255
                }), ad.number({
                    max: 255
                })),
                end: RGB(ad.number({
                    max: 255
                }), ad.number({
                    max: 255
                }), ad.number({
                    max: 255
                }))
            })
        )
    }), _c);
    const bd = colorMapperFactory(colors);
    const cd = [];
    for(let dd = 0; dd < 100; dd++){
        const ed = bd(dd / 100);
        const fd = seed * dd % 360;
        const [gd, hd, id, jd] = [
            5 * dd,
            5 / seed,
            dd * seed,
            dd
        ].map(Math.floor).map((kd)=>kd % (Math.max(width, height) * 3)
        );
        cd.push(`<rect x="${gd}" y="${hd}" width="${id}" height="${jd}" transform="rotate(${fd})" fill="${ed}" />`);
    }
    const ld = (md)=>encodeURIComponent(`
    <svg width="${width}" height="${height}" viewBox="${-1 * width} ${-1 * height} ${width * 2} ${height * 2}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <style>svg { background-color: ${bg}; }</style>
      ${md}
    </svg>
  `)
    ;
    return `data:image/svg+xml;utf8,${ld(cd.join("\n"))}`;
};
const duplicable = (nd, { frequency =0.1 , pool =10  } = {
})=>{
    if (nd.random() <= frequency) {
        nd.reset((Math.floor(nd.random() * pool + 1) / pool + 1) * 10000000000000000);
    }
    return nd;
};
const gibberish = (od, { qty =1 , syllableMin =1 , syllableMax =5  } = {
})=>od.array(qty, (pd)=>pd.regex(new RegExp(`([bcdfghklmnprstvw]?(a|ac|ad|af|age|al|an|an|ap|ar|as|at|au|aus|e|ed|el|en|ence|er|ern|ers|es|est|et|eve|ex|i|ic|ies|im|in|ing|ings|is|it|o|ob|oc|of|op|or|out|u|un|up)){${syllableMin},${syllableMax}}`))
    ).join(" ")
;
const lorem = (qd, { qty =15  } = {
})=>{
    const rd = qd.random() < 0.2 ? "lorem ipsum " : "";
    let sd = [];
    while(sd.length < qty){
        sd = sd.concat("dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" "));
    }
    return rd + qd.choose(qty, sd).join(" ");
};
const word = (td)=>td.lorem({
        qty: 1
    }).split(" ")[0]
;
const sentence = (ud)=>{
    const vd = ud.lorem({
        qty: 25
    });
    return vd[0].toUpperCase() + vd.slice(1) + ".";
};
const paragraph = (wd)=>Array(wd.number({
        min: 1,
        max: 10
    })).fill(0).map(()=>wd.sentence()
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
const getGender = (xd)=>xd && (xd[0].toLowerCase() === "f" ? "female" : "male")
;
const gender = (yd)=>{
    return yd.random() < 0.5 ? "male" : "female";
};
const title = (zd, { gender  } = {
})=>{
    return zd.oneOf(namedata[getGender(gender || zd.gender())].title, {
        weights: [
            5,
            3
        ]
    });
};
const firstname = (Ad, { gender  } = {
})=>{
    return Ad.oneOf(namedata[getGender(gender || Ad.gender())].firstname);
};
const firstnames = (Bd, { gender  } = {
})=>{
    return Bd.choose(Bd.clone().distribution((Cd)=>Cd * Cd * Cd
    ).number({
        min: 1,
        max: 3
    }), namedata[getGender(gender || Bd.gender())].firstname).join(" ");
};
const surname = (Dd)=>{
    return Dd.choose(Dd.clone().distribution((Ed)=>Ed * Ed * Ed
    ).number({
        min: 1,
        max: 2
    }), namedata.surname).join(Dd.bool() ? " " : "-");
};
const fullname = (Fd, { gender  } = {
})=>{
    const Gd = getGender(gender || Fd.gender());
    return `${Fd.title({
        gender: Gd
    })} ${Fd.firstnames({
        gender: Gd
    })} ${Fd.surname()}`;
};
const regex = (Hd)=>(Id, Jd = /[A-F0-9]{16}/)=>{
        const Kd = new Hd(RegExp(Jd));
        Kd.randInt = (Ld, Md)=>Ld + Math.floor(Id.random() * (1 + Md - Ld))
        ;
        return Kd.gen();
    }
;
const shuffle = (Nd, Od, { qty  } = {
})=>Nd.choose(typeof qty !== "undefined" ? qty : Od.length, Od)
;
const __default3 = (Pd)=>{
    Fiona.register([
        "bool", bool], [
        "unique", unique], [
        "choose", choose], [
        "oneOf", oneOf], [
        "date", date], [
        "img", img], [
        "duplicable", duplicable], [
        "gibberish", gibberish], [
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
        regex(Pd)
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
var M = (Qd)=>g(Qd, "__esModule", {
        value: !0
    })
;
var x = (Rd, Sd)=>()=>(Sd || Rd((Sd = {
            exports: {
            }
        }).exports, Sd), Sd.exports)
;
var E = (Td, Ud, Vd)=>{
    if (Ud && typeof Ud == "object" || typeof Ud == "function") for (let Wd of d(Ud))!m.call(Td, Wd) && Wd !== "default" && g(Td, Wd, {
        get: ()=>Ud[Wd]
        ,
        enumerable: !(Vd = v(Ud, Wd)) || Vd.enumerable
    });
    return Td;
}, _ = (Xd)=>E(M(g(Xd != null ? f(p(Xd)) : {
    }, "default", Xd && Xd.__esModule && "default" in Xd ? {
        get: ()=>Xd.default
        ,
        enumerable: !0
    } : {
        value: Xd,
        enumerable: !0
    })), Xd)
;
var w = x((Yd, Zd)=>{
    "use strict";
    var $d = class _class {
        overlaps(_d) {
            return !(this.high < _d.low || this.low > _d.high);
        }
        touches(ae) {
            return !(this.high + 1 < ae.low || this.low - 1 > ae.high);
        }
        add(be) {
            return new $d(Math.min(this.low, be.low), Math.max(this.high, be.high));
        }
        subtract(ce) {
            return ce.low <= this.low && ce.high >= this.high ? [] : ce.low > this.low && ce.high < this.high ? [
                new $d(this.low, ce.low - 1),
                new $d(ce.high + 1, this.high)
            ] : ce.low <= this.low ? [
                new $d(ce.high + 1, this.high)
            ] : [
                new $d(this.low, ce.low - 1)
            ];
        }
        toString() {
            return this.low == this.high ? this.low.toString() : this.low + "-" + this.high;
        }
        constructor(de, ee){
            this.low = de, this.high = ee, this.length = 1 + ee - de;
        }
    }, fe = class _class {
        _update_length() {
            this.length = this.ranges.reduce((ge, he)=>ge + he.length
            , 0);
        }
        add(ie, je) {
            var ke = (le)=>{
                for(var me = 0; me < this.ranges.length && !le.touches(this.ranges[me]);)me++;
                for(var ne = this.ranges.slice(0, me); me < this.ranges.length && le.touches(this.ranges[me]);)le = le.add(this.ranges[me]), me++;
                ne.push(le), this.ranges = ne.concat(this.ranges.slice(me)), this._update_length();
            };
            return ie instanceof fe ? ie.ranges.forEach(ke) : (je == null && (je = ie), ke(new $d(ie, je))), this;
        }
        subtract(pe, qe) {
            var re = (se)=>{
                for(var te = 0; te < this.ranges.length && !se.overlaps(this.ranges[te]);)te++;
                for(var ue = this.ranges.slice(0, te); te < this.ranges.length && se.overlaps(this.ranges[te]);)ue = ue.concat(this.ranges[te].subtract(se)), te++;
                this.ranges = ue.concat(this.ranges.slice(te)), this._update_length();
            };
            return pe instanceof fe ? pe.ranges.forEach(re) : (qe == null && (qe = pe), re(new $d(pe, qe))), this;
        }
        intersect(ve, we) {
            var xe = [], ye = (ze)=>{
                for(var Ae = 0; Ae < this.ranges.length && !ze.overlaps(this.ranges[Ae]);)Ae++;
                for(; Ae < this.ranges.length && ze.overlaps(this.ranges[Ae]);){
                    var Be = Math.max(this.ranges[Ae].low, ze.low), Ce = Math.min(this.ranges[Ae].high, ze.high);
                    xe.push(new $d(Be, Ce)), Ae++;
                }
            };
            return ve instanceof fe ? ve.ranges.forEach(ye) : (we == null && (we = ve), ye(new $d(ve, we))), this.ranges = xe, this._update_length(), this;
        }
        index(De) {
            for(var Ee = 0; Ee < this.ranges.length && this.ranges[Ee].length <= De;)De -= this.ranges[Ee].length, Ee++;
            return this.ranges[Ee].low + De;
        }
        toString() {
            return "[ " + this.ranges.join(", ") + " ]";
        }
        clone() {
            return new fe(this);
        }
        numbers() {
            return this.ranges.reduce((Fe, Ge)=>{
                for(var He = Ge.low; He <= Ge.high;)Fe.push(He), He++;
                return Fe;
            }, []);
        }
        subranges() {
            return this.ranges.map((Ie)=>({
                    low: Ie.low,
                    high: Ie.high,
                    length: 1 + Ie.high - Ie.low
                })
            );
        }
        constructor(Je, Ke){
            this.ranges = [], this.length = 0, Je != null && this.add(Je, Ke);
        }
    };
    Zd.exports = fe;
});
var j = _(w());
var export_default = j.default;
var L = Object.create;
var N = Object.defineProperty;
var _1 = Object.getOwnPropertyDescriptor;
var z = Object.getOwnPropertyNames;
var Y = Object.getPrototypeOf, Z = Object.prototype.hasOwnProperty;
var J = (Le)=>N(Le, "__esModule", {
        value: !0
    })
;
var E1 = (Me, Ne)=>()=>(Ne || Me((Ne = {
            exports: {
            }
        }).exports, Ne), Ne.exports)
;
var K = (Oe, Pe, Qe)=>{
    if (Pe && typeof Pe == "object" || typeof Pe == "function") for (let Re of z(Pe))!Z.call(Oe, Re) && Re !== "default" && N(Oe, Re, {
        get: ()=>Pe[Re]
        ,
        enumerable: !(Qe = _1(Pe, Re)) || Qe.enumerable
    });
    return Oe;
}, x1 = (Se)=>K(J(N(Se != null ? L(Y(Se)) : {
    }, "default", Se && Se.__esModule && "default" in Se ? {
        get: ()=>Se.default
        ,
        enumerable: !0
    } : {
        value: Se,
        enumerable: !0
    })), Se)
;
var I = E1((Te, Ue)=>{
    Ue.exports = {
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
var S = E1((Ve)=>{
    var We = I(), Xe = ()=>[
            {
                type: We.RANGE,
                from: 48,
                to: 57
            }
        ]
    , Ye = ()=>[
            {
                type: We.CHAR,
                value: 95
            },
            {
                type: We.RANGE,
                from: 97,
                to: 122
            },
            {
                type: We.RANGE,
                from: 65,
                to: 90
            }
        ].concat(Xe())
    , Ze = ()=>[
            {
                type: We.CHAR,
                value: 9
            },
            {
                type: We.CHAR,
                value: 10
            },
            {
                type: We.CHAR,
                value: 11
            },
            {
                type: We.CHAR,
                value: 12
            },
            {
                type: We.CHAR,
                value: 13
            },
            {
                type: We.CHAR,
                value: 32
            },
            {
                type: We.CHAR,
                value: 160
            },
            {
                type: We.CHAR,
                value: 5760
            },
            {
                type: We.RANGE,
                from: 8192,
                to: 8202
            },
            {
                type: We.CHAR,
                value: 8232
            },
            {
                type: We.CHAR,
                value: 8233
            },
            {
                type: We.CHAR,
                value: 8239
            },
            {
                type: We.CHAR,
                value: 8287
            },
            {
                type: We.CHAR,
                value: 12288
            },
            {
                type: We.CHAR,
                value: 65279
            }
        ]
    , $e = ()=>[
            {
                type: We.CHAR,
                value: 10
            },
            {
                type: We.CHAR,
                value: 13
            },
            {
                type: We.CHAR,
                value: 8232
            },
            {
                type: We.CHAR,
                value: 8233
            }
        ]
    ;
    Ve.words = ()=>({
            type: We.SET,
            set: Ye(),
            not: !1
        })
    ;
    Ve.notWords = ()=>({
            type: We.SET,
            set: Ye(),
            not: !0
        })
    ;
    Ve.ints = ()=>({
            type: We.SET,
            set: Xe(),
            not: !1
        })
    ;
    Ve.notInts = ()=>({
            type: We.SET,
            set: Xe(),
            not: !0
        })
    ;
    Ve.whitespace = ()=>({
            type: We.SET,
            set: Ze(),
            not: !1
        })
    ;
    Ve.notWhitespace = ()=>({
            type: We.SET,
            set: Ze(),
            not: !0
        })
    ;
    Ve.anyChar = ()=>({
            type: We.SET,
            set: $e(),
            not: !0
        })
    ;
});
var F = E1((_e)=>{
    var af = I(), bf = S(), cf = "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?", df = {
        "0": 0,
        t: 9,
        n: 10,
        v: 11,
        f: 12,
        r: 13
    };
    _e.strToChars = function(ef) {
        var ff = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z[\\\]^?])|([0tnvfr]))/g;
        return ef = ef.replace(ff, function(gf, hf, jf, kf, lf, mf, nf, of) {
            if (jf) return gf;
            var pf = hf ? 8 : kf ? parseInt(kf, 16) : lf ? parseInt(lf, 16) : mf ? parseInt(mf, 8) : nf ? cf.indexOf(nf) : df[of], qf = String.fromCharCode(pf);
            return /[[\]{}^$.|?*+()]/.test(qf) && (qf = "\\" + qf), qf;
        }), ef;
    };
    _e.tokenizeClass = (rf, sf)=>{
        for(var tf = [], uf = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?([^])/g, vf, wf; (vf = uf.exec(rf)) != null;)if (vf[1]) tf.push(bf.words());
        else if (vf[2]) tf.push(bf.ints());
        else if (vf[3]) tf.push(bf.whitespace());
        else if (vf[4]) tf.push(bf.notWords());
        else if (vf[5]) tf.push(bf.notInts());
        else if (vf[6]) tf.push(bf.notWhitespace());
        else if (vf[7]) tf.push({
            type: af.RANGE,
            from: (vf[8] || vf[9]).charCodeAt(0),
            to: vf[10].charCodeAt(0)
        });
        else if (wf = vf[12]) tf.push({
            type: af.CHAR,
            value: wf.charCodeAt(0)
        });
        else return [
            tf,
            uf.lastIndex
        ];
        _e.error(sf, "Unterminated character class");
    };
    _e.error = (xf, yf)=>{
        throw new SyntaxError("Invalid regular expression: /" + xf + "/: " + yf);
    };
});
var U = E1((zf)=>{
    var Af = I();
    zf.wordBoundary = ()=>({
            type: Af.POSITION,
            value: "b"
        })
    ;
    zf.nonWordBoundary = ()=>({
            type: Af.POSITION,
            value: "B"
        })
    ;
    zf.begin = ()=>({
            type: Af.POSITION,
            value: "^"
        })
    ;
    zf.end = ()=>({
            type: Af.POSITION,
            value: "$"
        })
    ;
});
var P = E1((Bf, Cf)=>{
    var Df = F(), Ef = I(), Ff = S(), Gf = U();
    Cf.exports = (Hf)=>{
        var If = 0, Jf, Kf, Lf = {
            type: Ef.ROOT,
            stack: []
        }, Mf = Lf, Nf = Lf.stack, Of = [], Pf = (Qf)=>{
            Df.error(Hf, `Nothing to repeat at column ${Qf - 1}`);
        }, Rf = Df.strToChars(Hf);
        for(Jf = Rf.length; If < Jf;)switch(Kf = Rf[If++], Kf){
            case "\\":
                switch(Kf = Rf[If++], Kf){
                    case "b":
                        Nf.push(Gf.wordBoundary());
                        break;
                    case "B":
                        Nf.push(Gf.nonWordBoundary());
                        break;
                    case "w":
                        Nf.push(Ff.words());
                        break;
                    case "W":
                        Nf.push(Ff.notWords());
                        break;
                    case "d":
                        Nf.push(Ff.ints());
                        break;
                    case "D":
                        Nf.push(Ff.notInts());
                        break;
                    case "s":
                        Nf.push(Ff.whitespace());
                        break;
                    case "S":
                        Nf.push(Ff.notWhitespace());
                        break;
                    default:
                        /\d/.test(Kf) ? Nf.push({
                            type: Ef.REFERENCE,
                            value: parseInt(Kf, 10)
                        }) : Nf.push({
                            type: Ef.CHAR,
                            value: Kf.charCodeAt(0)
                        });
                }
                break;
            case "^":
                Nf.push(Gf.begin());
                break;
            case "$":
                Nf.push(Gf.end());
                break;
            case "[":
                var Sf;
                Rf[If] === "^" ? (Sf = !0, If++) : Sf = !1;
                var Tf = Df.tokenizeClass(Rf.slice(If), Hf);
                If += Tf[1], Nf.push({
                    type: Ef.SET,
                    set: Tf[0],
                    not: Sf
                });
                break;
            case ".":
                Nf.push(Ff.anyChar());
                break;
            case "(":
                var Uf = {
                    type: Ef.GROUP,
                    stack: [],
                    remember: !0
                };
                Kf = Rf[If], Kf === "?" && (Kf = Rf[If + 1], If += 2, Kf === "=" ? Uf.followedBy = !0 : Kf === "!" ? Uf.notFollowedBy = !0 : Kf !== ":" && Df.error(Hf, `Invalid group, character '${Kf}' after '?' at column ${If - 1}`), Uf.remember = !1), Nf.push(Uf), Of.push(Mf), Mf = Uf, Nf = Uf.stack;
                break;
            case ")":
                Of.length === 0 && Df.error(Hf, `Unmatched ) at column ${If - 1}`), Mf = Of.pop(), Nf = Mf.options ? Mf.options[Mf.options.length - 1] : Mf.stack;
                break;
            case "|":
                Mf.options || (Mf.options = [
                    Mf.stack
                ], delete Mf.stack);
                var Vf = [];
                Mf.options.push(Vf), Nf = Vf;
                break;
            case "{":
                var Wf = /^(\d+)(,(\d+)?)?\}/.exec(Rf.slice(If)), Xf, Yf;
                Wf !== null ? (Nf.length === 0 && Pf(If), Xf = parseInt(Wf[1], 10), Yf = Wf[2] ? Wf[3] ? parseInt(Wf[3], 10) : 1 / 0 : Xf, If += Wf[0].length, Nf.push({
                    type: Ef.REPETITION,
                    min: Xf,
                    max: Yf,
                    value: Nf.pop()
                })) : Nf.push({
                    type: Ef.CHAR,
                    value: 123
                });
                break;
            case "?":
                Nf.length === 0 && Pf(If), Nf.push({
                    type: Ef.REPETITION,
                    min: 0,
                    max: 1,
                    value: Nf.pop()
                });
                break;
            case "+":
                Nf.length === 0 && Pf(If), Nf.push({
                    type: Ef.REPETITION,
                    min: 1,
                    max: 1 / 0,
                    value: Nf.pop()
                });
                break;
            case "*":
                Nf.length === 0 && Pf(If), Nf.push({
                    type: Ef.REPETITION,
                    min: 0,
                    max: 1 / 0,
                    value: Nf.pop()
                });
                break;
            default:
                Nf.push({
                    type: Ef.CHAR,
                    value: Kf.charCodeAt(0)
                });
        }
        return Of.length !== 0 && Df.error(Hf, "Unterminated group"), Lf;
    };
    Cf.exports.types = Ef;
});
var X = x1(P()), j1 = x1(P()), { types: oe  } = X;
var export_default1 = j1.default;
var C = Object.create;
var o = Object.defineProperty;
var y = Object.getOwnPropertyDescriptor;
var E2 = Object.getOwnPropertyNames;
var x2 = Object.getPrototypeOf, I1 = Object.prototype.hasOwnProperty;
var w1 = (Zf)=>o(Zf, "__esModule", {
        value: !0
    })
;
(($f)=>typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy($f, {
        get: (_f, ag)=>(typeof require != "undefined" ? require : _f)[ag]
    }) : $f
)(function(bg) {
    if (typeof require != "undefined") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + bg + '" is not supported');
});
var O = (cg, dg)=>()=>(dg || cg((dg = {
            exports: {
            }
        }).exports, dg), dg.exports)
;
var v1 = (eg, fg, gg)=>{
    if (fg && typeof fg == "object" || typeof fg == "function") for (let hg of E2(fg))!I1.call(eg, hg) && hg !== "default" && o(eg, hg, {
        get: ()=>fg[hg]
        ,
        enumerable: !(gg = y(fg, hg)) || gg.enumerable
    });
    return eg;
}, _2 = (ig)=>v1(w1(o(ig != null ? C(x2(ig)) : {
    }, "default", ig && ig.__esModule && "default" in ig ? {
        get: ()=>ig.default
        ,
        enumerable: !0
    } : {
        value: ig,
        enumerable: !0
    })), ig)
;
var c = O((jg, kg)=>{
    var lg = export_default1, mg = export_default, ng = lg.types;
    kg.exports = class h {
        _setDefaults(og) {
            this.max = og.max != null ? og.max : h.prototype.max != null ? h.prototype.max : 100, this.defaultRange = og.defaultRange ? og.defaultRange : this.defaultRange.clone(), og.randInt && (this.randInt = og.randInt);
        }
        gen() {
            return this._gen(this.tokens, []);
        }
        _gen(pg, qg) {
            var rg, sg, tg, ug, vg;
            switch(pg.type){
                case ng.ROOT:
                case ng.GROUP:
                    if (pg.followedBy || pg.notFollowedBy) return "";
                    for(pg.remember && pg.groupNumber === void 0 && (pg.groupNumber = qg.push(null) - 1), rg = pg.options ? this._randSelect(pg.options) : pg.stack, sg = "", ug = 0, vg = rg.length; ug < vg; ug++)sg += this._gen(rg[ug], qg);
                    return pg.remember && (qg[pg.groupNumber] = sg), sg;
                case ng.POSITION:
                    return "";
                case ng.SET:
                    var wg = this._expand(pg);
                    return wg.length ? String.fromCharCode(this._randSelect(wg)) : "";
                case ng.REPETITION:
                    for(tg = this.randInt(pg.min, pg.max === 1 / 0 ? pg.min + this.max : pg.max), sg = "", ug = 0; ug < tg; ug++)sg += this._gen(pg.value, qg);
                    return sg;
                case ng.REFERENCE:
                    return qg[pg.value - 1] || "";
                case ng.CHAR:
                    var xg = this.ignoreCase && this._randBool() ? this._toOtherCase(pg.value) : pg.value;
                    return String.fromCharCode(xg);
            }
        }
        _toOtherCase(yg) {
            return yg + (97 <= yg && yg <= 122 ? -32 : 65 <= yg && yg <= 90 ? 32 : 0);
        }
        _randBool() {
            return !this.randInt(0, 1);
        }
        _randSelect(zg) {
            return zg instanceof mg ? zg.index(this.randInt(0, zg.length - 1)) : zg[this.randInt(0, zg.length - 1)];
        }
        _expand(Ag) {
            if (Ag.type === lg.types.CHAR) return new mg(Ag.value);
            if (Ag.type === lg.types.RANGE) return new mg(Ag.from, Ag.to);
            {
                let Bg = new mg;
                for(let Cg = 0; Cg < Ag.set.length; Cg++){
                    let Dg = this._expand(Ag.set[Cg]);
                    if (Bg.add(Dg), this.ignoreCase) for(let Eg = 0; Eg < Dg.length; Eg++){
                        let Fg = Dg.index(Eg), Gg = this._toOtherCase(Fg);
                        Fg !== Gg && Bg.add(Gg);
                    }
                }
                return Ag.not ? this.defaultRange.clone().subtract(Bg) : this.defaultRange.clone().intersect(Bg);
            }
        }
        randInt(Hg, Ig) {
            return Hg + Math.floor(Math.random() * (1 + Ig - Hg));
        }
        get defaultRange() {
            return this._range = this._range || new mg(32, 126);
        }
        set defaultRange(Jg) {
            this._range = Jg;
        }
        static randexp(Kg, Lg) {
            var Mg;
            return typeof Kg == "string" && (Kg = new RegExp(Kg, Lg)), Kg._randexp === void 0 ? (Mg = new h(Kg, Lg), Kg._randexp = Mg) : (Mg = Kg._randexp, Mg._setDefaults(Kg)), Mg.gen();
        }
        static sugar() {
            RegExp.prototype.gen = function() {
                return h.randexp(this);
            };
        }
        constructor(Ng, Og){
            if (this._setDefaults(Ng), Ng instanceof RegExp) this.ignoreCase = Ng.ignoreCase, this.multiline = Ng.multiline, Ng = Ng.source;
            else if (typeof Ng == "string") this.ignoreCase = Og && Og.indexOf("i") !== -1, this.multiline = Og && Og.indexOf("m") !== -1;
            else throw new Error("Expected a regexp or string");
            this.tokens = lg(Ng);
        }
    };
});
var b = _2(c()), N1 = _2(c()), { randexp: B , sugar: D  } = b;
var export_default4 = N1.default;
const Fiona1 = __default3(export_default4);
return Fiona1;
});
