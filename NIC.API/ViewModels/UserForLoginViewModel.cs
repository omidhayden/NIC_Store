using System.ComponentModel.DataAnnotations;

namespace NIC.API.ViewModels
{
    public class UserForLoginViewModel
    {
        [Required(ErrorMessage = "Please enter your Username.")]
        [MinLength(5, ErrorMessage ="Username must be more than 5 characters")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Please enter your Password.")]
       public string Password { get; set; }
    }
}