using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataBaseLayer.Models.DTO
{
    public class DateTasksNUserIdDTO
    {
        public int User_Id { get; set; }
        public DateTime Date { get; set; }
        public string TypeDate { get; set; } // 0 - day  1 - week  2 - month
    }
}
