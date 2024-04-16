using DataBaseLayer.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Services.DBServices;
using Services.DBServices.Interfaces;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TasksController : Controller
    {
        private readonly ITasksDBService _tasksDBService;

        public TasksController(ITasksDBService tasksDBService)
        {
            _tasksDBService = tasksDBService;
        }

        [HttpGet]
        public async Task<ActionResult<List<Tasks>>> GetAllUserTasks(int user_id)
        {
            try
            {
                var tasks = await _tasksDBService.GetAllUserTasks(user_id);

                return Ok(tasks);
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
        [Route("/Task/GetTasksByDate")]
    public async Task<ActionResult<List<Tasks>>> GetListOfTasksByDate(DateTasksNUserIdDTO dateTasksNUserId)
        {
            try
            {
                List<Tasks> tasks = new List<Tasks>();
                if(dateTasksNUserId.TypeDate == 0)
                {
                    tasks = (await _tasksDBService.GetUserTasksByDateForDay(dateTasksNUserId.User_Id, dateTasksNUserId.Date));
                }
                else if(dateTasksNUserId.TypeDate == 1)
                {
                    int number_day = (int)dateTasksNUserId.Date.DayOfWeek;
                    tasks = (await _tasksDBService.GetUserTasksByDateForWeek(
                        dateTasksNUserId.User_Id,
                        dateTasksNUserId.Date.AddDays(-(number_day - 1)),
                        dateTasksNUserId.Date.AddDays(7 - number_day)));

                }
                else if(dateTasksNUserId.TypeDate == 2)
                {
                    tasks = await _tasksDBService.GetUserTasksByDateForMonth(dateTasksNUserId.User_Id, dateTasksNUserId.Date);
                }

                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<Tasks>> PostNewTask(Tasks task)
        {
            try
            {
                return Ok(await _tasksDBService.PostUserTask(task));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<Tasks>> PutUserTask(Tasks task)
        {
            try
            {
                return Ok(await _tasksDBService.PutUserTask(task));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
