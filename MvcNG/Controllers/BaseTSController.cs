using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcNG.Controllers
{
    public class BaseTSController : Controller
    {
        // See RouteConfig for route definition
        // GET: /<controller>/bundle.js
        public ActionResult Bundle(string controller) {
            var path = Request.MapPath("~/Views/" + controller + "/bundle.js");
            return File(path, "text/javascript");
        }

        // See RouteConfig for route definition
        // GET: /<controller>/bundle.js.map
        public ActionResult BundleMap(string controller) {
            var path = Request.MapPath("~/Views/" + controller + "/bundle.js.map");
            return File(path, "text/javascript");
        }

        // See RouteConfig for route definition
        // GET: /<controller>/tpl/*.html
        public ActionResult Template(string template) {
            var viewName = "tpl" + template.Replace(".html","");
            return PartialView(viewName);
        }
    }
}
