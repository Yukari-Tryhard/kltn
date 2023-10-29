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
    public class CallFlowDataConfiguration : IEntityTypeConfiguration<CallFlowData>
    {
        public void Configure(EntityTypeBuilder<CallFlowData> builder)
        {
            builder.HasKey(e => new { e.CallFlowDataId});
            //builder.Ignore(e => e.User);
        }
    }
}
