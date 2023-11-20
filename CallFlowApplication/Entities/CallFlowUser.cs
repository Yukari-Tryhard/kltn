using CallFlowApplication.Enum;
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
        public string? Password { get; set; }
        public string? Salt { get; set; }
        public string? UserName { get; set; }
        public bool isActive { get; set; }
        public Company? Company { get; set; }
        public PersonalInfo? PersonalInfo { get; set; }
        public Role role { get; set; } = Role.NormalUser;   
    }
}
