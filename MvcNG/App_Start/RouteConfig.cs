using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace MvcNG
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            // DEFINE ROUTES for BaseTSController
            routes.MapRoute(
                name: "ngBundle",
                url: "{controller}/bundle.js",
                defaults: new { action = "Bundle" }
            );
            routes.MapRoute(
                name: "ngBundleMap",
                url: "{controller}/bundle.js.map",
                defaults: new { action = "BundleMap" }
            );
            routes.MapRoute(
                name: "Template",
                url: "{controller}/tpl/{template}",
                defaults: new { action = "Template" }, 
                constraints: new { template = @"[\w-]+\.html" }
            );
            // END ROUTES for BaseTSController

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

        }
    }
}