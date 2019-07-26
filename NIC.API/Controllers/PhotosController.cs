using System;
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
        private readonly IProductRepository _repo;
        private readonly IMapper _mapper;
        private readonly PhotoSettings photoSettings;

        public PhotosController(IHostingEnvironment host, IProductRepository repo, IMapper mapper, IOptionsSnapshot<PhotoSettings> options)
        {
            photoSettings = options.Value;
            _host = host;
            _repo = repo;
            _mapper = mapper;
        }


        [HttpPost]
        public async Task<IActionResult> Upload(int productId, IFormFile file)
        {
            var product = await _repo.GetProduct(productId);
            if (product == null) return NotFound();


            if (file == null) return BadRequest("Null file");
            if (file.Length == 0) return BadRequest("Empty file");
            if (file.Length > photoSettings.MaxBytes) return BadRequest("Mx file size exceeded");
            if (!photoSettings.AcceptedFileTypes.Any(s => s == Path.GetExtension(file.FileName).ToLower())) return BadRequest("Invalid File Type");

            var uploadsFolderPath = Path.Combine(_host.WebRootPath, "uploads");
            if (!Directory.Exists(uploadsFolderPath))
                Directory.CreateDirectory(uploadsFolderPath);

            var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);

            var filePath = Path.Combine(uploadsFolderPath, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            var photo = new Photo
            {
                Url = fileName
            };
            product.Photos.Add(photo);
            await _repo.SaveAll();

            var photoToReturn = _mapper.Map<Photo, AddPhotoViewModel>(photo);
            return Ok(photoToReturn);



        }

    }
}