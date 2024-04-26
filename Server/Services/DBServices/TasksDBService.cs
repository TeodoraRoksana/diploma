using DataBaseLayer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Server.Models;
using Services.DBServices.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DBServices
{
    public class TasksDBService : ITasksDBService
    {
        private DiplomaDBContext _dbContext;
        private ITasks_FilterNamesService _tasks_FilterNamesService;
        public TasksDBService(DiplomaDBContext context, ITasks_FilterNamesService tasks_FilterNamesService) 
        { 
            _dbContext = context; 
            _tasks_FilterNamesService = tasks_FilterNamesService;
        }

        public async Task<List<Tasks>> GetAllUserTasks(int user_id)
        {
            return (await _dbContext.Tasks.Where(t => t.UsersId == user_id).Include(f => f.Tasks_FilterNames).ToListAsync());
        }

        public async Task<Tasks> GetUserTaskById(int id)
        {
            var task = (await _dbContext.Tasks.Include(f => f.Tasks_FilterNames).SingleAsync(t => t.Id == id));

            if(task == null)
                throw new Exception($"no {typeof(Tasks).Name} with id = {id}");
            if (task.Tasks_FilterNames.Count != 0)
            {
                task.Tasks_FilterNames[0].FilterNames =  await _dbContext.FilterNames.SingleAsync(fn => fn.Id == task.Tasks_FilterNames[0].FilterNamesId);
            }

            return task;
        }

        public async Task<List<Tasks>> GetUserTasksByDateForDay(int user_id, DateTime date)
        {
            return (await _dbContext.Tasks
                .Where(t => 
                    t.UsersId == user_id 
                    && t.BeginDate.Date == date.Date
                    )
                .Include(f => f.Tasks_FilterNames).ToListAsync());
        }

        public async Task<List<Tasks>> GetUserTasksByDateForMonth(int user_id, DateTime date)
        {
            return (await _dbContext.Tasks
                .Where(t =>
                    t.UsersId == user_id
                    && t.BeginDate.Month == date.Month
                    )
                .Include(f => f.Tasks_FilterNames).ToListAsync());
        }

        public async Task<List<Tasks>> GetUserTasksByDateForWeek(int user_id, DateTime start_date, DateTime end_date)
        {
            return (await _dbContext.Tasks
                .Where(t =>
                    t.UsersId == user_id
                    && t.BeginDate.Date >= start_date.Date
                    && t.BeginDate.Date <= end_date.Date
                    && t.EndDate <= end_date.Date
                    && t.EndDate >= start_date.Date
                    )
                .Include(f => f.Tasks_FilterNames).ToListAsync());
        }

        public async Task<Tasks> PostUserTask(Tasks task)
        {
            try
            {
                var filter_names = task.Tasks_FilterNames;
                task.Tasks_FilterNames = null;

               await _dbContext.Tasks.AddAsync(task);
                await _dbContext.SaveChangesAsync();

                filter_names = await _tasks_FilterNamesService.PostTask_FilterNames(task.Id, filter_names);
                /*for (int i = 0; i < filter_names.Count; i++)
                {
                    var filter = (await _dbContext.FilterNames.FirstOrDefaultAsync(f => f.Name == filter_names[i].FilterNames.Name));
                    if(filter == null)
                    {
                        await _dbContext.FilterNames.AddAsync(filter_names[i].FilterNames);
                        await _dbContext.SaveChangesAsync();
                        filter = filter_names[i].FilterNames;
                    }

                    filter_names[i].FilterNames = null;

                    filter_names[i].FilterNamesId = filter.Id;
                    filter_names[i].TasksId = task.Id;
                    await _dbContext.Tasks_FilterNames.AddAsync(filter_names[i]);
                    await _dbContext.SaveChangesAsync();
                    //filter_names[i].FilterNames = filter;
                }*/
                //task = filter_names[0].Tasks;

                return filter_names[0].Tasks;
            }
            catch (Exception ex)
            {
                throw new Exception($"cant add {typeof(Users).Name} Messege error: " + ex.Message);
            }
        }

        public async Task<Tasks> PutUserTask(Tasks task)
        {
            try
            {
                var oldtask = await GetUserTaskById(task.Id);

                oldtask.Name = task.Name;
                oldtask.BeginDate = task.BeginDate;
                oldtask.EndDate = task.EndDate;
                oldtask.Notes = task.Notes;
                oldtask.BoolDaySelected = task.BoolDaySelected;
                oldtask.BoolWeekSelected = task.BoolWeekSelected;
                oldtask.BoolIsImportant = task.BoolIsImportant;
                oldtask.BoolTimeSelected = task.BoolTimeSelected;
                //await _dbContext.SaveChangesAsync();

                var filter_names = task.Tasks_FilterNames;
                //for one filter
                if (oldtask.Tasks_FilterNames.IsNullOrEmpty() || oldtask.Tasks_FilterNames[0].FilterNames != task.Tasks_FilterNames[0].FilterNames)
                {
                    //task.Tasks_FilterNames[0].FilterNames = null;
                    _dbContext.Tasks_FilterNames.Remove(oldtask.Tasks_FilterNames[0]);
                    await _dbContext.SaveChangesAsync();

                    filter_names = await _tasks_FilterNamesService.PostTask_FilterNames(task.Id, filter_names);
                    
                }

                //oldtask.Tasks_FilterNames = null;

                //await _dbContext.Tasks.AddAsync(oldtask);
                //await _dbContext.SaveChangesAsync();


                
                return filter_names[0].Tasks;
            }
            catch (Exception ex)
            {
                throw new Exception($"cant update {typeof(Tasks).Name} Messege error: " + ex);
            }
        }

        public async Task DeleteUserTaskById(int id)
        {
            var task = await GetUserTaskById(id);

            if (task != null)
            {
                for (int i = 0; i < task.Tasks_FilterNames.Count; i++)
                {
                    var task_filter = (await _dbContext.Tasks_FilterNames.FirstAsync(f => f.TasksId == task.Id));
                    if (task_filter != null)
                    {
                        _dbContext.Tasks_FilterNames.Remove(task_filter);
                    }
                }
                _dbContext.Tasks.Remove(task);

                await _dbContext.SaveChangesAsync();
            }
        }
    }
}
