import{w as q,r as j}from"./index.QkyDSdsn.js";import{w as Q}from"./scheduler.ASOKnCBI.js";const R=q(void 0);function J(t,e){const{computePosition:u,autoUpdate:c,offset:m,shift:w,flip:d,arrow:p,size:v,autoPlacement:i,hide:l,inline:E}=Q(R),r={open:!1,autoUpdateCleanup:()=>{}},S=':is(a[href], button, input, textarea, select, details, [tabindex]):not([tabindex="-1"])';let b;const f="https://www.skeleton.dev/utilities/popups";let o,y;function P(){o=document.querySelector(`[data-popup="${e.target}"]`)??document.createElement("div"),y=o.querySelector(".arrow")??document.createElement("div")}P();function L(){if(!o)throw new Error(`The data-popup="${e.target}" element was not found. ${f}`);if(!u)throw new Error(`Floating UI 'computePosition' not found for data-popup="${e.target}". ${f}`);if(!m)throw new Error(`Floating UI 'offset' not found for data-popup="${e.target}". ${f}`);if(!w)throw new Error(`Floating UI 'shift' not found for data-popup="${e.target}". ${f}`);if(!d)throw new Error(`Floating UI 'flip' not found for data-popup="${e.target}". ${f}`);if(!p)throw new Error(`Floating UI 'arrow' not found for data-popup="${e.target}". ${f}`);const n=[];v&&n.push(v(e.middleware?.size)),i&&n.push(i(e.middleware?.autoPlacement)),l&&n.push(l(e.middleware?.hide)),E&&n.push(E(e.middleware?.inline)),u(t,o,{placement:e.placement??"bottom",middleware:[m(e.middleware?.offset??8),w(e.middleware?.shift??{padding:8}),d(e.middleware?.flip),p(e.middleware?.arrow??{element:y||null}),...n]}).then(({x:a,y:M,placement:U,middlewareData:z})=>{if(Object.assign(o.style,{left:`${a}px`,top:`${M}px`}),y){const{x:C,y:D}=z.arrow,O={top:"bottom",right:"left",bottom:"top",left:"right"}[U.split("-")[0]];Object.assign(y.style,{left:C!=null?`${C}px`:"",top:D!=null?`${D}px`:"",right:"",bottom:"",[O]:"-4px"})}})}function h(){o&&(r.open=!0,e.state&&e.state({state:r.open}),L(),o.style.display="block",o.style.opacity="1",o.style.pointerEvents="auto",o.removeAttribute("inert"),r.autoUpdateCleanup=c(t,o,L),b=Array.from(o?.querySelectorAll(S)))}function s(n){if(!o)return;const a=parseFloat(window.getComputedStyle(o).transitionDuration.replace("s",""))*1e3;setTimeout(()=>{r.open=!1,e.state&&e.state({state:r.open}),o.style.opacity="0",o.setAttribute("inert",""),r.autoUpdateCleanup&&r.autoUpdateCleanup(),n&&n()},a)}function $(){r.open===!1?h():s()}function k(n){if(r.open===!1||t.contains(n.target))return;if(o&&o.contains(n.target)===!1){s();return}const a=e.closeQuery===void 0?"a[href], button":e.closeQuery;if(a==="")return;o?.querySelectorAll(a)?.forEach(U=>{U.contains(n.target)&&s()})}const F=n=>{if(r.open===!1)return;const a=n.key;if(a==="Escape"){n.preventDefault(),t.focus(),s();return}b=Array.from(o?.querySelectorAll(S)),r.open&&document.activeElement===t&&(a==="ArrowDown"||a==="Tab")&&S.length>0&&b.length>0&&(n.preventDefault(),b[0].focus())};switch(e.event){case"click":t.addEventListener("click",$,!0),window.addEventListener("click",k,!0);break;case"hover":t.addEventListener("mouseover",h,!0),t.addEventListener("mouseleave",()=>s(),!0);break;case"focus-blur":t.addEventListener("focus",$,!0),t.addEventListener("blur",()=>s(),!0);break;case"focus-click":t.addEventListener("focus",h,!0),window.addEventListener("click",k,!0);break;default:throw new Error(`Event value of '${e.event}' is not supported. ${f}`)}return window.addEventListener("keydown",F,!0),L(),{update(n){s(()=>{e=n,L(),P()})},destroy(){t.removeEventListener("click",$,!0),t.removeEventListener("mouseover",h,!0),t.removeEventListener("mouseleave",()=>s(),!0),t.removeEventListener("focus",$,!0),t.removeEventListener("focus",h,!0),t.removeEventListener("blur",()=>s(),!0),window.removeEventListener("click",k,!0),window.removeEventListener("keydown",F,!0)}}}const x={};function I(t){return t==="local"?localStorage:sessionStorage}function A(t,e,u){const c=u?.serializer??JSON,m=u?.storage??"local";function w(d,p){I(m).setItem(d,c.stringify(p))}if(!x[t]){const d=q(e,i=>{const l=I(m).getItem(t);l&&i(c.parse(l));{const E=r=>{r.key===t&&i(r.newValue?c.parse(r.newValue):null)};return window.addEventListener("storage",E),()=>window.removeEventListener("storage",E)}}),{subscribe:p,set:v}=d;x[t]={set(i){w(t,i),v(i)},update(i){const l=i(Q(d));w(t,l),v(l)},subscribe:p}}return x[t]}A("modeOsPrefers",!1);A("modeUserPrefers",void 0);A("modeCurrent",!1);const T="(prefers-reduced-motion: reduce)";function V(){return window.matchMedia(T).matches}const K=j(V(),t=>{{const e=c=>{t(c.matches)},u=window.matchMedia(T);return u.addEventListener("change",e),()=>{u.removeEventListener("change",e)}}});export{J as a,K as p,R as s};
