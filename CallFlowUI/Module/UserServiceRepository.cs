using CallFlowApplication.Entities;
using CallFlowArchitecture;
using CallFlowUI.Interface;
using Microsoft.AspNetCore.Identity;
using System;
using XAct.Library.Settings;

namespace CallFlowUI.Module
{
    public class UserServiceRepository : IUserServiceRepository
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly KLTNContext _db;

        public UserServiceRepository(UserManager<IdentityUser> userManager, KLTNContext db)
        {
            this._userManager = userManager;
            this._db = db;
        }

        public UserRefreshToken AddUserRefreshToken(UserRefreshToken user)
        {
            _db.UserRefreshTokens.Add(user);
            return user;
        }

        public void DeleteUserRefreshToken(string username, string refreshToken)
        {
            var item = _db.UserRefreshTokens.FirstOrDefault(x => x.UserName == username && x.RefreshToken == refreshToken);
            if (item != null)
            {
                _db.UserRefreshTokens.Remove(item);
            }
        }

        public UserRefreshToken GetSavedRefreshTokens(string username, string refreshToken)
        {
            return _db.UserRefreshTokens.FirstOrDefault(x => x.UserName == username && x.RefreshToken == refreshToken && x.IsActive == true);
        }

        public int SaveCommit()
        {
            return _db.SaveChanges();
        }

        public async Task<bool> IsValidUserAsync(string email, string password)
        {
            var u = _db.CallFlowUsers.FirstOrDefault(o => o.Email == email);
            var result = u != null ? u.Password == password : false;
            return result;

        }

        public UserRefreshToken AddUserRefreshTokens(UserRefreshToken user)
        {
            _db.UserRefreshTokens.Add(user);
            return user;
        }

        public void DeleteUserRefreshTokens(string username, string refreshToken)
        {
            var item = _db.UserRefreshTokens.FirstOrDefault(x => x.UserName == username && x.RefreshToken == refreshToken);
            if (item != null)
            {
                _db.UserRefreshTokens.Remove(item);
            }
        }
    }
}
