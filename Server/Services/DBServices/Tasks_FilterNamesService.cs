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
    public class Tasks_FilterNamesService : ITasks_FilterNamesService
    {
        private DiplomaDBContext _dbContext;
        private IFilterNamesService _filterNamesService;
        public Tasks_FilterNamesService(
                DiplomaDBContext context, 
                IFilterNamesService filterNamesService) 
        { 
            _dbContext = context; 
            _filterNamesService = filterNamesService;
        }

        public async Task<List<Tasks_FilterNames>> PostTask_FilterNames(int task_id, List<Tasks_FilterNames> task_filterNames)
        {
            for (int i = 0; i < task_filterNames.Count; i++)
            {
                var filter = (await _dbContext.FilterNames.FirstOrDefaultAsync(f => 
                                                            f.UsersId == task_filterNames[i].FilterNames.UsersId && 
                                                            f.Name == task_filterNames[i].FilterNames.Name));
                if (filter == null)
                {
                    await _dbContext.FilterNames.AddAsync(task_filterNames[i].FilterNames);
                    await _dbContext.SaveChangesAsync();
                    filter = task_filterNames[i].FilterNames;
                }

                task_filterNames[i].FilterNames = null;

                task_filterNames[i].Id = 0;
                task_filterNames[i].FilterNamesId = filter.Id;
                task_filterNames[i].TasksId = task_id;
                await _dbContext.Tasks_FilterNames.AddAsync(task_filterNames[i]);
                await _dbContext.SaveChangesAsync();
                //filter_names[i].FilterNames = filter;
            }

            return task_filterNames;
        }

        public async Task<List<Tasks_FilterNames>> PostTask_FilterNames(int task_id, FilterNames filter)
        {
            try
            {
                if ((await _filterNamesService.GetFilterNamesById(filter.Id)) == null)
                {
                    throw new Exception("Filter name does not exsist!");
                }

                var tasks_filter = new Tasks_FilterNames
                {
                    FilterNamesId = filter.Id,
                    TasksId = task_id,
                };
                await _dbContext.Tasks_FilterNames.AddAsync(tasks_filter);
                await _dbContext.SaveChangesAsync();

                await _dbContext.Entry(tasks_filter).Reference(f => f.FilterNames).LoadAsync();

                return new List<Tasks_FilterNames> { tasks_filter };
            }
            catch (Exception ex)
            {
                throw new Exception($"cant add {typeof(Tasks_FilterNames).Name} Messege error: " + ex.Message);
            }
        }

    }
}
