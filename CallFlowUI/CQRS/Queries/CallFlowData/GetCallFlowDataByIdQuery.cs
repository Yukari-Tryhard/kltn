using CallFlowArchitecture.Persistence;
using CallFlowApplication.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using XAct;

namespace CallFlowUI.CQRS.Queries.CallFlowData.AddCallFlowDataCommand
{
    public class GetCallFlowDataByIdQuery : IRequest<ObjectResult>
    {
        public string? Id;
    }
    public class GetCallFlowDataByIdQueryHandler : IRequestHandler<GetCallFlowDataByIdQuery, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public GetCallFlowDataByIdQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(GetCallFlowDataByIdQuery request, CancellationToken cancellationToken)
        {
            // Retrieve all CallFlowData from the database
            try{
                int id = Int32.Parse(request.Id);
                var callflowData = await _context.CallFlowDatas
                                                .Where(cfd => cfd.CallFlowDataId == id)
                                                .FirstOrDefaultAsync();
                var result = new ObjectResult(callflowData);
                return result;
            }
            catch(Exception e){
                var errorObjectResult = new ObjectResult(e);
                errorObjectResult.StatusCode = StatusCodes.Status500InternalServerError;
                return errorObjectResult;
            }
        }
    }
}

