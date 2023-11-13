using CallFlowArchitecture.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CallFlowUI.CQRS.Queries.Company
{
    public class GetCompanyByIdQuery : IRequest<ObjectResult>
    {
        public string? Id { get; set; }
    }
    public class GetCompanyByIdQueryHandler : IRequestHandler<GetCompanyByIdQuery, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public GetCompanyByIdQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }


        public async Task<ObjectResult> Handle(GetCompanyByIdQuery request, CancellationToken cancellationToken)
        {
            try
            {
                if (String.IsNullOrEmpty(request.Id))
                {
                    var errorObjectResult = new ObjectResult("Missing Id field");
                    errorObjectResult.StatusCode = StatusCodes.Status400BadRequest;
                    return errorObjectResult;
                }
                int id = Int32.Parse(request.Id);
                var company = await _context.Companies
                    .Where(t => t.CompanyId == id)
                    .FirstOrDefaultAsync();
                var result = new ObjectResult(company);
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
