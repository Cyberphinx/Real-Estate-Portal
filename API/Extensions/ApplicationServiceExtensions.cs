using System.Text.Json.Serialization;
using API.Services;
using Application.Core;
using Application.Interfaces;
using Application.ListingApplication;
using Infrastructure.Crm;
using Infrastructure.Email;
using Infrastructure.Media;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;
using FluentValidation.AspNetCore;
using FluentValidation;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        // this class just helps to clean up the Startup.cs a bit to avoid clutter
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });

            services.AddDbContext<DataContext>(options =>
            {
                var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

                string connStr;

                // Depending on if in development or production, use either FlyIO
                // connection string, or development connection string from env var.
                if (env == "Development")
                {
                    // Use connection string from file.
                    connStr = config.GetConnectionString("DefaultConnection");
                    options.UseNpgsql(connStr, p => p.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
                }
                else
                {
                    // Use connection string provided at runtime by FlyIO.
                    var connUrl = Environment.GetEnvironmentVariable("DATABASE_URL");

                    // Parse connection URL to connection string for Npgsql
                    connUrl = connUrl.Replace("postgres://", string.Empty);
                    var pgUserPass = connUrl.Split("@")[0];
                    var pgHostPortDb = connUrl.Split("@")[1];
                    var pgHostPort = pgHostPortDb.Split("/")[0];
                    var pgDb = pgHostPortDb.Split("/")[1];
                    var pgUser = pgUserPass.Split(":")[0];
                    var pgPass = pgUserPass.Split(":")[1];
                    var pgHost = pgHostPort.Split(":")[0];
                    var pgPort = pgHostPort.Split(":")[1];

                    connStr = $"Server={pgHost};Port={pgPort};User Id={pgUser};Password={pgPass};Database={pgDb};";
                }

                // Whether the connection string came from the local development configuration file
                // or from the environment variable from FlyIO, use it to set up your DbContext.
                options.UseNpgsql(connStr, p => p.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery));
            });


            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithExposedHeaders("WWW-Authenticate", "Pagination")
                    .WithOrigins("https://localhost:3000", "http://localhost:3000");
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("https://locationiq.org");
                });
            });

            services.AddMediatR(typeof(List.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();
            services.AddScoped<IMediaAccessor, MediaAccessor>();
            services.AddScoped<IListingAccessor, ListingAccessor>();
            services.AddScoped<IJobAccessor, JobAccessor>();
            services.AddScoped<ICompanyAccessor, CompanyAccessor>();
            services.AddScoped<PaymentService>();
            services.AddScoped<EmailService>();
            services.AddScoped<ContactsService>();
            services.AddScoped<AttributesService>();
            services.AddSignalR();
            services.AddControllers().AddJsonOptions(opt =>
            {
                opt.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
            });
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));

            return services;
        }
    }
}