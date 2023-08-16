using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace CallFlowUI.Module
{
    public static class JWTModule
    {
        public static string SignWithAdmin(int id)
        {
            return GenerateToken(id, "Admin");
        }

        public static string SignWithUser(int id)
        {
            return GenerateToken(id, "User");
        }

        private static string GenerateToken(int id, string role)
        {
            var key = System.Text.Encoding.ASCII.GetBytes("TLCN_SECRET_KEY_THAT_I_WILL_NEVER_REMEMBER");

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
            new Claim(ClaimTypes.NameIdentifier, id.ToString()),
            new Claim(ClaimTypes.Role, role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public static int? DecodeToken(string token, string secret)
        {
            var key = System.Text.Encoding.ASCII.GetBytes(secret);

            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // Set clock skew to zero so tokens expire exactly at token expiration time
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;

                if (jwtToken == null || !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                    throw new SecurityTokenException("Invalid token");

                var idClaim = principal.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);

                if (idClaim != null)
                {
                    if (int.TryParse(idClaim.Value, out int id))
                        return id;
                }

                return null;
            }
            catch
            {
                // Handle exception according to your use case
                return null;
            }
        }

        public static bool VerifyToken(string token, string secret)
        {
            var key = System.Text.Encoding.ASCII.GetBytes(secret);

            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // Set clock skew to zero so tokens expire exactly at token expiration time
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;

                if (jwtToken == null || !jwtToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
                    throw new SecurityTokenException("Invalid token");

                var now = DateTime.UtcNow;

                if (jwtToken.ValidTo < now)
                    return false;

                return true;
            }
            catch
            {
                // Handle exception according to your use case
                return false;
            }
        }
    }
}
