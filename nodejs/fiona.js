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
    version: "4.1.1"
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
            path: [
                ...mb
            ]
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
Fiona.Info = ()=>(Ub)=>Ub.info()
;
const clone = (Vb)=>Fiona(Vb.info().initseed).state(Vb.state())
;
Fiona.register([
    "clone", clone]);
Fiona.register([
    "number", number], [
    "object", object], [
    "json", json], [
    "string", string], [
    "array", array]);
const bool = (Wb, { chance =0.5  } = {
})=>Wb.random() < chance
;
const unique = (Xb, Yb, Zb, { duplicateLimit =(qty)=>qty * 2
 , comparator =(a, b)=>a === b
  } = {
})=>{
    const $b = typeof Yb === "number" ? Yb : Xb.number(Yb);
    const _b = typeof duplicateLimit === "function" ? duplicateLimit($b) : duplicateLimit;
    const ac = Symbol("unmatched");
    let bc = 0;
    const cc = Xb.array($b + _b, (dc)=>{
        const ec = dc.info().path[0];
        if (ec + 1 > $b + bc) {
            return null;
        }
        const fc = dc.object(Zb);
        if (dc.data.findIndex((gc)=>comparator(fc, gc)
        ) !== -1) {
            bc++;
            return ac;
        } else {
            return fc;
        }
    }).filter((hc)=>hc !== ac
    ).slice(0, $b);
    if (cc.length === $b) {
        return cc;
    } else {
        throw Error(`Too many duplicates`);
    }
};
const chooser = (ic, jc, kc)=>{
    const lc = jc.reduce((mc, nc, oc)=>{
        mc.push((mc[oc - 1] || 0) + (typeof kc[oc] === "number" ? kc[oc] : 1));
        return mc;
    }, []);
    const pc = ic * lc[lc.length - 1];
    let qc;
    lc.every((rc, sc)=>{
        if (pc > rc) {
            return true;
        } else {
            qc = sc;
            return false;
        }
    });
    return qc;
};
const choose = (tc, uc, vc, { weights =[]  } = {
})=>{
    const wc = vc.slice(0);
    const xc = weights.slice(0);
    return Array(uc || 0).fill(null).map(()=>{
        const yc = chooser(tc.random(), wc, xc);
        const zc = wc[yc];
        wc[yc] = wc[0];
        wc.shift();
        return zc;
    });
};
const oneOf = (Ac, Bc, { weights =[]  } = {
})=>{
    return Bc[chooser(Ac.random(), Bc, weights)];
};
const date = (Cc, { min ="1940" , max ="2000" , long: Dc = false  } = {
})=>{
    const Ec = new Date(min) * 1;
    const Fc = new Date(max) * 1;
    if (Ec > Fc) {
        throw Error(`min date must be lower than max date`);
    }
    const Gc = Fc - Ec;
    const Hc = new Date(Cc.number({
        max: Gc
    }) + Ec).toISOString();
    return Dc ? Hc : Hc.slice(0, 10);
};
const RGB = (Ic, Jc, Kc)=>"#" + [
        Ic,
        Jc,
        Kc
    ].map((Lc)=>`0${Lc.toString(16)}`.slice(-2)
    ).join("")
;
const getme = (Mc)=>{
    return Mc.slice(1).match(/(..)/g).map((Nc)=>parseInt(Nc, 16)
    );
};
const mapper = (Oc, Pc)=>(Qc)=>{
        return Oc.reduce((Rc, Sc, Tc)=>{
            const Uc = Math.min(Pc[Tc], Oc[Tc]);
            const Vc = Math.max(Pc[Tc], Oc[Tc]);
            const Wc = Vc - Uc;
            return `${Rc}${(Uc + Math.ceil(Wc * Qc)).toString(16)}`;
        }, "#");
    }
;
const colorMapperFactory = (Xc)=>{
    const Yc = Xc.map(({ start , end  })=>mapper(getme(start), getme(end))
    );
    return (Zc)=>{
        const $c = Math.floor(Xc.length * Zc);
        return Yc[$c](Zc);
    };
};
const img = (_c, ad)=>{
    const { seed , width , height , bg , colors  } = Object.assign(_c.object({
        seed: _c.number(),
        width: 1000,
        height: 1000,
        bg: RGB(_c.number({
            max: 255
        }), _c.number({
            max: 255
        }), _c.number({
            max: 255
        })),
        colors: _c.array({
            min: 1,
            max: 10
        }, (bd)=>({
                start: RGB(bd.number({
                    max: 255
                }), bd.number({
                    max: 255
                }), bd.number({
                    max: 255
                })),
                end: RGB(bd.number({
                    max: 255
                }), bd.number({
                    max: 255
                }), bd.number({
                    max: 255
                }))
            })
        )
    }), ad);
    const cd = colorMapperFactory(colors);
    const dd = [];
    for(let ed = 0; ed < 100; ed++){
        const fd = cd(ed / 100);
        const gd = seed * ed % 360;
        const [hd, id, jd, kd] = [
            5 * ed,
            5 / seed,
            ed * seed,
            ed
        ].map(Math.floor).map((ld)=>ld % (Math.max(width, height) * 3)
        );
        dd.push(`<rect x="${hd}" y="${id}" width="${jd}" height="${kd}" transform="rotate(${gd})" fill="${fd}" />`);
    }
    const md = (nd)=>encodeURIComponent(`
    <svg width="${width}" height="${height}" viewBox="${-1 * width} ${-1 * height} ${width * 2} ${height * 2}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <style>svg { background-color: ${bg}; }</style>
      ${nd}
    </svg>
  `)
    ;
    return `data:image/svg+xml;utf8,${md(dd.join("\n"))}`;
};
const duplicable = (od, { frequency =0.1 , pool =10  } = {
})=>{
    if (od.random() <= frequency) {
        od.reset((Math.floor(od.random() * pool + 1) / pool + 1) * 10000000000000000);
    }
    return od;
};
const seed = (pd)=>pd.info().initseed
;
const path = (qd)=>qd.info().path
;
const seed1 = (rd)=>rd.info().path.slice(-1)[0]
;
const gibberish = (sd, { qty =1 , syllableMin =1 , syllableMax =5  } = {
})=>sd.array(qty, ()=>sd.regex(new RegExp(`([bcdfghklmnprstvw]?(a|ac|ad|af|age|al|an|an|ap|ar|as|at|au|aus|e|ed|el|en|ence|er|ern|ers|es|est|et|eve|ex|i|ic|ies|im|in|ing|ings|is|it|o|ob|oc|of|op|or|out|u|un|up)){${syllableMin},${syllableMax}}`))
    ).join(" ")
;
const lorem = (td, { qty =15  } = {
})=>{
    const ud = td.random() < 0.2 ? "lorem ipsum " : "";
    let vd = [];
    while(vd.length < qty){
        vd = vd.concat("dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" "));
    }
    return ud + td.choose(qty, vd).join(" ");
};
const word = (wd)=>wd.lorem({
        qty: 1
    }).split(" ")[0]
;
const sentence = (xd)=>{
    const yd = xd.lorem({
        qty: 25
    });
    return yd[0].toUpperCase() + yd.slice(1) + ".";
};
const paragraph = (zd)=>Array(zd.number({
        min: 1,
        max: 10
    })).fill(0).map(()=>zd.sentence()
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
const getGender = (Ad)=>Ad && (Ad[0].toLowerCase() === "f" ? "female" : "male")
;
const gender = (Bd)=>{
    return Bd.random() < 0.5 ? "male" : "female";
};
const title = (Cd, { gender  } = {
})=>{
    return Cd.oneOf(namedata[getGender(gender || Cd.gender())].title, {
        weights: [
            5,
            3
        ]
    });
};
const firstname = (Dd, { gender  } = {
})=>{
    return Dd.oneOf(namedata[getGender(gender || Dd.gender())].firstname);
};
const firstnames = (Ed, { gender  } = {
})=>{
    return Ed.choose(Ed.clone().distribution((Fd)=>Fd * Fd * Fd
    ).number({
        min: 1,
        max: 3
    }), namedata[getGender(gender || Ed.gender())].firstname).join(" ");
};
const surname = (Gd)=>{
    return Gd.choose(Gd.clone().distribution((Hd)=>Hd * Hd * Hd
    ).number({
        min: 1,
        max: 2
    }), namedata.surname).join(Gd.bool() ? " " : "-");
};
const fullname = (Id, { gender  } = {
})=>{
    const Jd = getGender(gender || Id.gender());
    return `${Id.title({
        gender: Jd
    })} ${Id.firstnames({
        gender: Jd
    })} ${Id.surname()}`;
};
const regex = (Kd)=>(Ld, Md = /[A-F0-9]{16}/)=>{
        const Nd = new Kd(RegExp(Md));
        Nd.randInt = (Od, Pd)=>Od + Math.floor(Ld.random() * (1 + Pd - Od))
        ;
        return Nd.gen();
    }
;
const shuffle = (Qd, Rd, { qty  } = {
})=>Qd.choose(typeof qty !== "undefined" ? qty : Rd.length, Rd)
;
const recurser = (Sd, Td)=>{
    const Ud = (Vd, Wd)=>{
        if (Wd === undefined) {
            Wd = Vd;
        }
        if (Vd === null || Vd === undefined) {
            return Vd;
        } else if (Vd.constructor === Array) {
            return Vd.map((Xd)=>Ud(Xd, Wd)
            );
        } else if (Vd.constructor === Object) {
            if (Sd(Vd, Wd)) {
                return Td(Vd, Wd);
            } else {
                Object.entries(Vd).forEach(([Yd, Zd])=>{
                    Vd[Yd] = Ud(Zd, Wd);
                });
                return Vd;
            }
        } else {
            return Vd;
        }
    };
    return Ud;
};
const transformer = recurser(($d)=>$d.fiona
, (_d)=>{
    if (_d.fiona.constructor === Array) {
        return (ae)=>ae[_d.fiona[0]](..._d.fiona.slice(1).map(transformer))
        ;
    } else {
        return (be)=>be[_d.fiona]()
        ;
    }
});
const fromJSON = (ce, de)=>ce.object(transformer(de))
;
const __default3 = (ee)=>{
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
        regex(ee)
    ], [
        "shuffle", shuffle], [
        "import", fromJSON], [
        "seed", seed], [
        "path", path], [
        "index", seed1]);
    Fiona.namedata = namedata1;
    return Fiona;
};
var f = Object.create;
var g = Object.defineProperty;
var v = Object.getOwnPropertyDescriptor;
var d = Object.getOwnPropertyNames;
var p = Object.getPrototypeOf, m = Object.prototype.hasOwnProperty;
var M = (fe)=>g(fe, "__esModule", {
        value: !0
    })
;
var x = (ge, he)=>()=>(he || ge((he = {
            exports: {
            }
        }).exports, he), he.exports)
;
var E = (ie, je, ke)=>{
    if (je && typeof je == "object" || typeof je == "function") for (let le of d(je))!m.call(ie, le) && le !== "default" && g(ie, le, {
        get: ()=>je[le]
        ,
        enumerable: !(ke = v(je, le)) || ke.enumerable
    });
    return ie;
}, _ = (me)=>E(M(g(me != null ? f(p(me)) : {
    }, "default", me && me.__esModule && "default" in me ? {
        get: ()=>me.default
        ,
        enumerable: !0
    } : {
        value: me,
        enumerable: !0
    })), me)
;
var w = x((ne, pe)=>{
    "use strict";
    var qe = class _class {
        overlaps(re) {
            return !(this.high < re.low || this.low > re.high);
        }
        touches(se) {
            return !(this.high + 1 < se.low || this.low - 1 > se.high);
        }
        add(te) {
            return new qe(Math.min(this.low, te.low), Math.max(this.high, te.high));
        }
        subtract(ue) {
            return ue.low <= this.low && ue.high >= this.high ? [] : ue.low > this.low && ue.high < this.high ? [
                new qe(this.low, ue.low - 1),
                new qe(ue.high + 1, this.high)
            ] : ue.low <= this.low ? [
                new qe(ue.high + 1, this.high)
            ] : [
                new qe(this.low, ue.low - 1)
            ];
        }
        toString() {
            return this.low == this.high ? this.low.toString() : this.low + "-" + this.high;
        }
        constructor(ve, we){
            this.low = ve, this.high = we, this.length = 1 + we - ve;
        }
    }, xe = class _class {
        _update_length() {
            this.length = this.ranges.reduce((ye, ze)=>ye + ze.length
            , 0);
        }
        add(Ae, Be) {
            var Ce = (De)=>{
                for(var Ee = 0; Ee < this.ranges.length && !De.touches(this.ranges[Ee]);)Ee++;
                for(var Fe = this.ranges.slice(0, Ee); Ee < this.ranges.length && De.touches(this.ranges[Ee]);)De = De.add(this.ranges[Ee]), Ee++;
                Fe.push(De), this.ranges = Fe.concat(this.ranges.slice(Ee)), this._update_length();
            };
            return Ae instanceof xe ? Ae.ranges.forEach(Ce) : (Be == null && (Be = Ae), Ce(new qe(Ae, Be))), this;
        }
        subtract(Ge, He) {
            var Ie = (Je)=>{
                for(var Ke = 0; Ke < this.ranges.length && !Je.overlaps(this.ranges[Ke]);)Ke++;
                for(var Le = this.ranges.slice(0, Ke); Ke < this.ranges.length && Je.overlaps(this.ranges[Ke]);)Le = Le.concat(this.ranges[Ke].subtract(Je)), Ke++;
                this.ranges = Le.concat(this.ranges.slice(Ke)), this._update_length();
            };
            return Ge instanceof xe ? Ge.ranges.forEach(Ie) : (He == null && (He = Ge), Ie(new qe(Ge, He))), this;
        }
        intersect(Me, Ne) {
            var Oe = [], Pe = (Qe)=>{
                for(var Re = 0; Re < this.ranges.length && !Qe.overlaps(this.ranges[Re]);)Re++;
                for(; Re < this.ranges.length && Qe.overlaps(this.ranges[Re]);){
                    var Se = Math.max(this.ranges[Re].low, Qe.low), Te = Math.min(this.ranges[Re].high, Qe.high);
                    Oe.push(new qe(Se, Te)), Re++;
                }
            };
            return Me instanceof xe ? Me.ranges.forEach(Pe) : (Ne == null && (Ne = Me), Pe(new qe(Me, Ne))), this.ranges = Oe, this._update_length(), this;
        }
        index(Ue) {
            for(var Ve = 0; Ve < this.ranges.length && this.ranges[Ve].length <= Ue;)Ue -= this.ranges[Ve].length, Ve++;
            return this.ranges[Ve].low + Ue;
        }
        toString() {
            return "[ " + this.ranges.join(", ") + " ]";
        }
        clone() {
            return new xe(this);
        }
        numbers() {
            return this.ranges.reduce((We, Xe)=>{
                for(var Ye = Xe.low; Ye <= Xe.high;)We.push(Ye), Ye++;
                return We;
            }, []);
        }
        subranges() {
            return this.ranges.map((Ze)=>({
                    low: Ze.low,
                    high: Ze.high,
                    length: 1 + Ze.high - Ze.low
                })
            );
        }
        constructor($e, _e){
            this.ranges = [], this.length = 0, $e != null && this.add($e, _e);
        }
    };
    pe.exports = xe;
});
var j = _(w());
var export_default = j.default;
var L = Object.create;
var N = Object.defineProperty;
var _1 = Object.getOwnPropertyDescriptor;
var z = Object.getOwnPropertyNames;
var Y = Object.getPrototypeOf, Z = Object.prototype.hasOwnProperty;
var J = (af)=>N(af, "__esModule", {
        value: !0
    })
;
var E1 = (bf, cf)=>()=>(cf || bf((cf = {
            exports: {
            }
        }).exports, cf), cf.exports)
;
var K = (df, ef, ff)=>{
    if (ef && typeof ef == "object" || typeof ef == "function") for (let gf of z(ef))!Z.call(df, gf) && gf !== "default" && N(df, gf, {
        get: ()=>ef[gf]
        ,
        enumerable: !(ff = _1(ef, gf)) || ff.enumerable
    });
    return df;
}, x1 = (hf)=>K(J(N(hf != null ? L(Y(hf)) : {
    }, "default", hf && hf.__esModule && "default" in hf ? {
        get: ()=>hf.default
        ,
        enumerable: !0
    } : {
        value: hf,
        enumerable: !0
    })), hf)
;
var I = E1((jf, kf)=>{
    kf.exports = {
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
var S = E1((lf)=>{
    var mf = I(), nf = ()=>[
            {
                type: mf.RANGE,
                from: 48,
                to: 57
            }
        ]
    , of = ()=>[
            {
                type: mf.CHAR,
                value: 95
            },
            {
                type: mf.RANGE,
                from: 97,
                to: 122
            },
            {
                type: mf.RANGE,
                from: 65,
                to: 90
            }
        ].concat(nf())
    , pf = ()=>[
            {
                type: mf.CHAR,
                value: 9
            },
            {
                type: mf.CHAR,
                value: 10
            },
            {
                type: mf.CHAR,
                value: 11
            },
            {
                type: mf.CHAR,
                value: 12
            },
            {
                type: mf.CHAR,
                value: 13
            },
            {
                type: mf.CHAR,
                value: 32
            },
            {
                type: mf.CHAR,
                value: 160
            },
            {
                type: mf.CHAR,
                value: 5760
            },
            {
                type: mf.RANGE,
                from: 8192,
                to: 8202
            },
            {
                type: mf.CHAR,
                value: 8232
            },
            {
                type: mf.CHAR,
                value: 8233
            },
            {
                type: mf.CHAR,
                value: 8239
            },
            {
                type: mf.CHAR,
                value: 8287
            },
            {
                type: mf.CHAR,
                value: 12288
            },
            {
                type: mf.CHAR,
                value: 65279
            }
        ]
    , qf = ()=>[
            {
                type: mf.CHAR,
                value: 10
            },
            {
                type: mf.CHAR,
                value: 13
            },
            {
                type: mf.CHAR,
                value: 8232
            },
            {
                type: mf.CHAR,
                value: 8233
            }
        ]
    ;
    lf.words = ()=>({
            type: mf.SET,
            set: of(),
            not: !1
        })
    ;
    lf.notWords = ()=>({
            type: mf.SET,
            set: of(),
            not: !0
        })
    ;
    lf.ints = ()=>({
            type: mf.SET,
            set: nf(),
            not: !1
        })
    ;
    lf.notInts = ()=>({
            type: mf.SET,
            set: nf(),
            not: !0
        })
    ;
    lf.whitespace = ()=>({
            type: mf.SET,
            set: pf(),
            not: !1
        })
    ;
    lf.notWhitespace = ()=>({
            type: mf.SET,
            set: pf(),
            not: !0
        })
    ;
    lf.anyChar = ()=>({
            type: mf.SET,
            set: qf(),
            not: !0
        })
    ;
});
var F = E1((rf)=>{
    var sf = I(), tf = S(), uf = "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?", vf = {
        "0": 0,
        t: 9,
        n: 10,
        v: 11,
        f: 12,
        r: 13
    };
    rf.strToChars = function(wf) {
        var xf = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z[\\\]^?])|([0tnvfr]))/g;
        return wf = wf.replace(xf, function(yf, zf, Af, Bf, Cf, Df, Ef, Ff) {
            if (Af) return yf;
            var Gf = zf ? 8 : Bf ? parseInt(Bf, 16) : Cf ? parseInt(Cf, 16) : Df ? parseInt(Df, 8) : Ef ? uf.indexOf(Ef) : vf[Ff], Hf = String.fromCharCode(Gf);
            return /[[\]{}^$.|?*+()]/.test(Hf) && (Hf = "\\" + Hf), Hf;
        }), wf;
    };
    rf.tokenizeClass = (If, Jf)=>{
        for(var Kf = [], Lf = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?([^])/g, Mf, Nf; (Mf = Lf.exec(If)) != null;)if (Mf[1]) Kf.push(tf.words());
        else if (Mf[2]) Kf.push(tf.ints());
        else if (Mf[3]) Kf.push(tf.whitespace());
        else if (Mf[4]) Kf.push(tf.notWords());
        else if (Mf[5]) Kf.push(tf.notInts());
        else if (Mf[6]) Kf.push(tf.notWhitespace());
        else if (Mf[7]) Kf.push({
            type: sf.RANGE,
            from: (Mf[8] || Mf[9]).charCodeAt(0),
            to: Mf[10].charCodeAt(0)
        });
        else if (Nf = Mf[12]) Kf.push({
            type: sf.CHAR,
            value: Nf.charCodeAt(0)
        });
        else return [
            Kf,
            Lf.lastIndex
        ];
        rf.error(Jf, "Unterminated character class");
    };
    rf.error = (Of, Pf)=>{
        throw new SyntaxError("Invalid regular expression: /" + Of + "/: " + Pf);
    };
});
var U = E1((Qf)=>{
    var Rf = I();
    Qf.wordBoundary = ()=>({
            type: Rf.POSITION,
            value: "b"
        })
    ;
    Qf.nonWordBoundary = ()=>({
            type: Rf.POSITION,
            value: "B"
        })
    ;
    Qf.begin = ()=>({
            type: Rf.POSITION,
            value: "^"
        })
    ;
    Qf.end = ()=>({
            type: Rf.POSITION,
            value: "$"
        })
    ;
});
var P = E1((Sf, Tf)=>{
    var Uf = F(), Vf = I(), Wf = S(), Xf = U();
    Tf.exports = (Yf)=>{
        var Zf = 0, $f, _f, ag = {
            type: Vf.ROOT,
            stack: []
        }, bg = ag, cg = ag.stack, dg = [], eg = (fg)=>{
            Uf.error(Yf, `Nothing to repeat at column ${fg - 1}`);
        }, gg = Uf.strToChars(Yf);
        for($f = gg.length; Zf < $f;)switch(_f = gg[Zf++], _f){
            case "\\":
                switch(_f = gg[Zf++], _f){
                    case "b":
                        cg.push(Xf.wordBoundary());
                        break;
                    case "B":
                        cg.push(Xf.nonWordBoundary());
                        break;
                    case "w":
                        cg.push(Wf.words());
                        break;
                    case "W":
                        cg.push(Wf.notWords());
                        break;
                    case "d":
                        cg.push(Wf.ints());
                        break;
                    case "D":
                        cg.push(Wf.notInts());
                        break;
                    case "s":
                        cg.push(Wf.whitespace());
                        break;
                    case "S":
                        cg.push(Wf.notWhitespace());
                        break;
                    default:
                        /\d/.test(_f) ? cg.push({
                            type: Vf.REFERENCE,
                            value: parseInt(_f, 10)
                        }) : cg.push({
                            type: Vf.CHAR,
                            value: _f.charCodeAt(0)
                        });
                }
                break;
            case "^":
                cg.push(Xf.begin());
                break;
            case "$":
                cg.push(Xf.end());
                break;
            case "[":
                var hg;
                gg[Zf] === "^" ? (hg = !0, Zf++) : hg = !1;
                var ig = Uf.tokenizeClass(gg.slice(Zf), Yf);
                Zf += ig[1], cg.push({
                    type: Vf.SET,
                    set: ig[0],
                    not: hg
                });
                break;
            case ".":
                cg.push(Wf.anyChar());
                break;
            case "(":
                var jg = {
                    type: Vf.GROUP,
                    stack: [],
                    remember: !0
                };
                _f = gg[Zf], _f === "?" && (_f = gg[Zf + 1], Zf += 2, _f === "=" ? jg.followedBy = !0 : _f === "!" ? jg.notFollowedBy = !0 : _f !== ":" && Uf.error(Yf, `Invalid group, character '${_f}' after '?' at column ${Zf - 1}`), jg.remember = !1), cg.push(jg), dg.push(bg), bg = jg, cg = jg.stack;
                break;
            case ")":
                dg.length === 0 && Uf.error(Yf, `Unmatched ) at column ${Zf - 1}`), bg = dg.pop(), cg = bg.options ? bg.options[bg.options.length - 1] : bg.stack;
                break;
            case "|":
                bg.options || (bg.options = [
                    bg.stack
                ], delete bg.stack);
                var kg = [];
                bg.options.push(kg), cg = kg;
                break;
            case "{":
                var lg = /^(\d+)(,(\d+)?)?\}/.exec(gg.slice(Zf)), mg, ng;
                lg !== null ? (cg.length === 0 && eg(Zf), mg = parseInt(lg[1], 10), ng = lg[2] ? lg[3] ? parseInt(lg[3], 10) : 1 / 0 : mg, Zf += lg[0].length, cg.push({
                    type: Vf.REPETITION,
                    min: mg,
                    max: ng,
                    value: cg.pop()
                })) : cg.push({
                    type: Vf.CHAR,
                    value: 123
                });
                break;
            case "?":
                cg.length === 0 && eg(Zf), cg.push({
                    type: Vf.REPETITION,
                    min: 0,
                    max: 1,
                    value: cg.pop()
                });
                break;
            case "+":
                cg.length === 0 && eg(Zf), cg.push({
                    type: Vf.REPETITION,
                    min: 1,
                    max: 1 / 0,
                    value: cg.pop()
                });
                break;
            case "*":
                cg.length === 0 && eg(Zf), cg.push({
                    type: Vf.REPETITION,
                    min: 0,
                    max: 1 / 0,
                    value: cg.pop()
                });
                break;
            default:
                cg.push({
                    type: Vf.CHAR,
                    value: _f.charCodeAt(0)
                });
        }
        return dg.length !== 0 && Uf.error(Yf, "Unterminated group"), ag;
    };
    Tf.exports.types = Vf;
});
var X = x1(P()), j1 = x1(P()), { types: oe  } = X;
var export_default1 = j1.default;
var C = Object.create;
var o = Object.defineProperty;
var y = Object.getOwnPropertyDescriptor;
var E2 = Object.getOwnPropertyNames;
var x2 = Object.getPrototypeOf, I1 = Object.prototype.hasOwnProperty;
var w1 = (og)=>o(og, "__esModule", {
        value: !0
    })
;
((pg)=>typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy(pg, {
        get: (qg, rg)=>(typeof require != "undefined" ? require : qg)[rg]
    }) : pg
)(function(sg) {
    if (typeof require != "undefined") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + sg + '" is not supported');
});
var O = (tg, ug)=>()=>(ug || tg((ug = {
            exports: {
            }
        }).exports, ug), ug.exports)
;
var v1 = (vg, wg, xg)=>{
    if (wg && typeof wg == "object" || typeof wg == "function") for (let yg of E2(wg))!I1.call(vg, yg) && yg !== "default" && o(vg, yg, {
        get: ()=>wg[yg]
        ,
        enumerable: !(xg = y(wg, yg)) || xg.enumerable
    });
    return vg;
}, _2 = (zg)=>v1(w1(o(zg != null ? C(x2(zg)) : {
    }, "default", zg && zg.__esModule && "default" in zg ? {
        get: ()=>zg.default
        ,
        enumerable: !0
    } : {
        value: zg,
        enumerable: !0
    })), zg)
;
var c = O((Ag, Bg)=>{
    var Cg = export_default1, Dg = export_default, Eg = Cg.types;
    Bg.exports = class h {
        _setDefaults(Fg) {
            this.max = Fg.max != null ? Fg.max : h.prototype.max != null ? h.prototype.max : 100, this.defaultRange = Fg.defaultRange ? Fg.defaultRange : this.defaultRange.clone(), Fg.randInt && (this.randInt = Fg.randInt);
        }
        gen() {
            return this._gen(this.tokens, []);
        }
        _gen(Gg, Hg) {
            var Ig, Jg, Kg, Lg, Mg;
            switch(Gg.type){
                case Eg.ROOT:
                case Eg.GROUP:
                    if (Gg.followedBy || Gg.notFollowedBy) return "";
                    for(Gg.remember && Gg.groupNumber === void 0 && (Gg.groupNumber = Hg.push(null) - 1), Ig = Gg.options ? this._randSelect(Gg.options) : Gg.stack, Jg = "", Lg = 0, Mg = Ig.length; Lg < Mg; Lg++)Jg += this._gen(Ig[Lg], Hg);
                    return Gg.remember && (Hg[Gg.groupNumber] = Jg), Jg;
                case Eg.POSITION:
                    return "";
                case Eg.SET:
                    var Ng = this._expand(Gg);
                    return Ng.length ? String.fromCharCode(this._randSelect(Ng)) : "";
                case Eg.REPETITION:
                    for(Kg = this.randInt(Gg.min, Gg.max === 1 / 0 ? Gg.min + this.max : Gg.max), Jg = "", Lg = 0; Lg < Kg; Lg++)Jg += this._gen(Gg.value, Hg);
                    return Jg;
                case Eg.REFERENCE:
                    return Hg[Gg.value - 1] || "";
                case Eg.CHAR:
                    var Og = this.ignoreCase && this._randBool() ? this._toOtherCase(Gg.value) : Gg.value;
                    return String.fromCharCode(Og);
            }
        }
        _toOtherCase(Pg) {
            return Pg + (97 <= Pg && Pg <= 122 ? -32 : 65 <= Pg && Pg <= 90 ? 32 : 0);
        }
        _randBool() {
            return !this.randInt(0, 1);
        }
        _randSelect(Qg) {
            return Qg instanceof Dg ? Qg.index(this.randInt(0, Qg.length - 1)) : Qg[this.randInt(0, Qg.length - 1)];
        }
        _expand(Rg) {
            if (Rg.type === Cg.types.CHAR) return new Dg(Rg.value);
            if (Rg.type === Cg.types.RANGE) return new Dg(Rg.from, Rg.to);
            {
                let Sg = new Dg;
                for(let Tg = 0; Tg < Rg.set.length; Tg++){
                    let Ug = this._expand(Rg.set[Tg]);
                    if (Sg.add(Ug), this.ignoreCase) for(let Vg = 0; Vg < Ug.length; Vg++){
                        let Wg = Ug.index(Vg), Xg = this._toOtherCase(Wg);
                        Wg !== Xg && Sg.add(Xg);
                    }
                }
                return Rg.not ? this.defaultRange.clone().subtract(Sg) : this.defaultRange.clone().intersect(Sg);
            }
        }
        randInt(Yg, Zg) {
            return Yg + Math.floor(Math.random() * (1 + Zg - Yg));
        }
        get defaultRange() {
            return this._range = this._range || new Dg(32, 126);
        }
        set defaultRange($g) {
            this._range = $g;
        }
        static randexp(_g, ah) {
            var bh;
            return typeof _g == "string" && (_g = new RegExp(_g, ah)), _g._randexp === void 0 ? (bh = new h(_g, ah), _g._randexp = bh) : (bh = _g._randexp, bh._setDefaults(_g)), bh.gen();
        }
        static sugar() {
            RegExp.prototype.gen = function() {
                return h.randexp(this);
            };
        }
        constructor(ch, dh){
            if (this._setDefaults(ch), ch instanceof RegExp) this.ignoreCase = ch.ignoreCase, this.multiline = ch.multiline, ch = ch.source;
            else if (typeof ch == "string") this.ignoreCase = dh && dh.indexOf("i") !== -1, this.multiline = dh && dh.indexOf("m") !== -1;
            else throw new Error("Expected a regexp or string");
            this.tokens = Cg(ch);
        }
    };
});
var b = _2(c()), N1 = _2(c()), { randexp: B , sugar: D  } = b;
var export_default4 = N1.default;
const Fiona1 = __default3(export_default4);
return Fiona1;
});
