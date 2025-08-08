import{q as vo,ax as vc,ay as wc,az as Ic,aA as Ec,aB as Tc,aC as Ac}from"./CBnVU58R.js";const Sc=Symbol("is custom element"),bc=Symbol("is html");function Sp(t){if(vo){var e=!1,n=()=>{if(!e){if(e=!0,t.hasAttribute("value")){var r=t.value;ms(t,"value",null),t.value=r}if(t.hasAttribute("checked")){var s=t.checked;ms(t,"checked",null),t.checked=s}}};t.__on_r=n,vc(n),wc()}}function ms(t,e,n,r){var s=Rc(t);vo&&(s[e]=t.getAttribute(e),e==="src"||e==="srcset"||e==="href"&&t.nodeName==="LINK")||s[e]!==(s[e]=n)&&(e==="loading"&&(t[Ic]=n),n==null?t.removeAttribute(e):typeof n!="string"&&kc(t).includes(e)?t[e]=n:t.setAttribute(e,n))}function Rc(t){return t.__attributes??={[Sc]:t.nodeName.includes("-"),[bc]:t.namespaceURI===Ec}}var _s=new Map;function kc(t){var e=_s.get(t.nodeName);if(e)return e;_s.set(t.nodeName,e=[]);for(var n,r=t,s=Element.prototype;s!==r;){n=Ac(r);for(var a in n)n[a].set&&e.push(a);r=Tc(r)}return e}const Cc=()=>{};var ys={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wo=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Pc=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const a=t[n++];e[r++]=String.fromCharCode((s&31)<<6|a&63)}else if(s>239&&s<365){const a=t[n++],l=t[n++],u=t[n++],f=((s&7)<<18|(a&63)<<12|(l&63)<<6|u&63)-65536;e[r++]=String.fromCharCode(55296+(f>>10)),e[r++]=String.fromCharCode(56320+(f&1023))}else{const a=t[n++],l=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(a&63)<<6|l&63)}}return e.join("")},Io={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const a=t[s],l=s+1<t.length,u=l?t[s+1]:0,f=s+2<t.length,E=f?t[s+2]:0,S=a>>2,b=(a&3)<<4|u>>4;let T=(u&15)<<2|E>>6,P=E&63;f||(P=64,l||(T=64)),r.push(n[S],n[b],n[T],n[P])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(wo(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Pc(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const a=n[t.charAt(s++)],u=s<t.length?n[t.charAt(s)]:0;++s;const E=s<t.length?n[t.charAt(s)]:64;++s;const b=s<t.length?n[t.charAt(s)]:64;if(++s,a==null||u==null||E==null||b==null)throw new Oc;const T=a<<2|u>>4;if(r.push(T),E!==64){const P=u<<4&240|E>>2;if(r.push(P),b!==64){const R=E<<6&192|b;r.push(R)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class Oc extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Nc=function(t){const e=wo(t);return Io.encodeByteArray(e,!0)},Mn=function(t){return Nc(t).replace(/\./g,"")},Eo=function(t){try{return Io.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dc(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lc=()=>Dc().__FIREBASE_DEFAULTS__,Uc=()=>{if(typeof process>"u"||typeof ys>"u")return;const t=ys.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Mc=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Eo(t[1]);return e&&JSON.parse(e)},zi=()=>{try{return Cc()||Lc()||Uc()||Mc()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},To=t=>{var e,n;return(n=(e=zi())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Ao=t=>{const e=To(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},So=()=>{var t;return(t=zi())===null||t===void 0?void 0:t.config},bo=t=>{var e;return(e=zi())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xc{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lt(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function qi(t){return(await fetch(t,{credentials:"include"})).ok}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ro(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,a=t.sub||t.user_id;if(!a)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const l=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:a,user_id:a,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Mn(JSON.stringify(n)),Mn(JSON.stringify(l)),""].join(".")}const Wt={};function Fc(){const t={prod:[],emulator:[]};for(const e of Object.keys(Wt))Wt[e]?t.emulator.push(e):t.prod.push(e);return t}function jc(t){let e=document.getElementById(t),n=!1;return e||(e=document.createElement("div"),e.setAttribute("id",t),n=!0),{created:n,element:e}}let vs=!1;function Gi(t,e){if(typeof window>"u"||typeof document>"u"||!lt(window.location.host)||Wt[t]===e||Wt[t]||vs)return;Wt[t]=e;function n(T){return`__firebase__banner__${T}`}const r="__firebase__banner",a=Fc().prod.length>0;function l(){const T=document.getElementById(r);T&&T.remove()}function u(T){T.style.display="flex",T.style.background="#7faaf0",T.style.position="fixed",T.style.bottom="5px",T.style.left="5px",T.style.padding=".5em",T.style.borderRadius="5px",T.style.alignItems="center"}function f(T,P){T.setAttribute("width","24"),T.setAttribute("id",P),T.setAttribute("height","24"),T.setAttribute("viewBox","0 0 24 24"),T.setAttribute("fill","none"),T.style.marginLeft="-6px"}function E(){const T=document.createElement("span");return T.style.cursor="pointer",T.style.marginLeft="16px",T.style.fontSize="24px",T.innerHTML=" &times;",T.onclick=()=>{vs=!0,l()},T}function S(T,P){T.setAttribute("id",P),T.innerText="Learn more",T.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",T.setAttribute("target","__blank"),T.style.paddingLeft="5px",T.style.textDecoration="underline"}function b(){const T=jc(r),P=n("text"),R=document.getElementById(P)||document.createElement("span"),U=n("learnmore"),C=document.getElementById(U)||document.createElement("a"),q=n("preprendIcon"),V=document.getElementById(q)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(T.created){const M=T.element;u(M),S(C,U);const F=E();f(V,q),M.append(V,R,C,F),document.body.appendChild(M)}a?(R.innerText="Preview backend disconnected.",V.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(V.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,R.innerText="Preview backend running in this workspace."),R.setAttribute("id",P)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",b):b()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Vc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(se())}function Bc(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Hc(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function $c(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Wc(){const t=se();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function zc(){try{return typeof indexedDB=="object"}catch{return!1}}function qc(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var a;e(((a=s.error)===null||a===void 0?void 0:a.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gc="FirebaseError";class Ee extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=Gc,Object.setPrototypeOf(this,Ee.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,en.prototype.create)}}class en{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,a=this.errors[e],l=a?Kc(a,r):"Error",u=`${this.serviceName}: ${l} (${s}).`;return new Ee(s,u,r)}}function Kc(t,e){return t.replace(Jc,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Jc=/\{\$([^}]+)}/g;function Xc(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function it(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const a=t[s],l=e[s];if(ws(a)&&ws(l)){if(!it(a,l))return!1}else if(a!==l)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function ws(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tn(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Ht(t){const e={};return t.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,a]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(a)}}),e}function $t(t){const e=t.indexOf("?");if(!e)return"";const n=t.indexOf("#",e);return t.substring(e,n>0?n:void 0)}function Yc(t,e){const n=new Zc(t,e);return n.subscribe.bind(n)}class Zc{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");Qc(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=Ai),s.error===void 0&&(s.error=Ai),s.complete===void 0&&(s.complete=Ai);const a=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),a}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Qc(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function Ai(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(t){return t&&t._delegate?t._delegate:t}class qe{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ye="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class el{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new xc;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e?.identifier),s=(n=e?.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(a){if(s)return null;throw a}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(nl(e))try{this.getOrInitializeService({instanceIdentifier:Ye})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const a=this.getOrInitializeService({instanceIdentifier:s});r.resolve(a)}catch{}}}}clearInstance(e=Ye){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Ye){return this.instances.has(e)}getOptions(e=Ye){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[a,l]of this.instancesDeferred.entries()){const u=this.normalizeInstanceIdentifier(a);r===u&&l.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),a=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;a.add(e),this.onInitCallbacks.set(s,a);const l=this.instances.get(s);return l&&e(l,s),()=>{a.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:tl(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Ye){return this.component?this.component.multipleInstances?e:Ye:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function tl(t){return t===Ye?void 0:t}function nl(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class il{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new el(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var x;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(x||(x={}));const rl={debug:x.DEBUG,verbose:x.VERBOSE,info:x.INFO,warn:x.WARN,error:x.ERROR,silent:x.SILENT},sl=x.INFO,ol={[x.DEBUG]:"log",[x.VERBOSE]:"log",[x.INFO]:"info",[x.WARN]:"warn",[x.ERROR]:"error"},al=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=ol[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ki{constructor(e){this.name=e,this._logLevel=sl,this._logHandler=al,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in x))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?rl[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,x.DEBUG,...e),this._logHandler(this,x.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,x.VERBOSE,...e),this._logHandler(this,x.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,x.INFO,...e),this._logHandler(this,x.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,x.WARN,...e),this._logHandler(this,x.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,x.ERROR,...e),this._logHandler(this,x.ERROR,...e)}}const cl=(t,e)=>e.some(n=>t instanceof n);let Is,Es;function ll(){return Is||(Is=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function hl(){return Es||(Es=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ko=new WeakMap,Li=new WeakMap,Co=new WeakMap,Si=new WeakMap,Ji=new WeakMap;function ul(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",a),t.removeEventListener("error",l)},a=()=>{n(We(t.result)),s()},l=()=>{r(t.error),s()};t.addEventListener("success",a),t.addEventListener("error",l)});return e.then(n=>{n instanceof IDBCursor&&ko.set(n,t)}).catch(()=>{}),Ji.set(e,t),e}function dl(t){if(Li.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",a),t.removeEventListener("error",l),t.removeEventListener("abort",l)},a=()=>{n(),s()},l=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",a),t.addEventListener("error",l),t.addEventListener("abort",l)});Li.set(t,e)}let Ui={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return Li.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Co.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return We(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function fl(t){Ui=t(Ui)}function pl(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(bi(this),e,...n);return Co.set(r,e.sort?e.sort():[e]),We(r)}:hl().includes(t)?function(...e){return t.apply(bi(this),e),We(ko.get(this))}:function(...e){return We(t.apply(bi(this),e))}}function gl(t){return typeof t=="function"?pl(t):(t instanceof IDBTransaction&&dl(t),cl(t,ll())?new Proxy(t,Ui):t)}function We(t){if(t instanceof IDBRequest)return ul(t);if(Si.has(t))return Si.get(t);const e=gl(t);return e!==t&&(Si.set(t,e),Ji.set(e,t)),e}const bi=t=>Ji.get(t);function ml(t,e,{blocked:n,upgrade:r,blocking:s,terminated:a}={}){const l=indexedDB.open(t,e),u=We(l);return r&&l.addEventListener("upgradeneeded",f=>{r(We(l.result),f.oldVersion,f.newVersion,We(l.transaction),f)}),n&&l.addEventListener("blocked",f=>n(f.oldVersion,f.newVersion,f)),u.then(f=>{a&&f.addEventListener("close",()=>a()),s&&f.addEventListener("versionchange",E=>s(E.oldVersion,E.newVersion,E))}).catch(()=>{}),u}const _l=["get","getKey","getAll","getAllKeys","count"],yl=["put","add","delete","clear"],Ri=new Map;function Ts(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Ri.get(e))return Ri.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=yl.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||_l.includes(n)))return;const a=async function(l,...u){const f=this.transaction(l,s?"readwrite":"readonly");let E=f.store;return r&&(E=E.index(u.shift())),(await Promise.all([E[n](...u),s&&f.done]))[0]};return Ri.set(e,a),a}fl(t=>({...t,get:(e,n,r)=>Ts(e,n)||t.get(e,n,r),has:(e,n)=>!!Ts(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vl{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(wl(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function wl(t){const e=t.getComponent();return e?.type==="VERSION"}const Mi="@firebase/app",As="0.13.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oe=new Ki("@firebase/app"),Il="@firebase/app-compat",El="@firebase/analytics-compat",Tl="@firebase/analytics",Al="@firebase/app-check-compat",Sl="@firebase/app-check",bl="@firebase/auth",Rl="@firebase/auth-compat",kl="@firebase/database",Cl="@firebase/data-connect",Pl="@firebase/database-compat",Ol="@firebase/functions",Nl="@firebase/functions-compat",Dl="@firebase/installations",Ll="@firebase/installations-compat",Ul="@firebase/messaging",Ml="@firebase/messaging-compat",xl="@firebase/performance",Fl="@firebase/performance-compat",jl="@firebase/remote-config",Vl="@firebase/remote-config-compat",Bl="@firebase/storage",Hl="@firebase/storage-compat",$l="@firebase/firestore",Wl="@firebase/ai",zl="@firebase/firestore-compat",ql="firebase",Gl="11.10.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xi="[DEFAULT]",Kl={[Mi]:"fire-core",[Il]:"fire-core-compat",[Tl]:"fire-analytics",[El]:"fire-analytics-compat",[Sl]:"fire-app-check",[Al]:"fire-app-check-compat",[bl]:"fire-auth",[Rl]:"fire-auth-compat",[kl]:"fire-rtdb",[Cl]:"fire-data-connect",[Pl]:"fire-rtdb-compat",[Ol]:"fire-fn",[Nl]:"fire-fn-compat",[Dl]:"fire-iid",[Ll]:"fire-iid-compat",[Ul]:"fire-fcm",[Ml]:"fire-fcm-compat",[xl]:"fire-perf",[Fl]:"fire-perf-compat",[jl]:"fire-rc",[Vl]:"fire-rc-compat",[Bl]:"fire-gcs",[Hl]:"fire-gcs-compat",[$l]:"fire-fst",[zl]:"fire-fst-compat",[Wl]:"fire-vertex","fire-js":"fire-js",[ql]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xt=new Map,Jl=new Map,Fi=new Map;function Ss(t,e){try{t.container.addComponent(e)}catch(n){Oe.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function rt(t){const e=t.name;if(Fi.has(e))return Oe.debug(`There were multiple attempts to register component ${e}.`),!1;Fi.set(e,t);for(const n of Xt.values())Ss(n,t);for(const n of Jl.values())Ss(n,t);return!0}function zn(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function oe(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xl={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ze=new en("app","Firebase",Xl);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yl{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new qe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ze.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ht=Gl;function Po(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:xi,automaticDataCollectionEnabled:!0},e),s=r.name;if(typeof s!="string"||!s)throw ze.create("bad-app-name",{appName:String(s)});if(n||(n=So()),!n)throw ze.create("no-options");const a=Xt.get(s);if(a){if(it(n,a.options)&&it(r,a.config))return a;throw ze.create("duplicate-app",{appName:s})}const l=new il(s);for(const f of Fi.values())l.addComponent(f);const u=new Yl(n,r,l);return Xt.set(s,u),u}function qn(t=xi){const e=Xt.get(t);if(!e&&t===xi&&So())return Po();if(!e)throw ze.create("no-app",{appName:t});return e}function Zl(){return Array.from(Xt.values())}function ve(t,e,n){var r;let s=(r=Kl[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const a=s.match(/\s|\//),l=e.match(/\s|\//);if(a||l){const u=[`Unable to register library "${s}" with version "${e}":`];a&&u.push(`library name "${s}" contains illegal characters (whitespace or "/")`),a&&l&&u.push("and"),l&&u.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Oe.warn(u.join(" "));return}rt(new qe(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ql="firebase-heartbeat-database",eh=1,Yt="firebase-heartbeat-store";let ki=null;function Oo(){return ki||(ki=ml(Ql,eh,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Yt)}catch(n){console.warn(n)}}}}).catch(t=>{throw ze.create("idb-open",{originalErrorMessage:t.message})})),ki}async function th(t){try{const n=(await Oo()).transaction(Yt),r=await n.objectStore(Yt).get(No(t));return await n.done,r}catch(e){if(e instanceof Ee)Oe.warn(e.message);else{const n=ze.create("idb-get",{originalErrorMessage:e?.message});Oe.warn(n.message)}}}async function bs(t,e){try{const r=(await Oo()).transaction(Yt,"readwrite");await r.objectStore(Yt).put(e,No(t)),await r.done}catch(n){if(n instanceof Ee)Oe.warn(n.message);else{const r=ze.create("idb-set",{originalErrorMessage:n?.message});Oe.warn(r.message)}}}function No(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nh=1024,ih=30;class rh{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new oh(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=Rs();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(l=>l.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:s}),this._heartbeatsCache.heartbeats.length>ih){const l=ah(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(l,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(r){Oe.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Rs(),{heartbeatsToSend:r,unsentEntries:s}=sh(this._heartbeatsCache.heartbeats),a=Mn(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(n){return Oe.warn(n),""}}}function Rs(){return new Date().toISOString().substring(0,10)}function sh(t,e=nh){const n=[];let r=t.slice();for(const s of t){const a=n.find(l=>l.agent===s.agent);if(a){if(a.dates.push(s.date),ks(n)>e){a.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),ks(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class oh{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return zc()?qc().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await th(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return bs(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return bs(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function ks(t){return Mn(JSON.stringify({version:2,heartbeats:t})).length}function ah(t){if(t.length===0)return-1;let e=0,n=t[0].date;for(let r=1;r<t.length;r++)t[r].date<n&&(n=t[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ch(t){rt(new qe("platform-logger",e=>new vl(e),"PRIVATE")),rt(new qe("heartbeat",e=>new rh(e),"PRIVATE")),ve(Mi,As,t),ve(Mi,As,"esm2017"),ve("fire-js","")}ch("");var lh="firebase",hh="11.10.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ve(lh,hh,"app");function Xi(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function Do(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const uh=Do,Lo=new en("auth","Firebase",Do());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xn=new Ki("@firebase/auth");function dh(t,...e){xn.logLevel<=x.WARN&&xn.warn(`Auth (${ht}): ${t}`,...e)}function On(t,...e){xn.logLevel<=x.ERROR&&xn.error(`Auth (${ht}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pe(t,...e){throw Yi(t,...e)}function we(t,...e){return Yi(t,...e)}function Uo(t,e,n){const r=Object.assign(Object.assign({},uh()),{[e]:n});return new en("auth","Firebase",r).create(e,{appName:t.name})}function Pe(t){return Uo(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Yi(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Lo.create(t,...e)}function k(t,e,...n){if(!t)throw Yi(e,...n)}function ke(t){const e="INTERNAL ASSERTION FAILED: "+t;throw On(e),new Error(e)}function Ne(t,e){t||ke(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ji(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function fh(){return Cs()==="http:"||Cs()==="https:"}function Cs(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ph(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(fh()||Hc()||"connection"in navigator)?navigator.onLine:!0}function gh(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(e,n){this.shortDelay=e,this.longDelay=n,Ne(n>e,"Short delay should be less than long delay!"),this.isMobile=Vc()||$c()}get(){return ph()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zi(t,e){Ne(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mo{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;ke("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;ke("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;ke("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mh={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _h=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],yh=new nn(3e4,6e4);function De(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Te(t,e,n,r,s={}){return xo(t,s,async()=>{let a={},l={};r&&(e==="GET"?l=r:a={body:JSON.stringify(r)});const u=tn(Object.assign({key:t.config.apiKey},l)).slice(1),f=await t._getAdditionalHeaders();f["Content-Type"]="application/json",t.languageCode&&(f["X-Firebase-Locale"]=t.languageCode);const E=Object.assign({method:e,headers:f},a);return Bc()||(E.referrerPolicy="no-referrer"),t.emulatorConfig&&lt(t.emulatorConfig.host)&&(E.credentials="include"),Mo.fetch()(await Fo(t,t.config.apiHost,n,u),E)})}async function xo(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},mh),e);try{const s=new wh(t),a=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const l=await a.json();if("needConfirmation"in l)throw bn(t,"account-exists-with-different-credential",l);if(a.ok&&!("errorMessage"in l))return l;{const u=a.ok?l.errorMessage:l.error.message,[f,E]=u.split(" : ");if(f==="FEDERATED_USER_ID_ALREADY_LINKED")throw bn(t,"credential-already-in-use",l);if(f==="EMAIL_EXISTS")throw bn(t,"email-already-in-use",l);if(f==="USER_DISABLED")throw bn(t,"user-disabled",l);const S=r[f]||f.toLowerCase().replace(/[_\s]+/g,"-");if(E)throw Uo(t,S,E);pe(t,S)}}catch(s){if(s instanceof Ee)throw s;pe(t,"network-request-failed",{message:String(s)})}}async function rn(t,e,n,r,s={}){const a=await Te(t,e,n,r,s);return"mfaPendingCredential"in a&&pe(t,"multi-factor-auth-required",{_serverResponse:a}),a}async function Fo(t,e,n,r){const s=`${e}${n}?${r}`,a=t,l=a.config.emulator?Zi(t.config,s):`${t.config.apiScheme}://${s}`;return _h.includes(n)&&(await a._persistenceManagerAvailable,a._getPersistenceType()==="COOKIE")?a._getPersistence()._getFinalTarget(l).toString():l}function vh(t){switch(t){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class wh{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(we(this.auth,"network-request-failed")),yh.get())})}}function bn(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=we(t,e,r);return s.customData._tokenResponse=n,s}function Ps(t){return t!==void 0&&t.enterprise!==void 0}class Ih{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const n of this.recaptchaEnforcementState)if(n.provider&&n.provider===e)return vh(n.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Eh(t,e){return Te(t,"GET","/v2/recaptchaConfig",De(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Th(t,e){return Te(t,"POST","/v1/accounts:delete",e)}async function Fn(t,e){return Te(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zt(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Ah(t,e=!1){const n=J(t),r=await n.getIdToken(e),s=Qi(r);k(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const a=typeof s.firebase=="object"?s.firebase:void 0,l=a?.sign_in_provider;return{claims:s,token:r,authTime:zt(Ci(s.auth_time)),issuedAtTime:zt(Ci(s.iat)),expirationTime:zt(Ci(s.exp)),signInProvider:l||null,signInSecondFactor:a?.sign_in_second_factor||null}}function Ci(t){return Number(t)*1e3}function Qi(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return On("JWT malformed, contained fewer than 3 sections"),null;try{const s=Eo(n);return s?JSON.parse(s):(On("Failed to decode base64 JWT payload"),null)}catch(s){return On("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Os(t){const e=Qi(t);return k(e,"internal-error"),k(typeof e.exp<"u","internal-error"),k(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function It(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof Ee&&Sh(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function Sh({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bh{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vi{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=zt(this.lastLoginAt),this.creationTime=zt(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jn(t){var e;const n=t.auth,r=await t.getIdToken(),s=await It(t,Fn(n,{idToken:r}));k(s?.users.length,n,"internal-error");const a=s.users[0];t._notifyReloadListener(a);const l=!((e=a.providerUserInfo)===null||e===void 0)&&e.length?jo(a.providerUserInfo):[],u=kh(t.providerData,l),f=t.isAnonymous,E=!(t.email&&a.passwordHash)&&!u?.length,S=f?E:!1,b={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:u,metadata:new Vi(a.createdAt,a.lastLoginAt),isAnonymous:S};Object.assign(t,b)}async function Rh(t){const e=J(t);await jn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function kh(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function jo(t){return t.map(e=>{var{providerId:n}=e,r=Xi(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ch(t,e){const n=await xo(t,{},async()=>{const r=tn({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:a}=t.config,l=await Fo(t,s,"/v1/token",`key=${a}`),u=await t._getAdditionalHeaders();u["Content-Type"]="application/x-www-form-urlencoded";const f={method:"POST",headers:u,body:r};return t.emulatorConfig&&lt(t.emulatorConfig.host)&&(f.credentials="include"),Mo.fetch()(l,f)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function Ph(t,e){return Te(t,"POST","/v2/accounts:revokeToken",De(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){k(e.idToken,"internal-error"),k(typeof e.idToken<"u","internal-error"),k(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Os(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){k(e.length!==0,"internal-error");const n=Os(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(k(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:a}=await Ch(e,n);this.updateTokensAndExpiration(r,s,Number(a))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:a}=n,l=new _t;return r&&(k(typeof r=="string","internal-error",{appName:e}),l.refreshToken=r),s&&(k(typeof s=="string","internal-error",{appName:e}),l.accessToken=s),a&&(k(typeof a=="number","internal-error",{appName:e}),l.expirationTime=a),l}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new _t,this.toJSON())}_performRefresh(){return ke("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fe(t,e){k(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class ue{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,a=Xi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new bh(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=a.displayName||null,this.email=a.email||null,this.emailVerified=a.emailVerified||!1,this.phoneNumber=a.phoneNumber||null,this.photoURL=a.photoURL||null,this.isAnonymous=a.isAnonymous||!1,this.tenantId=a.tenantId||null,this.providerData=a.providerData?[...a.providerData]:[],this.metadata=new Vi(a.createdAt||void 0,a.lastLoginAt||void 0)}async getIdToken(e){const n=await It(this,this.stsTokenManager.getToken(this.auth,e));return k(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Ah(this,e)}reload(){return Rh(this)}_assign(e){this!==e&&(k(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new ue(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){k(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await jn(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(oe(this.auth.app))return Promise.reject(Pe(this.auth));const e=await this.getIdToken();return await It(this,Th(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,a,l,u,f,E,S;const b=(r=n.displayName)!==null&&r!==void 0?r:void 0,T=(s=n.email)!==null&&s!==void 0?s:void 0,P=(a=n.phoneNumber)!==null&&a!==void 0?a:void 0,R=(l=n.photoURL)!==null&&l!==void 0?l:void 0,U=(u=n.tenantId)!==null&&u!==void 0?u:void 0,C=(f=n._redirectEventId)!==null&&f!==void 0?f:void 0,q=(E=n.createdAt)!==null&&E!==void 0?E:void 0,V=(S=n.lastLoginAt)!==null&&S!==void 0?S:void 0,{uid:M,emailVerified:F,isAnonymous:ae,providerData:G,stsTokenManager:y}=n;k(M&&y,e,"internal-error");const d=_t.fromJSON(this.name,y);k(typeof M=="string",e,"internal-error"),Fe(b,e.name),Fe(T,e.name),k(typeof F=="boolean",e,"internal-error"),k(typeof ae=="boolean",e,"internal-error"),Fe(P,e.name),Fe(R,e.name),Fe(U,e.name),Fe(C,e.name),Fe(q,e.name),Fe(V,e.name);const g=new ue({uid:M,auth:e,email:T,emailVerified:F,displayName:b,isAnonymous:ae,photoURL:R,phoneNumber:P,tenantId:U,stsTokenManager:d,createdAt:q,lastLoginAt:V});return G&&Array.isArray(G)&&(g.providerData=G.map(m=>Object.assign({},m))),C&&(g._redirectEventId=C),g}static async _fromIdTokenResponse(e,n,r=!1){const s=new _t;s.updateFromServerResponse(n);const a=new ue({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await jn(a),a}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];k(s.localId!==void 0,"internal-error");const a=s.providerUserInfo!==void 0?jo(s.providerUserInfo):[],l=!(s.email&&s.passwordHash)&&!a?.length,u=new _t;u.updateFromIdToken(r);const f=new ue({uid:s.localId,auth:e,stsTokenManager:u,isAnonymous:l}),E={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new Vi(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!a?.length};return Object.assign(f,E),f}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ns=new Map;function Ce(t){Ne(t instanceof Function,"Expected a class definition");let e=Ns.get(t);return e?(Ne(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Ns.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Vo.type="NONE";const Ds=Vo;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nn(t,e,n){return`firebase:${t}:${e}:${n}`}class yt{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:a}=this.auth;this.fullUserKey=Nn(this.userKey,s.apiKey,a),this.fullPersistenceKey=Nn("persistence",s.apiKey,a),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const n=await Fn(this.auth,{idToken:e}).catch(()=>{});return n?ue._fromGetAccountInfoResponse(this.auth,n,e):null}return ue._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new yt(Ce(Ds),e,r);const s=(await Promise.all(n.map(async E=>{if(await E._isAvailable())return E}))).filter(E=>E);let a=s[0]||Ce(Ds);const l=Nn(r,e.config.apiKey,e.name);let u=null;for(const E of n)try{const S=await E._get(l);if(S){let b;if(typeof S=="string"){const T=await Fn(e,{idToken:S}).catch(()=>{});if(!T)break;b=await ue._fromGetAccountInfoResponse(e,T,S)}else b=ue._fromJSON(e,S);E!==a&&(u=b),a=E;break}}catch{}const f=s.filter(E=>E._shouldAllowMigration);return!a._shouldAllowMigration||!f.length?new yt(a,e,r):(a=f[0],u&&await a._set(l,u.toJSON()),await Promise.all(n.map(async E=>{if(E!==a)try{await E._remove(l)}catch{}})),new yt(a,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ls(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Wo(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Bo(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(qo(e))return"Blackberry";if(Go(e))return"Webos";if(Ho(e))return"Safari";if((e.includes("chrome/")||$o(e))&&!e.includes("edge/"))return"Chrome";if(zo(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if(r?.length===2)return r[1]}return"Other"}function Bo(t=se()){return/firefox\//i.test(t)}function Ho(t=se()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function $o(t=se()){return/crios\//i.test(t)}function Wo(t=se()){return/iemobile/i.test(t)}function zo(t=se()){return/android/i.test(t)}function qo(t=se()){return/blackberry/i.test(t)}function Go(t=se()){return/webos/i.test(t)}function er(t=se()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function Oh(t=se()){var e;return er(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Nh(){return Wc()&&document.documentMode===10}function Ko(t=se()){return er(t)||zo(t)||Go(t)||qo(t)||/windows phone/i.test(t)||Wo(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jo(t,e=[]){let n;switch(t){case"Browser":n=Ls(se());break;case"Worker":n=`${Ls(se())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${ht}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dh{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=a=>new Promise((l,u)=>{try{const f=e(a);l(f)}catch(f){u(f)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Lh(t,e={}){return Te(t,"GET","/v2/passwordPolicy",De(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uh=6;class Mh{constructor(e){var n,r,s,a;const l=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=l.minPasswordLength)!==null&&n!==void 0?n:Uh,l.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=l.maxPasswordLength),l.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=l.containsLowercaseCharacter),l.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=l.containsUppercaseCharacter),l.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=l.containsNumericCharacter),l.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=l.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(a=e.forceUpgradeOnSignin)!==null&&a!==void 0?a:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,a,l,u;const f={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,f),this.validatePasswordCharacterOptions(e,f),f.isValid&&(f.isValid=(n=f.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),f.isValid&&(f.isValid=(r=f.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),f.isValid&&(f.isValid=(s=f.containsLowercaseLetter)!==null&&s!==void 0?s:!0),f.isValid&&(f.isValid=(a=f.containsUppercaseLetter)!==null&&a!==void 0?a:!0),f.isValid&&(f.isValid=(l=f.containsNumericCharacter)!==null&&l!==void 0?l:!0),f.isValid&&(f.isValid=(u=f.containsNonAlphanumericCharacter)!==null&&u!==void 0?u:!0),f}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,a){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=a))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xh{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Us(this),this.idTokenSubscription=new Us(this),this.beforeStateQueue=new Dh(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Lo,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(a=>this._resolvePersistenceManagerAvailable=a)}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=Ce(n)),this._initializationPromise=this.queue(async()=>{var r,s,a;if(!this._deleted&&(this.persistenceManager=await yt.create(this,e),(r=this._resolvePersistenceManagerAvailable)===null||r===void 0||r.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((a=this.currentUser)===null||a===void 0?void 0:a.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Fn(this,{idToken:e}),r=await ue._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(oe(this.app)){const l=this.app.settings.authIdToken;return l?new Promise(u=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(l).then(u,u))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,a=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const l=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,u=s?._redirectEventId,f=await this.tryRedirectSignIn(e);(!l||l===u)&&f?.user&&(s=f.user,a=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(a)try{await this.beforeStateQueue.runMiddleware(s)}catch(l){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(l))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return k(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await jn(e)}catch(n){if(n?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=gh()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(oe(this.app))return Promise.reject(Pe(this));const n=e?J(e):null;return n&&k(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&k(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return oe(this.app)?Promise.reject(Pe(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return oe(this.app)?Promise.reject(Pe(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ce(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Lh(this),n=new Mh(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new en("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await Ph(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&Ce(e)||this._popupRedirectResolver;k(n,this,"argument-error"),this.redirectPersistenceManager=await yt.create(this,[Ce(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const a=typeof n=="function"?n:n.next.bind(n);let l=!1;const u=this._isInitialized?Promise.resolve():this._initializationPromise;if(k(u,this,"internal-error"),u.then(()=>{l||a(this.currentUser)}),typeof n=="function"){const f=e.addObserver(n,r,s);return()=>{l=!0,f()}}else{const f=e.addObserver(n);return()=>{l=!0,f()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return k(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Jo(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;if(oe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n?.error&&dh(`Error while retrieving App Check token: ${n.error}`),n?.token}}function Ge(t){return J(t)}class Us{constructor(e){this.auth=e,this.observer=null,this.addObserver=Yc(n=>this.observer=n)}get next(){return k(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Gn={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Fh(t){Gn=t}function Xo(t){return Gn.loadJS(t)}function jh(){return Gn.recaptchaEnterpriseScript}function Vh(){return Gn.gapiScript}function Bh(t){return`__${t}${Math.floor(Math.random()*1e6)}`}class Hh{constructor(){this.enterprise=new $h}ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}class $h{ready(e){e()}execute(e,n){return Promise.resolve("token")}render(e,n){return""}}const Wh="recaptcha-enterprise",Yo="NO_RECAPTCHA";class zh{constructor(e){this.type=Wh,this.auth=Ge(e)}async verify(e="verify",n=!1){async function r(a){if(!n){if(a.tenantId==null&&a._agentRecaptchaConfig!=null)return a._agentRecaptchaConfig.siteKey;if(a.tenantId!=null&&a._tenantRecaptchaConfigs[a.tenantId]!==void 0)return a._tenantRecaptchaConfigs[a.tenantId].siteKey}return new Promise(async(l,u)=>{Eh(a,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(f=>{if(f.recaptchaKey===void 0)u(new Error("recaptcha Enterprise site key undefined"));else{const E=new Ih(f);return a.tenantId==null?a._agentRecaptchaConfig=E:a._tenantRecaptchaConfigs[a.tenantId]=E,l(E.siteKey)}}).catch(f=>{u(f)})})}function s(a,l,u){const f=window.grecaptcha;Ps(f)?f.enterprise.ready(()=>{f.enterprise.execute(a,{action:e}).then(E=>{l(E)}).catch(()=>{l(Yo)})}):u(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new Hh().execute("siteKey",{action:"verify"}):new Promise((a,l)=>{r(this.auth).then(u=>{if(!n&&Ps(window.grecaptcha))s(u,a,l);else{if(typeof window>"u"){l(new Error("RecaptchaVerifier is only supported in browser"));return}let f=jh();f.length!==0&&(f+=u),Xo(f).then(()=>{s(u,a,l)}).catch(E=>{l(E)})}}).catch(u=>{l(u)})})}}async function Ms(t,e,n,r=!1,s=!1){const a=new zh(t);let l;if(s)l=Yo;else try{l=await a.verify(n)}catch{l=await a.verify(n,!0)}const u=Object.assign({},e);if(n==="mfaSmsEnrollment"||n==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in u){const f=u.phoneEnrollmentInfo.phoneNumber,E=u.phoneEnrollmentInfo.recaptchaToken;Object.assign(u,{phoneEnrollmentInfo:{phoneNumber:f,recaptchaToken:E,captchaResponse:l,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in u){const f=u.phoneSignInInfo.recaptchaToken;Object.assign(u,{phoneSignInInfo:{recaptchaToken:f,captchaResponse:l,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return u}return r?Object.assign(u,{captchaResp:l}):Object.assign(u,{captchaResponse:l}),Object.assign(u,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(u,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),u}async function Vn(t,e,n,r,s){var a;if(!((a=t._getRecaptchaConfig())===null||a===void 0)&&a.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const l=await Ms(t,e,n,n==="getOobCode");return r(t,l)}else return r(t,e).catch(async l=>{if(l.code==="auth/missing-recaptcha-token"){console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const u=await Ms(t,e,n,n==="getOobCode");return r(t,u)}else return Promise.reject(l)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qh(t,e){const n=zn(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),a=n.getOptions();if(it(a,e??{}))return s;pe(s,"already-initialized")}return n.initialize({options:e})}function Gh(t,e){const n=e?.persistence||[],r=(Array.isArray(n)?n:[n]).map(Ce);e?.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e?.popupRedirectResolver)}function Kh(t,e,n){const r=Ge(t);k(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,a=Zo(e),{host:l,port:u}=Jh(e),f=u===null?"":`:${u}`,E={url:`${a}//${l}${f}/`},S=Object.freeze({host:l,port:u,protocol:a.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){k(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),k(it(E,r.config.emulator)&&it(S,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=E,r.emulatorConfig=S,r.settings.appVerificationDisabledForTesting=!0,lt(l)?(qi(`${a}//${l}${f}`),Gi("Auth",!0)):Xh()}function Zo(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function Jh(t){const e=Zo(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const a=s[1];return{host:a,port:xs(r.substr(a.length+1))}}else{const[a,l]=r.split(":");return{host:a,port:xs(l)}}}function xs(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function Xh(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tr{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return ke("not implemented")}_getIdTokenResponse(e){return ke("not implemented")}_linkToIdToken(e,n){return ke("not implemented")}_getReauthenticationResolver(e){return ke("not implemented")}}async function Yh(t,e){return Te(t,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zh(t,e){return rn(t,"POST","/v1/accounts:signInWithPassword",De(t,e))}async function Qh(t,e){return Te(t,"POST","/v1/accounts:sendOobCode",De(t,e))}async function eu(t,e){return Qh(t,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function tu(t,e){return rn(t,"POST","/v1/accounts:signInWithEmailLink",De(t,e))}async function nu(t,e){return rn(t,"POST","/v1/accounts:signInWithEmailLink",De(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zt extends tr{constructor(e,n,r,s=null){super("password",r),this._email=e,this._password=n,this._tenantId=s}static _fromEmailAndPassword(e,n){return new Zt(e,n,"password")}static _fromEmailAndCode(e,n,r=null){return new Zt(e,n,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e;if(n?.email&&n?.password){if(n.signInMethod==="password")return this._fromEmailAndPassword(n.email,n.password);if(n.signInMethod==="emailLink")return this._fromEmailAndCode(n.email,n.password,n.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const n={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Vn(e,n,"signInWithPassword",Zh);case"emailLink":return tu(e,{email:this._email,oobCode:this._password});default:pe(e,"internal-error")}}async _linkToIdToken(e,n){switch(this.signInMethod){case"password":const r={idToken:n,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Vn(e,r,"signUpPassword",Yh);case"emailLink":return nu(e,{idToken:n,email:this._email,oobCode:this._password});default:pe(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vt(t,e){return rn(t,"POST","/v1/accounts:signInWithIdp",De(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iu="http://localhost";class st extends tr{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new st(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):pe("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,a=Xi(n,["providerId","signInMethod"]);if(!r||!s)return null;const l=new st(r,s);return l.idToken=a.idToken||void 0,l.accessToken=a.accessToken||void 0,l.secret=a.secret,l.nonce=a.nonce,l.pendingToken=a.pendingToken||null,l}_getIdTokenResponse(e){const n=this.buildRequest();return vt(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,vt(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,vt(e,n)}buildRequest(){const e={requestUri:iu,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=tn(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ru(t){switch(t){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function su(t){const e=Ht($t(t)).link,n=e?Ht($t(e)).deep_link_id:null,r=Ht($t(t)).deep_link_id;return(r?Ht($t(r)).link:null)||r||n||e||t}class nr{constructor(e){var n,r,s,a,l,u;const f=Ht($t(e)),E=(n=f.apiKey)!==null&&n!==void 0?n:null,S=(r=f.oobCode)!==null&&r!==void 0?r:null,b=ru((s=f.mode)!==null&&s!==void 0?s:null);k(E&&S&&b,"argument-error"),this.apiKey=E,this.operation=b,this.code=S,this.continueUrl=(a=f.continueUrl)!==null&&a!==void 0?a:null,this.languageCode=(l=f.lang)!==null&&l!==void 0?l:null,this.tenantId=(u=f.tenantId)!==null&&u!==void 0?u:null}static parseLink(e){const n=su(e);try{return new nr(n)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(){this.providerId=Tt.PROVIDER_ID}static credential(e,n){return Zt._fromEmailAndPassword(e,n)}static credentialWithLink(e,n){const r=nr.parseLink(n);return k(r,"argument-error"),Zt._fromEmailAndCode(e,r.code,r.tenantId)}}Tt.PROVIDER_ID="password";Tt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Tt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sn extends Qo{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class je extends sn{constructor(){super("facebook.com")}static credential(e){return st._fromParams({providerId:je.PROVIDER_ID,signInMethod:je.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return je.credentialFromTaggedObject(e)}static credentialFromError(e){return je.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return je.credential(e.oauthAccessToken)}catch{return null}}}je.FACEBOOK_SIGN_IN_METHOD="facebook.com";je.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ve extends sn{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return st._fromParams({providerId:Ve.PROVIDER_ID,signInMethod:Ve.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Ve.credentialFromTaggedObject(e)}static credentialFromError(e){return Ve.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Ve.credential(n,r)}catch{return null}}}Ve.GOOGLE_SIGN_IN_METHOD="google.com";Ve.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Be extends sn{constructor(){super("github.com")}static credential(e){return st._fromParams({providerId:Be.PROVIDER_ID,signInMethod:Be.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Be.credentialFromTaggedObject(e)}static credentialFromError(e){return Be.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Be.credential(e.oauthAccessToken)}catch{return null}}}Be.GITHUB_SIGN_IN_METHOD="github.com";Be.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He extends sn{constructor(){super("twitter.com")}static credential(e,n){return st._fromParams({providerId:He.PROVIDER_ID,signInMethod:He.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return He.credentialFromTaggedObject(e)}static credentialFromError(e){return He.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return He.credential(n,r)}catch{return null}}}He.TWITTER_SIGN_IN_METHOD="twitter.com";He.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ou(t,e){return rn(t,"POST","/v1/accounts:signUp",De(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const a=await ue._fromIdTokenResponse(e,r,s),l=Fs(r);return new ot({user:a,providerId:l,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Fs(r);return new ot({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Fs(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bn extends Ee{constructor(e,n,r,s){var a;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Bn.prototype),this.customData={appName:e.name,tenantId:(a=e.tenantId)!==null&&a!==void 0?a:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Bn(e,n,r,s)}}function ea(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(a=>{throw a.code==="auth/multi-factor-auth-required"?Bn._fromErrorAndOperation(t,a,e,r):a})}async function au(t,e,n=!1){const r=await It(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return ot._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cu(t,e,n=!1){const{auth:r}=t;if(oe(r.app))return Promise.reject(Pe(r));const s="reauthenticate";try{const a=await It(t,ea(r,s,e,t),n);k(a.idToken,r,"internal-error");const l=Qi(a.idToken);k(l,r,"internal-error");const{sub:u}=l;return k(t.uid===u,r,"user-mismatch"),ot._forOperation(t,s,a)}catch(a){throw a?.code==="auth/user-not-found"&&pe(r,"user-mismatch"),a}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ta(t,e,n=!1){if(oe(t.app))return Promise.reject(Pe(t));const r="signIn",s=await ea(t,r,e),a=await ot._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(a.user),a}async function lu(t,e){return ta(Ge(t),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function na(t){const e=Ge(t);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function bp(t,e,n){const r=Ge(t);await Vn(r,{requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"},"getOobCode",eu)}async function Rp(t,e,n){if(oe(t.app))return Promise.reject(Pe(t));const r=Ge(t),l=await Vn(r,{returnSecureToken:!0,email:e,password:n,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",ou).catch(f=>{throw f.code==="auth/password-does-not-meet-requirements"&&na(t),f}),u=await ot._fromIdTokenResponse(r,"signIn",l);return await r._updateCurrentUser(u.user),u}function kp(t,e,n){return oe(t.app)?Promise.reject(Pe(t)):lu(J(t),Tt.credential(e,n)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&na(t),r})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hu(t,e){return Te(t,"POST","/v1/accounts:update",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cp(t,{displayName:e,photoURL:n}){if(e===void 0&&n===void 0)return;const r=J(t),a={idToken:await r.getIdToken(),displayName:e,photoUrl:n,returnSecureToken:!0},l=await It(r,hu(r.auth,a));r.displayName=l.displayName||null,r.photoURL=l.photoUrl||null;const u=r.providerData.find(({providerId:f})=>f==="password");u&&(u.displayName=r.displayName,u.photoURL=r.photoURL),await r._updateTokensIfNecessary(l)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uu(t,e){return J(t).setPersistence(e)}function du(t,e,n,r){return J(t).onIdTokenChanged(e,n,r)}function fu(t,e,n){return J(t).beforeAuthStateChanged(e,n)}function Pp(t,e,n,r){return J(t).onAuthStateChanged(e,n,r)}function Op(t){return J(t).signOut()}const Hn="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ia{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Hn,"1"),this.storage.removeItem(Hn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pu=1e3,gu=10;class ra extends ia{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ko(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((l,u,f)=>{this.notifyListeners(l,f)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const l=this.storage.getItem(r);!n&&this.localCache[r]===l||this.notifyListeners(r,l)},a=this.storage.getItem(r);Nh()&&a!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,gu):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},pu)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}ra.type="LOCAL";const sa=ra;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa extends ia{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}oa.type="SESSION";const aa=oa;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mu(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kn{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Kn(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:a}=n.data,l=this.handlersMap[s];if(!l?.size)return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const u=Array.from(l).map(async E=>E(n.origin,a)),f=await mu(u);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:f})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Kn.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ir(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _u{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let a,l;return new Promise((u,f)=>{const E=ir("",20);s.port1.start();const S=setTimeout(()=>{f(new Error("unsupported_event"))},r);l={messageChannel:s,onMessage(b){const T=b;if(T.data.eventId===E)switch(T.data.status){case"ack":clearTimeout(S),a=setTimeout(()=>{f(new Error("timeout"))},3e3);break;case"done":clearTimeout(a),u(T.data.response);break;default:clearTimeout(S),clearTimeout(a),f(new Error("invalid_response"));break}}},this.handlers.add(l),s.port1.addEventListener("message",l.onMessage),this.target.postMessage({eventType:e,eventId:E,data:n},[s.port2])}).finally(()=>{l&&this.removeMessageHandler(l)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ie(){return window}function yu(t){Ie().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ca(){return typeof Ie().WorkerGlobalScope<"u"&&typeof Ie().importScripts=="function"}async function vu(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function wu(){var t;return((t=navigator?.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Iu(){return ca()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const la="firebaseLocalStorageDb",Eu=1,$n="firebaseLocalStorage",ha="fbase_key";class on{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function Jn(t,e){return t.transaction([$n],e?"readwrite":"readonly").objectStore($n)}function Tu(){const t=indexedDB.deleteDatabase(la);return new on(t).toPromise()}function Bi(){const t=indexedDB.open(la,Eu);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore($n,{keyPath:ha})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains($n)?e(r):(r.close(),await Tu(),e(await Bi()))})})}async function js(t,e,n){const r=Jn(t,!0).put({[ha]:e,value:n});return new on(r).toPromise()}async function Au(t,e){const n=Jn(t,!1).get(e),r=await new on(n).toPromise();return r===void 0?null:r.value}function Vs(t,e){const n=Jn(t,!0).delete(e);return new on(n).toPromise()}const Su=800,bu=3;class ua{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Bi(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>bu)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return ca()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Kn._getInstance(Iu()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await vu(),!this.activeServiceWorker)return;this.sender=new _u(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||wu()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Bi();return await js(e,Hn,"1"),await Vs(e,Hn),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>js(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Au(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Vs(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const a=Jn(s,!1).getAll();return new on(a).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:a}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(a)&&(this.notifyListeners(s,a),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Su)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}ua.type="LOCAL";const Ru=ua;new nn(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ku(t,e){return e?Ce(e):(k(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rr extends tr{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return vt(e,this._buildIdpRequest())}_linkToIdToken(e,n){return vt(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return vt(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Cu(t){return ta(t.auth,new rr(t),t.bypassAuthState)}function Pu(t){const{auth:e,user:n}=t;return k(n,e,"internal-error"),cu(n,new rr(t),t.bypassAuthState)}async function Ou(t){const{auth:e,user:n}=t;return k(n,e,"internal-error"),au(n,new rr(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class da{constructor(e,n,r,s,a=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=a,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:a,error:l,type:u}=e;if(l){this.reject(l);return}const f={auth:this.auth,requestUri:n,sessionId:r,tenantId:a||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(u)(f))}catch(E){this.reject(E)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Cu;case"linkViaPopup":case"linkViaRedirect":return Ou;case"reauthViaPopup":case"reauthViaRedirect":return Pu;default:pe(this.auth,"internal-error")}}resolve(e){Ne(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ne(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nu=new nn(2e3,1e4);class mt extends da{constructor(e,n,r,s,a){super(e,n,s,a),this.provider=r,this.authWindow=null,this.pollId=null,mt.currentPopupAction&&mt.currentPopupAction.cancel(),mt.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return k(e,this.auth,"internal-error"),e}async onExecution(){Ne(this.filter.length===1,"Popup operations only handle one event");const e=ir();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(we(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(we(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,mt.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(we(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Nu.get())};e()}}mt.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Du="pendingRedirect",Dn=new Map;class Lu extends da{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Dn.get(this.auth._key());if(!e){try{const r=await Uu(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Dn.set(this.auth._key(),e)}return this.bypassAuthState||Dn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Uu(t,e){const n=Fu(e),r=xu(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function Mu(t,e){Dn.set(t._key(),e)}function xu(t){return Ce(t._redirectPersistence)}function Fu(t){return Nn(Du,t.config.apiKey,t.name)}async function ju(t,e,n=!1){if(oe(t.app))return Promise.reject(Pe(t));const r=Ge(t),s=ku(r,e),l=await new Lu(r,s,n).execute();return l&&!n&&(delete l.user._redirectEventId,await r._persistUserIfCurrent(l.user),await r._setRedirectUser(null,e)),l}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vu=10*60*1e3;class Bu{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Hu(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!fa(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(we(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Vu&&this.cachedEventUids.clear(),this.cachedEventUids.has(Bs(e))}saveEventToCache(e){this.cachedEventUids.add(Bs(e)),this.lastProcessedEventTime=Date.now()}}function Bs(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function fa({type:t,error:e}){return t==="unknown"&&e?.code==="auth/no-auth-event"}function Hu(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return fa(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function $u(t,e={}){return Te(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wu=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,zu=/^https?/;async function qu(t){if(t.config.emulator)return;const{authorizedDomains:e}=await $u(t);for(const n of e)try{if(Gu(n))return}catch{}pe(t,"unauthorized-domain")}function Gu(t){const e=ji(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const l=new URL(t);return l.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&l.hostname===r}if(!zu.test(n))return!1;if(Wu.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ku=new nn(3e4,6e4);function Hs(){const t=Ie().___jsl;if(t?.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function Ju(t){return new Promise((e,n)=>{var r,s,a;function l(){Hs(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{Hs(),n(we(t,"network-request-failed"))},timeout:Ku.get()})}if(!((s=(r=Ie().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((a=Ie().gapi)===null||a===void 0)&&a.load)l();else{const u=Bh("iframefcb");return Ie()[u]=()=>{gapi.load?l():n(we(t,"network-request-failed"))},Xo(`${Vh()}?onload=${u}`).catch(f=>n(f))}}).catch(e=>{throw Ln=null,e})}let Ln=null;function Xu(t){return Ln=Ln||Ju(t),Ln}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yu=new nn(5e3,15e3),Zu="__/auth/iframe",Qu="emulator/auth/iframe",ed={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},td=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function nd(t){const e=t.config;k(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Zi(e,Qu):`https://${t.config.authDomain}/${Zu}`,r={apiKey:e.apiKey,appName:t.name,v:ht},s=td.get(t.config.apiHost);s&&(r.eid=s);const a=t._getFrameworks();return a.length&&(r.fw=a.join(",")),`${n}?${tn(r).slice(1)}`}async function id(t){const e=await Xu(t),n=Ie().gapi;return k(n,t,"internal-error"),e.open({where:document.body,url:nd(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:ed,dontclear:!0},r=>new Promise(async(s,a)=>{await r.restyle({setHideOnLeave:!1});const l=we(t,"network-request-failed"),u=Ie().setTimeout(()=>{a(l)},Yu.get());function f(){Ie().clearTimeout(u),s(r)}r.ping(f).then(f,()=>{a(l)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rd={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},sd=500,od=600,ad="_blank",cd="http://localhost";class $s{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function ld(t,e,n,r=sd,s=od){const a=Math.max((window.screen.availHeight-s)/2,0).toString(),l=Math.max((window.screen.availWidth-r)/2,0).toString();let u="";const f=Object.assign(Object.assign({},rd),{width:r.toString(),height:s.toString(),top:a,left:l}),E=se().toLowerCase();n&&(u=$o(E)?ad:n),Bo(E)&&(e=e||cd,f.scrollbars="yes");const S=Object.entries(f).reduce((T,[P,R])=>`${T}${P}=${R},`,"");if(Oh(E)&&u!=="_self")return hd(e||"",u),new $s(null);const b=window.open(e||"",u,S);k(b,t,"popup-blocked");try{b.focus()}catch{}return new $s(b)}function hd(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ud="__/auth/handler",dd="emulator/auth/handler",fd=encodeURIComponent("fac");async function Ws(t,e,n,r,s,a){k(t.config.authDomain,t,"auth-domain-config-required"),k(t.config.apiKey,t,"invalid-api-key");const l={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:ht,eventId:s};if(e instanceof Qo){e.setDefaultLanguage(t.languageCode),l.providerId=e.providerId||"",Xc(e.getCustomParameters())||(l.customParameters=JSON.stringify(e.getCustomParameters()));for(const[S,b]of Object.entries({}))l[S]=b}if(e instanceof sn){const S=e.getScopes().filter(b=>b!=="");S.length>0&&(l.scopes=S.join(","))}t.tenantId&&(l.tid=t.tenantId);const u=l;for(const S of Object.keys(u))u[S]===void 0&&delete u[S];const f=await t._getAppCheckToken(),E=f?`#${fd}=${encodeURIComponent(f)}`:"";return`${pd(t)}?${tn(u).slice(1)}${E}`}function pd({config:t}){return t.emulator?Zi(t,dd):`https://${t.authDomain}/${ud}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pi="webStorageSupport";class gd{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=aa,this._completeRedirectFn=ju,this._overrideRedirectResult=Mu}async _openPopup(e,n,r,s){var a;Ne((a=this.eventManagers[e._key()])===null||a===void 0?void 0:a.manager,"_initialize() not called before _openPopup()");const l=await Ws(e,n,r,ji(),s);return ld(e,l,ir())}async _openRedirect(e,n,r,s){await this._originValidation(e);const a=await Ws(e,n,r,ji(),s);return yu(a),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:a}=this.eventManagers[n];return s?Promise.resolve(s):(Ne(a,"If manager is not set, promise should be"),a)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await id(e),r=new Bu(e);return n.register("authEvent",s=>(k(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(Pi,{type:Pi},s=>{var a;const l=(a=s?.[0])===null||a===void 0?void 0:a[Pi];l!==void 0&&n(!!l),pe(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=qu(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Ko()||Ho()||er()}}const md=gd;var zs="@firebase/auth",qs="1.10.8";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _d{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){k(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yd(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function vd(t){rt(new qe("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),a=e.getProvider("app-check-internal"),{apiKey:l,authDomain:u}=r.options;k(l&&!l.includes(":"),"invalid-api-key",{appName:r.name});const f={apiKey:l,authDomain:u,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Jo(t)},E=new xh(r,s,a,f);return Gh(E,n),E},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),rt(new qe("auth-internal",e=>{const n=Ge(e.getProvider("auth").getImmediate());return(r=>new _d(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),ve(zs,qs,yd(t)),ve(zs,qs,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wd=5*60,Id=bo("authIdTokenMaxAge")||wd;let Gs=null;const Ed=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Id)return;const s=n?.token;Gs!==s&&(Gs=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Td(t=qn()){const e=zn(t,"auth");if(e.isInitialized())return e.getImmediate();const n=qh(t,{popupRedirectResolver:md,persistence:[Ru,sa,aa]}),r=bo("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const a=new URL(r,location.origin);if(location.origin===a.origin){const l=Ed(a.toString());fu(n,l,()=>l(n.currentUser)),du(n,u=>l(u))}}const s=To("auth");return s&&Kh(n,`http://${s}`),n}function Ad(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}Fh({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const a=we("internal-error");a.customData=s,n(a)},r.type="text/javascript",r.charset="UTF-8",Ad().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});vd("Browser");var Ks=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var sr;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(y,d){function g(){}g.prototype=d.prototype,y.D=d.prototype,y.prototype=new g,y.prototype.constructor=y,y.C=function(m,_,w){for(var p=Array(arguments.length-2),Ae=2;Ae<arguments.length;Ae++)p[Ae-2]=arguments[Ae];return d.prototype[_].apply(m,p)}}function n(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,n),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(y,d,g){g||(g=0);var m=Array(16);if(typeof d=="string")for(var _=0;16>_;++_)m[_]=d.charCodeAt(g++)|d.charCodeAt(g++)<<8|d.charCodeAt(g++)<<16|d.charCodeAt(g++)<<24;else for(_=0;16>_;++_)m[_]=d[g++]|d[g++]<<8|d[g++]<<16|d[g++]<<24;d=y.g[0],g=y.g[1],_=y.g[2];var w=y.g[3],p=d+(w^g&(_^w))+m[0]+3614090360&4294967295;d=g+(p<<7&4294967295|p>>>25),p=w+(_^d&(g^_))+m[1]+3905402710&4294967295,w=d+(p<<12&4294967295|p>>>20),p=_+(g^w&(d^g))+m[2]+606105819&4294967295,_=w+(p<<17&4294967295|p>>>15),p=g+(d^_&(w^d))+m[3]+3250441966&4294967295,g=_+(p<<22&4294967295|p>>>10),p=d+(w^g&(_^w))+m[4]+4118548399&4294967295,d=g+(p<<7&4294967295|p>>>25),p=w+(_^d&(g^_))+m[5]+1200080426&4294967295,w=d+(p<<12&4294967295|p>>>20),p=_+(g^w&(d^g))+m[6]+2821735955&4294967295,_=w+(p<<17&4294967295|p>>>15),p=g+(d^_&(w^d))+m[7]+4249261313&4294967295,g=_+(p<<22&4294967295|p>>>10),p=d+(w^g&(_^w))+m[8]+1770035416&4294967295,d=g+(p<<7&4294967295|p>>>25),p=w+(_^d&(g^_))+m[9]+2336552879&4294967295,w=d+(p<<12&4294967295|p>>>20),p=_+(g^w&(d^g))+m[10]+4294925233&4294967295,_=w+(p<<17&4294967295|p>>>15),p=g+(d^_&(w^d))+m[11]+2304563134&4294967295,g=_+(p<<22&4294967295|p>>>10),p=d+(w^g&(_^w))+m[12]+1804603682&4294967295,d=g+(p<<7&4294967295|p>>>25),p=w+(_^d&(g^_))+m[13]+4254626195&4294967295,w=d+(p<<12&4294967295|p>>>20),p=_+(g^w&(d^g))+m[14]+2792965006&4294967295,_=w+(p<<17&4294967295|p>>>15),p=g+(d^_&(w^d))+m[15]+1236535329&4294967295,g=_+(p<<22&4294967295|p>>>10),p=d+(_^w&(g^_))+m[1]+4129170786&4294967295,d=g+(p<<5&4294967295|p>>>27),p=w+(g^_&(d^g))+m[6]+3225465664&4294967295,w=d+(p<<9&4294967295|p>>>23),p=_+(d^g&(w^d))+m[11]+643717713&4294967295,_=w+(p<<14&4294967295|p>>>18),p=g+(w^d&(_^w))+m[0]+3921069994&4294967295,g=_+(p<<20&4294967295|p>>>12),p=d+(_^w&(g^_))+m[5]+3593408605&4294967295,d=g+(p<<5&4294967295|p>>>27),p=w+(g^_&(d^g))+m[10]+38016083&4294967295,w=d+(p<<9&4294967295|p>>>23),p=_+(d^g&(w^d))+m[15]+3634488961&4294967295,_=w+(p<<14&4294967295|p>>>18),p=g+(w^d&(_^w))+m[4]+3889429448&4294967295,g=_+(p<<20&4294967295|p>>>12),p=d+(_^w&(g^_))+m[9]+568446438&4294967295,d=g+(p<<5&4294967295|p>>>27),p=w+(g^_&(d^g))+m[14]+3275163606&4294967295,w=d+(p<<9&4294967295|p>>>23),p=_+(d^g&(w^d))+m[3]+4107603335&4294967295,_=w+(p<<14&4294967295|p>>>18),p=g+(w^d&(_^w))+m[8]+1163531501&4294967295,g=_+(p<<20&4294967295|p>>>12),p=d+(_^w&(g^_))+m[13]+2850285829&4294967295,d=g+(p<<5&4294967295|p>>>27),p=w+(g^_&(d^g))+m[2]+4243563512&4294967295,w=d+(p<<9&4294967295|p>>>23),p=_+(d^g&(w^d))+m[7]+1735328473&4294967295,_=w+(p<<14&4294967295|p>>>18),p=g+(w^d&(_^w))+m[12]+2368359562&4294967295,g=_+(p<<20&4294967295|p>>>12),p=d+(g^_^w)+m[5]+4294588738&4294967295,d=g+(p<<4&4294967295|p>>>28),p=w+(d^g^_)+m[8]+2272392833&4294967295,w=d+(p<<11&4294967295|p>>>21),p=_+(w^d^g)+m[11]+1839030562&4294967295,_=w+(p<<16&4294967295|p>>>16),p=g+(_^w^d)+m[14]+4259657740&4294967295,g=_+(p<<23&4294967295|p>>>9),p=d+(g^_^w)+m[1]+2763975236&4294967295,d=g+(p<<4&4294967295|p>>>28),p=w+(d^g^_)+m[4]+1272893353&4294967295,w=d+(p<<11&4294967295|p>>>21),p=_+(w^d^g)+m[7]+4139469664&4294967295,_=w+(p<<16&4294967295|p>>>16),p=g+(_^w^d)+m[10]+3200236656&4294967295,g=_+(p<<23&4294967295|p>>>9),p=d+(g^_^w)+m[13]+681279174&4294967295,d=g+(p<<4&4294967295|p>>>28),p=w+(d^g^_)+m[0]+3936430074&4294967295,w=d+(p<<11&4294967295|p>>>21),p=_+(w^d^g)+m[3]+3572445317&4294967295,_=w+(p<<16&4294967295|p>>>16),p=g+(_^w^d)+m[6]+76029189&4294967295,g=_+(p<<23&4294967295|p>>>9),p=d+(g^_^w)+m[9]+3654602809&4294967295,d=g+(p<<4&4294967295|p>>>28),p=w+(d^g^_)+m[12]+3873151461&4294967295,w=d+(p<<11&4294967295|p>>>21),p=_+(w^d^g)+m[15]+530742520&4294967295,_=w+(p<<16&4294967295|p>>>16),p=g+(_^w^d)+m[2]+3299628645&4294967295,g=_+(p<<23&4294967295|p>>>9),p=d+(_^(g|~w))+m[0]+4096336452&4294967295,d=g+(p<<6&4294967295|p>>>26),p=w+(g^(d|~_))+m[7]+1126891415&4294967295,w=d+(p<<10&4294967295|p>>>22),p=_+(d^(w|~g))+m[14]+2878612391&4294967295,_=w+(p<<15&4294967295|p>>>17),p=g+(w^(_|~d))+m[5]+4237533241&4294967295,g=_+(p<<21&4294967295|p>>>11),p=d+(_^(g|~w))+m[12]+1700485571&4294967295,d=g+(p<<6&4294967295|p>>>26),p=w+(g^(d|~_))+m[3]+2399980690&4294967295,w=d+(p<<10&4294967295|p>>>22),p=_+(d^(w|~g))+m[10]+4293915773&4294967295,_=w+(p<<15&4294967295|p>>>17),p=g+(w^(_|~d))+m[1]+2240044497&4294967295,g=_+(p<<21&4294967295|p>>>11),p=d+(_^(g|~w))+m[8]+1873313359&4294967295,d=g+(p<<6&4294967295|p>>>26),p=w+(g^(d|~_))+m[15]+4264355552&4294967295,w=d+(p<<10&4294967295|p>>>22),p=_+(d^(w|~g))+m[6]+2734768916&4294967295,_=w+(p<<15&4294967295|p>>>17),p=g+(w^(_|~d))+m[13]+1309151649&4294967295,g=_+(p<<21&4294967295|p>>>11),p=d+(_^(g|~w))+m[4]+4149444226&4294967295,d=g+(p<<6&4294967295|p>>>26),p=w+(g^(d|~_))+m[11]+3174756917&4294967295,w=d+(p<<10&4294967295|p>>>22),p=_+(d^(w|~g))+m[2]+718787259&4294967295,_=w+(p<<15&4294967295|p>>>17),p=g+(w^(_|~d))+m[9]+3951481745&4294967295,y.g[0]=y.g[0]+d&4294967295,y.g[1]=y.g[1]+(_+(p<<21&4294967295|p>>>11))&4294967295,y.g[2]=y.g[2]+_&4294967295,y.g[3]=y.g[3]+w&4294967295}r.prototype.u=function(y,d){d===void 0&&(d=y.length);for(var g=d-this.blockSize,m=this.B,_=this.h,w=0;w<d;){if(_==0)for(;w<=g;)s(this,y,w),w+=this.blockSize;if(typeof y=="string"){for(;w<d;)if(m[_++]=y.charCodeAt(w++),_==this.blockSize){s(this,m),_=0;break}}else for(;w<d;)if(m[_++]=y[w++],_==this.blockSize){s(this,m),_=0;break}}this.h=_,this.o+=d},r.prototype.v=function(){var y=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);y[0]=128;for(var d=1;d<y.length-8;++d)y[d]=0;var g=8*this.o;for(d=y.length-8;d<y.length;++d)y[d]=g&255,g/=256;for(this.u(y),y=Array(16),d=g=0;4>d;++d)for(var m=0;32>m;m+=8)y[g++]=this.g[d]>>>m&255;return y};function a(y,d){var g=u;return Object.prototype.hasOwnProperty.call(g,y)?g[y]:g[y]=d(y)}function l(y,d){this.h=d;for(var g=[],m=!0,_=y.length-1;0<=_;_--){var w=y[_]|0;m&&w==d||(g[_]=w,m=!1)}this.g=g}var u={};function f(y){return-128<=y&&128>y?a(y,function(d){return new l([d|0],0>d?-1:0)}):new l([y|0],0>y?-1:0)}function E(y){if(isNaN(y)||!isFinite(y))return b;if(0>y)return C(E(-y));for(var d=[],g=1,m=0;y>=g;m++)d[m]=y/g|0,g*=4294967296;return new l(d,0)}function S(y,d){if(y.length==0)throw Error("number format error: empty string");if(d=d||10,2>d||36<d)throw Error("radix out of range: "+d);if(y.charAt(0)=="-")return C(S(y.substring(1),d));if(0<=y.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=E(Math.pow(d,8)),m=b,_=0;_<y.length;_+=8){var w=Math.min(8,y.length-_),p=parseInt(y.substring(_,_+w),d);8>w?(w=E(Math.pow(d,w)),m=m.j(w).add(E(p))):(m=m.j(g),m=m.add(E(p)))}return m}var b=f(0),T=f(1),P=f(16777216);t=l.prototype,t.m=function(){if(U(this))return-C(this).m();for(var y=0,d=1,g=0;g<this.g.length;g++){var m=this.i(g);y+=(0<=m?m:4294967296+m)*d,d*=4294967296}return y},t.toString=function(y){if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(R(this))return"0";if(U(this))return"-"+C(this).toString(y);for(var d=E(Math.pow(y,6)),g=this,m="";;){var _=F(g,d).g;g=q(g,_.j(d));var w=((0<g.g.length?g.g[0]:g.h)>>>0).toString(y);if(g=_,R(g))return w+m;for(;6>w.length;)w="0"+w;m=w+m}},t.i=function(y){return 0>y?0:y<this.g.length?this.g[y]:this.h};function R(y){if(y.h!=0)return!1;for(var d=0;d<y.g.length;d++)if(y.g[d]!=0)return!1;return!0}function U(y){return y.h==-1}t.l=function(y){return y=q(this,y),U(y)?-1:R(y)?0:1};function C(y){for(var d=y.g.length,g=[],m=0;m<d;m++)g[m]=~y.g[m];return new l(g,~y.h).add(T)}t.abs=function(){return U(this)?C(this):this},t.add=function(y){for(var d=Math.max(this.g.length,y.g.length),g=[],m=0,_=0;_<=d;_++){var w=m+(this.i(_)&65535)+(y.i(_)&65535),p=(w>>>16)+(this.i(_)>>>16)+(y.i(_)>>>16);m=p>>>16,w&=65535,p&=65535,g[_]=p<<16|w}return new l(g,g[g.length-1]&-2147483648?-1:0)};function q(y,d){return y.add(C(d))}t.j=function(y){if(R(this)||R(y))return b;if(U(this))return U(y)?C(this).j(C(y)):C(C(this).j(y));if(U(y))return C(this.j(C(y)));if(0>this.l(P)&&0>y.l(P))return E(this.m()*y.m());for(var d=this.g.length+y.g.length,g=[],m=0;m<2*d;m++)g[m]=0;for(m=0;m<this.g.length;m++)for(var _=0;_<y.g.length;_++){var w=this.i(m)>>>16,p=this.i(m)&65535,Ae=y.i(_)>>>16,At=y.i(_)&65535;g[2*m+2*_]+=p*At,V(g,2*m+2*_),g[2*m+2*_+1]+=w*At,V(g,2*m+2*_+1),g[2*m+2*_+1]+=p*Ae,V(g,2*m+2*_+1),g[2*m+2*_+2]+=w*Ae,V(g,2*m+2*_+2)}for(m=0;m<d;m++)g[m]=g[2*m+1]<<16|g[2*m];for(m=d;m<2*d;m++)g[m]=0;return new l(g,0)};function V(y,d){for(;(y[d]&65535)!=y[d];)y[d+1]+=y[d]>>>16,y[d]&=65535,d++}function M(y,d){this.g=y,this.h=d}function F(y,d){if(R(d))throw Error("division by zero");if(R(y))return new M(b,b);if(U(y))return d=F(C(y),d),new M(C(d.g),C(d.h));if(U(d))return d=F(y,C(d)),new M(C(d.g),d.h);if(30<y.g.length){if(U(y)||U(d))throw Error("slowDivide_ only works with positive integers.");for(var g=T,m=d;0>=m.l(y);)g=ae(g),m=ae(m);var _=G(g,1),w=G(m,1);for(m=G(m,2),g=G(g,2);!R(m);){var p=w.add(m);0>=p.l(y)&&(_=_.add(g),w=p),m=G(m,1),g=G(g,1)}return d=q(y,_.j(d)),new M(_,d)}for(_=b;0<=y.l(d);){for(g=Math.max(1,Math.floor(y.m()/d.m())),m=Math.ceil(Math.log(g)/Math.LN2),m=48>=m?1:Math.pow(2,m-48),w=E(g),p=w.j(d);U(p)||0<p.l(y);)g-=m,w=E(g),p=w.j(d);R(w)&&(w=T),_=_.add(w),y=q(y,p)}return new M(_,y)}t.A=function(y){return F(this,y).h},t.and=function(y){for(var d=Math.max(this.g.length,y.g.length),g=[],m=0;m<d;m++)g[m]=this.i(m)&y.i(m);return new l(g,this.h&y.h)},t.or=function(y){for(var d=Math.max(this.g.length,y.g.length),g=[],m=0;m<d;m++)g[m]=this.i(m)|y.i(m);return new l(g,this.h|y.h)},t.xor=function(y){for(var d=Math.max(this.g.length,y.g.length),g=[],m=0;m<d;m++)g[m]=this.i(m)^y.i(m);return new l(g,this.h^y.h)};function ae(y){for(var d=y.g.length+1,g=[],m=0;m<d;m++)g[m]=y.i(m)<<1|y.i(m-1)>>>31;return new l(g,y.h)}function G(y,d){var g=d>>5;d%=32;for(var m=y.g.length-g,_=[],w=0;w<m;w++)_[w]=0<d?y.i(w+g)>>>d|y.i(w+g+1)<<32-d:y.i(w+g);return new l(_,y.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,l.prototype.add=l.prototype.add,l.prototype.multiply=l.prototype.j,l.prototype.modulo=l.prototype.A,l.prototype.compare=l.prototype.l,l.prototype.toNumber=l.prototype.m,l.prototype.toString=l.prototype.toString,l.prototype.getBits=l.prototype.i,l.fromNumber=E,l.fromString=S,sr=l}).apply(typeof Ks<"u"?Ks:typeof self<"u"?self:typeof window<"u"?window:{});var Rn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var t,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,o,c){return i==Array.prototype||i==Object.prototype||(i[o]=c.value),i};function n(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof Rn=="object"&&Rn];for(var o=0;o<i.length;++o){var c=i[o];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var r=n(this);function s(i,o){if(o)e:{var c=r;i=i.split(".");for(var h=0;h<i.length-1;h++){var v=i[h];if(!(v in c))break e;c=c[v]}i=i[i.length-1],h=c[i],o=o(h),o!=h&&o!=null&&e(c,i,{configurable:!0,writable:!0,value:o})}}function a(i,o){i instanceof String&&(i+="");var c=0,h=!1,v={next:function(){if(!h&&c<i.length){var I=c++;return{value:o(I,i[I]),done:!1}}return h=!0,{done:!0,value:void 0}}};return v[Symbol.iterator]=function(){return v},v}s("Array.prototype.values",function(i){return i||function(){return a(this,function(o,c){return c})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var l=l||{},u=this||self;function f(i){var o=typeof i;return o=o!="object"?o:i?Array.isArray(i)?"array":o:"null",o=="array"||o=="object"&&typeof i.length=="number"}function E(i){var o=typeof i;return o=="object"&&i!=null||o=="function"}function S(i,o,c){return i.call.apply(i.bind,arguments)}function b(i,o,c){if(!i)throw Error();if(2<arguments.length){var h=Array.prototype.slice.call(arguments,2);return function(){var v=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(v,h),i.apply(o,v)}}return function(){return i.apply(o,arguments)}}function T(i,o,c){return T=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?S:b,T.apply(null,arguments)}function P(i,o){var c=Array.prototype.slice.call(arguments,1);return function(){var h=c.slice();return h.push.apply(h,arguments),i.apply(this,h)}}function R(i,o){function c(){}c.prototype=o.prototype,i.aa=o.prototype,i.prototype=new c,i.prototype.constructor=i,i.Qb=function(h,v,I){for(var A=Array(arguments.length-2),j=2;j<arguments.length;j++)A[j-2]=arguments[j];return o.prototype[v].apply(h,A)}}function U(i){const o=i.length;if(0<o){const c=Array(o);for(let h=0;h<o;h++)c[h]=i[h];return c}return[]}function C(i,o){for(let c=1;c<arguments.length;c++){const h=arguments[c];if(f(h)){const v=i.length||0,I=h.length||0;i.length=v+I;for(let A=0;A<I;A++)i[v+A]=h[A]}else i.push(h)}}class q{constructor(o,c){this.i=o,this.j=c,this.h=0,this.g=null}get(){let o;return 0<this.h?(this.h--,o=this.g,this.g=o.next,o.next=null):o=this.i(),o}}function V(i){return/^[\s\xa0]*$/.test(i)}function M(){var i=u.navigator;return i&&(i=i.userAgent)?i:""}function F(i){return F[" "](i),i}F[" "]=function(){};var ae=M().indexOf("Gecko")!=-1&&!(M().toLowerCase().indexOf("webkit")!=-1&&M().indexOf("Edge")==-1)&&!(M().indexOf("Trident")!=-1||M().indexOf("MSIE")!=-1)&&M().indexOf("Edge")==-1;function G(i,o,c){for(const h in i)o.call(c,i[h],h,i)}function y(i,o){for(const c in i)o.call(void 0,i[c],c,i)}function d(i){const o={};for(const c in i)o[c]=i[c];return o}const g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function m(i,o){let c,h;for(let v=1;v<arguments.length;v++){h=arguments[v];for(c in h)i[c]=h[c];for(let I=0;I<g.length;I++)c=g[I],Object.prototype.hasOwnProperty.call(h,c)&&(i[c]=h[c])}}function _(i){var o=1;i=i.split(":");const c=[];for(;0<o&&i.length;)c.push(i.shift()),o--;return i.length&&c.push(i.join(":")),c}function w(i){u.setTimeout(()=>{throw i},0)}function p(){var i=Zn;let o=null;return i.g&&(o=i.g,i.g=i.g.next,i.g||(i.h=null),o.next=null),o}class Ae{constructor(){this.h=this.g=null}add(o,c){const h=At.get();h.set(o,c),this.h?this.h.next=h:this.g=h,this.h=h}}var At=new q(()=>new Ma,i=>i.reset());class Ma{constructor(){this.next=this.g=this.h=null}set(o,c){this.h=o,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let St,bt=!1,Zn=new Ae,yr=()=>{const i=u.Promise.resolve(void 0);St=()=>{i.then(xa)}};var xa=()=>{for(var i;i=p();){try{i.h.call(i.g)}catch(c){w(c)}var o=At;o.j(i),100>o.h&&(o.h++,i.next=o.g,o.g=i)}bt=!1};function Le(){this.s=this.s,this.C=this.C}Le.prototype.s=!1,Le.prototype.ma=function(){this.s||(this.s=!0,this.N())},Le.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function X(i,o){this.type=i,this.g=this.target=o,this.defaultPrevented=!1}X.prototype.h=function(){this.defaultPrevented=!0};var Fa=function(){if(!u.addEventListener||!Object.defineProperty)return!1;var i=!1,o=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const c=()=>{};u.addEventListener("test",c,o),u.removeEventListener("test",c,o)}catch{}return i}();function Rt(i,o){if(X.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var c=this.type=i.type,h=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=o,o=i.relatedTarget){if(ae){e:{try{F(o.nodeName);var v=!0;break e}catch{}v=!1}v||(o=null)}}else c=="mouseover"?o=i.fromElement:c=="mouseout"&&(o=i.toElement);this.relatedTarget=o,h?(this.clientX=h.clientX!==void 0?h.clientX:h.pageX,this.clientY=h.clientY!==void 0?h.clientY:h.pageY,this.screenX=h.screenX||0,this.screenY=h.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:ja[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&Rt.aa.h.call(this)}}R(Rt,X);var ja={2:"touch",3:"pen",4:"mouse"};Rt.prototype.h=function(){Rt.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var hn="closure_listenable_"+(1e6*Math.random()|0),Va=0;function Ba(i,o,c,h,v){this.listener=i,this.proxy=null,this.src=o,this.type=c,this.capture=!!h,this.ha=v,this.key=++Va,this.da=this.fa=!1}function un(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function dn(i){this.src=i,this.g={},this.h=0}dn.prototype.add=function(i,o,c,h,v){var I=i.toString();i=this.g[I],i||(i=this.g[I]=[],this.h++);var A=ei(i,o,h,v);return-1<A?(o=i[A],c||(o.fa=!1)):(o=new Ba(o,this.src,I,!!h,v),o.fa=c,i.push(o)),o};function Qn(i,o){var c=o.type;if(c in i.g){var h=i.g[c],v=Array.prototype.indexOf.call(h,o,void 0),I;(I=0<=v)&&Array.prototype.splice.call(h,v,1),I&&(un(o),i.g[c].length==0&&(delete i.g[c],i.h--))}}function ei(i,o,c,h){for(var v=0;v<i.length;++v){var I=i[v];if(!I.da&&I.listener==o&&I.capture==!!c&&I.ha==h)return v}return-1}var ti="closure_lm_"+(1e6*Math.random()|0),ni={};function vr(i,o,c,h,v){if(Array.isArray(o)){for(var I=0;I<o.length;I++)vr(i,o[I],c,h,v);return null}return c=Er(c),i&&i[hn]?i.K(o,c,E(h)?!!h.capture:!1,v):Ha(i,o,c,!1,h,v)}function Ha(i,o,c,h,v,I){if(!o)throw Error("Invalid event type");var A=E(v)?!!v.capture:!!v,j=ri(i);if(j||(i[ti]=j=new dn(i)),c=j.add(o,c,h,A,I),c.proxy)return c;if(h=$a(),c.proxy=h,h.src=i,h.listener=c,i.addEventListener)Fa||(v=A),v===void 0&&(v=!1),i.addEventListener(o.toString(),h,v);else if(i.attachEvent)i.attachEvent(Ir(o.toString()),h);else if(i.addListener&&i.removeListener)i.addListener(h);else throw Error("addEventListener and attachEvent are unavailable.");return c}function $a(){function i(c){return o.call(i.src,i.listener,c)}const o=Wa;return i}function wr(i,o,c,h,v){if(Array.isArray(o))for(var I=0;I<o.length;I++)wr(i,o[I],c,h,v);else h=E(h)?!!h.capture:!!h,c=Er(c),i&&i[hn]?(i=i.i,o=String(o).toString(),o in i.g&&(I=i.g[o],c=ei(I,c,h,v),-1<c&&(un(I[c]),Array.prototype.splice.call(I,c,1),I.length==0&&(delete i.g[o],i.h--)))):i&&(i=ri(i))&&(o=i.g[o.toString()],i=-1,o&&(i=ei(o,c,h,v)),(c=-1<i?o[i]:null)&&ii(c))}function ii(i){if(typeof i!="number"&&i&&!i.da){var o=i.src;if(o&&o[hn])Qn(o.i,i);else{var c=i.type,h=i.proxy;o.removeEventListener?o.removeEventListener(c,h,i.capture):o.detachEvent?o.detachEvent(Ir(c),h):o.addListener&&o.removeListener&&o.removeListener(h),(c=ri(o))?(Qn(c,i),c.h==0&&(c.src=null,o[ti]=null)):un(i)}}}function Ir(i){return i in ni?ni[i]:ni[i]="on"+i}function Wa(i,o){if(i.da)i=!0;else{o=new Rt(o,this);var c=i.listener,h=i.ha||i.src;i.fa&&ii(i),i=c.call(h,o)}return i}function ri(i){return i=i[ti],i instanceof dn?i:null}var si="__closure_events_fn_"+(1e9*Math.random()>>>0);function Er(i){return typeof i=="function"?i:(i[si]||(i[si]=function(o){return i.handleEvent(o)}),i[si])}function Y(){Le.call(this),this.i=new dn(this),this.M=this,this.F=null}R(Y,Le),Y.prototype[hn]=!0,Y.prototype.removeEventListener=function(i,o,c,h){wr(this,i,o,c,h)};function ee(i,o){var c,h=i.F;if(h)for(c=[];h;h=h.F)c.push(h);if(i=i.M,h=o.type||o,typeof o=="string")o=new X(o,i);else if(o instanceof X)o.target=o.target||i;else{var v=o;o=new X(h,i),m(o,v)}if(v=!0,c)for(var I=c.length-1;0<=I;I--){var A=o.g=c[I];v=fn(A,h,!0,o)&&v}if(A=o.g=i,v=fn(A,h,!0,o)&&v,v=fn(A,h,!1,o)&&v,c)for(I=0;I<c.length;I++)A=o.g=c[I],v=fn(A,h,!1,o)&&v}Y.prototype.N=function(){if(Y.aa.N.call(this),this.i){var i=this.i,o;for(o in i.g){for(var c=i.g[o],h=0;h<c.length;h++)un(c[h]);delete i.g[o],i.h--}}this.F=null},Y.prototype.K=function(i,o,c,h){return this.i.add(String(i),o,!1,c,h)},Y.prototype.L=function(i,o,c,h){return this.i.add(String(i),o,!0,c,h)};function fn(i,o,c,h){if(o=i.i.g[String(o)],!o)return!0;o=o.concat();for(var v=!0,I=0;I<o.length;++I){var A=o[I];if(A&&!A.da&&A.capture==c){var j=A.listener,K=A.ha||A.src;A.fa&&Qn(i.i,A),v=j.call(K,h)!==!1&&v}}return v&&!h.defaultPrevented}function Tr(i,o,c){if(typeof i=="function")c&&(i=T(i,c));else if(i&&typeof i.handleEvent=="function")i=T(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(o)?-1:u.setTimeout(i,o||0)}function Ar(i){i.g=Tr(()=>{i.g=null,i.i&&(i.i=!1,Ar(i))},i.l);const o=i.h;i.h=null,i.m.apply(null,o)}class za extends Le{constructor(o,c){super(),this.m=o,this.l=c,this.h=null,this.i=!1,this.g=null}j(o){this.h=arguments,this.g?this.i=!0:Ar(this)}N(){super.N(),this.g&&(u.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function kt(i){Le.call(this),this.h=i,this.g={}}R(kt,Le);var Sr=[];function br(i){G(i.g,function(o,c){this.g.hasOwnProperty(c)&&ii(o)},i),i.g={}}kt.prototype.N=function(){kt.aa.N.call(this),br(this)},kt.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var oi=u.JSON.stringify,qa=u.JSON.parse,Ga=class{stringify(i){return u.JSON.stringify(i,void 0)}parse(i){return u.JSON.parse(i,void 0)}};function ai(){}ai.prototype.h=null;function Rr(i){return i.h||(i.h=i.i())}function Ka(){}var Ct={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function ci(){X.call(this,"d")}R(ci,X);function li(){X.call(this,"c")}R(li,X);var ut={},kr=null;function hi(){return kr=kr||new Y}ut.La="serverreachability";function Cr(i){X.call(this,ut.La,i)}R(Cr,X);function Pt(i){const o=hi();ee(o,new Cr(o))}ut.STAT_EVENT="statevent";function Pr(i,o){X.call(this,ut.STAT_EVENT,i),this.stat=o}R(Pr,X);function te(i){const o=hi();ee(o,new Pr(o,i))}ut.Ma="timingevent";function Or(i,o){X.call(this,ut.Ma,i),this.size=o}R(Or,X);function Ot(i,o){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return u.setTimeout(function(){i()},o)}function Nt(){this.g=!0}Nt.prototype.xa=function(){this.g=!1};function Ja(i,o,c,h,v,I){i.info(function(){if(i.g)if(I)for(var A="",j=I.split("&"),K=0;K<j.length;K++){var L=j[K].split("=");if(1<L.length){var Z=L[0];L=L[1];var Q=Z.split("_");A=2<=Q.length&&Q[1]=="type"?A+(Z+"="+L+"&"):A+(Z+"=redacted&")}}else A=null;else A=I;return"XMLHTTP REQ ("+h+") [attempt "+v+"]: "+o+`
`+c+`
`+A})}function Xa(i,o,c,h,v,I,A){i.info(function(){return"XMLHTTP RESP ("+h+") [ attempt "+v+"]: "+o+`
`+c+`
`+I+" "+A})}function dt(i,o,c,h){i.info(function(){return"XMLHTTP TEXT ("+o+"): "+Za(i,c)+(h?" "+h:"")})}function Ya(i,o){i.info(function(){return"TIMEOUT: "+o})}Nt.prototype.info=function(){};function Za(i,o){if(!i.g)return o;if(!o)return null;try{var c=JSON.parse(o);if(c){for(i=0;i<c.length;i++)if(Array.isArray(c[i])){var h=c[i];if(!(2>h.length)){var v=h[1];if(Array.isArray(v)&&!(1>v.length)){var I=v[0];if(I!="noop"&&I!="stop"&&I!="close")for(var A=1;A<v.length;A++)v[A]=""}}}}return oi(c)}catch{return o}}var ui={NO_ERROR:0,TIMEOUT:8},Qa={},di;function pn(){}R(pn,ai),pn.prototype.g=function(){return new XMLHttpRequest},pn.prototype.i=function(){return{}},di=new pn;function Ue(i,o,c,h){this.j=i,this.i=o,this.l=c,this.R=h||1,this.U=new kt(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Nr}function Nr(){this.i=null,this.g="",this.h=!1}var Dr={},fi={};function pi(i,o,c){i.L=1,i.v=yn(Se(o)),i.m=c,i.P=!0,Lr(i,null)}function Lr(i,o){i.F=Date.now(),gn(i),i.A=Se(i.v);var c=i.A,h=i.R;Array.isArray(h)||(h=[String(h)]),Kr(c.i,"t",h),i.C=0,c=i.j.J,i.h=new Nr,i.g=ds(i.j,c?o:null,!i.m),0<i.O&&(i.M=new za(T(i.Y,i,i.g),i.O)),o=i.U,c=i.g,h=i.ca;var v="readystatechange";Array.isArray(v)||(v&&(Sr[0]=v.toString()),v=Sr);for(var I=0;I<v.length;I++){var A=vr(c,v[I],h||o.handleEvent,!1,o.h||o);if(!A)break;o.g[A.key]=A}o=i.H?d(i.H):{},i.m?(i.u||(i.u="POST"),o["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,o)):(i.u="GET",i.g.ea(i.A,i.u,null,o)),Pt(),Ja(i.i,i.u,i.A,i.l,i.R,i.m)}Ue.prototype.ca=function(i){i=i.target;const o=this.M;o&&be(i)==3?o.j():this.Y(i)},Ue.prototype.Y=function(i){try{if(i==this.g)e:{const Q=be(this.g);var o=this.g.Ba();const gt=this.g.Z();if(!(3>Q)&&(Q!=3||this.g&&(this.h.h||this.g.oa()||ts(this.g)))){this.J||Q!=4||o==7||(o==8||0>=gt?Pt(3):Pt(2)),gi(this);var c=this.g.Z();this.X=c;t:if(Ur(this)){var h=ts(this.g);i="";var v=h.length,I=be(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Ke(this),Dt(this);var A="";break t}this.h.i=new u.TextDecoder}for(o=0;o<v;o++)this.h.h=!0,i+=this.h.i.decode(h[o],{stream:!(I&&o==v-1)});h.length=0,this.h.g+=i,this.C=0,A=this.h.g}else A=this.g.oa();if(this.o=c==200,Xa(this.i,this.u,this.A,this.l,this.R,Q,c),this.o){if(this.T&&!this.K){t:{if(this.g){var j,K=this.g;if((j=K.g?K.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!V(j)){var L=j;break t}}L=null}if(c=L)dt(this.i,this.l,c,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,mi(this,c);else{this.o=!1,this.s=3,te(12),Ke(this),Dt(this);break e}}if(this.P){c=!0;let le;for(;!this.J&&this.C<A.length;)if(le=ec(this,A),le==fi){Q==4&&(this.s=4,te(14),c=!1),dt(this.i,this.l,null,"[Incomplete Response]");break}else if(le==Dr){this.s=4,te(15),dt(this.i,this.l,A,"[Invalid Chunk]"),c=!1;break}else dt(this.i,this.l,le,null),mi(this,le);if(Ur(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Q!=4||A.length!=0||this.h.h||(this.s=1,te(16),c=!1),this.o=this.o&&c,!c)dt(this.i,this.l,A,"[Invalid Chunked Response]"),Ke(this),Dt(this);else if(0<A.length&&!this.W){this.W=!0;var Z=this.j;Z.g==this&&Z.ba&&!Z.M&&(Z.j.info("Great, no buffering proxy detected. Bytes received: "+A.length),Ei(Z),Z.M=!0,te(11))}}else dt(this.i,this.l,A,null),mi(this,A);Q==4&&Ke(this),this.o&&!this.J&&(Q==4?cs(this.j,this):(this.o=!1,gn(this)))}else _c(this.g),c==400&&0<A.indexOf("Unknown SID")?(this.s=3,te(12)):(this.s=0,te(13)),Ke(this),Dt(this)}}}catch{}finally{}};function Ur(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function ec(i,o){var c=i.C,h=o.indexOf(`
`,c);return h==-1?fi:(c=Number(o.substring(c,h)),isNaN(c)?Dr:(h+=1,h+c>o.length?fi:(o=o.slice(h,h+c),i.C=h+c,o)))}Ue.prototype.cancel=function(){this.J=!0,Ke(this)};function gn(i){i.S=Date.now()+i.I,Mr(i,i.I)}function Mr(i,o){if(i.B!=null)throw Error("WatchDog timer not null");i.B=Ot(T(i.ba,i),o)}function gi(i){i.B&&(u.clearTimeout(i.B),i.B=null)}Ue.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(Ya(this.i,this.A),this.L!=2&&(Pt(),te(17)),Ke(this),this.s=2,Dt(this)):Mr(this,this.S-i)};function Dt(i){i.j.G==0||i.J||cs(i.j,i)}function Ke(i){gi(i);var o=i.M;o&&typeof o.ma=="function"&&o.ma(),i.M=null,br(i.U),i.g&&(o=i.g,i.g=null,o.abort(),o.ma())}function mi(i,o){try{var c=i.j;if(c.G!=0&&(c.g==i||_i(c.h,i))){if(!i.K&&_i(c.h,i)&&c.G==3){try{var h=c.Da.g.parse(o)}catch{h=null}if(Array.isArray(h)&&h.length==3){var v=h;if(v[0]==0){e:if(!c.u){if(c.g)if(c.g.F+3e3<i.F)An(c),En(c);else break e;Ii(c),te(18)}}else c.za=v[1],0<c.za-c.T&&37500>v[2]&&c.F&&c.v==0&&!c.C&&(c.C=Ot(T(c.Za,c),6e3));if(1>=jr(c.h)&&c.ca){try{c.ca()}catch{}c.ca=void 0}}else Xe(c,11)}else if((i.K||c.g==i)&&An(c),!V(o))for(v=c.Da.g.parse(o),o=0;o<v.length;o++){let L=v[o];if(c.T=L[0],L=L[1],c.G==2)if(L[0]=="c"){c.K=L[1],c.ia=L[2];const Z=L[3];Z!=null&&(c.la=Z,c.j.info("VER="+c.la));const Q=L[4];Q!=null&&(c.Aa=Q,c.j.info("SVER="+c.Aa));const gt=L[5];gt!=null&&typeof gt=="number"&&0<gt&&(h=1.5*gt,c.L=h,c.j.info("backChannelRequestTimeoutMs_="+h)),h=c;const le=i.g;if(le){const Sn=le.g?le.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Sn){var I=h.h;I.g||Sn.indexOf("spdy")==-1&&Sn.indexOf("quic")==-1&&Sn.indexOf("h2")==-1||(I.j=I.l,I.g=new Set,I.h&&(yi(I,I.h),I.h=null))}if(h.D){const Ti=le.g?le.g.getResponseHeader("X-HTTP-Session-Id"):null;Ti&&(h.ya=Ti,B(h.I,h.D,Ti))}}c.G=3,c.l&&c.l.ua(),c.ba&&(c.R=Date.now()-i.F,c.j.info("Handshake RTT: "+c.R+"ms")),h=c;var A=i;if(h.qa=us(h,h.J?h.ia:null,h.W),A.K){Vr(h.h,A);var j=A,K=h.L;K&&(j.I=K),j.B&&(gi(j),gn(j)),h.g=A}else os(h);0<c.i.length&&Tn(c)}else L[0]!="stop"&&L[0]!="close"||Xe(c,7);else c.G==3&&(L[0]=="stop"||L[0]=="close"?L[0]=="stop"?Xe(c,7):wi(c):L[0]!="noop"&&c.l&&c.l.ta(L),c.v=0)}}Pt(4)}catch{}}var tc=class{constructor(i,o){this.g=i,this.map=o}};function xr(i){this.l=i||10,u.PerformanceNavigationTiming?(i=u.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(u.chrome&&u.chrome.loadTimes&&u.chrome.loadTimes()&&u.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Fr(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function jr(i){return i.h?1:i.g?i.g.size:0}function _i(i,o){return i.h?i.h==o:i.g?i.g.has(o):!1}function yi(i,o){i.g?i.g.add(o):i.h=o}function Vr(i,o){i.h&&i.h==o?i.h=null:i.g&&i.g.has(o)&&i.g.delete(o)}xr.prototype.cancel=function(){if(this.i=Br(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function Br(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let o=i.i;for(const c of i.g.values())o=o.concat(c.D);return o}return U(i.i)}function nc(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(f(i)){for(var o=[],c=i.length,h=0;h<c;h++)o.push(i[h]);return o}o=[],c=0;for(h in i)o[c++]=i[h];return o}function ic(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(f(i)||typeof i=="string"){var o=[];i=i.length;for(var c=0;c<i;c++)o.push(c);return o}o=[],c=0;for(const h in i)o[c++]=h;return o}}}function Hr(i,o){if(i.forEach&&typeof i.forEach=="function")i.forEach(o,void 0);else if(f(i)||typeof i=="string")Array.prototype.forEach.call(i,o,void 0);else for(var c=ic(i),h=nc(i),v=h.length,I=0;I<v;I++)o.call(void 0,h[I],c&&c[I],i)}var $r=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function rc(i,o){if(i){i=i.split("&");for(var c=0;c<i.length;c++){var h=i[c].indexOf("="),v=null;if(0<=h){var I=i[c].substring(0,h);v=i[c].substring(h+1)}else I=i[c];o(I,v?decodeURIComponent(v.replace(/\+/g," ")):"")}}}function Je(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof Je){this.h=i.h,mn(this,i.j),this.o=i.o,this.g=i.g,_n(this,i.s),this.l=i.l;var o=i.i,c=new Mt;c.i=o.i,o.g&&(c.g=new Map(o.g),c.h=o.h),Wr(this,c),this.m=i.m}else i&&(o=String(i).match($r))?(this.h=!1,mn(this,o[1]||"",!0),this.o=Lt(o[2]||""),this.g=Lt(o[3]||"",!0),_n(this,o[4]),this.l=Lt(o[5]||"",!0),Wr(this,o[6]||"",!0),this.m=Lt(o[7]||"")):(this.h=!1,this.i=new Mt(null,this.h))}Je.prototype.toString=function(){var i=[],o=this.j;o&&i.push(Ut(o,zr,!0),":");var c=this.g;return(c||o=="file")&&(i.push("//"),(o=this.o)&&i.push(Ut(o,zr,!0),"@"),i.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.s,c!=null&&i.push(":",String(c))),(c=this.l)&&(this.g&&c.charAt(0)!="/"&&i.push("/"),i.push(Ut(c,c.charAt(0)=="/"?ac:oc,!0))),(c=this.i.toString())&&i.push("?",c),(c=this.m)&&i.push("#",Ut(c,lc)),i.join("")};function Se(i){return new Je(i)}function mn(i,o,c){i.j=c?Lt(o,!0):o,i.j&&(i.j=i.j.replace(/:$/,""))}function _n(i,o){if(o){if(o=Number(o),isNaN(o)||0>o)throw Error("Bad port number "+o);i.s=o}else i.s=null}function Wr(i,o,c){o instanceof Mt?(i.i=o,hc(i.i,i.h)):(c||(o=Ut(o,cc)),i.i=new Mt(o,i.h))}function B(i,o,c){i.i.set(o,c)}function yn(i){return B(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function Lt(i,o){return i?o?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function Ut(i,o,c){return typeof i=="string"?(i=encodeURI(i).replace(o,sc),c&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function sc(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var zr=/[#\/\?@]/g,oc=/[#\?:]/g,ac=/[#\?]/g,cc=/[#\?@]/g,lc=/#/g;function Mt(i,o){this.h=this.g=null,this.i=i||null,this.j=!!o}function Me(i){i.g||(i.g=new Map,i.h=0,i.i&&rc(i.i,function(o,c){i.add(decodeURIComponent(o.replace(/\+/g," ")),c)}))}t=Mt.prototype,t.add=function(i,o){Me(this),this.i=null,i=ft(this,i);var c=this.g.get(i);return c||this.g.set(i,c=[]),c.push(o),this.h+=1,this};function qr(i,o){Me(i),o=ft(i,o),i.g.has(o)&&(i.i=null,i.h-=i.g.get(o).length,i.g.delete(o))}function Gr(i,o){return Me(i),o=ft(i,o),i.g.has(o)}t.forEach=function(i,o){Me(this),this.g.forEach(function(c,h){c.forEach(function(v){i.call(o,v,h,this)},this)},this)},t.na=function(){Me(this);const i=Array.from(this.g.values()),o=Array.from(this.g.keys()),c=[];for(let h=0;h<o.length;h++){const v=i[h];for(let I=0;I<v.length;I++)c.push(o[h])}return c},t.V=function(i){Me(this);let o=[];if(typeof i=="string")Gr(this,i)&&(o=o.concat(this.g.get(ft(this,i))));else{i=Array.from(this.g.values());for(let c=0;c<i.length;c++)o=o.concat(i[c])}return o},t.set=function(i,o){return Me(this),this.i=null,i=ft(this,i),Gr(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[o]),this.h+=1,this},t.get=function(i,o){return i?(i=this.V(i),0<i.length?String(i[0]):o):o};function Kr(i,o,c){qr(i,o),0<c.length&&(i.i=null,i.g.set(ft(i,o),U(c)),i.h+=c.length)}t.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],o=Array.from(this.g.keys());for(var c=0;c<o.length;c++){var h=o[c];const I=encodeURIComponent(String(h)),A=this.V(h);for(h=0;h<A.length;h++){var v=I;A[h]!==""&&(v+="="+encodeURIComponent(String(A[h]))),i.push(v)}}return this.i=i.join("&")};function ft(i,o){return o=String(o),i.j&&(o=o.toLowerCase()),o}function hc(i,o){o&&!i.j&&(Me(i),i.i=null,i.g.forEach(function(c,h){var v=h.toLowerCase();h!=v&&(qr(this,h),Kr(this,v,c))},i)),i.j=o}function uc(i,o){const c=new Nt;if(u.Image){const h=new Image;h.onload=P(xe,c,"TestLoadImage: loaded",!0,o,h),h.onerror=P(xe,c,"TestLoadImage: error",!1,o,h),h.onabort=P(xe,c,"TestLoadImage: abort",!1,o,h),h.ontimeout=P(xe,c,"TestLoadImage: timeout",!1,o,h),u.setTimeout(function(){h.ontimeout&&h.ontimeout()},1e4),h.src=i}else o(!1)}function dc(i,o){const c=new Nt,h=new AbortController,v=setTimeout(()=>{h.abort(),xe(c,"TestPingServer: timeout",!1,o)},1e4);fetch(i,{signal:h.signal}).then(I=>{clearTimeout(v),I.ok?xe(c,"TestPingServer: ok",!0,o):xe(c,"TestPingServer: server error",!1,o)}).catch(()=>{clearTimeout(v),xe(c,"TestPingServer: error",!1,o)})}function xe(i,o,c,h,v){try{v&&(v.onload=null,v.onerror=null,v.onabort=null,v.ontimeout=null),h(c)}catch{}}function fc(){this.g=new Ga}function pc(i,o,c){const h=c||"";try{Hr(i,function(v,I){let A=v;E(v)&&(A=oi(v)),o.push(h+I+"="+encodeURIComponent(A))})}catch(v){throw o.push(h+"type="+encodeURIComponent("_badmap")),v}}function vn(i){this.l=i.Ub||null,this.j=i.eb||!1}R(vn,ai),vn.prototype.g=function(){return new wn(this.l,this.j)},vn.prototype.i=function(i){return function(){return i}}({});function wn(i,o){Y.call(this),this.D=i,this.o=o,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}R(wn,Y),t=wn.prototype,t.open=function(i,o){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=o,this.readyState=1,Ft(this)},t.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const o={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(o.body=i),(this.D||u).fetch(new Request(this.A,o)).then(this.Sa.bind(this),this.ga.bind(this))},t.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,xt(this)),this.readyState=0},t.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,Ft(this)),this.g&&(this.readyState=3,Ft(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof u.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Jr(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function Jr(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}t.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var o=i.value?i.value:new Uint8Array(0);(o=this.v.decode(o,{stream:!i.done}))&&(this.response=this.responseText+=o)}i.done?xt(this):Ft(this),this.readyState==3&&Jr(this)}},t.Ra=function(i){this.g&&(this.response=this.responseText=i,xt(this))},t.Qa=function(i){this.g&&(this.response=i,xt(this))},t.ga=function(){this.g&&xt(this)};function xt(i){i.readyState=4,i.l=null,i.j=null,i.v=null,Ft(i)}t.setRequestHeader=function(i,o){this.u.append(i,o)},t.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},t.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],o=this.h.entries();for(var c=o.next();!c.done;)c=c.value,i.push(c[0]+": "+c[1]),c=o.next();return i.join(`\r
`)};function Ft(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(wn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Xr(i){let o="";return G(i,function(c,h){o+=h,o+=":",o+=c,o+=`\r
`}),o}function vi(i,o,c){e:{for(h in c){var h=!1;break e}h=!0}h||(c=Xr(c),typeof i=="string"?c!=null&&encodeURIComponent(String(c)):B(i,o,c))}function W(i){Y.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}R(W,Y);var gc=/^https?$/i,mc=["POST","PUT"];t=W.prototype,t.Ha=function(i){this.J=i},t.ea=function(i,o,c,h){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);o=o?o.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():di.g(),this.v=this.o?Rr(this.o):Rr(di),this.g.onreadystatechange=T(this.Ea,this);try{this.B=!0,this.g.open(o,String(i),!0),this.B=!1}catch(I){Yr(this,I);return}if(i=c||"",c=new Map(this.headers),h)if(Object.getPrototypeOf(h)===Object.prototype)for(var v in h)c.set(v,h[v]);else if(typeof h.keys=="function"&&typeof h.get=="function")for(const I of h.keys())c.set(I,h.get(I));else throw Error("Unknown input type for opt_headers: "+String(h));h=Array.from(c.keys()).find(I=>I.toLowerCase()=="content-type"),v=u.FormData&&i instanceof u.FormData,!(0<=Array.prototype.indexOf.call(mc,o,void 0))||h||v||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[I,A]of c)this.g.setRequestHeader(I,A);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{es(this),this.u=!0,this.g.send(i),this.u=!1}catch(I){Yr(this,I)}};function Yr(i,o){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=o,i.m=5,Zr(i),In(i)}function Zr(i){i.A||(i.A=!0,ee(i,"complete"),ee(i,"error"))}t.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,ee(this,"complete"),ee(this,"abort"),In(this))},t.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),In(this,!0)),W.aa.N.call(this)},t.Ea=function(){this.s||(this.B||this.u||this.j?Qr(this):this.bb())},t.bb=function(){Qr(this)};function Qr(i){if(i.h&&typeof l<"u"&&(!i.v[1]||be(i)!=4||i.Z()!=2)){if(i.u&&be(i)==4)Tr(i.Ea,0,i);else if(ee(i,"readystatechange"),be(i)==4){i.h=!1;try{const A=i.Z();e:switch(A){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var o=!0;break e;default:o=!1}var c;if(!(c=o)){var h;if(h=A===0){var v=String(i.D).match($r)[1]||null;!v&&u.self&&u.self.location&&(v=u.self.location.protocol.slice(0,-1)),h=!gc.test(v?v.toLowerCase():"")}c=h}if(c)ee(i,"complete"),ee(i,"success");else{i.m=6;try{var I=2<be(i)?i.g.statusText:""}catch{I=""}i.l=I+" ["+i.Z()+"]",Zr(i)}}finally{In(i)}}}}function In(i,o){if(i.g){es(i);const c=i.g,h=i.v[0]?()=>{}:null;i.g=null,i.v=null,o||ee(i,"ready");try{c.onreadystatechange=h}catch{}}}function es(i){i.I&&(u.clearTimeout(i.I),i.I=null)}t.isActive=function(){return!!this.g};function be(i){return i.g?i.g.readyState:0}t.Z=function(){try{return 2<be(this)?this.g.status:-1}catch{return-1}},t.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},t.Oa=function(i){if(this.g){var o=this.g.responseText;return i&&o.indexOf(i)==0&&(o=o.substring(i.length)),qa(o)}};function ts(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function _c(i){const o={};i=(i.g&&2<=be(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let h=0;h<i.length;h++){if(V(i[h]))continue;var c=_(i[h]);const v=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const I=o[v]||[];o[v]=I,I.push(c)}y(o,function(h){return h.join(", ")})}t.Ba=function(){return this.m},t.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function jt(i,o,c){return c&&c.internalChannelParams&&c.internalChannelParams[i]||o}function ns(i){this.Aa=0,this.i=[],this.j=new Nt,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=jt("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=jt("baseRetryDelayMs",5e3,i),this.cb=jt("retryDelaySeedMs",1e4,i),this.Wa=jt("forwardChannelMaxRetries",2,i),this.wa=jt("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new xr(i&&i.concurrentRequestLimit),this.Da=new fc,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}t=ns.prototype,t.la=8,t.G=1,t.connect=function(i,o,c,h){te(0),this.W=i,this.H=o||{},c&&h!==void 0&&(this.H.OSID=c,this.H.OAID=h),this.F=this.X,this.I=us(this,null,this.W),Tn(this)};function wi(i){if(is(i),i.G==3){var o=i.U++,c=Se(i.I);if(B(c,"SID",i.K),B(c,"RID",o),B(c,"TYPE","terminate"),Vt(i,c),o=new Ue(i,i.j,o),o.L=2,o.v=yn(Se(c)),c=!1,u.navigator&&u.navigator.sendBeacon)try{c=u.navigator.sendBeacon(o.v.toString(),"")}catch{}!c&&u.Image&&(new Image().src=o.v,c=!0),c||(o.g=ds(o.j,null),o.g.ea(o.v)),o.F=Date.now(),gn(o)}hs(i)}function En(i){i.g&&(Ei(i),i.g.cancel(),i.g=null)}function is(i){En(i),i.u&&(u.clearTimeout(i.u),i.u=null),An(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&u.clearTimeout(i.s),i.s=null)}function Tn(i){if(!Fr(i.h)&&!i.s){i.s=!0;var o=i.Ga;St||yr(),bt||(St(),bt=!0),Zn.add(o,i),i.B=0}}function yc(i,o){return jr(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=o.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=Ot(T(i.Ga,i,o),ls(i,i.B)),i.B++,!0)}t.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const v=new Ue(this,this.j,i);let I=this.o;if(this.S&&(I?(I=d(I),m(I,this.S)):I=this.S),this.m!==null||this.O||(v.H=I,I=null),this.P)e:{for(var o=0,c=0;c<this.i.length;c++){t:{var h=this.i[c];if("__data__"in h.map&&(h=h.map.__data__,typeof h=="string")){h=h.length;break t}h=void 0}if(h===void 0)break;if(o+=h,4096<o){o=c;break e}if(o===4096||c===this.i.length-1){o=c+1;break e}}o=1e3}else o=1e3;o=ss(this,v,o),c=Se(this.I),B(c,"RID",i),B(c,"CVER",22),this.D&&B(c,"X-HTTP-Session-Id",this.D),Vt(this,c),I&&(this.O?o="headers="+encodeURIComponent(String(Xr(I)))+"&"+o:this.m&&vi(c,this.m,I)),yi(this.h,v),this.Ua&&B(c,"TYPE","init"),this.P?(B(c,"$req",o),B(c,"SID","null"),v.T=!0,pi(v,c,null)):pi(v,c,o),this.G=2}}else this.G==3&&(i?rs(this,i):this.i.length==0||Fr(this.h)||rs(this))};function rs(i,o){var c;o?c=o.l:c=i.U++;const h=Se(i.I);B(h,"SID",i.K),B(h,"RID",c),B(h,"AID",i.T),Vt(i,h),i.m&&i.o&&vi(h,i.m,i.o),c=new Ue(i,i.j,c,i.B+1),i.m===null&&(c.H=i.o),o&&(i.i=o.D.concat(i.i)),o=ss(i,c,1e3),c.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),yi(i.h,c),pi(c,h,o)}function Vt(i,o){i.H&&G(i.H,function(c,h){B(o,h,c)}),i.l&&Hr({},function(c,h){B(o,h,c)})}function ss(i,o,c){c=Math.min(i.i.length,c);var h=i.l?T(i.l.Na,i.l,i):null;e:{var v=i.i;let I=-1;for(;;){const A=["count="+c];I==-1?0<c?(I=v[0].g,A.push("ofs="+I)):I=0:A.push("ofs="+I);let j=!0;for(let K=0;K<c;K++){let L=v[K].g;const Z=v[K].map;if(L-=I,0>L)I=Math.max(0,v[K].g-100),j=!1;else try{pc(Z,A,"req"+L+"_")}catch{h&&h(Z)}}if(j){h=A.join("&");break e}}}return i=i.i.splice(0,c),o.D=i,h}function os(i){if(!i.g&&!i.u){i.Y=1;var o=i.Fa;St||yr(),bt||(St(),bt=!0),Zn.add(o,i),i.v=0}}function Ii(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=Ot(T(i.Fa,i),ls(i,i.v)),i.v++,!0)}t.Fa=function(){if(this.u=null,as(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=Ot(T(this.ab,this),i)}},t.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,te(10),En(this),as(this))};function Ei(i){i.A!=null&&(u.clearTimeout(i.A),i.A=null)}function as(i){i.g=new Ue(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var o=Se(i.qa);B(o,"RID","rpc"),B(o,"SID",i.K),B(o,"AID",i.T),B(o,"CI",i.F?"0":"1"),!i.F&&i.ja&&B(o,"TO",i.ja),B(o,"TYPE","xmlhttp"),Vt(i,o),i.m&&i.o&&vi(o,i.m,i.o),i.L&&(i.g.I=i.L);var c=i.g;i=i.ia,c.L=1,c.v=yn(Se(o)),c.m=null,c.P=!0,Lr(c,i)}t.Za=function(){this.C!=null&&(this.C=null,En(this),Ii(this),te(19))};function An(i){i.C!=null&&(u.clearTimeout(i.C),i.C=null)}function cs(i,o){var c=null;if(i.g==o){An(i),Ei(i),i.g=null;var h=2}else if(_i(i.h,o))c=o.D,Vr(i.h,o),h=1;else return;if(i.G!=0){if(o.o)if(h==1){c=o.m?o.m.length:0,o=Date.now()-o.F;var v=i.B;h=hi(),ee(h,new Or(h,c)),Tn(i)}else os(i);else if(v=o.s,v==3||v==0&&0<o.X||!(h==1&&yc(i,o)||h==2&&Ii(i)))switch(c&&0<c.length&&(o=i.h,o.i=o.i.concat(c)),v){case 1:Xe(i,5);break;case 4:Xe(i,10);break;case 3:Xe(i,6);break;default:Xe(i,2)}}}function ls(i,o){let c=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(c*=2),c*o}function Xe(i,o){if(i.j.info("Error code "+o),o==2){var c=T(i.fb,i),h=i.Xa;const v=!h;h=new Je(h||"//www.google.com/images/cleardot.gif"),u.location&&u.location.protocol=="http"||mn(h,"https"),yn(h),v?uc(h.toString(),c):dc(h.toString(),c)}else te(2);i.G=0,i.l&&i.l.sa(o),hs(i),is(i)}t.fb=function(i){i?(this.j.info("Successfully pinged google.com"),te(2)):(this.j.info("Failed to ping google.com"),te(1))};function hs(i){if(i.G=0,i.ka=[],i.l){const o=Br(i.h);(o.length!=0||i.i.length!=0)&&(C(i.ka,o),C(i.ka,i.i),i.h.i.length=0,U(i.i),i.i.length=0),i.l.ra()}}function us(i,o,c){var h=c instanceof Je?Se(c):new Je(c);if(h.g!="")o&&(h.g=o+"."+h.g),_n(h,h.s);else{var v=u.location;h=v.protocol,o=o?o+"."+v.hostname:v.hostname,v=+v.port;var I=new Je(null);h&&mn(I,h),o&&(I.g=o),v&&_n(I,v),c&&(I.l=c),h=I}return c=i.D,o=i.ya,c&&o&&B(h,c,o),B(h,"VER",i.la),Vt(i,h),h}function ds(i,o,c){if(o&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return o=i.Ca&&!i.pa?new W(new vn({eb:c})):new W(i.pa),o.Ha(i.J),o}t.isActive=function(){return!!this.l&&this.l.isActive(this)};function fs(){}t=fs.prototype,t.ua=function(){},t.ta=function(){},t.sa=function(){},t.ra=function(){},t.isActive=function(){return!0},t.Na=function(){};function ce(i,o){Y.call(this),this.g=new ns(o),this.l=i,this.h=o&&o.messageUrlParams||null,i=o&&o.messageHeaders||null,o&&o.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=o&&o.initMessageHeaders||null,o&&o.messageContentType&&(i?i["X-WebChannel-Content-Type"]=o.messageContentType:i={"X-WebChannel-Content-Type":o.messageContentType}),o&&o.va&&(i?i["X-WebChannel-Client-Profile"]=o.va:i={"X-WebChannel-Client-Profile":o.va}),this.g.S=i,(i=o&&o.Sb)&&!V(i)&&(this.g.m=i),this.v=o&&o.supportsCrossDomainXhr||!1,this.u=o&&o.sendRawJson||!1,(o=o&&o.httpSessionIdParam)&&!V(o)&&(this.g.D=o,i=this.h,i!==null&&o in i&&(i=this.h,o in i&&delete i[o])),this.j=new pt(this)}R(ce,Y),ce.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ce.prototype.close=function(){wi(this.g)},ce.prototype.o=function(i){var o=this.g;if(typeof i=="string"){var c={};c.__data__=i,i=c}else this.u&&(c={},c.__data__=oi(i),i=c);o.i.push(new tc(o.Ya++,i)),o.G==3&&Tn(o)},ce.prototype.N=function(){this.g.l=null,delete this.j,wi(this.g),delete this.g,ce.aa.N.call(this)};function ps(i){ci.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var o=i.__sm__;if(o){e:{for(const c in o){i=c;break e}i=void 0}(this.i=i)&&(i=this.i,o=o!==null&&i in o?o[i]:void 0),this.data=o}else this.data=i}R(ps,ci);function gs(){li.call(this),this.status=1}R(gs,li);function pt(i){this.g=i}R(pt,fs),pt.prototype.ua=function(){ee(this.g,"a")},pt.prototype.ta=function(i){ee(this.g,new ps(i))},pt.prototype.sa=function(i){ee(this.g,new gs)},pt.prototype.ra=function(){ee(this.g,"b")},ce.prototype.send=ce.prototype.o,ce.prototype.open=ce.prototype.m,ce.prototype.close=ce.prototype.close,ui.NO_ERROR=0,ui.TIMEOUT=8,ui.HTTP_ERROR=6,Qa.COMPLETE="complete",Ka.EventType=Ct,Ct.OPEN="a",Ct.CLOSE="b",Ct.ERROR="c",Ct.MESSAGE="d",Y.prototype.listen=Y.prototype.K,W.prototype.listenOnce=W.prototype.L,W.prototype.getLastError=W.prototype.Ka,W.prototype.getLastErrorCode=W.prototype.Ba,W.prototype.getStatus=W.prototype.Z,W.prototype.getResponseJson=W.prototype.Oa,W.prototype.getResponseText=W.prototype.oa,W.prototype.send=W.prototype.ea,W.prototype.setWithCredentials=W.prototype.Ha}).apply(typeof Rn<"u"?Rn:typeof self<"u"?self:typeof window<"u"?window:{});const Js="@firebase/firestore",Xs="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ie.UNAUTHENTICATED=new ie(null),ie.GOOGLE_CREDENTIALS=new ie("google-credentials-uid"),ie.FIRST_PARTY=new ie("first-party-uid"),ie.MOCK_USER=new ie("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let an="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Et=new Ki("@firebase/firestore");function de(t,...e){if(Et.logLevel<=x.DEBUG){const n=e.map(or);Et.debug(`Firestore (${an}): ${t}`,...n)}}function pa(t,...e){if(Et.logLevel<=x.ERROR){const n=e.map(or);Et.error(`Firestore (${an}): ${t}`,...n)}}function Sd(t,...e){if(Et.logLevel<=x.WARN){const n=e.map(or);Et.warn(`Firestore (${an}): ${t}`,...n)}}function or(t){if(typeof t=="string")return t;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(n){return JSON.stringify(n)}(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qt(t,e,n){let r="Unexpected state";typeof e=="string"?r=e:n=e,ga(t,r,n)}function ga(t,e,n){let r=`FIRESTORE (${an}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(n!==void 0)try{r+=" CONTEXT: "+JSON.stringify(n)}catch{r+=" CONTEXT: "+n}throw pa(r),new Error(r)}function qt(t,e,n,r){let s="Unexpected state";typeof n=="string"?s=n:r=n,t||ga(e,s,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class D extends Ee{constructor(e,n){super(e,n),this.code=e,this.message=n,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gt{constructor(){this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ma{constructor(e,n){this.user=n,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class bd{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,n){e.enqueueRetryable(()=>n(ie.UNAUTHENTICATED))}shutdown(){}}class Rd{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,n){this.changeListener=n,e.enqueueRetryable(()=>n(this.token.user))}shutdown(){this.changeListener=null}}class kd{constructor(e){this.t=e,this.currentUser=ie.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,n){qt(this.o===void 0,42304);let r=this.i;const s=f=>this.i!==r?(r=this.i,n(f)):Promise.resolve();let a=new Gt;this.o=()=>{this.i++,this.currentUser=this.u(),a.resolve(),a=new Gt,e.enqueueRetryable(()=>s(this.currentUser))};const l=()=>{const f=a;e.enqueueRetryable(async()=>{await f.promise,await s(this.currentUser)})},u=f=>{de("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=f,this.o&&(this.auth.addAuthTokenListener(this.o),l())};this.t.onInit(f=>u(f)),setTimeout(()=>{if(!this.auth){const f=this.t.getImmediate({optional:!0});f?u(f):(de("FirebaseAuthCredentialsProvider","Auth not yet detected"),a.resolve(),a=new Gt)}},0),l()}getToken(){const e=this.i,n=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(n).then(r=>this.i!==e?(de("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(qt(typeof r.accessToken=="string",31837,{l:r}),new ma(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return qt(e===null||typeof e=="string",2055,{h:e}),new ie(e)}}class Cd{constructor(e,n,r){this.P=e,this.T=n,this.I=r,this.type="FirstParty",this.user=ie.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Pd{constructor(e,n,r){this.P=e,this.T=n,this.I=r}getToken(){return Promise.resolve(new Cd(this.P,this.T,this.I))}start(e,n){e.enqueueRetryable(()=>n(ie.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Ys{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Od{constructor(e,n){this.V=n,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,oe(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,n){qt(this.o===void 0,3512);const r=a=>{a.error!=null&&de("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${a.error.message}`);const l=a.token!==this.m;return this.m=a.token,de("FirebaseAppCheckTokenProvider",`Received ${l?"new":"existing"} token.`),l?n(a.token):Promise.resolve()};this.o=a=>{e.enqueueRetryable(()=>r(a))};const s=a=>{de("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=a,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(a=>s(a)),setTimeout(()=>{if(!this.appCheck){const a=this.V.getImmediate({optional:!0});a?s(a):de("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Ys(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(n=>n?(qt(typeof n.token=="string",44558,{tokenResult:n}),this.m=n.token,new Ys(n.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nd(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(n);else for(let r=0;r<t;r++)n[r]=Math.floor(256*Math.random());return n}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dd(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ld{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",n=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=Nd(40);for(let a=0;a<s.length;++a)r.length<20&&s[a]<n&&(r+=e.charAt(s[a]%62))}return r}}function fe(t,e){return t<e?-1:t>e?1:0}function Ud(t,e){let n=0;for(;n<t.length&&n<e.length;){const r=t.codePointAt(n),s=e.codePointAt(n);if(r!==s){if(r<128&&s<128)return fe(r,s);{const a=Dd(),l=Md(a.encode(Zs(t,n)),a.encode(Zs(e,n)));return l!==0?l:fe(r,s)}}n+=r>65535?2:1}return fe(t.length,e.length)}function Zs(t,e){return t.codePointAt(e)>65535?t.substring(e,e+2):t.substring(e,e+1)}function Md(t,e){for(let n=0;n<t.length&&n<e.length;++n)if(t[n]!==e[n])return fe(t[n],e[n]);return fe(t.length,e.length)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qs="__name__";class ge{constructor(e,n,r){n===void 0?n=0:n>e.length&&Qt(637,{offset:n,range:e.length}),r===void 0?r=e.length-n:r>e.length-n&&Qt(1746,{length:r,range:e.length-n}),this.segments=e,this.offset=n,this.len=r}get length(){return this.len}isEqual(e){return ge.comparator(this,e)===0}child(e){const n=this.segments.slice(this.offset,this.limit());return e instanceof ge?e.forEach(r=>{n.push(r)}):n.push(e),this.construct(n)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let n=0;n<this.length;n++)if(this.get(n)!==e.get(n))return!1;return!0}forEach(e){for(let n=this.offset,r=this.limit();n<r;n++)e(this.segments[n])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,n){const r=Math.min(e.length,n.length);for(let s=0;s<r;s++){const a=ge.compareSegments(e.get(s),n.get(s));if(a!==0)return a}return fe(e.length,n.length)}static compareSegments(e,n){const r=ge.isNumericId(e),s=ge.isNumericId(n);return r&&!s?-1:!r&&s?1:r&&s?ge.extractNumericId(e).compare(ge.extractNumericId(n)):Ud(e,n)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return sr.fromString(e.substring(4,e.length-2))}}class he extends ge{construct(e,n,r){return new he(e,n,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const n=[];for(const r of e){if(r.indexOf("//")>=0)throw new D(N.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);n.push(...r.split("/").filter(s=>s.length>0))}return new he(n)}static emptyPath(){return new he([])}}const xd=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class Ze extends ge{construct(e,n,r){return new Ze(e,n,r)}static isValidIdentifier(e){return xd.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Ze.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Qs}static keyField(){return new Ze([Qs])}static fromServerFormat(e){const n=[];let r="",s=0;const a=()=>{if(r.length===0)throw new D(N.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);n.push(r),r=""};let l=!1;for(;s<e.length;){const u=e[s];if(u==="\\"){if(s+1===e.length)throw new D(N.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const f=e[s+1];if(f!=="\\"&&f!=="."&&f!=="`")throw new D(N.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=f,s+=2}else u==="`"?(l=!l,s++):u!=="."||l?(r+=u,s++):(a(),s++)}if(a(),l)throw new D(N.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Ze(n)}static emptyPath(){return new Ze([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qe{constructor(e){this.path=e}static fromPath(e){return new Qe(he.fromString(e))}static fromName(e){return new Qe(he.fromString(e).popFirst(5))}static empty(){return new Qe(he.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&he.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,n){return he.comparator(e.path,n.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Qe(new he(e.slice()))}}function Fd(t,e,n,r){if(e===!0&&r===!0)throw new D(N.INVALID_ARGUMENT,`${t} and ${n} cannot be used together.`)}function jd(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function Vd(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":Qt(12329,{type:typeof t})}function Bd(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new D(N.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const n=Vd(t);throw new D(N.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${n}`)}}return t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function z(t,e){const n={typeString:t};return e&&(n.value=e),n}function cn(t,e){if(!jd(t))throw new D(N.INVALID_ARGUMENT,"JSON must be an object");let n;for(const r in e)if(e[r]){const s=e[r].typeString,a="value"in e[r]?{value:e[r].value}:void 0;if(!(r in t)){n=`JSON missing required field: '${r}'`;break}const l=t[r];if(s&&typeof l!==s){n=`JSON field '${r}' must be a ${s}.`;break}if(a!==void 0&&l!==a.value){n=`Expected '${r}' field to equal '${a.value}'`;break}}if(n)throw new D(N.INVALID_ARGUMENT,n);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eo=-62135596800,to=1e6;class me{static now(){return me.fromMillis(Date.now())}static fromDate(e){return me.fromMillis(e.getTime())}static fromMillis(e){const n=Math.floor(e/1e3),r=Math.floor((e-1e3*n)*to);return new me(n,r)}constructor(e,n){if(this.seconds=e,this.nanoseconds=n,n<0)throw new D(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(n>=1e9)throw new D(N.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+n);if(e<eo)throw new D(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new D(N.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/to}_compareTo(e){return this.seconds===e.seconds?fe(this.nanoseconds,e.nanoseconds):fe(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:me._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(cn(e,me._jsonSchema))return new me(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-eo;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}me._jsonSchemaVersion="firestore/timestamp/1.0",me._jsonSchema={type:z("string",me._jsonSchemaVersion),seconds:z("number"),nanoseconds:z("number")};function Hd(t){return t.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $d extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e){this.binaryString=e}static fromBase64String(e){const n=function(s){try{return atob(s)}catch(a){throw typeof DOMException<"u"&&a instanceof DOMException?new $d("Invalid base64 string: "+a):a}}(e);return new at(n)}static fromUint8Array(e){const n=function(s){let a="";for(let l=0;l<s.length;++l)a+=String.fromCharCode(s[l]);return a}(e);return new at(n)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(n){return btoa(n)}(this.binaryString)}toUint8Array(){return function(n){const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return fe(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}at.EMPTY_BYTE_STRING=new at("");const Hi="(default)";class Wn{constructor(e,n){this.projectId=e,this.database=n||Hi}static empty(){return new Wn("","")}get isDefaultDatabase(){return this.database===Hi}isEqual(e){return e instanceof Wn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wd{constructor(e,n=null,r=[],s=[],a=null,l="F",u=null,f=null){this.path=e,this.collectionGroup=n,this.explicitOrderBy=r,this.filters=s,this.limit=a,this.limitType=l,this.startAt=u,this.endAt=f,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function zd(t){return new Wd(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var no,O;(O=no||(no={}))[O.OK=0]="OK",O[O.CANCELLED=1]="CANCELLED",O[O.UNKNOWN=2]="UNKNOWN",O[O.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",O[O.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",O[O.NOT_FOUND=5]="NOT_FOUND",O[O.ALREADY_EXISTS=6]="ALREADY_EXISTS",O[O.PERMISSION_DENIED=7]="PERMISSION_DENIED",O[O.UNAUTHENTICATED=16]="UNAUTHENTICATED",O[O.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",O[O.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",O[O.ABORTED=10]="ABORTED",O[O.OUT_OF_RANGE=11]="OUT_OF_RANGE",O[O.UNIMPLEMENTED=12]="UNIMPLEMENTED",O[O.INTERNAL=13]="INTERNAL",O[O.UNAVAILABLE=14]="UNAVAILABLE",O[O.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new sr([4294967295,4294967295],0);/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qd=41943040;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gd=1048576;function Oi(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kd{constructor(e,n,r=1e3,s=1.5,a=6e4){this.Fi=e,this.timerId=n,this.d_=r,this.E_=s,this.A_=a,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const n=Math.floor(this.R_+this.p_()),r=Math.max(0,Date.now()-this.m_),s=Math.max(0,n-r);s>0&&de("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.R_} ms, delay with jitter: ${n} ms, last attempt: ${r} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,s,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar{constructor(e,n,r,s,a){this.asyncQueue=e,this.timerId=n,this.targetTimeMs=r,this.op=s,this.removalCallback=a,this.deferred=new Gt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(l=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,n,r,s,a){const l=Date.now()+r,u=new ar(e,n,l,s,a);return u.start(r),u}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(N.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var io,ro;(ro=io||(io={})).Fa="default",ro.Cache="cache";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jd(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const so=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _a="firestore.googleapis.com",oo=!0;class ao{constructor(e){var n,r;if(e.host===void 0){if(e.ssl!==void 0)throw new D(N.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=_a,this.ssl=oo}else this.host=e.host,this.ssl=(n=e.ssl)!==null&&n!==void 0?n:oo;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=qd;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Gd)throw new D(N.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Fd("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Jd((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(a){if(a.timeoutSeconds!==void 0){if(isNaN(a.timeoutSeconds))throw new D(N.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (must not be NaN)`);if(a.timeoutSeconds<5)throw new D(N.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (minimum allowed value is 5)`);if(a.timeoutSeconds>30)throw new D(N.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ya{constructor(e,n,r,s){this._authCredentials=e,this._appCheckCredentials=n,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new ao({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(N.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new D(N.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new ao(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new bd;switch(r.type){case"firstParty":return new Pd(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new D(N.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(n){const r=so.get(n);r&&(de("ComponentProvider","Removing Datastore"),so.delete(n),r.terminate())}(this),Promise.resolve()}}function Xd(t,e,n,r={}){var s;t=Bd(t,ya);const a=lt(e),l=t._getSettings(),u=Object.assign(Object.assign({},l),{emulatorOptions:t._getEmulatorOptions()}),f=`${e}:${n}`;a&&(qi(`https://${f}`),Gi("Firestore",!0)),l.host!==_a&&l.host!==f&&Sd("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const E=Object.assign(Object.assign({},l),{host:f,ssl:a,emulatorOptions:r});if(!it(E,u)&&(t._setSettings(E),r.mockUserToken)){let S,b;if(typeof r.mockUserToken=="string")S=r.mockUserToken,b=ie.MOCK_USER;else{S=Ro(r.mockUserToken,(s=t._app)===null||s===void 0?void 0:s.options.projectId);const T=r.mockUserToken.sub||r.mockUserToken.user_id;if(!T)throw new D(N.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");b=new ie(T)}t._authCredentials=new Rd(new ma(S,b))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cr{constructor(e,n,r){this.converter=n,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new cr(this.firestore,e,this._query)}}class _e{constructor(e,n,r){this.converter=n,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new lr(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new _e(this.firestore,e,this._key)}toJSON(){return{type:_e._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,n,r){if(cn(n,_e._jsonSchema))return new _e(e,r||null,new Qe(he.fromString(n.referencePath)))}}_e._jsonSchemaVersion="firestore/documentReference/1.0",_e._jsonSchema={type:z("string",_e._jsonSchemaVersion),referencePath:z("string")};class lr extends cr{constructor(e,n,r){super(e,n,zd(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new _e(this.firestore,null,new Qe(e))}withConverter(e){return new lr(this.firestore,e,this._path)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const co="AsyncQueue";class lo{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new Kd(this,"async_queue_retry"),this.oc=()=>{const r=Oi();r&&de(co,"Visibility state changed to "+r.visibilityState),this.F_.y_()},this._c=e;const n=Oi();n&&typeof n.addEventListener=="function"&&n.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const n=Oi();n&&typeof n.removeEventListener=="function"&&n.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const n=new Gt;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(n.resolve,n.reject),n.promise)).then(()=>n.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!Hd(e))throw e;de(co,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const n=this._c.then(()=>(this.nc=!0,e().catch(r=>{throw this.tc=r,this.nc=!1,pa("INTERNAL UNHANDLED ERROR: ",ho(r)),r}).then(r=>(this.nc=!1,r))));return this._c=n,n}enqueueAfterDelay(e,n,r){this.ac(),this.sc.indexOf(e)>-1&&(n=0);const s=ar.createAndSchedule(this,e,n,r,a=>this.lc(a));return this.ec.push(s),s}ac(){this.tc&&Qt(47125,{hc:ho(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const n of this.ec)if(n.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((n,r)=>n.targetTimeMs-r.targetTimeMs);for(const n of this.ec)if(n.skipDelay(),e!=="all"&&n.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const n=this.ec.indexOf(e);this.ec.splice(n,1)}}function ho(t){let e=t.message||"";return t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+`
`+t.stack),e}class Yd extends ya{constructor(e,n,r,s){super(e,n,r,s),this.type="firestore",this._queue=new lo,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new lo(e),this._firestoreClient=void 0,await e}}}function Zd(t,e){const n=typeof t=="object"?t:qn(),r=typeof t=="string"?t:Hi,s=zn(n,"firestore").getImmediate({identifier:r});if(!s._initialized){const a=Ao("firestore");a&&Xd(s,...a)}return s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Re(at.fromBase64String(e))}catch(n){throw new D(N.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+n)}}static fromUint8Array(e){return new Re(at.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Re._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(cn(e,Re._jsonSchema))return Re.fromBase64String(e.bytes)}}Re._jsonSchemaVersion="firestore/bytes/1.0",Re._jsonSchema={type:z("string",Re._jsonSchemaVersion),bytes:z("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va{constructor(...e){for(let n=0;n<e.length;++n)if(e[n].length===0)throw new D(N.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Ze(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(e,n){if(!isFinite(e)||e<-90||e>90)throw new D(N.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(n)||n<-180||n>180)throw new D(N.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+n);this._lat=e,this._long=n}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return fe(this._lat,e._lat)||fe(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:et._jsonSchemaVersion}}static fromJSON(e){if(cn(e,et._jsonSchema))return new et(e.latitude,e.longitude)}}et._jsonSchemaVersion="firestore/geoPoint/1.0",et._jsonSchema={type:z("string",et._jsonSchemaVersion),latitude:z("number"),longitude:z("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt{constructor(e){this._values=(e||[]).map(n=>n)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let a=0;a<r.length;++a)if(r[a]!==s[a])return!1;return!0}(this._values,e._values)}toJSON(){return{type:tt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(cn(e,tt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(n=>typeof n=="number"))return new tt(e.vectorValues);throw new D(N.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}tt._jsonSchemaVersion="firestore/vectorValue/1.0",tt._jsonSchema={type:z("string",tt._jsonSchemaVersion),vectorValues:z("object")};const Qd=new RegExp("[~\\*/\\[\\]]");function ef(t,e,n){if(e.search(Qd)>=0)throw uo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t);try{return new va(...e.split("."))._internalPath}catch{throw uo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t)}}function uo(t,e,n,r,s){let a=`Function ${e}() called with invalid data`;a+=". ";let l="";return new D(N.INVALID_ARGUMENT,a+t+l)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wa{constructor(e,n,r,s,a){this._firestore=e,this._userDataWriter=n,this._key=r,this._document=s,this._converter=a}get id(){return this._key.path.lastSegment()}get ref(){return new _e(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new tf(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const n=this._document.data.field(Ia("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n)}}}class tf extends wa{data(){return super.data()}}function Ia(t,e){return typeof e=="string"?ef(t,e):e instanceof va?e._internalPath:e._delegate._internalPath}class kn{constructor(e,n){this.hasPendingWrites=e,this.fromCache=n}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class wt extends wa{constructor(e,n,r,s,a,l){super(e,n,r,s,l),this._firestore=e,this._firestoreImpl=e,this.metadata=a}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const n=new Un(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(n,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,n={}){if(this._document){const r=this._document.data.field(Ia("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,n.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(N.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,n={};return n.type=wt._jsonSchemaVersion,n.bundle="",n.bundleSource="DocumentSnapshot",n.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?n:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),n.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),n)}}wt._jsonSchemaVersion="firestore/documentSnapshot/1.0",wt._jsonSchema={type:z("string",wt._jsonSchemaVersion),bundleSource:z("string","DocumentSnapshot"),bundleName:z("string"),bundle:z("string")};class Un extends wt{data(e={}){return super.data(e)}}class Kt{constructor(e,n,r,s){this._firestore=e,this._userDataWriter=n,this._snapshot=s,this.metadata=new kn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(n=>e.push(n)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,n){this._snapshot.docs.forEach(r=>{e.call(n,new Un(this._firestore,this._userDataWriter,r.key,r,new kn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const n=!!e.includeMetadataChanges;if(n&&this._snapshot.excludesMetadataChanges)throw new D(N.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===n||(this._cachedChanges=function(s,a){if(s._snapshot.oldDocs.isEmpty()){let l=0;return s._snapshot.docChanges.map(u=>{const f=new Un(s._firestore,s._userDataWriter,u.doc.key,u.doc,new kn(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);return u.doc,{type:"added",doc:f,oldIndex:-1,newIndex:l++}})}{let l=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(u=>a||u.type!==3).map(u=>{const f=new Un(s._firestore,s._userDataWriter,u.doc.key,u.doc,new kn(s._snapshot.mutatedKeys.has(u.doc.key),s._snapshot.fromCache),s.query.converter);let E=-1,S=-1;return u.type!==0&&(E=l.indexOf(u.doc.key),l=l.delete(u.doc.key)),u.type!==1&&(l=l.add(u.doc),S=l.indexOf(u.doc.key)),{type:nf(u.type),doc:f,oldIndex:E,newIndex:S}})}}(this,n),this._cachedChangesIncludeMetadataChanges=n),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(N.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Kt._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Ld.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const n=[],r=[],s=[];return this.docs.forEach(a=>{a._document!==null&&(n.push(a._document),r.push(this._userDataWriter.convertObjectMap(a._document.data.value.mapValue.fields,"previous")),s.push(a.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function nf(t){switch(t){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return Qt(61501,{type:t})}}Kt._jsonSchemaVersion="firestore/querySnapshot/1.0",Kt._jsonSchema={type:z("string",Kt._jsonSchemaVersion),bundleSource:z("string","QuerySnapshot"),bundleName:z("string"),bundle:z("string")};(function(e,n=!0){(function(s){an=s})(ht),rt(new qe("firestore",(r,{instanceIdentifier:s,options:a})=>{const l=r.getProvider("app").getImmediate(),u=new Yd(new kd(r.getProvider("auth-internal")),new Od(l,r.getProvider("app-check-internal")),function(E,S){if(!Object.prototype.hasOwnProperty.apply(E.options,["projectId"]))throw new D(N.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Wn(E.options.projectId,S)}(l,s),l);return a=Object.assign({useFetchStreams:n},a),u._setSettings(a),u},"PUBLIC").setMultipleInstances(!0)),ve(Js,Xs,e),ve(Js,Xs,"esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ea="firebasestorage.googleapis.com",Ta="storageBucket",rf=2*60*1e3,sf=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $ extends Ee{constructor(e,n,r=0){super(Ni(e),`Firebase Storage: ${n} (${Ni(e)})`),this.status_=r,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,$.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return Ni(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var H;(function(t){t.UNKNOWN="unknown",t.OBJECT_NOT_FOUND="object-not-found",t.BUCKET_NOT_FOUND="bucket-not-found",t.PROJECT_NOT_FOUND="project-not-found",t.QUOTA_EXCEEDED="quota-exceeded",t.UNAUTHENTICATED="unauthenticated",t.UNAUTHORIZED="unauthorized",t.UNAUTHORIZED_APP="unauthorized-app",t.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",t.INVALID_CHECKSUM="invalid-checksum",t.CANCELED="canceled",t.INVALID_EVENT_NAME="invalid-event-name",t.INVALID_URL="invalid-url",t.INVALID_DEFAULT_BUCKET="invalid-default-bucket",t.NO_DEFAULT_BUCKET="no-default-bucket",t.CANNOT_SLICE_BLOB="cannot-slice-blob",t.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",t.NO_DOWNLOAD_URL="no-download-url",t.INVALID_ARGUMENT="invalid-argument",t.INVALID_ARGUMENT_COUNT="invalid-argument-count",t.APP_DELETED="app-deleted",t.INVALID_ROOT_OPERATION="invalid-root-operation",t.INVALID_FORMAT="invalid-format",t.INTERNAL_ERROR="internal-error",t.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(H||(H={}));function Ni(t){return"storage/"+t}function hr(){const t="An unknown error occurred, please check the error payload for server response.";return new $(H.UNKNOWN,t)}function of(t){return new $(H.OBJECT_NOT_FOUND,"Object '"+t+"' does not exist.")}function af(t){return new $(H.QUOTA_EXCEEDED,"Quota for bucket '"+t+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function cf(){const t="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new $(H.UNAUTHENTICATED,t)}function lf(){return new $(H.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function hf(t){return new $(H.UNAUTHORIZED,"User does not have permission to access '"+t+"'.")}function uf(){return new $(H.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function df(){return new $(H.CANCELED,"User canceled the upload/download.")}function ff(t){return new $(H.INVALID_URL,"Invalid URL '"+t+"'.")}function pf(t){return new $(H.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+t+"'.")}function gf(){return new $(H.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Ta+"' property when initializing the app?")}function mf(){return new $(H.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function _f(){return new $(H.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function yf(t){return new $(H.UNSUPPORTED_ENVIRONMENT,`${t} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function $i(t){return new $(H.INVALID_ARGUMENT,t)}function Aa(){return new $(H.APP_DELETED,"The Firebase app was deleted.")}function vf(t){return new $(H.INVALID_ROOT_OPERATION,"The operation '"+t+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function Jt(t,e){return new $(H.INVALID_FORMAT,"String does not match format '"+t+"': "+e)}function Bt(t){throw new $(H.INTERNAL_ERROR,"Internal error: "+t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e,n){this.bucket=e,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,n){let r;try{r=re.makeFromUrl(e,n)}catch{return new re(e,"")}if(r.path==="")return r;throw pf(e)}static makeFromUrl(e,n){let r=null;const s="([A-Za-z0-9.\\-_]+)";function a(F){F.path.charAt(F.path.length-1)==="/"&&(F.path_=F.path_.slice(0,-1))}const l="(/(.*))?$",u=new RegExp("^gs://"+s+l,"i"),f={bucket:1,path:3};function E(F){F.path_=decodeURIComponent(F.path)}const S="v[A-Za-z0-9_]+",b=n.replace(/[.]/g,"\\."),T="(/([^?#]*).*)?$",P=new RegExp(`^https?://${b}/${S}/b/${s}/o${T}`,"i"),R={bucket:1,path:3},U=n===Ea?"(?:storage.googleapis.com|storage.cloud.google.com)":n,C="([^?#]*)",q=new RegExp(`^https?://${U}/${s}/${C}`,"i"),M=[{regex:u,indices:f,postModify:a},{regex:P,indices:R,postModify:E},{regex:q,indices:{bucket:1,path:2},postModify:E}];for(let F=0;F<M.length;F++){const ae=M[F],G=ae.regex.exec(e);if(G){const y=G[ae.indices.bucket];let d=G[ae.indices.path];d||(d=""),r=new re(y,d),ae.postModify(r);break}}if(r==null)throw ff(e);return r}}class wf{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function If(t,e,n){let r=1,s=null,a=null,l=!1,u=0;function f(){return u===2}let E=!1;function S(...C){E||(E=!0,e.apply(null,C))}function b(C){s=setTimeout(()=>{s=null,t(P,f())},C)}function T(){a&&clearTimeout(a)}function P(C,...q){if(E){T();return}if(C){T(),S.call(null,C,...q);return}if(f()||l){T(),S.call(null,C,...q);return}r<64&&(r*=2);let M;u===1?(u=2,M=0):M=(r+Math.random())*1e3,b(M)}let R=!1;function U(C){R||(R=!0,T(),!E&&(s!==null?(C||(u=2),clearTimeout(s),b(0)):C||(u=1)))}return b(0),a=setTimeout(()=>{l=!0,U(!0)},n),U}function Ef(t){t(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Tf(t){return t!==void 0}function Af(t){return typeof t=="object"&&!Array.isArray(t)}function ur(t){return typeof t=="string"||t instanceof String}function fo(t){return dr()&&t instanceof Blob}function dr(){return typeof Blob<"u"}function Wi(t,e,n,r){if(r<e)throw $i(`Invalid value for '${t}'. Expected ${e} or greater.`);if(r>n)throw $i(`Invalid value for '${t}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ln(t,e,n){let r=e;return n==null&&(r=`https://${e}`),`${n}://${r}/v0${t}`}function Sa(t){const e=encodeURIComponent;let n="?";for(const r in t)if(t.hasOwnProperty(r)){const s=e(r)+"="+e(t[r]);n=n+s+"&"}return n=n.slice(0,-1),n}var nt;(function(t){t[t.NO_ERROR=0]="NO_ERROR",t[t.NETWORK_ERROR=1]="NETWORK_ERROR",t[t.ABORT=2]="ABORT"})(nt||(nt={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sf(t,e){const n=t>=500&&t<600,s=[408,429].indexOf(t)!==-1,a=e.indexOf(t)!==-1;return n||s||a}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bf{constructor(e,n,r,s,a,l,u,f,E,S,b,T=!0,P=!1){this.url_=e,this.method_=n,this.headers_=r,this.body_=s,this.successCodes_=a,this.additionalRetryCodes_=l,this.callback_=u,this.errorCallback_=f,this.timeout_=E,this.progressCallback_=S,this.connectionFactory_=b,this.retry=T,this.isUsingEmulator=P,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((R,U)=>{this.resolve_=R,this.reject_=U,this.start_()})}start_(){const e=(r,s)=>{if(s){r(!1,new Cn(!1,null,!0));return}const a=this.connectionFactory_();this.pendingConnection_=a;const l=u=>{const f=u.loaded,E=u.lengthComputable?u.total:-1;this.progressCallback_!==null&&this.progressCallback_(f,E)};this.progressCallback_!==null&&a.addUploadProgressListener(l),a.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&a.removeUploadProgressListener(l),this.pendingConnection_=null;const u=a.getErrorCode()===nt.NO_ERROR,f=a.getStatus();if(!u||Sf(f,this.additionalRetryCodes_)&&this.retry){const S=a.getErrorCode()===nt.ABORT;r(!1,new Cn(!1,null,S));return}const E=this.successCodes_.indexOf(f)!==-1;r(!0,new Cn(E,a))})},n=(r,s)=>{const a=this.resolve_,l=this.reject_,u=s.connection;if(s.wasSuccessCode)try{const f=this.callback_(u,u.getResponse());Tf(f)?a(f):a()}catch(f){l(f)}else if(u!==null){const f=hr();f.serverResponse=u.getErrorText(),this.errorCallback_?l(this.errorCallback_(u,f)):l(f)}else if(s.canceled){const f=this.appDelete_?Aa():df();l(f)}else{const f=uf();l(f)}};this.canceled_?n(!1,new Cn(!1,null,!0)):this.backoffId_=If(e,n,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&Ef(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class Cn{constructor(e,n,r){this.wasSuccessCode=e,this.connection=n,this.canceled=!!r}}function Rf(t,e){e!==null&&e.length>0&&(t.Authorization="Firebase "+e)}function kf(t,e){t["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function Cf(t,e){e&&(t["X-Firebase-GMPID"]=e)}function Pf(t,e){e!==null&&(t["X-Firebase-AppCheck"]=e)}function Of(t,e,n,r,s,a,l=!0,u=!1){const f=Sa(t.urlParams),E=t.url+f,S=Object.assign({},t.headers);return Cf(S,e),Rf(S,n),kf(S,a),Pf(S,r),new bf(E,t.method,S,t.body,t.successCodes,t.additionalRetryCodes,t.handler,t.errorHandler,t.timeout,t.progressCallback,s,l,u)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nf(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Df(...t){const e=Nf();if(e!==void 0){const n=new e;for(let r=0;r<t.length;r++)n.append(t[r]);return n.getBlob()}else{if(dr())return new Blob(t);throw new $(H.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function Lf(t,e,n){return t.webkitSlice?t.webkitSlice(e,n):t.mozSlice?t.mozSlice(e,n):t.slice?t.slice(e,n):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uf(t){if(typeof atob>"u")throw yf("base-64");return atob(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ye={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Di{constructor(e,n){this.data=e,this.contentType=n||null}}function Mf(t,e){switch(t){case ye.RAW:return new Di(ba(e));case ye.BASE64:case ye.BASE64URL:return new Di(Ra(t,e));case ye.DATA_URL:return new Di(Ff(e),jf(e))}throw hr()}function ba(t){const e=[];for(let n=0;n<t.length;n++){let r=t.charCodeAt(n);if(r<=127)e.push(r);else if(r<=2047)e.push(192|r>>6,128|r&63);else if((r&64512)===55296)if(!(n<t.length-1&&(t.charCodeAt(n+1)&64512)===56320))e.push(239,191,189);else{const a=r,l=t.charCodeAt(++n);r=65536|(a&1023)<<10|l&1023,e.push(240|r>>18,128|r>>12&63,128|r>>6&63,128|r&63)}else(r&64512)===56320?e.push(239,191,189):e.push(224|r>>12,128|r>>6&63,128|r&63)}return new Uint8Array(e)}function xf(t){let e;try{e=decodeURIComponent(t)}catch{throw Jt(ye.DATA_URL,"Malformed data URL.")}return ba(e)}function Ra(t,e){switch(t){case ye.BASE64:{const s=e.indexOf("-")!==-1,a=e.indexOf("_")!==-1;if(s||a)throw Jt(t,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case ye.BASE64URL:{const s=e.indexOf("+")!==-1,a=e.indexOf("/")!==-1;if(s||a)throw Jt(t,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let n;try{n=Uf(e)}catch(s){throw s.message.includes("polyfill")?s:Jt(t,"Invalid character found")}const r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r}class ka{constructor(e){this.base64=!1,this.contentType=null;const n=e.match(/^data:([^,]+)?,/);if(n===null)throw Jt(ye.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const r=n[1]||null;r!=null&&(this.base64=Vf(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-7):r),this.rest=e.substring(e.indexOf(",")+1)}}function Ff(t){const e=new ka(t);return e.base64?Ra(ye.BASE64,e.rest):xf(e.rest)}function jf(t){return new ka(t).contentType}function Vf(t,e){return t.length>=e.length?t.substring(t.length-e.length)===e:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $e{constructor(e,n){let r=0,s="";fo(e)?(this.data_=e,r=e.size,s=e.type):e instanceof ArrayBuffer?(n?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(n?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,n){if(fo(this.data_)){const r=this.data_,s=Lf(r,e,n);return s===null?null:new $e(s)}else{const r=new Uint8Array(this.data_.buffer,e,n-e);return new $e(r,!0)}}static getBlob(...e){if(dr()){const n=e.map(r=>r instanceof $e?r.data_:r);return new $e(Df.apply(null,n))}else{const n=e.map(l=>ur(l)?Mf(ye.RAW,l).data:l.data_);let r=0;n.forEach(l=>{r+=l.byteLength});const s=new Uint8Array(r);let a=0;return n.forEach(l=>{for(let u=0;u<l.length;u++)s[a++]=l[u]}),new $e(s,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fr(t){let e;try{e=JSON.parse(t)}catch{return null}return Af(e)?e:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bf(t){if(t.length===0)return null;const e=t.lastIndexOf("/");return e===-1?"":t.slice(0,e)}function Hf(t,e){const n=e.split("/").filter(r=>r.length>0).join("/");return t.length===0?n:t+"/"+n}function Ca(t){const e=t.lastIndexOf("/",t.length-2);return e===-1?t:t.slice(e+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $f(t,e){return e}class ne{constructor(e,n,r,s){this.server=e,this.local=n||e,this.writable=!!r,this.xform=s||$f}}let Pn=null;function Wf(t){return!ur(t)||t.length<2?t:Ca(t)}function Pa(){if(Pn)return Pn;const t=[];t.push(new ne("bucket")),t.push(new ne("generation")),t.push(new ne("metageneration")),t.push(new ne("name","fullPath",!0));function e(a,l){return Wf(l)}const n=new ne("name");n.xform=e,t.push(n);function r(a,l){return l!==void 0?Number(l):l}const s=new ne("size");return s.xform=r,t.push(s),t.push(new ne("timeCreated")),t.push(new ne("updated")),t.push(new ne("md5Hash",null,!0)),t.push(new ne("cacheControl",null,!0)),t.push(new ne("contentDisposition",null,!0)),t.push(new ne("contentEncoding",null,!0)),t.push(new ne("contentLanguage",null,!0)),t.push(new ne("contentType",null,!0)),t.push(new ne("metadata","customMetadata",!0)),Pn=t,Pn}function zf(t,e){function n(){const r=t.bucket,s=t.fullPath,a=new re(r,s);return e._makeStorageReference(a)}Object.defineProperty(t,"ref",{get:n})}function qf(t,e,n){const r={};r.type="file";const s=n.length;for(let a=0;a<s;a++){const l=n[a];r[l.local]=l.xform(r,e[l.server])}return zf(r,t),r}function Oa(t,e,n){const r=fr(e);return r===null?null:qf(t,r,n)}function Gf(t,e,n,r){const s=fr(e);if(s===null||!ur(s.downloadTokens))return null;const a=s.downloadTokens;if(a.length===0)return null;const l=encodeURIComponent;return a.split(",").map(E=>{const S=t.bucket,b=t.fullPath,T="/b/"+l(S)+"/o/"+l(b),P=ln(T,n,r),R=Sa({alt:"media",token:E});return P+R})[0]}function Kf(t,e){const n={},r=e.length;for(let s=0;s<r;s++){const a=e[s];a.writable&&(n[a.server]=t[a.local])}return JSON.stringify(n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const po="prefixes",go="items";function Jf(t,e,n){const r={prefixes:[],items:[],nextPageToken:n.nextPageToken};if(n[po])for(const s of n[po]){const a=s.replace(/\/$/,""),l=t._makeStorageReference(new re(e,a));r.prefixes.push(l)}if(n[go])for(const s of n[go]){const a=t._makeStorageReference(new re(e,s.name));r.items.push(a)}return r}function Xf(t,e,n){const r=fr(n);return r===null?null:Jf(t,e,r)}class Xn{constructor(e,n,r,s){this.url=e,this.method=n,this.handler=r,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pr(t){if(!t)throw hr()}function Yf(t,e){function n(r,s){const a=Oa(t,s,e);return pr(a!==null),a}return n}function Zf(t,e){function n(r,s){const a=Xf(t,e,s);return pr(a!==null),a}return n}function Qf(t,e){function n(r,s){const a=Oa(t,s,e);return pr(a!==null),Gf(a,s,t.host,t._protocol)}return n}function gr(t){function e(n,r){let s;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?s=lf():s=cf():n.getStatus()===402?s=af(t.bucket):n.getStatus()===403?s=hf(t.path):s=r,s.status=n.getStatus(),s.serverResponse=r.serverResponse,s}return e}function Na(t){const e=gr(t);function n(r,s){let a=e(r,s);return r.getStatus()===404&&(a=of(t.path)),a.serverResponse=s.serverResponse,a}return n}function ep(t,e,n,r,s){const a={};e.isRoot?a.prefix="":a.prefix=e.path+"/",n.length>0&&(a.delimiter=n),r&&(a.pageToken=r),s&&(a.maxResults=s);const l=e.bucketOnlyServerUrl(),u=ln(l,t.host,t._protocol),f="GET",E=t.maxOperationRetryTime,S=new Xn(u,f,Zf(t,e.bucket),E);return S.urlParams=a,S.errorHandler=gr(e),S}function tp(t,e,n){const r=e.fullServerUrl(),s=ln(r,t.host,t._protocol),a="GET",l=t.maxOperationRetryTime,u=new Xn(s,a,Qf(t,n),l);return u.errorHandler=Na(e),u}function np(t,e){const n=e.fullServerUrl(),r=ln(n,t.host,t._protocol),s="DELETE",a=t.maxOperationRetryTime;function l(f,E){}const u=new Xn(r,s,l,a);return u.successCodes=[200,204],u.errorHandler=Na(e),u}function ip(t,e){return t&&t.contentType||e&&e.type()||"application/octet-stream"}function rp(t,e,n){const r=Object.assign({},n);return r.fullPath=t.path,r.size=e.size(),r.contentType||(r.contentType=ip(null,e)),r}function sp(t,e,n,r,s){const a=e.bucketOnlyServerUrl(),l={"X-Goog-Upload-Protocol":"multipart"};function u(){let M="";for(let F=0;F<2;F++)M=M+Math.random().toString().slice(2);return M}const f=u();l["Content-Type"]="multipart/related; boundary="+f;const E=rp(e,r,s),S=Kf(E,n),b="--"+f+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+S+`\r
--`+f+`\r
Content-Type: `+E.contentType+`\r
\r
`,T=`\r
--`+f+"--",P=$e.getBlob(b,r,T);if(P===null)throw mf();const R={name:E.fullPath},U=ln(a,t.host,t._protocol),C="POST",q=t.maxUploadRetryTime,V=new Xn(U,C,Yf(t,n),q);return V.urlParams=R,V.headers=l,V.body=P.uploadData(),V.errorHandler=gr(e),V}class op{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=nt.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=nt.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=nt.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,n,r,s,a){if(this.sent_)throw Bt("cannot .send() more than once");if(lt(e)&&r&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(n,e,!0),a!==void 0)for(const l in a)a.hasOwnProperty(l)&&this.xhr_.setRequestHeader(l,a[l].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Bt("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Bt("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Bt("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Bt("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class ap extends op{initXhr(){this.xhr_.responseType="text"}}function Yn(){return new ap}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e,n){this._service=e,n instanceof re?this._location=n:this._location=re.makeFromUrl(n,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,n){return new ct(e,n)}get root(){const e=new re(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return Ca(this._location.path)}get storage(){return this._service}get parent(){const e=Bf(this._location.path);if(e===null)return null;const n=new re(this._location.bucket,e);return new ct(this._service,n)}_throwIfRoot(e){if(this._location.path==="")throw vf(e)}}function cp(t,e,n){t._throwIfRoot("uploadBytes");const r=sp(t.storage,t._location,Pa(),new $e(e,!0),n);return t.storage.makeRequestWithTokens(r,Yn).then(s=>({metadata:s,ref:t}))}function lp(t){const e={prefixes:[],items:[]};return Da(t,e).then(()=>e)}async function Da(t,e,n){const s=await hp(t,{pageToken:n});e.prefixes.push(...s.prefixes),e.items.push(...s.items),s.nextPageToken!=null&&await Da(t,e,s.nextPageToken)}function hp(t,e){e!=null&&typeof e.maxResults=="number"&&Wi("options.maxResults",1,1e3,e.maxResults);const n=e||{},r=ep(t.storage,t._location,"/",n.pageToken,n.maxResults);return t.storage.makeRequestWithTokens(r,Yn)}function up(t){t._throwIfRoot("getDownloadURL");const e=tp(t.storage,t._location,Pa());return t.storage.makeRequestWithTokens(e,Yn).then(n=>{if(n===null)throw _f();return n})}function dp(t){t._throwIfRoot("deleteObject");const e=np(t.storage,t._location);return t.storage.makeRequestWithTokens(e,Yn)}function fp(t,e){const n=Hf(t._location.path,e),r=new re(t._location.bucket,n);return new ct(t.storage,r)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pp(t){return/^[A-Za-z]+:\/\//.test(t)}function gp(t,e){return new ct(t,e)}function La(t,e){if(t instanceof mr){const n=t;if(n._bucket==null)throw gf();const r=new ct(n,n._bucket);return e!=null?La(r,e):r}else return e!==void 0?fp(t,e):t}function mp(t,e){if(e&&pp(e)){if(t instanceof mr)return gp(t,e);throw $i("To use ref(service, url), the first argument must be a Storage instance.")}else return La(t,e)}function mo(t,e){const n=e?.[Ta];return n==null?null:re.makeFromBucketSpec(n,t)}function _p(t,e,n,r={}){t.host=`${e}:${n}`;const s=lt(e);s&&(qi(`https://${t.host}/b`),Gi("Storage",!0)),t._isUsingEmulator=!0,t._protocol=s?"https":"http";const{mockUserToken:a}=r;a&&(t._overrideAuthToken=typeof a=="string"?a:Ro(a,t.app.options.projectId))}class mr{constructor(e,n,r,s,a,l=!1){this.app=e,this._authProvider=n,this._appCheckProvider=r,this._url=s,this._firebaseVersion=a,this._isUsingEmulator=l,this._bucket=null,this._host=Ea,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=rf,this._maxUploadRetryTime=sf,this._requests=new Set,s!=null?this._bucket=re.makeFromBucketSpec(s,this._host):this._bucket=mo(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=re.makeFromBucketSpec(this._url,e):this._bucket=mo(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){Wi("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){Wi("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const n=await e.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(oe(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new ct(this,e)}_makeRequest(e,n,r,s,a=!0){if(this._deleted)return new wf(Aa());{const l=Of(e,this._appId,r,s,n,this._firebaseVersion,a,this._isUsingEmulator);return this._requests.add(l),l.getPromise().then(()=>this._requests.delete(l),()=>this._requests.delete(l)),l}}async makeRequestWithTokens(e,n){const[r,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,n,r,s).getPromise()}}const _o="@firebase/storage",yo="0.13.14";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ua="storage";function Np(t,e,n){return t=J(t),cp(t,e,n)}function Dp(t){return t=J(t),lp(t)}function Lp(t){return t=J(t),up(t)}function Up(t){return t=J(t),dp(t)}function Mp(t,e){return t=J(t),mp(t,e)}function yp(t=qn(),e){t=J(t);const r=zn(t,Ua).getImmediate({identifier:e}),s=Ao("storage");return s&&vp(r,...s),r}function vp(t,e,n,r={}){_p(t,e,n,r)}function wp(t,{instanceIdentifier:e}){const n=t.getProvider("app").getImmediate(),r=t.getProvider("auth-internal"),s=t.getProvider("app-check-internal");return new mr(n,r,s,e,ht)}function Ip(){rt(new qe(Ua,wp,"PUBLIC").setMultipleInstances(!0)),ve(_o,yo,""),ve(_o,yo,"esm2017")}Ip();const Ep={apiKey:"AIzaSyDXlu3twONtxnlsSYAjJcLng0UsNEgKkkg",authDomain:"fototv-90cf0.firebaseapp.com",projectId:"fototv-90cf0",storageBucket:"fototv-90cf0.firebasestorage.app",messagingSenderId:"341116492373",appId:"1:341116492373:web:74768f1c508198574d12dc",measurementId:"G-K7K2NXMWW3"},_r=Zl().length?qn():Po(Ep),Tp=Td(_r);uu(Tp,sa).catch(t=>console.error("Error setting auth persistence:",t));Zd(_r);const xp=yp(_r);console.log("Firebase initialized with email/password authentication");export{Tp as a,ms as b,Rp as c,Up as d,Cp as e,kp as f,Lp as g,bp as h,Sp as i,Op as j,Dp as l,Pp as o,Mp as r,xp as s,Np as u};
