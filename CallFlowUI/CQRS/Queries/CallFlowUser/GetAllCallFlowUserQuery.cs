using CallFlowArchitecture.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CallFlowUI.CQRS.Queries.CallFlowUser
{
    public class GetAllCallFlowUserQuery : IRequest<ObjectResult>
    {

    }
    public class GetAllCallFlowUserQueryHandler : IRequestHandler<GetAllCallFlowUserQuery, ObjectResult>
    {
        private readonly IApplicationDbContext _context;
            
        public GetAllCallFlowUserQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(GetAllCallFlowUserQuery request, CancellationToken cancellationToken)
        {
            // Retrieve all CallFlowData from the database
            try
            {
                var callflowUsers = await _context.CallFlowUsers.Select(u => new {u.UserId, u.Email, u.UserName, u.PhoneNumber, u.Address, u.isActive}).ToListAsync();
                var result = new ObjectResult(callflowUsers);
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
