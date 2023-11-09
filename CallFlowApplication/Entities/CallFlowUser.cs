using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CallFlowApplication.Entities
{
    public class CallFlowUser : BaseAuditableEntity
    {
        public int UserId { get; set; }
        public string? Email { get; set; }
        public string? HasedPassword { get; set; }
        public string? Salt { get; set; }
        public string? UserName { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public bool isActive { get; set; }
        //public CallFlowRole Role { get; set; }
    }
}
