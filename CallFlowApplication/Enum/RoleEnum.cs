using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CallFlowApplication.Enum
{
    public enum Role
    {
        [Description("NormalUser")]
        NormalUser,
        [Description("CompanyAdmin")]
        CompanyAdmin,
        [Description("SuperAdmin")]
        SuperAdmin
    }
}
