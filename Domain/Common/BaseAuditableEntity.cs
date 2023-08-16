using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Common
{
    public abstract class BaseAuditableEntity
    {
        public DateTime Created { get; set; }

        public int CreatedBy { get; set; }

        public DateTime? LastModified { get; set; }

        public int LastModifiedBy { get; set;}
    }
}
