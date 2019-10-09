using System.Collections.Generic;

namespace NIC.API.ViewModels.getproducts
{
    public class GetProductViewModel
    {
        public int id { get; set; }
        public string  Name { get; set; }
        public string Details { get; set; }
        
        public decimal Price { get; set; }
        public IEnumerable<GetPhotoForProduct>  Photos{ get; set; }
        public IEnumerable<ProductSubCategoryViewModel> ProductSubCategories { get; set; }
        

    }
}