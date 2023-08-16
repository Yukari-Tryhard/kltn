using CallFlowUI.CQRS.Queries.Authentication;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CallFlowUI.Controllers
{
    public class AuthController : ApiControllerBase
    {   

        [HttpPost]
        [Route("verify")]
        public async Task<ActionResult> Verify(VerifyTokenQuery query)
        {
            return await Mediator.Send(query);
        }
    }
}
