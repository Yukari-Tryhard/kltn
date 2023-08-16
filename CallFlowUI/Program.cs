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

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerDocument(configure => configure.Title = "Call Flow API and Models");
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
app.UseHangfireDashboard(); // Add Hangfire dashboard endpoint
// Enable CORS policy
app.UseCors(
      x => x.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
  );
app.UseOpenApi();
app.UseSwaggerUi3();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<KLTNContext>();
    db.Database.EnsureCreated();
    db.SaveChanges();
}
app.Run();
