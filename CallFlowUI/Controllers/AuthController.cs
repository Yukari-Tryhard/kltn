using CallFlowUI.CQRS.Commands.Authentication.SignUpWithEmailCommand;
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

        [HttpPost]
        [Route("sign-up-email")]
        public async Task<ActionResult> SignUpWithEmail(SignUpWithEmailCommand query)
        {
            return await Mediator.Send(query);
        }
    }
}
