const rl=()=>{};var Bs={};/**
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
 */const Go=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},il=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const a=n[t++];e[i++]=String.fromCharCode((s&31)<<6|a&63)}else if(s>239&&s<365){const a=n[t++],l=n[t++],h=n[t++],f=((s&7)<<18|(a&63)<<12|(l&63)<<6|h&63)-65536;e[i++]=String.fromCharCode(55296+(f>>10)),e[i++]=String.fromCharCode(56320+(f&1023))}else{const a=n[t++],l=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(a&63)<<6|l&63)}}return e.join("")},Ko={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const a=n[s],l=s+1<n.length,h=l?n[s+1]:0,f=s+2<n.length,I=f?n[s+2]:0,b=a>>2,A=(a&3)<<4|h>>4;let T=(h&15)<<2|I>>6,C=I&63;f||(C=64,l||(T=64)),i.push(t[b],t[A],t[T],t[C])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Go(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):il(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const a=t[n.charAt(s++)],h=s<n.length?t[n.charAt(s)]:0;++s;const I=s<n.length?t[n.charAt(s)]:64;++s;const A=s<n.length?t[n.charAt(s)]:64;if(++s,a==null||h==null||I==null||A==null)throw new sl;const T=a<<2|h>>4;if(i.push(T),I!==64){const C=h<<4&240|I>>2;if(i.push(C),A!==64){const P=I<<6&192|A;i.push(P)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class sl extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const ol=function(n){const e=Go(n);return Ko.encodeByteArray(e,!0)},Yn=function(n){return ol(n).replace(/\./g,"")},Jo=function(n){try{return Ko.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function al(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const cl=()=>al().__FIREBASE_DEFAULTS__,ll=()=>{if(typeof process>"u"||typeof Bs>"u")return;const n=Bs.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},ul=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Jo(n[1]);return e&&JSON.parse(e)},fi=()=>{try{return rl()||cl()||ll()||ul()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Xo=n=>{var e,t;return(t=(e=fi())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},Yo=n=>{const e=Xo(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},Zo=()=>{var n;return(n=fi())===null||n===void 0?void 0:n.config},Qo=n=>{var e;return(e=fi())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class hl{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
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
 */function pt(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function pi(n){return(await fetch(n,{credentials:"include"})).ok}/**
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
 */function ea(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,a=n.sub||n.user_id;if(!a)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const l=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:a,user_id:a,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Yn(JSON.stringify(t)),Yn(JSON.stringify(l)),""].join(".")}const Qt={};function dl(){const n={prod:[],emulator:[]};for(const e of Object.keys(Qt))Qt[e]?n.emulator.push(e):n.prod.push(e);return n}function fl(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Hs=!1;function gi(n,e){if(typeof window>"u"||typeof document>"u"||!pt(window.location.host)||Qt[n]===e||Qt[n]||Hs)return;Qt[n]=e;function t(T){return`__firebase__banner__${T}`}const i="__firebase__banner",a=dl().prod.length>0;function l(){const T=document.getElementById(i);T&&T.remove()}function h(T){T.style.display="flex",T.style.background="#7faaf0",T.style.position="fixed",T.style.bottom="5px",T.style.left="5px",T.style.padding=".5em",T.style.borderRadius="5px",T.style.alignItems="center"}function f(T,C){T.setAttribute("width","24"),T.setAttribute("id",C),T.setAttribute("height","24"),T.setAttribute("viewBox","0 0 24 24"),T.setAttribute("fill","none"),T.style.marginLeft="-6px"}function I(){const T=document.createElement("span");return T.style.cursor="pointer",T.style.marginLeft="16px",T.style.fontSize="24px",T.innerHTML=" &times;",T.onclick=()=>{Hs=!0,l()},T}function b(T,C){T.setAttribute("id",C),T.innerText="Learn more",T.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",T.setAttribute("target","__blank"),T.style.paddingLeft="5px",T.style.textDecoration="underline"}function A(){const T=fl(i),C=t("text"),P=document.getElementById(C)||document.createElement("span"),O=t("learnmore"),k=document.getElementById(O)||document.createElement("a"),q=t("preprendIcon"),j=document.getElementById(q)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(T.created){const N=T.element;h(N),b(k,O);const F=I();f(j,q),N.append(j,P,k,F),document.body.appendChild(N)}a?(P.innerText="Preview backend disconnected.",j.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):(j.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,P.innerText="Preview backend running in this workspace."),P.setAttribute("id",C)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",A):A()}/**
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
 */function de(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function pl(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(de())}function gl(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function ml(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function _l(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function yl(){const n=de();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function vl(){try{return typeof indexedDB=="object"}catch{return!1}}function wl(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var a;e(((a=s.error)===null||a===void 0?void 0:a.message)||"")}}catch(t){e(t)}})}/**
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
 */const Il="FirebaseError";class ke extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=Il,Object.setPrototypeOf(this,ke.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,mn.prototype.create)}}class mn{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,a=this.errors[e],l=a?El(a,i):"Error",h=`${this.serviceName}: ${l} (${s}).`;return new ke(s,h,i)}}function El(n,e){return n.replace(Tl,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const Tl=/\{\$([^}]+)}/g;function bl(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function lt(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const a=n[s],l=e[s];if($s(a)&&$s(l)){if(!lt(a,l))return!1}else if(a!==l)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function $s(n){return n!==null&&typeof n=="object"}/**
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
 */function kt(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function Xt(n){const e={};return n.replace(/^\?/,"").split("&").forEach(i=>{if(i){const[s,a]=i.split("=");e[decodeURIComponent(s)]=decodeURIComponent(a)}}),e}function Yt(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Al(n,e){const t=new Sl(n,e);return t.subscribe.bind(t)}class Sl{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,i){let s;if(e===void 0&&t===void 0&&i===void 0)throw new Error("Missing Observer.");Rl(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:i},s.next===void 0&&(s.next=Wr),s.error===void 0&&(s.error=Wr),s.complete===void 0&&(s.complete=Wr);const a=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),a}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Rl(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Wr(){}/**
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
 */function M(n){return n&&n._delegate?n._delegate:n}class Qe{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const rt="[DEFAULT]";/**
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
 */class Pl{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new hl;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e?.identifier),s=(t=e?.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(a){if(s)return null;throw a}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Cl(e))try{this.getOrInitializeService({instanceIdentifier:rt})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const a=this.getOrInitializeService({instanceIdentifier:s});i.resolve(a)}catch{}}}}clearInstance(e=rt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=rt){return this.instances.has(e)}getOptions(e=rt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[a,l]of this.instancesDeferred.entries()){const h=this.normalizeInstanceIdentifier(a);i===h&&l.resolve(s)}return s}onInit(e,t){var i;const s=this.normalizeInstanceIdentifier(t),a=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;a.add(e),this.onInitCallbacks.set(s,a);const l=this.instances.get(s);return l&&e(l,s),()=>{a.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:kl(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=rt){return this.component?this.component.multipleInstances?e:rt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function kl(n){return n===rt?void 0:n}function Cl(n){return n.instantiationMode==="EAGER"}/**
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
 */class Ol{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Pl(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var V;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(V||(V={}));const Nl={debug:V.DEBUG,verbose:V.VERBOSE,info:V.INFO,warn:V.WARN,error:V.ERROR,silent:V.SILENT},Dl=V.INFO,Ll={[V.DEBUG]:"log",[V.VERBOSE]:"log",[V.INFO]:"info",[V.WARN]:"warn",[V.ERROR]:"error"},Ul=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Ll[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class mi{constructor(e){this.name=e,this._logLevel=Dl,this._logHandler=Ul,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in V))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Nl[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,V.DEBUG,...e),this._logHandler(this,V.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,V.VERBOSE,...e),this._logHandler(this,V.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,V.INFO,...e),this._logHandler(this,V.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,V.WARN,...e),this._logHandler(this,V.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,V.ERROR,...e),this._logHandler(this,V.ERROR,...e)}}const Ml=(n,e)=>e.some(t=>n instanceof t);let Ws,qs;function xl(){return Ws||(Ws=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Fl(){return qs||(qs=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const ta=new WeakMap,ri=new WeakMap,na=new WeakMap,qr=new WeakMap,_i=new WeakMap;function Vl(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",a),n.removeEventListener("error",l)},a=()=>{t(Xe(n.result)),s()},l=()=>{i(n.error),s()};n.addEventListener("success",a),n.addEventListener("error",l)});return e.then(t=>{t instanceof IDBCursor&&ta.set(t,n)}).catch(()=>{}),_i.set(e,n),e}function jl(n){if(ri.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",a),n.removeEventListener("error",l),n.removeEventListener("abort",l)},a=()=>{t(),s()},l=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",a),n.addEventListener("error",l),n.addEventListener("abort",l)});ri.set(n,e)}let ii={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ri.get(n);if(e==="objectStoreNames")return n.objectStoreNames||na.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return Xe(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Bl(n){ii=n(ii)}function Hl(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(zr(this),e,...t);return na.set(i,e.sort?e.sort():[e]),Xe(i)}:Fl().includes(n)?function(...e){return n.apply(zr(this),e),Xe(ta.get(this))}:function(...e){return Xe(n.apply(zr(this),e))}}function $l(n){return typeof n=="function"?Hl(n):(n instanceof IDBTransaction&&jl(n),Ml(n,xl())?new Proxy(n,ii):n)}function Xe(n){if(n instanceof IDBRequest)return Vl(n);if(qr.has(n))return qr.get(n);const e=$l(n);return e!==n&&(qr.set(n,e),_i.set(e,n)),e}const zr=n=>_i.get(n);function Wl(n,e,{blocked:t,upgrade:i,blocking:s,terminated:a}={}){const l=indexedDB.open(n,e),h=Xe(l);return i&&l.addEventListener("upgradeneeded",f=>{i(Xe(l.result),f.oldVersion,f.newVersion,Xe(l.transaction),f)}),t&&l.addEventListener("blocked",f=>t(f.oldVersion,f.newVersion,f)),h.then(f=>{a&&f.addEventListener("close",()=>a()),s&&f.addEventListener("versionchange",I=>s(I.oldVersion,I.newVersion,I))}).catch(()=>{}),h}const ql=["get","getKey","getAll","getAllKeys","count"],zl=["put","add","delete","clear"],Gr=new Map;function zs(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Gr.get(e))return Gr.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=zl.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||ql.includes(t)))return;const a=async function(l,...h){const f=this.transaction(l,s?"readwrite":"readonly");let I=f.store;return i&&(I=I.index(h.shift())),(await Promise.all([I[t](...h),s&&f.done]))[0]};return Gr.set(e,a),a}Bl(n=>({...n,get:(e,t,i)=>zs(e,t)||n.get(e,t,i),has:(e,t)=>!!zs(e,t)||n.has(e,t)}));/**
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
 */class Gl{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Kl(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Kl(n){const e=n.getComponent();return e?.type==="VERSION"}const si="@firebase/app",Gs="0.13.2";/**
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
 */const Me=new mi("@firebase/app"),Jl="@firebase/app-compat",Xl="@firebase/analytics-compat",Yl="@firebase/analytics",Zl="@firebase/app-check-compat",Ql="@firebase/app-check",eu="@firebase/auth",tu="@firebase/auth-compat",nu="@firebase/database",ru="@firebase/data-connect",iu="@firebase/database-compat",su="@firebase/functions",ou="@firebase/functions-compat",au="@firebase/installations",cu="@firebase/installations-compat",lu="@firebase/messaging",uu="@firebase/messaging-compat",hu="@firebase/performance",du="@firebase/performance-compat",fu="@firebase/remote-config",pu="@firebase/remote-config-compat",gu="@firebase/storage",mu="@firebase/storage-compat",_u="@firebase/firestore",yu="@firebase/ai",vu="@firebase/firestore-compat",wu="firebase",Iu="11.10.0";/**
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
 */const oi="[DEFAULT]",Eu={[si]:"fire-core",[Jl]:"fire-core-compat",[Yl]:"fire-analytics",[Xl]:"fire-analytics-compat",[Ql]:"fire-app-check",[Zl]:"fire-app-check-compat",[eu]:"fire-auth",[tu]:"fire-auth-compat",[nu]:"fire-rtdb",[ru]:"fire-data-connect",[iu]:"fire-rtdb-compat",[su]:"fire-fn",[ou]:"fire-fn-compat",[au]:"fire-iid",[cu]:"fire-iid-compat",[lu]:"fire-fcm",[uu]:"fire-fcm-compat",[hu]:"fire-perf",[du]:"fire-perf-compat",[fu]:"fire-rc",[pu]:"fire-rc-compat",[gu]:"fire-gcs",[mu]:"fire-gcs-compat",[_u]:"fire-fst",[vu]:"fire-fst-compat",[yu]:"fire-vertex","fire-js":"fire-js",[wu]:"fire-js-all"};/**
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
 */const ln=new Map,Tu=new Map,ai=new Map;function Ks(n,e){try{n.container.addComponent(e)}catch(t){Me.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function ut(n){const e=n.name;if(ai.has(e))return Me.debug(`There were multiple attempts to register component ${e}.`),!1;ai.set(e,n);for(const t of ln.values())Ks(t,n);for(const t of Tu.values())Ks(t,n);return!0}function ir(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function J(n){return n==null?!1:n.settings!==void 0}/**
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
 */const bu={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Ye=new mn("app","Firebase",bu);/**
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
 */class Au{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new Qe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Ye.create("app-deleted",{appName:this._name})}}/**
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
 */const gt=Iu;function ra(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:oi,automaticDataCollectionEnabled:!0},e),s=i.name;if(typeof s!="string"||!s)throw Ye.create("bad-app-name",{appName:String(s)});if(t||(t=Zo()),!t)throw Ye.create("no-options");const a=ln.get(s);if(a){if(lt(t,a.options)&&lt(i,a.config))return a;throw Ye.create("duplicate-app",{appName:s})}const l=new Ol(s);for(const f of ai.values())l.addComponent(f);const h=new Au(t,i,l);return ln.set(s,h),h}function sr(n=oi){const e=ln.get(n);if(!e&&n===oi&&Zo())return ra();if(!e)throw Ye.create("no-app",{appName:n});return e}function Su(){return Array.from(ln.values())}function Re(n,e,t){var i;let s=(i=Eu[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);const a=s.match(/\s|\//),l=e.match(/\s|\//);if(a||l){const h=[`Unable to register library "${s}" with version "${e}":`];a&&h.push(`library name "${s}" contains illegal characters (whitespace or "/")`),a&&l&&h.push("and"),l&&h.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Me.warn(h.join(" "));return}ut(new Qe(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const Ru="firebase-heartbeat-database",Pu=1,un="firebase-heartbeat-store";let Kr=null;function ia(){return Kr||(Kr=Wl(Ru,Pu,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(un)}catch(t){console.warn(t)}}}}).catch(n=>{throw Ye.create("idb-open",{originalErrorMessage:n.message})})),Kr}async function ku(n){try{const t=(await ia()).transaction(un),i=await t.objectStore(un).get(sa(n));return await t.done,i}catch(e){if(e instanceof ke)Me.warn(e.message);else{const t=Ye.create("idb-get",{originalErrorMessage:e?.message});Me.warn(t.message)}}}async function Js(n,e){try{const i=(await ia()).transaction(un,"readwrite");await i.objectStore(un).put(e,sa(n)),await i.done}catch(t){if(t instanceof ke)Me.warn(t.message);else{const i=Ye.create("idb-set",{originalErrorMessage:t?.message});Me.warn(i.message)}}}function sa(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Cu=1024,Ou=30;class Nu{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Lu(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),a=Xs();if(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===a||this._heartbeatsCache.heartbeats.some(l=>l.date===a))return;if(this._heartbeatsCache.heartbeats.push({date:a,agent:s}),this._heartbeatsCache.heartbeats.length>Ou){const l=Uu(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(l,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(i){Me.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Xs(),{heartbeatsToSend:i,unsentEntries:s}=Du(this._heartbeatsCache.heartbeats),a=Yn(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),a}catch(t){return Me.warn(t),""}}}function Xs(){return new Date().toISOString().substring(0,10)}function Du(n,e=Cu){const t=[];let i=n.slice();for(const s of n){const a=t.find(l=>l.agent===s.agent);if(a){if(a.dates.push(s.date),Ys(t)>e){a.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Ys(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Lu{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return vl()?wl().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await ku(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Js(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Js(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Ys(n){return Yn(JSON.stringify({version:2,heartbeats:n})).length}function Uu(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let i=1;i<n.length;i++)n[i].date<t&&(t=n[i].date,e=i);return e}/**
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
 */function Mu(n){ut(new Qe("platform-logger",e=>new Gl(e),"PRIVATE")),ut(new Qe("heartbeat",e=>new Nu(e),"PRIVATE")),Re(si,Gs,n),Re(si,Gs,"esm2017"),Re("fire-js","")}Mu("");var xu="firebase",Fu="11.10.0";/**
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
 */Re(xu,Fu,"app");function yi(n,e){var t={};for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&e.indexOf(i)<0&&(t[i]=n[i]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,i=Object.getOwnPropertySymbols(n);s<i.length;s++)e.indexOf(i[s])<0&&Object.prototype.propertyIsEnumerable.call(n,i[s])&&(t[i[s]]=n[i[s]]);return t}function oa(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Vu=oa,aa=new mn("auth","Firebase",oa());/**
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
 */const Zn=new mi("@firebase/auth");function ju(n,...e){Zn.logLevel<=V.WARN&&Zn.warn(`Auth (${gt}): ${n}`,...e)}function qn(n,...e){Zn.logLevel<=V.ERROR&&Zn.error(`Auth (${gt}): ${n}`,...e)}/**
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
 */function me(n,...e){throw wi(n,...e)}function pe(n,...e){return wi(n,...e)}function vi(n,e,t){const i=Object.assign(Object.assign({},Vu()),{[e]:t});return new mn("auth","Firebase",i).create(e,{appName:n.name})}function he(n){return vi(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function or(n,e,t){const i=t;if(!(e instanceof i))throw i.name!==e.constructor.name&&me(n,"argument-error"),vi(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function wi(n,...e){if(typeof n!="string"){const t=e[0],i=[...e.slice(1)];return i[0]&&(i[0].appName=n.name),n._errorFactory.create(t,...i)}return aa.create(n,...e)}function R(n,e,...t){if(!n)throw wi(e,...t)}function Le(n){const e="INTERNAL ASSERTION FAILED: "+n;throw qn(e),new Error(e)}function xe(n,e){n||Le(e)}/**
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
 */function hn(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function Ii(){return Zs()==="http:"||Zs()==="https:"}function Zs(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
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
 */function Bu(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Ii()||ml()||"connection"in navigator)?navigator.onLine:!0}function Hu(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class _n{constructor(e,t){this.shortDelay=e,this.longDelay=t,xe(t>e,"Short delay should be less than long delay!"),this.isMobile=pl()||_l()}get(){return Bu()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Ei(n,e){xe(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class ca{static initialize(e,t,i){this.fetchImpl=e,t&&(this.headersImpl=t),i&&(this.responseImpl=i)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Le("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Le("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Le("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const $u={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const Wu=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],qu=new _n(3e4,6e4);function Y(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function Z(n,e,t,i,s={}){return la(n,s,async()=>{let a={},l={};i&&(e==="GET"?l=i:a={body:JSON.stringify(i)});const h=kt(Object.assign({key:n.config.apiKey},l)).slice(1),f=await n._getAdditionalHeaders();f["Content-Type"]="application/json",n.languageCode&&(f["X-Firebase-Locale"]=n.languageCode);const I=Object.assign({method:e,headers:f},a);return gl()||(I.referrerPolicy="no-referrer"),n.emulatorConfig&&pt(n.emulatorConfig.host)&&(I.credentials="include"),ca.fetch()(await ua(n,n.config.apiHost,t,h),I)})}async function la(n,e,t){n._canInitEmulator=!1;const i=Object.assign(Object.assign({},$u),e);try{const s=new Gu(n),a=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const l=await a.json();if("needConfirmation"in l)throw Zt(n,"account-exists-with-different-credential",l);if(a.ok&&!("errorMessage"in l))return l;{const h=a.ok?l.errorMessage:l.error.message,[f,I]=h.split(" : ");if(f==="FEDERATED_USER_ID_ALREADY_LINKED")throw Zt(n,"credential-already-in-use",l);if(f==="EMAIL_EXISTS")throw Zt(n,"email-already-in-use",l);if(f==="USER_DISABLED")throw Zt(n,"user-disabled",l);const b=i[f]||f.toLowerCase().replace(/[_\s]+/g,"-");if(I)throw vi(n,b,I);me(n,b)}}catch(s){if(s instanceof ke)throw s;me(n,"network-request-failed",{message:String(s)})}}async function Ve(n,e,t,i,s={}){const a=await Z(n,e,t,i,s);return"mfaPendingCredential"in a&&me(n,"multi-factor-auth-required",{_serverResponse:a}),a}async function ua(n,e,t,i){const s=`${e}${t}?${i}`,a=n,l=a.config.emulator?Ei(n.config,s):`${n.config.apiScheme}://${s}`;return Wu.includes(t)&&(await a._persistenceManagerAvailable,a._getPersistenceType()==="COOKIE")?a._getPersistence()._getFinalTarget(l).toString():l}function zu(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class Gu{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,i)=>{this.timer=setTimeout(()=>i(pe(this.auth,"network-request-failed")),qu.get())})}}function Zt(n,e,t){const i={appName:n.name};t.email&&(i.email=t.email),t.phoneNumber&&(i.phoneNumber=t.phoneNumber);const s=pe(n,e,i);return s.customData._tokenResponse=t,s}/**
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
 */function Qs(n){return n!==void 0&&n.getResponse!==void 0}function eo(n){return n!==void 0&&n.enterprise!==void 0}class ha{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return zu(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}/**
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
 */async function Ku(n){return(await Z(n,"GET","/v1/recaptchaParams")).recaptchaSiteKey||""}async function da(n,e){return Z(n,"GET","/v2/recaptchaConfig",Y(n,e))}/**
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
 */async function Ju(n,e){return Z(n,"POST","/v1/accounts:delete",e)}async function Xu(n,e){return Z(n,"POST","/v1/accounts:update",e)}async function Qn(n,e){return Z(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function en(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Yu(n,e=!1){const t=M(n),i=await t.getIdToken(e),s=ar(i);R(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const a=typeof s.firebase=="object"?s.firebase:void 0,l=a?.sign_in_provider;return{claims:s,token:i,authTime:en(Jr(s.auth_time)),issuedAtTime:en(Jr(s.iat)),expirationTime:en(Jr(s.exp)),signInProvider:l||null,signInSecondFactor:a?.sign_in_second_factor||null}}function Jr(n){return Number(n)*1e3}function ar(n){const[e,t,i]=n.split(".");if(e===void 0||t===void 0||i===void 0)return qn("JWT malformed, contained fewer than 3 sections"),null;try{const s=Jo(t);return s?JSON.parse(s):(qn("Failed to decode base64 JWT payload"),null)}catch(s){return qn("Caught error parsing JWT payload as JSON",s?.toString()),null}}function to(n){const e=ar(n);return R(e,"internal-error"),R(typeof e.exp<"u","internal-error"),R(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function ht(n,e,t=!1){if(t)return e;try{return await e}catch(i){throw i instanceof ke&&Zu(i)&&n.auth.currentUser===n&&await n.auth.signOut(),i}}function Zu({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class Qu{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const i=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),i}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class ci{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=en(this.lastLoginAt),this.creationTime=en(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function dn(n){var e;const t=n.auth,i=await n.getIdToken(),s=await ht(n,Qn(t,{idToken:i}));R(s?.users.length,t,"internal-error");const a=s.users[0];n._notifyReloadListener(a);const l=!((e=a.providerUserInfo)===null||e===void 0)&&e.length?fa(a.providerUserInfo):[],h=th(n.providerData,l),f=n.isAnonymous,I=!(n.email&&a.passwordHash)&&!h?.length,b=f?I:!1,A={uid:a.localId,displayName:a.displayName||null,photoURL:a.photoUrl||null,email:a.email||null,emailVerified:a.emailVerified||!1,phoneNumber:a.phoneNumber||null,tenantId:a.tenantId||null,providerData:h,metadata:new ci(a.createdAt,a.lastLoginAt),isAnonymous:b};Object.assign(n,A)}async function eh(n){const e=M(n);await dn(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function th(n,e){return[...n.filter(i=>!e.some(s=>s.providerId===i.providerId)),...e]}function fa(n){return n.map(e=>{var{providerId:t}=e,i=yi(e,["providerId"]);return{providerId:t,uid:i.rawId||"",displayName:i.displayName||null,email:i.email||null,phoneNumber:i.phoneNumber||null,photoURL:i.photoUrl||null}})}/**
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
 */async function nh(n,e){const t=await la(n,{},async()=>{const i=kt({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:a}=n.config,l=await ua(n,s,"/v1/token",`key=${a}`),h=await n._getAdditionalHeaders();h["Content-Type"]="application/x-www-form-urlencoded";const f={method:"POST",headers:h,body:i};return n.emulatorConfig&&pt(n.emulatorConfig.host)&&(f.credentials="include"),ca.fetch()(l,f)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function rh(n,e){return Z(n,"POST","/v2/accounts:revokeToken",Y(n,e))}/**
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
 */class Et{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){R(e.idToken,"internal-error"),R(typeof e.idToken<"u","internal-error"),R(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):to(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){R(e.length!==0,"internal-error");const t=to(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(R(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:i,refreshToken:s,expiresIn:a}=await nh(e,t);this.updateTokensAndExpiration(i,s,Number(a))}updateTokensAndExpiration(e,t,i){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+i*1e3}static fromJSON(e,t){const{refreshToken:i,accessToken:s,expirationTime:a}=t,l=new Et;return i&&(R(typeof i=="string","internal-error",{appName:e}),l.refreshToken=i),s&&(R(typeof s=="string","internal-error",{appName:e}),l.accessToken=s),a&&(R(typeof a=="number","internal-error",{appName:e}),l.expirationTime=a),l}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Et,this.toJSON())}_performRefresh(){return Le("not implemented")}}/**
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
 */function We(n,e){R(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ve{constructor(e){var{uid:t,auth:i,stsTokenManager:s}=e,a=yi(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Qu(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=i,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=a.displayName||null,this.email=a.email||null,this.emailVerified=a.emailVerified||!1,this.phoneNumber=a.phoneNumber||null,this.photoURL=a.photoURL||null,this.isAnonymous=a.isAnonymous||!1,this.tenantId=a.tenantId||null,this.providerData=a.providerData?[...a.providerData]:[],this.metadata=new ci(a.createdAt||void 0,a.lastLoginAt||void 0)}async getIdToken(e){const t=await ht(this,this.stsTokenManager.getToken(this.auth,e));return R(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Yu(this,e)}reload(){return eh(this)}_assign(e){this!==e&&(R(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ve(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){R(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let i=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),i=!0),t&&await dn(this),await this.auth._persistUserIfCurrent(this),i&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(J(this.auth.app))return Promise.reject(he(this.auth));const e=await this.getIdToken();return await ht(this,Ju(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var i,s,a,l,h,f,I,b;const A=(i=t.displayName)!==null&&i!==void 0?i:void 0,T=(s=t.email)!==null&&s!==void 0?s:void 0,C=(a=t.phoneNumber)!==null&&a!==void 0?a:void 0,P=(l=t.photoURL)!==null&&l!==void 0?l:void 0,O=(h=t.tenantId)!==null&&h!==void 0?h:void 0,k=(f=t._redirectEventId)!==null&&f!==void 0?f:void 0,q=(I=t.createdAt)!==null&&I!==void 0?I:void 0,j=(b=t.lastLoginAt)!==null&&b!==void 0?b:void 0,{uid:N,emailVerified:F,isAnonymous:se,providerData:G,stsTokenManager:y}=t;R(N&&y,e,"internal-error");const d=Et.fromJSON(this.name,y);R(typeof N=="string",e,"internal-error"),We(A,e.name),We(T,e.name),R(typeof F=="boolean",e,"internal-error"),R(typeof se=="boolean",e,"internal-error"),We(C,e.name),We(P,e.name),We(O,e.name),We(k,e.name),We(q,e.name),We(j,e.name);const p=new ve({uid:N,auth:e,email:T,emailVerified:F,displayName:A,isAnonymous:se,photoURL:P,phoneNumber:C,tenantId:O,stsTokenManager:d,createdAt:q,lastLoginAt:j});return G&&Array.isArray(G)&&(p.providerData=G.map(m=>Object.assign({},m))),k&&(p._redirectEventId=k),p}static async _fromIdTokenResponse(e,t,i=!1){const s=new Et;s.updateFromServerResponse(t);const a=new ve({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:i});return await dn(a),a}static async _fromGetAccountInfoResponse(e,t,i){const s=t.users[0];R(s.localId!==void 0,"internal-error");const a=s.providerUserInfo!==void 0?fa(s.providerUserInfo):[],l=!(s.email&&s.passwordHash)&&!a?.length,h=new Et;h.updateFromIdToken(i);const f=new ve({uid:s.localId,auth:e,stsTokenManager:h,isAnonymous:l}),I={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:a,metadata:new ci(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!a?.length};return Object.assign(f,I),f}}/**
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
 */const no=new Map;function Ue(n){xe(n instanceof Function,"Expected a class definition");let e=no.get(n);return e?(xe(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,no.set(n,e),e)}/**
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
 */class pa{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}pa.type="NONE";const ro=pa;/**
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
 */function zn(n,e,t){return`firebase:${n}:${e}:${t}`}class Tt{constructor(e,t,i){this.persistence=e,this.auth=t,this.userKey=i;const{config:s,name:a}=this.auth;this.fullUserKey=zn(this.userKey,s.apiKey,a),this.fullPersistenceKey=zn("persistence",s.apiKey,a),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await Qn(this.auth,{idToken:e}).catch(()=>{});return t?ve._fromGetAccountInfoResponse(this.auth,t,e):null}return ve._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,i="authUser"){if(!t.length)return new Tt(Ue(ro),e,i);const s=(await Promise.all(t.map(async I=>{if(await I._isAvailable())return I}))).filter(I=>I);let a=s[0]||Ue(ro);const l=zn(i,e.config.apiKey,e.name);let h=null;for(const I of t)try{const b=await I._get(l);if(b){let A;if(typeof b=="string"){const T=await Qn(e,{idToken:b}).catch(()=>{});if(!T)break;A=await ve._fromGetAccountInfoResponse(e,T,b)}else A=ve._fromJSON(e,b);I!==a&&(h=A),a=I;break}}catch{}const f=s.filter(I=>I._shouldAllowMigration);return!a._shouldAllowMigration||!f.length?new Tt(a,e,i):(a=f[0],h&&await a._set(l,h.toJSON()),await Promise.all(t.map(async I=>{if(I!==a)try{await I._remove(l)}catch{}})),new Tt(a,e,i))}}/**
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
 */function io(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(ya(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(ga(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(wa(e))return"Blackberry";if(Ia(e))return"Webos";if(ma(e))return"Safari";if((e.includes("chrome/")||_a(e))&&!e.includes("edge/"))return"Chrome";if(va(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,i=n.match(t);if(i?.length===2)return i[1]}return"Other"}function ga(n=de()){return/firefox\//i.test(n)}function ma(n=de()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function _a(n=de()){return/crios\//i.test(n)}function ya(n=de()){return/iemobile/i.test(n)}function va(n=de()){return/android/i.test(n)}function wa(n=de()){return/blackberry/i.test(n)}function Ia(n=de()){return/webos/i.test(n)}function Ti(n=de()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function ih(n=de()){var e;return Ti(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function sh(){return yl()&&document.documentMode===10}function Ea(n=de()){return Ti(n)||va(n)||Ia(n)||wa(n)||/windows phone/i.test(n)||ya(n)}/**
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
 */function Ta(n,e=[]){let t;switch(n){case"Browser":t=io(de());break;case"Worker":t=`${io(de())}-${n}`;break;default:t=n}const i=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${gt}/${i}`}/**
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
 */class oh{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const i=a=>new Promise((l,h)=>{try{const f=e(a);l(f)}catch(f){h(f)}});i.onAbort=t,this.queue.push(i);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const i of this.queue)await i(e),i.onAbort&&t.push(i.onAbort)}catch(i){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:i?.message})}}}/**
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
 */async function ah(n,e={}){return Z(n,"GET","/v2/passwordPolicy",Y(n,e))}/**
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
 */const ch=6;class lh{constructor(e){var t,i,s,a;const l=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=l.minPasswordLength)!==null&&t!==void 0?t:ch,l.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=l.maxPasswordLength),l.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=l.containsLowercaseCharacter),l.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=l.containsUppercaseCharacter),l.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=l.containsNumericCharacter),l.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=l.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(i=e.allowedNonAlphanumericCharacters)===null||i===void 0?void 0:i.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(a=e.forceUpgradeOnSignin)!==null&&a!==void 0?a:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,i,s,a,l,h;const f={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,f),this.validatePasswordCharacterOptions(e,f),f.isValid&&(f.isValid=(t=f.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),f.isValid&&(f.isValid=(i=f.meetsMaxPasswordLength)!==null&&i!==void 0?i:!0),f.isValid&&(f.isValid=(s=f.containsLowercaseLetter)!==null&&s!==void 0?s:!0),f.isValid&&(f.isValid=(a=f.containsUppercaseLetter)!==null&&a!==void 0?a:!0),f.isValid&&(f.isValid=(l=f.containsNumericCharacter)!==null&&l!==void 0?l:!0),f.isValid&&(f.isValid=(h=f.containsNonAlphanumericCharacter)!==null&&h!==void 0?h:!0),f}validatePasswordLengthOptions(e,t){const i=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;i&&(t.meetsMinPasswordLength=e.length>=i),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let i;for(let s=0;s<e.length;s++)i=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,i>="a"&&i<="z",i>="A"&&i<="Z",i>="0"&&i<="9",this.allowedNonAlphanumericCharacters.includes(i))}updatePasswordCharacterOptionsStatuses(e,t,i,s,a){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=i)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=a))}}/**
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
 */class uh{constructor(e,t,i,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=i,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new so(this),this.idTokenSubscription=new so(this),this.beforeStateQueue=new oh(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=aa,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(a=>this._resolvePersistenceManagerAvailable=a)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Ue(t)),this._initializationPromise=this.queue(async()=>{var i,s,a;if(!this._deleted&&(this.persistenceManager=await Tt.create(this,e),(i=this._resolvePersistenceManagerAvailable)===null||i===void 0||i.call(this),!this._deleted)){if(!((s=this._popupRedirectResolver)===null||s===void 0)&&s._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((a=this.currentUser)===null||a===void 0?void 0:a.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Qn(this,{idToken:e}),i=await ve._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(i)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(J(this.app)){const l=this.app.settings.authIdToken;return l?new Promise(h=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(l).then(h,h))}):this.directlySetCurrentUser(null)}const i=await this.assertedPersistence.getCurrentUser();let s=i,a=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const l=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,h=s?._redirectEventId,f=await this.tryRedirectSignIn(e);(!l||l===h)&&f?.user&&(s=f.user,a=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(a)try{await this.beforeStateQueue.runMiddleware(s)}catch(l){s=i,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(l))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return R(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await dn(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Hu()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(J(this.app))return Promise.reject(he(this));const t=e?M(e):null;return t&&R(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&R(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return J(this.app)?Promise.reject(he(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return J(this.app)?Promise.reject(he(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Ue(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await ah(this),t=new lh(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new mn("auth","Firebase",e())}onAuthStateChanged(e,t,i){return this.registerStateListener(this.authStateSubscription,e,t,i)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,i){return this.registerStateListener(this.idTokenSubscription,e,t,i)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const i=this.onAuthStateChanged(()=>{i(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),i={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(i.tenantId=this.tenantId),await rh(this,i)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const i=await this.getOrInitRedirectPersistenceManager(t);return e===null?i.removeCurrentUser():i.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Ue(e)||this._popupRedirectResolver;R(t,this,"argument-error"),this.redirectPersistenceManager=await Tt.create(this,[Ue(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,i;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((i=this.redirectUser)===null||i===void 0?void 0:i._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const i=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==i&&(this.lastNotifiedUid=i,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,i,s){if(this._deleted)return()=>{};const a=typeof t=="function"?t:t.next.bind(t);let l=!1;const h=this._isInitialized?Promise.resolve():this._initializationPromise;if(R(h,this,"internal-error"),h.then(()=>{l||a(this.currentUser)}),typeof t=="function"){const f=e.addObserver(t,i,s);return()=>{l=!0,f()}}else{const f=e.addObserver(t);return()=>{l=!0,f()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return R(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Ta(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const i=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());i&&(t["X-Firebase-Client"]=i);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;if(J(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t?.error&&ju(`Error while retrieving App Check token: ${t.error}`),t?.token}}function Q(n){return M(n)}class so{constructor(e){this.auth=e,this.observer=null,this.addObserver=Al(t=>this.observer=t)}get next(){return R(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let yn={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function hh(n){yn=n}function bi(n){return yn.loadJS(n)}function dh(){return yn.recaptchaV2Script}function fh(){return yn.recaptchaEnterpriseScript}function ph(){return yn.gapiScript}function ba(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
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
 */const gh=500,mh=6e4,jn=1e12;class _h{constructor(e){this.auth=e,this.counter=jn,this._widgets=new Map}render(e,t){const i=this.counter;return this._widgets.set(i,new wh(e,this.auth.name,t||{})),this.counter++,i}reset(e){var t;const i=e||jn;(t=this._widgets.get(i))===null||t===void 0||t.delete(),this._widgets.delete(i)}getResponse(e){var t;const i=e||jn;return((t=this._widgets.get(i))===null||t===void 0?void 0:t.getResponse())||""}async execute(e){var t;const i=e||jn;return(t=this._widgets.get(i))===null||t===void 0||t.execute(),""}}class yh{constructor(){this.enterprise=new vh}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class vh{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class wh{constructor(e,t,i){this.params=i,this.timerId=null,this.deleted=!1,this.responseToken=null,this.clickHandler=()=>{this.execute()};const s=typeof e=="string"?document.getElementById(e):e;R(s,"argument-error",{appName:t}),this.container=s,this.isVisible=this.params.size!=="invisible",this.isVisible?this.execute():this.container.addEventListener("click",this.clickHandler)}getResponse(){return this.checkIfDeleted(),this.responseToken}delete(){this.checkIfDeleted(),this.deleted=!0,this.timerId&&(clearTimeout(this.timerId),this.timerId=null),this.container.removeEventListener("click",this.clickHandler)}execute(){this.checkIfDeleted(),!this.timerId&&(this.timerId=window.setTimeout(()=>{this.responseToken=Ih(50);const{callback:e,"expired-callback":t}=this.params;if(e)try{e(this.responseToken)}catch{}this.timerId=window.setTimeout(()=>{if(this.timerId=null,this.responseToken=null,t)try{t()}catch{}this.isVisible&&this.execute()},mh)},gh))}checkIfDeleted(){if(this.deleted)throw new Error("reCAPTCHA mock was already deleted!")}}function Ih(n){const e=[],t="1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";for(let i=0;i<n;i++)e.push(t.charAt(Math.floor(Math.random()*t.length)));return e.join("")}const Eh="recaptcha-enterprise",tn="NO_RECAPTCHA";class Aa{constructor(e){this.type=Eh,this.auth=Q(e)}async verify(e="verify",t=!1){async function i(a){if(!t){if(a.tenantId==null&&a._agentRecaptchaConfig!=null)return a._agentRecaptchaConfig.siteKey;if(a.tenantId!=null&&a._tenantRecaptchaConfigs[a.tenantId]!==void 0)return a._tenantRecaptchaConfigs[a.tenantId].siteKey}return new Promise(async(l,h)=>{da(a,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(f=>{if(f.recaptchaKey===void 0)h(new Error("recaptcha Enterprise site key undefined"));else{const I=new ha(f);return a.tenantId==null?a._agentRecaptchaConfig=I:a._tenantRecaptchaConfigs[a.tenantId]=I,l(I.siteKey)}}).catch(f=>{h(f)})})}function s(a,l,h){const f=window.grecaptcha;eo(f)?f.enterprise.ready(()=>{f.enterprise.execute(a,{action:e}).then(I=>{l(I)}).catch(()=>{l(tn)})}):h(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new yh().execute("siteKey",{action:"verify"}):new Promise((a,l)=>{i(this.auth).then(h=>{if(!t&&eo(window.grecaptcha))s(h,a,l);else{if(typeof window>"u"){l(new Error("RecaptchaVerifier is only supported in browser"));return}let f=fh();f.length!==0&&(f+=h),bi(f).then(()=>{s(h,a,l)}).catch(I=>{l(I)})}}).catch(h=>{l(h)})})}}async function Kt(n,e,t,i=!1,s=!1){const a=new Aa(n);let l;if(s)l=tn;else try{l=await a.verify(t)}catch{l=await a.verify(t,!0)}const h=Object.assign({},e);if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in h){const f=h.phoneEnrollmentInfo.phoneNumber,I=h.phoneEnrollmentInfo.recaptchaToken;Object.assign(h,{phoneEnrollmentInfo:{phoneNumber:f,recaptchaToken:I,captchaResponse:l,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in h){const f=h.phoneSignInInfo.recaptchaToken;Object.assign(h,{phoneSignInInfo:{recaptchaToken:f,captchaResponse:l,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return h}return i?Object.assign(h,{captchaResp:l}):Object.assign(h,{captchaResponse:l}),Object.assign(h,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(h,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),h}async function Ze(n,e,t,i,s){var a,l;if(s==="EMAIL_PASSWORD_PROVIDER")if(!((a=n._getRecaptchaConfig())===null||a===void 0)&&a.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const h=await Kt(n,e,t,t==="getOobCode");return i(n,h)}else return i(n,e).catch(async h=>{if(h.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const f=await Kt(n,e,t,t==="getOobCode");return i(n,f)}else return Promise.reject(h)});else if(s==="PHONE_PROVIDER")if(!((l=n._getRecaptchaConfig())===null||l===void 0)&&l.isProviderEnabled("PHONE_PROVIDER")){const h=await Kt(n,e,t);return i(n,h).catch(async f=>{var I;if(((I=n._getRecaptchaConfig())===null||I===void 0?void 0:I.getProviderEnforcementState("PHONE_PROVIDER"))==="AUDIT"&&(f.code==="auth/missing-recaptcha-token"||f.code==="auth/invalid-app-credential")){console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${t} flow.`);const b=await Kt(n,e,t,!1,!0);return i(n,b)}return Promise.reject(f)})}else{const h=await Kt(n,e,t,!1,!0);return i(n,h)}else return Promise.reject(s+" provider is not supported.")}async function Th(n){const e=Q(n),t=await da(e,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}),i=new ha(t);e.tenantId==null?e._agentRecaptchaConfig=i:e._tenantRecaptchaConfigs[e.tenantId]=i,i.isAnyProviderEnabled()&&new Aa(e).verify()}/**
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
 */function bh(n,e){const t=ir(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),a=t.getOptions();if(lt(a,e??{}))return s;me(s,"already-initialized")}return t.initialize({options:e})}function Ah(n,e){const t=e?.persistence||[],i=(Array.isArray(t)?t:[t]).map(Ue);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(i,e?.popupRedirectResolver)}function Sh(n,e,t){const i=Q(n);R(/^https?:\/\//.test(e),i,"invalid-emulator-scheme");const s=!1,a=Sa(e),{host:l,port:h}=Rh(e),f=h===null?"":`:${h}`,I={url:`${a}//${l}${f}/`},b=Object.freeze({host:l,port:h,protocol:a.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!i._canInitEmulator){R(i.config.emulator&&i.emulatorConfig,i,"emulator-config-failed"),R(lt(I,i.config.emulator)&&lt(b,i.emulatorConfig),i,"emulator-config-failed");return}i.config.emulator=I,i.emulatorConfig=b,i.settings.appVerificationDisabledForTesting=!0,pt(l)?(pi(`${a}//${l}${f}`),gi("Auth",!0)):Ph()}function Sa(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Rh(n){const e=Sa(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const i=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(i);if(s){const a=s[1];return{host:a,port:oo(i.substr(a.length+1))}}else{const[a,l]=i.split(":");return{host:a,port:oo(l)}}}function oo(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Ph(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class cr{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Le("not implemented")}_getIdTokenResponse(e){return Le("not implemented")}_linkToIdToken(e,t){return Le("not implemented")}_getReauthenticationResolver(e){return Le("not implemented")}}/**
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
 */async function kh(n,e){return Z(n,"POST","/v1/accounts:resetPassword",Y(n,e))}async function Ch(n,e){return Z(n,"POST","/v1/accounts:update",e)}async function Oh(n,e){return Z(n,"POST","/v1/accounts:signUp",e)}async function Nh(n,e){return Z(n,"POST","/v1/accounts:update",Y(n,e))}/**
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
 */async function Dh(n,e){return Ve(n,"POST","/v1/accounts:signInWithPassword",Y(n,e))}async function lr(n,e){return Z(n,"POST","/v1/accounts:sendOobCode",Y(n,e))}async function Lh(n,e){return lr(n,e)}async function Uh(n,e){return lr(n,e)}async function Mh(n,e){return lr(n,e)}async function xh(n,e){return lr(n,e)}/**
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
 */async function Fh(n,e){return Ve(n,"POST","/v1/accounts:signInWithEmailLink",Y(n,e))}async function Vh(n,e){return Ve(n,"POST","/v1/accounts:signInWithEmailLink",Y(n,e))}/**
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
 */class fn extends cr{constructor(e,t,i,s=null){super("password",i),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new fn(e,t,"password")}static _fromEmailAndCode(e,t,i=null){return new fn(e,t,"emailLink",i)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ze(e,t,"signInWithPassword",Dh,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Fh(e,{email:this._email,oobCode:this._password});default:me(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const i={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Ze(e,i,"signUpPassword",Oh,"EMAIL_PASSWORD_PROVIDER");case"emailLink":return Vh(e,{idToken:t,email:this._email,oobCode:this._password});default:me(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function bt(n,e){return Ve(n,"POST","/v1/accounts:signInWithIdp",Y(n,e))}/**
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
 */const jh="http://localhost";class Fe extends cr{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Fe(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):me("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:i,signInMethod:s}=t,a=yi(t,["providerId","signInMethod"]);if(!i||!s)return null;const l=new Fe(i,s);return l.idToken=a.idToken||void 0,l.accessToken=a.accessToken||void 0,l.secret=a.secret,l.nonce=a.nonce,l.pendingToken=a.pendingToken||null,l}_getIdTokenResponse(e){const t=this.buildRequest();return bt(e,t)}_linkToIdToken(e,t){const i=this.buildRequest();return i.idToken=t,bt(e,i)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,bt(e,t)}buildRequest(){const e={requestUri:jh,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=kt(t)}return e}}/**
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
 */async function ao(n,e){return Z(n,"POST","/v1/accounts:sendVerificationCode",Y(n,e))}async function Bh(n,e){return Ve(n,"POST","/v1/accounts:signInWithPhoneNumber",Y(n,e))}async function Hh(n,e){const t=await Ve(n,"POST","/v1/accounts:signInWithPhoneNumber",Y(n,e));if(t.temporaryProof)throw Zt(n,"account-exists-with-different-credential",t);return t}const $h={USER_NOT_FOUND:"user-not-found"};async function Wh(n,e){const t=Object.assign(Object.assign({},e),{operation:"REAUTH"});return Ve(n,"POST","/v1/accounts:signInWithPhoneNumber",Y(n,t),$h)}/**
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
 */class nn extends cr{constructor(e){super("phone","phone"),this.params=e}static _fromVerification(e,t){return new nn({verificationId:e,verificationCode:t})}static _fromTokenResponse(e,t){return new nn({phoneNumber:e,temporaryProof:t})}_getIdTokenResponse(e){return Bh(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return Hh(e,Object.assign({idToken:t},this._makeVerificationRequest()))}_getReauthenticationResolver(e){return Wh(e,this._makeVerificationRequest())}_makeVerificationRequest(){const{temporaryProof:e,phoneNumber:t,verificationId:i,verificationCode:s}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:i,code:s}}toJSON(){const e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(e){typeof e=="string"&&(e=JSON.parse(e));const{verificationId:t,verificationCode:i,phoneNumber:s,temporaryProof:a}=e;return!i&&!t&&!s&&!a?null:new nn({verificationId:t,verificationCode:i,phoneNumber:s,temporaryProof:a})}}/**
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
 */function qh(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function zh(n){const e=Xt(Yt(n)).link,t=e?Xt(Yt(e)).deep_link_id:null,i=Xt(Yt(n)).deep_link_id;return(i?Xt(Yt(i)).link:null)||i||t||e||n}class ur{constructor(e){var t,i,s,a,l,h;const f=Xt(Yt(e)),I=(t=f.apiKey)!==null&&t!==void 0?t:null,b=(i=f.oobCode)!==null&&i!==void 0?i:null,A=qh((s=f.mode)!==null&&s!==void 0?s:null);R(I&&b&&A,"argument-error"),this.apiKey=I,this.operation=A,this.code=b,this.continueUrl=(a=f.continueUrl)!==null&&a!==void 0?a:null,this.languageCode=(l=f.lang)!==null&&l!==void 0?l:null,this.tenantId=(h=f.tenantId)!==null&&h!==void 0?h:null}static parseLink(e){const t=zh(e);try{return new ur(t)}catch{return null}}}/**
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
 */class mt{constructor(){this.providerId=mt.PROVIDER_ID}static credential(e,t){return fn._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const i=ur.parseLink(t);return R(i,"argument-error"),fn._fromEmailAndCode(e,i.code,i.tenantId)}}mt.PROVIDER_ID="password";mt.EMAIL_PASSWORD_SIGN_IN_METHOD="password";mt.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Ct{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class Ot extends Ct{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}class Gn extends Ot{static credentialFromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;return R("providerId"in t&&"signInMethod"in t,"argument-error"),Fe._fromParams(t)}credential(e){return this._credential(Object.assign(Object.assign({},e),{nonce:e.rawNonce}))}_credential(e){return R(e.idToken||e.accessToken,"argument-error"),Fe._fromParams(Object.assign(Object.assign({},e),{providerId:this.providerId,signInMethod:this.providerId}))}static credentialFromResult(e){return Gn.oauthCredentialFromTaggedObject(e)}static credentialFromError(e){return Gn.oauthCredentialFromTaggedObject(e.customData||{})}static oauthCredentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i,oauthTokenSecret:s,pendingToken:a,nonce:l,providerId:h}=e;if(!i&&!s&&!t&&!a||!h)return null;try{return new Gn(h)._credential({idToken:t,accessToken:i,nonce:l,pendingToken:a})}catch{return null}}}/**
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
 */class qe extends Ot{constructor(){super("facebook.com")}static credential(e){return Fe._fromParams({providerId:qe.PROVIDER_ID,signInMethod:qe.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return qe.credentialFromTaggedObject(e)}static credentialFromError(e){return qe.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return qe.credential(e.oauthAccessToken)}catch{return null}}}qe.FACEBOOK_SIGN_IN_METHOD="facebook.com";qe.PROVIDER_ID="facebook.com";/**
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
 */class Ne extends Ot{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Fe._fromParams({providerId:Ne.PROVIDER_ID,signInMethod:Ne.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return Ne.credentialFromTaggedObject(e)}static credentialFromError(e){return Ne.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:i}=e;if(!t&&!i)return null;try{return Ne.credential(t,i)}catch{return null}}}Ne.GOOGLE_SIGN_IN_METHOD="google.com";Ne.PROVIDER_ID="google.com";/**
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
 */class ze extends Ot{constructor(){super("github.com")}static credential(e){return Fe._fromParams({providerId:ze.PROVIDER_ID,signInMethod:ze.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ze.credentialFromTaggedObject(e)}static credentialFromError(e){return ze.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ze.credential(e.oauthAccessToken)}catch{return null}}}ze.GITHUB_SIGN_IN_METHOD="github.com";ze.PROVIDER_ID="github.com";/**
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
 */class Ge extends Ot{constructor(){super("twitter.com")}static credential(e,t){return Fe._fromParams({providerId:Ge.PROVIDER_ID,signInMethod:Ge.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return Ge.credentialFromTaggedObject(e)}static credentialFromError(e){return Ge.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:i}=e;if(!t||!i)return null;try{return Ge.credential(t,i)}catch{return null}}}Ge.TWITTER_SIGN_IN_METHOD="twitter.com";Ge.PROVIDER_ID="twitter.com";/**
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
 */async function Ra(n,e){return Ve(n,"POST","/v1/accounts:signUp",Y(n,e))}/**
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
 */class Pe{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,i,s=!1){const a=await ve._fromIdTokenResponse(e,i,s),l=co(i);return new Pe({user:a,providerId:l,_tokenResponse:i,operationType:t})}static async _forOperation(e,t,i){await e._updateTokensIfNecessary(i,!0);const s=co(i);return new Pe({user:e,providerId:s,_tokenResponse:i,operationType:t})}}function co(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */async function Cg(n){var e;if(J(n.app))return Promise.reject(he(n));const t=Q(n);if(await t._initializationPromise,!((e=t.currentUser)===null||e===void 0)&&e.isAnonymous)return new Pe({user:t.currentUser,providerId:null,operationType:"signIn"});const i=await Ra(t,{returnSecureToken:!0}),s=await Pe._fromIdTokenResponse(t,"signIn",i,!0);return await t._updateCurrentUser(s.user),s}/**
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
 */class er extends ke{constructor(e,t,i,s){var a;super(t.code,t.message),this.operationType=i,this.user=s,Object.setPrototypeOf(this,er.prototype),this.customData={appName:e.name,tenantId:(a=e.tenantId)!==null&&a!==void 0?a:void 0,_serverResponse:t.customData._serverResponse,operationType:i}}static _fromErrorAndOperation(e,t,i,s){return new er(e,t,i,s)}}function Pa(n,e,t,i){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(a=>{throw a.code==="auth/multi-factor-auth-required"?er._fromErrorAndOperation(n,a,e,i):a})}/**
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
 */function ka(n){return new Set(n.map(({providerId:e})=>e).filter(e=>!!e))}/**
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
 */async function Og(n,e){const t=M(n);await hr(!0,t,e);const{providerUserInfo:i}=await Xu(t.auth,{idToken:await t.getIdToken(),deleteProvider:[e]}),s=ka(i||[]);return t.providerData=t.providerData.filter(a=>s.has(a.providerId)),s.has("phone")||(t.phoneNumber=null),await t.auth._persistUserIfCurrent(t),t}async function Ca(n,e,t=!1){const i=await ht(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Pe._forOperation(n,"link",i)}async function hr(n,e,t){await dn(e);const i=ka(e.providerData),s=n===!1?"provider-already-linked":"no-such-provider";R(i.has(t)===n,e.auth,s)}/**
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
 */async function Gh(n,e,t=!1){const{auth:i}=n;if(J(i.app))return Promise.reject(he(i));const s="reauthenticate";try{const a=await ht(n,Pa(i,s,e,n),t);R(a.idToken,i,"internal-error");const l=ar(a.idToken);R(l,i,"internal-error");const{sub:h}=l;return R(n.uid===h,i,"user-mismatch"),Pe._forOperation(n,s,a)}catch(a){throw a?.code==="auth/user-not-found"&&me(i,"user-mismatch"),a}}/**
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
 */async function Oa(n,e,t=!1){if(J(n.app))return Promise.reject(he(n));const i="signIn",s=await Pa(n,i,e),a=await Pe._fromIdTokenResponse(n,i,s);return t||await n._updateCurrentUser(a.user),a}async function Ai(n,e){return Oa(Q(n),e)}async function Kh(n,e){const t=M(n);return await hr(!1,t,e.providerId),Ca(t,e)}/**
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
 */async function Jh(n,e){return Ve(n,"POST","/v1/accounts:signInWithCustomToken",Y(n,e))}/**
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
 */async function Ng(n,e){if(J(n.app))return Promise.reject(he(n));const t=Q(n),i=await Jh(t,{token:e,returnSecureToken:!0}),s=await Pe._fromIdTokenResponse(t,"signIn",i);return await t._updateCurrentUser(s.user),s}/**
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
 */function dr(n,e,t){var i;R(((i=t.url)===null||i===void 0?void 0:i.length)>0,n,"invalid-continue-uri"),R(typeof t.dynamicLinkDomain>"u"||t.dynamicLinkDomain.length>0,n,"invalid-dynamic-link-domain"),R(typeof t.linkDomain>"u"||t.linkDomain.length>0,n,"invalid-hosting-link-domain"),e.continueUrl=t.url,e.dynamicLinkDomain=t.dynamicLinkDomain,e.linkDomain=t.linkDomain,e.canHandleCodeInApp=t.handleCodeInApp,t.iOS&&(R(t.iOS.bundleId.length>0,n,"missing-ios-bundle-id"),e.iOSBundleId=t.iOS.bundleId),t.android&&(R(t.android.packageName.length>0,n,"missing-android-pkg-name"),e.androidInstallApp=t.android.installApp,e.androidMinimumVersionCode=t.android.minimumVersion,e.androidPackageName=t.android.packageName)}/**
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
 */async function Si(n){const e=Q(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}async function Dg(n,e,t){const i=Q(n),s={requestType:"PASSWORD_RESET",email:e,clientType:"CLIENT_TYPE_WEB"};t&&dr(i,s,t),await Ze(i,s,"getOobCode",Uh,"EMAIL_PASSWORD_PROVIDER")}async function Lg(n,e,t){await kh(M(n),{oobCode:e,newPassword:t}).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&Si(n),i})}async function Ug(n,e){await Nh(M(n),{oobCode:e})}async function Mg(n,e,t){if(J(n.app))return Promise.reject(he(n));const i=Q(n),l=await Ze(i,{returnSecureToken:!0,email:e,password:t,clientType:"CLIENT_TYPE_WEB"},"signUpPassword",Ra,"EMAIL_PASSWORD_PROVIDER").catch(f=>{throw f.code==="auth/password-does-not-meet-requirements"&&Si(n),f}),h=await Pe._fromIdTokenResponse(i,"signIn",l);return await i._updateCurrentUser(h.user),h}function xg(n,e,t){return J(n.app)?Promise.reject(he(n)):Ai(M(n),mt.credential(e,t)).catch(async i=>{throw i.code==="auth/password-does-not-meet-requirements"&&Si(n),i})}/**
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
 */async function Fg(n,e,t){const i=Q(n),s={requestType:"EMAIL_SIGNIN",email:e,clientType:"CLIENT_TYPE_WEB"};function a(l,h){R(h.handleCodeInApp,i,"argument-error"),h&&dr(i,l,h)}a(s,t),await Ze(i,s,"getOobCode",Mh,"EMAIL_PASSWORD_PROVIDER")}function Vg(n,e){const t=ur.parseLink(e);return t?.operation==="EMAIL_SIGNIN"}async function jg(n,e,t){if(J(n.app))return Promise.reject(he(n));const i=M(n),s=mt.credentialWithLink(e,t||hn());return R(s._tenantId===(i.tenantId||null),i,"tenant-id-mismatch"),Ai(i,s)}/**
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
 */async function Xh(n,e){return Z(n,"POST","/v1/accounts:createAuthUri",Y(n,e))}/**
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
 */async function Bg(n,e){const t=Ii()?hn():"http://localhost",i={identifier:e,continueUri:t},{signinMethods:s}=await Xh(M(n),i);return s||[]}async function Hg(n,e){const t=M(n),s={requestType:"VERIFY_EMAIL",idToken:await n.getIdToken()};e&&dr(t.auth,s,e);const{email:a}=await Lh(t.auth,s);a!==n.email&&await n.reload()}async function $g(n,e,t){const i=M(n),a={requestType:"VERIFY_AND_CHANGE_EMAIL",idToken:await n.getIdToken(),newEmail:e};t&&dr(i.auth,a,t);const{email:l}=await xh(i.auth,a);l!==n.email&&await n.reload()}/**
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
 */async function Yh(n,e){return Z(n,"POST","/v1/accounts:update",e)}/**
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
 */async function Wg(n,{displayName:e,photoURL:t}){if(e===void 0&&t===void 0)return;const i=M(n),a={idToken:await i.getIdToken(),displayName:e,photoUrl:t,returnSecureToken:!0},l=await ht(i,Yh(i.auth,a));i.displayName=l.displayName||null,i.photoURL=l.photoUrl||null;const h=i.providerData.find(({providerId:f})=>f==="password");h&&(h.displayName=i.displayName,h.photoURL=i.photoURL),await i._updateTokensIfNecessary(l)}function qg(n,e){const t=M(n);return J(t.auth.app)?Promise.reject(he(t.auth)):Na(t,e,null)}function zg(n,e){return Na(M(n),null,e)}async function Na(n,e,t){const{auth:i}=n,a={idToken:await n.getIdToken(),returnSecureToken:!0};e&&(a.email=e),t&&(a.password=t);const l=await ht(n,Ch(i,a));await n._updateTokensIfNecessary(l,!0)}/**
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
 */function Zh(n){var e,t;if(!n)return null;const{providerId:i}=n,s=n.rawUserInfo?JSON.parse(n.rawUserInfo):{},a=n.isNewUser||n.kind==="identitytoolkit#SignupNewUserResponse";if(!i&&n?.idToken){const l=(t=(e=ar(n.idToken))===null||e===void 0?void 0:e.firebase)===null||t===void 0?void 0:t.sign_in_provider;if(l){const h=l!=="anonymous"&&l!=="custom"?l:null;return new At(a,h)}}if(!i)return null;switch(i){case"facebook.com":return new Qh(a,s);case"github.com":return new ed(a,s);case"google.com":return new td(a,s);case"twitter.com":return new nd(a,s,n.screenName||null);case"custom":case"anonymous":return new At(a,null);default:return new At(a,i,s)}}class At{constructor(e,t,i={}){this.isNewUser=e,this.providerId=t,this.profile=i}}class Da extends At{constructor(e,t,i,s){super(e,t,i),this.username=s}}class Qh extends At{constructor(e,t){super(e,"facebook.com",t)}}class ed extends Da{constructor(e,t){super(e,"github.com",t,typeof t?.login=="string"?t?.login:null)}}class td extends At{constructor(e,t){super(e,"google.com",t)}}class nd extends Da{constructor(e,t,i){super(e,"twitter.com",t,i)}}function Gg(n){const{user:e,_tokenResponse:t}=n;return e.isAnonymous&&!t?{providerId:null,isNewUser:!1,profile:null}:Zh(t)}/**
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
 */function rd(n,e){return M(n).setPersistence(e)}function id(n,e,t,i){return M(n).onIdTokenChanged(e,t,i)}function sd(n,e,t){return M(n).beforeAuthStateChanged(e,t)}function Kg(n,e,t,i){return M(n).onAuthStateChanged(e,t,i)}function Jg(n){return M(n).signOut()}function Xg(n,e){return Q(n).revokeAccessToken(e)}async function Yg(n){return M(n).delete()}/**
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
 */function lo(n,e){return Z(n,"POST","/v2/accounts/mfaEnrollment:start",Y(n,e))}const tr="__sak";/**
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
 */class La{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(tr,"1"),this.storage.removeItem(tr),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const od=1e3,ad=10;class Ua extends La{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ea(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const i=this.storage.getItem(t),s=this.localCache[t];i!==s&&e(t,s,i)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((l,h,f)=>{this.notifyListeners(l,f)});return}const i=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const l=this.storage.getItem(i);!t&&this.localCache[i]===l||this.notifyListeners(i,l)},a=this.storage.getItem(i);sh()&&a!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,ad):s()}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,i)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:i}),!0)})},od)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Ua.type="LOCAL";const Ma=Ua;/**
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
 */class xa extends La{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}xa.type="SESSION";const Fa=xa;/**
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
 */function cd(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class fr{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const i=new fr(e);return this.receivers.push(i),i}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:i,eventType:s,data:a}=t.data,l=this.handlersMap[s];if(!l?.size)return;t.ports[0].postMessage({status:"ack",eventId:i,eventType:s});const h=Array.from(l).map(async I=>I(t.origin,a)),f=await cd(h);t.ports[0].postMessage({status:"done",eventId:i,eventType:s,response:f})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}fr.receivers=[];/**
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
 */function pr(n="",e=10){let t="";for(let i=0;i<e;i++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class ld{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,i=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let a,l;return new Promise((h,f)=>{const I=pr("",20);s.port1.start();const b=setTimeout(()=>{f(new Error("unsupported_event"))},i);l={messageChannel:s,onMessage(A){const T=A;if(T.data.eventId===I)switch(T.data.status){case"ack":clearTimeout(b),a=setTimeout(()=>{f(new Error("timeout"))},3e3);break;case"done":clearTimeout(a),h(T.data.response);break;default:clearTimeout(b),clearTimeout(a),f(new Error("invalid_response"));break}}},this.handlers.add(l),s.port1.addEventListener("message",l.onMessage),this.target.postMessage({eventType:e,eventId:I,data:t},[s.port2])}).finally(()=>{l&&this.removeMessageHandler(l)})}}/**
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
 */function K(){return window}function ud(n){K().location.href=n}/**
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
 */function Ri(){return typeof K().WorkerGlobalScope<"u"&&typeof K().importScripts=="function"}async function hd(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function dd(){var n;return((n=navigator?.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function fd(){return Ri()?self:null}/**
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
 */const Va="firebaseLocalStorageDb",pd=1,nr="firebaseLocalStorage",ja="fbase_key";class vn{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function gr(n,e){return n.transaction([nr],e?"readwrite":"readonly").objectStore(nr)}function gd(){const n=indexedDB.deleteDatabase(Va);return new vn(n).toPromise()}function li(){const n=indexedDB.open(Va,pd);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const i=n.result;try{i.createObjectStore(nr,{keyPath:ja})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const i=n.result;i.objectStoreNames.contains(nr)?e(i):(i.close(),await gd(),e(await li()))})})}async function uo(n,e,t){const i=gr(n,!0).put({[ja]:e,value:t});return new vn(i).toPromise()}async function md(n,e){const t=gr(n,!1).get(e),i=await new vn(t).toPromise();return i===void 0?null:i.value}function ho(n,e){const t=gr(n,!0).delete(e);return new vn(t).toPromise()}const _d=800,yd=3;class Ba{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await li(),this.db)}async _withRetries(e){let t=0;for(;;)try{const i=await this._openDb();return await e(i)}catch(i){if(t++>yd)throw i;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Ri()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=fr._getInstance(fd()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await hd(),!this.activeServiceWorker)return;this.sender=new ld(this.activeServiceWorker);const i=await this.sender._send("ping",{},800);i&&!((e=i[0])===null||e===void 0)&&e.fulfilled&&!((t=i[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||dd()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await li();return await uo(e,tr,"1"),await ho(e,tr),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(i=>uo(i,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(i=>md(i,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>ho(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const a=gr(s,!1).getAll();return new vn(a).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],i=new Set;if(e.length!==0)for(const{fbase_key:s,value:a}of e)i.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(a)&&(this.notifyListeners(s,a),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!i.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const i=this.listeners[e];if(i)for(const s of Array.from(i))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),_d)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Ba.type="LOCAL";const vd=Ba;/**
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
 */function fo(n,e){return Z(n,"POST","/v2/accounts/mfaSignIn:start",Y(n,e))}/**
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
 */const Xr=ba("rcb"),wd=new _n(3e4,6e4);class Id{constructor(){var e;this.hostLanguage="",this.counter=0,this.librarySeparatelyLoaded=!!(!((e=K().grecaptcha)===null||e===void 0)&&e.render)}load(e,t=""){return R(Ed(t),e,"argument-error"),this.shouldResolveImmediately(t)&&Qs(K().grecaptcha)?Promise.resolve(K().grecaptcha):new Promise((i,s)=>{const a=K().setTimeout(()=>{s(pe(e,"network-request-failed"))},wd.get());K()[Xr]=()=>{K().clearTimeout(a),delete K()[Xr];const h=K().grecaptcha;if(!h||!Qs(h)){s(pe(e,"internal-error"));return}const f=h.render;h.render=(I,b)=>{const A=f(I,b);return this.counter++,A},this.hostLanguage=t,i(h)};const l=`${dh()}?${kt({onload:Xr,render:"explicit",hl:t})}`;bi(l).catch(()=>{clearTimeout(a),s(pe(e,"internal-error"))})})}clearedOneInstance(){this.counter--}shouldResolveImmediately(e){var t;return!!(!((t=K().grecaptcha)===null||t===void 0)&&t.render)&&(e===this.hostLanguage||this.counter>0||this.librarySeparatelyLoaded)}}function Ed(n){return n.length<=6&&/^\s*[a-zA-Z0-9\-]*\s*$/.test(n)}class Td{async load(e){return new _h(e)}clearedOneInstance(){}}/**
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
 */const rn="recaptcha",bd={theme:"light",type:"image"};class Zg{constructor(e,t,i=Object.assign({},bd)){this.parameters=i,this.type=rn,this.destroyed=!1,this.widgetId=null,this.tokenChangeListeners=new Set,this.renderPromise=null,this.recaptcha=null,this.auth=Q(e),this.isInvisible=this.parameters.size==="invisible",R(typeof document<"u",this.auth,"operation-not-supported-in-this-environment");const s=typeof t=="string"?document.getElementById(t):t;R(s,this.auth,"argument-error"),this.container=s,this.parameters.callback=this.makeTokenCallback(this.parameters.callback),this._recaptchaLoader=this.auth.settings.appVerificationDisabledForTesting?new Td:new Id,this.validateStartingState()}async verify(){this.assertNotDestroyed();const e=await this.render(),t=this.getAssertedRecaptcha(),i=t.getResponse(e);return i||new Promise(s=>{const a=l=>{l&&(this.tokenChangeListeners.delete(a),s(l))};this.tokenChangeListeners.add(a),this.isInvisible&&t.execute(e)})}render(){try{this.assertNotDestroyed()}catch(e){return Promise.reject(e)}return this.renderPromise?this.renderPromise:(this.renderPromise=this.makeRenderPromise().catch(e=>{throw this.renderPromise=null,e}),this.renderPromise)}_reset(){this.assertNotDestroyed(),this.widgetId!==null&&this.getAssertedRecaptcha().reset(this.widgetId)}clear(){this.assertNotDestroyed(),this.destroyed=!0,this._recaptchaLoader.clearedOneInstance(),this.isInvisible||this.container.childNodes.forEach(e=>{this.container.removeChild(e)})}validateStartingState(){R(!this.parameters.sitekey,this.auth,"argument-error"),R(this.isInvisible||!this.container.hasChildNodes(),this.auth,"argument-error"),R(typeof document<"u",this.auth,"operation-not-supported-in-this-environment")}makeTokenCallback(e){return t=>{if(this.tokenChangeListeners.forEach(i=>i(t)),typeof e=="function")e(t);else if(typeof e=="string"){const i=K()[e];typeof i=="function"&&i(t)}}}assertNotDestroyed(){R(!this.destroyed,this.auth,"internal-error")}async makeRenderPromise(){if(await this.init(),!this.widgetId){let e=this.container;if(!this.isInvisible){const t=document.createElement("div");e.appendChild(t),e=t}this.widgetId=this.getAssertedRecaptcha().render(e,this.parameters)}return this.widgetId}async init(){R(Ii()&&!Ri(),this.auth,"internal-error"),await Ad(),this.recaptcha=await this._recaptchaLoader.load(this.auth,this.auth.languageCode||void 0);const e=await Ku(this.auth);R(e,this.auth,"internal-error"),this.parameters.sitekey=e}getAssertedRecaptcha(){return R(this.recaptcha,this.auth,"internal-error"),this.recaptcha}}function Ad(){let n=null;return new Promise(e=>{if(document.readyState==="complete"){e();return}n=()=>e(),window.addEventListener("load",n)}).catch(e=>{throw n&&window.removeEventListener("load",n),e})}/**
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
 */class Ha{constructor(e,t){this.verificationId=e,this.onConfirmation=t}confirm(e){const t=nn._fromVerification(this.verificationId,e);return this.onConfirmation(t)}}async function Qg(n,e,t){if(J(n.app))return Promise.reject(he(n));const i=Q(n),s=await $a(i,e,M(t));return new Ha(s,a=>Ai(i,a))}async function em(n,e,t){const i=M(n);await hr(!1,i,"phone");const s=await $a(i.auth,e,M(t));return new Ha(s,a=>Kh(i,a))}async function $a(n,e,t){var i;if(!n._getRecaptchaConfig())try{await Th(n)}catch{console.log("Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.")}try{let s;if(typeof e=="string"?s={phoneNumber:e}:s=e,"session"in s){const a=s.session;if("phoneNumber"in s){R(a.type==="enroll",n,"internal-error");const l={idToken:a.credential,phoneEnrollmentInfo:{phoneNumber:s.phoneNumber,clientType:"CLIENT_TYPE_WEB"}};return(await Ze(n,l,"mfaSmsEnrollment",async(b,A)=>{if(A.phoneEnrollmentInfo.captchaResponse===tn){R(t?.type===rn,b,"argument-error");const T=await Yr(b,A,t);return lo(b,T)}return lo(b,A)},"PHONE_PROVIDER").catch(b=>Promise.reject(b))).phoneSessionInfo.sessionInfo}else{R(a.type==="signin",n,"internal-error");const l=((i=s.multiFactorHint)===null||i===void 0?void 0:i.uid)||s.multiFactorUid;R(l,n,"missing-multi-factor-info");const h={mfaPendingCredential:a.credential,mfaEnrollmentId:l,phoneSignInInfo:{clientType:"CLIENT_TYPE_WEB"}};return(await Ze(n,h,"mfaSmsSignIn",async(A,T)=>{if(T.phoneSignInInfo.captchaResponse===tn){R(t?.type===rn,A,"argument-error");const C=await Yr(A,T,t);return fo(A,C)}return fo(A,T)},"PHONE_PROVIDER").catch(A=>Promise.reject(A))).phoneResponseInfo.sessionInfo}}else{const a={phoneNumber:s.phoneNumber,clientType:"CLIENT_TYPE_WEB"};return(await Ze(n,a,"sendVerificationCode",async(I,b)=>{if(b.captchaResponse===tn){R(t?.type===rn,I,"argument-error");const A=await Yr(I,b,t);return ao(I,A)}return ao(I,b)},"PHONE_PROVIDER").catch(I=>Promise.reject(I))).sessionInfo}}finally{t?._reset()}}async function Yr(n,e,t){R(t.type===rn,n,"argument-error");const i=await t.verify();R(typeof i=="string",n,"argument-error");const s=Object.assign({},e);if("phoneEnrollmentInfo"in s){const a=s.phoneEnrollmentInfo.phoneNumber,l=s.phoneEnrollmentInfo.captchaResponse,h=s.phoneEnrollmentInfo.clientType,f=s.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(s,{phoneEnrollmentInfo:{phoneNumber:a,recaptchaToken:i,captchaResponse:l,clientType:h,recaptchaVersion:f}}),s}else if("phoneSignInInfo"in s){const a=s.phoneSignInInfo.captchaResponse,l=s.phoneSignInInfo.clientType,h=s.phoneSignInInfo.recaptchaVersion;return Object.assign(s,{phoneSignInInfo:{recaptchaToken:i,captchaResponse:a,clientType:l,recaptchaVersion:h}}),s}else return Object.assign(s,{recaptchaToken:i}),s}/**
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
 */function wn(n,e){return e?Ue(e):(R(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Pi extends cr{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return bt(e,this._buildIdpRequest())}_linkToIdToken(e,t){return bt(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return bt(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Sd(n){return Oa(n.auth,new Pi(n),n.bypassAuthState)}function Rd(n){const{auth:e,user:t}=n;return R(t,e,"internal-error"),Gh(t,new Pi(n),n.bypassAuthState)}async function Pd(n){const{auth:e,user:t}=n;return R(t,e,"internal-error"),Ca(t,new Pi(n),n.bypassAuthState)}/**
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
 */class Wa{constructor(e,t,i,s,a=!1){this.auth=e,this.resolver=i,this.user=s,this.bypassAuthState=a,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(i){this.reject(i)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:i,postBody:s,tenantId:a,error:l,type:h}=e;if(l){this.reject(l);return}const f={auth:this.auth,requestUri:t,sessionId:i,tenantId:a||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(h)(f))}catch(I){this.reject(I)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Sd;case"linkViaPopup":case"linkViaRedirect":return Pd;case"reauthViaPopup":case"reauthViaRedirect":return Rd;default:me(this.auth,"internal-error")}}resolve(e){xe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){xe(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const kd=new _n(2e3,1e4);async function tm(n,e,t){if(J(n.app))return Promise.reject(pe(n,"operation-not-supported-in-this-environment"));const i=Q(n);or(n,e,Ct);const s=wn(i,t);return new Je(i,"signInViaPopup",e,s).executeNotNull()}async function nm(n,e,t){const i=M(n);or(i.auth,e,Ct);const s=wn(i.auth,t);return new Je(i.auth,"linkViaPopup",e,s,i).executeNotNull()}class Je extends Wa{constructor(e,t,i,s,a){super(e,t,s,a),this.provider=i,this.authWindow=null,this.pollId=null,Je.currentPopupAction&&Je.currentPopupAction.cancel(),Je.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return R(e,this.auth,"internal-error"),e}async onExecution(){xe(this.filter.length===1,"Popup operations only handle one event");const e=pr();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(pe(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(pe(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Je.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,i;if(!((i=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||i===void 0)&&i.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(pe(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,kd.get())};e()}}Je.currentPopupAction=null;/**
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
 */const Cd="pendingRedirect",Kn=new Map;class Od extends Wa{constructor(e,t,i=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,i),this.eventId=null}async execute(){let e=Kn.get(this.auth._key());if(!e){try{const i=await Nd(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(i)}catch(t){e=()=>Promise.reject(t)}Kn.set(this.auth._key(),e)}return this.bypassAuthState||Kn.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Nd(n,e){const t=Ga(e),i=za(n);if(!await i._isAvailable())return!1;const s=await i._get(t)==="true";return await i._remove(t),s}async function qa(n,e){return za(n)._set(Ga(e),"true")}function Dd(n,e){Kn.set(n._key(),e)}function za(n){return Ue(n._redirectPersistence)}function Ga(n){return zn(Cd,n.config.apiKey,n.name)}/**
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
 */function rm(n,e,t){return Ld(n,e,t)}async function Ld(n,e,t){if(J(n.app))return Promise.reject(he(n));const i=Q(n);or(n,e,Ct),await i._initializationPromise;const s=wn(i,t);return await qa(s,i),s._openRedirect(i,e,"signInViaRedirect")}function im(n,e,t){return Ud(n,e,t)}async function Ud(n,e,t){const i=M(n);or(i.auth,e,Ct),await i.auth._initializationPromise;const s=wn(i.auth,t);await hr(!1,i,e.providerId),await qa(s,i.auth);const a=await Md(i);return s._openRedirect(i.auth,e,"linkViaRedirect",a)}async function sm(n,e){return await Q(n)._initializationPromise,Ka(n,e,!1)}async function Ka(n,e,t=!1){if(J(n.app))return Promise.reject(he(n));const i=Q(n),s=wn(i,e),l=await new Od(i,s,t).execute();return l&&!t&&(delete l.user._redirectEventId,await i._persistUserIfCurrent(l.user),await i._setRedirectUser(null,e)),l}async function Md(n){const e=pr(`${n.uid}:::`);return n._redirectEventId=e,await n.auth._setRedirectUser(n),await n.auth._persistUserIfCurrent(n),e}/**
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
 */const xd=10*60*1e3;class Fd{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(i=>{this.isEventForConsumer(e,i)&&(t=!0,this.sendToConsumer(e,i),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Vd(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var i;if(e.error&&!Ja(e)){const s=((i=e.error.code)===null||i===void 0?void 0:i.split("auth/")[1])||"internal-error";t.onError(pe(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const i=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&i}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=xd&&this.cachedEventUids.clear(),this.cachedEventUids.has(po(e))}saveEventToCache(e){this.cachedEventUids.add(po(e)),this.lastProcessedEventTime=Date.now()}}function po(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Ja({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function Vd(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Ja(n);default:return!1}}/**
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
 */async function jd(n,e={}){return Z(n,"GET","/v1/projects",e)}/**
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
 */const Bd=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Hd=/^https?/;async function $d(n){if(n.config.emulator)return;const{authorizedDomains:e}=await jd(n);for(const t of e)try{if(Wd(t))return}catch{}me(n,"unauthorized-domain")}function Wd(n){const e=hn(),{protocol:t,hostname:i}=new URL(e);if(n.startsWith("chrome-extension://")){const l=new URL(n);return l.hostname===""&&i===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&l.hostname===i}if(!Hd.test(t))return!1;if(Bd.test(n))return i===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(i)}/**
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
 */const qd=new _n(3e4,6e4);function go(){const n=K().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function zd(n){return new Promise((e,t)=>{var i,s,a;function l(){go(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{go(),t(pe(n,"network-request-failed"))},timeout:qd.get()})}if(!((s=(i=K().gapi)===null||i===void 0?void 0:i.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((a=K().gapi)===null||a===void 0)&&a.load)l();else{const h=ba("iframefcb");return K()[h]=()=>{gapi.load?l():t(pe(n,"network-request-failed"))},bi(`${ph()}?onload=${h}`).catch(f=>t(f))}}).catch(e=>{throw Jn=null,e})}let Jn=null;function Gd(n){return Jn=Jn||zd(n),Jn}/**
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
 */const Kd=new _n(5e3,15e3),Jd="__/auth/iframe",Xd="emulator/auth/iframe",Yd={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Zd=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Qd(n){const e=n.config;R(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Ei(e,Xd):`https://${n.config.authDomain}/${Jd}`,i={apiKey:e.apiKey,appName:n.name,v:gt},s=Zd.get(n.config.apiHost);s&&(i.eid=s);const a=n._getFrameworks();return a.length&&(i.fw=a.join(",")),`${t}?${kt(i).slice(1)}`}async function ef(n){const e=await Gd(n),t=K().gapi;return R(t,n,"internal-error"),e.open({where:document.body,url:Qd(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Yd,dontclear:!0},i=>new Promise(async(s,a)=>{await i.restyle({setHideOnLeave:!1});const l=pe(n,"network-request-failed"),h=K().setTimeout(()=>{a(l)},Kd.get());function f(){K().clearTimeout(h),s(i)}i.ping(f).then(f,()=>{a(l)})}))}/**
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
 */const tf={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},nf=500,rf=600,sf="_blank",of="http://localhost";class mo{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function af(n,e,t,i=nf,s=rf){const a=Math.max((window.screen.availHeight-s)/2,0).toString(),l=Math.max((window.screen.availWidth-i)/2,0).toString();let h="";const f=Object.assign(Object.assign({},tf),{width:i.toString(),height:s.toString(),top:a,left:l}),I=de().toLowerCase();t&&(h=_a(I)?sf:t),ga(I)&&(e=e||of,f.scrollbars="yes");const b=Object.entries(f).reduce((T,[C,P])=>`${T}${C}=${P},`,"");if(ih(I)&&h!=="_self")return cf(e||"",h),new mo(null);const A=window.open(e||"",h,b);R(A,n,"popup-blocked");try{A.focus()}catch{}return new mo(A)}function cf(n,e){const t=document.createElement("a");t.href=n,t.target=e;const i=document.createEvent("MouseEvent");i.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(i)}/**
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
 */const lf="__/auth/handler",uf="emulator/auth/handler",hf=encodeURIComponent("fac");async function _o(n,e,t,i,s,a){R(n.config.authDomain,n,"auth-domain-config-required"),R(n.config.apiKey,n,"invalid-api-key");const l={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:i,v:gt,eventId:s};if(e instanceof Ct){e.setDefaultLanguage(n.languageCode),l.providerId=e.providerId||"",bl(e.getCustomParameters())||(l.customParameters=JSON.stringify(e.getCustomParameters()));for(const[b,A]of Object.entries({}))l[b]=A}if(e instanceof Ot){const b=e.getScopes().filter(A=>A!=="");b.length>0&&(l.scopes=b.join(","))}n.tenantId&&(l.tid=n.tenantId);const h=l;for(const b of Object.keys(h))h[b]===void 0&&delete h[b];const f=await n._getAppCheckToken(),I=f?`#${hf}=${encodeURIComponent(f)}`:"";return`${df(n)}?${kt(h).slice(1)}${I}`}function df({config:n}){return n.emulator?Ei(n,uf):`https://${n.authDomain}/${lf}`}/**
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
 */const Zr="webStorageSupport";class ff{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Fa,this._completeRedirectFn=Ka,this._overrideRedirectResult=Dd}async _openPopup(e,t,i,s){var a;xe((a=this.eventManagers[e._key()])===null||a===void 0?void 0:a.manager,"_initialize() not called before _openPopup()");const l=await _o(e,t,i,hn(),s);return af(e,l,pr())}async _openRedirect(e,t,i,s){await this._originValidation(e);const a=await _o(e,t,i,hn(),s);return ud(a),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:a}=this.eventManagers[t];return s?Promise.resolve(s):(xe(a,"If manager is not set, promise should be"),a)}const i=this.initAndGetManager(e);return this.eventManagers[t]={promise:i},i.catch(()=>{delete this.eventManagers[t]}),i}async initAndGetManager(e){const t=await ef(e),i=new Fd(e);return t.register("authEvent",s=>(R(s?.authEvent,e,"invalid-auth-event"),{status:i.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:i},this.iframes[e._key()]=t,i}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Zr,{type:Zr},s=>{var a;const l=(a=s?.[0])===null||a===void 0?void 0:a[Zr];l!==void 0&&t(!!l),me(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=$d(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Ea()||ma()||Ti()}}const pf=ff;var yo="@firebase/auth",vo="1.10.8";/**
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
 */class gf{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(i=>{e(i?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){R(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function mf(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function _f(n){ut(new Qe("auth",(e,{options:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),a=e.getProvider("app-check-internal"),{apiKey:l,authDomain:h}=i.options;R(l&&!l.includes(":"),"invalid-api-key",{appName:i.name});const f={apiKey:l,authDomain:h,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Ta(n)},I=new uh(i,s,a,f);return Ah(I,t),I},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,i)=>{e.getProvider("auth-internal").initialize()})),ut(new Qe("auth-internal",e=>{const t=Q(e.getProvider("auth").getImmediate());return(i=>new gf(i))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),Re(yo,vo,mf(n)),Re(yo,vo,"esm2017")}/**
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
 */const yf=5*60,vf=Qo("authIdTokenMaxAge")||yf;let wo=null;const wf=n=>async e=>{const t=e&&await e.getIdTokenResult(),i=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(i&&i>vf)return;const s=t?.token;wo!==s&&(wo=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function If(n=sr()){const e=ir(n,"auth");if(e.isInitialized())return e.getImmediate();const t=bh(n,{popupRedirectResolver:pf,persistence:[vd,Ma,Fa]}),i=Qo("authTokenSyncURL");if(i&&typeof isSecureContext=="boolean"&&isSecureContext){const a=new URL(i,location.origin);if(location.origin===a.origin){const l=wf(a.toString());sd(t,l,()=>l(t.currentUser)),id(t,h=>l(h))}}const s=Xo("auth");return s&&Sh(t,`http://${s}`),t}function Ef(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}hh({loadJS(n){return new Promise((e,t)=>{const i=document.createElement("script");i.setAttribute("src",n),i.onload=e,i.onerror=s=>{const a=pe("internal-error");a.customData=s,t(a)},i.type="text/javascript",i.charset="UTF-8",Ef().appendChild(i)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});_f("Browser");var Io=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var ki;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(y,d){function p(){}p.prototype=d.prototype,y.D=d.prototype,y.prototype=new p,y.prototype.constructor=y,y.C=function(m,_,v){for(var g=Array(arguments.length-2),fe=2;fe<arguments.length;fe++)g[fe-2]=arguments[fe];return d.prototype[_].apply(m,g)}}function t(){this.blockSize=-1}function i(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(i,t),i.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(y,d,p){p||(p=0);var m=Array(16);if(typeof d=="string")for(var _=0;16>_;++_)m[_]=d.charCodeAt(p++)|d.charCodeAt(p++)<<8|d.charCodeAt(p++)<<16|d.charCodeAt(p++)<<24;else for(_=0;16>_;++_)m[_]=d[p++]|d[p++]<<8|d[p++]<<16|d[p++]<<24;d=y.g[0],p=y.g[1],_=y.g[2];var v=y.g[3],g=d+(v^p&(_^v))+m[0]+3614090360&4294967295;d=p+(g<<7&4294967295|g>>>25),g=v+(_^d&(p^_))+m[1]+3905402710&4294967295,v=d+(g<<12&4294967295|g>>>20),g=_+(p^v&(d^p))+m[2]+606105819&4294967295,_=v+(g<<17&4294967295|g>>>15),g=p+(d^_&(v^d))+m[3]+3250441966&4294967295,p=_+(g<<22&4294967295|g>>>10),g=d+(v^p&(_^v))+m[4]+4118548399&4294967295,d=p+(g<<7&4294967295|g>>>25),g=v+(_^d&(p^_))+m[5]+1200080426&4294967295,v=d+(g<<12&4294967295|g>>>20),g=_+(p^v&(d^p))+m[6]+2821735955&4294967295,_=v+(g<<17&4294967295|g>>>15),g=p+(d^_&(v^d))+m[7]+4249261313&4294967295,p=_+(g<<22&4294967295|g>>>10),g=d+(v^p&(_^v))+m[8]+1770035416&4294967295,d=p+(g<<7&4294967295|g>>>25),g=v+(_^d&(p^_))+m[9]+2336552879&4294967295,v=d+(g<<12&4294967295|g>>>20),g=_+(p^v&(d^p))+m[10]+4294925233&4294967295,_=v+(g<<17&4294967295|g>>>15),g=p+(d^_&(v^d))+m[11]+2304563134&4294967295,p=_+(g<<22&4294967295|g>>>10),g=d+(v^p&(_^v))+m[12]+1804603682&4294967295,d=p+(g<<7&4294967295|g>>>25),g=v+(_^d&(p^_))+m[13]+4254626195&4294967295,v=d+(g<<12&4294967295|g>>>20),g=_+(p^v&(d^p))+m[14]+2792965006&4294967295,_=v+(g<<17&4294967295|g>>>15),g=p+(d^_&(v^d))+m[15]+1236535329&4294967295,p=_+(g<<22&4294967295|g>>>10),g=d+(_^v&(p^_))+m[1]+4129170786&4294967295,d=p+(g<<5&4294967295|g>>>27),g=v+(p^_&(d^p))+m[6]+3225465664&4294967295,v=d+(g<<9&4294967295|g>>>23),g=_+(d^p&(v^d))+m[11]+643717713&4294967295,_=v+(g<<14&4294967295|g>>>18),g=p+(v^d&(_^v))+m[0]+3921069994&4294967295,p=_+(g<<20&4294967295|g>>>12),g=d+(_^v&(p^_))+m[5]+3593408605&4294967295,d=p+(g<<5&4294967295|g>>>27),g=v+(p^_&(d^p))+m[10]+38016083&4294967295,v=d+(g<<9&4294967295|g>>>23),g=_+(d^p&(v^d))+m[15]+3634488961&4294967295,_=v+(g<<14&4294967295|g>>>18),g=p+(v^d&(_^v))+m[4]+3889429448&4294967295,p=_+(g<<20&4294967295|g>>>12),g=d+(_^v&(p^_))+m[9]+568446438&4294967295,d=p+(g<<5&4294967295|g>>>27),g=v+(p^_&(d^p))+m[14]+3275163606&4294967295,v=d+(g<<9&4294967295|g>>>23),g=_+(d^p&(v^d))+m[3]+4107603335&4294967295,_=v+(g<<14&4294967295|g>>>18),g=p+(v^d&(_^v))+m[8]+1163531501&4294967295,p=_+(g<<20&4294967295|g>>>12),g=d+(_^v&(p^_))+m[13]+2850285829&4294967295,d=p+(g<<5&4294967295|g>>>27),g=v+(p^_&(d^p))+m[2]+4243563512&4294967295,v=d+(g<<9&4294967295|g>>>23),g=_+(d^p&(v^d))+m[7]+1735328473&4294967295,_=v+(g<<14&4294967295|g>>>18),g=p+(v^d&(_^v))+m[12]+2368359562&4294967295,p=_+(g<<20&4294967295|g>>>12),g=d+(p^_^v)+m[5]+4294588738&4294967295,d=p+(g<<4&4294967295|g>>>28),g=v+(d^p^_)+m[8]+2272392833&4294967295,v=d+(g<<11&4294967295|g>>>21),g=_+(v^d^p)+m[11]+1839030562&4294967295,_=v+(g<<16&4294967295|g>>>16),g=p+(_^v^d)+m[14]+4259657740&4294967295,p=_+(g<<23&4294967295|g>>>9),g=d+(p^_^v)+m[1]+2763975236&4294967295,d=p+(g<<4&4294967295|g>>>28),g=v+(d^p^_)+m[4]+1272893353&4294967295,v=d+(g<<11&4294967295|g>>>21),g=_+(v^d^p)+m[7]+4139469664&4294967295,_=v+(g<<16&4294967295|g>>>16),g=p+(_^v^d)+m[10]+3200236656&4294967295,p=_+(g<<23&4294967295|g>>>9),g=d+(p^_^v)+m[13]+681279174&4294967295,d=p+(g<<4&4294967295|g>>>28),g=v+(d^p^_)+m[0]+3936430074&4294967295,v=d+(g<<11&4294967295|g>>>21),g=_+(v^d^p)+m[3]+3572445317&4294967295,_=v+(g<<16&4294967295|g>>>16),g=p+(_^v^d)+m[6]+76029189&4294967295,p=_+(g<<23&4294967295|g>>>9),g=d+(p^_^v)+m[9]+3654602809&4294967295,d=p+(g<<4&4294967295|g>>>28),g=v+(d^p^_)+m[12]+3873151461&4294967295,v=d+(g<<11&4294967295|g>>>21),g=_+(v^d^p)+m[15]+530742520&4294967295,_=v+(g<<16&4294967295|g>>>16),g=p+(_^v^d)+m[2]+3299628645&4294967295,p=_+(g<<23&4294967295|g>>>9),g=d+(_^(p|~v))+m[0]+4096336452&4294967295,d=p+(g<<6&4294967295|g>>>26),g=v+(p^(d|~_))+m[7]+1126891415&4294967295,v=d+(g<<10&4294967295|g>>>22),g=_+(d^(v|~p))+m[14]+2878612391&4294967295,_=v+(g<<15&4294967295|g>>>17),g=p+(v^(_|~d))+m[5]+4237533241&4294967295,p=_+(g<<21&4294967295|g>>>11),g=d+(_^(p|~v))+m[12]+1700485571&4294967295,d=p+(g<<6&4294967295|g>>>26),g=v+(p^(d|~_))+m[3]+2399980690&4294967295,v=d+(g<<10&4294967295|g>>>22),g=_+(d^(v|~p))+m[10]+4293915773&4294967295,_=v+(g<<15&4294967295|g>>>17),g=p+(v^(_|~d))+m[1]+2240044497&4294967295,p=_+(g<<21&4294967295|g>>>11),g=d+(_^(p|~v))+m[8]+1873313359&4294967295,d=p+(g<<6&4294967295|g>>>26),g=v+(p^(d|~_))+m[15]+4264355552&4294967295,v=d+(g<<10&4294967295|g>>>22),g=_+(d^(v|~p))+m[6]+2734768916&4294967295,_=v+(g<<15&4294967295|g>>>17),g=p+(v^(_|~d))+m[13]+1309151649&4294967295,p=_+(g<<21&4294967295|g>>>11),g=d+(_^(p|~v))+m[4]+4149444226&4294967295,d=p+(g<<6&4294967295|g>>>26),g=v+(p^(d|~_))+m[11]+3174756917&4294967295,v=d+(g<<10&4294967295|g>>>22),g=_+(d^(v|~p))+m[2]+718787259&4294967295,_=v+(g<<15&4294967295|g>>>17),g=p+(v^(_|~d))+m[9]+3951481745&4294967295,y.g[0]=y.g[0]+d&4294967295,y.g[1]=y.g[1]+(_+(g<<21&4294967295|g>>>11))&4294967295,y.g[2]=y.g[2]+_&4294967295,y.g[3]=y.g[3]+v&4294967295}i.prototype.u=function(y,d){d===void 0&&(d=y.length);for(var p=d-this.blockSize,m=this.B,_=this.h,v=0;v<d;){if(_==0)for(;v<=p;)s(this,y,v),v+=this.blockSize;if(typeof y=="string"){for(;v<d;)if(m[_++]=y.charCodeAt(v++),_==this.blockSize){s(this,m),_=0;break}}else for(;v<d;)if(m[_++]=y[v++],_==this.blockSize){s(this,m),_=0;break}}this.h=_,this.o+=d},i.prototype.v=function(){var y=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);y[0]=128;for(var d=1;d<y.length-8;++d)y[d]=0;var p=8*this.o;for(d=y.length-8;d<y.length;++d)y[d]=p&255,p/=256;for(this.u(y),y=Array(16),d=p=0;4>d;++d)for(var m=0;32>m;m+=8)y[p++]=this.g[d]>>>m&255;return y};function a(y,d){var p=h;return Object.prototype.hasOwnProperty.call(p,y)?p[y]:p[y]=d(y)}function l(y,d){this.h=d;for(var p=[],m=!0,_=y.length-1;0<=_;_--){var v=y[_]|0;m&&v==d||(p[_]=v,m=!1)}this.g=p}var h={};function f(y){return-128<=y&&128>y?a(y,function(d){return new l([d|0],0>d?-1:0)}):new l([y|0],0>y?-1:0)}function I(y){if(isNaN(y)||!isFinite(y))return A;if(0>y)return k(I(-y));for(var d=[],p=1,m=0;y>=p;m++)d[m]=y/p|0,p*=4294967296;return new l(d,0)}function b(y,d){if(y.length==0)throw Error("number format error: empty string");if(d=d||10,2>d||36<d)throw Error("radix out of range: "+d);if(y.charAt(0)=="-")return k(b(y.substring(1),d));if(0<=y.indexOf("-"))throw Error('number format error: interior "-" character');for(var p=I(Math.pow(d,8)),m=A,_=0;_<y.length;_+=8){var v=Math.min(8,y.length-_),g=parseInt(y.substring(_,_+v),d);8>v?(v=I(Math.pow(d,v)),m=m.j(v).add(I(g))):(m=m.j(p),m=m.add(I(g)))}return m}var A=f(0),T=f(1),C=f(16777216);n=l.prototype,n.m=function(){if(O(this))return-k(this).m();for(var y=0,d=1,p=0;p<this.g.length;p++){var m=this.i(p);y+=(0<=m?m:4294967296+m)*d,d*=4294967296}return y},n.toString=function(y){if(y=y||10,2>y||36<y)throw Error("radix out of range: "+y);if(P(this))return"0";if(O(this))return"-"+k(this).toString(y);for(var d=I(Math.pow(y,6)),p=this,m="";;){var _=F(p,d).g;p=q(p,_.j(d));var v=((0<p.g.length?p.g[0]:p.h)>>>0).toString(y);if(p=_,P(p))return v+m;for(;6>v.length;)v="0"+v;m=v+m}},n.i=function(y){return 0>y?0:y<this.g.length?this.g[y]:this.h};function P(y){if(y.h!=0)return!1;for(var d=0;d<y.g.length;d++)if(y.g[d]!=0)return!1;return!0}function O(y){return y.h==-1}n.l=function(y){return y=q(this,y),O(y)?-1:P(y)?0:1};function k(y){for(var d=y.g.length,p=[],m=0;m<d;m++)p[m]=~y.g[m];return new l(p,~y.h).add(T)}n.abs=function(){return O(this)?k(this):this},n.add=function(y){for(var d=Math.max(this.g.length,y.g.length),p=[],m=0,_=0;_<=d;_++){var v=m+(this.i(_)&65535)+(y.i(_)&65535),g=(v>>>16)+(this.i(_)>>>16)+(y.i(_)>>>16);m=g>>>16,v&=65535,g&=65535,p[_]=g<<16|v}return new l(p,p[p.length-1]&-2147483648?-1:0)};function q(y,d){return y.add(k(d))}n.j=function(y){if(P(this)||P(y))return A;if(O(this))return O(y)?k(this).j(k(y)):k(k(this).j(y));if(O(y))return k(this.j(k(y)));if(0>this.l(C)&&0>y.l(C))return I(this.m()*y.m());for(var d=this.g.length+y.g.length,p=[],m=0;m<2*d;m++)p[m]=0;for(m=0;m<this.g.length;m++)for(var _=0;_<y.g.length;_++){var v=this.i(m)>>>16,g=this.i(m)&65535,fe=y.i(_)>>>16,Ee=y.i(_)&65535;p[2*m+2*_]+=g*Ee,j(p,2*m+2*_),p[2*m+2*_+1]+=v*Ee,j(p,2*m+2*_+1),p[2*m+2*_+1]+=g*fe,j(p,2*m+2*_+1),p[2*m+2*_+2]+=v*fe,j(p,2*m+2*_+2)}for(m=0;m<d;m++)p[m]=p[2*m+1]<<16|p[2*m];for(m=d;m<2*d;m++)p[m]=0;return new l(p,0)};function j(y,d){for(;(y[d]&65535)!=y[d];)y[d+1]+=y[d]>>>16,y[d]&=65535,d++}function N(y,d){this.g=y,this.h=d}function F(y,d){if(P(d))throw Error("division by zero");if(P(y))return new N(A,A);if(O(y))return d=F(k(y),d),new N(k(d.g),k(d.h));if(O(d))return d=F(y,k(d)),new N(k(d.g),d.h);if(30<y.g.length){if(O(y)||O(d))throw Error("slowDivide_ only works with positive integers.");for(var p=T,m=d;0>=m.l(y);)p=se(p),m=se(m);var _=G(p,1),v=G(m,1);for(m=G(m,2),p=G(p,2);!P(m);){var g=v.add(m);0>=g.l(y)&&(_=_.add(p),v=g),m=G(m,1),p=G(p,1)}return d=q(y,_.j(d)),new N(_,d)}for(_=A;0<=y.l(d);){for(p=Math.max(1,Math.floor(y.m()/d.m())),m=Math.ceil(Math.log(p)/Math.LN2),m=48>=m?1:Math.pow(2,m-48),v=I(p),g=v.j(d);O(g)||0<g.l(y);)p-=m,v=I(p),g=v.j(d);P(v)&&(v=T),_=_.add(v),y=q(y,g)}return new N(_,y)}n.A=function(y){return F(this,y).h},n.and=function(y){for(var d=Math.max(this.g.length,y.g.length),p=[],m=0;m<d;m++)p[m]=this.i(m)&y.i(m);return new l(p,this.h&y.h)},n.or=function(y){for(var d=Math.max(this.g.length,y.g.length),p=[],m=0;m<d;m++)p[m]=this.i(m)|y.i(m);return new l(p,this.h|y.h)},n.xor=function(y){for(var d=Math.max(this.g.length,y.g.length),p=[],m=0;m<d;m++)p[m]=this.i(m)^y.i(m);return new l(p,this.h^y.h)};function se(y){for(var d=y.g.length+1,p=[],m=0;m<d;m++)p[m]=y.i(m)<<1|y.i(m-1)>>>31;return new l(p,y.h)}function G(y,d){var p=d>>5;d%=32;for(var m=y.g.length-p,_=[],v=0;v<m;v++)_[v]=0<d?y.i(v+p)>>>d|y.i(v+p+1)<<32-d:y.i(v+p);return new l(_,y.h)}i.prototype.digest=i.prototype.v,i.prototype.reset=i.prototype.s,i.prototype.update=i.prototype.u,l.prototype.add=l.prototype.add,l.prototype.multiply=l.prototype.j,l.prototype.modulo=l.prototype.A,l.prototype.compare=l.prototype.l,l.prototype.toNumber=l.prototype.m,l.prototype.toString=l.prototype.toString,l.prototype.getBits=l.prototype.i,l.fromNumber=I,l.fromString=b,ki=l}).apply(typeof Io<"u"?Io:typeof self<"u"?self:typeof window<"u"?window:{});var Bn=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(r,o,c){return r==Array.prototype||r==Object.prototype||(r[o]=c.value),r};function t(r){r=[typeof globalThis=="object"&&globalThis,r,typeof window=="object"&&window,typeof self=="object"&&self,typeof Bn=="object"&&Bn];for(var o=0;o<r.length;++o){var c=r[o];if(c&&c.Math==Math)return c}throw Error("Cannot find global object")}var i=t(this);function s(r,o){if(o)e:{var c=i;r=r.split(".");for(var u=0;u<r.length-1;u++){var w=r[u];if(!(w in c))break e;c=c[w]}r=r[r.length-1],u=c[r],o=o(u),o!=u&&o!=null&&e(c,r,{configurable:!0,writable:!0,value:o})}}function a(r,o){r instanceof String&&(r+="");var c=0,u=!1,w={next:function(){if(!u&&c<r.length){var E=c++;return{value:o(E,r[E]),done:!1}}return u=!0,{done:!0,value:void 0}}};return w[Symbol.iterator]=function(){return w},w}s("Array.prototype.values",function(r){return r||function(){return a(this,function(o,c){return c})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var l=l||{},h=this||self;function f(r){var o=typeof r;return o=o!="object"?o:r?Array.isArray(r)?"array":o:"null",o=="array"||o=="object"&&typeof r.length=="number"}function I(r){var o=typeof r;return o=="object"&&r!=null||o=="function"}function b(r,o,c){return r.call.apply(r.bind,arguments)}function A(r,o,c){if(!r)throw Error();if(2<arguments.length){var u=Array.prototype.slice.call(arguments,2);return function(){var w=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(w,u),r.apply(o,w)}}return function(){return r.apply(o,arguments)}}function T(r,o,c){return T=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?b:A,T.apply(null,arguments)}function C(r,o){var c=Array.prototype.slice.call(arguments,1);return function(){var u=c.slice();return u.push.apply(u,arguments),r.apply(this,u)}}function P(r,o){function c(){}c.prototype=o.prototype,r.aa=o.prototype,r.prototype=new c,r.prototype.constructor=r,r.Qb=function(u,w,E){for(var S=Array(arguments.length-2),B=2;B<arguments.length;B++)S[B-2]=arguments[B];return o.prototype[w].apply(u,S)}}function O(r){const o=r.length;if(0<o){const c=Array(o);for(let u=0;u<o;u++)c[u]=r[u];return c}return[]}function k(r,o){for(let c=1;c<arguments.length;c++){const u=arguments[c];if(f(u)){const w=r.length||0,E=u.length||0;r.length=w+E;for(let S=0;S<E;S++)r[w+S]=u[S]}else r.push(u)}}class q{constructor(o,c){this.i=o,this.j=c,this.h=0,this.g=null}get(){let o;return 0<this.h?(this.h--,o=this.g,this.g=o.next,o.next=null):o=this.i(),o}}function j(r){return/^[\s\xa0]*$/.test(r)}function N(){var r=h.navigator;return r&&(r=r.userAgent)?r:""}function F(r){return F[" "](r),r}F[" "]=function(){};var se=N().indexOf("Gecko")!=-1&&!(N().toLowerCase().indexOf("webkit")!=-1&&N().indexOf("Edge")==-1)&&!(N().indexOf("Trident")!=-1||N().indexOf("MSIE")!=-1)&&N().indexOf("Edge")==-1;function G(r,o,c){for(const u in r)o.call(c,r[u],u,r)}function y(r,o){for(const c in r)o.call(void 0,r[c],c,r)}function d(r){const o={};for(const c in r)o[c]=r[c];return o}const p="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function m(r,o){let c,u;for(let w=1;w<arguments.length;w++){u=arguments[w];for(c in u)r[c]=u[c];for(let E=0;E<p.length;E++)c=p[E],Object.prototype.hasOwnProperty.call(u,c)&&(r[c]=u[c])}}function _(r){var o=1;r=r.split(":");const c=[];for(;0<o&&r.length;)c.push(r.shift()),o--;return r.length&&c.push(r.join(":")),c}function v(r){h.setTimeout(()=>{throw r},0)}function g(){var r=yr;let o=null;return r.g&&(o=r.g,r.g=r.g.next,r.g||(r.h=null),o.next=null),o}class fe{constructor(){this.h=this.g=null}add(o,c){const u=Ee.get();u.set(o,c),this.h?this.h.next=u:this.g=u,this.h=u}}var Ee=new q(()=>new wc,r=>r.reset());class wc{constructor(){this.next=this.g=this.h=null}set(o,c){this.h=o,this.g=c,this.next=null}reset(){this.next=this.g=this.h=null}}let Nt,Dt=!1,yr=new fe,$i=()=>{const r=h.Promise.resolve(void 0);Nt=()=>{r.then(Ic)}};var Ic=()=>{for(var r;r=g();){try{r.h.call(r.g)}catch(c){v(c)}var o=Ee;o.j(r),100>o.h&&(o.h++,r.next=o.g,o.g=r)}Dt=!1};function je(){this.s=this.s,this.C=this.C}je.prototype.s=!1,je.prototype.ma=function(){this.s||(this.s=!0,this.N())},je.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function te(r,o){this.type=r,this.g=this.target=o,this.defaultPrevented=!1}te.prototype.h=function(){this.defaultPrevented=!0};var Ec=function(){if(!h.addEventListener||!Object.defineProperty)return!1;var r=!1,o=Object.defineProperty({},"passive",{get:function(){r=!0}});try{const c=()=>{};h.addEventListener("test",c,o),h.removeEventListener("test",c,o)}catch{}return r}();function Lt(r,o){if(te.call(this,r?r.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,r){var c=this.type=r.type,u=r.changedTouches&&r.changedTouches.length?r.changedTouches[0]:null;if(this.target=r.target||r.srcElement,this.g=o,o=r.relatedTarget){if(se){e:{try{F(o.nodeName);var w=!0;break e}catch{}w=!1}w||(o=null)}}else c=="mouseover"?o=r.fromElement:c=="mouseout"&&(o=r.toElement);this.relatedTarget=o,u?(this.clientX=u.clientX!==void 0?u.clientX:u.pageX,this.clientY=u.clientY!==void 0?u.clientY:u.pageY,this.screenX=u.screenX||0,this.screenY=u.screenY||0):(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0),this.button=r.button,this.key=r.key||"",this.ctrlKey=r.ctrlKey,this.altKey=r.altKey,this.shiftKey=r.shiftKey,this.metaKey=r.metaKey,this.pointerId=r.pointerId||0,this.pointerType=typeof r.pointerType=="string"?r.pointerType:Tc[r.pointerType]||"",this.state=r.state,this.i=r,r.defaultPrevented&&Lt.aa.h.call(this)}}P(Lt,te);var Tc={2:"touch",3:"pen",4:"mouse"};Lt.prototype.h=function(){Lt.aa.h.call(this);var r=this.i;r.preventDefault?r.preventDefault():r.returnValue=!1};var bn="closure_listenable_"+(1e6*Math.random()|0),bc=0;function Ac(r,o,c,u,w){this.listener=r,this.proxy=null,this.src=o,this.type=c,this.capture=!!u,this.ha=w,this.key=++bc,this.da=this.fa=!1}function An(r){r.da=!0,r.listener=null,r.proxy=null,r.src=null,r.ha=null}function Sn(r){this.src=r,this.g={},this.h=0}Sn.prototype.add=function(r,o,c,u,w){var E=r.toString();r=this.g[E],r||(r=this.g[E]=[],this.h++);var S=wr(r,o,u,w);return-1<S?(o=r[S],c||(o.fa=!1)):(o=new Ac(o,this.src,E,!!u,w),o.fa=c,r.push(o)),o};function vr(r,o){var c=o.type;if(c in r.g){var u=r.g[c],w=Array.prototype.indexOf.call(u,o,void 0),E;(E=0<=w)&&Array.prototype.splice.call(u,w,1),E&&(An(o),r.g[c].length==0&&(delete r.g[c],r.h--))}}function wr(r,o,c,u){for(var w=0;w<r.length;++w){var E=r[w];if(!E.da&&E.listener==o&&E.capture==!!c&&E.ha==u)return w}return-1}var Ir="closure_lm_"+(1e6*Math.random()|0),Er={};function Wi(r,o,c,u,w){if(Array.isArray(o)){for(var E=0;E<o.length;E++)Wi(r,o[E],c,u,w);return null}return c=Gi(c),r&&r[bn]?r.K(o,c,I(u)?!!u.capture:!1,w):Sc(r,o,c,!1,u,w)}function Sc(r,o,c,u,w,E){if(!o)throw Error("Invalid event type");var S=I(w)?!!w.capture:!!w,B=br(r);if(B||(r[Ir]=B=new Sn(r)),c=B.add(o,c,u,S,E),c.proxy)return c;if(u=Rc(),c.proxy=u,u.src=r,u.listener=c,r.addEventListener)Ec||(w=S),w===void 0&&(w=!1),r.addEventListener(o.toString(),u,w);else if(r.attachEvent)r.attachEvent(zi(o.toString()),u);else if(r.addListener&&r.removeListener)r.addListener(u);else throw Error("addEventListener and attachEvent are unavailable.");return c}function Rc(){function r(c){return o.call(r.src,r.listener,c)}const o=Pc;return r}function qi(r,o,c,u,w){if(Array.isArray(o))for(var E=0;E<o.length;E++)qi(r,o[E],c,u,w);else u=I(u)?!!u.capture:!!u,c=Gi(c),r&&r[bn]?(r=r.i,o=String(o).toString(),o in r.g&&(E=r.g[o],c=wr(E,c,u,w),-1<c&&(An(E[c]),Array.prototype.splice.call(E,c,1),E.length==0&&(delete r.g[o],r.h--)))):r&&(r=br(r))&&(o=r.g[o.toString()],r=-1,o&&(r=wr(o,c,u,w)),(c=-1<r?o[r]:null)&&Tr(c))}function Tr(r){if(typeof r!="number"&&r&&!r.da){var o=r.src;if(o&&o[bn])vr(o.i,r);else{var c=r.type,u=r.proxy;o.removeEventListener?o.removeEventListener(c,u,r.capture):o.detachEvent?o.detachEvent(zi(c),u):o.addListener&&o.removeListener&&o.removeListener(u),(c=br(o))?(vr(c,r),c.h==0&&(c.src=null,o[Ir]=null)):An(r)}}}function zi(r){return r in Er?Er[r]:Er[r]="on"+r}function Pc(r,o){if(r.da)r=!0;else{o=new Lt(o,this);var c=r.listener,u=r.ha||r.src;r.fa&&Tr(r),r=c.call(u,o)}return r}function br(r){return r=r[Ir],r instanceof Sn?r:null}var Ar="__closure_events_fn_"+(1e9*Math.random()>>>0);function Gi(r){return typeof r=="function"?r:(r[Ar]||(r[Ar]=function(o){return r.handleEvent(o)}),r[Ar])}function ne(){je.call(this),this.i=new Sn(this),this.M=this,this.F=null}P(ne,je),ne.prototype[bn]=!0,ne.prototype.removeEventListener=function(r,o,c,u){qi(this,r,o,c,u)};function oe(r,o){var c,u=r.F;if(u)for(c=[];u;u=u.F)c.push(u);if(r=r.M,u=o.type||o,typeof o=="string")o=new te(o,r);else if(o instanceof te)o.target=o.target||r;else{var w=o;o=new te(u,r),m(o,w)}if(w=!0,c)for(var E=c.length-1;0<=E;E--){var S=o.g=c[E];w=Rn(S,u,!0,o)&&w}if(S=o.g=r,w=Rn(S,u,!0,o)&&w,w=Rn(S,u,!1,o)&&w,c)for(E=0;E<c.length;E++)S=o.g=c[E],w=Rn(S,u,!1,o)&&w}ne.prototype.N=function(){if(ne.aa.N.call(this),this.i){var r=this.i,o;for(o in r.g){for(var c=r.g[o],u=0;u<c.length;u++)An(c[u]);delete r.g[o],r.h--}}this.F=null},ne.prototype.K=function(r,o,c,u){return this.i.add(String(r),o,!1,c,u)},ne.prototype.L=function(r,o,c,u){return this.i.add(String(r),o,!0,c,u)};function Rn(r,o,c,u){if(o=r.i.g[String(o)],!o)return!0;o=o.concat();for(var w=!0,E=0;E<o.length;++E){var S=o[E];if(S&&!S.da&&S.capture==c){var B=S.listener,ee=S.ha||S.src;S.fa&&vr(r.i,S),w=B.call(ee,u)!==!1&&w}}return w&&!u.defaultPrevented}function Ki(r,o,c){if(typeof r=="function")c&&(r=T(r,c));else if(r&&typeof r.handleEvent=="function")r=T(r.handleEvent,r);else throw Error("Invalid listener argument");return 2147483647<Number(o)?-1:h.setTimeout(r,o||0)}function Ji(r){r.g=Ki(()=>{r.g=null,r.i&&(r.i=!1,Ji(r))},r.l);const o=r.h;r.h=null,r.m.apply(null,o)}class kc extends je{constructor(o,c){super(),this.m=o,this.l=c,this.h=null,this.i=!1,this.g=null}j(o){this.h=arguments,this.g?this.i=!0:Ji(this)}N(){super.N(),this.g&&(h.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Ut(r){je.call(this),this.h=r,this.g={}}P(Ut,je);var Xi=[];function Yi(r){G(r.g,function(o,c){this.g.hasOwnProperty(c)&&Tr(o)},r),r.g={}}Ut.prototype.N=function(){Ut.aa.N.call(this),Yi(this)},Ut.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Sr=h.JSON.stringify,Cc=h.JSON.parse,Oc=class{stringify(r){return h.JSON.stringify(r,void 0)}parse(r){return h.JSON.parse(r,void 0)}};function Rr(){}Rr.prototype.h=null;function Zi(r){return r.h||(r.h=r.i())}function Nc(){}var Mt={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Pr(){te.call(this,"d")}P(Pr,te);function kr(){te.call(this,"c")}P(kr,te);var _t={},Qi=null;function Cr(){return Qi=Qi||new ne}_t.La="serverreachability";function es(r){te.call(this,_t.La,r)}P(es,te);function xt(r){const o=Cr();oe(o,new es(o))}_t.STAT_EVENT="statevent";function ts(r,o){te.call(this,_t.STAT_EVENT,r),this.stat=o}P(ts,te);function ae(r){const o=Cr();oe(o,new ts(o,r))}_t.Ma="timingevent";function ns(r,o){te.call(this,_t.Ma,r),this.size=o}P(ns,te);function Ft(r,o){if(typeof r!="function")throw Error("Fn must not be null and must be a function");return h.setTimeout(function(){r()},o)}function Vt(){this.g=!0}Vt.prototype.xa=function(){this.g=!1};function Dc(r,o,c,u,w,E){r.info(function(){if(r.g)if(E)for(var S="",B=E.split("&"),ee=0;ee<B.length;ee++){var x=B[ee].split("=");if(1<x.length){var re=x[0];x=x[1];var ie=re.split("_");S=2<=ie.length&&ie[1]=="type"?S+(re+"="+x+"&"):S+(re+"=redacted&")}}else S=null;else S=E;return"XMLHTTP REQ ("+u+") [attempt "+w+"]: "+o+`
`+c+`
`+S})}function Lc(r,o,c,u,w,E,S){r.info(function(){return"XMLHTTP RESP ("+u+") [ attempt "+w+"]: "+o+`
`+c+`
`+E+" "+S})}function yt(r,o,c,u){r.info(function(){return"XMLHTTP TEXT ("+o+"): "+Mc(r,c)+(u?" "+u:"")})}function Uc(r,o){r.info(function(){return"TIMEOUT: "+o})}Vt.prototype.info=function(){};function Mc(r,o){if(!r.g)return o;if(!o)return null;try{var c=JSON.parse(o);if(c){for(r=0;r<c.length;r++)if(Array.isArray(c[r])){var u=c[r];if(!(2>u.length)){var w=u[1];if(Array.isArray(w)&&!(1>w.length)){var E=w[0];if(E!="noop"&&E!="stop"&&E!="close")for(var S=1;S<w.length;S++)w[S]=""}}}}return Sr(c)}catch{return o}}var Or={NO_ERROR:0,TIMEOUT:8},xc={},Nr;function Pn(){}P(Pn,Rr),Pn.prototype.g=function(){return new XMLHttpRequest},Pn.prototype.i=function(){return{}},Nr=new Pn;function Be(r,o,c,u){this.j=r,this.i=o,this.l=c,this.R=u||1,this.U=new Ut(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new rs}function rs(){this.i=null,this.g="",this.h=!1}var is={},Dr={};function Lr(r,o,c){r.L=1,r.v=Nn(Ce(o)),r.m=c,r.P=!0,ss(r,null)}function ss(r,o){r.F=Date.now(),kn(r),r.A=Ce(r.v);var c=r.A,u=r.R;Array.isArray(u)||(u=[String(u)]),vs(c.i,"t",u),r.C=0,c=r.j.J,r.h=new rs,r.g=xs(r.j,c?o:null,!r.m),0<r.O&&(r.M=new kc(T(r.Y,r,r.g),r.O)),o=r.U,c=r.g,u=r.ca;var w="readystatechange";Array.isArray(w)||(w&&(Xi[0]=w.toString()),w=Xi);for(var E=0;E<w.length;E++){var S=Wi(c,w[E],u||o.handleEvent,!1,o.h||o);if(!S)break;o.g[S.key]=S}o=r.H?d(r.H):{},r.m?(r.u||(r.u="POST"),o["Content-Type"]="application/x-www-form-urlencoded",r.g.ea(r.A,r.u,r.m,o)):(r.u="GET",r.g.ea(r.A,r.u,null,o)),xt(),Dc(r.i,r.u,r.A,r.l,r.R,r.m)}Be.prototype.ca=function(r){r=r.target;const o=this.M;o&&Oe(r)==3?o.j():this.Y(r)},Be.prototype.Y=function(r){try{if(r==this.g)e:{const ie=Oe(this.g);var o=this.g.Ba();const It=this.g.Z();if(!(3>ie)&&(ie!=3||this.g&&(this.h.h||this.g.oa()||Ss(this.g)))){this.J||ie!=4||o==7||(o==8||0>=It?xt(3):xt(2)),Ur(this);var c=this.g.Z();this.X=c;t:if(os(this)){var u=Ss(this.g);r="";var w=u.length,E=Oe(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){et(this),jt(this);var S="";break t}this.h.i=new h.TextDecoder}for(o=0;o<w;o++)this.h.h=!0,r+=this.h.i.decode(u[o],{stream:!(E&&o==w-1)});u.length=0,this.h.g+=r,this.C=0,S=this.h.g}else S=this.g.oa();if(this.o=c==200,Lc(this.i,this.u,this.A,this.l,this.R,ie,c),this.o){if(this.T&&!this.K){t:{if(this.g){var B,ee=this.g;if((B=ee.g?ee.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!j(B)){var x=B;break t}}x=null}if(c=x)yt(this.i,this.l,c,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Mr(this,c);else{this.o=!1,this.s=3,ae(12),et(this),jt(this);break e}}if(this.P){c=!0;let _e;for(;!this.J&&this.C<S.length;)if(_e=Fc(this,S),_e==Dr){ie==4&&(this.s=4,ae(14),c=!1),yt(this.i,this.l,null,"[Incomplete Response]");break}else if(_e==is){this.s=4,ae(15),yt(this.i,this.l,S,"[Invalid Chunk]"),c=!1;break}else yt(this.i,this.l,_e,null),Mr(this,_e);if(os(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),ie!=4||S.length!=0||this.h.h||(this.s=1,ae(16),c=!1),this.o=this.o&&c,!c)yt(this.i,this.l,S,"[Invalid Chunked Response]"),et(this),jt(this);else if(0<S.length&&!this.W){this.W=!0;var re=this.j;re.g==this&&re.ba&&!re.M&&(re.j.info("Great, no buffering proxy detected. Bytes received: "+S.length),Hr(re),re.M=!0,ae(11))}}else yt(this.i,this.l,S,null),Mr(this,S);ie==4&&et(this),this.o&&!this.J&&(ie==4?Ds(this.j,this):(this.o=!1,kn(this)))}else tl(this.g),c==400&&0<S.indexOf("Unknown SID")?(this.s=3,ae(12)):(this.s=0,ae(13)),et(this),jt(this)}}}catch{}finally{}};function os(r){return r.g?r.u=="GET"&&r.L!=2&&r.j.Ca:!1}function Fc(r,o){var c=r.C,u=o.indexOf(`
`,c);return u==-1?Dr:(c=Number(o.substring(c,u)),isNaN(c)?is:(u+=1,u+c>o.length?Dr:(o=o.slice(u,u+c),r.C=u+c,o)))}Be.prototype.cancel=function(){this.J=!0,et(this)};function kn(r){r.S=Date.now()+r.I,as(r,r.I)}function as(r,o){if(r.B!=null)throw Error("WatchDog timer not null");r.B=Ft(T(r.ba,r),o)}function Ur(r){r.B&&(h.clearTimeout(r.B),r.B=null)}Be.prototype.ba=function(){this.B=null;const r=Date.now();0<=r-this.S?(Uc(this.i,this.A),this.L!=2&&(xt(),ae(17)),et(this),this.s=2,jt(this)):as(this,this.S-r)};function jt(r){r.j.G==0||r.J||Ds(r.j,r)}function et(r){Ur(r);var o=r.M;o&&typeof o.ma=="function"&&o.ma(),r.M=null,Yi(r.U),r.g&&(o=r.g,r.g=null,o.abort(),o.ma())}function Mr(r,o){try{var c=r.j;if(c.G!=0&&(c.g==r||xr(c.h,r))){if(!r.K&&xr(c.h,r)&&c.G==3){try{var u=c.Da.g.parse(o)}catch{u=null}if(Array.isArray(u)&&u.length==3){var w=u;if(w[0]==0){e:if(!c.u){if(c.g)if(c.g.F+3e3<r.F)Fn(c),Mn(c);else break e;Br(c),ae(18)}}else c.za=w[1],0<c.za-c.T&&37500>w[2]&&c.F&&c.v==0&&!c.C&&(c.C=Ft(T(c.Za,c),6e3));if(1>=us(c.h)&&c.ca){try{c.ca()}catch{}c.ca=void 0}}else nt(c,11)}else if((r.K||c.g==r)&&Fn(c),!j(o))for(w=c.Da.g.parse(o),o=0;o<w.length;o++){let x=w[o];if(c.T=x[0],x=x[1],c.G==2)if(x[0]=="c"){c.K=x[1],c.ia=x[2];const re=x[3];re!=null&&(c.la=re,c.j.info("VER="+c.la));const ie=x[4];ie!=null&&(c.Aa=ie,c.j.info("SVER="+c.Aa));const It=x[5];It!=null&&typeof It=="number"&&0<It&&(u=1.5*It,c.L=u,c.j.info("backChannelRequestTimeoutMs_="+u)),u=c;const _e=r.g;if(_e){const Vn=_e.g?_e.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Vn){var E=u.h;E.g||Vn.indexOf("spdy")==-1&&Vn.indexOf("quic")==-1&&Vn.indexOf("h2")==-1||(E.j=E.l,E.g=new Set,E.h&&(Fr(E,E.h),E.h=null))}if(u.D){const $r=_e.g?_e.g.getResponseHeader("X-HTTP-Session-Id"):null;$r&&(u.ya=$r,H(u.I,u.D,$r))}}c.G=3,c.l&&c.l.ua(),c.ba&&(c.R=Date.now()-r.F,c.j.info("Handshake RTT: "+c.R+"ms")),u=c;var S=r;if(u.qa=Ms(u,u.J?u.ia:null,u.W),S.K){hs(u.h,S);var B=S,ee=u.L;ee&&(B.I=ee),B.B&&(Ur(B),kn(B)),u.g=S}else Os(u);0<c.i.length&&xn(c)}else x[0]!="stop"&&x[0]!="close"||nt(c,7);else c.G==3&&(x[0]=="stop"||x[0]=="close"?x[0]=="stop"?nt(c,7):jr(c):x[0]!="noop"&&c.l&&c.l.ta(x),c.v=0)}}xt(4)}catch{}}var Vc=class{constructor(r,o){this.g=r,this.map=o}};function cs(r){this.l=r||10,h.PerformanceNavigationTiming?(r=h.performance.getEntriesByType("navigation"),r=0<r.length&&(r[0].nextHopProtocol=="hq"||r[0].nextHopProtocol=="h2")):r=!!(h.chrome&&h.chrome.loadTimes&&h.chrome.loadTimes()&&h.chrome.loadTimes().wasFetchedViaSpdy),this.j=r?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ls(r){return r.h?!0:r.g?r.g.size>=r.j:!1}function us(r){return r.h?1:r.g?r.g.size:0}function xr(r,o){return r.h?r.h==o:r.g?r.g.has(o):!1}function Fr(r,o){r.g?r.g.add(o):r.h=o}function hs(r,o){r.h&&r.h==o?r.h=null:r.g&&r.g.has(o)&&r.g.delete(o)}cs.prototype.cancel=function(){if(this.i=ds(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const r of this.g.values())r.cancel();this.g.clear()}};function ds(r){if(r.h!=null)return r.i.concat(r.h.D);if(r.g!=null&&r.g.size!==0){let o=r.i;for(const c of r.g.values())o=o.concat(c.D);return o}return O(r.i)}function jc(r){if(r.V&&typeof r.V=="function")return r.V();if(typeof Map<"u"&&r instanceof Map||typeof Set<"u"&&r instanceof Set)return Array.from(r.values());if(typeof r=="string")return r.split("");if(f(r)){for(var o=[],c=r.length,u=0;u<c;u++)o.push(r[u]);return o}o=[],c=0;for(u in r)o[c++]=r[u];return o}function Bc(r){if(r.na&&typeof r.na=="function")return r.na();if(!r.V||typeof r.V!="function"){if(typeof Map<"u"&&r instanceof Map)return Array.from(r.keys());if(!(typeof Set<"u"&&r instanceof Set)){if(f(r)||typeof r=="string"){var o=[];r=r.length;for(var c=0;c<r;c++)o.push(c);return o}o=[],c=0;for(const u in r)o[c++]=u;return o}}}function fs(r,o){if(r.forEach&&typeof r.forEach=="function")r.forEach(o,void 0);else if(f(r)||typeof r=="string")Array.prototype.forEach.call(r,o,void 0);else for(var c=Bc(r),u=jc(r),w=u.length,E=0;E<w;E++)o.call(void 0,u[E],c&&c[E],r)}var ps=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Hc(r,o){if(r){r=r.split("&");for(var c=0;c<r.length;c++){var u=r[c].indexOf("="),w=null;if(0<=u){var E=r[c].substring(0,u);w=r[c].substring(u+1)}else E=r[c];o(E,w?decodeURIComponent(w.replace(/\+/g," ")):"")}}}function tt(r){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,r instanceof tt){this.h=r.h,Cn(this,r.j),this.o=r.o,this.g=r.g,On(this,r.s),this.l=r.l;var o=r.i,c=new $t;c.i=o.i,o.g&&(c.g=new Map(o.g),c.h=o.h),gs(this,c),this.m=r.m}else r&&(o=String(r).match(ps))?(this.h=!1,Cn(this,o[1]||"",!0),this.o=Bt(o[2]||""),this.g=Bt(o[3]||"",!0),On(this,o[4]),this.l=Bt(o[5]||"",!0),gs(this,o[6]||"",!0),this.m=Bt(o[7]||"")):(this.h=!1,this.i=new $t(null,this.h))}tt.prototype.toString=function(){var r=[],o=this.j;o&&r.push(Ht(o,ms,!0),":");var c=this.g;return(c||o=="file")&&(r.push("//"),(o=this.o)&&r.push(Ht(o,ms,!0),"@"),r.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),c=this.s,c!=null&&r.push(":",String(c))),(c=this.l)&&(this.g&&c.charAt(0)!="/"&&r.push("/"),r.push(Ht(c,c.charAt(0)=="/"?qc:Wc,!0))),(c=this.i.toString())&&r.push("?",c),(c=this.m)&&r.push("#",Ht(c,Gc)),r.join("")};function Ce(r){return new tt(r)}function Cn(r,o,c){r.j=c?Bt(o,!0):o,r.j&&(r.j=r.j.replace(/:$/,""))}function On(r,o){if(o){if(o=Number(o),isNaN(o)||0>o)throw Error("Bad port number "+o);r.s=o}else r.s=null}function gs(r,o,c){o instanceof $t?(r.i=o,Kc(r.i,r.h)):(c||(o=Ht(o,zc)),r.i=new $t(o,r.h))}function H(r,o,c){r.i.set(o,c)}function Nn(r){return H(r,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),r}function Bt(r,o){return r?o?decodeURI(r.replace(/%25/g,"%2525")):decodeURIComponent(r):""}function Ht(r,o,c){return typeof r=="string"?(r=encodeURI(r).replace(o,$c),c&&(r=r.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),r):null}function $c(r){return r=r.charCodeAt(0),"%"+(r>>4&15).toString(16)+(r&15).toString(16)}var ms=/[#\/\?@]/g,Wc=/[#\?:]/g,qc=/[#\?]/g,zc=/[#\?@]/g,Gc=/#/g;function $t(r,o){this.h=this.g=null,this.i=r||null,this.j=!!o}function He(r){r.g||(r.g=new Map,r.h=0,r.i&&Hc(r.i,function(o,c){r.add(decodeURIComponent(o.replace(/\+/g," ")),c)}))}n=$t.prototype,n.add=function(r,o){He(this),this.i=null,r=vt(this,r);var c=this.g.get(r);return c||this.g.set(r,c=[]),c.push(o),this.h+=1,this};function _s(r,o){He(r),o=vt(r,o),r.g.has(o)&&(r.i=null,r.h-=r.g.get(o).length,r.g.delete(o))}function ys(r,o){return He(r),o=vt(r,o),r.g.has(o)}n.forEach=function(r,o){He(this),this.g.forEach(function(c,u){c.forEach(function(w){r.call(o,w,u,this)},this)},this)},n.na=function(){He(this);const r=Array.from(this.g.values()),o=Array.from(this.g.keys()),c=[];for(let u=0;u<o.length;u++){const w=r[u];for(let E=0;E<w.length;E++)c.push(o[u])}return c},n.V=function(r){He(this);let o=[];if(typeof r=="string")ys(this,r)&&(o=o.concat(this.g.get(vt(this,r))));else{r=Array.from(this.g.values());for(let c=0;c<r.length;c++)o=o.concat(r[c])}return o},n.set=function(r,o){return He(this),this.i=null,r=vt(this,r),ys(this,r)&&(this.h-=this.g.get(r).length),this.g.set(r,[o]),this.h+=1,this},n.get=function(r,o){return r?(r=this.V(r),0<r.length?String(r[0]):o):o};function vs(r,o,c){_s(r,o),0<c.length&&(r.i=null,r.g.set(vt(r,o),O(c)),r.h+=c.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const r=[],o=Array.from(this.g.keys());for(var c=0;c<o.length;c++){var u=o[c];const E=encodeURIComponent(String(u)),S=this.V(u);for(u=0;u<S.length;u++){var w=E;S[u]!==""&&(w+="="+encodeURIComponent(String(S[u]))),r.push(w)}}return this.i=r.join("&")};function vt(r,o){return o=String(o),r.j&&(o=o.toLowerCase()),o}function Kc(r,o){o&&!r.j&&(He(r),r.i=null,r.g.forEach(function(c,u){var w=u.toLowerCase();u!=w&&(_s(this,u),vs(this,w,c))},r)),r.j=o}function Jc(r,o){const c=new Vt;if(h.Image){const u=new Image;u.onload=C($e,c,"TestLoadImage: loaded",!0,o,u),u.onerror=C($e,c,"TestLoadImage: error",!1,o,u),u.onabort=C($e,c,"TestLoadImage: abort",!1,o,u),u.ontimeout=C($e,c,"TestLoadImage: timeout",!1,o,u),h.setTimeout(function(){u.ontimeout&&u.ontimeout()},1e4),u.src=r}else o(!1)}function Xc(r,o){const c=new Vt,u=new AbortController,w=setTimeout(()=>{u.abort(),$e(c,"TestPingServer: timeout",!1,o)},1e4);fetch(r,{signal:u.signal}).then(E=>{clearTimeout(w),E.ok?$e(c,"TestPingServer: ok",!0,o):$e(c,"TestPingServer: server error",!1,o)}).catch(()=>{clearTimeout(w),$e(c,"TestPingServer: error",!1,o)})}function $e(r,o,c,u,w){try{w&&(w.onload=null,w.onerror=null,w.onabort=null,w.ontimeout=null),u(c)}catch{}}function Yc(){this.g=new Oc}function Zc(r,o,c){const u=c||"";try{fs(r,function(w,E){let S=w;I(w)&&(S=Sr(w)),o.push(u+E+"="+encodeURIComponent(S))})}catch(w){throw o.push(u+"type="+encodeURIComponent("_badmap")),w}}function Dn(r){this.l=r.Ub||null,this.j=r.eb||!1}P(Dn,Rr),Dn.prototype.g=function(){return new Ln(this.l,this.j)},Dn.prototype.i=function(r){return function(){return r}}({});function Ln(r,o){ne.call(this),this.D=r,this.o=o,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}P(Ln,ne),n=Ln.prototype,n.open=function(r,o){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=r,this.A=o,this.readyState=1,qt(this)},n.send=function(r){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const o={headers:this.u,method:this.B,credentials:this.m,cache:void 0};r&&(o.body=r),(this.D||h).fetch(new Request(this.A,o)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Wt(this)),this.readyState=0},n.Sa=function(r){if(this.g&&(this.l=r,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=r.headers,this.readyState=2,qt(this)),this.g&&(this.readyState=3,qt(this),this.g)))if(this.responseType==="arraybuffer")r.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof h.ReadableStream<"u"&&"body"in r){if(this.j=r.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;ws(this)}else r.text().then(this.Ra.bind(this),this.ga.bind(this))};function ws(r){r.j.read().then(r.Pa.bind(r)).catch(r.ga.bind(r))}n.Pa=function(r){if(this.g){if(this.o&&r.value)this.response.push(r.value);else if(!this.o){var o=r.value?r.value:new Uint8Array(0);(o=this.v.decode(o,{stream:!r.done}))&&(this.response=this.responseText+=o)}r.done?Wt(this):qt(this),this.readyState==3&&ws(this)}},n.Ra=function(r){this.g&&(this.response=this.responseText=r,Wt(this))},n.Qa=function(r){this.g&&(this.response=r,Wt(this))},n.ga=function(){this.g&&Wt(this)};function Wt(r){r.readyState=4,r.l=null,r.j=null,r.v=null,qt(r)}n.setRequestHeader=function(r,o){this.u.append(r,o)},n.getResponseHeader=function(r){return this.h&&this.h.get(r.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const r=[],o=this.h.entries();for(var c=o.next();!c.done;)c=c.value,r.push(c[0]+": "+c[1]),c=o.next();return r.join(`\r
`)};function qt(r){r.onreadystatechange&&r.onreadystatechange.call(r)}Object.defineProperty(Ln.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(r){this.m=r?"include":"same-origin"}});function Is(r){let o="";return G(r,function(c,u){o+=u,o+=":",o+=c,o+=`\r
`}),o}function Vr(r,o,c){e:{for(u in c){var u=!1;break e}u=!0}u||(c=Is(c),typeof r=="string"?c!=null&&encodeURIComponent(String(c)):H(r,o,c))}function z(r){ne.call(this),this.headers=new Map,this.o=r||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}P(z,ne);var Qc=/^https?$/i,el=["POST","PUT"];n=z.prototype,n.Ha=function(r){this.J=r},n.ea=function(r,o,c,u){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+r);o=o?o.toUpperCase():"GET",this.D=r,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Nr.g(),this.v=this.o?Zi(this.o):Zi(Nr),this.g.onreadystatechange=T(this.Ea,this);try{this.B=!0,this.g.open(o,String(r),!0),this.B=!1}catch(E){Es(this,E);return}if(r=c||"",c=new Map(this.headers),u)if(Object.getPrototypeOf(u)===Object.prototype)for(var w in u)c.set(w,u[w]);else if(typeof u.keys=="function"&&typeof u.get=="function")for(const E of u.keys())c.set(E,u.get(E));else throw Error("Unknown input type for opt_headers: "+String(u));u=Array.from(c.keys()).find(E=>E.toLowerCase()=="content-type"),w=h.FormData&&r instanceof h.FormData,!(0<=Array.prototype.indexOf.call(el,o,void 0))||u||w||c.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[E,S]of c)this.g.setRequestHeader(E,S);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{As(this),this.u=!0,this.g.send(r),this.u=!1}catch(E){Es(this,E)}};function Es(r,o){r.h=!1,r.g&&(r.j=!0,r.g.abort(),r.j=!1),r.l=o,r.m=5,Ts(r),Un(r)}function Ts(r){r.A||(r.A=!0,oe(r,"complete"),oe(r,"error"))}n.abort=function(r){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=r||7,oe(this,"complete"),oe(this,"abort"),Un(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Un(this,!0)),z.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?bs(this):this.bb())},n.bb=function(){bs(this)};function bs(r){if(r.h&&typeof l<"u"&&(!r.v[1]||Oe(r)!=4||r.Z()!=2)){if(r.u&&Oe(r)==4)Ki(r.Ea,0,r);else if(oe(r,"readystatechange"),Oe(r)==4){r.h=!1;try{const S=r.Z();e:switch(S){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var o=!0;break e;default:o=!1}var c;if(!(c=o)){var u;if(u=S===0){var w=String(r.D).match(ps)[1]||null;!w&&h.self&&h.self.location&&(w=h.self.location.protocol.slice(0,-1)),u=!Qc.test(w?w.toLowerCase():"")}c=u}if(c)oe(r,"complete"),oe(r,"success");else{r.m=6;try{var E=2<Oe(r)?r.g.statusText:""}catch{E=""}r.l=E+" ["+r.Z()+"]",Ts(r)}}finally{Un(r)}}}}function Un(r,o){if(r.g){As(r);const c=r.g,u=r.v[0]?()=>{}:null;r.g=null,r.v=null,o||oe(r,"ready");try{c.onreadystatechange=u}catch{}}}function As(r){r.I&&(h.clearTimeout(r.I),r.I=null)}n.isActive=function(){return!!this.g};function Oe(r){return r.g?r.g.readyState:0}n.Z=function(){try{return 2<Oe(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(r){if(this.g){var o=this.g.responseText;return r&&o.indexOf(r)==0&&(o=o.substring(r.length)),Cc(o)}};function Ss(r){try{if(!r.g)return null;if("response"in r.g)return r.g.response;switch(r.H){case"":case"text":return r.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in r.g)return r.g.mozResponseArrayBuffer}return null}catch{return null}}function tl(r){const o={};r=(r.g&&2<=Oe(r)&&r.g.getAllResponseHeaders()||"").split(`\r
`);for(let u=0;u<r.length;u++){if(j(r[u]))continue;var c=_(r[u]);const w=c[0];if(c=c[1],typeof c!="string")continue;c=c.trim();const E=o[w]||[];o[w]=E,E.push(c)}y(o,function(u){return u.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function zt(r,o,c){return c&&c.internalChannelParams&&c.internalChannelParams[r]||o}function Rs(r){this.Aa=0,this.i=[],this.j=new Vt,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=zt("failFast",!1,r),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=zt("baseRetryDelayMs",5e3,r),this.cb=zt("retryDelaySeedMs",1e4,r),this.Wa=zt("forwardChannelMaxRetries",2,r),this.wa=zt("forwardChannelRequestTimeoutMs",2e4,r),this.pa=r&&r.xmlHttpFactory||void 0,this.Xa=r&&r.Tb||void 0,this.Ca=r&&r.useFetchStreams||!1,this.L=void 0,this.J=r&&r.supportsCrossDomainXhr||!1,this.K="",this.h=new cs(r&&r.concurrentRequestLimit),this.Da=new Yc,this.P=r&&r.fastHandshake||!1,this.O=r&&r.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=r&&r.Rb||!1,r&&r.xa&&this.j.xa(),r&&r.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&r&&r.detectBufferingProxy||!1,this.ja=void 0,r&&r.longPollingTimeout&&0<r.longPollingTimeout&&(this.ja=r.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Rs.prototype,n.la=8,n.G=1,n.connect=function(r,o,c,u){ae(0),this.W=r,this.H=o||{},c&&u!==void 0&&(this.H.OSID=c,this.H.OAID=u),this.F=this.X,this.I=Ms(this,null,this.W),xn(this)};function jr(r){if(Ps(r),r.G==3){var o=r.U++,c=Ce(r.I);if(H(c,"SID",r.K),H(c,"RID",o),H(c,"TYPE","terminate"),Gt(r,c),o=new Be(r,r.j,o),o.L=2,o.v=Nn(Ce(c)),c=!1,h.navigator&&h.navigator.sendBeacon)try{c=h.navigator.sendBeacon(o.v.toString(),"")}catch{}!c&&h.Image&&(new Image().src=o.v,c=!0),c||(o.g=xs(o.j,null),o.g.ea(o.v)),o.F=Date.now(),kn(o)}Us(r)}function Mn(r){r.g&&(Hr(r),r.g.cancel(),r.g=null)}function Ps(r){Mn(r),r.u&&(h.clearTimeout(r.u),r.u=null),Fn(r),r.h.cancel(),r.s&&(typeof r.s=="number"&&h.clearTimeout(r.s),r.s=null)}function xn(r){if(!ls(r.h)&&!r.s){r.s=!0;var o=r.Ga;Nt||$i(),Dt||(Nt(),Dt=!0),yr.add(o,r),r.B=0}}function nl(r,o){return us(r.h)>=r.h.j-(r.s?1:0)?!1:r.s?(r.i=o.D.concat(r.i),!0):r.G==1||r.G==2||r.B>=(r.Va?0:r.Wa)?!1:(r.s=Ft(T(r.Ga,r,o),Ls(r,r.B)),r.B++,!0)}n.Ga=function(r){if(this.s)if(this.s=null,this.G==1){if(!r){this.U=Math.floor(1e5*Math.random()),r=this.U++;const w=new Be(this,this.j,r);let E=this.o;if(this.S&&(E?(E=d(E),m(E,this.S)):E=this.S),this.m!==null||this.O||(w.H=E,E=null),this.P)e:{for(var o=0,c=0;c<this.i.length;c++){t:{var u=this.i[c];if("__data__"in u.map&&(u=u.map.__data__,typeof u=="string")){u=u.length;break t}u=void 0}if(u===void 0)break;if(o+=u,4096<o){o=c;break e}if(o===4096||c===this.i.length-1){o=c+1;break e}}o=1e3}else o=1e3;o=Cs(this,w,o),c=Ce(this.I),H(c,"RID",r),H(c,"CVER",22),this.D&&H(c,"X-HTTP-Session-Id",this.D),Gt(this,c),E&&(this.O?o="headers="+encodeURIComponent(String(Is(E)))+"&"+o:this.m&&Vr(c,this.m,E)),Fr(this.h,w),this.Ua&&H(c,"TYPE","init"),this.P?(H(c,"$req",o),H(c,"SID","null"),w.T=!0,Lr(w,c,null)):Lr(w,c,o),this.G=2}}else this.G==3&&(r?ks(this,r):this.i.length==0||ls(this.h)||ks(this))};function ks(r,o){var c;o?c=o.l:c=r.U++;const u=Ce(r.I);H(u,"SID",r.K),H(u,"RID",c),H(u,"AID",r.T),Gt(r,u),r.m&&r.o&&Vr(u,r.m,r.o),c=new Be(r,r.j,c,r.B+1),r.m===null&&(c.H=r.o),o&&(r.i=o.D.concat(r.i)),o=Cs(r,c,1e3),c.I=Math.round(.5*r.wa)+Math.round(.5*r.wa*Math.random()),Fr(r.h,c),Lr(c,u,o)}function Gt(r,o){r.H&&G(r.H,function(c,u){H(o,u,c)}),r.l&&fs({},function(c,u){H(o,u,c)})}function Cs(r,o,c){c=Math.min(r.i.length,c);var u=r.l?T(r.l.Na,r.l,r):null;e:{var w=r.i;let E=-1;for(;;){const S=["count="+c];E==-1?0<c?(E=w[0].g,S.push("ofs="+E)):E=0:S.push("ofs="+E);let B=!0;for(let ee=0;ee<c;ee++){let x=w[ee].g;const re=w[ee].map;if(x-=E,0>x)E=Math.max(0,w[ee].g-100),B=!1;else try{Zc(re,S,"req"+x+"_")}catch{u&&u(re)}}if(B){u=S.join("&");break e}}}return r=r.i.splice(0,c),o.D=r,u}function Os(r){if(!r.g&&!r.u){r.Y=1;var o=r.Fa;Nt||$i(),Dt||(Nt(),Dt=!0),yr.add(o,r),r.v=0}}function Br(r){return r.g||r.u||3<=r.v?!1:(r.Y++,r.u=Ft(T(r.Fa,r),Ls(r,r.v)),r.v++,!0)}n.Fa=function(){if(this.u=null,Ns(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var r=2*this.R;this.j.info("BP detection timer enabled: "+r),this.A=Ft(T(this.ab,this),r)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,ae(10),Mn(this),Ns(this))};function Hr(r){r.A!=null&&(h.clearTimeout(r.A),r.A=null)}function Ns(r){r.g=new Be(r,r.j,"rpc",r.Y),r.m===null&&(r.g.H=r.o),r.g.O=0;var o=Ce(r.qa);H(o,"RID","rpc"),H(o,"SID",r.K),H(o,"AID",r.T),H(o,"CI",r.F?"0":"1"),!r.F&&r.ja&&H(o,"TO",r.ja),H(o,"TYPE","xmlhttp"),Gt(r,o),r.m&&r.o&&Vr(o,r.m,r.o),r.L&&(r.g.I=r.L);var c=r.g;r=r.ia,c.L=1,c.v=Nn(Ce(o)),c.m=null,c.P=!0,ss(c,r)}n.Za=function(){this.C!=null&&(this.C=null,Mn(this),Br(this),ae(19))};function Fn(r){r.C!=null&&(h.clearTimeout(r.C),r.C=null)}function Ds(r,o){var c=null;if(r.g==o){Fn(r),Hr(r),r.g=null;var u=2}else if(xr(r.h,o))c=o.D,hs(r.h,o),u=1;else return;if(r.G!=0){if(o.o)if(u==1){c=o.m?o.m.length:0,o=Date.now()-o.F;var w=r.B;u=Cr(),oe(u,new ns(u,c)),xn(r)}else Os(r);else if(w=o.s,w==3||w==0&&0<o.X||!(u==1&&nl(r,o)||u==2&&Br(r)))switch(c&&0<c.length&&(o=r.h,o.i=o.i.concat(c)),w){case 1:nt(r,5);break;case 4:nt(r,10);break;case 3:nt(r,6);break;default:nt(r,2)}}}function Ls(r,o){let c=r.Ta+Math.floor(Math.random()*r.cb);return r.isActive()||(c*=2),c*o}function nt(r,o){if(r.j.info("Error code "+o),o==2){var c=T(r.fb,r),u=r.Xa;const w=!u;u=new tt(u||"//www.google.com/images/cleardot.gif"),h.location&&h.location.protocol=="http"||Cn(u,"https"),Nn(u),w?Jc(u.toString(),c):Xc(u.toString(),c)}else ae(2);r.G=0,r.l&&r.l.sa(o),Us(r),Ps(r)}n.fb=function(r){r?(this.j.info("Successfully pinged google.com"),ae(2)):(this.j.info("Failed to ping google.com"),ae(1))};function Us(r){if(r.G=0,r.ka=[],r.l){const o=ds(r.h);(o.length!=0||r.i.length!=0)&&(k(r.ka,o),k(r.ka,r.i),r.h.i.length=0,O(r.i),r.i.length=0),r.l.ra()}}function Ms(r,o,c){var u=c instanceof tt?Ce(c):new tt(c);if(u.g!="")o&&(u.g=o+"."+u.g),On(u,u.s);else{var w=h.location;u=w.protocol,o=o?o+"."+w.hostname:w.hostname,w=+w.port;var E=new tt(null);u&&Cn(E,u),o&&(E.g=o),w&&On(E,w),c&&(E.l=c),u=E}return c=r.D,o=r.ya,c&&o&&H(u,c,o),H(u,"VER",r.la),Gt(r,u),u}function xs(r,o,c){if(o&&!r.J)throw Error("Can't create secondary domain capable XhrIo object.");return o=r.Ca&&!r.pa?new z(new Dn({eb:c})):new z(r.pa),o.Ha(r.J),o}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Fs(){}n=Fs.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function ge(r,o){ne.call(this),this.g=new Rs(o),this.l=r,this.h=o&&o.messageUrlParams||null,r=o&&o.messageHeaders||null,o&&o.clientProtocolHeaderRequired&&(r?r["X-Client-Protocol"]="webchannel":r={"X-Client-Protocol":"webchannel"}),this.g.o=r,r=o&&o.initMessageHeaders||null,o&&o.messageContentType&&(r?r["X-WebChannel-Content-Type"]=o.messageContentType:r={"X-WebChannel-Content-Type":o.messageContentType}),o&&o.va&&(r?r["X-WebChannel-Client-Profile"]=o.va:r={"X-WebChannel-Client-Profile":o.va}),this.g.S=r,(r=o&&o.Sb)&&!j(r)&&(this.g.m=r),this.v=o&&o.supportsCrossDomainXhr||!1,this.u=o&&o.sendRawJson||!1,(o=o&&o.httpSessionIdParam)&&!j(o)&&(this.g.D=o,r=this.h,r!==null&&o in r&&(r=this.h,o in r&&delete r[o])),this.j=new wt(this)}P(ge,ne),ge.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},ge.prototype.close=function(){jr(this.g)},ge.prototype.o=function(r){var o=this.g;if(typeof r=="string"){var c={};c.__data__=r,r=c}else this.u&&(c={},c.__data__=Sr(r),r=c);o.i.push(new Vc(o.Ya++,r)),o.G==3&&xn(o)},ge.prototype.N=function(){this.g.l=null,delete this.j,jr(this.g),delete this.g,ge.aa.N.call(this)};function Vs(r){Pr.call(this),r.__headers__&&(this.headers=r.__headers__,this.statusCode=r.__status__,delete r.__headers__,delete r.__status__);var o=r.__sm__;if(o){e:{for(const c in o){r=c;break e}r=void 0}(this.i=r)&&(r=this.i,o=o!==null&&r in o?o[r]:void 0),this.data=o}else this.data=r}P(Vs,Pr);function js(){kr.call(this),this.status=1}P(js,kr);function wt(r){this.g=r}P(wt,Fs),wt.prototype.ua=function(){oe(this.g,"a")},wt.prototype.ta=function(r){oe(this.g,new Vs(r))},wt.prototype.sa=function(r){oe(this.g,new js)},wt.prototype.ra=function(){oe(this.g,"b")},ge.prototype.send=ge.prototype.o,ge.prototype.open=ge.prototype.m,ge.prototype.close=ge.prototype.close,Or.NO_ERROR=0,Or.TIMEOUT=8,Or.HTTP_ERROR=6,xc.COMPLETE="complete",Nc.EventType=Mt,Mt.OPEN="a",Mt.CLOSE="b",Mt.ERROR="c",Mt.MESSAGE="d",ne.prototype.listen=ne.prototype.K,z.prototype.listenOnce=z.prototype.L,z.prototype.getLastError=z.prototype.Ka,z.prototype.getLastErrorCode=z.prototype.Ba,z.prototype.getStatus=z.prototype.Z,z.prototype.getResponseJson=z.prototype.Oa,z.prototype.getResponseText=z.prototype.oa,z.prototype.send=z.prototype.ea,z.prototype.setWithCredentials=z.prototype.Ha}).apply(typeof Bn<"u"?Bn:typeof self<"u"?self:typeof window<"u"?window:{});const Eo="@firebase/firestore",To="4.8.0";/**
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
 */class le{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}le.UNAUTHENTICATED=new le(null),le.GOOGLE_CREDENTIALS=new le("google-credentials-uid"),le.FIRST_PARTY=new le("first-party-uid"),le.MOCK_USER=new le("mock-user");/**
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
 */let In="11.10.0";/**
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
 */const Rt=new mi("@firebase/firestore");function we(n,...e){if(Rt.logLevel<=V.DEBUG){const t=e.map(Ci);Rt.debug(`Firestore (${In}): ${n}`,...t)}}function Xa(n,...e){if(Rt.logLevel<=V.ERROR){const t=e.map(Ci);Rt.error(`Firestore (${In}): ${n}`,...t)}}function Tf(n,...e){if(Rt.logLevel<=V.WARN){const t=e.map(Ci);Rt.warn(`Firestore (${In}): ${n}`,...t)}}function Ci(n){if(typeof n=="string")return n;try{/**
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
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
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
 */function pn(n,e,t){let i="Unexpected state";typeof e=="string"?i=e:t=e,Ya(n,i,t)}function Ya(n,e,t){let i=`FIRESTORE (${In}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{i+=" CONTEXT: "+JSON.stringify(t)}catch{i+=" CONTEXT: "+t}throw Xa(i),new Error(i)}function sn(n,e,t,i){let s="Unexpected state";typeof t=="string"?s=t:i=t,n||Ya(e,s,i)}/**
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
 */const L={CANCELLED:"cancelled",INVALID_ARGUMENT:"invalid-argument",FAILED_PRECONDITION:"failed-precondition"};class U extends ke{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class on{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class Za{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class bf{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(le.UNAUTHENTICATED))}shutdown(){}}class Af{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Sf{constructor(e){this.t=e,this.currentUser=le.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){sn(this.o===void 0,42304);let i=this.i;const s=f=>this.i!==i?(i=this.i,t(f)):Promise.resolve();let a=new on;this.o=()=>{this.i++,this.currentUser=this.u(),a.resolve(),a=new on,e.enqueueRetryable(()=>s(this.currentUser))};const l=()=>{const f=a;e.enqueueRetryable(async()=>{await f.promise,await s(this.currentUser)})},h=f=>{we("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=f,this.o&&(this.auth.addAuthTokenListener(this.o),l())};this.t.onInit(f=>h(f)),setTimeout(()=>{if(!this.auth){const f=this.t.getImmediate({optional:!0});f?h(f):(we("FirebaseAuthCredentialsProvider","Auth not yet detected"),a.resolve(),a=new on)}},0),l()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(i=>this.i!==e?(we("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):i?(sn(typeof i.accessToken=="string",31837,{l:i}),new Za(i.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return sn(e===null||typeof e=="string",2055,{h:e}),new le(e)}}class Rf{constructor(e,t,i){this.P=e,this.T=t,this.I=i,this.type="FirstParty",this.user=le.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Pf{constructor(e,t,i){this.P=e,this.T=t,this.I=i}getToken(){return Promise.resolve(new Rf(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(le.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class bo{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class kf{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,J(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){sn(this.o===void 0,3512);const i=a=>{a.error!=null&&we("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${a.error.message}`);const l=a.token!==this.m;return this.m=a.token,we("FirebaseAppCheckTokenProvider",`Received ${l?"new":"existing"} token.`),l?t(a.token):Promise.resolve()};this.o=a=>{e.enqueueRetryable(()=>i(a))};const s=a=>{we("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=a,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(a=>s(a)),setTimeout(()=>{if(!this.appCheck){const a=this.V.getImmediate({optional:!0});a?s(a):we("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new bo(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(sn(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new bo(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function Cf(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let i=0;i<n;i++)t[i]=Math.floor(256*Math.random());return t}/**
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
 */function Of(){return new TextEncoder}/**
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
 */class Nf{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let i="";for(;i.length<20;){const s=Cf(40);for(let a=0;a<s.length;++a)i.length<20&&s[a]<t&&(i+=e.charAt(s[a]%62))}return i}}function Ie(n,e){return n<e?-1:n>e?1:0}function Df(n,e){let t=0;for(;t<n.length&&t<e.length;){const i=n.codePointAt(t),s=e.codePointAt(t);if(i!==s){if(i<128&&s<128)return Ie(i,s);{const a=Of(),l=Lf(a.encode(Ao(n,t)),a.encode(Ao(e,t)));return l!==0?l:Ie(i,s)}}t+=i>65535?2:1}return Ie(n.length,e.length)}function Ao(n,e){return n.codePointAt(e)>65535?n.substring(e,e+2):n.substring(e,e+1)}function Lf(n,e){for(let t=0;t<n.length&&t<e.length;++t)if(n[t]!==e[t])return Ie(n[t],e[t]);return Ie(n.length,e.length)}/**
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
 */const So="__name__";class Te{constructor(e,t,i){t===void 0?t=0:t>e.length&&pn(637,{offset:t,range:e.length}),i===void 0?i=e.length-t:i>e.length-t&&pn(1746,{length:i,range:e.length-t}),this.segments=e,this.offset=t,this.len=i}get length(){return this.len}isEqual(e){return Te.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Te?e.forEach(i=>{t.push(i)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,i=this.limit();t<i;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const i=Math.min(e.length,t.length);for(let s=0;s<i;s++){const a=Te.compareSegments(e.get(s),t.get(s));if(a!==0)return a}return Ie(e.length,t.length)}static compareSegments(e,t){const i=Te.isNumericId(e),s=Te.isNumericId(t);return i&&!s?-1:!i&&s?1:i&&s?Te.extractNumericId(e).compare(Te.extractNumericId(t)):Df(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return ki.fromString(e.substring(4,e.length-2))}}class ye extends Te{construct(e,t,i){return new ye(e,t,i)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const i of e){if(i.indexOf("//")>=0)throw new U(L.INVALID_ARGUMENT,`Invalid segment (${i}). Paths must not contain // in them.`);t.push(...i.split("/").filter(s=>s.length>0))}return new ye(t)}static emptyPath(){return new ye([])}}const Uf=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class it extends Te{construct(e,t,i){return new it(e,t,i)}static isValidIdentifier(e){return Uf.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),it.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===So}static keyField(){return new it([So])}static fromServerFormat(e){const t=[];let i="",s=0;const a=()=>{if(i.length===0)throw new U(L.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(i),i=""};let l=!1;for(;s<e.length;){const h=e[s];if(h==="\\"){if(s+1===e.length)throw new U(L.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const f=e[s+1];if(f!=="\\"&&f!=="."&&f!=="`")throw new U(L.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);i+=f,s+=2}else h==="`"?(l=!l,s++):h!=="."||l?(i+=h,s++):(a(),s++)}if(a(),l)throw new U(L.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new it(t)}static emptyPath(){return new it([])}}/**
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
 */class st{constructor(e){this.path=e}static fromPath(e){return new st(ye.fromString(e))}static fromName(e){return new st(ye.fromString(e).popFirst(5))}static empty(){return new st(ye.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ye.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ye.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new st(new ye(e.slice()))}}function Mf(n,e,t,i){if(e===!0&&i===!0)throw new U(L.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function xf(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Ff(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(i){return i.constructor?i.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":pn(12329,{type:typeof n})}function Vf(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new U(L.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Ff(n);throw new U(L.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function X(n,e){const t={typeString:n};return e&&(t.value=e),t}function En(n,e){if(!xf(n))throw new U(L.INVALID_ARGUMENT,"JSON must be an object");let t;for(const i in e)if(e[i]){const s=e[i].typeString,a="value"in e[i]?{value:e[i].value}:void 0;if(!(i in n)){t=`JSON missing required field: '${i}'`;break}const l=n[i];if(s&&typeof l!==s){t=`JSON field '${i}' must be a ${s}.`;break}if(a!==void 0&&l!==a.value){t=`Expected '${i}' field to equal '${a.value}'`;break}}if(t)throw new U(L.INVALID_ARGUMENT,t);return!0}/**
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
 */const Ro=-62135596800,Po=1e6;class be{static now(){return be.fromMillis(Date.now())}static fromDate(e){return be.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),i=Math.floor((e-1e3*t)*Po);return new be(t,i)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new U(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new U(L.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Ro)throw new U(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new U(L.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Po}_compareTo(e){return this.seconds===e.seconds?Ie(this.nanoseconds,e.nanoseconds):Ie(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:be._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(En(e,be._jsonSchema))return new be(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Ro;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}be._jsonSchemaVersion="firestore/timestamp/1.0",be._jsonSchema={type:X("string",be._jsonSchemaVersion),seconds:X("number"),nanoseconds:X("number")};function jf(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Bf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class dt{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(a){throw typeof DOMException<"u"&&a instanceof DOMException?new Bf("Invalid base64 string: "+a):a}}(e);return new dt(t)}static fromUint8Array(e){const t=function(s){let a="";for(let l=0;l<s.length;++l)a+=String.fromCharCode(s[l]);return a}(e);return new dt(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=t.charCodeAt(s);return i}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Ie(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}dt.EMPTY_BYTE_STRING=new dt("");const ui="(default)";class rr{constructor(e,t){this.projectId=e,this.database=t||ui}static empty(){return new rr("","")}get isDefaultDatabase(){return this.database===ui}isEqual(e){return e instanceof rr&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */class Hf{constructor(e,t=null,i=[],s=[],a=null,l="F",h=null,f=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=i,this.filters=s,this.limit=a,this.limitType=l,this.startAt=h,this.endAt=f,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function $f(n){return new Hf(n)}/**
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
 */var ko,D;(D=ko||(ko={}))[D.OK=0]="OK",D[D.CANCELLED=1]="CANCELLED",D[D.UNKNOWN=2]="UNKNOWN",D[D.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",D[D.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",D[D.NOT_FOUND=5]="NOT_FOUND",D[D.ALREADY_EXISTS=6]="ALREADY_EXISTS",D[D.PERMISSION_DENIED=7]="PERMISSION_DENIED",D[D.UNAUTHENTICATED=16]="UNAUTHENTICATED",D[D.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",D[D.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",D[D.ABORTED=10]="ABORTED",D[D.OUT_OF_RANGE=11]="OUT_OF_RANGE",D[D.UNIMPLEMENTED=12]="UNIMPLEMENTED",D[D.INTERNAL=13]="INTERNAL",D[D.UNAVAILABLE=14]="UNAVAILABLE",D[D.DATA_LOSS=15]="DATA_LOSS";/**
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
 */new ki([4294967295,4294967295],0);/**
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
 */const Wf=41943040;/**
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
 */const qf=1048576;function Qr(){return typeof document<"u"?document:null}/**
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
 */class zf{constructor(e,t,i=1e3,s=1.5,a=6e4){this.Fi=e,this.timerId=t,this.d_=i,this.E_=s,this.A_=a,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),i=Math.max(0,Date.now()-this.m_),s=Math.max(0,t-i);s>0&&we("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${i} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,s,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
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
 */class Oi{constructor(e,t,i,s,a){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=i,this.op=s,this.removalCallback=a,this.deferred=new on,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(l=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,i,s,a){const l=Date.now()+i,h=new Oi(e,t,l,s,a);return h.start(i),h}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new U(L.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}var Co,Oo;(Oo=Co||(Co={})).Fa="default",Oo.Cache="cache";/**
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
 */function Gf(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const No=new Map;/**
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
 */const Qa="firestore.googleapis.com",Do=!0;class Lo{constructor(e){var t,i;if(e.host===void 0){if(e.ssl!==void 0)throw new U(L.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Qa,this.ssl=Do}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Do;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Wf;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<qf)throw new U(L.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Mf("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Gf((i=e.experimentalLongPollingOptions)!==null&&i!==void 0?i:{}),function(a){if(a.timeoutSeconds!==void 0){if(isNaN(a.timeoutSeconds))throw new U(L.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (must not be NaN)`);if(a.timeoutSeconds<5)throw new U(L.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (minimum allowed value is 5)`);if(a.timeoutSeconds>30)throw new U(L.INVALID_ARGUMENT,`invalid long polling timeout: ${a.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(i,s){return i.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class ec{constructor(e,t,i,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=i,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Lo({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new U(L.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new U(L.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Lo(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(i){if(!i)return new bf;switch(i.type){case"firstParty":return new Pf(i.sessionIndex||"0",i.iamToken||null,i.authTokenFactory||null);case"provider":return i.client;default:throw new U(L.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const i=No.get(t);i&&(we("ComponentProvider","Removing Datastore"),No.delete(t),i.terminate())}(this),Promise.resolve()}}function Kf(n,e,t,i={}){var s;n=Vf(n,ec);const a=pt(e),l=n._getSettings(),h=Object.assign(Object.assign({},l),{emulatorOptions:n._getEmulatorOptions()}),f=`${e}:${t}`;a&&(pi(`https://${f}`),gi("Firestore",!0)),l.host!==Qa&&l.host!==f&&Tf("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const I=Object.assign(Object.assign({},l),{host:f,ssl:a,emulatorOptions:i});if(!lt(I,h)&&(n._setSettings(I),i.mockUserToken)){let b,A;if(typeof i.mockUserToken=="string")b=i.mockUserToken,A=le.MOCK_USER;else{b=ea(i.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const T=i.mockUserToken.sub||i.mockUserToken.user_id;if(!T)throw new U(L.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");A=new le(T)}n._authCredentials=new Af(new Za(b,A))}}/**
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
 */class Ni{constructor(e,t,i){this.converter=t,this._query=i,this.type="query",this.firestore=e}withConverter(e){return new Ni(this.firestore,e,this._query)}}class Ae{constructor(e,t,i){this.converter=t,this._key=i,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Di(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ae(this.firestore,e,this._key)}toJSON(){return{type:Ae._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,i){if(En(t,Ae._jsonSchema))return new Ae(e,i||null,new st(ye.fromString(t.referencePath)))}}Ae._jsonSchemaVersion="firestore/documentReference/1.0",Ae._jsonSchema={type:X("string",Ae._jsonSchemaVersion),referencePath:X("string")};class Di extends Ni{constructor(e,t,i){super(e,t,$f(i)),this._path=i,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ae(this.firestore,null,new st(e))}withConverter(e){return new Di(this.firestore,e,this._path)}}/**
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
 */const Uo="AsyncQueue";class Mo{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new zf(this,"async_queue_retry"),this.oc=()=>{const i=Qr();i&&we(Uo,"Visibility state changed to "+i.visibilityState),this.F_.y_()},this._c=e;const t=Qr();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=Qr();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const t=new on;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!jf(e))throw e;we(Uo,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const t=this._c.then(()=>(this.nc=!0,e().catch(i=>{throw this.tc=i,this.nc=!1,Xa("INTERNAL UNHANDLED ERROR: ",xo(i)),i}).then(i=>(this.nc=!1,i))));return this._c=t,t}enqueueAfterDelay(e,t,i){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const s=Oi.createAndSchedule(this,e,t,i,a=>this.lc(a));return this.ec.push(s),s}ac(){this.tc&&pn(47125,{hc:xo(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,i)=>t.targetTimeMs-i.targetTimeMs);for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function xo(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class Jf extends ec{constructor(e,t,i,s){super(e,t,i,s),this.type="firestore",this._queue=new Mo,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Mo(e),this._firestoreClient=void 0,await e}}}function Xf(n,e){const t=typeof n=="object"?n:sr(),i=typeof n=="string"?n:ui,s=ir(t,"firestore").getImmediate({identifier:i});if(!s._initialized){const a=Yo("firestore");a&&Kf(s,...a)}return s}/**
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
 */class De{constructor(e){this._byteString=e}static fromBase64String(e){try{return new De(dt.fromBase64String(e))}catch(t){throw new U(L.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new De(dt.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:De._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(En(e,De._jsonSchema))return De.fromBase64String(e.bytes)}}De._jsonSchemaVersion="firestore/bytes/1.0",De._jsonSchema={type:X("string",De._jsonSchemaVersion),bytes:X("string")};/**
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
 */class tc{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new U(L.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new it(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class ot{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new U(L.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new U(L.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Ie(this._lat,e._lat)||Ie(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ot._jsonSchemaVersion}}static fromJSON(e){if(En(e,ot._jsonSchema))return new ot(e.latitude,e.longitude)}}ot._jsonSchemaVersion="firestore/geoPoint/1.0",ot._jsonSchema={type:X("string",ot._jsonSchemaVersion),latitude:X("number"),longitude:X("number")};/**
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
 */class at{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(i,s){if(i.length!==s.length)return!1;for(let a=0;a<i.length;++a)if(i[a]!==s[a])return!1;return!0}(this._values,e._values)}toJSON(){return{type:at._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(En(e,at._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new at(e.vectorValues);throw new U(L.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}at._jsonSchemaVersion="firestore/vectorValue/1.0",at._jsonSchema={type:X("string",at._jsonSchemaVersion),vectorValues:X("object")};const Yf=new RegExp("[~\\*/\\[\\]]");function Zf(n,e,t){if(e.search(Yf)>=0)throw Fo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n);try{return new tc(...e.split("."))._internalPath}catch{throw Fo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n)}}function Fo(n,e,t,i,s){let a=`Function ${e}() called with invalid data`;a+=". ";let l="";return new U(L.INVALID_ARGUMENT,a+n+l)}/**
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
 */class nc{constructor(e,t,i,s,a){this._firestore=e,this._userDataWriter=t,this._key=i,this._document=s,this._converter=a}get id(){return this._key.path.lastSegment()}get ref(){return new Ae(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Qf(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(rc("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Qf extends nc{data(){return super.data()}}function rc(n,e){return typeof e=="string"?Zf(n,e):e instanceof tc?e._internalPath:e._delegate._internalPath}class Hn{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class St extends nc{constructor(e,t,i,s,a,l){super(e,t,i,s,l),this._firestore=e,this._firestoreImpl=e,this.metadata=a}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Xn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const i=this._document.data.field(rc("DocumentSnapshot.get",e));if(i!==null)return this._userDataWriter.convertValue(i,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new U(L.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=St._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}St._jsonSchemaVersion="firestore/documentSnapshot/1.0",St._jsonSchema={type:X("string",St._jsonSchemaVersion),bundleSource:X("string","DocumentSnapshot"),bundleName:X("string"),bundle:X("string")};class Xn extends St{data(e={}){return super.data(e)}}class an{constructor(e,t,i,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Hn(s.hasPendingWrites,s.fromCache),this.query=i}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(i=>{e.call(t,new Xn(this._firestore,this._userDataWriter,i.key,i,new Hn(this._snapshot.mutatedKeys.has(i.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new U(L.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,a){if(s._snapshot.oldDocs.isEmpty()){let l=0;return s._snapshot.docChanges.map(h=>{const f=new Xn(s._firestore,s._userDataWriter,h.doc.key,h.doc,new Hn(s._snapshot.mutatedKeys.has(h.doc.key),s._snapshot.fromCache),s.query.converter);return h.doc,{type:"added",doc:f,oldIndex:-1,newIndex:l++}})}{let l=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(h=>a||h.type!==3).map(h=>{const f=new Xn(s._firestore,s._userDataWriter,h.doc.key,h.doc,new Hn(s._snapshot.mutatedKeys.has(h.doc.key),s._snapshot.fromCache),s.query.converter);let I=-1,b=-1;return h.type!==0&&(I=l.indexOf(h.doc.key),l=l.delete(h.doc.key)),h.type!==1&&(l=l.add(h.doc),b=l.indexOf(h.doc.key)),{type:ep(h.type),doc:f,oldIndex:I,newIndex:b}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new U(L.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=an._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Nf.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],i=[],s=[];return this.docs.forEach(a=>{a._document!==null&&(t.push(a._document),i.push(this._userDataWriter.convertObjectMap(a._document.data.value.mapValue.fields,"previous")),s.push(a.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function ep(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return pn(61501,{type:n})}}an._jsonSchemaVersion="firestore/querySnapshot/1.0",an._jsonSchema={type:X("string",an._jsonSchemaVersion),bundleSource:X("string","QuerySnapshot"),bundleName:X("string"),bundle:X("string")};(function(e,t=!0){(function(s){In=s})(gt),ut(new Qe("firestore",(i,{instanceIdentifier:s,options:a})=>{const l=i.getProvider("app").getImmediate(),h=new Jf(new Sf(i.getProvider("auth-internal")),new kf(l,i.getProvider("app-check-internal")),function(I,b){if(!Object.prototype.hasOwnProperty.apply(I.options,["projectId"]))throw new U(L.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new rr(I.options.projectId,b)}(l,s),l);return a=Object.assign({useFetchStreams:t},a),h._setSettings(a),h},"PUBLIC").setMultipleInstances(!0)),Re(Eo,To,e),Re(Eo,To,"esm2017")})();/**
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
 */const ic="firebasestorage.googleapis.com",sc="storageBucket",tp=2*60*1e3,np=10*60*1e3;/**
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
 */class W extends ke{constructor(e,t,i=0){super(ei(e),`Firebase Storage: ${t} (${ei(e)})`),this.status_=i,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,W.prototype)}get status(){return this.status_}set status(e){this.status_=e}_codeEquals(e){return ei(e)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(e){this.customData.serverResponse=e,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var $;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})($||($={}));function ei(n){return"storage/"+n}function Li(){const n="An unknown error occurred, please check the error payload for server response.";return new W($.UNKNOWN,n)}function rp(n){return new W($.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function ip(n){return new W($.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function sp(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new W($.UNAUTHENTICATED,n)}function op(){return new W($.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function ap(n){return new W($.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function cp(){return new W($.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function lp(){return new W($.CANCELED,"User canceled the upload/download.")}function up(n){return new W($.INVALID_URL,"Invalid URL '"+n+"'.")}function hp(n){return new W($.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function dp(){return new W($.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+sc+"' property when initializing the app?")}function fp(){return new W($.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function pp(){return new W($.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function gp(n){return new W($.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function hi(n){return new W($.INVALID_ARGUMENT,n)}function oc(){return new W($.APP_DELETED,"The Firebase app was deleted.")}function mp(n){return new W($.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function cn(n,e){return new W($.INVALID_FORMAT,"String does not match format '"+n+"': "+e)}function Jt(n){throw new W($.INTERNAL_ERROR,"Internal error: "+n)}/**
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
 */class ue{constructor(e,t){this.bucket=e,this.path_=t}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(e,t){let i;try{i=ue.makeFromUrl(e,t)}catch{return new ue(e,"")}if(i.path==="")return i;throw hp(e)}static makeFromUrl(e,t){let i=null;const s="([A-Za-z0-9.\\-_]+)";function a(F){F.path.charAt(F.path.length-1)==="/"&&(F.path_=F.path_.slice(0,-1))}const l="(/(.*))?$",h=new RegExp("^gs://"+s+l,"i"),f={bucket:1,path:3};function I(F){F.path_=decodeURIComponent(F.path)}const b="v[A-Za-z0-9_]+",A=t.replace(/[.]/g,"\\."),T="(/([^?#]*).*)?$",C=new RegExp(`^https?://${A}/${b}/b/${s}/o${T}`,"i"),P={bucket:1,path:3},O=t===ic?"(?:storage.googleapis.com|storage.cloud.google.com)":t,k="([^?#]*)",q=new RegExp(`^https?://${O}/${s}/${k}`,"i"),N=[{regex:h,indices:f,postModify:a},{regex:C,indices:P,postModify:I},{regex:q,indices:{bucket:1,path:2},postModify:I}];for(let F=0;F<N.length;F++){const se=N[F],G=se.regex.exec(e);if(G){const y=G[se.indices.bucket];let d=G[se.indices.path];d||(d=""),i=new ue(y,d),se.postModify(i);break}}if(i==null)throw up(e);return i}}class _p{constructor(e){this.promise_=Promise.reject(e)}getPromise(){return this.promise_}cancel(e=!1){}}/**
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
 */function yp(n,e,t){let i=1,s=null,a=null,l=!1,h=0;function f(){return h===2}let I=!1;function b(...k){I||(I=!0,e.apply(null,k))}function A(k){s=setTimeout(()=>{s=null,n(C,f())},k)}function T(){a&&clearTimeout(a)}function C(k,...q){if(I){T();return}if(k){T(),b.call(null,k,...q);return}if(f()||l){T(),b.call(null,k,...q);return}i<64&&(i*=2);let N;h===1?(h=2,N=0):N=(i+Math.random())*1e3,A(N)}let P=!1;function O(k){P||(P=!0,T(),!I&&(s!==null?(k||(h=2),clearTimeout(s),A(0)):k||(h=1)))}return A(0),a=setTimeout(()=>{l=!0,O(!0)},t),O}function vp(n){n(!1)}/**
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
 */function wp(n){return n!==void 0}function Ip(n){return typeof n=="object"&&!Array.isArray(n)}function Ui(n){return typeof n=="string"||n instanceof String}function Vo(n){return Mi()&&n instanceof Blob}function Mi(){return typeof Blob<"u"}function di(n,e,t,i){if(i<e)throw hi(`Invalid value for '${n}'. Expected ${e} or greater.`);if(i>t)throw hi(`Invalid value for '${n}'. Expected ${t} or less.`)}/**
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
 */function Tn(n,e,t){let i=e;return t==null&&(i=`https://${e}`),`${t}://${i}/v0${n}`}function ac(n){const e=encodeURIComponent;let t="?";for(const i in n)if(n.hasOwnProperty(i)){const s=e(i)+"="+e(n[i]);t=t+s+"&"}return t=t.slice(0,-1),t}var ct;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(ct||(ct={}));/**
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
 */function Ep(n,e){const t=n>=500&&n<600,s=[408,429].indexOf(n)!==-1,a=e.indexOf(n)!==-1;return t||s||a}/**
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
 */class Tp{constructor(e,t,i,s,a,l,h,f,I,b,A,T=!0,C=!1){this.url_=e,this.method_=t,this.headers_=i,this.body_=s,this.successCodes_=a,this.additionalRetryCodes_=l,this.callback_=h,this.errorCallback_=f,this.timeout_=I,this.progressCallback_=b,this.connectionFactory_=A,this.retry=T,this.isUsingEmulator=C,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((P,O)=>{this.resolve_=P,this.reject_=O,this.start_()})}start_(){const e=(i,s)=>{if(s){i(!1,new $n(!1,null,!0));return}const a=this.connectionFactory_();this.pendingConnection_=a;const l=h=>{const f=h.loaded,I=h.lengthComputable?h.total:-1;this.progressCallback_!==null&&this.progressCallback_(f,I)};this.progressCallback_!==null&&a.addUploadProgressListener(l),a.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&a.removeUploadProgressListener(l),this.pendingConnection_=null;const h=a.getErrorCode()===ct.NO_ERROR,f=a.getStatus();if(!h||Ep(f,this.additionalRetryCodes_)&&this.retry){const b=a.getErrorCode()===ct.ABORT;i(!1,new $n(!1,null,b));return}const I=this.successCodes_.indexOf(f)!==-1;i(!0,new $n(I,a))})},t=(i,s)=>{const a=this.resolve_,l=this.reject_,h=s.connection;if(s.wasSuccessCode)try{const f=this.callback_(h,h.getResponse());wp(f)?a(f):a()}catch(f){l(f)}else if(h!==null){const f=Li();f.serverResponse=h.getErrorText(),this.errorCallback_?l(this.errorCallback_(h,f)):l(f)}else if(s.canceled){const f=this.appDelete_?oc():lp();l(f)}else{const f=cp();l(f)}};this.canceled_?t(!1,new $n(!1,null,!0)):this.backoffId_=yp(e,t,this.timeout_)}getPromise(){return this.promise_}cancel(e){this.canceled_=!0,this.appDelete_=e||!1,this.backoffId_!==null&&vp(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class $n{constructor(e,t,i){this.wasSuccessCode=e,this.connection=t,this.canceled=!!i}}function bp(n,e){e!==null&&e.length>0&&(n.Authorization="Firebase "+e)}function Ap(n,e){n["X-Firebase-Storage-Version"]="webjs/"+(e??"AppManager")}function Sp(n,e){e&&(n["X-Firebase-GMPID"]=e)}function Rp(n,e){e!==null&&(n["X-Firebase-AppCheck"]=e)}function Pp(n,e,t,i,s,a,l=!0,h=!1){const f=ac(n.urlParams),I=n.url+f,b=Object.assign({},n.headers);return Sp(b,e),bp(b,t),Ap(b,a),Rp(b,i),new Tp(I,n.method,b,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,s,l,h)}/**
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
 */function kp(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Cp(...n){const e=kp();if(e!==void 0){const t=new e;for(let i=0;i<n.length;i++)t.append(n[i]);return t.getBlob()}else{if(Mi())return new Blob(n);throw new W($.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function Op(n,e,t){return n.webkitSlice?n.webkitSlice(e,t):n.mozSlice?n.mozSlice(e,t):n.slice?n.slice(e,t):null}/**
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
 */function Np(n){if(typeof atob>"u")throw gp("base-64");return atob(n)}/**
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
 */const Se={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class ti{constructor(e,t){this.data=e,this.contentType=t||null}}function Dp(n,e){switch(n){case Se.RAW:return new ti(cc(e));case Se.BASE64:case Se.BASE64URL:return new ti(lc(n,e));case Se.DATA_URL:return new ti(Up(e),Mp(e))}throw Li()}function cc(n){const e=[];for(let t=0;t<n.length;t++){let i=n.charCodeAt(t);if(i<=127)e.push(i);else if(i<=2047)e.push(192|i>>6,128|i&63);else if((i&64512)===55296)if(!(t<n.length-1&&(n.charCodeAt(t+1)&64512)===56320))e.push(239,191,189);else{const a=i,l=n.charCodeAt(++t);i=65536|(a&1023)<<10|l&1023,e.push(240|i>>18,128|i>>12&63,128|i>>6&63,128|i&63)}else(i&64512)===56320?e.push(239,191,189):e.push(224|i>>12,128|i>>6&63,128|i&63)}return new Uint8Array(e)}function Lp(n){let e;try{e=decodeURIComponent(n)}catch{throw cn(Se.DATA_URL,"Malformed data URL.")}return cc(e)}function lc(n,e){switch(n){case Se.BASE64:{const s=e.indexOf("-")!==-1,a=e.indexOf("_")!==-1;if(s||a)throw cn(n,"Invalid character '"+(s?"-":"_")+"' found: is it base64url encoded?");break}case Se.BASE64URL:{const s=e.indexOf("+")!==-1,a=e.indexOf("/")!==-1;if(s||a)throw cn(n,"Invalid character '"+(s?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/");break}}let t;try{t=Np(e)}catch(s){throw s.message.includes("polyfill")?s:cn(n,"Invalid character found")}const i=new Uint8Array(t.length);for(let s=0;s<t.length;s++)i[s]=t.charCodeAt(s);return i}class uc{constructor(e){this.base64=!1,this.contentType=null;const t=e.match(/^data:([^,]+)?,/);if(t===null)throw cn(Se.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const i=t[1]||null;i!=null&&(this.base64=xp(i,";base64"),this.contentType=this.base64?i.substring(0,i.length-7):i),this.rest=e.substring(e.indexOf(",")+1)}}function Up(n){const e=new uc(n);return e.base64?lc(Se.BASE64,e.rest):Lp(e.rest)}function Mp(n){return new uc(n).contentType}function xp(n,e){return n.length>=e.length?n.substring(n.length-e.length)===e:!1}/**
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
 */class Ke{constructor(e,t){let i=0,s="";Vo(e)?(this.data_=e,i=e.size,s=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),i=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),i=e.length),this.size_=i,this.type_=s}size(){return this.size_}type(){return this.type_}slice(e,t){if(Vo(this.data_)){const i=this.data_,s=Op(i,e,t);return s===null?null:new Ke(s)}else{const i=new Uint8Array(this.data_.buffer,e,t-e);return new Ke(i,!0)}}static getBlob(...e){if(Mi()){const t=e.map(i=>i instanceof Ke?i.data_:i);return new Ke(Cp.apply(null,t))}else{const t=e.map(l=>Ui(l)?Dp(Se.RAW,l).data:l.data_);let i=0;t.forEach(l=>{i+=l.byteLength});const s=new Uint8Array(i);let a=0;return t.forEach(l=>{for(let h=0;h<l.length;h++)s[a++]=l[h]}),new Ke(s,!0)}}uploadData(){return this.data_}}/**
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
 */function xi(n){let e;try{e=JSON.parse(n)}catch{return null}return Ip(e)?e:null}/**
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
 */function Fp(n){if(n.length===0)return null;const e=n.lastIndexOf("/");return e===-1?"":n.slice(0,e)}function Vp(n,e){const t=e.split("/").filter(i=>i.length>0).join("/");return n.length===0?t:n+"/"+t}function hc(n){const e=n.lastIndexOf("/",n.length-2);return e===-1?n:n.slice(e+1)}/**
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
 */function jp(n,e){return e}class ce{constructor(e,t,i,s){this.server=e,this.local=t||e,this.writable=!!i,this.xform=s||jp}}let Wn=null;function Bp(n){return!Ui(n)||n.length<2?n:hc(n)}function dc(){if(Wn)return Wn;const n=[];n.push(new ce("bucket")),n.push(new ce("generation")),n.push(new ce("metageneration")),n.push(new ce("name","fullPath",!0));function e(a,l){return Bp(l)}const t=new ce("name");t.xform=e,n.push(t);function i(a,l){return l!==void 0?Number(l):l}const s=new ce("size");return s.xform=i,n.push(s),n.push(new ce("timeCreated")),n.push(new ce("updated")),n.push(new ce("md5Hash",null,!0)),n.push(new ce("cacheControl",null,!0)),n.push(new ce("contentDisposition",null,!0)),n.push(new ce("contentEncoding",null,!0)),n.push(new ce("contentLanguage",null,!0)),n.push(new ce("contentType",null,!0)),n.push(new ce("metadata","customMetadata",!0)),Wn=n,Wn}function Hp(n,e){function t(){const i=n.bucket,s=n.fullPath,a=new ue(i,s);return e._makeStorageReference(a)}Object.defineProperty(n,"ref",{get:t})}function $p(n,e,t){const i={};i.type="file";const s=t.length;for(let a=0;a<s;a++){const l=t[a];i[l.local]=l.xform(i,e[l.server])}return Hp(i,n),i}function fc(n,e,t){const i=xi(e);return i===null?null:$p(n,i,t)}function Wp(n,e,t,i){const s=xi(e);if(s===null||!Ui(s.downloadTokens))return null;const a=s.downloadTokens;if(a.length===0)return null;const l=encodeURIComponent;return a.split(",").map(I=>{const b=n.bucket,A=n.fullPath,T="/b/"+l(b)+"/o/"+l(A),C=Tn(T,t,i),P=ac({alt:"media",token:I});return C+P})[0]}function qp(n,e){const t={},i=e.length;for(let s=0;s<i;s++){const a=e[s];a.writable&&(t[a.server]=n[a.local])}return JSON.stringify(t)}/**
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
 */const jo="prefixes",Bo="items";function zp(n,e,t){const i={prefixes:[],items:[],nextPageToken:t.nextPageToken};if(t[jo])for(const s of t[jo]){const a=s.replace(/\/$/,""),l=n._makeStorageReference(new ue(e,a));i.prefixes.push(l)}if(t[Bo])for(const s of t[Bo]){const a=n._makeStorageReference(new ue(e,s.name));i.items.push(a)}return i}function Gp(n,e,t){const i=xi(t);return i===null?null:zp(n,e,i)}class mr{constructor(e,t,i,s){this.url=e,this.method=t,this.handler=i,this.timeout=s,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
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
 */function Fi(n){if(!n)throw Li()}function Kp(n,e){function t(i,s){const a=fc(n,s,e);return Fi(a!==null),a}return t}function Jp(n,e){function t(i,s){const a=Gp(n,e,s);return Fi(a!==null),a}return t}function Xp(n,e){function t(i,s){const a=fc(n,s,e);return Fi(a!==null),Wp(a,s,n.host,n._protocol)}return t}function Vi(n){function e(t,i){let s;return t.getStatus()===401?t.getErrorText().includes("Firebase App Check token is invalid")?s=op():s=sp():t.getStatus()===402?s=ip(n.bucket):t.getStatus()===403?s=ap(n.path):s=i,s.status=t.getStatus(),s.serverResponse=i.serverResponse,s}return e}function pc(n){const e=Vi(n);function t(i,s){let a=e(i,s);return i.getStatus()===404&&(a=rp(n.path)),a.serverResponse=s.serverResponse,a}return t}function Yp(n,e,t,i,s){const a={};e.isRoot?a.prefix="":a.prefix=e.path+"/",t.length>0&&(a.delimiter=t),i&&(a.pageToken=i),s&&(a.maxResults=s);const l=e.bucketOnlyServerUrl(),h=Tn(l,n.host,n._protocol),f="GET",I=n.maxOperationRetryTime,b=new mr(h,f,Jp(n,e.bucket),I);return b.urlParams=a,b.errorHandler=Vi(e),b}function Zp(n,e,t){const i=e.fullServerUrl(),s=Tn(i,n.host,n._protocol),a="GET",l=n.maxOperationRetryTime,h=new mr(s,a,Xp(n,t),l);return h.errorHandler=pc(e),h}function Qp(n,e){const t=e.fullServerUrl(),i=Tn(t,n.host,n._protocol),s="DELETE",a=n.maxOperationRetryTime;function l(f,I){}const h=new mr(i,s,l,a);return h.successCodes=[200,204],h.errorHandler=pc(e),h}function eg(n,e){return n&&n.contentType||e&&e.type()||"application/octet-stream"}function tg(n,e,t){const i=Object.assign({},t);return i.fullPath=n.path,i.size=e.size(),i.contentType||(i.contentType=eg(null,e)),i}function ng(n,e,t,i,s){const a=e.bucketOnlyServerUrl(),l={"X-Goog-Upload-Protocol":"multipart"};function h(){let N="";for(let F=0;F<2;F++)N=N+Math.random().toString().slice(2);return N}const f=h();l["Content-Type"]="multipart/related; boundary="+f;const I=tg(e,i,s),b=qp(I,t),A="--"+f+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+b+`\r
--`+f+`\r
Content-Type: `+I.contentType+`\r
\r
`,T=`\r
--`+f+"--",C=Ke.getBlob(A,i,T);if(C===null)throw fp();const P={name:I.fullPath},O=Tn(a,n.host,n._protocol),k="POST",q=n.maxUploadRetryTime,j=new mr(O,k,Kp(n,t),q);return j.urlParams=P,j.headers=l,j.body=C.uploadData(),j.errorHandler=Vi(e),j}class rg{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=ct.NO_ERROR,this.sendPromise_=new Promise(e=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=ct.ABORT,e()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=ct.NETWORK_ERROR,e()}),this.xhr_.addEventListener("load",()=>{e()})})}send(e,t,i,s,a){if(this.sent_)throw Jt("cannot .send() more than once");if(pt(e)&&i&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(t,e,!0),a!==void 0)for(const l in a)a.hasOwnProperty(l)&&this.xhr_.setRequestHeader(l,a[l].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw Jt("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw Jt("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw Jt("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw Jt("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(e){return this.xhr_.getResponseHeader(e)}addUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",e)}removeUploadProgressListener(e){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",e)}}class ig extends rg{initXhr(){this.xhr_.responseType="text"}}function _r(){return new ig}/**
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
 */class ft{constructor(e,t){this._service=e,t instanceof ue?this._location=t:this._location=ue.makeFromUrl(t,e.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(e,t){return new ft(e,t)}get root(){const e=new ue(this._location.bucket,"");return this._newRef(this._service,e)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return hc(this._location.path)}get storage(){return this._service}get parent(){const e=Fp(this._location.path);if(e===null)return null;const t=new ue(this._location.bucket,e);return new ft(this._service,t)}_throwIfRoot(e){if(this._location.path==="")throw mp(e)}}function sg(n,e,t){n._throwIfRoot("uploadBytes");const i=ng(n.storage,n._location,dc(),new Ke(e,!0),t);return n.storage.makeRequestWithTokens(i,_r).then(s=>({metadata:s,ref:n}))}function og(n){const e={prefixes:[],items:[]};return gc(n,e).then(()=>e)}async function gc(n,e,t){const s=await ag(n,{pageToken:t});e.prefixes.push(...s.prefixes),e.items.push(...s.items),s.nextPageToken!=null&&await gc(n,e,s.nextPageToken)}function ag(n,e){e!=null&&typeof e.maxResults=="number"&&di("options.maxResults",1,1e3,e.maxResults);const t=e||{},i=Yp(n.storage,n._location,"/",t.pageToken,t.maxResults);return n.storage.makeRequestWithTokens(i,_r)}function cg(n){n._throwIfRoot("getDownloadURL");const e=Zp(n.storage,n._location,dc());return n.storage.makeRequestWithTokens(e,_r).then(t=>{if(t===null)throw pp();return t})}function lg(n){n._throwIfRoot("deleteObject");const e=Qp(n.storage,n._location);return n.storage.makeRequestWithTokens(e,_r)}function ug(n,e){const t=Vp(n._location.path,e),i=new ue(n._location.bucket,t);return new ft(n.storage,i)}/**
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
 */function hg(n){return/^[A-Za-z]+:\/\//.test(n)}function dg(n,e){return new ft(n,e)}function mc(n,e){if(n instanceof ji){const t=n;if(t._bucket==null)throw dp();const i=new ft(t,t._bucket);return e!=null?mc(i,e):i}else return e!==void 0?ug(n,e):n}function fg(n,e){if(e&&hg(e)){if(n instanceof ji)return dg(n,e);throw hi("To use ref(service, url), the first argument must be a Storage instance.")}else return mc(n,e)}function Ho(n,e){const t=e?.[sc];return t==null?null:ue.makeFromBucketSpec(t,n)}function pg(n,e,t,i={}){n.host=`${e}:${t}`;const s=pt(e);s&&(pi(`https://${n.host}/b`),gi("Storage",!0)),n._isUsingEmulator=!0,n._protocol=s?"https":"http";const{mockUserToken:a}=i;a&&(n._overrideAuthToken=typeof a=="string"?a:ea(a,n.app.options.projectId))}class ji{constructor(e,t,i,s,a,l=!1){this.app=e,this._authProvider=t,this._appCheckProvider=i,this._url=s,this._firebaseVersion=a,this._isUsingEmulator=l,this._bucket=null,this._host=ic,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=tp,this._maxUploadRetryTime=np,this._requests=new Set,s!=null?this._bucket=ue.makeFromBucketSpec(s,this._host):this._bucket=Ho(this._host,this.app.options)}get host(){return this._host}set host(e){this._host=e,this._url!=null?this._bucket=ue.makeFromBucketSpec(this._url,e):this._bucket=Ho(e,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(e){di("time",0,Number.POSITIVE_INFINITY,e),this._maxUploadRetryTime=e}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(e){di("time",0,Number.POSITIVE_INFINITY,e),this._maxOperationRetryTime=e}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const e=this._authProvider.getImmediate({optional:!0});if(e){const t=await e.getToken();if(t!==null)return t.accessToken}return null}async _getAppCheckToken(){if(J(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=this._appCheckProvider.getImmediate({optional:!0});return e?(await e.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(e=>e.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(e){return new ft(this,e)}_makeRequest(e,t,i,s,a=!0){if(this._deleted)return new _p(oc());{const l=Pp(e,this._appId,i,s,t,this._firebaseVersion,a,this._isUsingEmulator);return this._requests.add(l),l.getPromise().then(()=>this._requests.delete(l),()=>this._requests.delete(l)),l}}async makeRequestWithTokens(e,t){const[i,s]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(e,t,i,s).getPromise()}}const $o="@firebase/storage",Wo="0.13.14";/**
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
 */const _c="storage";function om(n,e,t){return n=M(n),sg(n,e,t)}function am(n){return n=M(n),og(n)}function cm(n){return n=M(n),cg(n)}function lm(n){return n=M(n),lg(n)}function um(n,e){return n=M(n),fg(n,e)}function gg(n=sr(),e){n=M(n);const i=ir(n,_c).getImmediate({identifier:e}),s=Yo("storage");return s&&mg(i,...s),i}function mg(n,e,t,i={}){pg(n,e,t,i)}function _g(n,{instanceIdentifier:e}){const t=n.getProvider("app").getImmediate(),i=n.getProvider("auth-internal"),s=n.getProvider("app-check-internal");return new ji(t,i,s,e,gt)}function yg(){ut(new Qe(_c,_g,"PUBLIC").setMultipleInstances(!0)),Re($o,Wo,""),Re($o,Wo,"esm2017")}yg();/*! Capacitor: https://capacitorjs.com/ - MIT License */var Pt;(function(n){n.Unimplemented="UNIMPLEMENTED",n.Unavailable="UNAVAILABLE"})(Pt||(Pt={}));class ni extends Error{constructor(e,t,i){super(e),this.message=e,this.code=t,this.data=i}}const vg=n=>{var e,t;return n?.androidBridge?"android":!((t=(e=n?.webkit)===null||e===void 0?void 0:e.messageHandlers)===null||t===void 0)&&t.bridge?"ios":"web"},wg=n=>{const e=n.CapacitorCustomPlatform||null,t=n.Capacitor||{},i=t.Plugins=t.Plugins||{},s=()=>e!==null?e.name:vg(n),a=()=>s()!=="web",l=A=>{const T=I.get(A);return!!(T?.platforms.has(s())||h(A))},h=A=>{var T;return(T=t.PluginHeaders)===null||T===void 0?void 0:T.find(C=>C.name===A)},f=A=>n.console.error(A),I=new Map,b=(A,T={})=>{const C=I.get(A);if(C)return console.warn(`Capacitor plugin "${A}" already registered. Cannot register plugins twice.`),C.proxy;const P=s(),O=h(A);let k;const q=async()=>(!k&&P in T?k=typeof T[P]=="function"?k=await T[P]():k=T[P]:e!==null&&!k&&"web"in T&&(k=typeof T.web=="function"?k=await T.web():k=T.web),k),j=(d,p)=>{var m,_;if(O){const v=O?.methods.find(g=>p===g.name);if(v)return v.rtype==="promise"?g=>t.nativePromise(A,p.toString(),g):(g,fe)=>t.nativeCallback(A,p.toString(),g,fe);if(d)return(m=d[p])===null||m===void 0?void 0:m.bind(d)}else{if(d)return(_=d[p])===null||_===void 0?void 0:_.bind(d);throw new ni(`"${A}" plugin is not implemented on ${P}`,Pt.Unimplemented)}},N=d=>{let p;const m=(..._)=>{const v=q().then(g=>{const fe=j(g,d);if(fe){const Ee=fe(..._);return p=Ee?.remove,Ee}else throw new ni(`"${A}.${d}()" is not implemented on ${P}`,Pt.Unimplemented)});return d==="addListener"&&(v.remove=async()=>p()),v};return m.toString=()=>`${d.toString()}() { [capacitor code] }`,Object.defineProperty(m,"name",{value:d,writable:!1,configurable:!1}),m},F=N("addListener"),se=N("removeListener"),G=(d,p)=>{const m=F({eventName:d},p),_=async()=>{const g=await m;se({eventName:d,callbackId:g},p)},v=new Promise(g=>m.then(()=>g({remove:_})));return v.remove=async()=>{console.warn("Using addListener() without 'await' is deprecated."),await _()},v},y=new Proxy({},{get(d,p){switch(p){case"$$typeof":return;case"toJSON":return()=>({});case"addListener":return O?G:F;case"removeListener":return se;default:return N(p)}}});return i[A]=y,I.set(A,{name:A,proxy:y,platforms:new Set([...Object.keys(T),...O?[P]:[]])}),y};return t.convertFileSrc||(t.convertFileSrc=A=>A),t.getPlatform=s,t.handleError=f,t.isNativePlatform=a,t.isPluginAvailable=l,t.registerPlugin=b,t.Exception=ni,t.DEBUG=!!t.DEBUG,t.isLoggingEnabled=!!t.isLoggingEnabled,t},Ig=n=>n.Capacitor=wg(n),gn=Ig(typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{}),yc=gn.registerPlugin;class vc{constructor(){this.listeners={},this.retainedEventArguments={},this.windowListeners={}}addListener(e,t){let i=!1;this.listeners[e]||(this.listeners[e]=[],i=!0),this.listeners[e].push(t);const a=this.windowListeners[e];a&&!a.registered&&this.addWindowListener(a),i&&this.sendRetainedArgumentsForEvent(e);const l=async()=>this.removeListener(e,t);return Promise.resolve({remove:l})}async removeAllListeners(){this.listeners={};for(const e in this.windowListeners)this.removeWindowListener(this.windowListeners[e]);this.windowListeners={}}notifyListeners(e,t,i){const s=this.listeners[e];if(!s){if(i){let a=this.retainedEventArguments[e];a||(a=[]),a.push(t),this.retainedEventArguments[e]=a}return}s.forEach(a=>a(t))}hasListeners(e){var t;return!!(!((t=this.listeners[e])===null||t===void 0)&&t.length)}registerWindowListener(e,t){this.windowListeners[t]={registered:!1,windowEventName:e,pluginEventName:t,handler:i=>{this.notifyListeners(t,i)}}}unimplemented(e="not implemented"){return new gn.Exception(e,Pt.Unimplemented)}unavailable(e="not available"){return new gn.Exception(e,Pt.Unavailable)}async removeListener(e,t){const i=this.listeners[e];if(!i)return;const s=i.indexOf(t);this.listeners[e].splice(s,1),this.listeners[e].length||this.removeWindowListener(this.windowListeners[e])}addWindowListener(e){window.addEventListener(e.windowEventName,e.handler),e.registered=!0}removeWindowListener(e){e&&(window.removeEventListener(e.windowEventName,e.handler),e.registered=!1)}sendRetainedArgumentsForEvent(e){const t=this.retainedEventArguments[e];t&&(delete this.retainedEventArguments[e],t.forEach(i=>{this.notifyListeners(e,i)}))}}const qo=n=>encodeURIComponent(n).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape),zo=n=>n.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent);class Eg extends vc{async getCookies(){const e=document.cookie,t={};return e.split(";").forEach(i=>{if(i.length<=0)return;let[s,a]=i.replace(/=/,"CAP_COOKIE").split("CAP_COOKIE");s=zo(s).trim(),a=zo(a).trim(),t[s]=a}),t}async setCookie(e){try{const t=qo(e.key),i=qo(e.value),s=`; expires=${(e.expires||"").replace("expires=","")}`,a=(e.path||"/").replace("path=",""),l=e.url!=null&&e.url.length>0?`domain=${e.url}`:"";document.cookie=`${t}=${i||""}${s}; path=${a}; ${l};`}catch(t){return Promise.reject(t)}}async deleteCookie(e){try{document.cookie=`${e.key}=; Max-Age=0`}catch(t){return Promise.reject(t)}}async clearCookies(){try{const e=document.cookie.split(";")||[];for(const t of e)document.cookie=t.replace(/^ +/,"").replace(/=.*/,`=;expires=${new Date().toUTCString()};path=/`)}catch(e){return Promise.reject(e)}}async clearAllCookies(){try{await this.clearCookies()}catch(e){return Promise.reject(e)}}}yc("CapacitorCookies",{web:()=>new Eg});const Tg=async n=>new Promise((e,t)=>{const i=new FileReader;i.onload=()=>{const s=i.result;e(s.indexOf(",")>=0?s.split(",")[1]:s)},i.onerror=s=>t(s),i.readAsDataURL(n)}),bg=(n={})=>{const e=Object.keys(n);return Object.keys(n).map(s=>s.toLocaleLowerCase()).reduce((s,a,l)=>(s[a]=n[e[l]],s),{})},Ag=(n,e=!0)=>n?Object.entries(n).reduce((i,s)=>{const[a,l]=s;let h,f;return Array.isArray(l)?(f="",l.forEach(I=>{h=e?encodeURIComponent(I):I,f+=`${a}=${h}&`}),f.slice(0,-1)):(h=e?encodeURIComponent(l):l,f=`${a}=${h}`),`${i}&${f}`},"").substr(1):null,Sg=(n,e={})=>{const t=Object.assign({method:n.method||"GET",headers:n.headers},e),s=bg(n.headers)["content-type"]||"";if(typeof n.data=="string")t.body=n.data;else if(s.includes("application/x-www-form-urlencoded")){const a=new URLSearchParams;for(const[l,h]of Object.entries(n.data||{}))a.set(l,h);t.body=a.toString()}else if(s.includes("multipart/form-data")||n.data instanceof FormData){const a=new FormData;if(n.data instanceof FormData)n.data.forEach((h,f)=>{a.append(f,h)});else for(const h of Object.keys(n.data))a.append(h,n.data[h]);t.body=a;const l=new Headers(t.headers);l.delete("content-type"),t.headers=l}else(s.includes("application/json")||typeof n.data=="object")&&(t.body=JSON.stringify(n.data));return t};class Rg extends vc{async request(e){const t=Sg(e,e.webFetchExtra),i=Ag(e.params,e.shouldEncodeUrlParams),s=i?`${e.url}?${i}`:e.url,a=await fetch(s,t),l=a.headers.get("content-type")||"";let{responseType:h="text"}=a.ok?e:{};l.includes("application/json")&&(h="json");let f,I;switch(h){case"arraybuffer":case"blob":I=await a.blob(),f=await Tg(I);break;case"json":f=await a.json();break;case"document":case"text":default:f=await a.text()}const b={};return a.headers.forEach((A,T)=>{b[T]=A}),{data:f,headers:b,status:a.status,url:a.url}}async get(e){return this.request(Object.assign(Object.assign({},e),{method:"GET"}))}async post(e){return this.request(Object.assign(Object.assign({},e),{method:"POST"}))}async put(e){return this.request(Object.assign(Object.assign({},e),{method:"PUT"}))}async patch(e){return this.request(Object.assign(Object.assign({},e),{method:"PATCH"}))}async delete(e){return this.request(Object.assign(Object.assign({},e),{method:"DELETE"}))}}yc("CapacitorHttp",{web:()=>new Rg});const Pg={apiKey:"AIzaSyDXlu3twONtxnlsSYAjJcLng0UsNEgKkkg",authDomain:"fototv-90cf0.firebaseapp.com",projectId:"fototv-90cf0",storageBucket:"fototv-90cf0.firebasestorage.app",messagingSenderId:"341116492373",appId:"1:341116492373:web:74768f1c508198574d12dc",measurementId:"G-K7K2NXMWW3"},Bi=Su().length?sr():ra(Pg),kg=If(Bi);rd(kg,Ma).catch(n=>console.error("Error setting auth persistence:",n));const Hi=new Ne;Hi.addScope("email");Hi.addScope("profile");Hi.setCustomParameters({prompt:"select_account"});Xf(Bi);const hm=gg(Bi);console.log(`Firebase initialized. Platform: ${gn.getPlatform()}, Native: ${gn.isNativePlatform()}`);export{gn as $,Ma as A,Cg as B,Ng as C,xg as D,mt as E,qe as F,ze as G,jg as H,Qg as I,Og as J,qg as K,zg as L,Wg as M,Sh as N,Gn as O,$g as P,rm as Q,Zg as R,tm as S,Ge as T,im as U,nm as V,vc as W,Kh as X,Fe as Y,Gg as Z,yc as _,kg as a,Hi as a0,om as a1,Jg as a2,ur as a3,cr as a4,fn as a5,nn as a6,sd as a7,pf as a8,Yu as a9,bh as aa,id as ab,Vu as ac,Ai as ad,If as b,Ug as c,lm as d,Mg as e,Lg as f,cm as g,Yg as h,Bg as i,sm as j,Vg as k,am as l,Ne as m,em as n,Kg as o,eh as p,Xg as q,um as r,hm as s,Hg as t,Dg as u,Fg as v,rd as w,ro as x,vd as y,Fa as z};
