using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NIC.API.Db;
using NIC.API.Helpers;
using NIC.API.IRepository;
using NIC.API.Models;

namespace NIC.API.Repository
{
    public class ProductRepository : IProductRepository 
    {
        private readonly MyDbContext _db;


        public ProductRepository(MyDbContext db)
        {
            _db = db;

        }

        public void add<T>(T entity) where T : class
        {
            _db.Add(entity);
        }

        public void delete<T>(T entity) where T : class
        {
            _db.Remove(entity);
        }

        public async Task<Product> GetProduct(int id)
        {
            return await _db.Products
            .Where(p => p.Id == id)
            .Include(o => o.Photos)
            .Include(s => s.ProductSubCategories)
                .ThenInclude(s => s.SubCategory)
                .ThenInclude(p=> p.Category)
                

                .FirstOrDefaultAsync();
               
                            
                            
            
                
         
                    
        }

        public async Task<PagedList<Product>> GetProducts(ProductParams productParams)
        {
            var products =  _db.Products
            .Include(p => p.Photos)
            .Include(c => c.ProductSubCategories)
            .ThenInclude(a => a.SubCategory)
            .ThenInclude(a => a.Category)
            .OrderByDescending(p => p.CreatedDate).AsQueryable();
            
            if(!string.IsNullOrWhiteSpace(productParams.Name))
            {
                products = products.Where( p => p.Name.Contains(productParams.Name));
            }

            if(!string.IsNullOrWhiteSpace(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "id":
                    if(productParams.Dir == "asc") products = products.OrderBy(p => p.Id);
                    if(productParams.Dir == "desc") products = products.OrderByDescending(p => p.Id);
                    break;
                    case "name":
                    if(productParams.Dir == "asc") products = products.OrderBy(p => p.Name);
                    if(productParams.Dir == "desc") products = products.OrderByDescending(p => p.Name);
                    break;
                   
                   case "details":
                    if(productParams.Dir == "asc") products = products.OrderBy(p => p.Details);
                    if(productParams.Dir == "desc") products = products.OrderByDescending(p => p.Details);
                    break;
                    
                    case "price":
                    if(productParams.Dir == "asc") products = products.OrderBy(p => p.Price);
                    if(productParams.Dir == "desc") products = products.OrderByDescending(p => p.Price);
                    break;
                    case "category":
                    if(productParams.Dir == "asc") products = products.OrderBy(p => p.ProductSubCategories);
                    if(productParams.Dir == "desc") products = products.OrderByDescending(p => p.ProductSubCategories);
                    break;
                }
            }
            

            return await PagedList<Product>.CreateAsync(products, productParams.PageNumber, productParams.PageSize);
        }

        public async Task<IEnumerable<Product_SubCategory>> GetProductSubs(int productId)
        {
            var subs = await _db.Product_SubCategories.Where(p => p.ProductId == productId).ToListAsync();
            return subs;
        }

        public async Task<bool> SaveAll()
        {
           return await _db.SaveChangesAsync()>0;
        }

        public void update<T>(T entity) where T : class
        {
            _db.Update(entity);
        }

        
        
    }
}