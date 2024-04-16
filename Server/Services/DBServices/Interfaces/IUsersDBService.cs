using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DBServices.Interfaces
{
    public interface IUsersDBService
    {
        public Task<List<Users>> GetAllUsers();
        public Task<Users> GetUserById(int id);
        public Task<Users> GetUserByEmail(string email);
        public Task<List<Users>> PostUser(Users user);
        public Task<Users> PutUser(Users user);
        public Task DeleteUserById(int id);
    }
}
