var home;
(function (home) {
    "use strict";
    home.app = "Hello";
})(home || (home = {}));
var home;
(function (home) {
    var Services;
    (function (Services) {
        "use strict";
        function great(name) {
            alert(home.app + "  " + name);
        }
        Services.great = great;
    })(Services = home.Services || (home.Services = {}));
})(home || (home = {}));
//# sourceMappingURL=bundle.js.map