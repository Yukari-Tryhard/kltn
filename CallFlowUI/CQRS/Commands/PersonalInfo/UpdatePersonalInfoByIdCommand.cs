using CallFlowArchitecture.Persistence;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CallFlowUI.CQRS.Commands.PersonalInfo
{
    public class UpdatePersonalInfoByIdCommand : IRequest<ObjectResult>
    {
        public string? PhoneNumber { get; set; }
        public string? Address { get; set; }
        public string? Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? MiddleName { get; set; }
        public int? UserId {  get; set; }
    }

    public class UpdatePersonalInfoByIdCommandHandler : IRequestHandler<UpdatePersonalInfoByIdCommand, ObjectResult>
    {
        private readonly IApplicationDbContext _context;

        public UpdatePersonalInfoByIdCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ObjectResult> Handle(UpdatePersonalInfoByIdCommand request, CancellationToken cancellationToken)
        {
            if ((request.UserId ?? 0) == 0)
            {
                var errorObjectResult = new ObjectResult("Missing Id field");
                errorObjectResult.StatusCode = StatusCodes.Status400BadRequest;
                return errorObjectResult;
            }
            var user = await _context.CallFlowUsers.FirstOrDefaultAsync(u => u.UserId == request.UserId, cancellationToken);
            if (user == null)
            {
                var errorObjectResult = new ObjectResult("User not found");
                errorObjectResult.StatusCode = StatusCodes.Status400BadRequest;
                return errorObjectResult;
            }

            var personalInfo = await _context.PersonalInfos.FirstOrDefaultAsync(trunk => trunk.UserId == request.UserId, cancellationToken);

            if (personalInfo != null)
            {
                // Update the properties of the existing entity
                personalInfo.PhoneNumber = request.PhoneNumber;
                personalInfo.Address = request.Address;
                personalInfo.Gender = request.Gender;
                personalInfo.DateOfBirth = request.DateOfBirth;
                personalInfo.FirstName = request.FirstName;
                personalInfo.LastName = request.LastName;
                personalInfo.MiddleName = request.MiddleName;
                // Update other properties as needed

                // Save changes to the database
                var result = await _context.SaveChangesAsync(cancellationToken);
                return new OkObjectResult(result);
            }

            return new BadRequestObjectResult("Personal Info not found");
        }
    }
}
