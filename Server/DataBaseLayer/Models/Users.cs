using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Users
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string HashPassword { get; set; }
        public UsersPasswordSalt? Salt { get; set; }
        public List<FilterNames> FilterNames { get; set; }
    }
}
