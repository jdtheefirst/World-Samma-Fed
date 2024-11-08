"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[42],{35042:function(e,n,s){s.r(n);var c=s(5544),o=s(65043),t=(s(58650),s(51064)),r=s(60184),l=s(70579);n.default=function(){var e=(0,o.useState)(null),n=(0,c.A)(e,2),s=n[0],i=n[1],u=(0,o.useState)(null),a=(0,c.A)(u,2),d=a[0],f=a[1],g=(0,o.useState)(!1),h=(0,c.A)(g,2),m=h[0],p=h[1],v=(0,o.useState)(!1),b=(0,c.A)(v,2),j=b[0],S=b[1],x=(0,o.useState)(!1),k=(0,c.A)(x,2),N=k[0],w=k[1],R=(0,o.useRef)(null),C=(0,o.useRef)(null);(0,o.useEffect)((function(){return C.current||(C.current=new WebSocket("ws://janus:8188"),C.current.onopen=function(){console.log("WebSocket connected"),w(!0)},C.current.onclose=function(){console.log("WebSocket closed"),w(!1)},C.current.onerror=function(e){console.error("WebSocket error",e)}),function(){C.current&&C.current.close()}}),[]),(0,o.useEffect)((function(){return N&&t.A.init({debug:"all",callback:function(){var e=new t.A({server:"ws://janus:8188",success:function(){P(e)},error:function(e){console.error("Janus error:",e)}});i(e)}}),function(){s&&s.destroy()}}),[N]);var P=function(e){e.attach({plugin:"janus.plugin.rtmp",success:function(e){f(e),console.log("RTMP plugin attached!")},error:function(e){console.error("Error attaching RTMP plugin:",e)},webrtcState:function(e){S(e),console.log("WebRTC peer connection is ",e?"up":"down")},onmessage:function(e,n){console.log("Message received from RTMP plugin:",e)},onlocalstream:function(e){R.current.srcObject=e}})};return(0,l.jsxs)("div",{className:"streaming-container",children:[(0,l.jsxs)("div",{className:"video-wrapper",children:[(0,l.jsx)("video",{ref:R,autoPlay:!0,muted:!0,className:"video-feed"}),!j&&(0,l.jsx)("div",{className:"overlay",children:"Connecting..."})]}),(0,l.jsxs)("div",{className:"control-panel",children:[(0,l.jsx)("h2",{children:"Live Stream Control"}),(0,l.jsxs)("div",{className:"status-indicators",children:[(0,l.jsx)("div",{className:"status ".concat(j?"connected":"disconnected"),children:j?"Connected":"Disconnected"}),(0,l.jsx)("div",{className:"status ".concat(m?"live":"idle"),children:m?"Live":"Idle"})]}),(0,l.jsxs)("div",{className:"controls",children:[(0,l.jsxs)("button",{onClick:function(){if(d){d.publish({stream:"rtmp://nginx:1935/stream",success:function(){console.log("Publishing to RTMP successfully!"),p(!0)},error:function(e){console.error("Error publishing to RTMP:",e)}})}else console.error("RTMP plugin not attached.")},disabled:m,className:"start-btn",children:[(0,l.jsx)(r.gSK,{})," Start Streaming"]}),(0,l.jsxs)("button",{onClick:function(){d&&(d.hangup(),p(!1))},disabled:!m,className:"stop-btn",children:[(0,l.jsx)(r.wFo,{})," Stop Streaming"]})]})]})]})}}}]);
//# sourceMappingURL=42.2e603013.chunk.js.map