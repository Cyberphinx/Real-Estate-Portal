using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Domain.ListingAggregate;
using Domain.ListingAggregate.Enums;
using Domain.ListingAggregate.Objects;
using Domain.LocationAggregate;

namespace Persistence
{
    public class SeedListings
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Listings.Any()) return;

            var listings = new List<Listing>
            {
                new Listing
                {
                    Accessibility = true,
                    AddedOn = new DateTime(2022, 08, 10),
                    AdministrationFees = "20",
                    AnnualBusinessRates = 0,
                    Areas = new Areas
                    {
                        External = new Area
                        {
                            Value = 50,
                            Units = UnitOfArea.SqMetres
                        },
                        Internal = new Area
                        {
                            Value = 80,
                            Units = UnitOfArea.SqMetres
                        },
                    },
                    AccessStatus = AccessStatus.Private,
                    AvailableBedrooms = 0,
                    AvailableFromDate = new DateTime(2022, 09, 15),
                    Basement = false,
                    Bathrooms = 2,
                    BillsIncluded = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    CompanyReference = "savills",
                    BurglarAlarm = true,
                    Category = Category.Residential,
                    CentralHeating = CentralHeating.Full,
                    ChainFree = true,
                    ConnectedUtilities = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    Conservatory = false,
                    ConstructionYear = 2018,
                    Contents = new List<Content>
                    {
                        new Content
                        {
                            Url = "https://assets.savills.com/properties/GBWARSWAS210144/WAS210144_11_l_gal.jpg",
                            Type = MediaType.Image,
                            Caption = "External"
                        },
                        new Content
                        {
                            Url = "https://assets.savills.com/properties/GBWARSWAS210144/WAS210144_22_l_gal.jpg",
                            Type = MediaType.Image,
                            Caption = "External"
                        },
                    },
                    CookerType = CookerType.Electric,
                    CouncilTaxBand = CouncilTaxBand.B,
                    DecorativeCondition = DecorativeCondition.Good,
                    Deposit = 1500,
                    DetailedDescriptions = new List<DetailedDescription>
                    {
                        new DetailedDescription
                        {
                            Heading = "About this property",
                            Text = "A superb one bedroom flat situated in an idyllic location, close to the open expanses of Wandsworth Common."
                        },
                    },
                    DoubleGlazing = true,
                    EpcRatings = new EpcRatings
                    {
                        EerCurrentRating = 1
                    },
                    FeatureList = new List<string>
                    {
                        "Clean",
                        "Modern",
                        "Bright",
                        "Garden"
                    },
                    FurnishedState = FurnishedState.Unfurnished,
                    Freezer = true,
                    Fridge = true,
                    Gym = false,
                    ListingLocation =  new ListingLocation
                    {
                        PropertyNumberOrName = "3",
                        StreetName = "Barmouth Road",
                        Locality = "Wandsworth",
                        TownOrCity = "London",
                        County = "England",
                        PostalCode = "SW18 2DN",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 51.452829343839404,
                            Longitude = -0.18469178118044094
                        },
                        PafUdprn = "",
                        What3words = "cage.natively.post"
                    },
                    PropertyType = PropertyType.Detached,
                    Pricing = new Pricing
                    {
                        TransactionType = TransactionType.Sale,
                        Currency = Currency.GBP,
                        Price = 600000,
                        PricePerUnitArea = {},
                        RentFrequency = Frequency.NotApplicable,
                        PriceQualifier = PriceQualifier.FixedPrice,
                        Auction = false
                    },
                    TotalBedrooms = 1
                },
                new Listing
                {
                    Accessibility = true,
                    AddedOn = new DateTime(2022, 07, 12),
                    AdministrationFees = "20",
                    AnnualBusinessRates = 0,
                    Areas = new Areas
                    {
                        External = new Area
                        {
                            Value = 50,
                            Units = UnitOfArea.SqMetres
                        },
                        Internal = new Area
                        {
                            Value = 80,
                            Units = UnitOfArea.SqMetres
                        },
                    },
                    AccessStatus = AccessStatus.Public,
                    AvailableBedrooms = 0,
                    AvailableFromDate = new DateTime(2022, 09, 15),
                    Basement = false,
                    Bathrooms = 2,
                    BillsIncluded = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    CompanyReference = "savills",
                    BurglarAlarm = true,
                    Category = Category.Residential,
                    CentralHeating = CentralHeating.Full,
                    ChainFree = true,
                    ConnectedUtilities = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    Conservatory = false,
                    ConstructionYear = 2018,
                    Contents = new List<Content>
                    {
                        new Content
                        {
                            Url = "https://assets.savills.com/properties/GBWARSWAS210144/WAS210144_24_l_gal.jpg",
                            Type = MediaType.Image,
                            Caption = "External"
                        },
                        new Content
                        {
                            Url = "https://assets.savills.com/properties/GBWARSWAS210144/WAS210144_20_l_gal.jpg",
                            Type = MediaType.Image,
                            Caption = "External"
                        },
                    },
                    CookerType = CookerType.Gas,
                    CouncilTaxBand = CouncilTaxBand.B,
                    DecorativeCondition = DecorativeCondition.Good,
                    Deposit = 1500,
                    DetailedDescriptions = new List<DetailedDescription>
                    {
                        new DetailedDescription
                        {
                            Heading = "About this property",
                            Text = "Arranged over three floors is this beautifully presented family home, bursting with potential to extend (STPP). Towards the front of the property is the spacious double reception room with two original fireplaces, a pretty period bay window and access to the rear garden. ",
                        },
                        new DetailedDescription
                        {
                            Heading = "Local information",
                            Text = "Eglantine Road is a popular residential road in the heart of Wandsworth. There are excellent shopping facilities in the Southside Centre with Sainsbury's and Waitrose supermarkets and transport connections are good from either Wandsworth Town or Clapham Junction mainline stations. The area is also renowned for its many good schools. ",
                        },
                    },
                    DoubleGlazing = true,
                    EpcRatings = new EpcRatings
                    {
                        EerCurrentRating = 1
                    },
                    FeatureList = new List<string>
                    {
                        "Clean",
                        "Modern",
                        "Bright"
                    },
                    FurnishedState = FurnishedState.Unfurnished,
                    Freezer = true,
                    Fridge = true,
                    Gym = false,
                    ListingLocation =  new ListingLocation
                    {
                        PropertyNumberOrName = "5",
                        StreetName = "Eglantine Road",
                        Locality = "Wandsworth",
                        TownOrCity = "London",
                        County = "England",
                        PostalCode = "SW18 2DD",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 51.45628463370926,
                            Longitude = -0.18655681223083537
                        },
                        PafUdprn = "",
                        What3words = "fetch.frost.clear"
                    },
                    PropertyType = PropertyType.Detached,
                    Pricing = new Pricing
                    {
                        TransactionType = TransactionType.Rent,
                        Currency = Currency.GBP,
                        Price = 2500,
                        PricePerUnitArea = {},
                        RentFrequency = Frequency.PerMonth,
                        PriceQualifier = PriceQualifier.FixedPrice,
                        Auction = false
                    },
                    TotalBedrooms = 5
                },
                new Listing
                {
                    Accessibility = true,
                    AddedOn = new DateTime(2022, 06, 18),
                    AdministrationFees = "80",
                    AnnualBusinessRates = 0,
                    Areas = new Areas
                    {
                        External = new Area
                        {
                            Value = 50,
                            Units = UnitOfArea.SqMetres
                        },
                        Internal = new Area
                        {
                            Value = 80,
                            Units = UnitOfArea.SqMetres
                        },
                    },
                    AccessStatus = AccessStatus.Public,
                    AvailableBedrooms = 0,
                    AvailableFromDate = new DateTime(2022, 06, 28),
                    Basement = false,
                    Bathrooms = 2,
                    BillsIncluded = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    CompanyReference = "savills",
                    BurglarAlarm = true,
                    Category = Category.Residential,
                    CentralHeating = CentralHeating.Full,
                    ChainFree = true,
                    ConnectedUtilities = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    Conservatory = false,
                    ConstructionYear = 2018,
                    Contents = new List<Content>
                    {
                        new Content
                        {
                            Url = "https://assets.savills.com/properties/GBCLRSCOS210371/COS210371_01_l_gal.jpg",
                            Type = MediaType.Image,
                            Caption = "External"
                        },
                        new Content
                        {
                            Url = "https://assets.savills.com/properties/GBCLRSCOS210371/COS210371_02_l_gal.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                    },
                    CookerType = CookerType.Electric,
                    CouncilTaxBand = CouncilTaxBand.B,
                    DecorativeCondition = DecorativeCondition.Good,
                    Deposit = 1500,
                    DetailedDescriptions = new List<DetailedDescription>
                    {
                        new DetailedDescription
                        {
                            Heading = "About this property",
                            Text = "A superb one bedroom flat situated in an idyllic location, close to the open expanses of Wandsworth Common."
                        },
                    },
                    DoubleGlazing = true,
                    EpcRatings = new EpcRatings
                    {
                        EerCurrentRating = 1
                    },
                    FeatureList = new List<string>
                    {
                        "Clean",
                        "Modern",
                        "Bright"
                    },
                    FurnishedState = FurnishedState.Unfurnished,
                    Freezer = true,
                    Fridge = true,
                    Gym = false,
                    ListingLocation =  new ListingLocation
                    {
                        PropertyNumberOrName = "",
                        StreetName = "Kings Parade Avenue",
                        Locality = "Clifton",
                        TownOrCity = "Bristol",
                        County = "England",
                        PostalCode = "BS8 2RE",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 51.46741902725919,
                            Longitude = -2.613111713491922
                        },
                        PafUdprn = "",
                        What3words = "length.combining.sheet"
                    },
                    PropertyType = PropertyType.Detached,
                    Pricing = new Pricing
                    {
                        TransactionType = TransactionType.Sale,
                        Currency = Currency.GBP,
                        Price = 475000,
                        PricePerUnitArea = {},
                        RentFrequency = Frequency.NotApplicable,
                        PriceQualifier = PriceQualifier.FixedPrice,
                        Auction = false
                    },
                    TotalBedrooms = 3,
                },
                new Listing
                {
                    Accessibility = true,
                    AddedOn = new DateTime(2022, 05, 10),
                    AdministrationFees = "20",
                    AnnualBusinessRates = 0,
                    Areas = new Areas
                    {
                        External = new Area
                        {
                            Value = 50,
                            Units = UnitOfArea.SqMetres
                        },
                        Internal = new Area
                        {
                            Value = 80,
                            Units = UnitOfArea.SqMetres
                        },
                    },
                    AccessStatus = AccessStatus.Public,
                    AvailableBedrooms = 0,
                    AvailableFromDate = new DateTime(2022, 09, 15),
                    Basement = false,
                    Bathrooms = 2,
                    BillsIncluded = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    CompanyReference = "savills",
                    BurglarAlarm = true,
                    Category = Category.Residential,
                    CentralHeating = CentralHeating.Full,
                    ChainFree = true,
                    ConnectedUtilities = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    Conservatory = false,
                    ConstructionYear = 2006,
                    Contents = new List<Content>
                    {
                        new Content
                        {
                            Url = "https://www.rogerparry.net/wp-content/uploads/2022/05/IMG_4927_19_large.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://www.rogerparry.net/wp-content/uploads/2022/05/IMG_4927_18_large.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },new Content
                        {
                            Url = "https://www.rogerparry.net/wp-content/uploads/2022/05/IMG_4927_5_large.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        }
                    },
                    CookerType = CookerType.Electric,
                    CouncilTaxBand = CouncilTaxBand.B,
                    DecorativeCondition = DecorativeCondition.Good,
                    Deposit = 2000,
                    DetailedDescriptions = new List<DetailedDescription>
                    {
                        new DetailedDescription
                        {
                            Heading = "Summary",
                            Text = "An attractive spacious 4/5 bedroomed detached period house believed to date back over 250 years having been extended and more recently a large 2 storey annexe incorporated with its own access to be self-contained if required. The main house has oil fired central heating, mainly double glazed, 2 bath/shower rooms, excellent reception rooms with oak boarded floors, original doors etc. There are several oil and wood burners."
                        },
                        new DetailedDescription
                        {
                            Heading = "About this property",
                            Text = "The annexe has oil underfloor heating, double glazing, living room, shower room, kitchen/dining room and bedroom.The property occupies a delightful rural position in the village with a variety of local amenities and being about 5 miles from Welshpool, 4 miles from Montgomery and about 22 miles from Shrewsbury.The garden grounds include large parking, turning and hard standing with pleasant lawns and grassed wildlife areas with pool and small stream. A large timber and slate range of outbuilding needs modernization but has great potential."
                        }
                    },
                    DoubleGlazing = true,
                    EpcRatings = new EpcRatings
                    {
                        EerCurrentRating = 1
                    },
                    FeatureList = new List<string>
                    {
                        "Clean",
                        "Modern",
                        "Bright"
                    },
                    FurnishedState = FurnishedState.Unfurnished,
                    Freezer = true,
                    Fridge = true,
                    Gym = false,
                    ListingLocation =  new ListingLocation
                    {
                        PropertyNumberOrName = "",
                        StreetName = "Lilac House",
                        Locality = "Forden",
                        TownOrCity = "Shrewsbury",
                        County = "Shropshire",
                        PostalCode = "SY5 0NB",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 52.588011267789255,
                            Longitude = -2.9546688232841722
                        },
                        PafUdprn = "",
                        What3words = "incursion.overhead.husky"
                    },
                    PropertyType = PropertyType.SemiDetached,
                    Pricing = new Pricing
                    {
                        TransactionType = TransactionType.Sale,
                        Currency = Currency.GBP,
                        Price = 450000,
                        PricePerUnitArea = {},
                        RentFrequency = Frequency.NotApplicable,
                        PriceQualifier = PriceQualifier.FixedPrice,
                        Auction = false
                    },
                    TotalBedrooms = 3,
                },
                new Listing
                {
                    Accessibility = true,
                    AddedOn = new DateTime(2022, 04, 22),
                    AdministrationFees = "20",
                    AnnualBusinessRates = 0,
                    Areas = new Areas
                    {
                        External = new Area
                        {
                            Value = 50,
                            Units = UnitOfArea.SqMetres
                        },
                        Internal = new Area
                        {
                            Value = 80,
                            Units = UnitOfArea.SqMetres
                        },
                    },
                    AccessStatus = AccessStatus.Public,
                    AvailableBedrooms = 0,
                    AvailableFromDate = new DateTime(2022, 09, 15),
                    Basement = false,
                    Bathrooms = 2,
                    BillsIncluded = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    CompanyReference = "savills",
                    BurglarAlarm = true,
                    Category = Category.Residential,
                    CentralHeating = CentralHeating.Full,
                    ChainFree = true,
                    ConnectedUtilities = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    Conservatory = false,
                    ConstructionYear = 2006,
                    Contents = new List<Content>
                    {
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/509c977bfa8985413b65f89da6d154c7.jpg",
                            Type = MediaType.Image,
                            Caption = "External"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/cf7175a0faf7021431bbc69a8e9f30d0.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/59ba5f8975a33cc457dbf52c6f95c9b8.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/fd3e2c64000719be7e46863f1397ed2d.jpg",
                            Type = MediaType.Image,
                            Caption = "External"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/f630ea31f4648fa7fde2a826aa77e91e.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/0c6a4bddb521cb9f527464f73bea2a44.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/75f3f709e7f29424d33945185b1accbf.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/1f9f912ea326cba510e6c838337acfb4.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        }
                    },
                    CookerType = CookerType.Gas,
                    CouncilTaxBand = CouncilTaxBand.B,
                    DecorativeCondition = DecorativeCondition.Good,
                    Deposit = 2000,
                    DetailedDescriptions = new List<DetailedDescription>
                    {
                        new DetailedDescription
                        {
                            Heading = "Overview",
                            Text = "Beautifully located behind electric gates is this stunning and extremely deceptively spacious, traditional, freehold, family detached home. Standing in superb, good sized, mature grounds with ample parking to front, the gas centrally heated and double glazed accommodation which has been vastly extended but still retains many characterful features must be viewed to be fully appreciated."
                        },
                        new DetailedDescription
                        {
                            Heading = "Description",
                            Text = "Beautifully located behind electric gates is this stunning and extremely deceptively spacious, traditional, freehold, family detached home. Standing in superb, good sized, mature grounds with ample parking to front, the gas centrally heated and double glazed accommodation which has been vastly extended but still retains many characterful features must be viewed to be fully appreciated."
                        },
                        new DetailedDescription
                        {
                            Heading = "Entrance Hall",
                            Dimensions = new Dimensions 
                            {
                                Length = 5,
                                Width = 3.1,
                                Unit = UnitOfLength.Metres
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Kitchen/ Diner",
                            Dimensions = new Dimensions 
                            {
                                Length = 15.04,
                                Width = 6.6,
                                Unit = UnitOfLength.Metres
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Master Bedroom",
                            Dimensions = new Dimensions 
                            {
                                Length = 5.1,
                                Width = 3.7,
                                Unit = UnitOfLength.Metres,
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Kitchen/ Diner",
                            Dimensions = new Dimensions 
                            {
                                Length = 15.04,
                                Width = 6.6,
                                Unit = UnitOfLength.Metres
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Kitchen/ Diner",
                            Dimensions = new Dimensions 
                            {
                                Length = 15.04,
                                Width = 6.6,
                                Unit = UnitOfLength.Metres
                            }
                        }
                    },
                    DoubleGlazing = true,
                    EpcRatings = new EpcRatings
                    {
                        EerCurrentRating = 1
                    },
                    FeatureList = new List<string>
                    {
                        "Clean",
                        "Modern",
                        "Bright"
                    },
                    FurnishedState = FurnishedState.Unfurnished,
                    Freezer = true,
                    Fridge = true,
                    Gym = false,
                    ListingLocation =  new ListingLocation
                    {
                        PropertyNumberOrName = "",
                        StreetName = "Station Road",
                        Locality = "Dorridge",
                        TownOrCity = "Solihull",
                        County = "Birmingham",
                        PostalCode = "B93 8EU",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 52.376423203549216,
                            Longitude = -1.75042774397652
                        },
                        PafUdprn = "",
                        What3words = "incursion.overhead.husky"
                    },
                    PropertyType = PropertyType.SemiDetached,
                    Pricing = new Pricing
                    {
                        TransactionType = TransactionType.Sale,
                        Currency = Currency.GBP,
                        Price = 1500000,
                        PricePerUnitArea = {},
                        RentFrequency = Frequency.NotApplicable,
                        PriceQualifier = PriceQualifier.FixedPrice,
                        Auction = false
                    },
                    TotalBedrooms = 3
                },
                new Listing
                {
                    Accessibility = true,
                    AddedOn = new DateTime(2022, 03, 15),
                    AdministrationFees = "20",
                    AnnualBusinessRates = 0,
                    Areas = new Areas
                    {
                        External = new Area
                        {
                            Value = 50,
                            Units = UnitOfArea.SqMetres
                        },
                        Internal = new Area
                        {
                            Value = 80,
                            Units = UnitOfArea.SqMetres
                        },
                    },
                    AccessStatus = AccessStatus.Private,
                    AvailableBedrooms = 0,
                    AvailableFromDate = new DateTime(2022, 09, 15),
                    Basement = false,
                    Bathrooms = 2,
                    BillsIncluded = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    CompanyReference = "savills",
                    BurglarAlarm = true,
                    Category = Category.Residential,
                    CentralHeating = CentralHeating.Full,
                    ChainFree = true,
                    ConnectedUtilities = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    Conservatory = false,
                    ConstructionYear = 2006,
                    Contents = new List<Content>
                    {
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/8e05b850f3b07bcb6baeab711433a7be.jpg",
                            Type = MediaType.Image,
                            Caption = "External"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/c1555e683534d95f94248c54cb31167f.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/6ae6057288678ad9f283ff8090284a59.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/ed780a8d212787c8202ac8d60f2fbcd0.jpg",
                            Type = MediaType.Image,
                            Caption = "External"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/e41f80d336e1ffa7bfb5bc591d2deb88.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/fa3eb7d3fa1af1ba159f8969753d5cad.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/b2e15c3cc05ccd4a39d89bcb4fc7854a.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/6585649dd3c878398a601b997b2cc31e.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        }
                    },
                    CookerType = CookerType.Electric,
                    CouncilTaxBand = CouncilTaxBand.B,
                    DecorativeCondition = DecorativeCondition.Good,
                    Deposit = 2000,
                    DetailedDescriptions = new List<DetailedDescription>
                    {
                        new DetailedDescription
                        {
                            Heading = "Overview",
                            Text = "Beautifully located behind electric gates is this stunning and extremely deceptively spacious, traditional, freehold, family detached home. Standing in superb, good sized, mature grounds with ample parking to front, the gas centrally heated and double glazed accommodation which has been vastly extended but still retains many characterful features must be viewed to be fully appreciated."
                        },
                        new DetailedDescription
                        {
                            Heading = "Description",
                            Text = "Beautifully located behind electric gates is this stunning and extremely deceptively spacious, traditional, freehold, family detached home. Standing in superb, good sized, mature grounds with ample parking to front, the gas centrally heated and double glazed accommodation which has been vastly extended but still retains many characterful features must be viewed to be fully appreciated."
                        },
                        new DetailedDescription
                        {
                            Heading = "Entrance Hall",
                            Dimensions = new Dimensions 
                            {
                                Length = 5,
                                Width = 3.1,
                                Unit = UnitOfLength.Metres
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Kitchen/ Diner",
                            Dimensions = new Dimensions 
                            {
                                Length = 15.04,
                                Width = 6.6,
                                Unit = UnitOfLength.Metres
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Master Bedroom",
                            Dimensions = new Dimensions 
                            {
                                Length = 5.1,
                                Width = 3.7,
                                Unit = UnitOfLength.Metres,
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Kitchen/ Diner",
                            Dimensions = new Dimensions 
                            {
                                Length = 15.04,
                                Width = 6.6,
                                Unit = UnitOfLength.Metres
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Kitchen/ Diner",
                            Dimensions = new Dimensions 
                            {
                                Length = 15.04,
                                Width = 6.6,
                                Unit = UnitOfLength.Metres
                            }
                        }
                    },
                    DoubleGlazing = true,
                    EpcRatings = new EpcRatings
                    {
                        EerCurrentRating = 1
                    },
                    FeatureList = new List<string>
                    {
                        "Clean",
                        "Modern",
                        "Bright"
                    },
                    FurnishedState = FurnishedState.Unfurnished,
                    Freezer = true,
                    Fridge = true,
                    Gym = false,
                    ListingLocation =  new ListingLocation
                    {
                        PropertyNumberOrName = "",
                        StreetName = "Norton Road",
                        Locality = "",
                        TownOrCity = "Stourbridge",
                        County = "",
                        PostalCode = "DY8 2TB",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 52.44180026485434,
                            Longitude = -2.1575397960234057
                        },
                        PafUdprn = "",
                        What3words = "incursion.overhead.husky"
                    },
                    PropertyType = PropertyType.Detached,
                    Pricing = new Pricing
                    {
                        TransactionType = TransactionType.Sale,
                        Currency = Currency.GBP,
                        Price = 700000,
                        PricePerUnitArea = {},
                        RentFrequency = Frequency.NotApplicable,
                        PriceQualifier = PriceQualifier.OffersOver,
                        Auction = false
                    },
                    TotalBedrooms = 2
                },
                new Listing
                {
                    Accessibility = true,
                    AddedOn = new DateTime(2022, 01, 05),
                    AdministrationFees = "20",
                    AnnualBusinessRates = 0,
                    Areas = new Areas
                    {
                        External = new Area
                        {
                            Value = 50,
                            Units = UnitOfArea.SqMetres
                        },
                        Internal = new Area
                        {
                            Value = 80,
                            Units = UnitOfArea.SqMetres
                        },
                    },
                    AccessStatus = AccessStatus.Public,
                    AvailableBedrooms = 0,
                    AvailableFromDate = new DateTime(2022, 09, 15),
                    Basement = false,
                    Bathrooms = 2,
                    BillsIncluded = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    CompanyReference = "savills",
                    BurglarAlarm = true,
                    Category = Category.Residential,
                    CentralHeating = CentralHeating.Full,
                    ChainFree = true,
                    ConnectedUtilities = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    Conservatory = false,
                    ConstructionYear = 2006,
                    Contents = new List<Content>
                    {
                        new Content
                        {
                            Url = "https://www.rogerparry.net/wp-content/uploads/2021/12/IMG_4786_26_large.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://www.rogerparry.net/wp-content/uploads/2021/12/IMG_4786_27_large.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },new Content
                        {
                            Url = "https://www.rogerparry.net/wp-content/uploads/2021/12/IMG_4786_2_large.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        }
                    },
                    CookerType = CookerType.Electric,
                    CouncilTaxBand = CouncilTaxBand.B,
                    DecorativeCondition = DecorativeCondition.Good,
                    Deposit = 2000,
                    DetailedDescriptions = new List<DetailedDescription>
                    {
                        new DetailedDescription
                        {
                            Heading = "Summary",
                            Text = "An attractive spacious 4/5 bedroomed detached period house believed to date back over 250 years having been extended and more recently a large 2 storey annexe incorporated with its own access to be self-contained if required. The main house has oil fired central heating, mainly double glazed, 2 bath/shower rooms, excellent reception rooms with oak boarded floors, original doors etc. There are several oil and wood burners."
                        },
                        new DetailedDescription
                        {
                            Heading = "About this property",
                            Text = "The annexe has oil underfloor heating, double glazing, living room, shower room, kitchen/dining room and bedroom.The property occupies a delightful rural position in the village with a variety of local amenities and being about 5 miles from Welshpool, 4 miles from Montgomery and about 22 miles from Shrewsbury.The garden grounds include large parking, turning and hard standing with pleasant lawns and grassed wildlife areas with pool and small stream. A large timber and slate range of outbuilding needs modernization but has great potential."
                        }
                    },
                    DoubleGlazing = true,
                    EpcRatings = new EpcRatings
                    {
                        EerCurrentRating = 1
                    },
                    FeatureList = new List<string>
                    {
                        "Clean",
                        "Modern",
                        "Bright"
                    },
                    FurnishedState = FurnishedState.Unfurnished,
                    Freezer = true,
                    Fridge = true,
                    Gym = false,
                    ListingLocation =  new ListingLocation
                    {
                        PropertyNumberOrName = "",
                        StreetName = "Wrentnall",
                        Locality = "",
                        TownOrCity = "Shrewsbury",
                        County = "Shropshire",
                        PostalCode = "SY5 8EB",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 52.62884060779064,
                            Longitude =  -2.849421002928611
                        },
                        PafUdprn = "",
                        What3words = "incursion.overhead.husky"
                    },
                    PropertyType = PropertyType.SemiDetached,
                    Pricing = new Pricing
                    {
                        TransactionType = TransactionType.Rent,
                        Currency = Currency.GBP,
                        Price = 1220,
                        PricePerUnitArea = {},
                        RentFrequency = Frequency.PerMonth,
                        PriceQualifier = PriceQualifier.FixedPrice,
                        Auction = false
                    },
                    TotalBedrooms = 3
                },
                new Listing
                {
                    Accessibility = true,
                    AddedOn = new DateTime(2022, 06, 24),
                    AdministrationFees = "20",
                    AnnualBusinessRates = 0,
                    Areas = new Areas
                    {
                        External = new Area
                        {
                            Value = 50,
                            Units = UnitOfArea.SqMetres
                        },
                        Internal = new Area
                        {
                            Value = 80,
                            Units = UnitOfArea.SqMetres
                        },
                    },
                    AccessStatus = AccessStatus.Public,
                    AvailableBedrooms = 0,
                    AvailableFromDate = new DateTime(2022, 09, 15),
                    Basement = false,
                    Bathrooms = 2,
                    BillsIncluded = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    CompanyReference = "savills",
                    BurglarAlarm = true,
                    Category = Category.Residential,
                    CentralHeating = CentralHeating.Full,
                    ChainFree = true,
                    ConnectedUtilities = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    Conservatory = false,
                    ConstructionYear = 2006,
                    Contents = new List<Content>
                    {
                        new Content
                        {
                            Url = "https://www.rogerparry.net/wp-content/uploads/2022/03/IMG_4950_1_large.jpg",
                            Type = MediaType.Image,
                            Caption = "External"
                        },
                        new Content
                        {
                            Url = "https://www.rogerparry.net/wp-content/uploads/2022/03/IMG_4950_8_large.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://www.rogerparry.net/wp-content/uploads/2022/03/IMG_4950_11_large.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://www.rogerparry.net/wp-content/uploads/2022/03/IMG_4950_26_large.jpg",
                            Type = MediaType.Image,
                            Caption = "External"
                        },
                        new Content
                        {
                            Url = "https://www.rogerparry.net/wp-content/uploads/2022/03/IMG_4950_27_large.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://www.rogerparry.net/wp-content/uploads/2022/03/IMG_4950_28_large.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://www.rogerparry.net/wp-content/uploads/2022/03/IMG_4950_29_large.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://www.rogerparry.net/wp-content/uploads/2022/03/IMG_4950_30_large.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        }
                    },
                    CookerType = CookerType.Gas,
                    CouncilTaxBand = CouncilTaxBand.B,
                    DecorativeCondition = DecorativeCondition.Good,
                    Deposit = 2000,
                    DetailedDescriptions = new List<DetailedDescription>
                    {
                        new DetailedDescription
                        {
                            Heading = "Overview",
                            Text = "Beautifully located behind electric gates is this stunning and extremely deceptively spacious, traditional, freehold, family detached home. Standing in superb, good sized, mature grounds with ample parking to front, the gas centrally heated and double glazed accommodation which has been vastly extended but still retains many characterful features must be viewed to be fully appreciated."
                        },
                        new DetailedDescription
                        {
                            Heading = "Description",
                            Text = "Beautifully located behind electric gates is this stunning and extremely deceptively spacious, traditional, freehold, family detached home. Standing in superb, good sized, mature grounds with ample parking to front, the gas centrally heated and double glazed accommodation which has been vastly extended but still retains many characterful features must be viewed to be fully appreciated."
                        },
                        new DetailedDescription
                        {
                            Heading = "Entrance Hall",
                            Dimensions = new Dimensions 
                            {
                                Length = 5,
                                Width = 3.1,
                                Unit = UnitOfLength.Metres
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Kitchen/ Diner",
                            Dimensions = new Dimensions 
                            {
                                Length = 15.04,
                                Width = 6.6,
                                Unit = UnitOfLength.Metres
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Master Bedroom",
                            Dimensions = new Dimensions 
                            {
                                Length = 5.1,
                                Width = 3.7,
                                Unit = UnitOfLength.Metres,
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Kitchen/ Diner",
                            Dimensions = new Dimensions 
                            {
                                Length = 15.04,
                                Width = 6.6,
                                Unit = UnitOfLength.Metres
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Kitchen/ Diner",
                            Dimensions = new Dimensions 
                            {
                                Length = 15.04,
                                Width = 6.6,
                                Unit = UnitOfLength.Metres
                            }
                        }
                    },
                    DoubleGlazing = true,
                    EpcRatings = new EpcRatings
                    {
                        EerCurrentRating = 1
                    },
                    FeatureList = new List<string>
                    {
                        "Clean",
                        "Modern",
                        "Bright"
                    },
                    FurnishedState = FurnishedState.Unfurnished,
                    Freezer = true,
                    Fridge = true,
                    Gym = false,
                    ListingLocation =  new ListingLocation
                    {
                        PropertyNumberOrName = "Crown House",
                        StreetName = "St. Mary’s Street",
                        Locality = "",
                        TownOrCity = "Shrewsbury",
                        County = "Shropshire",
                        PostalCode = "SY1 1EU",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 52.70887452996458,
                            Longitude = -2.752042315128117
                        },
                        PafUdprn = "",
                        What3words = "incursion.overhead.husky"
                    },
                    PropertyType = PropertyType.Flat,
                    Pricing = new Pricing
                    {
                        TransactionType = TransactionType.Rent,
                        Currency = Currency.GBP,
                        Price = 2000,
                        PricePerUnitArea = {},
                        RentFrequency = Frequency.PerMonth,
                        PriceQualifier = PriceQualifier.OffersOver,
                        Auction = false
                    },
                    TotalBedrooms = 1
                },
                new Listing
                {
                    Accessibility = true,
                    AddedOn = new DateTime(2022, 08, 06),
                    AdministrationFees = "20",
                    AnnualBusinessRates = 0,
                    Areas = new Areas
                    {
                        External = new Area
                        {
                            Value = 50,
                            Units = UnitOfArea.SqMetres
                        },
                        Internal = new Area
                        {
                            Value = 80,
                            Units = UnitOfArea.SqMetres
                        },
                    },
                    AccessStatus = AccessStatus.Public,
                    AvailableBedrooms = 0,
                    AvailableFromDate = new DateTime(2022, 09, 15),
                    Basement = false,
                    Bathrooms = 2,
                    BillsIncluded = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    CompanyReference = "savills",
                    BurglarAlarm = true,
                    Category = Category.Residential,
                    CentralHeating = CentralHeating.Full,
                    ChainFree = true,
                    ConnectedUtilities = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    Conservatory = false,
                    ConstructionYear = 2006,
                    Contents = new List<Content>
                    {
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/1fbf293ca9f3112052d3b05b52351fb5.jpg",
                            Type = MediaType.Image,
                            Caption = "External"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/afe707fac579d054e77265de3d2db47e.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/de5fadfb3f12bd3878075f9dafeb9dc3.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/28d0c2399bcedd3697b5cea2e824de8d.jpg",
                            Type = MediaType.Image,
                            Caption = "External"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/321cf13ddf4bea1662a17a521b0dc50a.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/630b867538d884f0f91b4373349ea743.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/dec2888e48fa2302bbd1bb6c98ebd11d.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/da00b8057fd384f61b597013b7583226.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        }
                    },
                    CookerType = CookerType.DualFuel,
                    CouncilTaxBand = CouncilTaxBand.B,
                    DecorativeCondition = DecorativeCondition.Good,
                    Deposit = 2000,
                    DetailedDescriptions = new List<DetailedDescription>
                    {
                        new DetailedDescription
                        {
                            Heading = "Overview",
                            Text = "Beautifully located behind electric gates is this stunning and extremely deceptively spacious, traditional, freehold, family detached home. Standing in superb, good sized, mature grounds with ample parking to front, the gas centrally heated and double glazed accommodation which has been vastly extended but still retains many characterful features must be viewed to be fully appreciated."
                        },
                        new DetailedDescription
                        {
                            Heading = "Description",
                            Text = "Beautifully located behind electric gates is this stunning and extremely deceptively spacious, traditional, freehold, family detached home. Standing in superb, good sized, mature grounds with ample parking to front, the gas centrally heated and double glazed accommodation which has been vastly extended but still retains many characterful features must be viewed to be fully appreciated."
                        },
                        new DetailedDescription
                        {
                            Heading = "Entrance Hall",
                            Dimensions = new Dimensions 
                            {
                                Length = 5,
                                Width = 3.1,
                                Unit = UnitOfLength.Metres
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Kitchen/ Diner",
                            Dimensions = new Dimensions 
                            {
                                Length = 15.04,
                                Width = 6.6,
                                Unit = UnitOfLength.Metres
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Master Bedroom",
                            Dimensions = new Dimensions 
                            {
                                Length = 5.1,
                                Width = 3.7,
                                Unit = UnitOfLength.Metres,
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Kitchen/ Diner",
                            Dimensions = new Dimensions 
                            {
                                Length = 15.04,
                                Width = 6.6,
                                Unit = UnitOfLength.Metres
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Kitchen/ Diner",
                            Dimensions = new Dimensions 
                            {
                                Length = 15.04,
                                Width = 6.6,
                                Unit = UnitOfLength.Metres
                            }
                        }
                    },
                    DoubleGlazing = true,
                    EpcRatings = new EpcRatings
                    {
                        EerCurrentRating = 1
                    },
                    FeatureList = new List<string>
                    {
                        "Clean",
                        "Modern",
                        "Bright"
                    },
                    FurnishedState = FurnishedState.Unfurnished,
                    Freezer = true,
                    Fridge = true,
                    Gym = false,
                    ListingLocation =  new ListingLocation
                    {
                        PropertyNumberOrName = "",
                        StreetName = "Heathfield Gardens",
                        Locality = "",
                        TownOrCity = "Stourbridge",
                        County = "",
                        PostalCode = "DY8 3YD",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 52.45199334118628,
                            Longitude = -2.1551407169898824
                        },
                        PafUdprn = "",
                        What3words = "incursion.overhead.husky"
                    },
                    PropertyType = PropertyType.Flat,
                    Pricing = new Pricing
                    {
                        TransactionType = TransactionType.Rent,
                        Currency = Currency.GBP,
                        Price = 1100,
                        PricePerUnitArea = {},
                        RentFrequency = Frequency.PerMonth,
                        PriceQualifier = PriceQualifier.OffersOver,
                        Auction = false
                    },
                    TotalBedrooms = 3,
                },
                new Listing
                {
                    Accessibility = true,
                    AddedOn = new DateTime(2022, 04, 12),
                    AdministrationFees = "20",
                    AnnualBusinessRates = 0,
                    Areas = new Areas
                    {
                        External = new Area
                        {
                            Value = 50,
                            Units = UnitOfArea.SqMetres
                        },
                        Internal = new Area
                        {
                            Value = 80,
                            Units = UnitOfArea.SqMetres
                        },
                    },
                    AccessStatus = AccessStatus.Private,
                    AvailableBedrooms = 0,
                    AvailableFromDate = new DateTime(2022, 09, 15),
                    Basement = false,
                    Bathrooms = 2,
                    BillsIncluded = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    CompanyReference = "savills",
                    BurglarAlarm = true,
                    Category = Category.Residential,
                    CentralHeating = CentralHeating.Full,
                    ChainFree = true,
                    ConnectedUtilities = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    },
                    Conservatory = false,
                    ConstructionYear = 2006,
                    Contents = new List<Content>
                    {
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/ab2fae8e5de0a4c9b4c7204292f5fbfe.jpg",
                            Type = MediaType.Image,
                            Caption = "External"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/3e1ed6294892121f14ffb85a2aa24f32.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/92e03c59c0c1a3147f3665fefff04907.png",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/4adcd0968ee878fde1687921bcb89c2e.png",
                            Type = MediaType.Image,
                            Caption = "External"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/300965cb4500ab38cd3b645d0881e683.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        },
                        new Content
                        {
                            Url = "https://d29a6tqnmy116t.cloudfront.net/1200x900/property_images/4a56fe7ee6ac90a5cd0ce5e76bfe38d4.jpg",
                            Type = MediaType.Image,
                            Caption = "Internal"
                        }
                    },
                    CookerType = CookerType.DualFuel,
                    CouncilTaxBand = CouncilTaxBand.B,
                    DecorativeCondition = DecorativeCondition.Good,
                    Deposit = 2000,
                    DetailedDescriptions = new List<DetailedDescription>
                    {
                        new DetailedDescription
                        {
                            Heading = "Overview",
                            Text = "Beautifully located behind electric gates is this stunning and extremely deceptively spacious, traditional, freehold, family detached home. Standing in superb, good sized, mature grounds with ample parking to front, the gas centrally heated and double glazed accommodation which has been vastly extended but still retains many characterful features must be viewed to be fully appreciated."
                        },
                        new DetailedDescription
                        {
                            Heading = "Description",
                            Text = "Beautifully located behind electric gates is this stunning and extremely deceptively spacious, traditional, freehold, family detached home. Standing in superb, good sized, mature grounds with ample parking to front, the gas centrally heated and double glazed accommodation which has been vastly extended but still retains many characterful features must be viewed to be fully appreciated."
                        },
                        new DetailedDescription
                        {
                            Heading = "Entrance Hall",
                            Dimensions = new Dimensions 
                            {
                                Length = 5,
                                Width = 3.1,
                                Unit = UnitOfLength.Metres
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Kitchen/ Diner",
                            Dimensions = new Dimensions 
                            {
                                Length = 15.04,
                                Width = 6.6,
                                Unit = UnitOfLength.Metres
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Master Bedroom",
                            Dimensions = new Dimensions 
                            {
                                Length = 5.1,
                                Width = 3.7,
                                Unit = UnitOfLength.Metres,
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Kitchen/ Diner",
                            Dimensions = new Dimensions 
                            {
                                Length = 15.04,
                                Width = 6.6,
                                Unit = UnitOfLength.Metres
                            }
                        },
                        new DetailedDescription
                        {
                            Heading = "Kitchen/ Diner",
                            Dimensions = new Dimensions 
                            {
                                Length = 15.04,
                                Width = 6.6,
                                Unit = UnitOfLength.Metres
                            }
                        }
                    },
                    DoubleGlazing = true,
                    EpcRatings = new EpcRatings
                    {
                        EerCurrentRating = 1
                    },
                    FeatureList = new List<string>
                    {
                        "Clean",
                        "Modern",
                        "Bright"
                    },
                    FurnishedState = FurnishedState.Unfurnished,
                    Freezer = true,
                    Fridge = true,
                    Gym = false,
                    ListingLocation =  new ListingLocation
                    {
                        PropertyNumberOrName = "Apartment 30",
                        StreetName = "Linden Place",
                        Locality = "",
                        TownOrCity = "Solihull",
                        County = "West Midlands",
                        PostalCode = "B91 2PW",
                        Country = Country.UnitedKingdom,
                        Coordinates = new Coordinates
                        {
                            Latitude = 52.41576325169891,
                            Longitude = -1.7654338169912243
                        },
                        PafUdprn = "",
                        What3words = "incursion.overhead.husky"
                    },
                    PropertyType = PropertyType.Bungalow,
                    Pricing = new Pricing
                    {
                        TransactionType = TransactionType.Rent,
                        Currency = Currency.GBP,
                        Price = 2290,
                        PricePerUnitArea = {},
                        RentFrequency = Frequency.PerMonth,
                        PriceQualifier = PriceQualifier.OffersOver,
                        Auction = false
                    },
                    TotalBedrooms = 2
                }
            };

            await context.Listings.AddRangeAsync(listings);
            await context.SaveChangesAsync();
        }
    }
}