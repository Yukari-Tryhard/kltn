using CallFlowArchitecture.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CallFlowUI.CQRS.Queries.Trunk
{
    public class GetTrunkByIdQuery : IRequest<ObjectResult>
    {
        public string? Id { get; set; }
    }
    public class GetTrunkByIdQueryHandler : IRequestHandler<GetTrunkByIdQuery, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public GetTrunkByIdQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<ObjectResult> Handle(GetTrunkByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                if (String.IsNullOrEmpty(request.Id))
                {
                    var errorObjectResult = new ObjectResult("Missing Id field");
                    errorObjectResult.StatusCode = StatusCodes.Status400BadRequest;
                    return errorObjectResult;
                }
                int id = Int32.Parse(request.Id);
                var callflowUser = await _context.Trunks
                    .Where(t => t.TrunkId == id)
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
