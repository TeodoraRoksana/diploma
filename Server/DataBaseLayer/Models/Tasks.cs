using System.ComponentModel.DataAnnotations;

namespace Server.Models
{
    public class Tasks
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Notes { get; set; }
        public int UsersId { get; set; }
        public int BoolDaySelected { get; set; }
        public int BoolWeekSelected { get; set; }
        public int BoolIsImportant { get; set; }
        public int BoolTimeSelected { get; set; }

        public Users? User { get; set; }
        public List<Tasks_FilterNames> Tasks_FilterNames { get; set; }

    }
}
