using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CallFlowApplication.Entities
{
    public class Setting
    {
        public int SettingId { get; set; }
        public bool IsLocal {  get; set; }
        public string AsteriskServerUrl { get; set; } = null!;
        public string AsteriskServerPort { get; set; } = null!;
        public string AsteriskServerUsername { get; set; } = null!;
        public string AsteriskServerPassword { get; set; } = null!;
    }
}
