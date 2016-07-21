var tsns;
(function (tsns) {
    "use strict";
    tsns.app = "Ciao";
})(tsns || (tsns = {}));
var tsns;
(function (tsns) {
    var Services;
    (function (Services) {
        "use strict";
        function great(name) {
            alert(tsns.app + "  " + name);
        }
        Services.great = great;
    })(Services = tsns.Services || (tsns.Services = {}));
})(tsns || (tsns = {}));
//# sourceMappingURL=bundle.js.map