using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Persistence.Migrations
{
    public partial class PostgresInitial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:property_type", "barn_conversion,block_of_flats,bungalow,business_park,chalet,chateau,cottage,country_house,detached,detached_bungalow,end_terrace,equestrian,farm,farmhouse,finca,flat,hotel,houseboat,industrial,land,leisure,light_industrial,link_detached,lodge,longere,maisonette,mews,office,park_home,parking,pub_bar,restaurant,retail,riad,semi_detached,semi_detached_bungalow,studio,terraced,terraced_bungalow,town_house,villa,warehouse");

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Membership",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: true),
                    CompanyReference = table.Column<string>(type: "text", nullable: true),
                    ContractLength = table.Column<int>(type: "integer", nullable: false),
                    ContractStart = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ContractEnd = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Price = table.Column<double>(type: "double precision", nullable: false),
                    Unit = table.Column<int>(type: "integer", nullable: false),
                    ComissionPercentage = table.Column<double>(type: "double precision", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Membership", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RoleId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    LastLoginTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    RegistrationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CompanyName = table.Column<string>(type: "text", nullable: true),
                    CompanyPostalCode = table.Column<string>(type: "text", nullable: true),
                    RedressScheme = table.Column<int>(type: "integer", nullable: false),
                    MembershipId = table.Column<Guid>(type: "uuid", nullable: true),
                    UserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: true),
                    SecurityStamp = table.Column<string>(type: "text", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "text", nullable: true),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "boolean", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "boolean", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUsers_Membership_MembershipId",
                        column: x => x.MembershipId,
                        principalTable: "Membership",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AccessStatus = table.Column<int>(type: "integer", nullable: false),
                    AddedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CompanyAddress_PropertyNumberOrName = table.Column<string>(type: "text", nullable: true),
                    CompanyAddress_StreetName = table.Column<string>(type: "text", nullable: true),
                    CompanyAddress_Locality = table.Column<string>(type: "text", nullable: true),
                    CompanyAddress_TownOrCity = table.Column<string>(type: "text", nullable: true),
                    CompanyAddress_County = table.Column<string>(type: "text", nullable: true),
                    CompanyAddress_PostalCode = table.Column<string>(type: "text", nullable: true),
                    CompanyAddress_Country = table.Column<int>(type: "integer", nullable: true),
                    CompanyAddress_Coordinates_Latitude = table.Column<double>(type: "double precision", nullable: true),
                    CompanyAddress_Coordinates_Longitude = table.Column<double>(type: "double precision", nullable: true),
                    CompanyAddress_PafUdprn = table.Column<string>(type: "text", nullable: true),
                    CompanyAddress_What3words = table.Column<string>(type: "text", nullable: true),
                    CompanyContacts_Phone = table.Column<string>(type: "text", nullable: true),
                    CompanyContacts_Email = table.Column<string>(type: "text", nullable: true),
                    CompanyContacts_Website = table.Column<string>(type: "text", nullable: true),
                    CompanyDetails_CompanyType = table.Column<string>(type: "text", nullable: true),
                    CompanyDetails_VatRegistered = table.Column<bool>(type: "boolean", nullable: true),
                    CompanyDetails_VatNumber = table.Column<string>(type: "text", nullable: true),
                    CompanyDetails_CompanyNumber = table.Column<string>(type: "text", nullable: true),
                    CompanyDetails_RegisteredIn = table.Column<string>(type: "text", nullable: true),
                    CompanyDetails_BusinessOwner = table.Column<string>(type: "text", nullable: true),
                    CompanyDetails_IdChecked = table.Column<bool>(type: "boolean", nullable: true),
                    CompanyDetails_AddressVerified = table.Column<bool>(type: "boolean", nullable: true),
                    CompanyDetails_SortCode = table.Column<int>(type: "integer", nullable: true),
                    CompanyDetails_AccountNumber = table.Column<int>(type: "integer", nullable: true),
                    CompanyDetails_BankName = table.Column<string>(type: "text", nullable: true),
                    CompanyName = table.Column<string>(type: "text", nullable: true),
                    CompanyReference = table.Column<string>(type: "text", nullable: false),
                    DisplayName = table.Column<string>(type: "text", nullable: true),
                    LastModified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Logo = table.Column<string>(type: "text", nullable: true),
                    MembershipId = table.Column<Guid>(type: "uuid", nullable: true),
                    RedressScheme = table.Column<int>(type: "integer", nullable: false),
                    ServiceLocations = table.Column<string>(type: "text", nullable: true),
                    ServiceScope = table.Column<string>(type: "text", nullable: true),
                    SummaryDescription = table.Column<string>(type: "text", nullable: true),
                    ServiceCategory = table.Column<int>(type: "integer", nullable: false),
                    Usernames = table.Column<List<string>>(type: "text[]", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                    table.UniqueConstraint("AK_Companies_CompanyReference", x => x.CompanyReference);
                    table.ForeignKey(
                        name: "FK_Companies_Membership_MembershipId",
                        column: x => x.MembershipId,
                        principalTable: "Membership",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Subscription",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Quantity = table.Column<double>(type: "double precision", nullable: false),
                    UnitPrice = table.Column<double>(type: "double precision", nullable: false),
                    Unit = table.Column<string>(type: "text", nullable: true),
                    Total = table.Column<double>(type: "double precision", nullable: false),
                    MembershipId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subscription", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Subscription_Membership_MembershipId",
                        column: x => x.MembershipId,
                        principalTable: "Membership",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ClaimType = table.Column<string>(type: "text", nullable: true),
                    ClaimValue = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    ProviderKey = table.Column<string>(type: "text", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "text", nullable: true),
                    UserId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    RoleId = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "text", nullable: false),
                    LoginProvider = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Availabilities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Available = table.Column<bool>(type: "boolean", nullable: false),
                    StartTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Availabilities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Availabilities_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompanyContents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Caption = table.Column<string>(type: "text", nullable: true),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyContents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyContents_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompanyDescriptions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Heading = table.Column<string>(type: "text", nullable: true),
                    Text = table.Column<string>(type: "text", nullable: true),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyDescriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyDescriptions_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Insurances",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Type = table.Column<string>(type: "text", nullable: true),
                    Insurer = table.Column<string>(type: "text", nullable: true),
                    Amount = table.Column<string>(type: "text", nullable: true),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Insurances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Insurances_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Listings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Accessibility = table.Column<bool>(type: "boolean", nullable: false),
                    AddedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    AdministrationFees = table.Column<string>(type: "text", nullable: true),
                    AnnualBusinessRates = table.Column<double>(type: "double precision", nullable: false),
                    AccessStatus = table.Column<int>(type: "integer", nullable: false),
                    AvailableBedrooms = table.Column<int>(type: "integer", nullable: false),
                    AvailableFromDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Basement = table.Column<bool>(type: "boolean", nullable: false),
                    Bathrooms = table.Column<int>(type: "integer", nullable: false),
                    BillsIncluded = table.Column<int[]>(type: "integer[]", nullable: true),
                    BurglarAlarm = table.Column<bool>(type: "boolean", nullable: false),
                    BusinessForSale = table.Column<bool>(type: "boolean", nullable: false),
                    BuyerIncentives = table.Column<int[]>(type: "integer[]", nullable: true),
                    CompanyReference = table.Column<string>(type: "text", nullable: true),
                    Category = table.Column<int>(type: "integer", nullable: false),
                    CentralHeating = table.Column<int>(type: "integer", nullable: false),
                    ChainFree = table.Column<bool>(type: "boolean", nullable: false),
                    CommercialUseClass = table.Column<List<string>>(type: "text[]", nullable: true),
                    ConnectedUtilities = table.Column<int[]>(type: "integer[]", nullable: true),
                    Conservatory = table.Column<bool>(type: "boolean", nullable: false),
                    ConstructionYear = table.Column<int>(type: "integer", nullable: false),
                    CookerType = table.Column<int>(type: "integer", nullable: false),
                    CouncilTaxBand = table.Column<int>(type: "integer", nullable: false),
                    DecorativeCondition = table.Column<int>(type: "integer", nullable: false),
                    Deposit = table.Column<double>(type: "double precision", nullable: false),
                    DoubleGlazing = table.Column<bool>(type: "boolean", nullable: false),
                    EpcRatings_EerCurrentRating = table.Column<int>(type: "integer", nullable: true),
                    EpcRatings_EerPotentialRating = table.Column<int>(type: "integer", nullable: true),
                    EpcRatings_EirCurrentRating = table.Column<int>(type: "integer", nullable: true),
                    EpcRatings_EirPotentialRating = table.Column<int>(type: "integer", nullable: true),
                    FeatureProperty = table.Column<bool>(type: "boolean", nullable: false),
                    FeatureList = table.Column<List<string>>(type: "text[]", nullable: true),
                    Fireplace = table.Column<bool>(type: "boolean", nullable: false),
                    FishingRights = table.Column<bool>(type: "boolean", nullable: false),
                    FloorLevels = table.Column<List<int>>(type: "integer[]", nullable: true),
                    Floors = table.Column<int>(type: "integer", nullable: false),
                    FurnishedState = table.Column<int>(type: "integer", nullable: false),
                    Freezer = table.Column<bool>(type: "boolean", nullable: false),
                    Fridge = table.Column<bool>(type: "boolean", nullable: false),
                    GroundRent = table.Column<double>(type: "double precision", nullable: false),
                    Gym = table.Column<bool>(type: "boolean", nullable: false),
                    LeaseExpiry_ExpiryDate = table.Column<string>(type: "text", nullable: true),
                    LeaseExpiry_YearsRemaining = table.Column<int>(type: "integer", nullable: true),
                    LifeCycleStatus = table.Column<int>(type: "integer", nullable: false),
                    ListedBuildingGrade = table.Column<int>(type: "integer", nullable: false),
                    ListingReference = table.Column<string>(type: "text", nullable: true),
                    ListingLocation_PropertyNumberOrName = table.Column<string>(type: "text", nullable: true),
                    ListingLocation_StreetName = table.Column<string>(type: "text", nullable: true),
                    ListingLocation_Locality = table.Column<string>(type: "text", nullable: true),
                    ListingLocation_TownOrCity = table.Column<string>(type: "text", nullable: true),
                    ListingLocation_County = table.Column<string>(type: "text", nullable: true),
                    ListingLocation_PostalCode = table.Column<string>(type: "text", nullable: true),
                    ListingLocation_Country = table.Column<int>(type: "integer", nullable: true),
                    ListingLocation_Coordinates_Latitude = table.Column<double>(type: "double precision", nullable: true),
                    ListingLocation_Coordinates_Longitude = table.Column<double>(type: "double precision", nullable: true),
                    ListingLocation_PafUdprn = table.Column<string>(type: "text", nullable: true),
                    ListingLocation_What3words = table.Column<string>(type: "text", nullable: true),
                    LivingRooms = table.Column<int>(type: "integer", nullable: false),
                    Loft = table.Column<bool>(type: "boolean", nullable: false),
                    MinimumContractLength_MinimumLength = table.Column<int>(type: "integer", nullable: true),
                    MinimumContractLength_Units = table.Column<int>(type: "integer", nullable: true),
                    NewBuild = table.Column<bool>(type: "boolean", nullable: false),
                    OpenDay = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Outbuildings = table.Column<bool>(type: "boolean", nullable: false),
                    OutsideSpaces = table.Column<int[]>(type: "integer[]", nullable: true),
                    Parking = table.Column<int[]>(type: "integer[]", nullable: true),
                    PetsAllowed = table.Column<bool>(type: "boolean", nullable: false),
                    PorterSecurity = table.Column<bool>(type: "boolean", nullable: false),
                    Pricing_TransactionType = table.Column<int>(type: "integer", nullable: true),
                    Pricing_Currency = table.Column<int>(type: "integer", nullable: true),
                    Pricing_Price = table.Column<double>(type: "double precision", nullable: true),
                    Pricing_PricePerUnitArea_Price = table.Column<double>(type: "double precision", nullable: true),
                    Pricing_PricePerUnitArea_Units = table.Column<int>(type: "integer", nullable: true),
                    Pricing_RentFrequency = table.Column<int>(type: "integer", nullable: true),
                    Pricing_PriceQualifier = table.Column<int>(type: "integer", nullable: true),
                    Pricing_Auction = table.Column<bool>(type: "boolean", nullable: true),
                    PropertyType = table.Column<int>(type: "integer", nullable: false),
                    RateableValue = table.Column<int>(type: "integer", nullable: false),
                    RentalTerm = table.Column<int>(type: "integer", nullable: false),
                    Repossession = table.Column<bool>(type: "boolean", nullable: false),
                    Retirement = table.Column<bool>(type: "boolean", nullable: false),
                    SapRating = table.Column<int>(type: "integer", nullable: false),
                    ServiceCharge_Charge = table.Column<double>(type: "double precision", nullable: true),
                    ServiceCharge_PerUnitAreaUnits = table.Column<int>(type: "integer", nullable: true),
                    ServiceCharge_Frequency = table.Column<int>(type: "integer", nullable: true),
                    Serviced = table.Column<bool>(type: "boolean", nullable: false),
                    SharedAccommodation = table.Column<bool>(type: "boolean", nullable: false),
                    SummaryDescription = table.Column<string>(type: "text", nullable: true),
                    SwimmingPool = table.Column<bool>(type: "boolean", nullable: false),
                    Tenanted = table.Column<bool>(type: "boolean", nullable: false),
                    TenantEligibility_Dss = table.Column<int>(type: "integer", nullable: true),
                    TenantEligibility_Students = table.Column<int>(type: "integer", nullable: true),
                    TennisCourt = table.Column<bool>(type: "boolean", nullable: false),
                    Tenure = table.Column<int>(type: "integer", nullable: false),
                    TotalBedrooms = table.Column<int>(type: "integer", nullable: false),
                    UtilityRoom = table.Column<bool>(type: "boolean", nullable: false),
                    WaterFront = table.Column<bool>(type: "boolean", nullable: false),
                    WoodFloors = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Listings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Listings_Companies_CompanyReference",
                        column: x => x.CompanyReference,
                        principalTable: "Companies",
                        principalColumn: "CompanyReference");
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    BuyerId = table.Column<string>(type: "text", nullable: true),
                    BuyerName = table.Column<string>(type: "text", nullable: true),
                    BuyerEmail = table.Column<string>(type: "text", nullable: true),
                    BuyerPhone = table.Column<string>(type: "text", nullable: true),
                    BuyerMessage = table.Column<string>(type: "text", nullable: true),
                    OrderDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    OrderStatus = table.Column<int>(type: "integer", nullable: false),
                    ServiceCategory = table.Column<int>(type: "integer", nullable: false),
                    StartTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EndTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ServiceSchedule = table.Column<string>(type: "text", nullable: true),
                    Note = table.Column<string>(type: "text", nullable: true),
                    PaymentIntentId = table.Column<string>(type: "text", nullable: true),
                    CommissionPercentage = table.Column<long>(type: "bigint", nullable: false),
                    Commission = table.Column<long>(type: "bigint", nullable: false),
                    Cancellation = table.Column<int>(type: "integer", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Orders_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Areas",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    External_Value = table.Column<double>(type: "double precision", nullable: true),
                    External_Units = table.Column<int>(type: "integer", nullable: true),
                    Internal_Value = table.Column<double>(type: "double precision", nullable: true),
                    Internal_Units = table.Column<int>(type: "integer", nullable: true),
                    ListingId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Areas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Areas_Listings_ListingId",
                        column: x => x.ListingId,
                        principalTable: "Listings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Contents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Index = table.Column<int>(type: "integer", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Caption = table.Column<string>(type: "text", nullable: true),
                    ListingId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Contents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Contents_Listings_ListingId",
                        column: x => x.ListingId,
                        principalTable: "Listings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetailedDescriptions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Index = table.Column<int>(type: "integer", nullable: false),
                    Heading = table.Column<string>(type: "text", nullable: true),
                    Dimensions_Length = table.Column<double>(type: "double precision", nullable: true),
                    Dimensions_Width = table.Column<double>(type: "double precision", nullable: true),
                    Dimensions_Unit = table.Column<int>(type: "integer", nullable: true),
                    Text = table.Column<string>(type: "text", nullable: true),
                    ListingId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailedDescriptions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetailedDescriptions_Listings_ListingId",
                        column: x => x.ListingId,
                        principalTable: "Listings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AcceptanceForms",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    GoodsValue = table.Column<long>(type: "bigint", nullable: false),
                    StorageRequired = table.Column<bool>(type: "boolean", nullable: false),
                    GoodsValueToBeStored = table.Column<long>(type: "bigint", nullable: false),
                    TermsAndConditions = table.Column<string>(type: "text", nullable: true),
                    LastModified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Accepted = table.Column<bool>(type: "boolean", nullable: false),
                    AcceptanceTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    OrderId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AcceptanceForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AcceptanceForms_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Invoices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    InvoiceNumber = table.Column<int>(type: "integer", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: true),
                    InvoiceDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    PaymentIntentId = table.Column<string>(type: "text", nullable: true),
                    ClientSecret = table.Column<string>(type: "text", nullable: true),
                    TotalNet = table.Column<long>(type: "bigint", nullable: false),
                    TotalVat = table.Column<long>(type: "bigint", nullable: false),
                    Total = table.Column<long>(type: "bigint", nullable: false),
                    PaymentStatus = table.Column<int>(type: "integer", nullable: false),
                    MembershipId = table.Column<Guid>(type: "uuid", nullable: true),
                    OrderId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Invoices_Membership_MembershipId",
                        column: x => x.MembershipId,
                        principalTable: "Membership",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Invoices_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "OrdersAddresses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    IsCurrentAddress = table.Column<bool>(type: "boolean", nullable: false),
                    FullName = table.Column<string>(type: "text", nullable: true),
                    OrderId = table.Column<Guid>(type: "uuid", nullable: false),
                    PropertyNumberOrName = table.Column<string>(type: "text", nullable: true),
                    StreetName = table.Column<string>(type: "text", nullable: true),
                    Locality = table.Column<string>(type: "text", nullable: true),
                    TownOrCity = table.Column<string>(type: "text", nullable: true),
                    County = table.Column<string>(type: "text", nullable: true),
                    PostalCode = table.Column<string>(type: "text", nullable: false),
                    Country = table.Column<int>(type: "integer", nullable: false),
                    Coordinates_Latitude = table.Column<double>(type: "double precision", nullable: true),
                    Coordinates_Longitude = table.Column<double>(type: "double precision", nullable: true),
                    PafUdprn = table.Column<string>(type: "text", nullable: true),
                    What3words = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrdersAddresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OrdersAddresses_Orders_OrderId",
                        column: x => x.OrderId,
                        principalTable: "Orders",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InvoiceItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Price = table.Column<long>(type: "bigint", nullable: false),
                    VatPercentage = table.Column<long>(type: "bigint", nullable: false),
                    Vat = table.Column<long>(type: "bigint", nullable: false),
                    Total = table.Column<long>(type: "bigint", nullable: false),
                    InvoiceId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvoiceItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InvoiceItems_Invoices_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "Invoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1", "e0f83cd6-3e8a-464b-886f-4244d6870df0", "Company", "COMPANY" },
                    { "2", "d57039f3-b517-4fb9-8795-690a3bb60dad", "Customer", "CUSTOMER" },
                    { "3", "8843e7da-4ce2-413a-b0e1-ce2fdc751257", "Agency", "AGENCY" },
                    { "4", "f695bbc4-ac84-42fb-99c1-a2a272f97761", "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AcceptanceForms_OrderId",
                table: "AcceptanceForms",
                column: "OrderId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Areas_ListingId",
                table: "Areas",
                column: "ListingId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_MembershipId",
                table: "AspNetUsers",
                column: "MembershipId");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Availabilities_CompanyId",
                table: "Availabilities",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Companies_MembershipId",
                table: "Companies",
                column: "MembershipId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyContents_CompanyId",
                table: "CompanyContents",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyDescriptions_CompanyId",
                table: "CompanyDescriptions",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Contents_ListingId",
                table: "Contents",
                column: "ListingId");

            migrationBuilder.CreateIndex(
                name: "IX_DetailedDescriptions_ListingId",
                table: "DetailedDescriptions",
                column: "ListingId");

            migrationBuilder.CreateIndex(
                name: "IX_Insurances_CompanyId",
                table: "Insurances",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceItems_InvoiceId",
                table: "InvoiceItems",
                column: "InvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_MembershipId",
                table: "Invoices",
                column: "MembershipId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_OrderId",
                table: "Invoices",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Listings_CompanyReference",
                table: "Listings",
                column: "CompanyReference");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_CompanyId",
                table: "Orders",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_OrdersAddresses_OrderId",
                table: "OrdersAddresses",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Subscription_MembershipId",
                table: "Subscription",
                column: "MembershipId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AcceptanceForms");

            migrationBuilder.DropTable(
                name: "Areas");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Availabilities");

            migrationBuilder.DropTable(
                name: "CompanyContents");

            migrationBuilder.DropTable(
                name: "CompanyDescriptions");

            migrationBuilder.DropTable(
                name: "Contents");

            migrationBuilder.DropTable(
                name: "DetailedDescriptions");

            migrationBuilder.DropTable(
                name: "Insurances");

            migrationBuilder.DropTable(
                name: "InvoiceItems");

            migrationBuilder.DropTable(
                name: "OrdersAddresses");

            migrationBuilder.DropTable(
                name: "Subscription");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Listings");

            migrationBuilder.DropTable(
                name: "Invoices");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "Membership");
        }
    }
}
