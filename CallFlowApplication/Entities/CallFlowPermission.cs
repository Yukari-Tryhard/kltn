using Domain.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CallFlowApplication.Entities
{
    public class CallFlowPermission : BaseAuditableEntity
    {
        public int PermissionId { get; set; }
        public string Resource { get; set; }
        public bool isPermit { get; set; }
    }
}
