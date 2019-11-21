using System.Collections.Generic;
using System.Threading.Tasks;
using NIC.API.Models;

namespace NIC.API.IRepository
{
    public interface ICartRepository 
    {
        Task<IEnumerable<Cart_Items>> CartItems(string username);
         Task<bool> AddtoCart (string username, Cart cart, int productId, int? Quantity);
         Task<Cart> OpenCart (string username);
         Task<bool> RemoveCart(string username);
         //Good Luck :)
         Task<bool> RemoveCartItems(string username, int productId);
         //Good Luck :)
         Task<bool> ChangeItemQuantity(string username, int productId, int Quantity);
         Task<bool> SaveAll();
    }
}