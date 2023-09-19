using CallFlowApplication.Entities;
using Microsoft.EntityFrameworkCore;

namespace CallFlowArchitecture.Persistence
{
    public interface IApplicationDbContext
    {
        public DbSet<CallFlowUser> CallFlowUsers { get; set; }
        public DbSet<CallFlowPermission> CallFlowPermissions { get; set; }
        public DbSet<CallFlowRole> CallFlowRoles { get; set; }
        public DbSet<CallFlowLogins> CallFlowLogins { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }

}