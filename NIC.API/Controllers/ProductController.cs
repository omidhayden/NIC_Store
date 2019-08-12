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
using NIC.API.ViewModels.getproducts;

namespace NIC.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _repo;
        private readonly IMapper _mapper;
        private readonly ICategoryRepository _sub;

        public ProductController(IProductRepository repo, IMapper mapper, ICategoryRepository sub)
        {
            _sub = sub;
            _repo = repo;
            _mapper = mapper;
        }
        [HttpGet("all")]
        public async Task<IActionResult> GetProducts()
        {
            var getProducts = await _repo.GetProducts();
            var productToReturn = _mapper.Map<IEnumerable<GetProductsViewModel>>(getProducts);
            return Ok(productToReturn);

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Getproduct(int id)
        {

            Product getProduct = await _repo.GetProduct(id);
             var firstMap = _mapper.Map<GetProductViewModel>(getProduct);
              //Attn: Check auto mapper area

            return Ok(firstMap);

        }

        [HttpPost("add")]
        // [Authorize]
        public async Task<IActionResult> AddProduct([FromBody] AddProductViewModel addProductVM)
        {
            Product mapFromBody = _mapper.Map<Product>(addProductVM);
            _repo.add(mapFromBody);


            AddSubCategoryToProductViewModel subForProductVM = new AddSubCategoryToProductViewModel();
            if(addProductVM.SubCategoryId != null){
                foreach (var item in addProductVM.SubCategoryId)
                {
                    subForProductVM.ProductId = mapFromBody.Id;
                    subForProductVM.SubCategoryId = item;

                    var mapFromSubCategory = _mapper.Map<Product_SubCategory>(subForProductVM);
                    _repo.add(mapFromSubCategory);
                }
            }
            


            await _repo.SaveAll();

            return CreatedAtAction(nameof(Getproduct), new { id = mapFromBody.Id }, addProductVM);

        }


        
        [HttpPut("{id}")]
        // [Authorize]
        public async Task<IActionResult> UpdateProduct(int id, ProductUpdateViewModel productUpdateVM)
        {
            Product productFromRepo = await _repo.GetProduct(id);
            if (productFromRepo == null) return BadRequest("Product not found!");
            var updatedProduct = _mapper.Map(productUpdateVM, productFromRepo);
            
            //productId
            //prodUpVM SubCategoryId
            IEnumerable<Product_SubCategory> removedSubs = await _repo.GetProductSubs(productFromRepo.Id);
            foreach (var item in removedSubs)
            {   
                _repo.delete(item);
            }
            UpdateSubCategoryToProductViewModel subForProductVM = new UpdateSubCategoryToProductViewModel();
            foreach (var item in productUpdateVM.SubCategoryId)
            {
                //_db.Product_SubCategory.get(int productId) //think about this
                subForProductVM.ProductId = productFromRepo.Id;
                subForProductVM.SubCategoryId = item;
                var mapFromSubCategory = _mapper.Map<Product_SubCategory>(subForProductVM);
                 _repo.add(mapFromSubCategory);
                //It works.it doesnt save!!! Check it porfabor
                

            }
            


            
            if (await _repo.SaveAll())
            {
                Product getProduct = await _repo.GetProduct(id);
             var firstMap = _mapper.Map<GetProductViewModel>(getProduct);
                return Ok(firstMap);
            }
            return BadRequest();
        }



        [HttpDelete("{id}")]
        // [Authorize]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _repo.GetProduct(id);
            _repo.delete(product);
            await _repo.SaveAll();
            return Ok();
        }



        //Sub category for specific product 
        //This Sub Category will only add separate produ

    }
}