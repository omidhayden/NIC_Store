using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NIC.API.Db;
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
            return await _db.Products.Include(p => p.Photos).FirstOrDefaultAsync(p => p.Id ==id);
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            var products = await _db.Products.Include(p => p.Photos).ToListAsync();
            return products;
        }

       

        public async Task<bool> SaveAll()
        {
           return await _db.SaveChangesAsync()>0;
        }

     
    }
}