using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.IO;

namespace AjaxMVC.Models
{
    public class EmpModel
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required(ErrorMessage ="{0} cannot be Empty")]
        public int Id { get; set; }
        [Required(ErrorMessage = "{0} cannot be Empty")]
        public string Name { get; set; }
        [Required(ErrorMessage = "{0} cannot be Empty")]
        public string Gender { get; set; }
        [Required(ErrorMessage = "{0} cannot be Empty")]
        public string Department { get; set; }
        [Required(ErrorMessage = "{0} cannot be Empty")]
        public double Salary { get; set; }
    }
}
