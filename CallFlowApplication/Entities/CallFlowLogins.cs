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
        public string LoginProvider;
        public string ProviderToken;
        public string ProviderName;
        public User User;
    }
}
