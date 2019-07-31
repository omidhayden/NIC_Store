using System.Collections.Generic;
using System.Threading.Tasks;
using NIC.API.Models;

namespace NIC.API.IRepository
{
    public interface IPhotoRepository
    {
        Task<IEnumerable<Photo>> GetPhotos(int productId);

        Task<bool> ProductPhotoExist(int productId, int photoId);
        Task<Photo> GetPhoto(int id);

        Task<Photo> GetMainPhotoForProduct(int productId);
        
    }

    
}