using CallFlowApplication.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CallFlowArchitecture.Persistence.Configuration
{
    public class CallFlowLoginsConfiguration : IEntityTypeConfiguration<CallFlowLogins>
    {
        public void Configure(EntityTypeBuilder<CallFlowLogins> builder)
        {
            builder.HasKey(e => new { e.ProviderToken, e.ProviderName});
            //builder.Ignore(e => e.User);
        }
    }
}
