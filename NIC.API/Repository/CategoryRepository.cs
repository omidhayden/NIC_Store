using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NIC.API.Db;
using NIC.API.IRepository;
using NIC.API.Models;

namespace NIC.API.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly MyDbContext _db;
        public CategoryRepository(MyDbContext db)
        {
            _db = db;

        }

        public async Task<Category> Add(string Name, IEnumerable<string> subCatName)
        {
            Category c = new Category();
            c.Name = Name;

            await _db.Categories.AddAsync(c);

            if (subCatName != null)
            {
                foreach (var item in subCatName)
                {
                    SubCategory sc = new SubCategory();
                    sc.Name = item;
                    sc.CategoryId = c.Id;

                    await _db.SubCategories.AddAsync(sc);
                }
            }

            return c;
        }

        public void add<T>(T entity) where T : class
        {
            _db.Add(entity);
        }

        public void delete<T>(T entity) where T : class
        {
            _db.Remove(entity);
        }

        public async Task<Category> Get(int id)
        {
            return await _db.Categories.FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<IEnumerable<Category>> GetAll()
        {
            return await _db.Categories.Include(p => p.SubCategories).ToListAsync();
        }

        public async Task<bool> SaveAll()
        {
            return await _db.SaveChangesAsync() > 0;
        }
    


//Sub Category Implementation

        
        public async Task<bool> AddSubCategory(int categoryId, IEnumerable<string> name)
        {
            foreach (var item in name)
            {
                SubCategory sCat = new SubCategory{
                    Name = item,
                    CategoryId =  categoryId
                };

                await _db.SubCategories.AddAsync(sCat);
            }
            return true;
            
        }

        public async Task<SubCategory> GetSub(int id)
        {
           return await _db.SubCategories.FirstOrDefaultAsync(s => s.Id == id);
        }

        public async Task<IEnumerable<SubCategory>> GetAllSubs()
        {
            return await _db.SubCategories.ToListAsync();
        }
        
    }
}