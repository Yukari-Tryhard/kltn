using CallFlowApplication.Entities;
using CallFlowArchitecture.Persistence;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System.Reflection;

namespace CallFlowArchitecture
{
    public class KLTNContext : DbContext, IApplicationDbContext
    {
        public KLTNContext(DbContextOptions options) : base(options)
        {
        }

        //public TLCNContext(DbContextOptions<TLCNContext> options, IOptions<OperationalStoreOptions> operationalStoreOptions)
        //: base(options, operationalStoreOptions)
        //{
        //}

        public DbSet<CallFlowUser> CallFlowUsers{ get; set; }
        //public DbSet<LinkAccount> LinkAccounts { get; set; }
        //public DbSet<Project> Projects { get; set; }
        //public DbSet<ConfigGenerator> ConfigGenerators { get; set; }
        //public DbSet<ProjectVersion> ProjectVersions { get; set; }
        //public DbSet<ProjectMember> ProjectMembers { get; set; }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        //    base.OnModelCreating(modelBuilder);

        //    modelBuilder.Entity<CallFlowUser>()
        //                .HasKey(u => u.UserId);

        //    modelBuilder.Entity<CallFlowUser>()
        //                .Property(u => u.isDeactivate)
        //                .HasDefaultValue(false);

        //    modelBuilder.Entity<ProjectVersion>()
        //                .Property(la => la.isPublish)
        //                .HasDefaultValue(false);

        //    modelBuilder.Entity<ProjectVersion>()
        //      .Property(la => la.CallFlow)
        //      .HasDefaultValue(" ");

        //    modelBuilder.Entity<CallFlowUser>()
        //          .Property(u => u.Email)
        //          .HasDefaultValue("noemail@noemail.noemail");

        //    modelBuilder.Entity<CallFlowUser>()
        //          .Property(u => u.Password)
        //          .HasDefaultValue("nopassword");

        //    modelBuilder.Entity<Project>().HasKey(p => p.ProjectId);
        //    modelBuilder.Entity<ProjectMember>().HasKey(pm => pm.ProjectMemberId);
        //}


        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            
            return await base.SaveChangesAsync(cancellationToken);
        }
    }
}