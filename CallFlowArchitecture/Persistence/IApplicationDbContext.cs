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
        public DbSet<CallFlowData> CallFlowDatas {get; set;}
        public DbSet<Company> Companies { get; set; }
        public DbSet<PersonalInfo> PersonalInfos { get; set; }
        public DbSet<Setting> Settings { get; set; }
        public DbSet<Trunk> Trunks { get; set; }
        public DbSet<UserRefreshToken> UserRefreshTokens { get; set; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }

}