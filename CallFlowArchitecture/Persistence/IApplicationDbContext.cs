using CallFlowApplication.Entities;
using Microsoft.EntityFrameworkCore;

namespace CallFlowArchitecture.Persistence
{
    public interface IApplicationDbContext
    {
        public DbSet<CallFlowUser> CallFlowUsers { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }

}