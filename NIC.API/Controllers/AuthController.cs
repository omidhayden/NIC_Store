using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NIC.API.IRepository;
using NIC.API.Models;
using NIC.API.ViewModels;

namespace NIC.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _config;
        private readonly SignInManager<User> _signInManager;

        public AuthController(
            IAuthRepository repo, 
            IMapper mapper,  
            UserManager<User> userManager,
            IConfiguration config,
            SignInManager<User> signInManager)
        {

            _repo = repo;
            _mapper = mapper;
            _userManager = userManager;
            _config = config;
            _signInManager = signInManager;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserForRegisterViewModel UserForRegisterVM)
        {
            
            var userMap = _mapper.Map<User>(UserForRegisterVM);
            if( await _repo.EmailExist(UserForRegisterVM.Email) == true) return BadRequest("Email Exist!");
            var userFromRepo = await _repo.Register(userMap, UserForRegisterVM.Password);
            if(!userFromRepo == true) return StatusCode(400);
            var userToReturn = _mapper.Map<UserToReturnViewModel>(userMap);
            return Ok(userToReturn);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]UserForLoginViewModel UserForLoginVM)
        {
            var userFromRepo = await _repo.Login(UserForLoginVM.UserName, UserForLoginVM.Password);
            var userToReturn = _mapper.Map<UserToReturnViewModel> (userFromRepo);
            
            return Ok(new {
                token = GenerateJwtToken(userFromRepo).Result,
                user = userToReturn
            });

        }
        private async Task<string> GenerateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
            
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.UserName)

            };
            //Adding user roles to the token.
            var roles = await _userManager.GetRolesAsync(user); 
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8
                    .GetBytes(_config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}