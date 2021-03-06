using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel.DataAnnotations;

namespace NIC.API.Models
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Details { get; set; }
  
  [     DataType(DataType.Currency)]
        public decimal Price { get; set; }
        public DateTime CreatedDate { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Cart_Items> CartItems { get; set; }
        public ICollection<Product_SubCategory> ProductSubCategories { get; set; }
        public Product()
        {
            ProductSubCategories = new Collection<Product_SubCategory>();
            Photos = new Collection<Photo>();
        }



    }
}