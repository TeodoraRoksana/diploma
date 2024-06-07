using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Services.DBServices;
using Services.DBServices.Interfaces;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class FilterNamesController : Controller
    {
        private readonly IFilterNamesService _filterNamesService;

        public FilterNamesController(IFilterNamesService filterNamesService)
        {
            _filterNamesService = filterNamesService;
        }

        [HttpGet]
        public async Task<ActionResult<List<FilterNames>>> GetAllFilterNameByUserId(int user_id)
        {
            try
            {
                var filters = await _filterNamesService.GetAllFilterNamesByUserId(user_id);

                return Ok(filters);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<FilterNames>> PostNewFilterNames(FilterNames filterName)
        {
            try
            {
                return Ok(await _filterNamesService.PostFilterNamesForUser(filterName));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<FilterNames>> PutFilterName(FilterNames filter)
        {
            try
            {
                await _filterNamesService.PutFilterNamesForUser(filter);
                return Ok(await _filterNamesService.GetAllFilterNamesByUserId(filter.UsersId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteFilterNameById(int id)
        {
            try
            {
                await _filterNamesService.DeleteFilterNamesForUserById(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
