using System.Threading.Tasks;
using NIC.API.Models;

namespace NIC.API.IRepository
{
    public interface IUserRepository
    {
         Task<User> GetUser(string id);
    }
}