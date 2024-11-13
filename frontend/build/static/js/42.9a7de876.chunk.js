"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[42],{35042:function(e,n,o){o.r(n);var r=o(90675),c=o(10467),t=o(5544),s=o(65043),u=o(60184),i=o(51064),l=o(70579);n.default=function(){var e=(0,s.useState)(null),n=(0,t.A)(e,2),o=n[0],a=n[1],d=(0,s.useState)(null),f=(0,t.A)(d,2),b=f[0],g=f[1],p=(0,s.useState)(!1),S=(0,t.A)(p,2),v=S[0],k=S[1],m=(0,s.useState)(!1),h=(0,t.A)(m,2),W=h[0],w=h[1],j=(0,s.useState)(!1),x=(0,t.A)(j,2),P=x[0],N=x[1],R=(0,s.useRef)(null),A=(0,s.useRef)(null),C=(0,s.useRef)(null),T=new WebSocket("ws://167.99.44.195/ws/");T.onopen=function(){return console.log("WebSocket connected to ip")},T.onerror=function(e){return console.error("WebSocket error ip",e)},T.onclose=function(){return console.log("WebSocket closed ip")};var M=new WebSocket("ws://167.99.44.195:8188");M.onopen=function(){return console.log("WebSocket connected to ip:8188")},M.onerror=function(e){return console.error("WebSocket error ip:8188",e)},M.onclose=function(){return console.log("WebSocket closed ip:8188")};var E=new WebSocket("ws://janus:8188");E.onopen=function(){return console.log("WebSocket connected to janus")},E.onerror=function(e){return console.error("WebSocket error janus",e)},E.onclose=function(){return console.log("WebSocket closed janus")};var y=new WebSocket("ws://172.18.0.2:8188");y.onopen=function(){return console.log("WebSocket connected to IP 172")},y.onerror=function(e){return console.error("WebSocket error on IP 172",e)},y.onclose=function(){return console.log("WebSocket closed on IP 172")};var I=new WebSocket("ws://172.18.0.2");I.onopen=function(){return console.log("WebSocket connected to So")},I.onerror=function(e){return console.error("WebSocket error on So",e)},I.onclose=function(){return console.log("WebSocket closed on IP So")},(0,s.useEffect)((function(){return C.current||(C.current=new WebSocket("/ws/"),C.current.onopen=function(){N(!0),console.log("WebSocket connected to Janus")},C.current.onclose=function(){N(!1),console.log("WebSocket closed Janus connection")},C.current.onerror=function(e){console.error("WebSocket error",e)}),function(){C.current&&C.current.close()}}),[]),(0,s.useEffect)((function(){return P&&i.A.init({debug:"all",callback:function(){var e=new i.A({server:"/ws/",success:function(){J(e)},error:function(e){console.error("Janus error:",e)}});a(e)}}),function(){o&&o.destroy()}}),[P]);var J=function(e){e.attach({plugin:"janus.plugin.rtmp",success:function(e){g(e),console.log("RTMP plugin attached!"),O()},error:function(e){console.error("Error attaching RTMP plugin:",e)},webrtcState:function(e){w(e),console.log("WebRTC peer connection is ",e?"up":"down")},onmessage:function(e,n){console.log("Message received from RTMP plugin:",e)},onlocalstream:function(e){R.current.srcObject=e}})},O=function(){var e=(0,c.A)((0,r.A)().mark((function e(){var n;return(0,r.A)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,navigator.mediaDevices.getUserMedia({video:!0,audio:!0});case 3:n=e.sent,R.current.srcObject=n,A.current=n,b&&b.createOffer({media:{video:!0,audio:!0,data:!1},stream:A.current,success:function(e){b.send({message:{request:"configure",audio:!0,video:!0},jsep:e})},error:function(e){console.error("Error creating WebRTC offer:",e)}}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error("Error accessing user media:",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();return(0,l.jsxs)("div",{className:"streaming-container",children:[(0,l.jsxs)("div",{className:"video-wrapper",children:[(0,l.jsx)("video",{ref:R,autoPlay:!0,muted:!0,className:"video-feed"}),!W&&(0,l.jsx)("div",{className:"overlay",children:"Connecting..."})]}),(0,l.jsxs)("div",{className:"control-panel",children:[(0,l.jsx)("h2",{children:"Live Stream Control"}),(0,l.jsxs)("div",{className:"status-indicators",children:[(0,l.jsx)("div",{className:"status ".concat(W?"connected":"disconnected"),children:W?"Connected":"Disconnected"}),(0,l.jsx)("div",{className:"status ".concat(v?"live":"idle"),children:v?"Live":"Idle"})]}),(0,l.jsxs)("div",{className:"controls",children:[(0,l.jsxs)("button",{onClick:function(){if(b){b.send({message:{request:"publish",rtmp_url:"rtmp://nginx/stream"},success:function(){console.log("Publishing to RTMP successfully!"),k(!0)},error:function(e){console.error("Error publishing to RTMP:",e)}})}else console.error("RTMP plugin not attached.")},disabled:v,className:"start-btn",children:[(0,l.jsx)(u.gSK,{})," Start Streaming"]}),(0,l.jsxs)("button",{onClick:function(){b&&(b.hangup(),k(!1),A.current&&A.current.getTracks().forEach((function(e){return e.stop()})))},disabled:!v,className:"stop-btn",children:[(0,l.jsx)(u.wFo,{})," Stop Streaming"]})]})]})]})}}}]);
//# sourceMappingURL=42.9a7de876.chunk.js.map