using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;
using Domain.CompanyAggregate;
using Domain.CompanyAggregate.Enums;
using Domain.LocationAggregate;
using Domain.CompanyAggregate.Objects;

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
                    CompanyReference = "savills5186",
                    Username = "savills",
                    DisplayName = "Savills - London",
                    LegalName = "Savills (UK) Limited",
                    IsMain = true,
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
                        Country = "United Kingdom",
                        Latitude = 51.51654265291029,
                        Longitude = -0.14291257284437422
                    },
                    CompanyContents = new List<CompanyContent>()
                    {
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671215966/Placeholder/CompanyContents/real-estate-agency_wrm90i.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = true,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/Screenshot_2022-12-16_184526_gilzvg.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/realtor-showing-young-family-around-property-for-PUTL8G4-e1516618996652_zfgphc.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1672172027/Placeholder/CompanyContents/logo-placeholder_lajpbm.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = true
                        }
                    },
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.EstateAgent
                    },
                    SummaryDescription = "Estate agency based in UK. Eco friendly and competitive approach to all customers.",
                    CompanyDescriptions = new List<CompanyDescription>
                    {
                        new CompanyDescription
                        {
                            Heading = "We're experts",
                            Text = "Information and communication are vital strengths in these unprecedented times. Our experts provide up-to-date market insight and analysis across all property markets via our insight & opinion hub.",
                        },
                        new CompanyDescription
                        {
                            Heading = "We value relationships",
                            Text = "Our business is built on trust and integrity. This is intrinsic in everything we do, and is what gives our clients, colleagues, suppliers, partners and investors the confidence to work with us. We treat everyone individually, offering bespoke advice, which in turn builds long-term relationships and helps them to make better property decisions.",
                        },
                        new CompanyDescription
                        {
                            Heading = "How can we help?",
                            Text = "We're here to provide you with more information, answer any questions you may have, or connect you with the right people to help with your needs. Use our general enquiry form to get in touch today.",
                        }
                    },
                    ServiceLocations = "UK and international",
                    Insurances = new List<Insurance>
                    {
                        new Insurance
                        {
                            Type = InsuranceType.ProfessionalIndemnity,
                            Provider = "AXA",
                            IndemnityLimit = "1,000,000",
                            Expiry = new DateTime(2023,01,30)
                        },
                        new Insurance
                        {
                            Type = InsuranceType.PublicLiability,
                            Provider = "Allianz",
                            IndemnityLimit = "5,000,000",
                            Expiry = new DateTime(2025,01,05)
                        }
                    }
                },

                new Company
                {
                    AccessStatus = AccessStatus.Public,
                    CompanyReference = "savills6648",
                    Username = "savills",
                    DisplayName = "Savills - Edinburgh",
                    LegalName = "Savills (UK) Limited",
                    IsMain = false,
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
                        Country = "United Kingdom",
                        Latitude = 55.95435353799718,
                        Longitude = -3.2067211982100288
                    },
                    CompanyContents = new List<CompanyContent>()
                    {
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671215966/Placeholder/CompanyContents/real-estate-agency_wrm90i.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = true,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/Screenshot_2022-12-16_184526_gilzvg.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/realtor-showing-young-family-around-property-for-PUTL8G4-e1516618996652_zfgphc.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        }
                    },
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.EstateAgent
                    },
                    SummaryDescription = "Estate agency based in UK. Eco friendly and competitive approach to all customers.",
                    CompanyDescriptions = new List<CompanyDescription>
                    {
                        new CompanyDescription
                        {
                            Heading = "We're experts",
                            Text = "Information and communication are vital strengths in these unprecedented times. Our experts provide up-to-date market insight and analysis across all property markets via our insight & opinion hub.",
                        },
                        new CompanyDescription
                        {
                            Heading = "We value relationships",
                            Text = "Our business is built on trust and integrity. This is intrinsic in everything we do, and is what gives our clients, colleagues, suppliers, partners and investors the confidence to work with us. We treat everyone individually, offering bespoke advice, which in turn builds long-term relationships and helps them to make better property decisions.",
                        },
                        new CompanyDescription
                        {
                            Heading = "How can we help?",
                            Text = "We're here to provide you with more information, answer any questions you may have, or connect you with the right people to help with your needs. Use our general enquiry form to get in touch today.",
                        }
                    },
                    ServiceLocations = "UK and international",
                    Insurances = new List<Insurance>
                    {
                        new Insurance
                        {
                            Type = InsuranceType.ProfessionalIndemnity,
                            Provider = "AXA",
                            IndemnityLimit = "1,000,000",
                            Expiry = new DateTime(2023,01,30)
                        },
                        new Insurance
                        {
                            Type = InsuranceType.PublicLiability,
                            Provider = "Allianz",
                            IndemnityLimit = "5,000,000",
                            Expiry = new DateTime(2025,01,05)
                        }
                    }
                },

                new Company
                {
                    Username = "purple",
                    CompanyReference = "purple2453",
                    DisplayName = "Purple Bricks 1",
                    LegalName = "Purplebricks Group PLC",
                    IsMain = true,
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
                        Country = "United Kingdom",
                        Latitude = 52.40066044491819,
                        Longitude = -1.8066908304837104
                    },
                    CompanyContents = new List<CompanyContent>()
                    {
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671215966/Placeholder/CompanyContents/real-estate-agency_wrm90i.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = true,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/Screenshot_2022-12-16_184526_gilzvg.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/realtor-showing-young-family-around-property-for-PUTL8G4-e1516618996652_zfgphc.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        }
                    },
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.EstateAgent
                    },
                    SummaryDescription = "Estate agency based in UK. Eco friendly and competitive approach to all customers.",
                    CompanyDescriptions = new List<CompanyDescription>
                    {
                        new CompanyDescription
                        {
                            Heading = "We're experts",
                            Text = "Information and communication are vital strengths in these unprecedented times. Our experts provide up-to-date market insight and analysis across all property markets via our insight & opinion hub.",
                        },
                        new CompanyDescription
                        {
                            Heading = "We value relationships",
                            Text = "Our business is built on trust and integrity. This is intrinsic in everything we do, and is what gives our clients, colleagues, suppliers, partners and investors the confidence to work with us. We treat everyone individually, offering bespoke advice, which in turn builds long-term relationships and helps them to make better property decisions.",
                        },
                        new CompanyDescription
                        {
                            Heading = "How can we help?",
                            Text = "We're here to provide you with more information, answer any questions you may have, or connect you with the right people to help with your needs. Use our general enquiry form to get in touch today.",
                        }
                    },
                    ServiceLocations = "UK and international",
                    Insurances = new List<Insurance>
                    {
                        new Insurance
                        {
                            Type = InsuranceType.ProfessionalIndemnity,
                            Provider = "AXA",
                            IndemnityLimit = "1,000,000",
                            Expiry = new DateTime(2023,01,30)
                        },
                        new Insurance
                        {
                            Type = InsuranceType.PublicLiability,
                            Provider = "Allianz",
                            IndemnityLimit = "5,000,000",
                            Expiry = new DateTime(2025,01,05)
                        }
                    }
                },

                new Company
                {
                    Username = "purple",
                    CompanyReference = "purple1253",
                    DisplayName = "Purple Bricks 2",
                    LegalName = "Purplebricks Group PLC",
                    CompanyRegistrationNumber = "8047368",
                    IsMain = false,
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
                        Country = "United Kingdom",
                        Latitude = 52.40066044491819,
                        Longitude = -1.8066908304837104
                    },
                    CompanyContents = new List<CompanyContent>()
                    {
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671215966/Placeholder/CompanyContents/real-estate-agency_wrm90i.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = true,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/Screenshot_2022-12-16_184526_gilzvg.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/realtor-showing-young-family-around-property-for-PUTL8G4-e1516618996652_zfgphc.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        }
                    },
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.EstateAgent
                    },
                    SummaryDescription = "Estate agency based in UK. Eco friendly and competitive approach to all customers.",
                    CompanyDescriptions = new List<CompanyDescription>
                    {
                        new CompanyDescription
                        {
                            Heading = "We're experts",
                            Text = "Information and communication are vital strengths in these unprecedented times. Our experts provide up-to-date market insight and analysis across all property markets via our insight & opinion hub.",
                        },
                        new CompanyDescription
                        {
                            Heading = "We value relationships",
                            Text = "Our business is built on trust and integrity. This is intrinsic in everything we do, and is what gives our clients, colleagues, suppliers, partners and investors the confidence to work with us. We treat everyone individually, offering bespoke advice, which in turn builds long-term relationships and helps them to make better property decisions.",
                        },
                        new CompanyDescription
                        {
                            Heading = "How can we help?",
                            Text = "We're here to provide you with more information, answer any questions you may have, or connect you with the right people to help with your needs. Use our general enquiry form to get in touch today.",
                        }
                    },
                    ServiceLocations = "UK and international",
                    Insurances = new List<Insurance>
                    {
                        new Insurance
                        {
                            Type = InsuranceType.ProfessionalIndemnity,
                            Provider = "AXA",
                            IndemnityLimit = "1,000,000",
                            Expiry = new DateTime(2023,01,30)
                        },
                        new Insurance
                        {
                            Type = InsuranceType.PublicLiability,
                            Provider = "Allianz",
                            IndemnityLimit = "5,000,000",
                            Expiry = new DateTime(2025,01,05)
                        }
                    }
                },

                new Company
                {
                    Username = "purple",
                    CompanyReference = "purple6321",
                    DisplayName = "Purple Bricks 3",
                    LegalName = "Purplebricks Group PLC",
                    IsMain = false,
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
                        Country = "United Kingdom",
                        Latitude = 52.40066044491819,
                        Longitude = -1.8066908304837104
                    },
                    CompanyContents = new List<CompanyContent>()
                    {
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671215966/Placeholder/CompanyContents/real-estate-agency_wrm90i.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = true,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/Screenshot_2022-12-16_184526_gilzvg.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/realtor-showing-young-family-around-property-for-PUTL8G4-e1516618996652_zfgphc.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        }
                    },
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.EstateAgent
                    },
                    SummaryDescription = "Estate agency based in UK. Eco friendly and competitive approach to all customers.",
                    CompanyDescriptions = new List<CompanyDescription>
                    {
                        new CompanyDescription
                        {
                            Heading = "We're experts",
                            Text = "Information and communication are vital strengths in these unprecedented times. Our experts provide up-to-date market insight and analysis across all property markets via our insight & opinion hub.",
                        },
                        new CompanyDescription
                        {
                            Heading = "We value relationships",
                            Text = "Our business is built on trust and integrity. This is intrinsic in everything we do, and is what gives our clients, colleagues, suppliers, partners and investors the confidence to work with us. We treat everyone individually, offering bespoke advice, which in turn builds long-term relationships and helps them to make better property decisions.",
                        },
                        new CompanyDescription
                        {
                            Heading = "How can we help?",
                            Text = "We're here to provide you with more information, answer any questions you may have, or connect you with the right people to help with your needs. Use our general enquiry form to get in touch today.",
                        }
                    },
                    ServiceLocations = "UK and international",
                    Insurances = new List<Insurance>
                    {
                        new Insurance
                        {
                            Type = InsuranceType.ProfessionalIndemnity,
                            Provider = "AXA",
                            IndemnityLimit = "1,000,000",
                            Expiry = new DateTime(2023,01,30)
                        },
                        new Insurance
                        {
                            Type = InsuranceType.PublicLiability,
                            Provider = "Allianz",
                            IndemnityLimit = "5,000,000",
                            Expiry = new DateTime(2025,01,05)
                        }
                    }
                },

                new Company
                {
                    Username = "purple",
                    CompanyReference = "purple1345",
                    DisplayName = "Purple Bricks 4",
                    IsMain = false,
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
                        Country = "United Kingdom",
                        Latitude = 54.39231504142715,
                        Longitude = -2.371760263326141
                    },
                    CompanyContents = new List<CompanyContent>()
                    {
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671215966/Placeholder/CompanyContents/real-estate-agency_wrm90i.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = true,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/Screenshot_2022-12-16_184526_gilzvg.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/realtor-showing-young-family-around-property-for-PUTL8G4-e1516618996652_zfgphc.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        }
                    },
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.EstateAgent
                    },
                    SummaryDescription = "Estate agency based in UK. Eco friendly and competitive approach to all customers.",
                    CompanyDescriptions = new List<CompanyDescription>
                    {
                        new CompanyDescription
                        {
                            Heading = "We're experts",
                            Text = "Information and communication are vital strengths in these unprecedented times. Our experts provide up-to-date market insight and analysis across all property markets via our insight & opinion hub.",
                        },
                        new CompanyDescription
                        {
                            Heading = "We value relationships",
                            Text = "Our business is built on trust and integrity. This is intrinsic in everything we do, and is what gives our clients, colleagues, suppliers, partners and investors the confidence to work with us. We treat everyone individually, offering bespoke advice, which in turn builds long-term relationships and helps them to make better property decisions.",
                        },
                        new CompanyDescription
                        {
                            Heading = "How can we help?",
                            Text = "We're here to provide you with more information, answer any questions you may have, or connect you with the right people to help with your needs. Use our general enquiry form to get in touch today.",
                        }
                    },
                    ServiceLocations = "UK and international",
                    Insurances = new List<Insurance>
                    {
                        new Insurance
                        {
                            Type = InsuranceType.ProfessionalIndemnity,
                            Provider = "AXA",
                            IndemnityLimit = "1,000,000",
                            Expiry = new DateTime(2023,01,30)
                        },
                        new Insurance
                        {
                            Type = InsuranceType.PublicLiability,
                            Provider = "Allianz",
                            IndemnityLimit = "5,000,000",
                            Expiry = new DateTime(2025,01,05)
                        }
                    }
                },

                new Company
                {
                    AccessStatus = AccessStatus.Public,
                    IsMain = true,
                    CompanyReference = "rogerparry3456",
                    CompanyAddress = new CompanyAddress
                    {
                        PropertyNumberOrName = "Hogstow Hall",
                        StreetName = "Minsterley",
                        Locality = "",
                        TownOrCity = "Shrewsbury",
                        County = "Shropshire",
                        PostalCode = "SY5 0HZ",
                        Country = "United Kingdom",
                        Latitude = 52.60740391205163,
                        Longitude = -2.9450937943182147
                    },
                    CompanyContents = new List<CompanyContent>()
                    {
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671215966/Placeholder/CompanyContents/real-estate-agency_wrm90i.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = true,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/Screenshot_2022-12-16_184526_gilzvg.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/realtor-showing-young-family-around-property-for-PUTL8G4-e1516618996652_zfgphc.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        }
                    },
                    CompanyContacts = new CompanyContacts
                    {
                        Phone = "01938 554499",
                        Email = "info@rogerparry.com",
                        Website = "https://www.rogerparry.net/"
                    },
                    CompanyRegistrationNumber = "OC312203",
                    DisplayName = "Roger Parry",
                    LegalName = "Roger Parry & Partners LLP",
                    Username ="RogerParry",
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.EstateAgent
                    },
                    SummaryDescription = "Estate agency based in UK. Eco friendly and competitive approach to all customers.",
                    CompanyDescriptions = new List<CompanyDescription>
                    {
                        new CompanyDescription
                        {
                            Heading = "We're experts",
                            Text = "Information and communication are vital strengths in these unprecedented times. Our experts provide up-to-date market insight and analysis across all property markets via our insight & opinion hub.",
                        },
                        new CompanyDescription
                        {
                            Heading = "We value relationships",
                            Text = "Our business is built on trust and integrity. This is intrinsic in everything we do, and is what gives our clients, colleagues, suppliers, partners and investors the confidence to work with us. We treat everyone individually, offering bespoke advice, which in turn builds long-term relationships and helps them to make better property decisions.",
                        },
                        new CompanyDescription
                        {
                            Heading = "How can we help?",
                            Text = "We're here to provide you with more information, answer any questions you may have, or connect you with the right people to help with your needs. Use our general enquiry form to get in touch today.",
                        }
                    },
                    ServiceLocations = "UK and international",
                    Insurances = new List<Insurance>
                    {
                        new Insurance
                        {
                            Type = InsuranceType.ProfessionalIndemnity,
                            Provider = "AXA",
                            IndemnityLimit = "1,000,000",
                            Expiry = new DateTime(2023,01,30)
                        },
                        new Insurance
                        {
                            Type = InsuranceType.PublicLiability,
                            Provider = "Allianz",
                            IndemnityLimit = "5,000,000",
                            Expiry = new DateTime(2025,01,05)
                        }
                    }
                },
                new Company
                {
                    Username = "ewe",
                    CompanyReference = "ewe8594",
                    DisplayName = "EweMove Hebden Bridge Sow",
                    LegalName = "Caine-Knight Property Limited",
                    IsMain = true,
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
                        Country = "United Kingdom",
                        Latitude = 50.722980159789316,
                        Longitude = -1.8829559728734109
                    },
                    CompanyContents = new List<CompanyContent>()
                    {
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671215966/Placeholder/CompanyContents/real-estate-agency_wrm90i.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = true,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/Screenshot_2022-12-16_184526_gilzvg.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/realtor-showing-young-family-around-property-for-PUTL8G4-e1516618996652_zfgphc.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        }
                    },
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.EstateAgent
                    },
                    SummaryDescription = "Estate agency based in UK. Eco friendly and competitive approach to all customers.",
                    CompanyDescriptions = new List<CompanyDescription>
                    {
                        new CompanyDescription
                        {
                            Heading = "We're experts",
                            Text = "Information and communication are vital strengths in these unprecedented times. Our experts provide up-to-date market insight and analysis across all property markets via our insight & opinion hub.",
                        },
                        new CompanyDescription
                        {
                            Heading = "We value relationships",
                            Text = "Our business is built on trust and integrity. This is intrinsic in everything we do, and is what gives our clients, colleagues, suppliers, partners and investors the confidence to work with us. We treat everyone individually, offering bespoke advice, which in turn builds long-term relationships and helps them to make better property decisions.",
                        },
                        new CompanyDescription
                        {
                            Heading = "How can we help?",
                            Text = "We're here to provide you with more information, answer any questions you may have, or connect you with the right people to help with your needs. Use our general enquiry form to get in touch today.",
                        }
                    },
                    ServiceLocations = "UK and international",
                    Insurances = new List<Insurance>
                    {
                        new Insurance
                        {
                            Type = InsuranceType.ProfessionalIndemnity,
                            Provider = "AXA",
                            IndemnityLimit = "1,000,000",
                            Expiry = new DateTime(2023,01,30)
                        },
                        new Insurance
                        {
                            Type = InsuranceType.PublicLiability,
                            Provider = "Allianz",
                            IndemnityLimit = "5,000,000",
                            Expiry = new DateTime(2025,01,05)
                        }
                    }
                },

                new Company
                {
                    Username = "hunters",
                    CompanyReference = "hunters3546",
                    DisplayName = "Hunters 1",
                    LegalName = "Hunters (Midlands) Limited",
                    IsMain = true,
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
                        Country = "United Kingdom",
                        Latitude = 50.72308467556089,
                        Longitude =  -1.8824440593814602
                    },
                    CompanyContents = new List<CompanyContent>()
                    {
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671215966/Placeholder/CompanyContents/real-estate-agency_wrm90i.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = true,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/Screenshot_2022-12-16_184526_gilzvg.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/realtor-showing-young-family-around-property-for-PUTL8G4-e1516618996652_zfgphc.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        }
                    },
                    CompanyRegistrationNumber = "",
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.EstateAgent
                    },
                    SummaryDescription = "Estate agency based in UK. Eco friendly and competitive approach to all customers.",
                    CompanyDescriptions = new List<CompanyDescription>
                    {
                        new CompanyDescription
                        {
                            Heading = "We're experts",
                            Text = "Information and communication are vital strengths in these unprecedented times. Our experts provide up-to-date market insight and analysis across all property markets via our insight & opinion hub.",
                        },
                        new CompanyDescription
                        {
                            Heading = "We value relationships",
                            Text = "Our business is built on trust and integrity. This is intrinsic in everything we do, and is what gives our clients, colleagues, suppliers, partners and investors the confidence to work with us. We treat everyone individually, offering bespoke advice, which in turn builds long-term relationships and helps them to make better property decisions.",
                        },
                        new CompanyDescription
                        {
                            Heading = "How can we help?",
                            Text = "We're here to provide you with more information, answer any questions you may have, or connect you with the right people to help with your needs. Use our general enquiry form to get in touch today.",
                        }
                    },
                    ServiceLocations = "UK and international",
                    Insurances = new List<Insurance>
                    {
                        new Insurance
                        {
                            Type = InsuranceType.ProfessionalIndemnity,
                            Provider = "AXA",
                            IndemnityLimit = "1,000,000",
                            Expiry = new DateTime(2023,01,30)
                        },
                        new Insurance
                        {
                            Type = InsuranceType.PublicLiability,
                            Provider = "Allianz",
                            IndemnityLimit = "5,000,000",
                            Expiry = new DateTime(2025,01,05)
                        }
                    }
                },

                new Company
                {
                    Username = "hunters",
                    CompanyReference = "hunters7412",
                    DisplayName = "Hunters 2",
                    LegalName = "Hunters (Midlands) Limited",
                    IsMain = false,
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
                        Country = "United Kingdom",
                        Latitude = 53.297230105069126,
                        Longitude =  -1.3833799280677688
                    },
                    CompanyContents = new List<CompanyContent>()
                    {
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671215966/Placeholder/CompanyContents/real-estate-agency_wrm90i.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = true,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/Screenshot_2022-12-16_184526_gilzvg.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        },
                        new CompanyContent
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671216388/Placeholder/CompanyContents/realtor-showing-young-family-around-property-for-PUTL8G4-e1516618996652_zfgphc.jpg",
                            Type = CompanyMediaType.Image,
                            Caption = "Agency Image",
                            IsMain = false,
                            IsLogo = false
                        }
                    },
                    CompanyRegistrationNumber = "",
                    ServiceCategories = new List<ServiceCategory>
                    {
                        ServiceCategory.EstateAgent
                    },
                    SummaryDescription = "Estate agency based in UK. Eco friendly and competitive approach to all customers.",
                    CompanyDescriptions = new List<CompanyDescription>
                    {
                        new CompanyDescription
                        {
                            Heading = "We're experts",
                            Text = "Information and communication are vital strengths in these unprecedented times. Our experts provide up-to-date market insight and analysis across all property markets via our insight & opinion hub.",
                        },
                        new CompanyDescription
                        {
                            Heading = "We value relationships",
                            Text = "Our business is built on trust and integrity. This is intrinsic in everything we do, and is what gives our clients, colleagues, suppliers, partners and investors the confidence to work with us. We treat everyone individually, offering bespoke advice, which in turn builds long-term relationships and helps them to make better property decisions.",
                        },
                        new CompanyDescription
                        {
                            Heading = "How can we help?",
                            Text = "We're here to provide you with more information, answer any questions you may have, or connect you with the right people to help with your needs. Use our general enquiry form to get in touch today.",
                        }
                    },
                    ServiceLocations = "UK and international",
                    Insurances = new List<Insurance>
                    {
                        new Insurance
                        {
                            Type = InsuranceType.ProfessionalIndemnity,
                            Provider = "AXA",
                            IndemnityLimit = "1,000,000",
                            Expiry = new DateTime(2023,01,30)
                        },
                        new Insurance
                        {
                            Type = InsuranceType.PublicLiability,
                            Provider = "Allianz",
                            IndemnityLimit = "5,000,000",
                            Expiry = new DateTime(2025,01,05)
                        }
                    }
                },

                new Company
                {
                    DisplayName = "Moving Mountains",
                    CompanyReference = "movingmountains2478",
                    LegalName = "Moving Mountains Limited",
                    Username = "movingmountains",
                    AddedOn = new DateTime(2022,07,15),
                    IsMain = true,
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
                        Country = "United Kingdom",
                        Latitude = 51.40264956734864,
                        Longitude = -0.24979083392406543
                    },
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
                    CompanyReference = "electrician17485",
                    DisplayName = "CAE Electrical",
                    LegalName = "CAE Electrical",
                    Username = "electrician1",
                    IsMain = true,
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
                        Country = "United Kingdom",
                        Latitude = 51.60137056764931,
                        Longitude = 0.6534702269086803
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
                    CompanyReference = "cleaning13485",
                    LegalName = "Cleaning OCD",
                    Username = "cleaning1",
                    IsMain = true,
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
                        Country = "United Kingdom",
                        Latitude = 52.643914264497965,
                        Longitude = 1.2797135271974041
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
                    CompanyReference = "plumber117345",
                    LegalName = "Bridge heating",
                    Username = "plumber1",
                    IsMain = true,
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
                        Country = "United Kingdom",
                        Latitude = 52.05661506461248,
                        Longitude = -0.8533489730745938
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
                    CompanyReference = "handyman17586",
                    LegalName = "J.A. Steel & Son",
                    Username = "handyman1",
                    IsMain = true,
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
                        Country = "United Kingdom",
                        Latitude = 51.659803529028075,
                        Longitude = -0.027048244003053896
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