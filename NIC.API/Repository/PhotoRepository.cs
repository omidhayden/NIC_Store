using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using NIC.API.Db;
using NIC.API.IRepository;
using NIC.API.Models;

namespace NIC.API.Repository
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly MyDbContext _db;

        public PhotoRepository(MyDbContext db)
        {
            _db = db;
        }

        public async Task<Photo> GetMainPhotoForProduct(int productId)
        {
            var mainPhoto= await _db.Photos.Where(p => p.ProductId == productId).FirstOrDefaultAsync(p => p.IsMain);
            return mainPhoto;
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _db.Photos.FirstOrDefaultAsync(p => p.Id ==id);
            return photo;
        }

        public  async Task<IEnumerable<Photo>> GetPhotos(int productId)
        {
            var photos = await _db.Photos.Where(p => p.ProductId == productId).ToListAsync();
            
            return photos;
        }

        public async Task<bool> ProductPhotoExist(int productId, int photoId)
        {
            var checker = await _db.Photos.Where(p => p.Id == photoId && p.ProductId == productId).FirstOrDefaultAsync();
            if(checker == null) return false;
            return true;
        }
    }
}