/// <reference path="components/GreetingCmp.ts" />
/// <reference path="services/NameSvc.ts" />
/// <reference path="controllers/MainCtrl.ts" />
/// <reference path="directives/RepeaterDir.ts" />
/// <reference path="ngPolyfill.ts" />

//var mod = angular.module("myapp", [])
(angular as any).createModuleAndRegister(MyApp, "myapp", ["ngRoute"])
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
                    name: function (WAIT) { return "... after " + WAIT + "sec..." }
                }
            })
            .when("/hi/:prefix", {
                template: "<hello-world prefix='{{$resolve.prefix}}' name='$resolve.name' on-changed='$resolve.show($event)'></hello-world>",
                resolve: {
                    prefix: function ($route) { //read params from route to pass into $resolve
                        return $route.current.params.prefix;
                    },
                    name: function () { return "from resolve" },
                    show: function () { return function (x) { return alert("into resolve:" + x); } }
                }
            })
            .otherwise("main");
    })
;
