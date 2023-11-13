using CallFlowArchitecture.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CallFlowUI.CQRS.Queries.Trunk
{
    public class GetAllTrunkQuery : IRequest<ObjectResult>
    {

    }
    public class GetAllTrunkQueryHandler : IRequestHandler<GetAllTrunkQuery, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public GetAllTrunkQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(GetAllTrunkQuery request, CancellationToken cancellationToken)
        {
            // Retrieve all CallFlowData from the database
            try
            {
                var trunks = await _context.Trunks
                    .ToListAsync();
                var result = new ObjectResult(trunks);
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
