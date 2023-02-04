using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;
using Domain.AppUserAggregate;
using Domain.JobAggregate;
using Domain.JobAggregate.Enums;
using Domain.JobAggregate.Objects;
using Domain.LocationAggregate;
using Domain.AppUserAggregate.Enums;
using Microsoft.AspNetCore.Identity;
using Domain;
using Domain.MediaAggregate;

namespace Persistence
{
    public class SeedUsersAndJobs
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Jobs.Any())
            {
                var companyUsers = new List<AppUser>
                {
                    new AppUser{UserName = "handyman1", Email = "handy1@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "handyman2", Email = "handy2@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "handyman3", Email = "handy3@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "handyman4", Email = "handy4@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "handyman5", Email = "handy5@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "handyman6", Email = "handy6@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "moving1", Email = "move1@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "moving2", Email = "move2@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "moving3", Email = "move3@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "moving4", Email = "move4@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "moving5", Email = "move5@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "moving6", Email = "move6@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "cleaning1", Email = "cleaning1@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "cleaning2", Email = "cleaning2@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "cleaning3", Email = "cleaning3@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "cleaning4", Email = "cleaning4@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "cleaning5", Email = "cleaning5@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "cleaning6", Email = "cleaning6@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "electrician1", Email = "elec1@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "electrician2", Email = "elec2@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "electrician3", Email = "elec3@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "electrician4", Email = "elec4@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "electrician5", Email = "elec5@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "electrician6", Email = "elec6@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "plumber1", Email = "plumber1@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "plumber2", Email = "plumber2@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "plumber3", Email = "plumber3@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "plumber4", Email = "plumber4@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "plumber5", Email = "plumber5@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "plumber6", Email = "plumber6@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "architect1", Email = "architect1@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "architect2", Email = "architect2@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "architect3", Email = "architect3@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "architect4", Email = "architect4@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "architect5", Email = "architect5@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                    new AppUser{UserName = "architect6", Email = "architect6@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Company},
                };

                foreach (var companyOwner in companyUsers)
                {
                    await userManager.CreateAsync(companyOwner, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(companyOwner, "Company");
                }
                // no need to SaveChangesAsync, becasue CreateAsync already saves it to the database, so we don't need to separately save changes

                var customerUsers = new List<AppUser>
                {
                    new AppUser{UserName = "lily", Email = "lily@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Customer},
                    new AppUser{UserName = "Jack", Email = "jack@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Customer},
                    new AppUser{UserName = "ruby", Email = "ruby@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Customer},
                    new AppUser{UserName = "lucy", Email = "lucy@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Customer},
                    new AppUser{UserName = "tom", Email = "tom@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Customer}
                };

                foreach (var customer in customerUsers)
                {
                    await userManager.CreateAsync(customer, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(customer, "Customer");
                }
                // no need to SaveChangesAsync, becasue CreateAsync already saves it to the database, so we don't need to separately save changes

                var adminUser = new AppUser
                {
                    UserName = "sanctum",
                    Email = "info@sanctum.co.uk"
                };

                await userManager.CreateAsync(adminUser, "Pa$$w0rd");
                await userManager.AddToRolesAsync(adminUser, new[] { "Company", "Customer", "Admin" });

                var agencyUsers = new List<AppUser>
                {
                    new AppUser{UserName = "agentne", Email = "savills@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Agent},
                    new AppUser{UserName = "hunters", Email = "hunters@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Agent},
                    new AppUser{UserName = "RogerParry", Email = "rogerparry@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Agent},
                    new AppUser{UserName = "Purple", Email = "purple@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Agent},
                    new AppUser{UserName = "Ewe", Email = "ewe@test.com", AddedOn = DateTime.Now, Country = "United Kingdom", Language = Language.English, AccountType = AccountType.Agent},
                };

                foreach (var agent in agencyUsers)
                {
                    await userManager.CreateAsync(agent, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(agent, "Agency");
                }


                Random rnd = new Random();
                int month = rnd.Next(1, 13);  // creates a number between 1 and 12
                int day = rnd.Next(1, 30);  // creates a number between 1 and 30

                var jobs = new List<Job>
                {
                    new Job
                    {
                        AddedOn = DateTime.Today,
                        FinishBy = new DateTime(2022, month, day),
                        ServiceCategories = new List<ServiceCategory>
                        {
                            ServiceCategory.Handyman
                        },
                        Title = "Window draught repair and locks replaced",
                        Description = "A couple of windows require locks to be replaced (no key / other window keys don’t work) and one window has a draught and requires repair",
                        JobLifeCycle = JobLifeCycle.Open,
                        JobMedia = new List<JobMedia>
                        {
                            new JobMedia
                            {
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670965880/Placeholder/Jobs/wood-splice-repair-sash-windows_pe7edt.jpg",
                                Type = MediaType.Image,
                                Caption = "Image One"
                            },
                            new JobMedia
                            {
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670965880/Placeholder/Jobs/wood-splice-repairs-resin-sash-windows_pprskr.jpg",
                                Type = MediaType.Image,
                                Caption = "Image Two"
                            },
                            new JobMedia
                            {
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670965880/Placeholder/Jobs/Frame-entirely-removed-and-rot-exposed-to-the-internal-lining_uptikm.jpg",
                                Type = MediaType.Image,
                                Caption = "Image Three"
                            },
                            new JobMedia
                            {
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670965880/Placeholder/Jobs/wood-splice-repairs-primed-undercoated_avdl8c.jpg",
                                Type = MediaType.Image,
                                Caption = "Image Four"
                            }
                        },
                        JobLocation = new JobLocation
                        {
                            PropertyNumberOrName = "2-30",
                            StreetName = "Everton St",
                            Locality = "Swinton",
                            TownOrCity = "Manchester",
                            County = "England",
                            PostalCode = "M27 0WL",
                            Country = "United Kingdom",
                            Latitude = 53.51009443733918,
                            Longitude = -2.3425652500267837,
                        },
                        Networks = new List<JobNetwork>
                        {
                            new JobNetwork
                            {
                                AppUser = customerUsers[0],
                                Role = JobNetworkRole.Customer
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[0],
                                Role = JobNetworkRole.InterestedCompany
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[1],
                                Role = JobNetworkRole.InterestedCompany
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[2],
                                Role = JobNetworkRole.InterestedCompany
                            }
                        }
                    },
                    new Job
                    {
                        AddedOn = DateTime.Today,
                        FinishBy = new DateTime(2022, month, day),
                        ServiceCategories = new List<ServiceCategory>
                        {
                            ServiceCategory.CentralHeating,
                            ServiceCategory.GasWork
                        },
                        Title = "Boiler replacement and relocation",
                        Description = "Removal of boiler from upstairs bathroom and the replacement to be relocated (preferably to under the stairs). Looking for new boiler to have minimum 7 year guarantee and have hive thermostat installed at the same time (not a necessity).",
                        JobLifeCycle = JobLifeCycle.Open,
                        JobMedia = new List<JobMedia>
                        {
                            new JobMedia
                            {
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670965634/Placeholder/Jobs/boiler-replacement-scaled_wjt1ac.jpg",
                                Type = MediaType.Image,
                                Caption = "Image One"
                            },
                            new JobMedia
                            {
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670965634/Placeholder/Jobs/1666987215shutterstock_1211727466_gcj2ar.jpg",
                                Type = MediaType.Image,
                                Caption = "Image Two"
                            },
                            new JobMedia
                            {
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670965634/Placeholder/Jobs/Boiler-cylinder_wn81jt.jpg",
                                Type = MediaType.Image,
                                Caption = "Image Three"
                            }
                        },
                        JobLocation = new JobLocation
                        {
                            PropertyNumberOrName = "145",
                            StreetName = "Chatsworth Road",
                            Locality = "Lower Clapton",
                            TownOrCity = "London",
                            County = "England",
                            PostalCode = "E5 0LA",
                            Country = "United Kingdom",
                            Latitude = 51.5573059904951, 
                            Longitude = -0.046689965146428675
                        },
                        Networks = new List<JobNetwork>
                        {
                            new JobNetwork
                            {
                                AppUser = customerUsers[4],
                                Role = JobNetworkRole.Customer
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[25],
                                Role = JobNetworkRole.InterestedCompany
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[26],
                                Role = JobNetworkRole.ShortlistedCompany
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[27],
                                Role = JobNetworkRole.ShortlistedCompany
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[28],
                                Role = JobNetworkRole.InterestedCompany
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[29],
                                Role = JobNetworkRole.InterestedCompany
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[30],
                                Role = JobNetworkRole.InterestedCompany
                            }
                        }
                    },
                    new Job
                    {
                        AddedOn = DateTime.Today,
                        FinishBy = new DateTime(2022, month, day),
                        ServiceCategories = new List<ServiceCategory>
                        {
                            ServiceCategory.BathroomFitting,
                            ServiceCategory.Electrical
                        },
                        Title = "New bathroom extractor fan",
                        Description = "New Extractor Fan to be fitted to Bathroom & Connected to existing Vent Tile in Roof. Already have the fan, and there is already an existing fan, and electrics for it installed in loft.",
                        JobLifeCycle = JobLifeCycle.Open,
                        JobMedia = new List<JobMedia>
                        {
                            new JobMedia
                            {
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670968362/Placeholder/Jobs/ceiling_hole_ytzjfn.jpg",
                                Type = MediaType.Image,
                                Caption = "Image One"
                            },
                            new JobMedia
                            {
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670968362/Placeholder/Jobs/extractor_fan_connections_nbio3b.jpg",
                                Type = MediaType.Image,
                                Caption = "Image Two"
                            },
                            new JobMedia
                            {
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670968362/Placeholder/Jobs/shower_extractor_fan_1_omhys6.jpg",
                                Type = MediaType.Image,
                                Caption = "Image Three"
                            },
                            new JobMedia
                            {
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670968363/Placeholder/Jobs/triple-pole-fan-isolator_qctpu2.jpg",
                                Type = MediaType.Image,
                                Caption = "Image Four"
                            }
                        },
                        JobLocation = new JobLocation
                        {
                            PropertyNumberOrName = "2-30",
                            StreetName = "Everton St",
                            Locality = "Swinton",
                            TownOrCity = "Manchester",
                            County = "England",
                            PostalCode = "M27 0WL",
                            Country = "United Kingdom",
                            Latitude = 53.51009443733918,
                            Longitude = -2.3425652500267837
                        },
                        Networks = new List<JobNetwork>
                        {
                            new JobNetwork
                            {
                                AppUser = customerUsers[3],
                                Role = JobNetworkRole.Customer
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[19],
                                Role = JobNetworkRole.InterestedCompany
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[20],
                                Role = JobNetworkRole.ShortlistedCompany
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[21],                                
                                Role = JobNetworkRole.ShortlistedCompany
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[22],                                
                                Role = JobNetworkRole.InterestedCompany
                            }
                        }
                    },
                };

                await context.Jobs.AddRangeAsync(jobs);
                await context.SaveChangesAsync();
            }
        }
    }
}