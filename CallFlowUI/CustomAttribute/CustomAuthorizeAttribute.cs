using CallFlowUI.Interface;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;

namespace CallFlowUI.CustomAttribute
{
    public sealed class CustomAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private readonly IJWTManagerRepository _jWTManager;
        private readonly IUserServiceRepository _userServiceRepository;
        public CustomAuthorizeAttribute(IJWTManagerRepository jWTManager, IUserServiceRepository userServiceRepository) 
        {
            _userServiceRepository = userServiceRepository;
            _jWTManager = jWTManager;
        }
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            if (context != null)
            {
                // Auth logic
                string authHeader = context.HttpContext.Request.Headers["Authorization"];
                if (authHeader != null)
                {
                    ClaimsPrincipal claim = _jWTManager.GetPrincipalFromExpiredToken(authHeader);
                }
            }
        }
    }
}
