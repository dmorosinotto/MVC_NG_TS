namespace MyApp.Directives {
    export function repeaterDir(): angular.IDirective {
        return { //DDO 
            restrict: "AE", //<red-dir>...</red-dir>  
            scope: {
                color: "@", //string literal
                what: "=", //two-way
                num: "<", //one-way solo NG 1.4+
                onRepeat: "&" //callback handler
            },
            templateUrl: "tpl/RepeaterDir.html", //LOAD TEMPLATE VIA DYNAMIC PARTIAL tplRepeaterDir.cshtml
            controller: RepeaterDir,
            controllerAs: "$ctrl",
            bindToController: true
        }
    }
    export interface IEventArg {
        str: string;
        n: number;
    }
    export type EventHandler<T> = (payload: {$event: T}) => void;

    class RepeaterDir {
        constructor() {
            this.num = this.num || 2;
            this.color = this.color || 'red';
        }

        public color: string;
        public num: number;
        public what: string;
        public onRepeat: EventHandler<IEventArg>;

        public doRepeat(n:number) {
            let str = "";
            for(let i=0; i<n; i++) {
                str += `${i}. ${this.what} \n`; //tempalte-string with params
            }
            this.onRepeat({$event: {str, n} });
        }
    }
}