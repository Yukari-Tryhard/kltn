using CallFlowApplication.Entities;
using CallFlowArchitecture.Persistence;
using CallFlowUI.CQRS.Commands.Authentication.SignUpWithEmailCommand;
using CallFlowUI.CQRS.Queries.Authentication;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using XAct;

namespace CallFlowUI.CQRS.Commands.Authentication.SignUpWithEmailCommand
{
    public class SignUpWithEmailCommand : IRequest<ObjectResult>
    {
        public string? email { get; set; }
        public string? password { get; set; }
        public string? userName { get; set; }
    }
    public class SignUpWithEmailCommandHandler : IRequestHandler<SignUpWithEmailCommand, ObjectResult>
    {
        private readonly IApplicationDbContext _context;
        public SignUpWithEmailCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(SignUpWithEmailCommand request, CancellationToken cancellationToken)
        {
            try
            {
                var user = _context.CallFlowUsers.Where(u => u.Email == request.email).ToList().FirstOrDefault();
                if (user == null)
                {
                    CallFlowUser newUser = new CallFlowUser { Email = request.email, UserName = request.userName, Password = request.password }; // need to implement HashingMoule
                    await _context.CallFlowUsers.AddAsync(newUser);
                    await _context.SaveChangesAsync(cancellationToken);
                    return new OkObjectResult("Created Successfully"); // Need DTO for this
                }
                else
                {
                    return new BadRequestObjectResult("User existed");
                }
            }
            catch (Exception ex)
            {
                var errorObjectResult = new ObjectResult(ex);
                errorObjectResult.StatusCode = StatusCodes.Status500InternalServerError;
                return errorObjectResult;
            }
        }
    }
}
