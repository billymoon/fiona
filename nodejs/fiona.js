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
    version: "4.0.0-alpha.9"
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
const fromJSON = (_d, ae)=>{
    try {
        ae = JSON.parse(ae);
    } catch (be) {
        if (be.name !== 'SyntaxError') {
            throw Error(be);
        }
    }
    return _d.object(transformer(ae));
};
const __default3 = (ce)=>{
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
        regex(ce)
    ], [
        "shuffle", shuffle], [
        "fromJSON", fromJSON]);
    Fiona.namedata = namedata1;
    return Fiona;
};
var f = Object.create;
var g = Object.defineProperty;
var v = Object.getOwnPropertyDescriptor;
var d = Object.getOwnPropertyNames;
var p = Object.getPrototypeOf, m = Object.prototype.hasOwnProperty;
var M = (de)=>g(de, "__esModule", {
        value: !0
    })
;
var x = (ee, fe)=>()=>(fe || ee((fe = {
            exports: {
            }
        }).exports, fe), fe.exports)
;
var E = (ge, he, ie)=>{
    if (he && typeof he == "object" || typeof he == "function") for (let je of d(he))!m.call(ge, je) && je !== "default" && g(ge, je, {
        get: ()=>he[je]
        ,
        enumerable: !(ie = v(he, je)) || ie.enumerable
    });
    return ge;
}, _ = (ke)=>E(M(g(ke != null ? f(p(ke)) : {
    }, "default", ke && ke.__esModule && "default" in ke ? {
        get: ()=>ke.default
        ,
        enumerable: !0
    } : {
        value: ke,
        enumerable: !0
    })), ke)
;
var w = x((le, me)=>{
    "use strict";
    var ne = class _class {
        overlaps(pe) {
            return !(this.high < pe.low || this.low > pe.high);
        }
        touches(qe) {
            return !(this.high + 1 < qe.low || this.low - 1 > qe.high);
        }
        add(re) {
            return new ne(Math.min(this.low, re.low), Math.max(this.high, re.high));
        }
        subtract(se) {
            return se.low <= this.low && se.high >= this.high ? [] : se.low > this.low && se.high < this.high ? [
                new ne(this.low, se.low - 1),
                new ne(se.high + 1, this.high)
            ] : se.low <= this.low ? [
                new ne(se.high + 1, this.high)
            ] : [
                new ne(this.low, se.low - 1)
            ];
        }
        toString() {
            return this.low == this.high ? this.low.toString() : this.low + "-" + this.high;
        }
        constructor(te, ue){
            this.low = te, this.high = ue, this.length = 1 + ue - te;
        }
    }, ve = class _class {
        _update_length() {
            this.length = this.ranges.reduce((we, xe)=>we + xe.length
            , 0);
        }
        add(ye, ze) {
            var Ae = (Be)=>{
                for(var Ce = 0; Ce < this.ranges.length && !Be.touches(this.ranges[Ce]);)Ce++;
                for(var De = this.ranges.slice(0, Ce); Ce < this.ranges.length && Be.touches(this.ranges[Ce]);)Be = Be.add(this.ranges[Ce]), Ce++;
                De.push(Be), this.ranges = De.concat(this.ranges.slice(Ce)), this._update_length();
            };
            return ye instanceof ve ? ye.ranges.forEach(Ae) : (ze == null && (ze = ye), Ae(new ne(ye, ze))), this;
        }
        subtract(Ee, Fe) {
            var Ge = (He)=>{
                for(var Ie = 0; Ie < this.ranges.length && !He.overlaps(this.ranges[Ie]);)Ie++;
                for(var Je = this.ranges.slice(0, Ie); Ie < this.ranges.length && He.overlaps(this.ranges[Ie]);)Je = Je.concat(this.ranges[Ie].subtract(He)), Ie++;
                this.ranges = Je.concat(this.ranges.slice(Ie)), this._update_length();
            };
            return Ee instanceof ve ? Ee.ranges.forEach(Ge) : (Fe == null && (Fe = Ee), Ge(new ne(Ee, Fe))), this;
        }
        intersect(Ke, Le) {
            var Me = [], Ne = (Oe)=>{
                for(var Pe = 0; Pe < this.ranges.length && !Oe.overlaps(this.ranges[Pe]);)Pe++;
                for(; Pe < this.ranges.length && Oe.overlaps(this.ranges[Pe]);){
                    var Qe = Math.max(this.ranges[Pe].low, Oe.low), Re = Math.min(this.ranges[Pe].high, Oe.high);
                    Me.push(new ne(Qe, Re)), Pe++;
                }
            };
            return Ke instanceof ve ? Ke.ranges.forEach(Ne) : (Le == null && (Le = Ke), Ne(new ne(Ke, Le))), this.ranges = Me, this._update_length(), this;
        }
        index(Se) {
            for(var Te = 0; Te < this.ranges.length && this.ranges[Te].length <= Se;)Se -= this.ranges[Te].length, Te++;
            return this.ranges[Te].low + Se;
        }
        toString() {
            return "[ " + this.ranges.join(", ") + " ]";
        }
        clone() {
            return new ve(this);
        }
        numbers() {
            return this.ranges.reduce((Ue, Ve)=>{
                for(var We = Ve.low; We <= Ve.high;)Ue.push(We), We++;
                return Ue;
            }, []);
        }
        subranges() {
            return this.ranges.map((Xe)=>({
                    low: Xe.low,
                    high: Xe.high,
                    length: 1 + Xe.high - Xe.low
                })
            );
        }
        constructor(Ye, Ze){
            this.ranges = [], this.length = 0, Ye != null && this.add(Ye, Ze);
        }
    };
    me.exports = ve;
});
var j = _(w());
var export_default = j.default;
var L = Object.create;
var N = Object.defineProperty;
var _1 = Object.getOwnPropertyDescriptor;
var z = Object.getOwnPropertyNames;
var Y = Object.getPrototypeOf, Z = Object.prototype.hasOwnProperty;
var J = ($e)=>N($e, "__esModule", {
        value: !0
    })
;
var E1 = (_e, af)=>()=>(af || _e((af = {
            exports: {
            }
        }).exports, af), af.exports)
;
var K = (bf, cf, df)=>{
    if (cf && typeof cf == "object" || typeof cf == "function") for (let ef of z(cf))!Z.call(bf, ef) && ef !== "default" && N(bf, ef, {
        get: ()=>cf[ef]
        ,
        enumerable: !(df = _1(cf, ef)) || df.enumerable
    });
    return bf;
}, x1 = (ff)=>K(J(N(ff != null ? L(Y(ff)) : {
    }, "default", ff && ff.__esModule && "default" in ff ? {
        get: ()=>ff.default
        ,
        enumerable: !0
    } : {
        value: ff,
        enumerable: !0
    })), ff)
;
var I = E1((gf, hf)=>{
    hf.exports = {
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
var S = E1((jf)=>{
    var kf = I(), lf = ()=>[
            {
                type: kf.RANGE,
                from: 48,
                to: 57
            }
        ]
    , mf = ()=>[
            {
                type: kf.CHAR,
                value: 95
            },
            {
                type: kf.RANGE,
                from: 97,
                to: 122
            },
            {
                type: kf.RANGE,
                from: 65,
                to: 90
            }
        ].concat(lf())
    , nf = ()=>[
            {
                type: kf.CHAR,
                value: 9
            },
            {
                type: kf.CHAR,
                value: 10
            },
            {
                type: kf.CHAR,
                value: 11
            },
            {
                type: kf.CHAR,
                value: 12
            },
            {
                type: kf.CHAR,
                value: 13
            },
            {
                type: kf.CHAR,
                value: 32
            },
            {
                type: kf.CHAR,
                value: 160
            },
            {
                type: kf.CHAR,
                value: 5760
            },
            {
                type: kf.RANGE,
                from: 8192,
                to: 8202
            },
            {
                type: kf.CHAR,
                value: 8232
            },
            {
                type: kf.CHAR,
                value: 8233
            },
            {
                type: kf.CHAR,
                value: 8239
            },
            {
                type: kf.CHAR,
                value: 8287
            },
            {
                type: kf.CHAR,
                value: 12288
            },
            {
                type: kf.CHAR,
                value: 65279
            }
        ]
    , of = ()=>[
            {
                type: kf.CHAR,
                value: 10
            },
            {
                type: kf.CHAR,
                value: 13
            },
            {
                type: kf.CHAR,
                value: 8232
            },
            {
                type: kf.CHAR,
                value: 8233
            }
        ]
    ;
    jf.words = ()=>({
            type: kf.SET,
            set: mf(),
            not: !1
        })
    ;
    jf.notWords = ()=>({
            type: kf.SET,
            set: mf(),
            not: !0
        })
    ;
    jf.ints = ()=>({
            type: kf.SET,
            set: lf(),
            not: !1
        })
    ;
    jf.notInts = ()=>({
            type: kf.SET,
            set: lf(),
            not: !0
        })
    ;
    jf.whitespace = ()=>({
            type: kf.SET,
            set: nf(),
            not: !1
        })
    ;
    jf.notWhitespace = ()=>({
            type: kf.SET,
            set: nf(),
            not: !0
        })
    ;
    jf.anyChar = ()=>({
            type: kf.SET,
            set: of(),
            not: !0
        })
    ;
});
var F = E1((pf)=>{
    var qf = I(), rf = S(), sf = "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?", tf = {
        "0": 0,
        t: 9,
        n: 10,
        v: 11,
        f: 12,
        r: 13
    };
    pf.strToChars = function(uf) {
        var vf = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z[\\\]^?])|([0tnvfr]))/g;
        return uf = uf.replace(vf, function(wf, xf, yf, zf, Af, Bf, Cf, Df) {
            if (yf) return wf;
            var Ef = xf ? 8 : zf ? parseInt(zf, 16) : Af ? parseInt(Af, 16) : Bf ? parseInt(Bf, 8) : Cf ? sf.indexOf(Cf) : tf[Df], Ff = String.fromCharCode(Ef);
            return /[[\]{}^$.|?*+()]/.test(Ff) && (Ff = "\\" + Ff), Ff;
        }), uf;
    };
    pf.tokenizeClass = (Gf, Hf)=>{
        for(var If = [], Jf = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?([^])/g, Kf, Lf; (Kf = Jf.exec(Gf)) != null;)if (Kf[1]) If.push(rf.words());
        else if (Kf[2]) If.push(rf.ints());
        else if (Kf[3]) If.push(rf.whitespace());
        else if (Kf[4]) If.push(rf.notWords());
        else if (Kf[5]) If.push(rf.notInts());
        else if (Kf[6]) If.push(rf.notWhitespace());
        else if (Kf[7]) If.push({
            type: qf.RANGE,
            from: (Kf[8] || Kf[9]).charCodeAt(0),
            to: Kf[10].charCodeAt(0)
        });
        else if (Lf = Kf[12]) If.push({
            type: qf.CHAR,
            value: Lf.charCodeAt(0)
        });
        else return [
            If,
            Jf.lastIndex
        ];
        pf.error(Hf, "Unterminated character class");
    };
    pf.error = (Mf, Nf)=>{
        throw new SyntaxError("Invalid regular expression: /" + Mf + "/: " + Nf);
    };
});
var U = E1((Of)=>{
    var Pf = I();
    Of.wordBoundary = ()=>({
            type: Pf.POSITION,
            value: "b"
        })
    ;
    Of.nonWordBoundary = ()=>({
            type: Pf.POSITION,
            value: "B"
        })
    ;
    Of.begin = ()=>({
            type: Pf.POSITION,
            value: "^"
        })
    ;
    Of.end = ()=>({
            type: Pf.POSITION,
            value: "$"
        })
    ;
});
var P = E1((Qf, Rf)=>{
    var Sf = F(), Tf = I(), Uf = S(), Vf = U();
    Rf.exports = (Wf)=>{
        var Xf = 0, Yf, Zf, $f = {
            type: Tf.ROOT,
            stack: []
        }, _f = $f, ag = $f.stack, bg = [], cg = (dg)=>{
            Sf.error(Wf, `Nothing to repeat at column ${dg - 1}`);
        }, eg = Sf.strToChars(Wf);
        for(Yf = eg.length; Xf < Yf;)switch(Zf = eg[Xf++], Zf){
            case "\\":
                switch(Zf = eg[Xf++], Zf){
                    case "b":
                        ag.push(Vf.wordBoundary());
                        break;
                    case "B":
                        ag.push(Vf.nonWordBoundary());
                        break;
                    case "w":
                        ag.push(Uf.words());
                        break;
                    case "W":
                        ag.push(Uf.notWords());
                        break;
                    case "d":
                        ag.push(Uf.ints());
                        break;
                    case "D":
                        ag.push(Uf.notInts());
                        break;
                    case "s":
                        ag.push(Uf.whitespace());
                        break;
                    case "S":
                        ag.push(Uf.notWhitespace());
                        break;
                    default:
                        /\d/.test(Zf) ? ag.push({
                            type: Tf.REFERENCE,
                            value: parseInt(Zf, 10)
                        }) : ag.push({
                            type: Tf.CHAR,
                            value: Zf.charCodeAt(0)
                        });
                }
                break;
            case "^":
                ag.push(Vf.begin());
                break;
            case "$":
                ag.push(Vf.end());
                break;
            case "[":
                var fg;
                eg[Xf] === "^" ? (fg = !0, Xf++) : fg = !1;
                var gg = Sf.tokenizeClass(eg.slice(Xf), Wf);
                Xf += gg[1], ag.push({
                    type: Tf.SET,
                    set: gg[0],
                    not: fg
                });
                break;
            case ".":
                ag.push(Uf.anyChar());
                break;
            case "(":
                var hg = {
                    type: Tf.GROUP,
                    stack: [],
                    remember: !0
                };
                Zf = eg[Xf], Zf === "?" && (Zf = eg[Xf + 1], Xf += 2, Zf === "=" ? hg.followedBy = !0 : Zf === "!" ? hg.notFollowedBy = !0 : Zf !== ":" && Sf.error(Wf, `Invalid group, character '${Zf}' after '?' at column ${Xf - 1}`), hg.remember = !1), ag.push(hg), bg.push(_f), _f = hg, ag = hg.stack;
                break;
            case ")":
                bg.length === 0 && Sf.error(Wf, `Unmatched ) at column ${Xf - 1}`), _f = bg.pop(), ag = _f.options ? _f.options[_f.options.length - 1] : _f.stack;
                break;
            case "|":
                _f.options || (_f.options = [
                    _f.stack
                ], delete _f.stack);
                var ig = [];
                _f.options.push(ig), ag = ig;
                break;
            case "{":
                var jg = /^(\d+)(,(\d+)?)?\}/.exec(eg.slice(Xf)), kg, lg;
                jg !== null ? (ag.length === 0 && cg(Xf), kg = parseInt(jg[1], 10), lg = jg[2] ? jg[3] ? parseInt(jg[3], 10) : 1 / 0 : kg, Xf += jg[0].length, ag.push({
                    type: Tf.REPETITION,
                    min: kg,
                    max: lg,
                    value: ag.pop()
                })) : ag.push({
                    type: Tf.CHAR,
                    value: 123
                });
                break;
            case "?":
                ag.length === 0 && cg(Xf), ag.push({
                    type: Tf.REPETITION,
                    min: 0,
                    max: 1,
                    value: ag.pop()
                });
                break;
            case "+":
                ag.length === 0 && cg(Xf), ag.push({
                    type: Tf.REPETITION,
                    min: 1,
                    max: 1 / 0,
                    value: ag.pop()
                });
                break;
            case "*":
                ag.length === 0 && cg(Xf), ag.push({
                    type: Tf.REPETITION,
                    min: 0,
                    max: 1 / 0,
                    value: ag.pop()
                });
                break;
            default:
                ag.push({
                    type: Tf.CHAR,
                    value: Zf.charCodeAt(0)
                });
        }
        return bg.length !== 0 && Sf.error(Wf, "Unterminated group"), $f;
    };
    Rf.exports.types = Tf;
});
var X = x1(P()), j1 = x1(P()), { types: oe  } = X;
var export_default1 = j1.default;
var C = Object.create;
var o = Object.defineProperty;
var y = Object.getOwnPropertyDescriptor;
var E2 = Object.getOwnPropertyNames;
var x2 = Object.getPrototypeOf, I1 = Object.prototype.hasOwnProperty;
var w1 = (mg)=>o(mg, "__esModule", {
        value: !0
    })
;
((ng)=>typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy(ng, {
        get: (og, pg)=>(typeof require != "undefined" ? require : og)[pg]
    }) : ng
)(function(qg) {
    if (typeof require != "undefined") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + qg + '" is not supported');
});
var O = (rg, sg)=>()=>(sg || rg((sg = {
            exports: {
            }
        }).exports, sg), sg.exports)
;
var v1 = (tg, ug, vg)=>{
    if (ug && typeof ug == "object" || typeof ug == "function") for (let wg of E2(ug))!I1.call(tg, wg) && wg !== "default" && o(tg, wg, {
        get: ()=>ug[wg]
        ,
        enumerable: !(vg = y(ug, wg)) || vg.enumerable
    });
    return tg;
}, _2 = (xg)=>v1(w1(o(xg != null ? C(x2(xg)) : {
    }, "default", xg && xg.__esModule && "default" in xg ? {
        get: ()=>xg.default
        ,
        enumerable: !0
    } : {
        value: xg,
        enumerable: !0
    })), xg)
;
var c = O((yg, zg)=>{
    var Ag = export_default1, Bg = export_default, Cg = Ag.types;
    zg.exports = class h {
        _setDefaults(Dg) {
            this.max = Dg.max != null ? Dg.max : h.prototype.max != null ? h.prototype.max : 100, this.defaultRange = Dg.defaultRange ? Dg.defaultRange : this.defaultRange.clone(), Dg.randInt && (this.randInt = Dg.randInt);
        }
        gen() {
            return this._gen(this.tokens, []);
        }
        _gen(Eg, Fg) {
            var Gg, Hg, Ig, Jg, Kg;
            switch(Eg.type){
                case Cg.ROOT:
                case Cg.GROUP:
                    if (Eg.followedBy || Eg.notFollowedBy) return "";
                    for(Eg.remember && Eg.groupNumber === void 0 && (Eg.groupNumber = Fg.push(null) - 1), Gg = Eg.options ? this._randSelect(Eg.options) : Eg.stack, Hg = "", Jg = 0, Kg = Gg.length; Jg < Kg; Jg++)Hg += this._gen(Gg[Jg], Fg);
                    return Eg.remember && (Fg[Eg.groupNumber] = Hg), Hg;
                case Cg.POSITION:
                    return "";
                case Cg.SET:
                    var Lg = this._expand(Eg);
                    return Lg.length ? String.fromCharCode(this._randSelect(Lg)) : "";
                case Cg.REPETITION:
                    for(Ig = this.randInt(Eg.min, Eg.max === 1 / 0 ? Eg.min + this.max : Eg.max), Hg = "", Jg = 0; Jg < Ig; Jg++)Hg += this._gen(Eg.value, Fg);
                    return Hg;
                case Cg.REFERENCE:
                    return Fg[Eg.value - 1] || "";
                case Cg.CHAR:
                    var Mg = this.ignoreCase && this._randBool() ? this._toOtherCase(Eg.value) : Eg.value;
                    return String.fromCharCode(Mg);
            }
        }
        _toOtherCase(Ng) {
            return Ng + (97 <= Ng && Ng <= 122 ? -32 : 65 <= Ng && Ng <= 90 ? 32 : 0);
        }
        _randBool() {
            return !this.randInt(0, 1);
        }
        _randSelect(Og) {
            return Og instanceof Bg ? Og.index(this.randInt(0, Og.length - 1)) : Og[this.randInt(0, Og.length - 1)];
        }
        _expand(Pg) {
            if (Pg.type === Ag.types.CHAR) return new Bg(Pg.value);
            if (Pg.type === Ag.types.RANGE) return new Bg(Pg.from, Pg.to);
            {
                let Qg = new Bg;
                for(let Rg = 0; Rg < Pg.set.length; Rg++){
                    let Sg = this._expand(Pg.set[Rg]);
                    if (Qg.add(Sg), this.ignoreCase) for(let Tg = 0; Tg < Sg.length; Tg++){
                        let Ug = Sg.index(Tg), Vg = this._toOtherCase(Ug);
                        Ug !== Vg && Qg.add(Vg);
                    }
                }
                return Pg.not ? this.defaultRange.clone().subtract(Qg) : this.defaultRange.clone().intersect(Qg);
            }
        }
        randInt(Wg, Xg) {
            return Wg + Math.floor(Math.random() * (1 + Xg - Wg));
        }
        get defaultRange() {
            return this._range = this._range || new Bg(32, 126);
        }
        set defaultRange(Yg) {
            this._range = Yg;
        }
        static randexp(Zg, $g) {
            var _g;
            return typeof Zg == "string" && (Zg = new RegExp(Zg, $g)), Zg._randexp === void 0 ? (_g = new h(Zg, $g), Zg._randexp = _g) : (_g = Zg._randexp, _g._setDefaults(Zg)), _g.gen();
        }
        static sugar() {
            RegExp.prototype.gen = function() {
                return h.randexp(this);
            };
        }
        constructor(ah, bh){
            if (this._setDefaults(ah), ah instanceof RegExp) this.ignoreCase = ah.ignoreCase, this.multiline = ah.multiline, ah = ah.source;
            else if (typeof ah == "string") this.ignoreCase = bh && bh.indexOf("i") !== -1, this.multiline = bh && bh.indexOf("m") !== -1;
            else throw new Error("Expected a regexp or string");
            this.tokens = Ag(ah);
        }
    };
});
var b = _2(c()), N1 = _2(c()), { randexp: B , sugar: D  } = b;
var export_default4 = N1.default;
const Fiona1 = __default3(export_default4);
return Fiona1;
});
