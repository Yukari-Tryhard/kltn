﻿using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CallFlowApplication.Entities
{
    public class CallFlowRole : BaseAuditableEntity
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public CallFlowPermission[] Permissions { get; set; }
    }
}
