using CallFlowUI.CQRS.Commands.CallFlowData.AddCallFlowDataCommand;
using CallFlowUI.CQRS.Queries.CallFlowData.AddCallFlowDataCommand;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CallFlowUI.Controllers
{
    public class CallFlowDataController : ApiControllerBase
    {   

        [HttpPost]
        [Route("add-callflow-data")]
        public async Task<ActionResult> Add(AddCallFlowDataCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete]
        [Route("delete-callflow-data")]
        public async Task<ActionResult> Delete(AddCallFlowDataCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Route("get-callflow-data-id")]
        public async Task<ActionResult> GetOne(GetCallFlowDataByIdQuery query)
        {
            return await Mediator.Send(query);
        }
        
        [HttpGet]
        [Route("get-all-callflow-data")]
        public async Task<ActionResult> GetAll()
        {
            var query = new GetAllCallFlowDataQuery();
            return await Mediator.Send(query);
        }
    }
}
