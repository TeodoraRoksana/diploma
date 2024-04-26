using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DBServices.Interfaces
{
    public interface IUsersPasswordSaltDBService
    {
        public Task<UsersPasswordSalt> AddSaltAsync(UsersPasswordSalt salt);
        public Task<UsersPasswordSalt> GetSaltByUserIdAsync(int userId);
        public Task<UsersPasswordSalt> GetSaltByIdAsync(int id);
        public Task<UsersPasswordSalt> EditSaltAsync(UsersPasswordSalt salt);
        public Task DeleteSaltByIdAsync(int id);
    }
}
