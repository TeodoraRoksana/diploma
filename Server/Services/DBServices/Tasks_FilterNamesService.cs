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
        public Tasks_FilterNamesService(DiplomaDBContext context) { _dbContext = context; }

        public async Task<List<Tasks_FilterNames>> PostTask_FilterNames(int task_id, List<Tasks_FilterNames> task_filterNames)
        {
            for (int i = 0; i < task_filterNames.Count; i++)
            {
                var filter = (await _dbContext.FilterNames.FirstOrDefaultAsync(f => f.Name == task_filterNames[i].FilterNames.Name));
                if (filter == null)
                {
                    await _dbContext.FilterNames.AddAsync(task_filterNames[i].FilterNames);
                    await _dbContext.SaveChangesAsync();
                    filter = task_filterNames[i].FilterNames;
                }

                task_filterNames[i].FilterNames = null;

                task_filterNames[i].FilterNamesId = filter.Id;
                task_filterNames[i].TasksId = task_id;
                await _dbContext.Tasks_FilterNames.AddAsync(task_filterNames[i]);
                await _dbContext.SaveChangesAsync();
                //filter_names[i].FilterNames = filter;
            }

            return task_filterNames;
        }
    }
}
