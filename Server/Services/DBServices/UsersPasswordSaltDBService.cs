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
    public class UsersPasswordSaltDBService : IUsersPasswordSaltDBService
    {
        private DiplomaDBContext _context;

        public UsersPasswordSaltDBService(DiplomaDBContext context) { _context = context; }

        public async Task<UsersPasswordSalt> AddSaltAsync(UsersPasswordSalt salt)
        {
            try
            {
                if (await GetSaltByUserIdAsync(salt.UsersId) != null)
                {
                    throw new Exception($"salt for this userId = {salt.UsersId} exist");
                }
                await _context.UsersPasswordSalt.AddAsync(salt);
                await _context.SaveChangesAsync();
                return salt;
            }

            catch (Exception ex)
            {
                throw new Exception($"cant add {typeof(UsersPasswordSalt).Name}. Messege error: " + ex.Message);
            }
        }
        public async Task<UsersPasswordSalt> GetSaltByUserIdAsync(int userId)
        {
            try
            {
                return await _context.UsersPasswordSalt.SingleOrDefaultAsync(s => s.UsersId == userId);
            }
            catch (Exception ex)
            {
                throw new Exception($"cant found {typeof(UsersPasswordSalt).Name} by userId = {userId}. Messege error: " + ex.Message);
            }
        }

        public async Task<UsersPasswordSalt> GetSaltByIdAsync(int id)
        {
            try
            {
                return await _context.UsersPasswordSalt.SingleOrDefaultAsync(s => s.Id == id);
            }
            catch (Exception ex)
            {
                throw new Exception($"cant found {typeof(UsersPasswordSalt).Name} by Id = {id}. Messege error: " + ex.Message);
            }
        }

        public async Task<UsersPasswordSalt> EditSaltAsync(UsersPasswordSalt salt)
        {
            try
            {
                var oldSalt = await GetSaltByIdAsync(salt.Id);
                if (oldSalt == null)
                {
                    throw new Exception($"there is no salt with this id = {salt.Id}");
                }
                oldSalt.Salt = salt.Salt;
                oldSalt.UsersId = salt.UsersId;

                await _context.SaveChangesAsync();
                return oldSalt;
            }
            catch (Exception ex)
            {
                throw new Exception($"cant edit {typeof(UsersPasswordSalt).Name}. Messege error: " + ex.Message);
            }
        }

        public async Task DeleteSaltByIdAsync(int id)
        {
            try
            {
                var salt = await GetSaltByIdAsync(id);
                if (salt == null)
                    throw new Exception($"salt with id = {id} not exist");

                _context.UsersPasswordSalt.Remove(salt);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception($"cant delete {typeof(UsersPasswordSalt).Name}. Messege error: " + ex.Message);
            }
        }
    }
}
