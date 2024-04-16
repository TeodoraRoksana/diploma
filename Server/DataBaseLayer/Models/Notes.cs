using DataBaseLayer.Models;
using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Notes
    {
        [Key]
        public int Id { get; set; }
        public int UsersId { get; set; }
        public DateTime Date { get; set; }
        public string Text { get; set; } = string.Empty;
        public int TypeId { get; set; }

        public Users User { get; set; }
        public TypeOfNotes TypeOfNotes { get; set; }
    }
}
