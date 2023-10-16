using AjaxMVC.DataContext;
using AjaxMVC.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AjaxMVC.Controllers
{
    public class EmpController : Controller
    {
        private readonly EmpContext context;

        public EmpController(EmpContext context)
        {
            this.context = context;
        }
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult EmpDetails()
        {
            var result = context.Emps.ToList();
            return new JsonResult(result);
        }

        [HttpPost]
        public JsonResult AddEmployee(EmpModel employee)
        {
            try
            {
                //var emp = new EmpModel()
                //{
                //    Name = employee.Name,
                //    Gender = employee.Gender,
                //    Department = employee.Department,
                //    Salary = employee.Salary,
                //};
                context.Emps.Add(employee);
                context.SaveChanges();
                return new JsonResult("Data is Saved");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public JsonResult Edit(int id)
        {
            var data = context.Emps.Where(e => e.Id == id).SingleOrDefault();
            return new JsonResult(data);
        }

        [HttpPost]
        public JsonResult Update(EmpModel model)
        {
            context.Emps.Update(model);
            context.SaveChanges();
            return new JsonResult("Record Updated");
        }

        [HttpDelete]
        public JsonResult Delete(int id)
        {
            try
            {
                var data = context.Emps.Where(e => e.Id == id).SingleOrDefault();
                if(data != null)
                {
                    context.Emps.Remove(data);
                    context.SaveChanges();
                }
               
                return new JsonResult("Data Deleted");
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        [HttpPost]
        public JsonResult Search(string searchstring)
        {
            try
            {
                EmpModel empModel = new EmpModel();
                if (searchstring != null)
                {
                    context.Emps.Where(e => e.Name == searchstring).SingleOrDefault();
                    context.SaveChanges();

                }
                return new JsonResult("SuccessFully Retreived");

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
