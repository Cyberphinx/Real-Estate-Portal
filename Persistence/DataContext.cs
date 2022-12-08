using Domain;
using Domain.CompanyAggregate;
using Domain.InvoiceAggregate;
using Domain.ListingAggregate;
using Domain.ListingAggregate.Enums;
using Domain.ListingAggregate.Objects;
using Domain.OrderAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
        // Listing DbSets
        public DbSet<Listing> Listings { get; set; }
        public DbSet<Content> Contents { get; set; }
        public DbSet<DetailedDescription> DetailedDescriptions { get; set; }

        // Company or Agent Branch DbSets
        public DbSet<Company> Companies { get; set; }
        public DbSet<CompanyContent> CompanyContents { get; set; }
        public DbSet<CompanyDescription> CompanyDescriptions { get; set; }
        public DbSet<Availability> Availabilities { get; set; }
        public DbSet<Insurance> Insurances { get; set; }

        // Order DbSets
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderAddress> OrdersAddresses { get; set; }
        public DbSet<AcceptanceForm> AcceptanceForms { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceItem> InvoiceItems { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.HasPostgresEnum<PropertyType>();

            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole {Id = "1", Name = "Company", NormalizedName = "COMPANY" },
                    new IdentityRole {Id = "2", Name = "Customer", NormalizedName = "CUSTOMER" },
                    new IdentityRole {Id = "3", Name = "Agency", NormalizedName = "AGENCY" },
                    new IdentityRole {Id = "4", Name = "Admin", NormalizedName = "ADMIN" }
                );

            builder.Entity<Order>()
                .HasOne(x => x.Company)
                .WithMany(x => x.Orders)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Listing>()
                .HasOne(x => x.Company)
                .WithMany(x => x.Listings)
                .HasForeignKey(x => x.CompanyReference)
                .HasPrincipalKey(x => x.CompanyReference);
            
        }

    }
}