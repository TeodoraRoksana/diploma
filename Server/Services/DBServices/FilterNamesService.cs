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
    public class FilterNamesService : IFilterNamesService
    {
        private DiplomaDBContext _dbContext;
        public FilterNamesService(DiplomaDBContext context)
        {
            _dbContext = context;
        }

        public async Task<List<FilterNames>> GetAllFilterNamesByUserId(int user_id)
        {
            return (await _dbContext.FilterNames.Where(fn => fn.UsersId == user_id).ToListAsync());
        }

        public async Task<FilterNames> GetFilterNamesById(int id)
        {
            return (await _dbContext.FilterNames.SingleOrDefaultAsync(fn => fn.Id == id));
        }

        public async Task<FilterNames> PostFilterNamesForUser(FilterNames filterNames)
        {
            try
            {
                var listFilterNamesByUserId = await GetAllFilterNamesByUserId(filterNames.UsersId);
                if(listFilterNamesByUserId != null && listFilterNamesByUserId.SingleOrDefault(t => t.Name == filterNames.Name) != null) {
                    throw new Exception($"tag with this name already exists!");
                }

                await _dbContext.FilterNames.AddAsync(filterNames);
                await _dbContext.SaveChangesAsync();

                

                return filterNames;
            }
            catch (Exception ex)
            {
                throw new Exception($"cant add {typeof(FilterNames).Name} Messege error: " + ex.Message);
            }
        }

        public async Task<FilterNames> PutFilterNamesForUser(FilterNames filterNames)
        {
            try
            {
                var oldFilterName = await GetFilterNamesById(filterNames.Id);
                if(oldFilterName == null)
                    throw new Exception($"tag is not exist!");

                oldFilterName.Name = filterNames.Name;
                oldFilterName.Color = filterNames.Color;
                oldFilterName.UsersId = filterNames.UsersId;
                await _dbContext.SaveChangesAsync();

                
                return oldFilterName;
            }
            catch (Exception ex)
            {
                throw new Exception($"cant update {typeof(FilterNames).Name} Messege error: " + ex);
            }
        }
        public async Task DeleteFilterNamesForUserById(int id)
        {
            
                var filterNames = await GetFilterNamesById(id);

                if (filterNames != null)
                {
                    List<Tasks_FilterNames> tasks_FilterNames = _dbContext.Tasks_FilterNames.Where(tf => tf.FilterNamesId == filterNames.Id).ToList();
                    for (int i = 0; i < tasks_FilterNames.Count; i++)
                    {

                        _dbContext.Tasks_FilterNames.Remove(tasks_FilterNames[i]);

                    }
                    _dbContext.FilterNames.Remove(filterNames);
                    await _dbContext.SaveChangesAsync();
                }
                else
                {
                    throw new Exception("not found filter with id = " + id);
                }
            


        }

    }
}
