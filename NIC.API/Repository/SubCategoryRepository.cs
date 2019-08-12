using System.Threading.Tasks;
using NIC.API.Db;
using NIC.API.IRepository;

namespace NIC.API.Repository
{
    public class SubCategoryRepository : ISubCategoryRepository
    {
        private readonly MyDbContext _db;
        public SubCategoryRepository(MyDbContext db)
        {
            _db = db;

        }
        // public Task<bool> AddSubCategoryForProduct(int productId, int subCategoryId)
        // {
            
        // }
    }
}