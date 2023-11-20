﻿using CallFlowApplication.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CallFlowArchitecture.Persistence.Configuration
{
    public class CompanyConfiguration: IEntityTypeConfiguration<Company>
    {
        public void Configure(EntityTypeBuilder<Company> builder)
        {
            // Add configuration
            builder.HasKey(e => e.CompanyId);
        }
    }
}
