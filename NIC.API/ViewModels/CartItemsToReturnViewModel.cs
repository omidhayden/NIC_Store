using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace NIC.API.ViewModels
{
    public class CartItemsToReturnViewModel
    {
        public int productId { get; set; }
        public string productName { get; set; }
        public int Quantity { get; set; }

        [DataType(DataType.Currency)]
        public decimal productPrice { get; set; }
        [DataType(DataType.Currency)]
        public decimal totalPrice { get; set; }
        public IEnumerable<string> subCategoryName { get; set; }
        public IEnumerable<string> categoryName { get; set; }
        public string photoUrl { get; set; }

    }
}