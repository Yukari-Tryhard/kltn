using CallFlowArchitecture.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace CallFlowUI.CQRS.Commands.Company
{
    public class AddCompanyCommand : IRequest<ObjectResult>
    {
        public string? Name { get; set; }
        public string? Address { get; set; }
    }
    public class AddCompanyCommandHandler : IRequestHandler<AddCompanyCommand, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public AddCompanyCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(AddCompanyCommand request, CancellationToken cancellationToken)
        {
            // Create a new CallFlowData entity
            var newCompany = new CallFlowApplication.Entities.Company
            {
                Name = request.Name,
                Address = request.Address,
            };

            // Add the new entity to the database
            _context.Companies.Add(newCompany);
            await _context.SaveChangesAsync(cancellationToken);

            return new OkObjectResult(newCompany.CompanyId);
        }
    }
}
