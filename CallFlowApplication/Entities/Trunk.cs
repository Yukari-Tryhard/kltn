using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace CallFlowApplication.Entities
{
    public class Trunk : BaseAuditableEntity
    {
        public int TrunkId { get; set; }
        public string? Name { get; set; }
        public string? Provider { get; set; }
        public string? Status { get; set; }
        public bool? IsActive { get; set; }
        public List<Company>? Companies { get; set; }
    }
}
