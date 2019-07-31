using System.Collections.Generic;
using System.Threading.Tasks;
using NIC.API.Models;
using NIC.API.ViewModels;

namespace NIC.API.IRepository
{
    public interface IProductRepository
    {
        Task<IEnumerable<Product>> GetProducts ();
        Task<Product> GetProduct (int id);
    
        void add<T>(T entity) where T:class;
        void delete<T> (T entity) where T:class;
        Task<bool> SaveAll();
    }
}