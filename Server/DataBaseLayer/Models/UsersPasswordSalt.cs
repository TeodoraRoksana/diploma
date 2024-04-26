using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class UsersPasswordSalt
    {
        [Key]
        public int Id { get; set; }
        public int UsersId { get; set; }
        public byte[] Salt { get; set; }
    }
}
