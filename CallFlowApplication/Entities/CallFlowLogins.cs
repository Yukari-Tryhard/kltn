using Domain.Common;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CallFlowApplication.Entities
{
    public class CallFlowLogins : BaseAuditableEntity
    {
        public string? LoginProvider { get; set; }
        public string? ProviderToken { get; set; }
        public string? ProviderName { get; set; }
        public User User;
    }
}
