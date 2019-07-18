using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using NIC.API.Db;
using NIC.API.IRepository;
using NIC.API.Models;

namespace NIC.API.Repository
{
    public class CartRepository : ICartRepository
    {
        private readonly MyDbContext _db;
        private readonly UserManager<User> _userManager;
        public CartRepository(MyDbContext db, UserManager<User> userManager)
        {
            _userManager = userManager;
            _db = db;

        }

          public async Task<IEnumerable<Cart_Items>> CartItems(string username)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(username);
                string userId = user.Id;
                Cart userOpenCart = await _db.Carts.FirstOrDefaultAsync(x => x.UserId == userId && x.Status =="open");
                int specificCartId = userOpenCart.Id;

                List<Cart_Items> cartItemsList =await _db.CartItems.Include(x =>x.Product).Where(x => x.CartId == specificCartId).ToListAsync();
                return cartItemsList;
            }
            catch (System.Exception)
            {
                
                return null;
            }
            
        
            
        }


        public async Task<bool> AddtoCart(string username, Cart cart, string productName, int quantity)
        {
            try
            {
                
                var user = await _userManager.FindByNameAsync(username);
                string userId = user.Id;


                int productId = (from p in _db.Products
                                    where p.Name == productName
                                    select p.Id).FirstOrDefault();



                int cartId = cart.Id;

                Cart_Items productExistInCart = await _db.CartItems.FirstOrDefaultAsync(x => x.CartId == cartId && x.ProductId == productId);
                if(productExistInCart != null){
                    ++productExistInCart.Quantity;
                    _db.CartItems.Update(productExistInCart);
                    return true;
                }
                else{
                        Cart_Items ItemsInCart = new Cart_Items();
                        ItemsInCart.CartId = cartId;
                        ItemsInCart.Quantity = quantity;
                        ItemsInCart.ProductId = productId;
                        await _db.CartItems.AddAsync(ItemsInCart);
                        return true;
                }
            }
            catch (System.Exception)
            {
                
                return false;
            }



        }

      

        public async Task<bool> ChangeItemQuantity(string username, int productId, int quantity)
        {

            try
            {
                var user = await _userManager.FindByNameAsync(username);
            string userId = user.Id;
            Cart userOpenCart = await _db.Carts.FirstOrDefaultAsync(x => x.UserId == userId && x.Status =="open");
            int specificCartId = userOpenCart.Id;

            Cart_Items productInCart = await _db.CartItems.FirstOrDefaultAsync(x => x.CartId == specificCartId && x.ProductId == productId);
             productInCart.Quantity = quantity;
            var result =  _db.CartItems.Update(productInCart);
            if(result !=null) return true;
            }
            catch (System.Exception)
            {
                return false;
            }
            return false;


        }

        public async Task<Cart> OpenCart(string username)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(username);
                string userId = user.Id;

                Cart userOpenCart = await _db.Carts.FirstOrDefaultAsync(x => x.UserId == userId && x.Status =="open");

                if(userOpenCart == null)
                {
                    Cart c = new Cart();
                    c.OrderDate = DateTime.Now;
                    c.Status = "open";
                    c.UserId = userId;
                    await _db.Carts.AddAsync(c);
                    if(c != null) return c;
                }
            
            return userOpenCart;
            }
            catch (System.Exception)
            {
                
                return null;
            }
            
        }

        public async Task<bool> RemoveCart(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            string userId = user.Id;
            var cart = await _db.Carts.FirstOrDefaultAsync(x => x.UserId == userId && x.Status == "open");
             var result =_db.Carts.Remove(cart);
             if(result != null) return true;
             return false;
        }

        public async Task<bool> RemoveCartItems(string username, int productId)
        {
            var user = await _userManager.FindByNameAsync(username);
            string userId = user.Id;

            
            try
            {
                Cart userOpenCart = await _db.Carts.FirstOrDefaultAsync(x => x.UserId == userId && x.Status =="open");
                int specificCartId = userOpenCart.Id;
                var specificProductInCart = await _db.CartItems.FirstOrDefaultAsync(x => x.CartId == specificCartId && x.ProductId == productId );
                var result = _db.CartItems.Remove(specificProductInCart);
                if(result != null) return true;
            }
            catch (System.Exception)
            {
                
                return false;
            }
            return false;
            
            
            
            
        }

       

        public async Task<bool> SaveAll()
        {

            return await _db.SaveChangesAsync()>0;


        }
    }


}