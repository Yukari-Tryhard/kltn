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
    public class CallFlowUserConfiguration : IEntityTypeConfiguration<CallFlowUser>
    {

        public void Configure(EntityTypeBuilder<CallFlowUser> builder)
        {
            // Add configuration
            builder.HasKey(e => e.UserId);
            builder.HasOne(e => e.PersonalInfo)
                .WithOne(e => e.CallFlowUser)
                .HasForeignKey<PersonalInfo>(e => e.UserId);
        }
    }
}
