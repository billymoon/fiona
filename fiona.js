!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("fiona",[],t):"object"==typeof exports?exports.fiona=t():e.fiona=t()}(this,function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=33)}([function(e,t,n){const r=n(30);e.exports=r},function(e,t){e.exports={type:e=>Object.prototype.toString.call(e).slice(8,-1)}},function(e,t){e.exports={ROOT:0,GROUP:1,POSITION:2,SET:3,RANGE:4,REPETITION:5,REFERENCE:6,CHAR:7}},function(e,t,n){const r=n(2),a=()=>[{type:r.RANGE,from:48,to:57}],o=()=>[{type:r.CHAR,value:95},{type:r.RANGE,from:97,to:122},{type:r.RANGE,from:65,to:90}].concat(a()),s=()=>[{type:r.CHAR,value:9},{type:r.CHAR,value:10},{type:r.CHAR,value:11},{type:r.CHAR,value:12},{type:r.CHAR,value:13},{type:r.CHAR,value:32},{type:r.CHAR,value:160},{type:r.CHAR,value:5760},{type:r.RANGE,from:8192,to:8202},{type:r.CHAR,value:8232},{type:r.CHAR,value:8233},{type:r.CHAR,value:8239},{type:r.CHAR,value:8287},{type:r.CHAR,value:12288},{type:r.CHAR,value:65279}];t.words=(()=>({type:r.SET,set:o(),not:!1})),t.notWords=(()=>({type:r.SET,set:o(),not:!0})),t.ints=(()=>({type:r.SET,set:a(),not:!1})),t.notInts=(()=>({type:r.SET,set:a(),not:!0})),t.whitespace=(()=>({type:r.SET,set:s(),not:!1})),t.notWhitespace=(()=>({type:r.SET,set:s(),not:!0})),t.anyChar=(()=>({type:r.SET,set:(()=>[{type:r.CHAR,value:10},{type:r.CHAR,value:13},{type:r.CHAR,value:8232},{type:r.CHAR,value:8233}])(),not:!0}))},function(e,t){e.exports=((e,t,n)=>{const r=t.reduce((e,t,r)=>(e.push((e[r-1]||0)+("number"==typeof n[r]?n[r]:1)),e),[]),a=e*r[r.length-1];let o;return r.every((e,t)=>a>e||(o=t,!1)),o})},function(e,t){const n=[123456789,362436069,521288629,88675123];e.exports=(e=>{let[t,r,a,o]=n;const s=()=>{const e=t^t<<11;return[t,r,a]=[r,a,o],(o=o^o>>19^e^e>>8)/2147483647},i=()=>Math.round(1e16*s()),l=e=>{[t,r,a,o]=n.map(t=>t+e),[t,r,a,o]=[i(),i(),i(),i()]};return l(e),{random:()=>s(),reseed:l,getState:()=>[t,r,a,o],setState:e=>[t,r,a,o]=e}})},function(e,t,n){n(0).plugin("shuffle",({seeded:e},t,{qty:n}={})=>e.choose(void 0!==n?n:t.length,t))},function(e,t,n){const r=n(0);r.find=((e,t,{startseed:n=0,tries:a=1e6}={})=>{let o,s,i=n;do{s=(o=r(i)).callback(t)}while(i++<a+n&&!e(s));if(i>a+n)throw Error(`Predicate not satisfied within ${a} tries`);return o})},function(e,t){var n=4,r=.001,a=1e-7,o=10,s=11,i=1/(s-1),l="function"==typeof Float32Array;function u(e,t){return 1-3*t+3*e}function h(e,t){return 3*t-6*e}function c(e){return 3*e}function d(e,t,n){return((u(t,n)*e+h(t,n))*e+c(t))*e}function p(e,t,n){return 3*u(t,n)*e*e+2*h(t,n)*e+c(t)}function g(e){return e}e.exports=function(e,t,u,h){if(!(0<=e&&e<=1&&0<=u&&u<=1))throw new Error("bezier x values must be in [0, 1] range");if(e===t&&u===h)return g;for(var c=l?new Float32Array(s):new Array(s),f=0;f<s;++f)c[f]=d(f*i,e,u);function m(t){for(var l=0,h=1,g=s-1;h!==g&&c[h]<=t;++h)l+=i;var f=l+(t-c[--h])/(c[h+1]-c[h])*i,m=p(f,e,u);return m>=r?function(e,t,r,a){for(var o=0;o<n;++o){var s=p(t,r,a);if(0===s)return t;t-=(d(t,r,a)-e)/s}return t}(t,f,e,u):0===m?f:function(e,t,n,r,s){var i,l,u=0;do{(i=d(l=t+(n-t)/2,r,s)-e)>0?n=l:t=l}while(Math.abs(i)>a&&++u<o);return l}(t,l,l+i,e,u)}return function(e){return 0===e?0:1===e?1:d(m(e),t,h)}}},function(e,t,n){const r=n(8),a=n(0),{type:o}=n(1);a.weighted=((e,t)=>{if("Array"===o(t))a.weighted[e]=r.apply(null,t);else{if("Function"!==o(t))throw Error("invalid argument type supplied to `weighted` method");a.weighted[e]=t}}),a.weighted("linear",e=>e),a.weighted("square",e=>e*e),a.weighted("cube",e=>e*e*e),a.weighted("quad",e=>e*e*e*e),a.weighted("low",[1,0,1,0]),a.weighted("middle",[0,1,1,0]),a.weighted("high",[0,1,0,1]),a.weighted("extremes",[1,0,0,1]),a.weighted("tinyTop",[.25,1,1,.5]),a.plugin("weighted",({seeded:e},t)=>e.weighting(a.weighted[t]))},function(e,t,n){n(0).plugin("date",({seeded:e},{min:t="1940",max:n="2000",long:r=!1}={})=>{const a=1*new Date(t),o=1*new Date(n);if(a>o)throw Error("min date must be lower than max date");const s=o-a,i=new Date(e.number({max:s})+a).toISOString();return r?i:i.slice(0,10)})},function(e,t,n){const r=n(0);r.plugin("lorem",({seeded:e},{qty:t=15}={})=>{const n=e.random()<.2?"lorem ipsum ":"";let r=[];for(;r.length<t;)r=r.concat("dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum".split(" "));const a=Math.ceil(t-t/3),o=Math.ceil(t+t/3)-2;return n+e.choose(e.number({min:a,max:o}),r).join(" ")}),r.plugin("word",({seeded:e})=>e.lorem({qty:1}).split(" ")[0]),r.plugin("sentence",({seeded:e})=>{const t=e.lorem({qty:25});return t[0].toUpperCase()+t.slice(1)+"."}),r.plugin("para",({seeded:e})=>Array(e.number({min:1,max:10})).fill(0).map(t=>e.sentence()).join("  "))},function(e,t,n){const r=n(0);r.plugin("toJSON",({seeded:e})=>e.value()),r.plugin("json",({seeded:e},t)=>JSON.stringify(e,null,t))},function(e,t,n){n(0).plugin("bool",({seeded:e},{chance:t=.5}={})=>e.random()<t)},function(e,t,n){n(0).plugin("duplicable",({seeded:e},{frequency:t=.1,pool:n=10}={})=>(e.random()<=t&&e.reseed(1e16*(Math.floor(e.random()*n+1)/n+1)),e))},function(e,t,n){const r=n(0),a={male:{firstname:["Jack","James","Oliver","Lewis","Logan","Harry","Noah","Leo","Charlie","Alexander","Jacob","Lucas","Harris","Mason","Alfie","Finlay","Ethan","Daniel","Aaron","Max","Archie","Thomas","Matthew","Adam","Rory","Nathan","Callum","Joshua","Oscar","Brodie","Cameron","Harrison","William","Finn","Riley","Dylan","Samuel","Jaxon","Liam","Ollie","Jamie","Connor","Luke","Theo","Ryan","Andrew","Caleb","Jude","Joseph","Benjamin","Muhammad","Arran","Angus","John","David","Isaac","Cole","Hamish","Robert","Jackson","Michael","George","Kai","Leon","Kyle","Ben","Luca","Blake","Murray","Aiden","Carter","Jake","Owen","Cooper","Freddie","Ruaridh","Jayden","Aidan","Fraser","Reuben","Euan","Sam","Blair","Calvin","Christopher","Alex","Arthur","Calum","Cody","Elliot","Josh","Lachlan","Zac","Arlo","Kayden","Robbie","Tyler","Conor","Henry","Hunter","Zachary"],title:["Mr","Dr","Sir","Lord"]},female:{firstname:["Fiona","Aria","Mia","Emily","Sophie","Ava","Amelia","Jessica","Ella","Lucy","Charlotte","Ellie","Lily","Grace","Sophia","Chloe","Evie","Emma","Millie","Eilidh","Anna","Eva","Hannah","Erin","Layla","Ruby","Orla","Harper","Georgia","Maisie","Isabella","Katie","Zoe","Holly","Robyn","Amber","Rosie","Zara","Emilia","Sofia","Skye","Poppy","Daisy","Alice","Lilly","Esme","Rebecca","Scarlett","Ivy","Abigail","Imogen","Leah","Amy","Lacey","Maya","Niamh","Willow","Thea","Elizabeth","Abbie","Lexi","Hollie","Molly","Brooke","Gracie","Sarah","Cara","Sienna","Mila","Phoebe","Rose","Lola","Iona","Ayla","Megan","Paige","Kayla","Julia","Mya","Alexandra","Arianna","Summer","Hope","Quinn","Maria","Eve","Violet","Ariana","Arya","Bella","Elsie","Lillie","Florence","Hanna","Madison","Amelie","Matilda","Lauren"],title:["Miss","Mrs","Dr","Ms","Dame"]},lastname:["Moon","Smith","Brown","Wilson","Robertson","Campbell","Stewart","Thomson","Anderson","Scott","MacDonald","Reid","Murray","Clark","Taylor","Ross","Young","Paterson","Watson","Mitchell","Fraser"]},o=e=>e&&("f"===e[0].toLowerCase()?"female":"male");r.plugin("gender",({seeded:e})=>e.random()<.5?"male":"female"),r.plugin("title",({seeded:e},{gender:t}={})=>e.oneOf(a[o(t||e.gender())].title)),r.plugin("firstname",({seeded:e},{gender:t}={})=>e.oneOf(a[o(t||e.gender())].firstname)),r.plugin("firstnames",({seeded:e},{gender:t}={})=>e.choose(e.clone().weighting(e=>e*e*e).number({min:1,max:3}),a[o(t||e.gender())].firstname).join(" ")),r.plugin("lastname",({seeded:e})=>e.choose(e.clone().weighting(e=>e*e*e).number({min:1,max:2}),a.lastname).join(e.bool()?" ":"-")),r.plugin("name",({seeded:e},{gender:t}={})=>{const n=o(t||e.gender());return`${e.title({gender:n})} ${e.firstnames({gender:n})} ${e.lastname()}`}),r.namedata=a},function(e,t,n){"use strict";class r{constructor(e,t){this.low=e,this.high=t,this.length=1+t-e}overlaps(e){return!(this.high<e.low||this.low>e.high)}touches(e){return!(this.high+1<e.low||this.low-1>e.high)}add(e){return new r(Math.min(this.low,e.low),Math.max(this.high,e.high))}subtract(e){return e.low<=this.low&&e.high>=this.high?[]:e.low>this.low&&e.high<this.high?[new r(this.low,e.low-1),new r(e.high+1,this.high)]:e.low<=this.low?[new r(e.high+1,this.high)]:[new r(this.low,e.low-1)]}toString(){return this.low==this.high?this.low.toString():this.low+"-"+this.high}}class a{constructor(e,t){this.ranges=[],this.length=0,null!=e&&this.add(e,t)}_update_length(){this.length=this.ranges.reduce((e,t)=>e+t.length,0)}add(e,t){var n=e=>{for(var t=0;t<this.ranges.length&&!e.touches(this.ranges[t]);)t++;for(var n=this.ranges.slice(0,t);t<this.ranges.length&&e.touches(this.ranges[t]);)e=e.add(this.ranges[t]),t++;n.push(e),this.ranges=n.concat(this.ranges.slice(t)),this._update_length()};return e instanceof a?e.ranges.forEach(n):(null==t&&(t=e),n(new r(e,t))),this}subtract(e,t){var n=e=>{for(var t=0;t<this.ranges.length&&!e.overlaps(this.ranges[t]);)t++;for(var n=this.ranges.slice(0,t);t<this.ranges.length&&e.overlaps(this.ranges[t]);)n=n.concat(this.ranges[t].subtract(e)),t++;this.ranges=n.concat(this.ranges.slice(t)),this._update_length()};return e instanceof a?e.ranges.forEach(n):(null==t&&(t=e),n(new r(e,t))),this}intersect(e,t){var n=[],o=e=>{for(var t=0;t<this.ranges.length&&!e.overlaps(this.ranges[t]);)t++;for(;t<this.ranges.length&&e.overlaps(this.ranges[t]);){var a=Math.max(this.ranges[t].low,e.low),o=Math.min(this.ranges[t].high,e.high);n.push(new r(a,o)),t++}};return e instanceof a?e.ranges.forEach(o):(null==t&&(t=e),o(new r(e,t))),this.ranges=n,this._update_length(),this}index(e){for(var t=0;t<this.ranges.length&&this.ranges[t].length<=e;)e-=this.ranges[t].length,t++;return this.ranges[t].low+e}toString(){return"[ "+this.ranges.join(", ")+" ]"}clone(){return new a(this)}}e.exports=a},function(e,t,n){const r=n(2);t.wordBoundary=(()=>({type:r.POSITION,value:"b"})),t.nonWordBoundary=(()=>({type:r.POSITION,value:"B"})),t.begin=(()=>({type:r.POSITION,value:"^"})),t.end=(()=>({type:r.POSITION,value:"$"}))},function(e,t,n){const r=n(2),a=n(3),o={0:0,t:9,n:10,v:11,f:12,r:13};t.strToChars=function(e){return e=e.replace(/(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z[\\\]^?])|([0tnvfr]))/g,function(e,t,n,r,a,s,i,l){if(n)return e;var u=t?8:r?parseInt(r,16):a?parseInt(a,16):s?parseInt(s,8):i?"@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?".indexOf(i):o[l],h=String.fromCharCode(u);return/[[\]{}^$.|?*+()]/.test(h)&&(h="\\"+h),h})},t.tokenizeClass=((e,n)=>{for(var o,s,i=[],l=/\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?([^])/g;null!=(o=l.exec(e));)if(o[1])i.push(a.words());else if(o[2])i.push(a.ints());else if(o[3])i.push(a.whitespace());else if(o[4])i.push(a.notWords());else if(o[5])i.push(a.notInts());else if(o[6])i.push(a.notWhitespace());else if(o[7])i.push({type:r.RANGE,from:(o[8]||o[9]).charCodeAt(0),to:o[10].charCodeAt(0)});else{if(!(s=o[12]))return[i,l.lastIndex];i.push({type:r.CHAR,value:s.charCodeAt(0)})}t.error(n,"Unterminated character class")}),t.error=((e,t)=>{throw new SyntaxError("Invalid regular expression: /"+e+"/: "+t)})},function(e,t,n){const r=n(18),a=n(2),o=n(3),s=n(17);e.exports=(e=>{var t,n,i=0,l={type:a.ROOT,stack:[]},u=l,h=l.stack,c=[],d=t=>{r.error(e,`Nothing to repeat at column ${t-1}`)},p=r.strToChars(e);for(t=p.length;i<t;)switch(n=p[i++]){case"\\":switch(n=p[i++]){case"b":h.push(s.wordBoundary());break;case"B":h.push(s.nonWordBoundary());break;case"w":h.push(o.words());break;case"W":h.push(o.notWords());break;case"d":h.push(o.ints());break;case"D":h.push(o.notInts());break;case"s":h.push(o.whitespace());break;case"S":h.push(o.notWhitespace());break;default:/\d/.test(n)?h.push({type:a.REFERENCE,value:parseInt(n,10)}):h.push({type:a.CHAR,value:n.charCodeAt(0)})}break;case"^":h.push(s.begin());break;case"$":h.push(s.end());break;case"[":var g;"^"===p[i]?(g=!0,i++):g=!1;var f=r.tokenizeClass(p.slice(i),e);i+=f[1],h.push({type:a.SET,set:f[0],not:g});break;case".":h.push(o.anyChar());break;case"(":var m={type:a.GROUP,stack:[],remember:!0};"?"===(n=p[i])&&(n=p[i+1],i+=2,"="===n?m.followedBy=!0:"!"===n?m.notFollowedBy=!0:":"!==n&&r.error(e,`Invalid group, character '${n}'`+` after '?' at column ${i-1}`),m.remember=!1),h.push(m),c.push(u),u=m,h=m.stack;break;case")":0===c.length&&r.error(e,`Unmatched ) at column ${i-1}`),h=(u=c.pop()).options?u.options[u.options.length-1]:u.stack;break;case"|":u.options||(u.options=[u.stack],delete u.stack);var y=[];u.options.push(y),h=y;break;case"{":var w,v,b=/^(\d+)(,(\d+)?)?\}/.exec(p.slice(i));null!==b?(0===h.length&&d(i),w=parseInt(b[1],10),v=b[2]?b[3]?parseInt(b[3],10):1/0:w,i+=b[0].length,h.push({type:a.REPETITION,min:w,max:v,value:h.pop()})):h.push({type:a.CHAR,value:123});break;case"?":0===h.length&&d(i),h.push({type:a.REPETITION,min:0,max:1,value:h.pop()});break;case"+":0===h.length&&d(i),h.push({type:a.REPETITION,min:1,max:1/0,value:h.pop()});break;case"*":0===h.length&&d(i),h.push({type:a.REPETITION,min:0,max:1/0,value:h.pop()});break;default:h.push({type:a.CHAR,value:n.charCodeAt(0)})}return 0!==c.length&&r.error(e,"Unterminated group"),l}),e.exports.types=a},function(e,t,n){"use strict";const r=n(19),a=n(16),o=r.types;e.exports=class e{constructor(e,t){if(this._setDefaults(e),e instanceof RegExp)this.ignoreCase=e.ignoreCase,this.multiline=e.multiline,e=e.source;else{if("string"!=typeof e)throw new Error("Expected a regexp or string");this.ignoreCase=t&&-1!==t.indexOf("i"),this.multiline=t&&-1!==t.indexOf("m")}this.tokens=r(e)}_setDefaults(t){this.max=null!=t.max?t.max:null!=e.prototype.max?e.prototype.max:100,this.defaultRange=t.defaultRange?t.defaultRange:this.defaultRange.clone(),t.randInt&&(this.randInt=t.randInt)}gen(){return this._gen(this.tokens,[])}_gen(e,t){var n,r,a,s,i;switch(e.type){case o.ROOT:case o.GROUP:if(e.followedBy||e.notFollowedBy)return"";for(e.remember&&void 0===e.groupNumber&&(e.groupNumber=t.push(null)-1),r="",s=0,i=(n=e.options?this._randSelect(e.options):e.stack).length;s<i;s++)r+=this._gen(n[s],t);return e.remember&&(t[e.groupNumber]=r),r;case o.POSITION:return"";case o.SET:var l=this._expand(e);return l.length?String.fromCharCode(this._randSelect(l)):"";case o.REPETITION:for(a=this.randInt(e.min,e.max===1/0?e.min+this.max:e.max),r="",s=0;s<a;s++)r+=this._gen(e.value,t);return r;case o.REFERENCE:return t[e.value-1]||"";case o.CHAR:var u=this.ignoreCase&&this._randBool()?this._toOtherCase(e.value):e.value;return String.fromCharCode(u)}}_toOtherCase(e){return e+(97<=e&&e<=122?-32:65<=e&&e<=90?32:0)}_randBool(){return!this.randInt(0,1)}_randSelect(e){return e instanceof a?e.index(this.randInt(0,e.length-1)):e[this.randInt(0,e.length-1)]}_expand(e){if(e.type===r.types.CHAR)return new a(e.value);if(e.type===r.types.RANGE)return new a(e.from,e.to);{let t=new a;for(let n=0;n<e.set.length;n++){let r=this._expand(e.set[n]);if(t.add(r),this.ignoreCase)for(let e=0;e<r.length;e++){let n=r.index(e),a=this._toOtherCase(n);n!==a&&t.add(a)}}return e.not?this.defaultRange.clone().subtract(t):this.defaultRange.clone().intersect(t)}}randInt(e,t){return e+Math.floor(Math.random()*(1+t-e))}get defaultRange(){return this._range=this._range||new a(32,126)}set defaultRange(e){this._range=e}static randexp(t,n){var r;return"string"==typeof t&&(t=new RegExp(t,n)),void 0===t._randexp?(r=new e(t,n),t._randexp=r):(r=t._randexp)._setDefaults(t),r.gen()}static sugar(){RegExp.prototype.gen=function(){return e.randexp(this)}}}},function(e,t,n){const r=n(20);n(0).plugin("regex",({seeded:e},t)=>{const n=new r(t);return n.randInt=((t,n)=>t+Math.floor(e.random()*(1+n-t))),n.gen()})},function(e,t,n){const r=n(0),a=n(4);r.plugin("oneOf",({seeded:e},t,{weights:n=[]}={})=>t[a(e.random(),t,n)])},function(e,t,n){const r=n(0),a=n(4);r.plugin("choose",({seeded:e},t,n,{weights:r=[]}={})=>{const o=n.slice(0),s=r.slice(0);return Array(t||0).fill(null).map((t,n)=>{const r=a(e.random(),o,s),i=o[r];return o[r]=o[0],o.shift(),i})})},function(e,t,n){n(0).plugin("number",({seeded:e},{max:t=1e6,min:n=0,precision:r=0}={})=>{const a=Math.pow(10,r);return Math.floor((e.random()*(1+t-n)+n)*a)/a})},function(e,t,n){const{type:r}=n(1);e.exports=(e=>{if("String"===r(e)){let t=0;for(let n=0;n<e.length;n++){let n=0;for(let t=0;t<e.length;t++)n=e.charCodeAt(t)+(n<<6)+(n<<16)-n;t+=n}return t}return e})},function(e,t,n){const r=n(5),a=n(25);e.exports=((e,t)=>{const{reseed:n,getState:o,setState:s,random:i}=r(0);n(a(t));const l=o();return{state:t=>void 0===t?o():(s(null===t?l:t),e),reseed:function(r){return n(a(null===r?t:r)),e},random:()=>e.weighting(i())}})},function(e,t,n){const{type:r}=n(1),a=e=>e;e.exports=(e=>{let t=a;return n=>"Function"===r(n)?(t=n,e):null===n?(t=a,e):t(n)})},function(e,t,n){const r=n(5),{type:a}=n(1);e.exports=((e,t,n)=>{const o=(e,t,n,r)=>{void 0===n&&(n=e);const o={Object:s,Array:i,Function:u}[a(n)];return o?o(n,e,t,r):n},s=(e,t,n)=>(Object.keys(e).forEach(r=>{const a=`${n}.${r}`;e[r]=o(t,a,e[r],null)}),e),i=(e,t,n)=>e.map((e,r)=>{const a=n.match(/^data\[(\d+)\]$/),s=a?`data[${1*a[1]+r}]`:`${n}[${r}]`;return o(t,s,e,r)}),l=(a,o)=>({me:n,pos:a,data:o,seeded:e(`${a}/${t}`,r),arr:(e,t)=>Array(e).fill(t)}),u=(e,t,n,r)=>o(t,n,e(l(n,t),r),r);return{handleFunction:l,recurseData:o}})},function(e){e.exports={name:"fiona",version:"2.5.2",description:"tiny yet powerful pseudo random data generator",repository:"billymoon/fiona",main:"fiona.js",scripts:{start:"[ ${NODE_ENV:-''} = 'production' ] && next start || next dev",test:"jest",build:"taskr build",deploy:"taskr deploy",precommit:"taskr precommit",postcommit:"taskr postcommit",postmerge:"taskr postcommit"},author:"Billy Moon",license:"ISC",devDependencies:{"@taskr/clear":"^1.1.0","@taskr/esnext":"^1.1.0","bezier-easing":"^2.0.3","fetch-pretender":"^1.5.0",freactal:"^2.0.3","git-tools":"^0.3.0",husky:"^0.14.3",jest:"^22.4.4","lodash.template":"^4.4.0",next:"^6.0.2",randexp:"^0.4.6",react:"^16.0.0","react-dom":"^16.0.0",standard:"^11.0.1",taskr:"^1.1.0",webpack:"^4.8.3","webpack-command":"^0.2.0"},jest:{collectCoverageFrom:["src/**/*.js","!src/**/*.docs.js","!src/docs/**"]}}},function(e,t,n){const r=n(29),a=n(28),o=n(27),s=n(26),{type:i}=n(1);function l(e){const t=void 0!==e?e:Math.floor(1e8*Math.random());this.weighting=o(this);const{state:n,reseed:r,random:l}=s(this,t);this.state=n,this.random=l,this.reseed=r;const{recurseData:h,handleFunction:c}=a(u,t,this);let d=null;return this.data=(e=>{switch("Function"===i(e)&&(e=e(c("() => data",d))),i(e)){case"Array":d=h((d||[]).concat(e),`data[${(d||[]).length}]`);break;case"Object":d=h(Object.assign({},d||{},e),"data");break;default:d=e}return d}),this.chain=(e=>(this.data(e),this)),this.value=(()=>d),this.callback=(e=>e.bind(this)(this)),this.info=(()=>({initseed:t})),this.clone=(()=>u(t).state(this.state())),this}const u=(...e)=>new l(...e);u.version=r.version,u.fn=l.prototype={constructor:l},u.plugin=((e,t)=>{u.fn[e]=function(...e){return t({seeded:this},...e)}}),u.call=((e,...t)=>({seeded:n})=>n[e](...t)),e.exports=u},function(e,t,n){n(0).plugin("arr",({seeded:e},t,n)=>e.data(({arr:e})=>e(t,n)))},function(e,t,n){n(31),n(24),n(23),n(22),n(21),n(15),n(14),n(13),n(12),n(11),n(10),n(9),n(7),n(6)},function(e,t,n){n(32),e.exports=n(0)}])});