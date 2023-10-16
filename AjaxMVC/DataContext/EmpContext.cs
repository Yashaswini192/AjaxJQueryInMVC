using AjaxMVC.Models;
using Microsoft.EntityFrameworkCore;


namespace AjaxMVC.DataContext
{
    public class EmpContext : DbContext
    {
        public EmpContext(DbContextOptions<EmpContext>options) :base(options) { 
        
        }
        public DbSet<EmpModel> Emps { get; set; }   
    }
}
