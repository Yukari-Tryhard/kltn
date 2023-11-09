using CallFlowArchitecture.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CallFlowUI.CQRS.Commands.CallflowUser
{
    public class DeleteCallFlowUserCommand : IRequest<ObjectResult>
    {
        public int? userId { get; set; }
    }
    public class DeleteCallFlowUserCommandHandler : IRequestHandler<DeleteCallFlowUserCommand, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public DeleteCallFlowUserCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(DeleteCallFlowUserCommand request, CancellationToken cancellationToken)
        {
            if ((request.userId ?? 0) == 0)
            {
                var errorObjectResult = new ObjectResult("Missing Id field");
                errorObjectResult.StatusCode = StatusCodes.Status400BadRequest;
                return errorObjectResult;
            }
            // Create a new callFlowUser entity
            var callFlowUser = await _context.CallFlowUsers.FirstOrDefaultAsync(user => user.UserId == request.userId, cancellationToken);

            if (callFlowUser != null)
            {
                // Remove the entity from the database
                _context.CallFlowUsers.Remove(callFlowUser);
                var result = await _context.SaveChangesAsync(cancellationToken);
                return new OkObjectResult(result);
            }
            return new BadRequestObjectResult("User Id not found");

        }
    }
}
