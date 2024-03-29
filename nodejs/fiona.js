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
    version: "4.1.4"
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
 , comparator =(a, b1)=>a === b1
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
    const { seed: bd , width , height , bg , colors  } = Object.assign(_c.object({
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
        }, (cd)=>({
                start: RGB(cd.number({
                    max: 255
                }), cd.number({
                    max: 255
                }), cd.number({
                    max: 255
                })),
                end: RGB(cd.number({
                    max: 255
                }), cd.number({
                    max: 255
                }), cd.number({
                    max: 255
                }))
            })
        )
    }), ad);
    const dd = colorMapperFactory(colors);
    const ed = [];
    for(let fd = 0; fd < 100; fd++){
        const gd = dd(fd / 100);
        const hd = bd * fd % 360;
        const [id, jd, kd, ld] = [
            5 * fd,
            5 / bd,
            fd * bd,
            fd
        ].map(Math.floor).map((md)=>md % (Math.max(width, height) * 3)
        );
        ed.push(`<rect x="${id}" y="${jd}" width="${kd}" height="${ld}" transform="rotate(${hd})" fill="${gd}" />`);
    }
    const nd = (od)=>encodeURIComponent(`
    <svg width="${width}" height="${height}" viewBox="${-1 * width} ${-1 * height} ${width * 2} ${height * 2}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <style>svg { background-color: ${bg}; }</style>
      ${od}
    </svg>
  `)
    ;
    return `data:image/svg+xml;utf8,${nd(ed.join("\n"))}`;
};
const duplicable = (pd, { frequency =0.1 , pool =10  } = {
})=>{
    if (pd.random() <= frequency) {
        pd.reset((Math.floor(pd.random() * pool + 1) / pool + 1) * 10000000000000000);
    }
    return pd;
};
const seed = (qd)=>qd.info().initseed
;
const path = (rd)=>rd.info().path
;
const seed1 = (sd)=>sd.info().path.slice(-1)[0]
;
const gibberish = (td, { qty =1 , syllableMin =1 , syllableMax =5  } = {
})=>td.array(qty, ()=>td.regex(new RegExp(`([bcdfghklmnprstvw]?(a|ac|ad|af|age|al|an|an|ap|ar|as|at|au|aus|e|ed|el|en|ence|er|ern|ers|es|est|et|eve|ex|i|ic|ies|im|in|ing|ings|is|it|o|ob|oc|of|op|or|out|u|un|up)){${syllableMin},${syllableMax}}`))
    ).join(" ")
;
const lorem = (ud, { qty =15  } = {
})=>{
    const vd = ud.random() < 0.2;
    let wd = [];
    while(wd.length < qty){
        wd = wd.concat("dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" "));
    }
    return (vd ? "lorem ipsum" : "") + ud.choose(vd ? Math.max(0, qty - 2) : qty, wd).join(" ");
};
const word = (xd)=>xd.lorem({
        qty: 1
    }).split(" ")[0]
;
const sentence = (yd)=>{
    const zd = yd.lorem({
        qty: 25
    });
    return zd[0].toUpperCase() + zd.slice(1) + ".";
};
const paragraph = (Ad)=>Array(Ad.number({
        min: 1,
        max: 10
    })).fill(0).map(()=>Ad.sentence()
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
const getGender = (Bd)=>Bd && (Bd[0].toLowerCase() === "f" ? "female" : "male")
;
const gender = (Cd)=>{
    return Cd.random() < 0.5 ? "male" : "female";
};
const title = (Dd, { gender: Ed  } = {
})=>{
    return Dd.oneOf(namedata[getGender(Ed || Dd.gender())].title, {
        weights: [
            5,
            3
        ]
    });
};
const firstname = (Fd, { gender: Gd  } = {
})=>{
    return Fd.oneOf(namedata[getGender(Gd || Fd.gender())].firstname);
};
const firstnames = (Hd, { gender: Id  } = {
})=>{
    return Hd.choose(Hd.clone().distribution((Jd)=>Jd * Jd * Jd
    ).number({
        min: 1,
        max: 3
    }), namedata[getGender(Id || Hd.gender())].firstname).join(" ");
};
const surname = (Kd)=>{
    return Kd.choose(Kd.clone().distribution((Ld)=>Ld * Ld * Ld
    ).number({
        min: 1,
        max: 2
    }), namedata.surname).join(Kd.bool() ? " " : "-");
};
const fullname = (Md, { gender: Nd  } = {
})=>{
    const Od = getGender(Nd || Md.gender());
    const Pd = `${Md.firstnames({
        gender: Od
    })} ${Md.surname()}`;
    return `${Md.title({
        gender: Od
    })} ${Pd}`;
};
const name = (Qd, { gender: Rd  } = {
})=>{
    const Sd = getGender(Rd || Qd.gender());
    return `${Qd.firstnames({
        gender: Sd
    }).split(" ")[0]} ${Qd.surname()}`;
};
const regex = (Td)=>(Ud, Vd = /[A-F0-9]{16}/)=>{
        const Wd = new Td(RegExp(Vd));
        Wd.randInt = (Xd, Yd)=>Xd + Math.floor(Ud.random() * (1 + Yd - Xd))
        ;
        return Wd.gen();
    }
;
const shuffle = (Zd, $d, { qty  } = {
})=>Zd.choose(typeof qty !== "undefined" ? qty : $d.length, $d)
;
const recurser = (_d, ae)=>{
    const be = (ce, de)=>{
        if (de === undefined) {
            de = ce;
        }
        if (ce === null || ce === undefined) {
            return ce;
        } else if (ce.constructor === Array) {
            return ce.map((ee)=>be(ee, de)
            );
        } else if (ce.constructor === Object) {
            if (_d(ce, de)) {
                return ae(ce, de);
            } else {
                Object.entries(ce).forEach(([fe, ge])=>{
                    ce[fe] = be(ge, de);
                });
                return ce;
            }
        } else {
            return ce;
        }
    };
    return be;
};
const transformer = recurser((he)=>he.fiona
, (ie)=>{
    if (ie.fiona.constructor === Array) {
        return (je)=>je[ie.fiona[0]](...ie.fiona.slice(1).map(transformer))
        ;
    } else {
        return (ke)=>ke[ie.fiona]()
        ;
    }
});
const fromJSON = (le, me)=>le.object(transformer(me))
;
const __default3 = (ne)=>{
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
        "name", name], [
        "fullname", fullname], [
        "regex",
        regex(ne)
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
var M = (pe)=>g(pe, "__esModule", {
        value: !0
    })
;
var x = (qe, re)=>()=>(re || qe((re = {
            exports: {
            }
        }).exports, re), re.exports)
;
var E = (se, te, ue)=>{
    if (te && typeof te == "object" || typeof te == "function") for (let ve of d(te))!m.call(se, ve) && ve !== "default" && g(se, ve, {
        get: ()=>te[ve]
        ,
        enumerable: !(ue = v(te, ve)) || ue.enumerable
    });
    return se;
}, _ = (we)=>E(M(g(we != null ? f(p(we)) : {
    }, "default", we && we.__esModule && "default" in we ? {
        get: ()=>we.default
        ,
        enumerable: !0
    } : {
        value: we,
        enumerable: !0
    })), we)
;
var w = x((xe, ye)=>{
    "use strict";
    var ze = class _class {
        overlaps(Ae) {
            return !(this.high < Ae.low || this.low > Ae.high);
        }
        touches(Be) {
            return !(this.high + 1 < Be.low || this.low - 1 > Be.high);
        }
        add(Ce) {
            return new ze(Math.min(this.low, Ce.low), Math.max(this.high, Ce.high));
        }
        subtract(De) {
            return De.low <= this.low && De.high >= this.high ? [] : De.low > this.low && De.high < this.high ? [
                new ze(this.low, De.low - 1),
                new ze(De.high + 1, this.high)
            ] : De.low <= this.low ? [
                new ze(De.high + 1, this.high)
            ] : [
                new ze(this.low, De.low - 1)
            ];
        }
        toString() {
            return this.low == this.high ? this.low.toString() : this.low + "-" + this.high;
        }
        constructor(Ee, Fe){
            this.low = Ee, this.high = Fe, this.length = 1 + Fe - Ee;
        }
    }, Ge = class _class {
        _update_length() {
            this.length = this.ranges.reduce((He, Ie)=>He + Ie.length
            , 0);
        }
        add(Je, Ke) {
            var Le = (Me)=>{
                for(var Ne = 0; Ne < this.ranges.length && !Me.touches(this.ranges[Ne]);)Ne++;
                for(var Oe = this.ranges.slice(0, Ne); Ne < this.ranges.length && Me.touches(this.ranges[Ne]);)Me = Me.add(this.ranges[Ne]), Ne++;
                Oe.push(Me), this.ranges = Oe.concat(this.ranges.slice(Ne)), this._update_length();
            };
            return Je instanceof Ge ? Je.ranges.forEach(Le) : (Ke == null && (Ke = Je), Le(new ze(Je, Ke))), this;
        }
        subtract(Pe, Qe) {
            var Re = (Se)=>{
                for(var Te = 0; Te < this.ranges.length && !Se.overlaps(this.ranges[Te]);)Te++;
                for(var Ue = this.ranges.slice(0, Te); Te < this.ranges.length && Se.overlaps(this.ranges[Te]);)Ue = Ue.concat(this.ranges[Te].subtract(Se)), Te++;
                this.ranges = Ue.concat(this.ranges.slice(Te)), this._update_length();
            };
            return Pe instanceof Ge ? Pe.ranges.forEach(Re) : (Qe == null && (Qe = Pe), Re(new ze(Pe, Qe))), this;
        }
        intersect(Ve, We) {
            var Xe = [], Ye = (Ze)=>{
                for(var $e = 0; $e < this.ranges.length && !Ze.overlaps(this.ranges[$e]);)$e++;
                for(; $e < this.ranges.length && Ze.overlaps(this.ranges[$e]);){
                    var _e = Math.max(this.ranges[$e].low, Ze.low), af = Math.min(this.ranges[$e].high, Ze.high);
                    Xe.push(new ze(_e, af)), $e++;
                }
            };
            return Ve instanceof Ge ? Ve.ranges.forEach(Ye) : (We == null && (We = Ve), Ye(new ze(Ve, We))), this.ranges = Xe, this._update_length(), this;
        }
        index(bf) {
            for(var cf = 0; cf < this.ranges.length && this.ranges[cf].length <= bf;)bf -= this.ranges[cf].length, cf++;
            return this.ranges[cf].low + bf;
        }
        toString() {
            return "[ " + this.ranges.join(", ") + " ]";
        }
        clone() {
            return new Ge(this);
        }
        numbers() {
            return this.ranges.reduce((df, ef)=>{
                for(var ff = ef.low; ff <= ef.high;)df.push(ff), ff++;
                return df;
            }, []);
        }
        subranges() {
            return this.ranges.map((gf)=>({
                    low: gf.low,
                    high: gf.high,
                    length: 1 + gf.high - gf.low
                })
            );
        }
        constructor(hf, jf){
            this.ranges = [], this.length = 0, hf != null && this.add(hf, jf);
        }
    };
    ye.exports = Ge;
});
var j = _(w());
var export_default = j.default;
var L = Object.create;
var N = Object.defineProperty;
var _1 = Object.getOwnPropertyDescriptor;
var z = Object.getOwnPropertyNames;
var Y = Object.getPrototypeOf, Z = Object.prototype.hasOwnProperty;
var J = (kf)=>N(kf, "__esModule", {
        value: !0
    })
;
var E1 = (lf, mf)=>()=>(mf || lf((mf = {
            exports: {
            }
        }).exports, mf), mf.exports)
;
var K = (nf, of, pf)=>{
    if (of && typeof of == "object" || typeof of == "function") for (let qf of z(of))!Z.call(nf, qf) && qf !== "default" && N(nf, qf, {
        get: ()=>of[qf]
        ,
        enumerable: !(pf = _1(of, qf)) || pf.enumerable
    });
    return nf;
}, x1 = (rf)=>K(J(N(rf != null ? L(Y(rf)) : {
    }, "default", rf && rf.__esModule && "default" in rf ? {
        get: ()=>rf.default
        ,
        enumerable: !0
    } : {
        value: rf,
        enumerable: !0
    })), rf)
;
var I = E1((sf, tf)=>{
    tf.exports = {
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
var S = E1((uf)=>{
    var vf = I(), wf = ()=>[
            {
                type: vf.RANGE,
                from: 48,
                to: 57
            }
        ]
    , xf = ()=>[
            {
                type: vf.CHAR,
                value: 95
            },
            {
                type: vf.RANGE,
                from: 97,
                to: 122
            },
            {
                type: vf.RANGE,
                from: 65,
                to: 90
            }
        ].concat(wf())
    , yf = ()=>[
            {
                type: vf.CHAR,
                value: 9
            },
            {
                type: vf.CHAR,
                value: 10
            },
            {
                type: vf.CHAR,
                value: 11
            },
            {
                type: vf.CHAR,
                value: 12
            },
            {
                type: vf.CHAR,
                value: 13
            },
            {
                type: vf.CHAR,
                value: 32
            },
            {
                type: vf.CHAR,
                value: 160
            },
            {
                type: vf.CHAR,
                value: 5760
            },
            {
                type: vf.RANGE,
                from: 8192,
                to: 8202
            },
            {
                type: vf.CHAR,
                value: 8232
            },
            {
                type: vf.CHAR,
                value: 8233
            },
            {
                type: vf.CHAR,
                value: 8239
            },
            {
                type: vf.CHAR,
                value: 8287
            },
            {
                type: vf.CHAR,
                value: 12288
            },
            {
                type: vf.CHAR,
                value: 65279
            }
        ]
    , zf = ()=>[
            {
                type: vf.CHAR,
                value: 10
            },
            {
                type: vf.CHAR,
                value: 13
            },
            {
                type: vf.CHAR,
                value: 8232
            },
            {
                type: vf.CHAR,
                value: 8233
            }
        ]
    ;
    uf.words = ()=>({
            type: vf.SET,
            set: xf(),
            not: !1
        })
    ;
    uf.notWords = ()=>({
            type: vf.SET,
            set: xf(),
            not: !0
        })
    ;
    uf.ints = ()=>({
            type: vf.SET,
            set: wf(),
            not: !1
        })
    ;
    uf.notInts = ()=>({
            type: vf.SET,
            set: wf(),
            not: !0
        })
    ;
    uf.whitespace = ()=>({
            type: vf.SET,
            set: yf(),
            not: !1
        })
    ;
    uf.notWhitespace = ()=>({
            type: vf.SET,
            set: yf(),
            not: !0
        })
    ;
    uf.anyChar = ()=>({
            type: vf.SET,
            set: zf(),
            not: !0
        })
    ;
});
var F = E1((Af)=>{
    var Bf = I(), Cf = S(), Df = "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?", Ef = {
        "0": 0,
        t: 9,
        n: 10,
        v: 11,
        f: 12,
        r: 13
    };
    Af.strToChars = function(Ff) {
        var Gf = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z[\\\]^?])|([0tnvfr]))/g;
        return Ff = Ff.replace(Gf, function(Hf, If, Jf, Kf, Lf, Mf, Nf, Of) {
            if (Jf) return Hf;
            var Pf = If ? 8 : Kf ? parseInt(Kf, 16) : Lf ? parseInt(Lf, 16) : Mf ? parseInt(Mf, 8) : Nf ? Df.indexOf(Nf) : Ef[Of], Qf = String.fromCharCode(Pf);
            return /[[\]{}^$.|?*+()]/.test(Qf) && (Qf = "\\" + Qf), Qf;
        }), Ff;
    };
    Af.tokenizeClass = (Rf, Sf)=>{
        for(var Tf = [], Uf = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?([^])/g, Vf, Wf; (Vf = Uf.exec(Rf)) != null;)if (Vf[1]) Tf.push(Cf.words());
        else if (Vf[2]) Tf.push(Cf.ints());
        else if (Vf[3]) Tf.push(Cf.whitespace());
        else if (Vf[4]) Tf.push(Cf.notWords());
        else if (Vf[5]) Tf.push(Cf.notInts());
        else if (Vf[6]) Tf.push(Cf.notWhitespace());
        else if (Vf[7]) Tf.push({
            type: Bf.RANGE,
            from: (Vf[8] || Vf[9]).charCodeAt(0),
            to: Vf[10].charCodeAt(0)
        });
        else if (Wf = Vf[12]) Tf.push({
            type: Bf.CHAR,
            value: Wf.charCodeAt(0)
        });
        else return [
            Tf,
            Uf.lastIndex
        ];
        Af.error(Sf, "Unterminated character class");
    };
    Af.error = (Xf, Yf)=>{
        throw new SyntaxError("Invalid regular expression: /" + Xf + "/: " + Yf);
    };
});
var U = E1((Zf)=>{
    var $f = I();
    Zf.wordBoundary = ()=>({
            type: $f.POSITION,
            value: "b"
        })
    ;
    Zf.nonWordBoundary = ()=>({
            type: $f.POSITION,
            value: "B"
        })
    ;
    Zf.begin = ()=>({
            type: $f.POSITION,
            value: "^"
        })
    ;
    Zf.end = ()=>({
            type: $f.POSITION,
            value: "$"
        })
    ;
});
var P = E1((_f, ag)=>{
    var bg = F(), cg = I(), dg = S(), eg = U();
    ag.exports = (fg)=>{
        var gg = 0, hg, ig, jg = {
            type: cg.ROOT,
            stack: []
        }, kg = jg, lg = jg.stack, mg = [], ng = (og)=>{
            bg.error(fg, `Nothing to repeat at column ${og - 1}`);
        }, pg = bg.strToChars(fg);
        for(hg = pg.length; gg < hg;)switch(ig = pg[gg++], ig){
            case "\\":
                switch(ig = pg[gg++], ig){
                    case "b":
                        lg.push(eg.wordBoundary());
                        break;
                    case "B":
                        lg.push(eg.nonWordBoundary());
                        break;
                    case "w":
                        lg.push(dg.words());
                        break;
                    case "W":
                        lg.push(dg.notWords());
                        break;
                    case "d":
                        lg.push(dg.ints());
                        break;
                    case "D":
                        lg.push(dg.notInts());
                        break;
                    case "s":
                        lg.push(dg.whitespace());
                        break;
                    case "S":
                        lg.push(dg.notWhitespace());
                        break;
                    default:
                        /\d/.test(ig) ? lg.push({
                            type: cg.REFERENCE,
                            value: parseInt(ig, 10)
                        }) : lg.push({
                            type: cg.CHAR,
                            value: ig.charCodeAt(0)
                        });
                }
                break;
            case "^":
                lg.push(eg.begin());
                break;
            case "$":
                lg.push(eg.end());
                break;
            case "[":
                var qg;
                pg[gg] === "^" ? (qg = !0, gg++) : qg = !1;
                var rg = bg.tokenizeClass(pg.slice(gg), fg);
                gg += rg[1], lg.push({
                    type: cg.SET,
                    set: rg[0],
                    not: qg
                });
                break;
            case ".":
                lg.push(dg.anyChar());
                break;
            case "(":
                var sg = {
                    type: cg.GROUP,
                    stack: [],
                    remember: !0
                };
                ig = pg[gg], ig === "?" && (ig = pg[gg + 1], gg += 2, ig === "=" ? sg.followedBy = !0 : ig === "!" ? sg.notFollowedBy = !0 : ig !== ":" && bg.error(fg, `Invalid group, character '${ig}' after '?' at column ${gg - 1}`), sg.remember = !1), lg.push(sg), mg.push(kg), kg = sg, lg = sg.stack;
                break;
            case ")":
                mg.length === 0 && bg.error(fg, `Unmatched ) at column ${gg - 1}`), kg = mg.pop(), lg = kg.options ? kg.options[kg.options.length - 1] : kg.stack;
                break;
            case "|":
                kg.options || (kg.options = [
                    kg.stack
                ], delete kg.stack);
                var tg = [];
                kg.options.push(tg), lg = tg;
                break;
            case "{":
                var ug = /^(\d+)(,(\d+)?)?\}/.exec(pg.slice(gg)), vg, wg;
                ug !== null ? (lg.length === 0 && ng(gg), vg = parseInt(ug[1], 10), wg = ug[2] ? ug[3] ? parseInt(ug[3], 10) : 1 / 0 : vg, gg += ug[0].length, lg.push({
                    type: cg.REPETITION,
                    min: vg,
                    max: wg,
                    value: lg.pop()
                })) : lg.push({
                    type: cg.CHAR,
                    value: 123
                });
                break;
            case "?":
                lg.length === 0 && ng(gg), lg.push({
                    type: cg.REPETITION,
                    min: 0,
                    max: 1,
                    value: lg.pop()
                });
                break;
            case "+":
                lg.length === 0 && ng(gg), lg.push({
                    type: cg.REPETITION,
                    min: 1,
                    max: 1 / 0,
                    value: lg.pop()
                });
                break;
            case "*":
                lg.length === 0 && ng(gg), lg.push({
                    type: cg.REPETITION,
                    min: 0,
                    max: 1 / 0,
                    value: lg.pop()
                });
                break;
            default:
                lg.push({
                    type: cg.CHAR,
                    value: ig.charCodeAt(0)
                });
        }
        return mg.length !== 0 && bg.error(fg, "Unterminated group"), jg;
    };
    ag.exports.types = cg;
});
var X = x1(P()), j1 = x1(P()), { types: oe  } = X;
var export_default1 = j1.default;
var C = Object.create;
var o = Object.defineProperty;
var y = Object.getOwnPropertyDescriptor;
var E2 = Object.getOwnPropertyNames;
var x2 = Object.getPrototypeOf, I1 = Object.prototype.hasOwnProperty;
var w1 = (xg)=>o(xg, "__esModule", {
        value: !0
    })
;
((yg)=>typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy(yg, {
        get: (zg, Ag)=>(typeof require != "undefined" ? require : zg)[Ag]
    }) : yg
)(function(Bg) {
    if (typeof require != "undefined") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + Bg + '" is not supported');
});
var O = (Cg, Dg)=>()=>(Dg || Cg((Dg = {
            exports: {
            }
        }).exports, Dg), Dg.exports)
;
var v1 = (Eg, Fg, Gg)=>{
    if (Fg && typeof Fg == "object" || typeof Fg == "function") for (let Hg of E2(Fg))!I1.call(Eg, Hg) && Hg !== "default" && o(Eg, Hg, {
        get: ()=>Fg[Hg]
        ,
        enumerable: !(Gg = y(Fg, Hg)) || Gg.enumerable
    });
    return Eg;
}, _2 = (Ig)=>v1(w1(o(Ig != null ? C(x2(Ig)) : {
    }, "default", Ig && Ig.__esModule && "default" in Ig ? {
        get: ()=>Ig.default
        ,
        enumerable: !0
    } : {
        value: Ig,
        enumerable: !0
    })), Ig)
;
var c = O((Jg, Kg)=>{
    var Lg = export_default1, Mg = export_default, Ng = Lg.types;
    Kg.exports = class h {
        _setDefaults(Og) {
            this.max = Og.max != null ? Og.max : h.prototype.max != null ? h.prototype.max : 100, this.defaultRange = Og.defaultRange ? Og.defaultRange : this.defaultRange.clone(), Og.randInt && (this.randInt = Og.randInt);
        }
        gen() {
            return this._gen(this.tokens, []);
        }
        _gen(Pg, Qg) {
            var Rg, Sg, Tg, Ug, Vg;
            switch(Pg.type){
                case Ng.ROOT:
                case Ng.GROUP:
                    if (Pg.followedBy || Pg.notFollowedBy) return "";
                    for(Pg.remember && Pg.groupNumber === void 0 && (Pg.groupNumber = Qg.push(null) - 1), Rg = Pg.options ? this._randSelect(Pg.options) : Pg.stack, Sg = "", Ug = 0, Vg = Rg.length; Ug < Vg; Ug++)Sg += this._gen(Rg[Ug], Qg);
                    return Pg.remember && (Qg[Pg.groupNumber] = Sg), Sg;
                case Ng.POSITION:
                    return "";
                case Ng.SET:
                    var Wg = this._expand(Pg);
                    return Wg.length ? String.fromCharCode(this._randSelect(Wg)) : "";
                case Ng.REPETITION:
                    for(Tg = this.randInt(Pg.min, Pg.max === 1 / 0 ? Pg.min + this.max : Pg.max), Sg = "", Ug = 0; Ug < Tg; Ug++)Sg += this._gen(Pg.value, Qg);
                    return Sg;
                case Ng.REFERENCE:
                    return Qg[Pg.value - 1] || "";
                case Ng.CHAR:
                    var Xg = this.ignoreCase && this._randBool() ? this._toOtherCase(Pg.value) : Pg.value;
                    return String.fromCharCode(Xg);
            }
        }
        _toOtherCase(Yg) {
            return Yg + (97 <= Yg && Yg <= 122 ? -32 : 65 <= Yg && Yg <= 90 ? 32 : 0);
        }
        _randBool() {
            return !this.randInt(0, 1);
        }
        _randSelect(Zg) {
            return Zg instanceof Mg ? Zg.index(this.randInt(0, Zg.length - 1)) : Zg[this.randInt(0, Zg.length - 1)];
        }
        _expand($g) {
            if ($g.type === Lg.types.CHAR) return new Mg($g.value);
            if ($g.type === Lg.types.RANGE) return new Mg($g.from, $g.to);
            {
                let _g = new Mg;
                for(let ah = 0; ah < $g.set.length; ah++){
                    let bh = this._expand($g.set[ah]);
                    if (_g.add(bh), this.ignoreCase) for(let ch = 0; ch < bh.length; ch++){
                        let dh = bh.index(ch), eh = this._toOtherCase(dh);
                        dh !== eh && _g.add(eh);
                    }
                }
                return $g.not ? this.defaultRange.clone().subtract(_g) : this.defaultRange.clone().intersect(_g);
            }
        }
        randInt(fh, gh) {
            return fh + Math.floor(Math.random() * (1 + gh - fh));
        }
        get defaultRange() {
            return this._range = this._range || new Mg(32, 126);
        }
        set defaultRange(hh) {
            this._range = hh;
        }
        static randexp(ih, jh) {
            var kh;
            return typeof ih == "string" && (ih = new RegExp(ih, jh)), ih._randexp === void 0 ? (kh = new h(ih, jh), ih._randexp = kh) : (kh = ih._randexp, kh._setDefaults(ih)), kh.gen();
        }
        static sugar() {
            RegExp.prototype.gen = function() {
                return h.randexp(this);
            };
        }
        constructor(lh, mh){
            if (this._setDefaults(lh), lh instanceof RegExp) this.ignoreCase = lh.ignoreCase, this.multiline = lh.multiline, lh = lh.source;
            else if (typeof lh == "string") this.ignoreCase = mh && mh.indexOf("i") !== -1, this.multiline = mh && mh.indexOf("m") !== -1;
            else throw new Error("Expected a regexp or string");
            this.tokens = Lg(lh);
        }
    };
});
var b = _2(c()), N1 = _2(c()), { randexp: B , sugar: D  } = b;
var export_default2 = N1.default;
const Fiona1 = __default3(export_default2);
return Fiona1;
});
