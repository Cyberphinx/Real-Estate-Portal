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
                    id = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    normalized_name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    concurrency_stamp = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_asp_net_roles", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    id = table.Column<string>(type: "text", nullable: false),
                    account_type = table.Column<int>(type: "integer", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    display_name = table.Column<string>(type: "text", nullable: true),
                    user_name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    normalized_user_name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    normalized_email = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: true),
                    email_confirmed = table.Column<bool>(type: "boolean", nullable: false),
                    password_hash = table.Column<string>(type: "text", nullable: true),
                    security_stamp = table.Column<string>(type: "text", nullable: true),
                    concurrency_stamp = table.Column<string>(type: "text", nullable: true),
                    phone_number = table.Column<string>(type: "text", nullable: true),
                    phone_number_confirmed = table.Column<bool>(type: "boolean", nullable: false),
                    two_factor_enabled = table.Column<bool>(type: "boolean", nullable: false),
                    lockout_end = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    lockout_enabled = table.Column<bool>(type: "boolean", nullable: false),
                    access_failed_count = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_asp_net_users", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "jobs",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    added_on = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    finish_by = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    service_categories = table.Column<int[]>(type: "integer[]", nullable: true),
                    title = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    job_life_cycle = table.Column<int>(type: "integer", nullable: false),
                    job_location_property_number_or_name = table.Column<string>(type: "text", nullable: true),
                    job_location_street_name = table.Column<string>(type: "text", nullable: true),
                    job_location_locality = table.Column<string>(type: "text", nullable: true),
                    job_location_town_or_city = table.Column<string>(type: "text", nullable: true),
                    job_location_county = table.Column<string>(type: "text", nullable: true),
                    job_location_postal_code = table.Column<string>(type: "text", nullable: true),
                    job_location_country = table.Column<int>(type: "integer", nullable: true),
                    job_location_coordinates_latitude = table.Column<double>(type: "double precision", nullable: true),
                    job_location_coordinates_longitude = table.Column<double>(type: "double precision", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_jobs", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "membership",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    company_reference = table.Column<string>(type: "text", nullable: true),
                    contract_length = table.Column<int>(type: "integer", nullable: false),
                    member_since = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    expiry = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    price = table.Column<long>(type: "bigint", nullable: false),
                    is_active = table.Column<bool>(type: "boolean", nullable: false),
                    unit = table.Column<int>(type: "integer", nullable: false),
                    username = table.Column<string>(type: "text", nullable: true),
                    vat_percentage = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_membership", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    role_id = table.Column<string>(type: "text", nullable: false),
                    claim_type = table.Column<string>(type: "text", nullable: true),
                    claim_value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_asp_net_role_claims", x => x.id);
                    table.ForeignKey(
                        name: "fk_asp_net_role_claims_asp_net_roles_role_id",
                        column: x => x.role_id,
                        principalTable: "AspNetRoles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "app_user_review",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    app_user_id = table.Column<string>(type: "text", nullable: true),
                    reviewer_display_name = table.Column<string>(type: "text", nullable: true),
                    reviewer_username = table.Column<string>(type: "text", nullable: true),
                    reviewer_email = table.Column<string>(type: "text", nullable: true),
                    reviewer_phone = table.Column<string>(type: "text", nullable: true),
                    added_on = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    service_categories = table.Column<int[]>(type: "integer[]", nullable: true),
                    title = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    review_status = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_app_user_review", x => x.id);
                    table.ForeignKey(
                        name: "fk_app_user_review_users_app_user_id",
                        column: x => x.app_user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    user_id = table.Column<string>(type: "text", nullable: false),
                    claim_type = table.Column<string>(type: "text", nullable: true),
                    claim_value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_asp_net_user_claims", x => x.id);
                    table.ForeignKey(
                        name: "fk_asp_net_user_claims_asp_net_users_user_id",
                        column: x => x.user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    login_provider = table.Column<string>(type: "text", nullable: false),
                    provider_key = table.Column<string>(type: "text", nullable: false),
                    provider_display_name = table.Column<string>(type: "text", nullable: true),
                    user_id = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_asp_net_user_logins", x => new { x.login_provider, x.provider_key });
                    table.ForeignKey(
                        name: "fk_asp_net_user_logins_asp_net_users_user_id",
                        column: x => x.user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    user_id = table.Column<string>(type: "text", nullable: false),
                    role_id = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_asp_net_user_roles", x => new { x.user_id, x.role_id });
                    table.ForeignKey(
                        name: "fk_asp_net_user_roles_asp_net_roles_role_id",
                        column: x => x.role_id,
                        principalTable: "AspNetRoles",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_asp_net_user_roles_asp_net_users_user_id",
                        column: x => x.user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    user_id = table.Column<string>(type: "text", nullable: false),
                    login_provider = table.Column<string>(type: "text", nullable: false),
                    name = table.Column<string>(type: "text", nullable: false),
                    value = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_asp_net_user_tokens", x => new { x.user_id, x.login_provider, x.name });
                    table.ForeignKey(
                        name: "fk_asp_net_user_tokens_asp_net_users_user_id",
                        column: x => x.user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "photo",
                columns: table => new
                {
                    id = table.Column<string>(type: "text", nullable: false),
                    url = table.Column<string>(type: "text", nullable: true),
                    is_main = table.Column<bool>(type: "boolean", nullable: false),
                    app_user_id = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_photo", x => x.id);
                    table.ForeignKey(
                        name: "fk_photo_users_app_user_id",
                        column: x => x.app_user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "job_content",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    url = table.Column<string>(type: "text", nullable: true),
                    type = table.Column<int>(type: "integer", nullable: false),
                    caption = table.Column<string>(type: "text", nullable: true),
                    job_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_job_content", x => x.id);
                    table.ForeignKey(
                        name: "fk_job_content_jobs_job_id",
                        column: x => x.job_id,
                        principalTable: "jobs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "companies",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    access_status = table.Column<int>(type: "integer", nullable: false),
                    added_on = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    company_address_property_number_or_name = table.Column<string>(type: "text", nullable: true),
                    company_address_street_name = table.Column<string>(type: "text", nullable: true),
                    company_address_locality = table.Column<string>(type: "text", nullable: true),
                    company_address_town_or_city = table.Column<string>(type: "text", nullable: true),
                    company_address_county = table.Column<string>(type: "text", nullable: true),
                    company_address_postal_code = table.Column<string>(type: "text", nullable: true),
                    company_address_country = table.Column<int>(type: "integer", nullable: true),
                    company_address_coordinates_latitude = table.Column<double>(type: "double precision", nullable: true),
                    company_address_coordinates_longitude = table.Column<double>(type: "double precision", nullable: true),
                    company_contacts_email = table.Column<string>(type: "text", nullable: true),
                    company_contacts_phone = table.Column<string>(type: "text", nullable: true),
                    company_contacts_website = table.Column<string>(type: "text", nullable: true),
                    company_reference = table.Column<string>(type: "text", nullable: false),
                    company_registration_number = table.Column<string>(type: "text", nullable: true),
                    display_name = table.Column<string>(type: "text", nullable: true),
                    last_modified = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    legal_name = table.Column<string>(type: "text", nullable: true),
                    membership_id = table.Column<Guid>(type: "uuid", nullable: true),
                    redress_schemes = table.Column<int[]>(type: "integer[]", nullable: true),
                    service_locations = table.Column<string>(type: "text", nullable: true),
                    summary_description = table.Column<string>(type: "text", nullable: true),
                    service_categories = table.Column<int[]>(type: "integer[]", nullable: true),
                    username = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_companies", x => x.id);
                    table.UniqueConstraint("ak_companies_company_reference", x => x.company_reference);
                    table.ForeignKey(
                        name: "fk_companies_membership_membership_id",
                        column: x => x.membership_id,
                        principalTable: "membership",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "invoices",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    amount = table.Column<long>(type: "bigint", nullable: false),
                    client_secret = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    invoice_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    invoice_number = table.Column<int>(type: "integer", nullable: false),
                    payment_intent_id = table.Column<string>(type: "text", nullable: true),
                    payment_status = table.Column<int>(type: "integer", nullable: false),
                    title = table.Column<string>(type: "text", nullable: true),
                    username = table.Column<string>(type: "text", nullable: true),
                    vat_percentage = table.Column<long>(type: "bigint", nullable: false),
                    membership_id = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_invoices", x => x.id);
                    table.ForeignKey(
                        name: "fk_invoices_membership_membership_id",
                        column: x => x.membership_id,
                        principalTable: "membership",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "company_content",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    url = table.Column<string>(type: "text", nullable: true),
                    type = table.Column<int>(type: "integer", nullable: false),
                    caption = table.Column<string>(type: "text", nullable: true),
                    is_main = table.Column<bool>(type: "boolean", nullable: false),
                    is_logo = table.Column<bool>(type: "boolean", nullable: false),
                    company_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_company_content", x => x.id);
                    table.ForeignKey(
                        name: "fk_company_content_companies_company_id",
                        column: x => x.company_id,
                        principalTable: "companies",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "company_description",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    heading = table.Column<string>(type: "text", nullable: true),
                    text = table.Column<string>(type: "text", nullable: true),
                    company_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_company_description", x => x.id);
                    table.ForeignKey(
                        name: "fk_company_description_companies_company_id",
                        column: x => x.company_id,
                        principalTable: "companies",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "company_review",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    company_id = table.Column<Guid>(type: "uuid", nullable: true),
                    reviewer_display_name = table.Column<string>(type: "text", nullable: true),
                    reviewer_username = table.Column<string>(type: "text", nullable: true),
                    reviewer_email = table.Column<string>(type: "text", nullable: true),
                    reviewer_phone = table.Column<string>(type: "text", nullable: true),
                    added_on = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    service_categories = table.Column<int[]>(type: "integer[]", nullable: true),
                    title = table.Column<string>(type: "text", nullable: true),
                    description = table.Column<string>(type: "text", nullable: true),
                    review_status = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_company_review", x => x.id);
                    table.ForeignKey(
                        name: "fk_company_review_companies_company_id",
                        column: x => x.company_id,
                        principalTable: "companies",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "insurance",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    type = table.Column<int>(type: "integer", nullable: false),
                    provider = table.Column<string>(type: "text", nullable: true),
                    policy_number = table.Column<string>(type: "text", nullable: true),
                    indemnity_limit = table.Column<string>(type: "text", nullable: true),
                    expiry = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    company_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_insurance", x => x.id);
                    table.ForeignKey(
                        name: "fk_insurance_companies_company_id",
                        column: x => x.company_id,
                        principalTable: "companies",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "listings",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    accessibility = table.Column<bool>(type: "boolean", nullable: false),
                    added_on = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    administration_fees = table.Column<string>(type: "text", nullable: true),
                    annual_business_rates = table.Column<double>(type: "double precision", nullable: false),
                    access_status = table.Column<int>(type: "integer", nullable: false),
                    available_bedrooms = table.Column<int>(type: "integer", nullable: false),
                    available_from_date = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    basement = table.Column<bool>(type: "boolean", nullable: false),
                    bathrooms = table.Column<int>(type: "integer", nullable: false),
                    bills_included = table.Column<int[]>(type: "integer[]", nullable: true),
                    burglar_alarm = table.Column<bool>(type: "boolean", nullable: false),
                    business_for_sale = table.Column<bool>(type: "boolean", nullable: false),
                    buyer_incentives = table.Column<int[]>(type: "integer[]", nullable: true),
                    company_reference = table.Column<string>(type: "text", nullable: true),
                    category = table.Column<int>(type: "integer", nullable: false),
                    central_heating = table.Column<int>(type: "integer", nullable: false),
                    chain_free = table.Column<bool>(type: "boolean", nullable: false),
                    commercial_use_class = table.Column<List<string>>(type: "text[]", nullable: true),
                    connected_utilities = table.Column<int[]>(type: "integer[]", nullable: true),
                    conservatory = table.Column<bool>(type: "boolean", nullable: false),
                    construction_year = table.Column<int>(type: "integer", nullable: false),
                    cooker_type = table.Column<int>(type: "integer", nullable: false),
                    council_tax_band = table.Column<int>(type: "integer", nullable: false),
                    decorative_condition = table.Column<int>(type: "integer", nullable: false),
                    deposit = table.Column<double>(type: "double precision", nullable: false),
                    double_glazing = table.Column<bool>(type: "boolean", nullable: false),
                    epc_ratings_eer_current_rating = table.Column<int>(type: "integer", nullable: true),
                    epc_ratings_eer_potential_rating = table.Column<int>(type: "integer", nullable: true),
                    epc_ratings_eir_current_rating = table.Column<int>(type: "integer", nullable: true),
                    epc_ratings_eir_potential_rating = table.Column<int>(type: "integer", nullable: true),
                    feature_property = table.Column<bool>(type: "boolean", nullable: false),
                    feature_list = table.Column<List<string>>(type: "text[]", nullable: true),
                    fireplace = table.Column<bool>(type: "boolean", nullable: false),
                    fishing_rights = table.Column<bool>(type: "boolean", nullable: false),
                    floor_levels = table.Column<List<int>>(type: "integer[]", nullable: true),
                    floors = table.Column<int>(type: "integer", nullable: false),
                    furnished_state = table.Column<int>(type: "integer", nullable: false),
                    freezer = table.Column<bool>(type: "boolean", nullable: false),
                    fridge = table.Column<bool>(type: "boolean", nullable: false),
                    ground_rent = table.Column<double>(type: "double precision", nullable: false),
                    gym = table.Column<bool>(type: "boolean", nullable: false),
                    lease_expiry_expiry_date = table.Column<string>(type: "text", nullable: true),
                    lease_expiry_years_remaining = table.Column<int>(type: "integer", nullable: true),
                    life_cycle_status = table.Column<int>(type: "integer", nullable: false),
                    listed_building_grade = table.Column<int>(type: "integer", nullable: false),
                    listing_reference = table.Column<string>(type: "text", nullable: true),
                    listing_location_property_number_or_name = table.Column<string>(type: "text", nullable: true),
                    listing_location_street_name = table.Column<string>(type: "text", nullable: true),
                    listing_location_locality = table.Column<string>(type: "text", nullable: true),
                    listing_location_town_or_city = table.Column<string>(type: "text", nullable: true),
                    listing_location_county = table.Column<string>(type: "text", nullable: true),
                    listing_location_postal_code = table.Column<string>(type: "text", nullable: true),
                    listing_location_country = table.Column<int>(type: "integer", nullable: true),
                    listing_location_coordinates_latitude = table.Column<double>(type: "double precision", nullable: true),
                    listing_location_coordinates_longitude = table.Column<double>(type: "double precision", nullable: true),
                    living_rooms = table.Column<int>(type: "integer", nullable: false),
                    loft = table.Column<bool>(type: "boolean", nullable: false),
                    minimum_contract_length_minimum_length = table.Column<int>(type: "integer", nullable: true),
                    minimum_contract_length_units = table.Column<int>(type: "integer", nullable: true),
                    new_build = table.Column<bool>(type: "boolean", nullable: false),
                    open_day = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    outbuildings = table.Column<bool>(type: "boolean", nullable: false),
                    outside_spaces = table.Column<int[]>(type: "integer[]", nullable: true),
                    parking = table.Column<int[]>(type: "integer[]", nullable: true),
                    pets_allowed = table.Column<bool>(type: "boolean", nullable: false),
                    porter_security = table.Column<bool>(type: "boolean", nullable: false),
                    pricing_transaction_type = table.Column<int>(type: "integer", nullable: true),
                    pricing_currency = table.Column<int>(type: "integer", nullable: true),
                    pricing_price = table.Column<double>(type: "double precision", nullable: true),
                    pricing_price_per_unit_area_price = table.Column<double>(type: "double precision", nullable: true),
                    pricing_price_per_unit_area_units = table.Column<int>(type: "integer", nullable: true),
                    pricing_rent_frequency = table.Column<int>(type: "integer", nullable: true),
                    pricing_price_qualifier = table.Column<int>(type: "integer", nullable: true),
                    pricing_auction = table.Column<bool>(type: "boolean", nullable: true),
                    property_type = table.Column<int>(type: "integer", nullable: false),
                    rateable_value = table.Column<int>(type: "integer", nullable: false),
                    rental_term = table.Column<int>(type: "integer", nullable: false),
                    repossession = table.Column<bool>(type: "boolean", nullable: false),
                    retirement = table.Column<bool>(type: "boolean", nullable: false),
                    sap_rating = table.Column<int>(type: "integer", nullable: false),
                    service_charge_charge = table.Column<double>(type: "double precision", nullable: true),
                    service_charge_per_unit_area_units = table.Column<int>(type: "integer", nullable: true),
                    service_charge_frequency = table.Column<int>(type: "integer", nullable: true),
                    serviced = table.Column<bool>(type: "boolean", nullable: false),
                    shared_accommodation = table.Column<bool>(type: "boolean", nullable: false),
                    summary_description = table.Column<string>(type: "text", nullable: true),
                    swimming_pool = table.Column<bool>(type: "boolean", nullable: false),
                    tenanted = table.Column<bool>(type: "boolean", nullable: false),
                    tenant_eligibility_dss = table.Column<int>(type: "integer", nullable: true),
                    tenant_eligibility_students = table.Column<int>(type: "integer", nullable: true),
                    tennis_court = table.Column<bool>(type: "boolean", nullable: false),
                    tenure = table.Column<int>(type: "integer", nullable: false),
                    total_bedrooms = table.Column<int>(type: "integer", nullable: false),
                    utility_room = table.Column<bool>(type: "boolean", nullable: false),
                    water_front = table.Column<bool>(type: "boolean", nullable: false),
                    wood_floors = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_listings", x => x.id);
                    table.ForeignKey(
                        name: "fk_listings_companies_company_id",
                        column: x => x.company_reference,
                        principalTable: "companies",
                        principalColumn: "company_reference");
                });

            migrationBuilder.CreateTable(
                name: "invoice_item",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    amount = table.Column<long>(type: "bigint", nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    invoice_id = table.Column<Guid>(type: "uuid", nullable: false),
                    title = table.Column<string>(type: "text", nullable: true),
                    vat_percentage = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_invoice_item", x => x.id);
                    table.ForeignKey(
                        name: "fk_invoice_item_invoices_invoice_id",
                        column: x => x.invoice_id,
                        principalTable: "invoices",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "job_network",
                columns: table => new
                {
                    app_user_id = table.Column<string>(type: "text", nullable: false),
                    job_id = table.Column<Guid>(type: "uuid", nullable: false),
                    invoice_id = table.Column<Guid>(type: "uuid", nullable: true),
                    role = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_job_network", x => new { x.app_user_id, x.job_id });
                    table.ForeignKey(
                        name: "fk_job_network_invoices_invoice_id",
                        column: x => x.invoice_id,
                        principalTable: "invoices",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "fk_job_network_jobs_job_id",
                        column: x => x.job_id,
                        principalTable: "jobs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "fk_job_network_users_app_user_id",
                        column: x => x.app_user_id,
                        principalTable: "AspNetUsers",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "areas",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    external_value = table.Column<double>(type: "double precision", nullable: true),
                    external_units = table.Column<int>(type: "integer", nullable: true),
                    internal_value = table.Column<double>(type: "double precision", nullable: true),
                    internal_units = table.Column<int>(type: "integer", nullable: true),
                    listing_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_areas", x => x.id);
                    table.ForeignKey(
                        name: "fk_areas_listings_listing_id",
                        column: x => x.listing_id,
                        principalTable: "listings",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "content",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    url = table.Column<string>(type: "text", nullable: true),
                    type = table.Column<int>(type: "integer", nullable: false),
                    caption = table.Column<string>(type: "text", nullable: true),
                    is_main = table.Column<bool>(type: "boolean", nullable: false),
                    listing_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_content", x => x.id);
                    table.ForeignKey(
                        name: "fk_content_listings_listing_id",
                        column: x => x.listing_id,
                        principalTable: "listings",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "detailed_description",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    heading = table.Column<string>(type: "text", nullable: true),
                    dimensions_length = table.Column<double>(type: "double precision", nullable: true),
                    dimensions_width = table.Column<double>(type: "double precision", nullable: true),
                    dimensions_unit = table.Column<int>(type: "integer", nullable: true),
                    text = table.Column<string>(type: "text", nullable: true),
                    listing_id = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_detailed_description", x => x.id);
                    table.ForeignKey(
                        name: "fk_detailed_description_listings_listing_id",
                        column: x => x.listing_id,
                        principalTable: "listings",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "id", "concurrency_stamp", "name", "normalized_name" },
                values: new object[,]
                {
                    { "1", "0ad36e38-fd90-4199-83dc-8eb97006f886", "Company", "COMPANY" },
                    { "2", "c3a9f921-76a6-4f4e-8a85-2d99dd4a7831", "Customer", "CUSTOMER" },
                    { "3", "64af608a-bc64-40c2-8479-b5a4e9bb3308", "Agency", "AGENCY" },
                    { "4", "345eca16-0ebc-4d3d-b0fe-5877da1eeb57", "Admin", "ADMIN" }
                });

            migrationBuilder.CreateIndex(
                name: "ix_app_user_review_app_user_id",
                table: "app_user_review",
                column: "app_user_id");

            migrationBuilder.CreateIndex(
                name: "ix_areas_listing_id",
                table: "areas",
                column: "listing_id",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_asp_net_role_claims_role_id",
                table: "AspNetRoleClaims",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "normalized_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_asp_net_user_claims_user_id",
                table: "AspNetUserClaims",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_asp_net_user_logins_user_id",
                table: "AspNetUserLogins",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "ix_asp_net_user_roles_role_id",
                table: "AspNetUserRoles",
                column: "role_id");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "normalized_email");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "normalized_user_name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_companies_membership_id",
                table: "companies",
                column: "membership_id");

            migrationBuilder.CreateIndex(
                name: "ix_company_content_company_id",
                table: "company_content",
                column: "company_id");

            migrationBuilder.CreateIndex(
                name: "ix_company_description_company_id",
                table: "company_description",
                column: "company_id");

            migrationBuilder.CreateIndex(
                name: "ix_company_review_company_id",
                table: "company_review",
                column: "company_id");

            migrationBuilder.CreateIndex(
                name: "ix_content_listing_id",
                table: "content",
                column: "listing_id");

            migrationBuilder.CreateIndex(
                name: "ix_detailed_description_listing_id",
                table: "detailed_description",
                column: "listing_id");

            migrationBuilder.CreateIndex(
                name: "ix_insurance_company_id",
                table: "insurance",
                column: "company_id");

            migrationBuilder.CreateIndex(
                name: "ix_invoice_item_invoice_id",
                table: "invoice_item",
                column: "invoice_id");

            migrationBuilder.CreateIndex(
                name: "ix_invoices_membership_id",
                table: "invoices",
                column: "membership_id");

            migrationBuilder.CreateIndex(
                name: "ix_job_content_job_id",
                table: "job_content",
                column: "job_id");

            migrationBuilder.CreateIndex(
                name: "ix_job_network_invoice_id",
                table: "job_network",
                column: "invoice_id");

            migrationBuilder.CreateIndex(
                name: "ix_job_network_job_id",
                table: "job_network",
                column: "job_id");

            migrationBuilder.CreateIndex(
                name: "ix_listings_company_reference",
                table: "listings",
                column: "company_reference");

            migrationBuilder.CreateIndex(
                name: "ix_photo_app_user_id",
                table: "photo",
                column: "app_user_id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "app_user_review");

            migrationBuilder.DropTable(
                name: "areas");

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
                name: "company_content");

            migrationBuilder.DropTable(
                name: "company_description");

            migrationBuilder.DropTable(
                name: "company_review");

            migrationBuilder.DropTable(
                name: "content");

            migrationBuilder.DropTable(
                name: "detailed_description");

            migrationBuilder.DropTable(
                name: "insurance");

            migrationBuilder.DropTable(
                name: "invoice_item");

            migrationBuilder.DropTable(
                name: "job_content");

            migrationBuilder.DropTable(
                name: "job_network");

            migrationBuilder.DropTable(
                name: "photo");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "listings");

            migrationBuilder.DropTable(
                name: "invoices");

            migrationBuilder.DropTable(
                name: "jobs");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "companies");

            migrationBuilder.DropTable(
                name: "membership");
        }
    }
}
