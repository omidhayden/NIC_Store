using System.Threading.Tasks;
using NIC.API.Db;
using NIC.API.IRepository;
using NIC.API.Models;

namespace NIC.API.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly MyDbContext _db;

        public UserRepository(MyDbContext db)
        {
            _db = db;
        }
        public Task<User> GetUser(string id)
        {
            var user = _db.Users.FindAsync(id);
            return user;
        }
    }
}