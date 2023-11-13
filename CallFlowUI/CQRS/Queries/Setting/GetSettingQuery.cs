using CallFlowArchitecture.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CallFlowUI.CQRS.Queries.Setting
{
    public class GetSettingQuery : IRequest<ObjectResult>
    {

    }
    public class GetSettingQueryHandler : IRequestHandler<GetSettingQuery, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public GetSettingQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(GetSettingQuery request, CancellationToken cancellationToken)
        {
            // Retrieve all CallFlowData from the database
            try
            {
                var setting = await _context.Settings
                    .ToListAsync();
                var result = new ObjectResult(setting);
                return result;
            }
            catch (Exception e)
            {
                var errorObjectResult = new ObjectResult(e);
                errorObjectResult.StatusCode = StatusCodes.Status500InternalServerError;
                return errorObjectResult;
            }
        }
    }
}
