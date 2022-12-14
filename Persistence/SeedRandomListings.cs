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
    public class SeedRandomListings
    {
        public static async Task SeedRandomData(DataContext context, int seedAmount)
        {
            // if (context.Listings.Any()) return;

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
                newListing.Areas = new Areas
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
                };
                newListing.AccessStatus = AccessStatus.Public;
                newListing.AvailableBedrooms = 3;
                newListing.AvailableFromDate = new DateTime(2022, month, day);
                newListing.Basement = false;
                newListing.Bathrooms = 2;
                newListing.BillsIncluded = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    };
                newListing.BurglarAlarm = true;
                newListing.BusinessForSale = false;
                newListing.BuyerIncentives = null;
                newListing.CompanyReference = "savills";
                newListing.Category = Category.Residential;
                newListing.CentralHeating = CentralHeating.Full;
                newListing.ChainFree = true;
                newListing.CommercialUseClass = null;
                newListing.ConnectedUtilities = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    };
                newListing.Conservatory = true;
                newListing.ConstructionYear = 2018;
                newListing.Contents = new List<Content>
                    {
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=1",
                            Type = MediaType.Image,
                            Caption = "Photo 1"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=2",
                            Type = MediaType.Image,
                            Caption = "Photo 2"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=3",
                            Type = MediaType.Image,
                            Caption = "Photo 3"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=4",
                            Type = MediaType.Image,
                            Caption = "Photo 4"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=5",
                            Type = MediaType.Image,
                            Caption = "Photo 5"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=6",
                            Type = MediaType.Image,
                            Caption = "Photo 6"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=7",
                            Type = MediaType.Image,
                            Caption = "Photo 7"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=8",
                            Type = MediaType.Image,
                            Caption = "Photo 8"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=9",
                            Type = MediaType.Image,
                            Caption = "Photo 9"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=10",
                            Type = MediaType.Image,
                            Caption = "Photo 10"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=11",
                            Type = MediaType.Image,
                            Caption = "Photo 11"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=12",
                            Type = MediaType.Image,
                            Caption = "Photo 12"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=13",
                            Type = MediaType.Image,
                            Caption = "Photo 13"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=14",
                            Type = MediaType.Image,
                            Caption = "Photo 14"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=15",
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
                            Dimensions = null,
                            Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultricies turpis mi, at ultrices urna finibus eget. Pellentesque a magna lectus. Pellentesque molestie mollis justo eu congue. Donec nibh leo, tempor eu interdum sit amet, lobortis vitae justo. Quisque mollis nisl risus, sed iaculis diam lobortis vel. Pellentesque nisl tortor, scelerisque aliquam purus fringilla, blandit dictum orci. Cras cursus lacinia erat vel mattis. Proin vehicula mi in risus accumsan, at finibus magna laoreet. Cras nisl turpis, lobortis et arcu eget, tincidunt tempor lacus. Praesent posuere elit at felis lacinia, sed venenatis tellus convallis. Duis vel rhoncus nisl, nec lobortis dui. Sed sed convallis odio. Proin convallis mi ut eros accumsan interdum. Etiam elementum diam at sagittis aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc et faucibus nisi, lobortis venenatis mi.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room One",
                            Dimensions = new Dimensions
                            {
                                Length = rnd.Next(10, 50),
                                Width = 20,
                                Unit = UnitOfLength.Metres
                            },
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room Two",
                            Dimensions = new Dimensions
                            {
                                Length = 5,
                                Width = 7,
                                Unit = UnitOfLength.Metres
                            },
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room Three",
                            Dimensions = new Dimensions
                            {
                                Length = 12,
                                Width = 25,
                                Unit = UnitOfLength.Metres
                            },
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room Four",
                            Dimensions = new Dimensions
                            {
                                Length = 20,
                                Width = 15,
                                Unit = UnitOfLength.Metres
                            },
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room Five",
                            Dimensions = new Dimensions
                            {
                                Length = 13,
                                Width = 8,
                                Unit = UnitOfLength.Metres
                            },
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                    };
                newListing.DoubleGlazing = true;
                newListing.EpcRatings = new EpcRatings
                        {
                            EerCurrentRating = 1,
                            EerPotentialRating = 1,
                            EirCurrentRating = 1,
                            EirPotentialRating = 1
                        };
                newListing.FeatureList = new List<string>
                    {
                        "Clean",
                        "Modern",
                        "Bright",
                        "Garden"
                    };
                newListing.FurnishedState = FurnishedState.Unfurnished;
                newListing.LifeCycleStatus = LifeCycleStatus.Available;
                newListing.ListingReference = $"savills_{x}";
                newListing.ListingLocation = new ListingLocation
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
                                Latitude = rnd.NextDouble() * (59 - 49) + 49,
                                Longitude = rnd.NextDouble() * (2 - -10) + -10
                            },
                            What3words = "basic.bubble.slim"
                        };
                newListing.Pricing = new Pricing
                        {
                            TransactionType = TransactionType.Rent,
                            Currency = Currency.GBP,
                            Price = rnd.Next(800, 8000),
                            PricePerUnitArea = null,
                            RentFrequency = Frequency.NotApplicable,
                            PriceQualifier = PriceQualifier.FixedPrice,
                            Auction = false
                        };
                newListing.PropertyType = PropertyType.Detached;
                newListing.TotalBedrooms = rnd.Next(0, 12);

                listings.Add(newListing);

                
                        // Fireplace = false,
                        // FishingRights = false,
                        // FloorLevels = { 1, 2 },
                        // Floors = 2,
                        // Freezer = true,
                        // Fridge = true,
                        // GroundRent = 450,
                        // Gym = false,
                        // LeaseExpiry = null,
                        // ListedBuildingGrade = 0,
                        // LivingRooms = 2,
                        // Loft = false,
                        // MinimumContractLength = null,
                        // NewBuild = false,
                        // OpenDay = new DateTime(2022, month, day),
                        // Outbuildings = false,
                        // OutsideSpaces = null,
                        // Parking = null,
                        // PetsAllowed = false,
                        // PorterSecurity = false,
                        // RateableValue = 0,
                        // RentalTerm = 0,
                        // Repossession = false,
                        // Retirement = false,
                        // SapRating = 0,
                        // ServiceCharge = null,
                        // Serviced = false,
                        // SharedAccommodation = false,
                        // SummaryDescription = "Nullam nec ligula eu dui condimentum euismod sed ut ipsum. Nam eget iaculis ipsum, non efficitur quam. Aliquam erat volutpat. Integer rutrum egestas sapien, non tincidunt ipsum posuere id. Cras molestie cursus tortor sit amet sollicitudin.",
                        // SwimmingPool = false,
                        // Tenanted = false,
                        // TenantEligibility = null,
                        // TennisCourt = false,
                        // Tenure = 0,
                        // UtilityRoom = true,
                        // WaterFront = false,
                        // WoodFloors = false

        };

            for (int x = 1; x <= seedAmount; x++)
            {
                Listing newListing = new Listing();

                newListing.Accessibility = true;
                newListing.AddedOn = new DateTime(2022, month, day);
                newListing.AdministrationFees = "200";
                newListing.AnnualBusinessRates = 0;
                newListing.Areas = new Areas
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
                };
                newListing.AccessStatus = AccessStatus.Public;
                newListing.AvailableBedrooms = 3;
                newListing.AvailableFromDate = new DateTime(2022, month, day);
                newListing.Basement = false;
                newListing.Bathrooms = 2;
                newListing.BillsIncluded = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    };
                newListing.BurglarAlarm = true;
                newListing.BusinessForSale = false;
                newListing.BuyerIncentives = null;
                newListing.CompanyReference = "savills";
                newListing.Category = Category.Residential;
                newListing.CentralHeating = CentralHeating.Full;
                newListing.ChainFree = true;
                newListing.CommercialUseClass = null;
                newListing.ConnectedUtilities = new List<Utility>
                    {
                        Utility.SatelliteCableTv,
                        Utility.Water
                    };
                newListing.Conservatory = true;
                newListing.ConstructionYear = 2018;
                newListing.Contents = new List<Content>
                    {
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=1",
                            Type = MediaType.Image,
                            Caption = "Photo 1"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=2",
                            Type = MediaType.Image,
                            Caption = "Photo 2"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=3",
                            Type = MediaType.Image,
                            Caption = "Photo 3"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=4",
                            Type = MediaType.Image,
                            Caption = "Photo 4"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=5",
                            Type = MediaType.Image,
                            Caption = "Photo 5"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=6",
                            Type = MediaType.Image,
                            Caption = "Photo 6"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=7",
                            Type = MediaType.Image,
                            Caption = "Photo 7"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=8",
                            Type = MediaType.Image,
                            Caption = "Photo 8"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=9",
                            Type = MediaType.Image,
                            Caption = "Photo 9"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=10",
                            Type = MediaType.Image,
                            Caption = "Photo 10"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=11",
                            Type = MediaType.Image,
                            Caption = "Photo 11"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=12",
                            Type = MediaType.Image,
                            Caption = "Photo 12"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=13",
                            Type = MediaType.Image,
                            Caption = "Photo 13"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=14",
                            Type = MediaType.Image,
                            Caption = "Photo 14"
                        },
                        new Content
                        {
                            Url = "https://picsum.photos/300/200?random=15",
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
                            Dimensions = null,
                            Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultricies turpis mi, at ultrices urna finibus eget. Pellentesque a magna lectus. Pellentesque molestie mollis justo eu congue. Donec nibh leo, tempor eu interdum sit amet, lobortis vitae justo. Quisque mollis nisl risus, sed iaculis diam lobortis vel. Pellentesque nisl tortor, scelerisque aliquam purus fringilla, blandit dictum orci. Cras cursus lacinia erat vel mattis. Proin vehicula mi in risus accumsan, at finibus magna laoreet. Cras nisl turpis, lobortis et arcu eget, tincidunt tempor lacus. Praesent posuere elit at felis lacinia, sed venenatis tellus convallis. Duis vel rhoncus nisl, nec lobortis dui. Sed sed convallis odio. Proin convallis mi ut eros accumsan interdum. Etiam elementum diam at sagittis aliquam. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nunc et faucibus nisi, lobortis venenatis mi.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room One",
                            Dimensions = new Dimensions
                            {
                                Length = rnd.Next(10, 50),
                                Width = 20,
                                Unit = UnitOfLength.Metres
                            },
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room Two",
                            Dimensions = new Dimensions
                            {
                                Length = 5,
                                Width = 7,
                                Unit = UnitOfLength.Metres
                            },
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room Three",
                            Dimensions = new Dimensions
                            {
                                Length = 12,
                                Width = 25,
                                Unit = UnitOfLength.Metres
                            },
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room Four",
                            Dimensions = new Dimensions
                            {
                                Length = 20,
                                Width = 15,
                                Unit = UnitOfLength.Metres
                            },
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                        new DetailedDescription
                        {
                            Heading = "Room Five",
                            Dimensions = new Dimensions
                            {
                                Length = 13,
                                Width = 8,
                                Unit = UnitOfLength.Metres
                            },
                            Text = "Pellentesque aliquet iaculis consequat. In finibus commodo feugiat. Pellentesque suscipit nunc et faucibus lobortis. Morbi vel ornare risus. Proin consequat metus et purus pulvinar, at efficitur sapien posuere. In pretium accumsan imperdiet. Aenean consectetur iaculis arcu eu ornare. Cras pretium tincidunt lacinia. Proin mattis molestie scelerisque.",
                        },
                    };
                newListing.DoubleGlazing = true;
                newListing.EpcRatings = new EpcRatings
                        {
                            EerCurrentRating = 1,
                            EerPotentialRating = 1,
                            EirCurrentRating = 1,
                            EirPotentialRating = 1
                        };
                newListing.FeatureList = new List<string>
                    {
                        "Clean",
                        "Modern",
                        "Bright",
                        "Garden"
                    };
                newListing.FurnishedState = FurnishedState.Unfurnished;
                newListing.LifeCycleStatus = LifeCycleStatus.Available;
                newListing.ListingReference = $"savills_{x}";
                newListing.ListingLocation = new ListingLocation
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
                                Latitude = rnd.NextDouble() * (59 - 49) + 49,
                                Longitude = rnd.NextDouble() * (2 - -10) + -10
                            },
                            What3words = "basic.bubble.slim"
                        };
                newListing.Pricing = new Pricing
                        {
                            TransactionType = TransactionType.Sale,
                            Currency = Currency.GBP,
                            Price = rnd.Next(50000, 2000000),
                            PricePerUnitArea = null,
                            RentFrequency = Frequency.NotApplicable,
                            PriceQualifier = PriceQualifier.FixedPrice,
                            Auction = false
                        };
                newListing.PropertyType = PropertyType.Detached;
                newListing.TotalBedrooms = rnd.Next(0, 12);

                listings.Add(newListing);

                
                        // Fireplace = false,
                        // FishingRights = false,
                        // FloorLevels = { 1, 2 },
                        // Floors = 2,
                        // Freezer = true,
                        // Fridge = true,
                        // GroundRent = 450,
                        // Gym = false,
                        // LeaseExpiry = null,
                        // ListedBuildingGrade = 0,
                        // LivingRooms = 2,
                        // Loft = false,
                        // MinimumContractLength = null,
                        // NewBuild = false,
                        // OpenDay = new DateTime(2022, month, day),
                        // Outbuildings = false,
                        // OutsideSpaces = null,
                        // Parking = null,
                        // PetsAllowed = false,
                        // PorterSecurity = false,
                        // RateableValue = 0,
                        // RentalTerm = 0,
                        // Repossession = false,
                        // Retirement = false,
                        // SapRating = 0,
                        // ServiceCharge = null,
                        // Serviced = false,
                        // SharedAccommodation = false,
                        // SummaryDescription = "Nullam nec ligula eu dui condimentum euismod sed ut ipsum. Nam eget iaculis ipsum, non efficitur quam. Aliquam erat volutpat. Integer rutrum egestas sapien, non tincidunt ipsum posuere id. Cras molestie cursus tortor sit amet sollicitudin.",
                        // SwimmingPool = false,
                        // Tenanted = false,
                        // TenantEligibility = null,
                        // TennisCourt = false,
                        // Tenure = 0,
                        // UtilityRoom = true,
                        // WaterFront = false,
                        // WoodFloors = false

        };

        await context.Listings.AddRangeAsync(listings);
        await context.SaveChangesAsync();
    }
}
}