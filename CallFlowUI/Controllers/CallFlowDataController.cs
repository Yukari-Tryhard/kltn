using CallFlowUI.CQRS.Commands.CallFlowData.AddCallFlowDataCommand;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CallFlowUI.Controllers
{
    public class CallFlowDataController : ApiControllerBase
    {   

        [HttpPost]
        [Route("add-callflow-data")]
        public async Task<ActionResult> Verify(AddCallFlowDataCommand command)
        {
            return await Mediator.Send(command);
        }

        
    }
}
