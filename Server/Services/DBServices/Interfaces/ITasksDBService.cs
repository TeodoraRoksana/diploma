using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DBServices.Interfaces
{
    public interface ITasksDBService
    {
        public Task<List<Tasks>> GetAllUserTasks(int user_id);
        public Task<Tasks> GetUserTaskById(int id);
        public Task<List<Tasks>> GetUserTasksByDateForMonth(int user_id, DateTime date);
        public Task<List<Tasks>> GetUserTasksByDateForWeek(int user_id, DateTime start_date, DateTime end_date);
        public Task<List<Tasks>> GetUserTasksByDateForDay(int user_id, DateTime date);
        public Task<Tasks> PostUserTask(Tasks task);
        public Task<Tasks> PutUserTask(Tasks task);
        public Task DeleteUserTaskById(int id);
    }
}
