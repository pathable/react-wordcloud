import t from"lodash.debounce";import n,{useRef as e,useState as o,useEffect as r}from"react";import{select as i,event as a}from"d3-selection";import s from"resize-observer-polyfill";import"d3-transition";import{range as l,min as c,max as f,descending as u}from"d3-array";import d from"d3-cloud";import h from"lodash.clonedeep";import m from"seedrandom";import y from"tippy.js";import{dispatch as x}from"d3-dispatch";import{scaleOrdinal as p,scaleLinear as g,scaleSqrt as b,scaleLog as v}from"d3-scale";import{schemeCategory10 as w}from"d3-scale-chromatic";const M=Math.PI/180;function z(t){return t.text}function k(){return"serif"}function W(){return"normal"}function S(t){return Math.sqrt(t.value)}function T(){return 30*(~~(6*Math.random())-3)}function O(){return 1}function $(t,n,e,o){if(n.sprite)return;const r=t.context,i=t.ratio;r.clearRect(0,0,2048/i,2048/i);let a=0,s=0,l=0,c=e.length;for(--o;++o<c;){n=e[o],r.save(),r.font=n.style+" "+n.weight+" "+~~((n.size+1)/i)+"px "+n.font;var f=r.measureText(n.text+"m").width*i,u=n.size<<1;if(n.rotate){const t=Math.sin(n.rotate*M),e=Math.cos(n.rotate*M),o=f*e,r=f*t,i=u*e,a=u*t;f=Math.max(Math.abs(o+a),Math.abs(o-a))+31>>5<<5,u=~~Math.max(Math.abs(r+i),Math.abs(r-i))}else f=f+31>>5<<5;if(u>l&&(l=u),a+f>=2048&&(a=0,s+=l,l=0),s+u>=2048)break;r.translate((a+(f>>1))/i,(s+(u>>1))/i),n.rotate&&r.rotate(n.rotate*M),r.fillText(n.text,0,0),n.padding&&(r.lineWidth=2*n.padding,r.strokeText(n.text,0,0)),r.restore(),n.width=f,n.height=u,n.xoff=a,n.yoff=s,n.x1=f>>1,n.y1=u>>1,n.x0=-n.x1,n.y0=-n.y1,n.hasText=!0,a+=f}const d=r.getImageData(0,0,2048/i,2048/i).data,h=[];for(;--o>=0;){if(!(n=e[o]).hasText)continue;for(var m=(f=n.width)>>5,y=(u=n.y1-n.y0,0);y<u*m;y++)h[y]=0;if(a=n.xoff,null==a)return;s=n.yoff;let t=0,r=-1;for(let e=0;e<u;e++){for(y=0;y<f;y++){const n=d[2048*(s+e)+(a+y)<<2]?1<<31-y%32:0;h[m*e+(y>>5)]|=n,t|=n}t?r=e:(n.y0++,u--,e--,s++)}n.y1=n.y0+r,n.sprite=h.slice(0,(n.y1-n.y0)*m)}}function A(t,n,e){let o,r=t.sprite,i=t.width>>5,a=t.x-(i<<4),s=127&a,l=32-s,c=t.y1-t.y0,f=(t.y+t.y0)*(e>>=5)+(a>>5);for(let t=0;t<c;t++){o=0;for(let e=0;e<=i;e++)if((o<<l|(e<i?(o=r[t*i+e])>>>s:0))&n[f+e])return!0;f+=e}return!1}function j(t,n){const e=t[0],o=t[1];n.x+n.x0<e.x&&(e.x=n.x+n.x0),n.y+n.y0<e.y&&(e.y=n.y+n.y0),n.x+n.x1>o.x&&(o.x=n.x+n.x1),n.y+n.y1>o.y&&(o.y=n.y+n.y1)}function I(t){const n=t[0]/t[1];return function(t){return[n*(t*=.1)*Math.cos(t),t*Math.sin(t)]}}function q(){return document.createElement("canvas")}function E(t){return"function"==typeof t?t:function(){return t}}var C={archimedean:I,rectangular:function(t){let n=4*t[0]/t[1],e=0,o=0;return function(t){const r=t<0?-1:1;switch(Math.sqrt(1+4*r*t)-r&3){case 0:e+=n;break;case 1:o+=4;break;case 2:e-=n;break;default:o-=4}return[e,o]}}};function D(t,n){return t[Math.floor(n()*t.length)]}function F(t){return t.size+"px"}function L(t){return t.text}function N(t){return`translate(${t.x}, ${t.y})`+("number"==typeof t.rotate?`rotate(${t.rotate})`:"")}function P({callbacks:t,maxWords:n,options:e,selection:o,size:r,words:i}){const{deterministic:s,enableOptimizations:l,fontFamily:p,fontStyle:w,fontSizes:M,fontWeight:P,padding:R,randomSeed:U,rotations:H,rotationAngles:B,spiral:G,scale:J}=e,K=i.concat().sort((t,n)=>u(t.value,n.value)).slice(0,n),Q=m(s?U||"deterministic":null);let V;V=l?function(){let t=[256,256],n=z,e=k,o=S,r=W,i=W,a=T,s=O,l=I,c=[],f=Infinity,u=x("word","end"),d=Math.random,h={},m=q,y=!1;function p(n,e,o){let r,i,a,s=e.x,c=e.y,f=Math.sqrt(t[0]*t[0]+t[1]*t[1]),u=l(t),h=d()<.5?1:-1,m=-h;for(;(r=u(m+=h))&&(i=~~r[0],a=~~r[1],console.warn({dxdy:r,t:m,dt:h,board:n,tag:e,bounds:o}),!(Math.min(Math.abs(i),Math.abs(a))>=f));)if(e.x=s+i,e.y=c+a,!(e.x+e.x0<0||e.y+e.y0<0||e.x+e.x1>t[0]||e.y+e.y1>t[1]||o&&A(e,n,t[0])||o&&!((k=e).x+k.x1>(W=o)[0].x&&k.x+k.x0<W[1].x&&k.y+k.y1>W[0].y&&k.y+k.y0<W[1].y))){var y,x=e.sprite,p=e.width>>5,g=t[0]>>5,b=e.x-(p<<4),v=127&b,w=32-v,M=e.y1-e.y0,z=(e.y+e.y0)*g+(b>>5);for(let t=0;t<M;t++){y=0;for(let e=0;e<=p;e++)n[z+e]|=y<<w|(e<p?(y=x[t*p+e])>>>v:0);z+=g}return delete e.sprite,!0}var k,W;return!1}return h.canvas=function(t){return arguments.length?(m=E(t),h):m},h.start=function(){let l=function(t){t.width=t.height=1;const n=Math.sqrt(t.getContext("2d").getImageData(0,0,1,1).data.length>>2);t.width=2048/n,t.height=2048/n;const e=t.getContext("2d");return e.fillStyle=e.strokeStyle="red",e.textAlign="center",{context:e,ratio:n}}(m()),f=new Uint32Array((t[0]>>5)*t[1]),x=null,g=[],b=c.map(function(t,l){return t.text=n.call(this,t,l),t.font=e.call(this,t,l),t.style=r.call(this,t,l),t.weight=i.call(this,t,l),t.rotate=a.call(this,t,l),t.size=~~o.call(this,t,l),t.padding=s.call(this,t,l),t}).sort(function(t,n){return n.size-t.size});return setTimeout(()=>function n(e){const o=50*e,r=Math.min(50*(e+1),c.length);!function(n,e){for(let o=n;o<e;o+=1){const n=b[o];n.x=t[0]*(d()+.5)>>1,n.y=t[1]*(d()+.5)>>1,$(l,n,b,o),n.hasText&&p(f,n,x)&&(g.push(n),u.call("word",h,n),x?j(x,n):x=[{x:n.x+n.x0,y:n.y+n.y0},{x:n.x+n.x1,y:n.y+n.y1}],n.x-=t[0]>>1,n.y-=t[1]>>1)}}(o,r),y||(r<c.length?setTimeout(()=>n(e+1),0):(h.stop(),u.call("end",h,g,x)))}(0),0),h},h.revive=()=>(y=!1,h),h.stop=function(){return y=!0,h},h.timeInterval=function(t){return arguments.length?(f=null==t?Infinity:t,h):f},h.words=function(t){return arguments.length?(c=t,h):c},h.size=function(n){return arguments.length?(t=[+n[0],+n[1]],h):t},h.font=function(t){return arguments.length?(e=E(t),h):e},h.fontStyle=function(t){return arguments.length?(r=E(t),h):r},h.fontWeight=function(t){return arguments.length?(i=E(t),h):i},h.rotate=function(t){return arguments.length?(a=E(t),h):a},h.text=function(t){return arguments.length?(n=E(t),h):n},h.spiral=function(t){return arguments.length?(l=C[t]||t,h):l},h.fontSize=function(t){return arguments.length?(o=E(t),h):o},h.padding=function(t){return arguments.length?(s=E(t),h):s},h.random=function(t){return arguments.length?(d=t,h):d},h.on=function(){const t=u.on.apply(u,arguments);return t===u?h:t},h}():d(),V.size(r).padding(R).words(h(K)).rotate(()=>void 0===H?30*(~~(6*Q())-3):function(t,n,e){if(t<1)return 0;let o=[];if(1===t)o=[n[0]];else{o=[...n];const e=(n[1]-n[0])/(t-1);let r=n[0]+e;for(;r<n[1];)o.push(r),r+=e}return D(o,e)}(H,B,Q)).spiral(G).random(Q).text(L).font(p).fontStyle(w).fontWeight(P),function n(r,i=1){l&&V.revive(),V.fontSize(t=>function(t,n,e){const o=c(t,t=>Number(t.value)),r=f(t,t=>Number(t.value));let i;switch(e){case"log":i=v;break;case"sqrt":i=b;break;case"linear":default:i=g}return i().domain([o,r]).range(n)}(K,r,J)(t.value)).on("end",s=>{if(K.length!==s.length&&i<=10){10===i&&console.warn(`Unable to layout ${K.length-s.length} word(s) after ${i} attempts.  Consider: (1) Increasing the container/component size. (2) Lowering the max font size. (3) Limiting the rotation angles.`);const t=Math.max(.95*r[0],1);n([t,Math.max(.95*r[1],t)],i+1)}else!function({callbacks:t,options:n,random:e,selection:o,words:r}){const{getWordColor:i,getWordTooltip:s,onWordClick:l,onWordMouseOver:c,onWordMouseOut:f}=t,{colors:u,enableTooltip:d,fontStyle:h,fontWeight:m,textAttributes:x,tooltipOptions:p}=n,{fontFamily:g,transitionDuration:b}=n;function v(t){return i?i(t):D(u,e)}let w;o.selectAll("text").data(r).join(t=>{let n=t.append("text").on("click",t=>{l&&l(t,a)}).on("mouseover",t=>{d&&(w=y(a.target,{animation:"scale",arrow:!0,content:()=>s(t),...p})),c&&c(t,a)}).on("mouseout",t=>{w&&w.destroy(),f&&f(t,a)}).attr("cursor",l?"pointer":"default").attr("fill",v).attr("font-family",g).attr("font-style",h).attr("font-weight",m).attr("text-anchor","middle").attr("transform","translate(0, 0) rotate(0)");"object"==typeof x&&Object.keys(x).forEach(t=>{n=n.attr(t,x[t])}),n=n.call(t=>t.transition().duration(b).attr("font-size",F).attr("transform",N).text(L))},t=>{t.transition().duration(b).attr("fill",v).attr("font-family",g).attr("font-size",F).attr("transform",N).text(L)},t=>{t.transition().duration(b).attr("fill-opacity",0).remove()})}({callbacks:t,options:e,random:Q,selection:o,words:s})}).start()}(M)}const R={getWordTooltip:({text:t,value:n})=>`${t} (${n})`},U={colors:l(20).map(t=>t.toString()).map(p(w)),deterministic:!1,enableOptimizations:!1,enableTooltip:!0,fontFamily:"times new roman",fontSizes:[4,32],fontStyle:"normal",fontWeight:"normal",padding:1,rotationAngles:[-90,90],scale:"sqrt",spiral:"rectangular",tooltipOptions:{},transitionDuration:600};function H({callbacks:a,maxWords:l=100,minSize:c,options:f,size:u,words:d,...h}){const m={...R,...a},y={...U,...f},[x,p,g]=function(t,n,a){const l=e(),[c,f]=o(n),[u,d]=o(null);return r(()=>{const e=l.current;let o=i(e).append("svg").style("display","block");"object"==typeof a&&Object.keys(a).forEach(t=>{o=o.attr(t,a[t])});const r=o.append("g");function c(t,n){o.attr("height",n).attr("width",t),r.attr("transform",`translate(${t/2}, ${n/2})`),f([t,n])}d(r);let u=0,h=0;void 0===n?(u=e.parentElement.offsetWidth,h=e.parentElement.offsetHeight):[u,h]=n,u=Math.max(u,t[0]),h=Math.max(h,t[1]),c(u,h);const m=new s(t=>{if(t&&0!==t.length&&void 0===n){const{width:n,height:e}=t[0].contentRect;c(n,e)}});return m.observe(e),()=>{m.unobserve(e),i(e).selectAll("*").remove()}},[n,t,a]),[l,u,c]}(c,u,f.svgAttributes),b=e(t(P,100));return r(()=>{p&&b.current({callbacks:m,maxWords:l,options:y,selection:p,size:g,words:d})},[l,m,y,p,g,d]),n.createElement("div",Object.assign({ref:x,style:{height:"100%",width:"100%"}},h))}H.defaultProps={callbacks:R,maxWords:100,minSize:[300,300],options:U};export default H;export{R as defaultCallbacks,U as defaultOptions};
//# sourceMappingURL=index.modern.js.map
