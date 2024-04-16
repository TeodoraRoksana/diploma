using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Users
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public UsersPasswords? Password { get; set; }
        public List<FilterNames>? FilterNames { get; set; }
    }
}
