using System.ComponentModel.DataAnnotations;

namespace NIC.API.ViewModels
{
    public class UserForRegisterViewModel
    {
        
        [Required(ErrorMessage = "Please enter your Username.")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Please enter your Email.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Please enter your Email.")]
        public string Password { get; set; }
    }
}