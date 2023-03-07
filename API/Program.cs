using API.Extensions;
using API.Middleware;
using API.SignalR;
using Domain.AppUserAggregate;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container. SERVICES SECTION - ORDERING IS NOT IMPORTANT

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

// Configure the HTTP request pipeline

var app = builder.Build();

//////////////////////////////////////////

// Configure the HTTP request pipeline. MIDDLEWARE SECTION - ORDERING IS IMPORTANT
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
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

// app.UseEndpoints(endpoints =>
// {
//     endpoints.MapControllers();
//     endpoints.MapHub<ChatHub>("/chat");
//     endpoints.MapFallbackToController("Index", "Fallback");
// });

app.MapControllers();
app.MapHub<ChatHub>("/chat");

// "using" statement automatically cleans up after itself, when its finishes
// there is garbage collector in c#, but we don't have control over when that runs, therefore the "using" statement
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await SeedUsersAndJobs.SeedData(context, userManager);
    // await SeedCompanies.SeedData(context);
    // await SeedRandomListings.SeedRandomData(context, "agentone", 100);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();
