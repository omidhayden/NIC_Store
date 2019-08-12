using System.Collections.Generic;
using System.Threading.Tasks;
using NIC.API.Models;

namespace NIC.API.IRepository
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAll();
        Task<Category> Get(int id);

        Task<Category> Add(string Name, IEnumerable<string> subCatName);
        
        void add<T> (T entity) where T:class;
        void delete<T> (T entity) where T:class;
        Task<bool> SaveAll();
        
        //Sub Category
        Task<bool> AddSubCategory(int categoryId ,IEnumerable<string> name);
        Task<SubCategory> GetSub(int id);
        Task<IEnumerable<SubCategory>> GetAllSubs();

    }
}