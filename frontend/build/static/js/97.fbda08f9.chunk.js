"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[97],{20200:function(e,n){n.A=function(e){var n=new Date(e),r=new Date-n,t=Math.floor(r/1e3),o=Math.floor(t/60),s=Math.floor(o/60),i=Math.floor(s/24);if(t<60)return"Just now";if(o<60)return"".concat(o," minute").concat(1===o?"":"s"," ago");if(s<24)return"".concat(s," hour").concat(1===s?"":"s"," ago");if(1===i)return"Yesterday";if(i<7)return"".concat(i," day").concat(1===i?"":"s"," ago");return n.toLocaleDateString("en-US",{hour:"numeric",minute:"numeric",month:"long",day:"numeric",year:"numeric"})}},48024:function(e,n,r){r.d(n,{A:function(){return P}});var t=r(38028),o=r(41221),s=r(85522),i=r(3952),a=r(27426),c=r(31377),l=r(58360),d=r(39627),u=r(51273),h=r(98151),f=r(67918),p=r(71847),x=r(85156),b=r(18842),m=r(50927),g=r(65851),v=r(14929),j=r(11300),k=r(49342),C=r(32257),w=r(31823),A=r(73216),y=r(56818),z=r(90675),_=r(10467),S=r(5544),E=r(45532),D=r(4007),I=r(43984),q=r(3224),R=r(6642),$=r(65043),B=r(79722),M=r(47196),N=r(70579),F=function(){var e=(0,o.j)(),n=e.isOpen,r=e.onOpen,a=e.onClose,c=(0,$.useState)([]),l=(0,S.A)(c,2),d=l[0],u=l[1],h=(0,$.useState)(!1),f=(0,S.A)(h,2),p=f[0],x=f[1],b=(0,y.a)().user,g=(0,A.Zp)(),k=(0,$.useCallback)((0,_.A)((0,z.A)().mark((function e(){var n,r,t;return(0,z.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(b){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,n={headers:{Authorization:"Bearer ".concat(b.token)}},e.next=6,B.A.get("/api/clubs/github/something/".concat(b._id),n);case 6:r=e.sent,t=r.data,u(t),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(2),console.error("Error fetching club requests:",e.t0);case 14:case"end":return e.stop()}}),e,null,[[2,11]])}))),[b]);(0,$.useEffect)((function(){b&&k()}),[b,k]);var C=function(){var e=(0,_.A)((0,z.A)().mark((function e(n){var r,t,o;return(0,z.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(b&&n){e.next=2;break}return e.abrupt("return");case 2:return x(!0),e.prev=3,r={headers:{Authorization:"Bearer ".concat(b.token)}},e.next=7,B.A.get("/api/clubs/decline/request/".concat(n,"/").concat(b._id),r);case 7:t=e.sent,o=t.data,u(o),x(!1),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(3),x(!1),console.error("Error fetching club requests/decline:",e.t0);case 17:case"end":return e.stop()}}),e,null,[[3,13]])})));return function(n){return e.apply(this,arguments)}}();return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)(t.$,{backgroundColor:"white",_hover:{backgroundColor:"transparent"},onClick:r,border:"none",children:[(0,N.jsx)(M.TKI,{fontSize:"20px",border:"none"}),d&&d.length>0&&(0,N.jsx)(i.E,{position:"absolute",bottom:"70%",right:"70%",transform:"translate(50%, 0)",bg:"red.500",borderRadius:"50%",width:"2px",height:"2px",p:1.5}),(0,N.jsx)(i.E,{})]}),(0,N.jsxs)(E.aF,{isOpen:n,onClose:a,children:[(0,N.jsx)(m.m,{bg:"blackAlpha.300",backdropFilter:"blur(10px) hue-rotate(90deg)"}),(0,N.jsxs)(D.$,{children:[(0,N.jsx)(v.r,{textAlign:"center",children:"Clubs Requests"}),(0,N.jsx)(I.s,{border:"none"}),(0,N.jsx)(j.c,{display:"flex",justifyContent:"center",alignItems:"center",flexDir:"column",maxH:"300px",children:d&&d.length>0?d.map((function(e,n){return(0,N.jsxs)(s.az,{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",children:[(0,N.jsxs)(t.$,{justifyContent:"space-between",onClick:function(){return g("/showclub/".concat(e._id))},border:"none",children:[n+1,". Club Name: ",e.name]},e._id),(0,N.jsx)(t.$,{background:"#f05e56",onClick:function(){return C(e._id)},border:"none",children:p?(0,N.jsx)(q.y,{size:"small"}):"Decline"})]},n)})):(0,N.jsx)(N.Fragment,{children:(0,N.jsx)(i.E,{children:"All club requests have been replied to."})})}),(0,N.jsx)(R.j,{fontSize:"small",textDecor:"underline",children:"These requests were made by club coaches."})]})]})]})},O=r(29867);var P=function(){var e=(0,y.a)(),n=e.user,r=e.notification,z=e.setNotification,_=(0,o.j)(),S=_.isOpen,E=_.onOpen,D=_.onClose,I=(0,A.Zp)(),q=(0,a.A)({base:"none",md:"flex"}),R=(0,a.A)({base:"hidden",md:"visible"});return(0,N.jsxs)(N.Fragment,{children:[(0,N.jsxs)(s.az,{display:"flex",justifyContent:"space-between",alignItems:"center",bg:"white",w:"100%",p:3,paddingBottom:2,boxShadow:"2xl",zIndex:10,top:0,position:"fixed",children:[(0,N.jsx)(c._,{src:O,height:12}),(0,N.jsxs)(s.az,{display:"flex",justifyContent:"center",alignItems:"center",children:[(0,N.jsx)(t.$,{backgroundColor:"transparent",border:"none",display:q,visibility:R,_hover:{backgroundColor:"transparent",color:"green.400"},onClick:function(){I("/dashboard")},children:"My Programs"}),(0,N.jsx)(t.$,{variant:"ghost",display:{base:"none",md:"flex"},border:"none",onClick:E,_hover:{backgroundColor:"transparent",color:"green.400"},children:(0,N.jsx)(i.E,{px:4,userSelect:"none",children:"Discover"})}),(0,N.jsx)(F,{})]}),(0,N.jsxs)("div",{children:[(0,N.jsxs)(h.W,{children:[(0,N.jsxs)(f.I,{p:1,position:"relative",border:"none",children:[(0,N.jsx)(C.X,{fontSize:"2xl",p:0,m:0}),r.length>0&&(0,N.jsx)(l.E,{variant:"subtle",position:"absolute",top:"-3px",right:"-3px",backgroundColor:"red",zIndex:1,borderRadius:"50%",color:"white",children:r.length})]}),(0,N.jsxs)(p.c,{pl:2,children:[!r.length&&"No New Messages",r.map((function(e){return(0,N.jsx)(x.D,{onClick:function(){z(r.filter((function(n){return n!==e})))},children:"New Message from ".concat(e.sender?e.sender.name:"Coach"," ADM: ").concat(e.sender?e.sender.admission:" ")},e._id)}))]})]}),(0,N.jsx)(h.W,{children:(0,N.jsx)(f.I,{as:t.$,bg:"white",border:"none",_hover:{backgroundColor:"transparent"},onClick:E,children:"flex"===q?(0,N.jsx)(w.e,{size:"sm",cursor:"pointer",name:null===n||void 0===n?void 0:n.name,src:null===n||void 0===n?void 0:n.pic}):(0,N.jsx)(d.K,{backgroundColor:"transparent",border:"none",icon:(0,N.jsx)(k.twg,{})})})})]})]}),(0,N.jsxs)(b._,{placement:"left",onClose:D,isOpen:S,children:[(0,N.jsx)(m.m,{bg:"blackAlpha.300",backdropFilter:"blur(10px) hue-rotate(90deg)"}),(0,N.jsxs)(g.z,{children:[(0,N.jsxs)(v.r,{borderBottomWidth:"1px",display:"flex",justifyContent:"space-between",children:["Dashboard",(0,N.jsx)(u.J,{onClick:D,border:"none"})]}),(0,N.jsxs)(j.c,{display:"flex",flexDir:"column",justifyContent:"space-between",width:"100%",children:[(0,N.jsxs)(s.az,{padding:3,display:"flex",justifyContent:"space-around",flexDir:"column",children:[(0,N.jsxs)(t.$,{display:"flex",justifyContent:"left",alignItems:"center",border:"none",background:"white",m:1,_hover:{backgroundColor:"transparent",color:"green"},onClick:function(){return I("/profile")},children:[(0,N.jsx)(w.e,{size:"sm",cursor:"pointer",name:null===n||void 0===n?void 0:n.name,src:null===n||void 0===n?void 0:n.pic}),(0,N.jsx)(i.E,{p:2,m:1,children:"Profile"})]}),(0,N.jsx)(t.$,{justifyContent:"left",border:"none",background:"white",_hover:{backgroundColor:"transparent",color:"green"},onClick:function(){I("/dashboard"),D()},children:"My Programs"}),(0,N.jsx)(t.$,{justifyContent:"start",background:"white",border:"none",_hover:{backgroundColor:"transparent",color:"green"},onClick:function(){I("/clubs"),D()},children:"Clubs"}),(0,N.jsx)(t.$,{justifyContent:"left",background:"white",border:"none",_hover:{backgroundColor:"transparent",color:"green"},isDisabled:!(null!==n&&void 0!==n&&n.provinces),onClick:function(){I("/province"),D()},children:"Provincial level"}),(0,N.jsx)(t.$,{background:"white",justifyContent:"left",border:"none",_hover:{backgroundColor:"transparent",color:"green"},onClick:function(){I("/national"),D()},children:"National level"}),(0,N.jsx)(t.$,{background:"white",justifyContent:"left",border:"none",_hover:{backgroundColor:"transparent",color:"green"},onClick:function(){I("/championships")},children:"International Championship"})]}),(0,N.jsx)(t.$,{border:"none",onClick:function(){localStorage.removeItem("userInfo"),z([]),I("/")},children:"Log out"})]})]})]})]})}},38097:function(e,n,r){r.r(n);var t=r(60436),o=r(90675),s=r(10467),i=r(5544),a=r(65043),c=r(73216),l=r(93748),d=r(85522),u=r(31377),h=r(14377),f=r(3952),p=r(17118),x=r(41918),b=r(94202),m=r(786),g=r(38028),v=r(39627),j=r(53768),k=r(25695),C=r(60184),w=r(70686),A=r(79722),y=r(48024),z=r(20200),_=r(23156),S=r(70579);n.default=function(e){var n,r,E,D=e.user,I=(0,c.g)().clubId,q=(0,a.useState)(null),R=(0,i.A)(q,2),$=R[0],B=R[1],M=(0,a.useState)(""),N=(0,i.A)(M,2),F=N[0],O=N[1],P=(0,a.useState)([]),W=(0,i.A)(P,2),H=W[0],K=W[1],T=(0,a.useState)(!1),U=(0,i.A)(T,2),J=U[0],L=U[1],Y=(0,c.Zp)(),Z=(0,l.d)(),G=(0,a.useCallback)((0,s.A)((0,o.A)().mark((function e(){var n,r,t;return(0,o.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(D&&I){e.next=3;break}return Y("/dashboard"),e.abrupt("return");case 3:return L(!0),e.prev=4,n={headers:{Authorization:"Bearer ".concat(D.token)}},e.next=8,A.A.get("/api/clubs/".concat(I),n);case 8:r=e.sent,t=r.data,B(t),L(!1),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(4),L(!1),console.error("Error fetching Club:",e.t0);case 18:case"end":return e.stop()}}),e,null,[[4,14]])}))),[null===D||void 0===D?void 0:D.token,B,I]),X=(0,a.useCallback)((0,s.A)((0,o.A)().mark((function e(){var n,r,t,s;return(0,o.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(I){e.next=3;break}return Y("/dashboard"),e.abrupt("return");case 3:return L(!0),e.prev=4,n=D._id,r={headers:{Authorization:"Bearer ".concat(D.token)}},e.next=9,A.A.get("/api/clubs/broadcast/".concat(I,"/").concat(n),r);case 9:t=e.sent,s=t.data,K(s),O(""),L(!1),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(4),console.error("Error fetching BroadcastMessages:",e.t0),console.log(e.t0);case 20:case"end":return e.stop()}}),e,null,[[4,16]])}))),[D,null===D||void 0===D?void 0:D.token,I,O]);(0,a.useEffect)((function(){D&&(G(),X())}),[D,G,X]);var Q=function(){var e=(0,s.A)((0,o.A)().mark((function e(){var n,r,t,s;return(0,o.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(D&&I){e.next=3;break}return Y("/dashboard"),e.abrupt("return");case 3:return e.prev=3,n=D._id,r={headers:{Authorization:"Bearer ".concat(D.token)}},e.next=8,A.A.get("/api/clubs/follow/".concat(I,"/").concat(n),r);case 8:t=e.sent,s=t.data,B(s),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(3),console.error("Error fetching Club:",e.t0),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[3,13]])})));return function(){return e.apply(this,arguments)}}(),V=function(){var e=(0,s.A)((0,o.A)().mark((function e(){var n,r,t,s;return(0,o.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(D&&I){e.next=3;break}return Y("/dashboard"),e.abrupt("return");case 3:return e.prev=3,n=D._id,r={headers:{Authorization:"Bearer ".concat(D.token)}},e.next=8,A.A.get("/api/clubs/likes/".concat(I,"/").concat(n),r);case 8:t=e.sent,s=t.data,B(s),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(3),console.error("Error fetching Club:",e.t0),console.log(e.t0);case 17:case"end":return e.stop()}}),e,null,[[3,13]])})));return function(){return e.apply(this,arguments)}}(),ee=function(){var e=(0,s.A)((0,o.A)().mark((function e(){var n,r,s,i;return(0,o.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(D&&I){e.next=3;break}return Y("/clubs"),e.abrupt("return");case 3:if(F){e.next=6;break}return Z({title:"Please include a message in the text area."}),e.abrupt("return");case 6:return e.prev=6,n=D._id,r={headers:{Authorization:"Bearer ".concat(null===D||void 0===D?void 0:D.token)}},e.next=11,A.A.post("/api/clubs/message/".concat(I,"/").concat(n),{broadcastMessage:F},r);case 11:s=e.sent,i=s.data,K((function(e){return[].concat((0,t.A)(e),[i])})),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(6),console.error("Error fetching Club:",e.t0),console.log(e.t0);case 20:case"end":return e.stop()}}),e,null,[[6,16]])})));return function(){return e.apply(this,arguments)}}(),ne=function(){var e=(0,s.A)((0,o.A)().mark((function e(n){var r,t,s;return(0,o.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(D&&I){e.next=3;break}return Y("/dashboard"),e.abrupt("return");case 3:return e.prev=3,r={headers:{Authorization:"Bearer ".concat(D.token)}},e.next=7,A.A.get("/api/clubs/accept/".concat(I,"/").concat(n),r);case 7:t=e.sent,s=t.data,B(s),e.next=16;break;case 12:e.prev=12,e.t0=e.catch(3),console.error("Error accepting request:",e.t0),console.log(e.t0);case 16:case"end":return e.stop()}}),e,null,[[3,12]])})));return function(n){return e.apply(this,arguments)}}(),re=function(){var e=(0,s.A)((0,o.A)().mark((function e(){var n,r,t,s;return(0,o.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(D&&I){e.next=3;break}return Y("/dashboard"),e.abrupt("return");case 3:if(null===$||void 0===$||!$.membersRequests.some((function(e){return e._id===(null===D||void 0===D?void 0:D._id)}))){e.next=6;break}return Z({title:"Request to join already sent.",description:"Please wait for Coach to reply."}),e.abrupt("return");case 6:return e.prev=6,n=D._id,r={headers:{Authorization:"Bearer ".concat(D.token)}},e.next=11,A.A.get("/api/clubs/join/".concat(I,"/").concat(n),r);case 11:t=e.sent,s=t.data,B(s),e.next=20;break;case 16:e.prev=16,e.t0=e.catch(6),console.error("Error accepting join request:",e.t0),console.log(e.t0);case 20:case"end":return e.stop()}}),e,null,[[6,16]])})));return function(){return e.apply(this,arguments)}}();return(0,S.jsxs)(d.az,{display:"flex",flexDir:"column",justifyContent:"start",alignItems:"center",width:"100%",background:"whitesmoke",minH:"100vh",overflow:"auto",children:[(0,S.jsx)(y.A,{}),(0,S.jsxs)(d.az,{display:"flex",flexDir:"column",justifyContent:"center",alignItems:"center",width:"100%",mt:20,background:"whitesmoke",children:[(0,S.jsx)(u._,{src:"https://res.cloudinary.com/dsdlgmgwi/image/upload/v1713518908/Samma_pkmq5v.png",alt:"Background",top:0,borderRadius:"20",width:"100%"}),(0,S.jsxs)(d.az,{display:"flex",top:10,left:{base:"0",md:"30%"},textAlign:"center",width:"100%",p:4,children:[(0,S.jsx)(u._,{src:null===$||void 0===$?void 0:$.coach.pic,marginTop:-10,alt:"*Coach profile pic",borderRadius:"full",boxSize:{base:"100px",md:"200px"},border:"4px solid white"}),(0,S.jsxs)(d.az,{display:"flex",flexDir:"column",textAlign:"start",boxShadow:"base",width:{base:"100%",md:"50%"},p:"4",rounded:"md",fontSize:"small",bg:"whitesmoke",children:[" ",(0,S.jsx)(h.D,{as:"h2",size:"sm",textAlign:"center",children:$&&$.name}),(0,S.jsxs)(f.E,{fontSize:"sm",fontWeight:500,bg:(0,p.dU)("green.50","green.900"),p:2,px:3,color:"green.500",rounded:"full",margin:1,children:["Club Status (*",$&&$.registered?"Registered":"Not registered",")"]}),(0,S.jsxs)(f.E,{children:["Coach Name: ",(0,S.jsx)("strong",{children:null===$||void 0===$?void 0:$.coach.name})]}),(0,S.jsxs)(d.az,{display:"flex",children:["Coach Highest Rank: ",(0,S.jsxs)("strong",{children:["\xa0",null===$||void 0===$?void 0:$.coach.belt]}),(0,S.jsx)(_.wO6,{style:{color:"red",padding:"2",fontSize:"22px"}})]}),(0,S.jsxs)(f.E,{children:["Coach Code : ",(0,S.jsx)("strong",{children:null===$||void 0===$?void 0:$.coach.admission})]}),(0,S.jsxs)(f.E,{children:["Club Unique Identifier: ",(0,S.jsx)("strong",{children:null===$||void 0===$?void 0:$.code})]})]})]})]}),(0,S.jsx)(x.s,{justifyContent:"center",alignItems:"center",spacing:4,width:"100%",background:"whitesmoke",children:J&&!$?(0,S.jsxs)(b.B,{width:"100%",p:"6",children:[(0,S.jsx)(m.E,{height:"20px"}),(0,S.jsx)(m.E,{height:"20px"}),(0,S.jsx)(m.E,{height:"20px"})]}):(0,S.jsxs)(S.Fragment,{children:[(0,S.jsxs)(d.az,{display:"flex",flexDir:"column",justifyContent:"space-between",alignItems:"center",p:0,m:1,children:[(0,S.jsx)(g.$,{colorScheme:"teal",size:"sm",fontSize:"small",onClick:Q,children:$&&null!==(n=$.followers)&&void 0!==n&&n.find((function(e){return e===(null===D||void 0===D?void 0:D._id)}))?"Unfollow":"Follow"}),(0,S.jsx)(f.E,{fontSize:"small",children:$&&(null===(r=$.followers)||void 0===r?void 0:r.length)})]}),(0,S.jsxs)(d.az,{display:"flex",flexDir:"column",justifyContent:"center",alignItems:"center",fontSize:"small",p:0,m:1,children:[(0,S.jsx)(v.K,{icon:(0,S.jsx)(j.I,{as:C.Mbv}),colorScheme:$&&$.likes.some((function(e){return e===(null===D||void 0===D?void 0:D._id)}))?"green":"red",size:"sm",onClick:V}),$&&(null===(E=$.likes)||void 0===E?void 0:E.length)]}),(0,S.jsxs)(d.az,{display:"flex",flexDir:"column",justifyContent:"center",alignItems:"center",fontSize:"small",p:0,m:1,children:[(0,S.jsx)(v.K,{icon:(0,S.jsx)(j.I,{as:w.yGE}),colorScheme:$&&$.clubRequests.some((function(e){return e===(null===D||void 0===D?void 0:D._id)}))?"green":"blue",size:"sm",m:1,isDisabled:$&&($.members.some((function(e){return e===(null===D||void 0===D?void 0:D._id)}))||$.coach._id===D._id),onClick:re}),(0,S.jsx)(f.E,{textAlign:"center",fontSize:"small",mt:-1,children:null!==$&&void 0!==$&&$.membersRequests.some((function(e){return e._id===(null===D||void 0===D?void 0:D._id)}))?"Sent":"Join"})]})]})}),(0,S.jsx)(d.az,{display:"flex",width:"100%",flexDir:"column",justifyContent:"center",alignItems:"center",children:(0,S.jsxs)(d.az,{display:"flex",flexDir:"column",justifyContent:"center",alignItems:"center",width:{base:"100%",md:"60%"},borderColor:"#d142f5",overflow:"auto",mt:2,p:"4",children:[(0,S.jsx)(h.D,{as:"h3",size:"sm",mb:2,children:"Broadcast Board"}),(0,S.jsxs)(d.az,{display:"flex",flexDir:"column",justifyContent:"center",alignItems:"center",overflowY:"auto",minH:"150px",maxH:"300px",borderRadius:20,width:"100%",overflow:"auto",border:"2px solid grey",fontSize:"small",p:"6",rounded:"md",children:[H&&0===H.length&&(0,S.jsx)(f.E,{textAlign:"center",children:" No message here."}),H&&H.map((function(e){return(0,S.jsxs)(d.az,{background:"#92e0a5",textAlign:"center",fontWeight:"bold",fontStyle:"italic",width:{base:"90%",md:"70%"},borderRadius:20,m:2,p:1,children:[(0,S.jsx)(f.E,{fontSize:"small",textDecor:"underline",textColor:"#aa33b0",children:(0,z.A)(e.createdAt)}),e.content]},e._id)}))]}),$&&D&&$.coach._id===D._id&&(0,S.jsxs)(d.az,{display:"flex",flexDir:"column",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",overflow:"auto",children:[(0,S.jsxs)(d.az,{display:"flex",flexDir:"column",justifyContent:"center",alignItems:"center",overflowY:"auto",borderRadius:20,height:"150px",width:"100%",p:2,children:[(0,S.jsx)(h.D,{as:"h3",size:"sm",m:2,children:"Number of Requests received"}),$&&0===$.membersRequests.length&&(0,S.jsxs)(f.E,{textAlign:"center",fontSize:"small",children:[" ","All requests have received responses."]}),$&&$.membersRequests.map((function(e,n){return(0,S.jsxs)(g.$,{fontSize:"small",fontWeight:"bold",onClick:function(){return ne(e._id)},width:"90%",m:1,children:[n+1,". Accept ",e.name,", Adm:"," ",e.admission," \u2714\ufe0f"]})}))]}),(0,S.jsx)(k.T,{width:{base:"80%",md:"60%"},placeholder:"Leave a message for club members...",value:F,onChange:function(e){return O(e.target.value)}}),(0,S.jsx)(g.$,{colorScheme:"blue",size:"sm",mt:2,width:"30%",onClick:ee,children:"Post Message"})]})]})})]})}},29867:function(e,n,r){e.exports=r.p+"static/media/final.bb3e38731f3994d71217.jpeg"}}]);
//# sourceMappingURL=97.fbda08f9.chunk.js.map