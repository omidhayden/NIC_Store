using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace NIC.API.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<SubCategory> SubCategories { get; set; }


        public Category()
        {
            SubCategories = new Collection<SubCategory>();
        }
    }
}