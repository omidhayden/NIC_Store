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
            // if( await _repo.EmailExist(UserForRegisterVM.Email) == true) return BadRequest("Email Exist!");
            var result = await _userManager.CreateAsync(userMap, UserForRegisterVM.Password);
            if(result.Succeeded) 
            {
                var userToReturn = _mapper.Map<UserToReturnViewModel>(userMap);
                return Ok(userToReturn);
            }
            return BadRequest(result.Errors);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody]UserForLoginViewModel UserForLoginVM)
        {

            var UsernameChecker = await _userManager.FindByNameAsync(UserForLoginVM.UserName);
            if(UsernameChecker != null)
            {
                var result = await _signInManager.CheckPasswordSignInAsync(UsernameChecker, UserForLoginVM.Password, false);
                if(result.Succeeded)
                {
                    var userToReturn = _mapper.Map<UserToReturnViewModel> (UsernameChecker);
                    return Ok(new {
                    token = GenerateJwtToken(UsernameChecker).Result,
                    user = userToReturn
                    });
                }
                return BadRequest("Wrong username or password");
            }
            else
            {
                var EmailChecker = await _userManager.FindByEmailAsync(UserForLoginVM.UserName);
                if(EmailChecker != null) 
                {
                    var result = await _signInManager.CheckPasswordSignInAsync(EmailChecker, UserForLoginVM.Password, false);
                    if(result.Succeeded)
                    {
                        var userToReturn = _mapper.Map<UserToReturnViewModel> (EmailChecker);
                        return Ok(new {
                            token = GenerateJwtToken(UsernameChecker).Result,
                            user = userToReturn
                        });
                    }
                    return BadRequest("Wrong email or password");
                }
            }

            return BadRequest("Wrong username or password");
            

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