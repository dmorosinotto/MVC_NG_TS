using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcNG.Controllers
{
    public class ngAppController : BaseTSController
    {
        //
        // GET: /ngApp/main
        public ActionResult main() { //DON'T USE Index - DON'T WORK!
            ViewBag.WAIT = 5000;            
            return View();            
        }

    }
}
