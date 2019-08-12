using System.Collections.Generic;

namespace NIC.API.ViewModels
{
    public class ProductUpdateViewModel
    {
        
        public string Name { get; set; }
        public string Details { get; set; }
        public string Price { get; set; }


        public IEnumerable<int> SubCategoryId { get; set; }
    }
}