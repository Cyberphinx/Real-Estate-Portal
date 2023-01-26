using Domain;
using Domain.CompanyAggregate;
using Domain.JobAggregate;
using Domain.ListingAggregate;
using Domain.ListingAggregate.Enums;
using Domain.AppUserAggregate;
using Domain.JobAggregate.Objects;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Domain.TrackingAggregate;
using Domain.AppUserAggregate.Objects;
using Domain.MediaAggregate;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Listing> Listings { get; set; }
        public DbSet<ListingWatcher> ListingWatchers { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<JobNetwork> JobNetworks { get; set; }
        public DbSet<JobMessage> JobMessages { get; set; }
        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<Tracking> TrackingData { get; set; }
        public DbSet<Media> Media { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // fluent configuration of entity relationships:

            builder.HasPostgresEnum<PropertyType>();

            builder.Entity<IdentityRole>()
                .HasData(
                    new IdentityRole { Id = "1", Name = "Company", NormalizedName = "COMPANY" },
                    new IdentityRole { Id = "2", Name = "Customer", NormalizedName = "CUSTOMER" },
                    new IdentityRole { Id = "3", Name = "Agency", NormalizedName = "AGENCY" },
                    new IdentityRole { Id = "4", Name = "Admin", NormalizedName = "ADMIN" }
                );

            // Many to many relationship between Job and AppUser (ie. Network)
            builder.Entity<JobNetwork>(x => x.HasKey(x => new { x.AppUserId, x.JobId }));

            builder.Entity<JobNetwork>()
                .HasOne(x => x.AppUser)
                .WithMany(x => x.Jobs)
                .HasForeignKey(x => x.AppUserId);

            builder.Entity<JobNetwork>()
                .HasOne(x => x.Job)
                .WithMany(x => x.Networks)
                .HasForeignKey(x => x.JobId);


            // Many to many relationship between Listings and AppUser (ie. Watcher)
            builder.Entity<ListingWatcher>(x => x.HasKey(x => new { x.AppUserId, x.ListingId }));

            builder.Entity<ListingWatcher>()
                .HasOne(x => x.AppUser)
                .WithMany(x => x.SavedListings)
                .HasForeignKey(x => x.AppUserId);

            builder.Entity<ListingWatcher>()
                .HasOne(x => x.Listing)
                .WithMany(x => x.Watchers)
                .HasForeignKey(x => x.ListingId);


            // Cascade delete for all AppUser's children
            builder.Entity<Membership>()
                .HasOne(x => x.AppUser)
                .WithOne(x => x.Membership)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Invoice>()
                .HasOne(x => x.AppUser)
                .WithMany(x => x.Invoices)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<AppUserReview>()
                .HasOne(x => x.AppUser)
                .WithMany(x => x.Reviews)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<RefreshToken>()
                .HasOne(x => x.AppUser)
                .WithMany(x => x.RefreshTokens)
                .OnDelete(DeleteBehavior.Cascade);

            // Cascade delete messages associated with the job
            builder.Entity<JobMessage>()
                .HasOne(j => j.Job)
                .WithMany(m => m.Messages)
                .OnDelete(DeleteBehavior.Cascade);

            // Restrict delete messages associated with the AppUser 
            // (just replace with "Deleted user" in the username of the deleted AppUser, but still keeps their comments)
            builder.Entity<JobMessage>()
                .HasOne(a => a.Author)
                .WithMany()
                .OnDelete(DeleteBehavior.Restrict);

            // configure cascade delete Media from all of their parents
            builder.Entity<AppUser>()
                .HasMany(x => x.Photos)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Job>()
                .HasMany(x => x.JobMedia)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<Company>()
                .HasMany(x => x.CompanyMedia)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Listing>()
                .HasMany(x => x.ListingMedia)
                .WithOne()
                .OnDelete(DeleteBehavior.Cascade);
        }

    }
}