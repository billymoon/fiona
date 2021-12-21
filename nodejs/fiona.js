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
    version: "4.1.0"
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
})=>od.array(qty, ()=>od.regex(new RegExp(`([bcdfghklmnprstvw]?(a|ac|ad|af|age|al|an|an|ap|ar|as|at|au|aus|e|ed|el|en|ence|er|ern|ers|es|est|et|eve|ex|i|ic|ies|im|in|ing|ings|is|it|o|ob|oc|of|op|or|out|u|un|up)){${syllableMin},${syllableMax}}`))
    ).join(" ")
;
const lorem = (pd, { qty =15  } = {
})=>{
    const qd = pd.random() < 0.2 ? "lorem ipsum " : "";
    let rd = [];
    while(rd.length < qty){
        rd = rd.concat("dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" "));
    }
    return qd + pd.choose(qty, rd).join(" ");
};
const word = (sd)=>sd.lorem({
        qty: 1
    }).split(" ")[0]
;
const sentence = (td)=>{
    const ud = td.lorem({
        qty: 25
    });
    return ud[0].toUpperCase() + ud.slice(1) + ".";
};
const paragraph = (vd)=>Array(vd.number({
        min: 1,
        max: 10
    })).fill(0).map(()=>vd.sentence()
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
const getGender = (wd)=>wd && (wd[0].toLowerCase() === "f" ? "female" : "male")
;
const gender = (xd)=>{
    return xd.random() < 0.5 ? "male" : "female";
};
const title = (yd, { gender  } = {
})=>{
    return yd.oneOf(namedata[getGender(gender || yd.gender())].title, {
        weights: [
            5,
            3
        ]
    });
};
const firstname = (zd, { gender  } = {
})=>{
    return zd.oneOf(namedata[getGender(gender || zd.gender())].firstname);
};
const firstnames = (Ad, { gender  } = {
})=>{
    return Ad.choose(Ad.clone().distribution((Bd)=>Bd * Bd * Bd
    ).number({
        min: 1,
        max: 3
    }), namedata[getGender(gender || Ad.gender())].firstname).join(" ");
};
const surname = (Cd)=>{
    return Cd.choose(Cd.clone().distribution((Dd)=>Dd * Dd * Dd
    ).number({
        min: 1,
        max: 2
    }), namedata.surname).join(Cd.bool() ? " " : "-");
};
const fullname = (Ed, { gender  } = {
})=>{
    const Fd = getGender(gender || Ed.gender());
    return `${Ed.title({
        gender: Fd
    })} ${Ed.firstnames({
        gender: Fd
    })} ${Ed.surname()}`;
};
const regex = (Gd)=>(Hd, Id = /[A-F0-9]{16}/)=>{
        const Jd = new Gd(RegExp(Id));
        Jd.randInt = (Kd, Ld)=>Kd + Math.floor(Hd.random() * (1 + Ld - Kd))
        ;
        return Jd.gen();
    }
;
const shuffle = (Md, Nd, { qty  } = {
})=>Md.choose(typeof qty !== "undefined" ? qty : Nd.length, Nd)
;
const recurser = (Od, Pd)=>{
    const Qd = (Rd, Sd)=>{
        if (Sd === undefined) {
            Sd = Rd;
        }
        if (Rd === null || Rd === undefined) {
            return Rd;
        } else if (Rd.constructor === Array) {
            return Rd.map((Td)=>Qd(Td, Sd)
            );
        } else if (Rd.constructor === Object) {
            if (Od(Rd, Sd)) {
                return Pd(Rd, Sd);
            } else {
                Object.entries(Rd).forEach(([Ud, Vd])=>{
                    Rd[Ud] = Qd(Vd, Sd);
                });
                return Rd;
            }
        } else {
            return Rd;
        }
    };
    return Qd;
};
const transformer = recurser((Wd)=>Wd.fiona
, (Xd)=>{
    if (Xd.fiona.constructor === Array) {
        return (Yd)=>Yd[Xd.fiona[0]](...Xd.fiona.slice(1).map(transformer))
        ;
    } else {
        return (Zd)=>Zd[Xd.fiona]()
        ;
    }
});
const fromJSON = ($d, _d)=>$d.object(transformer(_d))
;
const __default3 = (ae)=>{
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
        regex(ae)
    ], [
        "shuffle", shuffle], [
        "import", fromJSON]);
    Fiona.namedata = namedata1;
    return Fiona;
};
var f = Object.create;
var g = Object.defineProperty;
var v = Object.getOwnPropertyDescriptor;
var d = Object.getOwnPropertyNames;
var p = Object.getPrototypeOf, m = Object.prototype.hasOwnProperty;
var M = (be)=>g(be, "__esModule", {
        value: !0
    })
;
var x = (ce, de)=>()=>(de || ce((de = {
            exports: {
            }
        }).exports, de), de.exports)
;
var E = (ee, fe, ge)=>{
    if (fe && typeof fe == "object" || typeof fe == "function") for (let he of d(fe))!m.call(ee, he) && he !== "default" && g(ee, he, {
        get: ()=>fe[he]
        ,
        enumerable: !(ge = v(fe, he)) || ge.enumerable
    });
    return ee;
}, _ = (ie)=>E(M(g(ie != null ? f(p(ie)) : {
    }, "default", ie && ie.__esModule && "default" in ie ? {
        get: ()=>ie.default
        ,
        enumerable: !0
    } : {
        value: ie,
        enumerable: !0
    })), ie)
;
var w = x((je, ke)=>{
    "use strict";
    var le = class _class {
        overlaps(me) {
            return !(this.high < me.low || this.low > me.high);
        }
        touches(ne) {
            return !(this.high + 1 < ne.low || this.low - 1 > ne.high);
        }
        add(pe) {
            return new le(Math.min(this.low, pe.low), Math.max(this.high, pe.high));
        }
        subtract(qe) {
            return qe.low <= this.low && qe.high >= this.high ? [] : qe.low > this.low && qe.high < this.high ? [
                new le(this.low, qe.low - 1),
                new le(qe.high + 1, this.high)
            ] : qe.low <= this.low ? [
                new le(qe.high + 1, this.high)
            ] : [
                new le(this.low, qe.low - 1)
            ];
        }
        toString() {
            return this.low == this.high ? this.low.toString() : this.low + "-" + this.high;
        }
        constructor(re, se){
            this.low = re, this.high = se, this.length = 1 + se - re;
        }
    }, te = class _class {
        _update_length() {
            this.length = this.ranges.reduce((ue, ve)=>ue + ve.length
            , 0);
        }
        add(we, xe) {
            var ye = (ze)=>{
                for(var Ae = 0; Ae < this.ranges.length && !ze.touches(this.ranges[Ae]);)Ae++;
                for(var Be = this.ranges.slice(0, Ae); Ae < this.ranges.length && ze.touches(this.ranges[Ae]);)ze = ze.add(this.ranges[Ae]), Ae++;
                Be.push(ze), this.ranges = Be.concat(this.ranges.slice(Ae)), this._update_length();
            };
            return we instanceof te ? we.ranges.forEach(ye) : (xe == null && (xe = we), ye(new le(we, xe))), this;
        }
        subtract(Ce, De) {
            var Ee = (Fe)=>{
                for(var Ge = 0; Ge < this.ranges.length && !Fe.overlaps(this.ranges[Ge]);)Ge++;
                for(var He = this.ranges.slice(0, Ge); Ge < this.ranges.length && Fe.overlaps(this.ranges[Ge]);)He = He.concat(this.ranges[Ge].subtract(Fe)), Ge++;
                this.ranges = He.concat(this.ranges.slice(Ge)), this._update_length();
            };
            return Ce instanceof te ? Ce.ranges.forEach(Ee) : (De == null && (De = Ce), Ee(new le(Ce, De))), this;
        }
        intersect(Ie, Je) {
            var Ke = [], Le = (Me)=>{
                for(var Ne = 0; Ne < this.ranges.length && !Me.overlaps(this.ranges[Ne]);)Ne++;
                for(; Ne < this.ranges.length && Me.overlaps(this.ranges[Ne]);){
                    var Oe = Math.max(this.ranges[Ne].low, Me.low), Pe = Math.min(this.ranges[Ne].high, Me.high);
                    Ke.push(new le(Oe, Pe)), Ne++;
                }
            };
            return Ie instanceof te ? Ie.ranges.forEach(Le) : (Je == null && (Je = Ie), Le(new le(Ie, Je))), this.ranges = Ke, this._update_length(), this;
        }
        index(Qe) {
            for(var Re = 0; Re < this.ranges.length && this.ranges[Re].length <= Qe;)Qe -= this.ranges[Re].length, Re++;
            return this.ranges[Re].low + Qe;
        }
        toString() {
            return "[ " + this.ranges.join(", ") + " ]";
        }
        clone() {
            return new te(this);
        }
        numbers() {
            return this.ranges.reduce((Se, Te)=>{
                for(var Ue = Te.low; Ue <= Te.high;)Se.push(Ue), Ue++;
                return Se;
            }, []);
        }
        subranges() {
            return this.ranges.map((Ve)=>({
                    low: Ve.low,
                    high: Ve.high,
                    length: 1 + Ve.high - Ve.low
                })
            );
        }
        constructor(We, Xe){
            this.ranges = [], this.length = 0, We != null && this.add(We, Xe);
        }
    };
    ke.exports = te;
});
var j = _(w());
var export_default = j.default;
var L = Object.create;
var N = Object.defineProperty;
var _1 = Object.getOwnPropertyDescriptor;
var z = Object.getOwnPropertyNames;
var Y = Object.getPrototypeOf, Z = Object.prototype.hasOwnProperty;
var J = (Ye)=>N(Ye, "__esModule", {
        value: !0
    })
;
var E1 = (Ze, $e)=>()=>($e || Ze(($e = {
            exports: {
            }
        }).exports, $e), $e.exports)
;
var K = (_e, af, bf)=>{
    if (af && typeof af == "object" || typeof af == "function") for (let cf of z(af))!Z.call(_e, cf) && cf !== "default" && N(_e, cf, {
        get: ()=>af[cf]
        ,
        enumerable: !(bf = _1(af, cf)) || bf.enumerable
    });
    return _e;
}, x1 = (df)=>K(J(N(df != null ? L(Y(df)) : {
    }, "default", df && df.__esModule && "default" in df ? {
        get: ()=>df.default
        ,
        enumerable: !0
    } : {
        value: df,
        enumerable: !0
    })), df)
;
var I = E1((ef, ff)=>{
    ff.exports = {
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
var S = E1((gf)=>{
    var hf = I(), jf = ()=>[
            {
                type: hf.RANGE,
                from: 48,
                to: 57
            }
        ]
    , kf = ()=>[
            {
                type: hf.CHAR,
                value: 95
            },
            {
                type: hf.RANGE,
                from: 97,
                to: 122
            },
            {
                type: hf.RANGE,
                from: 65,
                to: 90
            }
        ].concat(jf())
    , lf = ()=>[
            {
                type: hf.CHAR,
                value: 9
            },
            {
                type: hf.CHAR,
                value: 10
            },
            {
                type: hf.CHAR,
                value: 11
            },
            {
                type: hf.CHAR,
                value: 12
            },
            {
                type: hf.CHAR,
                value: 13
            },
            {
                type: hf.CHAR,
                value: 32
            },
            {
                type: hf.CHAR,
                value: 160
            },
            {
                type: hf.CHAR,
                value: 5760
            },
            {
                type: hf.RANGE,
                from: 8192,
                to: 8202
            },
            {
                type: hf.CHAR,
                value: 8232
            },
            {
                type: hf.CHAR,
                value: 8233
            },
            {
                type: hf.CHAR,
                value: 8239
            },
            {
                type: hf.CHAR,
                value: 8287
            },
            {
                type: hf.CHAR,
                value: 12288
            },
            {
                type: hf.CHAR,
                value: 65279
            }
        ]
    , mf = ()=>[
            {
                type: hf.CHAR,
                value: 10
            },
            {
                type: hf.CHAR,
                value: 13
            },
            {
                type: hf.CHAR,
                value: 8232
            },
            {
                type: hf.CHAR,
                value: 8233
            }
        ]
    ;
    gf.words = ()=>({
            type: hf.SET,
            set: kf(),
            not: !1
        })
    ;
    gf.notWords = ()=>({
            type: hf.SET,
            set: kf(),
            not: !0
        })
    ;
    gf.ints = ()=>({
            type: hf.SET,
            set: jf(),
            not: !1
        })
    ;
    gf.notInts = ()=>({
            type: hf.SET,
            set: jf(),
            not: !0
        })
    ;
    gf.whitespace = ()=>({
            type: hf.SET,
            set: lf(),
            not: !1
        })
    ;
    gf.notWhitespace = ()=>({
            type: hf.SET,
            set: lf(),
            not: !0
        })
    ;
    gf.anyChar = ()=>({
            type: hf.SET,
            set: mf(),
            not: !0
        })
    ;
});
var F = E1((nf)=>{
    var of = I(), pf = S(), qf = "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?", rf = {
        "0": 0,
        t: 9,
        n: 10,
        v: 11,
        f: 12,
        r: 13
    };
    nf.strToChars = function(sf) {
        var tf = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z[\\\]^?])|([0tnvfr]))/g;
        return sf = sf.replace(tf, function(uf, vf, wf, xf, yf, zf, Af, Bf) {
            if (wf) return uf;
            var Cf = vf ? 8 : xf ? parseInt(xf, 16) : yf ? parseInt(yf, 16) : zf ? parseInt(zf, 8) : Af ? qf.indexOf(Af) : rf[Bf], Df = String.fromCharCode(Cf);
            return /[[\]{}^$.|?*+()]/.test(Df) && (Df = "\\" + Df), Df;
        }), sf;
    };
    nf.tokenizeClass = (Ef, Ff)=>{
        for(var Gf = [], Hf = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?([^])/g, If, Jf; (If = Hf.exec(Ef)) != null;)if (If[1]) Gf.push(pf.words());
        else if (If[2]) Gf.push(pf.ints());
        else if (If[3]) Gf.push(pf.whitespace());
        else if (If[4]) Gf.push(pf.notWords());
        else if (If[5]) Gf.push(pf.notInts());
        else if (If[6]) Gf.push(pf.notWhitespace());
        else if (If[7]) Gf.push({
            type: of.RANGE,
            from: (If[8] || If[9]).charCodeAt(0),
            to: If[10].charCodeAt(0)
        });
        else if (Jf = If[12]) Gf.push({
            type: of.CHAR,
            value: Jf.charCodeAt(0)
        });
        else return [
            Gf,
            Hf.lastIndex
        ];
        nf.error(Ff, "Unterminated character class");
    };
    nf.error = (Kf, Lf)=>{
        throw new SyntaxError("Invalid regular expression: /" + Kf + "/: " + Lf);
    };
});
var U = E1((Mf)=>{
    var Nf = I();
    Mf.wordBoundary = ()=>({
            type: Nf.POSITION,
            value: "b"
        })
    ;
    Mf.nonWordBoundary = ()=>({
            type: Nf.POSITION,
            value: "B"
        })
    ;
    Mf.begin = ()=>({
            type: Nf.POSITION,
            value: "^"
        })
    ;
    Mf.end = ()=>({
            type: Nf.POSITION,
            value: "$"
        })
    ;
});
var P = E1((Of, Pf)=>{
    var Qf = F(), Rf = I(), Sf = S(), Tf = U();
    Pf.exports = (Uf)=>{
        var Vf = 0, Wf, Xf, Yf = {
            type: Rf.ROOT,
            stack: []
        }, Zf = Yf, $f = Yf.stack, _f = [], ag = (bg)=>{
            Qf.error(Uf, `Nothing to repeat at column ${bg - 1}`);
        }, cg = Qf.strToChars(Uf);
        for(Wf = cg.length; Vf < Wf;)switch(Xf = cg[Vf++], Xf){
            case "\\":
                switch(Xf = cg[Vf++], Xf){
                    case "b":
                        $f.push(Tf.wordBoundary());
                        break;
                    case "B":
                        $f.push(Tf.nonWordBoundary());
                        break;
                    case "w":
                        $f.push(Sf.words());
                        break;
                    case "W":
                        $f.push(Sf.notWords());
                        break;
                    case "d":
                        $f.push(Sf.ints());
                        break;
                    case "D":
                        $f.push(Sf.notInts());
                        break;
                    case "s":
                        $f.push(Sf.whitespace());
                        break;
                    case "S":
                        $f.push(Sf.notWhitespace());
                        break;
                    default:
                        /\d/.test(Xf) ? $f.push({
                            type: Rf.REFERENCE,
                            value: parseInt(Xf, 10)
                        }) : $f.push({
                            type: Rf.CHAR,
                            value: Xf.charCodeAt(0)
                        });
                }
                break;
            case "^":
                $f.push(Tf.begin());
                break;
            case "$":
                $f.push(Tf.end());
                break;
            case "[":
                var dg;
                cg[Vf] === "^" ? (dg = !0, Vf++) : dg = !1;
                var eg = Qf.tokenizeClass(cg.slice(Vf), Uf);
                Vf += eg[1], $f.push({
                    type: Rf.SET,
                    set: eg[0],
                    not: dg
                });
                break;
            case ".":
                $f.push(Sf.anyChar());
                break;
            case "(":
                var fg = {
                    type: Rf.GROUP,
                    stack: [],
                    remember: !0
                };
                Xf = cg[Vf], Xf === "?" && (Xf = cg[Vf + 1], Vf += 2, Xf === "=" ? fg.followedBy = !0 : Xf === "!" ? fg.notFollowedBy = !0 : Xf !== ":" && Qf.error(Uf, `Invalid group, character '${Xf}' after '?' at column ${Vf - 1}`), fg.remember = !1), $f.push(fg), _f.push(Zf), Zf = fg, $f = fg.stack;
                break;
            case ")":
                _f.length === 0 && Qf.error(Uf, `Unmatched ) at column ${Vf - 1}`), Zf = _f.pop(), $f = Zf.options ? Zf.options[Zf.options.length - 1] : Zf.stack;
                break;
            case "|":
                Zf.options || (Zf.options = [
                    Zf.stack
                ], delete Zf.stack);
                var gg = [];
                Zf.options.push(gg), $f = gg;
                break;
            case "{":
                var hg = /^(\d+)(,(\d+)?)?\}/.exec(cg.slice(Vf)), ig, jg;
                hg !== null ? ($f.length === 0 && ag(Vf), ig = parseInt(hg[1], 10), jg = hg[2] ? hg[3] ? parseInt(hg[3], 10) : 1 / 0 : ig, Vf += hg[0].length, $f.push({
                    type: Rf.REPETITION,
                    min: ig,
                    max: jg,
                    value: $f.pop()
                })) : $f.push({
                    type: Rf.CHAR,
                    value: 123
                });
                break;
            case "?":
                $f.length === 0 && ag(Vf), $f.push({
                    type: Rf.REPETITION,
                    min: 0,
                    max: 1,
                    value: $f.pop()
                });
                break;
            case "+":
                $f.length === 0 && ag(Vf), $f.push({
                    type: Rf.REPETITION,
                    min: 1,
                    max: 1 / 0,
                    value: $f.pop()
                });
                break;
            case "*":
                $f.length === 0 && ag(Vf), $f.push({
                    type: Rf.REPETITION,
                    min: 0,
                    max: 1 / 0,
                    value: $f.pop()
                });
                break;
            default:
                $f.push({
                    type: Rf.CHAR,
                    value: Xf.charCodeAt(0)
                });
        }
        return _f.length !== 0 && Qf.error(Uf, "Unterminated group"), Yf;
    };
    Pf.exports.types = Rf;
});
var X = x1(P()), j1 = x1(P()), { types: oe  } = X;
var export_default1 = j1.default;
var C = Object.create;
var o = Object.defineProperty;
var y = Object.getOwnPropertyDescriptor;
var E2 = Object.getOwnPropertyNames;
var x2 = Object.getPrototypeOf, I1 = Object.prototype.hasOwnProperty;
var w1 = (kg)=>o(kg, "__esModule", {
        value: !0
    })
;
((lg)=>typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy(lg, {
        get: (mg, ng)=>(typeof require != "undefined" ? require : mg)[ng]
    }) : lg
)(function(og) {
    if (typeof require != "undefined") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + og + '" is not supported');
});
var O = (pg, qg)=>()=>(qg || pg((qg = {
            exports: {
            }
        }).exports, qg), qg.exports)
;
var v1 = (rg, sg, tg)=>{
    if (sg && typeof sg == "object" || typeof sg == "function") for (let ug of E2(sg))!I1.call(rg, ug) && ug !== "default" && o(rg, ug, {
        get: ()=>sg[ug]
        ,
        enumerable: !(tg = y(sg, ug)) || tg.enumerable
    });
    return rg;
}, _2 = (vg)=>v1(w1(o(vg != null ? C(x2(vg)) : {
    }, "default", vg && vg.__esModule && "default" in vg ? {
        get: ()=>vg.default
        ,
        enumerable: !0
    } : {
        value: vg,
        enumerable: !0
    })), vg)
;
var c = O((wg, xg)=>{
    var yg = export_default1, zg = export_default, Ag = yg.types;
    xg.exports = class h {
        _setDefaults(Bg) {
            this.max = Bg.max != null ? Bg.max : h.prototype.max != null ? h.prototype.max : 100, this.defaultRange = Bg.defaultRange ? Bg.defaultRange : this.defaultRange.clone(), Bg.randInt && (this.randInt = Bg.randInt);
        }
        gen() {
            return this._gen(this.tokens, []);
        }
        _gen(Cg, Dg) {
            var Eg, Fg, Gg, Hg, Ig;
            switch(Cg.type){
                case Ag.ROOT:
                case Ag.GROUP:
                    if (Cg.followedBy || Cg.notFollowedBy) return "";
                    for(Cg.remember && Cg.groupNumber === void 0 && (Cg.groupNumber = Dg.push(null) - 1), Eg = Cg.options ? this._randSelect(Cg.options) : Cg.stack, Fg = "", Hg = 0, Ig = Eg.length; Hg < Ig; Hg++)Fg += this._gen(Eg[Hg], Dg);
                    return Cg.remember && (Dg[Cg.groupNumber] = Fg), Fg;
                case Ag.POSITION:
                    return "";
                case Ag.SET:
                    var Jg = this._expand(Cg);
                    return Jg.length ? String.fromCharCode(this._randSelect(Jg)) : "";
                case Ag.REPETITION:
                    for(Gg = this.randInt(Cg.min, Cg.max === 1 / 0 ? Cg.min + this.max : Cg.max), Fg = "", Hg = 0; Hg < Gg; Hg++)Fg += this._gen(Cg.value, Dg);
                    return Fg;
                case Ag.REFERENCE:
                    return Dg[Cg.value - 1] || "";
                case Ag.CHAR:
                    var Kg = this.ignoreCase && this._randBool() ? this._toOtherCase(Cg.value) : Cg.value;
                    return String.fromCharCode(Kg);
            }
        }
        _toOtherCase(Lg) {
            return Lg + (97 <= Lg && Lg <= 122 ? -32 : 65 <= Lg && Lg <= 90 ? 32 : 0);
        }
        _randBool() {
            return !this.randInt(0, 1);
        }
        _randSelect(Mg) {
            return Mg instanceof zg ? Mg.index(this.randInt(0, Mg.length - 1)) : Mg[this.randInt(0, Mg.length - 1)];
        }
        _expand(Ng) {
            if (Ng.type === yg.types.CHAR) return new zg(Ng.value);
            if (Ng.type === yg.types.RANGE) return new zg(Ng.from, Ng.to);
            {
                let Og = new zg;
                for(let Pg = 0; Pg < Ng.set.length; Pg++){
                    let Qg = this._expand(Ng.set[Pg]);
                    if (Og.add(Qg), this.ignoreCase) for(let Rg = 0; Rg < Qg.length; Rg++){
                        let Sg = Qg.index(Rg), Tg = this._toOtherCase(Sg);
                        Sg !== Tg && Og.add(Tg);
                    }
                }
                return Ng.not ? this.defaultRange.clone().subtract(Og) : this.defaultRange.clone().intersect(Og);
            }
        }
        randInt(Ug, Vg) {
            return Ug + Math.floor(Math.random() * (1 + Vg - Ug));
        }
        get defaultRange() {
            return this._range = this._range || new zg(32, 126);
        }
        set defaultRange(Wg) {
            this._range = Wg;
        }
        static randexp(Xg, Yg) {
            var Zg;
            return typeof Xg == "string" && (Xg = new RegExp(Xg, Yg)), Xg._randexp === void 0 ? (Zg = new h(Xg, Yg), Xg._randexp = Zg) : (Zg = Xg._randexp, Zg._setDefaults(Xg)), Zg.gen();
        }
        static sugar() {
            RegExp.prototype.gen = function() {
                return h.randexp(this);
            };
        }
        constructor($g, _g){
            if (this._setDefaults($g), $g instanceof RegExp) this.ignoreCase = $g.ignoreCase, this.multiline = $g.multiline, $g = $g.source;
            else if (typeof $g == "string") this.ignoreCase = _g && _g.indexOf("i") !== -1, this.multiline = _g && _g.indexOf("m") !== -1;
            else throw new Error("Expected a regexp or string");
            this.tokens = yg($g);
        }
    };
});
var b = _2(c()), N1 = _2(c()), { randexp: B , sugar: D  } = b;
var export_default4 = N1.default;
const Fiona1 = __default3(export_default4);
return Fiona1;
});
