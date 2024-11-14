"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[890],{28747:function(e,t,n){function r(e){if(null==e)return window;if("[object Window]"!==e.toString()){var t=e.ownerDocument;return t&&t.defaultView||window}return e}function i(e){return e instanceof r(e).Element||e instanceof Element}function o(e){return e instanceof r(e).HTMLElement||e instanceof HTMLElement}function a(e){return"undefined"!==typeof ShadowRoot&&(e instanceof r(e).ShadowRoot||e instanceof ShadowRoot)}n.d(t,{n4:function(){return ve}});var s=Math.max,f=Math.min,c=Math.round;function u(){var e=navigator.userAgentData;return null!=e&&e.brands&&Array.isArray(e.brands)?e.brands.map((function(e){return e.brand+"/"+e.version})).join(" "):navigator.userAgent}function d(){return!/^((?!chrome|android).)*safari/i.test(u())}function l(e,t,n){void 0===t&&(t=!1),void 0===n&&(n=!1);var a=e.getBoundingClientRect(),s=1,f=1;t&&o(e)&&(s=e.offsetWidth>0&&c(a.width)/e.offsetWidth||1,f=e.offsetHeight>0&&c(a.height)/e.offsetHeight||1);var u=(i(e)?r(e):window).visualViewport,l=!d()&&n,p=(a.left+(l&&u?u.offsetLeft:0))/s,h=(a.top+(l&&u?u.offsetTop:0))/f,v=a.width/s,m=a.height/f;return{width:v,height:m,top:h,right:p+v,bottom:h+m,left:p,x:p,y:h}}function p(e){var t=r(e);return{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function h(e){return e?(e.nodeName||"").toLowerCase():null}function v(e){return((i(e)?e.ownerDocument:e.document)||window.document).documentElement}function m(e){return l(v(e)).left+p(e).scrollLeft}function g(e){return r(e).getComputedStyle(e)}function b(e){var t=g(e),n=t.overflow,r=t.overflowX,i=t.overflowY;return/auto|scroll|overlay|hidden/.test(n+i+r)}function y(e,t,n){void 0===n&&(n=!1);var i=o(t),a=o(t)&&function(e){var t=e.getBoundingClientRect(),n=c(t.width)/e.offsetWidth||1,r=c(t.height)/e.offsetHeight||1;return 1!==n||1!==r}(t),s=v(t),f=l(e,a,n),u={scrollLeft:0,scrollTop:0},d={x:0,y:0};return(i||!i&&!n)&&(("body"!==h(t)||b(s))&&(u=function(e){return e!==r(e)&&o(e)?{scrollLeft:(t=e).scrollLeft,scrollTop:t.scrollTop}:p(e);var t}(t)),o(t)?((d=l(t,!0)).x+=t.clientLeft,d.y+=t.clientTop):s&&(d.x=m(s))),{x:f.left+u.scrollLeft-d.x,y:f.top+u.scrollTop-d.y,width:f.width,height:f.height}}function x(e){var t=l(e),n=e.offsetWidth,r=e.offsetHeight;return Math.abs(t.width-n)<=1&&(n=t.width),Math.abs(t.height-r)<=1&&(r=t.height),{x:e.offsetLeft,y:e.offsetTop,width:n,height:r}}function O(e){return"html"===h(e)?e:e.assignedSlot||e.parentNode||(a(e)?e.host:null)||v(e)}function w(e){return["html","body","#document"].indexOf(h(e))>=0?e.ownerDocument.body:o(e)&&b(e)?e:w(O(e))}function E(e,t){var n;void 0===t&&(t=[]);var i=w(e),o=i===(null==(n=e.ownerDocument)?void 0:n.body),a=r(i),s=o?[a].concat(a.visualViewport||[],b(i)?i:[]):i,f=t.concat(s);return o?f:f.concat(E(O(s)))}function A(e){return["table","td","th"].indexOf(h(e))>=0}function N(e){return o(e)&&"fixed"!==g(e).position?e.offsetParent:null}function D(e){for(var t=r(e),n=N(e);n&&A(n)&&"static"===g(n).position;)n=N(n);return n&&("html"===h(n)||"body"===h(n)&&"static"===g(n).position)?t:n||function(e){var t=/firefox/i.test(u());if(/Trident/i.test(u())&&o(e)&&"fixed"===g(e).position)return null;var n=O(e);for(a(n)&&(n=n.host);o(n)&&["html","body"].indexOf(h(n))<0;){var r=g(n);if("none"!==r.transform||"none"!==r.perspective||"paint"===r.contain||-1!==["transform","perspective"].indexOf(r.willChange)||t&&"filter"===r.willChange||t&&r.filter&&"none"!==r.filter)return n;n=n.parentNode}return null}(e)||t}var j="top",I="bottom",M="right",C="left",k="auto",T=[j,I,M,C],P="start",H="end",L="viewport",S="popper",V=T.reduce((function(e,t){return e.concat([t+"-"+P,t+"-"+H])}),[]),B=[].concat(T,[k]).reduce((function(e,t){return e.concat([t,t+"-"+P,t+"-"+H])}),[]),R=["beforeRead","read","afterRead","beforeMain","main","afterMain","beforeWrite","write","afterWrite"];function _(e){var t=new Map,n=new Set,r=[];function i(e){n.add(e.name),[].concat(e.requires||[],e.requiresIfExists||[]).forEach((function(e){if(!n.has(e)){var r=t.get(e);r&&i(r)}})),r.push(e)}return e.forEach((function(e){t.set(e.name,e)})),e.forEach((function(e){n.has(e.name)||i(e)})),r}function W(e){var t;return function(){return t||(t=new Promise((function(n){Promise.resolve().then((function(){t=void 0,n(e())}))}))),t}}var z={placement:"bottom",modifiers:[],strategy:"absolute"};function q(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return!t.some((function(e){return!(e&&"function"===typeof e.getBoundingClientRect)}))}function U(e){void 0===e&&(e={});var t=e,n=t.defaultModifiers,r=void 0===n?[]:n,o=t.defaultOptions,a=void 0===o?z:o;return function(e,t,n){void 0===n&&(n=a);var o={placement:"bottom",orderedModifiers:[],options:Object.assign({},z,a),modifiersData:{},elements:{reference:e,popper:t},attributes:{},styles:{}},s=[],f=!1,c={state:o,setOptions:function(n){var f="function"===typeof n?n(o.options):n;u(),o.options=Object.assign({},a,o.options,f),o.scrollParents={reference:i(e)?E(e):e.contextElement?E(e.contextElement):[],popper:E(t)};var d=function(e){var t=_(e);return R.reduce((function(e,n){return e.concat(t.filter((function(e){return e.phase===n})))}),[])}(function(e){var t=e.reduce((function(e,t){var n=e[t.name];return e[t.name]=n?Object.assign({},n,t,{options:Object.assign({},n.options,t.options),data:Object.assign({},n.data,t.data)}):t,e}),{});return Object.keys(t).map((function(e){return t[e]}))}([].concat(r,o.options.modifiers)));return o.orderedModifiers=d.filter((function(e){return e.enabled})),o.orderedModifiers.forEach((function(e){var t=e.name,n=e.options,r=void 0===n?{}:n,i=e.effect;if("function"===typeof i){var a=i({state:o,name:t,instance:c,options:r}),f=function(){};s.push(a||f)}})),c.update()},forceUpdate:function(){if(!f){var e=o.elements,t=e.reference,n=e.popper;if(q(t,n)){o.rects={reference:y(t,D(n),"fixed"===o.options.strategy),popper:x(n)},o.reset=!1,o.placement=o.options.placement,o.orderedModifiers.forEach((function(e){return o.modifiersData[e.name]=Object.assign({},e.data)}));for(var r=0;r<o.orderedModifiers.length;r++)if(!0!==o.reset){var i=o.orderedModifiers[r],a=i.fn,s=i.options,u=void 0===s?{}:s,d=i.name;"function"===typeof a&&(o=a({state:o,options:u,name:d,instance:c})||o)}else o.reset=!1,r=-1}}},update:W((function(){return new Promise((function(e){c.forceUpdate(),e(o)}))})),destroy:function(){u(),f=!0}};if(!q(e,t))return c;function u(){s.forEach((function(e){return e()})),s=[]}return c.setOptions(n).then((function(e){!f&&n.onFirstUpdate&&n.onFirstUpdate(e)})),c}}var F={passive:!0};function G(e){return e.split("-")[0]}function X(e){return e.split("-")[1]}function Y(e){return["top","bottom"].indexOf(e)>=0?"x":"y"}function K(e){var t,n=e.reference,r=e.element,i=e.placement,o=i?G(i):null,a=i?X(i):null,s=n.x+n.width/2-r.width/2,f=n.y+n.height/2-r.height/2;switch(o){case j:t={x:s,y:n.y-r.height};break;case I:t={x:s,y:n.y+n.height};break;case M:t={x:n.x+n.width,y:f};break;case C:t={x:n.x-r.width,y:f};break;default:t={x:n.x,y:n.y}}var c=o?Y(o):null;if(null!=c){var u="y"===c?"height":"width";switch(a){case P:t[c]=t[c]-(n[u]/2-r[u]/2);break;case H:t[c]=t[c]+(n[u]/2-r[u]/2)}}return t}var $={top:"auto",right:"auto",bottom:"auto",left:"auto"};function J(e){var t,n=e.popper,i=e.popperRect,o=e.placement,a=e.variation,s=e.offsets,f=e.position,u=e.gpuAcceleration,d=e.adaptive,l=e.roundOffsets,p=e.isFixed,h=s.x,m=void 0===h?0:h,b=s.y,y=void 0===b?0:b,x="function"===typeof l?l({x:m,y:y}):{x:m,y:y};m=x.x,y=x.y;var O=s.hasOwnProperty("x"),w=s.hasOwnProperty("y"),E=C,A=j,N=window;if(d){var k=D(n),T="clientHeight",P="clientWidth";if(k===r(n)&&"static"!==g(k=v(n)).position&&"absolute"===f&&(T="scrollHeight",P="scrollWidth"),o===j||(o===C||o===M)&&a===H)A=I,y-=(p&&k===N&&N.visualViewport?N.visualViewport.height:k[T])-i.height,y*=u?1:-1;if(o===C||(o===j||o===I)&&a===H)E=M,m-=(p&&k===N&&N.visualViewport?N.visualViewport.width:k[P])-i.width,m*=u?1:-1}var L,S=Object.assign({position:f},d&&$),V=!0===l?function(e,t){var n=e.x,r=e.y,i=t.devicePixelRatio||1;return{x:c(n*i)/i||0,y:c(r*i)/i||0}}({x:m,y:y},r(n)):{x:m,y:y};return m=V.x,y=V.y,u?Object.assign({},S,((L={})[A]=w?"0":"",L[E]=O?"0":"",L.transform=(N.devicePixelRatio||1)<=1?"translate("+m+"px, "+y+"px)":"translate3d("+m+"px, "+y+"px, 0)",L)):Object.assign({},S,((t={})[A]=w?y+"px":"",t[E]=O?m+"px":"",t.transform="",t))}var Q={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(e){var t=e.state,n=e.options,r=e.name,i=n.offset,o=void 0===i?[0,0]:i,a=B.reduce((function(e,n){return e[n]=function(e,t,n){var r=G(e),i=[C,j].indexOf(r)>=0?-1:1,o="function"===typeof n?n(Object.assign({},t,{placement:e})):n,a=o[0],s=o[1];return a=a||0,s=(s||0)*i,[C,M].indexOf(r)>=0?{x:s,y:a}:{x:a,y:s}}(n,t.rects,o),e}),{}),s=a[t.placement],f=s.x,c=s.y;null!=t.modifiersData.popperOffsets&&(t.modifiersData.popperOffsets.x+=f,t.modifiersData.popperOffsets.y+=c),t.modifiersData[r]=a}},Z={left:"right",right:"left",bottom:"top",top:"bottom"};function ee(e){return e.replace(/left|right|bottom|top/g,(function(e){return Z[e]}))}var te={start:"end",end:"start"};function ne(e){return e.replace(/start|end/g,(function(e){return te[e]}))}function re(e,t){var n=t.getRootNode&&t.getRootNode();if(e.contains(t))return!0;if(n&&a(n)){var r=t;do{if(r&&e.isSameNode(r))return!0;r=r.parentNode||r.host}while(r)}return!1}function ie(e){return Object.assign({},e,{left:e.x,top:e.y,right:e.x+e.width,bottom:e.y+e.height})}function oe(e,t,n){return t===L?ie(function(e,t){var n=r(e),i=v(e),o=n.visualViewport,a=i.clientWidth,s=i.clientHeight,f=0,c=0;if(o){a=o.width,s=o.height;var u=d();(u||!u&&"fixed"===t)&&(f=o.offsetLeft,c=o.offsetTop)}return{width:a,height:s,x:f+m(e),y:c}}(e,n)):i(t)?function(e,t){var n=l(e,!1,"fixed"===t);return n.top=n.top+e.clientTop,n.left=n.left+e.clientLeft,n.bottom=n.top+e.clientHeight,n.right=n.left+e.clientWidth,n.width=e.clientWidth,n.height=e.clientHeight,n.x=n.left,n.y=n.top,n}(t,n):ie(function(e){var t,n=v(e),r=p(e),i=null==(t=e.ownerDocument)?void 0:t.body,o=s(n.scrollWidth,n.clientWidth,i?i.scrollWidth:0,i?i.clientWidth:0),a=s(n.scrollHeight,n.clientHeight,i?i.scrollHeight:0,i?i.clientHeight:0),f=-r.scrollLeft+m(e),c=-r.scrollTop;return"rtl"===g(i||n).direction&&(f+=s(n.clientWidth,i?i.clientWidth:0)-o),{width:o,height:a,x:f,y:c}}(v(e)))}function ae(e,t,n,r){var a="clippingParents"===t?function(e){var t=E(O(e)),n=["absolute","fixed"].indexOf(g(e).position)>=0&&o(e)?D(e):e;return i(n)?t.filter((function(e){return i(e)&&re(e,n)&&"body"!==h(e)})):[]}(e):[].concat(t),c=[].concat(a,[n]),u=c[0],d=c.reduce((function(t,n){var i=oe(e,n,r);return t.top=s(i.top,t.top),t.right=f(i.right,t.right),t.bottom=f(i.bottom,t.bottom),t.left=s(i.left,t.left),t}),oe(e,u,r));return d.width=d.right-d.left,d.height=d.bottom-d.top,d.x=d.left,d.y=d.top,d}function se(e){return Object.assign({},{top:0,right:0,bottom:0,left:0},e)}function fe(e,t){return t.reduce((function(t,n){return t[n]=e,t}),{})}function ce(e,t){void 0===t&&(t={});var n=t,r=n.placement,o=void 0===r?e.placement:r,a=n.strategy,s=void 0===a?e.strategy:a,f=n.boundary,c=void 0===f?"clippingParents":f,u=n.rootBoundary,d=void 0===u?L:u,p=n.elementContext,h=void 0===p?S:p,m=n.altBoundary,g=void 0!==m&&m,b=n.padding,y=void 0===b?0:b,x=se("number"!==typeof y?y:fe(y,T)),O=h===S?"reference":S,w=e.rects.popper,E=e.elements[g?O:h],A=ae(i(E)?E:E.contextElement||v(e.elements.popper),c,d,s),N=l(e.elements.reference),D=K({reference:N,element:w,strategy:"absolute",placement:o}),C=ie(Object.assign({},w,D)),k=h===S?C:N,P={top:A.top-k.top+x.top,bottom:k.bottom-A.bottom+x.bottom,left:A.left-k.left+x.left,right:k.right-A.right+x.right},H=e.modifiersData.offset;if(h===S&&H){var V=H[o];Object.keys(P).forEach((function(e){var t=[M,I].indexOf(e)>=0?1:-1,n=[j,I].indexOf(e)>=0?"y":"x";P[e]+=V[n]*t}))}return P}function ue(e,t,n){return s(e,f(t,n))}var de={name:"preventOverflow",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name,i=n.mainAxis,o=void 0===i||i,a=n.altAxis,c=void 0!==a&&a,u=n.boundary,d=n.rootBoundary,l=n.altBoundary,p=n.padding,h=n.tether,v=void 0===h||h,m=n.tetherOffset,g=void 0===m?0:m,b=ce(t,{boundary:u,rootBoundary:d,padding:p,altBoundary:l}),y=G(t.placement),O=X(t.placement),w=!O,E=Y(y),A="x"===E?"y":"x",N=t.modifiersData.popperOffsets,k=t.rects.reference,T=t.rects.popper,H="function"===typeof g?g(Object.assign({},t.rects,{placement:t.placement})):g,L="number"===typeof H?{mainAxis:H,altAxis:H}:Object.assign({mainAxis:0,altAxis:0},H),S=t.modifiersData.offset?t.modifiersData.offset[t.placement]:null,V={x:0,y:0};if(N){if(o){var B,R="y"===E?j:C,_="y"===E?I:M,W="y"===E?"height":"width",z=N[E],q=z+b[R],U=z-b[_],F=v?-T[W]/2:0,K=O===P?k[W]:T[W],$=O===P?-T[W]:-k[W],J=t.elements.arrow,Q=v&&J?x(J):{width:0,height:0},Z=t.modifiersData["arrow#persistent"]?t.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},ee=Z[R],te=Z[_],ne=ue(0,k[W],Q[W]),re=w?k[W]/2-F-ne-ee-L.mainAxis:K-ne-ee-L.mainAxis,ie=w?-k[W]/2+F+ne+te+L.mainAxis:$+ne+te+L.mainAxis,oe=t.elements.arrow&&D(t.elements.arrow),ae=oe?"y"===E?oe.clientTop||0:oe.clientLeft||0:0,se=null!=(B=null==S?void 0:S[E])?B:0,fe=z+ie-se,de=ue(v?f(q,z+re-se-ae):q,z,v?s(U,fe):U);N[E]=de,V[E]=de-z}if(c){var le,pe="x"===E?j:C,he="x"===E?I:M,ve=N[A],me="y"===A?"height":"width",ge=ve+b[pe],be=ve-b[he],ye=-1!==[j,C].indexOf(y),xe=null!=(le=null==S?void 0:S[A])?le:0,Oe=ye?ge:ve-k[me]-T[me]-xe+L.altAxis,we=ye?ve+k[me]+T[me]-xe-L.altAxis:be,Ee=v&&ye?function(e,t,n){var r=ue(e,t,n);return r>n?n:r}(Oe,ve,we):ue(v?Oe:ge,ve,v?we:be);N[A]=Ee,V[A]=Ee-ve}t.modifiersData[r]=V}},requiresIfExists:["offset"]};var le={name:"arrow",enabled:!0,phase:"main",fn:function(e){var t,n=e.state,r=e.name,i=e.options,o=n.elements.arrow,a=n.modifiersData.popperOffsets,s=G(n.placement),f=Y(s),c=[C,M].indexOf(s)>=0?"height":"width";if(o&&a){var u=function(e,t){return se("number"!==typeof(e="function"===typeof e?e(Object.assign({},t.rects,{placement:t.placement})):e)?e:fe(e,T))}(i.padding,n),d=x(o),l="y"===f?j:C,p="y"===f?I:M,h=n.rects.reference[c]+n.rects.reference[f]-a[f]-n.rects.popper[c],v=a[f]-n.rects.reference[f],m=D(o),g=m?"y"===f?m.clientHeight||0:m.clientWidth||0:0,b=h/2-v/2,y=u[l],O=g-d[c]-u[p],w=g/2-d[c]/2+b,E=ue(y,w,O),A=f;n.modifiersData[r]=((t={})[A]=E,t.centerOffset=E-w,t)}},effect:function(e){var t=e.state,n=e.options.element,r=void 0===n?"[data-popper-arrow]":n;null!=r&&("string"!==typeof r||(r=t.elements.popper.querySelector(r)))&&re(t.elements.popper,r)&&(t.elements.arrow=r)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function pe(e,t,n){return void 0===n&&(n={x:0,y:0}),{top:e.top-t.height-n.y,right:e.right-t.width+n.x,bottom:e.bottom-t.height+n.y,left:e.left-t.width-n.x}}function he(e){return[j,M,I,C].some((function(t){return e[t]>=0}))}var ve=U({defaultModifiers:[{name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(e){var t=e.state,n=e.instance,i=e.options,o=i.scroll,a=void 0===o||o,s=i.resize,f=void 0===s||s,c=r(t.elements.popper),u=[].concat(t.scrollParents.reference,t.scrollParents.popper);return a&&u.forEach((function(e){e.addEventListener("scroll",n.update,F)})),f&&c.addEventListener("resize",n.update,F),function(){a&&u.forEach((function(e){e.removeEventListener("scroll",n.update,F)})),f&&c.removeEventListener("resize",n.update,F)}},data:{}},{name:"popperOffsets",enabled:!0,phase:"read",fn:function(e){var t=e.state,n=e.name;t.modifiersData[n]=K({reference:t.rects.reference,element:t.rects.popper,strategy:"absolute",placement:t.placement})},data:{}},{name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(e){var t=e.state,n=e.options,r=n.gpuAcceleration,i=void 0===r||r,o=n.adaptive,a=void 0===o||o,s=n.roundOffsets,f=void 0===s||s,c={placement:G(t.placement),variation:X(t.placement),popper:t.elements.popper,popperRect:t.rects.popper,gpuAcceleration:i,isFixed:"fixed"===t.options.strategy};null!=t.modifiersData.popperOffsets&&(t.styles.popper=Object.assign({},t.styles.popper,J(Object.assign({},c,{offsets:t.modifiersData.popperOffsets,position:t.options.strategy,adaptive:a,roundOffsets:f})))),null!=t.modifiersData.arrow&&(t.styles.arrow=Object.assign({},t.styles.arrow,J(Object.assign({},c,{offsets:t.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:f})))),t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-placement":t.placement})},data:{}},{name:"applyStyles",enabled:!0,phase:"write",fn:function(e){var t=e.state;Object.keys(t.elements).forEach((function(e){var n=t.styles[e]||{},r=t.attributes[e]||{},i=t.elements[e];o(i)&&h(i)&&(Object.assign(i.style,n),Object.keys(r).forEach((function(e){var t=r[e];!1===t?i.removeAttribute(e):i.setAttribute(e,!0===t?"":t)})))}))},effect:function(e){var t=e.state,n={popper:{position:t.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(t.elements.popper.style,n.popper),t.styles=n,t.elements.arrow&&Object.assign(t.elements.arrow.style,n.arrow),function(){Object.keys(t.elements).forEach((function(e){var r=t.elements[e],i=t.attributes[e]||{},a=Object.keys(t.styles.hasOwnProperty(e)?t.styles[e]:n[e]).reduce((function(e,t){return e[t]="",e}),{});o(r)&&h(r)&&(Object.assign(r.style,a),Object.keys(i).forEach((function(e){r.removeAttribute(e)})))}))}},requires:["computeStyles"]},Q,{name:"flip",enabled:!0,phase:"main",fn:function(e){var t=e.state,n=e.options,r=e.name;if(!t.modifiersData[r]._skip){for(var i=n.mainAxis,o=void 0===i||i,a=n.altAxis,s=void 0===a||a,f=n.fallbackPlacements,c=n.padding,u=n.boundary,d=n.rootBoundary,l=n.altBoundary,p=n.flipVariations,h=void 0===p||p,v=n.allowedAutoPlacements,m=t.options.placement,g=G(m),b=f||(g===m||!h?[ee(m)]:function(e){if(G(e)===k)return[];var t=ee(e);return[ne(e),t,ne(t)]}(m)),y=[m].concat(b).reduce((function(e,n){return e.concat(G(n)===k?function(e,t){void 0===t&&(t={});var n=t,r=n.placement,i=n.boundary,o=n.rootBoundary,a=n.padding,s=n.flipVariations,f=n.allowedAutoPlacements,c=void 0===f?B:f,u=X(r),d=u?s?V:V.filter((function(e){return X(e)===u})):T,l=d.filter((function(e){return c.indexOf(e)>=0}));0===l.length&&(l=d);var p=l.reduce((function(t,n){return t[n]=ce(e,{placement:n,boundary:i,rootBoundary:o,padding:a})[G(n)],t}),{});return Object.keys(p).sort((function(e,t){return p[e]-p[t]}))}(t,{placement:n,boundary:u,rootBoundary:d,padding:c,flipVariations:h,allowedAutoPlacements:v}):n)}),[]),x=t.rects.reference,O=t.rects.popper,w=new Map,E=!0,A=y[0],N=0;N<y.length;N++){var D=y[N],H=G(D),L=X(D)===P,S=[j,I].indexOf(H)>=0,R=S?"width":"height",_=ce(t,{placement:D,boundary:u,rootBoundary:d,altBoundary:l,padding:c}),W=S?L?M:C:L?I:j;x[R]>O[R]&&(W=ee(W));var z=ee(W),q=[];if(o&&q.push(_[H]<=0),s&&q.push(_[W]<=0,_[z]<=0),q.every((function(e){return e}))){A=D,E=!1;break}w.set(D,q)}if(E)for(var U=function(e){var t=y.find((function(t){var n=w.get(t);if(n)return n.slice(0,e).every((function(e){return e}))}));if(t)return A=t,"break"},F=h?3:1;F>0;F--){if("break"===U(F))break}t.placement!==A&&(t.modifiersData[r]._skip=!0,t.placement=A,t.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}},de,le,{name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(e){var t=e.state,n=e.name,r=t.rects.reference,i=t.rects.popper,o=t.modifiersData.preventOverflow,a=ce(t,{elementContext:"reference"}),s=ce(t,{altBoundary:!0}),f=pe(a,r),c=pe(s,i,o),u=he(f),d=he(c);t.modifiersData[n]={referenceClippingOffsets:f,popperEscapeOffsets:c,isReferenceHidden:u,hasPopperEscaped:d},t.attributes.popper=Object.assign({},t.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":d})}}]})},17212:function(e,t,n){n.d(t,{i:function(){return a}});var r=n(5544),i=n(65043),o=n(80940);function a(e){var t=e.value,n=e.defaultValue,a=e.onChange,s=e.shouldUpdate,f=void 0===s?function(e,t){return e!==t}:s,c=(0,o.c)(a),u=(0,o.c)(f),d=(0,i.useState)(n),l=(0,r.A)(d,2),p=l[0],h=l[1],v=void 0!==t,m=v?t:p,g=(0,o.c)((function(e){var t="function"===typeof e?e(m):e;u(m,t)&&(v||h(t),c(t))}),[v,c,m,u]);return[m,g]}},96870:function(e,t,n){n.d(t,{j:function(){return s}});var r=n(89379),i=n(5544),o=n(80940),a=n(65043);function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.onClose,n=e.onOpen,s=e.isOpen,f=e.id,c=(0,o.c)(n),u=(0,o.c)(t),d=(0,a.useState)(e.defaultIsOpen||!1),l=(0,i.A)(d,2),p=l[0],h=l[1],v=void 0!==s?s:p,m=void 0!==s,g=(0,a.useId)(),b=null!==f&&void 0!==f?f:"disclosure-".concat(g),y=(0,a.useCallback)((function(){m||h(!1),null===u||void 0===u||u()}),[m,u]),x=(0,a.useCallback)((function(){m||h(!0),null===c||void 0===c||c()}),[m,c]),O=(0,a.useCallback)((function(){v?y():x()}),[v,x,y]);return{isOpen:v,onOpen:x,onClose:y,onToggle:O,isControlled:m,getButtonProps:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.A)((0,r.A)({},e),{},{"aria-expanded":v,"aria-controls":b,onClick:function(t){var n;null===(n=e.onClick)||void 0===n||n.call(e,t),O()}})},getDisclosureProps:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(0,r.A)((0,r.A)({},e),{},{hidden:!v,id:b})}}}},45049:function(e,t,n){function r(e){var t=Object.assign({},e);for(var n in t)void 0===t[n]&&delete t[n];return t}n.d(t,{o:function(){return r}})},42703:function(e,t,n){n.d(t,{K:function(){return u}});var r=n(89379),i=n(80045),o=n(70579),a=n(65043),s=n(29301),f=n(55003),c=["icon","children","isRound","aria-label"],u=(0,f.R)((function(e,t){var n=e.icon,f=e.children,u=e.isRound,d=e["aria-label"],l=(0,i.A)(e,c),p=n||f,h=(0,a.isValidElement)(p)?(0,a.cloneElement)(p,{"aria-hidden":!0,focusable:!1}):null;return(0,o.jsx)(s.$,(0,r.A)((0,r.A)({px:"0",py:"0",borderRadius:u?"full":void 0,ref:t,"aria-label":d},l),{},{children:h}))}));u.displayName="IconButton"},32315:function(e,t,n){n.d(t,{D:function(){return b}});var r=n(5544),i=n(43194),o=n(86417),a=n(65043),s=n(89379),f=n(92901),c=n(23029);function u(e){return e.sort((function(e,t){var n=e.compareDocumentPosition(t);if(n&Node.DOCUMENT_POSITION_FOLLOWING||n&Node.DOCUMENT_POSITION_CONTAINED_BY)return-1;if(n&Node.DOCUMENT_POSITION_PRECEDING||n&Node.DOCUMENT_POSITION_CONTAINS)return 1;if(n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC)throw Error("Cannot sort the given nodes.");return 0}))}function d(e,t,n){var r=e+1;return n&&r>=t&&(r=0),r}function l(e,t,n){var r=e-1;return n&&r<0&&(r=t),r}var p="undefined"!==typeof window?a.useLayoutEffect:a.useEffect,h=function(e){return e},v=Object.defineProperty,m=function(e,t,n){return function(e,t,n){t in e?v(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n}(e,"symbol"!==typeof t?t+"":t,n),n},g=(0,f.A)((function e(){var t=this;(0,c.A)(this,e),m(this,"descendants",new Map),m(this,"register",(function(e){var n;if(null!=e)return"object"==typeof(n=e)&&"nodeType"in n&&n.nodeType===Node.ELEMENT_NODE?t.registerNode(e):function(n){t.registerNode(n,e)}})),m(this,"unregister",(function(e){t.descendants.delete(e);var n=u(Array.from(t.descendants.keys()));t.assignIndex(n)})),m(this,"destroy",(function(){t.descendants.clear()})),m(this,"assignIndex",(function(e){t.descendants.forEach((function(t){var n=e.indexOf(t.node);t.index=n,t.node.dataset.index=t.index.toString()}))})),m(this,"count",(function(){return t.descendants.size})),m(this,"enabledCount",(function(){return t.enabledValues().length})),m(this,"values",(function(){return Array.from(t.descendants.values()).sort((function(e,t){return e.index-t.index}))})),m(this,"enabledValues",(function(){return t.values().filter((function(e){return!e.disabled}))})),m(this,"item",(function(e){if(0!==t.count())return t.values()[e]})),m(this,"enabledItem",(function(e){if(0!==t.enabledCount())return t.enabledValues()[e]})),m(this,"first",(function(){return t.item(0)})),m(this,"firstEnabled",(function(){return t.enabledItem(0)})),m(this,"last",(function(){return t.item(t.descendants.size-1)})),m(this,"lastEnabled",(function(){var e=t.enabledValues().length-1;return t.enabledItem(e)})),m(this,"indexOf",(function(e){var n,r;return e&&null!==(n=null===(r=t.descendants.get(e))||void 0===r?void 0:r.index)&&void 0!==n?n:-1})),m(this,"enabledIndexOf",(function(e){return null==e?-1:t.enabledValues().findIndex((function(t){return t.node.isSameNode(e)}))})),m(this,"next",(function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=d(e,t.count(),n);return t.item(r)})),m(this,"nextEnabled",(function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=t.item(e);if(r){var i=d(t.enabledIndexOf(r.node),t.enabledCount(),n);return t.enabledItem(i)}})),m(this,"prev",(function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=l(e,t.count()-1,n);return t.item(r)})),m(this,"prevEnabled",(function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],r=t.item(e);if(r){var i=l(t.enabledIndexOf(r.node),t.enabledCount()-1,n);return t.enabledItem(i)}})),m(this,"registerNode",(function(e,n){if(e&&!t.descendants.has(e)){var r=u(Array.from(t.descendants.keys()).concat(e));null!==n&&void 0!==n&&n.disabled&&(n.disabled=!!n.disabled);var i=(0,s.A)({node:e,index:-1},n);t.descendants.set(e,i),t.assignIndex(r)}}))}));function b(){var e=(0,o.q)({name:"DescendantsProvider",errorMessage:"useDescendantsContext must be used within DescendantsProvider"}),t=(0,r.A)(e,2),n=t[0],s=t[1];return[n,s,function(){var e=(0,a.useRef)(new g);return p((function(){return function(){return e.current.destroy()}})),e.current},function(e){var t=s(),n=(0,a.useState)(-1),o=(0,r.A)(n,2),f=o[0],c=o[1],u=(0,a.useRef)(null);p((function(){return function(){u.current&&t.unregister(u.current)}}),[]),p((function(){if(u.current){var e=Number(u.current.dataset.index);f==e||Number.isNaN(e)||c(e)}}));var d=h(e?t.register(e):t.register);return{descendants:t,index:f,enabledIndex:t.enabledIndexOf(u.current),register:(0,i.Px)(d,u)}}]}},56529:function(e,t,n){n.d(t,{j:function(){return l}});var r=n(89379),i=n(80045),o=n(70579),a=n(43130),s=n(64765),f=n(73203),c=n(55003),u=n(15334),d=["className"],l=(0,c.R)((function(e,t){var n=e.className,c=(0,i.A)(e,d),l=(0,s.cx)("chakra-modal__footer",n),p=(0,f.x5)(),h=(0,a.H2)((0,r.A)({display:"flex",alignItems:"center",justifyContent:"flex-end"},p.footer));return(0,o.jsx)(u.B.footer,(0,r.A)((0,r.A)({ref:t},c),{},{__css:h,className:l}))}));l.displayName="ModalFooter"},6720:function(e,t,n){n.d(t,{Fjv:function(){return i},Md6:function(){return o},X5G:function(){return a}});var r=n(13441);function i(e){return(0,r.k5)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0V0z"},child:[]},{tag:"path",attr:{d:"M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z"},child:[]}]})(e)}function o(e){return(0,r.k5)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0V0z"},child:[]},{tag:"path",attr:{d:"M21 6h-7.59l3.29-3.29L16 2l-4 4-4-4-.71.71L10.59 6H3a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8a2 2 0 0 0-2-2zm0 14H3V8h18v12zM9 10v8l7-4z"},child:[]}]})(e)}function a(e){return(0,r.k5)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",d:"M0 0h24v24H0z"},child:[]},{tag:"path",attr:{d:"M20 16H4V4h10.1a5 5 0 0 1 0-2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V6.98c-.58.44-1.26.77-2 .92V16z"},child:[]},{tag:"circle",attr:{cx:"19",cy:"3",r:"3"},child:[]},{tag:"path",attr:{d:"M6 12h8v2H6zM6 9h12v2H6zM6 8h12v-.1A5.013 5.013 0 0 1 15.03 6H6v2z"},child:[]}]})(e)}}}]);
//# sourceMappingURL=890.4b627f1b.chunk.js.map