using CallFlowArchitecture.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CallFlowUI.CQRS.Commands.Company
{
    public class DeleteCompanyCommand : IRequest<ObjectResult>
    {
        public int? CompanyId { get; set; }
    }
    public class DeleteCompanyCommandHandler : IRequestHandler<DeleteCompanyCommand, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public DeleteCompanyCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(DeleteCompanyCommand request, CancellationToken cancellationToken)
        {
            if ((request.CompanyId ?? 0) == 0)
            {
                var errorObjectResult = new ObjectResult("Missing Id field");
                errorObjectResult.StatusCode = StatusCodes.Status400BadRequest;
                return errorObjectResult;
            }
            // Create a new callFlowUser entity
            var company = await _context.Companies.FirstOrDefaultAsync(user => user.CompanyId == request.CompanyId, cancellationToken);

            if (company != null)
            {
                // Remove the entity from the database
                _context.Companies.Remove(company);
                var result = await _context.SaveChangesAsync(cancellationToken);
                return new OkObjectResult(result);
            }
            return new BadRequestObjectResult("Company Id not found");

        }
    }
}
