using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DBServices.Interfaces
{
    public interface IFilterNamesService
    {
        public Task<List<FilterNames>> GetAllFilterNamesByUserId(int user_id);
        public Task<FilterNames> GetFilterNamesById(int id);
        public Task<List<FilterNames>> PostFilterNamesForUser(FilterNames filterNames);
        public Task<FilterNames> PutFilterNamesForUser(FilterNames filterNames);
        public Task<List<FilterNames>> DeleteFilterNamesForUserById(int id);
    }
}
