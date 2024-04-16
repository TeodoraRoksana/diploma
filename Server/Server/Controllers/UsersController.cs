using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Services.DBServices.Interfaces;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private readonly IUsersDBService _usersDBService;
        
        public UsersController(IUsersDBService usersDBService) 
        { 
            _usersDBService = usersDBService; 
        }

        [HttpGet]
        public async Task<ActionResult<List<Users>>> Get()
        {
            try
            {
                var users = await _usersDBService.GetAllUsers();

                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
