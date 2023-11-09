﻿using CallFlowUI.CQRS.Commands.CallflowUser;
using CallFlowUI.CQRS.Queries.CallFlowUser;
using Microsoft.AspNetCore.Mvc;

namespace CallFlowUI.Controllers
{
    public class CallFlowUserController : ApiControllerBase
    {

        [HttpPost]
        [Route("add-callflow-user")]
        public async Task<ActionResult> Add(AddCallFlowUserCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpDelete]
        [Route("delete-callflow-user")]
        public async Task<ActionResult> Delete(DeleteCallFlowUserCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPost]
        [Route("get-callflow-user-id")]
        public async Task<ActionResult> GetOne(GetCallFlowUserByIdQuery query)
        {
            return await Mediator.Send(query);
        }

        [HttpGet]
        [Route("get-all-callflow-user")]
        public async Task<ActionResult> GetAll()
        {
            var query = new GetAllCallFlowUserQuery();
            return await Mediator.Send(query);
        }
    }
}
