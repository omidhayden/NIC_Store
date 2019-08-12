using System.Collections.Generic;

namespace NIC.API.Models
{
    public class SubCategory
    {
        public SubCategory()
        {
            
        }
        public int Id { get; set; } 
        public string Name { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public ICollection<Product_SubCategory> ProductSubCategories { get; set; }
    }
}