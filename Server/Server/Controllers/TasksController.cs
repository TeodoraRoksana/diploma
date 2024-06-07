using DataBaseLayer.Models.DTO;
using DataBaseLayer.Models.Mapper;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Services.DBServices;
using Services.DBServices.Interfaces;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController : Controller
    {
        private readonly ITasksDBService _tasksDBService;
        private readonly IMapper<Tasks, TasksDTO> _tasksMapper;

        public TasksController(ITasksDBService tasksDBService,
            IMapper<Tasks, TasksDTO> tasksMapper)
        {
            _tasksDBService = tasksDBService;
            _tasksMapper = tasksMapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<TasksDTO>>> GetAllUserTasks(int user_id)
        {
            try
            {
                var tasks = await _tasksDBService.GetAllUserTasks(user_id);
                var tasksDTO = new List<TasksDTO>();
                tasks.ForEach(t =>
                {
                    tasksDTO.Add(_tasksMapper.Map(t));
                });

                return Ok(tasksDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("/Tasks/{id}")]
        public async Task<ActionResult<Tasks>> GetUserTasksById(int id)
        {
            try
            {
                var task = await _tasksDBService.GetUserTaskById(id);                

                return Ok(task);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("/Tasks/GetTasksByDate")]
        public async Task<ActionResult<List<Tasks>>> GetListOfTasksByDate(DateTasksNUserIdDTO dateTasksNUserId)
        {
            try
            {
                List<Tasks> tasks = new List<Tasks>();
                var tasksDTO = new List<TasksDTO>();
                if (dateTasksNUserId.TypeDate == "day")
                {
                    tasks = (await _tasksDBService.GetUserTasksByDateForDay(dateTasksNUserId.User_Id, dateTasksNUserId.Date));
                    tasks.ForEach(t =>
                    {
                        tasksDTO.Add(_tasksMapper.Map(t));
                    });
                }
                else if(dateTasksNUserId.TypeDate == "week")
                {
                    int number_day = (int)dateTasksNUserId.Date.DayOfWeek;
                    tasks = (await _tasksDBService.GetUserTasksByDateForWeek(
                        dateTasksNUserId.User_Id,
                        dateTasksNUserId.Date.AddDays(-(number_day - 1)),
                        dateTasksNUserId.Date.AddDays(7 - number_day)));
                    tasks.ForEach(t =>
                    {
                        tasksDTO.Add(_tasksMapper.Map(t));
                    });

                }
                else if(dateTasksNUserId.TypeDate == "month")
                {
                    tasks = await _tasksDBService.GetUserTasksByDateForMonth(dateTasksNUserId.User_Id, dateTasksNUserId.Date);
                    tasks.ForEach(t =>
                    {
                        tasksDTO.Add(_tasksMapper.Map(t));
                    });
                }

                return Ok(tasksDTO);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<TasksDTO>> PostNewTask(TasksDTO task)
        {
            try
            {
                var newTasks = _tasksMapper.Unmap(task);
                newTasks = await _tasksDBService.PostUserTask(newTasks);

                return Ok(_tasksMapper.Map(newTasks));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<TasksDTO>> PutUserTask(TasksDTO task)
        {
            try
            {
                var newTasks = _tasksMapper.Unmap(task);
                newTasks = await _tasksDBService.PutUserTask(newTasks);

                return Ok(_tasksMapper.Map(newTasks));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteTaskById(int id)
        {
            try
            {
                await _tasksDBService.DeleteUserTaskById(id);

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

    
}
