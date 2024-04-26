using DataBaseLayer;
using Microsoft.EntityFrameworkCore;
using Server.Models;
using Services.DBServices.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DBServices
{
    public class UsersDBService : IUsersDBService
    {
        private DiplomaDBContext _dbContext;
        public UsersDBService(DiplomaDBContext context) { _dbContext = context; }

        public async Task<List<Users>> GetAllUsers()
        {
            return (await _dbContext.Users.ToListAsync());
        }

        public async Task<Users> GetUserByEmail(string email)
        {
            var user = (await _dbContext.Users.SingleOrDefaultAsync(u => u.Email == email));

            return user;
        }

        public async Task<Users> GetUserById(int id)
        {
            var user = (await _dbContext.Users.Where(u => u.Id == id).FirstAsync());

            if (user == null)
                throw new Exception($"no {typeof(Users).Name} with id = {id}");

            return user;
        }

        public async Task<Users> PostUser(Users user)
        {
            try
            {
                await _dbContext.Users.AddAsync(user);

                await _dbContext.SaveChangesAsync();
                return user;
            }
            catch (Exception ex)
            {
                throw new Exception($"cant add {typeof(Users).Name} Messege error: " + ex);
            }
        }

        public async Task<Users> PutUser(Users user)
        {
            try
            {
                var olduser = await GetUserById(user.Id);
                olduser.Email = user.Email;
                olduser.Name = user.Name;

                await _dbContext.Users.AddAsync(olduser);

                await _dbContext.SaveChangesAsync();
                return olduser;
            }
            catch (Exception ex)
            {
                throw new Exception($"cant update {typeof(Users).Name} Messege error: " + ex);
            }
        }

        public async Task DeleteUserById(int id)
        {
            var user = await GetUserById(id);

            _dbContext.Users.Remove(user);

            await _dbContext.SaveChangesAsync();
        }
    }
}
