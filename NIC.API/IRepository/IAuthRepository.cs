using System.Threading.Tasks;
using NIC.API.Models;

namespace NIC.API.IRepository
{
    public interface IAuthRepository
    {
        Task<bool> Register (User user, string password);
        Task<User> Login (string userNameEmail, string password);
        // Task<bool> CheckToken (string username);
        Task<string> GetUserId(string username);
        Task<bool> EmailExist(string email);
      

        

    }
}