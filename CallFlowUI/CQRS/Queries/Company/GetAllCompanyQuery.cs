using CallFlowArchitecture.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CallFlowUI.CQRS.Queries.Company
{
    public class GetAllCompanyQuery : IRequest<ObjectResult>
    {

    }
    public class GetAllCompanyQueryHandler : IRequestHandler<GetAllCompanyQuery, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public GetAllCompanyQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(GetAllCompanyQuery request, CancellationToken cancellationToken)
        {
            // Retrieve all CallFlowData from the database
            try
            {
                var companies = await _context.Companies
                    .ToListAsync();
                var result = new ObjectResult(companies);
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