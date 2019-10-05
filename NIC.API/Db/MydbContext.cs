using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NIC.API.Models;

namespace NIC.API.Db
{
    public class MyDbContext : IdentityDbContext<
    User, 
    Role,
    string,
    IdentityUserClaim<string>, 
    UserRole,
    IdentityUserLogin<string>, 
    IdentityRoleClaim<string>, 
    IdentityUserToken<string>>
    {

        public MyDbContext(DbContextOptions<MyDbContext> options) :base(options)
        {
            
        }

        
        public DbSet<Cart> Carts { get; set; }
        public DbSet<Cart_Items> CartItems { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }
        public DbSet<Product_SubCategory> Product_SubCategories  { get; set; }


        public DbSet<Photo> Photos { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            

            builder.Entity<Cart_Items>()
            .HasKey(k => new {k.CartId , k.ProductId});
            builder.Entity<Cart_Items>()
            .HasOne(f => f.Cart)
            .WithMany(d => d.CartItems)
            .HasForeignKey( f => f.CartId)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Cart_Items>()
            .HasOne(f=>f.Product)
            .WithMany(d => d.CartItems)
            .HasForeignKey( f=> f.ProductId);
           
            
            builder.Entity<Product_SubCategory>()
            .HasKey(k => new {k.ProductId, k.SubCategoryId});
            builder.Entity<Product_SubCategory>()
            .HasOne(f => f.SubCategory)
            .WithMany(d => d.ProductSubCategories)
            .HasForeignKey(f=> f.SubCategoryId);
            builder.Entity<Product_SubCategory>()
            .HasOne(f=> f.Product)
            .WithMany(d => d.ProductSubCategories)
            .HasForeignKey(f => f.ProductId);
            

            builder.Entity<UserRole>()
            .HasKey(k => new { k.RoleId, k.UserId});
            builder.Entity<UserRole>()
            .HasOne(f => f.Role)
            .WithMany(d => d.UserRoles)
            .HasForeignKey(f => f.RoleId);
            builder.Entity<UserRole>()
            .HasOne(f => f.User)
            .WithMany(d => d.UserRoles)
            .HasForeignKey(f => f.UserId);
            


        
        }
        

    }
}