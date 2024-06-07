using DataBaseLayer.Models.DTO;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseLayer.Models.Mapper
{
    public class TasksMapper : IMapper<Tasks, TasksDTO>
    {
        public TasksDTO Map(Tasks data)
        {
            var task = new TasksDTO{
                Id = data.Id,
                Name = data.Name,
                BeginDate = data.BeginDate,
                EndDate = data.EndDate,
                Note = data.Notes,
                UserId = data.UsersId,
                Mode = data.BoolDaySelected == 1 ? "day" :
                    data.BoolWeekSelected == 1 ? "week" : "month",
                Important = data.BoolIsImportant == 1 ? true : false,
                Tag = null,
            };

            var tag = new FilterNames();
            if(data.Tasks_FilterNames.Any())
            {
                tag.Name = data.Tasks_FilterNames[0].FilterNames.Name;
                tag.Color = data.Tasks_FilterNames[0].FilterNames.Color;
                tag.Id = data.Tasks_FilterNames[0].FilterNames.Id;
                tag.UsersId = data.Tasks_FilterNames[0].FilterNames.UsersId;

                task.Tag = tag;
            }

            return task;            
        }

        public Tasks Unmap(TasksDTO data)
        {
            var tasks = new Tasks
            {
                Id = data.Id,
                Name = data.Name,
                BeginDate = data.BeginDate,
                EndDate = data.EndDate,
                Notes = data.Note,
                UsersId = data.UserId,
                BoolDaySelected = data.Mode == "day" ? 1 : 0,
                BoolWeekSelected = data.Mode == "week" ? 1 : 0,
                BoolIsImportant = data.Important ? 1 : 0,
                BoolTimeSelected = 0,
                Tasks_FilterNames = new List<Tasks_FilterNames>(),
            };

            if(data.Tag != null)
            {
                tasks.Tasks_FilterNames.Add(new Tasks_FilterNames { FilterNames = data.Tag });
            }

            return tasks;
        }
    }
}
