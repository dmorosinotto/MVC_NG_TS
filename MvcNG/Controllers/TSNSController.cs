using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MvcNG.Controllers
{
    public class TSNSController : BaseTSController
    {
        //
        // GET: /TSNG/Sample
        public ActionResult Sample() { //DON'T USE Index - DON'T WORK!
            ViewBag.Name = "Daniele! \\n With DYNAMIC-Injection via ViewBag!";            
            return View();            
        }
        
    }
}
