using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CallFlowApplication.Exception
{
    public class PlatFormNotSupportedException : System.Exception
    {
        public PlatFormNotSupportedException() { }

        public PlatFormNotSupportedException(string platform) : base($"{platform} is not supported") { 
        
        }


    }
}
