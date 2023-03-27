using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;
using Domain.AppUserAggregate;
using Domain.JobAggregate;
using Domain.JobAggregate.Enums;
using Domain.JobAggregate.Objects;
using Domain.AppUserAggregate.Enums;
using Microsoft.AspNetCore.Identity;
using Domain;
using Domain.MediaAggregate;
using Domain.AppUserAggregate.Objects;

namespace Persistence
{
    public class SeedUsersAndJobs
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Jobs.Any())
            {
                // SEED COMPANY USERS
                var companyUsers = new List<AppUser>
                {
                    new AppUser{UserName = "handyman1", DisplayName = "Mr Handy", Email = "handy1@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "handyman2", DisplayName = "Handy Candy", Email = "handy2@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "handyman3", DisplayName = "Handyman Handyman", Email = "handy3@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "handyman4", DisplayName = "Handyman Company", Email = "handy4@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "handyman5", DisplayName = "Handyman Service", Email = "handy5@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "handyman6", DisplayName = "Repair Guys", Email = "handy6@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "cleaning1", DisplayName = "Ms Cleaner", Email = "cleaning1@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "cleaning2", DisplayName = "Ms Cleaning", Email = "cleaning2@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "cleaning3", DisplayName = "We Clean", Email = "cleaning3@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "cleaning4", DisplayName = "Blue Cleaners", Email = "cleaning4@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "cleaning5", DisplayName = "Clear Cleaners", Email = "cleaning5@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "cleaning6", DisplayName = "Sparkle Cleaners", Email = "cleaning6@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "electrician1", DisplayName = "Mr Electrician", Email = "elec1@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "electrician2", DisplayName = "Electrical Service", Email = "elec2@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "electrician3", DisplayName = "Electrician Group", Email = "elec3@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "electrician4", DisplayName = "Ms Electrician", Email = "elec4@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "electrician5", DisplayName = "Repair Electrics", Email = "elec5@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "electrician6", DisplayName = "Electricial Engineers", Email = "elec6@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "plumber1", DisplayName = "Mr Plumber", Email = "plumber1@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "plumber2", DisplayName = "Plumber Guys", Email = "plumber2@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "plumber3", DisplayName = "Plumbing Company", Email = "plumber3@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "plumber4", DisplayName = "Plumber Repairer", Email = "plumber4@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "plumber5", DisplayName = "Plumbing Service", Email = "plumber5@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "plumber6", DisplayName = "Plumbing Company", Email = "plumber6@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "garden1", DisplayName = "Mr Gardener", Email = "garden1@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "garden2", DisplayName = "Ms Gardener", Email = "garden2@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "garden3", DisplayName = "Gardener Group", Email = "garden3@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "garden4", DisplayName = "Landscape Gardener", Email = "garden4@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "garden5", DisplayName = "House Gardener", Email = "garden5@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                    new AppUser{UserName = "garden6", DisplayName = "Gardener Society", Email = "garden6@test.com", AddedOn = DateTime.UtcNow, Country = "United Kingdom", Language = "English", AccountType = AccountType.Company},
                };

                foreach (var companyOwner in companyUsers)
                {
                    await userManager.CreateAsync(companyOwner, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(companyOwner, "Company");
                }
                // no need to SaveChangesAsync, becasue CreateAsync already saves it to the database, so we don't need to separately save changes


                // SEED CUSTOMER USERS
                var customerUsers = new List<AppUser>
                {
                    new AppUser
                    {
                        UserName = "lily",
                        DisplayName = "Lily Cole",
                        Photos = new List<AppUserMedia>
                        {
                            new AppUserMedia
                            {
                                Id = "user_icon_001",
                                Index = 0,
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849710/Placeholder/UserIcons/Creative-Tail-Halloween-black-cat_do4mcd.svg",
                                IsMain = true,
                                Caption = "User profile picture",
                                Type = MediaType.Image
                            }
                        },
                        Email = "lily@test.com",
                        PhoneNumber = "07986787384",
                        AddedOn = DateTime.UtcNow,
                        Country = "United Kingdom",
                        Language = "English",
                        AccountType = AccountType.Customer
                    },
                    new AppUser
                    {
                        UserName = "Jack",
                        DisplayName = "Jack Sparrow",
                        Photos = new List<AppUserMedia>
                        {
                            new AppUserMedia
                            {
                                Id = "user_icon_002",
                                Index = 0,
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849710/Placeholder/UserIcons/Creative-Tail-Animal-tiger_amomuw.svg",
                                IsMain = true,
                                Caption = "User profile picture",
                                Type = MediaType.Image
                            }
                        },
                        Email = "jack@test.com",
                        PhoneNumber = "07907858697",
                        AddedOn = DateTime.UtcNow,
                        Country = "United Kingdom",
                        Language = "English",
                        AccountType = AccountType.Customer
                    },
                    new AppUser
                    {
                        UserName = "ruby",
                        DisplayName = "Ruby Smith",
                        Photos = new List<AppUserMedia>
                        {
                            new AppUserMedia
                            {
                                Id = "user_icon_003",
                                Index = 0,
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849707/Placeholder/UserIcons/Creative-Tail-Animal-panda_wk7fmn.svg",
                                IsMain = true,
                                Caption = "User profile picture",
                                Type = MediaType.Image
                            }
                        },
                        Email = "ruby@test.com",
                        PhoneNumber = "079876859604",
                        AddedOn = DateTime.UtcNow,
                        Country = "United Kingdom",
                        Language = "English",
                        AccountType = AccountType.Customer
                    },
                    new AppUser
                    {
                        UserName = "lucy",
                        DisplayName = "Lucy Reviere",
                        Photos = new List<AppUserMedia>
                        {
                            new AppUserMedia
                            {
                                Id = "user_icon_004",
                                Index = 0,
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849700/Placeholder/UserIcons/Creative-Tail-Animal-bear_ism3hi.svg",
                                IsMain = true,
                                Caption = "User profile picture",
                                Type = MediaType.Image
                            }
                        },
                        Email = "lucy@test.com",
                        PhoneNumber = "07983457384",
                        AddedOn = DateTime.UtcNow,
                        Country = "United Kingdom",
                        Language = "English",
                        AccountType = AccountType.Customer
                    },
                    new AppUser
                    {
                        UserName = "tom",
                        DisplayName = "Thomas Engine",
                        Photos = new List<AppUserMedia>
                        {
                            new AppUserMedia
                            {
                                Id = "user_icon_005",
                                Index = 0,
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849700/Placeholder/UserIcons/Creative-Tail-Animal-butterfly_t4bupb.svg",
                                IsMain = true,
                                Caption = "User profile picture",
                                Type = MediaType.Image
                            }
                        },
                        Email = "tom@test.com",
                        PhoneNumber = "07986456784",
                        AddedOn = DateTime.UtcNow,
                        Country = "United Kingdom",
                        Language = "English",
                        AccountType = AccountType.Customer
                    }
                };

                foreach (var customer in customerUsers)
                {
                    await userManager.CreateAsync(customer, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(customer, "Customer");
                }
                // no need to SaveChangesAsync, becasue CreateAsync already saves it to the database, so we don't need to separately save changes

                // SEED ESTATE AGENCY USERS
                var agencyUsers = new List<AppUser>
                {
                    new AppUser
                    {
                        UserName = "agent-one",
                        DisplayName = "Agent One",
                        Photos = new List<AppUserMedia>
                        {
                            new AppUserMedia
                            {
                                Id = "user_icon_006",
                                Index = 0,
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849711/Placeholder/UserIcons/Creative-Tail-Animal-zebra_ic3iuf.svg",
                                IsMain = true,
                                Caption = "User profile picture",
                                Type = MediaType.Image
                            }
                        },
                        Email = "agent-one@test.com",
                        PhoneNumber = "0207865733",
                        AddedOn = DateTime.UtcNow,
                        Country = "United Kingdom",
                        Language = "English",
                        AccountType = AccountType.Agent
                    },
                    new AppUser
                    {
                        UserName = "agent-two",
                        DisplayName = "Agent Two",
                        Photos = new List<AppUserMedia>
                        {
                            new AppUserMedia
                            {
                                Id = "user_icon_007",
                                Index = 0,
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849710/Placeholder/UserIcons/Creative-Tail-Animal-tiger_amomuw.svg",
                                IsMain = true,
                                Caption = "User profile picture",
                                Type = MediaType.Image
                            }
                        },
                        Email = "agent-two@test.com",
                        PhoneNumber = "0207864533",
                        AddedOn = DateTime.UtcNow,
                        Country = "United Kingdom",
                        Language = "English",
                        AccountType = AccountType.Agent
                    },
                    new AppUser
                    {
                        UserName = "agent-three",
                        DisplayName = "Agent Three",
                        Photos = new List<AppUserMedia>
                        {
                            new AppUserMedia
                            {
                                Id = "user_icon_008",
                                Index = 0,
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849709/Placeholder/UserIcons/Creative-Tail-Animal-star-fish_wj4sxg.svg",
                                IsMain = true,
                                Caption = "User profile picture",
                                Type = MediaType.Image
                            }
                        },
                        Email = "agent-three@test.com",
                        PhoneNumber = "0203455733",
                        AddedOn = DateTime.UtcNow,
                        Country = "United Kingdom",
                        Language = "English",
                        AccountType = AccountType.Agent
                    }
                };

                foreach (var agent in agencyUsers)
                {
                    await userManager.CreateAsync(agent, "Pa$$w0rd");
                    await userManager.AddToRoleAsync(agent, "Agency");
                }


                // SEED MOVING COMPANY USER
                var movingCompanyUser = new AppUser
                {
                    UserName = "moving",
                    DisplayName = "Moving Mountains",
                    Photos = new List<AppUserMedia>
                        {
                            new AppUserMedia
                            {
                                Id = "user_icon_011",
                                Index = 0,
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849711/Placeholder/UserIcons/Creative-Tail-Animal-wolf_cwibhv.svg",
                                IsMain = true,
                                Caption = "User profile picture",
                                Type = MediaType.Image
                            }
                        },
                    Email = "quintessa@tuta.io",
                    PhoneNumber = "00447592206803",
                    AddedOn = DateTime.UtcNow,
                    Country = "United Kingdom",
                    Language = "English",
                    AccountType = AccountType.Removalist
                };

                await userManager.CreateAsync(movingCompanyUser, "Pa$$w0rd");
                await userManager.AddToRolesAsync(movingCompanyUser, new[] { "Removalist" });


                // SEED MANAGER USERS
                var managerUsers = new List<AppUser>
                {
                    new AppUser
                    {
                        UserName = "archon",
                        DisplayName = "Archon",
                        Photos = new List<AppUserMedia>
                        {
                            new AppUserMedia
                            {
                                Id = "user_icon_012",
                                Index = 0,
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849708/Placeholder/UserIcons/Creative-Tail-Animal-penguin_p5een4.svg",
                                IsMain = true,
                                Caption = "User profile picture",
                                Type = MediaType.Image
                            }
                        },
                        Email = "archon@tuta.io",
                        AddedOn = DateTime.UtcNow,
                        Country = "United Kingdom",
                        Language = "English",
                        AccountType = AccountType.Manager
                    },
                    new AppUser
                    {
                        UserName = "manager",
                        DisplayName = "Sanctum Manager",
                        Photos = new List<AppUserMedia>
                        {
                            new AppUserMedia
                            {
                                Id = "user_icon_013",
                                Index = 0,
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849707/Placeholder/UserIcons/Creative-Tail-Animal-leopard_d1wrtj.svg",
                                IsMain = true,
                                Caption = "User profile picture",
                                Type = MediaType.Image
                            }
                        },
                        Email = "manager@test.com",
                        AddedOn = DateTime.UtcNow,
                        Country = "United Kingdom",
                        Language = "English",
                        AccountType = AccountType.Manager
                    },
                };

                foreach (var manager in managerUsers)
                {
                    await userManager.CreateAsync(manager, "Pa$$w0rd");
                    await userManager.AddToRolesAsync(manager, new[] { "Company", "Customer", "Manager" });
                }

                // SEED ADMIN USER
                var adminUser = new AppUser
                {
                    UserName = "sanctum",
                    DisplayName = "Sanctum Admin",
                        Photos = new List<AppUserMedia>
                        {
                            new AppUserMedia
                            {
                                Id = "user_icon_014",
                                Index = 0,
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1676849703/Placeholder/UserIcons/Creative-Tail-Animal-dinosaur_bobhxi.svg",
                                IsMain = true,
                                Caption = "User profile picture",
                                Type = MediaType.Image
                            }
                        },
                    Email = "info@sanctum.co.uk",
                    PhoneNumber = "00447592206803",
                    AddedOn = DateTime.UtcNow,
                    Country = "United Kingdom",
                    Language = "English",
                    AccountType = AccountType.Admin
                };

                await userManager.CreateAsync(adminUser, "Pa$$w0rd");
                await userManager.AddToRolesAsync(adminUser, new[] { "Company", "Customer", "Admin" });



                // SEED JOBS
                Random rnd = new Random();
                int month = rnd.Next(1, 13);  // creates a number between 1 and 12
                int day = rnd.Next(1, 30);  // creates a number between 1 and 30

                var jobs = new List<Job>
                {
                    new Job
                    {
                        AddedOn = DateTime.Today,
                        FinishBy = new DateTime(2023, month, day),
                        ServiceCategories = new List<string>
                        {
                            "Handyman"
                        },
                        Title = "Window draught repair and locks replaced",
                        Description = "A couple of windows require locks to be replaced (no key / other window keys don’t work) and one window has a draught and requires repair",
                        JobLifeCycle = JobLifeCycle.Open,
                        JobMedia = new List<JobMedia>
                        {
                            new JobMedia
                            {
                                Id = "jobmedia_001",
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670965880/Placeholder/Jobs/wood-splice-repair-sash-windows_pe7edt.jpg",
                                Type = MediaType.Image,
                                Caption = "Image One"
                            },
                            new JobMedia
                            {
                                Id = "jobmedia_002",
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670965880/Placeholder/Jobs/wood-splice-repairs-resin-sash-windows_pprskr.jpg",
                                Type = MediaType.Image,
                                Caption = "Image Two"
                            },
                            new JobMedia
                            {
                                Id = "jobmedia_003",
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670965880/Placeholder/Jobs/Frame-entirely-removed-and-rot-exposed-to-the-internal-lining_uptikm.jpg",
                                Type = MediaType.Image,
                                Caption = "Image Three"
                            },
                            new JobMedia
                            {
                                Id = "jobmedia_004",
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670965880/Placeholder/Jobs/wood-splice-repairs-primed-undercoated_avdl8c.jpg",
                                Type = MediaType.Image,
                                Caption = "Image Four"
                            }
                        },
                        JobLocations = new List<JobLocation>
                        {
                            new JobLocation
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
                            }
                        },
                        JobReference = "L3hGXyZadf",
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
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[3],
                                Role = JobNetworkRole.PaidCompany
                            }
                        }
                    },
                    new Job
                    {
                        AddedOn = DateTime.Today,
                        FinishBy = new DateTime(2023, month, day),
                        ServiceCategories = new List<string>
                        {
                            "Central Heating",
                            "Gas Work"
                        },
                        Title = "Boiler replacement and relocation",
                        Description = "Removal of boiler from upstairs bathroom and the replacement to be relocated (preferably to under the stairs). Looking for new boiler to have minimum 7 year guarantee and have hive thermostat installed at the same time (not a necessity).",
                        JobLifeCycle = JobLifeCycle.Open,
                        JobMedia = new List<JobMedia>
                        {
                            new JobMedia
                            {
                                Id = "jobmedia_005",
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670965634/Placeholder/Jobs/boiler-replacement-scaled_wjt1ac.jpg",
                                Type = MediaType.Image,
                                Caption = "Image One"
                            },
                            new JobMedia
                            {
                                Id = "jobmedia_006",
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670965634/Placeholder/Jobs/1666987215shutterstock_1211727466_gcj2ar.jpg",
                                Type = MediaType.Image,
                                Caption = "Image Two"
                            },
                            new JobMedia
                            {
                                Id = "jobmedia_007",
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670965634/Placeholder/Jobs/Boiler-cylinder_wn81jt.jpg",
                                Type = MediaType.Image,
                                Caption = "Image Three"
                            }
                        },
                        JobLocations = new List<JobLocation>
                        {
                            new JobLocation
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
                            }
                        },
                        JobReference = "L3herteadf",
                        Networks = new List<JobNetwork>
                        {
                            new JobNetwork
                            {
                                AppUser = customerUsers[4],
                                Role = JobNetworkRole.Customer
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[10],
                                Role = JobNetworkRole.InterestedCompany
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[11],
                                Role = JobNetworkRole.ShortlistedCompany
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[12],
                                Role = JobNetworkRole.PaidCompany
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[4],
                                Role = JobNetworkRole.PaidCompany
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[5],
                                Role = JobNetworkRole.InterestedCompany
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[6],
                                Role = JobNetworkRole.InterestedCompany
                            }
                        }
                    },
                    new Job
                    {
                        AddedOn = DateTime.Today,
                        FinishBy = new DateTime(2023, month, day),
                        ServiceCategories = new List<string>
                        {
                            "Bathroom Fitting",
                            "Electrical"
                        },
                        Title = "New bathroom extractor fan",
                        Description = "New Extractor Fan to be fitted to Bathroom & Connected to existing Vent Tile in Roof. Already have the fan, and there is already an existing fan, and electrics for it installed in loft.",
                        JobLifeCycle = JobLifeCycle.Open,
                        JobMedia = new List<JobMedia>
                        {
                            new JobMedia
                            {
                                Id = "jobmedia_008",
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670968362/Placeholder/Jobs/ceiling_hole_ytzjfn.jpg",
                                Type = MediaType.Image,
                                Caption = "Image One"
                            },
                            new JobMedia
                            {
                                Id = "jobmedia_009",
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670968362/Placeholder/Jobs/extractor_fan_connections_nbio3b.jpg",
                                Type = MediaType.Image,
                                Caption = "Image Two"
                            },
                            new JobMedia
                            {
                                Id = "jobmedia_010",
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670968362/Placeholder/Jobs/shower_extractor_fan_1_omhys6.jpg",
                                Type = MediaType.Image,
                                Caption = "Image Three"
                            },
                            new JobMedia
                            {
                                Id = "jobmedia_011",
                                Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1670968363/Placeholder/Jobs/triple-pole-fan-isolator_qctpu2.jpg",
                                Type = MediaType.Image,
                                Caption = "Image Four"
                            }
                        },
                        JobLocations = new List<JobLocation>
                        {
                            new JobLocation
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
                            }
                        },
                        JobReference = "GXyL3hZadf",
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
                                AppUser = companyUsers[8],
                                Role = JobNetworkRole.PaidCompany
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[13],
                                Role = JobNetworkRole.ShortlistedCompany
                            },
                            new JobNetwork
                            {
                                AppUser = companyUsers[14],
                                Role = JobNetworkRole.InterestedCompany
                            }
                        }
                    },
                    new Job
                    {
                        AddedOn = DateTime.Today,
                        FinishBy = new DateTime(2023, month, day),
                        ServiceCategories = new List<string>
                        {
                            "Removals"
                        },
                        Title = "Relocation from Edinburgh EH6 8TB to Liverpool M32 0EW",
                        Description = "Aenean finibus massa eu leo lacinia, ac ullamcorper libero commodo. Aenean id accumsan felis. Phasellus vitae viverra sapien. Cras eleifend nunc et lorem efficitur, ac efficitur elit imperdiet. Sed nec fermentum purus. Suspendisse potenti. Vestibulum condimentum, felis mattis aliquet pulvinar, massa quam euismod neque, sit amet luctus magna tortor ut enim. Phasellus sed porta sapien. Curabitur quis mollis est. Suspendisse id elementum sem, ut varius ex. Curabitur accumsan bibendum nisi quis lacinia.",
                        JobLifeCycle = JobLifeCycle.Open,
                        JobLocations = new List<JobLocation>
                        {
                            new JobLocation
                            {
                                DisplayAddress = "6, Gordon Street, Leith Links, City of Edinburgh, Scotland, EH6 8TB",
                                AddressType = "Pick up address",
                                Index = 0,
                                PropertyNumberOrName = "6",
                                StreetName = "Gordon Street",
                                Locality = "Leith Links",
                                TownOrCity = "City of Edinburgh",
                                County = "Scotland",
                                PostalCode = "EH6 8TB",
                                Country = "United Kingdom",
                                Latitude = 53.51009443733918,
                                Longitude = -2.3425652500267837
                            },
                            new JobLocation
                            {
                                DisplayAddress = "2-30, Everton St, Swinton, Liverpool, England, M32 0EW",
                                AddressType = "Drop off address",
                                Index = 1,
                                PropertyNumberOrName = "2-30",
                                StreetName = "Everton St",
                                Locality = "Swinton",
                                TownOrCity = "Liverpool",
                                County = "England",
                                PostalCode = "M32 0EW",
                                Country = "United Kingdom",
                                Latitude = 52.51009443733918,
                                Longitude = -1.3425652500267837
                            }
                        },
                        JobReference = "sdrg54yZadf",
                        Networks = new List<JobNetwork>
                        {
                            new JobNetwork
                            {
                                AppUser = customerUsers[3],
                                Role = JobNetworkRole.Customer
                            },
                            new JobNetwork
                            {
                                AppUser = movingCompanyUser,
                                Role = JobNetworkRole.PaidCompany
                            }
                        }
                    },
                    new Job
                    {
                        AddedOn = DateTime.Today,
                        FinishBy = new DateTime(2023, month, day),
                        ServiceCategories = new List<string>
                        {
                            "Removals"
                        },
                        Title = "Relocation from Liverpool L25 8QA to Bristol BS1 0EW",
                        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus dictum, massa sed tristique aliquam, augue erat mollis urna, in mollis eros tellus sit amet eros. Fusce lectus libero, malesuada id pellentesque nec, tempor at purus. Quisque diam nisi, suscipit in vehicula sit amet, sodales pellentesque lectus. Duis a auctor eros. Nullam ex nunc, ultrices nec mi vel, vulputate porttitor turpis. Phasellus tristique urna et ex fermentum, in dapibus massa dignissim. Suspendisse rutrum ut nulla non auctor. Cras ultricies, nunc ut dapibus pharetra, dolor leo elementum est, sit amet egestas ligula libero eu nibh. Maecenas finibus facilisis tincidunt.",
                        JobLifeCycle = JobLifeCycle.Open,
                        JobLocations = new List<JobLocation>
                        {
                            new JobLocation
                            {
                                DisplayAddress = "8 Speke Road, Woolton, Liverpool, England, L25 8QA",
                                AddressType = "Pick up address",
                                Index = 0,
                                PropertyNumberOrName = "8",
                                StreetName = "Speke Road",
                                Locality = "Woolton",
                                TownOrCity = "Liverpool",
                                County = "England",
                                PostalCode = "M27 0WL",
                                Country = "United Kingdom",
                                Latitude = 53.51009443733918,
                                Longitude = -2.3425652500267837
                            },
                            new JobLocation
                            {
                                AddressType = "Drop off address",
                                Index = 1,
                                PropertyNumberOrName = "2-30",
                                StreetName = "Everton St",
                                Locality = "Swinton",
                                TownOrCity = "Bristol",
                                County = "England",
                                PostalCode = "BS1 0EW",
                                Country = "United Kingdom",
                                Latitude = 52.51009443733918,
                                Longitude = -1.3425652500267837
                            }
                        },
                        JobReference = "134GXyZadf",
                        Networks = new List<JobNetwork>
                        {
                            new JobNetwork
                            {
                                AppUser = customerUsers[1],
                                Role = JobNetworkRole.Customer
                            },
                            new JobNetwork
                            {
                                AppUser = movingCompanyUser,
                                Role = JobNetworkRole.PaidCompany
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