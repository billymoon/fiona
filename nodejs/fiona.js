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
    version: "4.0.0-alpha.10"
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
const recurser = (Pd, Qd)=>{
    const Rd = (Sd, Td)=>{
        if (Td === undefined) {
            Td = Sd;
        }
        if (Sd === null || Sd === undefined) {
            return Sd;
        } else if (Sd.constructor === Array) {
            return Sd.map((Ud)=>Rd(Ud, Td)
            );
        } else if (Sd.constructor === Object) {
            if (Pd(Sd, Td)) {
                return Qd(Sd, Td);
            } else {
                Object.entries(Sd).forEach(([Vd, Wd])=>{
                    Sd[Vd] = Rd(Wd, Td);
                });
                return Sd;
            }
        } else {
            return Sd;
        }
    };
    return Rd;
};
const transformer = recurser((Xd)=>Xd.fiona
, (Yd)=>{
    if (Yd.fiona.constructor === Array) {
        return (Zd)=>Zd[Yd.fiona[0]](...Yd.fiona.slice(1).map(transformer))
        ;
    } else {
        return ($d)=>$d[Yd.fiona]()
        ;
    }
});
const fromJSON = (_d, ae)=>_d.object(transformer(ae))
;
const __default3 = (be)=>{
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
        regex(be)
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
var M = (ce)=>g(ce, "__esModule", {
        value: !0
    })
;
var x = (de, ee)=>()=>(ee || de((ee = {
            exports: {
            }
        }).exports, ee), ee.exports)
;
var E = (fe, ge, he)=>{
    if (ge && typeof ge == "object" || typeof ge == "function") for (let ie of d(ge))!m.call(fe, ie) && ie !== "default" && g(fe, ie, {
        get: ()=>ge[ie]
        ,
        enumerable: !(he = v(ge, ie)) || he.enumerable
    });
    return fe;
}, _ = (je)=>E(M(g(je != null ? f(p(je)) : {
    }, "default", je && je.__esModule && "default" in je ? {
        get: ()=>je.default
        ,
        enumerable: !0
    } : {
        value: je,
        enumerable: !0
    })), je)
;
var w = x((ke, le)=>{
    "use strict";
    var me = class _class {
        overlaps(ne) {
            return !(this.high < ne.low || this.low > ne.high);
        }
        touches(pe) {
            return !(this.high + 1 < pe.low || this.low - 1 > pe.high);
        }
        add(qe) {
            return new me(Math.min(this.low, qe.low), Math.max(this.high, qe.high));
        }
        subtract(re) {
            return re.low <= this.low && re.high >= this.high ? [] : re.low > this.low && re.high < this.high ? [
                new me(this.low, re.low - 1),
                new me(re.high + 1, this.high)
            ] : re.low <= this.low ? [
                new me(re.high + 1, this.high)
            ] : [
                new me(this.low, re.low - 1)
            ];
        }
        toString() {
            return this.low == this.high ? this.low.toString() : this.low + "-" + this.high;
        }
        constructor(se, te){
            this.low = se, this.high = te, this.length = 1 + te - se;
        }
    }, ue = class _class {
        _update_length() {
            this.length = this.ranges.reduce((ve, we)=>ve + we.length
            , 0);
        }
        add(xe, ye) {
            var ze = (Ae)=>{
                for(var Be = 0; Be < this.ranges.length && !Ae.touches(this.ranges[Be]);)Be++;
                for(var Ce = this.ranges.slice(0, Be); Be < this.ranges.length && Ae.touches(this.ranges[Be]);)Ae = Ae.add(this.ranges[Be]), Be++;
                Ce.push(Ae), this.ranges = Ce.concat(this.ranges.slice(Be)), this._update_length();
            };
            return xe instanceof ue ? xe.ranges.forEach(ze) : (ye == null && (ye = xe), ze(new me(xe, ye))), this;
        }
        subtract(De, Ee) {
            var Fe = (Ge)=>{
                for(var He = 0; He < this.ranges.length && !Ge.overlaps(this.ranges[He]);)He++;
                for(var Ie = this.ranges.slice(0, He); He < this.ranges.length && Ge.overlaps(this.ranges[He]);)Ie = Ie.concat(this.ranges[He].subtract(Ge)), He++;
                this.ranges = Ie.concat(this.ranges.slice(He)), this._update_length();
            };
            return De instanceof ue ? De.ranges.forEach(Fe) : (Ee == null && (Ee = De), Fe(new me(De, Ee))), this;
        }
        intersect(Je, Ke) {
            var Le = [], Me = (Ne)=>{
                for(var Oe = 0; Oe < this.ranges.length && !Ne.overlaps(this.ranges[Oe]);)Oe++;
                for(; Oe < this.ranges.length && Ne.overlaps(this.ranges[Oe]);){
                    var Pe = Math.max(this.ranges[Oe].low, Ne.low), Qe = Math.min(this.ranges[Oe].high, Ne.high);
                    Le.push(new me(Pe, Qe)), Oe++;
                }
            };
            return Je instanceof ue ? Je.ranges.forEach(Me) : (Ke == null && (Ke = Je), Me(new me(Je, Ke))), this.ranges = Le, this._update_length(), this;
        }
        index(Re) {
            for(var Se = 0; Se < this.ranges.length && this.ranges[Se].length <= Re;)Re -= this.ranges[Se].length, Se++;
            return this.ranges[Se].low + Re;
        }
        toString() {
            return "[ " + this.ranges.join(", ") + " ]";
        }
        clone() {
            return new ue(this);
        }
        numbers() {
            return this.ranges.reduce((Te, Ue)=>{
                for(var Ve = Ue.low; Ve <= Ue.high;)Te.push(Ve), Ve++;
                return Te;
            }, []);
        }
        subranges() {
            return this.ranges.map((We)=>({
                    low: We.low,
                    high: We.high,
                    length: 1 + We.high - We.low
                })
            );
        }
        constructor(Xe, Ye){
            this.ranges = [], this.length = 0, Xe != null && this.add(Xe, Ye);
        }
    };
    le.exports = ue;
});
var j = _(w());
var export_default = j.default;
var L = Object.create;
var N = Object.defineProperty;
var _1 = Object.getOwnPropertyDescriptor;
var z = Object.getOwnPropertyNames;
var Y = Object.getPrototypeOf, Z = Object.prototype.hasOwnProperty;
var J = (Ze)=>N(Ze, "__esModule", {
        value: !0
    })
;
var E1 = ($e, _e)=>()=>(_e || $e((_e = {
            exports: {
            }
        }).exports, _e), _e.exports)
;
var K = (af, bf, cf)=>{
    if (bf && typeof bf == "object" || typeof bf == "function") for (let df of z(bf))!Z.call(af, df) && df !== "default" && N(af, df, {
        get: ()=>bf[df]
        ,
        enumerable: !(cf = _1(bf, df)) || cf.enumerable
    });
    return af;
}, x1 = (ef)=>K(J(N(ef != null ? L(Y(ef)) : {
    }, "default", ef && ef.__esModule && "default" in ef ? {
        get: ()=>ef.default
        ,
        enumerable: !0
    } : {
        value: ef,
        enumerable: !0
    })), ef)
;
var I = E1((ff, gf)=>{
    gf.exports = {
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
var S = E1((hf)=>{
    var jf = I(), kf = ()=>[
            {
                type: jf.RANGE,
                from: 48,
                to: 57
            }
        ]
    , lf = ()=>[
            {
                type: jf.CHAR,
                value: 95
            },
            {
                type: jf.RANGE,
                from: 97,
                to: 122
            },
            {
                type: jf.RANGE,
                from: 65,
                to: 90
            }
        ].concat(kf())
    , mf = ()=>[
            {
                type: jf.CHAR,
                value: 9
            },
            {
                type: jf.CHAR,
                value: 10
            },
            {
                type: jf.CHAR,
                value: 11
            },
            {
                type: jf.CHAR,
                value: 12
            },
            {
                type: jf.CHAR,
                value: 13
            },
            {
                type: jf.CHAR,
                value: 32
            },
            {
                type: jf.CHAR,
                value: 160
            },
            {
                type: jf.CHAR,
                value: 5760
            },
            {
                type: jf.RANGE,
                from: 8192,
                to: 8202
            },
            {
                type: jf.CHAR,
                value: 8232
            },
            {
                type: jf.CHAR,
                value: 8233
            },
            {
                type: jf.CHAR,
                value: 8239
            },
            {
                type: jf.CHAR,
                value: 8287
            },
            {
                type: jf.CHAR,
                value: 12288
            },
            {
                type: jf.CHAR,
                value: 65279
            }
        ]
    , nf = ()=>[
            {
                type: jf.CHAR,
                value: 10
            },
            {
                type: jf.CHAR,
                value: 13
            },
            {
                type: jf.CHAR,
                value: 8232
            },
            {
                type: jf.CHAR,
                value: 8233
            }
        ]
    ;
    hf.words = ()=>({
            type: jf.SET,
            set: lf(),
            not: !1
        })
    ;
    hf.notWords = ()=>({
            type: jf.SET,
            set: lf(),
            not: !0
        })
    ;
    hf.ints = ()=>({
            type: jf.SET,
            set: kf(),
            not: !1
        })
    ;
    hf.notInts = ()=>({
            type: jf.SET,
            set: kf(),
            not: !0
        })
    ;
    hf.whitespace = ()=>({
            type: jf.SET,
            set: mf(),
            not: !1
        })
    ;
    hf.notWhitespace = ()=>({
            type: jf.SET,
            set: mf(),
            not: !0
        })
    ;
    hf.anyChar = ()=>({
            type: jf.SET,
            set: nf(),
            not: !0
        })
    ;
});
var F = E1((of)=>{
    var pf = I(), qf = S(), rf = "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?", sf = {
        "0": 0,
        t: 9,
        n: 10,
        v: 11,
        f: 12,
        r: 13
    };
    of.strToChars = function(tf) {
        var uf = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z[\\\]^?])|([0tnvfr]))/g;
        return tf = tf.replace(uf, function(vf, wf, xf, yf, zf, Af, Bf, Cf) {
            if (xf) return vf;
            var Df = wf ? 8 : yf ? parseInt(yf, 16) : zf ? parseInt(zf, 16) : Af ? parseInt(Af, 8) : Bf ? rf.indexOf(Bf) : sf[Cf], Ef = String.fromCharCode(Df);
            return /[[\]{}^$.|?*+()]/.test(Ef) && (Ef = "\\" + Ef), Ef;
        }), tf;
    };
    of.tokenizeClass = (Ff, Gf)=>{
        for(var Hf = [], If = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?([^])/g, Jf, Kf; (Jf = If.exec(Ff)) != null;)if (Jf[1]) Hf.push(qf.words());
        else if (Jf[2]) Hf.push(qf.ints());
        else if (Jf[3]) Hf.push(qf.whitespace());
        else if (Jf[4]) Hf.push(qf.notWords());
        else if (Jf[5]) Hf.push(qf.notInts());
        else if (Jf[6]) Hf.push(qf.notWhitespace());
        else if (Jf[7]) Hf.push({
            type: pf.RANGE,
            from: (Jf[8] || Jf[9]).charCodeAt(0),
            to: Jf[10].charCodeAt(0)
        });
        else if (Kf = Jf[12]) Hf.push({
            type: pf.CHAR,
            value: Kf.charCodeAt(0)
        });
        else return [
            Hf,
            If.lastIndex
        ];
        of.error(Gf, "Unterminated character class");
    };
    of.error = (Lf, Mf)=>{
        throw new SyntaxError("Invalid regular expression: /" + Lf + "/: " + Mf);
    };
});
var U = E1((Nf)=>{
    var Of = I();
    Nf.wordBoundary = ()=>({
            type: Of.POSITION,
            value: "b"
        })
    ;
    Nf.nonWordBoundary = ()=>({
            type: Of.POSITION,
            value: "B"
        })
    ;
    Nf.begin = ()=>({
            type: Of.POSITION,
            value: "^"
        })
    ;
    Nf.end = ()=>({
            type: Of.POSITION,
            value: "$"
        })
    ;
});
var P = E1((Pf, Qf)=>{
    var Rf = F(), Sf = I(), Tf = S(), Uf = U();
    Qf.exports = (Vf)=>{
        var Wf = 0, Xf, Yf, Zf = {
            type: Sf.ROOT,
            stack: []
        }, $f = Zf, _f = Zf.stack, ag = [], bg = (cg)=>{
            Rf.error(Vf, `Nothing to repeat at column ${cg - 1}`);
        }, dg = Rf.strToChars(Vf);
        for(Xf = dg.length; Wf < Xf;)switch(Yf = dg[Wf++], Yf){
            case "\\":
                switch(Yf = dg[Wf++], Yf){
                    case "b":
                        _f.push(Uf.wordBoundary());
                        break;
                    case "B":
                        _f.push(Uf.nonWordBoundary());
                        break;
                    case "w":
                        _f.push(Tf.words());
                        break;
                    case "W":
                        _f.push(Tf.notWords());
                        break;
                    case "d":
                        _f.push(Tf.ints());
                        break;
                    case "D":
                        _f.push(Tf.notInts());
                        break;
                    case "s":
                        _f.push(Tf.whitespace());
                        break;
                    case "S":
                        _f.push(Tf.notWhitespace());
                        break;
                    default:
                        /\d/.test(Yf) ? _f.push({
                            type: Sf.REFERENCE,
                            value: parseInt(Yf, 10)
                        }) : _f.push({
                            type: Sf.CHAR,
                            value: Yf.charCodeAt(0)
                        });
                }
                break;
            case "^":
                _f.push(Uf.begin());
                break;
            case "$":
                _f.push(Uf.end());
                break;
            case "[":
                var eg;
                dg[Wf] === "^" ? (eg = !0, Wf++) : eg = !1;
                var fg = Rf.tokenizeClass(dg.slice(Wf), Vf);
                Wf += fg[1], _f.push({
                    type: Sf.SET,
                    set: fg[0],
                    not: eg
                });
                break;
            case ".":
                _f.push(Tf.anyChar());
                break;
            case "(":
                var gg = {
                    type: Sf.GROUP,
                    stack: [],
                    remember: !0
                };
                Yf = dg[Wf], Yf === "?" && (Yf = dg[Wf + 1], Wf += 2, Yf === "=" ? gg.followedBy = !0 : Yf === "!" ? gg.notFollowedBy = !0 : Yf !== ":" && Rf.error(Vf, `Invalid group, character '${Yf}' after '?' at column ${Wf - 1}`), gg.remember = !1), _f.push(gg), ag.push($f), $f = gg, _f = gg.stack;
                break;
            case ")":
                ag.length === 0 && Rf.error(Vf, `Unmatched ) at column ${Wf - 1}`), $f = ag.pop(), _f = $f.options ? $f.options[$f.options.length - 1] : $f.stack;
                break;
            case "|":
                $f.options || ($f.options = [
                    $f.stack
                ], delete $f.stack);
                var hg = [];
                $f.options.push(hg), _f = hg;
                break;
            case "{":
                var ig = /^(\d+)(,(\d+)?)?\}/.exec(dg.slice(Wf)), jg, kg;
                ig !== null ? (_f.length === 0 && bg(Wf), jg = parseInt(ig[1], 10), kg = ig[2] ? ig[3] ? parseInt(ig[3], 10) : 1 / 0 : jg, Wf += ig[0].length, _f.push({
                    type: Sf.REPETITION,
                    min: jg,
                    max: kg,
                    value: _f.pop()
                })) : _f.push({
                    type: Sf.CHAR,
                    value: 123
                });
                break;
            case "?":
                _f.length === 0 && bg(Wf), _f.push({
                    type: Sf.REPETITION,
                    min: 0,
                    max: 1,
                    value: _f.pop()
                });
                break;
            case "+":
                _f.length === 0 && bg(Wf), _f.push({
                    type: Sf.REPETITION,
                    min: 1,
                    max: 1 / 0,
                    value: _f.pop()
                });
                break;
            case "*":
                _f.length === 0 && bg(Wf), _f.push({
                    type: Sf.REPETITION,
                    min: 0,
                    max: 1 / 0,
                    value: _f.pop()
                });
                break;
            default:
                _f.push({
                    type: Sf.CHAR,
                    value: Yf.charCodeAt(0)
                });
        }
        return ag.length !== 0 && Rf.error(Vf, "Unterminated group"), Zf;
    };
    Qf.exports.types = Sf;
});
var X = x1(P()), j1 = x1(P()), { types: oe  } = X;
var export_default1 = j1.default;
var C = Object.create;
var o = Object.defineProperty;
var y = Object.getOwnPropertyDescriptor;
var E2 = Object.getOwnPropertyNames;
var x2 = Object.getPrototypeOf, I1 = Object.prototype.hasOwnProperty;
var w1 = (lg)=>o(lg, "__esModule", {
        value: !0
    })
;
((mg)=>typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy(mg, {
        get: (ng, og)=>(typeof require != "undefined" ? require : ng)[og]
    }) : mg
)(function(pg) {
    if (typeof require != "undefined") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + pg + '" is not supported');
});
var O = (qg, rg)=>()=>(rg || qg((rg = {
            exports: {
            }
        }).exports, rg), rg.exports)
;
var v1 = (sg, tg, ug)=>{
    if (tg && typeof tg == "object" || typeof tg == "function") for (let vg of E2(tg))!I1.call(sg, vg) && vg !== "default" && o(sg, vg, {
        get: ()=>tg[vg]
        ,
        enumerable: !(ug = y(tg, vg)) || ug.enumerable
    });
    return sg;
}, _2 = (wg)=>v1(w1(o(wg != null ? C(x2(wg)) : {
    }, "default", wg && wg.__esModule && "default" in wg ? {
        get: ()=>wg.default
        ,
        enumerable: !0
    } : {
        value: wg,
        enumerable: !0
    })), wg)
;
var c = O((xg, yg)=>{
    var zg = export_default1, Ag = export_default, Bg = zg.types;
    yg.exports = class h {
        _setDefaults(Cg) {
            this.max = Cg.max != null ? Cg.max : h.prototype.max != null ? h.prototype.max : 100, this.defaultRange = Cg.defaultRange ? Cg.defaultRange : this.defaultRange.clone(), Cg.randInt && (this.randInt = Cg.randInt);
        }
        gen() {
            return this._gen(this.tokens, []);
        }
        _gen(Dg, Eg) {
            var Fg, Gg, Hg, Ig, Jg;
            switch(Dg.type){
                case Bg.ROOT:
                case Bg.GROUP:
                    if (Dg.followedBy || Dg.notFollowedBy) return "";
                    for(Dg.remember && Dg.groupNumber === void 0 && (Dg.groupNumber = Eg.push(null) - 1), Fg = Dg.options ? this._randSelect(Dg.options) : Dg.stack, Gg = "", Ig = 0, Jg = Fg.length; Ig < Jg; Ig++)Gg += this._gen(Fg[Ig], Eg);
                    return Dg.remember && (Eg[Dg.groupNumber] = Gg), Gg;
                case Bg.POSITION:
                    return "";
                case Bg.SET:
                    var Kg = this._expand(Dg);
                    return Kg.length ? String.fromCharCode(this._randSelect(Kg)) : "";
                case Bg.REPETITION:
                    for(Hg = this.randInt(Dg.min, Dg.max === 1 / 0 ? Dg.min + this.max : Dg.max), Gg = "", Ig = 0; Ig < Hg; Ig++)Gg += this._gen(Dg.value, Eg);
                    return Gg;
                case Bg.REFERENCE:
                    return Eg[Dg.value - 1] || "";
                case Bg.CHAR:
                    var Lg = this.ignoreCase && this._randBool() ? this._toOtherCase(Dg.value) : Dg.value;
                    return String.fromCharCode(Lg);
            }
        }
        _toOtherCase(Mg) {
            return Mg + (97 <= Mg && Mg <= 122 ? -32 : 65 <= Mg && Mg <= 90 ? 32 : 0);
        }
        _randBool() {
            return !this.randInt(0, 1);
        }
        _randSelect(Ng) {
            return Ng instanceof Ag ? Ng.index(this.randInt(0, Ng.length - 1)) : Ng[this.randInt(0, Ng.length - 1)];
        }
        _expand(Og) {
            if (Og.type === zg.types.CHAR) return new Ag(Og.value);
            if (Og.type === zg.types.RANGE) return new Ag(Og.from, Og.to);
            {
                let Pg = new Ag;
                for(let Qg = 0; Qg < Og.set.length; Qg++){
                    let Rg = this._expand(Og.set[Qg]);
                    if (Pg.add(Rg), this.ignoreCase) for(let Sg = 0; Sg < Rg.length; Sg++){
                        let Tg = Rg.index(Sg), Ug = this._toOtherCase(Tg);
                        Tg !== Ug && Pg.add(Ug);
                    }
                }
                return Og.not ? this.defaultRange.clone().subtract(Pg) : this.defaultRange.clone().intersect(Pg);
            }
        }
        randInt(Vg, Wg) {
            return Vg + Math.floor(Math.random() * (1 + Wg - Vg));
        }
        get defaultRange() {
            return this._range = this._range || new Ag(32, 126);
        }
        set defaultRange(Xg) {
            this._range = Xg;
        }
        static randexp(Yg, Zg) {
            var $g;
            return typeof Yg == "string" && (Yg = new RegExp(Yg, Zg)), Yg._randexp === void 0 ? ($g = new h(Yg, Zg), Yg._randexp = $g) : ($g = Yg._randexp, $g._setDefaults(Yg)), $g.gen();
        }
        static sugar() {
            RegExp.prototype.gen = function() {
                return h.randexp(this);
            };
        }
        constructor(_g, ah){
            if (this._setDefaults(_g), _g instanceof RegExp) this.ignoreCase = _g.ignoreCase, this.multiline = _g.multiline, _g = _g.source;
            else if (typeof _g == "string") this.ignoreCase = ah && ah.indexOf("i") !== -1, this.multiline = ah && ah.indexOf("m") !== -1;
            else throw new Error("Expected a regexp or string");
            this.tokens = zg(_g);
        }
    };
});
var b = _2(c()), N1 = _2(c()), { randexp: B , sugar: D  } = b;
var export_default4 = N1.default;
const Fiona1 = __default3(export_default4);
return Fiona1;
});
