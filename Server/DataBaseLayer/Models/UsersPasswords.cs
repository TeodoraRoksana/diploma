using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class UsersPasswords
    {
        [Key]
        public int Id { get; set; }
        public int UsersId { get; set; }
        public string HashPassword { get; set; }
        
        public Users User { get; set; }
    }
}
