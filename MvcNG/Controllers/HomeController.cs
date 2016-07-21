using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcNG.Controllers
{
    public class HomeController : BaseTSController
    {
        //
        // GET: /Home/  - THIS DON'T WORKS!
        public ActionResult Index()
        {
            return View();
        }

        //
        // GET: /Home/TS - OK TS HERE WORKS!
        public ActionResult TS() {
            return View();
        }

    }
}
