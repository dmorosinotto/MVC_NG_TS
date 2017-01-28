/// <reference path="services/namesvc.ts" />

var mod = angular.module("myapp", [])
//createModuleAndRegisterComponents("myapp", <any>MyApp.Components)
    .directive(MyApp.Directives)
    .controller(MyApp.Controllers)
    .service(MyApp.Services)
    .component("helloWorld",MyApp.Components.helloWorld)
;

              
/*
function createModuleAndRegisterComponents(modName: string, components: {[comp:string]: angular.IComponentOptions}, modDeps: string[] = []): angular.IModule {
    // Helper function that create module and register all Components passed in the components objMap (seletor: CompOptions)
    var mod = angular.module(modName, modDeps)
    angular.forEach(components, (options,name) => mod.component(name, options));
    return mod;
}
*/
