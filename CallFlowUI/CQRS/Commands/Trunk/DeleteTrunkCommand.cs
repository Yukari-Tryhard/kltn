using CallFlowArchitecture.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CallFlowUI.CQRS.Commands.Trunk
{
    public class DeleteTrunkCommand : IRequest<ObjectResult>
    {
        public int? TrunkId { get; set; }
    }
    public class DeleteTrunkCommandHandler : IRequestHandler<DeleteTrunkCommand, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public DeleteTrunkCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(DeleteTrunkCommand request, CancellationToken cancellationToken)
        {
            if ((request.TrunkId ?? 0) == 0)
            {
                var errorObjectResult = new ObjectResult("Missing Id field");
                errorObjectResult.StatusCode = StatusCodes.Status400BadRequest;
                return errorObjectResult;
            }
            // Create a new callFlowtrunk entity
            var callFlowTrunk = await _context.Trunks.FirstOrDefaultAsync(trunk => trunk.TrunkId == request.TrunkId, cancellationToken);

            if (callFlowTrunk != null)
            {
                // Remove the entity from the database
                _context.Trunks.Remove(callFlowTrunk);
                var result = await _context.SaveChangesAsync(cancellationToken);
                return new OkObjectResult(result);
            }
            return new BadRequestObjectResult("trunk Id not found");
        }
    }
}
