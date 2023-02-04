using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Enums;
using Domain.ListingAggregate;
using Domain.ListingAggregate.Enums;
using Domain.ListingAggregate.Objects;
using Domain.LocationAggregate;
using Domain.MediaAggregate;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class SeedRandomListings
    {
        public static async Task SeedRandomData(DataContext context, Guid companyId, int seedAmount)
        {
            // if (context.Listings.Any()) return;

            // Load one company and its related listings.
            var company = await context.Companies
                .Where(x => x.Id == companyId)
                .Include(l => l.Listings)
                .AsSplitQuery()
                .FirstOrDefaultAsync();

            var listings = new List<Listing>();

            Random rnd = new Random();
            int month = rnd.Next(1, 13);  // creates a number between 1 and 12
            int day = rnd.Next(1, 30);  // creates a number between 1 and 30

            for (int x = 1; x <= seedAmount; x++)
            {
                Listing newListing = new Listing();

                newListing.Accessibility = true;
                newListing.AddedOn = new DateTime(2022, month, day);
                newListing.AdministrationFees = "200";
                newListing.AnnualBusinessRates = 0;
                newListing.AreaTotal = 80;
                newListing.AreaUnits = UnitOfArea.SqMetres;
                newListing.AccessStatus = AccessStatus.Public;
                newListing.AvailableBedrooms = 3;
                newListing.AvailableFromDate = new DateTime(2022, month, day);
                newListing.Bathrooms = 2;
                newListing.BillsIncluded = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    };
                newListing.BusinessForSale = false;
                newListing.BuyerIncentives = null;
                // newListing.CompanyReference = companyReference;
                newListing.Category = Category.Residential;
                newListing.CentralHeating = CentralHeating.Full;
                newListing.ChainFree = true;
                newListing.CommercialUseClass = null;
                newListing.ConnectedUtilities = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    };
                newListing.ConstructionYear = 2018;
                newListing.ListingMedia = new List<ListingMedia>
                    {
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157050/Placeholder/Listings/ronnie-george-9gGvNWBeOq4_zzpq0z.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 1",
                            IsMain = true
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157293/Placeholder/Listings/webaliser-_TPTXZd9mOo_yxhvvk.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 2"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157049/Placeholder/Listings/bailey-anselme-Bkp3gLygyeA_jbeyqw.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 3"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157049/Placeholder/Listings/avi-waxman-f9qZuKoZYoY_fpqamd.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 4"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157050/Placeholder/Listings/chuttersnap-awL_YCtPGv4_mevzcz.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 5"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157049/Placeholder/Listings/sean-pollock-PhYq704ffdA_juovuh.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 6"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157049/Placeholder/Listings/jason-briscoe-UV81E0oXXWQ_d1oc5k.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 7"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157049/Placeholder/Listings/etienne-beauregard-riverin-B0aCvAVSX8E_epmt4d.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 8"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157049/Placeholder/Listings/francesca-tosolini-tHkJAMcO3QE_y8pp1o.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 9"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157049/Placeholder/Listings/grant-lemons-jTCLppdwSEc_gvvge5.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 10"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157293/Placeholder/Listings/naomi-hebert-MP0bgaS_d1c_izjtsb.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 11"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157299/Placeholder/Listings/ionut-vlad-idXQEOxhmvU_svt1mo.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 12"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157293/Placeholder/Listings/krystal-black-V5OEpF12pzw_ekn1te.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 13"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157293/Placeholder/Listings/ronnie-george-9gGvNWBeOq4_yuw3yd.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 14"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157293/Placeholder/Listings/roam-in-color-z3QZ6gjGRt4_evs1kc.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 15"
                        },
                    };
                newListing.CookerType = CookerType.Electric;
                newListing.CouncilTaxBand = CouncilTaxBand.B;
                newListing.DecorativeCondition = DecorativeCondition.Good;
                newListing.Deposit = 1500;
                newListing.DetailedDescriptions = new List<DetailedDescription>
                    {
                        new DetailedDescription
                        {
                            Heading = "Summary",
                            Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultricies turpis mi, at ultrices urna finibus eget. Pellentesque a magna lectus. Pellentesque molestie mollis justo eu congue. Donec nibh leo, tempor eu interdum sit amet, lobortis vitae justo. Quisque mollis nisl risus, sed iaculis diam lobortis vel. Pellentesque nisl tortor, scelerisque aliquam purus fringilla, blandit dictum orci. Cras cursus lacinia erat vel mattis. Proin vehicula mi in risus accumsan, at finibus magna laoreet. Cras nisl turpis, lobortis et arcu eget, tincidunt tempor lacus. Praesent posuere elit at felis lacinia, sed venenatis tellus convallis. Duis vel rhoncus nisl, nec lobortis dui. Sed sed convallis odio. Proin convallis mi ut eros accumsan interdum. Etiam elementum diam at sagittis aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc et faucibus nisi, lobortis venenatis mi.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room One",
                            Length = rnd.Next(10, 50),
                            Width = 20,
                            Unit = UnitOfLength.Metres,
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room Two",
                            Length = 5,
                            Width = 7,
                            Unit = UnitOfLength.Metres,
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room Three",
                            Length = 12,
                            Width = 25,
                            Unit = UnitOfLength.Metres,
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room Four",
                            Length = 20,
                            Width = 15,
                                Unit = UnitOfLength.Metres,
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room Five",
                            Length = 13,
                            Width = 8,
                            Unit = UnitOfLength.Metres,
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                    };
                newListing.EerCurrentRating = "D";
                newListing.EerPotentialRating = "C";
                newListing.EirCurrentRating = "C";
                newListing.EirPotentialRating = "B";
                newListing.FeatureList = new List<string>
                    {
                        "Clean",
                        "Modern",
                        "Bright",
                        "Garden"
                    };
                newListing.FurnishedState = FurnishedState.Unfurnished;
                newListing.FloorLevels = new List<string> { "Ground floor", "First floor" };
                newListing.Floors = 2;
                newListing.GroundRent = 450;
                newListing.LifeCycleStatus = LifeCycleStatus.Available;
                newListing.ListingReference = $"{company.DisplayName}_{x}";
                newListing.ListingLocation = new ListingLocation
                {
                    PropertyNumberOrName = "27",
                    StreetName = "Lorem Ipsum Road",
                    Locality = "Cras Ultricies",
                    TownOrCity = "London",
                    County = "England",
                    PostalCode = "SW27 9HL",
                    Country = "United Kingdom",
                    Latitude = rnd.NextDouble() * (59 - 49) + 49,
                    Longitude = rnd.NextDouble() * (2 - -10) + -10
                };

                newListing.SummaryDescription = "Nullam nec ligula eu dui condimentum euismod sed ut ipsum. Nam eget iaculis ipsum, non efficitur quam. Aliquam erat volutpat. Integer rutrum egestas sapien, non tincidunt ipsum posuere id. Cras molestie cursus tortor sit amet sollicitudin.";
                newListing.TotalBedrooms = rnd.Next(0, 12);
                newListing.LeaseExpiry = null;
                newListing.ListedBuildingGrade = ListedBuildingGrade.GradeA;
                newListing.LivingRooms = 2;
                newListing.MinimumContractLength = 6;
                newListing.MinimumContractLengthUnits = UnitOfTime.Months;
                newListing.NewBuild = false;
                newListing.OpenDay = new DateTime(2022, month, day);
                newListing.FeatureSpaces = new List<FeatureSpace>
                {
                    FeatureSpace.Balcony,
                    FeatureSpace.PrivateGarden,
                    FeatureSpace.Conservatory,
                    FeatureSpace.UtilityRoom
                };
                newListing.Pricing = new Pricing
                {
                    TransactionType = TransactionType.Rent,
                    Currency = Currency.GBP,
                    Price = rnd.Next(800, 8000),
                    RentFrequency = Frequency.PerMonth,
                    PriceQualifier = PriceQualifier.FixedPrice,
                    Auction = false
                };
                newListing.PropertyType = PropertyType.Detached;
                newListing.Parking = null;
                newListing.PetsAllowed = false;
                newListing.RateableValue = 0;
                newListing.RentalTerm = RentalTerm.LongTerm;
                newListing.Repossession = false;
                newListing.Retirement = false;
                newListing.SapRating = 0;
                newListing.ServiceCharge = new ServiceCharge()
                {
                    Charge = 4.5,
                    PerUnitAreaUnits = UnitOfArea.SqMetres,
                    Frequency = Frequency.PerMonth
                };
                newListing.Serviced = false;
                newListing.SharedAccommodation = false;
                newListing.Tenanted = false;
                newListing.TenantEligibilityDss = Eligibility.Excluded;
                newListing.TenantEligibilityStudents = Eligibility.Accepted;
                newListing.Tenure = Tenure.Leasehold;
                newListing.UniqueFeatures = new List<UniqueFeature>
                {
                    UniqueFeature.DoubleGlazing,
                    UniqueFeature.PorterSecurity,
                    UniqueFeature.BurglarAlarm,
                    UniqueFeature.WoodenFloors
                };
                newListing.WhiteGoods = new List<WhiteGoods>
                {
                    WhiteGoods.CookerStove,
                    WhiteGoods.Fridge,
                    WhiteGoods.Freezer,
                    WhiteGoods.Dishwasher
                };

                listings.Add(newListing);
            };

            for (int x = 1; x <= seedAmount; x++)
            {
                Listing newListing = new Listing();

                newListing.Accessibility = true;
                newListing.AddedOn = new DateTime(2022, month, day);
                newListing.AdministrationFees = "200";
                newListing.AnnualBusinessRates = 0;
                newListing.AreaTotal = 120;
                newListing.AreaUnits = UnitOfArea.SqMetres;
                newListing.AccessStatus = AccessStatus.Public;
                newListing.AvailableBedrooms = 3;
                newListing.AvailableFromDate = new DateTime(2022, month, day);
                newListing.Bathrooms = 2;
                newListing.BillsIncluded = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    };
                newListing.BusinessForSale = false;
                newListing.BuyerIncentives = null;
                // newListing.CompanyReference = companyReference;
                newListing.Category = Category.Residential;
                newListing.CentralHeating = CentralHeating.Full;
                newListing.ChainFree = true;
                newListing.CommercialUseClass = null;
                newListing.ConnectedUtilities = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    };
                newListing.ConstructionYear = 2018;
                newListing.ListingMedia = new List<ListingMedia>
                    {
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157293/Placeholder/Listings/naomi-hebert-MP0bgaS_d1c_izjtsb.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 1",
                            IsMain = true
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157293/Placeholder/Listings/krystal-black-V5OEpF12pzw_ekn1te.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 2"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157293/Placeholder/Listings/roam-in-color-z3QZ6gjGRt4_evs1kc.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 3"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157299/Placeholder/Listings/ionut-vlad-idXQEOxhmvU_svt1mo.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 4"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157293/Placeholder/Listings/webaliser-_TPTXZd9mOo_yxhvvk.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 5"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157293/Placeholder/Listings/ronnie-george-9gGvNWBeOq4_yuw3yd.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 6"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157049/Placeholder/Listings/bailey-anselme-Bkp3gLygyeA_jbeyqw.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 7"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157049/Placeholder/Listings/jason-briscoe-UV81E0oXXWQ_d1oc5k.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 8"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157049/Placeholder/Listings/etienne-beauregard-riverin-B0aCvAVSX8E_epmt4d.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 9"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157049/Placeholder/Listings/francesca-tosolini-tHkJAMcO3QE_y8pp1o.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 10"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157049/Placeholder/Listings/grant-lemons-jTCLppdwSEc_gvvge5.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 11"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157049/Placeholder/Listings/sean-pollock-PhYq704ffdA_juovuh.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 12"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157050/Placeholder/Listings/chuttersnap-awL_YCtPGv4_mevzcz.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 13"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157049/Placeholder/Listings/avi-waxman-f9qZuKoZYoY_fpqamd.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 14"
                        },
                        new ListingMedia
                        {
                            Url = "https://res.cloudinary.com/dwcsdudyn/image/upload/v1671157293/Placeholder/Listings/sean-pollock-PhYq704ffdA_w9meyd.jpg",
                            Type = MediaType.Image,
                            Caption = "Photo 15"
                        },
                    };
                newListing.CookerType = CookerType.Electric;
                newListing.CouncilTaxBand = CouncilTaxBand.B;
                newListing.DecorativeCondition = DecorativeCondition.Good;
                newListing.Deposit = 1500;
                newListing.DetailedDescriptions = new List<DetailedDescription>
                    {
                        new DetailedDescription
                        {
                            Heading = "Summary",
                            Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultricies turpis mi, at ultrices urna finibus eget. Pellentesque a magna lectus. Pellentesque molestie mollis justo eu congue. Donec nibh leo, tempor eu interdum sit amet, lobortis vitae justo. Quisque mollis nisl risus, sed iaculis diam lobortis vel. Pellentesque nisl tortor, scelerisque aliquam purus fringilla, blandit dictum orci. Cras cursus lacinia erat vel mattis. Proin vehicula mi in risus accumsan, at finibus magna laoreet. Cras nisl turpis, lobortis et arcu eget, tincidunt tempor lacus. Praesent posuere elit at felis lacinia, sed venenatis tellus convallis. Duis vel rhoncus nisl, nec lobortis dui. Sed sed convallis odio. Proin convallis mi ut eros accumsan interdum. Etiam elementum diam at sagittis aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc et faucibus nisi, lobortis venenatis mi.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room One",
                            Length = rnd.Next(10, 50),
                            Width = 20,
                            Unit = UnitOfLength.Metres,
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room Two",
                            Length = 5,
                            Width = 7,
                            Unit = UnitOfLength.Metres,
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room Three",
                            Length = 12,
                            Width = 25,
                            Unit = UnitOfLength.Metres,
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room Four",
                            Length = 20,
                            Width = 15,
                            Unit = UnitOfLength.Metres,
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room Five",
                            Length = 13,
                            Width = 8,
                            Unit = UnitOfLength.Metres,
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                    };
                newListing.EerCurrentRating = "E";
                newListing.EerPotentialRating = "D";
                newListing.EirCurrentRating = "C";
                newListing.EirPotentialRating = "B";
                newListing.FeatureList = new List<string>
                    {
                        "Clean",
                        "Modern",
                        "Bright",
                        "Garden"
                    };
                newListing.FurnishedState = FurnishedState.Unfurnished;
                newListing.FloorLevels = new List<string> { "First floor", "Second floor" };
                newListing.Floors = 2;
                newListing.GroundRent = 450;
                newListing.LifeCycleStatus = LifeCycleStatus.Available;
                newListing.ListingReference = $"{company.DisplayName}_{x}";
                newListing.ListingLocation = new ListingLocation
                {
                    PropertyNumberOrName = "27",
                    StreetName = "Lorem Ipsum Road",
                    Locality = "Cras Ultricies",
                    TownOrCity = "London",
                    County = "England",
                    PostalCode = "SW27 9HL",
                    Country = "United Kingdom",
                    Latitude = rnd.NextDouble() * (59 - 49) + 49,
                    Longitude = rnd.NextDouble() * (2 - -10) + -10
                };
                newListing.LeaseExpiry = null;
                newListing.ListedBuildingGrade = 0;
                newListing.LivingRooms = 2;
                newListing.NewBuild = false;
                newListing.OpenDay = new DateTime(2022, month, day);
                newListing.FeatureSpaces = new List<FeatureSpace>
                {
                    FeatureSpace.Balcony,
                    FeatureSpace.Basement,
                    FeatureSpace.CommunalGarden,
                    FeatureSpace.Outbuildings
                };
                newListing.Pricing = new Pricing
                {
                    TransactionType = TransactionType.Sale,
                    Currency = Currency.GBP,
                    Price = rnd.Next(50000, 2000000),
                    RentFrequency = Frequency.PerMonth,
                    PriceQualifier = PriceQualifier.FixedPrice,
                    Auction = false
                };
                newListing.PropertyType = PropertyType.Detached;
                newListing.Parking = new List<Parking> { Parking.SingleGarage, Parking.OffStreetParking };
                newListing.PetsAllowed = false;
                newListing.RateableValue = 0;
                newListing.RentalTerm = RentalTerm.LongTerm;
                newListing.Repossession = false;
                newListing.Retirement = false;
                newListing.SapRating = 0;
                newListing.ServiceCharge = null;
                newListing.Serviced = false;
                newListing.SharedAccommodation = false;
                newListing.SummaryDescription = "Nullam nec ligula eu dui condimentum euismod sed ut ipsum. Nam eget iaculis ipsum, non efficitur quam. Aliquam erat volutpat. Integer rutrum egestas sapien, non tincidunt ipsum posuere id. Cras molestie cursus tortor sit amet sollicitudin.";
                newListing.TotalBedrooms = rnd.Next(0, 12);
                newListing.Tenanted = false;
                newListing.TenantEligibilityDss = Eligibility.Excluded;
                newListing.TenantEligibilityStudents = Eligibility.Accepted;
                newListing.Tenure = 0;
                newListing.MinimumContractLength = 6;
                newListing.MinimumContractLengthUnits = UnitOfTime.Months;
                newListing.UniqueFeatures = new List<UniqueFeature>
                {
                    UniqueFeature.DoubleGlazing,
                    UniqueFeature.PorterSecurity,
                    UniqueFeature.BurglarAlarm,
                    UniqueFeature.WoodenFloors
                };
                newListing.WhiteGoods = new List<WhiteGoods>
                {
                    WhiteGoods.CookerStove,
                    WhiteGoods.Fridge,
                    WhiteGoods.Freezer,
                    WhiteGoods.Dishwasher
                };

                listings.Add(newListing);
            };

            foreach (var item in listings)
            {
                company.Listings.Add(item);
            }

            await context.SaveChangesAsync();
        }
    }
}