﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:Enum:property_type", "not_specified,terraced_house,end_of_terrace_house,semi_detached_house,detached_house,mews,cluster_house,ground_flat,flat,studio,ground_maisonette,maisonette,bungalow,terraced_bungalow,end_of_terrace_bungalow,semi_detached_bungalow,detached_bungalow,mobile_home,commercial_property,land,link_detached_house,town_house,cottage,chalet,character_property,house,villa,apartment,penthouse,finca,barn_conversion,serviced_apartments,parking,sheltered_housing,retirement_property,house_share,flat_share,park_home,garages,farm_house,equestrian_facility,duplex,triplex,longere,gite,barn,unconverted_barn,trulli,mill,commercial_mill,ruins,restaurant,cafe,castle,village_house,cave_house,cortijo,farm_land,plot,country_house,stone_house,caravan,lodge,log_cabin,manor_house,stately_home,off_plan,semi_detached_villa,detached_villa,bar_night_club,shop,riad,house_boat,hotel_room,block_of_apartments,private_halls,office,business_park,serviced_office,retail_property_high_street,retail_property_out_of_town,convenience_store,garage,hairdresser_barber_shop,petrol_station,post_office,pub,workshop_and_retail_space,distribution_warehouse,factory,heavy_industrial,industrial_park,light_industrial,storage,showroom,warehouse,commercial_land,commercial_development,industrial_development,residential_development,data_centre,farm,healthcare_facility,marine_property,mixed_use,research_and_development_facility,science_park,guest_house,hospitality,leisure_facility,takeaway,childcare_facility,smallholding,place_of_worship,trade_counter,coach_house");

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
                    AddedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    DisplayName = table.Column<string>(type: "text", nullable: true),
                    NewEmail = table.Column<string>(type: "text", nullable: true),
                    Country = table.Column<string>(type: "text", nullable: true),
                    Language = table.Column<string>(type: "text", nullable: true),
                    LastModified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
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
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AccessStatus = table.Column<int>(type: "integer", nullable: false),
                    AddedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CompanyReference = table.Column<string>(type: "text", nullable: true),
                    CompanyRegistrationNumber = table.Column<string>(type: "text", nullable: true),
                    CompanyType = table.Column<string>(type: "text", nullable: true),
                    DisplayName = table.Column<string>(type: "text", nullable: true),
                    IcoRegistrationNumber = table.Column<string>(type: "text", nullable: true),
                    IsMain = table.Column<bool>(type: "boolean", nullable: false),
                    LastModified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LegalName = table.Column<string>(type: "text", nullable: true),
                    RedressScheme = table.Column<string>(type: "text", nullable: true),
                    ServiceLocations = table.Column<string>(type: "text", nullable: true),
                    SummaryDescription = table.Column<string>(type: "text", nullable: true),
                    ServiceCategories = table.Column<List<string>>(type: "text[]", nullable: true),
                    TermsAndConditions = table.Column<string>(type: "text", nullable: true),
                    Username = table.Column<string>(type: "text", nullable: true),
                    VatNumber = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EventDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    EventDescription = table.Column<string>(type: "text", nullable: true),
                    Username = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Injections",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AddedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Agency = table.Column<string>(type: "text", nullable: true),
                    SpiderTag = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Injections", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Jobs",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CustomerName = table.Column<string>(type: "text", nullable: true),
                    CustomerEmail = table.Column<string>(type: "text", nullable: true),
                    CustomerPhone = table.Column<string>(type: "text", nullable: true),
                    CustomerImage = table.Column<string>(type: "text", nullable: true),
                    AddedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    FinishBy = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ServiceCategories = table.Column<List<string>>(type: "text[]", nullable: true),
                    Title = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    JobReference = table.Column<string>(type: "text", nullable: true),
                    JobLifeCycle = table.Column<int>(type: "integer", nullable: false),
                    LastModified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Bedrooms = table.Column<int>(type: "integer", nullable: false),
                    Bathrooms = table.Column<int>(type: "integer", nullable: false),
                    PropertyType = table.Column<string>(type: "text", nullable: true),
                    Commercial = table.Column<bool>(type: "boolean", nullable: false),
                    DeclaredlValue = table.Column<string>(type: "text", nullable: true),
                    StorageRequired = table.Column<bool>(type: "boolean", nullable: false),
                    StorageValue = table.Column<string>(type: "text", nullable: true),
                    PackingRequired = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Jobs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TrackingData",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    App = table.Column<string>(type: "text", nullable: true),
                    Component = table.Column<string>(type: "text", nullable: true),
                    Event = table.Column<string>(type: "text", nullable: true),
                    Count = table.Column<string>(type: "text", nullable: true),
                    JobId = table.Column<string>(type: "text", nullable: true),
                    CompanyId = table.Column<string>(type: "text", nullable: true),
                    ListingId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrackingData", x => x.Id);
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
                name: "AppUserMedia",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    AppUserId = table.Column<string>(type: "text", nullable: true),
                    Index = table.Column<int>(type: "integer", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true),
                    CopyFromUrl = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Caption = table.Column<string>(type: "text", nullable: true),
                    IsMain = table.Column<bool>(type: "boolean", nullable: false),
                    IsLogo = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserMedia", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppUserMedia_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AppUserReview",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AppUserId = table.Column<string>(type: "text", nullable: true),
                    ReviewerDisplayName = table.Column<string>(type: "text", nullable: true),
                    ReviewerUsername = table.Column<string>(type: "text", nullable: true),
                    ReviewerEmail = table.Column<string>(type: "text", nullable: true),
                    ReviewerPhone = table.Column<string>(type: "text", nullable: true),
                    AddedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ServiceCategories = table.Column<List<string>>(type: "text[]", nullable: true),
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
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                name: "Membership",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Expiry = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    MemberSince = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    AppUserId = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Membership", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Membership_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "RefreshToken",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppUserId = table.Column<string>(type: "text", nullable: true),
                    Token = table.Column<string>(type: "text", nullable: true),
                    Expires = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Revoked = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshToken", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshToken_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserInvoices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AppUserId = table.Column<string>(type: "text", nullable: true),
                    Amount = table.Column<long>(type: "bigint", nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    InvoiceDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Index = table.Column<int>(type: "integer", nullable: false),
                    IsQuotation = table.Column<bool>(type: "boolean", nullable: false),
                    PaymentStatus = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: true),
                    VatPercentage = table.Column<long>(type: "bigint", nullable: false),
                    PaymentIntentId = table.Column<string>(type: "text", nullable: true),
                    ClientSecret = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserInvoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserInvoices_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CompanyAddress",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    DisplayAddress = table.Column<string>(type: "text", nullable: true),
                    PropertyNumberOrName = table.Column<string>(type: "text", nullable: true),
                    StreetName = table.Column<string>(type: "text", nullable: true),
                    Locality = table.Column<string>(type: "text", nullable: true),
                    TownOrCity = table.Column<string>(type: "text", nullable: true),
                    County = table.Column<string>(type: "text", nullable: true),
                    PostalCode = table.Column<string>(type: "text", nullable: true),
                    Country = table.Column<string>(type: "text", nullable: true),
                    Latitude = table.Column<double>(type: "double precision", nullable: false),
                    Longitude = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyAddress", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyAddress_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompanyContacts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: true),
                    Website = table.Column<string>(type: "text", nullable: true),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyContacts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyContacts_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompanyDescription",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Index = table.Column<int>(type: "integer", nullable: false),
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
                name: "CompanyMedia",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    Index = table.Column<int>(type: "integer", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true),
                    CopyFromUrl = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Caption = table.Column<string>(type: "text", nullable: true),
                    IsMain = table.Column<bool>(type: "boolean", nullable: false),
                    IsLogo = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyMedia", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyMedia_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompanyReview",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    ReviewerDisplayName = table.Column<string>(type: "text", nullable: true),
                    ReviewerUsername = table.Column<string>(type: "text", nullable: true),
                    ReviewerEmail = table.Column<string>(type: "text", nullable: true),
                    ReviewerPhone = table.Column<string>(type: "text", nullable: true),
                    AddedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    ServiceCategories = table.Column<List<string>>(type: "text[]", nullable: true),
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
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Insurance",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: true),
                    Index = table.Column<int>(type: "integer", nullable: false),
                    InsurancePolicy = table.Column<string>(type: "text", nullable: true),
                    InsuranceScheme = table.Column<string>(type: "text", nullable: true),
                    InsuranceType = table.Column<string>(type: "text", nullable: true),
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
                name: "Listings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Accessibility = table.Column<bool>(type: "boolean", nullable: false),
                    AccessStatus = table.Column<int>(type: "integer", nullable: false),
                    Acreage = table.Column<double>(type: "double precision", nullable: false),
                    Agency = table.Column<string>(type: "text", nullable: true),
                    AddedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    AdministrationFees = table.Column<string>(type: "text", nullable: true),
                    AnnualBusinessRates = table.Column<double>(type: "double precision", nullable: false),
                    AreaTotal = table.Column<double>(type: "double precision", nullable: false),
                    AreaUnits = table.Column<int>(type: "integer", nullable: false),
                    AvailableBedrooms = table.Column<int>(type: "integer", nullable: false),
                    AvailableFromDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Bathrooms = table.Column<int>(type: "integer", nullable: false),
                    BillsIncluded = table.Column<List<string>>(type: "text[]", nullable: true),
                    BusinessForSale = table.Column<bool>(type: "boolean", nullable: false),
                    BuyerIncentives = table.Column<List<string>>(type: "text[]", nullable: true),
                    Category = table.Column<int>(type: "integer", nullable: false),
                    CentralHeating = table.Column<int>(type: "integer", nullable: false),
                    ChainFree = table.Column<bool>(type: "boolean", nullable: false),
                    CommercialUseClass = table.Column<List<string>>(type: "text[]", nullable: true),
                    CommonholdDetails = table.Column<string>(type: "text", nullable: true),
                    ConnectedUtilities = table.Column<List<string>>(type: "text[]", nullable: true),
                    ConstructionYear = table.Column<int>(type: "integer", nullable: false),
                    CookerType = table.Column<int>(type: "integer", nullable: false),
                    CouncilTaxBand = table.Column<int>(type: "integer", nullable: false),
                    DecorativeCondition = table.Column<int>(type: "integer", nullable: false),
                    Deposit = table.Column<double>(type: "double precision", nullable: false),
                    EerCurrentRating = table.Column<string>(type: "text", nullable: true),
                    EerPotentialRating = table.Column<string>(type: "text", nullable: true),
                    EirCurrentRating = table.Column<string>(type: "text", nullable: true),
                    EirPotentialRating = table.Column<string>(type: "text", nullable: true),
                    FeatureProperty = table.Column<bool>(type: "boolean", nullable: false),
                    FeatureList = table.Column<List<string>>(type: "text[]", nullable: true),
                    FloorLevels = table.Column<List<string>>(type: "text[]", nullable: true),
                    Floors = table.Column<int>(type: "integer", nullable: false),
                    FurnishedState = table.Column<int>(type: "integer", nullable: false),
                    GroundRent = table.Column<double>(type: "double precision", nullable: false),
                    GroundRentReviewPeriod = table.Column<string>(type: "text", nullable: true),
                    LastModified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LeaseExpiry = table.Column<string>(type: "text", nullable: true),
                    LifeCycleStatus = table.Column<int>(type: "integer", nullable: false),
                    ListedBuilding = table.Column<bool>(type: "boolean", nullable: false),
                    ListedBuildingGrade = table.Column<int>(type: "integer", nullable: false),
                    ListingReference = table.Column<string>(type: "text", nullable: true),
                    LivingRooms = table.Column<int>(type: "integer", nullable: false),
                    MinimumContractLength = table.Column<int>(type: "integer", nullable: false),
                    MinimumContractLengthUnits = table.Column<int>(type: "integer", nullable: false),
                    NewBuild = table.Column<bool>(type: "boolean", nullable: false),
                    OpenDay = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Parking = table.Column<bool>(type: "boolean", nullable: false),
                    PetsAllowed = table.Column<bool>(type: "boolean", nullable: false),
                    PropertyType = table.Column<int>(type: "integer", nullable: false),
                    RateableValue = table.Column<int>(type: "integer", nullable: false),
                    RatesPayable = table.Column<int>(type: "integer", nullable: false),
                    RentalTerm = table.Column<int>(type: "integer", nullable: false),
                    Repossession = table.Column<bool>(type: "boolean", nullable: false),
                    Retirement = table.Column<bool>(type: "boolean", nullable: false),
                    SapRating = table.Column<string>(type: "text", nullable: true),
                    Serviced = table.Column<bool>(type: "boolean", nullable: false),
                    SourceUri = table.Column<string>(type: "text", nullable: true),
                    SharedAccommodation = table.Column<bool>(type: "boolean", nullable: false),
                    SharedOwnershipDetails = table.Column<string>(type: "text", nullable: true),
                    SmokersConsidered = table.Column<bool>(type: "boolean", nullable: false),
                    SpiderTag = table.Column<string>(type: "text", nullable: true),
                    SummaryDescription = table.Column<string>(type: "text", nullable: true),
                    Tenanted = table.Column<bool>(type: "boolean", nullable: false),
                    TenantEligibilityDss = table.Column<int>(type: "integer", nullable: false),
                    TenantEligibilityStudents = table.Column<int>(type: "integer", nullable: false),
                    Tenure = table.Column<int>(type: "integer", nullable: false),
                    TotalBedrooms = table.Column<int>(type: "integer", nullable: false),
                    WhiteGoods = table.Column<List<string>>(type: "text[]", nullable: true),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Listings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Listings_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobInvoices",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    JobId = table.Column<Guid>(type: "uuid", nullable: false),
                    SellerUsername = table.Column<string>(type: "text", nullable: true),
                    Amount = table.Column<long>(type: "bigint", nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    InvoiceDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Index = table.Column<int>(type: "integer", nullable: false),
                    IsQuotation = table.Column<bool>(type: "boolean", nullable: false),
                    PaymentStatus = table.Column<int>(type: "integer", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: true),
                    VatPercentage = table.Column<long>(type: "bigint", nullable: false),
                    PaymentIntentId = table.Column<string>(type: "text", nullable: true),
                    ClientSecret = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobInvoices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobInvoices_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobLocation",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AddressType = table.Column<string>(type: "text", nullable: true),
                    Index = table.Column<int>(type: "integer", nullable: false),
                    JobId = table.Column<Guid>(type: "uuid", nullable: false),
                    DisplayAddress = table.Column<string>(type: "text", nullable: true),
                    PropertyNumberOrName = table.Column<string>(type: "text", nullable: true),
                    StreetName = table.Column<string>(type: "text", nullable: true),
                    Locality = table.Column<string>(type: "text", nullable: true),
                    TownOrCity = table.Column<string>(type: "text", nullable: true),
                    County = table.Column<string>(type: "text", nullable: true),
                    PostalCode = table.Column<string>(type: "text", nullable: true),
                    Country = table.Column<string>(type: "text", nullable: true),
                    Latitude = table.Column<double>(type: "double precision", nullable: false),
                    Longitude = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobLocation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobLocation_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobMedia",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    JobId = table.Column<Guid>(type: "uuid", nullable: false),
                    Index = table.Column<int>(type: "integer", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true),
                    CopyFromUrl = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Caption = table.Column<string>(type: "text", nullable: true),
                    IsMain = table.Column<bool>(type: "boolean", nullable: false),
                    IsLogo = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobMedia", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobMedia_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobMessages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Body = table.Column<string>(type: "text", nullable: true),
                    AuthorId = table.Column<string>(type: "text", nullable: true),
                    JobId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobMessages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobMessages_AspNetUsers_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_JobMessages_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobNetworks",
                columns: table => new
                {
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    JobId = table.Column<Guid>(type: "uuid", nullable: false),
                    Role = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobNetworks", x => new { x.AppUserId, x.JobId });
                    table.ForeignKey(
                        name: "FK_JobNetworks_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_JobNetworks_Jobs_JobId",
                        column: x => x.JobId,
                        principalTable: "Jobs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppUserInvoiceItem",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    AppUserInvoiceId = table.Column<Guid>(type: "uuid", nullable: false),
                    Index = table.Column<int>(type: "integer", nullable: false),
                    Amount = table.Column<long>(type: "bigint", nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Title = table.Column<string>(type: "text", nullable: true),
                    VatPercentage = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserInvoiceItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppUserInvoiceItem_UserInvoices_AppUserInvoiceId",
                        column: x => x.AppUserInvoiceId,
                        principalTable: "UserInvoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ChangeLog",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    LastModified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    ListingId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChangeLog", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ChangeLog_Listings_ListingId",
                        column: x => x.ListingId,
                        principalTable: "Listings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DetailedDescription",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Index = table.Column<int>(type: "integer", nullable: false),
                    Heading = table.Column<string>(type: "text", nullable: true),
                    Text = table.Column<string>(type: "text", nullable: true),
                    Length = table.Column<double>(type: "double precision", nullable: false),
                    Width = table.Column<double>(type: "double precision", nullable: false),
                    Unit = table.Column<int>(type: "integer", nullable: false),
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

            migrationBuilder.CreateTable(
                name: "KeyContact",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Agency = table.Column<string>(type: "text", nullable: true),
                    Name = table.Column<string>(type: "text", nullable: true),
                    Phone = table.Column<string>(type: "text", nullable: true),
                    Mobile = table.Column<string>(type: "text", nullable: true),
                    Email = table.Column<string>(type: "text", nullable: true),
                    Address = table.Column<string>(type: "text", nullable: true),
                    ListingId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KeyContact", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KeyContact_Listings_ListingId",
                        column: x => x.ListingId,
                        principalTable: "Listings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ListingLocation",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    ListingId = table.Column<Guid>(type: "uuid", nullable: false),
                    DisplayAddress = table.Column<string>(type: "text", nullable: true),
                    PropertyNumberOrName = table.Column<string>(type: "text", nullable: true),
                    StreetName = table.Column<string>(type: "text", nullable: true),
                    Locality = table.Column<string>(type: "text", nullable: true),
                    TownOrCity = table.Column<string>(type: "text", nullable: true),
                    County = table.Column<string>(type: "text", nullable: true),
                    PostalCode = table.Column<string>(type: "text", nullable: true),
                    Country = table.Column<string>(type: "text", nullable: true),
                    Latitude = table.Column<double>(type: "double precision", nullable: false),
                    Longitude = table.Column<double>(type: "double precision", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListingLocation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ListingLocation_Listings_ListingId",
                        column: x => x.ListingId,
                        principalTable: "Listings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ListingMedia",
                columns: table => new
                {
                    Id = table.Column<string>(type: "text", nullable: false),
                    ListingId = table.Column<Guid>(type: "uuid", nullable: false),
                    Index = table.Column<int>(type: "integer", nullable: false),
                    Url = table.Column<string>(type: "text", nullable: true),
                    CopyFromUrl = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Caption = table.Column<string>(type: "text", nullable: true),
                    IsMain = table.Column<bool>(type: "boolean", nullable: false),
                    IsLogo = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListingMedia", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ListingMedia_Listings_ListingId",
                        column: x => x.ListingId,
                        principalTable: "Listings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ListingWatchers",
                columns: table => new
                {
                    AppUserId = table.Column<string>(type: "text", nullable: false),
                    ListingId = table.Column<Guid>(type: "uuid", nullable: false),
                    AddedOn = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ListingWatchers", x => new { x.AppUserId, x.ListingId });
                    table.ForeignKey(
                        name: "FK_ListingWatchers_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ListingWatchers_Listings_ListingId",
                        column: x => x.ListingId,
                        principalTable: "Listings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Pricing",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TransactionType = table.Column<int>(type: "integer", nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: true),
                    Price = table.Column<double>(type: "double precision", nullable: false),
                    PricePerUnitArea = table.Column<double>(type: "double precision", nullable: false),
                    RentFrequency = table.Column<int>(type: "integer", nullable: false),
                    PriceQualifier = table.Column<string>(type: "text", nullable: true),
                    Auction = table.Column<bool>(type: "boolean", nullable: false),
                    AreaUnits = table.Column<int>(type: "integer", nullable: false),
                    ListingId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pricing", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pricing_Listings_ListingId",
                        column: x => x.ListingId,
                        principalTable: "Listings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ServiceCharge",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Applicable = table.Column<bool>(type: "boolean", nullable: false),
                    Charge = table.Column<double>(type: "double precision", nullable: false),
                    PerUnitAreaUnits = table.Column<int>(type: "integer", nullable: false),
                    Frequency = table.Column<int>(type: "integer", nullable: false),
                    ReviewPeriod = table.Column<string>(type: "text", nullable: true),
                    ListingId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServiceCharge", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ServiceCharge_Listings_ListingId",
                        column: x => x.ListingId,
                        principalTable: "Listings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "JobInvoiceItem",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    JobInvoiceId = table.Column<Guid>(type: "uuid", nullable: false),
                    Index = table.Column<int>(type: "integer", nullable: false),
                    Amount = table.Column<long>(type: "bigint", nullable: false),
                    Currency = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Title = table.Column<string>(type: "text", nullable: true),
                    VatPercentage = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_JobInvoiceItem", x => x.Id);
                    table.ForeignKey(
                        name: "FK_JobInvoiceItem_JobInvoices_JobInvoiceId",
                        column: x => x.JobInvoiceId,
                        principalTable: "JobInvoices",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "1", null, "Company", "COMPANY" },
                    { "2", null, "Customer", "CUSTOMER" },
                    { "3", null, "Agency", "AGENCY" },
                    { "4", null, "Admin", "ADMIN" },
                    { "5", null, "Manager", "MANAGER" },
                    { "6", null, "Removalist", "REMOVALIST" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_AppUserInvoiceItem_AppUserInvoiceId",
                table: "AppUserInvoiceItem",
                column: "AppUserInvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_AppUserMedia_AppUserId",
                table: "AppUserMedia",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_AppUserReview_AppUserId",
                table: "AppUserReview",
                column: "AppUserId");

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
                name: "IX_ChangeLog_ListingId",
                table: "ChangeLog",
                column: "ListingId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyAddress_CompanyId",
                table: "CompanyAddress",
                column: "CompanyId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CompanyContacts_CompanyId",
                table: "CompanyContacts",
                column: "CompanyId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CompanyDescription_CompanyId",
                table: "CompanyDescription",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyMedia_CompanyId",
                table: "CompanyMedia",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyReview_CompanyId",
                table: "CompanyReview",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_DetailedDescription_ListingId",
                table: "DetailedDescription",
                column: "ListingId");

            migrationBuilder.CreateIndex(
                name: "IX_Insurance_CompanyId",
                table: "Insurance",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_JobInvoiceItem_JobInvoiceId",
                table: "JobInvoiceItem",
                column: "JobInvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_JobInvoices_JobId",
                table: "JobInvoices",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_JobLocation_JobId",
                table: "JobLocation",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_JobMedia_JobId",
                table: "JobMedia",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_JobMessages_AuthorId",
                table: "JobMessages",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_JobMessages_JobId",
                table: "JobMessages",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_JobNetworks_JobId",
                table: "JobNetworks",
                column: "JobId");

            migrationBuilder.CreateIndex(
                name: "IX_KeyContact_ListingId",
                table: "KeyContact",
                column: "ListingId");

            migrationBuilder.CreateIndex(
                name: "IX_ListingLocation_ListingId",
                table: "ListingLocation",
                column: "ListingId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ListingMedia_ListingId",
                table: "ListingMedia",
                column: "ListingId");

            migrationBuilder.CreateIndex(
                name: "IX_Listings_CompanyId",
                table: "Listings",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_ListingWatchers_ListingId",
                table: "ListingWatchers",
                column: "ListingId");

            migrationBuilder.CreateIndex(
                name: "IX_Membership_AppUserId",
                table: "Membership",
                column: "AppUserId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pricing_ListingId",
                table: "Pricing",
                column: "ListingId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RefreshToken_AppUserId",
                table: "RefreshToken",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ServiceCharge_ListingId",
                table: "ServiceCharge",
                column: "ListingId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserInvoices_AppUserId",
                table: "UserInvoices",
                column: "AppUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppUserInvoiceItem");

            migrationBuilder.DropTable(
                name: "AppUserMedia");

            migrationBuilder.DropTable(
                name: "AppUserReview");

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
                name: "ChangeLog");

            migrationBuilder.DropTable(
                name: "CompanyAddress");

            migrationBuilder.DropTable(
                name: "CompanyContacts");

            migrationBuilder.DropTable(
                name: "CompanyDescription");

            migrationBuilder.DropTable(
                name: "CompanyMedia");

            migrationBuilder.DropTable(
                name: "CompanyReview");

            migrationBuilder.DropTable(
                name: "DetailedDescription");

            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Injections");

            migrationBuilder.DropTable(
                name: "Insurance");

            migrationBuilder.DropTable(
                name: "JobInvoiceItem");

            migrationBuilder.DropTable(
                name: "JobLocation");

            migrationBuilder.DropTable(
                name: "JobMedia");

            migrationBuilder.DropTable(
                name: "JobMessages");

            migrationBuilder.DropTable(
                name: "JobNetworks");

            migrationBuilder.DropTable(
                name: "KeyContact");

            migrationBuilder.DropTable(
                name: "ListingLocation");

            migrationBuilder.DropTable(
                name: "ListingMedia");

            migrationBuilder.DropTable(
                name: "ListingWatchers");

            migrationBuilder.DropTable(
                name: "Membership");

            migrationBuilder.DropTable(
                name: "Pricing");

            migrationBuilder.DropTable(
                name: "RefreshToken");

            migrationBuilder.DropTable(
                name: "ServiceCharge");

            migrationBuilder.DropTable(
                name: "TrackingData");

            migrationBuilder.DropTable(
                name: "UserInvoices");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "JobInvoices");

            migrationBuilder.DropTable(
                name: "Listings");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Jobs");

            migrationBuilder.DropTable(
                name: "Companies");
        }
    }
}
