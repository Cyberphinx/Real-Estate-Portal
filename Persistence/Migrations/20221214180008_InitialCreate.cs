using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Persistence.Migrations
{
    public partial class InitialCreate : Migration
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
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    AccountType = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    DisplayName = table.Column<string>(type: "text", nullable: true),
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
                });

            migrationBuilder.CreateTable(
                name: "Membership",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyReference = table.Column<string>(type: "text", nullable: true),
                    ContractLength = table.Column<int>(type: "integer", nullable: false),
                    MemberSince = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Expiry = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Price = table.Column<long>(type: "bigint", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    Unit = table.Column<int>(type: "integer", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: true),
                    VatPercentage = table.Column<long>(type: "bigint", nullable: false)
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
                name: "AppUserReview",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: true),
                    ReviewerDisplayName = table.Column<string>(type: "text", nullable: true),
                    ReviewerUsername = table.Column<string>(type: "text", nullable: true),
                    ReviewerEmail = table.Column<string>(type: "text", nullable: true),
                    ReviewerPhone = table.Column<string>(type: "text", nullable: true),
                    AddedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ServiceCategories = table.Column<int[]>(type: "integer[]", nullable: true),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    ReviewStatus = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserReview", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppUserReview_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
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
                name: "Photo",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true),
                    IsMain = table.Column<bool>(type: "boolean", nullable: false),
                    AppUserId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photo_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
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
                    CompanyAddress_What3words = table.Column<string>(type: "text", nullable: true),
                    CompanyContacts_Email = table.Column<string>(type: "text", nullable: true),
                    CompanyContacts_Phone = table.Column<string>(type: "text", nullable: true),
                    CompanyContacts_Website = table.Column<string>(type: "text", nullable: true),
                    CompanyReference = table.Column<string>(type: "text", nullable: false),
                    CompanyRegistrationNumber = table.Column<string>(type: "text", nullable: true),
                    DisplayName = table.Column<string>(type: "text", nullable: true),
                    LastModified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LegalName = table.Column<string>(type: "text", nullable: true),
                    MembershipId = table.Column<Guid>(type: "uuid", nullable: true),
                    RedressScheme = table.Column<int>(type: "integer", nullable: false),
                    ServiceLocations = table.Column<string>(type: "text", nullable: true),
                    SummaryDescription = table.Column<string>(type: "text", nullable: true),
                    ServiceCategories = table.Column<int[]>(type: "integer[]", nullable: true),
                    Username = table.Column<string>(type: "text", nullable: true)
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
                name: "Invoices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Amount = table.Column<long>(type: "bigint", nullable: false),
                    ClientSecret = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    InvoiceDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    InvoiceNumber = table.Column<int>(type: "integer", nullable: false),
                    PaymentIntentId = table.Column<string>(type: "text", nullable: true),
                    PaymentStatus = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Username = table.Column<string>(type: "text", nullable: true),
                    VatPercentage = table.Column<long>(type: "bigint", nullable: false),
                    MembershipId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Invoices_Membership_MembershipId",
                        column: x => x.MembershipId,
                        principalTable: "Membership",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CompanyContent",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Url = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Caption = table.Column<string>(type: "text", nullable: true),
                    IsMain = table.Column<bool>(type: "boolean", nullable: false),
                    IsLogo = table.Column<bool>(type: "boolean", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyContent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyContent_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompanyDescription",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Heading = table.Column<string>(type: "text", nullable: true),
                    Text = table.Column<string>(type: "text", nullable: true),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyDescription", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyDescription_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompanyReview",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: true),
                    ReviewerDisplayName = table.Column<string>(type: "text", nullable: true),
                    ReviewerUsername = table.Column<string>(type: "text", nullable: true),
                    ReviewerEmail = table.Column<string>(type: "text", nullable: true),
                    ReviewerPhone = table.Column<string>(type: "text", nullable: true),
                    AddedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ServiceCategories = table.Column<int[]>(type: "integer[]", nullable: true),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    ReviewStatus = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyReview", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyReview_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Insurance",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Provider = table.Column<string>(type: "text", nullable: true),
                    PolicyNumber = table.Column<string>(type: "text", nullable: true),
                    IndemnityLimit = table.Column<string>(type: "text", nullable: true),
                    Expiry = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Insurance", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Insurance_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Jobs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AddedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FinishBy = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ServiceCategories = table.Column<int[]>(type: "integer[]", nullable: true),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    JobLifeCycle = table.Column<int>(type: "integer", nullable: false),
                    JobLocation_PropertyNumberOrName = table.Column<string>(type: "text", nullable: true),
                    JobLocation_StreetName = table.Column<string>(type: "text", nullable: true),
                    JobLocation_Locality = table.Column<string>(type: "text", nullable: true),
                    JobLocation_TownOrCity = table.Column<string>(type: "text", nullable: true),
                    JobLocation_County = table.Column<string>(type: "text", nullable: true),
                    JobLocation_PostalCode = table.Column<string>(type: "text", nullable: true),
                    JobLocation_Country = table.Column<int>(type: "integer", nullable: true),
                    JobLocation_Coordinates_Latitude = table.Column<double>(type: "double precision", nullable: true),
                    JobLocation_Coordinates_Longitude = table.Column<double>(type: "double precision", nullable: true),
                    JobLocation_What3words = table.Column<string>(type: "text", nullable: true),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jobs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Jobs_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id");
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
                name: "InvoiceItem",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Amount = table.Column<long>(type: "bigint", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    InvoiceId = table.Column<Guid>(type: "uuid", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: true),
                    VatPercentage = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvoiceItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InvoiceItem_Invoices_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "Invoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobContent",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Url = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Caption = table.Column<string>(type: "text", nullable: true),
                    JobId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobContent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobContent_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobNetwork",
                columns: table => new
                {
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    JobId = table.Column<Guid>(type: "uuid", nullable: false),
                    InvoiceId = table.Column<Guid>(type: "uuid", nullable: true),
                    Role = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobNetwork", x => new { x.AppUserId, x.JobId });
                    table.ForeignKey(
                        name: "FK_JobNetwork_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobNetwork_Invoices_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "Invoices",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_JobNetwork_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
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
                name: "Content",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Url = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Caption = table.Column<string>(type: "text", nullable: true),
                    IsMain = table.Column<bool>(type: "boolean", nullable: false),
                    ListingId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Content", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Content_Listings_ListingId",
                        column: x => x.ListingId,
                        principalTable: "Listings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetailedDescription",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Heading = table.Column<string>(type: "text", nullable: true),
                    Dimensions_Length = table.Column<double>(type: "double precision", nullable: true),
                    Dimensions_Width = table.Column<double>(type: "double precision", nullable: true),
                    Dimensions_Unit = table.Column<int>(type: "integer", nullable: true),
                    Text = table.Column<string>(type: "text", nullable: true),
                    ListingId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DetailedDescription", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DetailedDescription_Listings_ListingId",
                        column: x => x.ListingId,
                        principalTable: "Listings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1", "595fa6e1-42e0-4c4b-b1cf-142270cd240c", "Company", "COMPANY" },
                    { "2", "4407b454-1f49-48c8-9ce6-a26de9c1864b", "Customer", "CUSTOMER" },
                    { "3", "c9b1a810-4792-4a59-a48c-fd96970ea8c7", "Agency", "AGENCY" },
                    { "4", "8aa62dac-8b52-4f80-9b09-5e53c46cf3dc", "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppUserReview_AppUserId",
                table: "AppUserReview",
                column: "AppUserId");

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
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Companies_MembershipId",
                table: "Companies",
                column: "MembershipId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyContent_CompanyId",
                table: "CompanyContent",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyDescription_CompanyId",
                table: "CompanyDescription",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyReview_CompanyId",
                table: "CompanyReview",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Content_ListingId",
                table: "Content",
                column: "ListingId");

            migrationBuilder.CreateIndex(
                name: "IX_DetailedDescription_ListingId",
                table: "DetailedDescription",
                column: "ListingId");

            migrationBuilder.CreateIndex(
                name: "IX_Insurance_CompanyId",
                table: "Insurance",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_InvoiceItem_InvoiceId",
                table: "InvoiceItem",
                column: "InvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_MembershipId",
                table: "Invoices",
                column: "MembershipId");

            migrationBuilder.CreateIndex(
                name: "IX_JobContent_JobId",
                table: "JobContent",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_JobNetwork_InvoiceId",
                table: "JobNetwork",
                column: "InvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_JobNetwork_JobId",
                table: "JobNetwork",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_CompanyId",
                table: "Jobs",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Listings_CompanyReference",
                table: "Listings",
                column: "CompanyReference");

            migrationBuilder.CreateIndex(
                name: "IX_Photo_AppUserId",
                table: "Photo",
                column: "AppUserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppUserReview");

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
                name: "CompanyContent");

            migrationBuilder.DropTable(
                name: "CompanyDescription");

            migrationBuilder.DropTable(
                name: "CompanyReview");

            migrationBuilder.DropTable(
                name: "Content");

            migrationBuilder.DropTable(
                name: "DetailedDescription");

            migrationBuilder.DropTable(
                name: "Insurance");

            migrationBuilder.DropTable(
                name: "InvoiceItem");

            migrationBuilder.DropTable(
                name: "JobContent");

            migrationBuilder.DropTable(
                name: "JobNetwork");

            migrationBuilder.DropTable(
                name: "Photo");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "Listings");

            migrationBuilder.DropTable(
                name: "Invoices");

            migrationBuilder.DropTable(
                name: "Jobs");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Companies");

            migrationBuilder.DropTable(
                name: "Membership");
        }
    }
}
