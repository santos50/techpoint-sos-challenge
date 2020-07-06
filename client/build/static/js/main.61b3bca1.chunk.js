(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{148:function(e,t,a){e.exports=a(297)},153:function(e,t,a){},154:function(e,t,a){},183:function(e,t){},185:function(e,t){},199:function(e,t){},201:function(e,t){},229:function(e,t){},231:function(e,t){},232:function(e,t){},238:function(e,t){},240:function(e,t){},258:function(e,t){},261:function(e,t){},277:function(e,t){},280:function(e,t){},297:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(54),s=a.n(o),c=a(18),i=a(19),l=a(22),u=a(21),m=(a(153),a(154),a(79),a(24)),h=a.n(m),p=a(20),d=a(5),b=a(14),E=a(27),f=a(146),v=a(45),g=a(175),w={isAuthenticated:!1,user:{},loading:!1},y={},O=Object(E.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_CURRENT_USER":return Object(v.a)(Object(v.a)({},e),{},{isAuthenticated:!g(t.payload),user:t.payload});case"USER_LOADING":return Object(v.a)(Object(v.a)({},e),{},{loading:!0});default:return e}},errors:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ERRORS":return t.payload;default:return e}}}),j=[f.a],S=Object(E.e)(O,{},Object(E.d)(E.a.apply(void 0,j),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())),N=a(43),k=a.n(N),C=function(e){e?h.a.defaults.headers.common.Authorization=e:delete h.a.defaults.headers.common.Authorization},U=function(e){return{type:"SET_CURRENT_USER",payload:e}},R=function(){return function(e){localStorage.removeItem("jwtToken"),C(!1),e(U({}))}},_=a(147),T=Object(b.b)((function(e){return{auth:e.auth}}))((function(e){var t=e.component,a=e.auth,n=Object(_.a)(e,["component","auth"]);return r.a.createElement(d.b,Object.assign({},n,{render:function(e){return!0===a.isAuthenticated?r.a.createElement(t,e):r.a.createElement(d.a,{to:"/sign-in"})}}))})),D=a(56),x=a(16),P=(a(88),a(179)),A=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){var e=localStorage.getItem("jwtToken"),t=P.verify(e,"randomString");this.props.auth.user;return r.a.createElement("div",{className:"Home"},r.a.createElement("div",{className:"auth-wrapper"},r.a.createElement("div",{className:"auth-inner"},r.a.createElement("h1",null,r.a.createElement("p",null,r.a.createElement("b",null,"Hey there, ",t.user.id))))))}}]),a}(n.Component),I=Object(b.b)((function(e){return{auth:e.auth}}),{logoutUser:R})(A),M=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).onSubmit=n.onSubmit.bind(Object(x.a)(n)),n.onChangeUsername=n.onChangeUsername.bind(Object(x.a)(n)),n.onChangePassword=n.onChangePassword.bind(Object(x.a)(n)),n.onChangeEmail=n.onChangeEmail.bind(Object(x.a)(n)),n.state={username:"",password:"",email:"",createError:"",isSuccess:!1},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){this.props.auth.isAuthenticated&&this.props.history.push("/home")}},{key:"componentWillReceiveProps",value:function(e){e.errors&&this.setState({errors:e.errors})}},{key:"onChangeUsername",value:function(e){this.setState({username:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"onChangeEmail",value:function(e){this.setState({email:e.target.value})}},{key:"onSubmit",value:function(e){e.preventDefault();var t={username:this.state.username,password:this.state.password,email:this.state.email};this.props.registerUser(t,this.props.history),this.setState({name:"",password:"",email:"",createError:"Username or email is taken"})}},{key:"render",value:function(){return r.a.createElement("div",{className:"Main"},r.a.createElement("div",{className:"auth-wrapper"},r.a.createElement("div",{className:"auth-inner"},r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("h3",null,"Sign Up"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Username"),r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Username",value:this.state.username,onChange:this.onChangeUsername})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Email address"),r.a.createElement("input",{type:"email",className:"form-control",placeholder:"Enter email",value:this.state.email,onChange:this.onChangeEmail})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Password"),r.a.createElement("input",{type:"password",className:"form-control",placeholder:"Enter password",value:this.state.passsword,onChange:this.onChangePassword}),r.a.createElement("div",{style:{fontsize:12,color:"red"}},this.state.createError)),r.a.createElement("button",{type:"submit",className:"btn btn-primary btn-block"},"Sign Up"),r.a.createElement("p",{className:"forgot-password text-right"},"Already registered? ",r.a.createElement("a",{href:"/sign-in"},"Sign in"))))))}}]),a}(n.Component),L=Object(b.b)((function(e){return{auth:e.auth,errors:e.errors}}),{registerUser:function(e,t){return function(a){h.a.post("/add",e).then((function(e){return t.push("/sign-in")})).catch((function(e){return a({type:"GET_ERRORS",payload:e.response.data})}))}}})(Object(d.g)(M)),W=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(e){var n;return Object(c.a)(this,a),(n=t.call(this,e)).onChange=function(e){n.setState(Object(D.a)({},e.target.id,e.target.value))},n.onSubmit=n.onSubmit.bind(Object(x.a)(n)),n.onChangeUsername=n.onChangeUsername.bind(Object(x.a)(n)),n.onChangePassword=n.onChangePassword.bind(Object(x.a)(n)),n.state={username:"",password:"",passwordError:"",isSuccess:!1},n}return Object(i.a)(a,[{key:"componentDidMount",value:function(){this.props.auth.isAuthenticated&&this.props.history.push("/home")}},{key:"componentWillReceiveProps",value:function(e){e.auth.isAuthenticated&&this.props.history.push("/home"),e.errors&&this.setState({errors:e.errors})}},{key:"onChangeUsername",value:function(e){this.setState({username:e.target.value})}},{key:"onChangePassword",value:function(e){this.setState({password:e.target.value})}},{key:"onSubmit",value:function(e){e.preventDefault();var t={username:this.state.username,password:this.state.password};this.props.loginUser(t),this.setState({username:"",password:"",passwordError:"incorrect password"})}},{key:"render",value:function(){this.state.errors;return r.a.createElement("div",{className:"Main"},r.a.createElement("div",{className:"auth-wrapper"},r.a.createElement("div",{className:"auth-inner"},r.a.createElement("form",{onSubmit:this.onSubmit},r.a.createElement("h3",null,"Sign In"),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Username"),r.a.createElement("input",{type:"text",className:"form-control",placeholder:"Enter username",value:this.state.username,onChange:this.onChangeUsername})),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Password"),r.a.createElement("input",{type:"password",className:"form-control",placeholder:"Enter password",value:this.state.password,onChange:this.onChangePassword}),r.a.createElement("div",{style:{fontsize:12,color:"red"}},this.state.passwordError)),r.a.createElement("div",{className:"form-group"},r.a.createElement("div",{className:"custom-control custom-checkbox"},r.a.createElement("input",{type:"checkbox",className:"custom-control-input",id:"customCheck1"}),r.a.createElement("label",{className:"custom-control-label",htmlFor:"customCheck1"},"Remember me"))),r.a.createElement("button",{type:"submit",className:"btn btn-primary btn-block"},"Submit"),r.a.createElement("p",{className:"forgot-password text-right"},"Don't have an account? ",r.a.createElement("a",{href:"/sign-up",component:L},"Sign up"))))))}}]),a}(n.Component),z=Object(b.b)((function(e){return{auth:e.auth,errors:e.errors}}),{loginUser:function(e){return function(t){h.a.post("/login",e).then((function(e){var a=e.data.token;localStorage.setItem("jwtToken",a),C(a);var n=k()(a);t(U(n))})).catch((function(e){return t({type:"GET_ERRORS",payload:e.response.data})}))}}})(W),G=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"componentDidMount",value:function(){localStorage.jwtToken&&this.props.logoutUser(),this.props.history.push("/sign-in")}},{key:"render",value:function(){return r.a.createElement("div",null,"Logout")}}]),a}(n.Component),X=Object(b.b)((function(e){return{auth:e.auth}}),{logoutUser:R})(G);if(localStorage.jwtToken){var H=localStorage.jwtToken;C(H);var B=k()(H);S.dispatch(U(B));var J=Date.now()/1e3;B.exp<J&&(S.dispatch(R()),window.location.href="./sign-in")}var V=function(e){Object(l.a)(a,e);var t=Object(u.a)(a);function a(){return Object(c.a)(this,a),t.apply(this,arguments)}return Object(i.a)(a,[{key:"render",value:function(){return r.a.createElement(b.a,{store:S},r.a.createElement(p.a,null,r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light fixed-top"},r.a.createElement("div",{className:"container"},r.a.createElement(p.b,{className:"navbar-brand",to:"/sign-in"},"WebsiteName"),r.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarTogglerDemo02"},r.a.createElement("ul",{className:"navbar-nav ml-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(p.b,{className:"nav-link",to:"/home"},"Home")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(p.b,{className:"nav-link",to:"/logout"},"Logout")))))),r.a.createElement(d.d,null,r.a.createElement(d.b,{exact:!0,path:"/",component:z}),r.a.createElement(d.b,{path:"/sign-in",component:z}),r.a.createElement(d.b,{path:"/sign-up",component:L}),r.a.createElement(d.b,{path:"/logout",component:X}),r.a.createElement(T,{exact:!0,path:"/home",component:I}))))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(p.a,null,r.a.createElement(V,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},88:function(e,t,a){}},[[148,1,2]]]);
//# sourceMappingURL=main.61b3bca1.chunk.js.map