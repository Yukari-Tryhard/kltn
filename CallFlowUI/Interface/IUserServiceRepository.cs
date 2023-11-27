using CallFlowApplication.Entities;

namespace CallFlowUI.Interface
{
    public interface IUserServiceRepository
    {
        Task<bool> IsValidUserAsync(string username, string password);
        UserRefreshToken AddUserRefreshTokens(UserRefreshToken user);

        UserRefreshToken GetSavedRefreshTokens(string username, string refreshtoken);

        void DeleteUserRefreshTokens(string username, string refreshToken);

        int SaveCommit();
    }
}
