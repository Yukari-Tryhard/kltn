using CallFlowArchitecture.Persistence;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace CallFlowUI.CQRS.Commands.CallflowUser
{
    public class AddCallFlowUserCommand : IRequest<ObjectResult>
    {
        public string? Email { get; set; }
        public string? UserName { get; set; }
        public string? Password { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public bool IsActive { get; set; }
    }
    public class AddCallFlowUserCommandHandler : IRequestHandler<AddCallFlowUserCommand, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public AddCallFlowUserCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(AddCallFlowUserCommand request, CancellationToken cancellationToken)
        {
            // Create a new CallFlowData entity
            var newCallFlowUser = new CallFlowApplication.Entities.CallFlowUser
            {
                Email = request.Email,
                UserName = request.UserName,
                HasedPassword = request.Password,
                PhoneNumber = request.PhoneNumber,
                Address = request.Address,
                isActive = request.IsActive,
            };

            // Add the new entity to the database
            _context.CallFlowUsers.Add(newCallFlowUser);
            await _context.SaveChangesAsync(cancellationToken);

            return new OkObjectResult(newCallFlowUser.UserId);
        }
    }
}
