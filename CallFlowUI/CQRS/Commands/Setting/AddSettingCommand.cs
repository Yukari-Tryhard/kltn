using CallFlowArchitecture.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CallFlowUI.CQRS.Commands.Setting
{
    public class AddSettingCommand : IRequest<ObjectResult>
    {
        public bool IsLocal { get; set; }
        public string AsteriskServerUrl { get; set; } = null!;
        public string AsteriskServerPort { get; set; } = null!;
        public string AsteriskServerUsername { get; set; } = null!;
        public string AsteriskServerPassword { get; set; } = null!;
    }
    public class AddSettingCommandHandler : IRequestHandler<AddSettingCommand, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public AddSettingCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(AddSettingCommand request, CancellationToken cancellationToken)
        {
            // Create a new Trunk entity
            var setting = new CallFlowApplication.Entities.Setting
            {
                IsLocal = request.IsLocal,
                AsteriskServerUrl = request.AsteriskServerUrl,
                AsteriskServerPort = request.AsteriskServerPort,
                AsteriskServerUsername = request.AsteriskServerUsername,
                AsteriskServerPassword = request.AsteriskServerPassword
            };

            // Add the new entity to the database
            _context.Settings.Add(setting);
            await _context.SaveChangesAsync(cancellationToken);

            return new OkObjectResult(setting);
        }
    }
}
