using API.Extensions;
using API.Middleware;
using API.SignalR;
using Application.ListingApplication;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authorization;

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
            
            services.AddControllers();
            services.AddApplicationServices(_config);
            services.AddIdentityServices(_config);
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
            else
            {
                app.Use(async (context, next) =>
                {
                    context.Response.Headers.Add("Strict-Transport-Security", "max-age=31536000");
                    await next.Invoke();
                });
            }

            // Security Header:  X-Content-Type-Options: this header prevents the MIME sniffing of the contents
            app.UseXContentTypeOptions();
            // Security Header:  Referrer-Policy: this header controls how much info the brower includes when navigating away from our app
            app.UseReferrerPolicy(opt => opt.NoReferrer());
            // Security Header: Content-Security-Policy: this header adds the cross-site scripting protrection header
            app.UseXXssProtection(opt => opt.EnabledWithBlockMode());
            // Security Header: X-Frame-Options: this prevents the application to be used inside an iFrame, which protects against click-jacking
            app.UseXfo(opt => opt.Deny());
            // Security Header: Our main defence against cross-site scripting attacks, as it allows us to white-source approved contents
            app.UseCsp(opt => opt
                .BlockAllMixedContent() // no mixes of http and https
                .StyleSources(s => s.Self().CustomSources(
                    "https://fonts.googleapis.com/",
                    "https://unpkg.com/leaflet@1.8.0/dist/leaflet.css",
                    "https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.79.0/dist/L.Control.Locate.min.css",
                    "https://unpkg.com/leaflet-geosearch@3.0.0/dist/geosearch.css"
                    )
                    .UnsafeInline())
                .FontSources(s => s.Self().CustomSources("https://fonts.googleapis.com/"))
                .FormActions(s => s.Self())
                .FrameAncestors(s => s.Self())
                .ImageSources(s => s.Self().CustomSources(
                    "data:",
                    "blob:",
                    "https://a-tiles.locationiq.com",
                    "https://b-tiles.locationiq.com",
                    "https://c-tiles.locationiq.com",
                    "https://unpkg.com/leaflet@1.8.0/",
                    "https://picsum.photos/",
                    "https://i.picsum.photos",
                    "https://res.cloudinary.com"
                    ))
                .ScriptSources(s => s.Self().CustomSources(
                    "https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.79.0/dist/L.Control.Locate.min.js",
                    "https://unpkg.com/leaflet-geosearch@3.0.0/dist/geosearch.umd.js",
                    "https://js.stripe.com/v3",
                    "https://cdn.jsdelivr.net/npm/leaflet.locatecontrol@0.79.0/dist/L.Control.Locate.min.js",
                    "https://unpkg.com/leaflet-geosearch@3.0.0/dist/geosearch.umd.js",
                    "Stripe.js"
                    ))
            );

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
                endpoints.MapHub<ChatHub>("/chat");
                endpoints.MapFallbackToController("Index", "Fallback");
            });

        }
    }
}
