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



        public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
        {

            try
            {
                foreach (var entry in ChangeTracker.Entries<BaseAuditableEntity>())
                {
                    switch (entry.State)
                    {
                        case EntityState.Added:
                            //entry.Entity.CreatedBy = currentUserService.UserId;
                            entry.Entity.Created = DateTime.Now;
                            break;
                        case EntityState.Modified:
                            //entry.Entity.LastModifiedBy = currentUserService.UserId;
                            entry.Entity.LastModified = DateTime.Now;
                            break;
                    }
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