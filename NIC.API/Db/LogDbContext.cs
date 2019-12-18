using Microsoft.EntityFrameworkCore;

namespace NIC.API.Db
{
    public class LogDbContext :DbContext
    {
        public LogDbContext(DbContextOptions<LogDbContext> options) :base(options)
        {
            
        }
    }
}