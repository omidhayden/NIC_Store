using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using NIC.API.Db;
using NIC.API.IRepository;
using NIC.API.Models;

namespace NIC.API.Repository
{
    public class AuthRepository : IAuthRepository
    {
        private readonly MyDbContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _config;

        public AuthRepository(MyDbContext context, UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration config)
        {
            _context = context;
            _userManager = userManager;
            _signInManager = signInManager;
            _config = config;
        }

          public async Task<bool> Register(User user, string password)
        {
            

            var createdUser = await _userManager.CreateAsync(user, password);
            
            if(createdUser.Succeeded)
            {
                return true;
            }
            return false;
            
        }


        public async Task<bool> EmailExist(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if(user == null) return false;
            return true;
            
        }

        public async Task<string> GetUserId(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            return user.Id;
            
        }

        public async Task<User> Login(string userNameEmail, string password)
        {
            var UsernameChecker = await _userManager.FindByNameAsync(userNameEmail);
            if(UsernameChecker != null)
            {
                var result = await _signInManager.CheckPasswordSignInAsync(UsernameChecker, password, false);
                if(result.Succeeded)
                {
                    return UsernameChecker;
                }
            }
            else
            {
                var EmailChecker = await _userManager.FindByEmailAsync(userNameEmail);
                if(EmailChecker != null) 
                {
                    var result = await _signInManager.CheckPasswordSignInAsync(EmailChecker, password, false);
                    if(result.Succeeded)
                    {
                        return EmailChecker;
                    }
                }
            }
            return null;


        }

    //     public static async Task<bool> CheckToken(string username)
    //     {
    //         var tokenHandler = new JwtSecurityTokenHandler();
    //         var validationParameters = this.GetValidationParameters();

    //         SecurityToken validatedToken;
    //         IPrincipal principal = tokenHandler.ValidateToken(authToken, validationParameters, out validatedToken);
    //         Thread.CurrentPrincipal = principal;
    //         HttpContext.Current.User = principal;
    //         return true;


    //     }
    //     private static TokenValidationParameters GetValidationParameters()
    // {
    //     return new TokenValidationParameters
    //     {
    //         IssuerSigningToken = new System.ServiceModel.Security.Tokens.BinarySecretSecurityToken(symmetricKey), //Key used for token generation
    //         ValidIssuer = issuerName,
    //         ValidAudience = allowedAudience,
    //         ValidateIssuerSigningKey = true,
    //         ValidateIssuer = true,
    //         ValidateAudience = true
    //     };
    // }

        

    }
    
}
