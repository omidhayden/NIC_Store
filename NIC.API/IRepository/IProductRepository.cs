using System.Collections.Generic;
using System.Threading.Tasks;
using NIC.API.Helpers;
using NIC.API.Models;
using NIC.API.ViewModels;

namespace NIC.API.IRepository
{
    public interface IProductRepository
    {
        Task<PagedList<Product>> GetProducts (ProductParams userParams);
        Task<Product> GetProduct (int id);
        void update<T>(T entity) where T:class;
        void add<T>(T entity) where T:class;
        void delete<T> (T entity) where T:class;

        Task<IEnumerable<Product_SubCategory>> GetProductSubs(int productId);
        Task<bool> SaveAll();
    }
}