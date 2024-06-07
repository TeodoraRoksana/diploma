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
        public DateTime EndDate { get; set; }
        public string Note { get; set; }
        public int UserId { get; set; }
        public string Mode { get; set; }
        public bool Important { get; set; }

        public FilterNames? Tag { get; set; }
    }
}
