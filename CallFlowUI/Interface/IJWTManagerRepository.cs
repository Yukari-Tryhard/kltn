using CallFlowApplication.Entities;
using System.Security.Claims;

namespace CallFlowUI.Interface
{
    public interface IJWTManagerRepository
    {
        Token GenerateToken(string userName);
        Token GenerateRefreshToken(string userName);
        ClaimsPrincipal GetPrincipalFromExpiredToken(string token);
    }
}
