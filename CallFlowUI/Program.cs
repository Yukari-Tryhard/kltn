using CallFlowArchitecture;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.IO;
using System.Reflection;
using CallFlowArchitecture.Persistence;
using CallFlowUI.Interface;
using CallFlowUI.Service;
using Hangfire;
using Hangfire.MySql;
using CallFlowArchitecture.DataSeeder;
using XAct;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;
using CallFlowUI.Module;
using NSwag.Generation.Processors.Security;
using NSwag;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerDocument(configure => {
    configure.Title = "Call Flow API and Models";
    configure.OperationProcessors.Add(new OperationSecurityScopeProcessor("JWT Token"));
    configure.AddSecurity("JWT Token", Enumerable.Empty<string>(),
        new OpenApiSecurityScheme()
        {
            Type = OpenApiSecuritySchemeType.ApiKey,
            Name = "Authorization",
            In = OpenApiSecurityApiKeyLocation.Header,
            Description = "Copy this into the value field: Bearer {token}"
        }
    );
}
);
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
// Add the Hangfire services


// Load the configuration from the appsettings.json file.
var config = new ConfigurationBuilder()
    .SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("appsettings.json", optional: false)
    .Build();

string? connectionString = config.GetConnectionString("KLTNContext");
string? hangfireConnectionString = config.GetConnectionString("HangFireContext");



// Configure the DbContext to use the "KLTNContext" connection string from the configuration file.
builder.Services.AddDbContext<KLTNContext>(options =>
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options => {
    options.Password.RequireUppercase = true; // on production add more secured options
    options.Password.RequireDigit = true;
    options.SignIn.RequireConfirmedEmail = true;
}).AddEntityFrameworkStores<KLTNContext>().AddDefaultTokenProviders();

builder.Services.AddAuthentication(x => {
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o => {
    var Key = Encoding.UTF8.GetBytes(config["JWT:Key"]);
    o.SaveToken = true;
    o.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = false, // on production make it true
        ValidateAudience = false, // on production make it true
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = config["JWT:Issuer"],
        ValidAudience = config["JWT:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Key),
        ClockSkew = TimeSpan.Zero
    };
    o.Events = new JwtBearerEvents
    {
        OnAuthenticationFailed = context => {
            if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
            {
                context.Response.Headers.Add("IS-TOKEN-EXPIRED", "true");
            }
            return Task.CompletedTask;
        }
    };
});

builder.Services.AddSingleton<IJWTManagerRepository, JWTManagerRepository>();
builder.Services.AddScoped<IUserServiceRepository, UserServiceRepository>();
builder.Services.AddScoped<IApplicationDbContext, KLTNContext>();
builder.Services.AddTransient<IEmailSender, EmailSenderService>();
// Add Hangfire services
// Add Hangfire services
builder.Services.AddHangfire(configuration => configuration
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseStorage(new MySqlStorage(hangfireConnectionString, new MySqlStorageOptions
    {
        TransactionIsolationLevel = (System.Transactions.IsolationLevel?)System.Data.IsolationLevel.ReadCommitted,
        QueuePollInterval = TimeSpan.FromSeconds(15),
        JobExpirationCheckInterval = TimeSpan.FromHours(1),
        CountersAggregateInterval = TimeSpan.FromMinutes(5),
        PrepareSchemaIfNecessary = true,
        DashboardJobListLimit = 50000,
        TransactionTimeout = TimeSpan.FromMinutes(5)
    })));
// Add Hangfire server and dashboard
builder.Services.AddHangfireServer();


var app = builder.Build();
// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthentication(); // This need to be added before UseAuthorization()	
app.UseAuthorization();
app.UseOpenApi();
app.UseSwaggerUi3();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});
app.UseHangfireDashboard(); // Add Hangfire dashboard endpoint
// Enable CORS policy
app.UseCors(
      x => x.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
  );


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;
using (var scope = app.Services.CreateScope())
{
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<KLTNContext>();
        db.Database.EnsureCreated();
        Seeder.SeedData(db);
        db.SaveChanges();
    }
    catch (Exception ex)
    {
        // Handle any exceptions if needed
        Console.WriteLine("An error occurred while seeding the database: " + ex.Message);
    }
}
app.Run();
