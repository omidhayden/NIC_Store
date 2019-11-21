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
        public string photoUrl { get; set; }

    }
}