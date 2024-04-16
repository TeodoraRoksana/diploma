using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseLayer.Models.DTO
{
    public class TasksDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime BeginDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Notes { get; set; }
        public int UsersId { get; set; }
        public int BoolDaySelected { get; set; }
        public int BoolWeekSelected { get; set; }
        public int BoolIsImportant { get; set; }
        public int BoolTimeSelected { get; set; }

        public List<FilterNames> FilterNames { get; set; }
    }
}
