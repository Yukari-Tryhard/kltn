using CallFlowArchitecture.Persistence;
using CallFlowUI.Module;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using XAct;
using XAct.Users;

namespace CallFlowUI.CQRS.Queries.Authentication
{

    public class VerifyTokenQuery : IRequest<ObjectResult>
    {
        public string? AccessToken { get; set; }
    }

    public class VerifyTokenQueryHandler : IRequestHandler<VerifyTokenQuery, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public VerifyTokenQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(VerifyTokenQuery request, CancellationToken cancellationToken)
        {
            string? accessToken = request.AccessToken;

            if (accessToken != null)
            {
                bool isVerify = JWTModule.VerifyToken(accessToken, "TLCN_SECRET_KEY_THAT_I_WILL_NEVER_REMEMBER");
                if (isVerify)
                {
                    return new OkObjectResult("Verified");
                }
                else
                {
                    return new UnauthorizedObjectResult("Not Verified");
                }
            }

            return new BadRequestObjectResult("Param NotFound");
        }
    }
}
