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
    version: "4.0.0-alpha.4"
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
    const $ = ()=>{
        const aa = Q ^ Q << 11;
        [Q, T, V] = [
            T,
            V,
            W
        ];
        W = W ^ W >> 19 ^ aa ^ aa >> 8;
        return W / 2147483647;
    };
    const ba = ()=>{
        let ca = W ^ V ^ V >> 19;
        ca = ca ^ ca >> 8;
        ca = ca ^ ca >> 16;
        ca = ca ^ ca << 11;
        ca = ca ^ ca << 22;
        [W, V, T] = [
            V,
            T,
            Q
        ];
        Q = ca;
        return W / 2147483647;
    };
    const da = ()=>Math.round($() * 10000000000000000)
    ;
    const ea = (fa)=>{
        [Q, T, V, W] = baseSeeds.map((ga)=>ga + fa
        );
        [Q, T, V, W] = [
            da(),
            da(),
            da(),
            da()
        ];
    };
    ea(H);
    return {
        random: ()=>$()
        ,
        reverse: ()=>ba()
        ,
        reseed: ea,
        getState: ()=>[
                Q,
                T,
                V,
                W
            ]
        ,
        setState: (ha)=>[Q, T, V, W] = ha
    };
};
const stringToIntegers = (ia)=>ia.split("").map((ja)=>ja.charCodeAt(0)
    )
;
const compound = (ka, la)=>xorify(ka + la)
;
const xorify = (ma)=>xor(ma % 2147483647).random() * 2147483647
;
const prepareSeed = (na)=>typeof na === "string" ? stringToIntegers(na).reduce(compound, 0) : na
;
const processSeed = (oa, pa = [])=>[
        oa,
        ...pa
    ].map(prepareSeed).reduce(compound, 0)
;
const defaultDistribution = (qa)=>qa
;
const __default1 = (ra)=>{
    let sa = defaultDistribution;
    return (ta)=>{
        if (typeof ta === "function") {
            sa = ta;
            return ra;
        } else if (ta === null) {
            sa = defaultDistribution;
            return ra;
        } else {
            return sa(ta);
        }
    };
};
const __default2 = (ua, va)=>{
    const { reseed , getState , setState , random: wa , reverse  } = xor(0);
    reseed(processSeed(va));
    const xa = getState();
    const ya = (za)=>{
        if (za === undefined) {
            return getState();
        } else {
            if (za === null) {
                setState(xa);
            } else {
                setState(za);
            }
            return ua;
        }
    };
    const Aa = __default1(ua);
    const Ba = (Ca)=>{
        reseed(processSeed(Ca !== undefined ? JSON.stringify([
            Ca,
            []
        ]) : va));
        return ua;
    };
    const Da = ()=>Aa(wa())
    ;
    return {
        state: ya,
        reset: Ba,
        random: Da,
        reverse,
        distribution: Aa
    };
};
const handleArray = (Ea, Fa, Ga, Ha)=>{
    for(let Ia = 0; Ia < Fa.length; Ia++){
        Fa[Ia] = recursor(Ea, Fa[Ia], Ga.concat(Ia), Ha);
    }
    return Fa;
};
const handleObject = (Ja, Ka, La, Ma)=>{
    for(const Na in Ka){
        Ka[Na] = recursor(Ja, Ka[Na], La.concat(Na), Ma);
    }
    return Ka;
};
const handleFunction = (Oa, Pa, Qa, Ra)=>{
    const Sa = new Oa.constructor(__default2, Oa.info().initseed, Oa.info().path.concat(Qa));
    Sa.data = Ra;
    const Ta = registered.indexOf(Pa) !== -1 ? Pa() : Pa(Sa);
    return recursor(Oa, Ta, Qa, Qa.length ? Ra : Ta);
};
const handleRegex = (Ua, Va, Wa, Xa)=>Ua.regex ? handleFunction(Ua, (Ya)=>Ya.regex(Va)
    , Wa, Xa) : Va
;
const recursor = (Za, $a, _a, ab)=>$a === null || $a === undefined ? $a : $a.constructor === Array ? handleArray(Za, $a, _a, ab) : $a.constructor === Object ? handleObject(Za, $a, _a, ab) : typeof $a === "function" ? handleFunction(Za, $a, _a, ab) : $a.constructor === RegExp ? handleRegex(Za, $a, _a, ab) : $a
;
const cloner = (bb)=>bb === null || bb === undefined ? bb : bb.constructor === Array ? bb.map(cloner) : bb.constructor === Object ? Object.entries(bb).reduce((cb, [db, eb])=>_objectSpread({
        }, cb, {
            [db]: cloner(eb)
        })
    , {
    }) : bb
;
const recurse = (fb, gb)=>{
    const hb = cloner(gb);
    return recursor(fb, hb, [], hb);
};
function Moon(ib, jb = Math.floor(Math.random() * 100000000), kb) {
    const { state , reset , random , reverse , distribution  } = ib(this, JSON.stringify([
        jb,
        kb
    ]));
    Object.assign(this, {
        state,
        reset,
        random,
        reverse,
        distribution
    });
    this.info = ()=>({
            initseed: jb,
            path: kb
        })
    ;
    this.recurse = recurse;
    return this;
}
Moon.prototype = {
    constructor: Moon
};
const number = (lb, { max =1000000 , min =0 , precision =0  } = {
})=>{
    const mb = Math.pow(10, precision);
    return Math.floor((lb.random() * (1 + max - min) + min) * mb) / mb;
};
const object = (nb, ...ob)=>{
    return ob.reduce((pb, qb)=>{
        return nb.recurse(nb, qb);
    }, {
    });
};
const json = (rb, ...sb)=>{
    return JSON.stringify(rb.object(...sb));
};
const array = (tb, ub, vb, wb = (xb)=>xb
)=>{
    const yb = typeof wb === "string" ? (zb)=>zb.join(wb)
     : wb;
    const Ab = typeof ub === "object" && ub.constructor === Object ? tb.number(ub) : tb.recurse(tb.clone(), ub);
    return yb(tb.recurse(tb, Array(Ab).fill(vb)));
};
const string = (Bb, [Cb, ...Db], ...Eb)=>{
    const Fb = Bb.recurse(Bb, Eb);
    return Db.reduce((Gb, Hb, Ib)=>`${Gb}${Fb[Ib]}${Hb}`
    , Cb);
};
const Fiona = (Jb, Kb = [])=>new Moon(__default2, Jb, Kb)
;
Fiona.version = __default.version;
const registerFactory = (Lb, Mb)=>{
    const Nb = (...Ob)=>Mb(...Ob)
    ;
    registered.push(Nb);
    return Fiona[Lb] = Nb;
};
const registerMethod = (Pb, Qb)=>{
    return Moon.prototype[Pb] = Qb;
};
Fiona.register = Register(registerFactory, registerMethod);
Fiona.Random = ()=>(Rb)=>Rb.random()
;
const clone = (Sb)=>Fiona(Sb.info().initseed).state(Sb.state())
;
Fiona.register([
    "clone", clone]);
Fiona.register([
    "number", number], [
    "object", object], [
    "json", json], [
    "string", string], [
    "array", array]);
const bool = (Tb, { chance =0.5  } = {
})=>Tb.random() < chance
;
const chooser = (Ub, Vb, Wb)=>{
    const Xb = Vb.reduce((Yb, Zb, $b)=>{
        Yb.push((Yb[$b - 1] || 0) + (typeof Wb[$b] === "number" ? Wb[$b] : 1));
        return Yb;
    }, []);
    const _b = Ub * Xb[Xb.length - 1];
    let ac;
    Xb.every((bc, cc)=>{
        if (_b > bc) {
            return true;
        } else {
            ac = cc;
            return false;
        }
    });
    return ac;
};
const choose = (dc, ec, fc, { weights =[]  } = {
})=>{
    const gc = fc.slice(0);
    const hc = weights.slice(0);
    return Array(ec || 0).fill(null).map(()=>{
        const ic = chooser(dc.random(), gc, hc);
        const jc = gc[ic];
        gc[ic] = gc[0];
        gc.shift();
        return jc;
    });
};
const oneOf = (kc, lc, { weights =[]  } = {
})=>{
    return lc[chooser(kc.random(), lc, weights)];
};
const date = (mc, { min ="1940" , max ="2000" , long: nc = false  } = {
})=>{
    const oc = new Date(min) * 1;
    const pc = new Date(max) * 1;
    if (oc > pc) {
        throw Error(`min date must be lower than max date`);
    }
    const qc = pc - oc;
    const rc = new Date(mc.number({
        max: qc
    }) + oc).toISOString();
    return nc ? rc : rc.slice(0, 10);
};
const RGB = (sc, tc, uc)=>"#" + [
        sc,
        tc,
        uc
    ].map((vc)=>`0${vc.toString(16)}`.slice(-2)
    ).join("")
;
const getme = (wc)=>{
    return wc.slice(1).match(/(..)/g).map((xc)=>parseInt(xc, 16)
    );
};
const mapper = (yc, zc)=>(Ac)=>{
        return yc.reduce((Bc, Cc, Dc)=>{
            const Ec = Math.min(zc[Dc], yc[Dc]);
            const Fc = Math.max(zc[Dc], yc[Dc]);
            const Gc = Fc - Ec;
            return `${Bc}${(Ec + Math.ceil(Gc * Ac)).toString(16)}`;
        }, "#");
    }
;
const colorMapperFactory = (Hc)=>{
    const Ic = Hc.map(({ start , end  })=>mapper(getme(start), getme(end))
    );
    return (Jc)=>{
        const Kc = Math.floor(Hc.length * Jc);
        return Ic[Kc](Jc);
    };
};
const img = (Lc, Mc)=>{
    const { seed , width , height , bg , colors  } = Object.assign(Lc.object({
        seed: Lc.number(),
        width: 1000,
        height: 1000,
        bg: RGB(Lc.number({
            max: 255
        }), Lc.number({
            max: 255
        }), Lc.number({
            max: 255
        })),
        colors: Lc.array({
            min: 1,
            max: 10
        }, (Nc)=>({
                start: RGB(Nc.number({
                    max: 255
                }), Nc.number({
                    max: 255
                }), Nc.number({
                    max: 255
                })),
                end: RGB(Nc.number({
                    max: 255
                }), Nc.number({
                    max: 255
                }), Nc.number({
                    max: 255
                }))
            })
        )
    }), Mc);
    const Oc = colorMapperFactory(colors);
    const Pc = [];
    for(let Qc = 0; Qc < 100; Qc++){
        const Rc = Oc(Qc / 100);
        const Sc = seed * Qc % 360;
        const [Tc, Uc, Vc, Wc] = [
            5 * Qc,
            5 / seed,
            Qc * seed,
            Qc
        ].map(Math.floor).map((Xc)=>Xc % (Math.max(width, height) * 3)
        );
        Pc.push(`<rect x="${Tc}" y="${Uc}" width="${Vc}" height="${Wc}" transform="rotate(${Sc})" fill="${Rc}" />`);
    }
    const Yc = (Zc)=>encodeURIComponent(`
    <svg width="${width}" height="${height}" viewBox="${-1 * width} ${-1 * height} ${width * 2} ${height * 2}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <style>svg { background-color: ${bg}; }</style>
      ${Zc}
    </svg>
  `)
    ;
    return `data:image/svg+xml;utf8,${Yc(Pc.join("\n"))}`;
};
const duplicable = ($c, { frequency =0.1 , pool =10  } = {
})=>{
    if ($c.random() <= frequency) {
        $c.reset((Math.floor($c.random() * pool + 1) / pool + 1) * 10000000000000000);
    }
    return $c;
};
const lorem = (_c, { qty =15  } = {
})=>{
    const ad = _c.random() < 0.2 ? "lorem ipsum " : "";
    let bd = [];
    while(bd.length < qty){
        bd = bd.concat("dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" "));
    }
    return ad + _c.choose(qty, bd).join(" ");
};
const word = (cd)=>cd.lorem({
        qty: 1
    }).split(" ")[0]
;
const sentence = (dd)=>{
    const ed = dd.lorem({
        qty: 25
    });
    return ed[0].toUpperCase() + ed.slice(1) + ".";
};
const paragraph = (fd)=>Array(fd.number({
        min: 1,
        max: 10
    })).fill(0).map(()=>fd.sentence()
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
const getGender = (gd)=>gd && (gd[0].toLowerCase() === "f" ? "female" : "male")
;
const gender = (hd)=>{
    return hd.random() < 0.5 ? "male" : "female";
};
const title = (id, { gender  } = {
})=>{
    return id.oneOf(namedata[getGender(gender || id.gender())].title, {
        weights: [
            5,
            3
        ]
    });
};
const firstname = (jd, { gender  } = {
})=>{
    return jd.oneOf(namedata[getGender(gender || jd.gender())].firstname);
};
const firstnames = (kd, { gender  } = {
})=>{
    return kd.choose(kd.clone().distribution((ld)=>ld * ld * ld
    ).number({
        min: 1,
        max: 3
    }), namedata[getGender(gender || kd.gender())].firstname).join(" ");
};
const surname = (md)=>{
    return md.choose(md.clone().distribution((nd)=>nd * nd * nd
    ).number({
        min: 1,
        max: 2
    }), namedata.surname).join(md.bool() ? " " : "-");
};
const fullname = (od, { gender  } = {
})=>{
    const pd = getGender(gender || od.gender());
    return `${od.title({
        gender: pd
    })} ${od.firstnames({
        gender: pd
    })} ${od.surname()}`;
};
const regex = (qd)=>(rd, sd = /[A-F0-9]{16}/)=>{
        const td = new qd(RegExp(sd));
        td.randInt = (ud, vd)=>ud + Math.floor(rd.random() * (1 + vd - ud))
        ;
        return td.gen();
    }
;
const shuffle = (wd, xd, { qty  } = {
})=>wd.choose(typeof qty !== "undefined" ? qty : xd.length, xd)
;
const __default3 = (yd)=>{
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
        regex(yd)
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
var M = (zd)=>g(zd, "__esModule", {
        value: !0
    })
;
var x = (Ad, Bd)=>()=>(Bd || Ad((Bd = {
            exports: {
            }
        }).exports, Bd), Bd.exports)
;
var E = (Cd, Dd, Ed)=>{
    if (Dd && typeof Dd == "object" || typeof Dd == "function") for (let Fd of d(Dd))!m.call(Cd, Fd) && Fd !== "default" && g(Cd, Fd, {
        get: ()=>Dd[Fd]
        ,
        enumerable: !(Ed = v(Dd, Fd)) || Ed.enumerable
    });
    return Cd;
}, _ = (Gd)=>E(M(g(Gd != null ? f(p(Gd)) : {
    }, "default", Gd && Gd.__esModule && "default" in Gd ? {
        get: ()=>Gd.default
        ,
        enumerable: !0
    } : {
        value: Gd,
        enumerable: !0
    })), Gd)
;
var w = x((Hd, Id)=>{
    "use strict";
    var Jd = class _class {
        overlaps(Kd) {
            return !(this.high < Kd.low || this.low > Kd.high);
        }
        touches(Ld) {
            return !(this.high + 1 < Ld.low || this.low - 1 > Ld.high);
        }
        add(Md) {
            return new Jd(Math.min(this.low, Md.low), Math.max(this.high, Md.high));
        }
        subtract(Nd) {
            return Nd.low <= this.low && Nd.high >= this.high ? [] : Nd.low > this.low && Nd.high < this.high ? [
                new Jd(this.low, Nd.low - 1),
                new Jd(Nd.high + 1, this.high)
            ] : Nd.low <= this.low ? [
                new Jd(Nd.high + 1, this.high)
            ] : [
                new Jd(this.low, Nd.low - 1)
            ];
        }
        toString() {
            return this.low == this.high ? this.low.toString() : this.low + "-" + this.high;
        }
        constructor(Od, Pd){
            this.low = Od, this.high = Pd, this.length = 1 + Pd - Od;
        }
    }, Qd = class _class {
        _update_length() {
            this.length = this.ranges.reduce((Rd, Sd)=>Rd + Sd.length
            , 0);
        }
        add(Td, Ud) {
            var Vd = (Wd)=>{
                for(var Xd = 0; Xd < this.ranges.length && !Wd.touches(this.ranges[Xd]);)Xd++;
                for(var Yd = this.ranges.slice(0, Xd); Xd < this.ranges.length && Wd.touches(this.ranges[Xd]);)Wd = Wd.add(this.ranges[Xd]), Xd++;
                Yd.push(Wd), this.ranges = Yd.concat(this.ranges.slice(Xd)), this._update_length();
            };
            return Td instanceof Qd ? Td.ranges.forEach(Vd) : (Ud == null && (Ud = Td), Vd(new Jd(Td, Ud))), this;
        }
        subtract(Zd, $d) {
            var _d = (ae)=>{
                for(var be = 0; be < this.ranges.length && !ae.overlaps(this.ranges[be]);)be++;
                for(var ce = this.ranges.slice(0, be); be < this.ranges.length && ae.overlaps(this.ranges[be]);)ce = ce.concat(this.ranges[be].subtract(ae)), be++;
                this.ranges = ce.concat(this.ranges.slice(be)), this._update_length();
            };
            return Zd instanceof Qd ? Zd.ranges.forEach(_d) : ($d == null && ($d = Zd), _d(new Jd(Zd, $d))), this;
        }
        intersect(de, ee) {
            var fe = [], ge = (he)=>{
                for(var ie = 0; ie < this.ranges.length && !he.overlaps(this.ranges[ie]);)ie++;
                for(; ie < this.ranges.length && he.overlaps(this.ranges[ie]);){
                    var je = Math.max(this.ranges[ie].low, he.low), ke = Math.min(this.ranges[ie].high, he.high);
                    fe.push(new Jd(je, ke)), ie++;
                }
            };
            return de instanceof Qd ? de.ranges.forEach(ge) : (ee == null && (ee = de), ge(new Jd(de, ee))), this.ranges = fe, this._update_length(), this;
        }
        index(le) {
            for(var me = 0; me < this.ranges.length && this.ranges[me].length <= le;)le -= this.ranges[me].length, me++;
            return this.ranges[me].low + le;
        }
        toString() {
            return "[ " + this.ranges.join(", ") + " ]";
        }
        clone() {
            return new Qd(this);
        }
        numbers() {
            return this.ranges.reduce((ne, pe)=>{
                for(var qe = pe.low; qe <= pe.high;)ne.push(qe), qe++;
                return ne;
            }, []);
        }
        subranges() {
            return this.ranges.map((re)=>({
                    low: re.low,
                    high: re.high,
                    length: 1 + re.high - re.low
                })
            );
        }
        constructor(se, te){
            this.ranges = [], this.length = 0, se != null && this.add(se, te);
        }
    };
    Id.exports = Qd;
});
var j = _(w());
var export_default = j.default;
var L = Object.create;
var N = Object.defineProperty;
var _1 = Object.getOwnPropertyDescriptor;
var z = Object.getOwnPropertyNames;
var Y = Object.getPrototypeOf, Z = Object.prototype.hasOwnProperty;
var J = (ue)=>N(ue, "__esModule", {
        value: !0
    })
;
var E1 = (ve, we)=>()=>(we || ve((we = {
            exports: {
            }
        }).exports, we), we.exports)
;
var K = (xe, ye, ze)=>{
    if (ye && typeof ye == "object" || typeof ye == "function") for (let Ae of z(ye))!Z.call(xe, Ae) && Ae !== "default" && N(xe, Ae, {
        get: ()=>ye[Ae]
        ,
        enumerable: !(ze = _1(ye, Ae)) || ze.enumerable
    });
    return xe;
}, x1 = (Be)=>K(J(N(Be != null ? L(Y(Be)) : {
    }, "default", Be && Be.__esModule && "default" in Be ? {
        get: ()=>Be.default
        ,
        enumerable: !0
    } : {
        value: Be,
        enumerable: !0
    })), Be)
;
var I = E1((Ce, De)=>{
    De.exports = {
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
var S = E1((Ee)=>{
    var Fe = I(), Ge = ()=>[
            {
                type: Fe.RANGE,
                from: 48,
                to: 57
            }
        ]
    , He = ()=>[
            {
                type: Fe.CHAR,
                value: 95
            },
            {
                type: Fe.RANGE,
                from: 97,
                to: 122
            },
            {
                type: Fe.RANGE,
                from: 65,
                to: 90
            }
        ].concat(Ge())
    , Ie = ()=>[
            {
                type: Fe.CHAR,
                value: 9
            },
            {
                type: Fe.CHAR,
                value: 10
            },
            {
                type: Fe.CHAR,
                value: 11
            },
            {
                type: Fe.CHAR,
                value: 12
            },
            {
                type: Fe.CHAR,
                value: 13
            },
            {
                type: Fe.CHAR,
                value: 32
            },
            {
                type: Fe.CHAR,
                value: 160
            },
            {
                type: Fe.CHAR,
                value: 5760
            },
            {
                type: Fe.RANGE,
                from: 8192,
                to: 8202
            },
            {
                type: Fe.CHAR,
                value: 8232
            },
            {
                type: Fe.CHAR,
                value: 8233
            },
            {
                type: Fe.CHAR,
                value: 8239
            },
            {
                type: Fe.CHAR,
                value: 8287
            },
            {
                type: Fe.CHAR,
                value: 12288
            },
            {
                type: Fe.CHAR,
                value: 65279
            }
        ]
    , Je = ()=>[
            {
                type: Fe.CHAR,
                value: 10
            },
            {
                type: Fe.CHAR,
                value: 13
            },
            {
                type: Fe.CHAR,
                value: 8232
            },
            {
                type: Fe.CHAR,
                value: 8233
            }
        ]
    ;
    Ee.words = ()=>({
            type: Fe.SET,
            set: He(),
            not: !1
        })
    ;
    Ee.notWords = ()=>({
            type: Fe.SET,
            set: He(),
            not: !0
        })
    ;
    Ee.ints = ()=>({
            type: Fe.SET,
            set: Ge(),
            not: !1
        })
    ;
    Ee.notInts = ()=>({
            type: Fe.SET,
            set: Ge(),
            not: !0
        })
    ;
    Ee.whitespace = ()=>({
            type: Fe.SET,
            set: Ie(),
            not: !1
        })
    ;
    Ee.notWhitespace = ()=>({
            type: Fe.SET,
            set: Ie(),
            not: !0
        })
    ;
    Ee.anyChar = ()=>({
            type: Fe.SET,
            set: Je(),
            not: !0
        })
    ;
});
var F = E1((Ke)=>{
    var Le = I(), Me = S(), Ne = "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?", Oe = {
        "0": 0,
        t: 9,
        n: 10,
        v: 11,
        f: 12,
        r: 13
    };
    Ke.strToChars = function(Pe) {
        var Qe = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z[\\\]^?])|([0tnvfr]))/g;
        return Pe = Pe.replace(Qe, function(Re, Se, Te, Ue, Ve, We, Xe, Ye) {
            if (Te) return Re;
            var Ze = Se ? 8 : Ue ? parseInt(Ue, 16) : Ve ? parseInt(Ve, 16) : We ? parseInt(We, 8) : Xe ? Ne.indexOf(Xe) : Oe[Ye], $e = String.fromCharCode(Ze);
            return /[[\]{}^$.|?*+()]/.test($e) && ($e = "\\" + $e), $e;
        }), Pe;
    };
    Ke.tokenizeClass = (_e, af)=>{
        for(var bf = [], cf = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?([^])/g, df, ef; (df = cf.exec(_e)) != null;)if (df[1]) bf.push(Me.words());
        else if (df[2]) bf.push(Me.ints());
        else if (df[3]) bf.push(Me.whitespace());
        else if (df[4]) bf.push(Me.notWords());
        else if (df[5]) bf.push(Me.notInts());
        else if (df[6]) bf.push(Me.notWhitespace());
        else if (df[7]) bf.push({
            type: Le.RANGE,
            from: (df[8] || df[9]).charCodeAt(0),
            to: df[10].charCodeAt(0)
        });
        else if (ef = df[12]) bf.push({
            type: Le.CHAR,
            value: ef.charCodeAt(0)
        });
        else return [
            bf,
            cf.lastIndex
        ];
        Ke.error(af, "Unterminated character class");
    };
    Ke.error = (ff, gf)=>{
        throw new SyntaxError("Invalid regular expression: /" + ff + "/: " + gf);
    };
});
var U = E1((hf)=>{
    var jf = I();
    hf.wordBoundary = ()=>({
            type: jf.POSITION,
            value: "b"
        })
    ;
    hf.nonWordBoundary = ()=>({
            type: jf.POSITION,
            value: "B"
        })
    ;
    hf.begin = ()=>({
            type: jf.POSITION,
            value: "^"
        })
    ;
    hf.end = ()=>({
            type: jf.POSITION,
            value: "$"
        })
    ;
});
var P = E1((kf, lf)=>{
    var mf = F(), nf = I(), of = S(), pf = U();
    lf.exports = (qf)=>{
        var rf = 0, sf, tf, uf = {
            type: nf.ROOT,
            stack: []
        }, vf = uf, wf = uf.stack, xf = [], yf = (zf)=>{
            mf.error(qf, `Nothing to repeat at column ${zf - 1}`);
        }, Af = mf.strToChars(qf);
        for(sf = Af.length; rf < sf;)switch(tf = Af[rf++], tf){
            case "\\":
                switch(tf = Af[rf++], tf){
                    case "b":
                        wf.push(pf.wordBoundary());
                        break;
                    case "B":
                        wf.push(pf.nonWordBoundary());
                        break;
                    case "w":
                        wf.push(of.words());
                        break;
                    case "W":
                        wf.push(of.notWords());
                        break;
                    case "d":
                        wf.push(of.ints());
                        break;
                    case "D":
                        wf.push(of.notInts());
                        break;
                    case "s":
                        wf.push(of.whitespace());
                        break;
                    case "S":
                        wf.push(of.notWhitespace());
                        break;
                    default:
                        /\d/.test(tf) ? wf.push({
                            type: nf.REFERENCE,
                            value: parseInt(tf, 10)
                        }) : wf.push({
                            type: nf.CHAR,
                            value: tf.charCodeAt(0)
                        });
                }
                break;
            case "^":
                wf.push(pf.begin());
                break;
            case "$":
                wf.push(pf.end());
                break;
            case "[":
                var Bf;
                Af[rf] === "^" ? (Bf = !0, rf++) : Bf = !1;
                var Cf = mf.tokenizeClass(Af.slice(rf), qf);
                rf += Cf[1], wf.push({
                    type: nf.SET,
                    set: Cf[0],
                    not: Bf
                });
                break;
            case ".":
                wf.push(of.anyChar());
                break;
            case "(":
                var Df = {
                    type: nf.GROUP,
                    stack: [],
                    remember: !0
                };
                tf = Af[rf], tf === "?" && (tf = Af[rf + 1], rf += 2, tf === "=" ? Df.followedBy = !0 : tf === "!" ? Df.notFollowedBy = !0 : tf !== ":" && mf.error(qf, `Invalid group, character '${tf}' after '?' at column ${rf - 1}`), Df.remember = !1), wf.push(Df), xf.push(vf), vf = Df, wf = Df.stack;
                break;
            case ")":
                xf.length === 0 && mf.error(qf, `Unmatched ) at column ${rf - 1}`), vf = xf.pop(), wf = vf.options ? vf.options[vf.options.length - 1] : vf.stack;
                break;
            case "|":
                vf.options || (vf.options = [
                    vf.stack
                ], delete vf.stack);
                var Ef = [];
                vf.options.push(Ef), wf = Ef;
                break;
            case "{":
                var Ff = /^(\d+)(,(\d+)?)?\}/.exec(Af.slice(rf)), Gf, Hf;
                Ff !== null ? (wf.length === 0 && yf(rf), Gf = parseInt(Ff[1], 10), Hf = Ff[2] ? Ff[3] ? parseInt(Ff[3], 10) : 1 / 0 : Gf, rf += Ff[0].length, wf.push({
                    type: nf.REPETITION,
                    min: Gf,
                    max: Hf,
                    value: wf.pop()
                })) : wf.push({
                    type: nf.CHAR,
                    value: 123
                });
                break;
            case "?":
                wf.length === 0 && yf(rf), wf.push({
                    type: nf.REPETITION,
                    min: 0,
                    max: 1,
                    value: wf.pop()
                });
                break;
            case "+":
                wf.length === 0 && yf(rf), wf.push({
                    type: nf.REPETITION,
                    min: 1,
                    max: 1 / 0,
                    value: wf.pop()
                });
                break;
            case "*":
                wf.length === 0 && yf(rf), wf.push({
                    type: nf.REPETITION,
                    min: 0,
                    max: 1 / 0,
                    value: wf.pop()
                });
                break;
            default:
                wf.push({
                    type: nf.CHAR,
                    value: tf.charCodeAt(0)
                });
        }
        return xf.length !== 0 && mf.error(qf, "Unterminated group"), uf;
    };
    lf.exports.types = nf;
});
var X = x1(P()), j1 = x1(P()), { types: oe  } = X;
var export_default1 = j1.default;
var C = Object.create;
var o = Object.defineProperty;
var p1 = Object.getOwnPropertyDescriptor;
var y = Object.getOwnPropertyNames;
var E2 = Object.getPrototypeOf, I1 = Object.prototype.hasOwnProperty;
var w1 = (If)=>o(If, "__esModule", {
        value: !0
    })
;
var O = (Jf, Kf)=>()=>(Kf || Jf((Kf = {
            exports: {
            }
        }).exports, Kf), Kf.exports)
;
var x2 = (Lf, Mf, Nf)=>{
    if (Mf && typeof Mf == "object" || typeof Mf == "function") for (let Of of y(Mf))!I1.call(Lf, Of) && Of !== "default" && o(Lf, Of, {
        get: ()=>Mf[Of]
        ,
        enumerable: !(Nf = p1(Mf, Of)) || Nf.enumerable
    });
    return Lf;
}, v1 = (Pf)=>x2(w1(o(Pf != null ? C(E2(Pf)) : {
    }, "default", Pf && Pf.__esModule && "default" in Pf ? {
        get: ()=>Pf.default
        ,
        enumerable: !0
    } : {
        value: Pf,
        enumerable: !0
    })), Pf)
;
var R = O((Qf, Rf)=>{
    var Sf = export_default1, Tf = export_default, Uf = Sf.types;
    Rf.exports = class d {
        _setDefaults(Vf) {
            this.max = Vf.max != null ? Vf.max : d.prototype.max != null ? d.prototype.max : 100, this.defaultRange = Vf.defaultRange ? Vf.defaultRange : this.defaultRange.clone(), Vf.randInt && (this.randInt = Vf.randInt);
        }
        gen() {
            return this._gen(this.tokens, []);
        }
        _gen(Wf, Xf) {
            var Yf, Zf, $f, _f, ag;
            switch(Wf.type){
                case Uf.ROOT:
                case Uf.GROUP:
                    if (Wf.followedBy || Wf.notFollowedBy) return "";
                    for(Wf.remember && Wf.groupNumber === void 0 && (Wf.groupNumber = Xf.push(null) - 1), Yf = Wf.options ? this._randSelect(Wf.options) : Wf.stack, Zf = "", _f = 0, ag = Yf.length; _f < ag; _f++)Zf += this._gen(Yf[_f], Xf);
                    return Wf.remember && (Xf[Wf.groupNumber] = Zf), Zf;
                case Uf.POSITION:
                    return "";
                case Uf.SET:
                    var bg = this._expand(Wf);
                    return bg.length ? String.fromCharCode(this._randSelect(bg)) : "";
                case Uf.REPETITION:
                    for($f = this.randInt(Wf.min, Wf.max === 1 / 0 ? Wf.min + this.max : Wf.max), Zf = "", _f = 0; _f < $f; _f++)Zf += this._gen(Wf.value, Xf);
                    return Zf;
                case Uf.REFERENCE:
                    return Xf[Wf.value - 1] || "";
                case Uf.CHAR:
                    var cg = this.ignoreCase && this._randBool() ? this._toOtherCase(Wf.value) : Wf.value;
                    return String.fromCharCode(cg);
            }
        }
        _toOtherCase(dg) {
            return dg + (97 <= dg && dg <= 122 ? -32 : 65 <= dg && dg <= 90 ? 32 : 0);
        }
        _randBool() {
            return !this.randInt(0, 1);
        }
        _randSelect(eg) {
            return eg instanceof Tf ? eg.index(this.randInt(0, eg.length - 1)) : eg[this.randInt(0, eg.length - 1)];
        }
        _expand(fg) {
            if (fg.type === Sf.types.CHAR) return new Tf(fg.value);
            if (fg.type === Sf.types.RANGE) return new Tf(fg.from, fg.to);
            {
                let gg = new Tf;
                for(let hg = 0; hg < fg.set.length; hg++){
                    let ig = this._expand(fg.set[hg]);
                    if (gg.add(ig), this.ignoreCase) for(let jg = 0; jg < ig.length; jg++){
                        let kg = ig.index(jg), lg = this._toOtherCase(kg);
                        kg !== lg && gg.add(lg);
                    }
                }
                return fg.not ? this.defaultRange.clone().subtract(gg) : this.defaultRange.clone().intersect(gg);
            }
        }
        randInt(mg, ng) {
            return mg + Math.floor(Math.random() * (1 + ng - mg));
        }
        get defaultRange() {
            return this._range = this._range || new Tf(32, 126);
        }
        set defaultRange(og) {
            this._range = og;
        }
        static randexp(pg, qg) {
            var rg;
            return typeof pg == "string" && (pg = new RegExp(pg, qg)), pg._randexp === void 0 ? (rg = new d(pg, qg), pg._randexp = rg) : (rg = pg._randexp, rg._setDefaults(pg)), rg.gen();
        }
        static sugar() {
            RegExp.prototype.gen = function() {
                return d.randexp(this);
            };
        }
        constructor(sg, tg){
            if (this._setDefaults(sg), sg instanceof RegExp) this.ignoreCase = sg.ignoreCase, this.multiline = sg.multiline, sg = sg.source;
            else if (typeof sg == "string") this.ignoreCase = tg && tg.indexOf("i") !== -1, this.multiline = tg && tg.indexOf("m") !== -1;
            else throw new Error("Expected a regexp or string");
            this.tokens = Sf(sg);
        }
    };
});
var b = v1(R());
var export_default4 = b.default;
const Fiona1 = __default3(export_default4);
return Fiona1;
});
