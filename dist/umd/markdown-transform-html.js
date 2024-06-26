!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).MarkdownTransformer={})}(this,(function(t){"use strict";function e(t,e=!1){let n=function(t){let e="",n=-1;for(;-1!=(n=t.indexOf("**"));){e+=t.slice(0,n);let r=(t=t.slice(n+2)).indexOf("**");if(-1==r){t="**"+t;break}e+=`<strong>${t.slice(0,r)}</strong>`,t=t.slice(r+2)}return t&&(e+=t),e}(t);return n=function(t){let e="",n=-1;for(;-1!=(n=t.indexOf("*"));){e+=t.slice(0,n);let r=(t=t.slice(n+1)).indexOf("*");if(-1==r){t="*"+t;break}e+=`<i>${t.slice(0,r)}</i>`,t=t.slice(r+1)}return t&&(e+=t),e}(n),n=function(t){let e="",n=-1;for(;-1!=(n=t.indexOf("`"));){e+=t.slice(0,n);let r=(t=t.slice(n+1)).indexOf("`");if(-1==r){t="`"+t;break}e+=`<code class=single-code>${t.slice(0,r)}</code>`,t=t.slice(r+1)}return t&&(e+=t),e}(n),n=function(t){let e="",n=-1;for(;-1!=(n=t.indexOf("~~"));){e+=t.slice(0,n);let r=(t=t.slice(n+2)).indexOf("~~");if(-1==r){t="~~"+t;break}e+=`<del>${t.slice(0,r)}</del>`,t=t.slice(r+2)}return t&&(e+=t),e}(n),n=function(t){let e="";for(;s.test(t);){let n=t.indexOf("![");e+=t.slice(0,n);let r=(t=t.slice(n+2)).indexOf("]("),i=t.slice(0,r),s=(t=t.slice(r+2)).indexOf(")"),l=t.slice(0,s);t=t.slice(s+1),e+=`<img alt=${i} src=${l} />`}return e+t}(n),n=function(t){let e="";for(;i.test(t);){let n=t.indexOf("[");e+=t.slice(0,n);let r=(t=t.slice(n+1)).indexOf("]("),i=t.slice(0,r),s=(t=t.slice(r+2)).indexOf(")"),l=t.slice(0,s);t=t.slice(s+1),e+=`<a href=${l} target="_blank">${i}</a>`}return e+t}(n),n=function(t){return t.replace(/icon:(\w+)(\s|\b)/g,((t,e)=>`<i class='iconfont icon-${e}'></i>`))}(n),e?n:`<p>${n}</p>`}const n=/(#+)\s(.*)/g,r=/^\s*(\d+)\.\s(.+)/,i=/\[(.*)\]\((.*)\)/,s=/!\[(.*)\]\((.*)\)/;function l(t,n){let r=n?"<ol>":"<ul>";for(const n of t)r+=`<li>${e(n.content+c(n.children),!0)}</li>`;return r+=n?"</ol>":"</ul>",r}function c(t){let e="",n=0,r=t.length;if(0===r)return"";for(;n<r;){const i=[],s=[];for(;n<r&&"no_order"===t[n].type;)s.push(t[n]),n++;for(e+=l(s,!1);n<r&&"order"===t[n].type;)i.push(t[n]),n++;e+=l(i,!0)}return e.replace(/<ul><\/ul>/,"").replace(/<ol><\/ol>/,"")}function o(t){return r.test(t)}function u(t){let e=t.indexOf("- ");return 0==e||-1!=e&&!t.slice(0,e).trim()}function f(t){return"#"===t.trimStart()[0]}function a(t){return t.startsWith("```")}function d(t){return/^>/.test(t.trim())}function h(t){return"---"===t.trim()}function m(t){return"|"===t.trim()[0]}function g(t){return"::: start"===t.trim()||":::start"===t.trim()}function x(t){return":::"===t.trim()}function p(t){return"::: headStart"===t.trim()||":::headStart"===t.trim()}function b(t){return"::: mainStart"===t.trim()||":::mainStart"===t.trim()}function O(t){return`<blockquote>${t.slice(1)}</blockquote>`}function $(t,e,n,r){let i="",s=t[e].slice(3).trim().toLowerCase();for(++e;e<n&&!t[e].startsWith("```");)i+=t[e]+"\n",e++;t[e]="";const l=[r.highlight?`language-${s}`:"",r.lineNumber?"line-numbers":""].join(" ");return i=`<pre><code ${l&&`class='${l}'`}>${i}</code></pre>`,{startIdx:e,result:i}}function v(t){return t.length>6?6:t.length}function y(t){return t.trim().replace(n,((t,n,r)=>`<h${v(n)}>${e(r,!0)}</h${v(n)}>`))}function I(t,n,r){let i="<table>";for(i+=function(t){let n=-1,r="<thead><tr>";for(let i=0,s=t.length;i<s;i++)"|"==t[i]&&k(t,i-1)&&k(t,i+1)&&(-1!=n&&(r+=`<th>${e(t.slice(n+1,i))}</th>`),n=i);return r+"</tr></thead>"}(t[n]),i+="<tbody >",++n;n<r&&"|"===t[n].trim()[0];n++)i+=j(t[n]);return i+="</tbody></table>",i=i.replace(/<tr><\/tr>/,""),{startIdx:n-1,result:i}}function j(t){let n=-1,r="<tr>";for(let i=0,s=t.length;i<s;i++)if("|"==t[i]&&k(t,i-1)&&k(t,i+1)){if(-1!=n){let s=t.slice(n+1,i);if("-"===s.trim()[0])continue;r+=`<td>${e(s)}</td>`}n=i}return r+"</tr>"}function k(t,e){return" "===t[e]||null==t[e]}function E(t,e,n,r){let i="<div class=head-layout>",s="";for(++e;e<n&&("::: headEnd"!==(l=t[e]).trim()&&":::headEnd"!==l.trim());)t[e].trim()&&(s+=t[e]+"\n"),e++;var l;return i+=W(s,Object.assign(Object.assign({},r),{xss:!1}))+"</div>",{result:i,startIdx:e}}function S(t,e,n,r){let i="<div class=flex-layout>",s="";for(++e;e<n&&("::: end"!==(l=t[e]).trim()&&":::end"!==l.trim());){if(g(t[e])){const{result:i,startIdx:l}=S(t,e,n,r);s+=i,e=l}else if(p(t[e])){const{result:i,startIdx:l}=E(t,e,n,r);s+=i,e=l}else x(t[e])?(i+=`<div class=flex-layout-item>${W(s,Object.assign(Object.assign({},r),{xss:!1}))}</div>`,s=""):s+=t[e].trim()?"\n"+t[e]+"\n":"";e++}var l;return i+=`<div class=flex-layout-item>${W(s,Object.assign(Object.assign({},r),{xss:!1}))}</div>`,i+="</div>",{result:i,startIdx:e}}function T(t,e,n,r){let i="<div class=main-layout>",s="";for(++e;e<n&&("::: mainEnd"!==(l=t[e]).trim()&&":::mainEnd"!==l.trim());)t[e].trim()&&(s+=t[e]+"\n"),e++;var l;return i+=W(s,Object.assign(Object.assign({},r),{xss:!1}))+"</div>",{result:i,startIdx:e}}function w(t,e,n){let r="";for(;e<n;e++)if(t[e].trim()){if(!o(t[e])&&!u(t[e]))break;r+=t[e]+"\n"}return r=function(t){const e=t.match(/(\s)*(-|\d+\.)\s(.+)/g);if(!e)return t;!function(t){/^\s+/.test(t[0])&&(t[0]=t[0].replace(/^(\s+)/g,(t=>"\n"))),t[0].startsWith("\n")||(t[0]="\n"+t[0])}(e);const n=function(t){const e=t,n=[],r=[];return e.forEach((t=>{if(""===t.trim())return;const e=t.length-t.trimLeft().length,i=t.trim();for(;r.length&&e<=r[r.length-1].indent;)r.pop();let s=null;/^-\s/.test(i)?s={type:"no_order",content:i.slice(2),children:[]}:/^(\d+\.)\s/.test(i)&&(s={type:"order",content:i.slice(RegExp.$1.length),children:[]}),s&&(r.length?r[r.length-1].item.children.push(s):n.push(s),r.push({indent:e,item:s}))})),n}(e);return c(n)}(r),{startIdx:e,result:r}}const L={lineNumber:!1,highlight:!1,xss:!0};function W(t,n){let r=n||L,i="";r=Object.assign(Object.assign({},L),r);let s=r.xss?(c=t,c.replace(/</g,"&lt;")).split("\n"):t.split("\n"),l=(null==s?void 0:s.length)||0;var c,x;for(let t=0;t<l;){if(f(s[t]))i+=y(s[t]);else if(p(s[t])){const{result:e,startIdx:n}=E(s,t,l,r);t=n,i+=e}else if(b(s[t])){const{result:e,startIdx:n}=T(s,t,l,r);t=n,i+=e}else if(g(s[t])){const{result:e,startIdx:n}=S(s,t,l,r);t=n,i+=e}else if(h(s[t]))i+=3!==(x=s[t]).length?x:"---"===x?"<hr/>":x,++t;else if(m(s[t])){const{result:e,startIdx:n}=I(s,t,l);t=n,i+=e}else if(u(s[t])||o(s[t])){const{result:e,startIdx:n}=w(s,t,l);t=n-1,i+=e}else if(a(s[t])){const{result:e,startIdx:n}=$(s,t,l,r);t=n,i+=e}else d(s[t].trim())?i+=O(s[t].trim()):(s[t]=s[t].trim())&&(i+=e(s[t]));t++}return i}t.markdownToHTML=W}));
