(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[948],{3747:(e,t,n)=>{"use strict";n.d(t,{ZU:()=>l,bK:()=>a});var o=n(6213),r=n(5043),i=n(5749),s=n(6818);function a(e){const t=(0,r.useRef)(null),{user:n}=(0,s.a)();return(0,r.useEffect)((()=>{if(t.current)return;const o=(0,i.io)("/",{query:{token:e}});return o.on("connect",(()=>{const e=null===n||void 0===n?void 0:n.email;o.emit("newConnection",{email:e})})),o.on("disconnect",(()=>{})),t.current=o,()=>{o.disconnect(),t.current=null}}),[e,null===n||void 0===n?void 0:n.email]),t.current}async function l(e,t,n,r){if(t)try{const i={headers:{"Content-type":"application/json",Authorization:"Bearer ".concat(n.token)}},{data:s}=await o.A.post("/api/paycheck/makepaymentmpesa/".concat(n._id,"?amount=").concat(e),{phoneNumber:t},i);s&&r({title:"You have been prompt to finish your subscription process",status:"info",duration:1e3,position:"bottom"})}catch(i){}}},200:(e,t,n)=>{"use strict";n.d(t,{A:()=>o});const o=e=>{const t=new Date(e),n=new Date-t,o=Math.floor(n/1e3),r=Math.floor(o/60),i=Math.floor(r/60),s=Math.floor(i/24);if(o<60)return"Just now";if(r<60)return"".concat(r," minute").concat(1===r?"":"s"," ago");if(i<24)return"".concat(i," hour").concat(1===i?"":"s"," ago");if(1===s)return"Yesterday";if(s<7)return"".concat(s," day").concat(1===s?"":"s"," ago");{const e={hour:"numeric",minute:"numeric",month:"long",day:"numeric",year:"numeric"};return t.toLocaleDateString("en-US",e)}}},8024:(e,t,n)=>{"use strict";n.d(t,{A:()=>$});var o=n(8028),r=n(1221),i=n(5522),s=n(3952),a=n(7426),l=n(8360),c=n(9627),d=n(1377),u=n(1273),h=n(532),m=n(7918),g=n(1847),x=n(5156),f=n(8842),p=n(927),b=n(5851),j=n(4929),v=n(1300),y=n(2257),k=n(1823),C=n(3216),w=n(6818),z=n(5532),_=n(4007),A=n(3984),S=n(3224),E=n(6642),D=n(5043),I=n(6213),R=n(579);const q=()=>{const{isOpen:e,onOpen:t,onClose:n}=(0,r.j)(),[a,l]=(0,D.useState)([]),[c,u]=(0,D.useState)(!1),{user:h}=(0,w.a)(),m=(0,C.Zp)(),g=(0,D.useCallback)((async()=>{if(h)try{const e={headers:{Authorization:"Bearer ".concat(h.token)}},{data:t}=await I.A.get("/api/clubs/github/something/".concat(h._id),e);l(t)}catch(e){console.error("Error fetching club requests:",e)}}),[h]);(0,D.useEffect)((()=>{h&&g()}),[h,g]);return(0,R.jsxs)(R.Fragment,{children:[(0,R.jsxs)(o.$,{backgroundColor:"white",_hover:{backgroundColor:"transparent"},onClick:t,children:[(0,R.jsx)(d._,{src:"https://res.cloudinary.com/dvc7i8g1a/image/upload/v1709643622/icons8-group-48_asymxw.png",height:5}),a&&a.length>0&&(0,R.jsx)(s.E,{position:"absolute",bottom:"70%",right:"70%",transform:"translate(50%, 0)",bg:"red.500",borderRadius:"50%",width:"2px",height:"2px",p:1.5}),(0,R.jsx)(s.E,{})]}),(0,R.jsxs)(z.aF,{isOpen:e,onClose:n,children:[(0,R.jsx)(p.m,{bg:"blackAlpha.300",backdropFilter:"blur(10px) hue-rotate(90deg)"}),(0,R.jsxs)(_.$,{children:[(0,R.jsx)(j.r,{textAlign:"center",children:"Clubs Requests"}),(0,R.jsx)(A.s,{}),(0,R.jsx)(v.c,{display:"flex",justifyContent:"center",alignItems:"center",flexDir:"column",maxH:"300px",children:a&&a.length>0?a.map(((e,t)=>(0,R.jsxs)(i.az,{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",children:[(0,R.jsxs)(o.$,{justifyContent:"space-between",onClick:()=>m("/showclub/".concat(e._id)),children:[t+1,". Club Name: ",e.name]},e._id),(0,R.jsx)(o.$,{background:"#f05e56",onClick:()=>(async e=>{if(h&&e){u(!0);try{const t={headers:{Authorization:"Bearer ".concat(h.token)}},{data:n}=await I.A.get("/api/clubs/decline/request/".concat(e,"/").concat(h._id),t);l(n),u(!1)}catch(t){u(!1),console.error("Error fetching club requests/decline:",t)}}})(e._id),children:c?(0,R.jsx)(S.y,{size:"small"}):"Decline"})]},t))):(0,R.jsx)(R.Fragment,{children:(0,R.jsx)(s.E,{children:"All club requests have been replied to."})})}),(0,R.jsx)(E.j,{fontSize:"small",textDecor:"underline",children:"These requests were made by club coaches."})]})]})]})};const $=function(){const{user:e,notification:t,setNotification:n}=(0,w.a)(),{isOpen:z,onOpen:_,onClose:A}=(0,r.j)(),S=(0,C.Zp)(),E=(0,a.A)({base:"none",md:"flex"}),D=(0,a.A)({base:"hidden",md:"visible"});return(0,R.jsxs)(R.Fragment,{children:[(0,R.jsxs)(i.az,{display:"flex",justifyContent:"space-between",alignItems:"center",bg:"white",w:"100%",p:3,paddingBottom:2,boxShadow:"2xl",zIndex:10,top:0,position:"fixed",children:[(0,R.jsx)(s.E,{textAlign:"center",fontSize:{base:"small",md:"medium"},fontWeight:"bold",userSelect:"none",p:0,m:0,pl:3,children:"Worldsamma"}),(0,R.jsxs)(i.az,{display:"flex",justifyContent:"center",alignItems:"center",children:[(0,R.jsx)(o.$,{backgroundColor:"transparent",display:E,visibility:D,_hover:{backgroundColor:"transparent",color:"green.400"},onClick:()=>{S("/dashboard")},children:"My Programs"}),(0,R.jsx)(o.$,{variant:"ghost",onClick:_,_hover:{backgroundColor:"transparent",color:"green.400"},children:(0,R.jsx)(s.E,{display:{base:"none",md:"flex"},px:4,userSelect:"none",children:"Discover"})}),(0,R.jsx)(q,{})]}),(0,R.jsxs)("div",{children:[(0,R.jsxs)(h.W,{children:[(0,R.jsxs)(m.I,{p:1,position:"relative",children:[(0,R.jsx)(y.X,{fontSize:"2xl",p:0,m:0}),t.length>0&&(0,R.jsx)(l.E,{variant:"subtle",position:"absolute",top:"-3px",right:"-3px",backgroundColor:"red",zIndex:1,borderRadius:"50%",color:"white",children:t.length})]}),(0,R.jsxs)(g.c,{pl:2,children:[!t.length&&"No New Messages",t.map((e=>(0,R.jsx)(x.D,{onClick:()=>{n(t.filter((t=>t!==e)))},children:"New Message from ".concat(e.sender?e.sender.name:"Coach"," ADM: ").concat(e.sender?e.sender.admission:" ")},e._id)))]})]}),(0,R.jsx)(h.W,{children:(0,R.jsx)(m.I,{as:o.$,bg:"white",_hover:{backgroundColor:"transparent"},onClick:_,children:"flex"===E?(0,R.jsx)(k.e,{size:"sm",cursor:"pointer",name:null===e||void 0===e?void 0:e.name,src:null===e||void 0===e?void 0:e.pic}):(0,R.jsx)(c.K,{backgroundColor:"transparent",icon:(0,R.jsx)(d._,{src:"https://res.cloudinary.com/dvc7i8g1a/image/upload/v1706276791/icons8-menu-50_afv1fe.png",height:5})})})})]})]}),(0,R.jsxs)(f._,{placement:"left",onClose:A,isOpen:z,children:[(0,R.jsx)(p.m,{bg:"blackAlpha.300",backdropFilter:"blur(10px) hue-rotate(90deg)"}),(0,R.jsxs)(b.z,{children:[(0,R.jsxs)(j.r,{borderBottomWidth:"1px",display:"flex",justifyContent:"space-between",children:["Dashboard",(0,R.jsx)(u.J,{onClick:A})]}),(0,R.jsxs)(v.c,{display:"flex",flexDir:"column",justifyContent:"space-between",width:"100%",children:[(0,R.jsxs)(i.az,{padding:3,display:"flex",justifyContent:"space-around",flexDir:"column",children:[(0,R.jsxs)(o.$,{display:"flex",justifyContent:"left",alignItems:"center",background:"white",m:1,_hover:{backgroundColor:"transparent",color:"green"},onClick:()=>S("/profile"),children:[(0,R.jsx)(k.e,{size:"sm",cursor:"pointer",name:null===e||void 0===e?void 0:e.name,src:null===e||void 0===e?void 0:e.pic}),(0,R.jsx)(s.E,{p:2,m:1,children:"Profile"})]}),(0,R.jsx)(o.$,{justifyContent:"left",background:"white",_hover:{backgroundColor:"transparent",color:"green"},onClick:()=>{S("/dashboard"),A()},children:"My Programs"}),(0,R.jsx)(o.$,{justifyContent:"start",background:"white",_hover:{backgroundColor:"transparent",color:"green"},onClick:()=>{S("/clubs"),A()},children:"Clubs"}),(0,R.jsx)(o.$,{justifyContent:"left",background:"white",_hover:{backgroundColor:"transparent",color:"green"},isDisabled:!(null!==e&&void 0!==e&&e.provinces),onClick:()=>{S("/province"),A()},children:"Provincial level"}),(0,R.jsx)(o.$,{background:"white",justifyContent:"left",_hover:{backgroundColor:"transparent",color:"green"},onClick:()=>{S("/national"),A()},children:"National level"}),(0,R.jsx)(o.$,{background:"white",justifyContent:"left",_hover:{backgroundColor:"transparent",color:"green"},children:"International Championship"})]}),(0,R.jsx)(o.$,{onClick:()=>{localStorage.removeItem("userInfo"),n([]),S("/")},children:"Log out"})]})]})]})]})}},8180:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>S});var o=n(5043),r=n(3216),i=n(3748),s=n(5522),a=n(1377),l=n(4377),c=n(3952),d=n(7118),u=n(1918),h=n(1821),m=n(786),g=n(8028),x=n(9627),f=n(3768),p=n(5695),b=n(184),j=n(686),v=n(6213),y=n(8024),k=n(200),C=n(6593),w=n.n(C),z=n(579);const _=e=>{let{user:t,club:n,socket:s}=e;const l=(0,o.useRef)(null),c=(0,o.useRef)(null),d=(0,i.d)(),[u,h]=(0,o.useState)(!1),{clubId:m}=(0,r.g)();(0,o.useEffect)((()=>{l.current}),[]),(0,o.useEffect)((()=>{if(s)return s.on("startSignal",(()=>{const e=function(e,t){const n=new(w())({initiator:!1,trickle:!1,stream:t});return n}(s.id,undefined);c.current=e,h(!0)})),()=>{s.off("startSignal")}}),[s]);return(0,z.jsxs)(z.Fragment,{children:[(null===n||void 0===n?void 0:n.coach._id)===(null===t||void 0===t?void 0:t._id)&&(0,z.jsx)(x.K,{icon:(0,z.jsx)(f.I,{as:b.HiP}),colorScheme:"purple",size:"md",m:1,onClick:()=>{s&&navigator.mediaDevices.getUserMedia({video:!0,audio:!0}).then((e=>{const t=l.current;if(!t)throw new Error("Video element not defined.");t.srcObject=e,s.emit("startLiveSession",m)})).catch((e=>{console.error("Media Device access error:",e),d({title:"Media Device access error",duration:2e3,position:"bottom",isClosable:!0})})),h(!0)}}),(0,z.jsxs)("div",{style:{position:"absolute",top:0,zIndex:20},children:[(0,z.jsx)("video",{id:"currentVideo",ref:l,autoPlay:!0,playsInline:!0,style:{display:"flex",left:-80,borderRadius:10,justifyContent:"center",width:"100%",height:"100%",objectFit:"contain"}}),u&&(0,z.jsx)(g.$,{onClick:()=>{h(!1);const e=l.current;if(e){var t;const n=e.srcObject;if(n){n.getTracks().forEach((e=>e.stop()))}e.srcObject=null,null===(t=c.current)||void 0===t||t.destroy()}},style:{position:"absolute",bottom:-40,zIndex:20,right:5},borderRadius:20,_hover:{background:"red"},background:"red",children:(0,z.jsx)(a._,{src:"https://res.cloudinary.com/dvc7i8g1a/image/upload/v1710313501/icons8-hang-up-50_ke2pag.png",borderRadius:"50%",height:7})})]})]})};var A=n(3747);const S=e=>{var t,n,C;let{user:w}=e;const{clubId:S}=(0,r.g)(),[E,D]=(0,o.useState)(null),[I,R]=(0,o.useState)(""),[q,$]=(0,o.useState)([]),[B,M]=(0,o.useState)(!1),F=(0,r.Zp)(),N=(0,i.d)(),O=(0,A.bK)(null===w||void 0===w?void 0:w.token);(0,o.useEffect)((()=>{if(O)return O.on("liveSessionAvailable",(e=>{setLive(!0)})),O.emit("other user"),()=>{O.off("liveSessionAvailable")}}),[O]);const P=(0,o.useCallback)((async()=>{if(w&&S){M(!0);try{const e={headers:{Authorization:"Bearer ".concat(w.token)}},{data:t}=await v.A.get("/api/clubs/".concat(S),e);D(t),M(!1)}catch(e){M(!1),console.error("Error fetching Club:",e)}}else F("/dashboard")}),[null===w||void 0===w?void 0:w.token,D,S]),W=(0,o.useCallback)((async()=>{if(w&&S){M(!0);try{const e=w._id,t={headers:{Authorization:"Bearer ".concat(w.token)}},{data:n}=await v.A.get("/api/clubs/broadcast/".concat(S,"/").concat(e),t);$(n),R(""),M(!1)}catch(e){console.error("Error fetching BroadcastMessages:",e),console.log(e)}}else F("/dashboard")}),[w,null===w||void 0===w?void 0:w.token,S,R]);(0,o.useEffect)((()=>{w&&(P(),W())}),[w,P,W]);return(0,z.jsxs)(s.az,{display:"flex",flexDir:"column",justifyContent:"flex-start",alignItems:"center",width:"100%",background:"whitesmoke",minH:"100vh",overflow:"auto",children:[(0,z.jsx)(y.A,{}),(0,z.jsxs)(s.az,{display:"flex",flexDir:"column",justifyContent:"center",alignItems:"center",width:"100%",mt:"50",position:"relative",background:"whitesmoke",children:[(0,z.jsx)(a._,{src:"https://res.cloudinary.com/dsdlgmgwi/image/upload/v1713518908/Samma_pkmq5v.png",alt:"Background",top:0,borderRadius:"20",width:"100%"}),(0,z.jsxs)(s.az,{display:"flex",top:10,left:{base:"0",md:"30%"},textAlign:"center",width:"100%",p:4,children:[(0,z.jsx)(a._,{src:null===E||void 0===E?void 0:E.coach.pic,marginTop:-10,alt:"*Coach profile pic",borderRadius:"full",boxSize:{base:"100px",md:"200px"},border:"4px solid white"}),(0,z.jsxs)(s.az,{display:"flex",flexDir:"column",textAlign:"start",boxShadow:"base",width:{base:"100%",md:"50%"},p:"4",rounded:"md",bg:"white",children:[" ",(0,z.jsx)(l.D,{as:"h2",size:"lg",textAlign:"center",children:E&&E.name}),(0,z.jsxs)(c.E,{fontSize:"sm",fontWeight:500,bg:(0,d.dU)("green.50","green.900"),p:2,px:3,color:"green.500",rounded:"full",margin:1,children:["Club Status (*",E&&E.registered?"Registered":"Not registered",")"]}),(0,z.jsxs)(c.E,{children:["Coach Highest Rank: ",null===E||void 0===E?void 0:E.coach.belt]}),(0,z.jsxs)(c.E,{children:["Coach Code : ",null===E||void 0===E?void 0:E.coach.admission]}),(0,z.jsxs)(c.E,{children:["Club Unique Identifier: ",null===E||void 0===E?void 0:E.code]})]})]})]}),(0,z.jsx)(u.s,{justifyContent:"center",alignItems:"center",spacing:4,width:"100%",background:"white",children:B&&!E?(0,z.jsxs)(h.B,{width:"100%",p:"6",children:[(0,z.jsx)(m.E,{height:"20px"}),(0,z.jsx)(m.E,{height:"20px"}),(0,z.jsx)(m.E,{height:"20px"})]}):(0,z.jsxs)(z.Fragment,{children:[(0,z.jsxs)(s.az,{display:"flex",flexDir:"column",justifyContent:"space-between",alignItems:"center",p:0,m:1,children:[(0,z.jsx)(g.$,{colorScheme:"teal",size:"md",onClick:async()=>{if(w&&S)try{const e=w._id,t={headers:{Authorization:"Bearer ".concat(w.token)}},{data:n}=await v.A.get("/api/clubs/follow/".concat(S,"/").concat(e),t);D(n)}catch(e){console.error("Error fetching Club:",e),console.log(e)}else F("/dashboard")},children:E&&null!==(t=E.followers)&&void 0!==t&&t.find((e=>e===(null===w||void 0===w?void 0:w._id)))?"Unfollow":"Follow"}),(0,z.jsx)(c.E,{fontSize:"small",children:E&&(null===(n=E.followers)||void 0===n?void 0:n.length)})]}),(0,z.jsxs)(s.az,{display:"flex",flexDir:"column",justifyContent:"center",alignItems:"center",fontSize:"small",p:0,m:1,children:[(0,z.jsx)(x.K,{icon:(0,z.jsx)(f.I,{as:b.Mbv}),colorScheme:E&&E.likes.some((e=>e===(null===w||void 0===w?void 0:w._id)))?"green":"red",size:"md",onClick:async()=>{if(w&&S)try{const e=w._id,t={headers:{Authorization:"Bearer ".concat(w.token)}},{data:n}=await v.A.get("/api/clubs/likes/".concat(S,"/").concat(e),t);D(n)}catch(e){console.error("Error fetching Club:",e),console.log(e)}else F("/dashboard")}}),E&&(null===(C=E.likes)||void 0===C?void 0:C.length)]}),(0,z.jsxs)(s.az,{display:"flex",flexDir:"column",justifyContent:"center",alignItems:"center",fontSize:"small",background:"white",p:0,m:1,children:[" ",(0,z.jsxs)(c.E,{textAlign:"center",mt:-1,background:"white",children:[(0,z.jsx)(_,{user:w,club:E,socket:O}),(0,z.jsx)(x.K,{icon:(0,z.jsx)(f.I,{as:j.yGE}),colorScheme:E&&E.clubRequests.some((e=>e===(null===w||void 0===w?void 0:w._id)))?"green":"blue",size:"md",m:1,isDisabled:E&&(E.members.some((e=>e===(null===w||void 0===w?void 0:w._id)))||E.coach._id===w._id),onClick:async()=>{if(w&&S)if(null!==E&&void 0!==E&&E.membersRequests.some((e=>e._id===(null===w||void 0===w?void 0:w._id))))N({title:"Request to join already sent.",description:"Please wait for Coach to reply."});else try{const e=w._id,t={headers:{Authorization:"Bearer ".concat(w.token)}},{data:n}=await v.A.get("/api/clubs/join/".concat(S,"/").concat(e),t);D(n)}catch(e){console.error("Error accepting join request:",e),console.log(e)}else F("/dashboard")}})]}),(0,z.jsx)(c.E,{textAlign:"center",fontSize:"small",mt:-1,children:null!==E&&void 0!==E&&E.membersRequests.some((e=>e._id===(null===w||void 0===w?void 0:w._id)))?"Sent":"Join"})]})]})}),(0,z.jsx)(s.az,{display:"flex",width:"100%",flexDir:"column",justifyContent:"center",alignItems:"center",background:"white",children:(0,z.jsxs)(s.az,{display:"flex",flexDir:"column",justifyContent:"center",alignItems:"center",width:{base:"100%",md:"60%"},borderColor:"#d142f5",background:"white",overflow:"auto",boxShadow:"base",mt:2,p:"4",rounded:"md",bg:"white",children:[(0,z.jsx)(l.D,{as:"h3",size:"md",mb:2,background:"white",children:"Broadcast Board"}),(0,z.jsxs)(s.az,{display:"flex",flexDir:"column",justifyContent:"center",alignItems:"center",overflowY:"auto",minH:"150px",maxH:"300px",borderRadius:20,width:"100%",overflow:"auto",bg:"white",border:"2px solid white",boxShadow:"dark-lg",p:"6",rounded:"md",children:[q&&0===q.length&&(0,z.jsx)(c.E,{textAlign:"center",children:" No message here."}),q&&q.map((e=>(0,z.jsxs)(c.E,{background:"#92e0a5",textAlign:"center",fontWeight:"bold",fontStyle:"italic",width:{base:"90%",md:"70%"},borderRadius:20,m:2,p:1,children:[(0,z.jsx)(c.E,{fontSize:"small",textDecor:"underline",textColor:"#aa33b0",children:(0,k.A)(e.createdAt)}),e.content]},e._id)))]}),E&&w&&E.coach._id===w._id&&(0,z.jsxs)(s.az,{display:"flex",flexDir:"column",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",overflow:"auto",children:[(0,z.jsxs)(s.az,{display:"flex",flexDir:"column",justifyContent:"center",alignItems:"center",overflowY:"auto",borderRadius:20,height:"150px",width:"100%",p:2,children:[(0,z.jsx)(l.D,{as:"h3",size:"md",m:2,children:"Number of Requests received"}),E&&0===E.membersRequests.length&&(0,z.jsxs)(c.E,{textAlign:"center",children:[" ","All requests have received responses."]}),E&&E.membersRequests.map(((e,t)=>(0,z.jsxs)(g.$,{fontSize:"small",fontWeight:"bold",onClick:()=>(async e=>{if(w&&S)try{const t={headers:{Authorization:"Bearer ".concat(w.token)}},{data:n}=await v.A.get("/api/clubs/accept/".concat(S,"/").concat(e),t);D(n)}catch(t){console.error("Error accepting request:",t),console.log(t)}else F("/dashboard")})(e._id),width:"90%",m:1,children:[t+1,". Accept ",e.name,", Adm:"," ",e.admission," \u2714\ufe0f"]})))]}),(0,z.jsx)(p.T,{width:{base:"80%",md:"60%"},placeholder:"Leave a message for club members...",value:I,onChange:e=>R(e.target.value)}),(0,z.jsx)(g.$,{colorScheme:"blue",size:"sm",mt:2,width:"30%",onClick:async()=>{if(w&&S)if(I)try{const e=w._id,t={headers:{Authorization:"Bearer ".concat(null===w||void 0===w?void 0:w.token)}},{data:n}=await v.A.post("/api/clubs/message/".concat(S,"/").concat(e),{broadcastMessage:I},t);$((e=>[...e,n]))}catch(e){console.error("Error fetching Club:",e),console.log(e)}else N({title:"Please include a message in the text area."});else F("/clubs")},children:"Post Message"})]})]})})]})}},5340:()=>{},9838:()=>{}}]);
//# sourceMappingURL=948.e6969291.chunk.js.map