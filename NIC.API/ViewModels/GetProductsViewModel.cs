using System;
using System.Collections.Generic;

namespace NIC.API.ViewModels
{
    public class GetProductsViewModel
    {
        
        public int Id { get; set; }
      
        public string Name { get; set; }
       
        public string Details { get; set; }
        
        public string Price { get; set; }
        public string PhotoUrl { get; set; }
        public DateTime CreatedDate { get; set; }

        public IEnumerable<GetProductCategoryViewModel> ProductCategoryNames { get; set; }
    }
}