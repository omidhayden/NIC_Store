using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Principal;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using NIC.API.IRepository;
using NIC.API.Models;
using NIC.API.ViewModels;

namespace NIC.API.Controllers
{
    // [Authorize]
    [Route("api/users/{username}/cart")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepo;
        private readonly ICartRepository _cartRepo;
        private readonly IAuthRepository _authRepo;
        public CartController(IMapper mapper, IUserRepository userRepo, ICartRepository cartRepo, IAuthRepository authRepo)
        {
            _authRepo = authRepo;
            _cartRepo = cartRepo;
            _userRepo = userRepo;
            _mapper = mapper;

        }


        [HttpGet]
        public async Task<IActionResult> GetCartItems(string username)
        {
            IEnumerable<Cart_Items> ItemsInCart =await _cartRepo.CartItems(username);

            if(ItemsInCart != null) 
            {
                 var cartToReturn =  _mapper.Map<IList<CartItemsToReturnViewModel>>(ItemsInCart);

                return Ok(cartToReturn);
            }
            return Unauthorized();
           

        }

        [HttpPost("add")]
        public async Task<IActionResult> AddToCart(string username, [FromForm] AddToCartViewModel addToCartVM)
        {
            
            //Check userId with token before Getting user information
            //if(username != User.FindFirst(ClaimTypes.NameIdentifier).Value) return Unauthorized();

            

            Cart cart = await _cartRepo.OpenCart(username);
            if(cart == null) return BadRequest();

            bool AddedToCart = await _cartRepo.AddtoCart(username, cart, addToCartVM.ProductName, addToCartVM.Quantity);
            await _cartRepo.SaveAll();

            if (AddedToCart == false) return BadRequest();

            return StatusCode(200, "Your product added successfully");


        }
        [HttpDelete("remove")]
        public async Task<IActionResult> RemoveCart(string username)
        {
            bool remove = await _cartRepo.RemoveCart(username);
            await _cartRepo.SaveAll();
            if (remove == true) return Ok("Cart deleted");
            return BadRequest();
        }

        [HttpDelete("remove/{productId}")]
        public async Task<IActionResult> RemoveItemInCart(string username, int productId)
        {
            bool result = await _cartRepo.RemoveCartItems(username, productId);
            if (result == true)
            {
                await _cartRepo.SaveAll();
                 return RedirectToAction(nameof(GetCartItems),new {username});
            }
            return Unauthorized();
        }

        [HttpPut("quantity")]
        public async Task<IActionResult> ChangeItemQuantity(string username, [FromForm] ChangeProductQuantityCartViewModel ChangeQuantityVM)
        {
            // string userId = await _authRepo.GetUserId(username);
            // if (userId != User.FindFirst(ClaimTypes.NameIdentifier).Value) return Unauthorized();
            bool result = await _cartRepo.ChangeItemQuantity(username, ChangeQuantityVM.ProductId, ChangeQuantityVM.Quantity);
            if (result == true)
            {
                await _cartRepo.SaveAll();
                //Get cart
                return RedirectToAction(nameof(GetCartItems),new {username});
            }
            return Unauthorized();

        }



    }



}