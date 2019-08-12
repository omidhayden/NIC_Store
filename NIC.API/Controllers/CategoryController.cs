using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using NIC.API.Db;
using NIC.API.IRepository;
using NIC.API.Models;
using NIC.API.ViewModels;

namespace NIC.API.Controllers
{
    [ApiController]
    [Route("api/category")]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _repo;
        private readonly MyDbContext _db;
        private readonly IMapper _mapper;

        public CategoryController(ICategoryRepository repo, MyDbContext db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
            _repo = repo;

        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAll()
        {
            var categoryFromRepo = await _repo.GetAll();
            return Ok(categoryFromRepo);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
               var catFromRepo = await _repo.Get(id);
               if(catFromRepo != null) return Ok(catFromRepo);
               if(catFromRepo ==null )return BadRequest("Category not found");
               return BadRequest();
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add([FromBody]AddCategoryWithSubViewModel catWithSubVM)
        {
            var cToReturn = await _repo.Add(catWithSubVM.Name, catWithSubVM.SubCategoryName);
            await _repo.SaveAll();
            return Ok();
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Remove(int id)
        {

           var cat = await _repo.Get(id);
           if(cat == null ) return BadRequest("Category not found");
            _repo.delete(cat);
            if(await _repo.SaveAll()) return Ok();
            return BadRequest("Something wrong happened");
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id,[FromBody] CategoryForUpdateViewModel catName)
        {
            var cat = await _repo.Get(id);
            if(cat ==null) return BadRequest("Category not found");
            var catToMap = _mapper.Map(catName, cat);
            if(await _repo.SaveAll()) return Ok();
             return BadRequest("Something wrong happened");
        }



        [HttpPost("{categoryId}/add")]
        public async Task<IActionResult> AddSubCategory(int categoryId, [FromBody] AddSubCategoryViewModel addSubCatVM)
        {
            Category catFromRepo = await _repo.Get(categoryId);
            var subFromRepo =await _repo.AddSubCategory(catFromRepo.Id, addSubCatVM.Name);
            if(await _repo.SaveAll()) return Ok();

            return BadRequest();
        }

        [HttpDelete("{subCategoryId}")]
        public async Task<IActionResult> DeleteSubCategory(int subCategoryId)
        {
            var sub = await _repo.GetSub(subCategoryId);
            _repo.delete(sub);
            if(await _repo.SaveAll())  return Ok();
            return BadRequest();
        }

        [HttpGet("subs/all")]
        //for editing subs you need all the subs not only specific subs of the product
        public async Task<IActionResult> GetAllSubs()
        {
            var getSubs = await _repo.GetAllSubs();
            return Ok(getSubs);
        }
        
            
    }
}