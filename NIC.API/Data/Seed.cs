using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;
using NIC.API.Db;
using NIC.API.Models;

namespace NIC.API.Data
{
    public class Seed
    {
       
        public static void SeedUsers(UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            if(!userManager.Users.Any()){

                #region Create roles

                var roles = new List<Role>
                {
                    new Role {Name="Member"},
                    new Role {Name="Admin"},
                    new Role {Name="Inventory Manager"}
                };

                foreach (var role in roles)
                {
                    roleManager.CreateAsync(role).Wait();
                    
                }
                #endregion


                #region Create users from json file

                var userData = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userData);

                foreach (var user in users)
                {
                    userManager.CreateAsync(user, "password").Wait();
                    userManager.AddToRoleAsync(user, "Member").Wait();
                }

                #endregion



                #region Create Admin
                //Creating admin
                var adminUser = new User
                {
                    UserName = "admin",
                    Email = "admin@nic.com"
                };
                var result = userManager.CreateAsync(adminUser, "isfahan").Result;

                if(result.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("admin").Result;
                    userManager.AddToRolesAsync(admin, new[]{"Admin", "Inventory Manager"}).Wait();

                }
                #endregion

                #region Create Inventory Manager
                //Creating admin
                var InventoryUser = new User
                {
                    UserName = "inventory",
                    Email = "In@nic.com"
                };
                var result1 = userManager.CreateAsync(InventoryUser, "isfahan").Result;

                if(result1.Succeeded)
                {
                    var inventory = userManager.FindByNameAsync("inventory").Result;
                    userManager.AddToRolesAsync(inventory, new[]{"Inventory Manager"}).Wait();

                }
                #endregion


            }
        }

        public static void SeedProducts(MyDbContext context)
        {

            if(!context.Products.Any())
            {
                var productsData = System.IO.File.ReadAllText("Data/ProductSeedData.json");
                var products = JsonConvert.DeserializeObject<List<Product>>(productsData);
                foreach (var product in products)
                {
                    context.Products.Add(product);
                }

                context.SaveChanges();
            }
        }

    }
}