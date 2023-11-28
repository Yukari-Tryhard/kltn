using CallFlowApplication.Entities;
using CallFlowUI.CQRS.Commands.Authentication.SignUpWithEmailCommand;
using CallFlowUI.CQRS.Queries.Authentication;
using CallFlowUI.Interface;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CallFlowUI.Controllers
{
    [Authorize]
    [ApiController]
    public class AuthController : ApiControllerBase
    {
        private readonly IJWTManagerRepository _jWTManager;
        private readonly IUserServiceRepository _userServiceRepository;

        public AuthController(IJWTManagerRepository jWTManager, IUserServiceRepository userServiceRepository) : base(jWTManager, userServiceRepository)
        {
            _userServiceRepository = userServiceRepository;
            _jWTManager = jWTManager;
        }

        //[HttpPost]
        //[Route("verify")]
        //public async Task<ActionResult> Verify(VerifyTokenQuery query)
        //{
        //    return await Mediator.Send(query);
        //}

        [HttpPost]
        [AllowAnonymous]
        [Route("sign-up-email")]
        public async Task<ActionResult> SignUpWithEmail(SignUpWithEmailCommand query)
        {
            return await Mediator.Send(query);
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("refresh")]
        public IActionResult Refresh(Token token)
        {
            var principal = _jWTManager.GetPrincipalFromExpiredToken(token.Access_Token);
            var username = principal.Identity?.Name;

            //retrieve the saved refresh token from database
            var savedRefreshToken = _userServiceRepository.GetSavedRefreshTokens(username, token.Refresh_Token);

            if (savedRefreshToken.RefreshToken != token.Refresh_Token)
            {
                return Unauthorized("Invalid attempt!");
            }

            var newJwtToken = _jWTManager.GenerateRefreshToken(username);

            if (newJwtToken == null)
            {
                return Unauthorized("Invalid attempt!");
            }

            // saving refresh token to the db
            UserRefreshToken obj = new UserRefreshToken
            {
                RefreshToken = newJwtToken.Refresh_Token,
                UserName = username
            };

            _userServiceRepository.DeleteUserRefreshTokens(username, token.Refresh_Token);
            _userServiceRepository.AddUserRefreshTokens(obj);
            _userServiceRepository.SaveCommit();

            return Ok(newJwtToken);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("authenticate")]
        public async Task<IActionResult> AuthenticateAsync(string username, string password)
        {
            var validUser = await this._userServiceRepository.IsValidUserAsync(username, password );

            if (!validUser)
            {
                return Unauthorized("Incorrect username or password!");
            }

            var token = _jWTManager.GenerateToken(username);

            if (token == null)
            {
                return Unauthorized("Invalid Attempt!");
            }

            // saving refresh token to the db
            UserRefreshToken obj = new UserRefreshToken
            {
                RefreshToken = token.Refresh_Token,
                UserName = username
            };

            _userServiceRepository.AddUserRefreshTokens(obj);
            _userServiceRepository.SaveCommit();
            return Ok(token);
        }
    }
}
