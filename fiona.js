(function(a,b){'object'==typeof exports&&'object'==typeof module?module.exports=b():'function'==typeof define&&define.amd?define('fiona',[],b):'object'==typeof exports?exports.fiona=b():a.fiona=b()})(this,function(){var a=String.fromCharCode,c=Math.floor;return function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=5)}([function(a,b,c){const d=c(13),e=c(17);Object.keys(e).forEach((a)=>d.plugin(a,e[a])),a.exports=d},function(a){const b=(a)=>Object.prototype.toString.call(a).slice(8,-1);a.exports={type:b,processSeed:(a)=>{if('String'===b(a)){let b=0;for(let c,d=0;d<a.length;d++){c=0;for(let b=0;b<a.length;b++)c=a.charCodeAt(b)+(c<<6)+(c<<16)-c;b+=c}return b}return a}}},function(a){a.exports={ROOT:0,GROUP:1,POSITION:2,SET:3,RANGE:4,REPETITION:5,REFERENCE:6,CHAR:7}},function(a,b,c){var d=c(2),e=function(){return[{type:d.RANGE,from:48,to:57}]},f=function(){return[{type:d.CHAR,value:95},{type:d.RANGE,from:97,to:122},{type:d.RANGE,from:65,to:90}].concat(e())},g=function(){return[{type:d.CHAR,value:9},{type:d.CHAR,value:10},{type:d.CHAR,value:11},{type:d.CHAR,value:12},{type:d.CHAR,value:13},{type:d.CHAR,value:32},{type:d.CHAR,value:160},{type:d.CHAR,value:5760},{type:d.CHAR,value:6158},{type:d.CHAR,value:8192},{type:d.CHAR,value:8193},{type:d.CHAR,value:8194},{type:d.CHAR,value:8195},{type:d.CHAR,value:8196},{type:d.CHAR,value:8197},{type:d.CHAR,value:8198},{type:d.CHAR,value:8199},{type:d.CHAR,value:8200},{type:d.CHAR,value:8201},{type:d.CHAR,value:8202},{type:d.CHAR,value:8232},{type:d.CHAR,value:8233},{type:d.CHAR,value:8239},{type:d.CHAR,value:8287},{type:d.CHAR,value:12288},{type:d.CHAR,value:65279}]},h=function(){return[{type:d.CHAR,value:10},{type:d.CHAR,value:13},{type:d.CHAR,value:8232},{type:d.CHAR,value:8233}]};b.words=function(){return{type:d.SET,set:f(),not:!1}},b.notWords=function(){return{type:d.SET,set:f(),not:!0}},b.ints=function(){return{type:d.SET,set:e(),not:!1}},b.notInts=function(){return{type:d.SET,set:e(),not:!0}},b.whitespace=function(){return{type:d.SET,set:g(),not:!1}},b.notWhitespace=function(){return{type:d.SET,set:g(),not:!0}},b.anyChar=function(){return{type:d.SET,set:h(),not:!0}}},function(a){const b=[123456789,362436069,521288629,88675123];a.exports=(a)=>{let[c,d,e,f]=b;const g=()=>{const a=c^c<<11;return[c,d,e]=[d,e,f],f=f^f>>19^(a^a>>8),f/2147483647},h=()=>Math.round(1e16*g()),i=(a)=>{[c,d,e,f]=b.map((b)=>b+a),[c,d,e,f]=[h(),h(),h(),h()]};return i(a),{random:()=>g(),reseed:i,getState:()=>[c,d,e,f],setState:(a)=>[c,d,e,f]=a}}},function(a,b,c){c(6),a.exports=c(0)},function(a,b,c){c(7),c(18),c(19),c(20),c(21),c(22),c(23),c(25)},function(a,b,d){const e=d(8),f=d(0);f.plugin('regex',({seeded:d},a)=>{const b=new e(a);return b.randInt=(e,a)=>e+c(d.random()*(1+a-e)),b.gen()})},function(b,d,e){function f(a){return a+(97<=a&&122>=a?-32:65<=a&&90>=a?32:0)}function g(){return!this.randInt(0,1)}function h(a){return a instanceof m?a.index(this.randInt(0,a.length-1)):a[this.randInt(0,a.length-1)]}function k(a){if(a.type===l.types.CHAR)return new m(a.value);if(a.type===l.types.RANGE)return new m(a.from,a.to);for(var b,c=new m,d=0;d<a.set.length;d++)if(b=k.call(this,a.set[d]),c.add(b),this.ignoreCase)for(var e=0;e<b.length;e++){var g=b.index(e),h=f(g);g!==h&&c.add(h)}return a.not?this.defaultRange.clone().subtract(c):c}function i(a,b){'number'==typeof b.max&&(a.max=b.max),b.defaultRange instanceof m&&(a.defaultRange=b.defaultRange),'function'==typeof b.randInt&&(a.randInt=b.randInt)}function j(b,c){var d,e,m,n,i;switch(b.type){case o.ROOT:case o.GROUP:if(b.followedBy||b.notFollowedBy)return'';for(b.remember&&void 0===b.groupNumber&&(b.groupNumber=c.push(null)-1),d=b.options?h.call(this,b.options):b.stack,e='',(n=0,i=d.length);n<i;n++)e+=j.call(this,d[n],c);return b.remember&&(c[b.groupNumber]=e),e;case o.POSITION:return'';case o.SET:var l=k.call(this,b);return l.length?a(h.call(this,l)):'';case o.REPETITION:for(m=this.randInt(b.min,b.max===Infinity?b.min+this.max:b.max),e='',n=0;n<m;n++)e+=j.call(this,b.value,c);return e;case o.REFERENCE:return c[b.value-1]||'';case o.CHAR:var p=this.ignoreCase&&g.call(this)?f(b.value):b.value;return a(p);}}var l=e(9),m=e(12),o=l.types,n=b.exports=function(a,b){if(this.defaultRange=this.defaultRange.clone(),a instanceof RegExp)this.ignoreCase=a.ignoreCase,this.multiline=a.multiline,i(this,a),a=a.source;else if('string'==typeof a)this.ignoreCase=b&&-1!==b.indexOf('i'),this.multiline=b&&-1!==b.indexOf('m');else throw new Error('Expected a regexp or string');this.tokens=l(a)};n.prototype.max=100,n.prototype.gen=function(){return j.call(this,this.tokens,[])},n.randexp=function(a,b){var c;return void 0===a._randexp?(c=new n(a,b),a._randexp=c):c=a._randexp,i(c,a),c.gen()},n.sugar=function(){RegExp.prototype.gen=function(){return n.randexp(this)}},n.prototype.defaultRange=new m(32,126),n.prototype.randInt=function(d,a){return d+c(Math.random()*(1+a-d))}},function(a,b,c){var d=c(10),e=c(2),f=c(3),g=c(11);a.exports=function(a){var b,h,c=0,i={type:e.ROOT,stack:[]},j=i,k=i.stack,l=[],m=function(b){d.error(a,'Nothing to repeat at column '+(b-1))},n=d.strToChars(a);for(b=n.length;c<b;)switch(h=n[c++],h){case'\\':h=n[c++],'b'===h?k.push(g.wordBoundary()):'B'===h?k.push(g.nonWordBoundary()):'w'===h?k.push(f.words()):'W'===h?k.push(f.notWords()):'d'===h?k.push(f.ints()):'D'===h?k.push(f.notInts()):'s'===h?k.push(f.whitespace()):'S'===h?k.push(f.notWhitespace()):/\d/.test(h)?k.push({type:e.REFERENCE,value:parseInt(h,10)}):k.push({type:e.CHAR,value:h.charCodeAt(0)});break;case'^':k.push(g.begin());break;case'$':k.push(g.end());break;case'[':var o;'^'===n[c]?(o=!0,c++):o=!1;var p=d.tokenizeClass(n.slice(c),a);c+=p[1],k.push({type:e.SET,set:p[0],not:o});break;case'.':k.push(f.anyChar());break;case'(':var q={type:e.GROUP,stack:[],remember:!0};h=n[c],'?'===h&&(h=n[c+1],c+=2,'='===h?q.followedBy=!0:'!'===h?q.notFollowedBy=!0:':'!==h&&d.error(a,'Invalid group, character \''+h+'\' after \'?\' at column '+(c-1)),q.remember=!1),k.push(q),l.push(j),j=q,k=q.stack;break;case')':0===l.length&&d.error(a,'Unmatched ) at column '+(c-1)),j=l.pop(),k=j.options?j.options[j.options.length-1]:j.stack;break;case'|':j.options||(j.options=[j.stack],delete j.stack);var r=[];j.options.push(r),k=r;break;case'{':var s,t,u=/^(\d+)(,(\d+)?)?\}/.exec(n.slice(c));null===u?k.push({type:e.CHAR,value:123}):(0===k.length&&m(c),s=parseInt(u[1],10),t=u[2]?u[3]?parseInt(u[3],10):Infinity:s,c+=u[0].length,k.push({type:e.REPETITION,min:s,max:t,value:k.pop()}));break;case'?':0===k.length&&m(c),k.push({type:e.REPETITION,min:0,max:1,value:k.pop()});break;case'+':0===k.length&&m(c),k.push({type:e.REPETITION,min:1,max:Infinity,value:k.pop()});break;case'*':0===k.length&&m(c),k.push({type:e.REPETITION,min:0,max:Infinity,value:k.pop()});break;default:k.push({type:e.CHAR,value:h.charCodeAt(0)});}return 0!==l.length&&d.error(a,'Unterminated group'),i},a.exports.types=e},function(b,d,c){var e=c(2),f=c(3),g={0:0,t:9,n:10,v:11,f:12,r:13};d.strToChars=function(b){var c=/(\[\\b\])|(\\)?\\(?:u([A-F0-9]{4})|x([A-F0-9]{2})|(0?[0-7]{2})|c([@A-Z\[\\\]\^?])|([0tnvfr]))/g;return b=b.replace(c,function(d,e,b,f,h,i,j,k){if(b)return d;var l=e?8:f?parseInt(f,16):h?parseInt(h,16):i?parseInt(i,8):j?'@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^ ?'.indexOf(j):g[k],m=a(l);return /[\[\]{}\^$.|?*+()]/.test(m)&&(m='\\'+m),m}),b},d.tokenizeClass=function(a,b){for(var g,h,c=[],i=/\\(?:(w)|(d)|(s)|(W)|(D)|(S))|((?:(?:\\)(.)|([^\]\\]))-(?:\\)?([^\]]))|(\])|(?:\\)?(.)/g;null!=(g=i.exec(a));)if(g[1])c.push(f.words());else if(g[2])c.push(f.ints());else if(g[3])c.push(f.whitespace());else if(g[4])c.push(f.notWords());else if(g[5])c.push(f.notInts());else if(g[6])c.push(f.notWhitespace());else if(g[7])c.push({type:e.RANGE,from:(g[8]||g[9]).charCodeAt(0),to:g[10].charCodeAt(0)});else if(h=g[12])c.push({type:e.CHAR,value:h.charCodeAt(0)});else return[c,i.lastIndex];d.error(b,'Unterminated character class')},d.error=function(a,b){throw new SyntaxError('Invalid regular expression: /'+a+'/: '+b)}},function(a,b,c){var d=c(2);b.wordBoundary=function(){return{type:d.POSITION,value:'b'}},b.nonWordBoundary=function(){return{type:d.POSITION,value:'B'}},b.begin=function(){return{type:d.POSITION,value:'^'}},b.end=function(){return{type:d.POSITION,value:'$'}}},function(a){function c(a,b){this.low=a,this.high=b,this.length=1+b-a}function d(c,a){return this instanceof d?void(this.ranges=[],this.length=0,void 0!==c&&this.add(c,a)):new d(c,a)}function b(a){a.length=a.ranges.reduce(function(a,b){return a+b.length},0)}c.prototype.overlaps=function(a){return!(this.high<a.low||this.low>a.high)},c.prototype.touches=function(a){return!(this.high+1<a.low||this.low-1>a.high)},c.prototype.add=function(a){return this.touches(a)&&new c(Math.min(this.low,a.low),Math.max(this.high,a.high))},c.prototype.subtract=function(a){return!!this.overlaps(a)&&(a.low<=this.low&&a.high>=this.high?[]:a.low>this.low&&a.high<this.high?[new c(this.low,a.low-1),new c(a.high+1,this.high)]:a.low<=this.low?[new c(a.high+1,this.high)]:[new c(this.low,a.low-1)])},c.prototype.toString=function(){return this.low==this.high?this.low.toString():this.low+'-'+this.high},c.prototype.clone=function(){return new c(this.low,this.high)},d.prototype.add=function(e,a){function f(a){for(var c=[],d=0;d<g.ranges.length&&!a.touches(g.ranges[d]);)c.push(g.ranges[d].clone()),d++;for(;d<g.ranges.length&&a.touches(g.ranges[d]);)a=a.add(g.ranges[d]),d++;for(c.push(a);d<g.ranges.length;)c.push(g.ranges[d].clone()),d++;g.ranges=c,b(g)}var g=this;return e instanceof d?e.ranges.forEach(f):e instanceof c?f(e):(void 0===a&&(a=e),f(new c(e,a))),this},d.prototype.subtract=function(e,a){function f(a){for(var c=[],d=0;d<g.ranges.length&&!a.overlaps(g.ranges[d]);)c.push(g.ranges[d].clone()),d++;for(;d<g.ranges.length&&a.overlaps(g.ranges[d]);)c=c.concat(g.ranges[d].subtract(a)),d++;for(;d<g.ranges.length;)c.push(g.ranges[d].clone()),d++;g.ranges=c,b(g)}var g=this;return e instanceof d?e.ranges.forEach(f):e instanceof c?f(e):(void 0===a&&(a=e),f(new c(e,a))),this},d.prototype.index=function(a){for(var b=0;b<this.ranges.length&&this.ranges[b].length<=a;)a-=this.ranges[b].length,b++;return b>=this.ranges.length?null:this.ranges[b].low+a},d.prototype.toString=function(){return'[ '+this.ranges.join(', ')+' ]'},d.prototype.clone=function(){return new d(this)},a.exports=d},function(a,b,d){function e(a){const b=void 0===a?c(1e8*Math.random()):a;this.weighting=g(this);const{state:d,reseed:e,random:k}=h(this,b);this.state=d,this.random=k,this.reseed=e;const{recurseData:l,handleFunction:m}=f(j,b,this);let n=null;return this.data=(a)=>{switch('Function'===i(a)&&(a=a(m('() => data',n))),i(a)){case'Array':n=l((n||[]).concat(a),`data[${(n||[]).length}]`);break;case'Object':n=l(Object.assign({},n||{},a),'data');break;default:n=a;}return n},this.chain=(a)=>(this.data(a),this),this.value=()=>n,this.callback=(a)=>a.bind(this)(n,this),this.info=()=>({initseed:b}),this.clone=()=>j(b).state(this.state()),this}const f=d(14),g=d(15),h=d(16),{type:i}=d(1),j=(...a)=>new e(...a);j.version='__VERSION__',j.fn=e.prototype={constructor:e},j.plugin=(a,b)=>j.fn[a]=function(...a){return b({seeded:this},...a)},j.call=(a,...b)=>({seeded:c})=>c[a](...b),a.exports=j},function(a,b,c){const d=c(4),{type:e}=c(1);a.exports=(a,b,c)=>{const f=(a,b,c,d)=>{c===void 0&&(c=a);const f={Object:h,Array:i,Function:k}[e(c)];return f?f(c,a,b,d):c},g=(a,b)=>Array(a).fill(b),h=(a,b,c)=>(Object.keys(a).forEach((d)=>{const e=`${c}.${d}`;a[d]=f(b,e,a[d],null)}),a),i=(a,b,c)=>a.map((a,d)=>{const e=c.match(/^data\[(\d+)\]$/),g=e?`data[${1*e[1]+d}]`:`${c}[${d}]`;return f(b,g,a,d)}),j=(e,f)=>({me:c,pos:e,data:f,seeded:a(`${e}/${b}`,d),arr:g}),k=(a,b,c,d)=>f(b,c,a(j(c,b),d),d);return{handleFunction:j,recurseData:f}}},function(a,b,c){const{type:d}=c(1),e=(a)=>a;a.exports=(a)=>{let b=e;return(c)=>'Function'===d(c)?(b=c,a):null===c?(b=e,a):b(c)}},function(a,b,c){const d=c(4),{processSeed:e}=c(1);a.exports=(a,b)=>{const{reseed:c,getState:f,setState:g,random:h}=d(0);c(e(b));const i=f();return{state:(b)=>void 0===b?f():(null===b?g(i):g(b),a),reseed:function(d){return c(e(null===d?b:d)),a},random:()=>a.weighting(h())}}},function(a){const b=(a,b,c)=>{const d=b.reduce((a,b,d)=>(a.push((a[d-1]||0)+('number'==typeof c[d]?c[d]:1)),a),[]),e=a*d[d.length-1];let f;return d.every((a,b)=>!!(e>a)||(f=b,!1)),f};a.exports={number:function({seeded:a},{max:b=1e6,min:d=0,precision:e=0}={}){const f=Math.pow(10,e);return c((a.random()*(1+b-d)+d)*f)/f},oneOf:function({seeded:a},c,{weights:d=[]}={}){return c[b(a.random(),c,d)]},choose:function({seeded:a},c,d,{weights:e=[]}={}){const f=d.slice(0),g=e.slice(0);return Array(c||0).fill(null).map(()=>{const c=b(a.random(),f,g),d=f[c];return f[c]=f[0],f.shift(),d})}}},function(a,b,c){const d=c(0),e={male:{firstname:['Jack','James','Oliver','Lewis','Logan','Harry','Noah','Leo','Charlie','Alexander','Jacob','Lucas','Harris','Mason','Alfie','Finlay','Ethan','Daniel','Aaron','Max','Archie','Thomas','Matthew','Adam','Rory','Nathan','Callum','Joshua','Oscar','Brodie','Cameron','Harrison','William','Finn','Riley','Dylan','Samuel','Jaxon','Liam','Ollie','Jamie','Connor','Luke','Theo','Ryan','Andrew','Caleb','Jude','Joseph','Benjamin','Muhammad','Arran','Angus','John','David','Isaac','Cole','Hamish','Robert','Jackson','Michael','George','Kai','Leon','Kyle','Ben','Luca','Blake','Murray','Aiden','Carter','Jake','Owen','Cooper','Freddie','Ruaridh','Jayden','Aidan','Fraser','Reuben','Euan','Sam','Blair','Calvin','Christopher','Alex','Arthur','Calum','Cody','Elliot','Josh','Lachlan','Zac','Arlo','Kayden','Robbie','Tyler','Conor','Henry','Hunter','Zachary'],title:['Mr','Dr','Sir','Lord']},female:{firstname:['Fiona','Aria','Mia','Emily','Sophie','Ava','Amelia','Jessica','Ella','Lucy','Charlotte','Ellie','Lily','Grace','Sophia','Chloe','Evie','Emma','Millie','Eilidh','Anna','Eva','Hannah','Erin','Layla','Ruby','Orla','Harper','Georgia','Maisie','Isabella','Katie','Zoe','Holly','Robyn','Amber','Rosie','Zara','Emilia','Sofia','Skye','Poppy','Daisy','Alice','Lilly','Esme','Rebecca','Scarlett','Ivy','Abigail','Imogen','Leah','Amy','Lacey','Maya','Niamh','Willow','Thea','Elizabeth','Abbie','Lexi','Hollie','Molly','Brooke','Gracie','Sarah','Cara','Sienna','Mila','Phoebe','Rose','Lola','Iona','Ayla','Megan','Paige','Kayla','Julia','Mya','Alexandra','Arianna','Summer','Hope','Quinn','Maria','Eve','Violet','Ariana','Arya','Bella','Elsie','Lillie','Florence','Hanna','Madison','Amelie','Matilda','Lauren'],title:['Miss','Mrs','Dr','Ms','Dame']},lastname:['Moon','Smith','Brown','Wilson','Robertson','Campbell','Stewart','Thomson','Anderson','Scott','MacDonald','Reid','Murray','Clark','Taylor','Ross','Young','Paterson','Watson','Mitchell','Fraser']},f=(a)=>a&&('f'===a[0].toLowerCase()?'female':'male');d.plugin('gender',({seeded:a})=>0.5>a.random()?'male':'female'),d.plugin('title',({seeded:a},{gender:b}={})=>a.oneOf(e[f(b||a.gender())].title)),d.plugin('firstname',({seeded:a},{gender:b}={})=>a.oneOf(e[f(b||a.gender())].firstname)),d.plugin('firstnames',({seeded:a},{gender:b}={})=>a.choose(a.clone().weighting((a)=>a*a*a).number({min:1,max:3}),e[f(b||a.gender())].firstname).join(' ')),d.plugin('lastname',({seeded:a})=>a.choose(a.clone().weighting((a)=>a*a*a).number({min:1,max:2}),e.lastname).join(a.bool()?' ':'-')),d.plugin('name',({seeded:a},{gender:b}={})=>{const c=f(b||a.gender());return`${a.title({gender:c})} ${a.firstnames({gender:c})} ${a.lastname()}`}),d.namedata=e},function(a,b,d){const e=d(0);e.plugin('duplicable',({seeded:a},{frequency:b=0.1,pool:d=10}={})=>(a.random()<=b&&a.reseed(1e16*(c(a.random()*d+1)/d+1)),a))},function(a,b,c){const d=c(0);d.plugin('bool',({seeded:a},{chance:b=0.5}={})=>a.random()<b)},function(a,b,c){const d=c(0);d.plugin('lorem',({seeded:a},{qty:b=15}={})=>{var c=Math.ceil;const d=0.2>a.random()?'lorem ipsum ':'';let e=[];for(;e.length<b;)e=e.concat(['dolor','sit','amet','consectetur','adipisicing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','ut','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','ut','aliquip','ex','ea','commodo','consequat','duis','aute','irure','dolor','in','reprehenderit','in','voluptate','velit','esse','cillum','dolore','eu','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident','sunt','in','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum']);const f=c(b-b/3),g=c(b+b/3)-2;return d+a.choose(a.number({min:f,max:g}),e).join(' ')}),d.plugin('word',({seeded:a})=>a.lorem({qty:1}).split(' ')[0]),d.plugin('sentence',({seeded:a})=>{const b=a.lorem({qty:25});return b[0].toUpperCase()+b.slice(1)+'.'}),d.plugin('para',({seeded:a})=>Array(a.number({min:1,max:10})).fill(0).map(()=>a.sentence()).join('  '))},function(a,b,c){const d=c(0);d.plugin('date',({seeded:a},{min:b='1940',max:c='2000',long:d=!1}={})=>{const e=1*new Date(b),f=1*new Date(c);if(e>f)throw Error(`min date must be lower than max date`);const g=new Date(a.number({max:f-e})+e).toISOString();return d?g:g.slice(0,10)})},function(a,b,c){const d=c(24),e=c(0),{type:f}=c(1);e.weighted=(a,b)=>{if('Array'===f(b))e.weighted[a]=d.apply(null,b);else if('Function'===f(b))e.weighted[a]=b;else throw Error('invalid argument type supplied to `weighted` method')},e.weighted('linear',(a)=>a),e.weighted('square',(a)=>a*a),e.weighted('cube',(a)=>a*a*a),e.weighted('quad',(a)=>a*a*a*a),e.weighted('low',[1,0,1,0]),e.weighted('middle',[0,1,1,0]),e.weighted('high',[0,1,0,1]),e.weighted('extremes',[1,0,0,1]),e.weighted('tinyTop',[0.25,1,1,0.5]),e.plugin('weighted',({seeded:a},b)=>a.weighting(e.weighted[b]))},function(a){function b(a,b){return 1-3*b+3*a}function c(a,b){return 3*b-6*a}function d(a){return 3*a}function e(a,e,f){return((b(e,f)*a+c(e,f))*a+d(e))*a}function f(a,e,f){return 3*b(e,f)*a*a+2*c(e,f)*a+d(e)}function g(a,b,c,d,f){var g,h,j=0;do h=b+(c-b)/2,g=e(h,d,f)-a,0<g?c=h:b=h;while(Math.abs(g)>k&&++j<l);return h}function h(a,b,c,d){for(var g,h=0;h<j;++h){if(g=f(b,c,d),0===g)return b;var i=e(b,c,d)-a;b-=i/g}return b}var j=4,k=1e-7,l=10,m=11,n=1/(m-1),o='function'==typeof Float32Array;a.exports=function(a,b,c,d){function j(b){for(var d=0,e=1;e!=m-1&&k[e]<=b;++e)d+=n;--e;var i=(b-k[e])/(k[e+1]-k[e]),j=d+i*n,l=f(j,a,c);return l>=1e-3?h(b,j,a,c):0===l?j:g(b,d,d+n,a,c)}if(!(0<=a&&1>=a&&0<=c&&1>=c))throw new Error('bezier x values must be in [0, 1] range');var k=o?new Float32Array(m):Array(m);if(a!==b||c!==d)for(var l=0;l<m;++l)k[l]=e(l*n,a,c);return function(f){return a===b&&c===d?f:0===f?0:1===f?1:e(j(f),b,d)}}},function(a,b,c){const d=c(0);d.until=(a,b,{startseed:c=0,tries:e=1e6}={})=>{let f,g=c;do f=d(g).chain(Object.assign({},b));while(g++<e+c&&!a(f.value()));if(g>e+c)throw Error(`Predicate not satisfied within ${e} tries`);return f}}])});