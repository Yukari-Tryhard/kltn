using CallFlowArchitecture.Persistence;
using CallFlowApplication.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;
using XAct;

namespace CallFlowUI.CQRS.Commands.CallFlowData.AddCallFlowDataCommand
{
    public class AddCallFlowDataCommand : IRequest<ObjectResult>
    {
        public string FlowJson { get; set; }
    }
    public class AddCallFlowDataCommandHandler : IRequestHandler<AddCallFlowDataCommand, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public AddCallFlowDataCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(AddCallFlowDataCommand request, CancellationToken cancellationToken)
        {
            // Create a new CallFlowData entity
            var newCallFlowData = new CallFlowApplication.Entities.CallFlowData
            {
                FlowJson = request.FlowJson
            };

            // Add the new entity to the database
            _context.CallFlowDatas.Add(newCallFlowData);
            await _context.SaveChangesAsync(cancellationToken);

            return new OkObjectResult(newCallFlowData.CallFlowDataId);
        }
    }
}
