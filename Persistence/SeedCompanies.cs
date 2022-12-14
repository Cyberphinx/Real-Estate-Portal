using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.CompanyAggregate;
using Domain.CompanyAggregate.Enums;
using Domain.LocationAggregate;

namespace Persistence
{
    public class SeedCompanies
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Companies.Any()) return;

            var companies = new List<Company>
            {
                new Company
                {
                    AccessStatus = AccessStatus.Public,
                    Username = "savills",
                    CompanyReference = "savills",
                    DisplayName = "Savills",
                    LegalName = "Savills (UK) Limited",
                    CompanyContacts = new CompanyContacts
                    {
                        Phone = "+44 (0) 20 8877 1222",
                        Email = "info@savills.com"
                    },
                    CompanyAddress = new CompanyAddress
                    {
                        PropertyNumberOrName = "33",
                        StreetName = "Margaret Street",
                        Locality = "",
                        TownOrCity = "London",
                        County = "City of London",
                        PostalCode = "W1G 0JD",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 51.51654265291029,
                            Longitude = -0.14291257284437422
                        },
                        What3words = "remark.taps.trails"
                    },
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.EstateAgent
                    }
                },

                new Company
                {
                    Username = "purple",
                    CompanyReference = "purplebricks",
                    DisplayName = "Purple Bricks",
                    LegalName = "Purplebricks Group PLC",
                    CompanyRegistrationNumber = "8047368",
                    CompanyContacts = new CompanyContacts
                    {
                        Phone = "+44 (0) 117 910 2200",
                        Email = "info@purple.com"
                    },
                    AccessStatus = AccessStatus.Public,
                    CompanyAddress = new CompanyAddress
                    {
                        PropertyNumberOrName = "Suite 7 Cranmore Place",
                        StreetName = "Cranmore Drive Shirley",
                        Locality = "",
                        TownOrCity = "Solihull",
                        County = "West Midlands",
                        PostalCode = "B90 4RZ",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 52.40066044491819,
                            Longitude = -1.8066908304837104
                        },
                        What3words = "drain.spirit.drives"
                    },
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.EstateAgent
                    }
                },
                new Company
                {
                    AccessStatus = AccessStatus.Public,
                    CompanyAddress = new CompanyAddress
                    {
                        PropertyNumberOrName = "Hogstow Hall",
                        StreetName = "Minsterley",
                        Locality = "",
                        TownOrCity = "Shrewsbury",
                        County = "Shropshire",
                        PostalCode = "SY5 0HZ",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 52.60740391205163,
                            Longitude = -2.9450937943182147
                        },
                        What3words = "bypassed.magnetic.reserves"
                    },
                    CompanyContacts = new CompanyContacts
                    {
                        Phone = "01938 554499",
                        Email = "info@rogerparry.com",
                        Website = "https://www.rogerparry.net/"
                    },
                    CompanyReference = "rogerparry",
                    CompanyRegistrationNumber = "OC312203",
                    DisplayName = "Roger Parry",
                    LegalName = "Roger Parry & Partners LLP",
                    Username ="rogerparry",
                    SummaryDescription = "",
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.EstateAgent
                    }
                },
                new Company
                {
                    Username = "ewe",
                    CompanyReference = "ewemove",
                    DisplayName = "Ewe move Hebden Bridge and Sowerby",
                    LegalName = "Caine-Knight Property Limited",
                    CompanyRegistrationNumber = "11470075",
                    CompanyContacts = new CompanyContacts
                    {
                        Phone = "020 3953 8023",
                        Email = "info@ewemove.com"
                    },
                    AccessStatus = AccessStatus.Public,
                    CompanyAddress = new CompanyAddress
                    {
                        PropertyNumberOrName = "2 St Stephen's Court",
                        StreetName = "St. Stephens Road",
                        Locality = "",
                        TownOrCity = " Bournemouth",
                        County = "England",
                        PostalCode = "BH2 6LA",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 50.722980159789316,
                            Longitude = -1.8829559728734109
                        },
                        What3words = "bypassed.magnetic.reserves"
                    },
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.EstateAgent
                    }
                },
                new Company
                {
                    Username = "hunters",
                    CompanyReference = "hunters",
                    DisplayName = "Hunters",
                    LegalName = "Hunters (Midlands) Limited",
                    CompanyContacts = new CompanyContacts
                    {
                        Phone = "+44 (0) 1564 770707",
                        Email = "sales@hunters.com"
                    },
                    AccessStatus = AccessStatus.Public,
                    CompanyAddress = new CompanyAddress
                    {
                        PropertyNumberOrName = "2 St Stephens Court",
                        StreetName = "St. Stephens Road",
                        Locality = "",
                        TownOrCity = "Bournemouth",
                        County = "England",
                        PostalCode = "BH2 6LA",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 50.72308467556089,
                            Longitude =  -1.8824440593814602
                        },
                        What3words = "remark.taps.trails"
                    },
                    CompanyRegistrationNumber = "",
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.EstateAgent
                    }
                },
                new Company
                {
                    DisplayName = "Moving Mountains",
                    LegalName = "Moving Mountains Limited",
                    CompanyReference = "movingmountains",
                    Username = "movingmountains",
                    AddedOn = new DateTime(2022,07,15),
                    AccessStatus = AccessStatus.Public,
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.Removals
                    },
                    CompanyAddress = new CompanyAddress
                    {
                        PropertyNumberOrName = "53",
                        StreetName = "Malden Hill Gardens",
                        Locality = "",
                        TownOrCity = "New Malden",
                        County = "England",
                        PostalCode = "KT3 4HX",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 51.40264956734864,
                            Longitude = -0.24979083392406543
                        },
                        What3words = "cloth.august.length"
                    },
                    CompanyContacts = new CompanyContacts
                    {
                        Phone = "020 3488 2208",
                        Email = "info@wemovemountains.co.uk"
                    },
                    SummaryDescription = "International House and Office Removal and Clearance Services based in London. Eco friendly and competitive approach to all customers.",
                    CompanyDescriptions = new List<CompanyDescription>
                    {
                        new CompanyDescription
                        {
                            Heading = "Who we are",
                            Text = "We are a removal company with over 10 years of experience and expertise. We position ourselves as environmentally friendly company. We reuse and recycle as much as possible to save real mountains on this planet, not to create the landfill ones.",
                        }
                    },
                    ServiceLocations = "UK and international",
                    CompanyContents = new List<CompanyContent>
                    {
                        new CompanyContent
                        {
                            Url = "/assets/company-images/001.JPG",
                            Type = CompanyMediaType.Image,
                            Caption = "Image One"
                        },
                        new CompanyContent
                        {
                            Url = "/assets/company-images/002.JPG",
                            Type = CompanyMediaType.Image,
                            Caption = "Image Two"
                        },
                        new CompanyContent
                        {
                            Url = "/assets/company-images/003.JPG",
                            Type = CompanyMediaType.Image,
                            Caption = "Image Three"
                        }
                    },
                    Insurances = new List<Insurance>
                    {
                        new Insurance
                        {
                            Type = InsuranceType.ProfessionalIndemnity,
                            Provider = "AXA",
                            IndemnityLimit = "50,000",
                            Expiry = new DateTime(2023,01,30)
                        },
                        new Insurance
                        {
                            Type = InsuranceType.PublicLiability,
                            Provider = "Allianz",
                            IndemnityLimit = "1,000,000",
                            Expiry = new DateTime(2025,01,05)
                        }
                    }
                },

                new Company
                {
                    AccessStatus = AccessStatus.Public,
                    DisplayName = "CAE Electrical",
                    LegalName = "CAE Electrical",
                    CompanyReference = "cae",
                    Username = "electrician1",
                    AddedOn = new DateTime(2022,03,15),
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.Electrical,
                        ServiceCategory.GasWork
                    },
                    CompanyAddress = new CompanyAddress
                    {
                        PropertyNumberOrName = "Suite 3 Warren House",
                        StreetName = "10-20 Main Road",
                        Locality = "Hockley",
                        TownOrCity = "Essex",
                        County = "England",
                        PostalCode = "SS5 4QS",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 51.60137056764931,
                            Longitude = 0.6534702269086803
                        },
                        What3words = "searching.volunteered.milder"
                    },
                    CompanyContacts = new CompanyContacts
                    {
                        Phone = "020 3488 2208",
                        Email = "info@cae.co.uk"
                    },
                    SummaryDescription = "CAE Electrical Services has been established since 2007 and is a Shrewsbury based company with serves Shropshire and the surrounding areas for all of your electrical needs.",
                    CompanyDescriptions = new List<CompanyDescription>
                    {
                        new CompanyDescription
                        {
                            Heading = "Who we are",
                            Text = "CAE Electrical Services has been established since 2007 and is a Shrewsbury based company with serves Shropshire and the surrounding areas for all of your electrical needs.",
                        }
                    },
                    ServiceLocations = "UK and international",
                    CompanyContents = new List<CompanyContent>
                    {
                        new CompanyContent
                        {
                            Url = "/assets/company-images/001.JPG",
                            Type = CompanyMediaType.Image,
                            Caption = "Image One"
                        },
                        new CompanyContent
                        {
                            Url = "/assets/company-images/002.JPG",
                            Type = CompanyMediaType.Image,
                            Caption = "Image Two"
                        },
                        new CompanyContent
                        {
                            Url = "/assets/company-images/003.JPG",
                            Type = CompanyMediaType.Image,
                            Caption = "Image Three"
                        }
                    }
                },

                new Company
                {
                    DisplayName = "Cleaning OCD",
                    LegalName = "Cleaning OCD",
                    CompanyReference = "cleaning",
                    Username = "cleaning1",
                    AccessStatus = AccessStatus.Public,
                    AddedOn = new DateTime(2022,03,15),
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.Cleaning,
                        ServiceCategory.WasteClearance
                    },
                    CompanyAddress = new CompanyAddress
                    {
                        PropertyNumberOrName = "6",
                        StreetName = "Airedale Cl",
                        Locality = "",
                        TownOrCity = "Norwich",
                        County = "England",
                        PostalCode = "NR3 2DB",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 52.643914264497965,
                            Longitude = 1.2797135271974041
                        },
                        What3words = "searching.volunteered.milder"
                    },
                    CompanyContacts = new CompanyContacts
                    {
                        Phone = "020 3488 2208",
                        Email = "info@cae.co.uk"
                    },
                    SummaryDescription = "Recommended cleaning service in Norwich. Self-employed cleaner with DBS check, public liability insurance and massive references. All chemicals and equipment provided. Services: Domestic cleaning, End of tenancy cleaning, Office and commercial cleaning, Medical practice cleaning, Surgery cleaning, Dental practice cleaning.",
                    CompanyDescriptions = new List<CompanyDescription>
                    {
                        new CompanyDescription
                        {
                            Heading = "Who we are",
                            Text = "Gabriella is a self-employed (sole trader) cleaner. She has Bachelor degree as a sanitary-epidemiological inspector. She worked as a CQC inspector for 10 years. She operated a cleaning business in Gibraltar after she moved to London and worked as a hotel housekeeper at a 5* hotel. She lives in Norwich and worked as a medical practice cleaner for 2years, besides she created a succesfull self-employed cleaning service, named Zeus-cleaning www.zeus-cleaning.co.uk",
                        }
                    },
                    ServiceLocations = "UK",
                    CompanyContents = new List<CompanyContent>
                    {
                        new CompanyContent
                        {
                            Url = "https://s3-media0.fl.yelpcdn.com/bphoto/YmImfv7rT1wx6OhHL9THUQ/o.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Image One"
                        },
                        new CompanyContent
                        {
                            Url = "https://s3-media0.fl.yelpcdn.com/bphoto/CxFpFiFXinp31JaBGvVRdg/o.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Image Two"
                        },
                        new CompanyContent
                        {
                            Url = "https://s3-media0.fl.yelpcdn.com/bphoto/BeDc9QGW3uhD2BzjhmznoA/o.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Image Three"
                        }
                    }
                },

                new Company
                {
                    DisplayName = "Bridge heating",
                    LegalName = "Bridge heating",
                    CompanyReference = "bridge-heat",
                    Username = "plumber1",
                    AccessStatus = AccessStatus.Public,
                    AddedOn = new DateTime(2022,03,15),
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.CentralHeating,
                        ServiceCategory.Pluming
                    },
                    CompanyAddress = new CompanyAddress
                    {
                        PropertyNumberOrName = "4",
                        StreetName = "White Horse Yard",
                        Locality = "Stony Stratford",
                        TownOrCity = "Milton Keynes",
                        County = "England",
                        PostalCode = "MK11 1FB",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 52.05661506461248,
                            Longitude = -0.8533489730745938
                        },
                        What3words = "searching.volunteered.milder"
                    },
                    CompanyContacts = new CompanyContacts
                    {
                        Phone = "020 3488 2208",
                        Email = "info@cae.co.uk"
                    },
                    SummaryDescription = "Recommended cleaning service in Norwich. Self-employed cleaner with DBS check, public liability insurance and massive references. All chemicals and equipment provided. Services: Domestic cleaning, End of tenancy cleaning, Office and commercial cleaning, Medical practice cleaning, Surgery cleaning, Dental practice cleaning.",
                    CompanyDescriptions = new List<CompanyDescription>
                    {
                        new CompanyDescription
                        {
                            Heading = "Who we are",
                            Text = "Gabriella is a self-employed (sole trader) cleaner. She has Bachelor degree as a sanitary-epidemiological inspector. She worked as a CQC inspector for 10 years. She operated a cleaning business in Gibraltar after she moved to London and worked as a hotel housekeeper at a 5* hotel. She lives in Norwich and worked as a medical practice cleaner for 2years, besides she created a succesfull self-employed cleaning service, named Zeus-cleaning www.zeus-cleaning.co.uk",
                        }
                    },
                    ServiceLocations = "UK",
                    CompanyContents = new List<CompanyContent>
                    {
                        new CompanyContent
                        {
                            Url = "https://www.birchlandscapes.co.uk/wp-content/uploads/2021/08/PHOTO-2021-06-11-09-40-05-2.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Image One"
                        },
                        new CompanyContent
                        {
                            Url = "https://www.birchlandscapes.co.uk/wp-content/uploads/2021/08/PHOTO-2021-06-11-09-40-05.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Image Two"
                        },
                        new CompanyContent
                        {
                            Url = "https://www.birchlandscapes.co.uk/wp-content/uploads/2021/08/PHOTO-2021-06-11-09-40-06.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Image Three"
                        }
                    }
                },

                new Company
                {
                    DisplayName = "J.A. Steel & Son",
                    LegalName = "J.A. Steel & Son",
                    CompanyReference = "steel",
                    Username = "handyman1",
                    AccessStatus = AccessStatus.Public,
                    AddedOn = new DateTime(2022,03,15),
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.Removals,
                        ServiceCategory.WasteClearance
                    },
                    CompanyAddress = new CompanyAddress
                    {
                        PropertyNumberOrName = "Steel House",
                        StreetName = "59 Lockfield Avenue",
                        Locality = "",
                        TownOrCity = "Enfield",
                        County = "England",
                        PostalCode = "EN3 7PY",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 51.659803529028075,
                            Longitude = -0.027048244003053896
                        },
                        What3words = "searching.volunteered.milder"
                    },
                    CompanyContacts = new CompanyContacts
                    {
                        Phone = "020 3488 2208",
                        Email = "info@cae.co.uk"
                    },
                    SummaryDescription = "Recommended cleaning service in Norwich. Self-employed cleaner with DBS check, public liability insurance and massive references. All chemicals and equipment provided. Services: Domestic cleaning, End of tenancy cleaning, Office and commercial cleaning, Medical practice cleaning, Surgery cleaning, Dental practice cleaning.",
                    CompanyDescriptions = new List<CompanyDescription>
                    {
                        new CompanyDescription
                        {
                            Heading = "Who we are",
                            Text = "Gabriella is a self-employed (sole trader) cleaner. She has Bachelor degree as a sanitary-epidemiological inspector. She worked as a CQC inspector for 10 years. She operated a cleaning business in Gibraltar after she moved to London and worked as a hotel housekeeper at a 5* hotel. She lives in Norwich and worked as a medical practice cleaner for 2years, besides she created a succesfull self-employed cleaning service, named Zeus-cleaning www.zeus-cleaning.co.uk",
                        }
                    },
                    ServiceLocations = "UK",
                    CompanyContents = new List<CompanyContent>
                    {
                        new CompanyContent
                        {
                            Url = "https://www.jasteelandson.co.uk/assets/images/content-img_move1.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Image One"
                        },
                        new CompanyContent
                        {
                            Url = "https://www.jasteelandson.co.uk/assets/images/content-img_move2.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Image Two"
                        },
                        new CompanyContent
                        {
                            Url = "https://www.jasteelandson.co.uk/assets/images/content-img_move3.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Image Three"
                        }
                    }
                },
            };

            await context.Companies.AddRangeAsync(companies);
            await context.SaveChangesAsync();
        }
    }
}