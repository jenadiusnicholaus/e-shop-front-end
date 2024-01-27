"use strict";(self.webpackChunknazox=self.webpackChunknazox||[]).push([[836],{7836:(L,Z,r)=>{r.r(Z),r.d(Z,{AccountModule:()=>p});var l,u=r(6895),n=r(2605),d=r(4650);const s=[{path:"auth",loadChildren:()=>Promise.resolve().then(r.bind(r,3314)).then(g=>g.AuthModule)}];class a{}(l=a).\u0275fac=function(_){return new(_||l)},l.\u0275mod=d.oAB({type:l}),l.\u0275inj=d.cJS({imports:[n.Bz.forChild(s),n.Bz]});var m,e=r(3314);class p{}(m=p).\u0275fac=function(_){return new(_||m)},m.\u0275mod=d.oAB({type:m}),m.\u0275inj=d.cJS({imports:[u.ez,a,e.AuthModule]})},3314:(L,Z,r)=>{r.r(Z),r.d(Z,{AuthModule:()=>Y});var T,u=r(6895),n=r(4006),d=r(5958),l=r(9668),s=r(2605),a=r(2340),e=r(4650),m=r(8311),p=r(263),g=r(2293),_=r(6583);function F(i,o){if(1&i&&(e.TgZ(0,"ngb-alert",38),e._uU(1),e.qZA()),2&i){const t=e.oxw();e.Q6J("dismissible",!1),e.xp6(1),e.Oqu(t.error)}}function Q(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"username is required"),e.qZA())}function E(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"username must be a valid username address"),e.qZA())}function P(i,o){if(1&i&&(e.TgZ(0,"div",39),e.YNc(1,Q,2,0,"div",40),e.YNc(2,E,2,0,"div",40),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.f.username.errors.required),e.xp6(1),e.Q6J("ngIf",t.f.username.errors.username)}}function k(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"Password is required"),e.qZA())}function O(i,o){if(1&i&&(e.TgZ(0,"div",39),e.YNc(1,k,2,0,"div",40),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.f.password.errors.required)}}const q=function(i){return{"is-invalid":i}};class C{constructor(o,t,c,U,w,x,oe){this.httpShareService=o,this.formBuilder=t,this.route=c,this.router=U,this.authenticationService=w,this.authFackservice=x,this.customAlert=oe,this.submitted=!1,this.error="",this.year=(new Date).getFullYear()}ngOnInit(){document.body.removeAttribute("data-layout"),document.body.classList.add("auth-body-bg"),this.loginForm=this.formBuilder.group({username:["nicho",[n.kI.required]],password:["1234",[n.kI.required]]})}get f(){return this.loginForm.controls}onSubmit(){if(this.submitted=!0,this.loginForm.invalid)return!1;this.httpShareService.post(null,a.N.E_SHOP_BASE_URL+a.N.AUTHENTICATION.AUTHENTICATION_BASE_URL+a.N.AUTHENTICATION.LOGIN_URL,this.loginForm.value).subscribe(t=>{sessionStorage.setItem("access",t.access),this.router.navigate(["/"])},t=>{console.log(t),this.error=t||""})}}(T=C).\u0275fac=function(o){return new(o||T)(e.Y36(m.F),e.Y36(n.QS),e.Y36(s.gz),e.Y36(s.F0),e.Y36(p.$),e.Y36(g.g),e.Y36(_.y))},T.\u0275cmp=e.Xpm({type:T,selectors:[["app-login"]],decls:59,vars:10,consts:[[1,"home-btn","d-none","d-sm-block"],["routerLink",""],[1,"mdi","mdi-home-variant","h2","text-white"],[1,"container-fluid","p-0"],[1,"row","g-0"],[1,"col-lg-4"],[1,"authentication-page-content","p-4","d-flex","align-items-center","min-vh-100"],[1,"w-100"],[1,"row","justify-content-center"],[1,"col-lg-9"],[1,"text-center"],["routerLink","",1,"logo"],[1,"font-size-18","mt-4"],[1,"text-muted"],[1,"p-2","mt-5"],[1,"form-horizontal",3,"formGroup","ngSubmit"],["type","danger",3,"dismissible",4,"ngIf"],[1,"form-group","auth-form-group-custom","mb-4"],[1,"ri-user-2-line","auti-custom-input-icon"],["for","email"],["type","text","formControlName","username","id","username","placeholder","username",1,"form-control",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],[1,"ri-lock-2-line","auti-custom-input-icon"],["for","password"],["type","password","formControlName","password","id","password","placeholder","Password",1,"form-control",3,"ngClass"],[1,"form-check"],["type","checkbox","id","customControlInline",1,"form-check-input"],["for","customControlInline",1,"form-check-label"],[1,"mt-4","text-center"],["type","submit",1,"btn","btn-primary","w-md","waves-effect","waves-light"],["routerLink","/account/reset-password",1,"text-muted"],[1,"mdi","mdi-lock","me-1"],[1,"mt-5","text-center"],["routerLink","/account/signup",1,"fw-medium","text-primary"],[1,"mdi","mdi-heart","text-danger"],[1,"col-lg-8"],[1,"authentication-bg"],[1,"bg-overlay"],["type","danger",3,"dismissible"],[1,"invalid-feedback"],[4,"ngIf"]],template:function(o,t){1&o&&(e.TgZ(0,"div",0)(1,"a",1),e._UZ(2,"i",2),e.qZA()(),e.TgZ(3,"div")(4,"div",3)(5,"div",4)(6,"div",5)(7,"div",6)(8,"div",7)(9,"div",8)(10,"div",9)(11,"div")(12,"div",10)(13,"div")(14,"a",11)(15,"H1"),e._uU(16,"ESHOP"),e.qZA()()(),e.TgZ(17,"h4",12),e._uU(18,"Welcome Back !"),e.qZA(),e.TgZ(19,"p",13),e._uU(20,"Sign in to continue to ESHOP."),e.qZA()(),e.TgZ(21,"div",14)(22,"form",15),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.YNc(23,F,2,2,"ngb-alert",16),e.TgZ(24,"div",17),e._UZ(25,"i",18),e.TgZ(26,"label",19),e._uU(27,"Username"),e.qZA(),e._UZ(28,"input",20),e.YNc(29,P,3,2,"div",21),e.qZA(),e.TgZ(30,"div",17),e._UZ(31,"i",22),e.TgZ(32,"label",23),e._uU(33,"Password"),e.qZA(),e._UZ(34,"input",24),e.YNc(35,O,2,1,"div",21),e.qZA(),e.TgZ(36,"div",25),e._UZ(37,"input",26),e.TgZ(38,"label",27),e._uU(39,"Remember me"),e.qZA()(),e.TgZ(40,"div",28)(41,"button",29),e._uU(42,"Log In"),e.qZA()(),e.TgZ(43,"div",28)(44,"a",30),e._UZ(45,"i",31),e._uU(46," Forgot your password?"),e.qZA()()()(),e.TgZ(47,"div",32)(48,"p"),e._uU(49,"Don't have an account ? "),e.TgZ(50,"a",33),e._uU(51," Register "),e.qZA()(),e.TgZ(52,"p"),e._uU(53,"\xa9 2023 ESHOP. Crafted with "),e._UZ(54,"i",34),e._uU(55," by Themesdesign"),e.qZA()()()()()()()(),e.TgZ(56,"div",35)(57,"div",36),e._UZ(58,"div",37),e.qZA()()()()()),2&o&&(e.xp6(22),e.Q6J("formGroup",t.loginForm),e.xp6(1),e.Q6J("ngIf",t.error),e.xp6(5),e.Q6J("ngClass",e.VKq(6,q,t.submitted&&t.f.username.errors)),e.xp6(1),e.Q6J("ngIf",t.submitted&&t.f.username.errors),e.xp6(5),e.Q6J("ngClass",e.VKq(8,q,t.submitted&&t.f.password.errors)),e.xp6(1),e.Q6J("ngIf",t.submitted&&t.f.password.errors))},dependencies:[u.mk,u.O5,n._Y,n.Fj,n.JJ,n.JL,n.sg,n.u,d.xm,s.rH]});var f,b,z=r(529);class S{constructor(o){this.http=o}getAll(){return this.http.get("/api/login")}register(o){return this.http.post("/users/register",o)}}function B(i,o){1&i&&(e.TgZ(0,"ngb-alert",39),e._uU(1,"Registeration successfull. "),e.qZA()),2&i&&e.Q6J("dismissible",!1)}function R(i,o){if(1&i&&(e.TgZ(0,"ngb-alert",40),e._uU(1),e.qZA()),2&i){const t=e.oxw();e.Q6J("dismissible",!1),e.xp6(1),e.Oqu(t.error)}}function H(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"Userame is required"),e.qZA())}function M(i,o){if(1&i&&(e.TgZ(0,"div",41),e.YNc(1,H,2,0,"div",42),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.f.username.errors.required)}}function j(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"Email is required"),e.qZA())}function G(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"Email must be a valid email address"),e.qZA())}function V(i,o){if(1&i&&(e.TgZ(0,"div",41),e.YNc(1,j,2,0,"div",42),e.YNc(2,G,2,0,"div",42),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.f.email.errors.required),e.xp6(1),e.Q6J("ngIf",t.f.email.errors.email)}}function K(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"Password is required"),e.qZA())}function D(i,o){if(1&i&&(e.TgZ(0,"div",41),e.YNc(1,K,2,0,"div",42),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.f.password.errors.required)}}(f=S).\u0275fac=function(o){return new(o||f)(e.LFG(z.eN))},f.\u0275prov=e.Yz7({token:f,factory:f.\u0275fac,providedIn:"root"});const y=function(i){return{"is-invalid":i}};class I{constructor(o,t,c,U,w,x){this.formBuilder=o,this.route=t,this.router=c,this.authenticationService=U,this.userService=w,this.sharedService=x,this.submitted=!1,this.error="",this.successmsg=!1,this.year=(new Date).getFullYear()}ngOnInit(){document.body.removeAttribute("data-layout"),document.body.classList.add("auth-body-bg"),this.signupForm=this.formBuilder.group({username:["",n.kI.required],email:["",[n.kI.required,n.kI.email]],password:["",n.kI.required]})}ngAfterViewInit(){}get f(){return this.signupForm.controls}onSubmit(){if(this.submitted=!0,this.signupForm.invalid)return!1;this.sharedService.post(null,a.N.E_SHOP_BASE_URL+a.N.AUTHENTICATION.AUTHENTICATION_BASE_URL+a.N.AUTHENTICATION.REGISTER_URL,this.signupForm.value).subscribe(t=>{this.router.navigate(["/account/login"])},t=>{this.error=t||""})}}var A;function X(i,o){if(1&i&&(e.TgZ(0,"ngb-alert",32),e._uU(1),e.qZA()),2&i){const t=e.oxw();e.Q6J("dismissible",!1),e.xp6(1),e.Oqu(t.error)}}function $(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"Email is required"),e.qZA())}function W(i,o){1&i&&(e.TgZ(0,"div"),e._uU(1,"Email must be a valid email address"),e.qZA())}function ee(i,o){if(1&i&&(e.TgZ(0,"div",33),e.YNc(1,$,2,0,"div",34),e.YNc(2,W,2,0,"div",34),e.qZA()),2&i){const t=e.oxw();e.xp6(1),e.Q6J("ngIf",t.f.email.errors.required),e.xp6(1),e.Q6J("ngIf",t.f.email.errors.email)}}(b=I).\u0275fac=function(o){return new(o||b)(e.Y36(n.QS),e.Y36(s.gz),e.Y36(s.F0),e.Y36(p.$),e.Y36(S),e.Y36(m.F))},b.\u0275cmp=e.Xpm({type:b,selectors:[["app-signup"]],decls:63,vars:15,consts:[[1,"home-btn","d-none","d-sm-block"],["routerLink",""],[1,"mdi","mdi-home-variant","h2","text-white"],[1,"container-fluid","p-0"],[1,"row","g-0"],[1,"col-lg-4"],[1,"authentication-page-content","p-4","d-flex","align-items-center","min-vh-100"],[1,"w-100"],[1,"row","justify-content-center"],[1,"col-lg-9"],[1,"text-center"],["routerLink","",1,"logo"],[1,"font-size-18","mt-4"],[1,"text-muted"],[1,"p-2","mt-5"],[1,"form-horizontal",3,"formGroup","ngSubmit"],["type","success",3,"dismissible",4,"ngIf"],["type","danger",3,"dismissible",4,"ngIf"],[1,"form-group","auth-form-group-custom","mb-4"],[1,"ri-user-2-line","auti-custom-input-icon"],["for","username"],["type","text","formControlName","username","id","username","placeholder","Enter username",1,"form-control",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],[1,"ri-mail-line","auti-custom-input-icon"],["for","email"],["type","email","formControlName","email","id","email","placeholder","Email",1,"form-control",3,"ngClass"],[1,"ri-lock-2-line","auti-custom-input-icon"],["for","password"],["type","password","formControlName","password","id","password","placeholder","Password",1,"form-control",3,"ngClass"],["type","submit",1,"btn","btn-primary","w-md","waves-effect","waves-light"],[1,"mt-4","text-center"],[1,"mb-0"],["href","#",1,"text-primary"],[1,"mt-5","text-center"],["routerLink","/account/login",1,"fw-medium","text-primary"],[1,"mdi","mdi-heart","text-danger"],[1,"col-lg-8"],[1,"authentication-bg"],[1,"bg-overlay"],["type","success",3,"dismissible"],["type","danger",3,"dismissible"],[1,"invalid-feedback"],[4,"ngIf"]],template:function(o,t){1&o&&(e.TgZ(0,"div",0)(1,"a",1),e._UZ(2,"i",2),e.qZA()(),e.TgZ(3,"div")(4,"div",3)(5,"div",4)(6,"div",5)(7,"div",6)(8,"div",7)(9,"div",8)(10,"div",9)(11,"div")(12,"div",10)(13,"div")(14,"a",11)(15,"H1"),e._uU(16,"ESHOP"),e.qZA()()(),e.TgZ(17,"h4",12),e._uU(18,"Register account"),e.qZA(),e.TgZ(19,"p",13),e._uU(20,"Get your free ESHOP account now."),e.qZA()(),e.TgZ(21,"div",14)(22,"form",15),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.YNc(23,B,2,1,"ngb-alert",16),e.YNc(24,R,2,2,"ngb-alert",17),e.TgZ(25,"div",18),e._UZ(26,"i",19),e.TgZ(27,"label",20),e._uU(28,"Username"),e.qZA(),e._UZ(29,"input",21),e.YNc(30,M,2,1,"div",22),e.qZA(),e.TgZ(31,"div",18),e._UZ(32,"i",23),e.TgZ(33,"label",24),e._uU(34,"Email"),e.qZA(),e._UZ(35,"input",25),e.YNc(36,V,3,2,"div",22),e.qZA(),e.TgZ(37,"div",18),e._UZ(38,"i",26),e.TgZ(39,"label",27),e._uU(40,"Password"),e.qZA(),e._UZ(41,"input",28),e.YNc(42,D,2,1,"div",22),e.qZA(),e.TgZ(43,"div",10)(44,"button",29),e._uU(45,"Register"),e.qZA()(),e.TgZ(46,"div",30)(47,"p",31),e._uU(48,"By registering you agree to the Nazox "),e.TgZ(49,"a",32),e._uU(50,"Terms of Use"),e.qZA()()()()(),e.TgZ(51,"div",33)(52,"p"),e._uU(53,"Already have an account ? "),e.TgZ(54,"a",34),e._uU(55," Login"),e.qZA()(),e.TgZ(56,"p"),e._uU(57,"\xa9 2023 ESHOP. Crafted with "),e._UZ(58,"i",35),e._uU(59," by Themesdesign"),e.qZA()()()()()()()(),e.TgZ(60,"div",36)(61,"div",37),e._UZ(62,"div",38),e.qZA()()()()()),2&o&&(e.xp6(22),e.Q6J("formGroup",t.signupForm),e.xp6(1),e.Q6J("ngIf",t.successmsg),e.xp6(1),e.Q6J("ngIf",t.error),e.xp6(5),e.Q6J("ngClass",e.VKq(9,y,t.submitted&&t.f.username.errors)),e.xp6(1),e.Q6J("ngIf",t.submitted&&t.f.username.errors),e.xp6(5),e.Q6J("ngClass",e.VKq(11,y,t.submitted&&t.f.email.errors)),e.xp6(1),e.Q6J("ngIf",t.submitted&&t.f.email.errors),e.xp6(5),e.Q6J("ngClass",e.VKq(13,y,t.submitted&&t.f.password.errors)),e.xp6(1),e.Q6J("ngIf",t.submitted&&t.f.password.errors))},dependencies:[u.mk,u.O5,n._Y,n.Fj,n.JJ,n.JL,n.sg,n.u,d.xm,s.rH]});const te=function(i){return{"is-invalid":i}};class N{constructor(o,t,c,U){this.formBuilder=o,this.route=t,this.router=c,this.authenticationService=U,this.submitted=!1,this.error="",this.success="",this.loading=!1,this.year=(new Date).getFullYear()}ngOnInit(){document.body.removeAttribute("data-layout"),document.body.classList.add("auth-body-bg"),this.resetForm=this.formBuilder.group({email:["",[n.kI.required,n.kI.email]]})}ngAfterViewInit(){}get f(){return this.resetForm.controls}onSubmit(){this.success="",this.submitted=!0,!this.resetForm.invalid&&"firebase"===a.N.defaultauth&&this.authenticationService.resetPassword(this.f.email.value).catch(o=>{this.error=o||""})}}var v;(A=N).\u0275fac=function(o){return new(o||A)(e.Y36(n.QS),e.Y36(s.gz),e.Y36(s.F0),e.Y36(p.$))},A.\u0275cmp=e.Xpm({type:A,selectors:[["app-passwordreset"]],decls:46,vars:6,consts:[[1,"home-btn","d-none","d-sm-block"],["routerLink",""],[1,"mdi","mdi-home-variant","h2","text-white"],[1,"container-fluid","p-0"],[1,"row","g-0"],[1,"col-lg-4"],[1,"authentication-page-content","p-4","d-flex","align-items-center","min-vh-100"],[1,"w-100"],[1,"row","justify-content-center"],[1,"col-lg-9"],[1,"text-center"],["routerLink","",1,"logo"],["src","assets/images/logo-dark.png","height","20","alt","logo"],[1,"font-size-18","mt-4"],[1,"text-muted"],[1,"p-2","mt-5"],["role","alert",1,"alert","alert-success","mb-4"],[1,"form-horizontal",3,"formGroup","ngSubmit"],["type","danger",3,"dismissible",4,"ngIf"],[1,"form-group","auth-form-group-custom","mb-4"],[1,"ri-mail-line","auti-custom-input-icon"],["for","email"],["type","email","formControlName","email","id","email","placeholder","Email",1,"form-control",3,"ngClass"],["class","invalid-feedback",4,"ngIf"],[1,"mt-4","text-center"],["type","submit",1,"btn","btn-primary","w-md","waves-effect","waves-light"],[1,"mt-5","text-center"],["routerLink","/account/login",1,"fw-medium","text-primary"],[1,"mdi","mdi-heart","text-danger"],[1,"col-lg-8"],[1,"authentication-bg"],[1,"bg-overlay"],["type","danger",3,"dismissible"],[1,"invalid-feedback"],[4,"ngIf"]],template:function(o,t){1&o&&(e.TgZ(0,"div",0)(1,"a",1),e._UZ(2,"i",2),e.qZA()(),e.TgZ(3,"div")(4,"div",3)(5,"div",4)(6,"div",5)(7,"div",6)(8,"div",7)(9,"div",8)(10,"div",9)(11,"div")(12,"div",10)(13,"div")(14,"a",11),e._UZ(15,"img",12),e.qZA()(),e.TgZ(16,"h4",13),e._uU(17,"Reset Password"),e.qZA(),e.TgZ(18,"p",14),e._uU(19,"Reset your password to Nazox."),e.qZA()(),e.TgZ(20,"div",15)(21,"div",16),e._uU(22," Enter your Email and instructions will be sent to you! "),e.qZA(),e.TgZ(23,"form",17),e.NdJ("ngSubmit",function(){return t.onSubmit()}),e.YNc(24,X,2,2,"ngb-alert",18),e.TgZ(25,"div",19),e._UZ(26,"i",20),e.TgZ(27,"label",21),e._uU(28,"Email"),e.qZA(),e._UZ(29,"input",22),e.YNc(30,ee,3,2,"div",23),e.qZA(),e.TgZ(31,"div",24)(32,"button",25),e._uU(33,"Reset"),e.qZA()()()(),e.TgZ(34,"div",26)(35,"p"),e._uU(36,"Don't have an account ? "),e.TgZ(37,"a",27),e._uU(38," Log in "),e.qZA()(),e.TgZ(39,"p"),e._uU(40,"\xa9 2023 Nazox. Crafted with "),e._UZ(41,"i",28),e._uU(42," by Themesdesign"),e.qZA()()()()()()()(),e.TgZ(43,"div",29)(44,"div",30),e._UZ(45,"div",31),e.qZA()()()()()),2&o&&(e.xp6(23),e.Q6J("formGroup",t.resetForm),e.xp6(1),e.Q6J("ngIf",t.error),e.xp6(5),e.Q6J("ngClass",e.VKq(4,te,t.submitted&&t.f.email.errors)),e.xp6(1),e.Q6J("ngIf",t.submitted&&t.f.email.errors))},dependencies:[u.mk,u.O5,n._Y,n.Fj,n.JJ,n.JL,n.sg,n.u,d.xm,s.rH]});const ie=[{path:"login",component:C},{path:"signup",component:I},{path:"reset-password",component:N}];class J{}var h;(v=J).\u0275fac=function(o){return new(o||v)},v.\u0275mod=e.oAB({type:v}),v.\u0275inj=e.cJS({imports:[s.Bz.forChild(ie),s.Bz]});class Y{}(h=Y).\u0275fac=function(o){return new(o||h)},h.\u0275mod=e.oAB({type:h}),h.\u0275inj=e.cJS({imports:[u.ez,n.UX,d._A,l.W,J]})}}]);