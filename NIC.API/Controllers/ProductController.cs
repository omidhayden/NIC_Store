using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NIC.API.IRepository;
using NIC.API.Models;
using NIC.API.ViewModels;

namespace NIC.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _repo;
        private readonly IMapper _mapper;

        public ProductController(IProductRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpGet("all")]
        public async Task<IActionResult> GetProducts()
        {
            var getProducts = await _repo.GetProducts();
            var productToReturn =  _mapper.Map<IEnumerable<GetProductsViewModel>>(getProducts);
            return Ok(productToReturn);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Getproduct(int id)
        {

            var getProduct = await _repo.GetProduct(id);
            // var productToReturn = _mapper.Map<ProductToReturnViewModel>(getProduct);
            return Ok(getProduct);

        }

        [HttpPost("add")]
        [Authorize]
        public async Task<IActionResult> AddProduct([FromBody] AddProductViewModel addProductVM)
        {
           var mapFromBody =  _mapper.Map<Product>(addProductVM); 
           _repo.add(mapFromBody);
           await _repo.SaveAll();
            
           return CreatedAtAction(nameof(Getproduct),new {id = mapFromBody.Id}, addProductVM);
           
        }
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdateProduct(int id, ProductUpdateViewModel productUpdateVM)
        {
            Product productFromRepo = await _repo.GetProduct(id);
            if(productFromRepo == null) return BadRequest("Product not found!");

             var returnProduct = _mapper.Map(productUpdateVM, productFromRepo);
             if(await _repo.SaveAll()) return Ok(returnProduct);

                throw new Exception($"Updating user {id} failed on save");
        }

        

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _repo.GetProduct(id);
            _repo.delete(product);
            await _repo.SaveAll();
            return Ok();
        }

    }
}