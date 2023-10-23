using CallFlowApplication.Entities;
using CallFlowArchitecture.Persistence;
using Domain.Common;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Reflection;
using CallFlowApplication.Interface;

namespace CallFlowArchitecture
{
    public class KLTNContext : DbContext, IApplicationDbContext
    {
        private readonly ILogger<KLTNContext> logger;
        public KLTNContext(DbContextOptions options ) : base(options)
        {
            this.logger = logger;
        }

        public DbSet<CallFlowUser> CallFlowUsers { get; set; }
        public DbSet<CallFlowPermission> CallFlowPermissions { get; set; }
        public DbSet<CallFlowRole> CallFlowRoles { get; set; }
        public DbSet<CallFlowLogins> CallFlowLogins { get; set; }
        public DbSet<CallFlowData> CallFlowDatas {get; set;}



        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {

            try
            {
                var addedOrModifiedEntities = base.ChangeTracker.Entries<IAuditableEntity>()
                .Where(e => e.State == EntityState.Added || e.State == EntityState.Modified);

                var currentTime = DateTime.Now;

                foreach (var entry in addedOrModifiedEntities)
                {
                    if (entry.State == EntityState.Added)
                    {
                        entry.Entity.Created = currentTime;
                        // Set the CreatedBy and LastModifiedBy properties as needed
                    }

                    entry.Entity.LastModified = currentTime;
                    // Set the LastModifiedBy property as needed
                }

                return base.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                logger.LogError("Exception at ApplicationDbContext. Ex: {0}", ex.Message);
                return null;
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);
        }
    }
}