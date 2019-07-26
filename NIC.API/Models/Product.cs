using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace NIC.API.Models
{
    public class Product
    {
        
        public int Id { get; set; }
        public string Name { get; set; }
        public string Details { get; set; }
        public string Price { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Cart_Items> CartItems { get; set; }
        
        public Product()
        {
            Photos = new Collection<Photo>();
        }
    }
}