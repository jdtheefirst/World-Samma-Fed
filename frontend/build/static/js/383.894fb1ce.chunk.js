"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[383],{53747:function(e,t,n){n.d(t,{ZU:function(){return m},bK:function(){return d},tJ:function(){return u},uS:function(){return h}});var r=n(90675),o=n(5544),a=n(10467),s=n(79722),i=n(65043),l=n(55749),c=n(97665),u=c.z.object({name:c.z.string().min(2,"Name must be at least 2 characters").max(50,"Name must be at most 50 characters"),otherName:c.z.string().min(2,"Other name must be at least 2 characters").max(50,"Other name must be at most 50 characters"),email:c.z.string().email("Invalid email address"),gender:c.z.enum(["male","female","other"]),password:c.z.string().min(4,"Password must be at least 8 characters long").max(100,"Password must be at most 100 characters"),confirmPassword:c.z.string().min(4,"Confirm password must be at least 8 characters long").max(100,"Confirm password must be at most 100 characters").refine((function(e,t){return e===t.parent.password}),{message:"Passwords do not match"}),passport:c.z.string().regex(/^\d{8,15}$/,"Invalid passport/ID number"),selectedCountry:c.z.string().min(2,"Country is required"),provinces:c.z.string().optional(),language:c.z.string().min(2,"Language is required"),pic:c.z.string().url("Profile picture is required")});function d(e){var t=(0,i.useState)(null),n=(0,o.A)(t,2),r=n[0],a=n[1],s=(0,i.useRef)(null);return(0,i.useEffect)((function(){if(e&&e.token){if(!s.current){var t=e._id,n=(0,l.io)("/",{query:{token:e.token,userId:t}});return n.on("connect",(function(){console.log("connected"),a(n)})),n.on("disconnect",(function(){console.log("Socket disconnected")})),s.current=n,function(){n&&n.disconnect(),s.current=null}}a(s.current)}}),[e]),r}function m(e,t,n,r){return p.apply(this,arguments)}function p(){return(p=(0,a.A)((0,r.A)().mark((function e(t,n,o,a){var i,l;return(0,r.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,i={headers:{"Content-type":"application/json",Authorization:"Bearer ".concat(o.token)}},e.next=6,s.A.post("/api/paycheck/makepaymentmpesa/".concat(o._id,"?amount=").concat(t),{phoneNumber:n},i);case 6:l=e.sent,l.data&&a({title:"You have been prompt to finish your subscription process",status:"info",duration:1e3,position:"bottom"}),e.next=13;break;case 11:e.prev=11,e.t0=e.catch(2);case 13:case"end":return e.stop()}}),e,null,[[2,11]])})))).apply(this,arguments)}function h(e,t,n){return x.apply(this,arguments)}function x(){return(x=(0,a.A)((0,r.A)().mark((function e(t,n,o){var a,i;return(0,r.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,a={headers:{"Content-type":"application/json"}},e.next=6,s.A.post("/api/paycheck/donationsmpesa?amount=".concat(t),{phoneNumber:n},a);case 6:i=e.sent,i.data&&o({title:"You have been prompt to finish your subscription process",status:"info",duration:1e3,position:"bottom"}),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(2),console.log(e.t0);case 14:case"end":return e.stop()}}),e,null,[[2,11]])})))).apply(this,arguments)}},16431:function(e,t,n){var r=n(90675),o=n(10467),a=n(5544),s=n(65043),i=n(93748),l=n(50927),c=n(45532),u=n(4007),d=n(14929),m=n(3952),p=n(43984),h=n(11300),x=n(93461),f=n(24776),g=n(97451),y=n(17921),b=n(38028),j=n(31377),v=n(63452),A=n(53974),C=n(30059),w=n(39261),k=n(61191),S=n(79722),z=n(53747),E=n(70579);t.A=function(e){var t=e.isOpen,n=e.onClose,F=(0,i.d)(),D=(0,s.useState)(""),I=(0,a.A)(D,2),M=I[0],P=I[1],T=(0,s.useState)(0),R=(0,a.A)(T,2),N=R[0],O=R[1],_=(0,s.useState)(""),W=(0,a.A)(_,2),B=W[0],J=W[1],Y=(0,s.useState)([]),q=(0,a.A)(Y,2),G=q[0],$=q[1],K=(0,s.useState)(!1),L=(0,a.A)(K,2),H=L[0],U=L[1],Z=(0,s.useState)(""),V=(0,a.A)(Z,2),X=V[0],Q=V[1],ee=Object.entries(k.Xr).map((function(e){var t=(0,a.A)(e,2),n=(t[0],t[1]);return{value:n.name,label:n.name}})),te=function(){var e=(0,o.A)((0,r.A)().mark((function e(){var t,n;return(0,r.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(M&&N){e.next=3;break}return F({title:"Form was incomplete",status:"warning"}),e.abrupt("return");case 3:return e.prev=3,e.next=6,S.A.post("/api/donate",{country:M,province:B,amount:N});case 6:t=e.sent,n=t.data,F({title:n.message,status:"success"}),e.next=15;break;case 11:e.prev=11,e.t0=e.catch(3),console.error("Donation error:",e.t0),F({title:"An Error Occurred!",status:"error"});case 15:case"end":return e.stop()}}),e,null,[[3,11]])})));return function(){return e.apply(this,arguments)}}();(0,s.useEffect)((function(){var e=function(){var e=(0,o.A)((0,r.A)().mark((function e(){var t;return(0,r.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t=(0,w.e)(M),$(t);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();M?e():$([])}),[M]);var ne=(0,E.jsx)(l.m,{bg:"blackAlpha.300",backdropFilter:"blur(10px) hue-rotate(90deg)"});return(0,E.jsxs)(c.aF,{isOpen:t,onClose:n,size:"md",children:[ne,(0,E.jsxs)(u.$,{p:"6",children:[(0,E.jsxs)(d.r,{p:0,m:0,textAlign:"center",children:[(0,E.jsx)(m.E,{bgGradient:"linear(to-l, #7928CA, #FF0080)",bgClip:"text",children:"Donation details"}),(0,E.jsx)("br",{})," Country: ",(0,E.jsx)("strong",{style:{color:"teal"},children:M})," ",(0,E.jsx)("br",{})," State: ",(0,E.jsx)("strong",{style:{color:"teal"},children:B}),(0,E.jsx)("br",{})," Donation: ",(0,E.jsxs)("strong",{style:{color:"teal"},children:["$",N]})]}),(0,E.jsx)(p.s,{}),(0,E.jsx)(h.c,{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",width:"100%",children:!H&&(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)(x.MJ,{id:"country",isRequired:!0,children:[(0,E.jsx)(f.l,{textColor:"grey",children:"Country"}),(0,E.jsx)(g.l,{placeholder:"Select your country",display:"flex",justifyContent:"center",alignItems:"center",width:"100%",textColor:"grey",value:M,onChange:function(e){return P(e.target.value)},children:ee.map((function(e,t){return(0,E.jsx)("option",{value:e.value,style:{color:"black"},children:e.label},t)}))})]}),M&&G.length>0?(0,E.jsxs)(x.MJ,{id:"provinces",isRequired:!0,children:[(0,E.jsx)(f.l,{textColor:"grey",children:"County/Province"}),(0,E.jsx)(g.l,{placeholder:"Select your province",display:"flex",justifyContent:"center",alignItems:"center",textColor:"grey",width:"100%",value:B,onChange:function(e){return J(e.target.value)},children:G.map((function(e,t){return(0,E.jsx)("option",{value:e.value,style:{color:"black"},children:e.name},t)}))})]}):(0,E.jsxs)(x.MJ,{id:"provinces",children:[(0,E.jsx)(f.l,{textColor:"grey",children:"County/Province"}),(0,E.jsx)(y.p,{type:"text",textColor:"grey",placeholder:"Leave blank if not applicable...",onChange:function(e){return J(e.target.value)}})]}),(0,E.jsxs)(x.MJ,{isRequired:!0,textColor:"grey",children:[(0,E.jsx)(f.l,{children:"Donate"}),(0,E.jsx)(y.p,{type:"number",min:"1",textColor:"grey",placeholder:"$",onChange:function(e){return function(e){var t=e.target.value;""===t||Number(t)>=0&&!isNaN(t)?O(t):e.preventDefault()}(e)}})]}),(0,E.jsx)(b.$,{onClick:function(){return U(!0)},borderRadius:20,mt:"6",background:"teal",isDisabled:!M||!N,color:"white",width:"100%",_hover:{background:"green"},children:"Pay"})]})}),H&&(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(C.ag,{options:{clientId:"AZAdYFR_SbadcgOcCLYn9ajkReJTZmOCnEeAvQ3xPYAE5BMYFBHi4vDeILfNwBO-hh-8wfyGC9lNeB1I"},children:(0,E.jsx)(C.JV,{createOrder:function(e,t){return t.order.create({purchase_units:[{amount:{currency_code:"USD",value:N}}]})},onApprove:function(){var e=(0,o.A)((0,r.A)().mark((function e(t,n){return(0,r.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,te();case 2:return e.abrupt("return",n.order.capture().then((function(e){F({title:"Transaction Successful",description:"Thank you for your support!",status:"success",duration:3e3,isClosable:!0,position:"bottom"})})));case 3:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),onCancel:function(){F({title:"Transaction Canceled",description:"Thank you for considering!",status:"info",duration:3e3,isClosable:!0,position:"bottom"})},onError:function(e){console.error("PayPal error:",e),F({title:"Transaction Error",description:"An error occurred with the PayPal transaction.",status:"error",duration:3e3,isClosable:!0,position:"bottom"})}})}),(0,E.jsx)(m.E,{textAlign:"center",width:"100%",children:"Or"}),(0,E.jsxs)(x.MJ,{id:"password-login",children:[(0,E.jsxs)(f.l,{display:"flex",justifyContent:"start",alignItems:"center",fontSize:"small",children:[" ",(0,E.jsx)(m.E,{pr:"2",children:"Pay with"}),(0,E.jsx)(j._,{height:10,width:"auto",src:"https://res.cloudinary.com/dsdlgmgwi/image/upload/v1724605149/M-PESA.png",alt:"",loading:"lazy"})]}),(0,E.jsxs)(v.M,{size:"md",children:[(0,E.jsx)(y.p,{fontSize:"small",color:"green.400",fontWeight:"bold",placeholder:"Enter phone number",textAlign:"center",type:"number",onChange:function(e){return Q(e.target.value)},value:X,isDisabled:!M||!N}),(0,E.jsx)(A.t,{width:"4.5rem",children:(0,E.jsx)(b.$,{width:"100%",onClick:function(){(0,z.uS)(N,X,F),F({title:"Wait as message is sent by Admin Apparels",status:"loading",isClosable:!0,position:"bottom",duration:5e3})},isDisabled:X.length!==parseInt(10)||!M||!N,colorScheme:"teal",borderRadius:"full",_hover:{background:"green"},children:"Pay"})})]})]})]})]})]})}},87299:function(e,t,n){n.r(t),n.d(t,{default:function(){return j}});var r=n(5544),o=n(65043),a=n(89379),s=n(80045),i=n(14550),l=n(23226),c=n(70579),u=["axis"],d=(0,i.B)("div",{baseStyle:{display:"flex",alignItems:"center",justifyContent:"center"}});d.displayName="Center";var m={horizontal:{insetStart:"50%",transform:"translateX(-50%)"},vertical:{top:"50%",transform:"translateY(-50%)"},both:{insetStart:"50%",top:"50%",transform:"translate(-50%, -50%)"}},p=((0,l.R)((function(e,t){var n=e.axis,r=void 0===n?"both":n,o=(0,s.A)(e,u);return(0,c.jsx)(i.B.div,(0,a.A)((0,a.A)({ref:t,__css:m[r]},o),{},{position:"absolute"}))})),n(85522)),h=n(3952),x=n(31377),f=n.p+"static/media/Mombasa.8f3affd5635dc6debe59.jpg",g=n.p+"static/media/Nairobi.6d8eb4b8f631b94749c1.jpg",y=n(85051),b=n(16431),j=function(){var e=(0,o.useState)(!1),t=(0,r.A)(e,2),n=t[0],a=t[1];return(0,c.jsxs)(d,{display:"flex",flexDir:"column",w:"100%",background:"whitesmoke",overflow:"auto",children:[n&&(0,c.jsx)(b.A,{isOpen:!0,onClose:function(){a(!1)}}),(0,c.jsx)(p.az,{style:{fontFamily:"Arial, sans-serif",lineHeight:1.6,backgroundColor:"#f4f4f4",color:"#333",margin:0,padding:4},children:(0,c.jsxs)("div",{id:"root",children:[(0,c.jsxs)("header",{style:{backgroundColor:"#003366",color:"white",textAlign:"center",padding:"20px"},children:[(0,c.jsx)("h1",{style:{fontSize:"2.5em"},children:"Welcome to the World Samma Federation"}),(0,c.jsx)("p",{style:{fontSize:"1.2em",marginTop:"10px"},children:"Your global community for martial arts and other sports enthusiasts. Join us to connect, learn, and grow in your martial arts journey."})]}),(0,c.jsxs)("main",{style:{padding:"20px"},children:[(0,c.jsx)("section",{children:(0,c.jsx)("a",{href:"/",children:"Back"})}),(0,c.jsxs)("section",{id:"about",style:{marginBottom:"30px",textAlign:"start"},children:[(0,c.jsx)("h1",{style:{color:"#003366"},children:"About Us"}),(0,c.jsx)("p",{children:"The World Samma Federation is dedicated to promoting the art of Samma and supporting martial artists worldwide. Our community provides resources, training, and events for all skill levels."})]}),(0,c.jsxs)("section",{id:"features",style:{marginBottom:"30px",textAlign:"start"},children:[(0,c.jsx)("h1",{style:{color:"#003366"},children:"Features"}),(0,c.jsxs)("ul",{style:{listStyleType:"disc",paddingLeft:"20px"},children:[(0,c.jsx)("li",{children:"Comprehensive training programs"}),(0,c.jsx)("li",{children:"Global competitions and events"}),(0,c.jsx)("li",{children:"Exclusive member resources"}),(0,c.jsx)("li",{children:"Community forums and support"})]})]}),(0,c.jsxs)("section",{style:{marginBottom:"30px",textAlign:"start"},children:[(0,c.jsx)("h1",{style:{color:"#003366"},children:"Archives"}),(0,c.jsxs)(h.E,{fontFamily:"Arial, sans-serif",mb:4,children:[(0,c.jsx)("strong",{style:{fontWeight:"extrabold",fontFamily:"fantacy",textEmphasis:"GrayText"},children:"15th March 2011 (in Mombasa City Centre):"}),"\xa0",'Formation of the Society of African Mixed Martial Arts and use of SAMMA as its acronym (acronym inspired by east African street slang word for a flip, "sama"). Then making of cheni 6 curriculum began with "designing" of the tamati (sign out) pattern.']}),(0,c.jsxs)(h.E,{fontFamily:"Arial, sans-serif",mb:4,children:[(0,c.jsx)("strong",{style:{fontWeight:"extrabold",fontFamily:"fantacy",textEmphasis:"GrayText"},children:"1st August 2013 (in Mombasa North Coast):"}),"\xa0","Transformation of SAMMA to a martial art after the completion of the main contents of cheni 6 curriculum. Immediate formation of the World Samma Federation (WSF) to unify and voice for wasamma (samma exponents) worldwide."]}),(0,c.jsxs)(h.E,{fontFamily:"Arial, sans-serif",mb:4,children:[(0,c.jsx)("strong",{style:{fontWeight:"extrabold",fontFamily:"fantacy",textEmphasis:"GrayText"},children:"March 2021:"}),"\xa0","Introduction of samma pigano (sparring) method at Kenya Coast, that is; THREE ranges of man to man combat (stick, elbow, punch, knee, kick and finally grappling)."]}),(0,c.jsx)("a",{href:"https://res.cloudinary.com/dsdlgmgwi/image/upload/v1721742094/sammaV4.pdf",download:!0,style:{textDecoration:"none",color:"blue"},children:"Download Our Curriculum (PDF)"}),(0,c.jsx)(h.E,{fontSize:"md",textAlign:"center",mb:"6",children:"\u2139\ufe0f Help us translate the curriculum booklet into other world languages by sending an editable draft to the Email: support@worldsamma.org. Include your name, country, and province for a credit/mention. Thanking you in advance."})]}),(0,c.jsxs)(p.az,{display:"flex",flexWrap:"wrap",justifyContent:"space-evenly",flexDirection:{base:"column",md:"row"},alignItems:"center",children:[(0,c.jsxs)(p.az,{display:"flex",flexDir:"column",justifyContent:"center",alignItems:"center",mb:{base:"20px",md:"0"},onClick:function(){return a(!0)},cursor:"pointer",textAlign:"center",children:[(0,c.jsx)(x._,{src:g,boxSize:{base:"300px",md:"400px"},borderRadius:2,mx:"auto",mb:"10px",boxShadow:"dark-lg",p:"6",rounded:"md",bg:"white"}),(0,c.jsxs)(p.az,{display:"flex",flexDir:"column",justifyContent:"center",alignItems:"center",textColor:"goldenrod",children:[(0,c.jsx)(y.lf4,{style:{color:"red",marginRight:"5px"}}),"Nairobi, Kenya"]})]}),(0,c.jsxs)(p.az,{display:"flex",flexDir:"column",justifyContent:"center",alignItems:"center",mb:{base:"20px",md:"0"},onClick:function(){return a(!0)},cursor:"pointer",children:[(0,c.jsx)(x._,{src:f,boxSize:{base:"300px",md:"400px"},borderRadius:2,mx:"auto",mb:"10px",boxShadow:"dark-lg",p:"6",rounded:"md",bg:"white"}),(0,c.jsxs)(p.az,{display:"flex",flexDir:"column",justifyContent:"center",alignItems:"center",textColor:"goldenrod",children:[(0,c.jsx)(y.lf4,{style:{color:"red",marginRight:"5px"}}),"Mombasa, Kenya"]})]}),(0,c.jsxs)(p.az,{display:"flex",flexDir:"column",justifyContent:"center",alignItems:"center",mb:{base:"20px",md:"0"},onClick:function(){return a(!0)},cursor:"pointer",textAlign:"center",children:[(0,c.jsx)(x._,{src:"https://res.cloudinary.com/dsdlgmgwi/image/upload/v1720940066/training_dmljwp.jpg",boxSize:{base:"300px",md:"400px"},borderRadius:2,mx:"auto",mb:"10px",boxShadow:"dark-lg",p:"6",rounded:"md",bg:"white",loading:"lazy"}),(0,c.jsxs)(p.az,{display:"flex",flexDir:"column",justifyContent:"center",alignItems:"center",textColor:"goldenrod",children:[(0,c.jsx)(y.lf4,{style:{color:"red",marginRight:"5px"}}),"Nairobi, Kenya"]})]})]})]}),(0,c.jsxs)("footer",{style:{backgroundColor:"#003366",color:"white",textAlign:"center",padding:"10px",width:"100%"},children:[(0,c.jsx)(h.E,{children:"Copyright \xa9 World Samma Academy. 1999-".concat((new Date).getFullYear())})," ","All rights reserved. Terms and conditions apply. For queries and comments Email: support@worldsamma.org"]})]})})]})}}}]);
//# sourceMappingURL=383.894fb1ce.chunk.js.map