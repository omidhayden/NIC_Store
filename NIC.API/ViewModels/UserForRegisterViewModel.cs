using System.ComponentModel.DataAnnotations;

namespace NIC.API.ViewModels
{
    public class UserForRegisterViewModel
    {
        
        [Required(ErrorMessage = "Please enter your Username.")]
        [MinLength(5, ErrorMessage ="Username must be more than 5 characters")]
        [MaxLength(11, ErrorMessage = "Username must be less than 11 characters ")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Please enter your Email.")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Please enter your Password.")]
        public string Password { get; set; }
    }
}