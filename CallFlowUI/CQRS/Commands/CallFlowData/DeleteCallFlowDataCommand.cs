using CallFlowApplication.Entities;
using CallFlowArchitecture.Persistence;
using CallFlowUI.CQRS.Commands.Authentication.SignUpWithEmailCommand;
using CallFlowUI.CQRS.Queries.Authentication;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Data.Entity;
using XAct;

namespace CallFlowUI.CQRS.Commands.Authentication.DeleteCallFlowDataCommand
{
    public class DeleteCallFlowDataCommand : IRequest<ObjectResult>
    {
        public int CallFlowDataId { get; set; }
    }
    public class DeleteCallFlowDataCommandHandler : IRequestHandler<DeleteCallFlowDataCommand, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public DeleteCallFlowDataCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(DeleteCallFlowDataCommand request, CancellationToken cancellationToken)
        {
            // Create a new CallFlowData entity
            var callFlowData = await _context.CallFlowDatas
            .FirstOrDefaultAsync(cfd => cfd.CallFlowDataId == request.CallFlowDataId, cancellationToken);

            if (callFlowData != null)
            {
                // Remove the entity from the database
                _context.CallFlowDatas.Remove(callFlowData);
                var result = await _context.SaveChangesAsync(cancellationToken);
                return new OkObjectResult(result);
            }
            return new BadRequestObjectResult("Callflow Id not found");

        }
    }
}
