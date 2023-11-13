﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CallFlowApplication.Entities
{
    public class Company
    {
        public int CompanyId { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
        public List<CallFlowUser> CallFlowUsers { get; set; } = new List<CallFlowUser>();
        public Trunk? Trunk { get; set; }
    }
}
