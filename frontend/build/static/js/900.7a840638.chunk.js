"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[900],{1900:(e,n,r)=>{r.r(n),r.d(n,{default:()=>d});var t=r(1918),a=r(5522),i=r(1377),s=r(3952),o=r(8028),l=(r(5043),r(3216)),c=r(579);const d=()=>{const e=(0,l.Zp)();return(0,c.jsx)(t.s,{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",children:(0,c.jsxs)(a.az,{display:"flex",flexDirection:"column",justifyContent:"space-between",alignItems:"center",backgroundColor:"Background",padding:8,width:"98%",children:[(0,c.jsx)(i._,{src:"https://res.cloudinary.com/dvc7i8g1a/image/upload/v1696073349/icons8-not-found-64_rxa6yk.png",loading:"lazy",alt:"Not Found"}),(0,c.jsx)(s.E,{fontSize:"2xl",children:"404 - Page Not Found"}),(0,c.jsxs)(s.E,{textAlign:"center",children:[" ","The page you are looking for does not exist."]}),(0,c.jsx)(o.$,{margin:3,backgroundColor:"green.400",onClick:()=>e("/dashboard"),children:"Return back to my programs."})]})})}},8028:(e,n,r)=>{r.d(n,{$:()=>x});var t=r(5043);var a=r(7852),[i,s]=(0,a.q)({strict:!1,name:"ButtonGroupContext"}),o=r(4550),l=r(9254),c=r(579);function d(e){const{children:n,className:r,...a}=e,i=(0,t.isValidElement)(n)?(0,t.cloneElement)(n,{"aria-hidden":!0,focusable:!1}):n,s=(0,l.cx)("chakra-button__icon",r);return(0,c.jsx)(o.B.span,{display:"inline-flex",alignSelf:"center",flexShrink:0,...a,className:s,children:i})}d.displayName="ButtonIcon";var u=r(3224);function f(e){const{label:n,placement:r,spacing:a="0.5rem",children:i=(0,c.jsx)(u.y,{color:"currentColor",width:"1em",height:"1em"}),className:s,__css:d,...f}=e,g=(0,l.cx)("chakra-button__spinner",s),m="start"===r?"marginEnd":"marginStart",h=(0,t.useMemo)((()=>({display:"flex",alignItems:"center",position:n?"relative":"absolute",[m]:n?a:0,fontSize:"1em",lineHeight:"normal",...d})),[d,n,m,a]);return(0,c.jsx)(o.B.div,{className:g,...f,__css:h,children:i})}f.displayName="ButtonSpinner";var g=r(4554),m=r(3226),h=r(3761),p=r(6254),x=(0,m.R)(((e,n)=>{const r=s(),a=(0,h.Vl)("Button",{...r,...e}),{isDisabled:i=(null==r?void 0:r.isDisabled),isLoading:d,isActive:u,children:m,leftIcon:x,rightIcon:y,loadingText:v,iconSpacing:j="0.5rem",type:k,spinner:_,spinnerPlacement:N="start",className:S,as:w,...E}=(0,p.MN)(e),I=(0,t.useMemo)((()=>{const e={...null==a?void 0:a._focus,zIndex:1};return{display:"inline-flex",appearance:"none",alignItems:"center",justifyContent:"center",userSelect:"none",position:"relative",whiteSpace:"nowrap",verticalAlign:"middle",outline:"none",...a,...!!r&&{_focus:e}}}),[a,r]),{ref:B,type:C}=function(e){const[n,r]=(0,t.useState)(!e);return{ref:(0,t.useCallback)((e=>{e&&r("BUTTON"===e.tagName)}),[]),type:n?"button":void 0}}(w),O={rightIcon:y,leftIcon:x,iconSpacing:j,children:m};return(0,c.jsxs)(o.B.button,{ref:(0,g.SV)(n,B),as:w,type:null!=k?k:C,"data-active":(0,l.sE)(u),"data-loading":(0,l.sE)(d),__css:I,className:(0,l.cx)("chakra-button",S),...E,disabled:i||d,children:[d&&"start"===N&&(0,c.jsx)(f,{className:"chakra-button__spinner--start",label:v,placement:"start",spacing:j,children:_}),d?v||(0,c.jsx)(o.B.span,{opacity:0,children:(0,c.jsx)(b,{...O})}):(0,c.jsx)(b,{...O}),d&&"end"===N&&(0,c.jsx)(f,{className:"chakra-button__spinner--end",label:v,placement:"end",spacing:j,children:_})]})}));function b(e){const{leftIcon:n,rightIcon:r,children:t,iconSpacing:a}=e;return(0,c.jsxs)(c.Fragment,{children:[n&&(0,c.jsx)(d,{marginEnd:a,children:n}),t,r&&(0,c.jsx)(d,{marginStart:a,children:r})]})}x.displayName="Button"},1377:(e,n,r)=>{r.d(n,{_:()=>c});var t=r(3226),a=r(579),i=(0,t.R)((function(e,n){const{htmlWidth:r,htmlHeight:t,alt:i,...s}=e;return(0,a.jsx)("img",{width:r,height:t,ref:n,alt:i,...s})}));i.displayName="NativeImage";var s=r(6615),o=r(4550);function l(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];const r=Object.assign({},e);for(const t of n)t in r&&delete r[t];return r}var c=(0,t.R)((function(e,n){const{fallbackSrc:r,fallback:t,src:c,srcSet:d,align:u,fit:f,loading:g,ignoreFallback:m,crossOrigin:h,fallbackStrategy:p="beforeLoadOrError",referrerPolicy:x,...b}=e,y=null!=g||m||!(void 0!==r||void 0!==t),v=(0,s.l)({...e,crossOrigin:h,ignoreFallback:y}),j=(0,s.m)(v,p),k={ref:n,objectFit:f,objectPosition:u,...y?b:l(b,["onError","onLoad"])};return j?t||(0,a.jsx)(o.B.img,{as:i,className:"chakra-image__placeholder",src:r,...k}):(0,a.jsx)(o.B.img,{as:i,src:c,srcSet:d,crossOrigin:h,loading:g,referrerPolicy:x,className:"chakra-image",...k})}));c.displayName="Image"},6615:(e,n,r)=>{r.d(n,{l:()=>i,m:()=>s});var t=r(5739),a=r(5043);function i(e){const{loading:n,src:r,srcSet:i,onLoad:s,onError:o,crossOrigin:l,sizes:c,ignoreFallback:d}=e,[u,f]=(0,a.useState)("pending");(0,a.useEffect)((()=>{f(r?"loading":"pending")}),[r]);const g=(0,a.useRef)(),m=(0,a.useCallback)((()=>{if(!r)return;h();const e=new Image;e.src=r,l&&(e.crossOrigin=l),i&&(e.srcset=i),c&&(e.sizes=c),n&&(e.loading=n),e.onload=e=>{h(),f("loaded"),null==s||s(e)},e.onerror=e=>{h(),f("failed"),null==o||o(e)},g.current=e}),[r,l,i,c,s,o,n]),h=()=>{g.current&&(g.current.onload=null,g.current.onerror=null,g.current=null)};return(0,t.U)((()=>{if(!d)return"loading"===u&&m(),()=>{h()}}),[u,m,d]),d?"loaded":u}var s=(e,n)=>"loaded"!==e&&"beforeLoadOrError"===n||"failed"===e&&"onError"===n},1918:(e,n,r)=>{r.d(n,{s:()=>s});var t=r(3226),a=r(4550),i=r(579),s=(0,t.R)((function(e,n){const{direction:r,align:t,justify:s,wrap:o,basis:l,grow:c,shrink:d,...u}=e,f={display:"flex",flexDirection:r,alignItems:t,justifyContent:s,flexWrap:o,flexBasis:l,flexGrow:c,flexShrink:d};return(0,i.jsx)(a.B.div,{ref:n,__css:f,...u})}));s.displayName="Flex"},4554:(e,n,r)=>{r.d(n,{Px:()=>a,SV:()=>i});var t=r(5043);function a(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return e=>{n.forEach((n=>{!function(e,n){if(null!=e)if("function"!==typeof e)try{e.current=n}catch(r){throw new Error("Cannot assign value '".concat(n,"' to ref '").concat(e,"'"))}else e(n)}(n,e)}))}}function i(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return(0,t.useMemo)((()=>a(...n)),n)}}}]);
//# sourceMappingURL=900.7a840638.chunk.js.map