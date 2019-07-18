using System;
using System.Collections.Generic;

namespace NIC.API.Models
{
    public class Cart 
    {
        
        public Cart()
        {

        }
        public int Id { get; set; }
        public DateTime OrderDate { get; set; }
        public string Status { get; set; }
        
       
        public ICollection<Cart_Items> CartItems { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
    }

}