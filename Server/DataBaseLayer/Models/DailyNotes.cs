namespace Server.Models
{
    public class DailyNotes
    {
        public int Id { get; set; }
        public int UsersId { get; set; }
        public DateTime Date { get; set; }
        public string Text { get; set; } = string.Empty;

        public Users User { get; set; }
    }
}
