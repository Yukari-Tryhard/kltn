using CallFlowArchitecture.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CallFlowUI.CQRS.Commands.Trunk
{
    public class AddTrunkCommand : IRequest<ObjectResult>
    {
        public string? Name { get; set; }
        public string? Provider { get; set; }
        public string? Status { get; set; }
        public bool? IsActive { get; set; }
    }
    public class AddTrunkCommandHandler : IRequestHandler<AddTrunkCommand, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public AddTrunkCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(AddTrunkCommand request, CancellationToken cancellationToken)
        {
            // Create a new Trunk entity
            var newTrunk = new CallFlowApplication.Entities.Trunk
            {
                Name = request.Name,
                Provider = request.Provider,
                Status = request.Status,
                IsActive = request.IsActive,
            };

            // Add the new entity to the database
            _context.Trunks.Add(newTrunk);
            await _context.SaveChangesAsync(cancellationToken);

            return new OkObjectResult(newTrunk.TrunkId);
        }
    }
}
