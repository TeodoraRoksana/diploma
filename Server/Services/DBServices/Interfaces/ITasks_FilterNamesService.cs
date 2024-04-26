using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DBServices.Interfaces
{
    public interface ITasks_FilterNamesService
    {
        Task<List<Tasks_FilterNames>> PostTask_FilterNames(int task_id, List<Tasks_FilterNames> task_filterNames);
        Task<List<Tasks_FilterNames>> PostTask_FilterNames(int task_id, FilterNames filter);
    }
}
