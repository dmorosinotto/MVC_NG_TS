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
            return Greeting;
        }());
        Greeting.$inject = ["$log"];
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
                var _this = _super.call(this, svc) || this;
                _this.name = 'World...';
                svc.getName().then(function (n) { return _this.name = n.value; });
                return _this;
            }
            MainCtrl.prototype.show = function ($event) {
                if (typeof $event === "string") {
                    if (window.confirm("Set " + $event + "?"))
                        this.name = $event;
                }
                else
                    window.alert(JSON.stringify($event));
            };
            return MainCtrl;
        }(BaseCtrl));
        MainCtrl.$inject = ["NameSvc"];
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
var MyApp;
(function (MyApp) {
    var Services;
    (function (Services) {
        var NameSvc = (function () {
            function NameSvc($q, wait, name) {
                this.$q = $q;
                this.wait = wait;
                this.name = name;
                this.wait = wait || 1000;
            }
            NameSvc.prototype._newValue = function (value) {
                return { value: value };
            };
            NameSvc.prototype.getName = function () {
                var _this = this;
                var p = this.$q.defer();
                setTimeout(function () { return p.resolve(_this._newValue(_this.name)); }, this.wait);
                return p.promise;
            };
            return NameSvc;
        }());
        NameSvc.$inject = ["$q", "WAIT", "NAME"];
        Services.NameSvc = NameSvc;
    })(Services = MyApp.Services || (MyApp.Services = {}));
})(MyApp || (MyApp = {}));
/// <reference path="services/namesvc.ts" />
var mod = angular.module("myapp", [])
    .directive(MyApp.Directives)
    .controller(MyApp.Controllers)
    .service(MyApp.Services)
    .component("helloWorld", MyApp.Components.helloWorld);
/*
function createModuleAndRegisterComponents(modName: string, components: {[comp:string]: angular.IComponentOptions}, modDeps: string[] = []): angular.IModule {
    // Helper function that create module and register all Components passed in the components objMap (seletor: CompOptions)
    var mod = angular.module(modName, modDeps)
    angular.forEach(components, (options,name) => mod.component(name, options));
    return mod;
}
*/
//# sourceMappingURL=bundle.js.map