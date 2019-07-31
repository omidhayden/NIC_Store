using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using NIC.API.Helpers;
using NIC.API.IRepository;
using NIC.API.Models;
using NIC.API.ViewModels;

namespace NIC.API.Controllers
{
    [Route("api/products/{productId}/photos")]
    public class PhotosController : ControllerBase
    {


        private readonly IHostingEnvironment _host;
        private readonly IProductRepository _productRepo;
        private readonly IMapper _mapper;
        private readonly PhotoSettings photoSettings;
        private readonly IPhotoRepository _photoRepo;


        public PhotosController(IPhotoRepository photoRepo, IHostingEnvironment host, IProductRepository productRepo, IMapper mapper, IOptionsSnapshot<PhotoSettings> options)
        {
            
            _photoRepo = photoRepo;
            photoSettings = options.Value;
            _host = host;
            _productRepo = productRepo;
            _mapper = mapper;
        }

            //We don't use this anymore
        [HttpGet]
        public async Task<IActionResult> GetPhotos(int productId)
        {
            IEnumerable<Photo> photos = await _photoRepo.GetPhotos(productId);
            
            var returnPhotos = _mapper.Map<IEnumerable<AddPhotoViewModel>>(photos);
            
            return Ok(returnPhotos);

        }




        [HttpPost]
        public async Task<IActionResult> Upload(int productId, IFormFile file)
        {
            var product = await _productRepo.GetProduct(productId);
            if (product == null) return NotFound();


            if (file == null) return BadRequest("Null file");
            if (file.Length == 0) return BadRequest("Empty file");
            if (file.Length > photoSettings.MaxBytes) return BadRequest("Mx file size exceeded");
            if (!photoSettings.AcceptedFileTypes.Any(s => s == Path.GetExtension(file.FileName).ToLower())) return BadRequest("Invalid File Type");
                var uploadsFolderPath = Path.Combine(_host.WebRootPath, "uploads");
            // var uploadsFolderPath = Path.Combine(_host.ContentRootPath, "../NIC-SPA","src","assets","products");
            //webrootpath
            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
          

            var filePath = Path.Combine(uploadsFolderPath, fileName);
            //var returnPath= Path.Combine(_host.WebRootPath, filePath);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }


            var photo = new Photo
            {
                Url = fileName
            };
            if(!product.Photos.Any(u => u.IsMain)) photo.IsMain = true;

            product.Photos.Add(photo);
            if(await _productRepo.SaveAll()) 
            {
                var photoToReturn = _mapper.Map<Photo, AddPhotoViewModel>(photo);
                return Ok(photoToReturn);
            }
            return BadRequest();

        }

        [HttpPatch("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int productId, int id)
        {   
            
            if( await _productRepo.GetProduct(productId) == null)
            {
                return BadRequest("Product not found.");
            }

            if(await _photoRepo.ProductPhotoExist(productId, id)== false)  return Unauthorized();
            var photoFromRepo = await _photoRepo.GetPhoto(id);
            if(photoFromRepo.IsMain) return BadRequest("This is already main photo");

            var currentMainPhoto = await _photoRepo.GetMainPhotoForProduct(productId);
            currentMainPhoto.IsMain = false;

            photoFromRepo.IsMain =true;

            if(await _productRepo.SaveAll())
            return NoContent();

            return BadRequest("Could not set Main photo!");
            


        }

    }
}