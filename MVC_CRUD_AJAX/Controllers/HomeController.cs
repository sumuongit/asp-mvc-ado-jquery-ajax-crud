using MVC_CRUD_AJAX.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC_CRUD_AJAX.Controllers
{
    public class HomeController : Controller
    {
        EmployeeDB empDB = new EmployeeDB();
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult SelectEmployee()
        {
            return Json(empDB.SelectEmployee(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertEmployee(Employee emp)
        {
            return Json(empDB.InsertEmployee(emp), JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEmployeeById(int id)
        {
            var employe = empDB.SelectEmployee().Find(x => x.EmployeeID.Equals(id));
            return Json(employe, JsonRequestBehavior.AllowGet);
        }        

        public JsonResult UpdateEmployee(Employee emp)
        {
            return Json(empDB.UpdateEmployee(emp), JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteEmployee(int id)
        {
            return Json(empDB.DeleteEmplyee(id), JsonRequestBehavior.AllowGet);
        }
    }
}