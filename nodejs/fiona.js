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
    version: "4.0.0-alpha.7"
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
const chooser = (Wb, Xb, Yb)=>{
    const Zb = Xb.reduce(($b, _b, ac)=>{
        $b.push(($b[ac - 1] || 0) + (typeof Yb[ac] === "number" ? Yb[ac] : 1));
        return $b;
    }, []);
    const bc = Wb * Zb[Zb.length - 1];
    let cc;
    Zb.every((dc, ec)=>{
        if (bc > dc) {
            return true;
        } else {
            cc = ec;
            return false;
        }
    });
    return cc;
};
const choose = (fc, gc, hc, { weights =[]  } = {
})=>{
    const ic = hc.slice(0);
    const jc = weights.slice(0);
    return Array(gc || 0).fill(null).map(()=>{
        const kc = chooser(fc.random(), ic, jc);
        const lc = ic[kc];
        ic[kc] = ic[0];
        ic.shift();
        return lc;
    });
};
const oneOf = (mc, nc, { weights =[]  } = {
})=>{
    return nc[chooser(mc.random(), nc, weights)];
};
const date = (oc, { min ="1940" , max ="2000" , long: pc = false  } = {
})=>{
    const qc = new Date(min) * 1;
    const rc = new Date(max) * 1;
    if (qc > rc) {
        throw Error(`min date must be lower than max date`);
    }
    const sc = rc - qc;
    const tc = new Date(oc.number({
        max: sc
    }) + qc).toISOString();
    return pc ? tc : tc.slice(0, 10);
};
const RGB = (uc, vc, wc)=>"#" + [
        uc,
        vc,
        wc
    ].map((xc)=>`0${xc.toString(16)}`.slice(-2)
    ).join("")
;
const getme = (yc)=>{
    return yc.slice(1).match(/(..)/g).map((zc)=>parseInt(zc, 16)
    );
};
const mapper = (Ac, Bc)=>(Cc)=>{
        return Ac.reduce((Dc, Ec, Fc)=>{
            const Gc = Math.min(Bc[Fc], Ac[Fc]);
            const Hc = Math.max(Bc[Fc], Ac[Fc]);
            const Ic = Hc - Gc;
            return `${Dc}${(Gc + Math.ceil(Ic * Cc)).toString(16)}`;
        }, "#");
    }
;
const colorMapperFactory = (Jc)=>{
    const Kc = Jc.map(({ start , end  })=>mapper(getme(start), getme(end))
    );
    return (Lc)=>{
        const Mc = Math.floor(Jc.length * Lc);
        return Kc[Mc](Lc);
    };
};
const img = (Nc, Oc)=>{
    const { seed , width , height , bg , colors  } = Object.assign(Nc.object({
        seed: Nc.number(),
        width: 1000,
        height: 1000,
        bg: RGB(Nc.number({
            max: 255
        }), Nc.number({
            max: 255
        }), Nc.number({
            max: 255
        })),
        colors: Nc.array({
            min: 1,
            max: 10
        }, (Pc)=>({
                start: RGB(Pc.number({
                    max: 255
                }), Pc.number({
                    max: 255
                }), Pc.number({
                    max: 255
                })),
                end: RGB(Pc.number({
                    max: 255
                }), Pc.number({
                    max: 255
                }), Pc.number({
                    max: 255
                }))
            })
        )
    }), Oc);
    const Qc = colorMapperFactory(colors);
    const Rc = [];
    for(let Sc = 0; Sc < 100; Sc++){
        const Tc = Qc(Sc / 100);
        const Uc = seed * Sc % 360;
        const [Vc, Wc, Xc, Yc] = [
            5 * Sc,
            5 / seed,
            Sc * seed,
            Sc
        ].map(Math.floor).map((Zc)=>Zc % (Math.max(width, height) * 3)
        );
        Rc.push(`<rect x="${Vc}" y="${Wc}" width="${Xc}" height="${Yc}" transform="rotate(${Uc})" fill="${Tc}" />`);
    }
    const $c = (_c)=>encodeURIComponent(`
    <svg width="${width}" height="${height}" viewBox="${-1 * width} ${-1 * height} ${width * 2} ${height * 2}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <style>svg { background-color: ${bg}; }</style>
      ${_c}
    </svg>
  `)
    ;
    return `data:image/svg+xml;utf8,${$c(Rc.join("\n"))}`;
};
const duplicable = (ad, { frequency =0.1 , pool =10  } = {
})=>{
    if (ad.random() <= frequency) {
        ad.reset((Math.floor(ad.random() * pool + 1) / pool + 1) * 10000000000000000);
    }
    return ad;
};
const lorem = (bd, { qty =15  } = {
})=>{
    const cd = bd.random() < 0.2 ? "lorem ipsum " : "";
    let dd = [];
    while(dd.length < qty){
        dd = dd.concat("dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" "));
    }
    return cd + bd.choose(qty, dd).join(" ");
};
const word = (ed)=>ed.lorem({
        qty: 1
    }).split(" ")[0]
;
const sentence = (fd)=>{
    const gd = fd.lorem({
        qty: 25
    });
    return gd[0].toUpperCase() + gd.slice(1) + ".";
};
const paragraph = (hd)=>Array(hd.number({
        min: 1,
        max: 10
    })).fill(0).map(()=>hd.sentence()
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
const getGender = (id)=>id && (id[0].toLowerCase() === "f" ? "female" : "male")
;
const gender = (jd)=>{
    return jd.random() < 0.5 ? "male" : "female";
};
const title = (kd, { gender  } = {
})=>{
    return kd.oneOf(namedata[getGender(gender || kd.gender())].title, {
        weights: [
            5,
            3
        ]
    });
};
const firstname = (ld, { gender  } = {
})=>{
    return ld.oneOf(namedata[getGender(gender || ld.gender())].firstname);
};
const firstnames = (md, { gender  } = {
})=>{
    return md.choose(md.clone().distribution((nd)=>nd * nd * nd
    ).number({
        min: 1,
        max: 3
    }), namedata[getGender(gender || md.gender())].firstname).join(" ");
};
const surname = (od)=>{
    return od.choose(od.clone().distribution((pd)=>pd * pd * pd
    ).number({
        min: 1,
        max: 2
    }), namedata.surname).join(od.bool() ? " " : "-");
};
const fullname = (qd, { gender  } = {
})=>{
    const rd = getGender(gender || qd.gender());
    return `${qd.title({
        gender: rd
    })} ${qd.firstnames({
        gender: rd
    })} ${qd.surname()}`;
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
            for(var pe = 0; pe < this.ranges.length && this.ranges[pe].length <= ne;)ne -= this.ranges[pe].length, pe++;
            return this.ranges[pe].low + ne;
        }
        toString() {
            return "[ " + this.ranges.join(", ") + " ]";
        }
        clone() {
            return new Sd(this);
        }
        numbers() {
            return this.ranges.reduce((qe, re)=>{
                for(var se = re.low; se <= re.high;)qe.push(se), se++;
                return qe;
            }, []);
        }
        subranges() {
            return this.ranges.map((te)=>({
                    low: te.low,
                    high: te.high,
                    length: 1 + te.high - te.low
                })
            );
        }
        constructor(ue, ve){
            this.ranges = [], this.length = 0, ue != null && this.add(ue, ve);
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
var J = (we)=>N(we, "__esModule", {
        value: !0
    })
;
var E1 = (xe, ye)=>()=>(ye || xe((ye = {
            exports: {
            }
        }).exports, ye), ye.exports)
;
var K = (ze, Ae, Be)=>{
    if (Ae && typeof Ae == "object" || typeof Ae == "function") for (let Ce of z(Ae))!Z.call(ze, Ce) && Ce !== "default" && N(ze, Ce, {
        get: ()=>Ae[Ce]
        ,
        enumerable: !(Be = _1(Ae, Ce)) || Be.enumerable
    });
    return ze;
}, x1 = (De)=>K(J(N(De != null ? L(Y(De)) : {
    }, "default", De && De.__esModule && "default" in De ? {
        get: ()=>De.default
        ,
        enumerable: !0
    } : {
        value: De,
        enumerable: !0
    })), De)
;
var I = E1((Ee, Fe)=>{
    Fe.exports = {
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
var S = E1((Ge)=>{
    var He = I(), Ie = ()=>[
            {
                type: He.RANGE,
                from: 48,
                to: 57
            }
        ]
    , Je = ()=>[
            {
                type: He.CHAR,
                value: 95
            },
            {
                type: He.RANGE,
                from: 97,
                to: 122
            },
            {
                type: He.RANGE,
                from: 65,
                to: 90
            }
        ].concat(Ie())
    , Ke = ()=>[
            {
                type: He.CHAR,
                value: 9
            },
            {
                type: He.CHAR,
                value: 10
            },
            {
                type: He.CHAR,
                value: 11
            },
            {
                type: He.CHAR,
                value: 12
            },
            {
                type: He.CHAR,
                value: 13
            },
            {
                type: He.CHAR,
                value: 32
            },
            {
                type: He.CHAR,
                value: 160
            },
            {
                type: He.CHAR,
                value: 5760
            },
            {
                type: He.RANGE,
                from: 8192,
                to: 8202
            },
            {
                type: He.CHAR,
                value: 8232
            },
            {
                type: He.CHAR,
                value: 8233
            },
            {
                type: He.CHAR,
                value: 8239
            },
            {
                type: He.CHAR,
                value: 8287
            },
            {
                type: He.CHAR,
                value: 12288
            },
            {
                type: He.CHAR,
                value: 65279
            }
        ]
    , Le = ()=>[
            {
                type: He.CHAR,
                value: 10
            },
            {
                type: He.CHAR,
                value: 13
            },
            {
                type: He.CHAR,
                value: 8232
            },
            {
                type: He.CHAR,
                value: 8233
            }
        ]
    ;
    Ge.words = ()=>({
            type: He.SET,
            set: Je(),
            not: !1
        })
    ;
    Ge.notWords = ()=>({
            type: He.SET,
            set: Je(),
            not: !0
        })
    ;
    Ge.ints = ()=>({
            type: He.SET,
            set: Ie(),
            not: !1
        })
    ;
    Ge.notInts = ()=>({
            type: He.SET,
            set: Ie(),
            not: !0
        })
    ;
    Ge.whitespace = ()=>({
            type: He.SET,
            set: Ke(),
            not: !1
        })
    ;
    Ge.notWhitespace = ()=>({
            type: He.SET,
            set: Ke(),
            not: !0
        })
    ;
    Ge.anyChar = ()=>({
            type: He.SET,
            set: Le(),
            not: !0
        })
    ;
});
var F = E1((Me)=>{
    var Ne = I(), Oe = S(), Pe = "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?", Qe = {
        "0": 0,
        t: 9,
        n: 10,
        v: 11,
        f: 12,
        r: 13
    };
    Me.strToChars = function(Re) {
        var Se = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z[\\\]^?])|([0tnvfr]))/g;
        return Re = Re.replace(Se, function(Te, Ue, Ve, We, Xe, Ye, Ze, $e) {
            if (Ve) return Te;
            var _e = Ue ? 8 : We ? parseInt(We, 16) : Xe ? parseInt(Xe, 16) : Ye ? parseInt(Ye, 8) : Ze ? Pe.indexOf(Ze) : Qe[$e], af = String.fromCharCode(_e);
            return /[[\]{}^$.|?*+()]/.test(af) && (af = "\\" + af), af;
        }), Re;
    };
    Me.tokenizeClass = (bf, cf)=>{
        for(var df = [], ef = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?([^])/g, ff, gf; (ff = ef.exec(bf)) != null;)if (ff[1]) df.push(Oe.words());
        else if (ff[2]) df.push(Oe.ints());
        else if (ff[3]) df.push(Oe.whitespace());
        else if (ff[4]) df.push(Oe.notWords());
        else if (ff[5]) df.push(Oe.notInts());
        else if (ff[6]) df.push(Oe.notWhitespace());
        else if (ff[7]) df.push({
            type: Ne.RANGE,
            from: (ff[8] || ff[9]).charCodeAt(0),
            to: ff[10].charCodeAt(0)
        });
        else if (gf = ff[12]) df.push({
            type: Ne.CHAR,
            value: gf.charCodeAt(0)
        });
        else return [
            df,
            ef.lastIndex
        ];
        Me.error(cf, "Unterminated character class");
    };
    Me.error = (hf, jf)=>{
        throw new SyntaxError("Invalid regular expression: /" + hf + "/: " + jf);
    };
});
var U = E1((kf)=>{
    var lf = I();
    kf.wordBoundary = ()=>({
            type: lf.POSITION,
            value: "b"
        })
    ;
    kf.nonWordBoundary = ()=>({
            type: lf.POSITION,
            value: "B"
        })
    ;
    kf.begin = ()=>({
            type: lf.POSITION,
            value: "^"
        })
    ;
    kf.end = ()=>({
            type: lf.POSITION,
            value: "$"
        })
    ;
});
var P = E1((mf, nf)=>{
    var of = F(), pf = I(), qf = S(), rf = U();
    nf.exports = (sf)=>{
        var tf = 0, uf, vf, wf = {
            type: pf.ROOT,
            stack: []
        }, xf = wf, yf = wf.stack, zf = [], Af = (Bf)=>{
            of.error(sf, `Nothing to repeat at column ${Bf - 1}`);
        }, Cf = of.strToChars(sf);
        for(uf = Cf.length; tf < uf;)switch(vf = Cf[tf++], vf){
            case "\\":
                switch(vf = Cf[tf++], vf){
                    case "b":
                        yf.push(rf.wordBoundary());
                        break;
                    case "B":
                        yf.push(rf.nonWordBoundary());
                        break;
                    case "w":
                        yf.push(qf.words());
                        break;
                    case "W":
                        yf.push(qf.notWords());
                        break;
                    case "d":
                        yf.push(qf.ints());
                        break;
                    case "D":
                        yf.push(qf.notInts());
                        break;
                    case "s":
                        yf.push(qf.whitespace());
                        break;
                    case "S":
                        yf.push(qf.notWhitespace());
                        break;
                    default:
                        /\d/.test(vf) ? yf.push({
                            type: pf.REFERENCE,
                            value: parseInt(vf, 10)
                        }) : yf.push({
                            type: pf.CHAR,
                            value: vf.charCodeAt(0)
                        });
                }
                break;
            case "^":
                yf.push(rf.begin());
                break;
            case "$":
                yf.push(rf.end());
                break;
            case "[":
                var Df;
                Cf[tf] === "^" ? (Df = !0, tf++) : Df = !1;
                var Ef = of.tokenizeClass(Cf.slice(tf), sf);
                tf += Ef[1], yf.push({
                    type: pf.SET,
                    set: Ef[0],
                    not: Df
                });
                break;
            case ".":
                yf.push(qf.anyChar());
                break;
            case "(":
                var Ff = {
                    type: pf.GROUP,
                    stack: [],
                    remember: !0
                };
                vf = Cf[tf], vf === "?" && (vf = Cf[tf + 1], tf += 2, vf === "=" ? Ff.followedBy = !0 : vf === "!" ? Ff.notFollowedBy = !0 : vf !== ":" && of.error(sf, `Invalid group, character '${vf}' after '?' at column ${tf - 1}`), Ff.remember = !1), yf.push(Ff), zf.push(xf), xf = Ff, yf = Ff.stack;
                break;
            case ")":
                zf.length === 0 && of.error(sf, `Unmatched ) at column ${tf - 1}`), xf = zf.pop(), yf = xf.options ? xf.options[xf.options.length - 1] : xf.stack;
                break;
            case "|":
                xf.options || (xf.options = [
                    xf.stack
                ], delete xf.stack);
                var Gf = [];
                xf.options.push(Gf), yf = Gf;
                break;
            case "{":
                var Hf = /^(\d+)(,(\d+)?)?\}/.exec(Cf.slice(tf)), If, Jf;
                Hf !== null ? (yf.length === 0 && Af(tf), If = parseInt(Hf[1], 10), Jf = Hf[2] ? Hf[3] ? parseInt(Hf[3], 10) : 1 / 0 : If, tf += Hf[0].length, yf.push({
                    type: pf.REPETITION,
                    min: If,
                    max: Jf,
                    value: yf.pop()
                })) : yf.push({
                    type: pf.CHAR,
                    value: 123
                });
                break;
            case "?":
                yf.length === 0 && Af(tf), yf.push({
                    type: pf.REPETITION,
                    min: 0,
                    max: 1,
                    value: yf.pop()
                });
                break;
            case "+":
                yf.length === 0 && Af(tf), yf.push({
                    type: pf.REPETITION,
                    min: 1,
                    max: 1 / 0,
                    value: yf.pop()
                });
                break;
            case "*":
                yf.length === 0 && Af(tf), yf.push({
                    type: pf.REPETITION,
                    min: 0,
                    max: 1 / 0,
                    value: yf.pop()
                });
                break;
            default:
                yf.push({
                    type: pf.CHAR,
                    value: vf.charCodeAt(0)
                });
        }
        return zf.length !== 0 && of.error(sf, "Unterminated group"), wf;
    };
    nf.exports.types = pf;
});
var X = x1(P()), j1 = x1(P()), { types: oe  } = X;
var export_default1 = j1.default;
var C = Object.create;
var o = Object.defineProperty;
var y = Object.getOwnPropertyDescriptor;
var E2 = Object.getOwnPropertyNames;
var x2 = Object.getPrototypeOf, I1 = Object.prototype.hasOwnProperty;
var w1 = (Kf)=>o(Kf, "__esModule", {
        value: !0
    })
;
((Lf)=>typeof require != "undefined" ? require : typeof Proxy != "undefined" ? new Proxy(Lf, {
        get: (Mf, Nf)=>(typeof require != "undefined" ? require : Mf)[Nf]
    }) : Lf
)(function(Of) {
    if (typeof require != "undefined") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + Of + '" is not supported');
});
var O = (Pf, Qf)=>()=>(Qf || Pf((Qf = {
            exports: {
            }
        }).exports, Qf), Qf.exports)
;
var v1 = (Rf, Sf, Tf)=>{
    if (Sf && typeof Sf == "object" || typeof Sf == "function") for (let Uf of E2(Sf))!I1.call(Rf, Uf) && Uf !== "default" && o(Rf, Uf, {
        get: ()=>Sf[Uf]
        ,
        enumerable: !(Tf = y(Sf, Uf)) || Tf.enumerable
    });
    return Rf;
}, _2 = (Vf)=>v1(w1(o(Vf != null ? C(x2(Vf)) : {
    }, "default", Vf && Vf.__esModule && "default" in Vf ? {
        get: ()=>Vf.default
        ,
        enumerable: !0
    } : {
        value: Vf,
        enumerable: !0
    })), Vf)
;
var c = O((Wf, Xf)=>{
    var Yf = export_default1, Zf = export_default, $f = Yf.types;
    Xf.exports = class h {
        _setDefaults(_f) {
            this.max = _f.max != null ? _f.max : h.prototype.max != null ? h.prototype.max : 100, this.defaultRange = _f.defaultRange ? _f.defaultRange : this.defaultRange.clone(), _f.randInt && (this.randInt = _f.randInt);
        }
        gen() {
            return this._gen(this.tokens, []);
        }
        _gen(ag, bg) {
            var cg, dg, eg, fg, gg;
            switch(ag.type){
                case $f.ROOT:
                case $f.GROUP:
                    if (ag.followedBy || ag.notFollowedBy) return "";
                    for(ag.remember && ag.groupNumber === void 0 && (ag.groupNumber = bg.push(null) - 1), cg = ag.options ? this._randSelect(ag.options) : ag.stack, dg = "", fg = 0, gg = cg.length; fg < gg; fg++)dg += this._gen(cg[fg], bg);
                    return ag.remember && (bg[ag.groupNumber] = dg), dg;
                case $f.POSITION:
                    return "";
                case $f.SET:
                    var hg = this._expand(ag);
                    return hg.length ? String.fromCharCode(this._randSelect(hg)) : "";
                case $f.REPETITION:
                    for(eg = this.randInt(ag.min, ag.max === 1 / 0 ? ag.min + this.max : ag.max), dg = "", fg = 0; fg < eg; fg++)dg += this._gen(ag.value, bg);
                    return dg;
                case $f.REFERENCE:
                    return bg[ag.value - 1] || "";
                case $f.CHAR:
                    var ig = this.ignoreCase && this._randBool() ? this._toOtherCase(ag.value) : ag.value;
                    return String.fromCharCode(ig);
            }
        }
        _toOtherCase(jg) {
            return jg + (97 <= jg && jg <= 122 ? -32 : 65 <= jg && jg <= 90 ? 32 : 0);
        }
        _randBool() {
            return !this.randInt(0, 1);
        }
        _randSelect(kg) {
            return kg instanceof Zf ? kg.index(this.randInt(0, kg.length - 1)) : kg[this.randInt(0, kg.length - 1)];
        }
        _expand(lg) {
            if (lg.type === Yf.types.CHAR) return new Zf(lg.value);
            if (lg.type === Yf.types.RANGE) return new Zf(lg.from, lg.to);
            {
                let mg = new Zf;
                for(let ng = 0; ng < lg.set.length; ng++){
                    let og = this._expand(lg.set[ng]);
                    if (mg.add(og), this.ignoreCase) for(let pg = 0; pg < og.length; pg++){
                        let qg = og.index(pg), rg = this._toOtherCase(qg);
                        qg !== rg && mg.add(rg);
                    }
                }
                return lg.not ? this.defaultRange.clone().subtract(mg) : this.defaultRange.clone().intersect(mg);
            }
        }
        randInt(sg, tg) {
            return sg + Math.floor(Math.random() * (1 + tg - sg));
        }
        get defaultRange() {
            return this._range = this._range || new Zf(32, 126);
        }
        set defaultRange(ug) {
            this._range = ug;
        }
        static randexp(vg, wg) {
            var xg;
            return typeof vg == "string" && (vg = new RegExp(vg, wg)), vg._randexp === void 0 ? (xg = new h(vg, wg), vg._randexp = xg) : (xg = vg._randexp, xg._setDefaults(vg)), xg.gen();
        }
        static sugar() {
            RegExp.prototype.gen = function() {
                return h.randexp(this);
            };
        }
        constructor(yg, zg){
            if (this._setDefaults(yg), yg instanceof RegExp) this.ignoreCase = yg.ignoreCase, this.multiline = yg.multiline, yg = yg.source;
            else if (typeof yg == "string") this.ignoreCase = zg && zg.indexOf("i") !== -1, this.multiline = zg && zg.indexOf("m") !== -1;
            else throw new Error("Expected a regexp or string");
            this.tokens = Yf(yg);
        }
    };
});
var b = _2(c()), N1 = _2(c()), { randexp: B , sugar: D  } = b;
var export_default4 = N1.default;
const Fiona1 = __default3(export_default4);
return Fiona1;
});
