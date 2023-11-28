using CallFlowUI.CQRS.Commands.CallFlowData.AddCallFlowDataCommand;
using CallFlowUI.CQRS.Queries.CallFlowData.AddCallFlowDataCommand;
using CallFlowUI.CustomAttribute;
using CallFlowUI.Interface;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CallFlowUI.Controllers
{
    [CustomAuthorize]
    public class CallFlowDataController : ApiControllerBase
    {
        private readonly IJWTManagerRepository _jWTManager;
        private readonly IUserServiceRepository _userServiceRepository;
        public CallFlowDataController(IJWTManagerRepository jWTManager, IUserServiceRepository userServiceRepository) : base(jWTManager, userServiceRepository)
        {
            _jWTManager = jWTManager;
            _userServiceRepository = userServiceRepository;
        }
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
