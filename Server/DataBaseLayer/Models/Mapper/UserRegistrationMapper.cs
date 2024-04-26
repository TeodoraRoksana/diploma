using DataBaseLayer.Models.DTO;
using Server.Models;

namespace DataBaseLayer.Models.Mapper
{
    public class UserRegistrationMapper : IMapper<Users, RegistrationDTO>
    {
        public RegistrationDTO Map(Users data)
        {
            return new RegistrationDTO
            {
                Name = data.Name,
                Email = data.Email,
                Password = data.HashPassword,
            };
        }

        public Users Unmap(RegistrationDTO data)
        {
            return new Users
            {
                Name = data.Name,
                Email = data.Email,
                HashPassword = data.Password,
            };
        }
    }
}
