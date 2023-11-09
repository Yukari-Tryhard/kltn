using CallFlowArchitecture.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CallFlowUI.CQRS.Queries.CallFlowUser
{
    public class GetCallFlowUserByIdQuery : IRequest<ObjectResult>
    {
        public string? Id { get; set; }
    }
    public class GetCallFlowUserByIdQueryHandler : IRequestHandler<GetCallFlowUserByIdQuery, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public GetCallFlowUserByIdQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(GetCallFlowUserByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {   
                if (String.IsNullOrEmpty(request.Id)){
                    var errorObjectResult = new ObjectResult("Missing Id field");
                    errorObjectResult.StatusCode = StatusCodes.Status400BadRequest;
                    return errorObjectResult;
                }
                int id = Int32.Parse(request.Id);
                var callflowUser = await _context.CallFlowUsers
                    .Select(u => new { u.UserId, u.Email, u.UserName, u.PhoneNumber, u.Address, u.isActive })
                    .Where(cfd => cfd.UserId == id)
                    .FirstOrDefaultAsync();
                var result = new ObjectResult(callflowUser);
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
