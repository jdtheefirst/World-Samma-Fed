"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[953],{21953:function(e,n,t){t.r(n),t.d(n,{default:function(){return I}});var r=t(90675),i=t(10467),a=t(5544),l=t(93748),s=t(30834),o=t(85522),d=t(3952),u=t(17921),c=t(93461),p=t(24776),h=t(63452),f=t(53974),m=t(38028),v=t(38700),x=t(65043),g=t(56818),A=t(79722),b=t(73216),y=t(70579);function I(){var e=(0,g.a)(),n=e.verify,t=e.recoverEmail,I=e.setUser,j=(0,x.useState)(),N=(0,a.A)(j,2),R=N[0],k=N[1],w=(0,x.useState)(),C=(0,a.A)(w,2),E=C[0],q=C[1],_=(0,x.useState)(!1),S=(0,a.A)(_,2),F=S[0],P=S[1],z=function(){return P(!F)},T=(0,x.useState)(),B=(0,a.A)(T,2),M=B[0],O=B[1],H=(0,x.useState)(!1),L=(0,a.A)(H,2),D=L[0],U=L[1],G=(0,l.d)(),J=(0,b.Zp)(),Z=function(){var e=(0,i.A)((0,r.A)().mark((function e(){var i,a,l;return(0,r.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(U(!0),R&&E){e.next=5;break}return G({title:"Please Fill all the Feilds",status:"warning",duration:5e3,isClosable:!0,position:"bottom"}),U(!1),e.abrupt("return");case 5:if(n===M){e.next=9;break}return G({title:"Please enter the correct code sent to ".concat(t),status:"info",duration:5e3,isClosable:!0,position:"bottom"}),U(!1),e.abrupt("return");case 9:return e.prev=9,i={headers:{"Content-type":"Application/json"}},e.next=13,A.A.post("/api/user/emailrecovery/".concat(t),{password:R},i);case 13:a=e.sent,l=a.data,I(l),localStorage.setItem("userInfo",JSON.stringify(l)),J("/dashboard"),U(!1),e.next=26;break;case 21:e.prev=21,e.t0=e.catch(9),console.log(e.t0),G({title:"Error occurred trying to update your password",description:"Try again after some time",status:"error",duration:5e3,position:"bottom"}),U(!1);case 26:case"end":return e.stop()}}),e,null,[[9,21]])})));return function(){return e.apply(this,arguments)}}();return(0,y.jsxs)(s.T,{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",children:[(0,y.jsxs)(o.az,{padding:5,backgroundColor:"Background",justifyContent:"space-between",border:"1px solid purple",mt:"6",children:[" ",(0,y.jsx)(d.E,{padding:4,textAlign:"center",fontSize:"2xl",children:"Enter the verification code sent to your email"}),(0,y.jsx)(u.p,{onChange:function(e){return O(e.target.value)},color:n===M?"green":"red.400",value:M,placeholder:"Enter the exact code here...",textAlign:"center",maxLength:6}),(0,y.jsxs)(c.MJ,{id:"password",isRequired:!0,children:[(0,y.jsx)(p.l,{children:"New Password"}),(0,y.jsxs)(h.M,{size:"md",children:[(0,y.jsx)(u.p,{type:F?"text":"password",placeholder:"Enter Password",onChange:function(e){return k(e.target.value)}}),(0,y.jsx)(f.t,{width:"4.5rem",children:(0,y.jsx)(m.$,{h:"1.75rem",size:"sm",onClick:z,children:F?"Hide":"Show"})})]})]}),(0,y.jsxs)(c.MJ,{id:"password",isRequired:!0,children:[(0,y.jsx)(p.l,{children:"Confirm New Password"}),(0,y.jsxs)(h.M,{size:"md",children:[(0,y.jsx)(u.p,{type:F?"text":"password",placeholder:"Confirm password",onChange:function(e){return q(e.target.value)}}),(0,y.jsx)(f.t,{width:"4.5rem",children:(0,y.jsx)(m.$,{h:"1.75rem",size:"sm",onClick:z,children:F?"Hide":"Show"})})]})]}),(0,y.jsx)(m.$,{onClick:function(){Z()},width:"100%",backgroundColor:"green.400",marginTop:10,isLoading:D,children:"Change Password"})]}),(0,y.jsx)(o.az,{flex:"1",mt:"6"}),(0,y.jsxs)(o.az,{children:[(0,y.jsxs)(o.az,{display:"flex",flexDir:"column",alignItems:"center",justifyContent:"space-around",width:"100%",children:[(0,y.jsx)(v.N,{href:"https://www.termsfeed.com/live/95163648-013f-4f36-9a57-0c15548ad847",target:"_blank",rel:"noopener noreferrer",p:1,children:"Privacy Policy"}),(0,y.jsx)(v.N,{href:"https://www.termsfeed.com/live/d75005a6-b516-48aa-b247-31df645410b7",target:"_blank",rel:"noopener noreferrer",p:1,children:"Terms and Conditions"})]}),(0,y.jsxs)(d.E,{textAlign:"center",fontSize:"small",position:"sticky",width:"100%",mt:"6",children:[(0,y.jsx)(d.E,{mb:"3",children:"Copyright \xa9 World Samma Academy. 1999-".concat((new Date).getFullYear())})," ","All rights reserved. Terms and conditions apply. For queries and comments, email support@worldsamma.org."]})]})]})}},14617:function(e,n,t){t.d(n,{t:function(){return d}});var r=t(89379),i=t(80045),a=t(93461),l=t(89254),s=["isDisabled","isInvalid","isReadOnly","isRequired"],o=["id","disabled","readOnly","required","isRequired","isInvalid","isReadOnly","isDisabled","onFocus","onBlur"];function d(e){var n=function(e){var n,t,s,d=(0,a.Uc)(),u=e.id,c=e.disabled,p=e.readOnly,h=e.required,f=e.isRequired,m=e.isInvalid,v=e.isReadOnly,x=e.isDisabled,g=e.onFocus,A=e.onBlur,b=(0,i.A)(e,o),y=e["aria-describedby"]?[e["aria-describedby"]]:[];(null==d?void 0:d.hasFeedbackText)&&(null==d?void 0:d.isInvalid)&&y.push(d.feedbackId);(null==d?void 0:d.hasHelpText)&&y.push(d.helpTextId);return(0,r.A)((0,r.A)({},b),{},{"aria-describedby":y.join(" ")||void 0,id:null!=u?u:null==d?void 0:d.id,isDisabled:null!=(n=null!=c?c:x)?n:null==d?void 0:d.isDisabled,isReadOnly:null!=(t=null!=p?p:v)?t:null==d?void 0:d.isReadOnly,isRequired:null!=(s=null!=h?h:f)?s:null==d?void 0:d.isRequired,isInvalid:null!=m?m:null==d?void 0:d.isInvalid,onFocus:(0,l.Hj)(null==d?void 0:d.onFocus,g),onBlur:(0,l.Hj)(null==d?void 0:d.onBlur,A)})}(e),t=n.isDisabled,d=n.isInvalid,u=n.isReadOnly,c=n.isRequired,p=(0,i.A)(n,s);return(0,r.A)((0,r.A)({},p),{},{disabled:t,readOnly:u,required:c,"aria-invalid":(0,l.rq)(d),"aria-required":(0,l.rq)(c),"aria-readonly":(0,l.rq)(u)})}},93461:function(e,n,t){t.d(n,{MJ:function(){return R},TP:function(){return b},Uc:function(){return N}});var r=t(89379),i=t(80045),a=t(5544),l=t(67852),s=t(74554),o=t(23226),d=t(73761),u=t(36254),c=t(14550),p=t(89254),h=t(65043),f=t(70579),m=["id","isRequired","isInvalid","isDisabled","isReadOnly"],v=["getRootProps","htmlProps"],x=(0,l.q)({name:"FormControlStylesContext",errorMessage:"useFormControlStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<FormControl />\" "}),g=(0,a.A)(x,2),A=g[0],b=g[1],y=(0,l.q)({strict:!1,name:"FormControlContext"}),I=(0,a.A)(y,2),j=I[0],N=I[1];var R=(0,o.R)((function(e,n){var t=(0,d.o5)("Form",e),l=function(e){var n=e.id,t=e.isRequired,l=e.isInvalid,o=e.isDisabled,d=e.isReadOnly,u=(0,i.A)(e,m),c=(0,h.useId)(),f=n||"field-".concat(c),v="".concat(f,"-label"),x="".concat(f,"-feedback"),g="".concat(f,"-helptext"),A=(0,h.useState)(!1),b=(0,a.A)(A,2),y=b[0],I=b[1],j=(0,h.useState)(!1),N=(0,a.A)(j,2),R=N[0],k=N[1],w=(0,h.useState)(!1),C=(0,a.A)(w,2),E=C[0],q=C[1],_=(0,h.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return(0,r.A)((0,r.A)({id:g},e),{},{ref:(0,s.Px)(n,(function(e){e&&k(!0)}))})}),[g]),S=(0,h.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return(0,r.A)((0,r.A)({},e),{},{ref:n,"data-focus":(0,p.sE)(E),"data-disabled":(0,p.sE)(o),"data-invalid":(0,p.sE)(l),"data-readonly":(0,p.sE)(d),id:void 0!==e.id?e.id:v,htmlFor:void 0!==e.htmlFor?e.htmlFor:f})}),[f,o,E,l,d,v]),F=(0,h.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return(0,r.A)((0,r.A)({id:x},e),{},{ref:(0,s.Px)(n,(function(e){e&&I(!0)})),"aria-live":"polite"})}),[x]),P=(0,h.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return(0,r.A)((0,r.A)((0,r.A)({},e),u),{},{ref:n,role:"group","data-focus":(0,p.sE)(E),"data-disabled":(0,p.sE)(o),"data-invalid":(0,p.sE)(l),"data-readonly":(0,p.sE)(d)})}),[u,o,E,l,d]),z=(0,h.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return(0,r.A)((0,r.A)({},e),{},{ref:n,role:"presentation","aria-hidden":!0,children:e.children||"*"})}),[]);return{isRequired:!!t,isInvalid:!!l,isReadOnly:!!d,isDisabled:!!o,isFocused:!!E,onFocus:function(){return q(!0)},onBlur:function(){return q(!1)},hasFeedbackText:y,setHasFeedbackText:I,hasHelpText:R,setHasHelpText:k,id:f,labelId:v,feedbackId:x,helpTextId:g,htmlProps:u,getHelpTextProps:_,getErrorMessageProps:F,getRootProps:P,getLabelProps:S,getRequiredIndicatorProps:z}}((0,u.MN)(e)),o=l.getRootProps,x=(l.htmlProps,(0,i.A)(l,v)),g=(0,p.cx)("chakra-form-control",e.className);return(0,f.jsx)(j,{value:x,children:(0,f.jsx)(A,{value:t,children:(0,f.jsx)(c.B.div,(0,r.A)((0,r.A)({},o({},n)),{},{className:g,__css:t.container}))})})}));R.displayName="FormControl",(0,o.R)((function(e,n){var t=N(),i=b(),a=(0,p.cx)("chakra-form__helper-text",e.className);return(0,f.jsx)(c.B.div,(0,r.A)((0,r.A)({},null==t?void 0:t.getHelpTextProps(e,n)),{},{__css:i.helperText,className:a}))})).displayName="FormHelperText"},24776:function(e,n,t){t.d(n,{l:function(){return h}});var r=t(89379),i=t(80045),a=t(93461),l=t(23226),s=t(73761),o=t(36254),d=t(14550),u=t(89254),c=t(70579),p=["className","children","requiredIndicator","optionalIndicator"],h=(0,l.R)((function(e,n){var t,l=(0,s.Vl)("FormLabel",e),h=(0,o.MN)(e),m=(h.className,h.children),v=h.requiredIndicator,x=void 0===v?(0,c.jsx)(f,{}):v,g=h.optionalIndicator,A=void 0===g?null:g,b=(0,i.A)(h,p),y=(0,a.Uc)(),I=null!=(t=null==y?void 0:y.getLabelProps(b,n))?t:(0,r.A)({ref:n},b);return(0,c.jsxs)(d.B.label,(0,r.A)((0,r.A)({},I),{},{className:(0,u.cx)("chakra-form__label",h.className),__css:(0,r.A)({display:"block",textAlign:"start"},l),children:[m,(null==y?void 0:y.isRequired)?x:A]}))}));h.displayName="FormLabel";var f=(0,l.R)((function(e,n){var t=(0,a.Uc)(),i=(0,a.TP)();if(!(null==t?void 0:t.isRequired))return null;var l=(0,u.cx)("chakra-form__required-indicator",e.className);return(0,c.jsx)(d.B.span,(0,r.A)((0,r.A)({},null==t?void 0:t.getRequiredIndicatorProps(e,n)),{},{__css:i.requiredIndicator,className:l}))}));f.displayName="RequiredIndicator"},53974:function(e,n,t){t.d(n,{t:function(){return x}});var r=t(64467),i=t(89379),a=t(80045),l=t(63452),s=t(14550),o=t(23226),d=t(89254),u=t(70579),c=["placement"],p=["className"],h=["className"],f=(0,s.B)("div",{baseStyle:{display:"flex",alignItems:"center",justifyContent:"center",position:"absolute",top:"0",zIndex:2}}),m=(0,o.R)((function(e,n){var t,s,o=e.placement,d=void 0===o?"left":o,p=(0,a.A)(e,c),h=(0,l.Z)(),m=h.field,v="left"===d?"insetStart":"insetEnd",x=(0,i.A)((0,r.A)((0,r.A)((0,r.A)((0,r.A)({},v,"0"),"width",null!=(t=null==m?void 0:m.height)?t:null==m?void 0:m.h),"height",null!=(s=null==m?void 0:m.height)?s:null==m?void 0:m.h),"fontSize",null==m?void 0:m.fontSize),h.element);return(0,u.jsx)(f,(0,i.A)({ref:n,__css:x},p))}));m.id="InputElement",m.displayName="InputElement";var v=(0,o.R)((function(e,n){var t=e.className,r=(0,a.A)(e,p),l=(0,d.cx)("chakra-input__left-element",t);return(0,u.jsx)(m,(0,i.A)({ref:n,placement:"left",className:l},r))}));v.id="InputLeftElement",v.displayName="InputLeftElement";var x=(0,o.R)((function(e,n){var t=e.className,r=(0,a.A)(e,h),l=(0,d.cx)("chakra-input__right-element",t);return(0,u.jsx)(m,(0,i.A)({ref:n,placement:"right",className:l},r))}));x.id="InputRightElement",x.displayName="InputRightElement"},17921:function(e,n,t){t.d(n,{p:function(){return h}});var r=t(89379),i=t(80045),a=t(14617),l=t(23226),s=t(73761),o=t(36254),d=t(14550),u=t(89254),c=t(70579),p=["htmlSize"],h=(0,l.R)((function(e,n){var t=e.htmlSize,l=(0,i.A)(e,p),h=(0,s.o5)("Input",l),f=(0,o.MN)(l),m=(0,a.t)(f),v=(0,u.cx)("chakra-input",e.className);return(0,c.jsx)(d.B.input,(0,r.A)((0,r.A)({size:t},m),{},{__css:h.field,ref:n,className:v}))}));h.displayName="Input",h.id="Input"},63452:function(e,n,t){t.d(n,{M:function(){return y},Z:function(){return b}});var r=t(89379),i=t(80045),a=t(5544),l=t(67852),s=t(74202),o=t(23226),d=t(73761),u=t(36254),c=t(14550),p=t(89254),h=t(45049),f=t(65043),m=t(70579),v=["children","className"],x=(0,l.q)({name:"InputGroupStylesContext",errorMessage:"useInputGroupStyles returned is 'undefined'. Seems you forgot to wrap the components in \"<InputGroup />\" "}),g=(0,a.A)(x,2),A=g[0],b=g[1],y=(0,o.R)((function(e,n){var t=(0,d.o5)("Input",e),a=(0,u.MN)(e),l=a.children,o=a.className,x=(0,i.A)(a,v),g=(0,p.cx)("chakra-input__group",o),b={},y=(0,s.a)(l),I=t.field;y.forEach((function(e){var n,r;t&&(I&&"InputLeftElement"===e.type.id&&(b.paddingStart=null!=(n=I.height)?n:I.h),I&&"InputRightElement"===e.type.id&&(b.paddingEnd=null!=(r=I.height)?r:I.h),"InputRightAddon"===e.type.id&&(b.borderEndRadius=0),"InputLeftAddon"===e.type.id&&(b.borderStartRadius=0))}));var j=y.map((function(n){var t,r,i=(0,h.o)({size:(null==(t=n.props)?void 0:t.size)||e.size,variant:(null==(r=n.props)?void 0:r.variant)||e.variant});return"Input"!==n.type.id?(0,f.cloneElement)(n,i):(0,f.cloneElement)(n,Object.assign(i,b,n.props))}));return(0,m.jsx)(c.B.div,(0,r.A)((0,r.A)({className:g,ref:n,__css:(0,r.A)({width:"100%",display:"flex",position:"relative",isolation:"isolate"},t.group),"data-group":!0},x),{},{children:(0,m.jsx)(A,{value:t,children:j})}))}));y.displayName="InputGroup"},38700:function(e,n,t){t.d(n,{N:function(){return p}});var r=t(89379),i=t(80045),a=t(23226),l=t(73761),s=t(36254),o=t(14550),d=t(89254),u=t(70579),c=["className","isExternal"],p=(0,a.R)((function(e,n){var t=(0,l.Vl)("Link",e),a=(0,s.MN)(e),p=a.className,h=a.isExternal,f=(0,i.A)(a,c);return(0,u.jsx)(o.B.a,(0,r.A)((0,r.A)({target:h?"_blank":void 0,rel:h?"noopener":void 0,ref:n,className:(0,d.cx)("chakra-link",p)},f),{},{__css:t}))}));p.displayName="Link"}}]);
//# sourceMappingURL=953.90bc662b.chunk.js.map