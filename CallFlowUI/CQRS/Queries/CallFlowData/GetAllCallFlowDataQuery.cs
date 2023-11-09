using CallFlowArchitecture.Persistence;
using CallFlowApplication.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using XAct;

namespace CallFlowUI.CQRS.Queries.CallFlowData.AddCallFlowDataCommand
{
    public class GetAllCallFlowDataQuery : IRequest<ObjectResult>
    {
        
    }
    public class GetAllCallFlowDataQueryHandler : IRequestHandler<GetAllCallFlowDataQuery, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public GetAllCallFlowDataQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(GetAllCallFlowDataQuery request, CancellationToken cancellationToken)
        {
            // Retrieve all CallFlowData from the database
            try{
                var callflowDatas = await _context.CallFlowDatas.ToListAsync();
                var result = new ObjectResult(callflowDatas);
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

