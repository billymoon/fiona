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
    version: "4.0.0-alpha.3"
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
const handleRegex = (Ua, Va)=>Ua.regex ? Ua.regex(Va) : Va
;
const recursor = (Wa, Xa, Ya, Za)=>Xa === null || Xa === undefined ? Xa : Xa.constructor === Array ? handleArray(Wa, Xa, Ya, Za) : Xa.constructor === Object ? handleObject(Wa, Xa, Ya, Za) : typeof Xa === "function" ? handleFunction(Wa, Xa, Ya, Za) : Xa.constructor === RegExp ? handleRegex(Wa, Xa) : Xa
;
const cloner = ($a)=>$a === null || $a === undefined ? $a : $a.constructor === Array ? $a.map(cloner) : $a.constructor === Object ? Object.entries($a).reduce((_a, [ab, bb])=>_objectSpread({
        }, _a, {
            [ab]: cloner(bb)
        })
    , {
    }) : $a
;
const recurse = (cb, db)=>{
    const eb = cloner(db);
    return recursor(cb, eb, [], eb);
};
function Moon(fb, gb = Math.floor(Math.random() * 100000000), hb) {
    const { state , reset , random , reverse , distribution  } = fb(this, JSON.stringify([
        gb,
        hb
    ]));
    Object.assign(this, {
        state,
        reset,
        random,
        reverse,
        distribution
    });
    this.info = ()=>({
            initseed: gb,
            path: hb
        })
    ;
    this.recurse = recurse;
    return this;
}
Moon.prototype = {
    constructor: Moon
};
const number = (ib, { max =1000000 , min =0 , precision =0  } = {
})=>{
    const jb = Math.pow(10, precision);
    return Math.floor((ib.random() * (1 + max - min) + min) * jb) / jb;
};
const object = (kb, ...lb)=>{
    return lb.reduce((mb, nb)=>{
        return kb.recurse(kb, nb);
    }, {
    });
};
const json = (ob, ...pb)=>{
    return JSON.stringify(ob.object(...pb));
};
const array = (qb, rb, sb, tb = (ub)=>ub
)=>{
    const vb = typeof tb === "string" ? (wb)=>wb.join(tb)
     : tb;
    const xb = typeof rb === "object" && rb.constructor === Object ? qb.number(rb) : qb.recurse(qb.clone(), rb);
    return vb(qb.recurse(qb, Array(xb).fill(sb)));
};
const string = (yb, [zb, ...Ab], ...Bb)=>{
    const Cb = yb.recurse(yb, Bb);
    return Ab.reduce((Db, Eb, Fb)=>`${Db}${Cb[Fb]}${Eb}`
    , zb);
};
const Fiona = (Gb, Hb = [])=>new Moon(__default2, Gb, Hb)
;
Fiona.version = __default.version;
const registerFactory = (Ib, Jb)=>{
    const Kb = (...Lb)=>Jb(...Lb)
    ;
    registered.push(Kb);
    return Fiona[Ib] = Kb;
};
const registerMethod = (Mb, Nb)=>{
    return Moon.prototype[Mb] = Nb;
};
Fiona.register = Register(registerFactory, registerMethod);
Fiona.Random = ()=>(Ob)=>Ob.random()
;
const clone = (Pb)=>Fiona(Pb.info().initseed).state(Pb.state())
;
Fiona.register([
    "clone", clone]);
Fiona.register([
    "number", number], [
    "object", object], [
    "json", json], [
    "string", string], [
    "array", array]);
const bool = (Qb, { chance =0.5  } = {
})=>Qb.random() < chance
;
const chooser = (Rb, Sb, Tb)=>{
    const Ub = Sb.reduce((Vb, Wb, Xb)=>{
        Vb.push((Vb[Xb - 1] || 0) + (typeof Tb[Xb] === "number" ? Tb[Xb] : 1));
        return Vb;
    }, []);
    const Yb = Rb * Ub[Ub.length - 1];
    let Zb;
    Ub.every(($b, _b)=>{
        if (Yb > $b) {
            return true;
        } else {
            Zb = _b;
            return false;
        }
    });
    return Zb;
};
const choose = (ac, bc, cc, { weights =[]  } = {
})=>{
    const dc = cc.slice(0);
    const ec = weights.slice(0);
    return Array(bc || 0).fill(null).map(()=>{
        const fc = chooser(ac.random(), dc, ec);
        const gc = dc[fc];
        dc[fc] = dc[0];
        dc.shift();
        return gc;
    });
};
const oneOf = (hc, ic, { weights =[]  } = {
})=>{
    return ic[chooser(hc.random(), ic, weights)];
};
const date = (jc, { min ="1940" , max ="2000" , long: kc = false  } = {
})=>{
    const lc = new Date(min) * 1;
    const mc = new Date(max) * 1;
    if (lc > mc) {
        throw Error(`min date must be lower than max date`);
    }
    const nc = mc - lc;
    const oc = new Date(jc.number({
        max: nc
    }) + lc).toISOString();
    return kc ? oc : oc.slice(0, 10);
};
const RGB = (pc, qc, rc)=>"#" + [
        pc,
        qc,
        rc
    ].map((sc)=>`0${sc.toString(16)}`.slice(-2)
    ).join("")
;
const getme = (tc)=>{
    return tc.slice(1).match(/(..)/g).map((uc)=>parseInt(uc, 16)
    );
};
const mapper = (vc, wc)=>(xc)=>{
        return vc.reduce((yc, zc, Ac)=>{
            const Bc = Math.min(wc[Ac], vc[Ac]);
            const Cc = Math.max(wc[Ac], vc[Ac]);
            const Dc = Cc - Bc;
            return `${yc}${(Bc + Math.ceil(Dc * xc)).toString(16)}`;
        }, "#");
    }
;
const colorMapperFactory = (Ec)=>{
    const Fc = Ec.map(({ start , end  })=>mapper(getme(start), getme(end))
    );
    return (Gc)=>{
        const Hc = Math.floor(Ec.length * Gc);
        return Fc[Hc](Gc);
    };
};
const img = (Ic, Jc)=>{
    const { seed , width , height , bg , colors  } = Object.assign(Ic.object({
        seed: Ic.number(),
        width: 1000,
        height: 1000,
        bg: RGB(Ic.number({
            max: 255
        }), Ic.number({
            max: 255
        }), Ic.number({
            max: 255
        })),
        colors: Ic.array({
            min: 1,
            max: 10
        }, (Kc)=>({
                start: RGB(Kc.number({
                    max: 255
                }), Kc.number({
                    max: 255
                }), Kc.number({
                    max: 255
                })),
                end: RGB(Kc.number({
                    max: 255
                }), Kc.number({
                    max: 255
                }), Kc.number({
                    max: 255
                }))
            })
        )
    }), Jc);
    const Lc = colorMapperFactory(colors);
    const Mc = [];
    for(let Nc = 0; Nc < 100; Nc++){
        const Oc = Lc(Nc / 100);
        const Pc = seed * Nc % 360;
        const [Qc, Rc, Sc, Tc] = [
            5 * Nc,
            5 / seed,
            Nc * seed,
            Nc
        ].map(Math.floor).map((Uc)=>Uc % (Math.max(width, height) * 3)
        );
        Mc.push(`<rect x="${Qc}" y="${Rc}" width="${Sc}" height="${Tc}" transform="rotate(${Pc})" fill="${Oc}" />`);
    }
    const Vc = (Wc)=>encodeURIComponent(`
    <svg width="${width}" height="${height}" viewBox="${-1 * width} ${-1 * height} ${width * 2} ${height * 2}" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
      <style>svg { background-color: ${bg}; }</style>
      ${Wc}
    </svg>
  `)
    ;
    return `data:image/svg+xml;utf8,${Vc(Mc.join("\n"))}`;
};
const duplicable = (Xc, { frequency =0.1 , pool =10  } = {
})=>{
    if (Xc.random() <= frequency) {
        Xc.reset((Math.floor(Xc.random() * pool + 1) / pool + 1) * 10000000000000000);
    }
    return Xc;
};
const lorem = (Yc, { qty =15  } = {
})=>{
    const Zc = Yc.random() < 0.2 ? "lorem ipsum " : "";
    let $c = [];
    while($c.length < qty){
        $c = $c.concat("dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" "));
    }
    return Zc + Yc.choose(qty, $c).join(" ");
};
const word = (_c)=>_c.lorem({
        qty: 1
    }).split(" ")[0]
;
const sentence = (ad)=>{
    const bd = ad.lorem({
        qty: 25
    });
    return bd[0].toUpperCase() + bd.slice(1) + ".";
};
const paragraph = (cd)=>Array(cd.number({
        min: 1,
        max: 10
    })).fill(0).map(()=>cd.sentence()
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
const getGender = (dd)=>dd && (dd[0].toLowerCase() === "f" ? "female" : "male")
;
const gender = (ed)=>{
    return ed.random() < 0.5 ? "male" : "female";
};
const title = (fd, { gender  } = {
})=>{
    return fd.oneOf(namedata[getGender(gender || fd.gender())].title, {
        weights: [
            5,
            3
        ]
    });
};
const firstname = (gd, { gender  } = {
})=>{
    return gd.oneOf(namedata[getGender(gender || gd.gender())].firstname);
};
const firstnames = (hd, { gender  } = {
})=>{
    return hd.choose(hd.clone().distribution((id)=>id * id * id
    ).number({
        min: 1,
        max: 3
    }), namedata[getGender(gender || hd.gender())].firstname).join(" ");
};
const surname = (jd)=>{
    return jd.choose(jd.clone().distribution((kd)=>kd * kd * kd
    ).number({
        min: 1,
        max: 2
    }), namedata.surname).join(jd.bool() ? " " : "-");
};
const fullname = (ld, { gender  } = {
})=>{
    const md = getGender(gender || ld.gender());
    return `${ld.title({
        gender: md
    })} ${ld.firstnames({
        gender: md
    })} ${ld.surname()}`;
};
const regex = (nd)=>(od, pd = /[A-F0-9]{16}/)=>{
        const qd = new nd(RegExp(pd));
        qd.randInt = (rd, sd)=>rd + Math.floor(od.random() * (1 + sd - rd))
        ;
        return qd.gen();
    }
;
const shuffle = (td, ud, { qty  } = {
})=>td.choose(typeof qty !== "undefined" ? qty : ud.length, ud)
;
const __default3 = (vd)=>{
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
        regex(vd)
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
var M = (wd)=>g(wd, "__esModule", {
        value: !0
    })
;
var x = (xd, yd)=>()=>(yd || xd((yd = {
            exports: {
            }
        }).exports, yd), yd.exports)
;
var E = (zd, Ad, Bd)=>{
    if (Ad && typeof Ad == "object" || typeof Ad == "function") for (let Cd of d(Ad))!m.call(zd, Cd) && Cd !== "default" && g(zd, Cd, {
        get: ()=>Ad[Cd]
        ,
        enumerable: !(Bd = v(Ad, Cd)) || Bd.enumerable
    });
    return zd;
}, _ = (Dd)=>E(M(g(Dd != null ? f(p(Dd)) : {
    }, "default", Dd && Dd.__esModule && "default" in Dd ? {
        get: ()=>Dd.default
        ,
        enumerable: !0
    } : {
        value: Dd,
        enumerable: !0
    })), Dd)
;
var w = x((Ed, Fd)=>{
    "use strict";
    var Gd = class _class {
        overlaps(Hd) {
            return !(this.high < Hd.low || this.low > Hd.high);
        }
        touches(Id) {
            return !(this.high + 1 < Id.low || this.low - 1 > Id.high);
        }
        add(Jd) {
            return new Gd(Math.min(this.low, Jd.low), Math.max(this.high, Jd.high));
        }
        subtract(Kd) {
            return Kd.low <= this.low && Kd.high >= this.high ? [] : Kd.low > this.low && Kd.high < this.high ? [
                new Gd(this.low, Kd.low - 1),
                new Gd(Kd.high + 1, this.high)
            ] : Kd.low <= this.low ? [
                new Gd(Kd.high + 1, this.high)
            ] : [
                new Gd(this.low, Kd.low - 1)
            ];
        }
        toString() {
            return this.low == this.high ? this.low.toString() : this.low + "-" + this.high;
        }
        constructor(Ld, Md){
            this.low = Ld, this.high = Md, this.length = 1 + Md - Ld;
        }
    }, Nd = class _class {
        _update_length() {
            this.length = this.ranges.reduce((Od, Pd)=>Od + Pd.length
            , 0);
        }
        add(Qd, Rd) {
            var Sd = (Td)=>{
                for(var Ud = 0; Ud < this.ranges.length && !Td.touches(this.ranges[Ud]);)Ud++;
                for(var Vd = this.ranges.slice(0, Ud); Ud < this.ranges.length && Td.touches(this.ranges[Ud]);)Td = Td.add(this.ranges[Ud]), Ud++;
                Vd.push(Td), this.ranges = Vd.concat(this.ranges.slice(Ud)), this._update_length();
            };
            return Qd instanceof Nd ? Qd.ranges.forEach(Sd) : (Rd == null && (Rd = Qd), Sd(new Gd(Qd, Rd))), this;
        }
        subtract(Wd, Xd) {
            var Yd = (Zd)=>{
                for(var $d = 0; $d < this.ranges.length && !Zd.overlaps(this.ranges[$d]);)$d++;
                for(var _d = this.ranges.slice(0, $d); $d < this.ranges.length && Zd.overlaps(this.ranges[$d]);)_d = _d.concat(this.ranges[$d].subtract(Zd)), $d++;
                this.ranges = _d.concat(this.ranges.slice($d)), this._update_length();
            };
            return Wd instanceof Nd ? Wd.ranges.forEach(Yd) : (Xd == null && (Xd = Wd), Yd(new Gd(Wd, Xd))), this;
        }
        intersect(ae, be) {
            var ce = [], de = (ee)=>{
                for(var fe = 0; fe < this.ranges.length && !ee.overlaps(this.ranges[fe]);)fe++;
                for(; fe < this.ranges.length && ee.overlaps(this.ranges[fe]);){
                    var ge = Math.max(this.ranges[fe].low, ee.low), he = Math.min(this.ranges[fe].high, ee.high);
                    ce.push(new Gd(ge, he)), fe++;
                }
            };
            return ae instanceof Nd ? ae.ranges.forEach(de) : (be == null && (be = ae), de(new Gd(ae, be))), this.ranges = ce, this._update_length(), this;
        }
        index(ie) {
            for(var je = 0; je < this.ranges.length && this.ranges[je].length <= ie;)ie -= this.ranges[je].length, je++;
            return this.ranges[je].low + ie;
        }
        toString() {
            return "[ " + this.ranges.join(", ") + " ]";
        }
        clone() {
            return new Nd(this);
        }
        numbers() {
            return this.ranges.reduce((ke, le)=>{
                for(var me = le.low; me <= le.high;)ke.push(me), me++;
                return ke;
            }, []);
        }
        subranges() {
            return this.ranges.map((ne)=>({
                    low: ne.low,
                    high: ne.high,
                    length: 1 + ne.high - ne.low
                })
            );
        }
        constructor(pe, qe){
            this.ranges = [], this.length = 0, pe != null && this.add(pe, qe);
        }
    };
    Fd.exports = Nd;
});
var j = _(w());
var export_default = j.default;
var L = Object.create;
var N = Object.defineProperty;
var _1 = Object.getOwnPropertyDescriptor;
var z = Object.getOwnPropertyNames;
var Y = Object.getPrototypeOf, Z = Object.prototype.hasOwnProperty;
var J = (re)=>N(re, "__esModule", {
        value: !0
    })
;
var E1 = (se, te)=>()=>(te || se((te = {
            exports: {
            }
        }).exports, te), te.exports)
;
var K = (ue, ve, we)=>{
    if (ve && typeof ve == "object" || typeof ve == "function") for (let xe of z(ve))!Z.call(ue, xe) && xe !== "default" && N(ue, xe, {
        get: ()=>ve[xe]
        ,
        enumerable: !(we = _1(ve, xe)) || we.enumerable
    });
    return ue;
}, x1 = (ye)=>K(J(N(ye != null ? L(Y(ye)) : {
    }, "default", ye && ye.__esModule && "default" in ye ? {
        get: ()=>ye.default
        ,
        enumerable: !0
    } : {
        value: ye,
        enumerable: !0
    })), ye)
;
var I = E1((ze, Ae)=>{
    Ae.exports = {
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
var S = E1((Be)=>{
    var Ce = I(), De = ()=>[
            {
                type: Ce.RANGE,
                from: 48,
                to: 57
            }
        ]
    , Ee = ()=>[
            {
                type: Ce.CHAR,
                value: 95
            },
            {
                type: Ce.RANGE,
                from: 97,
                to: 122
            },
            {
                type: Ce.RANGE,
                from: 65,
                to: 90
            }
        ].concat(De())
    , Fe = ()=>[
            {
                type: Ce.CHAR,
                value: 9
            },
            {
                type: Ce.CHAR,
                value: 10
            },
            {
                type: Ce.CHAR,
                value: 11
            },
            {
                type: Ce.CHAR,
                value: 12
            },
            {
                type: Ce.CHAR,
                value: 13
            },
            {
                type: Ce.CHAR,
                value: 32
            },
            {
                type: Ce.CHAR,
                value: 160
            },
            {
                type: Ce.CHAR,
                value: 5760
            },
            {
                type: Ce.RANGE,
                from: 8192,
                to: 8202
            },
            {
                type: Ce.CHAR,
                value: 8232
            },
            {
                type: Ce.CHAR,
                value: 8233
            },
            {
                type: Ce.CHAR,
                value: 8239
            },
            {
                type: Ce.CHAR,
                value: 8287
            },
            {
                type: Ce.CHAR,
                value: 12288
            },
            {
                type: Ce.CHAR,
                value: 65279
            }
        ]
    , Ge = ()=>[
            {
                type: Ce.CHAR,
                value: 10
            },
            {
                type: Ce.CHAR,
                value: 13
            },
            {
                type: Ce.CHAR,
                value: 8232
            },
            {
                type: Ce.CHAR,
                value: 8233
            }
        ]
    ;
    Be.words = ()=>({
            type: Ce.SET,
            set: Ee(),
            not: !1
        })
    ;
    Be.notWords = ()=>({
            type: Ce.SET,
            set: Ee(),
            not: !0
        })
    ;
    Be.ints = ()=>({
            type: Ce.SET,
            set: De(),
            not: !1
        })
    ;
    Be.notInts = ()=>({
            type: Ce.SET,
            set: De(),
            not: !0
        })
    ;
    Be.whitespace = ()=>({
            type: Ce.SET,
            set: Fe(),
            not: !1
        })
    ;
    Be.notWhitespace = ()=>({
            type: Ce.SET,
            set: Fe(),
            not: !0
        })
    ;
    Be.anyChar = ()=>({
            type: Ce.SET,
            set: Ge(),
            not: !0
        })
    ;
});
var F = E1((He)=>{
    var Ie = I(), Je = S(), Ke = "@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?", Le = {
        "0": 0,
        t: 9,
        n: 10,
        v: 11,
        f: 12,
        r: 13
    };
    He.strToChars = function(Me) {
        var Ne = /(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z[\\\]^?])|([0tnvfr]))/g;
        return Me = Me.replace(Ne, function(Oe, Pe, Qe, Re, Se, Te, Ue, Ve) {
            if (Qe) return Oe;
            var We = Pe ? 8 : Re ? parseInt(Re, 16) : Se ? parseInt(Se, 16) : Te ? parseInt(Te, 8) : Ue ? Ke.indexOf(Ue) : Le[Ve], Xe = String.fromCharCode(We);
            return /[[\]{}^$.|?*+()]/.test(Xe) && (Xe = "\\" + Xe), Xe;
        }), Me;
    };
    He.tokenizeClass = (Ye, Ze)=>{
        for(var $e = [], _e = /\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?([^])/g, af, bf; (af = _e.exec(Ye)) != null;)if (af[1]) $e.push(Je.words());
        else if (af[2]) $e.push(Je.ints());
        else if (af[3]) $e.push(Je.whitespace());
        else if (af[4]) $e.push(Je.notWords());
        else if (af[5]) $e.push(Je.notInts());
        else if (af[6]) $e.push(Je.notWhitespace());
        else if (af[7]) $e.push({
            type: Ie.RANGE,
            from: (af[8] || af[9]).charCodeAt(0),
            to: af[10].charCodeAt(0)
        });
        else if (bf = af[12]) $e.push({
            type: Ie.CHAR,
            value: bf.charCodeAt(0)
        });
        else return [
            $e,
            _e.lastIndex
        ];
        He.error(Ze, "Unterminated character class");
    };
    He.error = (cf, df)=>{
        throw new SyntaxError("Invalid regular expression: /" + cf + "/: " + df);
    };
});
var U = E1((ef)=>{
    var ff = I();
    ef.wordBoundary = ()=>({
            type: ff.POSITION,
            value: "b"
        })
    ;
    ef.nonWordBoundary = ()=>({
            type: ff.POSITION,
            value: "B"
        })
    ;
    ef.begin = ()=>({
            type: ff.POSITION,
            value: "^"
        })
    ;
    ef.end = ()=>({
            type: ff.POSITION,
            value: "$"
        })
    ;
});
var P = E1((gf, hf)=>{
    var jf = F(), kf = I(), lf = S(), mf = U();
    hf.exports = (nf)=>{
        var of = 0, pf, qf, rf = {
            type: kf.ROOT,
            stack: []
        }, sf = rf, tf = rf.stack, uf = [], vf = (wf)=>{
            jf.error(nf, `Nothing to repeat at column ${wf - 1}`);
        }, xf = jf.strToChars(nf);
        for(pf = xf.length; of < pf;)switch(qf = xf[of++], qf){
            case "\\":
                switch(qf = xf[of++], qf){
                    case "b":
                        tf.push(mf.wordBoundary());
                        break;
                    case "B":
                        tf.push(mf.nonWordBoundary());
                        break;
                    case "w":
                        tf.push(lf.words());
                        break;
                    case "W":
                        tf.push(lf.notWords());
                        break;
                    case "d":
                        tf.push(lf.ints());
                        break;
                    case "D":
                        tf.push(lf.notInts());
                        break;
                    case "s":
                        tf.push(lf.whitespace());
                        break;
                    case "S":
                        tf.push(lf.notWhitespace());
                        break;
                    default:
                        /\d/.test(qf) ? tf.push({
                            type: kf.REFERENCE,
                            value: parseInt(qf, 10)
                        }) : tf.push({
                            type: kf.CHAR,
                            value: qf.charCodeAt(0)
                        });
                }
                break;
            case "^":
                tf.push(mf.begin());
                break;
            case "$":
                tf.push(mf.end());
                break;
            case "[":
                var yf;
                xf[of] === "^" ? (yf = !0, of++) : yf = !1;
                var zf = jf.tokenizeClass(xf.slice(of), nf);
                of += zf[1], tf.push({
                    type: kf.SET,
                    set: zf[0],
                    not: yf
                });
                break;
            case ".":
                tf.push(lf.anyChar());
                break;
            case "(":
                var Af = {
                    type: kf.GROUP,
                    stack: [],
                    remember: !0
                };
                qf = xf[of], qf === "?" && (qf = xf[of + 1], of += 2, qf === "=" ? Af.followedBy = !0 : qf === "!" ? Af.notFollowedBy = !0 : qf !== ":" && jf.error(nf, `Invalid group, character '${qf}' after '?' at column ${of - 1}`), Af.remember = !1), tf.push(Af), uf.push(sf), sf = Af, tf = Af.stack;
                break;
            case ")":
                uf.length === 0 && jf.error(nf, `Unmatched ) at column ${of - 1}`), sf = uf.pop(), tf = sf.options ? sf.options[sf.options.length - 1] : sf.stack;
                break;
            case "|":
                sf.options || (sf.options = [
                    sf.stack
                ], delete sf.stack);
                var Bf = [];
                sf.options.push(Bf), tf = Bf;
                break;
            case "{":
                var Cf = /^(\d+)(,(\d+)?)?\}/.exec(xf.slice(of)), Df, Ef;
                Cf !== null ? (tf.length === 0 && vf(of), Df = parseInt(Cf[1], 10), Ef = Cf[2] ? Cf[3] ? parseInt(Cf[3], 10) : 1 / 0 : Df, of += Cf[0].length, tf.push({
                    type: kf.REPETITION,
                    min: Df,
                    max: Ef,
                    value: tf.pop()
                })) : tf.push({
                    type: kf.CHAR,
                    value: 123
                });
                break;
            case "?":
                tf.length === 0 && vf(of), tf.push({
                    type: kf.REPETITION,
                    min: 0,
                    max: 1,
                    value: tf.pop()
                });
                break;
            case "+":
                tf.length === 0 && vf(of), tf.push({
                    type: kf.REPETITION,
                    min: 1,
                    max: 1 / 0,
                    value: tf.pop()
                });
                break;
            case "*":
                tf.length === 0 && vf(of), tf.push({
                    type: kf.REPETITION,
                    min: 0,
                    max: 1 / 0,
                    value: tf.pop()
                });
                break;
            default:
                tf.push({
                    type: kf.CHAR,
                    value: qf.charCodeAt(0)
                });
        }
        return uf.length !== 0 && jf.error(nf, "Unterminated group"), rf;
    };
    hf.exports.types = kf;
});
var X = x1(P()), j1 = x1(P()), { types: oe  } = X;
var export_default1 = j1.default;
var C = Object.create;
var o = Object.defineProperty;
var p1 = Object.getOwnPropertyDescriptor;
var y = Object.getOwnPropertyNames;
var E2 = Object.getPrototypeOf, I1 = Object.prototype.hasOwnProperty;
var w1 = (Ff)=>o(Ff, "__esModule", {
        value: !0
    })
;
var O = (Gf, Hf)=>()=>(Hf || Gf((Hf = {
            exports: {
            }
        }).exports, Hf), Hf.exports)
;
var x2 = (If, Jf, Kf)=>{
    if (Jf && typeof Jf == "object" || typeof Jf == "function") for (let Lf of y(Jf))!I1.call(If, Lf) && Lf !== "default" && o(If, Lf, {
        get: ()=>Jf[Lf]
        ,
        enumerable: !(Kf = p1(Jf, Lf)) || Kf.enumerable
    });
    return If;
}, v1 = (Mf)=>x2(w1(o(Mf != null ? C(E2(Mf)) : {
    }, "default", Mf && Mf.__esModule && "default" in Mf ? {
        get: ()=>Mf.default
        ,
        enumerable: !0
    } : {
        value: Mf,
        enumerable: !0
    })), Mf)
;
var R = O((Nf, Of)=>{
    var Pf = export_default1, Qf = export_default, Rf = Pf.types;
    Of.exports = class d {
        _setDefaults(Sf) {
            this.max = Sf.max != null ? Sf.max : d.prototype.max != null ? d.prototype.max : 100, this.defaultRange = Sf.defaultRange ? Sf.defaultRange : this.defaultRange.clone(), Sf.randInt && (this.randInt = Sf.randInt);
        }
        gen() {
            return this._gen(this.tokens, []);
        }
        _gen(Tf, Uf) {
            var Vf, Wf, Xf, Yf, Zf;
            switch(Tf.type){
                case Rf.ROOT:
                case Rf.GROUP:
                    if (Tf.followedBy || Tf.notFollowedBy) return "";
                    for(Tf.remember && Tf.groupNumber === void 0 && (Tf.groupNumber = Uf.push(null) - 1), Vf = Tf.options ? this._randSelect(Tf.options) : Tf.stack, Wf = "", Yf = 0, Zf = Vf.length; Yf < Zf; Yf++)Wf += this._gen(Vf[Yf], Uf);
                    return Tf.remember && (Uf[Tf.groupNumber] = Wf), Wf;
                case Rf.POSITION:
                    return "";
                case Rf.SET:
                    var $f = this._expand(Tf);
                    return $f.length ? String.fromCharCode(this._randSelect($f)) : "";
                case Rf.REPETITION:
                    for(Xf = this.randInt(Tf.min, Tf.max === 1 / 0 ? Tf.min + this.max : Tf.max), Wf = "", Yf = 0; Yf < Xf; Yf++)Wf += this._gen(Tf.value, Uf);
                    return Wf;
                case Rf.REFERENCE:
                    return Uf[Tf.value - 1] || "";
                case Rf.CHAR:
                    var _f = this.ignoreCase && this._randBool() ? this._toOtherCase(Tf.value) : Tf.value;
                    return String.fromCharCode(_f);
            }
        }
        _toOtherCase(ag) {
            return ag + (97 <= ag && ag <= 122 ? -32 : 65 <= ag && ag <= 90 ? 32 : 0);
        }
        _randBool() {
            return !this.randInt(0, 1);
        }
        _randSelect(bg) {
            return bg instanceof Qf ? bg.index(this.randInt(0, bg.length - 1)) : bg[this.randInt(0, bg.length - 1)];
        }
        _expand(cg) {
            if (cg.type === Pf.types.CHAR) return new Qf(cg.value);
            if (cg.type === Pf.types.RANGE) return new Qf(cg.from, cg.to);
            {
                let dg = new Qf;
                for(let eg = 0; eg < cg.set.length; eg++){
                    let fg = this._expand(cg.set[eg]);
                    if (dg.add(fg), this.ignoreCase) for(let gg = 0; gg < fg.length; gg++){
                        let hg = fg.index(gg), ig = this._toOtherCase(hg);
                        hg !== ig && dg.add(ig);
                    }
                }
                return cg.not ? this.defaultRange.clone().subtract(dg) : this.defaultRange.clone().intersect(dg);
            }
        }
        randInt(jg, kg) {
            return jg + Math.floor(Math.random() * (1 + kg - jg));
        }
        get defaultRange() {
            return this._range = this._range || new Qf(32, 126);
        }
        set defaultRange(lg) {
            this._range = lg;
        }
        static randexp(mg, ng) {
            var og;
            return typeof mg == "string" && (mg = new RegExp(mg, ng)), mg._randexp === void 0 ? (og = new d(mg, ng), mg._randexp = og) : (og = mg._randexp, og._setDefaults(mg)), og.gen();
        }
        static sugar() {
            RegExp.prototype.gen = function() {
                return d.randexp(this);
            };
        }
        constructor(pg, qg){
            if (this._setDefaults(pg), pg instanceof RegExp) this.ignoreCase = pg.ignoreCase, this.multiline = pg.multiline, pg = pg.source;
            else if (typeof pg == "string") this.ignoreCase = qg && qg.indexOf("i") !== -1, this.multiline = qg && qg.indexOf("m") !== -1;
            else throw new Error("Expected a regexp or string");
            this.tokens = Pf(pg);
        }
    };
});
var b = v1(R());
var export_default4 = b.default;
const Fiona1 = __default3(export_default4);
return Fiona1;
});
