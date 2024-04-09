namespace Server.Models
{
    public class Users
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public UsersPasswords Password { get; set; }
    }
}
