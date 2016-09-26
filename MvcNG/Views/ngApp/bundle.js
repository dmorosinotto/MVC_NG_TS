var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MyApp;
(function (MyApp) {
    var Components;
    (function (Components) {
        var Greeting = (function () {
            function Greeting(log) {
                this.log = log;
                log.warn("on ctor NOT READY:", this.prefix, this.name, this.onChanged);
            }
            Greeting.prototype.$onInit = function () {
                this.log.info("$onInit life-cycle hook OK:", this.prefix, this.name, this.onChanged);
            };
            Greeting.prototype.notify = function () {
                this.log.log("notify $event->", this.name);
                this.onChanged({ $event: this.name });
            };
            Greeting.$inject = ["$log"];
            return Greeting;
        }());
        Components.helloWorld = {
            bindings: {
                prefix: "@",
                name: "<",
                onChanged: "&"
            },
            controller: Greeting,
            template: "<div><b>{{$ctrl.prefix || 'Hello'}}</b> <input ng-model=\"$ctrl.name\">\n                        <button ng-click=\"$ctrl.notify()\"> OK </button>\n                   </div>" //template string
        };
    })(Components = MyApp.Components || (MyApp.Components = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var NameSvc = (function () {
            function NameSvc($q, wait) {
                this.$q = $q;
                this.wait = wait;
                this.wait = wait || 1000;
            }
            NameSvc.prototype._newValue = function (value) {
                return { value: value };
            };
            NameSvc.prototype.getName = function () {
                var _this = this;
                var p = this.$q.defer();
                setTimeout(function () { return p.resolve(_this._newValue("Pippo")); }, this.wait);
                return p.promise;
            };
            NameSvc.$inject = ["$q", "WAIT"];
            return NameSvc;
        }());
        Services.NameSvc = NameSvc;
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Controllers;
    (function (Controllers) {
        var BaseCtrl = (function () {
            function BaseCtrl(svc) {
                var _this = this;
                this.svc = svc;
                this.title = "Hello";
                svc.getName().then(function (t) { return _this.title = t.value; });
            }
            return BaseCtrl;
        }());
        var MainCtrl = (function (_super) {
            __extends(MainCtrl, _super);
            function MainCtrl(svc) {
                var _this = this;
                _super.call(this, svc);
                this.name = 'World...';
                svc.getName().then(function (n) { return _this.name = n.value; });
            }
            MainCtrl.prototype.show = function ($event) {
                if (typeof $event === "string") {
                    if (window.confirm("Set " + $event + "?"))
                        this.name = $event;
                }
                else
                    window.alert(JSON.stringify($event));
            };
            MainCtrl.$inject = ["NameSvc"];
            return MainCtrl;
        }(BaseCtrl));
        Controllers.MainCtrl = MainCtrl;
    })(Controllers = MyApp.Controllers || (MyApp.Controllers = {}));
})(MyApp || (MyApp = {}));
var MyApp;
(function (MyApp) {
    var Directives;
    (function (Directives) {
        function repeaterDir() {
            return {
                restrict: "AE",
                scope: {
                    color: "@",
                    what: "=",
                    num: "<",
                    onRepeat: "&" //callback handler
                },
                templateUrl: "tpl/RepeaterDir.html",
                controller: RepeaterDir,
                controllerAs: "$ctrl",
                bindToController: true
            };
        }
        Directives.repeaterDir = repeaterDir;
        var RepeaterDir = (function () {
            function RepeaterDir() {
                this.num = this.num || 2;
                this.color = this.color || 'red';
            }
            RepeaterDir.prototype.doRepeat = function (n) {
                var str = "";
                for (var i = 0; i < n; i++) {
                    str += i + ". " + this.what + " \n"; //tempalte-string with params
                }
                this.onRepeat({ $event: { str: str, n: n } });
            };
            return RepeaterDir;
        }());
    })(Directives = MyApp.Directives || (MyApp.Directives = {}));
})(MyApp || (MyApp = {}));
// POLYFILL ANGULAR GLOBAL OBJECT TO ADD AN HELPER METHOD TO REGISTER A COMPLETE MODULE FROM A TYPESCRIPT NAMESPACE OBJECT
angular.createModuleAndRegister = function createModuleAndRegister(nsApp, modName, modDeps) {
    if (modDeps === void 0) { modDeps = []; }
    var mod = angular.module(modName, modDeps); //create new module instace with specific name and dependencies
    if (nsApp.Components)
        angular.forEach(nsApp.Components, function (options, name) { return mod.component(name, options); });
    if (nsApp.Directives)
        mod.directive(nsApp.Directives); //use object syntax to register all Directive "name": function->DDO
    if (nsApp.Controllers)
        mod.controller(nsApp.Controllers); //use object syntax to register all Controller "name": class+$inject[] 
    if (nsApp.Services)
        mod.service(nsApp.Services); //use object syntax to register all Service "name": class (expose this.methods)
    if (nsApp.Filters)
        mod.filter(nsApp.Filters); //use object syntax to register all Filter "name": class constructor as function 
    return mod; //return angular module instance, you can chain .constant to setup globals, or .config to configure ng-route provider 
};
/// <reference path="components/GreetingCmp.ts" />
/// <reference path="services/NameSvc.ts" />
/// <reference path="controllers/MainCtrl.ts" />
/// <reference path="directives/RepeaterDir.ts" />
/// <reference path="ngPolyfill.ts" />
//var mod = angular.module("myapp", [])
angular.createModuleAndRegister(MyApp, "myapp", ["ngRoute"])
    .config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/main", {
        controller: "MainCtrl",
        controllerAs: "vm",
        templateUrl: "tpl/Main.html"
    })
        .when("/wait", {
        template: "<hello-world name='$resolve.name'></hello-world>",
        resolve: {
            // I will cause a 1 second delay
            delay: function ($q, $timeout, WAIT) {
                var delay = $q.defer();
                $timeout(delay.resolve, WAIT);
                return delay.promise;
            },
            name: function (WAIT) { return "... after " + WAIT + "sec..."; }
        }
    })
        .when("/hi/:prefix", {
        template: "<hello-world prefix='{{$resolve.prefix}}' name='$resolve.name' on-changed='$resolve.show($event)'></hello-world>",
        resolve: {
            prefix: function ($route) {
                return $route.current.params.prefix;
            },
            name: function () { return "from resolve"; },
            show: function () { return function (x) { return alert("into resolve:" + x); }; }
        }
    })
        .otherwise("main");
});
//# sourceMappingURL=bundle.js.map