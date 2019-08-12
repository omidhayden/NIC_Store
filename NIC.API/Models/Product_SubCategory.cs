namespace NIC.API.Models
{
    public class Product_SubCategory
    {
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int SubCategoryId { get; set; }
        public SubCategory SubCategory { get; set; }
    }
}