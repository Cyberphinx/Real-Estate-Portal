using API.Extensions;
using API.Middleware;
using Application.OrderApplication;
using Domain;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Persistence;

namespace API
{
    public class Startup
    {
        private readonly IConfiguration _config;
        public Startup(IConfiguration config)
        {
            _config = config;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers(opt => 
            {   
                // becasue we are using Role based authorization, the below policy is canceclled
                // authorization policy
                // var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
                // opt.Filters.Add(new AuthorizeFilter(policy));
            })
                .AddFluentValidation(config => 
                {
                    // only need to specify once (ie. "Create), then it will work for the whole project/assembly
                    config.RegisterValidatorsFromAssemblyContaining<Create>(); 

                });
            services.AddApplicationServices(_config);
            services.AddIdentityServices(_config);
            // services.AddIdentityCore<AppUser>()
            //     .AddRoles<IdentityRole>()
            //     .AddEntityFrameworkStores<DataContext>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseMiddleware<ExceptionMiddleware>();
                
                // middlewares happens in order, so the ordering is important
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            }

            // ordering of below contents are essential:

            // app.UseHttpsRedirection();

            app.UseRouting();

            // DefaultFiles means that it will look for index.html inside wwwroot folder
            app.UseDefaultFiles();
            // This command by default serves static files from wwwroot folder
            app.UseStaticFiles();

            app.UseCors("CorsPolicy");

            app.UseAuthentication(); // Authentication must be before Authorization

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToController("Index", "Fallback");
            });

        }
    }
}
