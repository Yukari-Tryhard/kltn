using CallFlowApplication.Entities;
using CallFlowArchitecture.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CallFlowUI.CQRS.Queries.PersonalInfo
{
    public class GetPersonalInfoByIdQuery : IRequest<ObjectResult>
    {
        public int? UserId { get; set; }
    }
    public class GetPersonalInfoByIdQueryHandler : IRequestHandler<GetPersonalInfoByIdQuery, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public GetPersonalInfoByIdQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<ObjectResult> Handle(GetPersonalInfoByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                if ((request.UserId ?? 0) == 0)
                {
                    var errorObjectResult = new ObjectResult("Missing Id field");
                    errorObjectResult.StatusCode = StatusCodes.Status400BadRequest;
                    return errorObjectResult;
                }
                var user = await _context.CallFlowUsers.FirstOrDefaultAsync(u => u.UserId == request.UserId, cancellationToken);
                if (user == null)
                {
                    var errorObjectResult = new ObjectResult("User not found");
                    errorObjectResult.StatusCode = StatusCodes.Status400BadRequest;
                    return errorObjectResult;
                }

                var personalInfo = await _context.PersonalInfos.FirstOrDefaultAsync(ps => ps.UserId == request.UserId, cancellationToken);
                var result = new ObjectResult(personalInfo);
                return result;
            }
            catch (Exception e)
            {
                var errorObjectResult = new ObjectResult(e);
                errorObjectResult.StatusCode = StatusCodes.Status500InternalServerError;
                return errorObjectResult;
            }
        }
    }
}
