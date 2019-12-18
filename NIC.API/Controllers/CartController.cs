using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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
    [Route("api/users/{id}/cart")]
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
        public async Task<IActionResult> GetCartItems(string id)
        {
            try
            {
                if (id != User.FindFirst(ClaimTypes.NameIdentifier).Value) return Unauthorized("id and claim type not match with our records.");
            }
            catch (System.Exception)
            {

                return Unauthorized("Token seems to be wrong");
            }

            IEnumerable<Cart_Items> ItemsInCart = await _cartRepo.CartItems(id);

            if (ItemsInCart != null)
            {
                var cartToReturn = _mapper.Map<IList<CartItemsToReturnViewModel>>(ItemsInCart);

                return Ok(cartToReturn);
            }
            return BadRequest();


        }

        [HttpPost("add")]
        public async Task<IActionResult> AddToCart(string id, AddToCartViewModel addToCartVM)
        {

            try
            {
                if (id != User.FindFirst(ClaimTypes.NameIdentifier).Value) return Unauthorized("id and claim type not match with our records.");
            }
            catch (System.Exception)
            {
                return Unauthorized("Token is not match with our records");
            }
        //Kasendra 
        //collection id
        //local storage

            if (addToCartVM.Quantity == null)
            {
                addToCartVM.Quantity = 1;
            }
            Cart cart = await _cartRepo.OpenCart(id);
            if (cart == null) return BadRequest();

            bool AddedToCart = await _cartRepo.AddtoCart(id, cart, addToCartVM.ProductId, addToCartVM.Quantity);
            await _cartRepo.SaveAll();

            if (AddedToCart == false) return BadRequest();

            return Ok("{}");


        }
        [HttpDelete("remove")]
        public async Task<IActionResult> RemoveCart(string id)
        {
            try
            {
                if (id != User.FindFirst(ClaimTypes.NameIdentifier).Value) return Unauthorized("id and claim type not match with our records.");
            }
            catch (System.Exception)
            {

                return Unauthorized("Token seems to be wrong");
            }
            bool remove = await _cartRepo.RemoveCart(id);
            await _cartRepo.SaveAll();
            if (remove == true) return Ok("Cart deleted");
            return BadRequest();
        }

        [HttpDelete("remove/{productId}")]
        public async Task<IActionResult> RemoveItemInCart(string id, int productId)
        {
            try
            {
                if (id != User.FindFirst(ClaimTypes.NameIdentifier).Value) return Unauthorized("id and claim type not match with our records.");
            }
            catch (System.Exception)
            {

                return Unauthorized("Token seems to be wrong");
            }
            bool result = await _cartRepo.RemoveCartItems(id, productId);
            if (result == true)
            {
                await _cartRepo.SaveAll();
                return RedirectToAction(nameof(GetCartItems), new { id });
            }
            return Unauthorized();
        }

        [HttpPost("quantity")]
        public async Task<IActionResult> ChangeItemQuantity(string id, [FromBody] ChangeProductQuantityCartViewModel ChangeQuantityVM)
        {
            try
            {
                if (id != User.FindFirst(ClaimTypes.NameIdentifier).Value) return Unauthorized("id and claim type not match with our records.");
            }
            catch (System.Exception)
            {

                return Unauthorized("Token seems to be wrong");
            }
            // string userId = await _authRepo.GetUserId(username);
            // if (userId != User.FindFirst(ClaimTypes.NameIdentifier).Value) return Unauthorized();
            bool result = await _cartRepo.ChangeItemQuantity(id, ChangeQuantityVM.ProductId, ChangeQuantityVM.Quantity);
            if (result == true)
            {
                await _cartRepo.SaveAll();
                //Get cart
                return RedirectToAction(nameof(GetCartItems), new { id });
            }
            return Unauthorized();

        }



    }



}