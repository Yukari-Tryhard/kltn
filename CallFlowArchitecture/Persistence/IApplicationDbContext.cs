using Microsoft.EntityFrameworkCore;

namespace CallFlowArchitecture.Persistence
{
    public interface IApplicationDbContext
    {

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }

}