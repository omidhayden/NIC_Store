using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace NIC.API.Models
{
    public class User : IdentityUser 
    {

        
        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<Cart> UserCarts { get; set; }
    }
}