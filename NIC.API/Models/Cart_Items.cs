using System.Collections.Generic;

namespace NIC.API.Models
{
    public class Cart_Items
    {
     
        public int Quantity { get; set; }
        public decimal TotalPrice { get; set; }
        public int CartId { get; set; }
        public Cart Cart { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
       
    }
}