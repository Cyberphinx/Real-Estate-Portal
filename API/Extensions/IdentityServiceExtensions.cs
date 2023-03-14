using System.Text;
using API.Services;
using Domain.AppUserAggregate;
using Infrastructure.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt => 
            {
                opt.Password.RequireNonAlphanumeric = false;
                // opt.User.RequireUniqueEmail = true;
                opt.SignIn.RequireConfirmedEmail = true;
            })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<AppUser>>()
            .AddDefaultTokenProviders();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])); // this needs to be the same as the one in the token service

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt => 
                {
                    opt.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = key,
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    };

                    // authenticate by passing query strings to signalR hub
                    opt.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"];
                            var path = context.HttpContext.Request.Path;
                            if (!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/chat")))
                            {
                                context.Token = accessToken;
                            }
                            return Task.CompletedTask;
                        }
                    };
                });
            
            services.AddAuthorization(opt => 
            {
                opt.AddPolicy("IsCompanyOwner", policy =>
                {
                    policy.Requirements.Add(new IsCompanyOwner());
                });
                opt.AddPolicy("IsListingOwner", policy =>
                {
                    policy.Requirements.Add(new IsListingOwner());
                });
                opt.AddPolicy("IsJobOwner", policy =>
                {
                    policy.Requirements.Add(new IsJobOwner());
                });
                opt.AddPolicy("IsOwner", policy =>
                {
                    policy.Requirements.Add(new IsOwner());
                });
                opt.AddPolicy("IsJobInvoiceCustomer", policy =>
                {
                    policy.Requirements.Add(new IsJobInvoiceCustomer());
                });
                opt.AddPolicy("IsJobInvoiceSeller", policy =>
                {
                    policy.Requirements.Add(new IsJobInvoiceSeller());
                });
                opt.AddPolicy("LeadsAccess", policy =>
                {
                    policy.Requirements.Add(new LeadsAccess());
                });
            });
            services.AddTransient<IAuthorizationHandler, IsCompanyOwnerHandler>();
            services.AddTransient<IAuthorizationHandler, IsListingOwnerHandler>();
            services.AddTransient<IAuthorizationHandler, IsJobOwnerHandler>();
            services.AddTransient<IAuthorizationHandler, IsOwnerHandler>();
            services.AddTransient<IAuthorizationHandler, IsJobInvoiceCustomerHandler>();
            services.AddTransient<IAuthorizationHandler, IsJobInvoiceSellerHandler>();
            services.AddTransient<IAuthorizationHandler, LeadsAccessHandler>();


            services.AddScoped<TokenService>();

            return services;
        }
    }
}