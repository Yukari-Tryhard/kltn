using CallFlowApplication.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CallFlowArchitecture.Persistence.Configuration
{
    public class TrunkConfiguration : IEntityTypeConfiguration<Trunk>
    {
        public void Configure(EntityTypeBuilder<Trunk> builder)
        {
            // Add configuration
            
        }
    }
}
