"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[357],{10554:function(e,n,t){var r=t(90675),s=t(10467),o=t(79722).A.create();o.interceptors.response.use(function(){var e=(0,s.A)((0,r.A)().mark((function e(n){return(0,r.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",n);case 1:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),(function(e){return Promise.reject(e)})),n.A=o},33021:function(e,n,t){t.d(n,{A:function(){return V}});var r=t(5544),s=t(38028),o=t(96870),i=t(85522),a=t(3952),c=t(18876),l=t(20972),d=t(87139),u=t(42703),p=t(15707),h=t(98151),x=t(67918),f=t(71847),b=t(85156),j=t(18842),g=t(50927),m=t(52793),k=t(14929),v=t(11300),C=t(49342),A=t(42369),y=t(49788),w=t(73216),S=t(56818),_=t(90675),I=t(10467),z=t(29301),E=t(39081),$=t(73203),D=t(11054),M=t(76524),F=t(15071),P=t(35929),O=t(67516),N=t(22107),T=t(76659),W=t(56529),B=t(65043),q=t(79722),R=t(47196),Z=t(70579),U=function(){var e=(0,o.j)(),n=e.isOpen,t=e.onOpen,s=e.onClose,i=(0,B.useState)([]),a=(0,r.A)(i,2),c=a[0],l=a[1],d=(0,B.useState)(!1),u=(0,r.A)(d,2),p=u[0],h=u[1],x=(0,S.a)().user,f=(0,w.Zp)(),b=(0,B.useCallback)((0,I.A)((0,_.A)().mark((function e(){var n,t,r;return(0,_.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(x){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,n={headers:{Authorization:"Bearer ".concat(x.token)}},e.next=6,q.A.get("/api/clubs/github/something/".concat(x._id),n);case 6:t=e.sent,r=t.data,l(r),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(2),console.error("Error fetching club requests:",e.t0);case 14:case"end":return e.stop()}}),e,null,[[2,11]])}))),[x]);(0,B.useEffect)((function(){x&&b()}),[x,b]);var j=function(){var e=(0,I.A)((0,_.A)().mark((function e(n){var t,r,s;return(0,_.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(x&&n){e.next=2;break}return e.abrupt("return");case 2:return h(!0),e.prev=3,t={headers:{Authorization:"Bearer ".concat(x.token)}},e.next=7,q.A.get("/api/clubs/decline/request/".concat(n,"/").concat(x._id),t);case 7:r=e.sent,s=r.data,l(s),h(!1),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(3),h(!1),console.error("Error fetching club requests/decline:",e.t0);case 17:case"end":return e.stop()}}),e,null,[[3,13]])})));return function(n){return e.apply(this,arguments)}}();return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(z.$,{backgroundColor:"white",_hover:{backgroundColor:"transparent"},onClick:t,border:"none",children:[(0,Z.jsx)(R.TKI,{fontSize:"20px",border:"none"}),c&&c.length>0&&(0,Z.jsx)(E.E,{position:"absolute",bottom:"70%",right:"70%",transform:"translate(50%, 0)",bg:"red.500",borderRadius:"50%",width:"2px",height:"2px",p:1.5}),(0,Z.jsx)(E.E,{})]}),(0,Z.jsxs)($.aF,{isOpen:n,onClose:s,isCentered:!0,size:"sm",children:[(0,Z.jsx)(D.m,{bg:"blackAlpha.300",backdropFilter:"blur(10px) hue-rotate(90deg)"}),(0,Z.jsxs)(M.$,{children:[(0,Z.jsx)(F.r,{textAlign:"center",children:"Clubs Requests"}),(0,Z.jsx)(P.s,{border:"none"}),(0,Z.jsx)(O.c,{display:"flex",justifyContent:"center",alignItems:"center",flexDir:"column",maxH:"300px",children:c&&c.length>0?c.map((function(e,n){return(0,Z.jsxs)(N.a,{display:"flex",justifyContent:"space-between",alignItems:"center",width:"100%",children:[(0,Z.jsxs)(z.$,{justifyContent:"space-between",onClick:function(){return f("/showclub/".concat(e._id))},border:"none",children:[n+1,". Club Name: ",e.name]},e._id),(0,Z.jsx)(z.$,{background:"#f05e56",onClick:function(){return j(e._id)},border:"none",children:p?(0,Z.jsx)(T.y,{size:"small"}):"Decline"})]},n)})):(0,Z.jsx)(Z.Fragment,{children:(0,Z.jsx)(E.E,{children:"All club requests have been replied to."})})}),(0,Z.jsx)(W.j,{fontSize:"small",textDecor:"underline",children:"These requests were made by club coaches."})]})]})]})},Y=t(32212),H=t(83002),J=t(10202),K=t(96148),L=t(50464),G=function(e){var n=e.isOpen,t=e.onClose,s=(0,B.useState)(""),o=(0,r.A)(s,2),i=o[0],a=o[1],c=(0,B.useState)(""),l=(0,r.A)(c,2),d=l[0],u=l[1],p=(0,w.Zp)();return(0,Z.jsxs)($.aF,{isOpen:n,onClose:t,isCentered:!0,children:[(0,Z.jsx)(D.m,{}),(0,Z.jsxs)(M.$,{children:[(0,Z.jsx)(F.r,{textAlign:"center",children:"Admin Access Verification"}),(0,Z.jsx)(P.s,{}),(0,Z.jsx)(O.c,{children:(0,Z.jsxs)(J.T,{spacing:4,align:"center",children:[(0,Z.jsx)(E.E,{children:"To access the admin page, please enter the passkey."}),(0,Z.jsx)(K.z,{children:(0,Z.jsxs)(L.c,{value:i,onChange:function(e){a(e),u("")},type:"number",autoFocus:!0,children:[(0,Z.jsx)(L.M,{}),(0,Z.jsx)(L.M,{}),(0,Z.jsx)(L.M,{}),(0,Z.jsx)(L.M,{}),(0,Z.jsx)(L.M,{}),(0,Z.jsx)(L.M,{})]})}),d&&(0,Z.jsx)(E.E,{color:"red.500",children:d})]})}),(0,Z.jsx)(W.j,{children:(0,Z.jsx)(z.$,{colorScheme:"blue",onClick:function(){"165432"===i?(p("/admin"),t()):u("Invalid passkey. Please try again.")},width:"full",children:"Enter Admin Passkey"})})]})]})},Q=t(6720);var V=function(){var e=(0,S.a)(),n=e.user,t=e.notification,_=e.setNotification,I=(0,o.j)(),z=I.isOpen,E=I.onOpen,$=I.onClose,D=(0,w.Zp)(),M=(0,B.useState)(!1),F=(0,r.A)(M,2),P=F[0],O=F[1],N=(0,c.A)({base:"none",md:"flex"}),T=(0,c.A)({base:"hidden",md:"visible"});return(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsxs)(i.az,{display:"flex",justifyContent:"space-between",alignItems:"center",bg:"white",w:"100%",p:3,paddingBottom:2,boxShadow:"2xl",zIndex:10,top:0,position:"fixed",children:[(0,Z.jsx)(l._,{src:Y,height:12}),(0,Z.jsxs)(i.az,{display:"flex",justifyContent:"center",alignItems:"center",children:[(0,Z.jsx)(s.$,{backgroundColor:"transparent",border:"none",display:N,visibility:T,_hover:{backgroundColor:"transparent",color:"green.400"},onClick:function(){D("/dashboard")},children:"My Programs"}),(0,Z.jsx)(s.$,{variant:"ghost",display:{base:"none",md:"flex"},border:"none",onClick:E,_hover:{backgroundColor:"transparent",color:"green.400"},children:(0,Z.jsx)(a.E,{px:4,userSelect:"none",children:"Discover"})}),(0,Z.jsx)(U,{})]}),(0,Z.jsxs)("div",{children:[(0,Z.jsxs)(h.W,{children:[(0,Z.jsxs)(x.I,{p:1,position:"relative",border:"none",children:[(0,Z.jsx)(A.X,{fontSize:"2xl",p:0,m:0}),t.length>0&&(0,Z.jsx)(d.E,{variant:"subtle",position:"absolute",top:"-3px",right:"-3px",backgroundColor:"red",zIndex:1,borderRadius:"50%",color:"white",children:t.length})]}),(0,Z.jsxs)(f.c,{pl:2,children:[!t.length&&"No New Messages",t.map((function(e){return(0,Z.jsx)(b.D,{onClick:function(){_(t.filter((function(n){return n!==e})))},p:"4",children:"New message from ".concat(e.sender?e.sender.name:"Coach"," ADM: ").concat(e.sender?e.sender.admission:" ")},e._id)}))]})]}),(0,Z.jsx)(h.W,{children:(0,Z.jsx)(x.I,{as:s.$,bg:"white",border:"none",_hover:{backgroundColor:"transparent"},onClick:E,children:"flex"===N?(0,Z.jsx)(y.e,{size:"sm",cursor:"pointer",name:null===n||void 0===n?void 0:n.name,src:null===n||void 0===n?void 0:n.pic}):(0,Z.jsx)(u.K,{backgroundColor:"transparent",border:"none",icon:(0,Z.jsx)(C.twg,{})})})})]})]}),(0,Z.jsx)(G,{isOpen:P,onClose:function(){return O(!1)}}),(0,Z.jsxs)(j._,{placement:"left",onClose:$,isOpen:z,children:[(0,Z.jsx)(g.m,{bg:"blackAlpha.300",backdropFilter:"blur(10px) hue-rotate(90deg)"}),(0,Z.jsxs)(m.z,{children:[(0,Z.jsxs)(k.r,{borderBottomWidth:"1px",display:"flex",justifyContent:"space-between",children:["Dashboard",(0,Z.jsx)(p.J,{onClick:$,border:"none"})]}),(0,Z.jsxs)(v.c,{display:"flex",flexDir:"column",justifyContent:"start",width:"100%",padding:3,children:[(0,Z.jsxs)(s.$,{display:"flex",justifyContent:"left",alignItems:"center",border:"none",fontSize:"medium",background:"white",_hover:{backgroundColor:"transparent",color:"green"},onClick:function(){return D("/profile")},children:[(0,Z.jsx)(y.e,{size:"sm",cursor:"pointer",name:null===n||void 0===n?void 0:n.name,src:null===n||void 0===n?void 0:n.pic}),(0,Z.jsx)(a.E,{p:2,m:1,children:"Profile"})]}),(0,Z.jsx)(s.$,{justifyContent:"left",border:"none",background:"white",_hover:{backgroundColor:"transparent",color:"blackAlpha.600"},onClick:function(){D("/dashboard"),$()},children:"My Programs"}),(0,Z.jsx)(s.$,{justifyContent:"start",background:"white",border:"none",_hover:{backgroundColor:"transparent",color:"blackAlpha.600"},onClick:function(){D("/clubs"),$()},children:"Clubs"}),(0,Z.jsx)(s.$,{justifyContent:"left",background:"white",border:"none",_hover:{backgroundColor:"transparent",color:"blackAlpha.600"},isDisabled:!(null!==n&&void 0!==n&&n.provinces),onClick:function(){D("/province"),$()},children:"Provincial level"}),(0,Z.jsx)(s.$,{background:"white",justifyContent:"left",border:"none",_hover:{backgroundColor:"transparent",color:"blackAlpha.600"},onClick:function(){D("/national"),$()},children:"National level"}),(0,Z.jsx)(s.$,{background:"white",justifyContent:"left",border:"none",_hover:{backgroundColor:"transparent",color:"blackAlpha.600"},onClick:function(){D("/championships"),$()},children:"International Championship"}),(0,Z.jsxs)(s.$,{background:"white",justifyContent:"left",border:"none",isDisabled:!0,_hover:{backgroundColor:"transparent",color:"blackAlpha.600"},onClick:function(){D("/stream"),$()},children:[(0,Z.jsx)(Q.Md6,{})," \xa0 Streams"]}),(0,Z.jsxs)(s.$,{background:"white",justifyContent:"left",border:"none",_hover:{backgroundColor:"transparent",color:"blackAlpha.600"},onClick:function(){O(!0),$()},children:[(0,Z.jsx)(R.P3Y,{})," \xa0 Admin"]}),(0,Z.jsxs)(s.$,{background:"white",justifyContent:"left",border:"none",_hover:{backgroundColor:"transparent",color:"blackAlpha.600"},onClick:function(){localStorage.removeItem("userInfo"),_([]),D("/")},children:[(0,Z.jsx)(H.TMk,{})," \xa0 Sign out"]})]})]})]})]})}},59357:function(e,n,t){t.r(n);var r=t(60436),s=t(90675),o=t(10467),i=t(5544),a=t(65043),c=t(30502),l=t(22107),d=t(28846),u=t(5371),p=t(82459),h=t(39081),x=t(44093),f=t(10202),b=t(20972),j=t(29301),g=t(76659),m=t(19077),k=t(73225),v=t(76668),C=t(35699),A=t(10804),y=t(33021),w=t(79722),S=t(73216),_=t(10554),I=t(56818),z=t(32620),E=t(6720),$=t(70579);n.default=function(){var e=(0,a.useState)([]),n=(0,i.A)(e,2),t=n[0],D=n[1],M=(0,a.useState)(!1),F=(0,i.A)(M,2),P=F[0],O=F[1],N=(0,a.useState)(!1),T=(0,i.A)(N,2),W=T[0],B=T[1],q=(0,a.useState)(void 0),R=(0,i.A)(q,2),Z=R[0],U=R[1],Y=(0,a.useState)(void 0),H=(0,i.A)(Y,2),J=H[0],K=H[1],L=(0,a.useState)(!1),G=(0,i.A)(L,2),Q=G[0],V=G[1],X=(0,a.useState)(!1),ee=(0,i.A)(X,2),ne=ee[0],te=ee[1],re=(0,a.useState)(""),se=(0,i.A)(re,2),oe=se[0],ie=se[1],ae=(0,a.useState)(""),ce=(0,i.A)(ae,2),le=ce[0],de=ce[1],ue=(0,c.d)(),pe=(0,S.Zp)(),he=(0,I.a)(),xe=he.setMessages,fe=he.user,be=function(e,n,t){if(console.log("Rejected submission with ID: ".concat(e)),te(!0),e&&fe)try{var r={headers:{"Content-type":"application/json",Authorization:"Bearer ".concat(fe.token)}},i={publicIds:[n.split("/").pop().split(".")[0],t.split("/").pop().split(".")[0]]};_.A.post("/api/submit/delete/".concat(e),i,r).then(function(){var e=(0,o.A)((0,s.A)().mark((function e(n){return(0,s.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:D(n.data),te(!0);case 2:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()).catch((function(e){te(!1),e.response&&401===e.response.status&&(ue({title:"Your session has expired",description:"Logging out in less than 8 seconds",duration:8e3,status:"loading",position:"bottom"}),setTimeout((function(){localStorage.removeItem("userInfo"),pe("/")}),8e3))}))}catch(a){te(!1),console.error("Error fetching Club:",a)}},je=(0,a.useCallback)((0,o.A)((0,s.A)().mark((function e(){var n,t,r;return(0,s.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(fe){e.next=2;break}return e.abrupt("return");case 2:if(n={headers:{Authorization:"Bearer ".concat(fe.token)}},!J||!oe){e.next=13;break}return e.prev=4,e.next=7,w.A.get("/api/user/certificate/".concat(oe),{sendCertificate:J},n);case 7:e.next=12;break;case 9:e.prev=9,e.t0=e.catch(4),console.log(e.t0);case 12:return e.abrupt("return");case 13:return e.prev=13,e.next=16,w.A.get("/api/submit",n);case 16:t=e.sent,r=t.data,D(r),e.next=25;break;case 21:e.prev=21,e.t1=e.catch(13),console.log(e.t1),ue({title:"Error Occurred!",status:"error",duration:5e3,isClosable:!0,position:"bottom"});case 25:case"end":return e.stop()}}),e,null,[[4,9],[13,21]])}))),[ue,fe,oe,J]);(0,a.useEffect)((function(){je()}),[je]);var ge=function(){var e=(0,o.A)((0,s.A)().mark((function e(){var n,t,o,i;return(0,s.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(le&&fe&&oe){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,n=fe._id,t={headers:{"Content-type":"application/json",Authorization:"Bearer ".concat(fe.token)}},e.next=7,w.A.post("/api/message",{sender:oe,content:le,userId:n},t);case 7:o=e.sent,i=o.data,de(""),xe((function(e){return[].concat((0,r.A)(e),[i])})),socket.emit("new message",i),e.next=18;break;case 14:e.prev=14,e.t0=e.catch(2),console.log(e.t0),ue({title:"Failed to send the Message",description:"Please try again after some time",status:"error",duration:5e3,isClosable:!0,position:"bottom"});case 18:case"end":return e.stop()}}),e,null,[[2,14]])})));return function(){return e.apply(this,arguments)}}();return(0,$.jsxs)(l.a,{display:"flex",width:"100%",justifyContent:"start",alignItems:"center",flexDir:"column",overflowY:"auto",background:"white",p:"6",children:[" ",(0,$.jsx)(y.A,{}),(0,$.jsxs)(l.a,{display:"flex",justifyContent:"start",alignItems:"center",flexDir:"column",overflow:"auto",width:"100%",minH:"100vh",children:[(0,$.jsxs)(l.a,{mt:20,display:"flex",justifyContent:"space-around",alignItems:"center",width:"100%",mb:"4",children:[(0,$.jsx)(d.D,{children:"W.S.F"}),(0,$.jsxs)(u.s,{children:[(0,$.jsx)(z.QOw,{})," \xa0 ",(0,$.jsx)($.Fragment,{children:"Admin"})]})]}),(0,$.jsx)(p.c,{mb:"4"}),(0,$.jsxs)(l.a,{display:"flex",justifyContent:"center",alignItems:"center",mb:"4",children:[(0,$.jsx)(h.E,{p:"6",children:"Go Live Now"}),(0,$.jsx)(E.Md6,{onClick:function(){pe("/live")},fontSize:"100px",color:"red",cursor:"pointer"})]}),(0,$.jsx)(p.c,{mb:"4"}),(0,$.jsxs)(h.E,{textAlign:"center",fontSize:"sm",fontWeight:500,bg:(0,x.dU)("green.50","green.900"),p:2,width:{base:"100%",md:"60%"},color:"green.500",rounded:"full",mb:"4",children:[t.length," submissions."]}),0===t.length&&(0,$.jsx)(h.E,{mb:"4",textAlign:"center",children:"Work will be posted here."}),t.length>0&&t.map((function(e){return(0,$.jsxs)(f.T,{m:3,spacing:4,children:[(0,$.jsxs)(l.a,{display:"flex",justifyContent:"center",alignItems:"center",ml:2,width:"100%",children:[e.coachAssisted&&(0,$.jsx)(h.E,{fontSize:"sm",fontWeight:500,bg:(0,x.dU)("green.50","green.900"),px:6,p:"3",m:1,color:"green.500",rounded:"full",children:"Coach's assisted student rank upgrading"}),(0,$.jsx)(b._,{src:e.passport,alt:"Passport",width:"100",height:"100"}),(0,$.jsxs)(l.a,{justifyContent:"start",ml:2,textAlign:"start",children:[(0,$.jsxs)(d.D,{size:"md",children:["Name: ",e.student.name," ",e.student.otherName]}),(0,$.jsxs)(h.E,{children:["Admission: ",e.student.admission]}),(0,$.jsxs)(h.E,{children:["Current Rank: ",e.student.belt]})]})]}),(0,$.jsx)(l.a,{children:(0,$.jsx)("video",{controls:!0,width:"300",height:"200",children:(0,$.jsx)("source",{src:e.video,type:"video/mp4"})})}),(0,$.jsxs)(l.a,{display:"flex",width:{base:"90%",md:"60%"},justifyContent:"space-between",children:[" ",(0,$.jsx)(j.$,{isDisabled:P,onClick:function(){B(!0)},colorScheme:"green",children:"Approve"}),(0,$.jsxs)(j.$,{isDisabled:W||e.coachAssisted,onClick:function(){O(!0)},colorScheme:"red",children:[ne&&(0,$.jsx)(g.y,{size:"sm"}),"Reject"]})]}),P&&(0,$.jsxs)($.Fragment,{children:[(0,$.jsx)(m.T,{placeholder:"Please leave a message for student...",value:le,onChange:function(e){return de(e.target.value)}}),(0,$.jsx)(j.$,{onClick:function(){ge(),be(e._id,e.passport,e.video),ie(e.student._id)},children:"Send Message"})]}),W&&(0,$.jsxs)($.Fragment,{children:[" ",(0,$.jsxs)(k.MJ,{isInvalid:!Z,children:[(0,$.jsx)(v.l,{children:"Certificate"}),(0,$.jsx)(C.p,{type:"file",accept:"application/pdf",onChange:function(e){return U(e.target.files[0])}}),Q&&(0,$.jsx)("p",{children:"Uploading passport photo..."}),(0,$.jsx)(A.Wt,{children:"Please select a certificate."})]}),(0,$.jsx)(j.$,{onClick:function(){!function(){Z||ue({title:"Select a certificate please.",status:"info"}),V(!0);var e=new FormData;e.append("file",Z),e.append("upload_preset","worldsamma"),fetch("https://api.cloudinary.com/v1_1/dsdlgmgwi/image/upload",{method:"post",body:e}).then((function(e){return e.json()})).then((function(e){K(e.url),V(!1)})).catch((function(e){V(!1),ue({title:"Error Occurred uploading your passport photo.",description:"Please try again later.",duration:5e3,status:"error"})}))}(),be(e._id,e.passport,e.video),ie(e.student._id)},children:"Submit"})]})]},e._id)}))]})]})}},32212:function(e,n,t){e.exports=t.p+"static/media/final.bb3e38731f3994d71217.jpeg"}}]);
//# sourceMappingURL=357.9e237d78.chunk.js.map