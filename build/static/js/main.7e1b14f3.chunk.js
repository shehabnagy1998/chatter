(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{2:function(e,t){e.exports={SET_SOCKET:"SET_SOCKET",SET_NICKNAME:"SET_NICKNAME",VERIFIY_USER:"VERIFIY_USER",SET_ERROR:"SET_ERROR",CREATE_USER:"CREATE_USER",TYPING:"TYPING",RECIVE_TYPING:"RECIVE_TYPING",SET_TYPING:"SET_TYPING",SET_MESSAGE:"SET_MESSAGE",SEND_MESSAGE:"SEND_MESSAGE",RECIVE_MESSAGE:"RECIVE_MESSAGE",SEND_PMESSAGE:"SEND_PMESSAGE",RECIVE_PMESSAGE:"RECIVE_PMESSAGE",RECIVE_ONLINE:"RECIVE_ONLINE",UPDATE_USERS:"UPDATE_USERS",CHAT_WITH:"CHAT_WITH"}},56:function(e,t,n){e.exports=n(98)},86:function(e,t){},93:function(e,t,n){},98:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),r=n(47),s=n.n(r),i=n(8),o=n(9),l=n(11),u=n(10),m=n(12),E=n(48),h=n.n(E),p=n(4),f=n(2),g=function(e){return function(t,n){t({type:f.CHAT_WITH,val:e})}},S=function(e,t){return function(n){n({type:f.SEND_MESSAGE,val:{dest:e,cont:t}})}},v=n(102),b=n(99),d=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(c)))).handleChange=function(e){n.props.setNickname(e.target.value)},n.handleClick=function(e){var t=n.props,a=t.nickname,c=t.setError,r=t.verifiyUser;n.userPattern.test(a)?r(n.props.history):c("nickname must be min 3 chars and max 10")},n.handleKeyPress=function(e){13===e.charCode&&(e.preventDefault(),n.handleClick(e))},n.userPattern=/^[A-Za-z0-9_]{3,10}$/,n}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.error;return document.title="Chatter",c.a.createElement("article",{className:"login-container"},c.a.createElement("section",{className:"login-content"},c.a.createElement("h1",{className:"title"},"got a nickname ?"),c.a.createElement("div",null,c.a.createElement("input",{type:"text",onChange:this.handleChange,onKeyPress:this.handleKeyPress,placeholder:"Enter nickname..."}),c.a.createElement("p",null,e)),c.a.createElement("button",{onClick:this.handleClick,className:"btn btn-primary"},"Log in")))}}]),t}(a.Component),k=Object(p.b)(function(e){return{nickname:e.nickname,error:e.error}},function(e){return{setNickname:function(t){var n;e((n=t,function(e){e({type:f.SET_NICKNAME,val:n})}))},verifiyUser:function(t){var n;e((n=t,function(e,t){var a=t(),c=a.nickname,r=a.socket;r.emit(f.VERIFIY_USER,c,function(t){t.isUser?e({type:f.SET_ERROR,val:"nickname not available"}):(r.emit(f.CREATE_USER,t.user),e({type:f.CREATE_USER,val:t.user}),n.push("/".concat(t.user.nickname)))})}))},setError:function(t){var n;e((n=t,function(e){e({type:f.SET_ERROR,val:n})}))}}})(d),C=(n(93),n(6)),N=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this.props.chatWith;return c.a.createElement("nav",{className:"page-navbar"},c.a.createElement("button",{onClick:function(e){C(".main-menu").toggleClass("active")},className:"menu-opener"},c.a.createElement("i",{className:"material-icons"},"menu")),c.a.createElement("h1",{className:"page-title"},e.nickname?e.nickname:"Chatter"))}}]),t}(a.Component),O=Object(p.b)(function(e){return{chatWith:e.chatWith}})(N),_=n(50),y=n.n(_),T=n(51),j=n.n(T),R=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(c)))).jMethods=function(e){var t=C(window).innerHeight()-C(".page-navbar").innerHeight();C(".message-container").height(t)},n.handleChange=function(e){n.props.setMessage(e.target.value),n.props.socket.emit(f.TYPING,n.props.user.nickname)},n.handleClick=function(e){var t=n.props,a=t.user,c=t.socket,r=t.sendMessage,s=t.message,i=t.chatWith,o={sender:a.nickname,date:j()((new Date).toString()).format("D/MMM - hh:mm a"),content:s};i.socketID?c.emit(f.SEND_PMESSAGE,{reciver:i.socketID,content:o}):c.emit(f.SEND_MESSAGE,o),r(i.nickname?i.nickname:"global",o),n.messagearea.value="",n.messagearea.focus()},n.handleKeyPress=function(e){13===e.charCode&&(e.preventDefault(),n.handleClick(e))},n}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.inter=setInterval(function(t){e.jMethods()},1e3),y()(this.messagearea)}},{key:"render",value:function(){var e=this,t=this.props,n=t.messages,a=t.user,r=t.typing,s=t.chatWith,i=s.nickname?n[s.nickname]:n.global;return c.a.createElement("article",{className:"message-container"},c.a.createElement("section",{className:"message-area"},i?i.map(function(e,t){return c.a.createElement("div",{key:t,className:"message ".concat(e.sender===a.nickname?"right":"")},c.a.createElement("h2",{className:"message-sender"},e.sender),c.a.createElement("p",{className:"message-content"},e.content),c.a.createElement("span",{className:"message-time"},e.date))}):null),c.a.createElement("section",{className:"person-typing"},s.nickname?null:r),c.a.createElement("section",{className:"message-typing"},c.a.createElement("textarea",{placeholder:"Enter message...",onChange:this.handleChange,onKeyPress:this.handleKeyPress,ref:function(t){return e.messagearea=t},rows:"1",dir:"auto"}),c.a.createElement("button",{className:"btn btn-primary",onClick:this.handleClick},c.a.createElement("i",{className:"material-icons"},"send"))))}}]),t}(a.Component),I=Object(p.b)(function(e){return{messages:e.messages,user:e.user,message:e.message,socket:e.socket,typing:e.typing,chatWith:e.chatWith}},function(e){return{sendMessage:function(t,n){e(S(t,n))},setMessage:function(t){e(function(e){return function(t){t({type:f.SET_MESSAGE,val:e})}}(t))}}})(R),A=Object(p.b)(null,function(e){return{setChatWith:function(t){e(g(t))}}})(function(e){var t=e.onlineUsers,n=e.user,a=e.setChatWith;return c.a.createElement("section",{className:"friend-list"},t.map(function(e,t){return n.nickname!==e.nickname?c.a.createElement("div",{key:t,className:"friend",onClick:function(t){return function(e){a(e),C(".main-menu").toggleClass("active")}(e)}},c.a.createElement("span",null,e.userLetter),c.a.createElement("h3",null,e.nickname)):""}))}),M=n(101),w=n(14),U=function(e){function t(){var e,n;Object(i.a)(this,t);for(var a=arguments.length,c=new Array(a),r=0;r<a;r++)c[r]=arguments[r];return(n=Object(l.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(c)))).handleShowOnline=function(e){n.arrow="arrow_right"===n.arrow?"arrow_drop_down":"arrow_right",C(".online").children(".material-icons").text(n.arrow),C(".friend-list").slideToggle()},n.handleLogout=function(e){var t=n.props,a=t.socket,c=t.user;a.emit("disconnect",c),n.props.history.push("/")},n.handleGlobalClick=function(e){n.props.setChatWith({}),C(".main-menu").toggleClass("active")},n}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){this.arrow="arrow_right",C(".friend-list").slideToggle()}},{key:"render",value:function(){var e=this.props,t=e.user,n=e.onlineUsers;return c.a.createElement("article",{className:"main-menu"},c.a.createElement("nav",{className:"sidemenu-nav"},c.a.createElement("button",{onClick:this.handleLogout,className:"logof"},c.a.createElement("i",{className:"material-icons"},"eject")),c.a.createElement("button",{onClick:function(e){C(".main-menu").toggleClass("active")},className:"menu-opener"},c.a.createElement("i",{className:"material-icons"},"menu"))),c.a.createElement("section",{className:"profile"},c.a.createElement("span",null,t.userLetter),c.a.createElement("h2",null,t.nickname)),c.a.createElement("section",{className:"chat-types"},c.a.createElement("button",{className:"type",onClick:this.handleGlobalClick},"global ",c.a.createElement("i",{className:"material-icons"},"arrow_right")),c.a.createElement("button",{className:"type online",onClick:this.handleShowOnline},"online ",c.a.createElement("i",{className:"material-icons"},"arrow_right")),c.a.createElement(A,{onlineUsers:n,user:t})))}}]),t}(a.Component),G=Object(w.c)(M.a,Object(p.b)(function(e){return{user:e.user,onlineUsers:e.onlineUsers,socket:e.socket}},function(e){return{setChatWith:function(t){e(g(t))}}}))(U),P=function(e){function t(e){var n;return Object(i.a)(this,t),void 0===(n=Object(l.a)(this,Object(u.a)(t).call(this,e))).props.user.nickname&&n.props.history.push("/"),n}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentWillUnmount",value:function(){clearInterval(this.inter)}},{key:"render",value:function(){return document.title="Chatter | ".concat(this.props.user.nickname),c.a.createElement(a.Fragment,null,c.a.createElement("article",{className:"main-container"},c.a.createElement(G,null),c.a.createElement("section",{className:"main-content"},c.a.createElement(O,null),c.a.createElement(I,null))))}}]),t}(a.Component),D=Object(p.b)(function(e){return{user:e.user,socket:e.socket}})(P),W=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(o.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.socketURL,n=e.setSocket,a=e.sendMessage,c=e.setTyping,r=e.setUsers,s=h()(t);n(s),s.on("connect",function(e){s.on(f.RECIVE_MESSAGE,function(e){a("global",e)}),s.on(f.RECIVE_PMESSAGE,function(e){console.log(e),a(e.dest,e.cont)}),s.on(f.RECIVE_TYPING,function(e){c(e+" is typing"),setTimeout(function(e){c("")},3e3)}),s.on(f.RECIVE_ONLINE,function(e){console.log(e.length),r(e)})})}},{key:"render",value:function(){return c.a.createElement("article",{className:"App"},c.a.createElement(v.a,null,c.a.createElement(b.a,{path:"/",exact:!0,component:k}),c.a.createElement(b.a,{path:"/:nickname",component:D})))}}]),t}(a.Component),V=Object(p.b)(function(e,t){return{socketURL:e.socketURL}},function(e){return{setSocket:function(t){e(function(e){return function(t){t({type:f.SET_SOCKET,val:e})}}(t))},sendMessage:function(t,n){e(S(t,n))},setTyping:function(t){e(function(e){return function(t){t({type:f.SET_TYPING,val:e})}}(t))},setUsers:function(t){e(function(e){return function(t,n){t({type:f.UPDATE_USERS,val:e})}}(t))}}})(W);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var K=n(100),Y=n(54),L=n(24),H=n(55),x=n(13),F={socketURL:"/",socket:null,nickname:"",message:"",typing:"",error:"",user:{},chatWith:{},messages:{global:[]},onlineUsers:[]},B=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:F,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case f.SET_SOCKET:return Object(x.a)({},e,{socket:t.val});case f.SET_NICKNAME:return Object(x.a)({},e,{nickname:t.val});case f.SET_TYPING:return Object(x.a)({},e,{typing:t.val});case f.CREATE_USER:return Object(x.a)({},e,{user:t.val,error:""});case f.SET_ERROR:return Object(x.a)({},e,{error:t.val});case f.SET_MESSAGE:return Object(x.a)({},e,{message:t.val});case f.SEND_MESSAGE:return Object(x.a)({},e,{messages:Object(x.a)({},e.messages,Object(L.a)({},t.val.dest,e.messages[t.val.dest]?[].concat(Object(H.a)(e.messages[t.val.dest]),[t.val.cont]):[t.val.cont]))});case f.UPDATE_USERS:return Object(x.a)({},e,{onlineUsers:t.val});case f.CHAT_WITH:return Object(x.a)({},e,{chatWith:t.val});default:return Object(x.a)({},e)}},J=Object(w.d)(B,Object(w.a)(Y.a));s.a.render(c.a.createElement(p.a,{store:J},c.a.createElement(K.a,null,c.a.createElement(b.a,{path:"/",component:V}))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[56,2,1]]]);
//# sourceMappingURL=main.7e1b14f3.chunk.js.map