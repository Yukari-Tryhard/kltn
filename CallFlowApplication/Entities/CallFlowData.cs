using Domain.Common;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CallFlowApplication.Entities
{
    public class CallFlowData : BaseAuditableEntity
    {
        public int CallFlowDataId { get; set; }
        public string? FlowJson { get; set; }
    }
}
