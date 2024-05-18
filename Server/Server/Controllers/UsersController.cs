using DataBaseLayer.Models.DTO;
using DataBaseLayer.Models.Mapper;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Services.DBServices.Interfaces;
using Services.HashService;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private readonly IUsersDBService _usersDBService;
        private readonly IHashService _hashService;
        private readonly IMapper<Users, RegistrationDTO> _registrationMapper;
        private readonly IUsersPasswordSaltDBService _usersPasswordSaltDBService;

        public UsersController(
                        IUsersDBService usersDBService,
                        IHashService hashService,
                        IMapper<Users, RegistrationDTO> registrationMapper,
                        IUsersPasswordSaltDBService usersPasswordSaltDBService) 
        { 
            _usersDBService = usersDBService; 
            _hashService = hashService;
            _registrationMapper = registrationMapper;
            _usersPasswordSaltDBService = usersPasswordSaltDBService;
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

        [HttpPost]
        [Route("/User/LogIn")]
        public async Task<ActionResult<Users>> AuthenticationUserAsync(LogInDTO userLogInDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                    throw new Exception("Invalid data. Please check the data. " +
                        "Email must be in the correct format and password must be longer than 8 characters!");

                var user = await _usersDBService.GetUserByEmail(userLogInDTO.Email);

                if (user == null)
                    //throw new Exception("User with this email does not exist!");
                    return NotFound("User with this email does not exist!");

                var salt = await _usersPasswordSaltDBService.GetSaltByUserIdAsync(user.Id);

                if (!_hashService.PasswordVerification(userLogInDTO.Password, user.HashPassword, salt.Salt))
                {
                    throw new Exception("Password is wrong!");
                }

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("/Users/Registration")]
        public async Task<ActionResult<Users>> RegistrationUser(RegistrationDTO registrationDTO)
        {
            try
            {
                if (!ModelState.IsValid)
                    throw new Exception("Invalid data. Please check the data. " +
                        "Username must be longer than 3 characters, " +
                        "email must be in the correct format " +
                        "and password must be longer than 8 characters!");

                if (await _usersDBService.GetUserByEmail(registrationDTO.Email) != null)
                    throw new Exception("User with this email already exists!");

                byte[] salt;
                registrationDTO.Password = _hashService.HashPassword(registrationDTO.Password, out salt);

                Users user = await _usersDBService.PostUser(_registrationMapper.Unmap(registrationDTO));

                UsersPasswordSalt passwordSalt = new UsersPasswordSalt
                {
                    Salt = salt,
                    UsersId = user.Id
                };

                await _usersPasswordSaltDBService.AddSaltAsync(passwordSalt);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
