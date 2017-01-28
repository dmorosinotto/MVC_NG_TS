namespace MyApp.Services {
    export interface IData {
        value: string;
    }

    export class NameSvc {
        static $inject = ["$q", "WAIT", "NAME"];
        constructor(private $q: angular.IQService, private wait: number, private name:string) {
            this.wait = wait || 1000;
        }   

        private _newValue(value: string): IData {
            return {value};
        }
        
        getName(): angular.IPromise<IData> {
            var p = this.$q.defer<IData>()
            setTimeout(() => p.resolve( this._newValue(this.name) ), this.wait);
            return p.promise;
        }     
    }
}
