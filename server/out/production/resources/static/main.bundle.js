webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var routes = [
    { path: '', redirectTo: 'product', pathMatch: 'prefix' },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forRoot(routes, { useHash: true })],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".top-navbar{\n    /* margin-bottom: 10px; */\n    padding: 15px;\n    /* height: 100px;  */\n}\n.header{ \n    height: 70px; \n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <div class=\"\" *ngIf=\"this.userService.isAuthenticated() | async\">\n        <app-header></app-header>\n    </div>\n    <div *ngIf=\"this.config.showNavbar && this.userService.isAuthenticated() | async\" class=\"top-navbar\">\n        <app-top-navbar></app-top-navbar>\n    </div>\n    <main>\n        <router-outlet></router-outlet>\n    </main>\n    <div *ngIf=\"this.loadingService.loading == true\" style=\"z-index:100;position:fixed;top:50%;right:50%\">\n        <mat-spinner></mat-spinner>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_shared_animations_fade_in_animation__ = __webpack_require__("../../../../../src/app/shared/animations/fade-in.animation.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_shared_config_service__ = __webpack_require__("../../../../../src/app/shared/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_auth_user_user_service__ = __webpack_require__("../../../../../src/app/auth/user/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_loading_service__ = __webpack_require__("../../../../../src/app/loading.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AppComponent = /** @class */ (function () {
    function AppComponent(configService, toastr, vcr, userService, loadingService) {
        this.configService = configService;
        this.toastr = toastr;
        this.userService = userService;
        this.loadingService = loadingService;
        this.config = {
            showHeader: true,
            showNavbar: true,
            showFooter: true
        };
        this.toastr.setRootViewContainerRef(vcr);
    }
    AppComponent.prototype.ngOnInit = function () {
        // this.toastr.success("App initiated", "Yay!");
        var _this = this;
        this.configService.isCustomerView()
            .subscribe(function (status) {
            _this.config = {
                showFooter: !status,
                showHeader: !status,
                showNavbar: !status
            };
        });
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")],
            animations: [__WEBPACK_IMPORTED_MODULE_1_app_shared_animations_fade_in_animation__["a" /* fadeInAnimation */]]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_shared_config_service__["a" /* ConfigService */], __WEBPACK_IMPORTED_MODULE_3_ng2_toastr__["ToastsManager"], __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"], __WEBPACK_IMPORTED_MODULE_4_app_auth_user_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_5_app_loading_service__["a" /* LoadingService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_app_routing_module__ = __webpack_require__("../../../../../src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_sell_sell_module__ = __webpack_require__("../../../../../src/app/sell/sell.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_hammerjs__ = __webpack_require__("../../../../hammerjs/hammer.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_product_product_module__ = __webpack_require__("../../../../../src/app/product/product.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_customer_customer_module__ = __webpack_require__("../../../../../src/app/customer/customer.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_app_expense_expense_module__ = __webpack_require__("../../../../../src/app/expense/expense.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_app_employee_employee_module__ = __webpack_require__("../../../../../src/app/employee/employee.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_app_shared_storesetup_storesetup_service__ = __webpack_require__("../../../../../src/app/shared/storesetup/storesetup.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_app_report_report_module__ = __webpack_require__("../../../../../src/app/report/report.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_service_worker__ = __webpack_require__("../../../service-worker/esm5/service-worker.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_app_shared_config_service__ = __webpack_require__("../../../../../src/app/shared/config.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_ng2_toastr_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22_ng2_toastr_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_22_ng2_toastr_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23_app_auth_auth_module__ = __webpack_require__("../../../../../src/app/auth/auth.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__loading_service__ = __webpack_require__("../../../../../src/app/loading.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25_app_promotion_promotion_module__ = __webpack_require__("../../../../../src/app/promotion/promotion.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_app_purchase_order_purchase_order_module__ = __webpack_require__("../../../../../src/app/purchase-order/purchase-order.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_21__angular_router__["RouterModule"],
                __WEBPACK_IMPORTED_MODULE_16__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_4_app_app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_23_app_auth_auth_module__["a" /* AuthModule */],
                __WEBPACK_IMPORTED_MODULE_23_app_auth_auth_module__["a" /* AuthModule */].forRoot(),
                // MaterialModule,
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["ContextMenuModule"],
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_7_app_sell_sell_module__["a" /* SellModule */],
                __WEBPACK_IMPORTED_MODULE_5_primeng_primeng__["TabMenuModule"],
                __WEBPACK_IMPORTED_MODULE_10_app_product_product_module__["a" /* ProductModule */],
                __WEBPACK_IMPORTED_MODULE_11_app_shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_12_app_customer_customer_module__["a" /* CustomerModule */],
                __WEBPACK_IMPORTED_MODULE_13_app_expense_expense_module__["a" /* ExpenseModule */],
                __WEBPACK_IMPORTED_MODULE_14_app_employee_employee_module__["a" /* EmployeeModule */],
                __WEBPACK_IMPORTED_MODULE_25_app_promotion_promotion_module__["a" /* PromotionModule */],
                __WEBPACK_IMPORTED_MODULE_17_app_report_report_module__["a" /* ReportModule */],
                __WEBPACK_IMPORTED_MODULE_26_app_purchase_order_purchase_order_module__["a" /* PurchaseOrderModule */],
                __WEBPACK_IMPORTED_MODULE_19__environments_environment__["a" /* environment */].production ? __WEBPACK_IMPORTED_MODULE_18__angular_service_worker__["a" /* ServiceWorkerModule */].register('/ngsw-worker.js') : [],
                __WEBPACK_IMPORTED_MODULE_22_ng2_toastr_ng2_toastr__["ToastModule"].forRoot()
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_15_app_shared_storesetup_storesetup_service__["a" /* StoreSetupService */], __WEBPACK_IMPORTED_MODULE_20_app_shared_config_service__["a" /* ConfigService */], __WEBPACK_IMPORTED_MODULE_24__loading_service__["a" /* LoadingService */], { provide: __WEBPACK_IMPORTED_MODULE_3__angular_common__["LocationStrategy"], useClass: __WEBPACK_IMPORTED_MODULE_3__angular_common__["HashLocationStrategy"] }],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/auth/auth-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_login_component__ = __webpack_require__("../../../../../src/app/auth/login/login.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    // {
    //   path: '', redirectTo: 'login', pathMatch: 'full'
    // },
    {
        path: 'login', component: __WEBPACK_IMPORTED_MODULE_2__login_login_component__["a" /* LoginComponent */], data: { depth: 1 }
    }
];
var AuthRoutingModule = /** @class */ (function () {
    function AuthRoutingModule() {
    }
    AuthRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
        })
    ], AuthRoutingModule);
    return AuthRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/auth/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_user_service__ = __webpack_require__("../../../../../src/app/auth/user/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = /** @class */ (function () {
    function AuthGuard(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        var _this = this;
        // this.userService.checkUserSession();
        return this.userService.authNStatus().then(function (auth) {
            console.log("In auth guard with auth status", auth);
            if (auth) {
                return true;
            }
            else {
                _this.router.navigate(['/login', { redirectTo: state.url }]);
                return false;
            }
        });
    };
    AuthGuard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__user_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]])
    ], AuthGuard);
    return AuthGuard;
}());



/***/ }),

/***/ "../../../../../src/app/auth/auth.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_routing_module__ = __webpack_require__("../../../../../src/app/auth/auth-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login_component__ = __webpack_require__("../../../../../src/app/auth/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_guard__ = __webpack_require__("../../../../../src/app/auth/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__user_user_service__ = __webpack_require__("../../../../../src/app/auth/user/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};









var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule_1 = AuthModule;
    AuthModule.forRoot = function () {
        return {
            ngModule: AuthModule_1,
            providers: [__WEBPACK_IMPORTED_MODULE_5__user_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_4__auth_guard__["a" /* AuthGuard */]]
        };
    };
    AuthModule = AuthModule_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_6__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_8__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_7__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_2__auth_routing_module__["a" /* AuthRoutingModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__login_login_component__["a" /* LoginComponent */]],
            providers: []
        })
    ], AuthModule);
    return AuthModule;
    var AuthModule_1;
}());



/***/ }),

/***/ "../../../../../src/app/auth/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<form *ngIf=\"this.loginForm !=null\" class=\"flex-form\" [formGroup]=\"this.loginForm\" (keyup.enter)=\"this.userLogin()\">\n    <div class=\"card card-login mat-elevation-z2\" >\n        <div class=\"card-header text-center\" data-background-color=\"blue\">\n            <h4 class=\"card-title\">Login</h4>\n            <div class=\"social-line\">\n                <a href=\"#btn\" class=\"btn btn-just-icon btn-simple\">\n                    <i class=\"fa fa-facebook-square\"></i>\n                </a>\n                <a href=\"#pablo\" class=\"btn btn-just-icon btn-simple\">\n                    <i class=\"fa fa-twitter\"></i>\n                </a>\n                <a href=\"#eugen\" class=\"btn btn-just-icon btn-simple\">\n                    <i class=\"fa fa-google-plus\"></i>\n                </a>\n                <a href=\"#eugen\" class=\"btn btn-just-icon btn-simple\">\n                    <i class=\"fa fa-linkedin\"></i>\n                </a>\n            </div>\n        </div>\n        <div class=\"card-content\">\n            <div class=\"input-group justify-content-center\">\n                <!-- <span class=\"input-group-addon\">\n                        <i class=\"material-icons\">email</i>\n                    </span> -->\n                <div class=\"form-group label-floating\">\n                    <mat-form-field>\n                        <input matInput formControlName=\"username\" placeholder=\"Username\">\n                    </mat-form-field>\n                </div>\n            </div>\n            <div *ngIf=\"formErrors.username\" class=\"alert alert-danger text-center justify-content-center\">\n                {{ formErrors.username }}\n            </div>\n            <div class=\"input-group justify-content-center\">\n                <!-- <span class=\"input-group-addon\">\n                        <i class=\"material-icons\">lock_outline</i>\n                    </span> -->\n                <div class=\"form-group label-floating\">\n                    <mat-form-field>\n                        <input matInput formControlName=\"password\" placeholder=\"Password\" type=\"password\">\n                    </mat-form-field>\n                </div>\n            </div>\n            <div *ngIf=\"formErrors.password\" class=\"alert alert-danger flex-form-input text-center justify-content-center\">\n                {{ formErrors.password }}\n            </div>\n        </div>\n        <div class=\"footer text-center\">\n            <div class=\"row\">\n                <div class=\"col-lg-2 col-md-2 col-sm-2\"></div>\n                <div class=\"col-lg-8 col-md-8 col-sm-8 justify-content-start\">\n                    <mat-slide-toggle class=\"flex-form-input\" [disabled]=\"loading\">Remember Me</mat-slide-toggle>\n                    <!-- <mat-slide-toggle class=\"flex-form-input\">Fingerprint </mat-slide-toggle> -->\n                </div>\n                <div class=\"col-lg-3 col-md-2 col-sm-2\">\n\n                </div>\n            </div>\n            <div class=\"row\">\n                    <div class=\"col-lg-2 col-md-2 col-sm-2\"></div>\n                    <div class=\"col-lg-8 col-md-8 col-sm-8 justify-content-start\">\n                        <!-- <mat-slide-toggle class=\"flex-form-input\" [disabled]=\"loading\">Remember Me</mat-slide-toggle> -->\n                        <!-- <mat-slide-toggle class=\"flex-form-input\">Fingerprint </mat-slide-toggle> -->\n                        <div *ngIf=\"this.error\" class=\"alert alert-danger flex-form-input text-center justify-content-center\">Invalid Login</div>\n                    </div>\n                    <div class=\"col-lg-3 col-md-2 col-sm-2\">\n    \n                    </div>\n                </div>\n            <div class=\"row\">\n                <div class=\"col-lg-3 col-md-2 col-sm-2\"></div>\n                <div class=\"d-flex col-lg-6 col-md-8 col-sm-8 justify-content-start\">\n                    <button *ngIf=\"!loading\" class=\"flex-form-input bg-primary text-white font-size-16\" mat-raised-button [disabled]=\"this.loginForm.invalid\" (click)=\"this.userLogin()\">\n                        <!-- <h4> -->\n                            Login&nbsp;\n                            <i class=\"fa fa-sign-in\" aria-hidden=\"true\"></i>\n                        <!-- </h4> -->\n                    </button>\n                </div>\n                <div class=\"col-lg-3 col-md-2 col-sm-2\">\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-lg-3 col-md-2 col-sm-2\"></div>\n                <div class=\"d-flex col-lg-6 col-md-8 col-sm-8 justify-content-center\">\n                    <a href=\"javascript:void(0)\">Sign Up</a>&nbsp;|&nbsp;<a href=\"javascript:void(0)\">More Info</a>\n                </div>\n                <div class=\"col-lg-3 col-md-2 col-sm-2\">\n                </div>\n            </div>\n            <br>\n        </div>\n        <mat-spinner *ngIf=\"this.loading\" style=\"margin: 0px auto;\"></mat-spinner>\n    </div>\n</form>\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n<!-- <mat-card class=\"mat-elevation-z6\">\n  <form *ngIf=\"this.loginForm !=null\" class=\"flex-form\" [formGroup]=\"this.loginForm\">\n    <mat-form-field class=\"flex-form-input\">\n      <input matInput formControlName=\"username\" placeholder=\"Username\">\n    </mat-form-field>\n    <div *ngIf=\"formErrors.username\" class=\"alert alert-danger flex-form-input text-center\">\n      {{ formErrors.username }}\n    </div>\n    <mat-form-field class=\"flex-form-input\" >\n        <input matInput formControlName=\"password\" placeholder=\"Password\" type=\"password\">\n      </mat-form-field>\n      <div *ngIf=\"formErrors.password\" class=\"alert alert-danger flex-form-input text-center\">\n        {{ formErrors.password }}\n      </div>\n      <mat-slide-toggle class=\"flex-form-input\" [disabled]=\"loading\">Remember Me</mat-slide-toggle>\n      <mat-slide-toggle>Fingerprint </mat-slide-toggle>      \n      <button *ngIf=\"!loading\" class=\"flex-form-input\" mat-raised-button [disabled]=\"this.loginForm.invalid\" (click)=\"this.userLogin()\">\n        <h4>\n          Login&nbsp;<i class=\"fa fa-sign-in\" aria-hidden=\"true\"></i>\n        </h4>\n      </button>\n      \n  </form>\n</mat-card> -->"

/***/ }),

/***/ "../../../../../src/app/auth/login/login.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".flex-form {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n  padding: 20px;\n  width: 70%;\n  margin: 50px auto !important;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center; }\n  .flex-form .flex-form-input {\n    width: 100%;\n    margin: 20px 0px; }\n\nmat-card {\n  margin: auto;\n  max-width: 768px; }\n\n.card-login .card-content {\n  padding: 0px 30px 0px 30px; }\n\n.card {\n  -webkit-box-flex: 0.15;\n      -ms-flex-positive: 0.15;\n          flex-grow: 0.15; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/auth/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__user_user_service__ = __webpack_require__("../../../../../src/app/auth/user/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, route, userService, fb) {
        this.router = router;
        this.route = route;
        this.userService = userService;
        this.fb = fb;
        this.loading = false;
        this.error = false;
        this.login = {
            username: '',
            password: ''
        };
        this.formErrors = {
            username: '',
            password: ''
        };
        this.validationMessages = {
            'username': {
                'required': 'Username is required.',
                'minlength': 'Username must be at least 4 characters long.',
                'maxlength': 'Username cannot be more than 24 characters long.',
            },
            'password': {
                'required': 'Password is required.',
                'equal': 'The passwords do not match'
            }
        };
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loginForm = this.fb.group({
            'username': [
                this.login.username,
                [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required
                ]
            ],
            'password': [
                this.login.password,
                [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required
                ]
            ]
        });
        this.userService.checkUserSession();
        this.setupAutenticatedListener();
        if (!__WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].production) {
            this.loginForm.setValue({
                username: 'alok@alok.com',
                password: 'alok'
            });
            // this.loginForm.setValue(<Login>{
            //   username: 'scott@votecrane.com',
            //   password: 'vote4me'
            // });
        }
        this.loginForm.valueChanges.subscribe(function (data) {
            _this.formErrors = _this.onFormChanges({
                form: _this.loginForm,
                formErrors: _this.formErrors,
                validationMessages: _this.validationMessages,
                formChanges: data
            });
        });
        this.resetFormErrors();
    };
    LoginComponent.prototype.resetFormErrors = function () {
        this.formErrors = this.onFormChanges({
            form: this.loginForm,
            formErrors: this.formErrors,
            validationMessages: this.validationMessages,
        });
    };
    LoginComponent.prototype.userLogin = function () {
        this.error = false;
        this.loginForm.disable();
        this.loading = true;
        this.userService.userLogin({
            username: this.loginForm.get('username').value,
            password: this.loginForm.get('password').value
        });
    };
    LoginComponent.prototype.setupAutenticatedListener = function () {
        var _this = this;
        var navigateUrl = this.route.snapshot.paramMap.get('redirectTo');
        this.userService.isAuthenticated().subscribe(function (isAuth) {
            _this.loading = false;
            if (isAuth) {
                if (navigateUrl && navigateUrl != "null") {
                    _this.router.navigateByUrl(navigateUrl);
                    // this.router.navigate(['filer']);
                }
            }
        }, function (err) {
            _this.loading = false;
            _this.loginForm.enable();
        });
        this.userService.loginErrors().subscribe(function (error) {
            if (error.value) {
                _this.error = true;
                _this.loading = false;
                _this.loginForm.enable();
            }
        });
    };
    LoginComponent.prototype.onFormChanges = function (options) {
        var form = options.form || null;
        var formErrors = options.formErrors || {};
        var formChanges = options.formChanges || null;
        var validationMessages = options.validationMessages || {};
        if (!form) {
            return;
        }
        for (var field in formErrors) {
            formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = validationMessages[field];
                for (var key in control.errors) {
                    formErrors[field] += messages[key] + ' ';
                }
            }
        }
        return formErrors;
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'pol-login',
            template: __webpack_require__("../../../../../src/app/auth/login/login.component.html"),
            styles: [__webpack_require__("../../../../../src/app/auth/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_3__angular_router__["ActivatedRoute"], __WEBPACK_IMPORTED_MODULE_2__user_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "../../../../../src/app/auth/user/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* unused harmony export User */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var UserService = /** @class */ (function () {
    function UserService(http, router) {
        this.http = http;
        this.router = router;
        this.url = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].userUrl;
        this._isAuthenticated = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* BehaviorSubject */](false);
        this._loginErrors = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["a" /* BehaviorSubject */]({ value: false, error: null });
        this.checkUserSession();
    }
    UserService.prototype.isAuthenticated = function () {
        return this._isAuthenticated.asObservable();
    };
    UserService.prototype.loginErrors = function () {
        return this._loginErrors.asObservable();
    };
    //For sync calls 
    UserService.prototype.authNStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var authState;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        authState = false;
                        if (!this.session) return [3 /*break*/, 1];
                        // console.log("Session present.");
                        authState = true;
                        return [3 /*break*/, 4];
                    case 1:
                        if (!!this.fetching) return [3 /*break*/, 2];
                        // console.log("Not fetching..", this.fetching, this.session);
                        authState = false;
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.fetching.asObservable()
                            .map(function (data) {
                            // console.log("Fetching, just finished with", data);
                            if (_this.session)
                                return true;
                            else
                                return false;
                        })
                            .toPromise()];
                    case 3:
                        authState =
                            _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, authState];
                }
            });
        });
    };
    UserService.prototype.checkUserSession = function () {
        var _this = this;
        this.fetching = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["c" /* Subject */]();
        this.session = null;
        console.log("Checking user session...");
        this.checkSessionHttpRequest()
            .subscribe(function (session) {
            // this.electionService.getAllElections()
            // .subscribe((list) => {
            console.log("Checking if session valid...");
            if (session) {
                _this.session = session;
                _this._isAuthenticated.next(true);
            }
            else {
                _this._isAuthenticated.next(false);
            }
            // })
        }, function (err) {
            // this._userDetails.next(undefined);
            console.error(err);
            _this._isAuthenticated.next(false);
        }, function () {
            _this.fetching.next(false);
            _this.fetching.complete();
            _this.fetching = null;
            console.log("Here is the session ", _this.session);
        });
    };
    UserService.prototype.userLogin = function (login) {
        var _this = this;
        this.fetching = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["c" /* Subject */]();
        this.session = null;
        console.log("Authentication user...");
        this.loginHttpRequest(login)
            .subscribe(function (session) {
            if (session) {
                _this.storeUserCredentials(login);
                _this.session = session;
                _this._isAuthenticated.next(true);
                console.log("Here is the session ", _this.session);
            }
            else {
                _this._isAuthenticated.next(false);
            }
        }, function (err) {
            // this._userDetails.next(undefined);
            console.log(err);
            console.log("In Error");
            _this._loginErrors.next({ value: true, error: err });
            _this._isAuthenticated.next(false);
        }, function () {
            _this.fetching.next(false);
            _this.fetching.complete();
            _this.fetching = null;
        });
    };
    UserService.prototype.userLogout = function () {
        // this.fetching = new Subject();
        this.session = null;
        this.removeStoredUserCredentials();
        location.reload();
        // console.log("Authentication user...")
        // this.logoutHttpRequest()
        //   .subscribe(
        //   (session) => {
        //     // this.session = null;
        //     console.log("Here is the session ", this.session);
        //     this._isAuthenticated.next(false);
        //   },
        //   (err) => {
        //     // this._userDetails.next(undefined);
        //     this._isAuthenticated.next(false);
        //   },
        //   () => {
        //     this.fetching.next(false);
        //     this.fetching.complete();
        //     this.fetching = null;
        //   });
    };
    UserService.prototype.getLoggedInUserDetails = function () {
        var url = this.url + '/user';
        return this.http.get(url, { withCredentials: true })
            .map(this.extractData)
            .catch(this.handleError)
            .map(function (dto) { return new User(dto); });
    };
    UserService.prototype.loginHttpRequest = function (login) {
        var url = this.url + ("/validateEmployeeForClockIn?username=" + login.username + "&password=" + login.password);
        // let body = new FormData();
        // body.append('emailAddress', login.username);
        // body.append('password', login.password);
        return this.http.get(url)
            .map(this.extractData)
            .map(function (dto) { return new User(dto); });
        // .map((response) => {
        //   this.checkUserSession();
        //   return new Session(response);
        // })
        // .catch(this.handleError);
    };
    UserService.prototype.logoutHttpRequest = function () {
        var url = this.url + '/signOut';
        var body = new FormData();
        return this.http.get(url, { withCredentials: true })
            .map(this.extractData)
            .map(function (response) { return new Session(response); })
            .catch(this.handleError);
    };
    UserService.prototype.checkSessionHttpRequest = function () {
        var login = this.getStoredUserCerdentials() || { username: null, password: null };
        var url = this.url + ("/validateEmployeeForClockIn?username=" + login.username + "&password=" + login.password);
        // let body = new FormData();
        // body.append('emailAddress', login.username);
        // body.append('password', login.password);
        return this.http.get(url)
            .map(this.extractData)
            .map(function (dto) {
            if (dto && dto.username)
                return new User(dto);
            else
                return null;
        })
            .catch(this.handleError);
        // .map((response) => new Session(response))
    };
    UserService.prototype.storeUserCredentials = function (login) {
        login = __assign({}, login, { createdAt: (new Date()).toISOString() });
        localStorage.setItem('poslogin', JSON.stringify(login));
    };
    UserService.prototype.getStoredUserCerdentials = function () {
        var loginStr = localStorage.getItem('poslogin');
        // console.log(loginStr); 
        if (loginStr) {
            var login = JSON.parse(loginStr);
            return login;
            // const minutesAgo30 = Moment().subtract(environment.loginExpireWithinMinutes, 'minutes'); 
            // console.log('30 mintues ago', minutesAgo30.toDate()); 
            // console.log('Timenow', Moment().toDate())
            // const isTimeWithin30Minutes = Moment(login.createdAt).isBetween(minutesAgo30, Moment()); 
            // console.log('Login time', Moment(login.createdAt).toDate()); 
            // if(isTimeWithin30Minutes){
            // console.log('Last Logged within 30 minutes'); 
            // return login;
            // }
            // console.log('Removing login.. ', loginStr); 
            // localStorage.removeItem('poslogin');
        }
        return { username: null, password: null };
    };
    UserService.prototype.removeStoredUserCredentials = function () {
        localStorage.removeItem('poslogin');
    };
    UserService.prototype.extractData = function (res) {
        var body;
        try {
            body = res.json();
        }
        catch (error) {
            console.log('Cannot parsee the recived reponse to JSON');
        }
        // console.log(body);
        return body || {};
    };
    UserService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["b" /* Observable */].throw(errMsg);
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_4__angular_router__["Router"]])
    ], UserService);
    return UserService;
}());

var Session = /** @class */ (function () {
    function Session(dto) {
        if (dto) {
            switch (dto.userType) {
                case "Admin":
                    this.role = "admin";
                    break;
                case "Candidate":
                    this.role = "candidate";
                    break;
                default:
                    this.role = "unknown";
                    break;
            }
            this.accountId = dto.accountId;
            this.userId = dto.userId;
            // let state = stateList.find((el) => el.stateCode == dto.jurisdictionState); 
            // if(state)
            //   this.jurisdictionState = state.stateCode; 
            // else 
            //   this.jurisdictionState = null; 
            this.nextElectionYear = Number.parseInt(dto.nextElectionYear);
        }
    }
    return Session;
}());
var User = /** @class */ (function () {
    function User(dto) {
        this.name = dto.name;
        this.phoneNumber = dto.phoneNo;
        this.emailAddress = dto.email;
    }
    return User;
}());



/***/ }),

/***/ "../../../../../src/app/customer/customer-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_auth_auth_guard__ = __webpack_require__("../../../../../src/app/auth/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_customer_customer_component__ = __webpack_require__("../../../../../src/app/customer/customer.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: 'customer',
        component: __WEBPACK_IMPORTED_MODULE_3_app_customer_customer_component__["b" /* CustomerComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_2_app_auth_auth_guard__["a" /* AuthGuard */]]
    },
];
var CustomerRoutingModule = /** @class */ (function () {
    function CustomerRoutingModule() {
    }
    CustomerRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
        })
    ], CustomerRoutingModule);
    return CustomerRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/customer/customer.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/customer/customer.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-title>\n\n        <div class=\"row d-flex align-items-center\">\n            <div class=\"col-md-7\">\n                <h4>Customer Details</h4>\n            </div>\n\n            <div class=\"col-md-5 d-flex align-items-center justify-content-end\">\n                <button type=\"button\" class=\"bg-primary text-white action-button-lg m-3\" (click)=\"showDialogToAdd()\">\n                        <i class=\"fa fa-plus-square\" aria-hidden=\"true\" label=\"Add\"></i>\n                            Add Customer\n                    </button>\n\n            </div>\n        </div>\n    </mat-card-title>\n    <mat-card-content>\n        <p-growl [(value)]=\"msgs\"></p-growl>\n\n\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n\n                <p-dataTable [value]=\"this.customerDto\" [editable]=\"true\" scrollable=\"true\" [responsive]=\"true\" scrollHeight=\"500px\">\n                    <p-column field=\"name\" header=\"Name\" filterPlaceholder=\"Search For Customer Name\" [filter]=\"true\"></p-column>\n                    <p-column field=\"phoneNo\" header=\"PhoneNo\" filterPlaceholder=\"Search For Customer Phono No\" [sortable]=\"true\" [filter]=\"true\"></p-column>\n                    <p-column field=\"email\" header=\"Email\" filterPlaceholder=\"Search For Customer Email\" [sortable]=\"true\" [filter]=\"true\"></p-column>\n                    <p-column field=\"balance\" header=\"Balance\" [sortable]=\"true\">\n                        <ng-template let-customer=\"rowData\" pTemplate=\"body\">\n                            {{customer.balance | currency:'USD':'true'}}\n                        </ng-template>\n                    </p-column>\n                    <p-column field=\"storeCredit\" header=\"Store Credit\" [sortable]=\"true\">\n                        <ng-template let-customer=\"rowData\" pTemplate=\"body\">\n                            {{customer.storeCredit | currency:'USD':'true'}}\n                        </ng-template>\n                    </p-column>\n                    <p-column field=\"action\" header=\"Action\" [sortable]=\"true\">\n\n                        <ng-template let-customer=\"rowData\" pTemplate=\"body\">\n                            <button mat-button class=\"btn-blue action-button-table\" (click)=\"updateCusotmer(customer)\">\n                                <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n                            </button>\n                            <button mat-button data-toggle=\"modal\" data-target=\"#deleteCustomer\" (click)=\"this.setCustomerForDelete(customer)\" mat-button class=\"btn-red action-button-table\" mat-button data-toggle=\"modal\" data-target=\"#deleteCustomer\">\n                                <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                            </button>\n                            <button mat-button class=\"btn-green action-button-table\" data-toggle=\"modal\" data-target=\"#productHistoryModel\">\n                                <i class=\"fa fa-history\" aria-hidden=\"true\"></i>\n                            </button>\n                            <button mat-button class=\"btn-gray action-button-table\" data-toggle=\"modal\" data-target=\"#addStoreCredit\" (click)=this.selectCustomerForStoreCredit(customer)>\n                                <i class=\"fa fa-credit-card-alt\" aria-hidden=\"true\"></i>                                \n                                </button>\n                        </ng-template>\n                    </p-column>\n                </p-dataTable>\n\n            </div>\n        </div>\n    </mat-card-content>\n</mat-card>\n\n<form [formGroup]=\"customerForm\">\n    <p-dialog header=\"Add Customer Details\" appendTo=\"body\" [(visible)]=\"displayDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\" (onHide)=\"resrtForm()\">\n\n        <div class=\"container\">\n\n            <div class=\"row\">\n\n                <div class=\"col-md-2 p-1\">\n                    <label>Customer Name:</label>\n                </div>\n\n                <div class=\"col-md-4 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"name\" placeholder=\"Enter First and Last Name\">\n                </div>\n\n                <div class=\"col-md-2 p-1\">\n                    <label>Phone Number:</label>\n                </div>\n                <div class=\"col-md-4 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"phoneNo\" placeholder=\"Enter Phone Number\">\n\n                </div>\n\n                <!-- Second row of the cusotmer -->\n\n                <div class=\"col-md-2 p-1\">\n                    <label>Company Name:</label>\n                </div>\n\n                <div class=\"col-md-4 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"companyName\" placeholder=\"Enter Company Name\">\n                </div>\n\n                <div class=\"col-md-2 p-1\">\n                    <label>Email:</label>\n                </div>\n                <div class=\"col-md-4 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"email\" placeholder=\"Enter Email\">\n\n                </div>\n\n                <!-- thirs row of customer -->\n\n                <div class=\"col-md-2 p-1\">\n                    <label>Tax Id:</label>\n                </div>\n\n                <div class=\"col-md-4 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"taxId\" placeholder=\"Enter Tax Id\">\n                </div>\n\n                <div class=\"col-md-2 p-1\">\n                    <label>Date Of Birth:</label>\n                </div>\n                <div class=\"col-md-4 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"dateOfBirth\" placeholder=\"Enter Date Of Birth\">\n\n                </div>\n\n                <!-- forth row of customer -->\n                <div class=\"col-md-2 p-1\">\n                    <label>Customer Type:</label>\n                </div>\n\n                <div class=\"col-md-4 p-1\">\n                    <select class=\"form-control\" formControlName=\"type\">\n                                <option>Retail</option>\n                                <option>Business</option>\n                            </select>\n                </div>\n\n                <div class=\"col-md-2 p-1\">\n                    <label>Gender:</label>\n                </div>\n                <div class=\"col-md-4 p-1\">\n                    <select class=\"form-control\" formControlName=\"gender\">\n                                <option>Male</option>\n                                <option>Female</option>\n                            </select>\n                </div>\n\n                <!-- Fifth row of customer -->\n\n                <div class=\"col-md-2 p-1\">\n                    <label>Street:</label>\n                </div>\n\n                <div class=\"col-md-10 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"street\" placeholder=\"Enter Street Details\">\n                </div>\n\n                <!-- Sixth row of customer -->\n\n                <div class=\"col-md-2 p-1\">\n                    <label>City:</label>\n                </div>\n\n                <div class=\"col-md-3 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"city\">\n                </div>\n\n                <div class=\"col-md-1 p-1\">\n                    <label>State:</label>\n                </div>\n\n                <div class=\"col-md-2 p-1\">\n                    <select class=\"form-control\" formControlName=\"state\">\n                        <option value=\"AL\">Alabama</option>\n                        <option value=\"AK\">Alaska</option>\n                        <option value=\"AZ\">Arizona</option>\n                        <option value=\"AR\">Arkansas</option>\n                        <option value=\"CA\">California</option>\n                        <option value=\"CO\">Colorado</option>\n                        <option value=\"CT\">Connecticut</option>\n                        <option value=\"DE\">Delaware</option>\n                        <option value=\"DC\">District Of Columbia</option>\n                        <option value=\"FL\">Florida</option>\n                        <option value=\"GA\">Georgia</option>\n                        <option value=\"HI\">Hawaii</option>\n                        <option value=\"ID\">Idaho</option>\n                        <option value=\"IL\">Illinois</option>\n                        <option value=\"IN\">Indiana</option>\n                        <option value=\"IA\">Iowa</option>\n                        <option value=\"KS\">Kansas</option>\n                        <option value=\"KY\">Kentucky</option>\n                        <option value=\"LA\">Louisiana</option>\n                        <option value=\"ME\">Maine</option>\n                        <option value=\"MD\">Maryland</option>\n                        <option value=\"MA\">Massachusetts</option>\n                        <option value=\"MI\">Michigan</option>\n                        <option value=\"MN\">Minnesota</option>\n                        <option value=\"MS\">Mississippi</option>\n                        <option value=\"MO\">Missouri</option>\n                        <option value=\"MT\">Montana</option>\n                        <option value=\"NE\">Nebraska</option>\n                        <option value=\"NV\">Nevada</option>\n                        <option value=\"NH\">New Hampshire</option>\n                        <option value=\"NJ\">New Jersey</option>\n                        <option value=\"NM\">New Mexico</option>\n                        <option value=\"NY\">New York</option>\n                        <option value=\"NC\">North Carolina</option>\n                        <option value=\"ND\">North Dakota</option>\n                        <option value=\"OH\">Ohio</option>\n                        <option value=\"OK\">Oklahoma</option>\n                        <option value=\"OR\">Oregon</option>\n                        <option value=\"PA\">Pennsylvania</option>\n                        <option value=\"RI\">Rhode Island</option>\n                        <option value=\"SC\">South Carolina</option>\n                        <option value=\"SD\">South Dakota</option>\n                        <option value=\"TN\">Tennessee</option>\n                        <option value=\"TX\">Texas</option>\n                        <option value=\"UT\">Utah</option>\n                        <option value=\"VT\">Vermont</option>\n                        <option value=\"VA\">Virginia</option>\n                        <option value=\"WA\">Washington</option>\n                        <option value=\"WV\">West Virginia</option>\n                        <option value=\"WI\">Wisconsin</option>\n                        <option value=\"WY\">Wyoming</option>\n                    </select>\n                </div>\n\n                <div class=\"col-md-1 p-1\">\n                    <label>ZipCode:</label>\n                </div>\n                <div class=\"col-md-3 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"zipCode\" placeholder=\"Enter Zipcode\">\n                </div>\n\n            </div>\n        </div>\n\n        <p-footer>\n            <div style=\"text-align: center\">\n                <button type=\"button\" (click)=\"addCustomer()\" class=\"btn btn-success\" [disabled]=\"customerForm.invalid\">\n                            <i class=\"fa fa-paper-plane\" aria-hidden=\"true\" ></i>\n                            Save Customer Details\n                    </button>\n\n            </div>\n        </p-footer>\n\n\n    </p-dialog>\n</form>\n\n\n\n\n\n<!-- Start Of Add Store Credit -->\n<div class=\"modal fade\" id=\"addStoreCredit\" role=\"dialog\">\n    <div class=\"modal-dialog modal-lg\">\n\n        <!-- Modal content-->\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">Add Store Credit</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            </div>\n            <div class=\"modal-body\">\n\n                <div class=\"row m-1\">\n\n                    <div class=\"col-md-12 form-group\">\n                        <label>Enter Store Credit Amount:</label>\n                        <input [(ngModel)]=\"this.storeCreditAmount\" class=\"form-control\" type=\"number\">\n                    </div>\n                </div>\n\n                <div class=\"row m-1\">\n                    <div class=\"col-md-12 form-group\">\n                        <label>Enter Store Credit Reason:</label>\n                        <input class=\"form-control\" [(ngModel)]=\"this.storeCreditReason\" type=\"text\">\n                    </div>\n                </div>\n                <div class=\"row m-2 p-2\">\n                    <button type=\"button\" mat-raised-button class=\"bg-primary text-white action-button-lg m-auto\" (click)=\"this.addStoreCredit()\" data-dismiss=\"modal\">\n                            <i class=\"fa fa-plus-square\" aria-hidden=\"true\" label=\"Add\"></i>\n                        Add Store Credit\n                    </button>\n\n                    <!-- <div class=\"col-md-12\">\n                    </div> -->\n\n                </div>\n\n                <div class=\"row\">\n                    <table class=\"table\">\n                        <thead>\n                            <tr>\n                                <th>Date</th>\n                                <th>Time</th>\n                                <th>Amount</th>\n                                <th>Reason</th>\n                                <th>Given By</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let history of this.storeCreditDto\">\n                                <td>{{history.date}}</td>\n                                <td>{{history.time}}</td>\n                                <td>$ {{history.amount}}</td>\n                                <td>{{history.reason}}</td>\n                                <td>{{history.employeeName}}</td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n            </div>\n\n\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n\n\n    </div>\n\n</div>\n<!-- End of Add Store Credit Pop up -->\n\n<!-- Start of Delete Customer Popup -->\n<div class=\"modal fade\" id=\"deleteCustomer\" role=\"dialog\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">Delete Customer</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <p>Are You Sure You Want To Delete This Customer</p>\n            </div>\n            <div class=\"modal-footer\">\n\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"this.deleteCustomer()\">Yes</button>\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancle</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- End of Delete Customer Popup -->"

/***/ }),

/***/ "../../../../../src/app/customer/customer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CustomerComponent; });
/* unused harmony export PrimeCustomer */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Customer; });
/* unused harmony export StoreCreditDto */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_customer_customer_service__ = __webpack_require__("../../../../../src/app/customer/customer.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CustomerComponent = /** @class */ (function () {
    function CustomerComponent(customerService, formBuilder) {
        this.customerService = customerService;
        this.formBuilder = formBuilder;
        this.displayDialog = false;
        this.customer = new PrimeCustomer();
        this.msgs = [];
        this.showDeleteButton = true;
        this.storeCreditDto = [];
        this.addStoreCreditObject = new StoreCreditDto();
    }
    CustomerComponent.prototype.ngOnInit = function () {
        this.getCustomerDetails();
        this.customerForm = this.formBuilder.group({
            'name': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            'phoneNo': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern('^[0-9]+$')]],
            // 'phoneNo': [''],
            'username': [null],
            'email': [''],
            'dateOfBirth': [null],
            'taxId': [''],
            'street': [null],
            'zipCode': [''],
            'role': [null],
            'gender': [''],
            'city': [''],
            'state': [''],
            'type': [''],
            'companyName': ['']
        });
    };
    CustomerComponent.prototype.getCustomerDetails = function () {
        var _this = this;
        this.customerService.getCustomerDetails()
            .subscribe(function (cust) {
            _this.customerDto = cust;
            console.log('Customer Detail', _this.customerDto);
        });
    };
    CustomerComponent.prototype.showDialog = function () {
        this.displayDialog = !this.displayDialog;
    };
    CustomerComponent.prototype.resrtForm = function () {
        this.customerForm.reset();
    };
    CustomerComponent.prototype.addCustomer = function () {
        var newCustomer = this.customerForm.value;
        this.customerService.addOrUpdateCustomer(this.customerForm.value);
        this.customerDto.push(newCustomer);
        this.customerDto = this.customerDto.slice();
        this.customerForm.reset();
        this.displayDialog = false;
    };
    CustomerComponent.prototype.setCustomerForDelete = function (cust) {
        this.selectedCustomerForDelete = cust;
    };
    CustomerComponent.prototype.deleteCustomer = function () {
        this.customerService.deleteCustomer(this.selectedCustomerForDelete.phoneNo);
        this.getCustomerDetails();
        this.displayDialog = false;
    };
    CustomerComponent.prototype.showDialogToAdd = function () {
        this.newCustomer = true;
        this.customer = new PrimeCustomer();
        this.showDeleteButton = false;
        this.displayDialog = true;
    };
    CustomerComponent.prototype.updateCusotmer = function (customer) {
        this.displayDialog = true;
        //Seeting the value into form for UPDATE TODO WRITE SEPARETE METHOD FOR THIS.
        this.customerForm.get('name').setValue(customer.name);
        this.customerForm.get('phoneNo').setValue(customer.phoneNo);
        this.customerForm.get('companyName').setValue(customer.companyName);
        this.customerForm.get('email').setValue(customer.email);
        this.customerForm.get('taxId').setValue(customer.taxId);
        this.customerForm.get('dateOfBirth').setValue(customer.dateOfBirth);
        this.customerForm.get('type').setValue(customer.type);
        this.customerForm.get('gender').setValue(customer.gender);
        this.customerForm.get('street').setValue(customer.street);
        this.customerForm.get('city').setValue(customer.city);
        this.customerForm.get('state').setValue(customer.state);
        this.customerForm.get('zipCode').setValue(customer.zipCode);
    };
    CustomerComponent.prototype.showSuccess = function (severity, summary, detail) {
        this.msgs = [];
        this.msgs.push({ severity: severity, summary: summary, detail: detail });
    };
    CustomerComponent.prototype.selectCustomerForStoreCredit = function (customer) {
        var _this = this;
        this.selectedCustomerForStoreCredit = customer;
        this.customerService.getCustomerStoreCreditHistory(customer.phoneNo)
            .subscribe(function (history) {
            history.forEach(function (trans) {
                trans.time = __WEBPACK_IMPORTED_MODULE_3_moment__(trans.date).format('hh:mm A');
                trans.date = __WEBPACK_IMPORTED_MODULE_3_moment__(trans.date).format('MM/DD/YYYY');
            });
            _this.storeCreditDto = history;
        });
    };
    CustomerComponent.prototype.addStoreCredit = function () {
        this.addStoreCreditObject.amount = this.storeCreditAmount;
        this.addStoreCreditObject.reason = this.storeCreditReason;
        this.addStoreCreditObject.createdTimestamp = __WEBPACK_IMPORTED_MODULE_3_moment__(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.addStoreCreditObject.customerPhoneno = this.selectedCustomerForStoreCredit.phoneNo;
        // TODO - need to fix this when work on user module.
        this.addStoreCreditObject.employeeName = 'alok@alok.com';
        this.customerService.addStoreCredit(this.addStoreCreditObject);
    };
    CustomerComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-customer',
            template: __webpack_require__("../../../../../src/app/customer/customer.component.html"),
            styles: [__webpack_require__("../../../../../src/app/customer/customer.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_customer_customer_service__["a" /* CustomerService */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]])
    ], CustomerComponent);
    return CustomerComponent;
}());

var PrimeCustomer = /** @class */ (function () {
    function PrimeCustomer(phoneNo, name, companyName, email, taxId, dateOfBirth, type, gender, street, city, state, country, zipCode, storeCredit, balance, lastUpdatedStoreCreditDate, password, createdDate) {
        this.phoneNo = phoneNo;
        this.name = name;
        this.companyName = companyName;
        this.email = email;
        this.taxId = taxId;
        this.dateOfBirth = dateOfBirth;
        this.type = type;
        this.gender = gender;
        this.street = street;
        this.city = city;
        this.state = state;
        this.country = country;
        this.zipCode = zipCode;
        this.storeCredit = storeCredit;
        this.balance = balance;
        this.lastUpdatedStoreCreditDate = lastUpdatedStoreCreditDate;
        this.password = password;
        this.createdDate = createdDate;
    }
    return PrimeCustomer;
}());

var Customer = /** @class */ (function () {
    function Customer() {
    }
    return Customer;
}());

var StoreCreditDto = /** @class */ (function () {
    function StoreCreditDto() {
    }
    return StoreCreditDto;
}());



/***/ }),

/***/ "../../../../../src/app/customer/customer.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_customer_customer_component__ = __webpack_require__("../../../../../src/app/customer/customer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_customer_customer_service__ = __webpack_require__("../../../../../src/app/customer/customer.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_customer_customer_routing_module__ = __webpack_require__("../../../../../src/app/customer/customer-routing.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var CustomerModule = /** @class */ (function () {
    function CustomerModule() {
    }
    CustomerModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DialogModule"],
                __WEBPACK_IMPORTED_MODULE_8_app_customer_customer_routing_module__["a" /* CustomerRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DataTableModule"],
                __WEBPACK_IMPORTED_MODULE_7_app_shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["MessagesModule"],
                __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["GrowlModule"]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_5_app_customer_customer_component__["b" /* CustomerComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_6_app_customer_customer_service__["a" /* CustomerService */]],
        })
    ], CustomerModule);
    return CustomerModule;
}());



/***/ }),

/***/ "../../../../../src/app/customer/customer.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CustomerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CustomerService = /** @class */ (function () {
    function CustomerService(http) {
        this.http = http;
        this.url = __WEBPACK_IMPORTED_MODULE_3_environments_environment__["a" /* environment */].reportUrl;
    }
    CustomerService.prototype.getCustomerDetails = function () {
        return this.http.get(this.url + '/getCustomer')
            .map(this.extractData)
            .catch(this.handleError);
    };
    CustomerService.prototype.getCustomerDetailsByPhoneNo = function (phoneNo) {
        return this.http.get(this.url + '/getCustomerByPhoneNo?phoneNo=' + phoneNo)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CustomerService.prototype.getCustomerStoreCreditHistory = function (phoneNo) {
        return this.http.get(this.url + '/getCustomerStoreCreditHistory?phoneNo=' + phoneNo)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CustomerService.prototype.addOrUpdateCustomer = function (customer) {
        console.log("Customer to be Added" + customer.name);
        this.http.post(this.url + '/addCustomer', customer)
            .subscribe(function (data) {
            console.log("Response From Add Customer call" + data);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    CustomerService.prototype.addStoreCredit = function (storeCredit) {
        this.http.post(this.url + '/addCustomerStoreCredit', storeCredit)
            .subscribe(function (data) {
            console.log("Response From Add Customer Store Credit Call" + data);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    CustomerService.prototype.deleteCustomer = function (phoneNo) {
        this.http.delete(this.url + '/deleteCustomer?phoneNo=' + phoneNo)
            .subscribe(function (data) {
            console.log('Customer Deleted With this !!' + phoneNo);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    CustomerService.prototype.extractData = function (res) {
        var body = res.json();
        // console.log(body);
        return body || {};
    };
    CustomerService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    CustomerService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], CustomerService);
    return CustomerService;
}());



/***/ }),

/***/ "../../../../../src/app/employee/clockin/clockin.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/employee/clockin/clockin.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n\n    <!-- <p-growl [(value)]=\"msgs\"></p-growl> -->\n\n    <div class=\"row\" style=\"margin-top: 35px\">\n        <div class=\"col-md-10\" style=\"background-color:lightgreen;\">\n            <h2>\n                Employee\n            </h2>\n        </div>\n        <div class=\"col-md-2\">\n\n            <select class=\"form-control\">\n                <option>Today</option>\n                <option>Yesterday</option>\n                <option>This Week</option>\n                <option>Last Week</option>\n                <option>This Month</option>\n                <option>Last Month</option>\n                <option>Last 3 Months</option>\n                <option>Last 6 Months</option>\n                <option>This Year</option>\n                <option>Last Year</option>\n                <option>Custom</option>\n                                \n            </select>\n        </div>\n    </div>\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <p-header>Clock In Details</p-header>\n            <p-dataTable [value]=\"this.clockInDto\" selectionMode=\"single\" [(selection)]=\"selectedEmployee\" (onRowSelect)=\"onRowSelect($event)\" [paginator]=\"true\" rows=\"10\" [responsive]=\"true\">\n                <p-column field=\"date\" header=\"Date\"></p-column>\n                <p-column field=\"username\" header=\"Username\"></p-column>\n                <p-column field=\"clockIn\" header=\"ClockIn\" [sortable]=\"true\"></p-column>\n                <p-column field=\"clockOut\" header=\"Clock Out\" [sortable]=\"true\"></p-column>\n                <p-column field=\"noOfHours\" header=\"No Of Hours\" [sortable]=\"true\"></p-column>\n                <p-column field=\"hourlyRate\" header=\"Hourly Rate\" [sortable]=\"true\"></p-column>\n                <p-column field=\"commissionAmount\" header=\"Commission\" [sortable]=\"true\"> </p-column>\n                <p-column field=\"action\" header=\"Action\" [sortable]=\"true\">\n                    <ng-template pTemplate=\"body\">\n                        <button (click)=\"updateClockInDetails()\">\n                        <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n                      </button>\n                        <button (click)=\"deleteClockInDetails()\">\n                      <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                      </button>\n                    </ng-template>\n                </p-column>\n            </p-dataTable>\n\n        </div>\n    </div>\n</div>\n\n<!-- <form [formGroup]=\"clockInForm\"> -->\n<p-dialog header=\"Update Clock In Details\" appendTo=\"body\" [(visible)]=\"displayDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\" (onHide)=\"resrtForm()\">\n\n    <div class=\"container\">\n\n\n        <div class=\"row\">\n\n            <div class=\"col-md-2\">\n                <label>Date:</label>\n            </div>\n\n            <div class=\"col-md-4\">\n                <label>Test</label>\n            </div>\n\n            <div class=\"col-md-2\">\n                <!-- <label>Phone Number:</label> -->\n            </div>\n            <div class=\"col-md-4\">\n                <!-- <input type=\"text\" class=\"form-control\" formControlName=\"phoneNo\" placeholder=\"Enter Phone Number\"> -->\n\n            </div>\n\n            <!-- Second row of the cusotmer -->\n\n            <div class=\"col-md-2\">\n                <label>Clock In Time:</label>\n            </div>\n\n            <div class=\"col-md-4\">\n                <!-- <input type=\"text\" class=\"form-control\" formControlName=\"username\" placeholder=\"Enter Email Address\"> -->\n            </div>\n\n            <div class=\"col-md-2\">\n                <label>Clock Out Time:</label>\n            </div>\n            <div class=\"col-md-4\">\n                <!-- <input type=\"text\" class=\"form-control\" formControlName=\"password\" placeholder=\"Enter Password\"> -->\n\n            </div>\n\n            <!-- thirs row of customer -->\n\n            <div class=\"col-md-2\">\n                <label>Hourly Rate:</label>\n            </div>\n\n            <div class=\"col-md-4\">\n                <!-- <input type=\"text\" class=\"form-control\" formControlName=\"taxId\" placeholder=\"Enter Tax Id\"> -->\n            </div>\n\n            <div class=\"col-md-2\">\n                <label>Commission</label>\n            </div>\n            <div class=\"col-md-4\">\n                <!-- <input type=\"text\" class=\"form-control\" formControlName=\"dateOfBirth\" placeholder=\"Enter Date Of Birth\"> -->\n\n            </div>\n        </div>\n\n        <p-footer>\n            <div style=\"text-align: center\">\n                <button type=\"button\" class=\"btn btn-success\" [disabled]=\"\">\n                        <i class=\"fa fa-check\" aria-hidden=\"true\" (click)=\"save()\" ></i>\n                        Save Employee Details\n                    </button>\n\n                <button type=\"button\" class=\"btn btn-danger\" *ngIf=\"this.showDeleteButton\">\n                        <i class=\"fa fa-window-close\" aria-hidden=\"true\" (click)=\"delete()\"></i>\n                        Delete Employee Details\n                    </button>\n            </div>\n        </p-footer>\n\n    </div>\n</p-dialog>\n<!-- </form> -->"

/***/ }),

/***/ "../../../../../src/app/employee/clockin/clockin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ClockinComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ClockIn; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_employee_employee_service__ = __webpack_require__("../../../../../src/app/employee/employee.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ClockinComponent = /** @class */ (function () {
    function ClockinComponent(employeeService, router, route) {
        this.employeeService = employeeService;
        this.router = router;
        this.route = route;
        this.displayDialog = false;
        this.clockIn = new PrimeClockIn();
        this.showDeleteButton = true;
        this.msgs = [];
    }
    ClockinComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) {
            return _this.employeeService.getEmployeeAllClockInDetails(params.get('username'), null, null);
        })
            .subscribe(function (emp) {
            _this.clockInDto = emp;
        });
    };
    //this.getClockInDetails();
    // this.clockInForm = this.formBuilder.group(
    //     {
    // 'name': [null, Validators.required],
    // 'phoneNo': ['', [Validators.required, Validators.pattern('^[0-9]+$')]], //TODO - Need to fix this for phono no.
    // 'username': ['',[Validators.required, Validators.pattern('^[A-Za-z0-9.]+@[A-Za-z0-9.]+$')]], // TODO - Need to fox this too .com is not validating
    // 'dateOfBirth': [null],
    // 'taxId': [''],
    // 'street': [null],
    // 'role': [''],
    // 'password': [null],
    // 'gender': [''],
    // 'city': [''],
    // 'state': [''],
    // 'zipCode':  [''],
    // 'hourlyRate': [''],
    // 'commissionPercentage': ['']
    //   }
    // );
    ClockinComponent.prototype.updateClockInDetails = function () {
    };
    ClockinComponent.prototype.deleteClockInDetails = function () {
    };
    // getClockInDetails() {
    //   this.employeeService.getEmployeeClockInDetails()
    //   .subscribe((emp: ClockIn[]) => {
    //   this.clockInDto = emp;
    //   //This set the defualt value for dropdown
    //   // this.employeeForm.get('role').setValue('Admin');
    //   // this.employeeForm.get('city').setValue('Atlanta');
    //   // this.employeeForm.get('state').setValue('AB');
    //   // this.employeeForm.get('gender').setValue('Male');
    //     console.log('Employee Detail' + this.clockInDto);
    //     });
    // }
    ClockinComponent.prototype.showDialog = function () {
        this.displayDialog = !this.displayDialog;
    };
    ClockinComponent.prototype.resrtForm = function () {
        // this.clockInForm.reset();
    };
    ClockinComponent.prototype.save = function () {
        var newClockInDto = this.clockInDto.slice();
        if (this.newClockIn) {
            newClockInDto.push(this.clockIn);
            //this.employeeService.addOrUpdateEmployee(this.clockIn.value);
            this.showSuccess('success', 'Insert', 'Customer Added Successfully!!');
            //this.getClockInDetails();
            //this.clockInForm.reset();
            this.displayDialog = false;
        }
        else {
            // newEmployeeDto[this.findSelectedCustomerIndex()] = this.employee;
            // this.employeeDto = newEmployeeDto;
            // this.employeeService.addOrUpdateEmployee(this.employeeForm.value);
            // this.employee = null;
            // this.getEmployeeDetails();
            // this.showSuccess('success', 'Update', 'Employee Updated Successfully!!');
            // this.displayDialog = false;
        }
    };
    ClockinComponent.prototype.delete = function () {
        // this.employeeService.deleteEmployee(this.employeeForm.value.phoneNo);
        //               this.getEmployeeDetails();
        // this.displayDialog = false;
    };
    ClockinComponent.prototype.showDialogToAdd = function () {
        this.newClockIn = true;
        this.clockIn = new PrimeClockIn();
        this.showDeleteButton = false;
        this.displayDialog = true;
    };
    ClockinComponent.prototype.onRowSelect = function (event) {
        this.newClockIn = false;
        this.clockIn = this.cloneCar(event.data);
        this.showDeleteButton = true;
        //Seeting the value into form for UPDATE TODO WRITE SEPARETE METHOD FOR THIS.
        // this.employeeForm.get('name').setValue(event.data.name);
        // this.employeeForm.get('phoneNo').setValue(event.data.phoneNo);
        // this.employeeForm.get('username').setValue(event.data.username);
        // this.employeeForm.get('password').setValue(event.data.password);
        // this.employeeForm.get('taxId').setValue(event.data.taxId);
        // this.employeeForm.get('dateOfBirth').setValue(event.data.dateOfBirth);
        // this.employeeForm.get('role').setValue(event.data.role);
        // this.employeeForm.get('gender').setValue(event.data.gender);
        // this.employeeForm.get('street').setValue(event.data.street);
        // this.employeeForm.get('city').setValue(event.data.city);
        // this.employeeForm.get('state').setValue(event.data.state);
        // this.employeeForm.get('zipCode').setValue(event.data.zipCode);
        // this.employeeForm.get('hourlyRate').setValue(event.data.hourlyRate);
        // this.employeeForm.get('commissionPercentage').setValue(event.data.commissionPercentage);
        console.log('Customer Even', event);
        console.log(event.data);
        console.log(this.selectedEmployee);
        this.displayDialog = true;
    };
    ClockinComponent.prototype.showSuccess = function (severity, summary, detail) {
        this.msgs = [];
        this.msgs.push({ severity: severity, summary: summary, detail: detail });
    };
    //Why??
    ClockinComponent.prototype.cloneCar = function (c) {
        var emp = new PrimeClockIn();
        for (var prop in c) {
            emp[prop] = c[prop];
        }
        return emp;
    };
    ClockinComponent.prototype.findSelectedCustomerIndex = function () {
        return this.clockInDto.indexOf(this.selectedEmployee);
    };
    ClockinComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-clockin',
            template: __webpack_require__("../../../../../src/app/employee/clockin/clockin.component.html"),
            styles: [__webpack_require__("../../../../../src/app/employee/clockin/clockin.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_employee_employee_service__["a" /* EmployeeService */], __WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_2__angular_router__["ActivatedRoute"]])
    ], ClockinComponent);
    return ClockinComponent;
}());

var PrimeClockIn = /** @class */ (function () {
    function PrimeClockIn(date, userClockInId, username, clockIn, clockOut, noOfHours, hourlyRate, totalAmount, commissionAmount) {
        this.date = date;
        this.userClockInId = userClockInId;
        this.username = username;
        this.clockIn = clockIn;
        this.clockOut = clockOut;
        this.noOfHours = noOfHours;
        this.hourlyRate = hourlyRate;
        this.totalAmount = totalAmount;
        this.commissionAmount = commissionAmount;
    }
    return PrimeClockIn;
}());
var ClockIn = /** @class */ (function () {
    function ClockIn() {
    }
    return ClockIn;
}());



/***/ }),

/***/ "../../../../../src/app/employee/employee.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/employee/employee.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\n\n    <mat-card-title>\n\n        <div class=\"row d-flex align-items-center\">\n            <div class=\"col-md-7\">\n                <p-growl [(value)]=\"msgs\"></p-growl>\n                <h4>Employee Details</h4>\n            </div>\n\n            <div class=\"col-md-5 d-flex align-items-center justify-content-end\">\n                <button type=\"button\" class=\"bg-primary text-white action-button-lg m-3\" (click)=\"showDialogToAdd()\">\n                        <i class=\"fa fa-plus-square\" aria-hidden=\"true\" label=\"Add\"></i>\n                            Add Employee\n                    </button>\n\n            </div>\n        </div>\n    </mat-card-title>\n\n    <mat-card-content>\n\n\n\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <p-dataTable [value]=\"this.employeeDto\" [editable]=\"true\" scrollable=\"true\" [responsive]=\"true\" scrollHeight=\"500px\">\n                    <p-column field=\"name\" header=\"Name\" filterPlaceholder=\"Search For Employee Name\" [filter]=\"true\"></p-column>\n                    <p-column field=\"username\" header=\"Username\" filterPlaceholder=\"Search For Employee Username\" [filter]=\"true\"></p-column>\n                    <p-column field=\"phoneNo\" header=\"PhoneNo\" filterPlaceholder=\"Search For Employee Phono No\" [sortable]=\"true\" [filter]=\"true\"></p-column>\n                    <p-column field=\"role\" header=\"Role\" filterPlaceholder=\"Search For Employee Email\" [sortable]=\"true\"></p-column>\n                    <p-column field=\"commissionPercentage\" header=\"CommissionPercentage\" [sortable]=\"true\"></p-column>\n                    <p-column field=\"hourlyRate\" header=\"HourlyRate\" [sortable]=\"true\"></p-column>\n                    <p-column field=\"action\" header=\"Action\" [sortable]=\"true\">\n\n                        <ng-template let-employee=\"rowData\" pTemplate=\"body\">\n                            <button mat-button class=\"btn-blue action-button-table\" (click)=\"this.updateEmployee(employee)\">\n                                        <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n                            </button>\n                            <button mat-button class=\"btn-green action-button-table\" data-toggle=\"modal\" data-target=\"#productHistoryModel\">\n                                    <i class=\"fa fa-clock-o\" aria-hidden=\"true\"></i>\n                            </button>\n                            <button mat-button data-toggle=\"modal\" data-target=\"#deleteCustomer\" (click)=\"this.setEmployyeForDelete(employee)\" mat-button class=\"btn-red action-button-table\" mat-button data-toggle=\"modal\" data-target=\"#deleteEmployee\">\n                                        <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                            </button>\n\n                        </ng-template>\n                    </p-column>\n\n                </p-dataTable>\n\n            </div>\n        </div>\n\n    </mat-card-content>\n</mat-card>\n\n\n<form [formGroup]=\"employeeForm\">\n    <p-dialog header=\"Add Employee Details\" appendTo=\"body\" [(visible)]=\"displayDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\" (onHide)=\"resrtForm()\">\n\n        <div class=\"container\">\n\n\n            <div class=\"row\">\n\n                <div class=\"col-md-2 p-1\">\n                    <label>Employee Name:</label>\n                </div>\n\n                <div class=\"col-md-4 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"name\" placeholder=\"Enter First and Last Name\">\n                </div>\n\n                <div class=\"col-md-2 p-1\">\n                    <label>Phone Number:</label>\n                </div>\n                <div class=\"col-md-4 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"phoneNo\" placeholder=\"Enter Phone Number\">\n\n                </div>\n\n                <!-- Second row of the cusotmer -->\n\n                <div class=\"col-md-2 p-1\">\n                    <label>Username/Email:</label>\n                </div>\n\n                <div class=\"col-md-4 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"username\" placeholder=\"Enter Email Address\">\n                </div>\n\n                <div class=\"col-md-2 p-1\">\n                    <label>Password:</label>\n                </div>\n                <div class=\"col-md-4 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"password\" placeholder=\"Enter Password\">\n\n                </div>\n\n                <!-- thirs row of customer -->\n\n                <div class=\"col-md-2 p-1\">\n                    <label>Tax Id:</label>\n                </div>\n\n                <div class=\"col-md-4 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"taxId\" placeholder=\"Enter Tax Id\">\n                </div>\n\n                <div class=\"col-md-2 p-1\">\n                    <label>Date Of Birth:</label>\n                </div>\n                <div class=\"col-md-4 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"dateOfBirth\" placeholder=\"Enter Date Of Birth\" disabled=\"true\">\n\n                </div>\n\n                <!-- forth row of customer -->\n                <div class=\"col-md-2 p-1\">\n                    <label>Employee Role:</label>\n                </div>\n\n                <div class=\"col-md-4 p-1\">\n                    <select class=\"form-control\" formControlName=\"role\">\n                                <option>General</option>\n                                <option>Admin</option>\n                                <option>Manager</option>\n                            </select>\n                </div>\n\n                <div class=\"col-md-2 p-1\">\n                    <label>Gender:</label>\n                </div>\n                <div class=\"col-md-4 p-1\">\n                    <select class=\"form-control\" formControlName=\"gender\">\n                                <option>Male</option>\n                                <option>Female</option>\n                            </select>\n                </div>\n\n                <!-- Fifth row of customer -->\n\n                <div class=\"col-md-2 p-1\">\n                    <label>Hourly Rate:</label>\n                </div>\n\n                <div class=\"col-md-4 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"hourlyRate\" placeholder=\"Enter Hourly Rate\">\n                </div>\n\n                <div class=\"col-md-2 p-1\">\n                    <label>Commission %:</label>\n                </div>\n                <div class=\"col-md-4 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"commissionPercentage\" placeholder=\"Enter Commission Percentage\">\n\n                </div>\n\n\n                <!-- 6 row of customer -->\n\n                <div class=\"col-md-2 p-1\">\n                    <label>Street:</label>\n                </div>\n\n                <div class=\"col-md-10 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"street\" placeholder=\"Enter Street Details\">\n                </div>\n\n                <!-- 7 row of customer -->\n\n                <div class=\"col-md-2 p-1\">\n                    <label>City:</label>\n                </div>\n\n                <div class=\"col-md-3 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"city\">\n                </div>\n\n                <div class=\"col-md-1 p-1\">\n                    <label>State:</label>\n                </div>\n\n                <div class=\"col-md-2 p-1\">\n                    <select class=\"form-control\" ormControlName=\"state\">\n                            <option value=\"AL\">Alabama</option>\n                            <option value=\"AK\">Alaska</option>\n                            <option value=\"AZ\">Arizona</option>\n                            <option value=\"AR\">Arkansas</option>\n                            <option value=\"CA\">California</option>\n                            <option value=\"CO\">Colorado</option>\n                            <option value=\"CT\">Connecticut</option>\n                            <option value=\"DE\">Delaware</option>\n                            <option value=\"DC\">District Of Columbia</option>\n                            <option value=\"FL\">Florida</option>\n                            <option value=\"GA\">Georgia</option>\n                            <option value=\"HI\">Hawaii</option>\n                            <option value=\"ID\">Idaho</option>\n                            <option value=\"IL\">Illinois</option>\n                            <option value=\"IN\">Indiana</option>\n                            <option value=\"IA\">Iowa</option>\n                            <option value=\"KS\">Kansas</option>\n                            <option value=\"KY\">Kentucky</option>\n                            <option value=\"LA\">Louisiana</option>\n                            <option value=\"ME\">Maine</option>\n                            <option value=\"MD\">Maryland</option>\n                            <option value=\"MA\">Massachusetts</option>\n                            <option value=\"MI\">Michigan</option>\n                            <option value=\"MN\">Minnesota</option>\n                            <option value=\"MS\">Mississippi</option>\n                            <option value=\"MO\">Missouri</option>\n                            <option value=\"MT\">Montana</option>\n                            <option value=\"NE\">Nebraska</option>\n                            <option value=\"NV\">Nevada</option>\n                            <option value=\"NH\">New Hampshire</option>\n                            <option value=\"NJ\">New Jersey</option>\n                            <option value=\"NM\">New Mexico</option>\n                            <option value=\"NY\">New York</option>\n                            <option value=\"NC\">North Carolina</option>\n                            <option value=\"ND\">North Dakota</option>\n                            <option value=\"OH\">Ohio</option>\n                            <option value=\"OK\">Oklahoma</option>\n                            <option value=\"OR\">Oregon</option>\n                            <option value=\"PA\">Pennsylvania</option>\n                            <option value=\"RI\">Rhode Island</option>\n                            <option value=\"SC\">South Carolina</option>\n                            <option value=\"SD\">South Dakota</option>\n                            <option value=\"TN\">Tennessee</option>\n                            <option value=\"TX\">Texas</option>\n                            <option value=\"UT\">Utah</option>\n                            <option value=\"VT\">Vermont</option>\n                            <option value=\"VA\">Virginia</option>\n                            <option value=\"WA\">Washington</option>\n                            <option value=\"WV\">West Virginia</option>\n                            <option value=\"WI\">Wisconsin</option>\n                            <option value=\"WY\">Wyoming</option>\n                        \n                    </select>\n                </div>\n\n                <div class=\"col-md-1 p-1\">\n                    <label>ZipCode:</label>\n                </div>\n                <div class=\"col-md-3 p-1\">\n                    <input type=\"text\" class=\"form-control\" formControlName=\"zipCode\" placeholder=\"Enter Zipcode\">\n                </div>\n\n            </div>\n        </div>\n\n\n        <p-footer>\n            <div style=\"text-align: center\">\n                <button type=\"button\" class=\"btn btn-success\" [disabled]=\"employeeForm.invalid\" (click)=\"this.addEmployee()\">\n                        <i class=\"fa fa-paper-plane\" aria-hidden=\"true\" ></i>\n                        Save Employee Details\n                    </button>\n            </div>\n        </p-footer>\n\n\n    </p-dialog>\n</form>\n\n\n<!-- Start of Delete Employee Popup -->\n<div class=\"modal fade\" id=\"deleteEmployee\" role=\"dialog\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">Delete Employee</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <p>Are You Sure You Want To Delete This Employee</p>\n            </div>\n            <div class=\"modal-footer\">\n\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"this.deleteEmployee()\">Yes</button>\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancle</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- End of Delete Employee Popup -->"

/***/ }),

/***/ "../../../../../src/app/employee/employee.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeComponent; });
/* unused harmony export PrimeEmployee */
/* unused harmony export Employee */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_employee_employee_service__ = __webpack_require__("../../../../../src/app/employee/employee.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EmployeeComponent = /** @class */ (function () {
    function EmployeeComponent(employeeService, formBuilder, router) {
        this.employeeService = employeeService;
        this.formBuilder = formBuilder;
        this.router = router;
        this.displayDialog = false;
        this.employee = new PrimeEmployee();
        this.msgs = [];
    }
    EmployeeComponent.prototype.ngOnInit = function () {
        this.getEmployeeDetails();
        this.employeeForm = this.formBuilder.group({
            'name': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            'phoneNo': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern('^[0-9]+$')]],
            'username': ['', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].pattern('^[A-Za-z0-9.]+@[A-Za-z0-9.]+$')]],
            'dateOfBirth': [null],
            'taxId': [''],
            'street': [null],
            'role': [''],
            'password': [null],
            'gender': [''],
            'city': [''],
            'state': [''],
            'zipCode': [''],
            'hourlyRate': [''],
            'commissionPercentage': [''],
            'id': ['']
        });
    };
    EmployeeComponent.prototype.employeeClockInDetails = function (event) {
        //this.employeeService.saveData(event.data.username);
        console.log('employeeObjectFrom ui', event);
        this.router.navigate(['/clockIn', event.username]);
    };
    EmployeeComponent.prototype.getEmployeeDetails = function () {
        var _this = this;
        this.employeeService.getEmployeeDetails()
            .subscribe(function (emp) {
            _this.employeeDto = emp;
        });
    };
    EmployeeComponent.prototype.showDialog = function () {
        this.displayDialog = !this.displayDialog;
    };
    EmployeeComponent.prototype.showDialogToAdd = function () {
        this.employee = new PrimeEmployee();
        this.displayDialog = true;
    };
    EmployeeComponent.prototype.resrtForm = function () {
        this.employeeForm.reset();
    };
    EmployeeComponent.prototype.addEmployee = function () {
        this.employeeService.addOrUpdateEmployee(this.employeeForm.value);
        this.employeeForm.reset();
        this.displayDialog = false;
    };
    EmployeeComponent.prototype.updateEmployee = function (employee) {
        this.displayDialog = true;
        //Seeting the value into form for UPDATE TODO WRITE SEPARETE METHOD FOR THIS.
        this.employeeForm.get('name').setValue(employee.name);
        this.employeeForm.get('phoneNo').setValue(employee.phoneNo);
        this.employeeForm.get('username').setValue(employee.username);
        this.employeeForm.get('password').setValue(employee.password);
        this.employeeForm.get('taxId').setValue(employee.taxId);
        this.employeeForm.get('dateOfBirth').setValue(employee.dateOfBirth);
        this.employeeForm.get('role').setValue(employee.role);
        this.employeeForm.get('gender').setValue(employee.gender);
        this.employeeForm.get('street').setValue(employee.street);
        this.employeeForm.get('city').setValue(employee.city);
        this.employeeForm.get('state').setValue(employee.state);
        this.employeeForm.get('zipCode').setValue(employee.zipCode);
        this.employeeForm.get('hourlyRate').setValue(employee.hourlyRate);
        this.employeeForm.get('commissionPercentage').setValue(employee.commissionPercentage);
        this.employeeForm.get('id').setValue(employee.id);
    };
    EmployeeComponent.prototype.setEmployyeForDelete = function (employee) {
        this.selectedEmployeeForDelete = employee;
    };
    EmployeeComponent.prototype.deleteEmployee = function () {
        this.employeeService.deleteEmployee(this.selectedEmployeeForDelete.id);
        this.getEmployeeDetails();
    };
    EmployeeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-employee',
            template: __webpack_require__("../../../../../src/app/employee/employee.component.html"),
            styles: [__webpack_require__("../../../../../src/app/employee/employee.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_employee_employee_service__["a" /* EmployeeService */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"]])
    ], EmployeeComponent);
    return EmployeeComponent;
}());

var PrimeEmployee = /** @class */ (function () {
    function PrimeEmployee(name, username, phoneNo, email, taxId, dateOfBirth, role, gender, address, commissionPercentage, storeCredit, lastUpdatedStoreCreditDate, password, hourlyRate, createdDate) {
        this.name = name;
        this.username = username;
        this.phoneNo = phoneNo;
        this.email = email;
        this.taxId = taxId;
        this.dateOfBirth = dateOfBirth;
        this.role = role;
        this.gender = gender;
        this.address = address;
        this.commissionPercentage = commissionPercentage;
        this.storeCredit = storeCredit;
        this.lastUpdatedStoreCreditDate = lastUpdatedStoreCreditDate;
        this.password = password;
        this.hourlyRate = hourlyRate;
        this.createdDate = createdDate;
    }
    return PrimeEmployee;
}());

var Employee = /** @class */ (function () {
    function Employee() {
    }
    return Employee;
}());



/***/ }),

/***/ "../../../../../src/app/employee/employee.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__employee_component__ = __webpack_require__("../../../../../src/app/employee/employee.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_employee_employee_service__ = __webpack_require__("../../../../../src/app/employee/employee.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__clockin_clockin_component__ = __webpack_require__("../../../../../src/app/employee/clockin/clockin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_sell_sell_routing_module__ = __webpack_require__("../../../../../src/app/sell/sell-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var EmployeeModule = /** @class */ (function () {
    function EmployeeModule() {
    }
    EmployeeModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DialogModule"],
                __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DataTableModule"],
                __WEBPACK_IMPORTED_MODULE_8_app_shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["MessagesModule"],
                __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["GrowlModule"],
                __WEBPACK_IMPORTED_MODULE_7_app_sell_sell_routing_module__["a" /* SellRoutingModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__employee_component__["a" /* EmployeeComponent */], __WEBPACK_IMPORTED_MODULE_6__clockin_clockin_component__["b" /* ClockinComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_5_app_employee_employee_service__["a" /* EmployeeService */]]
        })
    ], EmployeeModule);
    return EmployeeModule;
}());



/***/ }),

/***/ "../../../../../src/app/employee/employee.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EmployeeService = /** @class */ (function () {
    function EmployeeService(http) {
        this.http = http;
        this.sharingData = { name: 'test' };
        this.url = __WEBPACK_IMPORTED_MODULE_3_environments_environment__["a" /* environment */].reportUrl;
    }
    EmployeeService.prototype.saveData = function (str) {
        console.log('save data function called' + str + 'sharing data name' + this.sharingData.name);
        this.sharingData.name = str;
        console.log('sharing data now' + this.sharingData.name);
    };
    EmployeeService.prototype.getData = function () {
        console.log('get data function called' + this.sharingData.name + 'sdfdsfdsfsd');
        return this.sharingData.name;
    };
    EmployeeService.prototype.getEmployeeDetails = function () {
        return this.http.get(this.url + '/getEmployee')
            .map(this.extractData)
            .catch(this.handleError);
    };
    EmployeeService.prototype.validateEmployee = function (username, password) {
        return this.http.get(this.url + '/validateEmployeeForClockIn?username=' + username + '&password=' + password)
            .map(this.extractDataForLogin)
            .catch(this.handleError);
    };
    EmployeeService.prototype.getEmployeeClockInDetails = function (username, startDate, endDate) {
        console.log('Username coming from the clock In component' + username);
        return this.http.get(this.url + '/getClockIn?username=' + username + '&startDate=' + startDate + '&endDate=' + endDate)
            .map(this.extractData)
            .catch(this.handleError);
    };
    EmployeeService.prototype.getEmployeeAllClockInDetails = function (username, startDate, endDate) {
        console.log('Username coming from the clock In component' + username);
        return this.http.get(this.url + '/getAllClockIn?username=' + username + '&startDate=' + startDate + '&endDate=' + endDate)
            .map(this.extractData)
            .catch(this.handleError);
    };
    EmployeeService.prototype.addOrUpdateEmployee = function (employee) {
        console.log('Employee to be Added' + employee.name);
        this.http.post(this.url + '/addEmployee', employee)
            .subscribe(function (data) {
            console.log('Response From Add Employee call' + data);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    EmployeeService.prototype.addClockInDetails = function (clockIn) {
        return this.http.post(this.url + '/addClockIn', clockIn)
            .map(this.extractData)
            .catch(this.handleError);
    };
    EmployeeService.prototype.deleteEmployee = function (id) {
        this.http.delete(this.url + '/deleteEmployee?id=' + id)
            .subscribe(function (data) {
            console.log('Customer Deleted With this !!' + id);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    EmployeeService.prototype.extractData = function (res) {
        var body = res.json();
        // console.log(body);
        return body || {};
    };
    EmployeeService.prototype.extractDataForLogin = function (res) {
        var body = res.json();
        // console.log(body);
        return body || {};
    };
    EmployeeService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    EmployeeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], EmployeeService);
    return EmployeeService;
}());



/***/ }),

/***/ "../../../../../src/app/expense/expense.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/expense/expense.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl [(value)]=\"msgs\"></p-growl>\n\n<mat-card>\n    <mat-card-title>\n        <h3>\n            Expense Details\n        </h3>\n    </mat-card-title>\n    <mat-card-content>\n\n        <div class=\"row d-flex align-items-center\">\n            <div class=\"col-md-2\">\n\n\n                <select class=\"form-control\" [(ngModel)]=\"this.expenseDropDown\" (change)=\"getExpenseDetails()\">\n                        <option>Today</option>\n                        <option>Yesterday</option>\n                        <option>This Week</option>\n                        <option>Last Week</option>\n                        <option>This Month</option>\n                        <option>Last Month</option>\n                        <option>Last 3 Months</option>\n                        <option>Last 6 Months</option>\n                        <option>This Year</option>\n                        <option>Last Year</option>\n                        <option>Custom</option>\n                                \n                    </select>\n            </div>\n\n            <div class=\"col-md-5\">\n\n            </div>\n\n            <div class=\"col-md-5 d-flex align-items-center justify-content-end\">\n                <button type=\"button\" class=\"bg-primary text-white action-button-lg m-3\" data-toggle=\"modal\" data-target=\"#addExpense\">\n                    <i class=\"fa fa-plus-square\" aria-hidden=\"true\" label=\"Add\"></i>\n                        Add Expnese\n                </button>\n\n            </div>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <p-dataTable [value]=\"this.expenseDto\" scrollable=\"true\" [responsive]=\"true\" scrollHeight=\"500px\">\n                    <p-column field=\"expenseName\" header=\"Expense Name\" filterPlaceholder=\"Search By Expense Name\" [filter]=\"true\"></p-column>\n                    <p-column [style]=\"{'width': '8%'}\" field=\"date\" header=\"Date\" [sortable]=\"true\"></p-column>\n                    <p-column [style]=\"{'width': '8%'}\" field=\"time\" header=\"Time\" [sortable]=\"true\"></p-column>\n                    <p-column [style]=\"{'width': '8%'}\" field=\"amount\" header=\"Amount\">\n                        <ng-template let-expense=\"rowData\" pTemplate=\"body\">\n                            {{expense.amount | currency:'USD':'true'}}\n                        </ng-template>\n                    </p-column>\n                    <p-column field=\"expenseOwner\" header=\"Expense Owner\" [sortable]=\"true\"></p-column>\n                    <p-column field=\"expenseDocument\" header=\"Expense Document\"></p-column>\n                    <p-column field=\"expenseNotes\" header=\"Expense Notes\"></p-column>\n                    <p-column field=\"action\" header=\"Action\" [style]=\"{'width': '10%'}\">\n                        <ng-template let-expense=\"rowData\" pTemplate=\"body\">\n                            <button mat-button class=\"btn-blue action-button-table\" (click)=\"this.updateExpense(expense)\" data-toggle=\"modal\" data-target=\"#addExpense\">\n                                    <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n                                </button>\n                            <button mat-button class=\"btn-red action-button-table\" (click)=\"this.setExpenseForDelete(expense)\" data-toggle=\"modal\" data-target=\"#deleteExpense\">\n                                    <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                                </button>\n                            <button mat-button class=\"btn-green action-button-table\" data-toggle=\"modal\" data-target=\"#productHistoryModel\">\n                                    <i class=\"fa fa-history\" aria-hidden=\"true\"></i>\n                                </button>\n                        </ng-template>\n                    </p-column>\n\n                </p-dataTable>\n\n            </div>\n        </div>\n    </mat-card-content>\n</mat-card>\n\n<!-- Start Of Add Expense popup -->\n<form [formGroup]=\"expenseForm\">\n    <div class=\"modal fade\" id=\"addExpense\" role=\"dialog\">\n        <div class=\"modal-dialog modal-lg\">\n\n            <!-- Modal content-->\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <h4 class=\"modal-title\">Add Expense</h4>\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                </div>\n                <div class=\"modal-body\">\n\n                    <div class=\"row m-1\">\n\n                        <div class=\"col-md-6 form-group\">\n                            <label>Expense Name :</label>\n                        </div>\n                        <div class=\"col-md-6 form-group\">\n                            <select class=\"form-control\" formControlName=\"expenseName\" name=\"expenseName\">\n                                        <option *ngFor = \"let expenseName of this.expenseNameDto\">\n                                            {{expenseName.expenseName}}\n                                        </option>\n                                    </select>\n                            <!-- <input type=\"text\" class=\"form-control\" formControlName=\"expenseName\" /> -->\n                        </div>\n                    </div>\n\n\n                    <div class=\"row m-1\">\n\n                        <div class=\"col-md-6 form-group\">\n                            <label>Expense Date :</label>\n                        </div>\n                        <div class=\"col-md-6 form-group\">\n                            <input type=\"text\" class=\"form-control\" formControlName=\"date\" />\n                        </div>\n                    </div>\n\n\n                    <div class=\"row m-1\">\n\n                        <div class=\"col-md-6 form-group\">\n                            <label>Expense Amount :</label>\n                        </div>\n                        <div class=\"col-md-6 form-group\">\n                            <input type=\"number\" class=\"form-control\" formControlName=\"amount\" />\n                        </div>\n                    </div>\n\n\n                    <div class=\"row m-1\">\n\n                        <div class=\"col-md-6 form-group\">\n                            <label>Expense Owner :</label>\n                        </div>\n                        <div class=\"col-md-6 form-group\">\n                            <input type=\"text\" class=\"form-control\" formControlName=\"expenseOwner\" />\n                        </div>\n                    </div>\n\n\n                    <div class=\"row m-1\">\n\n                        <div class=\"col-md-6 form-group\">\n                            <label>Expense Document :</label>\n                        </div>\n                        <div class=\"col-md-6 form-group\">\n                            <input type=\"text\" class=\"form-control\" formControlName=\"expenseDocument\" />\n                        </div>\n                    </div>\n\n                    <div class=\"row m-1\">\n\n                        <div class=\"col-md-6 form-group\">\n                            <label>Expense Notes :</label>\n                        </div>\n                        <div class=\"col-md-6 form-group\">\n                            <textarea rows=\"6\" cols=\"40\" formControlName=\"expenseNotes\">\n                            </textarea>\n\n                        </div>\n                    </div>\n\n                    <hr>\n                    <div class=\"row m-1\">\n\n                        <div class=\"col-md-12 form-group d-flex justify-content-center\">\n                            <button mat-raised-button class=\"bg btn-green text-white m-2 action-button-lg\" data-dismiss=\"modal\" (click)=\"this.addExpense()\" type=\"submit\" [disabled]=\"expenseForm.invalid\">\n                                <i class=\"fa fa-paper-plane\" aria-hidden=\"true\" ></i>\n                                Add Expense\n                            </button>\n                        </div>\n\n                    </div>\n\n                </div>\n\n\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n                </div>\n            </div>\n\n\n        </div>\n\n    </div>\n</form>\n<!-- Start Of Add Expense popup -->\n\n<!-- Start of Delete Brand Popup -->\n<div class=\"modal fade\" id=\"deleteExpense\" role=\"dialog\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">Delete Expense</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <p>Are You Sure You Want To Delete This Expense</p>\n            </div>\n            <div class=\"modal-footer\">\n\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"this.deleteExpense()\">Yes</button>\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancle</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- End of Delete Brand Popup -->"

/***/ }),

/***/ "../../../../../src/app/expense/expense.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExpenseComponent; });
/* unused harmony export Expense */
/* unused harmony export ExpenseNameDto */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_expense_expense_service__ = __webpack_require__("../../../../../src/app/expense/expense.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_shared_services_date_service__ = __webpack_require__("../../../../../src/app/shared/services/date.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ExpenseComponent = /** @class */ (function () {
    function ExpenseComponent(expenseService, formBuilder, router, dateService) {
        this.expenseService = expenseService;
        this.formBuilder = formBuilder;
        this.router = router;
        this.dateService = dateService;
        this.expense = new PrimeExpense();
        this.msgs = [];
        this.selectedExpenseForDelete = new Expense();
        this.expenseDropDown = 'Today';
        this.dateDto = new __WEBPACK_IMPORTED_MODULE_5_app_shared_services_date_service__["a" /* DateDto */]();
    }
    ExpenseComponent.prototype.ngOnInit = function () {
        this.getExpenseDetails();
        this.getExpenseNameList();
        this.getEmployeeDetails();
        this.expenseForm = this.formBuilder.group({
            'expenseName': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            'date': [null],
            'amount': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required],
            'expenseOwner': [null],
            'expenseNotes': [null],
            'expenseId': [null],
            'expenseDocument': [null]
        });
    };
    ExpenseComponent.prototype.getExpenseHistory = function (event) {
        //this.employeeService.saveData(event.data.username);
        console.log('employeeObjectFrom ui', event);
        this.router.navigate(['/clockIn', event.username]);
    };
    ExpenseComponent.prototype.getExpenseDetails = function () {
        var _this = this;
        this.dateDto = this.dateService.getDateByInput(this.expenseDropDown);
        this.expenseService.getExpenseDetails(this.dateDto.startDate, this.dateDto.endDate)
            .subscribe(function (emp) {
            emp.forEach(function (emp) {
                emp.time = __WEBPACK_IMPORTED_MODULE_4_moment__(emp.date).format('hh:mm A');
                emp.date = __WEBPACK_IMPORTED_MODULE_4_moment__(emp.date).format('MM-DD-YYYY');
            });
            _this.expenseDto = emp;
            console.log('Expense Detail', _this.expenseDto);
        });
    };
    ExpenseComponent.prototype.getExpenseNameList = function () {
        var _this = this;
        this.expenseService.getExpenseNameDetails()
            .subscribe(function (pro) {
            _this.expenseNameDto = pro;
            //This set the defualt value for dropdown
            _this.expenseForm.get('expenseName').setValue(_this.expenseNameDto[0].expenseName);
            console.log('Expense List', _this.expenseNameDto);
        });
    };
    //This is for drop down menu to choose the employee for.
    ExpenseComponent.prototype.getEmployeeDetails = function () {
        var _this = this;
        this.expenseService.getEmployeeDetails()
            .subscribe(function (pro) {
            _this.employeeDto = pro;
            //This set the defualt value for dropdown
            _this.expenseForm.get('expenseOwner').setValue(_this.employeeDto[0].name);
            console.log('Employee List', _this.employeeDto);
        });
    };
    ExpenseComponent.prototype.addExpense = function () {
        this.expenseService.addOrUpdateExpense(this.expenseForm.value);
        this.resrtForm();
    };
    ExpenseComponent.prototype.updateExpense = function (expense) {
        this.expenseForm.get('expenseName').setValue(expense.expenseName);
        this.expenseForm.get('date').setValue(expense.date);
        this.expenseForm.get('amount').setValue(expense.amount);
        this.expenseForm.get('expenseOwner').setValue(expense.expenseOwner);
        this.expenseForm.get('expenseId').setValue(expense.expenseId);
        this.expenseForm.get('expenseDocument').setValue(expense.expenseDocument);
        this.expenseForm.get('expenseNotes').setValue(expense.expenseNotes);
    };
    ExpenseComponent.prototype.setExpenseForDelete = function (expense) {
        this.selectedExpenseForDelete = expense;
    };
    ExpenseComponent.prototype.deleteExpense = function () {
        this.expenseService.deleteExpense(this.selectedExpenseForDelete.expenseId);
    };
    ExpenseComponent.prototype.resrtForm = function () {
        //Need to do this because when you close the popup its not showing value into dropdow list.
        this.expenseForm.reset();
        this.expenseForm.reset();
        this.expenseForm.get('expenseName').setValue(this.expenseNameDto[0].expenseName);
        this.expenseForm.get('expenseOwner').setValue(this.employeeDto[0].name);
    };
    ExpenseComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-expense',
            template: __webpack_require__("../../../../../src/app/expense/expense.component.html"),
            styles: [__webpack_require__("../../../../../src/app/expense/expense.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_expense_expense_service__["a" /* ExpenseService */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_5_app_shared_services_date_service__["b" /* DateService */]])
    ], ExpenseComponent);
    return ExpenseComponent;
}());

var PrimeExpense = /** @class */ (function () {
    function PrimeExpense(expenseId, expenseName, date, amount, expenseOwner, expenseDocument, expenseNotes) {
        this.expenseId = expenseId;
        this.expenseName = expenseName;
        this.date = date;
        this.amount = amount;
        this.expenseOwner = expenseOwner;
        this.expenseDocument = expenseDocument;
        this.expenseNotes = expenseNotes;
    }
    return PrimeExpense;
}());
var Expense = /** @class */ (function () {
    function Expense() {
    }
    return Expense;
}());

var ExpenseNameDto = /** @class */ (function () {
    function ExpenseNameDto() {
    }
    return ExpenseNameDto;
}());



/***/ }),

/***/ "../../../../../src/app/expense/expense.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExpenseModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__expense_component__ = __webpack_require__("../../../../../src/app/expense/expense.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_sell_sell_routing_module__ = __webpack_require__("../../../../../src/app/sell/sell-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_expense_expense_service__ = __webpack_require__("../../../../../src/app/expense/expense.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var ExpenseModule = /** @class */ (function () {
    function ExpenseModule() {
    }
    ExpenseModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DialogModule"],
                __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["DataTableModule"],
                __WEBPACK_IMPORTED_MODULE_7_app_shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["MessagesModule"],
                __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["GrowlModule"],
                __WEBPACK_IMPORTED_MODULE_5_app_sell_sell_routing_module__["a" /* SellRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["CalendarModule"],
                __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["InputTextareaModule"],
                __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["FileUploadModule"]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__expense_component__["a" /* ExpenseComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_6_app_expense_expense_service__["a" /* ExpenseService */]]
        })
    ], ExpenseModule);
    return ExpenseModule;
}());



/***/ }),

/***/ "../../../../../src/app/expense/expense.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExpenseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ExpenseService = /** @class */ (function () {
    function ExpenseService(http) {
        this.http = http;
        this.url = __WEBPACK_IMPORTED_MODULE_3_environments_environment__["a" /* environment */].reportUrl;
    }
    ExpenseService.prototype.getExpenseDetails = function (startDate, endDate) {
        return this.http.get(this.url + '/getExpense?startDate=' + startDate + '&endDate=' + endDate)
            .map(this.extractData)
            .catch(this.handleError);
    };
    //This call to get expnese name for dropwodn on add expense page
    ExpenseService.prototype.getExpenseNameDetails = function () {
        return this.http.get(this.url + '/getExpenseNames')
            .map(this.extractData)
            .catch(this.handleError);
    };
    ExpenseService.prototype.getEmployeeDetails = function () {
        return this.http.get(this.url + '/getEmployee')
            .map(this.extractData)
            .catch(this.handleError);
    };
    ExpenseService.prototype.addOrUpdateExpense = function (expense) {
        console.log('Expense Added' + expense.expenseName);
        this.http.post(this.url + '/addExpense', expense)
            .subscribe(function (data) {
            console.log(data);
            // this.getExpenseNameDetails();
            console.log("getExpnese call is done !!");
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    ExpenseService.prototype.deleteExpense = function (expenseId) {
        this.http.delete(this.url + '/deleteExpense?expenseId=' + expenseId)
            .subscribe(function (data) {
            alert('Expense Deleted !!');
            console.log(data);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    ExpenseService.prototype.extractData = function (res) {
        var body = res.json();
        // console.log(body);
        return body || {};
    };
    ExpenseService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    ExpenseService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], ExpenseService);
    return ExpenseService;
}());



/***/ }),

/***/ "../../../../../src/app/loading.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoadingService = /** @class */ (function () {
    function LoadingService() {
        this.loading = false;
    }
    LoadingService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], LoadingService);
    return LoadingService;
}());



/***/ }),

/***/ "../../../../../src/app/product/add-inventory/add-inventory.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/product/add-inventory/add-inventory.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-title>\n        Add Product Inventory\n    </mat-card-title>\n    <mat-card-content>\n        <div class=\"row\">\n            <div class=\"col-lg-5\">\n                <select class=\"form-control form-control-lg\" [(ngModel)]=\"this.selectedVendor\" (change)=\"onVendorChoose()\">\n                                <option>Please Select Vendor</option>\n                             <option *ngFor=\"let vendor of this.vendorDto\">\n                                 {{vendor.name}}\n                             </option>\n                            </select>\n            </div>\n            <div class=\"col-lg-7\">\n\n                <p-autoComplete [(ngModel)]=\"p\" class=\"full-width m-1\" [suggestions]=\"product\" placeholder=\"Scan or Search Product\" (completeMethod)=\"filterProducts($event)\" name=\"test\" [minLength]=\"3\" (keyup.enter)=\"submitProduct(p)\" field=\"description\">\n                </p-autoComplete>\n                <span style=\"margin-left:10px\"></span>\n\n                <!-- <button type=\"button \" (click)=\"this.test(10)\" class=\"btn btn-success \">Add Product</button> -->\n            </div>\n\n        </div>\n\n        <div class=\"row\">\n            <!-- Product Table -->\n            <p-dataTable [value]=\"this.productInventotyList\" scrollable=\"true\" [responsive]=\"true\" scrollHeight=\"300px\" [editable]=\"true\" (onEditComplete)=\"updateInventoryDetails($event)\">\n                <p-header>Add Product Inventory Table</p-header>\n\n                <p-column field=\"productNo\" header=\"ProductNo\" [style]=\"{'width':'15%','text-align':'center', 'overflow':'visible'}\"></p-column>\n                <p-column field=\"description\" header=\"Description\" [style]=\"{'width':'50%','text-align':'center', 'overflow':'visible'}\"></p-column>\n                <p-column field=\"defaultQuantity\" header=\"Quantity\" [editable]=\"true\"></p-column>\n                <p-column field=\"cost\" header=\"Cost\" [editable]=\"true\"></p-column>\n                <p-column field=\"retail\" header=\"Retail\" [editable]=\"true\"></p-column>\n                <p-column field=\"quantity\" header=\"In-Stock\"></p-column>\n                <p-column field=\"totalProductPrice\" header=\"Total\"></p-column>\n                <p-column header=\"\" styleClass=\"col-button\" [style]=\"{'width':'3%','text-align':'center', 'overflow':'visible'}\">\n                    <!-- <ng-template pTemplate=\"header\">\n                                    <button type=\"button\" pButton icon=\"fa-refresh\"></button>\n                                </ng-template> -->\n                    <ng-template let-product=\"rowData\" pTemplate=\"body\">\n\n                        <button mat-button class=\"btn-red action-button-table\" mat-button (click)=\"this.setProductForDelete(product)\" data-toggle=\"modal\" data-target=\"#removeProductInventory\">\n                                <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                            </button>\n                    </ng-template>\n                </p-column>\n\n\n            </p-dataTable>\n        </div>\n    </mat-card-content>\n\n    <mat-card-footer class=\"d-flex justify-content-md-center\">\n\n        <button class=\"bg-danger text-white m-3 action-button-lg\" mat-raised-button data-toggle=\"modal\" data-target=\"#removeProductInventory\" (click)=\"this.setHeaderForRemoveAllInventoryProduct()\">\n                    <i class=\"fa fa-trash\">\n                        Remove All Products\n                    </i>\n                </button>\n\n        <button class=\"bg btn-green text-white m-3 action-button-lg\" mat-raised-button data-toggle=\"modal\" data-target=\"#removeProductInventory\" (click)=\"this.setHeaderForAddProductInventory()\"> \n                        <i class=\"fa fa-paper-plane\" aria-hidden=\"true\" >\n                                Add All Products\n                        </i>\n                     \n                </button>\n    </mat-card-footer>\n</mat-card>\n\n\n\n\n<!-- Start of Product and Sale discard Pop up -->\n\n<div class=\"modal fade\" id=\"removeProductInventory\" role=\"dialog\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">{{this.popupHeader}}</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <p>{{this.popupMessage}}</p>\n            </div>\n            <div class=\"modal-footer\">\n\n                <!-- This logic to reuse the model code cause i need popup for delete single product and also delete complete sale -->\n                <button *ngIf=\"this.popupHeader == 'Remove Product Inventory' \" type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"this.deleteProduct()\">Yes</button>\n                <button *ngIf=\"this.popupHeader == 'Remove All Products Inventory'\" type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"this.removeAllProductInventory()\">Yes</button>\n\n                <button *ngIf=\"this.popupHeader == 'Add All Product Inventory' \" type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\" (click)=\"this.addProductInventoryToBackEnd()\">Yes</button>\n\n                <!-- TODO Add one more button for add product if it does not exists -->\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancle</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- End of Product and Sale discard Pop up -->"

/***/ }),

/***/ "../../../../../src/app/product/add-inventory/add-inventory.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddInventoryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_product_product_service__ = __webpack_require__("../../../../../src/app/product/product.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_product_product_component__ = __webpack_require__("../../../../../src/app/product/product.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_sell_sell_service__ = __webpack_require__("../../../../../src/app/sell/sell.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_shared_services_persistence_service__ = __webpack_require__("../../../../../src/app/shared/services/persistence.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_toastr__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AddInventoryComponent = /** @class */ (function () {
    function AddInventoryComponent(saleService, productService, persit, toastr) {
        this.saleService = saleService;
        this.productService = productService;
        this.persit = persit;
        this.toastr = toastr;
        this.productInventoryObject = new __WEBPACK_IMPORTED_MODULE_2_app_product_product_component__["b" /* ProductInventory */]();
        this.vendorDto = [];
        this.filteredProductByVendor = [];
    }
    AddInventoryComponent.prototype.ngOnInit = function () {
        this.getProductDetails();
        this.getVendorDetails();
        this.productInventotyList = this.persit.getProductInventoryForAdd() || [];
    };
    AddInventoryComponent.prototype.getProductDetails = function () {
        var _this = this;
        this.saleService.getProductDetails()
            .subscribe(function (pro) {
            _this.productDto = pro;
            _this.filteredProductByVendor = _this.productDto;
            console.log('ProductList' + _this.productDto);
        });
    };
    AddInventoryComponent.prototype.getVendorDetails = function () {
        var _this = this;
        this.productService.getVendorDetails()
            .subscribe(function (vendors) {
            _this.vendorDto = vendors;
            // this.form.get('vendor').setValue(this.vendorDto[0]);
        });
    };
    // TODO NEED TO make it common so i can use other places too.
    AddInventoryComponent.prototype.filterProducts = function (event) {
        var _this = this;
        var query = event.query;
        this.saleService.getProductDetails()
            .subscribe(function (products) {
            // console.log(products);
            _this.product = _this.filterProduct(query, products);
        });
    };
    AddInventoryComponent.prototype.filterProduct = function (query, products) {
        var filtered = [];
        for (var i = 0; i < products.length; i++) {
            var p = products[i];
            if (p.description.toLowerCase().includes(query.toLowerCase())) {
                filtered.push(p);
            }
        }
        return filtered;
    };
    // This method helps when user try to change retial price or quanity from the sell text box.
    AddInventoryComponent.prototype.submitProduct = function (value) {
        console.log('This is value: ', value);
        if (typeof value === 'string') {
            console.log('This is value: ', value);
            // this is the senario where user is adding new product to Add into Inventory
            if (this.product != null && this.product.length > 0) {
                console.log("coming here");
                this.addProductInventory(this.product[0]);
            }
            else if (value !== '' && value !== undefined && value.indexOf('.') !== 0) {
                if (value.match(/[a-z]/i))
                    console.log('contains only charcters');
                // this mean this is decimal value so it will change the retail price of the product
                if (value.match(/[0-9]/i) && value.indexOf('.') > 0)
                    this.updateCostPrice(value);
                else if (value.match(/[0-9]/i))
                    this.updateProductQuantityToAddInventory(value);
            }
        }
        else if (value != null) {
            this.addProductInventory(value);
        }
    };
    AddInventoryComponent.prototype.addProductInventory = function (productObj) {
        // This mean user is adding first product into grid.
        // if(this.productInventotyList.length == 0) {
        this.productInventotyList = this.productInventotyList.slice();
        this.productInventoryObject = new __WEBPACK_IMPORTED_MODULE_2_app_product_product_component__["b" /* ProductInventory */]();
        this.productInventoryObject.productNo = productObj.productNo;
        this.productInventoryObject.description = productObj.description;
        this.productInventoryObject.cost = productObj.cost;
        this.productInventoryObject.retail = productObj.retail;
        this.productInventoryObject.quantity = productObj.quantity;
        this.productInventoryObject.markup = 0.00;
        this.productInventotyList.push(this.productInventoryObject);
        this.persit.setProductInventoryForAdd(this.productInventotyList);
        this.product = null;
        this.p = null;
        // }
        return this.productInventotyList;
    };
    // I HAVE KEEP IT CASUE MAY BE I NEED TO HANDLE THIS LOGIC WHEN EVER USER ADD SAME PRODCUT INTO TABLE.
    // else {
    // Checking weather user is adding same product agian or not if its true
    //  then just update the quantity of that product by 1.
    // for (let lineItem of this.transactionLineItemDaoList) {
    //   if (productObj.productNo === lineItem.productNo) {
    //     // This flag helps to determin whether to add new product or just update the quantity
    //     this.isProductExistsInSellList = true;
    //     lineItem.defaultQuantity = + lineItem.defaultQuantity + 1;
    //     this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
    //     productObj.totalProductPrice = parseFloat((productObj.retail * lineItem.defaultQuantity).toFixed(2));
    //     productObj.taxAmountOnProduct = (productObj.retail * 7) / 100;
    //     console.log("when add product", productObj);
    //     this.product = null;
    //     this.p = null
    //     console.log(this.transactionLineItemDaoList);
    //     this.setTransactionDtoList(this.transactionLineItemDaoList)
    //     this.persit.setProducts(this.transactionLineItemDaoList);
    //     break;
    //   }
    //   else {
    //     // This flag helps to determin whether to add new product or just update the quantity
    //     this.isProductExistsInSellList = false;
    //   }
    // }
    // This flag helps to determin whether to add new product or just update the quantity
    // else (!this.isProductExistsInSellList) {
    //   this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
    //   productObj.totalProductPrice = productObj.retail * productObj.defaultQuantity;
    //   productObj.taxAmountOnProduct = parseFloat(((productObj.retail * 7) / 100).toFixed(2));
    //   console.log("when add product", productObj);
    //   this.transactionLineItemDaoList.push(productObj);
    //   this.product = null;
    //   this.p = null
    //   console.log(this.transactionLineItemDaoList);
    //   this.setTransactionDtoList(this.transactionLineItemDaoList)
    //   this.persit.setProducts(this.transactionLineItemDaoList);
    // }
    AddInventoryComponent.prototype.updateCostPrice = function (value) {
        console.log('Price change');
        this.productInventotyList[this.productInventotyList.length - 1].cost = value;
        // this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = (this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity);
        this.productInventotyList = this.productInventotyList.slice();
        //this.setTransactionDtoList(this.transactionLineItemDaoList)
        this.persit.setProductInventoryForAdd(this.productInventotyList);
        this.p = null;
    };
    AddInventoryComponent.prototype.updateProductQuantityToAddInventory = function (value) {
        console.log('Quantity change');
        this.productInventotyList[this.productInventotyList.length - 1].quantity = value;
        // this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = parseFloat((this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity).toFixed(2));
        this.productInventotyList = this.productInventotyList.slice();
        // this.setTransactionDtoList(this.transactionLineItemDaoList)
        this.persit.setProductInventoryForAdd(this.productInventotyList);
        this.p = null;
    };
    AddInventoryComponent.prototype.updateInventoryDetails = function (event) {
        this.productInventotyList[event.index].quantity = event.data.quantity;
        this.productInventotyList[event.index].cost = event.data.cost;
        // this.transactionLineItemDaoList[event.index].totalProductPrice = (event.data.defaultQuantity * event.data.retail);
        // this.transactionLineItemDaoList[event.index].taxAmountOnProduct = ((event.data.defaultQuantity * event.data.retail) * 7) / 100
        // this.setTransactionDtoList(this.transactionLineItemDaoList)
        this.persit.setProductInventoryForAdd(this.productInventotyList);
    };
    AddInventoryComponent.prototype.setProductForDelete = function (product) {
        this.selectedProduct = product;
        this.popupHeader = 'Remove Product Inventory';
        this.popupMessage = 'Are You Sure Remove Product Inventory ?';
    };
    AddInventoryComponent.prototype.deleteProduct = function () {
        console.log("inside delete");
        var index = this.productInventotyList.indexOf(this.selectedProduct, 0);
        console.log("index", index);
        if (index > -1) {
            this.productInventotyList.splice(index, 1);
            this.productInventotyList = this.productInventotyList.slice();
            this.persit.setProductInventoryForAdd(this.productInventotyList);
        }
    };
    AddInventoryComponent.prototype.setHeaderForRemoveAllInventoryProduct = function () {
        this.popupHeader = 'Remove All Products Inventory';
        this.popupMessage = 'Are Sure You Want To Remove All Product Inventory ?';
    };
    AddInventoryComponent.prototype.removeAllProductInventory = function () {
        this.persit.clearProductInventory();
        this.productInventotyList = [];
    };
    // TO DO NEED TO FIGURE OUT FILTERTING HERE
    AddInventoryComponent.prototype.onVendorChoose = function () {
        this.productDto.filter(function (product) {
            // return product.vendorId = thi
        });
    };
    AddInventoryComponent.prototype.setHeaderForAddProductInventory = function () {
        this.popupHeader = 'Add All Product Inventory';
        this.popupMessage = 'This Will Add All Products Into Inventory';
    };
    AddInventoryComponent.prototype.addProductInventoryToBackEnd = function () {
        var _this = this;
        this.productInventotyList.forEach(function (inventory) {
            inventory.createdTimestamp = __WEBPACK_IMPORTED_MODULE_5_moment__(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        });
        this.productService.addProductInventory(this.productInventotyList)
            .subscribe(function (data) {
            if (data) {
                _this.toastr.success('Inventory Added Successfully !!', 'Success!');
            }
        }, function (error) {
            _this.toastr.error('Opps Something goes wrong !!', 'Error!!');
            console.log(JSON.stringify(error.json()));
        });
    };
    AddInventoryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-add-inventory',
            template: __webpack_require__("../../../../../src/app/product/add-inventory/add-inventory.component.html"),
            styles: [__webpack_require__("../../../../../src/app/product/add-inventory/add-inventory.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_app_sell_sell_service__["a" /* SellService */], __WEBPACK_IMPORTED_MODULE_1_app_product_product_service__["a" /* ProductService */], __WEBPACK_IMPORTED_MODULE_4_app_shared_services_persistence_service__["a" /* PersistenceService */], __WEBPACK_IMPORTED_MODULE_6_ng2_toastr__["ToastsManager"]])
    ], AddInventoryComponent);
    return AddInventoryComponent;
}());



/***/ }),

/***/ "../../../../../src/app/product/addProduct.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"\">\n    <mat-card>\n        <form *ngIf=\"this.form != null\" [formGroup]=\"form\">\n            <mat-card-title>\n                Add Product\n            </mat-card-title>\n            <mat-card-content>\n\n                <div class=\"row\">\n\n                    <div class=\"col-md-6\">\n\n                        <div class=\"row m-2\">\n                            <div class=\"col-md-4 product-textbox\">\n                                <label>Product No:</label>\n                            </div>\n\n                            <div class=\"col-md-5 product-textbox\">\n                                <input type=\"text\" class=\"form-control\" formControlName=\"productNo\" placeholder=\"Please Enter ProductNo\">\n                                <!--<input type=\"submit\" value=\"submit\" [disabled]=\"!form.valid\">-->\n                                <div *ngIf=\"form.get('productNo').hasError('required') && form.get('productNo').touched\" class=\"alert alert-danger\">\n                                    *Required!!\n                                </div>\n                                <div *ngIf=\"form.get('productNo').hasError('pattern') && form.get('productNo').touched\" class=\"alert alert-danger\">\n                                    *Value Not Alloewd</div>\n                            </div>\n\n                            <div class=\"col-md-3 product-textbox d-flex justify-content-end\">\n                                <button class=\"btn-gray action-button\" style=\"width: 100%\" mat-raised-button (click)=\"getAutoGeneratedProductNo()\">Generate</button>\n                            </div>\n                        </div>\n\n                        <div class=\"row m-2\">\n\n                            <div class=\"col-md-4 product-textbox\">\n                                <label class=\"control-label\"> Description:</label>\n                            </div>\n\n                            <div class=\"col-md-8 product-textbox\">\n                                <input type=\"text\" class=\"form-control\" style=\"text-transform:uppercase\" formControlName=\"description\" placeholder=\"Please Enter Description\">\n                                <p *ngIf=\"form.get('description').hasError('required') && form.get('description').touched\" class=\"alert alert-danger\">\n                                    *Required!!</p>\n                            </div>\n                        </div>\n\n                        <div class=\"row m-2\">\n\n                            <div class=\"col-md-4 product-textbox\">\n                                <label class=\"control-label\">Category Name:</label>\n                            </div>\n                            <div class=\"col-md-8 product-textbox\">\n                                <select class=\"form-control\" formControlName=\"category\">\n                                            <option *ngFor=\"let category of categoryDto\" [ngValue]= \"category\">\n                                                {{category.name}}\n                                                </option>\n                                        </select>\n                                <p *ngIf=\"form.get('category').hasError('required')\" class=\"alert alert-danger\">\n                                    *Required!!</p>\n                            </div>\n                        </div>\n\n                        <div class=\"row m-2\">\n\n                            <div class=\"col-md-4 product-textbox\">\n                                <label class=\"control-label\">Brand Name:</label>\n                            </div>\n\n                            <div class=\"col-md-8 product-textbox\">\n                                <select class=\"form-control\" formControlName=\"brand\" name=\"brand\">\n                                            <option *ngFor = \"let brand of brandDto\" [ngValue]=\"brand\">\n                                                {{brand.name}}\n                                            </option>\n                                        </select>\n                                <p *ngIf=\"form.get('brand').hasError('required')\" class=\"alert alert-danger\">\n                                    *Required!!</p>\n                            </div>\n                        </div>\n\n                        <div class=\"row m-2\">\n\n                            <div class=\"col-md-4 product-textbox\">\n                                <label class=\"control-label\">Vender Name:</label>\n                            </div>\n                            <div class=\"col-md-8 product-textbox\">\n                                <select class=\"form-control\" formControlName=\"vendor\" name=\"vendor\">\n                                            <option *ngFor = \"let vendor of vendorDto\" [ngValue]=\"vendor\">\n                                                {{vendor.name}}\n                                                </option>\n                                        </select>\n                                <p *ngIf=\"form.get('vendor').hasError('required')\" class=\"alert alert-danger\">\n                                    *Required!!</p>\n                            </div>\n                        </div>\n\n                        <div class=\"row m-1\">\n\n                            <div class=\"col-md-4 product-textbox\">\n                                <label class=\"control-label\"> Model Name:</label>\n                            </div>\n                            <div class=\"col-md-8 product-textbox\">\n                                <select class=\"form-control\" name=\"model\">\n                                            <option *ngFor = \"let model of modelDto\">\n                                                {{model.name}}\n                                                </option>\n                                        </select>\n                            </div>\n                        </div>\n                        <div class=\"row m-2\">\n                            <div class=\"col-md-4 product-textbox\">\n                                <label class=\"control-label\">Alternate No:</label>\n                            </div>\n\n                            <div class=\"col-md-8 product-textbox\">\n                                <input type=\"text\" class=\"form-control\" placeholder=\"Please Enter Alternate No\">\n                            </div>\n                        </div>\n\n                    </div>\n\n\n                    <!--End of left side Div-->\n\n                    <!--Start of Right Side DIV-->\n\n                    <div class=\"col-md-6\">\n\n                        <div class=\"row m-2\">\n\n                            <div class=\"col-md-3 product-textbox\">\n                                <label>Cost Price</label>\n                                <input type=\"number\" formControlName=\"cost\" class=\"form-control\">\n                                <p *ngIf=\"form.get('cost').hasError('required') && form.get('cost').touched\" class=\"alert alert-danger\">\n                                    *Required!!</p>\n                                <p *ngIf=\"form.get('cost').hasError('pattern') && form.get('cost').touched\" class=\"alert alert-danger\">\n                                    *Value Not Alloewd*</p>\n\n\n                            </div>\n                            <div class=\"col-md-1 product-textbox\">\n                                <label>X</label>\n                            </div>\n\n                            <div class=\"col-md-3 product-textbox\">\n                                <label>Markup %</label>\n                                <input type=\"number\" formControlName=\"markup\" class=\"form-control\">\n                                <p *ngIf=\"form.get('markup').hasError('required') && form.get('markup').touched\" class=\"alert alert-danger\">\n                                    *Required!!</p>\n                                <p *ngIf=\"form.get('markup').hasError('pattern') && form.get('markup').touched\" class=\"alert alert-danger\">\n                                    *Value Not Alloewd*</p>\n                            </div>\n                            <div class=\"col-md-1 product-textbox\">\n                                <label>=</label>\n                            </div>\n\n                            <div class=\"col-md-4 product-textbox\">\n                                <label>Retail Price</label>\n                                <input type=\"number\" formControlName=\"retail\" class=\"form-control\">\n                                <p *ngIf=\"form.get('retail').hasError('required') && form.get('retail').touched\" class=\"alert alert-danger\">\n                                    *Required!!</p>\n                                <p *ngIf=\"form.get('retail').hasError('pattern') && form.get('retail').touched\" class=\"alert alert-danger\">\n                                    *Value Not Alloewd*</p>\n                            </div>\n                        </div>\n\n                        <div class=\"row m-2\">\n\n                            <label class=\"col-md-4 control-label product-textbox\">\n                                                    Quantity:\n                                                </label>\n                            <div class=\"col-md-8 product-textbox\">\n                                <input type=\"number\" class=\"form-control\" formControlName=\"quantity\" placeholder=\"Please Enter Quantity\">\n                                <div *ngIf=\"form.get('quantity').hasError('pattern') && form.get('quantity').touched\" class=\"alert alert-danger\">\n                                    *Value Not Alloewd*</div>\n                            </div>\n                        </div>\n                        <div class=\"row m-2\">\n\n\n                            <label class=\"col-md-4 control-label product-textbox\">\n                                                    Min-Quantity:\n                                                </label>\n                            <div class=\"col-md-8 product-textbox\">\n                                <input type=\"number\" class=\"form-control\" formControlName=\"minQuantity\" placeholder=\"Please Enter Min-Quantity\">\n                                <div *ngIf=\"form.get('minQuantity').hasError('pattern') && form.get('minQuantity').touched\" class=\"alert alert-danger\">\n                                    *Value Not Alloewd*</div>\n                            </div>\n                        </div>\n                        <div class=\"row m-2\">\n\n\n                            <label class=\"col-md-4 control-label product-textbox\">\n                                                    Return Rule:\n                                                </label>\n                            <div class=\"col-md-8 product-textbox\">\n                                <select class=\"form-control\">\n                                            <option>No-Return-Allowed</option>\n                                            <option>1 Day</option>\n                                            <option>1 Week</option>\n                                            <option>2 Week</option>\n                                             <option>1 Month</option>\n                                             <option>3 Months</option>\n                                             <option>6 Months</option>\n                                             <option>12 Months</option>\n                                        </select>\n\n                            </div>\n                        </div>\n                        <div class=\"row m-2\">\n                            <div class=\"col-md-12 product-textbox\">\n                                <div class=\"checkbox\">\n                                    <label>\n                                              <input type=\"checkbox\" checked formControlName=\"tax\">\n                                               Is Taxable\n                                            </label>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"row m-2\">\n\n                            <div class=\"col-md-12 product-textbox\">\n                                <div class=\"checkbox\">\n                                    <label>\n                                              <input type=\"checkbox\" checked formControlName=\"ecommerce\">\n                                               Is Ecomerce\n                                            </label>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"row m-2\">\n\n                            <div class=\"col-md-12 product-textbox\">\n                                <div class=\"checkbox\">\n                                    <label>\n                                              <input type=\"checkbox\" (click) = \"showDialog()\" formControlName=\"varaint\">\n                                               Is Variant\n                                            </label>\n                                </div>\n                            </div>\n                        </div>\n\n                        <!-- <div class=\"col-md-12 \">\n                                    <div class=\"radio\">\n                                        <label>\n                                            <input type=\"radio\" name=\"optradio\">$ 0.63 Default Loyalty:\n                                        </label> (based on the default Loyalty ratio of 50:1)\n                                    </div>\n                                    <div class=\"radio\">\n                                        <label><input type=\"radio\" name=\"optradio\">Customer Loyalty Of:</label>\n                                        <input type=\"text\" name=\"optradio\">\n                                    </div>\n                                </div> -->\n\n\n                    </div>\n                    <!-- end of row for right side-->\n\n\n                </div>\n                <!--End Main Row-->\n\n\n            </mat-card-content>\n            <mat-card-footer>\n                <!--Submit button Row-->\n                <div class=\"d-flex p-md-3 justify-content-center\">\n                    <button mat-raised-button class=\"bg-danger text-white m-2 action-button-lg\" routerLink=\"/product/productTable\">Cancel</button>\n                    <button mat-raised-button class=\"bg btn-green text-white m-2 action-button-lg\" type=\"submit\" (click)=\"addProduct()\" [disabled]=\"form.invalid\">\n                        <i class=\"fa fa-paper-plane\" aria-hidden=\"true\" ></i>\n                            Add Product\n                    </button>\n                </div>\n            </mat-card-footer>\n\n        </form>\n    </mat-card>\n\n\n</div>\n\n\n\n\n\n\n\n<!--********************************* VERY IMPORTANT DO NOT DELET IT *********************************-->\n\n\n<!--START OF VARIANT POPUP-->\n\n<p-dialog header=\"Product Variant Details\" [(visible)]=\"displayDialog\" [modal]=\"true\" [responsive]=\"true\">\n\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-2\">\n                <select class=\"form-control\">\n                                <option *ngFor = \"let variantName of productVariantDetailsDto\">\n                                    {{variantName}}\n                                    </option>\n                            </select>\n            </div>\n\n            <div class=\"col-md-3\">\n                <select class=\"form-control\">\n                                  <option *ngFor = \"let variantValue of productVariantDetailsByNameDto\"> \n                                      {{variantValue.value}}\n                                      </option>\n                                </select>\n\n            </div>\n\n            <div class=\"col-md-2\">\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"formProduct.cost\" placeholder=\"Cost Price\">\n            </div>\n            <div class=\"col-md-2\">\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"formProduct.markup\" placeholder=\"Markup %\">\n\n            </div>\n            <div class=\"col-md-2\">\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"formProduct.retail\" placeholder=\"Retail Price\">\n            </div>\n            <div class=\"col-md-1\">\n                <i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-md-2\">\n                <select class=\"form-control\">\n                                <option *ngFor = \"let variantName of productVariantDetailsDto\">\n                                    {{variantName}}\n                                    </option>\n                            </select>\n            </div>\n\n            <div class=\"col-md-3\">\n                <select class=\"form-control\">\n                                  <option *ngFor = \"let variantValue of productVariantDetailsByNameDto\"> \n                                      {{variantValue.value}}\n                                      </option>\n                                </select>\n\n            </div>\n\n            <div class=\"col-md-2\">\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"formProduct.cost\" placeholder=\"Cost Price\">\n            </div>\n            <div class=\"col-md-2\">\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"formProduct.markup\" placeholder=\"Markup %\">\n\n            </div>\n            <div class=\"col-md-2\">\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"formProduct.retail\" placeholder=\"Retail Price\">\n            </div>\n            <div class=\"col-md-1\">\n                <i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>\n            </div>\n        </div>\n\n        <div class=\"row\">\n\n            <div class=\"col-md-3\">\n            </div>\n            <div class=\"col-md-3\">\n                <p><button class=\"btn btn-primary btn-block\">Add Product Variant</button></p>\n            </div>\n            <div class=\"col-md-3\">\n                <p><button class=\"btn btn-primary btn-block\">Update Product Variant</button></p>\n            </div>\n\n        </div>\n    </div>\n</p-dialog>\n\n<!--End Of variant logic-->"

/***/ }),

/***/ "../../../../../src/app/product/addProduct.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddProductComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_product_product_service__ = __webpack_require__("../../../../../src/app/product/product.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_sell_sell_component__ = __webpack_require__("../../../../../src/app/sell/sell.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_product_product_component__ = __webpack_require__("../../../../../src/app/product/product.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr_src_toast_manager__ = __webpack_require__("../../../../ng2-toastr/src/toast-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr_src_toast_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_toastr_src_toast_manager__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { FormBuilder } from "@angular/forms/forms";




var AddProductComponent = /** @class */ (function () {
    function AddProductComponent(productService, formBuilder, toastr) {
        this.productService = productService;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.displayDialog = false;
        this.formProduct = new __WEBPACK_IMPORTED_MODULE_2_app_sell_sell_component__["a" /* Product */]();
        this.productInventory = new __WEBPACK_IMPORTED_MODULE_4_app_product_product_component__["b" /* ProductInventory */]();
        this.productInventoryList = [];
    }
    AddProductComponent.prototype.ngOnInit = function () {
        //this.generatedProductNo = '123213131';
        var _this = this;
        this.form = this.formBuilder.group({
            'productNo': [null, [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern('^[0-9]+$')]],
            'description': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            'category': [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            'brand': [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            'vendor': [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            'cost': [null, [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern('^[0-9-.]+$')]],
            'markup': [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern('^[0-9-.]+$')],
            'retail': [null, [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern('^[0-9-.]+$')]],
            'quantity': [null, [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern('^[0-9]+$')]],
            'minQuantity': [null, [__WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern('^[0-9]+$')]],
            'tax': [true, null],
            'ecommerce': [false, null],
            'varaint': [false, null]
        });
        this.productService.getCategoryDetails()
            .subscribe(function (categories) {
            _this.categoryDto = categories;
            _this.form.get('category').setValue(_this.categoryDto[0]);
            console.log('CategoryList' + _this.categoryDto);
        });
        this.productService.getBrandDetails()
            .subscribe(function (brands) {
            _this.brandDto = brands;
            _this.form.get('brand').setValue(_this.brandDto[0]);
            console.log('BrandList' + _this.brandDto);
        });
        this.productService.getVendorDetails()
            .subscribe(function (vendors) {
            _this.vendorDto = vendors;
            _this.form.get('vendor').setValue(_this.vendorDto[0]);
            console.log('VendorList' + _this.vendorDto);
        });
        this.productService.getModelDetails()
            .subscribe(function (models) {
            _this.modelDto = models;
            console.log('ModelList' + _this.modelDto);
        });
        // DO NOT DELETE THIS NEED WHEN YOU HANDLE PRODUCT VARIENT
        // this.productService.getProductVariantDetails()
        // .subscribe((a: ProductVariantDetail[]) => {
        // this.productVariantDetailsDto = a;
        // console.log('ProductVariantDetails' + this.productVariantDetailsDto);
        //     });
        // this.productService.getProductVariantDetailsByName('color')
        // .subscribe((a: ProductVariantDetail[]) => {
        // this.productVariantDetailsByNameDto = a;
        // console.log('productVariantDetailsByNameDto' + this.productVariantDetailsByNameDto);
        //     });
    };
    AddProductComponent.prototype.addProduct = function () {
        var _this = this;
        {
            this.productInventoryList.push(this.productInventory);
            var formValues = this.form.value;
            // Here i need to add product inventory details to the product inventory table 
            this.productInventory.productNo = formValues.productNo;
            this.productInventory.cost = formValues.cost;
            this.productInventory.retail = formValues.retail;
            this.productInventory.quantity = formValues.quantity;
            this.productInventory.createdTimestamp = __WEBPACK_IMPORTED_MODULE_5_moment__(Date.now()).format('YYYY-MM-DD HH:mm:ss');
            var product = {
                productNo: formValues.productNo,
                categoryId: formValues.category.categoryId,
                brandId: formValues.brand.brandId,
                vendorId: formValues.vendor.vendorId,
                modelId: null,
                alternetNo: formValues.alternetNo,
                cost: formValues.cost,
                retail: formValues.retail,
                date: null,
                defaultQuantity: null,
                description: formValues.description.toUpperCase(),
                discount: null,
                imeiNo: null,
                active: true,
                ecommerce: formValues.ecommerce,
                relatedProduct: formValues.relatedProduct,
                tax: formValues.tax,
                varaint: formValues.varaint,
                markup: formValues.markup,
                minQuantity: formValues.minQuantity,
                productVariantNo: formValues.productVariantNo,
                quantity: formValues.quantity,
                retailDiscount: null,
                returnRule: formValues.returnRule,
                status: null,
                taxAmountOnProduct: null,
                totalProductPrice: null,
                transactionComId: null,
                time: null,
                createdTimestamp: __WEBPACK_IMPORTED_MODULE_5_moment__(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                productInventoryDaoList: this.productInventoryList
            };
            this.productService.addProduct(product)
                .subscribe(function (data) {
                _this.toastr.success('Product Successfully added', 'Success!');
                console.log(data);
            }, function (error) {
                _this.toastr.error(error, 'Error!');
                console.log(JSON.stringify(error.json()));
            });
            this.clearProductForm();
        }
    };
    AddProductComponent.prototype.clearProductForm = function () {
        // this.form.get('productNo').setValue(null);
        // this.form.get('description').setValue(null);
        // this.form.get('cost').setValue(null);
        // this.form.get('markup').setValue(null);
        // this.form.get('retail').setValue(null);
        // this.form.get('quantity').setValue(null);
        this.form.reset({
            category: this.categoryDto[0],
            brand: this.brandDto[0],
            vendor: this.vendorDto[0],
            model: this.modelDto[0]
        });
    };
    AddProductComponent.prototype.getAutoGeneratedProductNo = function () {
        var _this = this;
        this.productService.getAutoGeneratedBarcode()
            .subscribe(function (a) {
            _this.form.get('productNo').setValue(a);
            console.log('productNo:' + _this.generatedProductNo);
        });
    };
    AddProductComponent.prototype.showDialog = function () {
        this.displayDialog = !this.displayDialog;
    };
    AddProductComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-product',
            template: __webpack_require__("../../../../../src/app/product/addProduct.component.html"),
            styles: [__webpack_require__("../../../../../src/app/product/product.component.scss")],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_product_product_service__["a" /* ProductService */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_6_ng2_toastr_src_toast_manager__["ToastsManager"]])
    ], AddProductComponent);
    return AddProductComponent;
}());



/***/ }),

/***/ "../../../../../src/app/product/brand/brand.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/product/brand/brand.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"\">\n\n    <p-growl [(value)]=\"msgs\"></p-growl>\n    <mat-card>\n        <mat-card-title>\n            <h4>\n                Brands Details\n            </h4>\n        </mat-card-title>\n        <mat-card-content>\n            <div class=\"row d-flex align-items-center justify-content-end\">\n                <div class=\"col-md-6\"></div>\n                <div class=\"col-md-6 d-flex justify-content-end\">\n                    <button type=\"button\" mat-raised-button class=\"bg-primary text-white action-button-lg\" (click)=\"showDialogToAdd()\">\n                            <i class=\"fa fa-plus-square\" aria-hidden=\"true\" label=\"Add\"></i>\n                            Add Brand\n                        </button>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-12 p-md-3\">\n                    <!-- <p-header>Category Details</p-header> -->\n                    <!-- <p-dataTable [value]=\"this.brandDto\" scrollable=\"true\" scrollHeight=\"500px\" selectionMode=\"single\" [(selection)]=\"selectedBrand\" (onRowSelect)=\"onRowSelect($event)\" [responsive]=\"true\"> -->\n                    <p-dataTable [value]=\"this.brandDto\" scrollable=\"true\" scrollHeight=\"500px\" [responsive]=\"true\" [editable]=\"true\" (onEditComplete)=\"this.updateBrand($event)\">\n\n                        <p-column field=\"index\" header=\"Index\" [sortable]=\"true\"></p-column>\n                        <p-column field=\"name\" header=\"Brand Name\" filterPlaceholder=\"Search For Brand Name\" [filter]=\"true\" [editable]=\"true\"></p-column>\n                        <p-column field=\"description\" header=\"Brand Description\" [sortable]=\"true\" [editable]=\"true\"></p-column>\n                        <p-column field=\"noOfProduct\" header=\"No Of Prodcuts\" [sortable]=\"true\"></p-column>\n                        <p-column field=\"action\" header=\"Action\" [style]=\"{'width': '5%'}\">\n                            <ng-template let-brand=\"rowData\" pTemplate=\"body\" class=\"m-auto\">\n                                <button class=\"btn-red action-button-table\" mat-button data-toggle=\"modal\" data-target=\"#deleteBrand\" (click)=\"this.setBrandForDetete(brand)\">\n                                    <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                                </button>\n                            </ng-template>\n                        </p-column>\n\n                    </p-dataTable>\n\n                </div>\n\n                <form *ngIf=\"this.brandForm != null\" [formGroup]=\"this.brandForm\">\n                    <p-dialog header=\"Add Brand\" appendTo=\"body\" [(visible)]=\"displayDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\n                        <div class=\"ui-grid ui-grid-responsive ui-fluid\" *ngIf=\"brand\">\n                            <div class=\"ui-grid-row\">\n                                <div class=\"ui-grid-col-4\">\n                                    <label for=\"name\">Name:</label>\n                                </div>\n                                <div class=\"ui-grid-col-8\">\n                                    <input class=\"form-control\" formControlName=\"name\" />\n                                </div>\n                            </div>\n                            <div class=\"ui-grid-row\">\n                                <div class=\"ui-grid-col-4\">\n                                    <label for=\"description\">Description:</label>\n                                </div>\n                                <div class=\"ui-grid-col-8\">\n                                    <input class=\"form-control\" formControlName=\"description\" />\n                                </div>\n                            </div>\n                        </div>\n                        <p-footer>\n                            <!-- <div style=\"text-align: center\"> -->\n                            <button type=\"button\" class=\"btn btn-green\" [disabled]=\"this.brandForm.invalid\" (click)=\"addBrand()\">\n                                <i class=\"fa fa-paper-plane\" aria-hidden=\"true\" ></i>\n                                Add Brand\n                            </button>\n\n                            <!-- </div> -->\n                        </p-footer>\n                    </p-dialog>\n                </form>\n            </div>\n        </mat-card-content>\n    </mat-card>\n    <div class=\"row\" style=\"margin-top: 35px\">\n    </div>\n</div>\n\n\n\n\n\n<!-- Start of Delete Brand Popup -->\n<div class=\"modal fade\" id=\"deleteBrand\" role=\"dialog\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">Delete Brand</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <p>Are You Sure You Want To Delete This Brand</p>\n            </div>\n            <div class=\"modal-footer\">\n\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"this.deleteBrand()\">Yes</button>\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancle</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- End of Delete Brand Popup -->"

/***/ }),

/***/ "../../../../../src/app/product/brand/brand.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrandComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_product_product_service__ = __webpack_require__("../../../../../src/app/product/product.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_product_brand_brand_service__ = __webpack_require__("../../../../../src/app/product/brand/brand.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var BrandComponent = /** @class */ (function () {
    function BrandComponent(brandService, productService, formBuilder) {
        this.brandService = brandService;
        this.productService = productService;
        this.formBuilder = formBuilder;
        this.msgs = [];
        this.brand = new PrimeBrand();
    }
    BrandComponent.prototype.ngOnInit = function () {
        this.brandForm = this.formBuilder.group({
            'name': [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            'description': ['']
        });
        this.getBrandDetails();
    };
    BrandComponent.prototype.showSuccess = function (severity, summary, detail) {
        this.msgs = [];
        this.msgs.push({ severity: severity, summary: summary, detail: detail });
    };
    BrandComponent.prototype.getBrandDetails = function () {
        var _this = this;
        this.productService.getBrandDetails()
            .subscribe(function (brand) {
            _this.brandDto = brand;
            console.log('BrandList' + _this.brandDto);
        });
    };
    BrandComponent.prototype.addBrand = function () {
        var newBrand = this.brandForm.value;
        this.brandService.addOrUpdateBrand(this.brandForm.value);
        this.brandDto.push(newBrand);
        this.brandDto = this.brandDto.slice();
        this.displayDialog = false;
    };
    BrandComponent.prototype.updateBrand = function (event) {
        this.brandService.addOrUpdateBrand(event.data);
    };
    BrandComponent.prototype.setBrandForDetete = function (brand) {
        this.selectedBrandForDelete = brand;
    };
    BrandComponent.prototype.deleteBrand = function () {
        var _this = this;
        var index = this.brandDto.findIndex(function (el) { return el.name == _this.selectedBrandForDelete.name; });
        this.brandDto = this.brandDto.splice(0, index).concat(this.brandDto.splice(index));
        this.brandService.deleteBrand(this.selectedBrandForDelete.brandId);
    };
    BrandComponent.prototype.showDialogToAdd = function () {
        this.displayDialog = true;
    };
    BrandComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-brand',
            template: __webpack_require__("../../../../../src/app/product/brand/brand.component.html"),
            styles: [__webpack_require__("../../../../../src/app/product/brand/brand.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_product_brand_brand_service__["a" /* BrandService */], __WEBPACK_IMPORTED_MODULE_1_app_product_product_service__["a" /* ProductService */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"]])
    ], BrandComponent);
    return BrandComponent;
}());

var PrimeBrand = /** @class */ (function () {
    function PrimeBrand(name, description) {
        this.name = name;
        this.description = description;
    }
    return PrimeBrand;
}());


/***/ }),

/***/ "../../../../../src/app/product/brand/brand.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BrandService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BrandService = /** @class */ (function () {
    function BrandService(http) {
        this.http = http;
    }
    BrandService.prototype.addOrUpdateBrand = function (brand) {
        console.log("Brand Added" + brand.name);
        this.http.post('http://localhost:8080/addBrand', brand)
            .subscribe(function (data) {
            alert('Brand Updated !!');
            console.log(data);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    BrandService.prototype.deleteBrand = function (brandId) {
        this.http.delete('http://localhost:8080/deleteBrand?brandId=' + brandId)
            .subscribe(function (data) {
            alert('Brand Deleted !!');
            console.log(data);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    BrandService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], BrandService);
    return BrandService;
}());



/***/ }),

/***/ "../../../../../src/app/product/category/category.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/product/category/category.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"\">\n\n    <p-growl [(value)]=\"msgs\"></p-growl>\n\n    <mat-card>\n        <mat-card-title>\n            <h4>\n                Category Details\n            </h4>\n        </mat-card-title>\n        <mat-card-content>\n            <div class=\"row d-flex align-items-center justify-content-end\">\n                <div class=\"col-md-6\"></div>\n                <div class=\"col-md-6 d-flex justify-content-end\">\n                    <button type=\"button\" mat-raised-button class=\"bg-primary text-white action-button-lg\" (click)=\"showDialogToAdd()\">\n                                <i class=\"fa fa-plus-square\" aria-hidden=\"true\" label=\"Add\"></i>\n                                Add Category\n                            </button>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-12 p-md-3\">\n                    <!-- <p-header>Category Details</p-header> -->\n                    <p-dataTable [value]=\"this.categoryDto\" scrollable=\"true\" scrollHeight=\"500px\" [responsive]=\"true\" [editable]=\"true\" (onEditComplete)=\"this.updateCategory($event)\">\n                        <p-column field=\"index\" header=\"Index\" [sortable]=\"true\"></p-column>\n                        <p-column field=\"name\" header=\"Category Name\" filterPlaceholder=\"Search For Category Name\" [filter]=\"true\" [editable]=\"true\"></p-column>\n                        <p-column field=\"description\" header=\"Category Description\" [sortable]=\"true\" [editable]=\"true\"></p-column>\n                        <p-column field=\"noOfProduct\" header=\"No Of Prodcuts\" [sortable]=\"true\"></p-column>\n                        <p-column field=\"action\" header=\"Action\" [style]=\"{'width': '5%'}\">\n                            <ng-template let-category=\"rowData\" pTemplate=\"body\" class=\"m-auto\">\n                                <button class=\"btn-red action-button-table\" mat-button data-toggle=\"modal\" data-target=\"#deleteCategory\" (click)=\"this.setCategoryForDelete(category)\">\n                                        <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                                    </button>\n                            </ng-template>\n                        </p-column>\n                    </p-dataTable>\n\n                </div>\n\n                <form *ngIf=\"this.categoryForm != null\" [formGroup]=\"this.categoryForm\">\n                    <p-dialog header=\"Add Category\" appendTo=\"body\" [(visible)]=\"displayDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\n                        <div class=\"ui-grid ui-grid-responsive ui-fluid\" *ngIf=\"category\">\n                            <div class=\"ui-grid-row\">\n                                <div class=\"ui-grid-col-4\">\n                                    <label for=\"name\">Name:</label>\n                                </div>\n                                <div class=\"ui-grid-col-8\">\n                                    <input class=\"form-control\" formControlName=\"name\" />\n                                </div>\n                            </div>\n                            <div class=\"ui-grid-row\">\n                                <div class=\"ui-grid-col-4\">\n                                    <label for=\"description\">Description:</label>\n                                </div>\n                                <div class=\"ui-grid-col-8\">\n                                    <input class=\"form-control\" formControlName=\"description\" />\n                                </div>\n                            </div>\n                        </div>\n                        <p-footer>\n                            <div style=\"text-align: center\">\n                                <button type=\"button\" class=\"btn btn-success\" (click)=\"this.addCategory()\" [disabled]=\"this.categoryForm.invalid\">\n                                        <i class=\"fa fa-paper-plane\" aria-hidden=\"true\" ></i>\n                                Add Category\n                            </button>\n\n                            </div>\n                        </p-footer>\n                    </p-dialog>\n                </form>\n            </div>\n        </mat-card-content>\n    </mat-card>\n</div>\n\n\n\n\n<!-- Start of Delete Vendor Popup -->\n<div class=\"modal fade\" id=\"deleteCategory\" role=\"dialog\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">Delete Category</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <p>Are You Sure You Want To Delete This Category</p>\n            </div>\n            <div class=\"modal-footer\">\n\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"this.deleteCategory()\">Yes</button>\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancle</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- End of Delete Vendor Popup -->"

/***/ }),

/***/ "../../../../../src/app/product/category/category.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_product_product_service__ = __webpack_require__("../../../../../src/app/product/product.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_product_category_category_service__ = __webpack_require__("../../../../../src/app/product/category/category.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_toastr__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CategoryComponent = /** @class */ (function () {
    function CategoryComponent(categoryService, productService, formBuilder, toastr) {
        this.categoryService = categoryService;
        this.productService = productService;
        this.formBuilder = formBuilder;
        this.toastr = toastr;
        this.msgs = [];
        this.category = new PrimeCategory();
    }
    CategoryComponent.prototype.ngOnInit = function () {
        this.categoryForm = this.formBuilder.group({
            'name': [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            'description': ['']
        });
        this.getCategoryDetails();
    };
    CategoryComponent.prototype.showSuccess = function (severity, summary, detail) {
        this.msgs = [];
        this.msgs.push({ severity: severity, summary: summary, detail: detail });
    };
    CategoryComponent.prototype.getCategoryDetails = function () {
        var _this = this;
        this.productService.getCategoryDetails()
            .subscribe(function (categories) {
            _this.categoryDto = categories;
            console.log('CategoryList' + _this.categoryDto);
        });
    };
    CategoryComponent.prototype.addCategory = function () {
        var _this = this;
        var newCategory = this.categoryForm.value;
        this.categoryService.addOrUpdateCategory(this.categoryForm.value)
            .subscribe(function (data) {
            if (data) {
                _this.toastr.success('Category Added Successfully!!', 'Success!!');
            }
            console.log(data);
        }, function (error) {
            _this.toastr.error('Something Goes Wrong!!', 'Error!!');
        });
        this.categoryDto.push(newCategory);
        this.categoryDto = this.categoryDto.slice();
        this.displayDialog = false;
    };
    CategoryComponent.prototype.updateCategory = function (event) {
        this.categoryService.addOrUpdateCategory(event.data);
    };
    CategoryComponent.prototype.setCategoryForDelete = function (cate) {
        this.selectedCategoryForDelete = cate;
    };
    CategoryComponent.prototype.deleteCategory = function () {
        var _this = this;
        var index = this.categoryDto.findIndex(function (el) { return el.name == _this.selectedCategoryForDelete.name; });
        this.categoryDto = this.categoryDto.splice(0, index).concat(this.categoryDto.splice(index));
        this.categoryService.deleteCategory(this.selectedCategoryForDelete.categoryId);
    };
    CategoryComponent.prototype.showDialogToAdd = function () {
        this.displayDialog = true;
    };
    CategoryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-category',
            template: __webpack_require__("../../../../../src/app/product/category/category.component.html"),
            styles: [__webpack_require__("../../../../../src/app/product/category/category.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_product_category_category_service__["a" /* CategoryService */], __WEBPACK_IMPORTED_MODULE_1_app_product_product_service__["a" /* ProductService */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_4_ng2_toastr__["ToastsManager"]])
    ], CategoryComponent);
    return CategoryComponent;
}());

var PrimeCategory = /** @class */ (function () {
    function PrimeCategory(name, description) {
        this.name = name;
        this.description = description;
    }
    return PrimeCategory;
}());


/***/ }),

/***/ "../../../../../src/app/product/category/category.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CategoryService = /** @class */ (function () {
    function CategoryService(http) {
        this.http = http;
    }
    CategoryService.prototype.addOrUpdateCategory = function (category) {
        console.log("Category Added" + category.name);
        return this.http.post('http://localhost:8080/addCategory', category);
    };
    CategoryService.prototype.deleteCategory = function (categoryId) {
        this.http.delete('http://localhost:8080/deleteCategory?categoryId=' + categoryId)
            .subscribe(function (data) {
            alert('Category Deleted !!');
            console.log(data);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    CategoryService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], CategoryService);
    return CategoryService;
}());



/***/ }),

/***/ "../../../../../src/app/product/edit-product/edit-product.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <form *ngIf=\"this.form != null\" [formGroup]=\"form\">\n        <mat-card-title>\n            Edit Product\n        </mat-card-title>\n        <mat-card-content>\n\n            <div class=\"row\">\n\n                <div class=\"col-md-6\">\n\n                    <div class=\"row m-2\">\n                        <div class=\"col-md-4 product-textbox\">\n                            <label>Product No:</label>\n                        </div>\n\n                        <div class=\"col-md-8 product-textbox\">\n                            <input type=\"text\" class=\"form-control\" formControlName=\"productNo\" placeholder=\"Please Enter ProductNo\">\n                            <!--<input type=\"submit\" value=\"submit\" [disabled]=\"!form.valid\">-->\n                            <div *ngIf=\"form.get('productNo').hasError('required') && form.get('productNo').touched\" class=\"alert alert-danger\">\n                                *Required!!\n                            </div>\n                            <div *ngIf=\"form.get('productNo').hasError('pattern') && form.get('productNo').touched\" class=\"alert alert-danger\">\n                                *Value Not Alloewd</div>\n                        </div>\n                    </div>\n                    <div class=\"row m-2\">\n\n                        <div class=\"col-md-4 product-textbox\">\n                            <label class=\"control-label\"> Description:</label>\n                        </div>\n\n                        <div class=\"col-md-8 product-textbox\">\n                            <input type=\"text\" class=\"form-control\" style=\"text-transform:uppercase\" formControlName=\"description\" placeholder=\"Please Enter Description\">\n                            <p *ngIf=\"form.get('description').hasError('required') && form.get('description').touched\" class=\"alert alert-danger\">\n                                *Required!!</p>\n                        </div>\n                    </div>\n\n                    <div class=\"row m-2\">\n                        <div class=\"col-md-4 product-textbox\">\n                            <label class=\"control-label\">Category Name:</label>\n                        </div>\n                        <div class=\"col-md-8 product-textbox\">\n                            <select class=\"form-control\" formControlName=\"category\">\n                                      <option *ngFor=\"let category of categoryDto\" [ngValue]= \"category\">\n                                          {{category.name}}\n                                          </option>\n                                  </select>\n                            <p *ngIf=\"form.get('category').hasError('required')\" class=\"alert alert-danger\">\n                                *Required!!</p>\n                        </div>\n                    </div>\n\n                    <div class=\"row m-2\">\n\n                        <div class=\"col-md-4 product-textbox\">\n                            <label class=\"control-label\">Brand Name:</label>\n                        </div>\n\n                        <div class=\"col-md-8 product-textbox\">\n                            <select class=\"form-control\" formControlName=\"brand\" name=\"brand\">\n                                      <option *ngFor = \"let brand of brandDto\" [ngValue]=\"brand\">\n                                          {{brand.name}}\n                                      </option>\n                                  </select>\n                            <p *ngIf=\"form.get('brand').hasError('required')\" class=\"alert alert-danger\">\n                                *Required!!</p>\n                        </div>\n                    </div>\n                    <div class=\"row m-2\">\n                        <div class=\"col-md-4 product-textbox\">\n                            <label class=\"control-label\">Vender Name:</label>\n                        </div>\n                        <div class=\"col-md-8 product-textbox\">\n                            <select class=\"form-control\" formControlName=\"vendor\" name=\"vendor\">\n                                      <option *ngFor = \"let vendor of vendorDto\" [ngValue]=\"vendor\">\n                                          {{vendor.name}}\n                                          </option>\n                                  </select>\n                            <p *ngIf=\"form.get('vendor').hasError('required')\" class=\"alert alert-danger\">\n                                *Required!!</p>\n                        </div>\n                    </div>\n                    <div class=\"row m-2\">\n                        <div class=\"col-md-4 product-textbox\">\n                            <label class=\"control-label\"> Model Name:</label>\n                        </div>\n                        <div class=\"col-md-8 product-textbox\">\n                            <select class=\"form-control\" name=\"model\">\n                                      <option *ngFor = \"let model of modelDto\">\n                                          {{model.name}}\n                                          </option>\n                                  </select>\n                        </div>\n                    </div>\n\n                </div>\n\n                <!--End of left side Div-->\n\n                <!--Start of Right Side DIV-->\n\n                <div class=\"col-md-6\">\n                    <div class=\"row m-2\">\n                        <label class=\"col-md-4 control-label product-textbox\">\n                                    Retail Price:\n                                </label>\n                        <div class=\"col-md-8 product-textbox\">\n                            <input type=\"number\" formControlName=\"retail\" class=\"form-control\">\n                            <p *ngIf=\"form.get('retail').hasError('required') && form.get('retail').touched\" class=\"alert alert-danger\">\n                                *Required!!</p>\n                            <p *ngIf=\"form.get('retail').hasError('pattern') && form.get('retail').touched\" class=\"alert alert-danger\">\n                                *Value Not Alloewd*</p>\n                        </div>\n                    </div>\n\n                    <div class=\"row m-2\">\n\n\n                        <label class=\"col-md-4 control-label product-textbox\">\n                                Total Quantity:\n                            </label>\n                        <div class=\"col-md-8 product-textbox\">\n                            <input type=\"number\" class=\"form-control\" formControlName=\"quantity\" placeholder=\"Please Enter Quantity\" disabled=\"disabled\">\n                            <div *ngIf=\"form.get('quantity').hasError('pattern') && form.get('quantity').touched\" class=\"alert alert-danger\">\n                                *Value Not Alloewd*</div>\n                        </div>\n                    </div>\n                    <div class=\"row m-2\">\n\n\n                        <label class=\"col-md-4 control-label product-textbox\">\n                                ReOrder Quantity:\n                                          </label>\n                        <div class=\"col-md-8 product-textbox\">\n                            <input type=\"text\" class=\"form-control\" formControlName=\"minQuantity\" placeholder=\"Please Enter Min-Quantity\">\n                            <div *ngIf=\"form.get('minQuantity').hasError('pattern') && form.get('minQuantity').touched\" class=\"alert alert-danger\">\n                                *Value Not Alloewd*</div>\n                        </div>\n                    </div>\n\n                    <div class=\"row m-2\">\n\n                        <div class=\"col-md-4 product-textbox\">\n                            <label class=\"control-label\">Alternate No:</label>\n                        </div>\n\n                        <div class=\"col-md-8 product-textbox\">\n                            <input type=\"text\" class=\"form-control\" placeholder=\"Please Enter Alternate No\">\n                        </div>\n                    </div>\n                    <div class=\"row m-2\">\n\n\n                        <label class=\"col-md-4 control-label product-textbox\">\n                                              Return Rule:\n                                          </label>\n                        <div class=\"col-md-8 product-textbox\">\n                            <select class=\"form-control\">\n                                      <option>No-Return-Allowed</option>\n                                      <option>1 Day</option>\n                                      <option>1 Week</option>\n                                      <option>2 Week</option>\n                                       <option>1 Month</option>\n                                       <option>3 Months</option>\n                                       <option>6 Months</option>\n                                       <option>12 Months</option>\n                                  </select>\n\n                        </div>\n                    </div>\n                    <div class=\"row m-2\">\n\n                        <div class=\"col-md-12 product-textbox\">\n                            <div class=\"checkbox\">\n                                <label>\n                                        <input type=\"checkbox\" formControlName=\"tax\">\n                                         Is Taxable\n                                      </label>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"row m-2\">\n\n\n                        <div class=\"col-md-12 product-textbox\">\n                            <div class=\"checkbox\">\n                                <label>\n                                        <input type=\"checkbox\" formControlName=\"ecomerce\">\n                                         Is Ecomerce\n                                      </label>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row m-2\">\n\n                        <div class=\"col-md-12 product-textbox\">\n                            <div class=\"checkbox\">\n                                <label>\n                                        <input type=\"checkbox\" (click) = \"showDialog()\" formControlName=\"varaint\">\n                                         Is Variant\n                                      </label>\n                            </div>\n                        </div>\n                    </div>\n\n                    <!-- <div class=\"col-md-12 \">\n                                <div class=\"radio\">\n                                    <label>\n                                      <input type=\"radio\" name=\"optradio\">$ 0.63 Default Loyalty:\n                                  </label> (based on the default Loyalty ratio of 50:1)\n                                </div>\n                                <div class=\"radio\">\n                                    <label><input type=\"radio\" name=\"optradio\">Customer Loyalty Of:</label>\n                                    <input type=\"text\" name=\"optradio\">\n                                </div>\n                            </div> -->\n\n                </div>\n                <!-- end of row for right side-->\n            </div>\n\n            <!--End Main Row-->\n\n            <hr>\n\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <h4>Product Inventory Details</h4>\n                    <p-dataTable [value]=\"this.currentProduct.productInventoryDaoList\" [editable]=\"true\" scrollable=\"true\" [responsive]=\"true\" scrollHeight=\"300px\" (onEditComplete)=\"this.updateProductInventory($event)\">\n                        <p-column header=\"Cost\" field=\"cost\" [editable]=\"true\">\n                            <ng-template let-product=\"rowData\" pTemplate=\"body\">\n                                {{product.cost | currency:'USD':'true'}}\n                            </ng-template>\n                        </p-column>\n\n                        <p-column field=\"quantity\" header=\"Quantity\" [editable]=\"true\"></p-column>\n\n                        <p-column field=\"date\" header=\"Date\"></p-column>\n\n                        <p-column field=\"time\" header=\"Time\"></p-column>\n\n                        <p-column [style]=\"{'width': '5%'}\" header=\"Action\">\n                            <ng-template let-product=\"rowData\" pTemplate=\"body\" class=\"m-auto\">\n\n                                <button class=\"btn-red action-button-table\" mat-button (click)=\"this.setProductInventoryDetailsForDelete(product)\" data-toggle=\"modal\" data-target=\"#deleteProductInventory\">\n                                    <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                                </button>\n\n                            </ng-template>\n                        </p-column>\n                    </p-dataTable>\n\n                </div>\n            </div>\n        </mat-card-content>\n        <mat-card-footer>\n            <!--Submit button Row-->\n            <div class=\"d-flex p-md-3 justify-content-center\">\n                <button mat-raised-button class=\"bg-danger text-white m-2 action-button-lg\" routerLink=\"/product/productTable\">Cancel</button>\n                <button mat-raised-button class=\"bg btn-green text-white m-2 action-button-lg\" type=\"submit\" (click)=\"addProduct()\" [disabled]=\"form.invalid\">\n                        <i class=\"fa fa-paper-plane\" aria-hidden=\"true\" ></i>\n                        \n                    Update Product</button>\n            </div>\n\n        </mat-card-footer>\n\n\n        <!-- <div class=\"col-md-2 product-textbox\">\n                      <p><button [disabled]=\"form.invalid\" (click)=\"addProduct(true)\" class=\"btn btn-primary btn-block\">Next</button></p>\n                  </div> -->\n\n\n\n\n    </form>\n\n</mat-card>\n\n<!-- Start of Delete Vendor Popup -->\n<div class=\"modal fade\" id=\"deleteProductInventory\" role=\"dialog\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">Delete Product Inventory</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <p>Are You Sure You Want To Delete This Product Inventory</p>\n            </div>\n            <div class=\"modal-footer\">\n\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"this.deleteProductInventory()\">Yes</button>\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancle</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- End of Delete Vendor Popup -->\n\n\n\n\n\n\n\n<!--********************************* VERY IMPORTANT DO NOT DELET IT *********************************-->\n\n\n<!--START OF VARIANT POPUP-->\n\n<p-dialog header=\"Product Variant Details\" [(visible)]=\"displayDialog\" [modal]=\"true\" [responsive]=\"true\">\n\n    <div class=\"container\">\n        <div class=\"row\">\n            <div class=\"col-md-2\">\n                <select class=\"form-control\">\n                              <option *ngFor = \"let variantName of productVariantDetailsDto\">\n                                  {{variantName}}\n                                  </option>\n                          </select>\n            </div>\n\n            <div class=\"col-md-3\">\n                <select class=\"form-control\">\n                                <option *ngFor = \"let variantValue of productVariantDetailsByNameDto\"> \n                                    {{variantValue.value}}\n                                    </option>\n                              </select>\n\n            </div>\n\n            <div class=\"col-md-2\">\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"formProduct.cost\" placeholder=\"Cost Price\">\n            </div>\n            <div class=\"col-md-2\">\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"formProduct.markup\" placeholder=\"Markup %\">\n\n            </div>\n            <div class=\"col-md-2\">\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"formProduct.retail\" placeholder=\"Retail Price\">\n            </div>\n            <div class=\"col-md-1\">\n                <i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-md-2\">\n                <select class=\"form-control\">\n                              <option *ngFor = \"let variantName of productVariantDetailsDto\">\n                                  {{variantName}}\n                                  </option>\n                          </select>\n            </div>\n\n            <div class=\"col-md-3\">\n                <select class=\"form-control\">\n                                <option *ngFor = \"let variantValue of productVariantDetailsByNameDto\"> \n                                    {{variantValue.value}}\n                                    </option>\n                              </select>\n\n            </div>\n\n            <div class=\"col-md-2\">\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"formProduct.cost\" placeholder=\"Cost Price\">\n            </div>\n            <div class=\"col-md-2\">\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"formProduct.markup\" placeholder=\"Markup %\">\n\n            </div>\n            <div class=\"col-md-2\">\n                <input type=\"text\" class=\"form-control\" [(ngModel)]=\"formProduct.retail\" placeholder=\"Retail Price\">\n            </div>\n            <div class=\"col-md-1\">\n                <i class=\"fa fa-trash-o\" aria-hidden=\"true\"></i>\n            </div>\n        </div>\n\n        <div class=\"row\">\n\n            <div class=\"col-md-3\">\n            </div>\n            <div class=\"col-md-3\">\n                <p><button class=\"btn btn-primary btn-block\">Add Product Variant</button></p>\n            </div>\n            <div class=\"col-md-3\">\n                <p><button class=\"btn btn-primary btn-block\">Update Product Variant</button></p>\n            </div>\n\n        </div>\n    </div>\n</p-dialog>\n\n<!--End Of variant logic-->"

/***/ }),

/***/ "../../../../../src/app/product/edit-product/edit-product.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/product/edit-product/edit-product.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProductComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_sell_sell_component__ = __webpack_require__("../../../../../src/app/sell/sell.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_product_product_service__ = __webpack_require__("../../../../../src/app/product/product.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EditProductComponent = /** @class */ (function () {
    function EditProductComponent(productService, formBuilder, route, router) {
        this.productService = productService;
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.displayDialog = false;
        this.formProduct = new __WEBPACK_IMPORTED_MODULE_2_app_sell_sell_component__["a" /* Product */]();
    }
    EditProductComponent.prototype.ngOnInit = function () {
        var _this = this;
        //this.generatedProductNo = '123213131';
        var productNo = this.route.snapshot.paramMap.get('productNo');
        if (productNo) {
            this.productService.getProductDetailsById(productNo)
                .subscribe(function (product) {
                _this.currentProduct = product;
                _this.currentProduct.productInventoryDaoList.forEach((function (inventory) {
                    inventory.time = __WEBPACK_IMPORTED_MODULE_3_moment__(inventory.date).format('hh:mm A');
                    inventory.date = __WEBPACK_IMPORTED_MODULE_3_moment__(inventory.date).format('MM/DD/YYYY');
                    _this.currentProduct.quantity = +_this.currentProduct.quantity + inventory.quantity;
                }));
                var currentCategory = {};
                var currentBrand = {};
                var currentVendor = {};
                var currentModel = {};
                _this.form = _this.formBuilder.group({
                    'productNo': [_this.currentProduct.productNo, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern('^[0-9]+$')]],
                    'description': [_this.currentProduct.description, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
                    'category': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
                    'brand': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
                    'vendor': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required],
                    // 'costPrice': [this.currentProduct.cost, [Validators.required, Validators.pattern('^[0-9-.]+$')]],
                    'markup': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern('^[0-9-.]+$')],
                    'retail': [_this.currentProduct.retail, [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern('^[0-9-.]+$')]],
                    'quantity': [_this.currentProduct.quantity, ''],
                    'minQuantity': [_this.currentProduct.minQuantity, ''],
                    'tax': [_this.currentProduct.tax, null],
                    'ecomerce': [_this.currentProduct.ecommerce, null],
                    'varaint': [_this.currentProduct.variant, null]
                });
                _this.form.valueChanges
                    .subscribe(function (changes) {
                    console.log('form valurs', _this.form.errors);
                    console.log('form valurs', _this.form.valid);
                    console.log('complete form', _this.form.value);
                });
                _this.productService.getCategoryDetails()
                    .subscribe(function (categories) {
                    _this.categoryDto = categories;
                    currentCategory = _this.categoryDto.filter(function (el) { return el.categoryId == _this.currentProduct.categoryId; })[0];
                    _this.form.get('category').setValue(currentCategory);
                    // console.log('CategoryList' + this.categoryDto);
                    // console.log(currentCategory);
                    // console.log(this.form.value);
                });
                _this.productService.getBrandDetails()
                    .subscribe(function (brands) {
                    _this.brandDto = brands;
                    currentBrand = _this.brandDto.filter(function (el) { return el.brandId == _this.currentProduct.brandId; })[0];
                    _this.form.get('brand').setValue(currentBrand);
                    // console.log('BrandList' + this.brandDto);
                });
                _this.productService.getVendorDetails()
                    .subscribe(function (vendors) {
                    _this.vendorDto = vendors;
                    currentVendor = _this.vendorDto.filter(function (el) { return el.vendorId == _this.currentProduct.vendorId; })[0];
                    _this.form.get('vendor').setValue(currentVendor);
                    // console.log('VendorList' + this.vendorDto);
                });
                _this.productService.getModelDetails()
                    .subscribe(function (models) {
                    _this.modelDto = models;
                    console.log('ModelList' + _this.modelDto);
                });
            });
        }
        // DO NOT DELETE THIS NEED WHEN YOU HANDLE PRODUCT VARIENT
        // this.productService.getProductVariantDetails()
        // .subscribe((a: ProductVariantDetail[]) => {
        // this.productVariantDetailsDto = a;
        // console.log('ProductVariantDetails' + this.productVariantDetailsDto);
        //     });
        // this.productService.getProductVariantDetailsByName('color')
        // .subscribe((a: ProductVariantDetail[]) => {
        // this.productVariantDetailsByNameDto = a;
        // console.log('productVariantDetailsByNameDto' + this.productVariantDetailsByNameDto);
        //     });
    };
    EditProductComponent.prototype.addProduct = function () {
        {
            var formValues = this.form.value;
            var product = {
                productNo: formValues.productNo,
                categoryId: formValues.category.categoryId,
                brandId: formValues.brand.brandId,
                vendorId: formValues.vendor.vendorId,
                modelId: null,
                cost: formValues.cost,
                retail: formValues.retail,
                description: formValues.description.toUpperCase(),
                active: true,
                ecommerce: formValues.ecommerce,
                relatedProduct: formValues.relatedProduct,
                tax: formValues.tax,
                minQuantity: formValues.minQuantity,
                quantity: formValues.quantity,
                categoryName: null,
                customLoyaltyAmount: 0.00,
                productInventoryDaoList: this.currentProduct.productInventoryDaoList,
                variant: formValues.variant,
                markup: 0.00,
                createdTimestamp: ''
            };
            this.productService.editProduct(product);
            this.clearProductForm();
            this.router.navigate(['/product/productTable']);
        }
    };
    EditProductComponent.prototype.updateProductInventory = function (event) {
        this.productService.updateProductInventory(event.data);
    };
    EditProductComponent.prototype.setProductInventoryDetailsForDelete = function (inventory) {
        this.selectedProductInventoryForDelete = inventory;
    };
    EditProductComponent.prototype.deleteProductInventory = function () {
        this.productService.deleteProductInventory(this.selectedProductInventoryForDelete);
    };
    EditProductComponent.prototype.clearProductForm = function () {
        this.form.get('productNo').setValue(null);
        this.form.get('description').setValue('');
        // this.form.get('cost').setValue(null);
        this.form.get('markup').setValue(null);
        this.form.get('retail').setValue(null);
        this.form.get('quantity').setValue(null);
    };
    EditProductComponent.prototype.showDialog = function () {
        this.displayDialog = !this.displayDialog;
    };
    EditProductComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-edit-product',
            template: __webpack_require__("../../../../../src/app/product/edit-product/edit-product.component.html"),
            styles: [__webpack_require__("../../../../../src/app/product/edit-product/edit-product.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_app_product_product_service__["a" /* ProductService */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_5__angular_router__["ActivatedRoute"], __WEBPACK_IMPORTED_MODULE_5__angular_router__["Router"]])
    ], EditProductComponent);
    return EditProductComponent;
}());



/***/ }),

/***/ "../../../../../src/app/product/model/model.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/product/model/model.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"\">\n\n    <p-growl [(value)]=\"msgs\"></p-growl>\n    <mat-card>\n        <mat-card-title>\n            <h4>\n                Model Details\n            </h4>\n        </mat-card-title>\n        <mat-card-content>\n            <div class=\"row d-flex align-items-center justify-content-end\">\n                <div class=\"col-md-6\"></div>\n                <div class=\"col-md-6 d-flex justify-content-end\">\n                    <button type=\"button\" mat-raised-button class=\"bg-primary text-white action-button-lg\" (click)=\"showDialogToAdd()\">\n                                <i class=\"fa fa-plus-square\" aria-hidden=\"true\" label=\"Add\"></i>\n                                Add Model\n                            </button>\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-12 p-md-3\">\n                    <!-- <p-header>Category Details</p-header> -->\n                    <p-dataTable [value]=\"this.modelDto\" scrollable=\"true\" scrollHeight=\"500px\" [responsive]=\"true\" [editable]=\"true\" (onEditComplete)=\"this.updateModel($event)\">\n                        <p-column field=\"index\" header=\"Index\" [sortable]=\"true\"></p-column>\n                        <p-column field=\"name\" header=\"Model Name\" filterPlaceholder=\"Search For Model Name\" [filter]=\"true\" [editable]=\"true\"></p-column>\n                        <p-column field=\"description\" header=\"Model Description\" [sortable]=\"true\" [editable]=\"true\"></p-column>\n                        <p-column field=\"noOfProduct\" header=\"No Of Prodcuts\" [sortable]=\"true\"></p-column>\n                        <p-column field=\"action\" header=\"Action\" [style]=\"{'width': '5%'}\">\n                            <ng-template let-model=\"rowData\" pTemplate=\"body\" class=\"m-auto\">\n                                <button class=\"btn-red action-button-table\" mat-button data-toggle=\"modal\" data-target=\"#deleteCategory\" (click)=\"this.setModelForDelete(model)\">\n                                            <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                                        </button>\n                            </ng-template>\n                        </p-column>\n                    </p-dataTable>\n\n                </div>\n\n                <form *ngIf=\"this.modelForm != null\" [formGroup]=\"this.modelForm\">\n\n                    <p-dialog header=\"Add Model\" appendTo=\"body\" [(visible)]=\"displayDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\n                        <div class=\"ui-grid ui-grid-responsive ui-fluid\" *ngIf=\"model\">\n                            <div class=\"ui-grid-row\">\n                                <div class=\"ui-grid-col-4\">\n                                    <label for=\"name\">Name:</label>\n                                </div>\n                                <div class=\"ui-grid-col-8\">\n                                    <input class=\"form-control\" formControlName=\"name\" />\n                                </div>\n                            </div>\n                            <div class=\"ui-grid-row\">\n                                <div class=\"ui-grid-col-4\">\n                                    <label for=\"description\">Description:</label>\n                                </div>\n                                <div class=\"ui-grid-col-8\">\n                                    <input class=\"form-control\" formControlName=\"description\" />\n                                </div>\n                            </div>\n                        </div>\n                        <p-footer>\n                            <div style=\"text-align: center\">\n                                <button type=\"button\" class=\"btn btn-success\" (click)=\"this.addModel()\" [disabled]=\"this.modelForm.invalid\">\n                                        <i class=\"fa fa-paper-plane\" aria-hidden=\"true\" ></i>\n                                Add Model\n                            </button>\n                            </div>\n                        </p-footer>\n                    </p-dialog>\n                </form>\n            </div>\n        </mat-card-content>\n    </mat-card>\n\n</div>\n\n\n\n<!-- Start of Delete Model Popup -->\n<div class=\"modal fade\" id=\"deleteCategory\" role=\"dialog\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">Delete Category</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <p>Are You Sure You Want To Delete This Category</p>\n            </div>\n            <div class=\"modal-footer\">\n\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"this.deleteModel()\">Yes</button>\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancle</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- End of Delete Model Popup -->"

/***/ }),

/***/ "../../../../../src/app/product/model/model.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_product_model_model_service__ = __webpack_require__("../../../../../src/app/product/model/model.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_product_product_service__ = __webpack_require__("../../../../../src/app/product/product.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ModelComponent = /** @class */ (function () {
    function ModelComponent(modelService, productService, formBuilder) {
        this.modelService = modelService;
        this.productService = productService;
        this.formBuilder = formBuilder;
        this.msgs = [];
        this.model = new PrimeModel();
    }
    ModelComponent.prototype.ngOnInit = function () {
        this.modelForm = this.formBuilder.group({
            'name': [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            'description': ['']
        });
        this.getModelDetails();
    };
    ModelComponent.prototype.showSuccess = function (severity, summary, detail) {
        this.msgs = [];
        this.msgs.push({ severity: severity, summary: summary, detail: detail });
    };
    ModelComponent.prototype.getModelDetails = function () {
        var _this = this;
        this.productService.getModelDetails()
            .subscribe(function (models) {
            _this.modelDto = models;
            console.log('ModelList' + _this.modelDto);
        });
    };
    ModelComponent.prototype.addModel = function () {
        var newModel = this.modelForm.value;
        this.modelService.addOrUpdateModel(this.modelForm.value);
        this.modelDto.push(newModel);
        this.modelDto = this.modelDto.slice();
        this.displayDialog = false;
    };
    ModelComponent.prototype.updateModel = function (event) {
        this.modelService.addOrUpdateModel(event.data);
    };
    ModelComponent.prototype.setModelForDelete = function (model) {
        this.selectedModelForDelete = model;
    };
    ModelComponent.prototype.deleteModel = function () {
        var _this = this;
        var index = this.modelDto.findIndex(function (el) { return el.name == _this.selectedModelForDelete.name; });
        this.modelDto = this.modelDto.splice(0, index).concat(this.modelDto.splice(index));
        this.modelService.deleteModel(this.selectedModelForDelete.modelId);
    };
    ModelComponent.prototype.showDialogToAdd = function () {
        this.displayDialog = true;
    };
    ModelComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-model',
            template: __webpack_require__("../../../../../src/app/product/model/model.component.html"),
            styles: [__webpack_require__("../../../../../src/app/product/model/model.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_product_model_model_service__["a" /* ModelService */], __WEBPACK_IMPORTED_MODULE_2_app_product_product_service__["a" /* ProductService */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"]])
    ], ModelComponent);
    return ModelComponent;
}());

var PrimeModel = /** @class */ (function () {
    function PrimeModel(name, description) {
        this.name = name;
        this.description = description;
    }
    return PrimeModel;
}());


/***/ }),

/***/ "../../../../../src/app/product/model/model.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModelService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ModelService = /** @class */ (function () {
    function ModelService(http) {
        this.http = http;
    }
    ModelService.prototype.addOrUpdateModel = function (model) {
        console.log("Model Added" + model.name);
        this.http.post('http://localhost:8080/addModel', model)
            .subscribe(function (data) {
            alert('Model Updated !!');
            console.log(data);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    ModelService.prototype.deleteModel = function (modelId) {
        this.http.delete('http://localhost:8080/deleteModel?modelId=' + modelId)
            .subscribe(function (data) {
            alert('Model Deleted !!');
            console.log(data);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    ModelService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], ModelService);
    return ModelService;
}());



/***/ }),

/***/ "../../../../../src/app/product/product-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_product_product_component__ = __webpack_require__("../../../../../src/app/product/product.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_product_category_category_component__ = __webpack_require__("../../../../../src/app/product/category/category.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_product_vendor_vendor_component__ = __webpack_require__("../../../../../src/app/product/vendor/vendor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_product_brand_brand_component__ = __webpack_require__("../../../../../src/app/product/brand/brand.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_product_model_model_component__ = __webpack_require__("../../../../../src/app/product/model/model.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_product_addProduct_component__ = __webpack_require__("../../../../../src/app/product/addProduct.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_product_product_table_product_table_component__ = __webpack_require__("../../../../../src/app/product/product-table/product-table.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_product_add_inventory_add_inventory_component__ = __webpack_require__("../../../../../src/app/product/add-inventory/add-inventory.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_product_edit_product_edit_product_component__ = __webpack_require__("../../../../../src/app/product/edit-product/edit-product.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_auth_auth_guard__ = __webpack_require__("../../../../../src/app/auth/auth.guard.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var routes = [
    {
        path: 'product',
        component: __WEBPACK_IMPORTED_MODULE_2_app_product_product_component__["a" /* ProductComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_11_app_auth_auth_guard__["a" /* AuthGuard */]],
        // canActivateChild: [AuthGuard],
        children: [
            { path: '', redirectTo: 'productTable', pathMatch: 'prefix' },
            { path: 'add', component: __WEBPACK_IMPORTED_MODULE_7_app_product_addProduct_component__["a" /* AddProductComponent */] },
            { path: 'edit', component: __WEBPACK_IMPORTED_MODULE_10_app_product_edit_product_edit_product_component__["a" /* EditProductComponent */] },
            { path: 'productTable', component: __WEBPACK_IMPORTED_MODULE_8_app_product_product_table_product_table_component__["a" /* ProductTableComponent */] },
            { path: 'vendor', component: __WEBPACK_IMPORTED_MODULE_4_app_product_vendor_vendor_component__["a" /* VendorComponent */] },
            { path: 'brand', component: __WEBPACK_IMPORTED_MODULE_5_app_product_brand_brand_component__["a" /* BrandComponent */] },
            { path: 'model', component: __WEBPACK_IMPORTED_MODULE_6_app_product_model_model_component__["a" /* ModelComponent */] },
            { path: 'addInventory', component: __WEBPACK_IMPORTED_MODULE_9_app_product_add_inventory_add_inventory_component__["a" /* AddInventoryComponent */] },
            { path: 'category', component: __WEBPACK_IMPORTED_MODULE_3_app_product_category_category_component__["a" /* CategoryComponent */] },
        ]
    },
];
var ProductRoutingModule = /** @class */ (function () {
    function ProductRoutingModule() {
    }
    ProductRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
        })
    ], ProductRoutingModule);
    return ProductRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/product/product-table/product-table.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-title>\n        <h4>Product Inventory</h4>\n    </mat-card-title>\n    <mat-card-content>\n        <div class=\"row d-flex align-items-center\">\n            <div class=\"col-md-3\">\n                <!-- <p-autoComplete [(ngModel)]=\"productFilterBox\" styleClass=\"wid100\" [suggestions]=\"backendProductDto\" (completeMethod)=\"filterProducts($event)\" name=\"test\" [minLength]=\"1\" (keyup.enter)=\"submitProduct(p)\"\n                        field=\"description\">\n                    </p-autoComplete> -->\n\n                <input class=\"form-control \" [formControl]=\"this.searchProductTextBox\" type=\"text\" placeholder=\"Search By Product No/ Description\">\n            </div>\n\n            <div class=\"col-md-2\">\n                <select class=\"form-control\" [(ngModel)]=\"this.selectedProductDropdownOption\" (change)=\"onProductDropdownChoose()\">\n                        <option>Select All</option>\n                        <option>Brand</option>\n                        <option>Category</option>\n                        <option>Vendor</option>\n                        <option>Model</option>\n                    </select>\n\n            </div>\n            <div class=\"col-md-2\">\n                <select *ngIf=\"this.listOfProductOption != null\" class=\"form-control \" #dropdown (change)=\"fiterProductByDropdown(dropdown.value)\">\n                        <option [value]=\"-1\">All {{this.selectedProductDropdownOption}}</option>\n                        <option *ngFor=\"let option of this.listOfProductOption\" [value]=\"option.id\">\n                            {{option.name}}\n                        </option>\n                    </select>\n            </div>\n\n            <div class=\"col-md-5 d-flex align-items-center justify-content-end\">\n                <button type=\"button\" mat-raised-button class=\"bg-primary text-white action-button-lg\" style=\"margin-right: 15px\" [routerLink]=\"['/product/add']\">\n                        <i class=\"fa fa-plus-square\" aria-hidden=\"true\" label=\"Add\"></i>\n                        Add Product\n                    </button>\n\n                <button type=\"button\" mat-raised-button class=\"bg-primary text-white action-button-lg\" [routerLink]=\"['/product/addInventory']\">\n                        <i class=\"fa fa-plus-square\" aria-hidden=\"true\" label=\"Add\"></i>\n                        Add Inventory\n                    </button>\n\n            </div>\n\n\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-12 p-md-3\">\n\n                <!-- <p-header>Product Details</p-header> -->\n                <p-dataTable [value]=\"this.productViewList\" [editable]=\"true\" scrollable=\"true\" virtualScroll=\"virtualScroll\" [rows]=\"this.rowsToShow\" [lazy]=\"true\" [totalRecords]=\"this.totalNumberProducts\" [responsive]=\"true\" scrollHeight=\"400px\" (onEditComplete)=\"this.updateRetailPrice($event)\"\n                    (onLazyLoad)=\"loadProductsLazy($event)\">\n                    <p-column [style]=\"{'width': '10%'}\" field=\"productNo\" header=\"Product Number\" filterPlaceholder=\"Search For Product Name\"></p-column>\n                    <p-column [style]=\"{'width': '30%', 'text-align': 'left'}\" field=\"description\" header=\"Description\" [sortable]=\"true\"></p-column>\n                    <!-- <p-column [style]=\"{'width': '10%'}\" field=\"categoryName\" header=\"Category\" [sortable]=\"true\"></p-column> -->\n                    <p-column [style]=\"{'width': '10%'}\" field=\"cost\" header=\"Cost\" [sortable]=\"true\">\n\n                        <ng-template let-product=\"rowData\" pTemplate=\"body\">\n                            <a href=\"JavaScript:void(0);\" (click)=\"setProductInventoryForSelectedProduct(product.productInventoryDaoList)\" data-toggle=\"modal\" data-target=\"#productInventory\"> {{product.productInventoryDaoList[0]?.cost | currency:'USD':'true'}}</a>\n                        </ng-template>\n                    </p-column>\n                    <p-column [style]=\"{'width': '10%'}\" field=\"retail\" header=\"Retail\" [editable]=\"true\">\n                        <ng-template let-product=\"rowData\" pTemplate=\"body\">\n                            <a> {{product.retail | currency:'USD':'true'}}</a>\n                        </ng-template>\n                    </p-column>\n                    <p-column [style]=\"{'width': '8%'}\" field=\"quantity\" header=\"Quantity\" [sortable]=\"true\">\n                        <ng-template let-product=\"rowData\" pTemplate=\"body\">\n                            <a href=\"JavaScript:void(0);\" (click)=\"setProductInventoryForSelectedProduct(product.productInventoryDaoList)\" data-toggle=\"modal\" data-target=\"#productInventory\">{{product.quantity}}</a>\n                        </ng-template>\n                    </p-column>\n                    <p-column [style]=\"{'width': '23%'}\" field=\"action\" header=\"Action\" [sortable]=\"true\">\n                        <ng-template let-product=\"rowData\" pTemplate=\"body\" class=\"m-auto\">\n                            <button class=\"btn-blue action-button-table\" mat-button [routerLink]=\"['/product/edit', {productNo: product.productNo}]\">\n                                    <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n                                </button>\n                            <button mat-button class=\"btn-red action-button-table\" mat-button (click)=\"this.setProductToDelete(product)\" data-toggle=\"modal\" data-target=\"#deleteProduct\">\n                                    <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                                </button>\n                            <button mat-button class=\"btn-green action-button-table\" mat-button (click)=\"this.setProductForHistory(product)\" data-toggle=\"modal\" data-target=\"#productHistoryModel\">\n                                    <i class=\"fa fa-history\" aria-hidden=\"true\"></i>\n                                </button>\n                            <button mat-button class=\"btn-gray action-button-table\" mat-button data-toggle=\"modal\" data-target=\"#productHistoryModel\">\n                                    <i class=\"fa fa-barcode\" aria-hidden=\"true\"></i>\n                                </button>\n\n                        </ng-template>\n                    </p-column>\n                </p-dataTable>\n\n\n\n                <!-- <table class=\"table\" class=\"table table-striped\">\n                    <thead>\n                        <tr>\n                            <th>Product No</th>\n                            <th>Description</th>\n                            <th>Cost</th>\n                            <th>Retail</th>\n                            <th>Quantity</th>\n                            <th>Action</th>\n                        </tr>\n                    </thead>\n                    <tbody>\n                        <tr *ngFor=\"let product of this.backendProductDto\">\n                            <td>{{product.productNo}}</td>\n                            <td>{{product.description}}</td>\n                            <td>{{product.cost}}</td>\n                            <td>{{product.retail}}</td>\n                            <td>{{product.quantity}}</td> -->\n                <!-- <td>\n                                <button class=\"btn-blue action-button-table\" mat-button [routerLink]=\"['/product/edit', {productNo: product.productNo}]\">\n                                    <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n                                </button>\n                                <button mat-button class=\"btn-red action-button-table\" mat-button (click)=\"this.setProductToDelete(product)\" data-toggle=\"modal\" data-target=\"#deleteProduct\">\n                                    <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                                </button>\n                                <button mat-button class=\"btn-green action-button-table\" mat-button (click)=\"this.setProductForHistory(product)\" data-toggle=\"modal\" data-target=\"#productHistoryModel\">\n                                    <i class=\"fa fa-history\" aria-hidden=\"true\"></i>\n                                </button>\n                                <button mat-button class=\"btn-gray action-button-table\" mat-button data-toggle=\"modal\" data-target=\"#productHistoryModel\">\n                                    <i class=\"fa fa-barcode\" aria-hidden=\"true\"></i>\n                                </button>\n                            </td> -->\n                <!-- </tr>\n\n                    </tbody>\n                </table> -->\n\n\n\n            </div>\n        </div>\n\n    </mat-card-content>\n</mat-card>\n<!-- <p-growl [(value)]=\"msgs\"></p-growl> -->\n\n\n<!-- Start Of Product History model -->\n<div class=\"modal fade\" id=\"productHistoryModel\" role=\"dialog\">\n    <div class=\"modal-dialog modal-lg\">\n\n        <!-- Modal content-->\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n                <h3 class=\"modal-title\">Product History</h3>\n            </div>\n            <div class=\"modal-body\">\n\n                <div class=\"row\">\n                    <div class=\"col-md-4\">\n                        <select class=\"form-control form-control-lg\" [(ngModel)]=\"this.productHistoryDropDown\" (change)=\"this.getProductHistory()\">\n                            <option>Today</option>\n                            <option>Yesterday</option>\n                            <option>This Week</option>\n                            <option>Last Week</option>\n                            <option>This Month</option>\n                            <option>Last Month</option>\n                            <option>Last 3 Months</option>\n                            <option>Last 6 Months</option>\n                            <option>This Year</option>\n                            <option>Last Year</option>\n                            <option>Custom</option>\n\n                        </select>\n\n                    </div>\n\n                </div>\n\n                <div class=\"row\">\n                    <table class=\"table\">\n                        <thead>\n                            <tr>\n\n                                <th>Product No</th>\n                                <th>Product Sold</th>\n                                <th>Cost</th>\n                                <th>Retail</th>\n                                <th>Date</th>\n                                <th>Time</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let product of this.productHistoryDto\">\n                                <td>{{product.productNo}}</td>\n                                <td>{{product.quantity}}</td>\n                                <td>{{product.cost}}</td>\n                                <td>{{product.retail}}</td>\n                                <td>{{product.date}}</td>\n                                <td>{{product.time}}</td>\n                            </tr>\n                        </tbody>\n                    </table>\n\n                </div>\n                <div class=\"row\">\n                    <h5>Total Number Of Product Sold: 324(TODO CENTER)</h5>\n                </div>\n\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n\n\n    </div>\n\n</div>\n\n<!-- End of Prodcut Histoty Model -->\n\n<!-- Start of Delete product up -->\n<div class=\"modal fade\" id=\"deleteProduct\" role=\"dialog\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">Delete Product</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <p>Are You Sure You Want To Delete This Product</p>\n            </div>\n            <div class=\"modal-footer\">\n\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"this.deleteProduct()\">Yes</button>\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancle</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- End of Delete product up -->\n\n\n<!-- Start Of Cost price and Quantity model -->\n<div class=\"modal fade\" id=\"productInventory\" role=\"dialog\" (keyup.enter)=\"this.hideProductModal()\">\n    <div class=\"modal-dialog modal-lg\">\n\n        <!-- Modal content-->\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">Product Inventory</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            </div>\n            <div class=\"modal-body\">\n\n                <div class=\"row\">\n                    <div class=\"col-md-4\">\n                        <input class=\"form-control\" [(ngModel)]=\"this.cost\" type=\"number\" placeholder=\"Cost\">\n                    </div>\n                    <div class=\"col-md-4\">\n                        <input class=\"form-control\" [(ngModel)]=\"this.quantity\" type=\"number\" placeholder=\"Quantity\">\n                    </div>\n                    <div class=\"col-md-4\">\n                        <button type=\"button\" mat-raised-button class=\"bg-primary text-white\" style=\"width: 100%;\" (click)=\"this.addProductInventory()\" data-dismiss=\"modal\">\n                                <i class=\"fa fa-plus-square\" aria-hidden=\"true\" label=\"Add\"></i>\n                                Add Product Inventory\n                        </button>\n                    </div>\n\n                </div>\n                <div class=\"row p-3\">\n                    <p-dataTable [value]=\"this.productInventoryList\" [editable]=\"true\" scrollable=\"true\" [responsive]=\"true\" scrollHeight=\"300px\" (onEditComplete)=\"this.updateProductInventory($event)\">\n                        <p-column field=\"cost\" header=\"Cost\" [editable]=\"true\">\n                            <ng-template let-product=\"rowData\" pTemplate=\"body\">\n                                {{product.cost | currency:'USD':'true'}}\n                            </ng-template>\n                        </p-column>\n\n                        <p-column field=\"quantity\" header=\"Quantity\" [editable]=\"true\"></p-column>\n\n                        <p-column field=\"date\" header=\"Date\"></p-column>\n\n                        <p-column field=\"time\" header=\"Time\"></p-column>\n\n                    </p-dataTable>\n                </div>\n\n            </div>\n\n\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n\n\n    </div>\n\n</div>\n<!-- Start Of Cost price and Quantity model -->"

/***/ }),

/***/ "../../../../../src/app/product/product-table/product-table.component.sass":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/product/product-table/product-table.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductTableComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_product_product_service__ = __webpack_require__("../../../../../src/app/product/product.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_product_product_component__ = __webpack_require__("../../../../../src/app/product/product.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_loading_service__ = __webpack_require__("../../../../../src/app/loading.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_toastr__);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { FormBuilder } from "@angular/forms/forms";





var ProductTableComponent = /** @class */ (function () {
    function ProductTableComponent(productService, loadingService, toastr) {
        this.productService = productService;
        this.loadingService = loadingService;
        this.toastr = toastr;
        this.productViewList = [];
        this.productFullList = [];
        this.rowsToShow = 100;
        this.totalNumberProducts = 0;
        this.displayDialog = false;
        this.selectedProductDropdownOption = "Select All";
        this.listOfProductOption = null;
        this.pipeFilterData = [];
        this.checked2 = true;
        this.searchProductTextBox = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]();
        this.productHistoryDto = [];
        this.productHistoryDropDown = 'Today';
        this.productInventoryList = [];
        this.loading = false;
    }
    ProductTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getProductDetails();
        this.searchProductTextBox.valueChanges
            .debounceTime(800)
            .distinctUntilChanged()
            .subscribe(function (change) {
            _this.filterProducts(change);
        });
    };
    ProductTableComponent.prototype.getProductDetails = function () {
        var _this = this;
        this.loadingService.loading = true;
        this.productService.getProductDetails()
            .subscribe(function (pro) {
            // console.log(pro); 
            // this.productViewList = pro.slice(0,500);
            // this.productViewList = pro;
            _this.productFullList = pro;
            _this.backendProductDto = pro;
            if (_this.dropdownOptionValue)
                _this.fiterProductByDropdown(_this.dropdownOptionValue);
            _this.loadProductsLazy({ first: 0, rows: _this.rowsToShow * 2 });
            _this.loadingService.loading = false;
        });
    };
    ProductTableComponent.prototype.loadProductsLazy = function (event) {
        this.loadingService.loading = true;
        if (this.productFullList) {
            this.totalNumberProducts = this.productFullList.length;
            this.productViewList = this.productFullList.slice(event.first, event.first + event.rows - 1);
        }
        this.loadingService.loading = false;
    };
    ProductTableComponent.prototype.filterProducts = function (input) {
        this.loadingService.loading = true;
        if (input.length > 0)
            this.productFullList = this.nowFilterProduct(input, this.backendProductDto);
        else {
            this.getProductDetails();
            if (this.dropdownOptionValue)
                this.fiterProductByDropdown(this.dropdownOptionValue);
        }
        this.loadingService.loading = false;
        console.log('Filtering product list..', this.productFullList);
        this.loadProductsLazy({ first: 0, rows: this.rowsToShow * 2 });
    };
    ProductTableComponent.prototype.nowFilterProduct = function (input, backendProductDto) {
        var filtered = [];
        // for (let i = 0; i < backendProductDto.length; i++) {
        // let p = backendProductDto[i];
        // if (p.description.toLowerCase().includes(input.toLowerCase()) || p.productNo.includes(input)) {
        //   filtered.push(p);
        // }
        // ); 
        // }
        filtered = backendProductDto.filter(function (p) { return p.description.toLowerCase().includes(input.toLowerCase()) || p.productNo.includes(input); });
        return filtered;
    };
    ProductTableComponent.prototype.fiterProductByDropdown = function (obj) {
        if (obj)
            this.dropdownOptionValue = obj;
        console.log(obj);
        if (obj == -1) {
            this.productFullList = this.backendProductDto;
            this.loadProductsLazy({ first: 0, rows: this.rowsToShow * 2 });
            return;
        }
        if (this.selectedProductDropdownOption === 'Brand') {
            this.productFullList = this.backendProductDto.filter(function (el) { return el.brandId == obj; });
        }
        else if (this.selectedProductDropdownOption === 'Category') {
            this.productFullList = this.backendProductDto.filter(function (cat) { return cat.categoryId == obj; });
        }
        else if (this.selectedProductDropdownOption === 'Vendor') {
            this.productFullList = this.backendProductDto.filter(function (ven) { return ven.vendorId == obj; });
        }
        else if (this.selectedProductDropdownOption === 'Model') {
            this.productFullList = this.backendProductDto.filter(function (mod) { return mod.modelId == obj; });
        }
        // console.log('Product full list here', this.productFullList);
        this.loadProductsLazy({ first: 0, rows: this.rowsToShow * 2 });
    };
    ProductTableComponent.prototype.onProductDropdownChoose = function () {
        var _this = this;
        console.log(this.selectedProductDropdownOption);
        if (this.selectedProductDropdownOption === 'Brand') {
            //console.log('inside the if for brand');
            //TODO need to figure out how to reuse this code.
            this.productService.getBrandDetails()
                .subscribe(function (brands) {
                _this.listOfProductOption = [];
                brands.forEach(function (el) { return _this.listOfProductOption.push({
                    id: el.brandId,
                    name: el.name
                }); });
            });
        }
        else if (this.selectedProductDropdownOption === 'Category') {
            //console.log('inside the if for brand');
            this.productService.getCategoryDetails()
                .subscribe(function (categories) {
                _this.listOfProductOption = [];
                categories.forEach(function (el) { return _this.listOfProductOption.push({
                    id: el.categoryId,
                    name: el.name
                }); });
            });
        }
        else if (this.selectedProductDropdownOption === 'Vendor') {
            this.productService.getVendorDetails()
                .subscribe(function (vendors) {
                _this.listOfProductOption = [];
                vendors.forEach(function (el) { return _this.listOfProductOption.push({
                    id: el.vendorId,
                    name: el.name
                }); });
            });
        }
        else if (this.selectedProductDropdownOption === 'Model') {
            this.productService.getModelDetails()
                .subscribe(function (models) {
                _this.listOfProductOption = [];
                models.forEach(function (el) { return _this.listOfProductOption.push({
                    id: el.modelId,
                    name: el.name
                }); });
            });
        }
        else {
            this.listOfProductOption = null;
            this.productFullList = this.backendProductDto;
            this.loadProductsLazy({ first: 0, rows: this.rowsToShow * 2 });
        }
    };
    ProductTableComponent.prototype.editProduct = function (editProduct) {
    };
    // I need to do this because i am opning popup then once user conform the delete then only i am calling delete method from model.
    ProductTableComponent.prototype.setProductToDelete = function (product) {
        this.selectedProductForDelete = product;
    };
    ProductTableComponent.prototype.deleteProduct = function () {
        var _this = this;
        this.productService.deleteProduct(this.selectedProductForDelete);
        var index = this.backendProductDto.findIndex(function (el) { return el.productNo == _this.selectedProductForDelete.productNo; });
        // console.log('Index', index);
        // console.log('Before delete', this.backendProductDto.length);
        this.backendProductDto.splice(index, 1);
        // TODO need to fix this, why new prodcut is not loading after delete.
        // console.log("After deletion", this.backendProductDto.length)
        this.productViewList = this.backendProductDto.slice();
        // this.getProductDetails();
    };
    ProductTableComponent.prototype.setProductForHistory = function (product) {
        this.selectedProductForHistory = product;
        // I need to do this becuase after, after setting product, its opens the model and if i dont call this method user wont see anything on popup.
        this.getProductHistory();
    };
    ProductTableComponent.prototype.getProductHistory = function () {
        //TODO NEED TO write service call to get the product history!!
        var _this = this;
        this.productService.getProductHistory(this.selectedProductForHistory.productNo, this.productHistoryDropDown)
            .subscribe(function (productHistory) {
            productHistory.forEach((function (history) {
                history.time = __WEBPACK_IMPORTED_MODULE_4_moment__(history.date).format('hh:mm A');
                history.date = __WEBPACK_IMPORTED_MODULE_4_moment__(history.date).format('MM/DD/YYYY');
            }));
            _this.productHistoryDto = productHistory;
        });
        console.log("Product data from UI for History", this.selectedProductForHistory);
        console.log(this.productHistoryDto);
    };
    ProductTableComponent.prototype.updateRetailPrice = function (event) {
        this.updateProductObject = event.data;
        this.productService.updateProductRetailPrice(this.updateProductObject);
        console.log(event);
    };
    // This method helps to set the perticualr product inventory details to show on popup when user click on the cost price.
    ProductTableComponent.prototype.setProductInventoryForSelectedProduct = function (productInventoryList1) {
        var _this = this;
        // First need to get real inventory details from the db, cause when you add inventory and if you dont do this call, it wont show you,
        // Newly added inventory details.
        this.productService.getProductInventoryByProductNo(productInventoryList1[0].productNo)
            .subscribe(function (inventory) {
            _this.productInventoryList = inventory;
            _this.productInventoryList.forEach(function (inventory) {
                inventory.time = __WEBPACK_IMPORTED_MODULE_4_moment__(inventory.createdTimestamp).format('hh:mm A');
                inventory.date = __WEBPACK_IMPORTED_MODULE_4_moment__(inventory.createdTimestamp).format('MM-DD-YYYY');
            });
        });
    };
    ProductTableComponent.prototype.addProductInventory = function () {
        var _this = this;
        var productInventoryObj = new __WEBPACK_IMPORTED_MODULE_3_app_product_product_component__["b" /* ProductInventory */]();
        productInventoryObj.productNo = this.productInventoryList[0].productNo;
        productInventoryObj.cost = this.cost;
        productInventoryObj.retail = this.productInventoryList[0].retail;
        productInventoryObj.quantity = this.quantity;
        productInventoryObj.createdTimestamp = __WEBPACK_IMPORTED_MODULE_4_moment__(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.productInventoryList.push(productInventoryObj);
        this.productService.addProductInventory(this.productInventoryList)
            .subscribe(function (productInventory) {
            if (null != productInventory) {
                _this.toastr.success('Inventory Added Successfully !!', 'Success!');
            }
            else {
                _this.toastr.error('Opps Something Goes Wrong !!', 'Error!');
            }
        }, function (error) {
            _this.toastr.error('Opps Something goes wrong !!', 'Error!!');
            console.log(JSON.stringify(error.json()));
        });
        this.cost = null;
        this.quantity = null;
    };
    ProductTableComponent.prototype.updateProductInventory = function (event) {
        var _this = this;
        var product = event.data;
        console.log('Updating product inventory', product);
        console.log('event on inventoty', event.date);
        var productInventory = [];
        productInventory.push(event.data);
        console.log('product invetrory object', productInventory);
        this.productService.updateProductInventory(productInventory)
            .subscribe(function (data) {
            if (data) {
                _this.toastr.success('Inventory Updated Successfully !!', 'Success!');
            }
        }, function (error) {
            _this.toastr.error('Opps Something goes wrong !!', 'Error!!');
            console.log(JSON.stringify(error.json()));
        });
        var index = this.productViewList.findIndex(function (el) { return el.productNo == product.productNo; });
        this.productViewList[index] = __assign({}, this.productViewList[index], product);
        this.productViewList = this.productViewList.slice();
        this.hideProductModal();
    };
    ProductTableComponent.prototype.hideProductModal = function () {
        console.log('Hiding modal');
        $('#productInventory').modal('hide');
    };
    ProductTableComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-product-table',
            template: __webpack_require__("../../../../../src/app/product/product-table/product-table.component.html"),
            styles: [__webpack_require__("../../../../../src/app/product/product-table/product-table.component.sass")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_product_product_service__["a" /* ProductService */], __WEBPACK_IMPORTED_MODULE_5_app_loading_service__["a" /* LoadingService */], __WEBPACK_IMPORTED_MODULE_6_ng2_toastr__["ToastsManager"]])
    ], ProductTableComponent);
    return ProductTableComponent;
}());



/***/ }),

/***/ "../../../../../src/app/product/product.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <app-top-sub-navbar [menu]=\"this.items\" ></app-top-sub-navbar>\n    <div class=\"\">\n        <router-outlet></router-outlet>\n    </div>\n</div>\n\n<!-- DO NOT DELETE THIS -->\n<!-- <div class=\"col-md-2\">\n            <a href=\"/addProduct\">\n                <button type=\"button\" class=\"btn btn-primary btn-lg active\">\n                <i class=\"fa fa-plus-square\" aria-hidden=\"true\" label=\"Add\"></i>\n                Add Prodcut\n            </button>\n            </a>\n        </div> -->\n\n\n<!-- </div> -->"

/***/ }),

/***/ "../../../../../src/app/product/product.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/product/product.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductComponent; });
/* unused harmony export Category */
/* unused harmony export Brand */
/* unused harmony export Vendor */
/* unused harmony export Model */
/* unused harmony export ModelTest */
/* unused harmony export ProductVariantDetail */
/* unused harmony export BackendProductDto */
/* unused harmony export ProductCommonTest */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ProductInventory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_product_product_service__ = __webpack_require__("../../../../../src/app/product/product.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_shared_animations_fade_in_animation__ = __webpack_require__("../../../../../src/app/shared/animations/fade-in.animation.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


// import { FormBuilder } from "@angular/forms/forms";



// import { MenuItem } from 'primeng/primeng';
var ProductComponent = /** @class */ (function () {
    function ProductComponent(router, productService, formBuilder) {
        this.router = router;
        this.productService = productService;
        this.formBuilder = formBuilder;
        this.displayDialog = false;
        this.listOfProductOption = null;
    }
    ProductComponent.prototype.ngOnInit = function () {
        // if (this.router.url == "/product")
        //   this.router.navigate(['/product/productTable']);
        this.selectedProductDropdownOption = 'Select All';
        this.items = [
            { name: 'Inventory', icon: 'fa fa-tags fa-x', link: '/product/productTable' },
            { name: 'Category', icon: 'fa fa-list fa-x', link: '/product/category' },
            { name: 'Brand', icon: 'fa fa-bookmark fa-x', link: '/product/brand' },
            { name: 'Vendor', icon: 'fa fa-user fa-x', link: '/product/vendor' },
            { name: 'Model', icon: 'fa fa-mobile fa-x', link: '/product/model' }
        ];
    };
    ProductComponent.prototype.onProductDropdownChoose = function () {
        var _this = this;
        if (this.selectedProductDropdownOption === 'Brand') {
            //console.log('inside the if for brand');
            //TODO need to figure out how to reuse this code.
            this.productService.getBrandDetails()
                .subscribe(function (brands) {
                _this.listOfProductOption = brands;
            });
        }
        else if (this.selectedProductDropdownOption === 'Category') {
            //console.log('inside the if for brand');
            this.productService.getCategoryDetails()
                .subscribe(function (categories) {
                _this.listOfProductOption = categories;
            });
        }
        else if (this.selectedProductDropdownOption === 'Vendor') {
            this.productService.getVendorDetails()
                .subscribe(function (vendors) {
                _this.listOfProductOption = vendors;
            });
        }
        else if (this.selectedProductDropdownOption === 'Model') {
            this.productService.getModelDetails()
                .subscribe(function (models) {
                _this.listOfProductOption = models;
            });
        }
        else {
            this.listOfProductOption = null;
        }
    };
    ProductComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-product',
            template: __webpack_require__("../../../../../src/app/product/product.component.html"),
            styles: [__webpack_require__("../../../../../src/app/product/product.component.scss")],
            animations: [__WEBPACK_IMPORTED_MODULE_4_app_shared_animations_fade_in_animation__["a" /* fadeInAnimation */]],
            host: { '[@fadeInAnimation]': '' }
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_1_app_product_product_service__["a" /* ProductService */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"]])
    ], ProductComponent);
    return ProductComponent;
}());

var Category = /** @class */ (function () {
    function Category() {
    }
    return Category;
}());

var Brand = /** @class */ (function () {
    function Brand() {
    }
    return Brand;
}());

var Vendor = /** @class */ (function () {
    function Vendor() {
    }
    return Vendor;
}());

var Model = /** @class */ (function () {
    function Model() {
    }
    return Model;
}());

var ModelTest = /** @class */ (function () {
    function ModelTest() {
    }
    return ModelTest;
}());

var ProductVariantDetail = /** @class */ (function () {
    function ProductVariantDetail() {
    }
    return ProductVariantDetail;
}());

var BackendProductDto = /** @class */ (function () {
    function BackendProductDto() {
    }
    return BackendProductDto;
}());

var ProductCommonTest = /** @class */ (function () {
    function ProductCommonTest() {
    }
    return ProductCommonTest;
}());

var ProductInventory = /** @class */ (function () {
    function ProductInventory() {
    }
    return ProductInventory;
}());

// markup: '',
// brandName: '',
// vendorName: '',
// modelName: '',
// alternetNo: '',
// minQuantity: '',
// isTax: '',
// isVariant: '',
// IsActive: '',
// IsEcomerce: '',
// IsRelatedProduct: '',
// defaultQuantity: '',
// transactionComId: '',
// date: '',
// status: '',
// discount: '',
// retailDiscount: '',
// totalProductPrice: '',
// totalProductPriceWithTax: '',
// imeiNo: '',


/***/ }),

/***/ "../../../../../src/app/product/product.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_product_product_component__ = __webpack_require__("../../../../../src/app/product/product.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_product_product_service__ = __webpack_require__("../../../../../src/app/product/product.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_primeng_table__ = __webpack_require__("../../../../primeng/table.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_primeng_table___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_primeng_table__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_product_category_category_component__ = __webpack_require__("../../../../../src/app/product/category/category.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_product_vendor_vendor_component__ = __webpack_require__("../../../../../src/app/product/vendor/vendor.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_product_vendor_vendor_service__ = __webpack_require__("../../../../../src/app/product/vendor/vendor.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_product_category_category_service__ = __webpack_require__("../../../../../src/app/product/category/category.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__brand_brand_component__ = __webpack_require__("../../../../../src/app/product/brand/brand.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_app_product_brand_brand_service__ = __webpack_require__("../../../../../src/app/product/brand/brand.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__model_model_component__ = __webpack_require__("../../../../../src/app/product/model/model.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_app_product_model_model_service__ = __webpack_require__("../../../../../src/app/product/model/model.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16_app_product_addProduct_component__ = __webpack_require__("../../../../../src/app/product/addProduct.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__product_table_product_table_component__ = __webpack_require__("../../../../../src/app/product/product-table/product-table.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_app_product_product_routing_module__ = __webpack_require__("../../../../../src/app/product/product-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__add_inventory_add_inventory_component__ = __webpack_require__("../../../../../src/app/product/add-inventory/add-inventory.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_app_shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__edit_product_edit_product_component__ = __webpack_require__("../../../../../src/app/product/edit-product/edit-product.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





























var ProductModule = /** @class */ (function () {
    function ProductModule() {
    }
    ProductModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_22__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["DialogModule"],
                __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["DataTableModule"],
                __WEBPACK_IMPORTED_MODULE_20_app_shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["MessagesModule"],
                __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["GrowlModule"],
                __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["TabMenuModule"],
                __WEBPACK_IMPORTED_MODULE_18_app_product_product_routing_module__["a" /* ProductRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["InputSwitchModule"],
                __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["AutoCompleteModule"],
                __WEBPACK_IMPORTED_MODULE_7_primeng_table__["TableModule"]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3_app_product_product_component__["a" /* ProductComponent */],
                __WEBPACK_IMPORTED_MODULE_16_app_product_addProduct_component__["a" /* AddProductComponent */],
                __WEBPACK_IMPORTED_MODULE_8_app_product_category_category_component__["a" /* CategoryComponent */],
                __WEBPACK_IMPORTED_MODULE_9_app_product_vendor_vendor_component__["a" /* VendorComponent */],
                __WEBPACK_IMPORTED_MODULE_12__brand_brand_component__["a" /* BrandComponent */],
                __WEBPACK_IMPORTED_MODULE_14__model_model_component__["a" /* ModelComponent */],
                __WEBPACK_IMPORTED_MODULE_17__product_table_product_table_component__["a" /* ProductTableComponent */],
                __WEBPACK_IMPORTED_MODULE_19__add_inventory_add_inventory_component__["a" /* AddInventoryComponent */],
                __WEBPACK_IMPORTED_MODULE_21__edit_product_edit_product_component__["a" /* EditProductComponent */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_4_app_product_product_service__["a" /* ProductService */], __WEBPACK_IMPORTED_MODULE_10_app_product_vendor_vendor_service__["a" /* VendorService */], __WEBPACK_IMPORTED_MODULE_11_app_product_category_category_service__["a" /* CategoryService */], __WEBPACK_IMPORTED_MODULE_13_app_product_brand_brand_service__["a" /* BrandService */], __WEBPACK_IMPORTED_MODULE_15_app_product_model_model_service__["a" /* ModelService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_app_product_product_component__["a" /* ProductComponent */], __WEBPACK_IMPORTED_MODULE_16_app_product_addProduct_component__["a" /* AddProductComponent */], __WEBPACK_IMPORTED_MODULE_19__add_inventory_add_inventory_component__["a" /* AddInventoryComponent */]]
        })
    ], ProductModule);
    return ProductModule;
}());



/***/ }),

/***/ "../../../../../src/app/product/product.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ProductService = /** @class */ (function () {
    function ProductService(http) {
        this.http = http;
        this.url = __WEBPACK_IMPORTED_MODULE_3_environments_environment__["a" /* environment */].reportUrl;
    }
    ProductService.prototype.getProductDetails = function () {
        var _this = this;
        // if(!this.fullProductList){
        return this.http.get(this.url + '/getProductTableDetails')
            .map(this.extractData)
            .map(function (list) {
            console.log('Caching product list...');
            _this.fullProductList = list;
            return _this.fullProductList;
        })
            .catch(this.handleError);
        // }
        // else{
        //   return Observable.create((observer: Observer<any>) => {
        //     console.log('Returning cached product list');
        //     observer.next(this.fullProductList);
        //     observer.complete();  
        //   }); 
        // }
    };
    ProductService.prototype.getProductInventoryByProductNo = function (productNo) {
        return this.http.get(this.url + '/getProductInventory?productNo=' + productNo)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.getCategoryDetails = function () {
        return this.http.get(this.url + '/getCategory')
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.getProductDetailsById = function (productNo) {
        var url = this.url + ("/getProductById?productNo=" + productNo);
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.getBrandDetails = function () {
        return this.http.get(this.url + '/getBrand')
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.getVendorDetails = function () {
        return this.http.get(this.url + '/getVendor')
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.getModelDetails = function () {
        return this.http.get(this.url + '/getModel')
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.getProductVariantDetails = function () {
        return this.http.get(this.url + '/getProductVariantDetails')
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.getProductVariantDetailsByName = function (name) {
        return this.http.get(this.url + '/getProductVariantDetailsByName?variantName=' + name)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.getAutoGeneratedBarcode = function () {
        return this.http.get(this.url + '/getAutoGeneratedProductNo')
            .map(function (res) { return res.text(); })
            .catch(this.handleError);
    };
    ProductService.prototype.getProductHistory = function (productNo, timeDuration) {
        return this.http.get(this.url + 'getProductHistory?productNo=' + productNo + '&timeDuration=' + timeDuration)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ProductService.prototype.addProduct = function (product) {
        var _this = this;
        console.log("Product Added", product.description);
        return this.http.post(this.url + '/addProduct', product)
            .map(function (product) {
            console.log('Adding product');
            if (_this.fullProductList) {
                _this.fullProductList.push(product);
                //Sorting logic here 
                _this.fullProductList = _this.fullProductList.slice();
                return _this.fullProductList;
            }
        });
    };
    // TODO:  This is redudant, but need to do it cause i have two obejct for backend dto and product, i need to fix this.
    ProductService.prototype.editProduct = function (product) {
        var _this = this;
        console.log("Product Added", product.description);
        this.http.post(this.url + '/addProduct', product)
            .map(function (updatedProduct) {
            var index = _this.fullProductList.findIndex(function (product) {
                return product.productNo === updatedProduct.productNo;
            });
            if (index)
                _this.fullProductList[index] = updatedProduct;
            _this.fullProductList = _this.fullProductList.slice();
            return _this.fullProductList;
        });
    };
    ProductService.prototype.addProductInventory = function (productInventory) {
        console.log("Product Added", productInventory);
        return this.http.post(this.url + '/addProductInventory', productInventory);
    };
    ProductService.prototype.updateProductRetailPrice = function (product) {
        this.http.post(this.url + '/addProduct', product)
            .subscribe(function (data) {
            alert('ok');
            console.log(data);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    ProductService.prototype.updateProductInventory = function (productInventory) {
        return this.http.post(this.url + '/addProductInventory', productInventory);
    };
    ProductService.prototype.deleteProduct = function (deletedProduct) {
        this.http.put(this.url + '/deleteProduct', deletedProduct)
            .subscribe(function (data) {
            alert('deleted');
            console.log(data);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    ProductService.prototype.deleteProductInventory = function (deletedInvetory) {
        this.http.post(this.url + '/deleteProductInventory', deletedInvetory)
            .subscribe(function (data) {
            alert('deleted');
            console.log(data);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    ProductService.prototype.extractData = function (res) {
        var body = res.json();
        // console.log(body);
        return body || {};
    };
    ProductService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    ProductService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], ProductService);
    return ProductService;
}());



/***/ }),

/***/ "../../../../../src/app/product/vendor/vendor.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/product/vendor/vendor.component.html":
/***/ (function(module, exports) {

module.exports = "<p-growl [(value)]=\"msgs\"></p-growl>\n<mat-card>\n    <mat-card-title>\n        <h4>\n            Vendor Details\n        </h4>\n    </mat-card-title>\n    <mat-card-content>\n        <div class=\"row\">\n            <div class=\"col-md-6\"></div>\n            <div class=\"col-md-6 d-flex justify-content-end\">\n                <button type=\"button\" mat-raised-button class=\"bg-primary text-white action-button-lg\" (click)=\"showDialogToAdd()\">\n                                <i class=\"fa fa-plus-square\" aria-hidden=\"true\" label=\"Add\"></i>\n                                Add Vendor\n                            </button>\n            </div>\n        </div>\n\n        <div class=\"row\">\n            <div class=\"col-md-12 p-md-3\">\n                <!-- <p-header>Category Details</p-header> -->\n                <p-dataTable [value]=\"this.vendorDto\" scrollable=\"true\" scrollHeight=\"500px\" [responsive]=\"true\" [editable]=\"true\" (onEditComplete)=\"this.updateVendor($event)\">\n                    <p-column field=\"index\" header=\"Index\"></p-column>\n                    <p-column field=\"name\" [style]=\"{'width': '20%'}\" header=\"Vendor Name\" filterPlaceholder=\"Search For Vendor Name\" [filter]=\"true\" [editable]=\"true\"></p-column>\n                    <p-column field=\"phoneNo\" header=\"Vendor PhoneNo\" [sortable]=\"true\" [editable]=\"true\"></p-column>\n                    <p-column field=\"companyName\" header=\"Company Name\" [sortable]=\"true\" [editable]=\"true\"></p-column>\n                    <p-column field=\"companyAddress\" header=\"Company Address\" [sortable]=\"true\" [editable]=\"true\"></p-column>\n                    <p-column field=\"email\" header=\"Email\" [sortable]=\"true\" [editable]=\"true\"></p-column>\n                    <p-column field=\"noOfProduct\" header=\"No Of Prodcuts\" [sortable]=\"true\"></p-column>\n                    <p-column field=\"action\" header=\"Action\" [style]=\"{'width': '5%'}\">\n                        <ng-template let-vendor=\"rowData\" pTemplate=\"body\" class=\"m-auto\">\n                            <button class=\"btn-red action-button-table\" mat-button data-toggle=\"modal\" data-target=\"#deleteVendor\" (click)=\"this.setVendorForDelete(vendor)\">\n                                            <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                                        </button>\n                        </ng-template>\n                    </p-column>\n                </p-dataTable>\n\n            </div>\n\n            <form *ngIf=\"this.vendorForm != null\" [formGroup]=\"this.vendorForm\">\n                <p-dialog header=\"Add Vendor\" appendTo=\"body\" [(visible)]=\"displayDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\n                    <div class=\"ui-grid ui-grid-responsive ui-fluid\" *ngIf=\"vendor\">\n                        <div class=\"ui-grid-row\">\n                            <div class=\"ui-grid-col-4\">\n                                <label for=\"name\">Name:</label>\n                            </div>\n                            <div class=\"ui-grid-col-8\">\n                                <input class=\"form-control\" formControlName=\"name\" />\n                            </div>\n                        </div>\n                        <div class=\"ui-grid-row\">\n                            <div class=\"ui-grid-col-4\">\n                                <label for=\"description\">PhoneNo:</label>\n                            </div>\n                            <div class=\"ui-grid-col-8\">\n                                <input type=\"number\" class=\"form-control\" formControlName=\"phoneNo\" />\n                            </div>\n                        </div>\n                        <div class=\"ui-grid-row\">\n                            <div class=\"ui-grid-col-4\">\n                                <label for=\"description\">Company Name:</label>\n                            </div>\n                            <div class=\"ui-grid-col-8\">\n                                <input class=\"form-control\" formControlName=\"companyName\" />\n                            </div>\n                        </div>\n                        <div class=\"ui-grid-row\">\n                            <div class=\"ui-grid-col-4\">\n                                <label for=\"description\">Company Address:</label>\n                            </div>\n                            <div class=\"ui-grid-col-8\">\n                                <input class=\"form-control\" formControlName=\"companyAddress\" />\n                            </div>\n                        </div>\n                        <div class=\"ui-grid-row\">\n                            <div class=\"ui-grid-col-4\">\n                                <label for=\"description\">Email:</label>\n                            </div>\n                            <div class=\"ui-grid-col-8\">\n                                <input class=\"form-control\" formControlName=\"email\" />\n                            </div>\n                        </div>\n                    </div>\n                    <p-footer>\n                        <div style=\"text-align: center\">\n                            <button type=\"button\" class=\"btn btn-success\" (click)=\"this.addVendor()\" [disabled]=\"this.vendorForm.invalid\">\n                                            <i class=\"fa fa-paper-plane\" aria-hidden=\"true\" ></i>\n                                    Add Vendor\n                                </button>\n\n                        </div>\n                    </p-footer>\n                </p-dialog>\n            </form>\n        </div>\n    </mat-card-content>\n</mat-card>\n\n\n\n\n<!-- Start of Delete Vendor Popup -->\n<div class=\"modal fade\" id=\"deleteVendor\" role=\"dialog\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">Delete Vendor</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <p>Are You Sure You Want To Delete This Vendor</p>\n            </div>\n            <div class=\"modal-footer\">\n\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"this.deleteVendor()\">Yes</button>\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancle</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- End of Delete Brand Popup -->"

/***/ }),

/***/ "../../../../../src/app/product/vendor/vendor.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VendorComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_product_product_service__ = __webpack_require__("../../../../../src/app/product/product.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_product_vendor_vendor_service__ = __webpack_require__("../../../../../src/app/product/vendor/vendor.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var VendorComponent = /** @class */ (function () {
    function VendorComponent(vendorService, productService, formBuilder) {
        this.vendorService = vendorService;
        this.productService = productService;
        this.formBuilder = formBuilder;
        this.msgs = [];
        this.vendor = new PrimeVendor();
    }
    VendorComponent.prototype.ngOnInit = function () {
        this.vendorForm = this.formBuilder.group({
            'name': [null, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].required],
            'phoneNo': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern('^[0-9]+$')],
            'companyAddress': [''],
            'companyName': [''],
            'email': ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["Validators"].pattern('^[A-Za-z0-9.]+@[A-Za-z0-9.]+$')]
        });
        this.getVendorDetails();
    };
    VendorComponent.prototype.showSuccess = function (severity, summary, detail) {
        this.msgs = [];
        this.msgs.push({ severity: severity, summary: summary, detail: detail });
    };
    VendorComponent.prototype.getVendorDetails = function () {
        var _this = this;
        this.productService.getVendorDetails()
            .subscribe(function (vendors) {
            _this.vendorDto = vendors;
            console.log('VendorList' + _this.vendorDto);
        });
    };
    VendorComponent.prototype.save = function () {
        var newVendorDto = this.vendorDto.slice();
        if (this.newVendor) {
            newVendorDto.push(this.vendor);
            this.vendorService.addOrUpdateVendor(this.vendor);
            this.showSuccess('success', 'Insert', 'Vendor Added Successfully!!');
            this.getVendorDetails();
            this.displayDialog = false;
        }
        else {
            newVendorDto[this.findSelectedCarIndex()] = this.vendor;
            this.vendorDto = newVendorDto;
            this.vendorService.addOrUpdateVendor(this.vendor);
            this.vendor = null;
            this.getVendorDetails();
            this.showSuccess('success', 'Update', 'Vendor Updated Successfully!!');
            this.displayDialog = false;
        }
    };
    VendorComponent.prototype.addVendor = function () {
        var newVendor = this.vendorForm.value;
        this.vendorService.addOrUpdateVendor(this.vendorForm.value);
        this.vendorDto.push(newVendor);
        this.vendorDto = this.vendorDto.slice();
        this.displayDialog = false;
    };
    VendorComponent.prototype.updateVendor = function (event) {
        this.vendorService.addOrUpdateVendor(event.data);
    };
    VendorComponent.prototype.setVendorForDelete = function (vendor) {
        this.selectedVendorForDelete = vendor;
    };
    VendorComponent.prototype.deleteVendor = function () {
        var _this = this;
        var index = this.vendorDto.findIndex(function (el) { return el.name == _this.selectedVendorForDelete.name; });
        this.vendorDto = this.vendorDto.splice(0, index).concat(this.vendorDto.splice(index));
        this.vendorService.deleteVendor(this.selectedVendorForDelete.vendorId);
    };
    VendorComponent.prototype.showDialogToAdd = function () {
        this.newVendor = true;
        this.vendor = new PrimeVendor();
        this.displayDialog = true;
    };
    VendorComponent.prototype.onRowSelect = function (event) {
        this.newVendor = false;
        this.vendor = this.cloneCar(event.data);
        console.log(event.data);
        console.log(this.selectedVendor);
        this.displayDialog = true;
    };
    //Why??
    VendorComponent.prototype.cloneCar = function (c) {
        var vendor = new PrimeVendor();
        for (var prop in c) {
            vendor[prop] = c[prop];
        }
        return vendor;
    };
    VendorComponent.prototype.findSelectedCarIndex = function () {
        return this.vendorDto.indexOf(this.selectedVendor);
    };
    VendorComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-vendor',
            template: __webpack_require__("../../../../../src/app/product/vendor/vendor.component.html"),
            styles: [__webpack_require__("../../../../../src/app/product/vendor/vendor.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_app_product_vendor_vendor_service__["a" /* VendorService */], __WEBPACK_IMPORTED_MODULE_1_app_product_product_service__["a" /* ProductService */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"]])
    ], VendorComponent);
    return VendorComponent;
}());

var PrimeVendor = /** @class */ (function () {
    function PrimeVendor(name, description) {
        this.name = name;
        this.description = description;
    }
    return PrimeVendor;
}());


/***/ }),

/***/ "../../../../../src/app/product/vendor/vendor.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VendorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var VendorService = /** @class */ (function () {
    function VendorService(http) {
        this.http = http;
    }
    VendorService.prototype.addOrUpdateVendor = function (vendor) {
        console.log("Category Added" + vendor.name);
        this.http.post('http://localhost:8080/addVendor', vendor)
            .subscribe(function (data) {
            alert('Vendor Updated !!');
            console.log(data);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    VendorService.prototype.deleteVendor = function (vendorId) {
        this.http.delete('http://localhost:8080/deleteVendor?vendorId=' + vendorId)
            .subscribe(function (data) {
            alert('Vendor Deleted !!');
            console.log(data);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    VendorService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], VendorService);
    return VendorService;
}());



/***/ }),

/***/ "../../../../../src/app/promotion/email/email.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  email works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/promotion/email/email.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/promotion/email/email.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmailComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EmailComponent = /** @class */ (function () {
    function EmailComponent() {
    }
    EmailComponent.prototype.ngOnInit = function () {
    };
    EmailComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-email',
            template: __webpack_require__("../../../../../src/app/promotion/email/email.component.html"),
            styles: [__webpack_require__("../../../../../src/app/promotion/email/email.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], EmailComponent);
    return EmailComponent;
}());



/***/ }),

/***/ "../../../../../src/app/promotion/facebook/facebook.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  facebook works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/promotion/facebook/facebook.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/promotion/facebook/facebook.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacebookComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FacebookComponent = /** @class */ (function () {
    function FacebookComponent() {
    }
    FacebookComponent.prototype.ngOnInit = function () {
    };
    FacebookComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-facebook',
            template: __webpack_require__("../../../../../src/app/promotion/facebook/facebook.component.html"),
            styles: [__webpack_require__("../../../../../src/app/promotion/facebook/facebook.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FacebookComponent);
    return FacebookComponent;
}());



/***/ }),

/***/ "../../../../../src/app/promotion/promotion-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PromotionRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_promotion_promotion_component__ = __webpack_require__("../../../../../src/app/promotion/promotion.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_auth_auth_guard__ = __webpack_require__("../../../../../src/app/auth/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_promotion_sms_sms_component__ = __webpack_require__("../../../../../src/app/promotion/sms/sms.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_promotion_email_email_component__ = __webpack_require__("../../../../../src/app/promotion/email/email.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_promotion_facebook_facebook_component__ = __webpack_require__("../../../../../src/app/promotion/facebook/facebook.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var routes = [
    {
        path: 'promotion',
        component: __WEBPACK_IMPORTED_MODULE_2_app_promotion_promotion_component__["a" /* PromotionComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_3_app_auth_auth_guard__["a" /* AuthGuard */]],
        children: [
            { path: '', redirectTo: 'sms', pathMatch: 'prefix' },
            { path: 'sms', component: __WEBPACK_IMPORTED_MODULE_4_app_promotion_sms_sms_component__["a" /* SmsComponent */] },
            { path: 'email', component: __WEBPACK_IMPORTED_MODULE_5_app_promotion_email_email_component__["a" /* EmailComponent */] },
            { path: 'facebook', component: __WEBPACK_IMPORTED_MODULE_6_app_promotion_facebook_facebook_component__["a" /* FacebookComponent */] }
        ]
    }
];
var PromotionRoutingModule = /** @class */ (function () {
    function PromotionRoutingModule() {
    }
    PromotionRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
        })
    ], PromotionRoutingModule);
    return PromotionRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/promotion/promotion.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n    <app-top-sub-navbar [menu]=\"this.items\"></app-top-sub-navbar>\n    <router-outlet></router-outlet>\n</p>"

/***/ }),

/***/ "../../../../../src/app/promotion/promotion.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/promotion/promotion.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PromotionComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var PromotionComponent = /** @class */ (function () {
    function PromotionComponent(router) {
        this.router = router;
    }
    PromotionComponent.prototype.ngOnInit = function () {
        this.items = [
            { name: 'Message', icon: 'fa fa-commenting-o fa-x', link: '/promotion/sms' },
            { name: 'Email', icon: 'fa fa-envelope-o fa-x', link: '/promotion/email' },
            { name: 'Facebook', icon: 'fa fa-facebook fa-x', link: '/promotion/facebook' }
        ];
    };
    PromotionComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-promotion',
            template: __webpack_require__("../../../../../src/app/promotion/promotion.component.html"),
            styles: [__webpack_require__("../../../../../src/app/promotion/promotion.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]])
    ], PromotionComponent);
    return PromotionComponent;
}());



/***/ }),

/***/ "../../../../../src/app/promotion/promotion.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PromotionModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_promotion_promotion_routing_module__ = __webpack_require__("../../../../../src/app/promotion/promotion-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_promotion_promotion_component__ = __webpack_require__("../../../../../src/app/promotion/promotion.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_promotion_sms_sms_component__ = __webpack_require__("../../../../../src/app/promotion/sms/sms.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_promotion_email_email_component__ = __webpack_require__("../../../../../src/app/promotion/email/email.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_promotion_facebook_facebook_component__ = __webpack_require__("../../../../../src/app/promotion/facebook/facebook.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



 // <-- NgModel lives here







var PromotionModule = /** @class */ (function () {
    function PromotionModule() {
    }
    PromotionModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_5_app_promotion_promotion_routing_module__["a" /* PromotionRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__["AutoCompleteModule"],
                __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__["DropdownModule"],
                __WEBPACK_IMPORTED_MODULE_4_app_shared_shared_module__["a" /* SharedModule */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6_app_promotion_promotion_component__["a" /* PromotionComponent */],
                __WEBPACK_IMPORTED_MODULE_7_app_promotion_sms_sms_component__["a" /* SmsComponent */],
                __WEBPACK_IMPORTED_MODULE_8_app_promotion_email_email_component__["a" /* EmailComponent */],
                __WEBPACK_IMPORTED_MODULE_9_app_promotion_facebook_facebook_component__["a" /* FacebookComponent */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6_app_promotion_promotion_component__["a" /* PromotionComponent */]]
        })
    ], PromotionModule);
    return PromotionModule;
}());



/***/ }),

/***/ "../../../../../src/app/promotion/sms/sms.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  sms works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/promotion/sms/sms.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/promotion/sms/sms.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SmsComponent = /** @class */ (function () {
    function SmsComponent() {
    }
    SmsComponent.prototype.ngOnInit = function () {
    };
    SmsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sms',
            template: __webpack_require__("../../../../../src/app/promotion/sms/sms.component.html"),
            styles: [__webpack_require__("../../../../../src/app/promotion/sms/sms.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], SmsComponent);
    return SmsComponent;
}());



/***/ }),

/***/ "../../../../../src/app/purchase-order/purchase-order-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PurchaseOrderRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_auth_auth_guard__ = __webpack_require__("../../../../../src/app/auth/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_purchase_order_purchase_order_component__ = __webpack_require__("../../../../../src/app/purchase-order/purchase-order.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var routes = [
    {
        path: 'purchase-order',
        component: __WEBPACK_IMPORTED_MODULE_3_app_purchase_order_purchase_order_component__["a" /* PurchaseOrderComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_2_app_auth_auth_guard__["a" /* AuthGuard */]]
    },
];
var PurchaseOrderRoutingModule = /** @class */ (function () {
    function PurchaseOrderRoutingModule() {
    }
    PurchaseOrderRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
        })
    ], PurchaseOrderRoutingModule);
    return PurchaseOrderRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/purchase-order/purchase-order.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-title>\n        Purchase Order\n    </mat-card-title>\n    <mat-card-content>\n        <div class=\"row\">\n            <div class=\"col-md-5\">\n                <select class=\"form-control form-control-lg\" [(ngModel)]=\"this.selectedVendor\" (change)=\"this.onVendorChoose()\">\n                                    <option>Please Select Vendor</option>\n                                 <option *ngFor=\"let vendor of this.vendorDto\">\n                                     {{vendor.name}}\n                                 </option>\n                                </select>\n            </div>\n            <div class=\"col-md-4\">\n\n                <p-autoComplete id=\"productsearch\" [(ngModel)]=\"p\" class=\"full-width m-1\" [suggestions]=\"product\" placeholder=\"Scan or Search Product\" (completeMethod)=\"filterProducts($event)\" name=\"test\" [minLength]=\"3\" (keyup.enter)=\"submitProduct(p)\" field=\"description\">\n                </p-autoComplete>\n                <!-- <span style=\"margin-left:10px\"></span> -->\n\n                <!-- <button type=\"button \" (click)=\"this.test(10)\" class=\"btn btn-success \">Add Product</button> -->\n            </div>\n            <div class=\"col-md-3\">\n                <button class=\"bg btn-green text-white m-3 action-button-lg\" mat-raised-button (click)=\"this.openProductLookUpModel()\">\n                        <i class=\"fa fa-search\" aria-hidden=\"true\"></i>\n                            Product look up\n                </button>\n            </div>\n\n        </div>\n\n        <div class=\"row\">\n            <!-- Product Table -->\n            <p-dataTable [value]=\"this.productInventotyList\" scrollable=\"true\" [responsive]=\"true\" scrollHeight=\"300px\" [editable]=\"true\" (onEditComplete)=\"updateInventoryDetails($event)\">\n                <p-header>Add Purchase Order Details</p-header>\n\n                <p-column field=\"productNo\" header=\"ProductNo\" [style]=\"{'width':'15%','text-align':'center', 'overflow':'visible'}\"></p-column>\n                <p-column field=\"description\" header=\"Description\" [style]=\"{'width':'50%','text-align':'center', 'overflow':'visible'}\"></p-column>\n                <p-column field=\"defaultQuantity\" header=\"Quantity\" [editable]=\"true\"></p-column>\n                <p-column field=\"cost\" header=\"Cost\" [editable]=\"true\"></p-column>\n                <p-column field=\"retail\" header=\"Retail\" [editable]=\"true\"></p-column>\n                <p-column field=\"quantity\" header=\"In-Stock\"></p-column>\n                <p-column field=\"totalProductPrice\" header=\"Total\"></p-column>\n                <p-column header=\"\" styleClass=\"col-button\" [style]=\"{'width':'3%','text-align':'center', 'overflow':'visible'}\">\n                    <!-- <ng-template pTemplate=\"header\">\n                                        <button type=\"button\" pButton icon=\"fa-refresh\"></button>\n                                    </ng-template> -->\n                    <ng-template let-product=\"rowData\" pTemplate=\"body\">\n\n                        <button mat-button class=\"btn-red action-button-table\" mat-button (click)=\"this.setProductForDelete(product)\" data-toggle=\"modal\" data-target=\"#removeProductInventory\">\n                                    <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                                </button>\n                    </ng-template>\n                </p-column>\n\n\n            </p-dataTable>\n        </div>\n    </mat-card-content>\n\n    <mat-card-footer class=\"d-flex justify-content-md-center\">\n\n        <button class=\"bg-danger text-white m-3 action-button-lg\" mat-raised-button data-toggle=\"modal\" data-target=\"#removeProductInventory\" (click)=\"this.setHeaderForRemoveAllInventoryProduct()\">\n                        <i class=\"fa fa-trash\">\n                            Discard Order\n                        </i>\n                    </button>\n\n        <button class=\"bg btn-green text-white m-3 action-button-lg\" mat-raised-button data-toggle=\"modal\" data-target=\"#removeProductInventory\" (click)=\"this.setHeaderForAddProductInventory()\"> \n                            <i class=\"fa fa-paper-plane\" aria-hidden=\"true\" >\n                                    Add Order\n                            </i>\n                         \n                    </button>\n    </mat-card-footer>\n</mat-card>\n\n\n\n\n<!-- Start of Product and Sale discard Pop up -->\n\n<div class=\"modal fade\" id=\"removeProductInventory\" role=\"dialog\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">{{this.popupHeader}}</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <p>{{this.popupMessage}}</p>\n            </div>\n            <div class=\"modal-footer\">\n\n                <!-- This logic to reuse the model code cause i need popup for delete single product and also delete complete sale -->\n                <button *ngIf=\"this.popupHeader == 'Remove Product Inventory' \" type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"this.deleteProduct()\">Yes</button>\n                <button *ngIf=\"this.popupHeader == 'Remove All Products Inventory'\" type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"this.removeAllProductInventory()\">Yes</button>\n\n                <button *ngIf=\"this.popupHeader == 'Add All Product Inventory' \" type=\"button\" class=\"btn btn-success\" data-dismiss=\"modal\" (click)=\"this.addProductInventoryToBackEnd()\">Yes</button>\n\n                <!-- TODO Add one more button for add product if it does not exists -->\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancle</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- End of Product and Sale discard Pop up -->\n\n<p-dialog header=\"Product Details\" appendTo=\"body\" [(visible)]=\"displayDialog\" [responsive]=\"true\" showEffect=\"fade\" [modal]=\"true\">\n\n    <div class=\"container\">\n\n        <div class=\"row\">\n\n            <table class=\"table table-striped\">\n                <thead>\n                    <tr>\n                        <th>Product No</th>\n                        <th>Description</th>\n                        <th>Cost</th>\n                        <th>Retail</th>\n                        <th>Stock</th>\n                        <th>Order Quantity</th>\n                        <th>History</th>\n\n                    </tr>\n                </thead>\n                <tbody>\n                    <tr *ngFor=\"let product of this.filteredProductByVendor\">\n                        <td>{{product.productNo}}</td>\n                        <td>{{product.description}}</td>\n                        <td>{{product.cost}}</td>\n                        <td>{{product.retail}}</td>\n                        <td [ngStyle]=\"{'backgroundColor': (product.quantity >= 0)?'':'red'}\">{{product.quantity}}</td>\n                        <td>\n                            <input type=\"number\" (keyup.enter)=\"this.addProdutForPurchaseOrder($event, product)\">\n                        </td>\n                        <td>\n                            <button mat-button class=\"btn-green action-button-table\" mat-button (click)=\"this.setProductForHistory(product)\" data-toggle=\"modal\" data-target=\"#productHistoryModel\">\n                                <i class=\"fa fa-history\" aria-hidden=\"true\"></i>\n                            </button>\n                        </td>\n\n                    </tr>\n                </tbody>\n            </table>\n\n        </div>\n    </div>\n\n    <p-footer>\n        <div style=\"text-align: center\">\n\n        </div>\n    </p-footer>\n\n\n</p-dialog>"

/***/ }),

/***/ "../../../../../src/app/purchase-order/purchase-order.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/purchase-order/purchase-order.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PurchaseOrderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_product_product_service__ = __webpack_require__("../../../../../src/app/product/product.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_product_product_component__ = __webpack_require__("../../../../../src/app/product/product.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_sell_sell_service__ = __webpack_require__("../../../../../src/app/sell/sell.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_shared_services_persistence_service__ = __webpack_require__("../../../../../src/app/shared/services/persistence.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_toastr__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var PurchaseOrderComponent = /** @class */ (function () {
    function PurchaseOrderComponent(saleService, productService, persit, toastr) {
        this.saleService = saleService;
        this.productService = productService;
        this.persit = persit;
        this.toastr = toastr;
        this.productInventoryObject = new __WEBPACK_IMPORTED_MODULE_2_app_product_product_component__["b" /* ProductInventory */]();
        this.vendorDto = [];
        this.filteredProductByVendor = [];
        this.displayDialog = false;
    }
    PurchaseOrderComponent.prototype.ngOnInit = function () {
        this.getProductDetails();
        this.getVendorDetails();
        this.productInventotyList = this.persit.getProductInventoryForAdd() || [];
    };
    PurchaseOrderComponent.prototype.getProductDetails = function () {
        var _this = this;
        this.saleService.getProductDetails()
            .subscribe(function (pro) {
            _this.productDto = pro;
            _this.filteredProductByVendor = _this.productDto;
            console.log('ProductList' + _this.productDto);
        });
    };
    PurchaseOrderComponent.prototype.getVendorDetails = function () {
        var _this = this;
        this.productService.getVendorDetails()
            .subscribe(function (vendors) {
            _this.vendorDto = vendors;
            // this.form.get('vendor').setValue(this.vendorDto[0]);
        });
    };
    // TODO NEED TO make it common so i can use other places too.
    PurchaseOrderComponent.prototype.filterProducts = function (event) {
        var _this = this;
        var query = event.query;
        this.saleService.getProductDetails()
            .subscribe(function (products) {
            // console.log(products);
            _this.product = _this.filterProduct(query, products);
        });
    };
    PurchaseOrderComponent.prototype.filterProduct = function (query, products) {
        var filtered = [];
        for (var i = 0; i < products.length; i++) {
            var p = products[i];
            if (p.description.toLowerCase().includes(query.toLowerCase())) {
                filtered.push(p);
            }
        }
        return filtered;
    };
    // This method helps when user try to change retial price or quanity from the sell text box.
    PurchaseOrderComponent.prototype.submitProduct = function (value) {
        console.log('This is value: ', value);
        if (typeof value === 'string') {
            console.log('This is value: ', value);
            // this is the senario where user is adding new product to Add into Inventory
            if (this.product != null && this.product.length > 0) {
                console.log("coming here");
                this.addProductInventory(this.product[0]);
            }
            else if (value !== '' && value !== undefined && value.indexOf('.') !== 0) {
                if (value.match(/[a-z]/i))
                    console.log('contains only charcters');
                // this mean this is decimal value so it will change the retail price of the product
                if (value.match(/[0-9]/i) && value.indexOf('.') > 0)
                    this.updateCostPrice(value);
                else if (value.match(/[0-9]/i))
                    this.updateProductQuantityToAddInventory(value);
            }
        }
        else if (value != null) {
            this.addProductInventory(value);
        }
    };
    PurchaseOrderComponent.prototype.addProductInventory = function (productObj) {
        // This mean user is adding first product into grid.
        // if(this.productInventotyList.length == 0) {
        this.productInventotyList = this.productInventotyList.slice();
        this.productInventoryObject = new __WEBPACK_IMPORTED_MODULE_2_app_product_product_component__["b" /* ProductInventory */]();
        this.productInventoryObject.productNo = productObj.productNo;
        this.productInventoryObject.description = productObj.description;
        this.productInventoryObject.cost = productObj.cost;
        this.productInventoryObject.retail = productObj.retail;
        this.productInventoryObject.quantity = productObj.quantity;
        this.productInventoryObject.markup = 0.00;
        this.productInventotyList.push(this.productInventoryObject);
        this.persit.setProductInventoryForAdd(this.productInventotyList);
        this.product = null;
        this.p = null;
        // }
        return this.productInventotyList;
    };
    PurchaseOrderComponent.prototype.openProductLookUpModel = function () {
        this.displayDialog = !this.displayDialog;
    };
    PurchaseOrderComponent.prototype.addProdutForPurchaseOrder = function (event, product) {
        product.quantity = event.target.value;
        this.addProductInventory(product);
        console.log('purchase order Product No', event.target.value);
        console.log('purchase order quantity', event);
    };
    // I HAVE KEEP IT CASUE MAY BE I NEED TO HANDLE THIS LOGIC WHEN EVER USER ADD SAME PRODCUT INTO TABLE.
    // else {
    // Checking weather user is adding same product agian or not if its true
    //  then just update the quantity of that product by 1.
    // for (let lineItem of this.transactionLineItemDaoList) {
    //   if (productObj.productNo === lineItem.productNo) {
    //     // This flag helps to determin whether to add new product or just update the quantity
    //     this.isProductExistsInSellList = true;
    //     lineItem.defaultQuantity = + lineItem.defaultQuantity + 1;
    //     this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
    //     productObj.totalProductPrice = parseFloat((productObj.retail * lineItem.defaultQuantity).toFixed(2));
    //     productObj.taxAmountOnProduct = (productObj.retail * 7) / 100;
    //     console.log("when add product", productObj);
    //     this.product = null;
    //     this.p = null
    //     console.log(this.transactionLineItemDaoList);
    //     this.setTransactionDtoList(this.transactionLineItemDaoList)
    //     this.persit.setProducts(this.transactionLineItemDaoList);
    //     break;
    //   }
    //   else {
    //     // This flag helps to determin whether to add new product or just update the quantity
    //     this.isProductExistsInSellList = false;
    //   }
    // }
    // This flag helps to determin whether to add new product or just update the quantity
    // else (!this.isProductExistsInSellList) {
    //   this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
    //   productObj.totalProductPrice = productObj.retail * productObj.defaultQuantity;
    //   productObj.taxAmountOnProduct = parseFloat(((productObj.retail * 7) / 100).toFixed(2));
    //   console.log("when add product", productObj);
    //   this.transactionLineItemDaoList.push(productObj);
    //   this.product = null;
    //   this.p = null
    //   console.log(this.transactionLineItemDaoList);
    //   this.setTransactionDtoList(this.transactionLineItemDaoList)
    //   this.persit.setProducts(this.transactionLineItemDaoList);
    // }
    PurchaseOrderComponent.prototype.updateCostPrice = function (value) {
        console.log('Price change');
        this.productInventotyList[this.productInventotyList.length - 1].cost = value;
        // this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = (this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity);
        this.productInventotyList = this.productInventotyList.slice();
        //this.setTransactionDtoList(this.transactionLineItemDaoList)
        this.persit.setProductInventoryForAdd(this.productInventotyList);
        this.p = null;
    };
    PurchaseOrderComponent.prototype.updateProductQuantityToAddInventory = function (value) {
        console.log('Quantity change');
        this.productInventotyList[this.productInventotyList.length - 1].quantity = value;
        // this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = parseFloat((this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity).toFixed(2));
        this.productInventotyList = this.productInventotyList.slice();
        // this.setTransactionDtoList(this.transactionLineItemDaoList)
        this.persit.setProductInventoryForAdd(this.productInventotyList);
        this.p = null;
    };
    PurchaseOrderComponent.prototype.updateInventoryDetails = function (event) {
        this.productInventotyList[event.index].quantity = event.data.quantity;
        this.productInventotyList[event.index].cost = event.data.cost;
        // this.transactionLineItemDaoList[event.index].totalProductPrice = (event.data.defaultQuantity * event.data.retail);
        // this.transactionLineItemDaoList[event.index].taxAmountOnProduct = ((event.data.defaultQuantity * event.data.retail) * 7) / 100
        // this.setTransactionDtoList(this.transactionLineItemDaoList)
        this.persit.setProductInventoryForAdd(this.productInventotyList);
    };
    PurchaseOrderComponent.prototype.setProductForDelete = function (product) {
        this.selectedProduct = product;
        this.popupHeader = 'Remove Product Inventory';
        this.popupMessage = 'Are You Sure Remove Product Inventory ?';
    };
    PurchaseOrderComponent.prototype.deleteProduct = function () {
        console.log("inside delete");
        var index = this.productInventotyList.indexOf(this.selectedProduct, 0);
        console.log("index", index);
        if (index > -1) {
            this.productInventotyList.splice(index, 1);
            this.productInventotyList = this.productInventotyList.slice();
            this.persit.setProductInventoryForAdd(this.productInventotyList);
        }
    };
    PurchaseOrderComponent.prototype.setHeaderForRemoveAllInventoryProduct = function () {
        this.popupHeader = 'Remove All Products Inventory';
        this.popupMessage = 'Are Sure You Want To Remove All Product Inventory ?';
    };
    PurchaseOrderComponent.prototype.removeAllProductInventory = function () {
        this.persit.clearProductInventory();
        this.productInventotyList = [];
    };
    // TO DO NEED TO FIGURE OUT FILTERTING HERE
    PurchaseOrderComponent.prototype.onVendorChoose = function () {
        this.productDto.filter(function (product) {
            // return product.vendorId = thi
        });
    };
    PurchaseOrderComponent.prototype.setHeaderForAddProductInventory = function () {
        this.popupHeader = 'Add All Product Inventory';
        this.popupMessage = 'This Will Add All Products Into Inventory';
    };
    PurchaseOrderComponent.prototype.addProductInventoryToBackEnd = function () {
        var _this = this;
        this.productInventotyList.forEach(function (inventory) {
            inventory.createdTimestamp = __WEBPACK_IMPORTED_MODULE_5_moment__(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        });
        this.productService.addProductInventory(this.productInventotyList)
            .subscribe(function (data) {
            if (data) {
                _this.toastr.success('Inventory Added Successfully !!', 'Success!');
            }
        }, function (error) {
            _this.toastr.error('Opps Something goes wrong !!', 'Error!!');
            console.log(JSON.stringify(error.json()));
        });
    };
    PurchaseOrderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-purchase-order',
            template: __webpack_require__("../../../../../src/app/purchase-order/purchase-order.component.html"),
            styles: [__webpack_require__("../../../../../src/app/purchase-order/purchase-order.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_app_sell_sell_service__["a" /* SellService */], __WEBPACK_IMPORTED_MODULE_1_app_product_product_service__["a" /* ProductService */], __WEBPACK_IMPORTED_MODULE_4_app_shared_services_persistence_service__["a" /* PersistenceService */], __WEBPACK_IMPORTED_MODULE_6_ng2_toastr__["ToastsManager"]])
    ], PurchaseOrderComponent);
    return PurchaseOrderComponent;
}());



/***/ }),

/***/ "../../../../../src/app/purchase-order/purchase-order.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PurchaseOrderModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__purchase_order_component__ = __webpack_require__("../../../../../src/app/purchase-order/purchase-order.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_purchase_order_purchase_order_routing_module__ = __webpack_require__("../../../../../src/app/purchase-order/purchase-order-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_primeng_primeng__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var PurchaseOrderModule = /** @class */ (function () {
    function PurchaseOrderModule() {
    }
    PurchaseOrderModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_3_app_purchase_order_purchase_order_routing_module__["a" /* PurchaseOrderRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_4_app_shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["DataTableModule"],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["AutoCompleteModule"],
                __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["DropdownModule"],
                __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["DialogModule"]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_2__purchase_order_component__["a" /* PurchaseOrderComponent */]]
        })
    ], PurchaseOrderModule);
    return PurchaseOrderModule;
}());



/***/ }),

/***/ "../../../../../src/app/report/inventory/inventory.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-title>\n        <h4>Inventory Reports</h4>\n    </mat-card-title>\n\n    <mat-card-content>\n\n        <div class=\"row d-flex align-items-center\">\n\n            <!-- DO NOT DELETE THIS CAUSE I NEED TO USE IT FOR TWO DIFFERENT REPORT -->\n\n            <!-- <div class=\"col-md-2\">\n\n                <select class=\"form-control\">\n                    <option>Inventory Report</option>\n                    <option>Low Stock Inventory Report</option>\n                </select>\n            </div> -->\n\n            <div class=\"col-md-2\">\n\n                <select class=\"form-control\" [(ngModel)]=\"this.inventoryDropdown\" (change)=\"getInventoryReport(this.inventoryDropdown)\">\n                    <option>Category</option>\n                    <option>Vendor</option>\n                    <option>Brand</option>\n                    <option>Model</option>\n                </select>\n            </div>\n\n\n            <div class=\"col-md-2\">\n                <button matIcon (click)=\"this.printInventoryReportBy(this.inventoryDropdown.toLowerCase())\">\n                    <i class=\"fa fa-print fa-3x\" aria-hidden=\"true\"></i>\n                </button>\n            </div>\n\n        </div>\n\n        <div class=\"row\" *ngIf=\"this.pieChartData\" style=\"height: 250px\">\n            <ngx-charts-advanced-pie-chart class=\"\" [scheme]=\"colorScheme\" [results]=\"pieChartData\" [view]=\"null\" (select)=\"onSelect($event)\">\n            </ngx-charts-advanced-pie-chart>\n        </div>\n\n        <div class=\"row d-flex align-items-center\">\n            <div class=\"col-md-12 p-md-3\">\n                <p-dataTable [value]=\"this.inventoryDto\" scrollable=\"true\" [responsive]=\"true\" scrollHeight=\"500px\">\n                    <p-column field=\"name\" header=\"Name\" [style]=\"{'height': '46px', 'width': '25%', 'text-align': 'left'}\"></p-column>\n                    <p-column field=\"cost\" header=\"Total Cost\" [sortable]=\"true\">\n                        <ng-template let-inventory=\"rowData\" pTemplate=\"body\">\n                            {{inventory.cost | currency:'USD':'true'}}\n                        </ng-template>\n                    </p-column>\n                    <p-column field=\"retail\" header=\"Total Retail\" [sortable]=\"true\">\n                        <ng-template let-inventory=\"rowData\" pTemplate=\"body\">\n                            {{inventory.retail | currency:'USD':'true'}}\n                        </ng-template>\n                    </p-column>\n                    <p-column field=\"markup\" header=\"Total Markup %\" [sortable]=\"true\"></p-column>\n                    <p-column field=\"quantity\" header=\"Total Quantity\" [sortable]=\"true\"></p-column>\n                </p-dataTable>\n\n            </div>\n        </div>\n\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "../../../../../src/app/report/inventory/inventory.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/report/inventory/inventory.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InventoryComponent; });
/* unused harmony export InventoryDto */
/* unused harmony export ChartDto */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_report_report_service__ = __webpack_require__("../../../../../src/app/report/report.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_shared_services_util_service__ = __webpack_require__("../../../../../src/app/shared/services/util.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import * as printJS from "print-js"; 
// declare var printJS: any; 
var InventoryComponent = /** @class */ (function () {
    function InventoryComponent(reportService) {
        this.reportService = reportService;
        this.inventoryDto = [];
        this.inventoryDropdown = 'Category';
        this.chartDto = new ChartDto();
        // options
        this.showLegend = true;
        this.colorScheme = {
            domain: ['#337ab7', '#28a745', '#ff6666', '#fd7e14', '#495057', '#A059B5', '#56BAD6']
        };
        // pie
        this.showLabels = true;
        this.explodeSlices = false;
        this.doughnut = false;
    }
    InventoryComponent.prototype.onSelect = function (event) {
        console.log(event);
    };
    InventoryComponent.prototype.ngOnInit = function () {
        this.getInventoryReport(this.inventoryDropdown);
        // this.printInventoryReportBy('category');
    };
    InventoryComponent.prototype.getInventoryReport = function (inventoryReportBy) {
        var _this = this;
        this.reportService.getInventoryDetails(inventoryReportBy)
            .subscribe(function (inventory) {
            _this.inventoryDto = inventory;
            _this.getPieChartDetails();
        });
    };
    InventoryComponent.prototype.getPieChartDetails = function () {
        var _this = this;
        console.log('inventoryDto', this.inventoryDto);
        this.pieChartData = null;
        this.pieChartData = [];
        this.inventoryDto.forEach(function (inventory) {
            _this.pieChartData.push({
                name: inventory.name,
                value: inventory.quantity
            });
        });
    };
    InventoryComponent.prototype.printInventoryReportBy = function (inventoryReportBy) {
        this.reportService.printInventoryReportPDF({ inventoryReportBy: inventoryReportBy })
            .subscribe(function (data) {
            Object(__WEBPACK_IMPORTED_MODULE_2_app_shared_services_util_service__["b" /* printBlob */])(data._body);
        });
    };
    InventoryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-inventory',
            template: __webpack_require__("../../../../../src/app/report/inventory/inventory.component.html"),
            styles: [__webpack_require__("../../../../../src/app/report/inventory/inventory.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_report_report_service__["a" /* ReportService */]])
    ], InventoryComponent);
    return InventoryComponent;
}());

var InventoryDto = /** @class */ (function () {
    function InventoryDto() {
    }
    return InventoryDto;
}());

var ChartDto = /** @class */ (function () {
    function ChartDto() {
    }
    return ChartDto;
}());



/***/ }),

/***/ "../../../../../src/app/report/profit-loss/profit-loss.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-title>\n        <h4>Profit And Loss Reports</h4>\n    </mat-card-title>\n\n    <mat-card-content>\n\n        <div class=\"row d-flex align-items-center\">\n            <div class=\"col-md-2\">\n                <select class=\"form-control\">\n                  <option>Today</option>\n                  <option>Yesterday</option>\n                  <option>This Week</option>\n                  <option>Last Week</option>\n                  <option>This Month</option>\n                  <option>Last Month</option>\n                  <option>Last 3 Months</option>\n                  <option>Last 6 Months</option>\n                  <option>This Year</option>\n                  <option>Last Year</option>\n                  <option>Custom</option>\n                </select>\n\n            </div>\n        </div>\n    </mat-card-content>"

/***/ }),

/***/ "../../../../../src/app/report/profit-loss/profit-loss.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/report/profit-loss/profit-loss.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfitLossComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProfitLossComponent = /** @class */ (function () {
    function ProfitLossComponent() {
    }
    ProfitLossComponent.prototype.ngOnInit = function () {
    };
    ProfitLossComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profit-loss',
            template: __webpack_require__("../../../../../src/app/report/profit-loss/profit-loss.component.html"),
            styles: [__webpack_require__("../../../../../src/app/report/profit-loss/profit-loss.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ProfitLossComponent);
    return ProfitLossComponent;
}());



/***/ }),

/***/ "../../../../../src/app/report/report-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_report_report_component__ = __webpack_require__("../../../../../src/app/report/report.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_report_inventory_inventory_component__ = __webpack_require__("../../../../../src/app/report/inventory/inventory.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_report_sales_sales_component__ = __webpack_require__("../../../../../src/app/report/sales/sales.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_report_profit_loss_profit_loss_component__ = __webpack_require__("../../../../../src/app/report/profit-loss/profit-loss.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var routes = [
    {
        path: 'report',
        component: __WEBPACK_IMPORTED_MODULE_2_app_report_report_component__["a" /* ReportComponent */],
        children: [
            { path: 'inventory', component: __WEBPACK_IMPORTED_MODULE_3_app_report_inventory_inventory_component__["a" /* InventoryComponent */] },
            { path: 'sales', component: __WEBPACK_IMPORTED_MODULE_4_app_report_sales_sales_component__["a" /* SalesComponent */] },
            { path: 'profit-loss', component: __WEBPACK_IMPORTED_MODULE_5_app_report_profit_loss_profit_loss_component__["a" /* ProfitLossComponent */] }
        ]
    },
];
var ReportRoutingModule = /** @class */ (function () {
    function ReportRoutingModule() {
    }
    ReportRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
        })
    ], ReportRoutingModule);
    return ReportRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/report/report.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/report/report.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n    <app-top-sub-navbar [menu]=\"this.items\"></app-top-sub-navbar>\n    <router-outlet></router-outlet>\n</p>"

/***/ }),

/***/ "../../../../../src/app/report/report.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ReportComponent = /** @class */ (function () {
    function ReportComponent(router) {
        this.router = router;
    }
    ReportComponent.prototype.ngOnInit = function () {
        if (this.router.url == "/report")
            this.router.navigate(['/report/inventory']);
        this.items = [
            { name: 'Inventory', icon: 'fa fa-tags fa-x', link: '/report/inventory' },
            { name: 'Sales', icon: 'fa fa-line-chart fa-x', link: '/report/sales' },
            { name: 'Profit & Loss', icon: 'fa fa-pie-chart fa-x', link: '/report/profit-loss' },
            { name: 'Expense', icon: 'fa fa-money fa-x', link: '' },
            { name: 'Register', icon: 'fa fa-window-close-o fa-x', link: '' },
            { name: 'Customer', icon: 'fa fa-user fa-x', link: '' },
            { name: 'Employee', icon: 'fa fa-user-circle fa-x', link: '' },
            { name: 'Commision', icon: 'fa fa-bar-chart fa-x', link: '' },
            { name: 'Ecommerce', icon: 'fa fa-cart-arrow-down fa-x', link: '' },
            { name: 'Loyalty', icon: 'fa fa-area-chart fa-x', link: '' }
        ];
    };
    ReportComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-report',
            template: __webpack_require__("../../../../../src/app/report/report.component.html"),
            styles: [__webpack_require__("../../../../../src/app/report/report.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["Router"]])
    ], ReportComponent);
    return ReportComponent;
}());



/***/ }),

/***/ "../../../../../src/app/report/report.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_report_report_routing_module__ = __webpack_require__("../../../../../src/app/report/report-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_report_report_component__ = __webpack_require__("../../../../../src/app/report/report.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_report_inventory_inventory_component__ = __webpack_require__("../../../../../src/app/report/inventory/inventory.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_report_report_service__ = __webpack_require__("../../../../../src/app/report/report.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__sales_sales_component__ = __webpack_require__("../../../../../src/app/report/sales/sales.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__swimlane_ngx_charts__ = __webpack_require__("../../../../@swimlane/ngx-charts/release/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__swimlane_ngx_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11__swimlane_ngx_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__profit_loss_profit_loss_component__ = __webpack_require__("../../../../../src/app/report/profit-loss/profit-loss.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var ReportModule = /** @class */ (function () {
    function ReportModule() {
    }
    ReportModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_11__swimlane_ngx_charts__["NgxChartsModule"],
                __WEBPACK_IMPORTED_MODULE_2_app_shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_3_app_report_report_routing_module__["a" /* ReportRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_6_primeng_primeng__["DataTableModule"],
                __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_9__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_9__angular_forms__["FormsModule"]
                // ChartsModule
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_7_app_report_report_service__["a" /* ReportService */]],
            declarations: [__WEBPACK_IMPORTED_MODULE_4_app_report_report_component__["a" /* ReportComponent */], __WEBPACK_IMPORTED_MODULE_5_app_report_inventory_inventory_component__["a" /* InventoryComponent */], __WEBPACK_IMPORTED_MODULE_10__sales_sales_component__["a" /* SalesComponent */], __WEBPACK_IMPORTED_MODULE_12__profit_loss_profit_loss_component__["a" /* ProfitLossComponent */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4_app_report_report_component__["a" /* ReportComponent */], __WEBPACK_IMPORTED_MODULE_5_app_report_inventory_inventory_component__["a" /* InventoryComponent */]]
        })
    ], ReportModule);
    return ReportModule;
}());



/***/ }),

/***/ "../../../../../src/app/report/report.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReportService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ReportService = /** @class */ (function () {
    function ReportService(http) {
        this.http = http;
        this.url = __WEBPACK_IMPORTED_MODULE_3_environments_environment__["a" /* environment */].reportUrl;
    }
    ReportService.prototype.getInventoryDetails = function (inventoryReportBy) {
        return this.http.get(this.url + '/getReportByInventory?inventoryReportBy=' + inventoryReportBy)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ReportService.prototype.getSalesDetails = function (salesReportBy, startDate, endDate) {
        return this.http.get(this.url + '/getReportBySales?salesReportBy=' + salesReportBy + '&startDate=' + startDate + '&endDate=' + endDate)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ReportService.prototype.getSalesSummaryReport = function (salesSummaryReportBy, startDate, endDate) {
        return this.http.get(this.url + '/getReportBySalesSummary?salesSummaryReportBy=' + salesSummaryReportBy + '&startDate=' + startDate + '&endDate=' + endDate)
            .map(this.extractData)
            .catch(this.handleError);
    };
    ReportService.prototype.printInventoryReportPDF = function (options) {
        var inventoryReportBy = options.inventoryReportBy;
        var url = this.url + ("/printReportByInventory?inventoryReportBy=" + inventoryReportBy);
        return this.http.get(url, { responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* ResponseContentType */].Blob })
            .catch(this.handleError);
    };
    ReportService.prototype.printSalesReportPDF = function (salesReportBy, startDate, endDate) {
        var url = this.url + '/printReportBySalesSummary?salesSummaryReportBy=' + salesReportBy + '&startDate=' + startDate + '&endDate=' + endDate;
        return this.http.get(url, { responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* ResponseContentType */].Blob })
            .catch(this.handleError);
    };
    ReportService.prototype.extractData = function (res) {
        var body = res.json();
        // console.log(body);
        return body || {};
    };
    ReportService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    ReportService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], ReportService);
    return ReportService;
}());

// http://localhost:8080/printReportByInventory?inventoryReportBy=category


/***/ }),

/***/ "../../../../../src/app/report/sales/sales.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-title>\n        <h4>Sales Reports</h4>\n    </mat-card-title>\n\n    <mat-card-content>\n\n        <div class=\"row d-flex align-items-center\">\n\n            <div class=\"col-md-2\">\n\n                <select class=\"form-control\" [(ngModel)]=\"this.salesDropdown\" (change)=\"this.getReportDetails()\">\n                    <option>Sales Summary</option>\n                    <option>Sales By Category</option>\n                    <option>Sales By Vendor</option>\n                    <option>Sales By Brand</option>\n                    <option>Sales By Model</option>\n                    <option>Sales By Product</option>\n                    <option>Sales By Employee</option>\n                    <option>Sales By Customer</option>\n                </select>\n            </div>\n\n            <div *ngIf=\"this.salesDropdown == 'Sales Summary'\" class=\"col-md-2\">\n                <select class=\"form-control\" [(ngModel)]=\"this.salesSummaryDropdown\" (change)=\"this.getReportDetails()\">\n                          <option>Sales By Year</option>\n                          <option>Sales By Month</option>\n                          <option>Sales By Week</option>\n                          <option>Sales By Day</option>\n                          <option>Sales By Hour</option>\n                </select>\n\n            </div>\n\n            <div *ngIf=\"this.salesDropdown == 'Sales Summary' && this.salesSummaryDropdown == 'Sales By Year'\" class=\"col-md-2\">\n                <select class=\"form-control\" [(ngModel)]=\"this.salesByYearDropdown\" (change)=\"this.getReportDetails()\">\n                              <option>This Year</option>\n                              <option>Last Year</option>\n                              <option>Last 5 Years</option>\n                              <option>Last 10 Years</option>\n                    </select>\n\n            </div>\n\n            <div *ngIf=\"this.salesSummaryDropdown == 'Sales By Month'\" class=\"col-md-2\">\n                <select class=\"form-control\" [(ngModel)]=\"this.salesSummaryMonthDropdown\" (change)=\"this.getReportDetails()\">\n                              <option>January</option>\n                              <option>February</option>\n                              <option>March</option>\n                              <option>April</option>\n                              <option>May</option>\n                              <option>June</option>\n                              <option>July</option>\n                              <option>August</option>\n                              <option>September</option>\n                              <option>October</option>\n                              <option>November</option>\n                              <option>December</option>\n                </select>\n\n            </div>\n\n            <div *ngIf=\"this.salesDropdown != 'Sales Summary' \" class=\"col-md-2\">\n                <select class=\"form-control\" [(ngModel)]=\"this.salesDateDropdown\" (change)=\"this.getReportDetails()\">\n                  <option>Today</option>\n                  <option>Yesterday</option>\n                  <option>This Week</option>\n                  <option>Last Week</option>\n                  <option>This Month</option>\n                  <option>Last Month</option>\n                  <option>Last 3 Months</option>\n                  <option>Last 6 Months</option>\n                  <option>This Year</option>\n                  <option>Last Year</option>\n                  <option>Custom</option>\n                </select>\n\n            </div>\n\n            <div class=\"col-md-2\">\n\n                <button matIcon (click)=\"this.printSalesReportBy()\">\n                    <i class=\"fa fa-print fa-3x\" aria-hidden=\"true\"></i>\n                </button>\n            </div>\n\n        </div>\n\n        <div class=\"row d-flex align-items-center\" *ngIf=\"this.pieChartData\" style=\"height: 250px\">\n\n            <ngx-charts-advanced-pie-chart class=\"\" [scheme]=\"this.colorScheme\" [results]=\"pieChartData\" [view]=\"null\" (select)=\"onSelect($event)\">\n            </ngx-charts-advanced-pie-chart>\n        </div>\n\n        <div class=\"row d-flex align-items-center\">\n\n            <!-- Showing this table for sales by reports -->\n            <div *ngIf=\"this.salesDropdown != 'Sales Summary'\" class=\"col-md-12 p-md-3\">\n                <p-dataTable [value]=\"this.salesDto\" scrollable=\"true\" [responsive]=\"true\" scrollHeight=\"500px\">\n                    <p-column field=\"name\" header=\"Name\" [style]=\"{'height': '46px', 'width': '25%', 'text-align': 'left'}\"></p-column>\n                    <p-column field=\"cost\" header=\"Cost\" [sortable]=\"true\">\n                        <ng-template let-sales=\"rowData\" pTemplate=\"body\">\n                            {{sales.cost | currency:'USD':'true'}}\n                        </ng-template>\n                    </p-column>\n                    <p-column field=\"retail\" header=\"Retail\" [sortable]=\"true\">\n                        <ng-template let-sales=\"rowData\" pTemplate=\"body\">\n                            {{sales.retail | currency:'USD':'true'}}\n                        </ng-template>\n                    </p-column>\n                    <p-column field=\"quantity\" header=\"Quantity\" [sortable]=\"true\"></p-column>\n                    <p-column field=\"profit\" header=\"Profit\" [sortable]=\"true\">\n                        <ng-template let-sales=\"rowData\" pTemplate=\"body\">\n                            {{sales.profit | currency:'USD':'true'}}\n                        </ng-template>\n                    </p-column>\n                    <p-column field=\"markup\" header=\"Markup %\" [sortable]=\"true\"></p-column>\n                    <p-column field=\"perOfTotal\" header=\"% Of Total\" [sortable]=\"true\"></p-column>\n\n                </p-dataTable>\n            </div>\n\n\n            <!-- Showing this table for sales summary Reports -->\n            <div *ngIf=\"this.salesDropdown == 'Sales Summary'\" class=\"col-md-12 p-md-3\">\n                <p-dataTable [value]=\"this.salesSummaryDto\" scrollable=\"true\" [responsive]=\"true\" scrollHeight=\"500px\">\n                    <p-column field=\"name\" header=\"Name\" [style]=\"{'height': '46px', 'width': '10%', 'text-align': 'left'}\"></p-column>\n                    <p-column field=\"cash\" header=\"Cash\" [sortable]=\"true\">\n                        <ng-template let-summary=\"rowData\" pTemplate=\"body\">\n                            {{summary.cash | currency:'USD':'true'}}\n                        </ng-template>\n                    </p-column>\n                    <p-column field=\"credit\" header=\"Credit\" [sortable]=\"true\">\n                        <ng-template let-summary=\"rowData\" pTemplate=\"body\">\n                            {{summary.credit | currency:'USD':'true'}}\n                        </ng-template>\n                    </p-column>\n                    <p-column field=\"debit\" header=\"Debit\" [sortable]=\"true\">\n                        <ng-template let-summary=\"rowData\" pTemplate=\"body\">\n                            {{summary.debit | currency:'USD':'true'}}\n                        </ng-template>\n                    </p-column>\n\n                    <p-column field=\"check\" header=\"Check\" [sortable]=\"true\">\n                        <ng-template let-summary=\"rowData\" pTemplate=\"body\">\n                            {{summary.check | currency:'USD':'true'}}\n                        </ng-template>\n                    </p-column>\n                    <p-column field=\"tax\" header=\"Tax\" [sortable]=\"true\">\n                        <ng-template let-summary=\"rowData\" pTemplate=\"body\">\n                            {{summary.tax | currency:'USD':'true'}}\n                        </ng-template>\n                    </p-column>\n                    <p-column field=\"discount\" header=\"Discount\" [sortable]=\"true\">\n                        <ng-template let-summary=\"rowData\" pTemplate=\"body\">\n                            {{summary.discount | currency:'USD':'true'}}\n                        </ng-template>\n                    </p-column>\n                    <p-column field=\"profit\" header=\"Profit\" [sortable]=\"true\">\n                        <ng-template let-summary=\"rowData\" pTemplate=\"body\">\n                            {{summary.profit | currency:'USD':'true'}}\n                        </ng-template>\n                    </p-column>\n                    <p-column field=\"returns\" header=\"Returns\" [sortable]=\"true\">\n                        <ng-template let-summary=\"rowData\" pTemplate=\"body\">\n                            {{summary.returns | currency:'USD':'true'}}\n                        </ng-template>\n                    </p-column>\n\n                </p-dataTable>\n            </div>\n\n\n        </div>\n\n\n    </mat-card-content>\n</mat-card>"

/***/ }),

/***/ "../../../../../src/app/report/sales/sales.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/report/sales/sales.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalesComponent; });
/* unused harmony export SalesDto */
/* unused harmony export SalesSummaryDto */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_report_report_service__ = __webpack_require__("../../../../../src/app/report/report.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_shared_services_date_service__ = __webpack_require__("../../../../../src/app/shared/services/date.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_shared_services_util_service__ = __webpack_require__("../../../../../src/app/shared/services/util.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SalesComponent = /** @class */ (function () {
    function SalesComponent(reportService, dateService) {
        this.reportService = reportService;
        this.dateService = dateService;
        this.salesDto = [];
        this.salesSummaryDto = [];
        this.salesDropdown = 'Sales Summary';
        this.salesSummaryDropdown = 'Sales By Year';
        this.salesSummaryMonthDropdown = 'January';
        this.salesDateDropdown = 'Today';
        this.salesByYearDropdown = 'This Year';
        this.dateDto = new __WEBPACK_IMPORTED_MODULE_2_app_shared_services_date_service__["a" /* DateDto */]();
        this.colorScheme = {
            domain: ['#337ab7', '#28a745', '#ff6666', '#fd7e14', '#495057', '#A059B5', '#56BAD6']
        };
    }
    SalesComponent.prototype.ngOnInit = function () {
        this.getReportDetails();
    };
    SalesComponent.prototype.getReportDetails = function () {
        var _this = this;
        if (this.salesDropdown === 'Sales Summary') {
            if (this.salesSummaryDropdown === 'Sales By Year') {
                if (this.salesByYearDropdown === 'This Year') {
                    this.dateDto = this.dateService.getCurrentYear();
                }
                else if (this.salesByYearDropdown === 'Last Year') {
                    this.dateDto = this.dateService.getLastYear();
                }
                // TODO NEED TO MANAGE LAST 5 and 10 YEARS
            }
            else if (this.salesSummaryDropdown === 'Sales By Month') {
                this.dateDto = this.dateService.getMonthDate(this.salesSummaryMonthDropdown);
            }
            else if (this.salesSummaryDropdown === 'Sales By Week') {
            }
            else if (this.salesSummaryDropdown === 'Sales By Day') {
                this.dateDto = this.dateService.getCurrentDay();
            }
            else if (this.salesSummaryDropdown === 'Sales By Hour') {
            }
            this.reportService.getSalesSummaryReport(this.salesSummaryDropdown, this.dateDto.startDate, this.dateDto.endDate)
                .subscribe(function (summary) {
                _this.salesSummaryDto = summary;
                _this.getPieChartDetailsForSalesSummary();
            });
        }
        else {
            if (this.salesDropdown === 'Sales By Category') {
                this.dateDto = this.dateService.getDateByInput(this.salesDateDropdown);
            }
            else if (this.salesDropdown === 'Sales By Vendor') {
                this.dateDto = this.dateService.getDateByInput(this.salesDateDropdown);
            }
            else if (this.salesDropdown === 'Sales By Brand') {
                this.dateDto = this.dateService.getDateByInput(this.salesDateDropdown);
            }
            else if (this.salesDropdown === 'Sales By Model') {
                this.dateDto = this.dateService.getDateByInput(this.salesDateDropdown);
            }
            else if (this.salesDropdown === 'Sales By Product') {
                this.dateDto = this.dateService.getDateByInput(this.salesDateDropdown);
            }
            else if (this.salesDropdown === 'Sales By Employee') {
                this.dateDto = this.dateService.getDateByInput(this.salesDateDropdown);
            }
            else if (this.salesDropdown === 'Sales By Customer') {
                this.dateDto = this.dateService.getDateByInput(this.salesDateDropdown);
            }
            this.reportService.getSalesDetails(this.salesDropdown, this.dateDto.startDate, this.dateDto.endDate)
                .subscribe(function (sales) {
                _this.salesDto = sales;
                _this.getPieChartDetailsForSales();
            });
        }
    };
    SalesComponent.prototype.getPieChartDetailsForSalesSummary = function () {
        var _this = this;
        console.log('Sales Summary', this.salesSummaryDto);
        this.pieChartData = null;
        this.pieChartData = [];
        this.salesSummaryDto.forEach(function (salesSummary) {
            _this.pieChartData.push({
                name: salesSummary.name,
                value: salesSummary.profit
            });
        });
    };
    SalesComponent.prototype.getPieChartDetailsForSales = function () {
        var _this = this;
        console.log('Sales Summary', this.salesDto);
        this.pieChartData = null;
        this.pieChartData = [];
        this.salesDto.forEach(function (sales) {
            _this.pieChartData.push({
                name: sales.name,
                value: sales.profit
            });
        });
    };
    SalesComponent.prototype.printSalesReportBy = function () {
        this.reportService.printSalesReportPDF(this.salesDropdown, this.dateDto.startDate, this.dateDto.endDate)
            .subscribe(function (data) {
            Object(__WEBPACK_IMPORTED_MODULE_3_app_shared_services_util_service__["b" /* printBlob */])(data._body);
        });
    };
    // For D3 chart
    SalesComponent.prototype.onSelect = function (event) {
        console.log(event);
    };
    SalesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sales',
            template: __webpack_require__("../../../../../src/app/report/sales/sales.component.html"),
            styles: [__webpack_require__("../../../../../src/app/report/sales/sales.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_report_report_service__["a" /* ReportService */], __WEBPACK_IMPORTED_MODULE_2_app_shared_services_date_service__["b" /* DateService */]])
    ], SalesComponent);
    return SalesComponent;
}());

var SalesDto = /** @class */ (function () {
    function SalesDto() {
    }
    return SalesDto;
}());

var SalesSummaryDto = /** @class */ (function () {
    function SalesSummaryDto() {
    }
    return SalesSummaryDto;
}());



/***/ }),

/***/ "../../../../../src/app/sell/close-register/close-register.component.html":
/***/ (function(module, exports) {

module.exports = "<div>\n    <mat-card>\n        <mat-card-title>\n            <h3>\n                Close Register\n            </h3>\n        </mat-card-title>\n        <mat-card-content>\n\n\n            <div class=\"row p-md-3\">\n                <div class=\"col-md-2\">\n                    <select class=\"form-control\" [(ngModel)]=\"this.closeRegisterDropdown\" (change)=\"this.getCloseRegisterDetails()\">\n                                  <option>Today</option>\n                                  <option>Yesterday</option>\n                                  <option>Custom</option>\n                                </select>\n\n                </div>\n\n                <div *ngIf=\"this.closeRegisterDropdown == 'Custom' \" class=\"col-md-3 form-group d-flex align-items-center\" [formGroup]=\"this.customDate\">\n\n                    <mat-form-field class=\"float-never col-md-6\">\n                        <input formControlName=\"fromDate\" matInput [matDatepicker]=\"fromDate\" placeholder=\"Start Date\" [max]=\"this.currentDate\">\n                        <mat-datepicker-toggle matSuffix [for]=\"fromDate\"></mat-datepicker-toggle>\n                        <mat-datepicker #fromDate></mat-datepicker>\n                    </mat-form-field>\n                    <!-- <label class=\"text-center\">To</label> -->\n                    <!-- <mat-form-field class=\"float-never col-md-6\">\n                        <input class=\"\" formControlName=\"toDate\" matInput [matDatepicker]=\"toDate\" placeholder=\"End Date\" [min]=\"this.customDate.get('fromDate').value\" [max]=\"this.currentDate\">\n                        <mat-datepicker-toggle matSuffix [for]=\"toDate\"></mat-datepicker-toggle>\n                        <mat-datepicker #toDate></mat-datepicker>\n                    </mat-form-field> -->\n                </div>\n\n                <div class=\"col-md-2\">\n\n                    <button matIcon (click)=\"this.printCloseRegisterDetail()\">\n                                <i class=\"fa fa-print fa-3x\" aria-hidden=\"true\"></i>\n                    </button>\n                </div>\n            </div>\n            <form [formGroup]=\"closeRegisterForm\">\n                <div class=\"row p-md-3\">\n                    <!-- Start of left side of div for payment -->\n                    <div class=\"col-md-6\">\n\n                        <div class=\"row product-textbox\">\n                            <div class=\"col-md-3\">\n                                <p>Payment Type</p>\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <p>Manual Count</p>\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <p>System Count</p>\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <p>Difference</p>\n                            </div>\n                        </div>\n\n                        <div class=\"row close-row\">\n\n                            <div class=\"col-md-3\">\n                                <p>Cash</p>\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input type=\"number\" class=\"form-control\" formControlName=\"closeCash\">\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input type=\"number\" class=\"form-control\" disabled=\"true\" formControlName=\"reportCash\">\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input [style.color]=\"this.closeRegisterForm.get('differenceCash').value >=0 ? 'green' : 'red' \" type=\"number\" class=\"form-control\" disabled=\"true\" formControlName=\"differenceCash\">\n                            </div>\n\n                        </div>\n\n                        <div class=\"row close-row \">\n\n                            <div class=\"col-md-3\">\n                                <p>Credit</p>\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input type=\"number\" class=\"form-control\" formControlName=\"closeCredit\">\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input type=\"number\" class=\"form-control\" disabled=\"true\" formControlName=\"reportCredit\">\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input [style.color]=\"this.closeRegisterForm.get('differenceCredit').value >=0 ? 'green' : 'red' \" type=\"number\" class=\"form-control\" disabled=\"true\" formControlName=\"differenceCredit\">\n                            </div>\n\n                        </div>\n\n                        <div class=\"row close-row \">\n\n                            <div class=\"col-md-3\">\n                                <p>Debit</p>\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input type=\"number\" class=\"form-control\" formControlName=\"closeDebit\">\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input type=\"number\" class=\"form-control\" disabled=\"true\" formControlName=\"reportDebit\">\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input [style.color]=\"this.closeRegisterForm.get('differenceDebit').value >=0 ? 'green' : 'red' \" type=\"number\" class=\"form-control\" disabled=\"true\" formControlName=\"differenceDebit\">\n                            </div>\n\n                        </div>\n\n                        <div class=\"row close-row \">\n\n                            <div class=\"col-md-3\">\n                                <p>Check</p>\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input type=\"number\" class=\"form-control\" formControlName=\"closeCheck\">\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input type=\"number\" class=\"form-control\" disabled=\"true\" formControlName=\"reportCheck\">\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input [style.color]=\"this.closeRegisterForm.get('differenceCheck').value >=0 ? 'green' : 'red' \" class=\"form-control\" disabled=\"true\" type=\"number\" formControlName=\"differenceCheck\">\n                            </div>\n\n                        </div>\n\n                        <div class=\"row close-row \">\n\n                            <div class=\"col-md-3\">\n                                <p>Other Payment</p>\n                            </div>\n                            <div class=\"col-md-3\">\n                                <p>Store Credit</p>\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <p>On Account</p>\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <p>Loyalty</p>\n                            </div>\n\n\n                        </div>\n\n                        <div class=\"row\">\n\n                            <div class=\"col-md-3\">\n                            </div>\n                            <div class=\"col-md-3\">\n                                <input type=\"text\" class=\"form-control\" disabled=\"true\" formControlName=\"storeCredit\">\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input type=\"text\" class=\"form-control\" disabled=\"true\" formControlName=\"onAccount\">\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input type=\"text\" class=\"form-control\" disabled=\"true\" formControlName=\"loyalty\">\n                            </div>\n\n\n\n                        </div>\n                        <hr>\n                        <div class=\"row\">\n\n                            <div class=\"col-md-3\">\n                                <p>Total With Tax</p>\n                            </div>\n\n\n                            <div class=\"col-md-3\">\n                                <input type=\"number\" class=\"form-control\" disabled=\"true\" formControlName=\"closeTotalAmount\">\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input type=\"number\" class=\"form-control\" disabled=\"true\" formControlName=\"reportTotalAmount\">\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input [style.color]=\"this.closeRegisterForm.get('differenceTotal').value >=0 ? 'green' : 'red' \" type=\"number\" class=\"form-control\" disabled=\"true\" formControlName=\"differenceTotal\">\n                            </div>\n\n                        </div>\n\n                        <hr>\n\n                        <div class=\"row\">\n\n                            <div class=\"col-md-3\">\n                                <p>Total Without Tax</p>\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <p>Total Tax</p>\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <p>Total Discount</p>\n                            </div>\n                            <div class=\"col-md-3\">\n                                <p>Total Return</p>\n                            </div>\n\n                        </div>\n\n                        <div class=\"row\">\n\n                            <div class=\"col-md-3\">\n                                <input type=\"number\" class=\"form-control\" disabled=\"true\" formControlName=\"totalWithoutTax\">\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input type=\"number\" class=\"form-control\" disabled=\"true\" formControlName=\"tax\">\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input style=\"color: green;\" type=\"number\" class=\"form-control\" disabled=\"true\" formControlName=\"totalDiscount\">\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input style=\"color: red;\" type=\"number\" disabled=\"true\" class=\"form-control\" formControlName=\"totalReturn\">\n                            </div>\n\n                        </div>\n\n                        <hr>\n\n\n\n\n                    </div>\n                    <!-- End of left side of div for payment -->\n\n                    <!-- <div class=\"col-md-6\">\n                        <h4> Close Shift </h4>\n\n                        <div class=\"row\">\n\n                            <div class=\"col-md-3\">\n                                <p>From User</p>\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <p>From System</p>\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <p>Difference</p>\n                            </div>\n\n                        </div>\n\n                        <div class=\"row\">\n\n                            <div class=\"col-md-3\">\n                                <input type=\"text\">\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input type=\"text\">\n                            </div>\n\n                            <div class=\"col-md-3\">\n                                <input type=\"text\">\n                            </div>\n\n                        </div>\n\n                        <div class=\"row\">\n                            <button> Close Shift</button>\n                        </div>\n\n\n                        <div class=\"row\">\n                            <table class=\"table\">\n                                <thead>\n                                    <tr>\n                                        <th>Date</th>\n                                        <th>Time</th>\n                                        <th>Close Amount</th>\n                                        <th>Difference</th>\n                                        <th>Close By</th>\n                                        <th>Action</th>\n                                    </tr>\n                                </thead>\n                                <tbody>\n                                    <tr>\n                                        <td></td>\n                                        <td></td>\n                                        <td></td>\n                                        <td></td>\n                                        <td></td>\n                                        <td>\n                                            <i class=\"fa fa-pencil\"></i>\n                                            <i class=\"fa fa-trash\"></i>\n                                        </td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </div>\n\n\n                    </div> -->\n\n\n                    <!-- Start of right side of div for money count -->\n                    <!-- <div class=\"col-md-1\">\n                        <div class=\"row\">\n\n                            <div class=\"col-md-4\">\n                                <p>$100</p>\n                            </div>\n\n                            <div class=\"col-md-4\">\n                                <p>*</p>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <input type=\"text\">\n                            </div>\n\n                        </div>\n                        <div class=\"row\">\n\n                            <div class=\"col-md-4\">\n                                <p>$50</p>\n                            </div>\n\n                            <div class=\"col-md-4\">\n                                <p>*</p>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <input type=\"text\">\n                            </div>\n\n                        </div>\n                        <div class=\"row\">\n\n                            <div class=\"col-md-4\">\n                                <p>$20</p>\n                            </div>\n\n                            <div class=\"col-md-4\">\n                                <p>*</p>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <input type=\"text\">\n                            </div>\n\n                        </div>\n                        <div class=\"row\">\n\n                            <div class=\"col-md-4\">\n                                <p>$10</p>\n                            </div>\n\n                            <div class=\"col-md-4\">\n                                <p>*</p>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <input type=\"text\">\n                            </div>\n\n                        </div>\n                        <div class=\"row\">\n\n                            <div class=\"col-md-4\">\n                                <p>$5</p>\n                            </div>\n\n                            <div class=\"col-md-4\">\n                                <p>*</p>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <input type=\"text\">\n                            </div>\n\n                        </div>\n                        <div class=\"row\">\n\n                            <div class=\"col-md-4\">\n                                <p>$1</p>\n                            </div>\n\n                            <div class=\"col-md-4\">\n                                <p>*</p>\n                            </div>\n                            <div class=\"col-md-4\">\n                                <input type=\"text\">\n                            </div>\n\n                        </div>\n                        <div class=\"row\">\n\n                            <div class=\"col-md-8\">\n                                <p>Total</p>\n                            </div>\n\n                            <div class=\"col-md-4\">\n                                <input type=\"text\">\n                            </div>\n\n                        </div>\n                    </div> -->\n                    <!-- End of right side of div for money count -->\n\n\n\n                </div>\n            </form>\n        </mat-card-content>\n        <mat-card-footer>\n            <div *ngIf=\"this.closeRegisterDropdown == 'Today' \" class=\"d-flex align-items-center justify-content-center\">\n                <button mat-raised-button class=\"bg-primary text-white \" (click)=\"this.saveCloseRegisterDetails()\">Close Register</button>\n            </div>\n        </mat-card-footer>\n    </mat-card>\n</div>"

/***/ }),

/***/ "../../../../../src/app/sell/close-register/close-register.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".close-row {\n  margin-top: 10px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/sell/close-register/close-register.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CloseRegisterComponent; });
/* unused harmony export CloseRegisterDto */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_shared_services_date_service__ = __webpack_require__("../../../../../src/app/shared/services/date.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_sell_sell_service__ = __webpack_require__("../../../../../src/app/sell/sell.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_ng2_toastr__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var CloseRegisterComponent = /** @class */ (function () {
    function CloseRegisterComponent(sellService, formBuilder, dateService, toastr) {
        this.sellService = sellService;
        this.formBuilder = formBuilder;
        this.dateService = dateService;
        this.toastr = toastr;
        this.currentDate = new Date();
        this.closeRegisterDto = new CloseRegisterDto();
        this.dateDto = new __WEBPACK_IMPORTED_MODULE_3_app_shared_services_date_service__["a" /* DateDto */]();
        this.closeRegisterDropdown = 'Today';
    }
    CloseRegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getCloseRegisterDetails();
        this.closeRegisterForm = this.formBuilder.group({
            'reportCash': [null],
            'reportCredit': [null],
            'reportDebit': [null],
            'reportCheck': [null],
            'reportTotalAmount': [null],
            'closeCash': [null],
            'closeCredit': [null],
            'closeDebit': [null],
            'closeCheck': [null],
            'closeTotalAmount': [null],
            'differenceCash': [null],
            'differenceCredit': [null],
            'differenceDebit': [null],
            'differenceCheck': [null],
            'differenceTotal': [null],
            'totalBusinessAmount': [null],
            'tax': [null],
            'totalWithoutTax': [null],
            'totalDiscount': [null],
            'profit': [null],
            'markup': [null],
            'bankDeposit': [null],
            'onAccount': [null],
            'storeCredit': [null],
            'loyalty': [null],
            'inHandCash': [null],
            'note': [null],
            'totalReturn': [null]
        });
        this.closeRegisterForm.valueChanges.subscribe(function (changes) {
            var formValues = _this.closeRegisterForm.value;
            _this.closeRegisterForm.patchValue({
                differenceCash: (formValues.closeCash - formValues.reportCash).toFixed(2),
                differenceCredit: (formValues.closeCredit - formValues.reportCredit).toFixed(2),
                differenceDebit: (formValues.closeDebit - formValues.reportDebit).toFixed(2),
                differenceCheck: (formValues.closeCheck - formValues.reportCheck).toFixed(2),
                closeTotalAmount: ((formValues.closeCash) + (+formValues.closeCredit) + (+formValues.closeDebit) + (+formValues.closeCheck)).toFixed(2),
                differenceTotal: ((formValues.closeCash) + (+formValues.closeCredit) + (+formValues.closeDebit) + (+formValues.closeCheck) - formValues.reportTotalAmount).toFixed(2),
            }, {
                emitEvent: false
            });
        });
        this.customDate = this.formBuilder.group({
            'fromDate': new Date(),
            'toDate': new Date()
        });
        this.customDate.valueChanges
            .subscribe(function (change) {
            var customDateValues = change;
            _this.dateDto.startDate = __WEBPACK_IMPORTED_MODULE_2_moment__(customDateValues.fromDate).hour(0).format('YYYY-MM-DD HH:mm:ss');
            _this.dateDto.endDate = __WEBPACK_IMPORTED_MODULE_2_moment__(customDateValues.fromDate).hour(23).minute(59).second(59).format('YYYY-MM-DD HH:mm:ss');
            // this.dateDto.endDate = moment(customDateValues.toDate).hour(23).minute(59).format('YYYY-MM-DD HH:mm:ss');
            _this.getCloseRegisterDetails();
        });
    };
    CloseRegisterComponent.prototype.getCloseRegisterDetails = function () {
        var _this = this;
        if (this.closeRegisterDropdown == 'Custom') {
            //Do not do anything
        }
        else {
            this.dateDto = this.dateService.getDateByInput(this.closeRegisterDropdown);
        }
        this.sellService.getCloseRegisterDetails(this.dateDto.startDate, this.dateDto.endDate)
            .subscribe(function (closeReg) {
            _this.closeRegisterDto = closeReg;
            _this.closeRegId = closeReg.id;
            _this.closeRegisterForm.get('reportCash').setValue(_this.closeRegisterDto.reportCash);
            _this.closeRegisterForm.get('closeCash').setValue(_this.closeRegisterDto.closeCash);
            _this.closeRegisterForm.get('reportCredit').setValue(_this.closeRegisterDto.reportCredit);
            _this.closeRegisterForm.get('closeCredit').setValue(_this.closeRegisterDto.closeCredit);
            _this.closeRegisterForm.get('reportDebit').setValue(_this.closeRegisterDto.reportDebit);
            _this.closeRegisterForm.get('closeDebit').setValue(_this.closeRegisterDto.closeDebit);
            _this.closeRegisterForm.get('reportCheck').setValue(_this.closeRegisterDto.reportCheck);
            _this.closeRegisterForm.get('closeCheck').setValue(_this.closeRegisterDto.closeCheck);
            _this.closeRegisterForm.get('reportTotalAmount').setValue(_this.closeRegisterDto.reportTotalAmount);
            _this.closeRegisterForm.get('tax').setValue(_this.closeRegisterDto.tax);
            _this.closeRegisterForm.get('totalDiscount').setValue(_this.closeRegisterDto.totalDiscount);
            _this.closeRegisterForm.get('totalReturn').setValue(_this.closeRegisterDto.totalReturn);
            var totalWithoutTax = _this.closeRegisterDto.reportTotalAmount - _this.closeRegisterDto.tax;
            _this.closeRegisterForm.get('totalWithoutTax').setValue(totalWithoutTax.toFixed(2));
            _this.closeRegisterForm.get('storeCredit').setValue(_this.closeRegisterDto.storeCredit);
            _this.closeRegisterForm.get('onAccount').setValue(_this.closeRegisterDto.onAccount);
            _this.closeRegisterForm.get('loyalty').setValue(_this.closeRegisterDto.loyalty);
            var closeTotalAmountWithTax = _this.closeRegisterForm.get('closeCash').value + _this.closeRegisterForm.get('closeCredit').value + _this.closeRegisterForm.get('closeDebit').value + _this.closeRegisterForm.get('closeCheck').value;
            _this.closeRegisterForm.get('closeTotalAmount').setValue(_this.totalCloseAmount);
        });
    };
    CloseRegisterComponent.prototype.calculateTotalCloseAmountOnValueChange = function () {
        this.totalCloseAmount = this.closeRegisterForm.get('closeCash').value + this.closeRegisterForm.get('closeCredit').value + this.closeRegisterForm.get('closeDebit').value + this.closeRegisterForm.get('closeCheck').value;
    };
    CloseRegisterComponent.prototype.saveCloseRegisterDetails = function () {
        var _this = this;
        this.closeRegisterDto = this.closeRegisterForm.value;
        this.closeRegisterDto.date = __WEBPACK_IMPORTED_MODULE_2_moment__(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.closeRegisterDto.id = this.closeRegId;
        // TODO need to handle getting user name.
        this.closeRegisterDto.username = 'ALOK';
        console.log(this.closeRegisterDto);
        this.sellService.saveCloseRegisterDetail(this.closeRegisterDto)
            .subscribe(function (data) {
            if (data.statusText == 'OK') {
                _this.toastr.success('Close Register Detail Added!!', 'Success');
            }
            else {
                _this.toastr.error('Opps Something Goes Wrong!!', 'Error');
            }
            console.log('close Register date', data);
        }, function (error) {
            _this.toastr.error('Opps Something Goes Wrong!!', 'Error');
            console.log(JSON.stringify(error.json()));
        });
    };
    CloseRegisterComponent.prototype.printCloseRegisterDetail = function () {
        this.sellService.printClosingDetails(this.dateDto.startDate, this.dateDto.endDate);
    };
    CloseRegisterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-close-register',
            template: __webpack_require__("../../../../../src/app/sell/close-register/close-register.component.html"),
            styles: [__webpack_require__("../../../../../src/app/sell/close-register/close-register.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_app_sell_sell_service__["a" /* SellService */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_3_app_shared_services_date_service__["b" /* DateService */], __WEBPACK_IMPORTED_MODULE_5_ng2_toastr__["ToastsManager"]])
    ], CloseRegisterComponent);
    return CloseRegisterComponent;
}());

var CloseRegisterDto = /** @class */ (function () {
    function CloseRegisterDto() {
    }
    return CloseRegisterDto;
}());



/***/ }),

/***/ "../../../../../src/app/sell/receipt/receipt.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/sell/receipt/receipt.component.html":
/***/ (function(module, exports) {

module.exports = "<button mat-raised-button (click)=\"download()\">Download </button>\n<button mat-raised-button (click)=\"print()\">Print </button>\n\n<!-- <h1 id=\"test\">Test</h1> -->"

/***/ }),

/***/ "../../../../../src/app/sell/receipt/receipt.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReceiptComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jspdf__ = __webpack_require__("../../../../jspdf/dist/jspdf.min.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jspdf___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jspdf__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var ReceiptComponent = /** @class */ (function () {
    function ReceiptComponent(window) {
        this.window = window;
        this.MM_TO_POINT = 2.83465;
        this.currentLine = 0;
        this.pageWidthPts = 80 * this.MM_TO_POINT;
        this.pageHeightPts = 1000 * this.MM_TO_POINT;
        this.charactersPerLine = 56;
        this.fontSize = this.pageWidthPts * 2 / this.charactersPerLine;
        this.spacingBetweenCharacters = this.fontSize;
        this.spacingBetweenLines = this.fontSize * 2;
        this.maxLines = this.pageHeightPts / this.spacingBetweenLines;
    }
    ReceiptComponent.prototype.ngOnInit = function () {
        this.document = new __WEBPACK_IMPORTED_MODULE_1_jspdf__({
            orientation: 'potrait',
            unit: 'pt',
            format: [this.pageWidthPts, this.pageHeightPts]
        });
        console.log('Max Lines', this.maxLines);
        this.document.setFontSize(this.fontSize);
        this.document.setFont("courier");
        // console.log("Font list", this.document.getFontList());
        // this.document
        // this.print()
    };
    ReceiptComponent.prototype.convertImageToCanvas = function (imageUrl) {
        var image = document.createElement('img');
        image.src = imageUrl;
        var canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        console.log(image);
        canvas.getContext("2d").drawImage(image, 0, 0);
        return canvas;
    };
    ReceiptComponent.prototype.centerText = function (text, line) {
        var length = text.length;
        var width = this.pageWidthPts;
        var height = this.pageHeightPts;
        console.log(length);
        var data = {
            text: text,
            x: (width - length * 11.33 * 2) / 2,
            y: line * 11.33
        };
        console.log(data);
        return data;
    };
    ReceiptComponent.prototype.docTest = function (doc) {
        var fontSize = this.fontSize;
        var i, j;
        var text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (i = 0; i < this.maxLines; i++) {
            for (j = 0; j < this.charactersPerLine; j++) {
                var index = ((j) % text.length);
                if (i << 1)
                    console.log(index);
                doc.text(text.split('')[index], j * this.spacingBetweenCharacters, i * this.spacingBetweenLines);
            }
        }
    };
    ReceiptComponent.prototype.drawLine = function (doc, line) {
        for (var i = 1; i < this.charactersPerLine - 29; i++) {
            doc.text("-", i * this.spacingBetweenCharacters, line);
        }
    };
    ReceiptComponent.prototype.addLineItemData = function (doc) {
        var _this = this;
        var transactionList = this.data.transactionLineItemDtoList;
        var line = (8) * this.spacingBetweenLines;
        doc.setFontSize(this.fontSize);
        doc.text("Product No.", 2 * this.spacingBetweenCharacters, line);
        doc.text("Description", 12 * this.spacingBetweenCharacters, line);
        doc.text("Retail", 22 * this.spacingBetweenCharacters, line);
        doc.setFontSize(this.fontSize);
        this.drawLine(doc, 9 * this.spacingBetweenLines);
        var lineAdjustment = 0;
        transactionList.forEach(function (data, i) {
            var productDescription = data.productDescription.trim();
            var productDescriptionLines = [];
            var descriptionLength = productDescription.length;
            var lines = descriptionLength / 16;
            for (var z = 1; z <= lines + 1; z++) {
                var low = ((z - 1) * 16);
                var high = descriptionLength > z ? z * 16 : descriptionLength;
                productDescriptionLines.push(productDescription.substring(low, high));
            }
            line = (10 + i + lineAdjustment) * _this.spacingBetweenLines;
            doc.text("" + data.productNumber, 2 * _this.spacingBetweenCharacters, line);
            var adjust = 0;
            productDescriptionLines.forEach(function (lineData) {
                doc.text("" + lineData, 12 * _this.spacingBetweenCharacters, line + (adjust * _this.spacingBetweenLines));
                adjust++;
                lineAdjustment++;
            });
            doc.text("$ " + data.cost, 23 * _this.spacingBetweenCharacters, line);
        });
        line = line + 3 * this.spacingBetweenLines;
        this.drawLine(doc, line);
        this.currentLine = line;
    };
    ReceiptComponent.prototype.addStoreDetails = function (doc) {
        var startLine = 3;
        var endLine = 4 + startLine;
        var currentLine = startLine;
        var store = {
            name: "Pitts & PUtt store",
            address: "123 demo stuff ghhghg hghgg jhk",
            phone: "(123) 345-7654"
        };
        var x = (this.charactersPerLine - store.name.length) / 2;
        doc.text(store.name, x * (this.spacingBetweenCharacters / 2), ++currentLine * this.spacingBetweenLines);
        x = (this.charactersPerLine - store.address.length) / 2;
        doc.text(store.address, x * (this.spacingBetweenCharacters / 2), ++currentLine * this.spacingBetweenLines);
        x = (this.charactersPerLine - store.phone.length) / 2;
        doc.text(store.phone, x * (this.spacingBetweenCharacters / 2), ++currentLine * this.spacingBetweenLines);
    };
    ReceiptComponent.prototype.spacePad = function (data, finalLength) {
        var length = data.length;
        var arr = data.trim().split('');
        while (arr.length < finalLength) {
            arr = arr.concat(" ");
        }
        ;
        return arr.join('');
    };
    ReceiptComponent.prototype.addLogo = function (doc) {
        var imgData = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QBYRXhpZgAATU0AKgAAAAgABAExAAIAAAARAAAAPlEQAAEAAAABAQAAAFERAAQAAAABAAAAAFESAAQAAAABAAAAAAAAAABBZG9iZSBJbWFnZVJlYWR5AAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAA+AM0DASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKACiiigD4z/4Kvf8FV4v2FNP0jwb4N0uHxV8XfGAUaTpjK0kVjG7+Wk8qKQzs8mVjiUguVYkgLhuZ+DH/BJvxP8AH/QbfxN+1T8SPG3j7xHqiiebwpY6zJp2g6QG58ny7YoHcdC0ZRc5A34Dn47/AGELs/t0f8HBXi3xlrn+n2nhO81TV7GKT5ljhs2WysRjsY98L8fxpnvX7bV9hml8op0sJhtKsoqU5/au9op7pLytc+Kyi2dVKuMxXvUoycYQ+zZbyktpN+d7Hxv40/4IR/s9arozr4V0PxF8OdaVf9H1jw94hvY7qBuxxNLIjc9crk+o610n/BNb9m341fsxzePtA+KvxI1L4kaDDeWyeEb69n86ZrYI5ldy5aZWJaNCjuyr5Xykg5P1JXhv/BRb9tXTv2B/2WNc8fXdvHqGpRsmn6LYSMVW/v5Q3loxHOxQryNgg7I2xzivJp5jj8YvqMpOo5tJc2rTutm9V562tc9mpluXYKX1+MVTUE2+X3U1brFaPutL3seyeJPFOmeDtJkv9X1Gx0qxh+/cXlwkEKfVmIA/OuZ8J/tIfDvx7qy6fofj3wXrV852rbWGt21zMx9AiOT+lfH37Bv/AAT6/wCGk/A2jfGv9pdpPif488YW66rp2j61+90bwzZzAPDDDZH9yHZCrMGUhSQuNwZn+jfiT/wTp+BPxY8Ly6RrHwl8BG1kTYslno0Fjcwe8c8KpJGfdWFRXwuCoVHRnUlJrRuKVr9bXacl5+7f8S8Pi8diKSr06cYp6pSb5mul7JqLfb3rfge0UV+bPwd+PnjL/glx/wAFBdF/Z98d+JtW8ZfCH4jCNvA2s6xMZ7/RZJHMcdpJMeXQSgRFTwoeF12Astcf+1vHrH/BIn/gqJ4b+M1rdapN8FfitPJpviC082SWDR5pSHnCJkhQGVbqMAZOyeNQFFdlPh2U6vsozT5ouVN20nb7PlLfR9VbtfiqcSRhR9tKm1yzUKivrC/2ttY6rVW0d+9v1Wor51/4KB/tL6t8Pvg1pPhr4ayw6n8UPi7L/YngxIZQyoZEDTaiWGcQ20LGUyYKg+Xng13P7G/7Lul/sefs+aF4H028utUm0+PzdR1O5dmn1S7YDzZ2LEkZIwq5O1FRcnbXkSwvJh1Xm7OTslbdLd+Svou7v2Z7McZz4l0IK6irt30Tey821q+yt3R6jRRRXGdoUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAfiL/wAEZrf/AIUL/wAFwPiV4P1YeRfXUPiDQ4FfgyvHeR3IK+oMVszA9xzX7dV+Xv8AwV//AGDfHfwt/aZ0D9q74JabLqfiHw7PBd+I9JtYjJNKYFCC6WNfmkjeEeVMi/MFAYAguy/Yn7D/APwUl+GP7dvgWyvvDOuWVj4kaIf2j4avLhY9S0+UD518s4MsYPSRAVI67TlR9jxInj6dLNKGseVRnb7Ml37J9H1PieGGsvqVcpxHuy5nKF/tRfbu11XQ9+r8p/8Ag6a1C6T4TfB+z3SLptxrV/LcY+75iQxCM/ULJLj8a/ULxr470P4beG7jWPEWsaXoOk2a7p73UbpLW3hHqzuQo/E18F/tsW/hX/guH+yZ8QND+EjXGrah8LdWt7rRNYlj+z2et36xSefawM+CUML7d7bVMjxn7o3Hg4Xk6GPp4yon7OL96XRc3uq79WehxXFYjL6mCpte0mrxj1fL7zsvRW/A/QLSrK303S7a3tFSO1t4ljhVPuqgACge2AKsV8m/8Epv289L/aY+CGl+DfElw2h/GDwJapo/iTw/qQNvqDSW6iP7SsT4ZlcKGbA+RyynA2lvqfXtfsfC2jXWpape2mm6fZRma4urqZYYYEHJZ3YhVUdyTivIxmDq4evKhVXvJ/f2a7p9H1PawONpYnDxxFJ+6193dPs1s10Pyr/4OfmbSG+AOrafldes9V1M2TJ/rCR9hcY78OqY9zX3v/wUL+CPgv8AaB/Y48eeH/H17a6P4dXS5b99WmGRo0sCmSO6Hf8AdsoJA5Zdy9GIr4X8V6ZN/wAFpv8AgqD4T1nw9bz3XwC+BEwM2uSRMtrrt8JUmkigJA3iR44EOOkURckb4wffv2jfFC/8FCP2xrX4A6PI1x8NvhvLb6/8T7qM5h1GdW32WiEjghpF8yUekZXIZCD9ZXpyp0sHh2+WVFSnN9YKUk0v8W1k+rSZ8fh6kalbG4lR5oV3GnBPabjFxb/w73a6RbR80/8ABu38TbXx98SfEGj/ABAv9WvPih4H8N2mk+FrfVk8v7D4d3eaVtkYBsl5YSzMMmI24U7Qa/WivzS/4LZfBXW/2X/ij4D/AGt/hnarBr3gW7g07xNBEuyO+sm/dRNLt/gKs1s567ZosY2ZH3r+zZ+0F4d/ao+B3hvx94WuPtGi+JLRbmIEjzLd/uyQyY6SRuGRh6qeo5rg4iSxShmtFe5U0a/lkt4+j+Jd7s9HhuTwjnlFZ3nT1T/ng9peq+F9rI7iiiivlz6sKKKKACiiigAooooAKKKKACiiigAr5b+PH7d3/Cr/ANuLwZ4FjuI18OlRa685UYFxdBfIyxGV8rMbnBA2zHPQY+iPiZ8QLD4U/D3WvEmqPssNEs5Lybnlgik7R/tMcKB3JFfHHxf/AGSdQ+Iv7AOoeJ9St9/xCv7yXx5dMF/eAyjLWw7hUttoCf34wBVRt1EfcdNSZJGIVlYr1APTtXlP7Evx0H7Q37Nvh3XppvN1SKH7BqfPzC6hwrk/742yY9JBXl/7BGmLa/tP/tITY/1niaJc/wDbW8Y/+h0rDPqivDfjb/wTb+A/7SGuzap4t+GfhfUtXlffPf20bWF5M+fvPNbtHIzZHVmJr3Kvlv4N/s/+G/jd4u+M1n4jtbq6sYviA9yiQXktqxkS1UDLxMrYxO/Gccg9hW2HxFWjLnoycX3Taf4GGIw1GvHkrQUl2aTX4lzQ/wDgjt+zdoepw3jfDO01aW3/ANWus6vqGrxJ9I7qeRO3TFfQ3hHwdpHgDw9a6RoOlabouk2S7LeysLZLa3gX0SNAFUewFfFvx8/Zs8J+CP2zPhD4T0q31a08P+JVuv7StP7avn+0+WpK/O0xdf8AgLCu6/aQ0rwd/wAE8vh5feMvBOk3kfi/Xl/sHTY7nU7q+jLysJC5SaR/u+Vu46nC9GNaYjGYivZVqkperb/NmeHwOGw9/YU4x9El+SPS/wBpH9kv4L/HC6t9W+JHhXwrdahb4WDV7lhY30W3oFu42SYAdgHwK4rR/wDgmX+zv4zWG4/4R1/GNrauCkWqeLtU12zQjp+6uLqWL8CtdR8D/wBjbQ/D2hW2r+PLW38dePNQjWbU9U1pBfGKVhkxQK+VjjQkqNgGQPTAB8cP2NtC8RaFc6t4FtbfwL48sImm0zVNFQWJklUZEU6x4WSNyAp3g4B9Mg1TzDFU4qEKskl0Uml+ZFTLcJUk51KUW31cU3+R614Y8JaT4E8N22kaLpun6LpFjH5VvZ2MCW1vbJ/dREAVR7ACuR/Z9/Zd8CfsuaNrFl4F0MaPD4i1KTV9TkkvLi9uL+6kADyyTXEkkjE46FsZJOMsSfJPhX+1xN8c/wBgjxr4n1KOO08SeHNI1Cx1SNF2KbmO2Yq6r/CH3IcdA24dq1/+CcfxwvPiZ8E28N6+JIfF3w/m/sbU4Jv9bsTIhkb6qpQnu0THvWHtaijKPM7PdX39e50expuUZcqvHZ22vvbt8j2r4jfDvRfi54B1jwv4k0+HVtB8QWclhf2cpIW4hkUqy5Uhl4PDKQQcEEEA1yP7Mn7Jnw+/Y88GXnhz4caJL4f0W7uzezWZ1O7vYxMVVSy/aJZChKquQuAcAnNdX8TfiHpvwm+H+r+JNXk8rT9GtnuZiPvPgcIo7szYUDuWAr5o/YR/aJ1KfwF8a/EXjoTWd9oPiG61XU7ZuXslW3VDAoP9wW2xR/siiNaqqbpKT5Xq1d2b722CWHpOqqziuZKydldLsnvY+sLu8hsLZ5p5Y4YYxueSRgqqPUk8Cs3RfHuh+JLowadrWk6hOvJjtruOVh+Ckmvmf9lX4eT/ALaelyfFP4oR/wBsafqV3Kvhzw3MxbS9Nt43KeY0P3ZZCysu5wchc9wF9o8a/sk/Dfx3ozWd14N0G1Kj9zc2FnHZ3Vq3Zo5YwroQcHg445BrI2PRqK+QfhFLN44+J/ir9nf4q3moeJo/DrR6toWqPdyW91qFoArIkssbKzOqyqc5ycSAkhRXMftbfs1eE/hf8fPgfoegWurWGleLNamtNWg/tu+kF3EslqAu55iy8SScoVPzeww+XWwj7lorzT4a/si+BPhD40XxB4f03ULPUkheDdLq93dIVfG75ZpXHYcivm79hT4Z3Xxv/Yu+Knh2bULr7ZfeIry0s7l523W00VvbPCwbOQqybSQOoyO9IZ9uUV86/wDBMf4s3XxB/Zti0XVmm/4SDwTeS6LfRzHMyhDujLd+FOz6xGuh/bt8V6jZfBaPwtoMjR+JPiHfw+G9PKk5jEx/fSHHIVYVky3bINFtbAe00V8b/tz/AA6s/D3jX9m3wlFNeHRV1tNGnQXLxvdwGSyRt7KQxZgDls5yxOc817ZafsNfDPT9csdSt9F1GG8024juoHGuX7KsiMGUlGmKsMgcEEGgD1yiuZ+MXg3/AIWD8M9Y0gWtteSXkBWOKdVZC4wVJ3ccEZz2r5v+L37IHjbxlq8v2WCzm0uPUb+5srZrsILRLiczHA/2mY8DpgDigDpP22fO+PfxF8H/AAR069ms18QFtb8QXEIDNaWFvkxgg5H7yYDGR1Rc8Gt9/wBkXxRJbNE3xs+I7RsNpU/ZCCPT/VdPauI/4J6as3xz+KfxW+LF9/x9arqq6HYRN96ys4UVwnp8ytDnHVoye9fVVN6aCPhX9g+5uP2Rv2yvGnwX1S6km03WD9r0eaUBfOdE8xGAHGZICd2P4oQBXo37Bd3u/aU/aMgf5Zk8UpIVP9wyXQU/jtrg/wDgrb4am+H3jT4b/FDRZktde0u9+xFjn955Z+0Q5x1AIlBB6hwOlbvjiy1z4KeMIf2iPBf9nyaF470i0uPEPh3UJXieQvEjo8UiKwD4A5I4O/qHwtbiPsOvGf2QNtxrPxfuk5Sf4g36K397y4LWNvydWH4V5h8Nf+CkeoftM6ofDPgPwxb6R4gulKLea1elrWzPdwkcZaUjqFJQE9SK+h/gd8I7X4IfDax8P2tzNfyQmSe7vZh+9v7mVzJNM/uzsxxk4GBk4qNijwv9qGRV/wCChfwDB67NR7esRArA/wCCuNu+naN8L9cmVv7J0nxKBdtj5V3BXGf+AxSVa/az1FoP+CjXwIjH8KT/APj5ZT/Kvo342fBvRfj78M9U8K6/C0mn6nGAXjOJLdwcpIh7MrAEdj0IIJBrazEdSkiyorKwZWGQQcgih3WNGZiFVRkkngCvk+8/aV8QfsA+HbDwv8Qo4fGWk2MQi0vV9MkMd+9svyos8EgCb1AxuWU5AGcnJJZ/tMeIP2/PD994X+HccPg3Sr6Ex6pq+qSGS/jtm+V1ggjBTeQcbmlGATjBwRNhnh3wBkbUv2VPjZeW+f7P8beMLLR7DH3ZfOu0EgH/AGymFe2ftMO37Hn7Xvhv4tWqtF4T8abdB8VKg+SKTA8u4I9dqhuOf3Ljq9XP2gPhfo3wB8CfAn4f+H4Xj0tviDpfnPIQ0l1sdpHaQ92dyD6DGAAAAPdf2ifgzY/tA/BjX/Cd9tVdUtisEzDP2adfmik9flcKTjqMjvTuScR8RJk/aE/aE0jwbAy3HhjwR5HiLxCyndHdXTfNYWh7EDBnYHIIWP1r5v1/Sbq38VftieGbNWa4vLSHWkjXqVAeaXA91lr6W/YJ+ECfCH9mfw+ktx9t1TXoI9Wv7osWaZ5Y12LlucJEI4x/ue9eX+BAukf8FcfHtsyrLa+IfC0XmxsMqWWKzHI6EbUI/wCBUID0n/gnNq1vrH7F3gV7ZlZYbSWCQA/ddJ5FYH3yM/jXttfLMvgzWf8AgnU+tat4dksdc+F+qXZu30O6neC90edhz9mkCOskZC/dfaflXnOWan4d/wCCoNv8adUXw/4B8L3C+IrxvIhl1+4FvZwOeAzeT5juAT0AUn1FHLfYZnzI3iX/AILIQtYfOvh/w0TqJT+DdAwG78Z4fzFbv7d7f8ZRfs3jv/wkk/H/AAOzr0n9lz9lxfgQ2ua5rOqHxJ468XT/AGrWdWaPYrHJIhiX+GNST9eOAAqr5H/wUG1I237WX7NcYH/Mxvn33XNgv+NHUD64r5a/4JNsH+C3jll+6fHN+R/34ta+pa+SP+CPWotffBDxnu/i8W3E34tb2+f5Uugx2nr/AMMs/wDBS24t/wDj38MfGqz85P4Y01KMkn6sX3fjdivS9EgX4yftk6jqrfvdH+FVj/ZdmeqNql2oe4dT6x2/lIR2MrVy/wDwVJ8B/wBsfs3DxZZzfY9c8Aajb6vYXI++hMqRsoPblkf6xrXon7Hfg5/Cf7Pmg3F1Mt5q3iaM+IdUugMG5urz9+7H6bwg9kFPpcR47/wUh06bWvi58A7O1vptLu7nxWEhu4UR5LVjJbASKHBUspIIDAgkcgivXvDXwL8YaL4u0/ULz4s+KNYsrOUSTafcWFlHFdLgjazRRIwHfj0rwb/gqr4/j+GXxO+BeuTwyXNvouuT6nJFGQGlWCSzcqCeMkZHNT6D/wAFg/D/AIl8V6PpNr4M1gS6tew2SvLeRqsZkcJuOAc4znFGtgPsSiiipGf/2Q==";
        doc.addImage({
            imageData: imgData,
            x: 6 * this.spacingBetweenCharacters,
            y: 4 * this.spacingBetweenLines,
            h: 10 * this.MM_TO_POINT,
            w: 50 * this.MM_TO_POINT,
            format: 'JPEG'
        });
    };
    ReceiptComponent.prototype.addTotalSaleData = function (doc) {
        var line = this.currentLine + 1 * this.spacingBetweenLines;
        var receiptData = this.data.transactionDtoList[0];
        doc.text("Subtotal", 12 * this.spacingBetweenCharacters, line);
        doc.text("$" + receiptData.subTotal, 20 * this.spacingBetweenCharacters, line);
        line = line + 1 * this.spacingBetweenLines;
        doc.text("Tax 7.00%", 12 * this.spacingBetweenCharacters, line);
        doc.text("$" + receiptData.tax, 20 * this.spacingBetweenCharacters, line);
        line = line + 1 * this.spacingBetweenLines;
        doc.text("Discount", 12 * this.spacingBetweenCharacters, line);
        doc.text("$" + receiptData.discount, 20 * this.spacingBetweenCharacters, line);
        line = line + 1 * this.spacingBetweenLines;
        doc.text("Total", 12 * this.spacingBetweenCharacters, line);
        doc.text("$" + receiptData.totalAmount, 20 * this.spacingBetweenCharacters, line);
        if (receiptData.paidAmountCash > 0) {
            line = line + 1 * this.spacingBetweenLines;
            doc.text("Paid by Cash", 2 * this.spacingBetweenCharacters, line);
            doc.text("Amount", 12 * this.spacingBetweenCharacters, line);
            doc.text("$" + receiptData.paidAmountCash, 20 * this.spacingBetweenCharacters, line);
        }
        if (receiptData.paidAmountCheck > 0) {
            line = line + 1 * this.spacingBetweenLines;
            doc.text("Paid by Check", 2 * this.spacingBetweenCharacters, line);
            doc.text("Amount", 12 * this.spacingBetweenCharacters, line);
            doc.text("$" + receiptData.paidAmountCheck, 20 * this.spacingBetweenCharacters, line);
        }
        if (receiptData.paidAmountDebit > 0) {
            line = line + 1 * this.spacingBetweenLines;
            doc.text("Paid by Check", 2 * this.spacingBetweenCharacters, line);
            doc.text("Amount", 12 * this.spacingBetweenCharacters, line);
            doc.text("$" + receiptData.paidAmountDebit, 20 * this.spacingBetweenCharacters, line);
        }
        if (receiptData.paidAmountCredit > 0) {
            line = line + 1 * this.spacingBetweenLines;
            doc.text("Paid by Check", 2 * this.spacingBetweenCharacters, line);
            doc.text("Amount", 12 * this.spacingBetweenCharacters, line);
            doc.text("$" + receiptData.paidAmountCredit, 20 * this.spacingBetweenCharacters, line);
        }
        line = line + 3 * this.spacingBetweenLines;
        doc.text("Thank you for your business!", 5.5 * this.spacingBetweenCharacters, line);
    };
    ReceiptComponent.prototype.print = function () {
        this.addLineItemData(this.document);
        this.addStoreDetails(this.document);
        this.addTotalSaleData(this.document);
        window.open(this.document.output('bloburl'), '_blank');
    };
    ReceiptComponent.prototype.download = function () {
        var doc = new __WEBPACK_IMPORTED_MODULE_1_jspdf__({
            orientation: 'potrait',
            unit: 'mm',
            format: [80, 297]
        });
        // doc.setFontSize(8);
        // doc.text('Hello world!', 0, 0);
        // doc.text(0, 0, 'This is client-side Javascript, pumping out a PDF.');
        // doc.addPage();
        // doc.text(0, 0, 'http://www.coding4developers.com/');
        // Save the PDF
        doc.save('Test.pdf');
        doc.autoPrint();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ReceiptComponent.prototype, "data", void 0);
    ReceiptComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-receipt',
            template: __webpack_require__("../../../../../src/app/sell/receipt/receipt.component.html"),
            styles: [__webpack_require__("../../../../../src/app/sell/receipt/receipt.component.css")],
            providers: [
                { provide: 'Window', useValue: window }
            ]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])('Window')),
        __metadata("design:paramtypes", [Window])
    ], ReceiptComponent);
    return ReceiptComponent;
}());



/***/ }),

/***/ "../../../../../src/app/sell/return-sale/return-sale.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-9\">\n        <mat-card>\n            <div class=\"row\">\n                <div class=\"align-self-center col-lg-7\">\n\n                    <p-autoComplete id=\"productsearch\" [(ngModel)]=\"p\" class=\"full-width m-1\" [suggestions]=\"product\" placeholder=\"Scan or Search Product\" (completeMethod)=\"filterProducts($event)\" name=\"test\" [minLength]=\"3\" (keyup.enter)=\"submitProduct(p)\" field=\"description\">\n                    </p-autoComplete>\n                    <!-- <button (click)=\"this.testFocus()\">Click me</button> -->\n\n                </div>\n                <div class=\"col-lg-0\"></div>\n                <div class=\"col-lg-5 d-flex justify-content-end\">\n                    <!-- Buttons go here  -->\n                    <button class=\"bg-primary text-white action-button m-1\" mat-raised-button [disabled]=\"this.paymentButtonOnSale\">\n                        <span>\n                            <i class=\"fa fa-history\">\n                                Park Sale\n                            </i>\n                        </span>\n                    </button>\n                    <button class=\"bg-danger text-white action-button m-1\" mat-raised-button data-toggle=\"modal\" data-target=\"#deleteProduct\" (click)=\"this.setHeaderAndMessageForDisgardPopup()\" [disabled]=\"this.paymentButtonOnSale\">\n                        <span>\n                            <i class=\"fa fa-trash\">\n                                Discard Sale\n                            </i>\n                        </span>\n                    </button>\n                    <button class=\"bg-primary text-white  action-button m-1\" mat-raised-button>\n                        <span>\n                            <i class=\"fa fa-th\">\n                                Show Grid\n                            </i>\n                        </span>\n                    </button>\n                </div>\n            </div>\n        </mat-card>\n        <!-- <br/> -->\n        <mat-card>\n            <!-- <mat-card-title></mat-card-title> -->\n            <mat-card-content>\n                <div class=\"row p-md-3\">\n                    <!-- Product Table -->\n                    <p-dataTable [value]=\"this.transactionLineItemDaoList\" scrollable=\"true\" [responsive]=\"true\" scrollHeight=\"300px\" [editable]=\"true\" (onEditComplete)=\"updateLineItemDetails($event)\">\n                        <p-header>Product Sale Table</p-header>\n\n                        <p-column field=\"productNo\" header=\"ProductNo\" [style]=\"{'width':'15%','text-align':'center', 'overflow':'visible'}\"></p-column>\n                        <p-column field=\"description\" header=\"Description\" [style]=\"{'width':'45%','text-align':'center', 'overflow':'visible'}\"></p-column>\n                        <p-column field=\"defaultQuantity\" header=\"Quantity\" [editable]=\"true\">\n                            <ng-template let-product=\"rowData\" pTemplate=\"body\">\n                                <div id=\"lineitem{{product.productNo}}\" [ngClass]=\"{'quantity-updated': product.quantityUpdated }\">\n                                    {{product.defaultQuantity}}\n                                </div>\n                            </ng-template>\n                        </p-column>\n                        <p-column field=\"retail\" header=\"Retail\" [editable]=\"true\"></p-column>\n                        <p-column field=\"retailWithDis\" header=\"RetWtDis\"></p-column>\n                        <p-column field=\"quantity\" header=\"Stock\"></p-column>\n                        <p-column field=\"totalProductPrice\" header=\"Total\"></p-column>\n                        <p-column header=\"\" styleClass=\"col-button\" [style]=\"{'width':'5%','text-align':'center', 'overflow':'visible'}\">\n\n                            <ng-template let-product=\"rowData\" pTemplate=\"body\">\n                                <button mat-button class=\"btn-red action-button-table\" mat-button (click)=\"this.setProductForDelete(product)\" data-toggle=\"modal\" data-target=\"#deleteProduct\">\n                                    <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                                </button>\n                            </ng-template>\n                        </p-column>\n\n\n                    </p-dataTable>\n                </div>\n            </mat-card-content>\n        </mat-card>\n\n    </div>\n    <div class=\"col-lg-3\">\n        <mat-card>\n            <mat-card-content>\n                <div class=\"row\">\n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\" id=\"basic-addon1\">\n                            <i class=\"fa fa-user-plus\" aria-hidden=\"true\"></i>\n                        </span>\n                        <p-autoComplete [(ngModel)]=\"this.selectedCustomer\" [field]=\"'name'\" [suggestions]=\"filteredCustomer\" (completeMethod)=\"this.filterCustomers($event)\" class=\"full-width\" [minLength]=\"1\" (keyup.enter)=\"this.submitCustomer(this.selectedCustomer)\" (onClear)=\"this.removeCustomerOnSale()\">\n                            <ng-template let-c pTemplate=\"item\">\n                                <div class=\"ui-helper-clearfix\" style=\"border-bottom:1px solid #D5D5D5\">\n                                    <div style=\"width:32px;display:inline-block;margin:5px 0 2px 5px\">{{c.name}}</div>\n                                    <div style=\"font-size:18px;float:right;margin:10px 10px 0 0\">{{c.phoneNo}}</div>\n                                </div>\n                            </ng-template>\n\n                        </p-autoComplete>\n\n                    </div>\n                </div>\n                <br/>\n                <div *ngIf=\"this.selectedCustomer\">\n                    <table class=\"table table-bordered customer\">\n\n                        <tbody>\n                            <tr>\n                                <td>\n                                    <dl class=\"row\">\n                                        <dt class=\"\">Name:</dt>\n                                        <dd class=\"\">{{this.selectedCustomer.name}}</dd>\n                                    </dl>\n                                </td>\n                                <td>\n                                    <dl class=\"row\">\n                                        <dt class=\"\">Phone:</dt>\n                                        <dd class=\"\">{{this.selectedCustomer.phoneNo}}</dd>\n                                    </dl>\n                                </td>\n                            </tr>\n                            <tr>\n                                <td>\n                                    <dl class=\"row\">\n                                        <dt class=\"\">Balance:</dt>\n                                        <dd class=\"\">{{this.selectedCustomer.balance | currency:'USD':'true'}}</dd>\n                                    </dl>\n                                </td>\n                                <td>\n                                    <dl class=\"row\">\n                                        <dt class=\"\">Credit:</dt>\n                                        <dd class=\"\">{{this.selectedCustomer.storeCredit | currency:'USD':'true'}}</dd>\n                                    </dl>\n                                </td>\n                            </tr>\n                            <tr>\n                                <td>\n                                    <dl class=\"row\">\n                                        <dt class=\"\">Spending:</dt>\n                                        <dd class=\"\"></dd>\n                                    </dl>\n                                </td>\n                                <td>\n                                    <dl class=\"row\">\n                                        <dt class=\"\">Loyalty:</dt>\n                                        <dd class=\"\"></dd>\n                                    </dl>\n\n                                </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n                <div class=\"sales-total p-md-4\">\n\n                    <dl class=\"row\">\n                        <dt class=\"\">Sub-total</dt>\n                        <dd class=\"\">{{this.transactionDtoList.subtotal | currency:'USD':'true'}}</dd>\n                    </dl>\n                    <!-- <dl class=\"row\">\n                        <dt class=\"\">\n                                                <a #discount id=\"discount-popover\" href=\"javascript:void(0)\" (click)=\"this.showPopover(discount)\">\n                                                    Discount\n                                                </a>\n                                            </dt>\n                        <dd class=\"\">{{this.transactionDtoList.totalDiscount | currency:'USD':'true'}}</dd>\n                    </dl> -->\n                    <!-- <dl class=\"row\">\n                        <dt class=\"\">Tax (7%)</dt>\n                        <dd class=\"\">{{this.transactionDtoList.tax | currency:'USD':'true'}}</dd>\n                    </dl> -->\n\n                    <dl class=\"row\">\n                        <dt *ngIf=\"this.taxPercent == 7\">\n                        <a  href=\"javascript:void(0)\" (click)=\"this.taxPercent = 0\">\n                                Tax ({{this.taxPercent}}%)\n                        </a>\n                        </dt>\n\n                        <dt *ngIf=\"this.taxPercent == 0\">\n\n                            <a  href=\"javascript:void(0)\" (click)=\"this.taxPercent = 7\">\n                                    No Tax\n                                    <!-- ({{this.taxPercent}}%) -->\n                            </a>\n                        </dt>\n                        <dd class=\"\">{{this.transactionDtoList.tax | currency:'USD':'true'}}</dd>\n                    </dl>\n                    <dl class=\"row\">\n                        <dt class=\"\">Quantity</dt>\n                        <dd class=\"\">{{this.transactionDtoList.quantity}}</dd>\n                    </dl>\n                    <dl class=\"row\" *ngIf=\"this.selectedCustomer != null && this.selectedCustomer.balance > 0\">\n                        <dt class=\"\">Pre Balance</dt>\n                        <dd class=\"\">{{this.selectedCustomer.balance | currency:'USD':'true'}}</dd>\n                    </dl>\n                    <dl class=\"row\">\n                        <dt class=\"\">Total</dt>\n                        <dd class=\"\">{{this.transactionDtoList.totalAmount | currency:'USD':'true'}}</dd>\n                    </dl>\n                </div>\n\n\n                <button mat-raised-button [disabled]=\"this.paymentButtonOnSale\" type=\"button\" (click)=\"this.setDataForPaymentModel()\" data-toggle=\"modal\" data-target=\"#paymentModel\" style=\"width: 100%; font-size: 20px\" class=\"btn btn-red btn-lg text-white m-md-1 p-md-2\">\n                    <div class=\"row p-md-1 font-weight-bold\">\n                        <div class=\"col-md-6 text-left\">Return</div>\n                        <div class=\"col-md-6 text-right\">{{this.transactionDtoList.totalAmount | currency:'USD':'true'}}</div>\n                    </div>\n                </button>\n\n            </mat-card-content>\n        </mat-card>\n\n\n    </div>\n</div>\n\n<!-- Start Of payment model -->\n<div class=\"modal fade\" id=\"paymentModel\" role=\"dialog\">\n    <div class=\"modal-dialog modal-lg\">\n\n        <!-- Modal content-->\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h3 class=\"modal-title\">Manage Payment</h3>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n\n            </div>\n            <div class=\"modal-body\">\n\n                <div class=\"row\">\n\n                    <div class=\"col-md-3\">\n                        <h3>Return</h3>\n                    </div>\n\n                    <div class=\"col-md-2\">\n                        <input [(ngModel)]=\"this.payAmountTextBox\" class=\"form-control\" type=\"number\" style=\"color:red\">\n                    </div>\n\n\n                    <div class=\"col-md-4\">\n                        <h3>Return Amount</h3>\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <h3 style=\"color:red\">$ {{this.dueAmountForTransaction | number:'1.2-2'}}</h3>\n                    </div>\n\n                </div>\n\n                <div *ngIf=\"this.paymentObjectForPaymentSellTable.length > 0\" class=\"row\">\n                    <table class=\"table\">\n                        <thead>\n                            <tr>\n                                <th>Payment Type</th>\n                                <th>Amount</th>\n                                <th>Action</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let payment of this.paymentObjectForPaymentSellTable\">\n                                <td>{{payment.paymentType}}</td>\n                                <td>$ {{payment.paymentAmount}}</td>\n                                <td (click)=\"this.deletePaymentFromPaymentModel(payment)\">\n                                    <i class=\"fa fa-trash\"></i>\n                                </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n\n                <div class=\"row\" style=\"margin-top: 30px\">\n                    <div class=\"col-lg-3\">\n                        <button mat-raised-button class=\"primary-button\" (click)=\"this.setPaymentDtoForRetun('Cash',this.payAmountTextBox)\" [disabled]=\"this.disablePaymentButtons\">Cash</button>\n                    </div>\n\n                    <div class=\"col-lg-3\">\n                        <button mat-raised-button class=\"primary-button\" (click)=\"this.setPaymentDtoForRetun('Credit',this.payAmountTextBox)\" [disabled]=\"this.disablePaymentButtons\">Credit</button>\n                    </div>\n\n                    <div class=\"col-lg-3\">\n                        <button mat-raised-button class=\"primary-button\" (click)=\"this.setPaymentDtoForRetun('Debit',this.payAmountTextBox)\" [disabled]=\"this.disablePaymentButtons\">Debit</button>\n                    </div>\n\n                    <div class=\"col-lg-3\">\n                        <button mat-raised-button class=\"primary-button\" (click)=\"this.setPaymentDtoForRetun('Check',this.payAmountTextBox)\" [disabled]=\"this.disablePaymentButtons\">Check</button>\n                    </div>\n                </div>\n\n                <div class=\"row\" style=\"margin-top: 30px\">\n\n                    <div class=\"col-md-3\">\n                        <button (click)=\"this.setPaymentDtoForRetun('OnAccount', this.payAmountTextBox)\" mat-raised-button class=\"secondary-button\" [disabled]=\"this.disableOnAccountButtons\">On Account</button>\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <button mat-raised-button class=\"secondary-button\" [disabled]=\"this.disableStoreCreditButtons\" (click)=\"this.setPaymentDtoForRetun('StoreCredit', this.payAmountTextBox)\">Store Credit</button>\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <button mat-raised-button class=\"secondary-button\" [disabled]=\"true\"></button>\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <button mat-raised-button class=\"secondary-button\" [disabled]=\"true\">Layby</button>\n                    </div>\n                </div>\n\n                <div class=\"row\" style=\"margin-top: 30px\">\n                    <div class=\"col-md-12\">\n                        <input [(ngModel)]=\"this.transactionNotes\" class=\"form-control form-control-lg\" type=\"text\" placeholder=\"Add Sales Notes\">\n                    </div>\n                </div>\n\n                <div class=\"row\" style=\"margin-top: 30px\">\n                    <div class=\"col-md-3\">\n\n                    </div>\n\n                    <div class=\"col-md-6\">\n                        <button mat-raised-button class=\"danger-button\" (click)=\"this.returnSale()\" [disabled]=\"this.disableCompleteSaleButton\">Complete Sale</button>\n                    </div>\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n                </div>\n\n                <div class=\"row\" style=\"margin-top: 30px\" *ngIf=\"null != this.printTransactionDto\">\n                    <div class=\"col-md-3\">\n\n                    </div>\n\n                    <div class=\"col-md-6\">\n                        <button mat-raised-button class=\"danger-button\" (click)=\"this.printReciept()\" data-dismiss=\"modal\" data-toggle=\"modal\">Print Reciept</button>\n                    </div>\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n                </div>\n\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" (click)=\"this.clearAllDateAfterTransactionComplete()\">Close</button>\n            </div>\n\n        </div>\n\n\n    </div>\n\n</div>\n<!-- End of Payment Pop up -->\n\n\n\n<!-- Start of Product and Sale discard Pop up -->\n\n<div class=\"modal fade\" id=\"deleteProduct\" role=\"dialog\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">{{this.popupHeader}}</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n\n            </div>\n            <div class=\"modal-body\">\n                <p>{{this.popupMessage}}</p>\n            </div>\n            <div class=\"modal-footer\">\n\n                <!-- This logic to reuse the model code cause i need popup for delete single product and also delete complete sale -->\n                <button *ngIf=\"this.popupHeader == 'Delete Product' \" type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"this.deleteProduct()\">Yes</button>\n                <button *ngIf=\"this.popupHeader == 'Discard Sale' \" type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"this.disgardCompleteSale()\">Yes</button>\n                <!-- TODO Add one more button for add product if it does not exists -->\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancle</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- End of Product and Sale discard Pop up -->"

/***/ }),

/***/ "../../../../../src/app/sell/return-sale/return-sale.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".borderless td,\n.borderless th {\n  border: none; }\n\n.a :hover {\n  background: #3374C2; }\n\n.wid100 {\n  width: 100% !important; }\n\n.primary-button {\n  background-color: #41AF4B;\n  color: #FFF;\n  height: 50px;\n  width: 100%;\n  font-size: 20px; }\n\n.danger-button {\n  background-color: #dc3545;\n  color: #FFF;\n  height: 50px;\n  width: 100%;\n  font-size: 20px; }\n\n.secondary-button {\n  background-color: #6692B0;\n  height: 50px;\n  width: 100%;\n  color: #FFF;\n  font-size: 20px; }\n\n.customer td,\n.customer th {\n  padding: 10px 10px; }\n\n.customer dl.row {\n  margin: 0px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between; }\n  .customer dl.row dt {\n    text-align: left; }\n  .customer dl.row dd {\n    text-align: right;\n    margin: 0px; }\n\n.sales-total dl {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  font-size: 17px; }\n\n.quantity-updated {\n  background: greenyellow;\n  padding: 9px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/sell/return-sale/return-sale.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ReturnSaleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_sell_sell_service__ = __webpack_require__("../../../../../src/app/sell/sell.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_shared_storesetup_storesetup_service__ = __webpack_require__("../../../../../src/app/shared/storesetup/storesetup.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_customer_customer_service__ = __webpack_require__("../../../../../src/app/customer/customer.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_src_toast_manager__ = __webpack_require__("../../../../ng2-toastr/src/toast-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_src_toast_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_toastr_src_toast_manager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_sell_sale_sale_component__ = __webpack_require__("../../../../../src/app/sell/sale/sale.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_shared_services_persistence_service__ = __webpack_require__("../../../../../src/app/shared/services/persistence.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var ReturnSaleComponent = /** @class */ (function () {
    function ReturnSaleComponent(sellService, persit, storeSetupService, customerService, sanitizer, route, router, toastr) {
        this.sellService = sellService;
        this.persit = persit;
        this.storeSetupService = storeSetupService;
        this.customerService = customerService;
        this.sanitizer = sanitizer;
        this.route = route;
        this.router = router;
        this.toastr = toastr;
        this.isProductExistsInSellList = false;
        this.transactionLineItemDaoList = [];
        this.transactionDtoList = new __WEBPACK_IMPORTED_MODULE_9_app_sell_sale_sale_component__["c" /* TransactionDtoList */]();
        this.paymentDto = new __WEBPACK_IMPORTED_MODULE_9_app_sell_sale_sale_component__["a" /* PaymentDto */]();
        this.a = 'sdfds';
        this.taxPercent = 0.00;
        this.showCustomerDetails = false;
        // disableCustomerSearchTextbox: boolean = false;
        // paymentObjectForPaymentSellTable = new Array <PaymentObjectForPaymentSellTable[]>();
        this.paymentObjectForPaymentSellTable = [];
        // This help when customer has paid full amount, so now user should not able to click on any payment button.
        // These both buttons are on payment page pop up.
        this.disablePaymentButtons = false;
        this.disablePaymentButtonsWithAmount = false;
        this.disableCompleteSaleButton = true;
        this.payLable = 'Pay:';
        this.amountDueLable = 'Amount Due:';
        this.paymentDao = [];
        // This button is on sale page, not on pyament popup page.
        this.paymentButtonOnSale = true;
        this.transactionNotes = '';
        this.disableOnAccountButtons = true;
        this.disableStoreCreditButtons = true;
        this.saleType = 'Return';
        this.printTransactionDto = null;
    }
    ReturnSaleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.storeSetupService.getStoreDetails().
            then(function (data) {
            _this.storeDetails = data;
            _this.taxPercent = _this.storeDetails.tax;
        });
        // This call is to get all customer details.
        this.getCustomerDetails();
        this.cols = [
            { field: 'productNo', header: 'ProductNo' },
            { field: 'description', header: 'Description' },
            { field: 'retail', header: 'Retail' },
            { field: 'defaultQuantity', header: 'Quantity' },
            { field: 'retailDiscount', header: 'RetailWithDis' },
            { field: 'totalProductPrice', header: 'Total' },
            { field: 'quantity', header: 'In-Stock' }
        ];
    };
    ReturnSaleComponent.prototype.ngAfterViewInit = function () {
        // This will focus on the autocomplete field
        $('#productsearch > span > input').focus();
    };
    ReturnSaleComponent.prototype.filterProducts = function (event) {
        var _this = this;
        var query = event.query;
        this.sellService.getProductDetails()
            .subscribe(function (products) {
            // console.log(products);
            _this.product = _this.filterProduct(query, products);
        });
    };
    ReturnSaleComponent.prototype.filterProduct = function (query, products) {
        var filtered = [];
        for (var i = 0; i < products.length; i++) {
            var p = products[i];
            if (p.description.toLowerCase().includes(query.toLowerCase()) || p.productNo.includes(query)) {
                filtered.push(p);
            }
        }
        return filtered;
    };
    // This method helps when user try to change retial price or quanity from the sell text box.
    ReturnSaleComponent.prototype.submitProduct = function (value) {
        if (typeof value === 'string') {
            console.log('This is value: ', value);
            // this is the senario where user is adding new product to Sell
            if (this.product != null && this.product.length > 0) {
                // this.addTransactionLineItem(this.product[0]);
            }
            else if (value !== '' && value !== undefined && value.indexOf('.') !== 0) {
                if (value.match(/[a-z]/i))
                    console.log('contains only charcters');
                // this mean this is decimal value so it will change the retail price of the product
                if (value.match(/[0-9]/i) && value.indexOf('.') > 0)
                    this.updateProductPrice(value);
                else if (value.match(/[0-9]/i) && value.length < 5)
                    this.updateProductQuantity(value);
            }
        }
        else if (value != null) {
            this.addTransactionLineItem(value);
        }
    };
    ReturnSaleComponent.prototype.updateProductQuantity = function (value) {
        console.log('Quantity change');
        this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity = value;
        this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = parseFloat((this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity).toFixed(2));
        this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
        this.setTransactionDtoList(this.transactionLineItemDaoList);
        //this.persit.setProducts(this.transactionLineItemDaoList);
        this.p = null;
    };
    ReturnSaleComponent.prototype.updateProductPrice = function (value) {
        console.log('Price change');
        this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail = value;
        this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = (this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity);
        this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
        this.setTransactionDtoList(this.transactionLineItemDaoList);
        //this.persit.setProducts(this.transactionLineItemDaoList);
        this.p = null;
    };
    // this method helps to update lineItem Detail when user change the quatity or change the retail from editable box
    ReturnSaleComponent.prototype.updateLineItemDetails = function (event) {
        this.transactionLineItemDaoList[event.index].defaultQuantity = event.data.defaultQuantity;
        this.transactionLineItemDaoList[event.index].retail = event.data.retail;
        this.transactionLineItemDaoList[event.index].totalProductPrice = (event.data.defaultQuantity * event.data.retail);
        this.transactionLineItemDaoList[event.index].taxAmountOnProduct = ((event.data.defaultQuantity * event.data.retail) * this.taxPercent) / 100;
        this.setTransactionDtoList(this.transactionLineItemDaoList);
        //this.persit.setProducts(this.transactionLineItemDaoList);
    };
    ReturnSaleComponent.prototype.addTransactionLineItem = function (productObj) {
        productObj.cost = -productObj.cost;
        productObj.retail = -productObj.retail;
        productObj.totalProductPrice = parseFloat(productObj.retail.toFixed(2));
        productObj.taxAmountOnProduct = (productObj.retail * this.taxPercent) / 100;
        console.log("when add product", productObj);
        this.transactionLineItemDaoList.push(productObj);
        this.product = null;
        this.p = null;
        this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
        this.setTransactionDtoList(this.transactionLineItemDaoList);
        // This will save the data into local storage.
        //this.persit.setProducts(this.transactionLineItemDaoList);
        return this.transactionLineItemDaoList;
    };
    ReturnSaleComponent.prototype.setTransactionDtoList = function (lineItem) {
        var totalQuantity = 0;
        var totalPrice = 0.00;
        var tax = 0.00;
        // I do not need this for return sale cause we are not counting customer balance here.
        // if (this.selectedCustomer && this.saleType == 'Complete') {
        //   this.transactionDtoList.totalAmount = this.selectedCustomer.balance
        // }
        // else {
        this.transactionDtoList.totalAmount = 0.00;
        // }
        for (var i = 0; i < lineItem.length; i++) {
            totalQuantity = +lineItem[i].defaultQuantity + totalQuantity;
            totalPrice = +lineItem[i].totalProductPrice + totalPrice;
            // Here totalProductPriceWithTax mean, only amount of the tax on that product dont get confuse with naming
            tax = +(lineItem[i].totalProductPrice * this.taxPercent) / 100 + tax;
            console.log("totalQuantity", totalQuantity);
            console.log("totalPrice", totalPrice);
            console.log("totalTax", tax);
        }
        this.transactionDtoList.quantity = parseFloat(totalQuantity.toFixed(2));
        this.transactionDtoList.subtotal = parseFloat(totalPrice.toFixed(2));
        this.transactionDtoList.tax = parseFloat(tax.toFixed(2));
        this.transactionDtoList.totalAmount = this.transactionDtoList.totalAmount + parseFloat(((totalPrice) + tax).toFixed(2));
        // This logic helps to manage main payment button enable or diable.
        if (this.transactionDtoList.totalAmount == 0) {
            this.paymentButtonOnSale = true;
        }
        else {
            this.paymentButtonOnSale = false;
        }
        // These for sale page pop -- First row.
        this.payAmountTextBox = this.transactionDtoList.totalAmount;
        this.dueAmountForTransaction = this.transactionDtoList.totalAmount;
    };
    ReturnSaleComponent.prototype.getCustomerDetails = function () {
        var _this = this;
        this.customerService.getCustomerDetails()
            .subscribe(function (customer) {
            _this.customerDto = customer;
        });
    };
    ReturnSaleComponent.prototype.setProductForDelete = function (product) {
        this.selectedProduct = product;
        this.popupHeader = 'Delete Product';
        this.popupMessage = 'Are You Sure You Want To Delete Product?';
    };
    ReturnSaleComponent.prototype.filterCustomers = function (event) {
        var _this = this;
        var query = event.query;
        this.customerService.getCustomerDetails()
            .subscribe(function (customers) {
            // console.log(products);
            _this.filteredCustomer = _this.filterCustomer(query, customers);
        });
    };
    ReturnSaleComponent.prototype.filterCustomer = function (query, customers) {
        var filtered = [];
        for (var i = 0; i < customers.length; i++) {
            var cust = customers[i];
            if (cust.name.toLowerCase().includes(query.toLowerCase()) || cust.companyName.toLowerCase().includes(query.toLowerCase()) || cust.phoneNo.includes(query)) {
                filtered.push(cust);
            }
        }
        return filtered;
    };
    ReturnSaleComponent.prototype.submitCustomer = function (a) {
        this.selectedCustomer = a;
        if (this.selectedCustomer.type == 'Business') {
            this.taxPercent = 0;
        }
        // this.cust = null;
        // this.disableCustomerSearchTextbox = true;
        // Storing customer detials into local storage.
        //this.persit.setCustomerDetailsForSale(this.selectedCustomer);
        // Need to do this to add balance into transaction details
        //this.setTransactionDtoList(this.transactionLineItemDaoList);
        console.log('customer', this.selectedCustomer);
    };
    // This will remove the customer from local storage.
    ReturnSaleComponent.prototype.removeCustomerOnSale = function () {
        //this.persit.clearCustomer();
        this.selectedCustomer = null;
        this.cust = null;
        // this.disableCustomerSearchTextbox = false;
        //this.setTransactionDtoList(this.transactionLineItemDaoList);
    };
    // This methode calls when user click on the payment button.
    ReturnSaleComponent.prototype.setDataForPaymentModel = function () {
        // payaccountTextBox is bind with two binding so i need to intialize here, so i can show data on payment popup load.
        this.payAmountTextBox = this.dueAmountForTransaction;
        this.disablePaymentButtons = false;
        this.disablePaymentButtonsWithAmount = false;
        this.disableCompleteSaleButton = true;
        this.disableOnAccountButtons = this.selectedCustomer == null;
        // This mean this customer has some store credit to use so i need to enable store credit button.
        if (this.selectedCustomer) {
            this.disableStoreCreditButtons = false;
        }
        else {
            this.disableStoreCreditButtons = true;
        }
        console.log("selected customer", this.selectedCustomer);
        console.log("inside the set data");
    };
    ReturnSaleComponent.prototype.deleteProduct = function () {
        console.log("inside delete");
        var index = this.transactionLineItemDaoList.indexOf(this.selectedProduct, 0);
        console.log("index", index);
        if (index > -1) {
            this.transactionLineItemDaoList.splice(index, 1);
            this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
            this.setTransactionDtoList(this.transactionLineItemDaoList);
            this.persit.setProducts(this.transactionLineItemDaoList);
        }
    };
    ReturnSaleComponent.prototype.setPaymentDtoForRetun = function (paymentType, paymentAmount) {
        this.payLable = 'Return';
        this.amountDueLable = 'Return Amount:';
        if (paymentType == 'Cash') {
            this.paymentDto.cash = paymentAmount;
            this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Cash', 'paymentAmount': paymentAmount });
            this.validatePaymentForReturn();
        }
        else if (paymentType == 'Credit') {
            this.paymentDto.credit = paymentAmount;
            this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Credit', 'paymentAmount': paymentAmount });
            this.validatePaymentForReturn();
        }
        else if (paymentType == 'Debit') {
            this.paymentDto.debit = paymentAmount;
            this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Debit', 'paymentAmount': paymentAmount });
            this.validatePaymentForReturn();
        }
        else if (paymentType == 'Check') {
            this.paymentDto.checkAmount = paymentAmount;
            this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Check', 'paymentAmount': paymentAmount });
            this.validatePaymentForReturn();
        }
        else if (paymentType == 'StoreCredit') {
            // Converting negative amount to positive so i can add this amount in backend.
            this.paymentDto.storeCredit = Math.abs(paymentAmount);
            this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': paymentAmount });
            this.disableStoreCreditButtons = true;
            this.validatePaymentForReturn();
        }
        else if (paymentType == 'OnAccount') {
            // Converting negative amount to positive so i can add this amount in backend.
            this.paymentDto.onAccount = Math.abs(paymentAmount);
            this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'OnAccount', 'paymentAmount': paymentAmount });
            this.disableOnAccountButtons = true;
            this.validatePaymentForReturn();
        }
    };
    ReturnSaleComponent.prototype.setHeaderAndMessageForDisgardPopup = function () {
        this.popupHeader = 'Discard Sale';
        this.popupMessage = 'Are You Sure You Want To Delete Complete Sale?';
    };
    //This methode will completly remove the all transaction line item and transaction details.
    ReturnSaleComponent.prototype.disgardCompleteSale = function () {
        this.transactionLineItemDaoList = [];
        // This is very import fist i need to remove the cusotmer details and then only call set transaction otherwise customer balace will stays and will show amount on payment which is wrong.
        this.selectedCustomer = null;
        this.setTransactionDtoList([]);
    };
    ReturnSaleComponent.prototype.validatePaymentForReturn = function () {
        this.disablePaymentButtons = true;
        this.disableCompleteSaleButton = false;
    };
    ReturnSaleComponent.prototype.clearAllDateAfterTransactionComplete = function () {
        // This is important to handle when user clock on Close button from payment popup, we need to clear data only when transaction is completed ottherwise just need to close the popup.
        if (null != this.printTransactionDto) {
            // Very importa can not assign to null
            this.paymentDto = new __WEBPACK_IMPORTED_MODULE_9_app_sell_sale_sale_component__["a" /* PaymentDto */]();
            this.selectedCustomer = null;
            // this.disableCustomerSearchTextbox = false;
            this.paymentObjectForPaymentSellTable = [];
            // This is payment button on the sale page, i need to do this because there is not data in sale table,
            this.paymentButtonOnSale = true;
            this.transactionLineItemDaoList = [];
            this.setTransactionDtoList(this.transactionLineItemDaoList);
            this.paymentDao = [];
            // Need set it null cause its showing in next transaction also.
            this.transactionNotes = '';
            // very important cause this will give problem after doing return transaction so, after any transactoin i need to do this.
            this.saleType = 'Complete';
            this.disableStoreCreditButtons = true;
            this.printTransactionDto = null;
        }
        else {
            console.log('just close the model.');
        }
    };
    // This method helps to delete payment type and recaculate all other parameters.
    ReturnSaleComponent.prototype.deletePaymentFromPaymentModel = function (payment) {
        var index = this.paymentObjectForPaymentSellTable.indexOf(payment);
        if (index > -1) {
            this.paymentObjectForPaymentSellTable.splice(index, 1);
            this.dueAmountForTransaction = payment.paymentAmount;
            this.payAmountTextBox = this.dueAmountForTransaction;
            this.disablePaymentButtons = false;
            this.disableCompleteSaleButton = true;
        }
    };
    ReturnSaleComponent.prototype.returnSale = function () {
        var _this = this;
        this.transactionDtoList.status = 'Return';
        this.transactionDtoList.date = __WEBPACK_IMPORTED_MODULE_5_moment__(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        // setting customer details
        if (null != this.selectedCustomer && this.selectedCustomer != undefined) {
            this.transactionDtoList.customerPhoneno = this.selectedCustomer.phoneNo;
            this.transactionDtoList.customerFirstLastName = this.selectedCustomer.name;
            this.transactionDtoList.previousBalance = this.selectedCustomer.balance;
        }
        // Setting payment dto into transaction dto, because can not send both as @request body mfrom angular..
        this.paymentDto.date = this.transactionDtoList.date;
        this.paymentDao.push(this.paymentDto);
        this.transactionDtoList.paymentDao = this.paymentDao;
        // Setting TransactionLineItemDetails
        for (var _i = 0, _a = this.transactionLineItemDaoList; _i < _a.length; _i++) {
            var lineItem = _a[_i];
            lineItem.status = this.saleType;
            lineItem.date = this.transactionDtoList.date;
            // I need to do this casue in backend i am using quantity and here i have to use defult quanity to show 1 as user insert product.
            lineItem.quantity = lineItem.defaultQuantity;
        }
        // Seeting paymentDto status
        for (var _b = 0, _c = this.paymentDao; _b < _c.length; _b++) {
            var payment = _c[_b];
            payment.status = this.saleType;
        }
        // this.transactionNotes is bind with the ng model on ui.
        this.transactionDtoList.note = this.transactionNotes;
        // To do need to fix this hardcoded value for username
        this.transactionDtoList.username = 'alok@alok.com';
        this.transactionDtoList.transactionLineItemDaoList = this.transactionLineItemDaoList;
        // NOW MAKING SERVICE CALL TO ADD TRANSACTION AND LINE ITEM DETAILS AND WILL ADD LINE ITEM DETAILS ONLY IF ADD TRANASACTION CALL IS SUCCESS !!!
        this.sellService.addTransactionDetails(this.transactionDtoList)
            .subscribe(function (data) {
            // alert('ok');
            _this.disableCompleteSaleButton = true;
            _this.printTransactionDto = data.json();
            console.log('addTransaction response', data);
            console.log('printTransaction dao', _this.printTransactionDto);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        }, function () {
        });
        //this.disableCompleteSaleButton = true;
        console.log('Transaction Details', this.transactionDtoList);
        console.log('TransactionLineItem Details', this.transactionLineItemDaoList);
        console.log('Payment Dto', this.paymentDto);
        //this.disablePaymentButtons = true;
        console.log("done with sales");
        // This will focus on the autocomplete field
        $('#productsearch > span > input').focus();
    };
    ReturnSaleComponent.prototype.printReciept = function () {
        this.sellService.printReceipt(this.printTransactionDto);
        this.clearAllDateAfterTransactionComplete();
        $('#paymentModel').modal('toggle');
    };
    ReturnSaleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-return-sale',
            template: __webpack_require__("../../../../../src/app/sell/return-sale/return-sale.component.html"),
            styles: [__webpack_require__("../../../../../src/app/sell/return-sale/return-sale.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_sell_sell_service__["a" /* SellService */],
            __WEBPACK_IMPORTED_MODULE_10_app_shared_services_persistence_service__["a" /* PersistenceService */],
            __WEBPACK_IMPORTED_MODULE_3_app_shared_storesetup_storesetup_service__["a" /* StoreSetupService */],
            __WEBPACK_IMPORTED_MODULE_4_app_customer_customer_service__["a" /* CustomerService */],
            __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser__["DomSanitizer"],
            __WEBPACK_IMPORTED_MODULE_7__angular_router__["ActivatedRoute"],
            __WEBPACK_IMPORTED_MODULE_7__angular_router__["Router"],
            __WEBPACK_IMPORTED_MODULE_8_ng2_toastr_src_toast_manager__["ToastsManager"]])
    ], ReturnSaleComponent);
    return ReturnSaleComponent;
}());



/***/ }),

/***/ "../../../../../src/app/sell/sale/sale.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n    <div class=\"col-lg-9\">\n        <mat-card>\n            <div class=\"row\">\n                <div class=\"align-self-center col-lg-7\" style=\"max-height: 500px !important;\">\n\n                    <p-autoComplete id=\"productsearch\" [(ngModel)]=\"p\" class=\"full-width m-1\" [suggestions]=\"product\" placeholder=\"Scan or Search Product\" (onFocus)=\"print($event)\" (onBlur)=\"print($event)\" (completeMethod)=\"filterProducts($event)\" name=\"test\" [minLength]=\"3\"\n                        (keyup.enter)=\"submitProduct(p)\" field=\"description\">\n                        <ng-template>\n                            <span style=\"max-width:500px !important\">\n                                </span>\n                        </ng-template>\n                    </p-autoComplete>\n                    <!-- <button (click)=\"this.testFocus()\">Click me</button> -->\n\n                </div>\n                <div class=\"col-lg-0\"></div>\n                <div class=\"col-lg-5 d-flex justify-content-end\">\n                    <!-- Buttons go here  -->\n                    <button (click)=\"this.parkSale()\" class=\"bg-primary text-white action-button m-1\" mat-raised-button [disabled]=\"this.paymentButtonOnSale\">\n                        <span>\n                            <i class=\"fa fa-history\">\n                                Park Sale\n                            </i>\n                        </span>\n                    </button>\n                    <button class=\"bg-danger text-white action-button m-1\" mat-raised-button data-toggle=\"modal\" data-target=\"#deleteProduct\" (click)=\"this.setHeaderAndMessageForDisgardPopup()\" [disabled]=\"this.paymentButtonOnSale\">\n                        <span>\n                            <i class=\"fa fa-trash\">\n                                Discard Sale\n                            </i>\n                        </span>\n                    </button>\n                    <button class=\"bg-primary text-white  action-button m-1\" mat-raised-button>\n                        <span>\n                            <i class=\"fa fa-th\">\n                                Show Grid\n                            </i>\n                        </span>\n                    </button>\n                    <!-- <button class=\"bg-primary text-white  action-button m-1\" mat-raised-button (click)=\"this.openSellCustomerView()\">\n                        <span>\n                            <i class=\"fa fa-user\">\n                                Customer View\n                            </i>\n                        </span>\n                    </button> -->\n                </div>\n            </div>\n            <!-- <div class=\"row m-2\">\n                <app-receipt [data]=\"this.recieptData\"></app-receipt>\n            </div> -->\n        </mat-card>\n        <!-- <br/> -->\n        <mat-card>\n            <!-- <mat-card-title></mat-card-title> -->\n            <mat-card-content>\n                <div class=\"row p-md-3\">\n                    <!-- Product Table -->\n                    <p-dataTable [value]=\"this.transactionLineItemDaoList\" scrollable=\"true\" [responsive]=\"true\" scrollHeight=\"300px\" [editable]=\"true\" (onEditComplete)=\"updateLineItemDetails($event)\">\n                        <p-header>Product Sale Table</p-header>\n\n                        <p-column field=\"productNo\" header=\"ProductNo\" [style]=\"{'width':'15%','text-align':'center', 'overflow':'visible'}\"></p-column>\n                        <p-column field=\"description\" header=\"Description\" [style]=\"{'width':'45%','text-align':'center', 'overflow':'visible'}\"></p-column>\n                        <p-column field=\"defaultQuantity\" header=\"Quantity\" [editable]=\"true\">\n                            <ng-template let-product=\"rowData\" pTemplate=\"body\">\n                                <div id=\"lineitem{{product.productNo}}\" [ngClass]=\"{'quantity-updated': product.quantityUpdated }\">\n                                    {{product.defaultQuantity}}\n                                </div>\n                            </ng-template>\n                        </p-column>\n                        <p-column field=\"actualRetail\" header=\"Retail\"></p-column>\n                        <p-column field=\"retail\" header=\"RetWtDis\" [editable]=\"true\"></p-column>\n                        <p-column field=\"quantity\" header=\"Stock\"></p-column>\n                        <p-column field=\"totalProductPrice\" header=\"Total\"></p-column>\n                        <p-column header=\"\" styleClass=\"col-button\" [style]=\"{'width':'5%','text-align':'center', 'overflow':'visible'}\">\n\n                            <ng-template let-product=\"rowData\" pTemplate=\"body\">\n                                <button mat-button class=\"btn-red action-button-table\" mat-button (click)=\"this.setProductForDelete(product)\" data-toggle=\"modal\" data-target=\"#deleteProduct\">\n                                    <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n                                </button>\n                            </ng-template>\n                        </p-column>\n\n\n                    </p-dataTable>\n                </div>\n            </mat-card-content>\n        </mat-card>\n\n    </div>\n    <div class=\"col-lg-3\">\n        <mat-card>\n            <mat-card-content>\n                <div class=\"row\">\n                    <div class=\"input-group\">\n                        <span class=\"input-group-addon\" id=\"basic-addon1\">\n                            <i class=\"fa fa-user-plus\" aria-hidden=\"true\"></i>\n                        </span>\n                        <p-autoComplete id =\"customerSearch\" [(ngModel)]=\"this.selectedCustomer\" [field]=\"'name'\" [suggestions]=\"filteredCustomer\" (completeMethod)=\"this.filterCustomers($event)\" class=\"full-width\" [minLength]=\"1\" (keyup.enter)=\"this.submitCustomer()\" (onClear)=\"this.removeCustomerOnSale()\">\n                            <ng-template let-c pTemplate=\"item\">\n                                <div class=\"ui-helper-clearfix\" style=\"border-bottom:1px solid #D5D5D5\">\n                                    <div style=\"width:32px;display:inline-block;margin:5px 0 2px 5px\">{{c.name}}</div>\n                                    <div style=\"font-size:18px;float:right;margin:10px 10px 0 0\">{{c.phoneNo}}</div>\n                                </div>\n                            </ng-template>\n\n                        </p-autoComplete>\n\n                    </div>\n                </div>\n                <br/>\n                <div *ngIf=\"this.selectedCustomer\">\n                    <table class=\"table table-bordered customer\">\n\n                        <tbody>\n                            <tr>\n                                <td>\n                                    <dl class=\"row\">\n                                        <dt class=\"\">Name:</dt>\n                                        <dd class=\"\">{{this.selectedCustomer.name}}</dd>\n                                    </dl>\n                                </td>\n                                <td>\n                                    <dl class=\"row\">\n                                        <dt class=\"\">Phone:</dt>\n                                        <dd class=\"\">{{this.selectedCustomer.phoneNo}}</dd>\n                                    </dl>\n                                </td>\n                            </tr>\n                            <tr>\n                                <td>\n                                    <dl class=\"row\">\n                                        <dt class=\"\">Balance:</dt>\n                                        <dd class=\"\">{{this.selectedCustomer.balance | currency:'USD':'true'}}</dd>\n                                    </dl>\n                                </td>\n                                <td>\n                                    <dl class=\"row\">\n                                        <dt class=\"\">Credit:</dt>\n                                        <dd class=\"\">{{this.selectedCustomer.storeCredit | currency:'USD':'true'}}</dd>\n                                    </dl>\n                                </td>\n                            </tr>\n                            <tr>\n                                <td>\n                                    <dl class=\"row\">\n                                        <dt class=\"\">Spending:</dt>\n                                        <dd class=\"\"></dd>\n                                    </dl>\n                                </td>\n                                <td>\n                                    <dl class=\"row\">\n                                        <dt class=\"\">Loyalty:</dt>\n                                        <dd class=\"\"></dd>\n                                    </dl>\n\n                                </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n                <div class=\"sales-total p-md-4\">\n\n                    <dl class=\"row\">\n                        <dt class=\"\">Sub-total</dt>\n                        <dd class=\"\">{{this.transactionDtoList.subtotal | currency:'USD':'true'}}</dd>\n                    </dl>\n                    <dl class=\"row\">\n                        <dt class=\"\">\n                            <a #discount id=\"discount-popover\" href=\"javascript:void(0)\" (click)=\"this.showPopover(discount)\">\n                                Discount\n                            </a>\n                        </dt>\n                        <dd class=\"\">{{this.transactionDtoList.totalDiscount | currency:'USD':'true'}}</dd>\n                    </dl>\n                    <dl class=\"row\">\n                        <dt *ngIf=\"this.taxPercent == 7\">\n                        <a  href=\"javascript:void(0)\" (click)=\"this.taxPercent = 0\">\n                                Tax ({{this.taxPercent}}%)\n                        </a>\n                        </dt>\n\n                        <dt *ngIf=\"this.taxPercent == 0\">\n\n                            <a  href=\"javascript:void(0)\" (click)=\"this.taxPercent = 7\">\n                                    No Tax\n                                    <!-- ({{this.taxPercent}}%) -->\n                            </a>\n                        </dt>\n                        <dd class=\"\">{{this.transactionDtoList.tax | currency:'USD':'true'}}</dd>\n                    </dl>\n                    <dl class=\"row\">\n                        <dt class=\"\">Quantity</dt>\n                        <dd class=\"\">{{this.transactionDtoList.quantity}}</dd>\n                    </dl>\n                    <dl class=\"row\" *ngIf=\"this.selectedCustomer != null && this.selectedCustomer.balance > 0\">\n                        <dt class=\"\">Pre Balance</dt>\n                        <dd class=\"\">{{this.selectedCustomer.balance | currency:'USD':'true'}}</dd>\n                    </dl>\n                    <dl class=\"row\">\n                        <dt class=\"\">Total</dt>\n                        <dd class=\"\">{{this.transactionDtoList.totalAmount | currency:'USD':'true'}}</dd>\n                    </dl>\n                </div>\n                <button *ngIf=\"this.saleType == 'Complete' \" mat-raised-button [disabled]=\"this.paymentButtonOnSale\" type=\"button\" (click)=\"this.setDataForPaymentModel()\" data-toggle=\"modal\" data-target=\"#paymentModel\" style=\"width: 100%; font-size: 20px\" class=\"btn btn-green btn-lg text-white m-md-1 p-md-2\">\n                    <div class=\"row p-md-1 font-weight-bold\">\n                        <div class=\"col-md-6 text-left\">Payment</div>\n                        <div class=\"col-md-6 text-right\">{{this.transactionDtoList.totalAmount | currency:'USD':'true'}}</div>\n                    </div>\n                </button>\n\n                <button *ngIf=\"this.saleType == 'Return' \" mat-raised-button [disabled]=\"this.paymentButtonOnSale\" type=\"button\" (click)=\"this.setDataForPaymentModelForReturnSale()\" data-toggle=\"modal\" data-target=\"#paymentModel\" style=\"width: 100%; font-size: 20px\"\n                    class=\"btn btn-red btn-lg text-white m-md-1 p-md-2\">\n                    <div class=\"row p-md-1 font-weight-bold\">\n                        <div class=\"col-md-6 text-left\">Return</div>\n                        <div class=\"col-md-6 text-right\">{{this.transactionDtoList.totalAmount | currency:'USD':'true'}}</div>\n                    </div>\n                </button>\n\n            </mat-card-content>\n        </mat-card>\n\n\n    </div>\n</div>\n\n<!-- Popover -->\n<div #popover *ngIf=\"this.popoverStyle\" class=\"popover fade bs-popover-left show\" role=\"tooltip\" [style]=\"this.popoverStyle\">\n    <div class=\"arrow\" style=\"top: 82px;\"></div>\n    <h3 class=\"popover-header\">\n        Apply Discount For Sale\n    </h3>\n    <div class=\"popover-body\">\n        <!-- <button mat-raised-button class=\"action-button\" (click)=\"this.setDiscountType('By Percentage')\"> % </button>\n        <button mat-raised-button class=\"action-button\" (click)=\"this.setDiscountType('By Amount')\"> $ </button> -->\n        <div class=\"row\">\n            <div class=\"col-md-5\">\n                <mat-input-container>\n                    <input matInput [(ngModel)]=\"this.discountValue\" type=\"text\" placeholder=\"Add Discount\">\n                </mat-input-container>\n            </div>\n            <div class=\"col-md-7\">\n                <mat-radio-group class=\"m-t-5\" [(ngModel)]=\"this.discountType\">\n                    <mat-radio-button class=\"p-md-2 m-r-20\" value=\"By Amount\"> $</mat-radio-button>\n                    <mat-radio-button class=\"p-md-2 m-r-20\" value=\"By Percentage\"> %</mat-radio-button>\n                </mat-radio-group>\n            </div>\n        </div>\n    </div>\n    <div class=\"d-flex justify-content-center  p-md-3\">\n        <button mat-button class=\"btn-red action-button-table\" (click)=\"this.calculateDiscount(this.discountValue)\">\n                        Apply\n            </button>\n\n\n    </div>\n</div>\n<!-- End of Discount pophover -->\n\n\n\n<!-- Start of Product and Sale discard Pop up -->\n\n<div class=\"modal fade\" id=\"deleteProduct\" role=\"dialog\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">{{this.popupHeader}}</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n\n            </div>\n            <div class=\"modal-body\">\n                <p>{{this.popupMessage}}</p>\n            </div>\n            <div class=\"modal-footer\">\n\n                <!-- This logic to reuse the model code cause i need popup for delete single product and also delete complete sale -->\n                <button *ngIf=\"this.popupHeader == 'Delete Product' \" type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"this.deleteProduct()\">Yes</button>\n                <button *ngIf=\"this.popupHeader == 'Discard Sale' \" type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"this.disgardCompleteSale()\">Yes</button>\n                <!-- TODO Add one more button for add product if it does not exists -->\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancle</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- End of Product and Sale discard Pop up -->\n\n\n<!-- Start Of payment model -->\n<div class=\"modal fade\" id=\"paymentModel\" role=\"dialog\">\n    <div class=\"modal-dialog modal-lg\">\n\n        <!-- Modal content-->\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h3 class=\"modal-title\">Manage Payment</h3>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n\n            </div>\n            <div class=\"modal-body\">\n\n                <div class=\"row\">\n\n                    <div class=\"col-md-3\">\n                        <h3>{{this.payLable}}</h3>\n                    </div>\n\n                    <div class=\"col-md-2\">\n                        <input [(ngModel)]=\"this.payAmountTextBox\" class=\"form-control\" type=\"number\" [style.color]=\"this.dueAmountForTransaction <=0 ? 'green' : 'red' \">\n                    </div>\n\n\n                    <div class=\"col-md-4\">\n                        <h3>{{this.amountDueLable}}</h3>\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <h3 [style.color]=\"this.dueAmountForTransaction <=0 ? 'green' : 'red' \">$ {{this.dueAmountForTransaction | number:'1.2-2'}}</h3>\n                    </div>\n\n                </div>\n\n                <div *ngIf=\"this.paymentObjectForPaymentSellTable.length > 0\" class=\"row\">\n                    <table class=\"table\">\n                        <thead>\n                            <tr>\n                                <th>Payment Type</th>\n                                <th>Amount</th>\n                                <th>Action</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr *ngFor=\"let payment of this.paymentObjectForPaymentSellTable\">\n                                <td>{{payment.paymentType}}</td>\n                                <td>$ {{payment.paymentAmount}}</td>\n                                <td (click)=\"this.deletePaymentFromPaymentModel(payment)\">\n                                    <i class=\"fa fa-trash\"></i>\n                                </td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n\n                <div class=\"row\" style=\"margin-top: 30px\">\n                    <div class=\"col-lg-3\">\n                        <button mat-raised-button class=\"primary-button\" (click)=\"this.setPaymentDto('Cash',this.payAmountTextBox)\" [disabled]=\"this.disablePaymentButtons\">Cash</button>\n                    </div>\n\n                    <div class=\"col-lg-3\">\n                        <button mat-raised-button class=\"primary-button\" (click)=\"this.setPaymentDto('Credit',this.payAmountTextBox)\" [disabled]=\"this.disablePaymentButtons\">Credit</button>\n                    </div>\n\n                    <div class=\"col-lg-3\">\n                        <button mat-raised-button class=\"primary-button\" (click)=\"this.setPaymentDto('Debit',this.payAmountTextBox)\" [disabled]=\"this.disablePaymentButtons\">Debit</button>\n                    </div>\n\n                    <div class=\"col-lg-3\">\n                        <button mat-raised-button class=\"primary-button\" (click)=\"this.setPaymentDto('Check',this.payAmountTextBox)\" [disabled]=\"this.disablePaymentButtons\">Check</button>\n                    </div>\n                </div>\n                <div class=\"row\" style=\"margin-top: 30px\">\n\n                    <div class=\"col-md-2\">\n                        <button mat-raised-button class=\"primary-button\" (click)=\"this.setPaymentDto('Cash', 1)\" [disabled]=\"this.disablePaymentButtonsWithAmount\">$1</button>\n                    </div>\n\n                    <div class=\"col-md-2\">\n                        <button mat-raised-button class=\"primary-button\" (click)=\"this.setPaymentDto('Cash', 5)\" [disabled]=\"this.disablePaymentButtonsWithAmount\">$5</button>\n                    </div>\n\n                    <div class=\"col-md-2\">\n                        <button mat-raised-button class=\"primary-button\" (click)=\"this.setPaymentDto('Cash', 10)\" [disabled]=\"this.disablePaymentButtonsWithAmount\">$10</button>\n                    </div>\n\n                    <div class=\"col-md-2\">\n                        <button mat-raised-button class=\"primary-button\" (click)=\"this.setPaymentDto('Cash', 20)\" [disabled]=\"this.disablePaymentButtonsWithAmount\">$20</button>\n                    </div>\n\n                    <div class=\"col-md-2\">\n                        <button mat-raised-button class=\"primary-button\" (click)=\"this.setPaymentDto('Cash', 50)\" [disabled]=\"this.disablePaymentButtonsWithAmount\">$50</button>\n                    </div>\n\n                    <div class=\"col-md-2\">\n                        <button mat-raised-button class=\"primary-button\" (click)=\"this.setPaymentDto('Cash', 100)\" [disabled]=\"this.disablePaymentButtonsWithAmount\">$100</button>\n                    </div>\n                </div>\n                <div class=\"row\" style=\"margin-top: 30px\">\n\n                    <div class=\"col-md-3\">\n                        <button (click)=\"this.setPaymentDto('OnAccount', this.payAmountTextBox)\" mat-raised-button class=\"secondary-button\" [disabled]=\"this.disableOnAccountButtons\">On Account</button>\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <button mat-raised-button class=\"secondary-button\" [disabled]=\"this.disableStoreCreditButtons\" (click)=\"this.setPaymentDto('StoreCredit', this.selectedCustomer.storeCredit)\">Store Credit</button>\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <button mat-raised-button class=\"secondary-button\" [disabled]=\"false\">Loyalty($ 2.70)</button>\n                    </div>\n\n                    <div class=\"col-md-3\">\n                        <button mat-raised-button class=\"secondary-button\" [disabled]=\"true\">Layby</button>\n                    </div>\n                </div>\n\n                <div class=\"row\" style=\"margin-top: 30px\">\n                    <div class=\"col-md-12\">\n                        <input [(ngModel)]=\"this.transactionNotes\" class=\"form-control form-control-lg\" type=\"text\" placeholder=\"Add Sales Notes\">\n                    </div>\n                </div>\n\n                <div class=\"row\" style=\"margin-top: 30px\">\n                    <div class=\"col-md-3\">\n\n                    </div>\n\n                    <div class=\"col-md-6\">\n                        <button mat-raised-button [ngClass]=\"{'primary-button': this.saleType == 'Complete', 'danger-button': this.saleType == 'Return' }\" (click)=\"this.completeSale()\" [disabled]=\"this.disableCompleteSaleButton\">Complete Sale</button>\n                    </div>\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n                </div>\n\n                <div class=\"row\" style=\"margin-top: 30px\" *ngIf=\"null != this.printTransactionDto\">\n                    <div class=\"col-md-3\">\n\n                    </div>\n\n                    <div class=\"col-md-6\">\n                        <button mat-raised-button [ngClass]=\"{'primary-button': this.saleType == 'Complete', 'danger-button': this.saleType == 'Return' }\" (click)=\"this.printReciept()\" data-dismiss=\"modal\" data-toggle=\"modal\">Print Reciept</button>\n                    </div>\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n                </div>\n\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" (click)=\"this.clearAllDateAfterTransactionComplete()\">Close</button>\n            </div>\n\n        </div>\n\n\n    </div>\n\n</div>\n<!-- End of Payment Pop up -->"

/***/ }),

/***/ "../../../../../src/app/sell/sale/sale.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".borderless td,\n.borderless th {\n  border: none; }\n\n.a :hover {\n  background: #3374C2; }\n\n.wid100 {\n  width: 100% !important; }\n\n.primary-button {\n  background-color: #41AF4B;\n  color: #FFF;\n  height: 50px;\n  width: 100%;\n  font-size: 20px; }\n\n.danger-button {\n  background-color: #dc3545;\n  color: #FFF;\n  height: 50px;\n  width: 100%;\n  font-size: 20px; }\n\n.secondary-button {\n  background-color: #6692B0;\n  height: 50px;\n  width: 100%;\n  color: #FFF;\n  font-size: 20px; }\n\n.customer td,\n.customer th {\n  padding: 10px 10px; }\n\n.customer dl.row {\n  margin: 0px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between; }\n  .customer dl.row dt {\n    text-align: left; }\n  .customer dl.row dd {\n    text-align: right;\n    margin: 0px; }\n\n.sales-total dl {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  font-size: 17px; }\n\n.quantity-updated {\n  background: greenyellow;\n  padding: 9px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/sell/sale/sale.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SaleComponent; });
/* unused harmony export Product */
/* unused harmony export TransactionLineItemDaoList */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return TransactionDtoList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PaymentDto; });
/* unused harmony export PaymentObjectForPaymentSellTable */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_sell_sell_service__ = __webpack_require__("../../../../../src/app/sell/sell.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_shared_storesetup_storesetup_service__ = __webpack_require__("../../../../../src/app/shared/storesetup/storesetup.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_customer_customer_service__ = __webpack_require__("../../../../../src/app/customer/customer.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_customer_customer_component__ = __webpack_require__("../../../../../src/app/customer/customer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_shared_animations_fade_in_animation__ = __webpack_require__("../../../../../src/app/shared/animations/fade-in.animation.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng2_toastr_src_toast_manager__ = __webpack_require__("../../../../ng2-toastr/src/toast-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_ng2_toastr_src_toast_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_ng2_toastr_src_toast_manager__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_app_shared_services_persistence_service__ = __webpack_require__("../../../../../src/app/shared/services/persistence.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var SaleComponent = /** @class */ (function () {
    function SaleComponent(sellService, persit, storeSetupService, customerService, sanitizer, route, router, toastr) {
        this.sellService = sellService;
        this.persit = persit;
        this.storeSetupService = storeSetupService;
        this.customerService = customerService;
        this.sanitizer = sanitizer;
        this.route = route;
        this.router = router;
        this.toastr = toastr;
        this.myControl = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]();
        this.product = [];
        this.isProductExistsInSellList = false;
        this.transactionDtoList = new TransactionDtoList();
        this.paymentDto = new PaymentDto();
        this.a = 'sdfds';
        this.showCustomerDetails = false;
        // disableCustomerSearchTextbox: boolean = false;
        // paymentObjectForPaymentSellTable = new Array <PaymentObjectForPaymentSellTable[]>();
        this.paymentObjectForPaymentSellTable = [];
        // This help when customer has paid full amount, so now user should not able to click on any payment button.
        // These both buttons are on payment page pop up.
        this.disablePaymentButtons = false;
        this.disablePaymentButtonsWithAmount = false;
        this.disableCompleteSaleButton = true;
        this.payLable = 'Pay:';
        this.amountDueLable = 'Amount Due:';
        this.paymentDao = [];
        // This button is on sale page, not on pyament popup page.
        this.paymentButtonOnSale = true;
        this.transactionNotes = '';
        this.disableOnAccountButtons = true;
        this.disableStoreCreditButtons = true;
        this.saleType = 'Complete';
        this.taxPercent = 0.00;
        this.printTransactionDto = null;
    }
    // 
    SaleComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.items = [
            { name: 'Return', icon: 'fa fa-reply-all fa-x', link: '/return' },
            // { name: 'Refund', icon: 'fa fa-list fa-x', link: '/sell/refund' },
            { name: 'Purchase Order', icon: 'fa fa-bookmark fa-x', link: '/sell/purchaseOrder' }
        ];
        var transactionComId = this.route.snapshot.paramMap.get('transactionComId');
        if (transactionComId) {
            this.handleParkedTransactionFromSalesHistory(transactionComId);
        }
        // This call is to get all customer details.
        this.getCustomerDetails();
        // Here i am checking that customer already selected on sale page or not.
        this.selectedCustomer = this.persit.getCustomerDetailsForSale();
        this.cols = [
            { field: 'productNo', header: 'ProductNo' },
            { field: 'description', header: 'Description' },
            { field: 'retail', header: 'Retail' },
            { field: 'defaultQuantity', header: 'Quantity' },
            { field: 'retailDiscount', header: 'RetailWithDis' },
            { field: 'totalProductPrice', header: 'Total' },
            { field: 'quantity', header: 'In-Stock' }
        ];
        console.log(this.persit.getProducts());
        this.transactionLineItemDaoList = this.persit.getProducts() || [];
        // this will show transaction data on right side on refresh or on load of the page
        this.setTransactionDtoList(this.transactionLineItemDaoList);
        // this.toastr.success("Sell component initiated", "Nice!");
        this.storeSetupService.getStoreDetails().
            then(function (data) {
            _this.storeDetails = data;
            if (_this.selectedCustomer != null && _this.selectedCustomer.type == 'Business') {
                _this.taxPercent = 0.00;
            }
            else {
                _this.taxPercent = _this.storeDetails.tax;
            }
            console.log('Store Details', _this.storeDetails);
        });
    };
    SaleComponent.prototype.ngAfterViewInit = function () {
        // This will focus on the autocomplete field
        $('#productsearch > span > input').focus();
    };
    SaleComponent.prototype.openSellCustomerView = function () {
        var url = '/sell-customer';
        window.open(url, '_blank', 'toolbar=0,location=0,menubar=0');
    };
    SaleComponent.prototype.filterProducts = function (event) {
        var _this = this;
        var query = event.query;
        this.sellService.getProductDetails()
            .subscribe(function (products) {
            // console.log(products);
            _this.product = _this.filterProduct(query, products);
        });
    };
    SaleComponent.prototype.filterCustomers = function (event) {
        var _this = this;
        var query = event.query;
        this.customerService.getCustomerDetails()
            .subscribe(function (customers) {
            // console.log(products);
            _this.filteredCustomer = _this.filterCustomer(query, customers);
        });
    };
    SaleComponent.prototype.getCustomerDetails = function () {
        var _this = this;
        this.customerService.getCustomerDetails()
            .subscribe(function (customer) {
            _this.customerDto = customer;
        });
    };
    SaleComponent.prototype.addTransactionLineItem = function (productObj) {
        var _this = this;
        // This is fisrt time when user is adding product to sell.
        if (this.transactionLineItemDaoList.length == 0) {
            productObj.totalProductPrice = parseFloat(productObj.retail.toFixed(2));
            productObj.taxAmountOnProduct = (productObj.retail * this.taxPercent) / 100;
            console.log("when add product", productObj);
            this.transactionLineItemDaoList.push(productObj);
            this.product = null;
            this.p = null;
            this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].actualRetail = productObj.retail;
            this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
            this.setTransactionDtoList(this.transactionLineItemDaoList);
            // This will save the data into local storage.
            this.persit.setProducts(this.transactionLineItemDaoList);
        }
        else {
            var _loop_1 = function (lineItem) {
                if (productObj.productNo === lineItem.productNo) {
                    // This flag helps to determin whether to add new product or just update the quantity
                    this_1.isProductExistsInSellList = true;
                    lineItem.defaultQuantity = +lineItem.defaultQuantity + 1;
                    lineItem.quantityUpdated = true;
                    // here  i need to get value of lineitem.retail becuase user might have change the retial price so, if i dont do lineitem.retail it will take old retail price.
                    lineItem.totalProductPrice = parseFloat((lineItem.retail * lineItem.defaultQuantity).toFixed(2));
                    lineItem.taxAmountOnProduct = (lineItem.retail * this_1.taxPercent) / 100;
                    console.log("when add product", productObj);
                    this_1.transactionLineItemDaoList = this_1.transactionLineItemDaoList.slice();
                    this_1.product = null;
                    this_1.p = null;
                    console.log(this_1.transactionLineItemDaoList);
                    this_1.transactionLineItemDaoList[this_1.transactionLineItemDaoList.length - 1].actualRetail = productObj.retail;
                    this_1.setTransactionDtoList(this_1.transactionLineItemDaoList);
                    this_1.persit.setProducts(this_1.transactionLineItemDaoList);
                    setTimeout(function () {
                        lineItem.quantityUpdated = false;
                        _this.persit.setProducts(_this.transactionLineItemDaoList);
                        _this.transactionLineItemDaoList = _this.transactionLineItemDaoList.slice();
                    }, 3000);
                    return "break";
                }
                else {
                    // This flag helps to determin whether to add new product or just update the quantity
                    this_1.isProductExistsInSellList = false;
                }
            };
            var this_1 = this;
            // Checking weather user is adding same product agian or not if its true
            //  then just update the quantity of that product by 1.
            for (var _i = 0, _a = this.transactionLineItemDaoList; _i < _a.length; _i++) {
                var lineItem = _a[_i];
                var state_1 = _loop_1(lineItem);
                if (state_1 === "break")
                    break;
            }
            // This flag helps to determin whether to add new product or just update the quantity
            if (!this.isProductExistsInSellList) {
                this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
                productObj.totalProductPrice = productObj.retail * productObj.defaultQuantity;
                productObj.taxAmountOnProduct = parseFloat(((productObj.retail * this.taxPercent) / 100).toFixed(2));
                console.log("when add product", productObj);
                this.transactionLineItemDaoList.push(productObj);
                this.product = null;
                this.p = null;
                console.log(this.transactionLineItemDaoList);
                this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].actualRetail = productObj.retail;
                this.setTransactionDtoList(this.transactionLineItemDaoList);
                this.persit.setProducts(this.transactionLineItemDaoList);
            }
        }
        $("lineitem" + productObj.productNo).ready(function () {
            // $(`lineitem${productObj.productNo}`).sc
            document.getElementById("lineitem" + productObj.productNo).scrollIntoView();
        });
        return this.transactionLineItemDaoList;
    };
    // #productsearch > span > input
    SaleComponent.prototype.testFocus = function () {
        // document.querySelector("#productsearch > span > input").focus();
        $('#productsearch > span > input').focus();
    };
    // This method helps when user try to change retial price or quanity from the sell text box.
    SaleComponent.prototype.submitProduct = function (value) {
        var _this = this;
        if (this.p.length > 8) {
            this.product.forEach(function (p) {
                if (p.productNo == _this.p) {
                    _this.addTransactionLineItem(value);
                }
            });
            console.log("ok found wiht scanner");
        }
        if (typeof value === 'string') {
            console.log('This is value: ', value);
            // this is the senario where user is adding new product to Sell
            if (this.product != null && this.product.length > 0) {
                // this.addTransactionLineItem(this.product[0]);
            }
            else if (value !== '' && value !== undefined && value.indexOf('.') !== 0) {
                if (value.match(/[a-z]/i))
                    console.log('contains only charcters');
                // this mean this is decimal value so it will change the retail price of the product
                if (value.match(/[0-9]/i) && value.indexOf('.') > 0)
                    this.updateProductPrice(value);
                else if (value.match(/[0-9]/i) && value.length < 5)
                    this.updateProductQuantity(value);
            }
        }
        else if (value != null) {
            this.addTransactionLineItem(value);
        }
    };
    SaleComponent.prototype.updateProductQuantity = function (value) {
        console.log('Quantity change');
        this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity = value;
        this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = parseFloat((this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity).toFixed(2));
        this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retailDiscount = (this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retailDiscount) * (this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity);
        this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
        this.setTransactionDtoList(this.transactionLineItemDaoList);
        this.persit.setProducts(this.transactionLineItemDaoList);
        this.p = null;
    };
    SaleComponent.prototype.updateProductPrice = function (value) {
        console.log('Price change');
        // let oldRetail = this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail;
        this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail = value;
        this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = (this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity);
        this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
        this.setTransactionDtoList(this.transactionLineItemDaoList);
        this.persit.setProducts(this.transactionLineItemDaoList);
        this.p = null;
    };
    // this method helps to update lineItem Detail when user change the quatity or change the retail from editable box
    SaleComponent.prototype.updateLineItemDetails = function (event) {
        this.transactionLineItemDaoList[event.index].defaultQuantity = event.data.defaultQuantity;
        this.transactionLineItemDaoList[event.index].retail = event.data.retail;
        this.transactionLineItemDaoList[event.index].totalProductPrice = (event.data.defaultQuantity * event.data.retail);
        this.transactionLineItemDaoList[event.index].taxAmountOnProduct = ((event.data.defaultQuantity * event.data.retail) * this.taxPercent) / 100;
        this.transactionLineItemDaoList[event.index].retailDiscount = (event.data.defaultQuantity * event.data.retailDiscount);
        this.setTransactionDtoList(this.transactionLineItemDaoList);
        this.persit.setProducts(this.transactionLineItemDaoList);
    };
    SaleComponent.prototype.setDiscountType = function (discountType) {
        console.log("inside set discount type", discountType);
        if (discountType == 'By Amount') {
            this.discountType = discountType;
        }
        else if (discountType == 'By Percentage') {
            this.discountType = discountType;
        }
    };
    SaleComponent.prototype.calculateDiscount = function (value) {
        console.log("inside calculate discount", value);
        if (this.discountType == 'By Amount') {
            this.transactionDtoList.totalDiscount = value;
            // Here need to calculate tax because, now we have to apply tax on the amount which come after discount
            this.transactionDtoList.tax = ((this.transactionDtoList.subtotal - this.transactionDtoList.totalDiscount) * this.taxPercent) / 100;
            // Here i have to subtract the subtotal from the discount, if i do from total then it will be wrong cause it has alredy calculted tax on it.
            this.transactionDtoList.totalAmount = (this.transactionDtoList.subtotal - this.transactionDtoList.totalDiscount) + this.transactionDtoList.tax;
            // Need to do this here, cause then only it will show same amount on payment popup.    this.payAmountTextBox = this.transactionDtoList.totalAmount;
            this.dueAmountForTransaction = this.transactionDtoList.totalAmount;
        }
        else if (this.discountType == 'By Percentage') {
            this.transactionDtoList.totalDiscount = parseFloat(((this.transactionDtoList.totalAmount * value) / 100).toFixed(2));
            // Here need to calculate tax because, now we have to apply tax on the amount which come after discount
            this.transactionDtoList.tax = ((this.transactionDtoList.subtotal - this.transactionDtoList.totalDiscount) * this.taxPercent) / 100;
            this.transactionDtoList.totalAmount = (this.transactionDtoList.subtotal - this.transactionDtoList.totalDiscount) + this.transactionDtoList.tax;
            // Need to do this here, cause then only it will show same amount on payment popup.
            this.payAmountTextBox = this.transactionDtoList.totalAmount;
            this.dueAmountForTransaction = this.transactionDtoList.totalAmount;
        }
    };
    SaleComponent.prototype.setTransactionDtoList = function (lineItem) {
        var totalQuantity = 0;
        var totalPrice = 0.00;
        var tax = 0.00;
        var totalLineItemDiscount = 0.00;
        if (this.selectedCustomer && this.saleType == 'Complete') {
            this.transactionDtoList.totalAmount = this.selectedCustomer.balance;
        }
        else {
            this.transactionDtoList.totalAmount = 0.00;
        }
        for (var i = 0; i < lineItem.length; i++) {
            totalQuantity = +lineItem[i].defaultQuantity + totalQuantity;
            totalPrice = +lineItem[i].totalProductPrice + totalPrice;
            // Here totalProductPriceWithTax mean, only amount of the tax on that product dont get confuse with naming
            tax = +(lineItem[i].totalProductPrice * this.taxPercent) / 100 + tax;
        }
        this.transactionDtoList.quantity = parseFloat(totalQuantity.toFixed(2));
        this.transactionDtoList.subtotal = parseFloat(totalPrice.toFixed(2));
        this.transactionDtoList.tax = parseFloat(tax.toFixed(2));
        this.transactionDtoList.totalAmount = this.transactionDtoList.totalAmount + parseFloat(((totalPrice) + tax).toFixed(2));
        // This will add line item discount as well as total discount to show final discount amount on invoice.
        this.transactionDtoList.totalDiscount = +this.transactionDtoList.totalDiscount + totalLineItemDiscount;
        // This logic helps to manage main payment button enable or diable.
        if (this.transactionDtoList.totalAmount == 0) {
            this.paymentButtonOnSale = true;
        }
        else {
            this.paymentButtonOnSale = false;
        }
        // These for sale page pop -- First row.
        this.payAmountTextBox = this.transactionDtoList.totalAmount;
        this.dueAmountForTransaction = this.transactionDtoList.totalAmount;
    };
    SaleComponent.prototype.filterProduct = function (query, products) {
        var filtered = [];
        for (var i = 0; i < products.length; i++) {
            var p = products[i];
            if (p.description.toLowerCase().includes(query.toLowerCase()) || p.productNo.includes(query)) {
                filtered.push(p);
            }
        }
        return filtered;
    };
    SaleComponent.prototype.filterCustomer = function (query, customers) {
        var filtered = [];
        for (var i = 0; i < customers.length; i++) {
            var cust = customers[i];
            if (cust.name.toLowerCase().includes(query.toLowerCase()) || cust.companyName.toLowerCase().includes(query.toLowerCase()) || cust.phoneNo.includes(query)) {
                filtered.push(cust);
            }
        }
        return filtered;
    };
    SaleComponent.prototype.submitCustomer = function () {
        // this.selectedCustomer = value;
        // this.cust = null;
        // this.disableCustomerSearchTextbox = true;
        if (this.selectedCustomer.type == 'Business') {
            this.taxPercent = 0;
        }
        // Storing customer detials into local storage.
        this.persit.setCustomerDetailsForSale(this.selectedCustomer);
        // Need to do this to add balance into transaction details
        this.setTransactionDtoList(this.transactionLineItemDaoList);
        console.log('customer', this.selectedCustomer);
    };
    // This will remove the customer from local storage.
    SaleComponent.prototype.removeCustomerOnSale = function () {
        this.persit.clearCustomer();
        this.selectedCustomer = null;
        this.cust = null;
        // this.disableCustomerSearchTextbox = false;
        this.setTransactionDtoList(this.transactionLineItemDaoList);
    };
    SaleComponent.prototype.showPopover = function (discount) {
        var _a = discount.getBoundingClientRect(), x = _a.x, y = _a.y;
        if (this.popoverStyle)
            this.popoverStyle = null;
        else
            this.popoverStyle = this.sanitizer.bypassSecurityTrustStyle("position: absolute; transform: translate3d(" + (x - 271.86 - 10) + "px, " + (y - 74.5) + "px, 0px); top: 0px; left: 0px; will-change: transform;");
        // console.log();
    };
    SaleComponent.prototype.print = function (obj) {
        console.log("Coming form print", obj);
    };
    SaleComponent.prototype.deleteProduct = function () {
        console.log("inside delete");
        var index = this.transactionLineItemDaoList.indexOf(this.selectedProduct, 0);
        console.log("index", index);
        if (index > -1) {
            this.transactionLineItemDaoList.splice(index, 1);
            this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
            this.setTransactionDtoList(this.transactionLineItemDaoList);
            this.persit.setProducts(this.transactionLineItemDaoList);
        }
    };
    // test(a: number) {
    //   this.calculateDiscountByAmount(a);
    //   alert("hi");
    //   console.log("insod test", event);
    // }
    SaleComponent.prototype.setProductForDelete = function (product) {
        this.selectedProduct = product;
        this.popupHeader = 'Delete Product';
        this.popupMessage = 'Are You Sure You Want To Delete Product?';
    };
    //This methode will completly remove the all transaction line item and transaction details.
    SaleComponent.prototype.disgardCompleteSale = function () {
        this.persit.clearProducts();
        this.persit.clearCustomer();
        this.transactionLineItemDaoList = [];
        // This is very import fist i need to remove the cusotmer details and then only call set transaction otherwise customer balace will stays and will show amount on payment which is wrong.
        this.selectedCustomer = null;
        this.setTransactionDtoList([]);
        // this.disableCustomerSearchTextbox = false;    
        this.saleType = 'Complete';
        this.router.navigate(['/sell/sale']);
    };
    SaleComponent.prototype.setHeaderAndMessageForDisgardPopup = function () {
        this.popupHeader = 'Discard Sale';
        this.popupMessage = 'Are You Sure You Want To Delete Complete Sale?';
    };
    SaleComponent.prototype.setPaymentDto = function (paymentType, paymentAmount) {
        if (this.saleType == 'Return') {
            this.setPaymentDtoForRetun(paymentType, this.payAmountTextBox);
        }
        else {
            if (paymentType == 'Cash') {
                // This is very rare scenario and it happens only if user is stupid but still i need to handle this,
                // Cause user can pay in cash two time by click on cash button by seletecting different buttons.
                if (null != this.paymentDto && this.paymentDto.cash > 0) {
                    this.paymentDto.cash = +this.paymentDto.cash + paymentAmount;
                }
                else {
                    // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
                    if (paymentAmount > this.dueAmountForTransaction) {
                        this.paymentDto.cash = this.dueAmountForTransaction;
                    }
                    else {
                        this.paymentDto.cash = paymentAmount;
                    }
                }
                this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Cash', 'paymentAmount': paymentAmount });
                this.validatePaymentButtons(paymentAmount);
            }
            else if (paymentType == 'Credit') {
                if (null != this.paymentDto && this.paymentDto.credit > 0) {
                    this.paymentDto.credit = +this.paymentDto.credit + paymentAmount;
                }
                else {
                    // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
                    if (paymentAmount > this.dueAmountForTransaction) {
                        this.paymentDto.credit = this.dueAmountForTransaction;
                    }
                    else {
                        this.paymentDto.credit = paymentAmount;
                    }
                }
                this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Credit', 'paymentAmount': paymentAmount });
                this.validatePaymentButtons(paymentAmount);
            }
            else if (paymentType == 'Debit') {
                if (null != this.paymentDto && this.paymentDto.debit > 0) {
                    this.paymentDto.debit = +this.paymentDto.debit + paymentAmount;
                }
                else {
                    // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
                    if (paymentAmount > this.dueAmountForTransaction) {
                        this.paymentDto.debit = this.dueAmountForTransaction;
                    }
                    else {
                        this.paymentDto.debit = paymentAmount;
                    }
                }
                this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Debit', 'paymentAmount': paymentAmount });
                this.validatePaymentButtons(paymentAmount);
            }
            else if (paymentType == 'Check') {
                if (null != this.paymentDto && this.paymentDto.checkAmount > 0) {
                    this.paymentDto.checkAmount = +this.paymentDto.checkAmount + paymentAmount;
                }
                else {
                    // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
                    if (paymentAmount > this.dueAmountForTransaction) {
                        this.paymentDto.checkAmount = this.dueAmountForTransaction;
                    }
                    else {
                        this.paymentDto.checkAmount = paymentAmount;
                    }
                }
                this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Check', 'paymentAmount': paymentAmount });
                this.validatePaymentButtons(paymentAmount);
            }
            else if (paymentType == 'StoreCredit') {
                // First need to check store credit already there added in payment dao or not, 
                if (null != this.paymentDto && this.paymentDto.storeCredit > 0) {
                    if (paymentAmount > this.dueAmountForTransaction) {
                        // so By doing this i am just reducing the store credit which is used for this transaction and i can update rest on customer account.
                        this.paymentDto.storeCredit = +this.paymentDto.storeCredit + this.dueAmountForTransaction;
                        this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });
                        this.validatePaymentButtons(this.paymentDto.storeCredit);
                    }
                    else {
                        this.paymentDto.storeCredit = paymentAmount;
                        this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });
                        this.validatePaymentButtons(this.paymentDto.storeCredit);
                    }
                }
                else {
                    if (paymentAmount > this.dueAmountForTransaction) {
                        // so By doing this i am just reducing the store credit which is used for this transaction and i can update rest on customer account.
                        this.paymentDto.storeCredit = this.dueAmountForTransaction;
                        this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });
                        this.validatePaymentButtons(this.paymentDto.storeCredit);
                    }
                    else {
                        this.paymentDto.storeCredit = paymentAmount;
                        this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });
                        this.validatePaymentButtons(this.paymentDto.storeCredit);
                    }
                }
                // Now I have to handle two scenario
                // Case 1. Store credit can greater then equal to payment amount
                // Case 2. Store credit can less then equal to payment amount
                // Case 1: where payment amount is customers store credit because that what i am sending from ui
            }
            else if (paymentType == 'OnAccount') {
                this.paymentDto.onAccount = paymentAmount;
                this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'OnAccount', 'paymentAmount': paymentAmount });
                // In this flow customer is not paying anythig or paying some amount and other amoun he is just putting on his account and will pay later
                // So here i need to complete the transaction, thats why calling this method.
                //this.completeSale();
                //this.validatePaymentButtons(paymentAmount);
                this.disablePaymentButtons = true;
                this.disablePaymentButtonsWithAmount = true;
                // This mean customer has provide sufficient balance.
                this.disableCompleteSaleButton = false;
            }
            else if (paymentType == 'Loyalty') {
                this.paymentDto.loyalty = paymentAmount;
            }
            console.log('payment type and amount', paymentAmount);
        }
    };
    SaleComponent.prototype.setPaymentDtoForRetun = function (paymentType, paymentAmount) {
        this.payLable = 'Return';
        this.amountDueLable = 'Return Amount:';
        if (paymentType == 'Cash') {
            this.paymentDto.cash = paymentAmount;
            this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Cash', 'paymentAmount': paymentAmount });
            this.validatePaymentForReturn();
        }
        else if (paymentType == 'Credit') {
            this.paymentDto.credit = paymentAmount;
            this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Credit', 'paymentAmount': paymentAmount });
            this.validatePaymentForReturn();
        }
        else if (paymentType == 'Debit') {
            this.paymentDto.debit = paymentAmount;
            this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Debit', 'paymentAmount': paymentAmount });
            this.validatePaymentForReturn();
        }
        else if (paymentType == 'Check') {
            this.paymentDto.checkAmount = paymentAmount;
            this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Check', 'paymentAmount': paymentAmount });
            this.validatePaymentForReturn();
        }
        else if (paymentType == 'StoreCredit') {
            // Converting negative amount to positive so i can add this amount in backend.
            this.paymentDto.storeCredit = Math.abs(paymentAmount);
            this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': paymentAmount });
            this.disableStoreCreditButtons = true;
            this.validatePaymentForReturn();
        }
    };
    SaleComponent.prototype.validatePaymentForReturn = function () {
        this.disablePaymentButtons = true;
        this.disableCompleteSaleButton = false;
    };
    SaleComponent.prototype.validatePaymentButtons = function (paymentAmount) {
        var totalPaidAmout = 0.00;
        // This means cutomer has paid full amount.
        if (this.dueAmountForTransaction - paymentAmount <= 0) {
            this.dueAmountForTransaction = this.dueAmountForTransaction - paymentAmount;
            this.disablePaymentButtons = true;
            this.disablePaymentButtonsWithAmount = true;
            this.payLable = 'Paid Amount:';
            this.amountDueLable = 'Change Amount:';
            // This mean customer has provide sufficient balance.
            this.disableCompleteSaleButton = false;
            // This logic helps to show the data in paid amount tax box when user exact amount or more.
            for (var _i = 0, _a = this.paymentObjectForPaymentSellTable; _i < _a.length; _i++) {
                var a = _a[_i];
                totalPaidAmout = totalPaidAmout + a.paymentAmount;
            }
            this.payAmountTextBox = totalPaidAmout;
        }
        else {
            // this.dueAmountForTransaction = Number.parseFloat((this.dueAmountForTransaction - paymentAmount).toFixed(2));
            this.dueAmountForTransaction = this.dueAmountForTransaction - paymentAmount;
            this.payAmountTextBox = this.dueAmountForTransaction;
        }
    };
    // This methode calls when user click on the payment button.
    SaleComponent.prototype.setDataForPaymentModel = function () {
        // payaccountTextBox is bind with two binding so i need to intialize here, so i can show data on payment popup load.
        this.payAmountTextBox = this.dueAmountForTransaction;
        this.disablePaymentButtons = false;
        this.disablePaymentButtonsWithAmount = false;
        this.disableCompleteSaleButton = true;
        this.disableOnAccountButtons = this.selectedCustomer == null;
        // This mean this customer has some store credit to use so i need to enable store credit button.
        if (this.selectedCustomer && this.selectedCustomer.storeCredit > 0) {
            this.disableStoreCreditButtons = false;
        }
        else {
            this.disableStoreCreditButtons = true;
        }
        console.log("selected customer", this.selectedCustomer);
        console.log("inside the set data");
    };
    SaleComponent.prototype.setDataForPaymentModelForReturnSale = function () {
        this.payAmountTextBox = this.dueAmountForTransaction;
        this.disablePaymentButtonsWithAmount = true;
        this.disableCompleteSaleButton = true;
        this.disableOnAccountButtons = true;
        if (this.selectedCustomer) {
            this.disableStoreCreditButtons = false;
        }
    };
    // This method helps to delete payment type and recaculate all other parameters.
    SaleComponent.prototype.deletePaymentFromPaymentModel = function (payment) {
        if (this.saleType == 'Return') {
            var index = this.paymentObjectForPaymentSellTable.indexOf(payment);
            if (index > -1) {
                this.paymentObjectForPaymentSellTable.splice(index, 1);
                this.dueAmountForTransaction = payment.paymentAmount;
                this.payAmountTextBox = this.dueAmountForTransaction;
                this.disablePaymentButtons = false;
                this.disableCompleteSaleButton = true;
            }
        }
        else {
            var index = this.paymentObjectForPaymentSellTable.indexOf(payment);
            if (index > -1) {
                this.paymentObjectForPaymentSellTable.splice(index, 1);
                // Need to handle this, because i am adding payment type when user click on add payment,
                // So now when user delete the payment type, i need to change the payment object too, and remove the or subtract the payment amount.
                if (payment.paymentType == 'Cash' && payment.paymentAmount > 0) {
                    this.paymentDto.cash = this.paymentDto.cash - payment.paymentAmount;
                }
                if (payment.paymentType == 'Credit' && payment.paymentAmount > 0) {
                    this.paymentDto.credit = this.paymentDto.credit - payment.paymentAmount;
                }
                if (payment.paymentType == 'Debit' && payment.paymentAmount > 0) {
                    this.paymentDto.debit = this.paymentDto.debit - payment.paymentAmount;
                }
                if (payment.paymentType == 'Check' && payment.paymentAmount > 0) {
                    this.paymentDto.checkAmount = this.paymentDto.checkAmount - payment.paymentAmount;
                }
                if (payment.paymentType == 'StoreCredit' && payment.paymentAmount > 0) {
                    this.paymentDto.storeCredit = this.paymentDto.storeCredit - payment.paymentAmount;
                }
            }
            // This is because of stupid type script,  + it concatting the two variables.  DO NOT FORGET THIS. 
            this.dueAmountForTransaction = +payment.paymentAmount + this.dueAmountForTransaction;
            this.payAmountTextBox = this.dueAmountForTransaction;
            console.log('payment', payment.paymentAmount);
            console.log('Value of duw amout tran', this.dueAmountForTransaction);
            console.log('Value of paymenttexbox', this.payAmountTextBox);
        }
        if (this.dueAmountForTransaction > 0) {
            this.disableCompleteSaleButton = true;
            this.disablePaymentButtons = false;
            this.disablePaymentButtonsWithAmount = false;
        }
    };
    // This is the method which handle completing the transaction and reset the all flag and other data.
    SaleComponent.prototype.completeSale = function () {
        var _this = this;
        var totalLineItemDiscount = 0.00;
        console.log('sales type', this.saleType);
        // setting customer details
        if (null != this.selectedCustomer && this.selectedCustomer != undefined) {
            this.transactionDtoList.customerPhoneno = this.selectedCustomer.phoneNo;
            this.transactionDtoList.customerFirstLastName = this.selectedCustomer.name;
            this.transactionDtoList.previousBalance = this.selectedCustomer.balance;
        }
        this.transactionDtoList.status = this.saleType;
        // This help only when user do return transaction where user gives store credit to the customer.
        this.transactionDtoList.previousTransactionId = this.previousTransactionId;
        // THIS means customer has over paid, this happens mostly in cash of when customer pay by cash.
        // So i am setting it as chnage amount.
        if (this.dueAmountForTransaction < 0) {
            this.paymentDto.changeForCash = Math.abs(this.dueAmountForTransaction);
        }
        else {
            this.transactionDtoList.transactionBalance = this.dueAmountForTransaction;
        }
        // seeting current date and time using momemt.
        this.transactionDtoList.date = __WEBPACK_IMPORTED_MODULE_7_moment__(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        // Setting payment dto into transaction dto, because can not send both as @request body mfrom angular..
        this.paymentDto.date = this.transactionDtoList.date;
        this.paymentDao.push(this.paymentDto);
        this.transactionDtoList.paymentDao = this.paymentDao;
        // Setting TransactionLineItemDetails
        for (var _i = 0, _a = this.transactionLineItemDaoList; _i < _a.length; _i++) {
            var lineItem = _a[_i];
            lineItem.status = this.saleType;
            lineItem.date = this.transactionDtoList.date;
            // I need to do this casue in backend i am using quantity and here i have to use defult quanity to show 1 as user insert product.
            lineItem.quantity = lineItem.defaultQuantity;
            // This means user has given line item discount.
            if (lineItem.retail < lineItem.actualRetail) {
                lineItem.discount = (lineItem.actualRetail - lineItem.retail) * lineItem.quantity;
                totalLineItemDiscount = +((lineItem.actualRetail - lineItem.retail) * lineItem.defaultQuantity) + totalLineItemDiscount;
            }
        }
        // Seeting paymentDto status
        for (var _b = 0, _c = this.paymentDao; _b < _c.length; _b++) {
            var payment = _c[_b];
            payment.status = this.saleType;
        }
        // this.transactionNotes is bind with the ng model on ui.
        this.transactionDtoList.note = this.transactionNotes;
        // To do need to fix this hardcoded value for username
        this.transactionDtoList.username = 'alok@alok.com';
        this.transactionDtoList.transactionLineItemDaoList = this.transactionLineItemDaoList;
        this.transactionDtoList.totalDiscount = +this.transactionDtoList.totalDiscount + totalLineItemDiscount;
        // I am doing this to show subtotal without line item discount, so in invoice customer wont get confuse.
        // 
        this.transactionDtoList.subtotal = this.transactionDtoList.subtotal + this.transactionDtoList.totalDiscount;
        // NOW MAKING SERVICE CALL TO ADD TRANSACTION AND LINE ITEM DETAILS AND WILL ADD LINE ITEM DETAILS ONLY IF ADD TRANASACTION CALL IS SUCCESS !!!
        this.sellService.addTransactionDetails(this.transactionDtoList)
            .subscribe(function (data) {
            _this.printTransactionDto = data.json();
            if (_this.saleType == 'Park') {
                _this.toastr.success('Parked Transaction Successfully', 'Success!');
                _this.clearAllDateAfterTransactionComplete();
            }
            _this.disableCompleteSaleButton = true;
            console.log('addTransaction response', data);
            console.log('printTransaction dao', _this.printTransactionDto);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        }, function () {
        });
        //this.disableCompleteSaleButton = true;
        console.log('Transaction Details', this.transactionDtoList);
        console.log('TransactionLineItem Details', this.transactionLineItemDaoList);
        console.log('Payment Dto', this.paymentDto);
        //this.disablePaymentButtons = true;
        console.log("done with sales");
        // This will focus on the autocomplete field
        $('#productsearch > span > input').focus();
    };
    // This method helps to add transaction as park, so user can use this transaction later
    SaleComponent.prototype.parkSale = function () {
        this.saleType = 'Park';
        this.completeSale();
        // this.saleType = 'Complete'; // Need to set for next transaction
    };
    SaleComponent.prototype.clearAllDateAfterTransactionComplete = function () {
        // This is important to handle when user click on Close button from payment popup, we need to clear data only when transaction is completed ottherwise just need to close the popup.
        if (null != this.printTransactionDto) {
            this.transactionDtoList = new TransactionDtoList();
            this.persit.clearProducts();
            this.persit.clearCustomer();
            // Very importa can not assign to null
            this.paymentDto = new PaymentDto();
            this.selectedCustomer = null;
            // this.disableCustomerSearchTextbox = false;
            this.paymentObjectForPaymentSellTable = [];
            // This is payment button on the sale page, i need to do this because there is not data in sale table,
            this.paymentButtonOnSale = true;
            this.transactionLineItemDaoList = this.persit.getProducts() || [];
            this.setTransactionDtoList(this.transactionLineItemDaoList);
            this.paymentDao = [];
            // Need set it null cause its showing in next transaction also.
            this.transactionNotes = '';
            this.disableStoreCreditButtons = true;
            this.printTransactionDto = null;
            this.taxPercent = this.storeDetails.tax;
        }
        else {
            console.log('just close the model.');
        }
        // very important cause this will give problem after doing return transaction so, after any transactoin i need to do this.
        this.saleType = 'Complete';
    };
    SaleComponent.prototype.handleParkedTransactionFromSalesHistory = function (transactionComId) {
        var _this = this;
        // This is temp code for handling parked and online transactions
        this.sellService.getTransactionById(transactionComId)
            .subscribe(function (transaction) {
            // if(transaction.status == 'Parked'){
            transaction.transactionLineItemDaoList.forEach(function (lineItem) {
                lineItem.defaultQuantity = lineItem.quantity;
                lineItem.quantity = 0;
            });
            console.log('transaction details in park sale', transaction);
            // Setting transactoin id here so i can send this in case of return and when user gives store credit to the customer.
            _this.previousTransactionId = transaction.transactionComId;
            _this.persit.setProducts(transaction.transactionLineItemDaoList);
            _this.transactionLineItemDaoList = _this.persit.getProducts() || [];
            console.log('lineItem for parkSale', _this.transactionLineItemDaoList);
            // Setting customer details to manage store credit and onAccount/ Loylty functionality
            if (transaction.customerPhoneno != null && transaction.customerPhoneno != undefined && transaction.customerPhoneno.length > 0) {
                _this.selectedCustomer = new __WEBPACK_IMPORTED_MODULE_6_app_customer_customer_component__["a" /* Customer */]();
                _this.customerService.getCustomerDetailsByPhoneNo(transaction.customerPhoneno)
                    .subscribe(function (customer) {
                    _this.selectedCustomer = customer;
                    if (customer.type == 'Business') {
                        _this.taxPercent = 0;
                    }
                    console.log('Customer details from backend', customer);
                });
                console.log('Customer detils for park sale', _this.selectedCustomer);
                _this.persit.setCustomerDetailsForSale(_this.selectedCustomer);
                _this.selectedCustomer = _this.persit.getCustomerDetailsForSale();
            }
            _this.setTransactionDtoList(_this.transactionLineItemDaoList);
            // }
            // else {
            //   this.saleType = 'Return';
            //           transaction.transactionLineItemDaoList.forEach((lineItem) => {
            //             lineItem.defaultQuantity = lineItem.quantity;
            //             lineItem.quantity = 0;
            //             lineItem.cost = - lineItem.cost;
            //             lineItem.retail = - lineItem.retail;
            //             lineItem.totalProductPrice = - lineItem.totalProductPrice;
            //           })
            //           // Setting transactoin id here so i can send this in case of return and when user gives store credit to the customer.
            //           this.previousTransactionId = transaction.transactionComId;
            //           this.persit.setProducts(transaction.transactionLineItemDaoList);
            //           this.transactionLineItemDaoList = this.persit.getProducts() || [];
            //           this.setTransactionDtoList(this.transactionLineItemDaoList);
            //           // Setting customer details to manage store credit and onAccount/ Loylty functionality
            //           if (transaction.customerPhoneno && transaction.customerPhoneno.length > 0) {
            //             this.selectedCustomer = new Customer();
            //             this.customerService.getCustomerDetailsByPhoneNo(transaction.customerPhoneno)
            //               .subscribe((customer) => {
            //                 this.selectedCustomer = customer;
            //               })
            //             this.persit.setCustomerDetailsForSale(this.selectedCustomer);
            //             this.selectedCustomer = this.persit.getCustomerDetailsForSale();
            //             }
            // }
        });
    };
    SaleComponent.prototype.printReciept = function () {
        this.sellService.printReceipt(this.printTransactionDto);
        this.clearAllDateAfterTransactionComplete();
        $('#paymentModel').modal('toggle');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('@fadeInAnimation'),
        __metadata("design:type", Object)
    ], SaleComponent.prototype, "fadeInAnimation", void 0);
    SaleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sale',
            template: __webpack_require__("../../../../../src/app/sell/sale/sale.component.html"),
            styles: [__webpack_require__("../../../../../src/app/sell/sale/sale.component.scss")],
            animations: [__WEBPACK_IMPORTED_MODULE_9_app_shared_animations_fade_in_animation__["a" /* fadeInAnimation */]],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_sell_sell_service__["a" /* SellService */],
            __WEBPACK_IMPORTED_MODULE_12_app_shared_services_persistence_service__["a" /* PersistenceService */],
            __WEBPACK_IMPORTED_MODULE_4_app_shared_storesetup_storesetup_service__["a" /* StoreSetupService */],
            __WEBPACK_IMPORTED_MODULE_5_app_customer_customer_service__["a" /* CustomerService */],
            __WEBPACK_IMPORTED_MODULE_8__angular_platform_browser__["DomSanitizer"],
            __WEBPACK_IMPORTED_MODULE_10__angular_router__["ActivatedRoute"],
            __WEBPACK_IMPORTED_MODULE_10__angular_router__["Router"],
            __WEBPACK_IMPORTED_MODULE_11_ng2_toastr_src_toast_manager__["ToastsManager"]])
    ], SaleComponent);
    return SaleComponent;
}());

var Product = /** @class */ (function () {
    function Product() {
        this.defaultQuantity = 1;
    }
    return Product;
}());

var TransactionLineItemDaoList = /** @class */ (function () {
    function TransactionLineItemDaoList() {
    }
    return TransactionLineItemDaoList;
}());

var TransactionDtoList = /** @class */ (function () {
    function TransactionDtoList() {
        // constructor(quantity: number, subtotal: number, tax: number, totalAmount: number, totalDiscount: number, ) {
        //   this.quantity = quantity;
        //   this.subtotal = subtotal;
        //   this.tax = tax;
        //   this.totalAmount = totalAmount;
        //   this.totalDiscount = totalDiscount;
        // }
        this.totalDiscount = 0.00;
    }
    return TransactionDtoList;
}());

var PaymentDto = /** @class */ (function () {
    function PaymentDto() {
    }
    return PaymentDto;
}());

var PaymentObjectForPaymentSellTable = /** @class */ (function () {
    function PaymentObjectForPaymentSellTable() {
    }
    return PaymentObjectForPaymentSellTable;
}());



/***/ }),

/***/ "../../../../../src/app/sell/sales-history/sales-history.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/sell/sales-history/sales-history.component.html":
/***/ (function(module, exports) {

module.exports = "<mat-card>\n    <mat-card-title>\n        <h4>Sales History</h4>\n    </mat-card-title>\n\n    <mat-card-content>\n\n        <div class=\"row d-flex align-items-center\">\n\n            <div class=\"col-md-2\">\n                <select class=\"form-control form-control\" [(ngModel)]=\"this.salesHistoryDropdown\" (change)=\"this.getTransactionDetails(this.salesHistoryDropdown)\">\n                    <option>Today</option>\n                    <option>Yesterday</option>\n                    <option>This Week</option>\n                    <option>Last Week</option>\n                    <option>This Month</option>\n                    <option>Last Month</option>\n                    <option>Last 3 Months</option>\n                    <option>Last 6 Months</option>\n                    <option>This Year</option>\n                    <option>Last Year</option>\n                    <option>Custom</option>\n\n                </select>\n\n            </div>\n            <div *ngIf=\"this.salesHistoryDropdown == 'Custom' \" class=\"col-md-3 form-group d-flex align-items-center\" [formGroup]=\"this.customDate\">\n\n                <mat-form-field class=\"float-never col-md-6\">\n                    <input formControlName=\"fromDate\" matInput [matDatepicker]=\"fromDate\" placeholder=\"Start Date\" [max]=\"this.currentDate\">\n                    <mat-datepicker-toggle matSuffix [for]=\"fromDate\"></mat-datepicker-toggle>\n                    <mat-datepicker #fromDate></mat-datepicker>\n                </mat-form-field>\n                <label class=\"text-center\">To</label>\n                <mat-form-field class=\"float-never col-md-6\">\n                    <input class=\"\" formControlName=\"toDate\" matInput [matDatepicker]=\"toDate\" placeholder=\"End Date\" [min]=\"this.customDate.get('fromDate').value\" [max]=\"this.currentDate\">\n                    <mat-datepicker-toggle matSuffix [for]=\"toDate\"></mat-datepicker-toggle>\n                    <mat-datepicker #toDate></mat-datepicker>\n                </mat-form-field>\n            </div>\n\n            <div class=\"col-md-2\">\n                <select class=\"form-control\" [(ngModel)]=\"this.searchByTransactionType\" (change)=\"onTransactionTypeDropdownChoose()\">\n                    <option>All Transaction Status</option>\n                    <option>Complete</option>\n                    <option>Return</option>\n                    <option>Void</option>\n                    <option>Park</option>\n                    <option>Online</option>\n                </select>\n\n            </div>\n\n\n            <div class=\"col-md-3\">\n                <input [formControl]=\"this.searchByCustomerInputBox\" class=\"form-control form-control\" type=\"text\" placeholder=\"Search By Customer Name Or PhoneNo\">\n\n            </div>\n            <div class=\"col-md-2\">\n                <input [formControl]=\"this.searchByReceiptNoInputBox\" class=\"form-control form-control\" type=\"text\" placeholder=\"Search By Recipt Number\">\n\n            </div>\n\n        </div>\n\n        <div class=\"row p-md-3\">\n            <p-dataTable [value]=\"this.transactionDetails\" scrollable=\"true\" scrollHeight=\"500px\" expandableRows=\"true\" [responsive]=\"true\">\n                <p-column expander=\"true\" styleClass=\"col-icon\" [style]=\"{'width': '3%'}\"></p-column>\n                <p-column field=\"transactionComId\" header=\"Receipt No\" [style]=\"{'width': '7%'}\"></p-column>\n                <p-column field=\"date\" header=\"Date\" [sortable]=\"true\" [style]=\"{'width': '6%'}\"></p-column>\n                <p-column field=\"time\" header=\"Time\" [sortable]=\"true\" [style]=\"{'width': '6%'}\"></p-column>\n                <p-column field=\"customerPhoneno\" header=\"Customer Phone\"></p-column>\n                <p-column field=\"customerFirstLastName\" header=\"Customer Name\"></p-column>\n                <!-- <p-column field=\"username\" header=\"User Name\"></p-column> -->\n                <p-column field=\"tax\" header=\"Tax\" [style]=\"{'width': '8%'}\"></p-column>\n                <p-column field=\"totalDiscount\" header=\"Discount\" [style]=\"{'width': '8%'}\"></p-column>\n                <p-column field=\"subtotal\" header=\"Subtotal\" [style]=\"{'width': '8%'}\"></p-column>\n                <p-column field=\"totalAmount\" header=\"Total Amount\" [sortable]=\"true\" [style]=\"{'width': '10%'}\"></p-column>\n                <p-column field=\"status\" header=\"Status\" [sortable]=\"true\" [style]=\"{'width': '8%'}\">\n\n                    <ng-template let-transaction=\"rowData\" pTemplate=\"body\">\n                        <mat-chip-list>\n                            <mat-chip color=\"secondary\" selected=\"true\">{{transaction.status}}</mat-chip>\n                        </mat-chip-list>\n                    </ng-template>\n\n                </p-column>\n                <p-column field=\"status\" header=\"Action\" [style]=\"{'width': '10%'}\">\n\n                    <ng-template let-transaction=\"rowData\" pTemplate=\"body\">\n                        <button class=\"btn-blue action-button-table\" mat-button (click)=\"this.printReceipt(transaction)\">\n                            <i class=\"fa fa-print\" aria-hidden=\"true\"></i>\n                        </button>\n                        <button class=\"btn-green action-button-table\" mat-button (click)='this.sendEmail(transaction)'>\n                            <i class=\"fa fa-envelope\" aria-hidden=\"true\"></i>\n                        </button>\n\n                        <!-- // Do not remove this, this is for park sales where i can redirect user to start the transaction. -->\n                        <!-- <button *ngIf=\"transaction.status != 'Return' \" class=\"btn-red action-button-table\" mat-button [routerLink]=\"['/sell', {transactionComId: transaction.transactionComId}]\"> -->\n                        <button *ngIf=\"transaction.status == 'Complete' || transaction.status == 'Void' \" class=\"btn-red action-button-table\" mat-button (click)=\"setTransactoinToVoid(transaction)\" data-toggle=\"modal\" data-target=\"#voidTransaction\">\n                                \n                            <i class=\"fa fa-ban\" aria-hidden=\"true\"></i>\n                        </button>\n                        <button *ngIf=\"transaction.status == 'Park' || transaction.status == 'Online' \" class=\"btn-red action-button-table\" mat-button [routerLink]=\"['/sell/sale', {transactionComId: transaction.transactionComId}]\">\n                                <i class=\"fa fa-reply-all\" aria-hidden=\"true\"></i>\n                        </button>\n\n\n                    </ng-template>\n                </p-column>\n\n\n                <ng-template let-receipt pTemplate=\"rowexpansion\">\n                    <div class=\"ui-grid ui-grid-responsive ui-fluid\" style=\"font-size:16px;padding:20px\">\n                        <div class=\"ui-grid-row\">\n                            <div class=\"ui-grid-col-12\">\n                                <div class=\"ui-grid ui-grid-responsive ui-grid-pad\">\n\n                                    <table class=\"table table-striped\">\n                                        <thead>\n                                            <tr>\n                                                <th>Product No</th>\n                                                <th>Description</th>\n                                                <th>Retail</th>\n                                                <th>Discount</th>\n                                                <th>Quantity</th>\n                                                <th>Total</th>\n                                            </tr>\n                                        </thead>\n                                        <tbody>\n                                            <tr *ngFor=\"let lineItem of receipt.transactionLineItemDaoList\">\n                                                <td>{{this.lineItem.productNo}}</td>\n                                                <td>{{this.lineItem.description}}</td>\n                                                <td>{{this.lineItem.retail}}</td>\n                                                <td>{{this.lineItem.discount}}</td>\n                                                <td>{{this.lineItem.quantity}}</td>\n                                                <td>{{this.lineItem.totalProductPrice}}</td>\n                                            </tr>\n                                        </tbody>\n                                    </table>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"row\">\n\n                            <div class=\"col-md-10 text-left\">\n                                <div>\n                                    Transaction Notes :\n                                </div>\n                                <textarea rows=\"3\" cols=\"150\">\n                            {{receipt.note}}\n                        </textarea>\n                            </div>\n                            <div class=\"col-md-2\">\n\n                                <div class=\"row\">\n                                    <div class=\"col-md-6\">\n                                        Subtotal:\n                                    </div>\n                                    <div class=\"col-md-6\">\n                                        $ {{receipt.subtotal}}\n                                    </div>\n                                </div>\n\n                                <div class=\"row\">\n                                    <div class=\"col-md-6\" *ngIf=\"receipt.totalDiscount != 0\">\n                                        Discount:\n                                    </div>\n                                    <div class=\"col-md-6\" *ngIf=\"receipt.totalDiscount != 0\">\n                                        $ {{receipt.totalDiscount}}\n                                    </div>\n                                </div>\n\n                                <div class=\"row\">\n                                    <div class=\"col-md-6\">\n                                        Tax:\n                                    </div>\n                                    <div class=\"col-md-6\">\n                                        $ {{receipt.tax}}\n                                    </div>\n                                </div>\n\n                                <div class=\"row\">\n                                    <div class=\"col-md-6\" *ngIf=\"receipt.previousBalance != 0\">\n                                        Pre Balance:\n                                    </div>\n                                    <div class=\"col-md-6\" *ngIf=\"receipt.previousBalance != 0\">\n                                        $ {{receipt.previousBalance}}\n                                    </div>\n                                </div>\n\n                                <hr>\n\n                                <div class=\"row\">\n                                    <div class=\"col-md-6\">\n                                        TOTAL:\n                                    </div>\n                                    <div class=\"col-md-6\">\n                                        $ {{receipt.totalAmount}}\n                                    </div>\n                                </div>\n\n                                <hr>\n                                <div class=\"row\">\n                                    <div class=\"col-md-6\" *ngIf=\"receipt.paymentDao[0].cash != 0\">\n                                        Cash:\n                                    </div>\n                                    <div class=\"col-md-6\" *ngIf=\"receipt.paymentDao[0].cash != 0\">\n                                        $ {{receipt.paymentDao[0].cash + receipt.paymentDao[0].changeForCash}}\n                                    </div>\n                                </div>\n\n                                <div class=\"row\">\n                                    <div class=\"col-md-6\" *ngIf=\"receipt.paymentDao[0].changeForCash != 0\">\n                                        Change:\n                                    </div>\n                                    <div class=\"col-md-6\" *ngIf=\"receipt.paymentDao[0].changeForCash != 0\">\n                                        $ {{receipt.paymentDao[0].changeForCash}}\n                                    </div>\n                                </div>\n\n                                <div class=\"row\">\n                                    <div class=\"col-md-6\" *ngIf=\"receipt.paymentDao[0].credit != 0\">\n                                        Credit:\n                                    </div>\n                                    <div class=\"col-md-6\" *ngIf=\"receipt.paymentDao[0].credit != 0\">\n                                        $ {{receipt.paymentDao[0].credit}}\n                                    </div>\n                                </div>\n\n                                <div class=\"row\">\n                                    <div class=\"col-md-6\" *ngIf=\"receipt.paymentDao[0].debit != 0\">\n                                        Debit:\n                                    </div>\n                                    <div class=\"col-md-6\" *ngIf=\"receipt.paymentDao[0].debit != 0\">\n                                        $ {{receipt.paymentDao[0].debit}}\n                                    </div>\n                                </div>\n\n                                <div class=\"row\">\n                                    <div class=\"col-md-6\" *ngIf=\"receipt.paymentDao[0].checkAmount != 0\">\n                                        Check:\n                                    </div>\n                                    <div class=\"col-md-6\" *ngIf=\"receipt.paymentDao[0].checkAmount != 0\">\n                                        $ {{receipt.paymentDao[0].checkAmount}}\n                                    </div>\n                                </div>\n\n                                <div class=\"row\">\n                                    <div class=\"col-md-6\" *ngIf=\"receipt.paymentDao[0].storeCredit != 0\">\n                                        Store Credit:\n                                    </div>\n                                    <div class=\"col-md-6\" *ngIf=\"receipt.paymentDao[0].storeCredit != 0\">\n                                        $ {{receipt.paymentDao[0].storeCredit}}\n                                    </div>\n                                </div>\n\n                                <div class=\"row\">\n                                    <div class=\"col-md-6\" *ngIf=\"receipt.paymentDao[0].onAccount != 0\">\n                                        On Account:\n                                    </div>\n                                    <div class=\"col-md-6\" *ngIf=\"receipt.paymentDao[0].onAccount != 0\">\n                                        $ {{receipt.paymentDao[0].onAccount}}\n                                    </div>\n                                </div>\n\n                                <hr>\n\n                                <div class=\"row\">\n                                    <div class=\"col-md-6\">\n                                        Balance:\n                                    </div>\n                                    <div class=\"col-md-6\">\n                                        $ {{receipt.transactionBalance}}\n                                    </div>\n                                </div>\n\n\n\n                            </div>\n                        </div>\n\n                    </div>\n                </ng-template>\n            </p-dataTable>\n\n        </div>\n    </mat-card-content>\n</mat-card>\n\n\n\n<!-- Start of Void Transacton -->\n<div class=\"modal fade\" id=\"voidTransaction\" role=\"dialog\">\n    <div class=\"modal-dialog modal-sm\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">Void Sale</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            </div>\n            <div class=\"modal-body\">\n                <p>Are You Sure You Want To Void This Sale</p>\n            </div>\n            <div class=\"modal-footer\">\n\n                <button type=\"button\" class=\"btn btn-danger\" data-dismiss=\"modal\" (click)=\"this.voidTransaction()\">Yes</button>\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancle</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n<!-- End of Void Transacton -->"

/***/ }),

/***/ "../../../../../src/app/sell/sales-history/sales-history.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SalesHistoryComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_sell_sell_service__ = __webpack_require__("../../../../../src/app/sell/sell.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_shared_services_date_service__ = __webpack_require__("../../../../../src/app/shared/services/date.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_ng2_toastr__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_loading_service__ = __webpack_require__("../../../../../src/app/loading.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var SalesHistoryComponent = /** @class */ (function () {
    function SalesHistoryComponent(sellService, fb, dateService, http, toastr, loadingServie) {
        this.sellService = sellService;
        this.fb = fb;
        this.dateService = dateService;
        this.http = http;
        this.toastr = toastr;
        this.loadingServie = loadingServie;
        this.currentDate = new Date();
        this.transactionDetails = [];
        this.transactionDetailsOriginal = [];
        this.salesHistoryDropdown = 'Today';
        this.dateDto = new __WEBPACK_IMPORTED_MODULE_4_app_shared_services_date_service__["a" /* DateDto */]();
        // searchByCustomerInputBox: string;
        this.searchByCustomerInputBox = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]();
        this.searchByReceiptNoInputBox = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]();
        this.searchByTransactionType = 'All Transaction Status';
    }
    SalesHistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.searchByCustomerInputBox.valueChanges
            .debounceTime(800)
            .distinctUntilChanged()
            .subscribe(function (change) {
            _this.filterTransactionDetails(change, 'Customer');
        });
        this.searchByReceiptNoInputBox.valueChanges
            .distinctUntilChanged()
            .subscribe(function (change) {
            _this.filterTransactionDetails(change, 'Recipt-No');
        });
        this.getTransactionDetails(this.salesHistoryDropdown);
        // this.customDate = this.fb.group({
        //   'fromDate' : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        //   'toDate': moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        // });
        this.customDate = this.fb.group({
            'fromDate': new Date(),
            'toDate': new Date()
        });
        this.customDate.valueChanges
            .subscribe(function (change) {
            console.log('Custom Date', change);
            _this.loadingServie.loading = true;
            var customDateValues = change;
            _this.sellService.getTransactionDetails(__WEBPACK_IMPORTED_MODULE_2_moment__(customDateValues.fromDate).hour(0).format('YYYY-MM-DD HH:mm:ss'), __WEBPACK_IMPORTED_MODULE_2_moment__(customDateValues.toDate).hour(23).minute(59).format('YYYY-MM-DD HH:mm:ss'))
                .subscribe(function (transaction) {
                transaction.forEach(function (trans) {
                    trans.time = __WEBPACK_IMPORTED_MODULE_2_moment__(trans.date).format('hh:mm A');
                    trans.date = __WEBPACK_IMPORTED_MODULE_2_moment__(trans.date).format('MM-DD-YYYY');
                });
                _this.transactionDetails = transaction;
                _this.loadingServie.loading = false;
            });
        });
    };
    SalesHistoryComponent.prototype.printReceipt = function (transaction) {
        this.sellService.printReceipt(transaction);
    };
    SalesHistoryComponent.prototype.onTransactionTypeDropdownChoose = function () {
        this.filterTransactionDetails(this.searchByTransactionType, 'Transaction-Type');
    };
    SalesHistoryComponent.prototype.getTransactionDetails = function (inputDate) {
        var _this = this;
        this.loadingServie.loading = true;
        if (inputDate == 'Today') {
            this.dateDto = this.dateService.getCurrentDay();
        }
        else if (inputDate == 'Yesterday') {
            this.dateDto = this.dateService.getPreviousDay();
        }
        else if (inputDate == 'This Week') {
            this.dateDto = this.dateService.getLast7Day();
        }
        else if (inputDate == 'Last Week') {
            this.dateDto = this.dateService.getLast7Day();
        }
        else if (inputDate == 'This Month') {
            this.dateDto = this.dateService.getCurrentMonth();
        }
        else if (inputDate == 'Last Month') {
            this.dateDto = this.dateService.getLastMonth();
        }
        else if (inputDate == 'Last 3 Months') {
            this.dateDto = this.dateService.getLast3Months();
        }
        else if (inputDate == 'Last 6 Months') {
            this.dateDto = this.dateService.getLast6Months();
        }
        else if (inputDate == 'This Year') {
            this.dateDto = this.dateService.getCurrentYear();
        }
        else if (inputDate == 'Last Year') {
            this.dateDto = this.dateService.getLastYear();
        }
        // else if(inputDate == 'Custom') {
        //   this.dateDto.startDate = this.customDate.get('fromDate').value;
        //   this.dateDto.endDate = this.customDate.get('toDate').value;
        // }
        this.sellService.getTransactionDetails(this.dateDto.startDate, this.dateDto.endDate)
            .subscribe(function (transaction) {
            transaction.forEach(function (trans) {
                trans.time = __WEBPACK_IMPORTED_MODULE_2_moment__(trans.date).format('hh:mm A');
                trans.date = __WEBPACK_IMPORTED_MODULE_2_moment__(trans.date).format('MM-DD-YYYY');
            });
            _this.transactionDetailsOriginal = transaction;
            _this.transactionDetails = _this.transactionDetailsOriginal;
            _this.loadingServie.loading = false;
        });
    };
    SalesHistoryComponent.prototype.filterTransactionDetails = function (input, searchType) {
        // console.log('Transaction details Object', this.transactionDetails)
        if (input.length > 0)
            this.transactionDetails = this.nowFilterTransaction(input, this.transactionDetailsOriginal, searchType);
        else
            this.getTransactionDetails(this.salesHistoryDropdown);
    };
    SalesHistoryComponent.prototype.nowFilterTransaction = function (query, transactionDetailsList, searchType) {
        var filtered = [];
        for (var i = 0; i < transactionDetailsList.length; i++) {
            var trans = transactionDetailsList[i];
            if (searchType == 'Customer') {
                if (null != trans.customerFirstLastName && null != trans.customerPhoneno) {
                    if (trans.customerFirstLastName.toLowerCase().includes(query.toLowerCase()) || trans.customerPhoneno.includes(query)) {
                        filtered.push(trans);
                    }
                }
            }
            if (searchType == 'Recipt-No') {
                if (trans.transactionComId.toString().includes(query)) {
                    filtered.push(trans);
                }
            }
            if (searchType == 'Transaction-Type') {
                if (trans.status.includes(query)) {
                    filtered.push(trans);
                }
                else if (query == 'All Transaction Status') {
                    this.getTransactionDetails(this.salesHistoryDropdown);
                }
            }
        }
        return filtered;
    };
    SalesHistoryComponent.prototype.setTransactoinToVoid = function (transaction) {
        this.transactionToVoid = transaction;
    };
    // Here i am setting status to void for transaction and transaction lineitem
    SalesHistoryComponent.prototype.voidTransaction = function () {
        var _this = this;
        // TODO need to figure out this timing issue. i can not send current tim, because user may want to see when this transactoin is created.
        this.transactionToVoid.date = __WEBPACK_IMPORTED_MODULE_2_moment__(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.transactionToVoid.status = 'Void';
        this.transactionToVoid.transactionLineItemDaoList.forEach(function (lineItem) {
            lineItem.status = 'Void';
            lineItem.date = __WEBPACK_IMPORTED_MODULE_2_moment__(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        });
        this.transactionToVoid.paymentDao.forEach(function (payment) {
            payment.status = 'Void';
        });
        this.sellService.addTransactionDetails(this.transactionToVoid)
            .subscribe(function (data) {
            _this.toastr.success('Transaction Voided Successfully !!!', 'Success!');
            console.log(data);
        }, function (error) {
            _this.toastr.error(error, 'Error!');
            console.log(JSON.stringify(error.json()));
        });
    };
    SalesHistoryComponent.prototype.sendEmail = function (transaction) {
        var _this = this;
        if (null != transaction && null != transaction.customerPhoneno && transaction.customerPhoneno.length > 0) {
            // Todo need to add sppiner for this so user can wait that email is sending, cuase its taking littel bit more time to send an email.
            this.sellService.sendEmail(transaction.transactionComId)
                .subscribe(function (data) {
                _this.loadingServie.loading = true;
                if (data.text()) {
                    _this.loadingServie.loading = false;
                    _this.toastr.success('Email Send Sucessfully !!', 'Success!');
                }
                console.log('send email response', data.text());
            }, function (error) {
                _this.loadingServie.loading = false;
                _this.toastr.error('Something goes wrong, not able to send an email now !!', 'Error!');
                console.log(JSON.stringify(error.json()));
            });
        }
        else {
            this.toastr.error('Can not find email address for transaction !!', 'Error!');
        }
    };
    SalesHistoryComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sales-history',
            template: __webpack_require__("../../../../../src/app/sell/sales-history/sales-history.component.html"),
            styles: [__webpack_require__("../../../../../src/app/sell/sales-history/sales-history.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_sell_sell_service__["a" /* SellService */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_4_app_shared_services_date_service__["b" /* DateService */], __WEBPACK_IMPORTED_MODULE_5__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_6_ng2_toastr__["ToastsManager"], __WEBPACK_IMPORTED_MODULE_7_app_loading_service__["a" /* LoadingService */]])
    ], SalesHistoryComponent);
    return SalesHistoryComponent;
}());



/***/ }),

/***/ "../../../../../src/app/sell/sell-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SellRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_sell_sell_component__ = __webpack_require__("../../../../../src/app/sell/sell.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_employee_employee_component__ = __webpack_require__("../../../../../src/app/employee/employee.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_employee_clockin_clockin_component__ = __webpack_require__("../../../../../src/app/employee/clockin/clockin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_expense_expense_component__ = __webpack_require__("../../../../../src/app/expense/expense.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_sell_sales_history_sales_history_component__ = __webpack_require__("../../../../../src/app/sell/sales-history/sales-history.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_shared_storesetup_storesetup_component__ = __webpack_require__("../../../../../src/app/shared/storesetup/storesetup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_app_auth_auth_guard__ = __webpack_require__("../../../../../src/app/auth/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_sell_return_sale_return_sale_component__ = __webpack_require__("../../../../../src/app/sell/return-sale/return-sale.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_sell_sale_sale_component__ = __webpack_require__("../../../../../src/app/sell/sale/sale.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_sell_close_register_close_register_component__ = __webpack_require__("../../../../../src/app/sell/close-register/close-register.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












var routes = [
    {
        path: 'sell',
        component: __WEBPACK_IMPORTED_MODULE_2_app_sell_sell_component__["b" /* SellComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_8_app_auth_auth_guard__["a" /* AuthGuard */]],
        children: [
            { path: '', redirectTo: 'sale', pathMatch: 'prefix' },
            { path: 'close-shift', component: __WEBPACK_IMPORTED_MODULE_11_app_sell_close_register_close_register_component__["a" /* CloseRegisterComponent */] },
            { path: 'return', component: __WEBPACK_IMPORTED_MODULE_9_app_sell_return_sale_return_sale_component__["a" /* ReturnSaleComponent */] },
            { path: 'close-register', component: __WEBPACK_IMPORTED_MODULE_11_app_sell_close_register_close_register_component__["a" /* CloseRegisterComponent */] },
            { path: 'sale', component: __WEBPACK_IMPORTED_MODULE_10_app_sell_sale_sale_component__["b" /* SaleComponent */] }
        ]
    },
    { path: 'employee', component: __WEBPACK_IMPORTED_MODULE_3_app_employee_employee_component__["a" /* EmployeeComponent */] },
    { path: 'clockIn/:username', component: __WEBPACK_IMPORTED_MODULE_4_app_employee_clockin_clockin_component__["b" /* ClockinComponent */] },
    { path: 'expense', component: __WEBPACK_IMPORTED_MODULE_5_app_expense_expense_component__["a" /* ExpenseComponent */] },
    {
        path: 'sales-history',
        component: __WEBPACK_IMPORTED_MODULE_6_app_sell_sales_history_sales_history_component__["a" /* SalesHistoryComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_8_app_auth_auth_guard__["a" /* AuthGuard */]],
    },
    { path: 'setting', component: __WEBPACK_IMPORTED_MODULE_7_app_shared_storesetup_storesetup_component__["a" /* StoresetupComponent */] }
];
var SellRoutingModule = /** @class */ (function () {
    function SellRoutingModule() {
    }
    SellRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"].forChild(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["RouterModule"]]
        })
    ], SellRoutingModule);
    return SellRoutingModule;
}());



/***/ }),

/***/ "../../../../../src/app/sell/sell.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n    <app-top-sub-navbar [menu]=\"this.items\"></app-top-sub-navbar>\n    <div class=\"\">\n        <router-outlet></router-outlet>\n    </div>\n</div>"

/***/ }),

/***/ "../../../../../src/app/sell/sell.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".borderless td,\n.borderless th {\n  border: none; }\n\n.a :hover {\n  background: #3374C2; }\n\n.wid100 {\n  width: 100% !important; }\n\n.primary-button {\n  background-color: #41AF4B;\n  color: #FFF;\n  height: 50px;\n  width: 100%;\n  font-size: 20px; }\n\n.danger-button {\n  background-color: #dc3545;\n  color: #FFF;\n  height: 50px;\n  width: 100%;\n  font-size: 20px; }\n\n.secondary-button {\n  background-color: #6692B0;\n  height: 50px;\n  width: 100%;\n  color: #FFF;\n  font-size: 20px; }\n\n.customer td,\n.customer th {\n  padding: 10px 10px; }\n\n.customer dl.row {\n  margin: 0px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between; }\n  .customer dl.row dt {\n    text-align: left; }\n  .customer dl.row dd {\n    text-align: right;\n    margin: 0px; }\n\n.sales-total dl {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  font-size: 17px; }\n\n.quantity-updated {\n  background: greenyellow;\n  padding: 9px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/sell/sell.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SellComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Product; });
/* unused harmony export TransactionLineItemDaoList */
/* unused harmony export TransactionDtoList */
/* unused harmony export PaymentDto */
/* unused harmony export PaymentObjectForPaymentSellTable */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_sell_sell_service__ = __webpack_require__("../../../../../src/app/sell/sell.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__("../../../../rxjs/_esm5/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_services_persistence_service__ = __webpack_require__("../../../../../src/app/shared/services/persistence.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_shared_storesetup_storesetup_service__ = __webpack_require__("../../../../../src/app/shared/storesetup/storesetup.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_customer_customer_service__ = __webpack_require__("../../../../../src/app/customer/customer.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_customer_customer_component__ = __webpack_require__("../../../../../src/app/customer/customer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_app_shared_animations_fade_in_animation__ = __webpack_require__("../../../../../src/app/shared/animations/fade-in.animation.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_toastr_src_toast_manager__ = __webpack_require__("../../../../ng2-toastr/src/toast-manager.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_ng2_toastr_src_toast_manager___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_ng2_toastr_src_toast_manager__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};













var SellComponent = /** @class */ (function () {
    function SellComponent(sellService, persit, storeSetupService, customerService, sanitizer, route, router, toastr) {
        this.sellService = sellService;
        this.persit = persit;
        this.storeSetupService = storeSetupService;
        this.customerService = customerService;
        this.sanitizer = sanitizer;
        this.route = route;
        this.router = router;
        this.toastr = toastr;
        this.myControl = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormControl"]();
        this.isProductExistsInSellList = false;
        this.transactionDtoList = new TransactionDtoList();
        this.paymentDto = new PaymentDto();
        this.a = 'sdfds';
        this.showCustomerDetails = false;
        // disableCustomerSearchTextbox: boolean = false;
        // paymentObjectForPaymentSellTable = new Array <PaymentObjectForPaymentSellTable[]>();
        this.paymentObjectForPaymentSellTable = [];
        // This help when customer has paid full amount, so now user should not able to click on any payment button.
        // These both buttons are on payment page pop up.
        this.disablePaymentButtons = false;
        this.disablePaymentButtonsWithAmount = false;
        this.disableCompleteSaleButton = true;
        this.payLable = 'Pay:';
        this.amountDueLable = 'Amount Due:';
        this.paymentDao = [];
        // This button is on sale page, not on pyament popup page.
        this.paymentButtonOnSale = true;
        this.transactionNotes = '';
        this.disableOnAccountButtons = true;
        this.disableStoreCreditButtons = true;
        this.saleType = 'Complete';
        this.printTransactionDto = null;
    }
    // 
    SellComponent.prototype.ngOnInit = function () {
        // if (this.router.url == "/sell")
        //   this.router.navigate(['/sell/sale']);
        var _this = this;
        this.items = [
            { name: 'Return', icon: 'fa fa-reply-all fa-x ', link: '/sell/return' },
            { name: 'Close Register', icon: 'fa fa-window-close-o fa-x', link: '/sell/close-register' },
            { name: 'Close Shift', icon: 'fa fa-times fa-x', link: '/sell/close-shift' }
        ];
        // this.toastr.success("Sell component initiated", "Nice!");
        this.storeSetupService.getStoreDetails().
            then(function (data) {
            _this.storeDetails = data;
        });
        var transactionComId = this.route.snapshot.paramMap.get('transactionComId');
        if (transactionComId) {
            this.returnSale(transactionComId);
        }
        // This call is to get all customer details.
        //this.getCustomerDetails();
        // Here i am checking that customer already selected on sale page or not.
        this.selectedCustomer = this.persit.getCustomerDetailsForSale();
        this.cols = [
            { field: 'productNo', header: 'ProductNo' },
            { field: 'description', header: 'Description' },
            { field: 'retail', header: 'Retail' },
            { field: 'defaultQuantity', header: 'Quantity' },
            { field: 'retailDiscount', header: 'RetailWithDis' },
            { field: 'totalProductPrice', header: 'Total' },
            { field: 'quantity', header: 'In-Stock' }
        ];
        console.log(this.persit.getProducts());
        this.transactionLineItemDaoList = this.persit.getProducts() || [];
        // this will show transaction data on right side on refresh or on load of the page
        this.setTransactionDtoList(this.transactionLineItemDaoList);
    };
    SellComponent.prototype.ngAfterViewInit = function () {
        // This will focus on the autocomplete field
        $('#productsearch > span > input').focus();
    };
    SellComponent.prototype.openSellCustomerView = function () {
        var url = '/sell-customer';
        window.open(url, '_blank', 'toolbar=0,location=0,menubar=0');
    };
    SellComponent.prototype.filterProducts = function (event) {
        var _this = this;
        var query = event.query;
        this.sellService.getProductDetails()
            .subscribe(function (products) {
            // console.log(products);
            _this.product = _this.filterProduct(query, products);
        });
    };
    SellComponent.prototype.filterCustomers = function (event) {
        var _this = this;
        var query = event.query;
        this.customerService.getCustomerDetails()
            .subscribe(function (customers) {
            // console.log(products);
            _this.filteredCustomer = _this.filterCustomer(query, customers);
        });
    };
    SellComponent.prototype.getCustomerDetails = function () {
        var _this = this;
        this.customerService.getCustomerDetails()
            .subscribe(function (customer) {
            _this.customerDto = customer;
        });
    };
    SellComponent.prototype.addTransactionLineItem = function (productObj) {
        var _this = this;
        // This is fisrt time when user is adding product to sell.
        if (this.transactionLineItemDaoList.length == 0) {
            productObj.totalProductPrice = parseFloat(productObj.retail.toFixed(2));
            productObj.taxAmountOnProduct = (productObj.retail * 7) / 100;
            console.log("when add product", productObj);
            this.transactionLineItemDaoList.push(productObj);
            this.product = null;
            this.p = null;
            this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
            this.setTransactionDtoList(this.transactionLineItemDaoList);
            // This will save the data into local storage.
            this.persit.setProducts(this.transactionLineItemDaoList);
        }
        else {
            var _loop_1 = function (lineItem) {
                if (productObj.productNo === lineItem.productNo) {
                    // This flag helps to determin whether to add new product or just update the quantity
                    this_1.isProductExistsInSellList = true;
                    lineItem.defaultQuantity = +lineItem.defaultQuantity + 1;
                    lineItem.quantityUpdated = true;
                    // here  i need to get value of lineitem.retail becuase user might have change the retial price so, if i dont do lineitem.retail it will take old retail price.
                    lineItem.totalProductPrice = parseFloat((lineItem.retail * lineItem.defaultQuantity).toFixed(2));
                    lineItem.taxAmountOnProduct = (lineItem.retail * 7) / 100;
                    console.log("when add product", productObj);
                    this_1.transactionLineItemDaoList = this_1.transactionLineItemDaoList.slice();
                    this_1.product = null;
                    this_1.p = null;
                    console.log(this_1.transactionLineItemDaoList);
                    this_1.setTransactionDtoList(this_1.transactionLineItemDaoList);
                    this_1.persit.setProducts(this_1.transactionLineItemDaoList);
                    setTimeout(function () {
                        lineItem.quantityUpdated = false;
                        _this.persit.setProducts(_this.transactionLineItemDaoList);
                        _this.transactionLineItemDaoList = _this.transactionLineItemDaoList.slice();
                    }, 3000);
                    return "break";
                }
                else {
                    // This flag helps to determin whether to add new product or just update the quantity
                    this_1.isProductExistsInSellList = false;
                }
            };
            var this_1 = this;
            // Checking weather user is adding same product agian or not if its true
            //  then just update the quantity of that product by 1.
            for (var _i = 0, _a = this.transactionLineItemDaoList; _i < _a.length; _i++) {
                var lineItem = _a[_i];
                var state_1 = _loop_1(lineItem);
                if (state_1 === "break")
                    break;
            }
            // This flag helps to determin whether to add new product or just update the quantity
            if (!this.isProductExistsInSellList) {
                this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
                productObj.totalProductPrice = productObj.retail * productObj.defaultQuantity;
                productObj.taxAmountOnProduct = parseFloat(((productObj.retail * 7) / 100).toFixed(2));
                console.log("when add product", productObj);
                this.transactionLineItemDaoList.push(productObj);
                this.product = null;
                this.p = null;
                console.log(this.transactionLineItemDaoList);
                this.setTransactionDtoList(this.transactionLineItemDaoList);
                this.persit.setProducts(this.transactionLineItemDaoList);
            }
        }
        $("lineitem" + productObj.productNo).ready(function () {
            // $(`lineitem${productObj.productNo}`).sc
            document.getElementById("lineitem" + productObj.productNo).scrollIntoView();
        });
        return this.transactionLineItemDaoList;
    };
    // #productsearch > span > input
    SellComponent.prototype.testFocus = function () {
        // document.querySelector("#productsearch > span > input").focus();
        $('#productsearch > span > input').focus();
    };
    // This method helps when user try to change retial price or quanity from the sell text box.
    SellComponent.prototype.submitProduct = function (value) {
        if (typeof value === 'string') {
            console.log('This is value: ', value);
            // this is the senario where user is adding new product to Sell
            if (this.product != null && this.product.length > 0) {
                // this.addTransactionLineItem(this.product[0]);
            }
            else if (value !== '' && value !== undefined && value.indexOf('.') !== 0) {
                if (value.match(/[a-z]/i))
                    console.log('contains only charcters');
                // this mean this is decimal value so it will change the retail price of the product
                if (value.match(/[0-9]/i) && value.indexOf('.') > 0)
                    this.updateProductPrice(value);
                else if (value.match(/[0-9]/i) && value.length < 5)
                    this.updateProductQuantity(value);
            }
        }
        else if (value != null) {
            this.addTransactionLineItem(value);
        }
    };
    SellComponent.prototype.updateProductQuantity = function (value) {
        console.log('Quantity change');
        this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity = value;
        this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = parseFloat((this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity).toFixed(2));
        this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
        this.setTransactionDtoList(this.transactionLineItemDaoList);
        this.persit.setProducts(this.transactionLineItemDaoList);
        this.p = null;
    };
    SellComponent.prototype.updateProductPrice = function (value) {
        console.log('Price change');
        var oldRetail = this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail;
        var discount = 0.00;
        this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail = value;
        this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = (this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity);
        console.log("outside if", this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail);
        if (value < oldRetail) {
            discount = oldRetail - value;
            console.log("discount", discount);
            this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retailDiscount = discount;
            console.log("lineitem discount:", oldRetail - value);
        }
        console.log("after if if", value);
        console.log("discount", discount);
        console.log("discount");
        this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
        this.setTransactionDtoList(this.transactionLineItemDaoList);
        this.persit.setProducts(this.transactionLineItemDaoList);
        this.p = null;
    };
    // updateProductPrice(value: any) {
    //   console.log('Price change');
    //   this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail = value;
    //   this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].totalProductPrice = (this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].retail * this.transactionLineItemDaoList[this.transactionLineItemDaoList.length - 1].defaultQuantity);
    //   this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
    //   this.setTransactionDtoList(this.transactionLineItemDaoList)
    //   this.persit.setProducts(this.transactionLineItemDaoList);
    //   this.p = null;
    // }
    // this method helps to update lineItem Detail when user change the quatity or change the retail from editable box
    SellComponent.prototype.updateLineItemDetails = function (event) {
        this.transactionLineItemDaoList[event.index].defaultQuantity = event.data.defaultQuantity;
        this.transactionLineItemDaoList[event.index].retail = event.data.retail;
        this.transactionLineItemDaoList[event.index].totalProductPrice = (event.data.defaultQuantity * event.data.retail);
        this.transactionLineItemDaoList[event.index].taxAmountOnProduct = ((event.data.defaultQuantity * event.data.retail) * 7) / 100;
        this.setTransactionDtoList(this.transactionLineItemDaoList);
        this.persit.setProducts(this.transactionLineItemDaoList);
    };
    SellComponent.prototype.setDiscountType = function (discountType) {
        console.log("inside set discount type", discountType);
        if (discountType == 'By Amount') {
            this.discountType = discountType;
        }
        else if (discountType == 'By Percentage') {
            this.discountType = discountType;
        }
    };
    SellComponent.prototype.calculateDiscount = function (value) {
        console.log("inside calculate discount", value);
        if (this.discountType == 'By Amount') {
            this.transactionDtoList.totalDiscount = value;
            // Here need to calculate tax because, now we have to apply tax on the amount which come after discount
            this.transactionDtoList.tax = ((this.transactionDtoList.subtotal - this.transactionDtoList.totalDiscount) * 7) / 100;
            // Here i have to subtract the subtotal from the discount, if i do from total then it will be wrong cause it has alredy calculted tax on it.
            this.transactionDtoList.totalAmount = (this.transactionDtoList.subtotal - this.transactionDtoList.totalDiscount) + this.transactionDtoList.tax;
            // Need to do this here, cause then only it will show same amount on payment popup.    this.payAmountTextBox = this.transactionDtoList.totalAmount;
            this.dueAmountForTransaction = this.transactionDtoList.totalAmount;
        }
        else if (this.discountType == 'By Percentage') {
            this.transactionDtoList.totalDiscount = parseFloat(((this.transactionDtoList.totalAmount * value) / 100).toFixed(2));
            // Here need to calculate tax because, now we have to apply tax on the amount which come after discount
            this.transactionDtoList.tax = ((this.transactionDtoList.subtotal - this.transactionDtoList.totalDiscount) * 7) / 100;
            this.transactionDtoList.totalAmount = (this.transactionDtoList.subtotal - this.transactionDtoList.totalDiscount) + this.transactionDtoList.tax;
            // Need to do this here, cause then only it will show same amount on payment popup.
            this.payAmountTextBox = this.transactionDtoList.totalAmount;
            this.dueAmountForTransaction = this.transactionDtoList.totalAmount;
        }
    };
    SellComponent.prototype.setTransactionDtoList = function (lineItem) {
        var totalQuantity = 0;
        var totalPrice = 0.00;
        var tax = 0.00;
        if (this.selectedCustomer && this.saleType == 'Complete') {
            this.transactionDtoList.totalAmount = this.selectedCustomer.balance;
        }
        else {
            this.transactionDtoList.totalAmount = 0.00;
        }
        for (var i = 0; i < lineItem.length; i++) {
            totalQuantity = +lineItem[i].defaultQuantity + totalQuantity;
            totalPrice = +lineItem[i].totalProductPrice + totalPrice;
            // Here totalProductPriceWithTax mean, only amount of the tax on that product dont get confuse with naming
            tax = +(lineItem[i].totalProductPrice * 7) / 100 + tax;
            console.log("totalQuantity", totalQuantity);
            console.log("totalPrice", totalPrice);
            console.log("totalTax", tax);
        }
        this.transactionDtoList.quantity = parseFloat(totalQuantity.toFixed(2));
        this.transactionDtoList.subtotal = parseFloat(totalPrice.toFixed(2));
        this.transactionDtoList.tax = parseFloat(tax.toFixed(2));
        this.transactionDtoList.totalAmount = this.transactionDtoList.totalAmount + parseFloat(((totalPrice) + tax).toFixed(2));
        // This logic helps to manage main payment button enable or diable.
        if (this.transactionDtoList.totalAmount == 0) {
            this.paymentButtonOnSale = true;
        }
        else {
            this.paymentButtonOnSale = false;
        }
        // These for sale page pop -- First row.
        this.payAmountTextBox = this.transactionDtoList.totalAmount;
        this.dueAmountForTransaction = this.transactionDtoList.totalAmount;
    };
    SellComponent.prototype.filterProduct = function (query, products) {
        var filtered = [];
        for (var i = 0; i < products.length; i++) {
            var p = products[i];
            if (p.description.toLowerCase().includes(query.toLowerCase()) || p.productNo.includes(query)) {
                filtered.push(p);
            }
        }
        return filtered;
    };
    SellComponent.prototype.filterCustomer = function (query, customers) {
        var filtered = [];
        for (var i = 0; i < customers.length; i++) {
            var cust = customers[i];
            if (cust.name.toLowerCase().includes(query.toLowerCase()) || cust.companyName.toLowerCase().includes(query.toLowerCase()) || cust.phoneNo.includes(query)) {
                filtered.push(cust);
            }
        }
        return filtered;
    };
    SellComponent.prototype.submitCustomer = function () {
        // this.selectedCustomer = value;
        // this.cust = null;
        // this.disableCustomerSearchTextbox = true;
        // Storing customer detials into local storage.
        this.persit.setCustomerDetailsForSale(this.selectedCustomer);
        // Need to do this to add balance into transaction details
        this.setTransactionDtoList(this.transactionLineItemDaoList);
        console.log('customer', this.selectedCustomer);
    };
    // This will remove the customer from local storage.
    SellComponent.prototype.removeCustomerOnSale = function () {
        this.persit.clearCustomer();
        this.selectedCustomer = null;
        this.cust = null;
        // this.disableCustomerSearchTextbox = false;
        this.setTransactionDtoList(this.transactionLineItemDaoList);
    };
    SellComponent.prototype.showPopover = function (discount) {
        var _a = discount.getBoundingClientRect(), x = _a.x, y = _a.y;
        if (this.popoverStyle)
            this.popoverStyle = null;
        else
            this.popoverStyle = this.sanitizer.bypassSecurityTrustStyle("position: absolute; transform: translate3d(" + (x - 271.86 - 10) + "px, " + (y - 74.5) + "px, 0px); top: 0px; left: 0px; will-change: transform;");
        // console.log();
    };
    SellComponent.prototype.print = function (obj) {
        console.log("Coming form print", obj);
    };
    SellComponent.prototype.deleteProduct = function () {
        console.log("inside delete");
        var index = this.transactionLineItemDaoList.indexOf(this.selectedProduct, 0);
        console.log("index", index);
        if (index > -1) {
            this.transactionLineItemDaoList.splice(index, 1);
            this.transactionLineItemDaoList = this.transactionLineItemDaoList.slice();
            this.setTransactionDtoList(this.transactionLineItemDaoList);
            this.persit.setProducts(this.transactionLineItemDaoList);
        }
    };
    // test(a: number) {
    //   this.calculateDiscountByAmount(a);
    //   alert("hi");
    //   console.log("insod test", event);
    // }
    SellComponent.prototype.setProductForDelete = function (product) {
        this.selectedProduct = product;
        this.popupHeader = 'Delete Product';
        this.popupMessage = 'Are You Sure You Want To Delete Product?';
    };
    //This methode will completly remove the all transaction line item and transaction details.
    SellComponent.prototype.disgardCompleteSale = function () {
        this.persit.clearProducts();
        this.persit.clearCustomer();
        this.transactionLineItemDaoList = [];
        // This is very import fist i need to remove the cusotmer details and then only call set transaction otherwise customer balace will stays and will show amount on payment which is wrong.
        this.selectedCustomer = null;
        this.setTransactionDtoList([]);
        // this.disableCustomerSearchTextbox = false;    
        this.saleType = 'Complete';
        this.router.navigate(['/sell']);
    };
    SellComponent.prototype.setHeaderAndMessageForDisgardPopup = function () {
        this.popupHeader = 'Discard Sale';
        this.popupMessage = 'Are You Sure You Want To Delete Complete Sale?';
    };
    SellComponent.prototype.setPaymentDto = function (paymentType, paymentAmount) {
        if (this.saleType == 'Return') {
            this.setPaymentDtoForRetun(paymentType, this.payAmountTextBox);
        }
        else {
            if (paymentType == 'Cash') {
                // This is very rare scenario and it happens only if user is stupid but still i need to handle this,
                // Cause user can pay in cash two time by click on cash button by seletecting different buttons.
                if (null != this.paymentDto && this.paymentDto.cash > 0) {
                    this.paymentDto.cash = +this.paymentDto.cash + paymentAmount;
                }
                else {
                    // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
                    if (paymentAmount > this.dueAmountForTransaction) {
                        this.paymentDto.cash = this.dueAmountForTransaction;
                    }
                    else {
                        this.paymentDto.cash = paymentAmount;
                    }
                }
                this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Cash', 'paymentAmount': paymentAmount });
                this.validatePaymentButtons(paymentAmount);
            }
            else if (paymentType == 'Credit') {
                if (null != this.paymentDto && this.paymentDto.credit > 0) {
                    this.paymentDto.credit = +this.paymentDto.credit + paymentAmount;
                }
                else {
                    // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
                    if (paymentAmount > this.dueAmountForTransaction) {
                        this.paymentDto.credit = this.dueAmountForTransaction;
                    }
                    else {
                        this.paymentDto.credit = paymentAmount;
                    }
                }
                this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Credit', 'paymentAmount': paymentAmount });
                this.validatePaymentButtons(paymentAmount);
            }
            else if (paymentType == 'Debit') {
                if (null != this.paymentDto && this.paymentDto.debit > 0) {
                    this.paymentDto.debit = +this.paymentDto.debit + paymentAmount;
                }
                else {
                    // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
                    if (paymentAmount > this.dueAmountForTransaction) {
                        this.paymentDto.debit = this.dueAmountForTransaction;
                    }
                    else {
                        this.paymentDto.debit = paymentAmount;
                    }
                }
                this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Debit', 'paymentAmount': paymentAmount });
                this.validatePaymentButtons(paymentAmount);
            }
            else if (paymentType == 'Check') {
                if (null != this.paymentDto && this.paymentDto.checkAmount > 0) {
                    this.paymentDto.checkAmount = +this.paymentDto.checkAmount + paymentAmount;
                }
                else {
                    // I need to do this, cause right now if total is $20 and user click on $100 its storing as $100 in payment table which is wrong and will messed up whole reporting so need to manage here.
                    if (paymentAmount > this.dueAmountForTransaction) {
                        this.paymentDto.checkAmount = this.dueAmountForTransaction;
                    }
                    else {
                        this.paymentDto.checkAmount = paymentAmount;
                    }
                }
                this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Check', 'paymentAmount': paymentAmount });
                this.validatePaymentButtons(paymentAmount);
            }
            else if (paymentType == 'StoreCredit') {
                // First need to check store credit already there added in payment dao or not, 
                if (null != this.paymentDto && this.paymentDto.storeCredit > 0) {
                    if (paymentAmount > this.dueAmountForTransaction) {
                        // so By doing this i am just reducing the store credit which is used for this transaction and i can update rest on customer account.
                        this.paymentDto.storeCredit = +this.paymentDto.storeCredit + this.dueAmountForTransaction;
                        this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });
                        this.validatePaymentButtons(this.paymentDto.storeCredit);
                    }
                    else {
                        this.paymentDto.storeCredit = paymentAmount;
                        this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });
                        this.validatePaymentButtons(this.paymentDto.storeCredit);
                    }
                }
                else {
                    if (paymentAmount > this.dueAmountForTransaction) {
                        // so By doing this i am just reducing the store credit which is used for this transaction and i can update rest on customer account.
                        this.paymentDto.storeCredit = this.dueAmountForTransaction;
                        this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });
                        this.validatePaymentButtons(this.paymentDto.storeCredit);
                    }
                    else {
                        this.paymentDto.storeCredit = paymentAmount;
                        this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': this.paymentDto.storeCredit });
                        this.validatePaymentButtons(this.paymentDto.storeCredit);
                    }
                }
                // Now I have to handle two scenario
                // Case 1. Store credit can greater then equal to payment amount
                // Case 2. Store credit can less then equal to payment amount
                // Case 1: where payment amount is customers store credit because that what i am sending from ui
            }
            else if (paymentType == 'OnAccount') {
                this.paymentDto.onAccount = paymentAmount;
                this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'OnAccount', 'paymentAmount': paymentAmount });
                // In this flow customer is not paying anythig or paying some amount and other amoun he is just putting on his account and will pay later
                // So here i need to complete the transaction, thats why calling this method.
                //this.completeSale();
                //this.validatePaymentButtons(paymentAmount);
                this.disablePaymentButtons = true;
                this.disablePaymentButtonsWithAmount = true;
                // This mean customer has provide sufficient balance.
                this.disableCompleteSaleButton = false;
            }
            else if (paymentType == 'Loyalty') {
                this.paymentDto.loyalty = paymentAmount;
            }
            console.log('payment type and amount', paymentAmount);
        }
    };
    SellComponent.prototype.setPaymentDtoForRetun = function (paymentType, paymentAmount) {
        this.payLable = 'Return';
        this.amountDueLable = 'Return Amount:';
        if (paymentType == 'Cash') {
            this.paymentDto.cash = paymentAmount;
            this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Cash', 'paymentAmount': paymentAmount });
            this.validatePaymentForReturn();
        }
        else if (paymentType == 'Credit') {
            this.paymentDto.credit = paymentAmount;
            this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Credit', 'paymentAmount': paymentAmount });
            this.validatePaymentForReturn();
        }
        else if (paymentType == 'Debit') {
            this.paymentDto.debit = paymentAmount;
            this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Debit', 'paymentAmount': paymentAmount });
            this.validatePaymentForReturn();
        }
        else if (paymentType == 'Check') {
            this.paymentDto.checkAmount = paymentAmount;
            this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'Check', 'paymentAmount': paymentAmount });
            this.validatePaymentForReturn();
        }
        else if (paymentType == 'StoreCredit') {
            // Converting negative amount to positive so i can add this amount in backend.
            this.paymentDto.storeCredit = Math.abs(paymentAmount);
            this.paymentObjectForPaymentSellTable.push({ 'paymentType': 'StoreCredit', 'paymentAmount': paymentAmount });
            this.disableStoreCreditButtons = true;
            this.validatePaymentForReturn();
        }
    };
    SellComponent.prototype.validatePaymentForReturn = function () {
        this.disablePaymentButtons = true;
        this.disableCompleteSaleButton = false;
    };
    SellComponent.prototype.validatePaymentButtons = function (paymentAmount) {
        var totalPaidAmout = 0.00;
        // This means cutomer has paid full amount.
        if (this.dueAmountForTransaction - paymentAmount <= 0) {
            this.dueAmountForTransaction = this.dueAmountForTransaction - paymentAmount;
            this.disablePaymentButtons = true;
            this.disablePaymentButtonsWithAmount = true;
            this.payLable = 'Paid Amount:';
            this.amountDueLable = 'Change Amount:';
            // This mean customer has provide sufficient balance.
            this.disableCompleteSaleButton = false;
            // This logic helps to show the data in paid amount tax box when user exact amount or more.
            for (var _i = 0, _a = this.paymentObjectForPaymentSellTable; _i < _a.length; _i++) {
                var a = _a[_i];
                totalPaidAmout = totalPaidAmout + a.paymentAmount;
            }
            this.payAmountTextBox = totalPaidAmout;
        }
        else {
            // this.dueAmountForTransaction = Number.parseFloat((this.dueAmountForTransaction - paymentAmount).toFixed(2));
            this.dueAmountForTransaction = this.dueAmountForTransaction - paymentAmount;
            this.payAmountTextBox = this.dueAmountForTransaction;
        }
    };
    // This methode calls when user click on the payment button.
    SellComponent.prototype.setDataForPaymentModel = function () {
        // payaccountTextBox is bind with two binding so i need to intialize here, so i can show data on payment popup load.
        this.payAmountTextBox = this.dueAmountForTransaction;
        this.disablePaymentButtons = false;
        this.disablePaymentButtonsWithAmount = false;
        this.disableCompleteSaleButton = true;
        this.disableOnAccountButtons = this.selectedCustomer == null;
        // This mean this customer has some store credit to use so i need to enable store credit button.
        if (this.selectedCustomer && this.selectedCustomer.storeCredit > 0) {
            this.disableStoreCreditButtons = false;
        }
        else {
            this.disableStoreCreditButtons = true;
        }
        console.log("selected customer", this.selectedCustomer);
        console.log("inside the set data");
    };
    SellComponent.prototype.setDataForPaymentModelForReturnSale = function () {
        this.payAmountTextBox = this.dueAmountForTransaction;
        this.disablePaymentButtonsWithAmount = true;
        this.disableCompleteSaleButton = true;
        this.disableOnAccountButtons = true;
        if (this.selectedCustomer) {
            this.disableStoreCreditButtons = false;
        }
    };
    // This method helps to delete payment type and recaculate all other parameters.
    SellComponent.prototype.deletePaymentFromPaymentModel = function (payment) {
        if (this.saleType == 'Return') {
            var index = this.paymentObjectForPaymentSellTable.indexOf(payment);
            if (index > -1) {
                this.paymentObjectForPaymentSellTable.splice(index, 1);
                this.dueAmountForTransaction = payment.paymentAmount;
                this.payAmountTextBox = this.dueAmountForTransaction;
                this.disablePaymentButtons = false;
                this.disableCompleteSaleButton = true;
            }
        }
        else {
            var index = this.paymentObjectForPaymentSellTable.indexOf(payment);
            if (index > -1) {
                this.paymentObjectForPaymentSellTable.splice(index, 1);
                // Need to handle this, because i am adding payment type when user click on add payment,
                // So now when user delete the payment type, i need to change the payment object too, and remove the or subtract the payment amount.
                if (payment.paymentType == 'Cash' && payment.paymentAmount > 0) {
                    this.paymentDto.cash = this.paymentDto.cash - payment.paymentAmount;
                }
                if (payment.paymentType == 'Credit' && payment.paymentAmount > 0) {
                    this.paymentDto.credit = this.paymentDto.credit - payment.paymentAmount;
                }
                if (payment.paymentType == 'Debit' && payment.paymentAmount > 0) {
                    this.paymentDto.debit = this.paymentDto.debit - payment.paymentAmount;
                }
                if (payment.paymentType == 'Check' && payment.paymentAmount > 0) {
                    this.paymentDto.checkAmount = this.paymentDto.checkAmount - payment.paymentAmount;
                }
                if (payment.paymentType == 'StoreCredit' && payment.paymentAmount > 0) {
                    this.paymentDto.storeCredit = this.paymentDto.storeCredit - payment.paymentAmount;
                }
            }
            // This is because of stupid type script,  + it concatting the two variables.  DO NOT FORGET THIS. 
            this.dueAmountForTransaction = +payment.paymentAmount + this.dueAmountForTransaction;
            this.payAmountTextBox = this.dueAmountForTransaction;
            console.log('payment', payment.paymentAmount);
            console.log('Value of duw amout tran', this.dueAmountForTransaction);
            console.log('Value of paymenttexbox', this.payAmountTextBox);
        }
        if (this.dueAmountForTransaction > 0) {
            this.disableCompleteSaleButton = true;
            this.disablePaymentButtons = false;
            this.disablePaymentButtonsWithAmount = false;
        }
    };
    // This is the method which handle completing the transaction and reset the all flag and other data.
    SellComponent.prototype.completeSale = function () {
        var _this = this;
        // setting customer details
        if (null != this.selectedCustomer && this.selectedCustomer != undefined) {
            this.transactionDtoList.customerPhoneno = this.selectedCustomer.phoneNo;
            this.transactionDtoList.customerFirstLastName = this.selectedCustomer.name;
            this.transactionDtoList.previousBalance = this.selectedCustomer.balance;
        }
        else {
        }
        this.transactionDtoList.status = this.saleType;
        // This help only when user do return transaction where user gives store credit to the customer.
        this.transactionDtoList.previousTransactionId = this.previousTransactionId;
        // THIS means customer has over paid, this happens mostly in cash of when customer pay by cash.
        // So i am setting it as chnage amount.
        if (this.dueAmountForTransaction < 0) {
            this.paymentDto.changeForCash = Math.abs(this.dueAmountForTransaction);
        }
        else {
            this.transactionDtoList.transactionBalance = this.dueAmountForTransaction;
        }
        // seeting current date and time using momemt.
        this.transactionDtoList.date = __WEBPACK_IMPORTED_MODULE_8_moment__(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        // Setting payment dto into transaction dto, because can not send both as @request body mfrom angular..
        this.paymentDto.date = this.transactionDtoList.date;
        this.paymentDao.push(this.paymentDto);
        this.transactionDtoList.paymentDao = this.paymentDao;
        // Setting TransactionLineItemDetails
        for (var _i = 0, _a = this.transactionLineItemDaoList; _i < _a.length; _i++) {
            var lineItem = _a[_i];
            lineItem.status = this.saleType;
            lineItem.date = this.transactionDtoList.date;
            // I need to do this casue in backend i am using quantity and here i have to use defult quanity to show 1 as user insert product.
            lineItem.quantity = lineItem.defaultQuantity;
        }
        // this.transactionNotes is bind with the ng model on ui.
        this.transactionDtoList.note = this.transactionNotes;
        // To do need to fix this hardcoded value for username
        this.transactionDtoList.username = 'alok@alok.com';
        this.transactionDtoList.transactionLineItemDaoList = this.transactionLineItemDaoList;
        // NOW MAKING SERVICE CALL TO ADD TRANSACTION AND LINE ITEM DETAILS AND WILL ADD LINE ITEM DETAILS ONLY IF ADD TRANASACTION CALL IS SUCCESS !!!
        this.sellService.addTransactionDetails(this.transactionDtoList)
            .subscribe(function (data) {
            // alert('ok');
            _this.disableCompleteSaleButton = true;
            _this.printTransactionDto = data.json();
            console.log('addTransaction response', data);
            console.log('printTransaction dao', _this.printTransactionDto);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        }, function () {
        });
        //this.disableCompleteSaleButton = true;
        console.log('Transaction Details', this.transactionDtoList);
        console.log('TransactionLineItem Details', this.transactionLineItemDaoList);
        console.log('Payment Dto', this.paymentDto);
        //this.disablePaymentButtons = true;
        console.log("done with sales");
        // This will focus on the autocomplete field
        $('#productsearch > span > input').focus();
    };
    // This method helps to add transaction as park, so user can use this transaction later
    SellComponent.prototype.parkSale = function () {
        this.saleType = 'Parked';
        this.completeSale();
        this.saleType = 'Complete'; // Need to set for next transaction
    };
    SellComponent.prototype.clearAllDateAfterTransactionComplete = function () {
        // This is important to handle when user clock on Close button from payment popup, we need to clear data only when transaction is completed ottherwise just need to close the popup.
        if (null != this.printTransactionDto) {
            this.persit.clearProducts();
            this.persit.clearCustomer();
            // Very importa can not assign to null
            this.paymentDto = new PaymentDto();
            this.selectedCustomer = null;
            // this.disableCustomerSearchTextbox = false;
            this.paymentObjectForPaymentSellTable = [];
            // This is payment button on the sale page, i need to do this because there is not data in sale table,
            this.paymentButtonOnSale = true;
            this.transactionLineItemDaoList = this.persit.getProducts() || [];
            this.setTransactionDtoList(this.transactionLineItemDaoList);
            this.paymentDao = [];
            // Need set it null cause its showing in next transaction also.
            this.transactionNotes = '';
            // very important cause this will give problem after doing return transaction so, after any transactoin i need to do this.
            this.saleType = 'Complete';
            this.disableStoreCreditButtons = true;
            this.printTransactionDto = null;
        }
        else {
            console.log('just close the model.');
        }
    };
    SellComponent.prototype.returnSale = function (transactionComId) {
        var _this = this;
        // This is temp code for handling parked and online transactions
        this.sellService.getTransactionById(transactionComId)
            .subscribe(function (transaction) {
            if (transaction.status == 'Parked') {
                transaction.transactionLineItemDaoList.forEach(function (lineItem) {
                    lineItem.defaultQuantity = lineItem.quantity;
                    lineItem.quantity = 0;
                });
                // Setting transactoin id here so i can send this in case of return and when user gives store credit to the customer.
                _this.previousTransactionId = transaction.transactionComId;
                _this.persit.setProducts(transaction.transactionLineItemDaoList);
                _this.transactionLineItemDaoList = _this.persit.getProducts() || [];
                _this.setTransactionDtoList(_this.transactionLineItemDaoList);
                // Setting customer details to manage store credit and onAccount/ Loylty functionality
                if (transaction.customerPhoneno && transaction.customerPhoneno.length > 0) {
                    _this.selectedCustomer = new __WEBPACK_IMPORTED_MODULE_7_app_customer_customer_component__["a" /* Customer */]();
                    _this.customerService.getCustomerDetailsByPhoneNo(transaction.customerPhoneno)
                        .subscribe(function (customer) {
                        _this.selectedCustomer = customer;
                    });
                    _this.persit.setCustomerDetailsForSale(_this.selectedCustomer);
                    _this.selectedCustomer = _this.persit.getCustomerDetailsForSale();
                }
            }
            else {
                _this.saleType = 'Return';
                transaction.transactionLineItemDaoList.forEach(function (lineItem) {
                    lineItem.defaultQuantity = lineItem.quantity;
                    lineItem.quantity = 0;
                    lineItem.cost = -lineItem.cost;
                    lineItem.retail = -lineItem.retail;
                    lineItem.totalProductPrice = -lineItem.totalProductPrice;
                });
                // Setting transactoin id here so i can send this in case of return and when user gives store credit to the customer.
                _this.previousTransactionId = transaction.transactionComId;
                _this.persit.setProducts(transaction.transactionLineItemDaoList);
                _this.transactionLineItemDaoList = _this.persit.getProducts() || [];
                _this.setTransactionDtoList(_this.transactionLineItemDaoList);
                // Setting customer details to manage store credit and onAccount/ Loylty functionality
                if (transaction.customerPhoneno && transaction.customerPhoneno.length > 0) {
                    _this.selectedCustomer = new __WEBPACK_IMPORTED_MODULE_7_app_customer_customer_component__["a" /* Customer */]();
                    _this.customerService.getCustomerDetailsByPhoneNo(transaction.customerPhoneno)
                        .subscribe(function (customer) {
                        _this.selectedCustomer = customer;
                    });
                    _this.persit.setCustomerDetailsForSale(_this.selectedCustomer);
                    _this.selectedCustomer = _this.persit.getCustomerDetailsForSale();
                }
            }
        });
    };
    SellComponent.prototype.printReciept = function () {
        this.sellService.printReceipt(this.printTransactionDto);
        this.clearAllDateAfterTransactionComplete();
        $('#paymentModel').modal('toggle');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('@fadeInAnimation'),
        __metadata("design:type", Object)
    ], SellComponent.prototype, "fadeInAnimation", void 0);
    SellComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-sell',
            template: __webpack_require__("../../../../../src/app/sell/sell.component.html"),
            styles: [__webpack_require__("../../../../../src/app/sell/sell.component.scss")],
            animations: [__WEBPACK_IMPORTED_MODULE_10_app_shared_animations_fade_in_animation__["a" /* fadeInAnimation */]],
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_sell_sell_service__["a" /* SellService */],
            __WEBPACK_IMPORTED_MODULE_4__shared_services_persistence_service__["a" /* PersistenceService */],
            __WEBPACK_IMPORTED_MODULE_5_app_shared_storesetup_storesetup_service__["a" /* StoreSetupService */],
            __WEBPACK_IMPORTED_MODULE_6_app_customer_customer_service__["a" /* CustomerService */],
            __WEBPACK_IMPORTED_MODULE_9__angular_platform_browser__["DomSanitizer"],
            __WEBPACK_IMPORTED_MODULE_11__angular_router__["ActivatedRoute"],
            __WEBPACK_IMPORTED_MODULE_11__angular_router__["Router"],
            __WEBPACK_IMPORTED_MODULE_12_ng2_toastr_src_toast_manager__["ToastsManager"]])
    ], SellComponent);
    return SellComponent;
}());

var Product = /** @class */ (function () {
    function Product() {
        this.defaultQuantity = 1;
    }
    return Product;
}());

var TransactionLineItemDaoList = /** @class */ (function () {
    function TransactionLineItemDaoList() {
    }
    return TransactionLineItemDaoList;
}());

var TransactionDtoList = /** @class */ (function () {
    function TransactionDtoList() {
    }
    return TransactionDtoList;
}());

var PaymentDto = /** @class */ (function () {
    function PaymentDto() {
    }
    return PaymentDto;
}());

var PaymentObjectForPaymentSellTable = /** @class */ (function () {
    function PaymentObjectForPaymentSellTable() {
    }
    return PaymentObjectForPaymentSellTable;
}());



/***/ }),

/***/ "../../../../../src/app/sell/sell.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SellModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_sell_sell_routing_module__ = __webpack_require__("../../../../../src/app/sell/sell-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_sell_sell_component__ = __webpack_require__("../../../../../src/app/sell/sell.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_sell_sell_service__ = __webpack_require__("../../../../../src/app/sell/sell.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_shared_shared_module__ = __webpack_require__("../../../../../src/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__receipt_receipt_component__ = __webpack_require__("../../../../../src/app/sell/receipt/receipt.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_customer_customer_service__ = __webpack_require__("../../../../../src/app/customer/customer.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__sales_history_sales_history_component__ = __webpack_require__("../../../../../src/app/sell/sales-history/sales-history.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__return_sale_return_sale_component__ = __webpack_require__("../../../../../src/app/sell/return-sale/return-sale.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__sale_sale_component__ = __webpack_require__("../../../../../src/app/sell/sale/sale.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__close_register_close_register_component__ = __webpack_require__("../../../../../src/app/sell/close-register/close-register.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// import { MaterialModule } from '@angular/material';


 // <-- NgModel lives here











var SellModule = /** @class */ (function () {
    function SellModule() {
    }
    SellModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
                __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__["DataTableModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_4_app_sell_sell_routing_module__["a" /* SellRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__["AutoCompleteModule"],
                __WEBPACK_IMPORTED_MODULE_2_primeng_primeng__["DropdownModule"],
                __WEBPACK_IMPORTED_MODULE_7_app_shared_shared_module__["a" /* SharedModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_5_app_sell_sell_component__["b" /* SellComponent */], __WEBPACK_IMPORTED_MODULE_8__receipt_receipt_component__["a" /* ReceiptComponent */], __WEBPACK_IMPORTED_MODULE_10__sales_history_sales_history_component__["a" /* SalesHistoryComponent */], __WEBPACK_IMPORTED_MODULE_11__return_sale_return_sale_component__["a" /* ReturnSaleComponent */], __WEBPACK_IMPORTED_MODULE_12__sale_sale_component__["b" /* SaleComponent */], __WEBPACK_IMPORTED_MODULE_13__close_register_close_register_component__["a" /* CloseRegisterComponent */]],
            providers: [__WEBPACK_IMPORTED_MODULE_6_app_sell_sell_service__["a" /* SellService */], __WEBPACK_IMPORTED_MODULE_9_app_customer_customer_service__["a" /* CustomerService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5_app_sell_sell_component__["b" /* SellComponent */]]
        })
    ], SellModule);
    return SellModule;
}());



/***/ }),

/***/ "../../../../../src/app/sell/sell.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SellService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_shared_services_persistence_service__ = __webpack_require__("../../../../../src/app/shared/services/persistence.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_shared_services_util_service__ = __webpack_require__("../../../../../src/app/shared/services/util.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SellService = /** @class */ (function () {
    function SellService(http, persit) {
        this.http = http;
        this.persit = persit;
        this.url = __WEBPACK_IMPORTED_MODULE_5_environments_environment__["a" /* environment */].reportUrl;
    }
    SellService.prototype.getProductDetails = function () {
        return this.http.get(this.url + '/getProduct')
            .map(this.extractData)
            .catch(this.handleError);
    };
    SellService.prototype.getTransactionDetails = function (startDate, endDate) {
        return this.http.get(this.url + '/getTransactionByDate?startDate=' + startDate + '&endDate=' + endDate)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SellService.prototype.getTransactionById = function (transactionId) {
        return this.http.get(this.url + '/getTransactionById?transactionCompId=' + transactionId)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SellService.prototype.getTransactionLineItemDetailsByTransactionId = function (tranactionId) {
        return this.http.get(this.url + '/getTransactionLineItemById?transactionCompId=' + 1)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SellService.prototype.getCurrentSaleTransactions = function () {
        var _this = this;
        var details$;
        details$ = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            setInterval(function () {
                var details = _this.persit.getProducts() || [];
                observer.next(details);
            }, 300);
        });
        return details$;
    };
    SellService.prototype.getCurrentSaleCustomer = function () {
        var _this = this;
        var details$;
        details$ = __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].create(function (observer) {
            setInterval(function () {
                var details = _this.persit.getCustomerDetailsForSale() || [];
                observer.next(details);
            }, 300);
        });
        return details$;
    };
    SellService.prototype.addTransactionDetails = function (transactionDto) {
        console.log("Transaction Amount" + transactionDto.totalAmount);
        return this.http.post(this.url + '/addTransaction', transactionDto);
    };
    SellService.prototype.addTransactionLineItemDetails = function (transactionLineItemDtoList) {
        console.log("Transaction Amount" + transactionLineItemDtoList);
        this.http.post(this.url + '/addTransactionLineItem', transactionLineItemDtoList)
            .subscribe(function (data) {
            alert('ok');
            console.log(data);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    SellService.prototype.voidTransaction = function (transactionToVoid) {
        return this.http.post(this.url + '/voidTransaction', transactionToVoid);
    };
    SellService.prototype.printReceipt = function (transaction) {
        // this.document.
        this.http.get(this.url + ("/getA4Receipt?receiptNo=" + transaction.transactionComId), { responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* ResponseContentType */].Blob })
            .subscribe(function (data) {
            Object(__WEBPACK_IMPORTED_MODULE_4_app_shared_services_util_service__["b" /* printBlob */])(data._body);
        });
    };
    SellService.prototype.sendEmail = function (transactionCompId) {
        return this.http.get(this.url + '/sendEmail?transactionCompId=' + transactionCompId);
    };
    // This is specific to close register
    SellService.prototype.getCloseRegisterDetails = function (startDate, endDate) {
        return this.http.get(this.url + '/getCloseRegisterDetailsByDate?startDate=' + startDate + '&endDate=' + endDate)
            .map(this.extractData)
            .catch(this.handleError);
    };
    SellService.prototype.saveCloseRegisterDetail = function (closeRegisterObj) {
        return this.http.post(this.url + '/addCloseRegisterDetails', closeRegisterObj);
    };
    SellService.prototype.printClosingDetails = function (startDate, endDate) {
        this.http.get(this.url + '/printClosingDetails?startDate=' + startDate + '&endDate=' + endDate, { responseType: __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* ResponseContentType */].Blob })
            .subscribe(function (data) {
            Object(__WEBPACK_IMPORTED_MODULE_4_app_shared_services_util_service__["b" /* printBlob */])(data._body);
        });
    };
    SellService.prototype.extractData = function (res) {
        var body = res.json();
        console.log(body);
        return body || {};
    };
    SellService.prototype.extractDataLineItem = function (res) {
        var body = res.json();
        console.log('lineItemBody', body);
        return body || {};
    };
    SellService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    SellService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_3_app_shared_services_persistence_service__["a" /* PersistenceService */]])
    ], SellService);
    return SellService;
}());



/***/ }),

/***/ "../../../../../src/app/shared/animations/fade-in.animation.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return fadeInAnimation; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_animations__ = __webpack_require__("../../../animations/esm5/animations.js");

var fadeInAnimation = Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["trigger"])('fadeInAnimation', [
    // route 'enter' transition
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["transition"])(':enter', [
        // styles at start of transition
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({ opacity: 0 }),
        // animation and styles at end of transition
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["animate"])('.2s', Object(__WEBPACK_IMPORTED_MODULE_0__angular_animations__["style"])({ opacity: 1 }))
    ]),
]);


/***/ }),

/***/ "../../../../../src/app/shared/config.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfigService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ConfigService = /** @class */ (function () {
    function ConfigService(router) {
        var _this = this;
        this.router = router;
        this._isCustomerView = new __WEBPACK_IMPORTED_MODULE_1_rxjs__["BehaviorSubject"](false);
        this.router.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_2__angular_router__["NavigationEnd"]) {
                var url = event.urlAfterRedirects;
                //  console.log("Ended up here", event.urlAfterRedirects); 
                if (url && url.includes('/sell-customer'))
                    _this._isCustomerView.next(true);
                else
                    _this._isCustomerView.next(false);
            }
        });
    }
    ConfigService.prototype.isCustomerView = function () {
        return this._isCustomerView.asObservable();
    };
    ConfigService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_router__["Router"]])
    ], ConfigService);
    return ConfigService;
}());



/***/ }),

/***/ "../../../../../src/app/shared/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  footer works!\n</p>\n"

/***/ }),

/***/ "../../../../../src/app/shared/footer/footer.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__("../../../../../src/app/shared/footer/footer.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/footer/footer.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "../../../../../src/app/shared/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"header mat-elevation-z18 text-white\">\n    <div class=\"row\">\n        <div class=\"col-md-2\">\n            <div class=\"text-left\">\n                <img class=\"p-1 logo\" src=\"assets/image/final-logo.png\" alt=\"ABM\">\n            </div>\n        </div>\n        <div class=\"col-md-4\">\n\n        </div>\n        <div class=\"col-md-6 align-items-center d-flex justify-content-end text-right\">\n\n            <a class=\"m-3\" data-toggle=\"modal\" data-target=\"#clockIn\">\n                <i class=\"fa fa-clock-o\"></i>\n            </a>\n            <a class=\"m-3\">\n                <i class=\"fa fa-bell\"></i>\n            </a>\n            <a class=\"m-3\" href=\"javascript:void(0)\" (click)=\"this.logout()\">\n                <i class=\"fa fa-sign-out\"></i> Log out\n            </a>\n\n        </div>\n    </div>\n</div>\n\n\n\n\n<div class=\"modal fade\" id=\"clockIn\" role=\"dialog\">\n    <div class=\"modal-dialog modal-lg\">\n\n        <!-- Modal content-->\n\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h4 class=\"modal-title\">Clock In</h4>\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\">&times;</button>\n            </div>\n            <div class=\"modal-body\">\n\n                <form [formGroup]=\"this.clockInForm\">\n                    <div class=\"row m-1\">\n\n                        <div class=\"col-md-12\">\n                            <label>Username</label>\n                            <select class=\"form-control\" formControlName=\"username\">\n                            <option *ngFor=\"let emp of this.employeeDto\">\n                                {{emp.username}}</option> \n                        </select>\n                        </div>\n                    </div>\n\n                    <div class=\"row m-1\">\n\n                        <div class=\"col-md-12\">\n                            <label>Password</label>\n                            <input class=\"form-control\" type=\"password\" formControlName=\"password\">\n                        </div>\n                    </div>\n\n                    <div class=\"row m-1\">\n\n                        <!-- <div class=\"col-md-6\">\n                            <label>ClockIn  </label>\n                            <label>{{this.clockInObj.clockIn}}</label>\n                        </div>\n                        <div class=\"col-md-6\">\n                            <label>Hour:  </label>\n                            <label> {{this.clockInObj.noOfHours}}   Minute : {{this.clockInObj.noOfMinute}}</label>\n                        </div> -->\n                        <table class=\"table table-striped\">\n                            <thead>\n                                <tr>\n                                    <th>ClockIn</th>\n                                    <th>ClockOut</th>\n                                    <th>Total</th>\n                                </tr>\n                            </thead>\n                            <tbody>\n                                <tr *ngFor=\"let clockIn of this.clockInViewList\">\n\n                                    <td>{{clockIn.clockIn}}</td>\n                                    <td>{{clockIn.clockOut}}</td>\n                                    <td>{{clockIn.noOfHours}} Hour : {{clockIn.noOfMinute}} Minute</td>\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n\n                    <div class=\"row m-2 p-2\">\n                        <button *ngIf=\"this.isClockIn == false\" type=\"button\" (click)=\"this.validateAndAddClockInDetails()\" mat-raised-button class=\"bg-primary text-white action-button-lg m-auto\" data-dismiss=\"modal\">\n                                    Clock In\n                                </button>\n                        <button *ngIf=\"this.isClockIn == true\" type=\"button\" (click)=\"this.validateAndAddClockInDetails()\" mat-raised-button class=\"bg-primary text-white action-button-lg m-auto\" data-dismiss=\"modal\">\n                            Clock Out\n                        </button>\n\n                    </div>\n\n                </form>\n\n            </div>\n\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n            </div>\n        </div>\n\n\n    </div>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/shared/header/header.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".header {\n  height: 60px;\n  margin: 0px -15px;\n  background: #495057; }\n\n.logo {\n  height: -webkit-fill-available;\n  height: -moz-available;\n  height: stretch;\n  margin-left: 10px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_employee_employee_service__ = __webpack_require__("../../../../../src/app/employee/employee.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_shared_services_date_service__ = __webpack_require__("../../../../../src/app/shared/services/date.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_employee_clockin_clockin_component__ = __webpack_require__("../../../../../src/app/employee/clockin/clockin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_app_auth_user_user_service__ = __webpack_require__("../../../../../src/app/auth/user/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_toastr__ = __webpack_require__("../../../../ng2-toastr/ng2-toastr.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_ng2_toastr___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_ng2_toastr__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(employeeService, formBuilder, dateService, userService, toastr) {
        this.employeeService = employeeService;
        this.formBuilder = formBuilder;
        this.dateService = dateService;
        this.userService = userService;
        this.toastr = toastr;
        this.employeeDto = [];
        this.dateDto = new __WEBPACK_IMPORTED_MODULE_2_app_shared_services_date_service__["a" /* DateDto */]();
        this.clockInDto = [];
        this.clockInObj = new __WEBPACK_IMPORTED_MODULE_3_app_employee_clockin_clockin_component__["a" /* ClockIn */]();
        this.clockInList = []; //testClockInObj: ClockIn;
        this.isClockIn = false;
        this.clockInViewList = [];
    }
    HeaderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getEmployeeDetails();
        this.clockInForm = this.formBuilder.group({
            'username': ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required],
            'password': ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["Validators"].required]
        });
        this.clockInForm.get('username').valueChanges
            .subscribe(function (change) {
            _this.getClockInDetails();
        });
    };
    HeaderComponent.prototype.getEmployeeDetails = function () {
        var _this = this;
        this.employeeService.getEmployeeDetails()
            .subscribe(function (emp) {
            _this.employeeDto = emp;
            _this.clockInForm.get('username').setValue(_this.employeeDto[0].username);
            _this.clockInObj.username = _this.employeeDto[0].username;
            console.log('ClokcIn value', _this.isClockIn);
        });
    };
    HeaderComponent.prototype.getClockInDetails = function () {
        var _this = this;
        var username;
        this.clockInObj.username = this.clockInForm.get('username').value;
        this.dateDto = this.dateService.getCurrentDay();
        // Need to do this becuase when user chnage the username from dropdown, if the one user is clocked in it is showing for clock out for all users which is wrond, so this helps to fix this problem.
        this.isClockIn = false;
        if (this.clockInForm.get('username').value == null) {
            username = this.employeeDto[0].username;
        }
        else {
            username = this.clockInForm.get('username').value;
        }
        this.employeeService.getEmployeeClockInDetails(username, this.dateDto.startDate, this.dateDto.endDate)
            .subscribe(function (clockInList) {
            _this.clockInList = clockInList;
            _this.setClockInListForView();
            console.log('clockInList', _this.clockInList);
            // This mean user has some clock in history for the current day, so now i need to he is clocked in or clock out and, on behalf of that, i need to set up clock in flag.
            if (null != _this.clockInList && _this.clockInList.length > 0) {
                _this.clockInList.forEach(function (clockIn) {
                    if (null != clockIn.clockOut) {
                        _this.isClockIn = false;
                    }
                    else {
                        _this.isClockIn = true;
                        _this.lastClockInId = clockIn.userClockInId;
                    }
                });
            }
            // this mean user has alredy clocked in
            if (_this.isClockIn) {
                var currentHour = __WEBPACK_IMPORTED_MODULE_5_moment__(Date.now()).format('HH');
                var currentMinute = __WEBPACK_IMPORTED_MODULE_5_moment__(Date.now()).format('mm');
                var clockInHour = __WEBPACK_IMPORTED_MODULE_5_moment__(_this.clockInObj.clockIn).format('HH');
                var clockInMinute = __WEBPACK_IMPORTED_MODULE_5_moment__(_this.clockInObj.clockIn).format('mm');
                _this.noOfHours = (+currentHour - +clockInHour);
                _this.noOfMinute = (+currentMinute - +clockInMinute);
                _this.clockInObj.noOfHours = _this.noOfHours;
                _this.clockInObj.noOfMinute = _this.noOfMinute;
                console.log('no of hours', _this.noOfHours);
                var now = __WEBPACK_IMPORTED_MODULE_5_moment__(Date.now());
                var dateMoment = __WEBPACK_IMPORTED_MODULE_5_moment__(now, 'YYYY-MM-DD HH:mm:ss');
                var duration = __WEBPACK_IMPORTED_MODULE_5_moment__["duration"](dateMoment.diff(_this.clockInObj.clockIn)).asHours().toFixed(2);
                //let hours = duration.asHours().toFixed(2);
                console.log('hours', duration);
                // this.isClockIn = true;
            }
            else {
                _this.isClockIn = false;
            }
        });
    };
    HeaderComponent.prototype.validateAndAddClockInDetails = function () {
        var _this = this;
        // Need to do this because some stupid reason, i dont know why.
        var username = this.clockInForm.get('username').value;
        this.employeeService.validateEmployee(this.clockInForm.get('username').value, this.clockInForm.get('password').value)
            .subscribe(function (valid) {
            if (valid) {
                if (null != _this.clockInList && _this.clockInList.length > 0) {
                    _this.clockInList.forEach(function (clockIn) {
                        if (null != clockIn.clockOut) {
                            _this.isClockIn = false;
                        }
                        else {
                            _this.isClockIn = true;
                            _this.lastClockInId = clockIn.userClockInId;
                            _this.lastClockInDate = clockIn.clockIn;
                            _this.lastDate = clockIn.date;
                        }
                    });
                }
                console.log('clock in List', _this.clockInList);
            }
            if (valid && _this.isClockIn == false) {
                _this.clockInObj = new __WEBPACK_IMPORTED_MODULE_3_app_employee_clockin_clockin_component__["a" /* ClockIn */]();
                _this.clockInObj.date = __WEBPACK_IMPORTED_MODULE_5_moment__(Date.now()).format('YYYY-MM-DD HH:mm:ss');
                _this.clockInObj.clockIn = __WEBPACK_IMPORTED_MODULE_5_moment__(Date.now()).format('YYYY-MM-DD HH:mm:ss');
                _this.clockInObj.username = username;
                console.log('clok in object', _this.clockInObj);
                _this.employeeService.addClockInDetails(_this.clockInObj)
                    .subscribe(function (data) {
                    if (data.username != null) {
                        _this.toastr.success("ClockIn Successfully!!", 'Success');
                    }
                    else {
                        _this.toastr.error("Oops Something goes wrong!!", 'Error');
                    }
                    console.log('Response From Add Clockin call' + data);
                }, function (error) {
                    _this.toastr.error("Oops Something goes wrong!!", 'Error');
                    console.log(JSON.stringify(error.json()));
                });
            }
            else if (valid && _this.isClockIn) {
                _this.clockInObj = new __WEBPACK_IMPORTED_MODULE_3_app_employee_clockin_clockin_component__["a" /* ClockIn */]();
                _this.clockInObj.username = _this.clockInForm.get('username').value;
                _this.clockInObj.clockIn = _this.lastClockInDate;
                _this.clockInObj.clockOut = __WEBPACK_IMPORTED_MODULE_5_moment__(Date.now()).format('YYYY-MM-DD HH:mm:ss');
                _this.clockInObj.noOfHours = _this.noOfHours;
                _this.clockInObj.noOfMinute = _this.noOfMinute;
                _this.clockInObj.username = username;
                _this.clockInObj.userClockInId = _this.lastClockInId;
                _this.clockInObj.date = _this.lastDate;
                _this.employeeService.addClockInDetails(_this.clockInObj)
                    .subscribe(function (data) {
                    if (data.username != null) {
                        _this.toastr.success("Clockout Successfully!!", 'Success');
                    }
                    else {
                        _this.toastr.error("Oops Something goes wrong!!", 'Error');
                    }
                    console.log('Response From Add Clockin call' + data);
                }, function (error) {
                    _this.toastr.error("Oops Something goes wrong!!", 'Error');
                    console.log(JSON.stringify(error.json()));
                });
            }
        });
        $('#clockIn').modal('hide');
        this.clockInForm.reset();
    };
    HeaderComponent.prototype.setClockInListForView = function () {
        var _this = this;
        this.clockInViewList = [];
        this.clockInList.forEach(function (clockIn) {
            var clockInViewList = new __WEBPACK_IMPORTED_MODULE_3_app_employee_clockin_clockin_component__["a" /* ClockIn */]();
            clockInViewList.clockIn = __WEBPACK_IMPORTED_MODULE_5_moment__(clockIn.clockIn).format('YYYY-MM-DD HH:mm:ss');
            if (clockIn.clockOut != null) {
                clockInViewList.clockOut = __WEBPACK_IMPORTED_MODULE_5_moment__(clockIn.clockOut).format('YYYY-MM-DD HH:mm:ss');
            }
            if (clockIn.clockIn != null && clockIn.clockOut != null) {
                var totalClockInHour = __WEBPACK_IMPORTED_MODULE_5_moment__(clockIn.clockIn).format('HH');
                var totalClockInMinute = __WEBPACK_IMPORTED_MODULE_5_moment__(clockIn.clockIn).format('mm');
                var totalClockOutHour = __WEBPACK_IMPORTED_MODULE_5_moment__(clockIn.clockOut).format('HH');
                var totalClockOutMinute = __WEBPACK_IMPORTED_MODULE_5_moment__(clockIn.clockOut).format('mm');
                clockInViewList.noOfHours = (+totalClockOutHour - +totalClockInHour);
                clockInViewList.noOfMinute = (+totalClockOutMinute - +totalClockInMinute);
            }
            _this.clockInViewList.push(clockInViewList);
        });
    };
    HeaderComponent.prototype.logout = function () {
        this.userService.userLogout();
    };
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-header',
            template: __webpack_require__("../../../../../src/app/shared/header/header.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/header/header.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_employee_employee_service__["a" /* EmployeeService */], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_2_app_shared_services_date_service__["b" /* DateService */], __WEBPACK_IMPORTED_MODULE_6_app_auth_user_user_service__["a" /* UserService */], __WEBPACK_IMPORTED_MODULE_7_ng2_toastr__["ToastsManager"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "../../../../../src/app/shared/services/date.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DateService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DateDto; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__("../../../../moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var DateService = /** @class */ (function () {
    function DateService() {
        this.dateDto = new DateDto();
    }
    DateService.prototype.getDateByInput = function (inputName) {
        if (inputName === 'Today') {
            return this.getCurrentDay();
        }
        else if (inputName === 'Yesterday') {
            return this.getPreviousDay();
        }
        else if (inputName === 'This Week') {
            return this.getLast7Day();
        }
        else if (inputName === 'Last Week') {
            return this.getLast7Day();
        }
        else if (inputName === 'This Month') {
            return this.getCurrentMonth();
        }
        else if (inputName === 'Last Month') {
            return this.getLastMonth();
        }
        else if (inputName === 'Last 3 Months') {
            return this.getLast3Months();
        }
        else if (inputName === 'Last 6 Months') {
            return this.getLast6Months();
        }
        else if (inputName === 'This Year') {
            return this.getCurrentYear();
        }
        else if (inputName === 'Last Year') {
            return this.getLastYear();
        }
    };
    DateService.prototype.getCurrentDay = function () {
        var now = new Date();
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        var day = "" + now.getDate();
        if (day.length == 1) {
            day = "0" + day;
        }
        this.dateDto.startDate = year + '-' + month + '-' + day + ' 00:00:000';
        this.dateDto.endDate = year + '-' + month + '-' + day + ' 23:59:59';
        return this.dateDto;
    };
    DateService.prototype.getPreviousDay = function () {
        var now = new Date();
        now.setDate(now.getDate() - 1);
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        var day = "" + now.getDate();
        if (day.length == 1) {
            day = "0" + day;
        }
        this.dateDto.startDate = year + '-' + month + '-' + day + ' 00:00:000';
        this.dateDto.endDate = year + '-' + month + '-' + day + ' 23:59:59';
        return this.dateDto;
    };
    DateService.prototype.getLast7Day = function () {
        var now = new Date();
        now.setDate(now.getDate() - 7);
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        var day = "" + now.getDate();
        if (day.length == 1) {
            day = "0" + day;
        }
        this.dateDto.startDate = year + '-' + month + '-' + day + ' 00:00:000';
        this.dateDto.endDate = __WEBPACK_IMPORTED_MODULE_1_moment__(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        return this.dateDto;
    };
    DateService.prototype.getCurrentMonth = function () {
        var now = new Date();
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        var day = "" + now.getDate();
        if (day.length == 1) {
            day = "0" + day;
        }
        this.dateDto.startDate = year + '-' + month + '-' + '01' + ' 00:00:000';
        this.dateDto.endDate = __WEBPACK_IMPORTED_MODULE_1_moment__(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        return this.dateDto;
    };
    DateService.prototype.getLastMonth = function () {
        var now = new Date();
        now.setMonth(now.getMonth() - 1);
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        this.dateDto.startDate = year + '-' + month + '-' + '01' + ' 00:00:000';
        this.dateDto.endDate = year + '-' + month + '-' + '31' + ' 23:59:59';
        return this.dateDto;
    };
    DateService.prototype.getLast3Months = function () {
        var now = new Date();
        now.setMonth(now.getMonth() - 3);
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        // var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
        this.dateDto.startDate = year + '-' + month + '-' + '01' + ' 00:00:000';
        ;
        var now = new Date();
        now.setMonth(now.getMonth() - 1);
        var currentMonth = "" + (now.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        this.dateDto.endDate = year + '-' + currentMonth + '-' + '31' + ' 23:59:59';
        return this.dateDto;
    };
    DateService.prototype.getLast6Months = function () {
        var now = new Date();
        now.setMonth(now.getMonth() - 6);
        var year = "" + now.getFullYear();
        var month = "" + (now.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        this.dateDto.startDate = year + '-' + month + '-' + '01' + ' 00:00:000';
        var now = new Date();
        now.setMonth(now.getMonth() - 1);
        var currentMonth = "" + (now.getMonth() + 1);
        if (month.length == 1) {
            month = "0" + month;
        }
        this.dateDto.endDate = year + '-' + currentMonth + '-' + '31' + ' 23:59:59';
        return this.dateDto;
    };
    DateService.prototype.getCurrentYear = function () {
        var now = new Date();
        var year = "" + now.getFullYear();
        this.dateDto.startDate = year + '-' + '01' + '-' + '01' + ' 00:00:000';
        this.dateDto.endDate = year + '-' + '12' + '-' + '31' + ' 23:59:59';
        return this.dateDto;
    };
    DateService.prototype.getLastYear = function () {
        var now = new Date();
        var year = now.getFullYear() - 1;
        this.dateDto.startDate = year + '-' + '01' + '-' + '01' + ' 00:00:000';
        this.dateDto.endDate = year + '-' + '12' + '-' + '31' + ' 23:59:59';
        return this.dateDto;
    };
    DateService.prototype.getMonthDate = function (monthName) {
        var now = new Date();
        var year = now.getFullYear();
        if (monthName === 'January') {
            this.dateDto.startDate = year + '-' + '01' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '01' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'February') {
            this.dateDto.startDate = year + '-' + '02' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '02' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'March') {
            this.dateDto.startDate = year + '-' + '03' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '03' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'April') {
            this.dateDto.startDate = year + '-' + '04' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '04' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'May') {
            this.dateDto.startDate = year + '-' + '05' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '05' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'June') {
            this.dateDto.startDate = year + '-' + '06' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '06' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'August') {
            this.dateDto.startDate = year + '-' + '08' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '08' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'September') {
            this.dateDto.startDate = year + '-' + '09' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '09' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'October') {
            this.dateDto.startDate = year + '-' + '10' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '10' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'November') {
            this.dateDto.startDate = year + '-' + '11' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '11' + '-' + '31' + ' 23:59:59';
        }
        else if (monthName === 'December') {
            this.dateDto.startDate = year + '-' + '12' + '-' + '01' + ' 00:00:000';
            this.dateDto.endDate = year + '-' + '12' + '-' + '31' + ' 23:59:59';
        }
        return this.dateDto;
    };
    DateService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], DateService);
    return DateService;
}());

var DateDto = /** @class */ (function () {
    function DateDto() {
    }
    return DateDto;
}());



/***/ }),

/***/ "../../../../../src/app/shared/services/persistence.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PersistenceService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PersistenceService = /** @class */ (function () {
    function PersistenceService() {
    }
    PersistenceService.prototype.print = function (obj) {
        console.log(obj);
    };
    PersistenceService.prototype.setProducts = function (obj) {
        this.products = obj;
        localStorage.setItem('product', JSON.stringify(obj));
    };
    PersistenceService.prototype.getProducts = function () {
        this.products = JSON.parse(localStorage.getItem('product'));
        return this.products;
    };
    PersistenceService.prototype.clearProducts = function () {
        localStorage.removeItem('product');
    };
    PersistenceService.prototype.setStoreDetails = function (obj) {
        this.storeDetails = obj;
        localStorage.setItem('storeDetails', JSON.stringify(obj));
    };
    PersistenceService.prototype.getStoreDetails = function () {
        var storeDetails = localStorage.getItem('storeDetails') || null;
        if (storeDetails && !storeDetails.includes('undefined')) {
            this.storeDetails = JSON.parse(storeDetails);
            return this.storeDetails;
        }
        return null;
    };
    PersistenceService.prototype.setCustomerDetailsForSale = function (obj) {
        this.customerDetails = obj;
        localStorage.setItem('customerDetails', JSON.stringify(obj));
    };
    PersistenceService.prototype.getCustomerDetailsForSale = function () {
        this.customerDetails = JSON.parse(localStorage.getItem('customerDetails'));
        return this.customerDetails;
    };
    PersistenceService.prototype.clearCustomer = function () {
        localStorage.removeItem('customerDetails');
    };
    PersistenceService.prototype.setProductInventoryForAdd = function (obj) {
        localStorage.setItem('productInventoryDetails', JSON.stringify(obj));
    };
    PersistenceService.prototype.getProductInventoryForAdd = function () {
        this.productInventory = JSON.parse(localStorage.getItem('productInventoryDetails'));
        return this.productInventory;
    };
    PersistenceService.prototype.clearProductInventory = function () {
        localStorage.removeItem('productInventoryDetails');
    };
    PersistenceService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], PersistenceService);
    return PersistenceService;
}());



/***/ }),

/***/ "../../../../../src/app/shared/services/util.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UtilService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return printBlob; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var UtilService = /** @class */ (function () {
    function UtilService() {
        this.printBlob = printBlob;
    }
    UtilService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], UtilService);
    return UtilService;
}());

var printBlob = function (blob) {
    $('#printBlob').remove();
    var url = URL.createObjectURL(blob);
    if ($('#printBlob').length == 0) {
        $("body").append("<iframe style=\"display:none;\" id=\"printBlob\" src=\"" + url + "\" frameborder=\"0\" allowfullscreen=\"\"></iframe>");
    }
    else {
        $("printBlob").replaceWith("<iframe style=\"display:none;\" id=\"printBlob\" src=\"" + url + "\" frameborder=\"0\" allowfullscreen=\"\"></iframe>");
    }
    var doc = document.getElementById('printBlob');
    doc.focus();
    doc.contentWindow.print();
};


/***/ }),

/***/ "../../../../../src/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_persistence_service__ = __webpack_require__("../../../../../src/app/shared/services/persistence.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__storesetup_storesetup_component__ = __webpack_require__("../../../../../src/app/shared/storesetup/storesetup.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__top_navbar_top_navbar_component__ = __webpack_require__("../../../../../src/app/shared/top-navbar/top-navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__header_header_component__ = __webpack_require__("../../../../../src/app/shared/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_app_sell_sell_routing_module__ = __webpack_require__("../../../../../src/app/sell/sell-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__footer_footer_component__ = __webpack_require__("../../../../../src/app/shared/footer/footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_app_shared_services_date_service__ = __webpack_require__("../../../../../src/app/shared/services/date.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_app_shared_top_sub_navbar_top_sub_navbar_component__ = __webpack_require__("../../../../../src/app/shared/top-sub-navbar/top-sub-navbar.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_util_service__ = __webpack_require__("../../../../../src/app/shared/services/util.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};













var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_6__angular_material__["b" /* MatCardModule */], __WEBPACK_IMPORTED_MODULE_6__angular_material__["a" /* MatButtonModule */], __WEBPACK_IMPORTED_MODULE_7_app_sell_sell_routing_module__["a" /* SellRoutingModule */], __WEBPACK_IMPORTED_MODULE_10__angular_forms__["ReactiveFormsModule"], __WEBPACK_IMPORTED_MODULE_10__angular_forms__["FormsModule"]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_3__storesetup_storesetup_component__["a" /* StoresetupComponent */], __WEBPACK_IMPORTED_MODULE_4__top_navbar_top_navbar_component__["a" /* TopNavbarComponent */], __WEBPACK_IMPORTED_MODULE_11_app_shared_top_sub_navbar_top_sub_navbar_component__["a" /* TopSubNavbarComponent */], __WEBPACK_IMPORTED_MODULE_5__header_header_component__["a" /* HeaderComponent */], __WEBPACK_IMPORTED_MODULE_8__footer_footer_component__["a" /* FooterComponent */]],
            exports: [
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["f" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["b" /* MatCardModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["a" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["d" /* MatDatepickerModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["g" /* MatNativeDateModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["e" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["k" /* MatSliderModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["j" /* MatSlideToggleModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["h" /* MatProgressSpinnerModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["i" /* MatRadioModule */],
                __WEBPACK_IMPORTED_MODULE_4__top_navbar_top_navbar_component__["a" /* TopNavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_11_app_shared_top_sub_navbar_top_sub_navbar_component__["a" /* TopSubNavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_5__header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_8__footer_footer_component__["a" /* FooterComponent */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["c" /* MatChipsModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_2__services_persistence_service__["a" /* PersistenceService */], __WEBPACK_IMPORTED_MODULE_9_app_shared_services_date_service__["b" /* DateService */], __WEBPACK_IMPORTED_MODULE_12__services_util_service__["a" /* UtilService */]]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "../../../../../src/app/shared/storesetup/storesetup.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n    <app-top-navbar [menu]=\"this.items\" isSubMenu=\"true\"></app-top-navbar>\n    <router-outlet></router-outlet>\n</p>\n\n\n<mat-card>\n    <mat-card-title>\n        <h3>\n            Store Details\n        </h3>\n    </mat-card-title>\n\n    <mat-card-content>\n        <form [formGroup]=\"storeForm\">\n\n            <div class=\"container\">\n\n\n                <div class=\"row\">\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n\n                    <div class=\"col-md-2\">\n                        <label>Store Name  </label>\n                    </div>\n                    <div class=\"col-md-4\">\n                        <input type=\"text\" class=\"form-control\" formControlName=\"name\">\n                    </div>\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n\n                </div>\n\n                <div class=\"row store-row\">\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n\n                    <div class=\"col-md-2\">\n                        <label>Street  </label>\n                    </div>\n                    <div class=\"col-md-4\">\n                        <input type=\"text\" class=\"form-control\" formControlName=\"street\">\n                    </div>\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n                </div>\n\n                <div class=\"row store-row\">\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n\n                    <div class=\"col-md-2\">\n                        <label>City  </label>\n                    </div>\n                    <div class=\"col-md-4\">\n                        <input type=\"text\" class=\"form-control\" formControlName=\"city\">\n                    </div>\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n                </div>\n\n                <div class=\"row store-row\">\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n\n                    <div class=\"col-md-2\">\n                        <label>State  </label>\n                    </div>\n                    <div class=\"col-md-4\">\n                        <input type=\"text\" class=\"form-control\" formControlName=\"state\">\n                    </div>\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n                </div>\n\n                <div class=\"row store-row\">\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n\n                    <div class=\"col-md-2\">\n                        <label>Zipcode  </label>\n                    </div>\n                    <div class=\"col-md-4\">\n                        <input type=\"text\" class=\"form-control\" formControlName=\"zipcode\">\n                    </div>\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n                </div>\n                <div class=\"row store-row\">\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n\n                    <div class=\"col-md-2\">\n                        <label>Email  </label>\n                    </div>\n                    <div class=\"col-md-4\">\n                        <input type=\"text\" class=\"form-control\" formControlName=\"email\">\n                    </div>\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n                </div>\n                <div class=\"row store-row\">\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n\n                    <div class=\"col-md-2\">\n                        <label>Tax  </label>\n                    </div>\n                    <div class=\"col-md-4\">\n                        <input type=\"text\" class=\"form-control\" formControlName=\"tax\">\n                    </div>\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n                </div>\n\n                <div class=\"row store-row\">\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n\n                    <div class=\"col-md-2\">\n                        <label> $1 Loyalty  = </label>\n                    </div>\n                    <div class=\"col-md-4\">\n                        <input type=\"number\" class=\"form-control\" formControlName=\"loyaltyAmountForDollar\" placeholder=\"Enter Loyalty Amount For $1 Loyalty\">\n                    </div>\n\n                    <div class=\"col-md-3\">\n\n                    </div>\n                </div>\n\n\n\n            </div>\n        </form>\n\n    </mat-card-content>\n    <mat-card-footer>\n        <div class=\"d-flex align-items-center justify-content-center\">\n            <button mat-raised-button class=\"bg-primary text-white \" (click)=\"this.saveStoreDetails()\">Save Store Details</button>\n        </div>\n    </mat-card-footer>\n</mat-card>"

/***/ }),

/***/ "../../../../../src/app/shared/storesetup/storesetup.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".store-row {\n  margin-top: 10px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/storesetup/storesetup.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoresetupComponent; });
/* unused harmony export StoreSetupDto */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_app_shared_storesetup_storesetup_service__ = __webpack_require__("../../../../../src/app/shared/storesetup/storesetup.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_shared_services_persistence_service__ = __webpack_require__("../../../../../src/app/shared/services/persistence.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var StoresetupComponent = /** @class */ (function () {
    function StoresetupComponent(storeSetupService, persit, router, formBuilder) {
        this.storeSetupService = storeSetupService;
        this.persit = persit;
        this.router = router;
        this.formBuilder = formBuilder;
        this.storeDetails = new StoreSetupDto();
    }
    StoresetupComponent.prototype.ngOnInit = function () {
        if (this.router.url == "/setting") {
            this.items = null;
            this.router.navigate(['/setting']);
            this.items = [
                { name: 'Store Details', icon: 'fa fa-building fa-x', link: '/setting' },
                { name: 'User Roles', icon: 'fa fa-user-secret fa-x', link: '/product/category' },
                { name: 'Reciept', icon: 'fa fa-print fa-x', link: '/product/brand' },
                { name: 'Locations', icon: 'fa fa-map-marker fa-x', link: '/product/vendor' },
                { name: 'Loyalty', icon: 'fa fa-usd fa-x', link: '/product/model' },
                { name: 'Custom Fields', icon: 'fa fa-object-group fa-x', link: '/product/productTable' }
            ];
        }
        this.storeForm = this.formBuilder.group({
            'id': [1],
            'name': [null],
            'street': [null],
            'city': [null],
            'state': [null],
            'email': [null],
            'zipcode': [null],
            'tax': [null],
            'loyaltyAmountForDollar': [null]
        });
        // Checking if the data is in local storege or not.
        // if (this.persit.getStoreDetails() == null) {
        //   this.getStoreDetails();
        // }
        // else {
        //this.storeDetails = this.persit.getStoreDetails();
        this.getStoreDetails();
        console.log('storeDetail', this.storeDetails);
        this.storeForm.patchValue(this.storeDetails);
        // }
    };
    StoresetupComponent.prototype.getStoreDetails = function () {
        var _this = this;
        this.storeSetupService.getStoreDetails()
            .then(function (storeDetails) {
            _this.storeDetails = storeDetails;
            _this.storeForm.patchValue(_this.storeDetails);
            _this.persit.setStoreDetails(_this.storeDetails);
        });
        // Setting the store details into local storage
    };
    StoresetupComponent.prototype.saveStoreDetails = function () {
        this.storeSetupService.saveStoreDetails(this.storeForm.value);
    };
    StoresetupComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-storesetup',
            template: __webpack_require__("../../../../../src/app/shared/storesetup/storesetup.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/storesetup/storesetup.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_app_shared_storesetup_storesetup_service__["a" /* StoreSetupService */], __WEBPACK_IMPORTED_MODULE_2_app_shared_services_persistence_service__["a" /* PersistenceService */], __WEBPACK_IMPORTED_MODULE_3__angular_router__["Router"], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["FormBuilder"]])
    ], StoresetupComponent);
    return StoresetupComponent;
}());

var StoreSetupDto = /** @class */ (function () {
    function StoreSetupDto() {
    }
    return StoreSetupDto;
}());



/***/ }),

/***/ "../../../../../src/app/shared/storesetup/storesetup.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StoreSetupService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};




var StoreSetupService = /** @class */ (function () {
    function StoreSetupService(http) {
        this.http = http;
        this.url = __WEBPACK_IMPORTED_MODULE_3_environments_environment__["a" /* environment */].reportUrl;
    }
    StoreSetupService.prototype.getStoreDetails = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.storeDetails) return [3 /*break*/, 1];
                        return [2 /*return*/, this.storeDetails];
                    case 1:
                        _a = this;
                        return [4 /*yield*/, (this.http.get(this.url + '/getStoreSetupDetails')
                                .map(this.extractData)
                                .map(function (data) { return data; })
                                .catch(this.handleError)).toPromise()];
                    case 2:
                        _a.storeDetails = _b.sent();
                        ;
                        _b.label = 3;
                    case 3: return [2 /*return*/, this.storeDetails];
                }
            });
        });
    };
    StoreSetupService.prototype.saveStoreDetails = function (storeSetupDao) {
        this.http.post(this.url + '/addStoreDetails', storeSetupDao)
            .subscribe(function (data) {
            console.log("Response From Add Store call" + data);
        }, function (error) {
            console.log(JSON.stringify(error.json()));
        });
    };
    StoreSetupService.prototype.extractData = function (res) {
        var body = res.json();
        console.log(body);
        return body || {};
    };
    StoreSetupService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    StoreSetupService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], StoreSetupService);
    return StoreSetupService;
}());



/***/ }),

/***/ "../../../../../src/app/shared/top-navbar/top-navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row mat-elevation-z2\" [ngClass]=\"{'subMenu': this.isSubMenu, 'menu': !this.isSubMenu}\">\n    <div class=\"col-md-1\" align=\"center\" *ngFor=\"let item of this.menu\" [ngClass]=\"{'visible': item.show}\" [routerLink]=\"item.link\" [routerLinkActive]=\"'active'\">\n        <i class=\"{{item.icon}}\" aria-hidden=\"true\"></i>\n        <div align=\"center\">\n            {{item.name}}\n        </div>\n    </div>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/shared/top-navbar/top-navbar.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".menu {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 15px;\n  margin: -23px -30px -1px -30px;\n  background: #dee2e6;\n  color: #495057; }\n  .menu :hover {\n    cursor: pointer; }\n  .menu .active {\n    transition: all 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95);\n    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px 0 rgba(0, 0, 0, 0.14), 0 1px 14px 0 rgba(0, 0, 0, 0.12);\n    background: #fff;\n    margin: -15px 0px -15px 0px;\n    padding-top: 15px; }\n\n.subMenu {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 12px;\n  margin: -12px -30px 10px -30px;\n  background: #f8f9fa;\n  color: #343a40; }\n  .subMenu .active {\n    transition: all 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95);\n    background: #dee2e6;\n    margin: -10px 0px;\n    padding: 10px;\n    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px 0 rgba(0, 0, 0, 0.14), 0 1px 14px 0 rgba(0, 0, 0, 0.12); }\n  .subMenu :hover {\n    transition: all 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95);\n    cursor: pointer;\n    background: #dee2e6;\n    margin: -15px 0px;\n    padding: 15px;\n    border-radius: 5px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/top-navbar/top-navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopNavbarComponent; });
/* unused harmony export MenuItem */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TopNavbarComponent = /** @class */ (function () {
    function TopNavbarComponent() {
        this.isSubMenu = false;
    }
    TopNavbarComponent.prototype.ngOnInit = function () {
        if (!this.menu) {
            this.menu = [
                { name: 'Dashboard', link: '/home', icon: 'fa fa-tachometer fa-2x text-blue' },
                { name: 'Sell', link: '/sell', icon: 'fa fa-usd fa-2x text-green' },
                { name: 'Sales History', link: '/sales-history', icon: 'fa fa-history fa-2x text-bittersweet ' },
                { name: 'Product', link: '/product', icon: 'fa fa-tag fa-2x text-blue' },
                { name: 'Purchase Order', link: '/purchase-order', icon: 'fa fa-first-order fa-x fa-2x text-green' },
                { name: 'Customer', link: '/customer', icon: 'fa fa-user fa-2x text-bittersweet' },
                { name: 'Report', link: '/report', icon: 'fa fa-line-chart fa-2x text-orange' },
                // {name: 'Repair', link: '/repair', icon: 'fa fa-wrench fa-2x text-violet', show: false},
                { name: 'Employee', link: '/employee', icon: 'fa fa-user-circle-o fa-2x text-blue' },
                { name: 'Expense', link: '/expense', icon: 'fa fa-money fa-2x text-green' },
                { name: 'Setting', link: '/setting', icon: 'fa fa-cogs fa-2x text-dark-grey', },
                // { name: 'Ecomerce', link: '/ecommerce', icon: 'fa fa-cart-arrow-down fa-2x text-green' },
                { name: 'Rewards', link: '/ecommerce', icon: 'fa fa-trophy fa-2x text-green' },
                { name: 'Promotion', link: '/promotion', icon: 'fa fa-bullhorn fa-2x text-bittersweet' }
            ];
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], TopNavbarComponent.prototype, "menu", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], TopNavbarComponent.prototype, "isSubMenu", void 0);
    TopNavbarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-top-navbar',
            template: __webpack_require__("../../../../../src/app/shared/top-navbar/top-navbar.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/top-navbar/top-navbar.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], TopNavbarComponent);
    return TopNavbarComponent;
}());

var MenuItem = /** @class */ (function () {
    function MenuItem() {
    }
    return MenuItem;
}());



/***/ }),

/***/ "../../../../../src/app/shared/top-sub-navbar/top-sub-navbar.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row mat-elevation-z2 subMenu\">\n    <div class=\"col-md-1\" align=\"center\" *ngFor=\"let item of this.menu\" [ngClass]=\"{'visible': item.show}\" [routerLink]=\"item.link\" [routerLinkActive]=\"'active'\">\n        <i class=\"{{item.icon}}\" aria-hidden=\"true\"></i>\n        <div align=\"center\">\n            {{item.name}}\n        </div>\n    </div>\n\n</div>"

/***/ }),

/***/ "../../../../../src/app/shared/top-sub-navbar/top-sub-navbar.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".menu {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 15px;\n  margin: -23px -30px -1px -30px;\n  background: #dee2e6;\n  color: #495057; }\n  .menu :hover {\n    cursor: pointer; }\n  .menu .active {\n    transition: all 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95);\n    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px 0 rgba(0, 0, 0, 0.14), 0 1px 14px 0 rgba(0, 0, 0, 0.12);\n    background: #fff;\n    margin: -15px 0px -15px 0px;\n    padding-top: 15px; }\n\n.subMenu {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding: 12px;\n  margin: -12px -30px 10px -30px;\n  background: #f8f9fa;\n  color: #343a40; }\n  .subMenu .active {\n    transition: all 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95);\n    background: #dee2e6;\n    margin: -10px 0px;\n    padding: 10px;\n    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px 0 rgba(0, 0, 0, 0.14), 0 1px 14px 0 rgba(0, 0, 0, 0.12); }\n  .subMenu :hover {\n    transition: all 0.2s cubic-bezier(0.45, 0.05, 0.55, 0.95);\n    cursor: pointer;\n    background: #dee2e6;\n    margin: -15px 0px;\n    padding: 15px;\n    border-radius: 5px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/shared/top-sub-navbar/top-sub-navbar.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopSubNavbarComponent; });
/* unused harmony export MenuItem */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TopSubNavbarComponent = /** @class */ (function () {
    function TopSubNavbarComponent() {
        this.isSubMenu = true;
    }
    TopSubNavbarComponent.prototype.ngOnInit = function () {
        console.log('Sub Menu Options', this.menu);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], TopSubNavbarComponent.prototype, "menu", void 0);
    TopSubNavbarComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-top-sub-navbar',
            template: __webpack_require__("../../../../../src/app/shared/top-sub-navbar/top-sub-navbar.component.html"),
            styles: [__webpack_require__("../../../../../src/app/shared/top-sub-navbar/top-sub-navbar.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], TopSubNavbarComponent);
    return TopSubNavbarComponent;
}());

var MenuItem = /** @class */ (function () {
    function MenuItem() {
    }
    return MenuItem;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false,
    loginExpireWithinMinutes: 30,
    productUrl: 'http://localhost:8080',
    userUrl: 'http://localhost:8080',
    reportUrl: 'http://localhost:8080'
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);


/***/ }),

/***/ "../../../../moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "../../../../moment/locale/af.js",
	"./af.js": "../../../../moment/locale/af.js",
	"./ar": "../../../../moment/locale/ar.js",
	"./ar-dz": "../../../../moment/locale/ar-dz.js",
	"./ar-dz.js": "../../../../moment/locale/ar-dz.js",
	"./ar-kw": "../../../../moment/locale/ar-kw.js",
	"./ar-kw.js": "../../../../moment/locale/ar-kw.js",
	"./ar-ly": "../../../../moment/locale/ar-ly.js",
	"./ar-ly.js": "../../../../moment/locale/ar-ly.js",
	"./ar-ma": "../../../../moment/locale/ar-ma.js",
	"./ar-ma.js": "../../../../moment/locale/ar-ma.js",
	"./ar-sa": "../../../../moment/locale/ar-sa.js",
	"./ar-sa.js": "../../../../moment/locale/ar-sa.js",
	"./ar-tn": "../../../../moment/locale/ar-tn.js",
	"./ar-tn.js": "../../../../moment/locale/ar-tn.js",
	"./ar.js": "../../../../moment/locale/ar.js",
	"./az": "../../../../moment/locale/az.js",
	"./az.js": "../../../../moment/locale/az.js",
	"./be": "../../../../moment/locale/be.js",
	"./be.js": "../../../../moment/locale/be.js",
	"./bg": "../../../../moment/locale/bg.js",
	"./bg.js": "../../../../moment/locale/bg.js",
	"./bm": "../../../../moment/locale/bm.js",
	"./bm.js": "../../../../moment/locale/bm.js",
	"./bn": "../../../../moment/locale/bn.js",
	"./bn.js": "../../../../moment/locale/bn.js",
	"./bo": "../../../../moment/locale/bo.js",
	"./bo.js": "../../../../moment/locale/bo.js",
	"./br": "../../../../moment/locale/br.js",
	"./br.js": "../../../../moment/locale/br.js",
	"./bs": "../../../../moment/locale/bs.js",
	"./bs.js": "../../../../moment/locale/bs.js",
	"./ca": "../../../../moment/locale/ca.js",
	"./ca.js": "../../../../moment/locale/ca.js",
	"./cs": "../../../../moment/locale/cs.js",
	"./cs.js": "../../../../moment/locale/cs.js",
	"./cv": "../../../../moment/locale/cv.js",
	"./cv.js": "../../../../moment/locale/cv.js",
	"./cy": "../../../../moment/locale/cy.js",
	"./cy.js": "../../../../moment/locale/cy.js",
	"./da": "../../../../moment/locale/da.js",
	"./da.js": "../../../../moment/locale/da.js",
	"./de": "../../../../moment/locale/de.js",
	"./de-at": "../../../../moment/locale/de-at.js",
	"./de-at.js": "../../../../moment/locale/de-at.js",
	"./de-ch": "../../../../moment/locale/de-ch.js",
	"./de-ch.js": "../../../../moment/locale/de-ch.js",
	"./de.js": "../../../../moment/locale/de.js",
	"./dv": "../../../../moment/locale/dv.js",
	"./dv.js": "../../../../moment/locale/dv.js",
	"./el": "../../../../moment/locale/el.js",
	"./el.js": "../../../../moment/locale/el.js",
	"./en-au": "../../../../moment/locale/en-au.js",
	"./en-au.js": "../../../../moment/locale/en-au.js",
	"./en-ca": "../../../../moment/locale/en-ca.js",
	"./en-ca.js": "../../../../moment/locale/en-ca.js",
	"./en-gb": "../../../../moment/locale/en-gb.js",
	"./en-gb.js": "../../../../moment/locale/en-gb.js",
	"./en-ie": "../../../../moment/locale/en-ie.js",
	"./en-ie.js": "../../../../moment/locale/en-ie.js",
	"./en-nz": "../../../../moment/locale/en-nz.js",
	"./en-nz.js": "../../../../moment/locale/en-nz.js",
	"./eo": "../../../../moment/locale/eo.js",
	"./eo.js": "../../../../moment/locale/eo.js",
	"./es": "../../../../moment/locale/es.js",
	"./es-do": "../../../../moment/locale/es-do.js",
	"./es-do.js": "../../../../moment/locale/es-do.js",
	"./es-us": "../../../../moment/locale/es-us.js",
	"./es-us.js": "../../../../moment/locale/es-us.js",
	"./es.js": "../../../../moment/locale/es.js",
	"./et": "../../../../moment/locale/et.js",
	"./et.js": "../../../../moment/locale/et.js",
	"./eu": "../../../../moment/locale/eu.js",
	"./eu.js": "../../../../moment/locale/eu.js",
	"./fa": "../../../../moment/locale/fa.js",
	"./fa.js": "../../../../moment/locale/fa.js",
	"./fi": "../../../../moment/locale/fi.js",
	"./fi.js": "../../../../moment/locale/fi.js",
	"./fo": "../../../../moment/locale/fo.js",
	"./fo.js": "../../../../moment/locale/fo.js",
	"./fr": "../../../../moment/locale/fr.js",
	"./fr-ca": "../../../../moment/locale/fr-ca.js",
	"./fr-ca.js": "../../../../moment/locale/fr-ca.js",
	"./fr-ch": "../../../../moment/locale/fr-ch.js",
	"./fr-ch.js": "../../../../moment/locale/fr-ch.js",
	"./fr.js": "../../../../moment/locale/fr.js",
	"./fy": "../../../../moment/locale/fy.js",
	"./fy.js": "../../../../moment/locale/fy.js",
	"./gd": "../../../../moment/locale/gd.js",
	"./gd.js": "../../../../moment/locale/gd.js",
	"./gl": "../../../../moment/locale/gl.js",
	"./gl.js": "../../../../moment/locale/gl.js",
	"./gom-latn": "../../../../moment/locale/gom-latn.js",
	"./gom-latn.js": "../../../../moment/locale/gom-latn.js",
	"./gu": "../../../../moment/locale/gu.js",
	"./gu.js": "../../../../moment/locale/gu.js",
	"./he": "../../../../moment/locale/he.js",
	"./he.js": "../../../../moment/locale/he.js",
	"./hi": "../../../../moment/locale/hi.js",
	"./hi.js": "../../../../moment/locale/hi.js",
	"./hr": "../../../../moment/locale/hr.js",
	"./hr.js": "../../../../moment/locale/hr.js",
	"./hu": "../../../../moment/locale/hu.js",
	"./hu.js": "../../../../moment/locale/hu.js",
	"./hy-am": "../../../../moment/locale/hy-am.js",
	"./hy-am.js": "../../../../moment/locale/hy-am.js",
	"./id": "../../../../moment/locale/id.js",
	"./id.js": "../../../../moment/locale/id.js",
	"./is": "../../../../moment/locale/is.js",
	"./is.js": "../../../../moment/locale/is.js",
	"./it": "../../../../moment/locale/it.js",
	"./it.js": "../../../../moment/locale/it.js",
	"./ja": "../../../../moment/locale/ja.js",
	"./ja.js": "../../../../moment/locale/ja.js",
	"./jv": "../../../../moment/locale/jv.js",
	"./jv.js": "../../../../moment/locale/jv.js",
	"./ka": "../../../../moment/locale/ka.js",
	"./ka.js": "../../../../moment/locale/ka.js",
	"./kk": "../../../../moment/locale/kk.js",
	"./kk.js": "../../../../moment/locale/kk.js",
	"./km": "../../../../moment/locale/km.js",
	"./km.js": "../../../../moment/locale/km.js",
	"./kn": "../../../../moment/locale/kn.js",
	"./kn.js": "../../../../moment/locale/kn.js",
	"./ko": "../../../../moment/locale/ko.js",
	"./ko.js": "../../../../moment/locale/ko.js",
	"./ky": "../../../../moment/locale/ky.js",
	"./ky.js": "../../../../moment/locale/ky.js",
	"./lb": "../../../../moment/locale/lb.js",
	"./lb.js": "../../../../moment/locale/lb.js",
	"./lo": "../../../../moment/locale/lo.js",
	"./lo.js": "../../../../moment/locale/lo.js",
	"./lt": "../../../../moment/locale/lt.js",
	"./lt.js": "../../../../moment/locale/lt.js",
	"./lv": "../../../../moment/locale/lv.js",
	"./lv.js": "../../../../moment/locale/lv.js",
	"./me": "../../../../moment/locale/me.js",
	"./me.js": "../../../../moment/locale/me.js",
	"./mi": "../../../../moment/locale/mi.js",
	"./mi.js": "../../../../moment/locale/mi.js",
	"./mk": "../../../../moment/locale/mk.js",
	"./mk.js": "../../../../moment/locale/mk.js",
	"./ml": "../../../../moment/locale/ml.js",
	"./ml.js": "../../../../moment/locale/ml.js",
	"./mr": "../../../../moment/locale/mr.js",
	"./mr.js": "../../../../moment/locale/mr.js",
	"./ms": "../../../../moment/locale/ms.js",
	"./ms-my": "../../../../moment/locale/ms-my.js",
	"./ms-my.js": "../../../../moment/locale/ms-my.js",
	"./ms.js": "../../../../moment/locale/ms.js",
	"./my": "../../../../moment/locale/my.js",
	"./my.js": "../../../../moment/locale/my.js",
	"./nb": "../../../../moment/locale/nb.js",
	"./nb.js": "../../../../moment/locale/nb.js",
	"./ne": "../../../../moment/locale/ne.js",
	"./ne.js": "../../../../moment/locale/ne.js",
	"./nl": "../../../../moment/locale/nl.js",
	"./nl-be": "../../../../moment/locale/nl-be.js",
	"./nl-be.js": "../../../../moment/locale/nl-be.js",
	"./nl.js": "../../../../moment/locale/nl.js",
	"./nn": "../../../../moment/locale/nn.js",
	"./nn.js": "../../../../moment/locale/nn.js",
	"./pa-in": "../../../../moment/locale/pa-in.js",
	"./pa-in.js": "../../../../moment/locale/pa-in.js",
	"./pl": "../../../../moment/locale/pl.js",
	"./pl.js": "../../../../moment/locale/pl.js",
	"./pt": "../../../../moment/locale/pt.js",
	"./pt-br": "../../../../moment/locale/pt-br.js",
	"./pt-br.js": "../../../../moment/locale/pt-br.js",
	"./pt.js": "../../../../moment/locale/pt.js",
	"./ro": "../../../../moment/locale/ro.js",
	"./ro.js": "../../../../moment/locale/ro.js",
	"./ru": "../../../../moment/locale/ru.js",
	"./ru.js": "../../../../moment/locale/ru.js",
	"./sd": "../../../../moment/locale/sd.js",
	"./sd.js": "../../../../moment/locale/sd.js",
	"./se": "../../../../moment/locale/se.js",
	"./se.js": "../../../../moment/locale/se.js",
	"./si": "../../../../moment/locale/si.js",
	"./si.js": "../../../../moment/locale/si.js",
	"./sk": "../../../../moment/locale/sk.js",
	"./sk.js": "../../../../moment/locale/sk.js",
	"./sl": "../../../../moment/locale/sl.js",
	"./sl.js": "../../../../moment/locale/sl.js",
	"./sq": "../../../../moment/locale/sq.js",
	"./sq.js": "../../../../moment/locale/sq.js",
	"./sr": "../../../../moment/locale/sr.js",
	"./sr-cyrl": "../../../../moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "../../../../moment/locale/sr-cyrl.js",
	"./sr.js": "../../../../moment/locale/sr.js",
	"./ss": "../../../../moment/locale/ss.js",
	"./ss.js": "../../../../moment/locale/ss.js",
	"./sv": "../../../../moment/locale/sv.js",
	"./sv.js": "../../../../moment/locale/sv.js",
	"./sw": "../../../../moment/locale/sw.js",
	"./sw.js": "../../../../moment/locale/sw.js",
	"./ta": "../../../../moment/locale/ta.js",
	"./ta.js": "../../../../moment/locale/ta.js",
	"./te": "../../../../moment/locale/te.js",
	"./te.js": "../../../../moment/locale/te.js",
	"./tet": "../../../../moment/locale/tet.js",
	"./tet.js": "../../../../moment/locale/tet.js",
	"./th": "../../../../moment/locale/th.js",
	"./th.js": "../../../../moment/locale/th.js",
	"./tl-ph": "../../../../moment/locale/tl-ph.js",
	"./tl-ph.js": "../../../../moment/locale/tl-ph.js",
	"./tlh": "../../../../moment/locale/tlh.js",
	"./tlh.js": "../../../../moment/locale/tlh.js",
	"./tr": "../../../../moment/locale/tr.js",
	"./tr.js": "../../../../moment/locale/tr.js",
	"./tzl": "../../../../moment/locale/tzl.js",
	"./tzl.js": "../../../../moment/locale/tzl.js",
	"./tzm": "../../../../moment/locale/tzm.js",
	"./tzm-latn": "../../../../moment/locale/tzm-latn.js",
	"./tzm-latn.js": "../../../../moment/locale/tzm-latn.js",
	"./tzm.js": "../../../../moment/locale/tzm.js",
	"./uk": "../../../../moment/locale/uk.js",
	"./uk.js": "../../../../moment/locale/uk.js",
	"./ur": "../../../../moment/locale/ur.js",
	"./ur.js": "../../../../moment/locale/ur.js",
	"./uz": "../../../../moment/locale/uz.js",
	"./uz-latn": "../../../../moment/locale/uz-latn.js",
	"./uz-latn.js": "../../../../moment/locale/uz-latn.js",
	"./uz.js": "../../../../moment/locale/uz.js",
	"./vi": "../../../../moment/locale/vi.js",
	"./vi.js": "../../../../moment/locale/vi.js",
	"./x-pseudo": "../../../../moment/locale/x-pseudo.js",
	"./x-pseudo.js": "../../../../moment/locale/x-pseudo.js",
	"./yo": "../../../../moment/locale/yo.js",
	"./yo.js": "../../../../moment/locale/yo.js",
	"./zh-cn": "../../../../moment/locale/zh-cn.js",
	"./zh-cn.js": "../../../../moment/locale/zh-cn.js",
	"./zh-hk": "../../../../moment/locale/zh-hk.js",
	"./zh-hk.js": "../../../../moment/locale/zh-hk.js",
	"./zh-tw": "../../../../moment/locale/zh-tw.js",
	"./zh-tw.js": "../../../../moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../../../../moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map