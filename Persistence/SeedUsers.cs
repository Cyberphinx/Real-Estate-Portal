using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.AppUserAggregate;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class SeedUsers
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any()) 
            {
                var companyUsers = new List<AppUser>
                {
                    new AppUser{UserName = "movingmountains", Email = "moving@test.com"},
                    new AppUser{UserName = "pinkcleaners", Email = "clean@test.com"},
                    new AppUser{UserName = "handyman", Email = "handy@test.com"},
                };

                foreach (var companyOwner in companyUsers)
                {
                    await userManager.CreateAsync(companyOwner, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(companyOwner, "Company");
                }
                // no need to SaveChangesAsync, becasue CreateAsync already saves it to the database, so we don't need to separately save changes

                var customerUsers = new List<AppUser>
                {
                    new AppUser{UserName = "lily", Email = "lily@test.com"},
                    new AppUser{UserName = "jack", Email = "jack@test.com"},
                };

                foreach (var customer in customerUsers)
                {
                    await userManager.CreateAsync(customer, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(customer, "Customer");
                }
                // no need to SaveChangesAsync, becasue CreateAsync already saves it to the database, so we don't need to separately save changes

                var adminUser = new AppUser
                {
                    UserName = "admin",
                    Email = "admin@test.com"
                };

                await userManager.CreateAsync(adminUser, "Pa$$w0rd");
                await userManager.AddToRolesAsync(adminUser, new [] {"Company", "Customer", "Admin"});

                var agencyUsers = new List<AppUser>
                {
                    new AppUser{UserName = "savills", Email = "savills@test.com"},
                    new AppUser{UserName = "hunters", Email = "hunters@test.com"},
                    new AppUser{UserName = "rogerparry", Email = "rogerparry@test.com"},
                };

                foreach (var agent in agencyUsers)
                {
                    await userManager.CreateAsync(agent, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(agent, "Agency");
                }
            }
        }
    }
}